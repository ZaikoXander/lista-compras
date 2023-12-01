import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import api from "../api";

import type { ISelectedProduct } from "./ShoppingList";

interface IShoppingList {
  id: string
  products: ISelectedProduct[]
  createdAt: number
}

export default function LastShoppingList() {
  const [lastShoppingList, setLastShoppingList] = useState<IShoppingList>()

  async function fetchShoppingLists(): Promise<IShoppingList[]> {
    const { data: shoppingLists } = await api.get<IShoppingList[]>('/shoppingList')

    return shoppingLists
  }

  async function getLastShoppingList(): Promise<void> {
    const shoppingLists: IShoppingList[] = await fetchShoppingLists()
    const dateSortedShoppingLists: IShoppingList[] = shoppingLists.sort((a, b) => b.createdAt - a.createdAt)
    const mostRecentShoppingList: IShoppingList = dateSortedShoppingLists[0]

    setLastShoppingList(mostRecentShoppingList)
  }

  useEffect(() => {
    getLastShoppingList()
  }, [])

  function getLastShoppingListTotal(): string | undefined {
    const lastShoppingListTotal: number | undefined = lastShoppingList?.products.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    const lastShoppingListTotalToString: string | undefined = lastShoppingListTotal?.toFixed(2)

    return lastShoppingListTotalToString
  }

  function formatPrice(price: string): string {
    return price.replace('.', ',')
  }

  const lastShoppingListTotal: string | undefined = getLastShoppingListTotal()
  const formattedLastShoppingListTotal: string | undefined = lastShoppingListTotal ? formatPrice(lastShoppingListTotal) : undefined
  const lastShoppingListLocaleDateString: string | undefined =
    lastShoppingList ? new Date((lastShoppingList.createdAt * 1000)).toLocaleString() : undefined

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { marginBottom: 10 }]}>Última compra</Text>
      <View style={{ gap: 10 }}>
        {
          lastShoppingList?.products.map(({ id, name, price, quantity }) => {
            const formattedPrice = formatPrice(price)

            return (
              <View key={id}>
                <Text>Produto: {name}</Text>
                <Text>Preço: R$ {formattedPrice}</Text>
                <Text>Quantidade: {quantity}</Text>
              </View>
            )
          })
        }
      </View>
      <View style={{ marginTop: 30, }}>
        {
          lastShoppingListLocaleDateString ?
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>Data: {lastShoppingListLocaleDateString}</Text>
            : null
        }
        {
          formattedLastShoppingListTotal ?
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>Total: R$ {formattedLastShoppingListTotal}</Text>
            : null
        }
      </View>
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
