import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login() {
    return { message: 'login' };
  }

  signup() {
    return { message: 'signup' };
  }

  logout() {
    return { message: 'logout' };
  }
}
