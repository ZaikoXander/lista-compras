import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import api from "../api";

import type { ISelectedProduct } from "./ShoppingList";

interface IShoppingList {
  id: string
  products: ISelectedProduct[]
  createdAt: Date
}

export default function LastShoppingList() {
  const [lastShoppingList, setLastShoppingList] = useState<IShoppingList>()

  async function fetchShoppingLists(): Promise<IShoppingList[]> {
    const { data: shoppingLists } = await api.get<IShoppingList[]>('/shoppingList')

    return shoppingLists
  }

  async function getLastShoppingList() {
    const shoppingLists = await fetchShoppingLists()

    const dateSortedShoppingLists = shoppingLists.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const mostRecentShoppingList = dateSortedShoppingLists[0]

    setLastShoppingList(mostRecentShoppingList)
  }

  useEffect(() => {
    getLastShoppingList()
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Última compra</Text>
      {
        lastShoppingList?.products.map((product) => {
          const formattedPrice = product.price.replace('.', ',')

          return (
            <Text key={product.id}>{product.name} - R$ {formattedPrice} - {product.quantity}</Text>
          )
        })
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'blue',
  }
})
