import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';
import { ICreateTransaction, ITransaction } from './transactions.interface';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransation(
    createTransation: ICreateTransaction,
  ): Promise<ITransaction> {
    const transaction =
      await this.transactionsRepository.create(createTransation);
    return this.transactionsRepository.save(transaction);
  }

  async getTransactions(): Promise<ITransaction[]> {
    return this.transactionsRepository.find({ order: { created_at: 'DESC' } });
  }

  async getTransactionById(
    transaction_id: number,
  ): Promise<ITransaction | null> {
    return this.transactionsRepository.findOne({
      where: { id: transaction_id },
    });
  }

  async getUserTransactions(user_id: number): Promise<ITransaction[]> {
    return this.transactionsRepository.find({
      where: { user_id },
      order: { created_at: 'ASC' },
    });
  }

  async deleteTransactionById(transaction_id: number): Promise<void> {
    await this.transactionsRepository.delete(transaction_id);
  }
}
