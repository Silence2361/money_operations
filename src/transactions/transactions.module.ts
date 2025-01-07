import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsControllerP } from './transactions.controller';

@Module({
  controllers: [TransactionsControllerP],
  providers: [TransactionsService],
})
export class TransactionsModule {}
