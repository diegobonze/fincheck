import { Transaction } from "../../../entities/Transaction";
import { httpCliente } from "../httpClient";

type TransactionResponse = Array<Transaction>

export type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpCliente.get<TransactionResponse>('/transactions', {
    params: filters,
  })

  return data
}
