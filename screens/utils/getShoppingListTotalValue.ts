import type IShoppingList from "../types/IShoppingList"

export function getShoppingListTotalValue(shoppingList: IShoppingList | undefined): string | undefined {
  const shoppingListTotal: number | undefined = shoppingList?.products.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
  const shoppingListTotalToString: string | undefined = shoppingListTotal?.toFixed(2)

  return shoppingListTotalToString
}