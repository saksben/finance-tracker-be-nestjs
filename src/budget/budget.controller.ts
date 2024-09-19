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
import { BudgetService } from './budget.service';
import { Budget } from '@prisma/client';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('api/budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudgets(): Promise<Budget[]> {
    return this.budgetService.getBudgets();
  }

  @Get(':id')
  async getBudgetById(@Param('id') id: string): Promise<Budget> {
    const budget = await this.budgetService.getBudget(id);
    if (!budget) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    return budget;
  }

  @Post()
  async createBudget(
    @Body() createBudgetDto: CreateBudgetDto,
  ): Promise<Budget> {
    return this.budgetService.createBudget(createBudgetDto);
  }

  @Put(':id')
  async updateBudget(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    try {
      const updatedBudget = await this.budgetService.updateBudget(
        id,
        updateBudgetDto,
      );
      return updatedBudget;
    } catch (error) {
      console.error('Error updating budget:', error);
      throw new InternalServerErrorException('Error updating budget');
    }
  }

  @Delete(':id')
  async deleteBudget(@Param('id') id: string) {
    await this.budgetService.deleteBudget(+id);
    return { message: `Budget with id ${id} deleted successfully` };
  }
}
