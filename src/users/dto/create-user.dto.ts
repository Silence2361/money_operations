import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
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
  birth_date: Date;

  @ApiProperty({ example: '1000.00', description: 'The balance of the user' })
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Balance must be a positive number with up to 2 decimal places',
  })
  balance: string;
}
