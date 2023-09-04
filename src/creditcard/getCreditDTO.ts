import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class getCreditCardDTO {

  @IsNumber()
  userId: number

  /*title          String   @unique
  ownername      String
  expirationdate DateTime
  securitycode   String
  password       String
  type           String*/

}