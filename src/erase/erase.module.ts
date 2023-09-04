import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { EraseRepository } from './erase.repository';
import { UsersRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [EraseController],
  providers: [EraseService, EraseRepository, UsersRepository, UsersService],
})
export class EraseModule {}
