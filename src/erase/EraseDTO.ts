import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class EraseDTO {


  @IsStrongPassword()
  password: string

}