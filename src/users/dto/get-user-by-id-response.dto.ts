import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  balance: string;
}
