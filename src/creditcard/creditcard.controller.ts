import { Controller, Get, UseGuards, Post, Delete, Param, Body } from '@nestjs/common';
import { CreditcardService } from './creditcard.service';
import { getCreditCardDTO } from './getCreditDTO';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreditCardDTO } from './CreditCardDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@ApiTags('cards')
@Controller('cards')
export class CreditcardController {
  constructor(private readonly creditcardService: CreditcardService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Gets all credit cards from a given user" })
  @ApiResponse({ status: HttpStatus.OK, description: "All the cards" })
  getAllNotes(@Body() body : getCreditCardDTO){
    return this.creditcardService.getCreditCards(body.userId)
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Gets a specific credit card with the specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "The card" })
  getNotebyId(@Param('id') id: string){
    return this.creditcardService.getCreditCardbyId(Number(id))
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Creates a new credit card" })
  @ApiResponse({ status: HttpStatus.OK, description: "The created card" })
  createNote(@Body() body : CreditCardDTO){
    return this.creditcardService.createCreditCards(body)
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Deletes the specified card" })
  @ApiResponse({ status: HttpStatus.OK, description: "The deleted card" })
  deleteNote(@Param('id') id: string){
    return this.creditcardService.deleteCreditCard(Number(id))
  }

}
