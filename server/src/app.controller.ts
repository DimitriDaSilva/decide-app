import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTables() {
    return [
      { id: 1, title: 'Table 1' },
      { id: 2, title: 'Table 2' },
      { id: 3, title: 'Table 3' },
    ];
  }
}
