import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;
}
