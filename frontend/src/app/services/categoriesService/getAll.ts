import { Categorie } from "../../../entities/Categorie";
import { httpCliente } from "../httpClient";

type CategoriesResponse = Array<Categorie>

export async function getAll() {
  const { data } = await httpCliente.get<CategoriesResponse>('/categories')

  return data
}
