import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class UserDTO {

  @IsEmail()
   email: string

  @IsStrongPassword()
  password: string

}