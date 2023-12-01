import type { ISelectedProduct } from "../ShoppingList"

export default interface IShoppingList {
  id: string
  products: ISelectedProduct[]
  createdAt: number
}