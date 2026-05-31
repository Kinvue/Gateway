import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  SYSTEM = 'SYSTEM',
}

export class UpdateSettingsDto {
  @ApiPropertyOptional({
    enum: Theme,
    example: Theme.DARK,
  })
  @IsOptional()
  @IsEnum(Theme)
  theme?: Theme;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Language code',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Enable notifications',
  })
  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;
}