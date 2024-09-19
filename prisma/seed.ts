import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Me' },
      { name: 'Dad' },
      { name: 'Mom' },
      { name: 'Jonathan' },
    ],
    skipDuplicates: true, // Prevents adding the same data again
  });
  await prisma.category.createMany({
    data: [{ name: 'Food' }, { name: 'Rent' }, { name: 'Budget' }],
    skipDuplicates: true,
  });
  await prisma.transaction.createMany({
    data: [
      {
        date: new Date('2024-06-04'),
        userId: 1,
        type: 'Revenue',
        amount: 1065,
        description: 'pymt',
        categoryId: 3,
      },
      {
        date: new Date('2024-06-05'),
        userId: 4,
        type: 'Revenue',
        amount: 1204,
        description: 'pymt',
        categoryId: 3,
      },
      {
        date: new Date('2024-06-08'),
        userId: 2,
        type: 'Revenue',
        amount: 2,
        description: 'pymt',
        categoryId: 3,
      },
      {
        date: new Date('2024-06-11'),
        userId: null,
        type: 'Expense',
        amount: 3942,
        description: 'expenses',
        categoryId: 3,
      },
      {
        date: new Date('2024-06-15'),
        userId: null,
        type: 'Expense',
        amount: 3000,
        description: 'rent',
        categoryId: 2,
      },
      {
        date: new Date('2024-06-16'),
        userId: null,
        type: 'Expense',
        amount: 50,
        description: 'Pizza',
        categoryId: 1,
      },
      {
        date: new Date('2024-06-17'),
        userId: 1,
        type: 'Revenue',
        amount: 1500,
        description: 'pymt',
        categoryId: 2,
      },
    ],
    skipDuplicates: true,
  });
  await prisma.budget.create({
    data: {
      name: 'Personal Account',
      estimatedRevenue: 2000,
      categories: {
        create: [
          { categoryId: 1, estimate: 50 },
          { categoryId: 2, estimate: 1500 },
        ],
      },
      users: {
        create: [{ userId: 1, estimate: 1550 }],
      },
      alertOverbudget: true,
      alertOverAmount: true,
      alertAmount: 1000,
      overbudget: false,
    },
  });
  await prisma.budget.create({
    data: {
      name: 'Joint Account',
      estimatedRevenue: 3870,
      categories: {
        create: [{ categoryId: 3, estimate: 3870 }],
      },
      users: {
        create: [
          { userId: 1, estimate: 1333 },
          { userId: 4, estimate: 1204 },
          { userId: 2, estimate: 1333 },
        ],
      },
      alertOverbudget: false,
      alertOverAmount: false,
      overbudget: false,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
