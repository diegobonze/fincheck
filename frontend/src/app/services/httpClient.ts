import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

export const httpCliente = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

httpCliente.interceptors.request.use(async config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACESS_TOKEN)

  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

httpCliente.interceptors.response.use(async data => {
  await sleep(500)

  return data
})
