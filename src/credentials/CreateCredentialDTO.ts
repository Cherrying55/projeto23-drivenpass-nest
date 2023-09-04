import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateCredentialDTO {

  @IsStrongPassword()
  password: string

  @IsNumber()
  userId: number

  @IsString()
  title: string

  @IsString()
  site: string

}