import { httpCliente } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  acessToken: string
}

export async function signup(params: SignupParams) {
  const { data } = await httpCliente.post<SignupResponse>('/auth/signup', params)

  return data
}
