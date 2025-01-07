import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/database/transactions/enum/transaction.enum';

export class GetTransactionsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: TransactionType;

  @ApiProperty()
  recipient_id?: number;

  @ApiProperty()
  created_at: Date;
}
