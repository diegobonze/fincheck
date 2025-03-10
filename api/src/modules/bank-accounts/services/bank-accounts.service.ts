import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../../shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownerhip.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto

    return this.bankAccountRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      }
    })
  }

  async FindManyByUserId(userId: string) {
    const bankAccounts = await this.bankAccountRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });
    
    return bankAccounts.map(({transactions, ...bankAccount}) => {
      const totalTransactions = transactions.reduce((acc, transaction) => (
        acc + (transaction.type === 'INCOME' 
          ? transaction.value 
          : -transaction.value)
        ), 0)
        
      const currentBalance = bankAccount.initialBalance + totalTransactions

      return {
        totalTransactions,
        ...bankAccount,
        currentBalance,
        transactions
      }
    })
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto

    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId)

    return this.bankAccountRepo.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type
      }
    })
  }

  async remove(
    userId: string,
    bankAccountId: string
  ) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId)

    await this.bankAccountRepo.delete({
      where: { id: bankAccountId }
    })

    return null
  }
}
