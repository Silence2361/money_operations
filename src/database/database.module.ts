import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Transaction } from './transactions/transactions.entity';
import { UsersRepository } from './users/users.repository';
import { TransactionsRepository } from './transactions/transactions.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  providers: [UsersRepository, TransactionsRepository],
  exports: [UsersRepository, TransactionsRepository],
})
export class RepositoryModule {}
