import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreditCardDTO {

  @IsString()
  ownername: string

  @IsString()
  type: string

  @IsStrongPassword()
  password: string

  @IsDate()
  expirationdate: string

  @IsString()
  securitycode: string

  @IsString()
  title: string

  @IsNumber()
  userId: number

  /*title          String   @unique
  ownername      String
  expirationdate DateTime
  securitycode   String
  password       String
  type           String*/

}