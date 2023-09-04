import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { EraseService } from './erase.service';
import { EraseDTO } from './EraseDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@ApiTags('erase')
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Deletes all data from a given user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Deleted!" })
  deleteAccount(@Body() body: EraseDTO){
    return this.eraseService.deleteAccount(body.password)
  }
}
