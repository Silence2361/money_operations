import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class RegistrationDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  @MinLength(6)
  @MaxLength(28)
  password: string;

  @ApiProperty({ example: 'FirstName', description: 'The name of the user' })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  first_name: string;

  @ApiProperty({
    example: 'LastName',
    description: 'The last name of the user',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  last_name: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birth date of the user (YYYY-MM-DD)',
  })
  @IsDateString(
    {},
    { message: 'birth_date must be a valid date in YYYY-MM-DD format' },
  )
  @IsOptional()
  birth_date: Date;
}
