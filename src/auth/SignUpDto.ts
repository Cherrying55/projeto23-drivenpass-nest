import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class SignUpDTO {

  @IsEmail()
   email: string

  @IsStrongPassword()
  password: string

}