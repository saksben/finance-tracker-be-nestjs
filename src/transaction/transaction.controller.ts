import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('api/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transactionService.getTransaction(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Put(':id')
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    try {
      const updatedTransaction =
        await this.transactionService.updateTransaction(
          id,
          updateTransactionDto,
        );
      return updatedTransaction;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new InternalServerErrorException('Error updating transaction');
    }
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    await this.transactionService.deleteTransaction(+id);
    return { message: `Transaction with ID ${id} deleted successfully` };
  }
}
