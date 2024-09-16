import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    CategoryModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [UserService, CategoryService],
})
export class AppModule {}
