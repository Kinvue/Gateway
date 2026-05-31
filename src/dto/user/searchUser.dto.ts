import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchUsersDto {
  @ApiPropertyOptional({
    example: 'john_doe',
    description: 'Unique username',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  displayName?: string;
}