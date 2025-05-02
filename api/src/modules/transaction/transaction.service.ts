import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownerhip.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownerhip.service';
import { TrnasactionType } from './entities/Transaction';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService
  ){}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    
    const { 
      bankAccountId,
      categoryId,
      date,
      name,
      value,
      type,
    } = createTransactionDto

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    })
    
    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      }
    })

  }

  findManyByUserId(userId: string, filters: { 
    month: number; 
    year: number; 
    bankAccountId?: string;
    type?: TrnasactionType;
  }) {
    return this.transactionsRepo.findMany({
      where: { 
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lte: new Date(Date.UTC(filters.year, filters.month + 1)),
        }
      },
    })
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { 
      bankAccountId,
      categoryId,
      date,
      name,
      value,
      type
    } = updateTransactionDto

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    })

    await this.validateTransactionOwnership(userId, transactionId)

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    })
  }

  async remove(userId: string, transactionId: string) {

    await this.validateTransactionOwnership(userId, transactionId)

    await this.transactionsRepo.delete({
      where: { id: transactionId },
    })

    return null
  }

  private async validateEntitiesOwnership({ 
    userId, 
    bankAccountId, 
    categoryId 
  }: { 
    userId: string, 
    bankAccountId: string, 
    categoryId: string
  }) {
    await Promise.all([
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId ),
      this.validateCategoryOwnershipService.validate(userId, categoryId )
    ])
  }

  private async validateTransactionOwnership(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: { id: transactionId, userId }
    })

    if(!isOwner) {
      throw new NotFoundException("Transaction not found.");
    }
  }
}
