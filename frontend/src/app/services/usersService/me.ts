import { httpCliente } from "../httpClient";

interface MeResponse {
  email: string;
  password: string;
}
export async function me() {
  const { data } = await httpCliente.get<MeResponse>('/users/me')

  return data
}
