import { httpCliente } from "../httpClient";

export interface CreateBankAccountParams {
  name: string
  initialBalance: number
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export async function create(params: CreateBankAccountParams) {
  const { data } = await httpCliente.post('/bank-accounts', params)

  return data
}
