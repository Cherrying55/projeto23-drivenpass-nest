import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class NoteDTO {

  @IsString()
  description: string

  @IsNumber()
  userId: number

  @IsString()
  title: string

}