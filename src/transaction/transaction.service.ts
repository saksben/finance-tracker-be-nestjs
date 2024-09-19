import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getTransactions(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      include: {
        user: true, // Includes the associated User
        category: true, // Includes the associated Category
      },
    });
  }

  async getTransaction(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: {
        user: true, // Includes the associated User
        category: true, // Includes the associated Category
      },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { date, user, type, amount, description, category } =
      createTransactionDto;
    console.log('Received createTransactionDto:', createTransactionDto);
    console.log(
      'Parsed values - date:',
      date,
      'userId:',
      user,
      'type:',
      type,
      'amount:',
      amount,
      'description:',
      description,
      'categoryId:',
      category,
    );

    try {
      const newTransaction = await this.prisma.transaction.create({
        data: {
          date: new Date(date),
          user: {
            connect: { id: user }, // Ensure userId is valid
          },
          type,
          amount,
          description,
          category: {
            connect: { id: category }, // Ensure categoryId is valid
          },
        },
      });
      console.log('Created new transaction:', newTransaction);
      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new InternalServerErrorException('Error creating transaction');
    }
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const { user, category, date, type, ...updateData } = updateTransactionDto;

    // Prepare data for Prisma
    const data: any = { ...updateData };

    if (date) {
      data.date = new Date(date).toISOString();
    }

    if (user !== undefined) {
      data.user = { connect: { id: user } };
    }
    if (category !== undefined) {
      data.category = { connect: { id: category } };
    }

    if (type !== undefined) {
      data.type = type;
    }

    try {
      const updatedTransaction = await this.prisma.transaction.update({
        where: { id },
        data,
      });
      return updatedTransaction;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error updating transaction');
    }
  }

  async deleteTransaction(id: number) {
    await this.prisma.transaction.delete({ where: { id } });
  }
}
