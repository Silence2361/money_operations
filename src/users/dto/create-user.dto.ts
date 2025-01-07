import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Name', description: 'The name of the user' })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  name: string;

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
  @IsDateString()
  birth_date: string;

  @ApiProperty({ example: '1000.00', description: 'The balance of the user' })
  @IsString()
  balance: string;
}
