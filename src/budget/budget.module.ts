import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BudgetController } from './budget.controller';

@Module({
  providers: [BudgetService, PrismaService],
  controllers: [BudgetController],
})
export class BudgetModule {}
