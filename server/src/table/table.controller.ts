import { GetUser } from '@/auth/decorator';
import { User } from '@/auth/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TableService } from './table.service';
import { UpdateTableDto } from './update-table.dto';

@UseGuards(JwtGuard)
@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post()
  createTable(@GetUser() { id }: User) {
    return this.tableService.createTable(id);
  }

  @Get()
  getTableByUserId(@GetUser() { id }: User) {
    return this.tableService.getTablesByUserId(id);
  }

  @Put(':tableId')
  updateTable(
    @Param('tableId', ParseIntPipe) tableId: number,
    @Body() dto: UpdateTableDto,
  ) {
    return this.tableService.updateTable(tableId, dto);
  }

  @Delete(':tableId')
  deleteTable(@Param('tableId', ParseIntPipe) tableId: number) {
    return this.tableService.deleteTable(tableId);
  }
}
