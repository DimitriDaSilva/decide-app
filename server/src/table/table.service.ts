import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
  async createTable() {
    return { message: 'creating table' };
  }

  async getTablesByUserId(userId: number) {
    return { message: 'all tables', userId };
  }

  async updateTable(tableId: number) {
    return { message: 'updating table', tableId };
  }

  async deleteTable(tableId: number) {
    return { message: 'deleting table', tableId };
  }
}
