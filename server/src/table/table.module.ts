import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { User } from '@/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table, User])],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
