import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  balance: string;
}
