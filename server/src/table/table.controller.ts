import { GetUser } from '@/auth/decorator';
import { User } from '@/auth/user.entity';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TableService } from './table.service';

@UseGuards(JwtGuard)
@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post()
  createTable() {
    return this.tableService.createTable();
  }

  @Get()
  getTableByUserId(@GetUser() { id }: User) {
    return this.tableService.getTablesByUserId(id);
  }

  @Put(':tableId')
  updateTable(@Param() tableId: number) {
    return this.tableService.updateTable(tableId);
  }

  @Delete(':tableId')
  deleteTable(@Param() tableId: number) {
    return this.tableService.deleteTable(tableId);
  }
}
