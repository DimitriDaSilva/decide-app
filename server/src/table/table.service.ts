import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { Repository } from 'typeorm';
import { User } from '@/auth/user.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async createTable(userId: number, title = 'Untitled Table') {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newTable = await this.tableRepository.save({ title, user });

    delete newTable.user;

    return newTable;
  }

  async getTableByTableId(tableId: number) {
    const table = await this.tableRepository.findOneBy({ id: tableId });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    return table;
  }

  async getTablesByUserId(userId: number) {
    const tables = await this.tableRepository.findBy({ user: { id: userId } });

    if (!tables) {
      throw new NotFoundException('User not found');
    }

    return tables;
  }

  async updateTable(tableId: number, payload: Partial<Table>) {
    const table = await this.getTableByTableId(tableId);

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    this.tableRepository.update({ id: table.id }, { ...payload });
  }

  async deleteTable(tableId: number) {
    const table = await this.getTableByTableId(tableId);

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    await this.tableRepository.remove(table);
  }
}
