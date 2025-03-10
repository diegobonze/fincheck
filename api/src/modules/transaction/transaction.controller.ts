import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, Query, ParseIntPipe, ParseEnumPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { OptionalParseUUIDPipe } from '../../shared/pipes/OptinalParseUUIDPipe';
import { TrnasactionType } from './entities/Transaction';
import { OptinalParseEnumPipe } from '../../shared/pipes/OptinalParseEnumPipe copy';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptinalParseEnumPipe(TrnasactionType)) type?: TrnasactionType,
  ) {
    return this.transactionService.findManyByUserId(userId, { month, year, bankAccountId, type });
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionService.update(
      userId, 
      transactionId, 
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionService.remove(userId, transactionId);
  }
}
