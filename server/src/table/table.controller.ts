import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@Controller('tables')
export class TableController {
  @UseGuards(JwtGuard)
  @Get()
  getTableByUserId() {
    return { message: 'all tables' };
  }
}
