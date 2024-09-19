/*
  Warnings:

  - You are about to drop the `_BudgetToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserBudgets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BudgetToCategory" DROP CONSTRAINT "_BudgetToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetToCategory" DROP CONSTRAINT "_BudgetToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserBudgets" DROP CONSTRAINT "_UserBudgets_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBudgets" DROP CONSTRAINT "_UserBudgets_B_fkey";

-- DropTable
DROP TABLE "_BudgetToCategory";

-- DropTable
DROP TABLE "_UserBudgets";

-- CreateTable
CREATE TABLE "BudgetUser" (
    "id" SERIAL NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "estimate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BudgetUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategory" (
    "id" SERIAL NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "estimate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BudgetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BudgetUser_budgetId_userId_key" ON "BudgetUser"("budgetId", "userId");

-- AddForeignKey
ALTER TABLE "BudgetUser" ADD CONSTRAINT "BudgetUser_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetUser" ADD CONSTRAINT "BudgetUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
