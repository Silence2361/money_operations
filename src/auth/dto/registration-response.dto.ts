import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
