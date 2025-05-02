import { httpCliente } from "../httpClient";

export interface CreateTransactionParams {
  categoryId: string
  bankAccountId: string
  name: string
  value: number
  date: string
  type: 'INCOME' | 'EXPENSE'
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpCliente.post('/transactions', params)

  return data
}
