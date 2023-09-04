import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class GetCredentialDTO {

  @IsNumber()
  userId: number

}