import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
