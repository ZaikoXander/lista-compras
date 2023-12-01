import api from "../../api"

import type IShoppingList from "../types/IShoppingList"

export async function fetchShoppingLists(): Promise<IShoppingList[]> {
  const { data: shoppingLists } = await api.get<IShoppingList[]>('/shoppingList')

  return shoppingLists
}
