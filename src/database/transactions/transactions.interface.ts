import { TransactionType } from './enum/transaction.enum';

export interface ITransaction {
  id: number;
  user_id: number;
  amount: number;
  type: TransactionType;
  recipient_id?: number;
  created_at: Date;
}

export interface ICreateTransaction {
  user_id: number;
  amount: number;
  type: TransactionType;
  recipient_id?: number;
}

export interface ICreateTransactionResponse {
  id: number;
}

export interface IGetTransactionsResponse {
  id: number;
  user_id: number;
  amount: number;
  type: TransactionType;
  recipient_id?: number;
  created_at: Date;
}
