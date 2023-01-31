import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
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
