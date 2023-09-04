import { Controller, Body, Get, UseGuards, Post, Param, Delete } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { GetCredentialDTO } from './getCredentialDTO';
import { AuthGuard } from 'src/guards/auth.guard';
import { CredentialDTO } from './CredentialDTO';
import { CreateCredentialDTO } from './CreateCredentialDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Gets all credentials from a given user" })
  @ApiResponse({ status: HttpStatus.OK, description: "All the credentials" })
  getAllCredentials(@Body() body : GetCredentialDTO){
    return this.credentialsService.getCredentials(body.userId)
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Creates a new credential" })
  @ApiResponse({ status: HttpStatus.OK, description: "The created credential" })
  createCredential(@Body() body : CreateCredentialDTO){
    return this.credentialsService.createCredential(body)
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Gets a specific credential with the specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "The credential" })
  getCredentialById(@Param('id') id: string){
    return this.credentialsService.getCredentialById(Number(id))
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Deletes the specified card" })
  @ApiResponse({ status: HttpStatus.OK, description: "The deleted card" })
  deleteCredential(@Param('id') id: string){
    return this.credentialsService.deleteCredential(Number(id))
  }
  
}
