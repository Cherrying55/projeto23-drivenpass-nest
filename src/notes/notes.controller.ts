import { Controller, Get, Body, Post, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { getNoteDTO } from './getNoteDTO';
import { NoteDTO } from './NoteDTO';
import { NotesService } from './notes.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Gets all notes from a given user" })
  @ApiResponse({ status: HttpStatus.OK, description: "All notes in an array" })
  getAllNotes(@Body() body : getNoteDTO){
    return this.notesService.getAllNotes(body.userId)
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Gets a note using an id" })
  @ApiResponse({ status: HttpStatus.OK, description: "The requested note" })
  getNotebyId(@Param('id') id: string){
    return this.notesService.getNotebyId(Number(id))
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Creates a new note" })
  @ApiResponse({ status: HttpStatus.OK})
  createNote(@Body() body : NoteDTO){
    return this.notesService.createNote(body)
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Deletes a note" })
  @ApiResponse({ status: HttpStatus.OK, description: "The deleted note" })
  deleteNote(@Param('id') id: string){
    return this.notesService.deleteNote(Number(id))
  }
}
