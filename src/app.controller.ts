import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Busca Hello World' })
  @ApiResponse({ status: 200, description: 'Retorna Hello World' })
  getHello(): string {
    return this.appService.getHello();
  }
}
