import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

const JWT_TOKEN_LIFETIME = '24h';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email, JWT_TOKEN_LIFETIME);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      } else {
        throw error;
      }
    }
  }

  async login(authDto: AuthDto) {
    // find user
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    // if can't find user, throw exception
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // else check if password valid
    const isCorrectPassword = await argon.verify(user.hash, authDto.password);

    if (!isCorrectPassword) {
      throw new ForbiddenException('Wrong password');
    }

    return this.signToken(user.id, user.email, JWT_TOKEN_LIFETIME);
  }

  logout(userId: number, email: string) {
    return this.signToken(userId, email, '1ms');
  }

  async signToken(userId: number, email: string, expiresIn: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn,
      secret,
    });

    return {
      access_token: token,
    };
  }
}
