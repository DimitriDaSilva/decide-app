import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('tables')
export class TableController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getTableByUserId() {
    return { message: 'all tables' };
  }
}
