import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { noteRepository } from './notes.repository';
import { HttpStatus, HttpException } from '@nestjs/common';
import { NoteDTO } from './NoteDTO';

@Injectable()
export class NotesService {
    constructor(private readonly noteRepository: noteRepository, private readonly userService: UsersService){}

    async getAllNotes(userId: number){
        const hasuser = await this.userService.getById(userId)
        if(!hasuser){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        const notes = await this.noteRepository.getAllnotes(userId);
        return notes
    }

   async getNotebyId(id: number){
    const note = await this.noteRepository.getnoteById(id)
    return note
   }

   async createNote(data: NoteDTO){
    const hasuser = await this.userService.getById(data.userId)
        if(!hasuser){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
    return await this.noteRepository.create(data)
   }

   async deleteNote(id: number){
    const hasnote = await this.noteRepository.getnoteById(id);
    if(!hasnote){
        throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    }
    return this.noteRepository.deletenote(id)
   }
}
