import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Budget } from '@prisma/client';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async getBudgets(): Promise<Budget[]> {
    return this.prisma.budget.findMany({
      include: {
        users: true,
        categories: true,
      },
    });
  }

  async getBudget(id: string): Promise<Budget> {
    const budget = await this.prisma.budget.findUnique({
      where: { id: Number(id) },
      include: {
        users: {
          include: {
            user: true, // Include full user details if needed
          },
        },
        categories: {
          include: {
            category: true, // Include full category details if needed
          },
        },
      },
    });
    if (!budget) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    return budget;
  }

  async createBudget(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const { users, categories, ...data } = createBudgetDto;
    try {
      const budget = await this.prisma.budget.create({
        data: {
          ...data,
          users: {
            createMany: {
              data: users.map((user) => ({
                userId: user.id,
                estimate: user.estimate,
              })),
            },
          },
          categories: {
            createMany: {
              data: categories.map((category) => ({
                categoryId: category.id,
                estimate: category.estimate,
              })),
            },
          },
        },
        include: {
          users: true,
          categories: true,
        },
      });
      console.log('Created new budget:', budget);
      return budget;
    } catch (error) {
      console.error('Error creating budget:', error);
      throw new InternalServerErrorException('Error creating budget');
    }
  }

  async updateBudget(
    id: number,
    updateBugetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    const { users, categories, ...data } = updateBugetDto;
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: { users: true, categories: true },
    });
    if (!budget) {
      throw new Error('Budget not found');
    }
    try {
      const updatedBudget = await this.prisma.budget.update({
        where: { id },
        data: {
          ...data,
          users: {
            deleteMany: { budgetId: id }, // Clear existing associations
            createMany: {
              data: users.map((user) => ({
                userId: user.id,
                estimate: user.estimate,
              })),
            },
          },
          categories: {
            deleteMany: { budgetId: id },
            createMany: {
              data: categories.map((category) => ({
                categoryId: category.id,
                estimate: category.estimate,
              })),
            },
          },
        },
        include: {
          users: true,
          categories: true,
        },
      });
      return updatedBudget;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error updating budget');
    }
  }

  async deleteBudget(id: number) {
    const budget = await this.prisma.budget.findUnique({ where: { id } });
    if (!budget) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    try {
      await this.prisma.budget.delete({ where: { id } });
      console.log(`Budget with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw new InternalServerErrorException('Error deleting budget');
    }
  }
}
