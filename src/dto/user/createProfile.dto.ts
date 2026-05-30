import {
  IsString,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username',
  })
  @IsString()
  @Length(3, 30)
  username: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Display name',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  displayName?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/avatar.jpg',
    description: 'Avatar URL',
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'Fullstack developer from Lviv',
    description: 'Short profile description',
  })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;
}