/**
 * UserValidate.ts
 */

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
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

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  createdAt?: Date

  @IsOptional()
  updatedAt?: Date

}
