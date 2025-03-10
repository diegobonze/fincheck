import { IsNotEmpty, IsNumber, IsString, IsEnum, IsUUID, IsPositive, IsDateString } from 'class-validator';
import { TrnasactionType } from '../entities/Transaction';
export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number

  @IsNotEmpty()
  @IsDateString()
  date: string

  @IsNotEmpty()
  @IsEnum(TrnasactionType)
  type: TrnasactionType
}
