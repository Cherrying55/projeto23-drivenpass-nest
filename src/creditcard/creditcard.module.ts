import { Module } from '@nestjs/common';
import { CreditcardService } from './creditcard.service';
import { CreditcardController } from './creditcard.controller';
import { CredentialRepository } from 'src/credentials/credentials.repository';
import { CreditCardRepository } from './creditcard.repository';
import { UsersRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CreditcardController],
  providers: [CreditcardService, CreditCardRepository, UsersRepository, UsersService],
})
export class CreditcardModule {}
