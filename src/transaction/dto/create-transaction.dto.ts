import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsDateString()
  date: Date;
  @IsOptional()
  @IsNumber()
  user?: number;
  @IsEnum(['Revenue', 'Expense'])
  type: TransactionType;
  @IsNumber()
  amount: number;
  @IsString()
  description: string;
  @IsNumber()
  category: number;
}
