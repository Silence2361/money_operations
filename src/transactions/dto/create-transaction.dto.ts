import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { TransactionType } from 'src/database/transactions/enum/transaction.enum';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user who initiated the transaction',
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 500.0, description: 'Amount of the transaction' })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    example: 'deposit',
    description: 'Type of the transaction',
    enum: TransactionType,
  })
  @IsEnum(TransactionType, {
    message: `type must be one of the following values: ${Object.values(TransactionType).join(', ')}`,
  })
  type: TransactionType;

  @ApiProperty({
    example: 2,
    description: 'Recipient ID (for transfer type only)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  recipient_id?: number;
}
