import { BankAccount } from "../../../entities/BankAccount";
import { httpCliente } from "../httpClient";

type BankAccountsResponse = Array<BankAccount>

export async function getAll() {
  const { data } = await httpCliente.get<BankAccountsResponse>('/bank-accounts')

  return data
}
