/*
  Warnings:

  - You are about to drop the column `userId` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "userId",
ALTER COLUMN "alertOverbudget" SET DEFAULT false,
ALTER COLUMN "alertOverAmount" SET DEFAULT false,
ALTER COLUMN "overbudget" SET DEFAULT false;
