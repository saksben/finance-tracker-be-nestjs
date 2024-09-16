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
        userId: 39,
        type: 'Revenue',
        amount: 1065,
        description: 'pymt',
        categoryId: 3,
      },
      {
        date: new Date('2024-06-05'),
        userId: 42,
        type: 'Revenue',
        amount: 1204,
        description: 'pymt',
        categoryId: 3,
      },
      {
        date: new Date('2024-06-08'),
        userId: 40,
        type: 'Revenue',
        amount: 0,
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
        userId: 39,
        type: 'Revenue',
        amount: 1500,
        description: 'pymt',
        categoryId: 2,
      },
    ],
    skipDuplicates: true,
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
