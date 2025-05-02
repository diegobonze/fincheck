import { httpCliente } from "../httpClient";

export async function remove(bankAccountId: string) {
  const { data } = await httpCliente.delete(`/bank-accounts/${bankAccountId}`)

  return data
}
