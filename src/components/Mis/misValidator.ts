/**
 * UserValidate.ts
 */

import {
  IsEmail,
  IsNotEmpty,
  IsString,

} from "class-validator";

export class CreateRecord {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: "email should not be empty" })
  @IsEmail()
  email: string;

}
