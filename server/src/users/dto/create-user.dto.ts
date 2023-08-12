import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @Length(1, 20)
  firstName: string;

  @Length(1, 30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
