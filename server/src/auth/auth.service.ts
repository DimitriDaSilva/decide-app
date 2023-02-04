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

      return this.signToken(user.id, user.email);
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

    return this.signToken(user.id, user.email);
  }

  logout() {
    return { message: 'logout' };
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JTW_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
