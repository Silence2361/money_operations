import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Name', description: 'The name of the user' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: '1000.00', description: 'The balance of the user' })
  @IsString()
  balance: string;
}
