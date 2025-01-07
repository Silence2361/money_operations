import {
  ICreateTransaction,
  ICreateTransactionResponse,
  IGetTransactionsResponse,
  ITransaction,
} from '../database/transactions/transactions.interface';
import { TransactionsRepository } from '../database/transactions/transactions.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../database/users/users.interface';
import { TransactionType } from '../database/transactions/enum/transaction.enum';
import { UsersRepository } from '../database/users/users.repository';
import { User } from '../database/users/users.entity';
import { Transaction } from '../database/transactions/transactions.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createTransactions(
    createTransaction: ICreateTransaction,
  ): Promise<ICreateTransactionResponse> {
    const { user_id, type, amount, recipient_id } = createTransaction;

    const user = await this.validateUser(user_id);

    switch (type) {
      case TransactionType.DEPOSIT:
        await this.handleDeposit(user, amount);
        break;

      case TransactionType.WITHDRAW:
        await this.handleWithdraw(user, amount);
        break;

      case TransactionType.TRANSFER:
        await this.handleTransfer(user, amount, recipient_id);
        break;

      default:
        throw new BadRequestException(`Invalid transaction type: ${type}`);
    }

    const transaction: ITransaction =
      await this.transactionsRepository.createTransation(createTransaction);

    return { id: transaction.id };
  }

  private async validateUser(user_id: number): Promise<IUser> {
    const user: IUser = await this.usersRepository.getUserById(user_id);

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    return user;
  }

  private validateAmount(amount: number): void {
    const decimalPlaces = (amount.toString().split('.')[1] || '').length;
    if (decimalPlaces > 2) {
      throw new BadRequestException(
        'Amount must have at most 2 decimal places',
      );
    }
  }

  private async handleDeposit(user: IUser, amount: number): Promise<void> {
    this.validateAmount(amount);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const currentBalance = parseFloat(user.balance);
      const newBalance = currentBalance + amount;

      await this.usersRepository.updateUserById(user.id, {
        balance: newBalance.toString(),
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async handleWithdraw(user: IUser, amount: number): Promise<void> {
    this.validateAmount(amount);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const currentBalance = parseFloat(user.balance);

      if (currentBalance < amount) {
        throw new BadRequestException('Insufficient funds');
      }
      const newBalance = currentBalance - amount;

      await this.usersRepository.updateUserById(user.id, {
        balance: newBalance.toString(),
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async handleTransfer(
    user: IUser,
    amount: number,
    recipient_id?: number,
  ): Promise<void> {
    if (!recipient_id) {
      throw new BadRequestException('Recipient ID is required for transfer');
    }

    const recipient = await this.validateUser(recipient_id);

    this.validateAmount(amount);

    const senderBalance = parseFloat(user.balance);

    if (senderBalance < amount) {
      throw new BadRequestException('Insufficient funds for transfer');
    }

    const recipientBalance = parseFloat(recipient.balance);

    const updatedSenderBalance = senderBalance - amount;

    const updatedRecipientBalance = recipientBalance + amount;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(User, user.id, {
        balance: updatedSenderBalance.toString(),
      });

      await queryRunner.manager.update(User, recipient.id, {
        balance: updatedRecipientBalance.toString(),
      });

      await queryRunner.manager.insert(Transaction, {
        user_id: user.id,
        type: TransactionType.TRANSFER,
        amount,
        recipient_id,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getTransactionById(
    transaction_id: number,
  ): Promise<IGetTransactionsResponse> {
    const transaction: ITransaction =
      await this.transactionsRepository.getTransactionById(transaction_id);

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with ID ${transaction_id} not found`,
      );
    }
    return transaction;
  }

  async getUserTransactionHistory(
    user_id: number,
  ): Promise<IGetTransactionsResponse[]> {
    const user = await this.usersRepository.getUserById(user_id);

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    return this.transactionsRepository.getUserTransactions(user_id);
  }
}
