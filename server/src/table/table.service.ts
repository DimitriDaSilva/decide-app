import { Injectable } from '@nestjs/common';
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

  async createTable(userId: number, tableTitle = 'Untitled Table') {
    const user = await this.userRepository.findOneBy({ id: userId });

    await this.tableRepository.save({ title: tableTitle, user });
  }

  async getTableByTableId(tableId: number) {
    return this.tableRepository.findOneBy({ id: tableId });
  }

  async getTablesByUserId(userId: number) {
    return this.tableRepository.findBy({ user: { id: userId } });
  }

  async updateTable(tableId: number, payload: Partial<Table>) {
    const { id } = await this.getTableByTableId(tableId);

    this.tableRepository.update({ id }, { ...payload });
  }

  async deleteTable(tableId: number) {
    return { message: 'deleting table', tableId };
  }
}
