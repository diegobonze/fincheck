import { httpCliente } from "../httpClient";

export async function remove(transactionId: string) {
  const { data } = await httpCliente.delete(`/transactions/${transactionId}`)

  return data
}
