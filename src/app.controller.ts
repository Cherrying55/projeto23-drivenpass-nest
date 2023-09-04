import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @ApiOperation({ summary: "Checks APIs health" })
  @ApiResponse({ status: HttpStatus.OK, description: "I'm okay." })
  getHello(): string {
    return "I’m okay!"
  }
}
