import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionResponseDto } from './dto/create-transaction-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsResponseDto } from './dto/get-transactions-response.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsControllerP {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiCreatedResponse({
    description: 'Transaction successfully created',
    type: CreateTransactionResponseDto,
  })
  async createTransaction(
    @Body()
    createTransaction: CreateTransactionDto,
  ): Promise<CreateTransactionResponseDto> {
    return this.transactionsService.createTransactions(createTransaction);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiOkResponse({
    description: 'List of transactions',
    type: [GetTransactionsResponseDto],
  })
  async getTransactions(): Promise<GetTransactionsResponseDto[]> {
    return this.transactionsService.getTransactions();
  }

  @Get(':transaction_id')
  @ApiOperation({ summary: 'Get transactions by ID ' })
  @ApiOkResponse({
    description: 'Transaction by ID',
    type: GetTransactionsResponseDto,
  })
  async getTransactionById(
    @Param('transaction_id', ParseIntPipe) transaction_id: number,
  ): Promise<GetTransactionsResponseDto> {
    return this.transactionsService.getTransactionById(transaction_id);
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: 'Get all transactions for a user' })
  @ApiOkResponse({
    description: 'List of user transactions',
    type: [GetTransactionsResponseDto],
  })
  async getUserTransactionHistory(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<GetTransactionsResponseDto[]> {
    return this.transactionsService.getUserTransactionHistory(user_id);
  }
}
