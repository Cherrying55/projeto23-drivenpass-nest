import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CredentialDTO {

  @IsStrongPassword()
  password: string

  @IsNumber()
  userId: number

  @IsNumber()
  siteId: number

  @IsString()
  title: string

}