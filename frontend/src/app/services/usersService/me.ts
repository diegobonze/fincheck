import { User } from "../../../entities/User";
import { httpCliente } from "../httpClient";

type MeResponse = User
export async function me() {
  const { data } = await httpCliente.get<MeResponse>('/users/me')

  return data
}
