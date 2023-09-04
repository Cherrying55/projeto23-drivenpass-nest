import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { noteRepository } from './notes.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/user.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService, noteRepository, UsersService, UsersRepository],
})
export class NotesModule {}
