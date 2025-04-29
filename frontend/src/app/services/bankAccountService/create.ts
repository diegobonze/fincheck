import { httpCliente } from "../httpClient";

export interface BankAccountParams {
  name: string
  initialBalance: number
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export async function create(params: BankAccountParams) {
  const { data } = await httpCliente.post('/bank-accounts', params)

  return data
}
