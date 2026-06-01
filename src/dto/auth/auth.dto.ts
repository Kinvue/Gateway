import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: "test@gmail.com",
    description: "Email"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:"BITUyutytubi78^%8",
    description:"User password"
  })
  @IsString()
  @MinLength(6)
  password: string;
}


export class RegisterDto {
  @ApiProperty({
    example: "test@gmail.com",
    description: "Email"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:"BITUyutytubi78^%8",
    description:"User password"
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example:"Taras",
    description: "User name"
  })
  @IsString()
  @MinLength(3)
  name: string;
}
