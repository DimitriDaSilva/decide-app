import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { User } from './user.entity';

const JWT_TOKEN_LIFETIME = '24h';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);

    try {
      const user = await this.userRepository.save({
        email: authDto.email,
        hash,
      });

      return this.signToken(user.id, user.email, JWT_TOKEN_LIFETIME);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('Credentials taken');
      } else {
        throw error;
      }
    }
  }

  async login(authDto: AuthDto) {
    // find user
    const user = await this.userRepository.findOneBy({
      email: authDto.email,
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
