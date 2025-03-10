import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AuthGuard } from './modules/auth/auth.guard';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, CategoriesModule, BankAccountsModule, TransactionModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
