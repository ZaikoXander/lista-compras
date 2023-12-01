import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { fetchShoppingLists } from "./requests/shoppingList";

import { getShoppingListTotalValue } from "./utils/getShoppingListTotalValue";
import formatPrice from "./utils/formatPrice";

import type IShoppingList from "./types/IShoppingList";

function PastShoppingCard({ pastShopping }: { pastShopping: IShoppingList }) {
  const { createdAt }: IShoppingList = pastShopping

  const date: string = new Date(createdAt * 1000).toLocaleString()
  const shoppingTotalValue: string | undefined = getShoppingListTotalValue(pastShopping)
  const formattedShoppingListTotalValue: string | undefined =
    shoppingTotalValue ? formatPrice(shoppingTotalValue) : undefined

  return (
    <View style={{ padding: 10, borderBlockColor: 'black', borderWidth: 5, borderRadius: 10 }}>
      <Text>Data: {date}</Text>
      <Text>Total: R$ {formattedShoppingListTotalValue}</Text>
    </View>
  )
}

export default function PastShoppings() {
  const [pastShoppings, setPastShoppings] = useState<IShoppingList[]>()

  useEffect(() => {
    async function loadPastShoppings() {
      const pastShoppings = await fetchShoppingLists()
      setPastShoppings(pastShoppings)
    }

    loadPastShoppings()
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Histórico de compras</Text>
      {
        pastShoppings && pastShoppings.length === 0 ?
          <Text style={{ marginTop: 10 }}>Nenhuma compra registrada</Text>
          : null
      }
      {
        pastShoppings && pastShoppings.length > 0 ?
          (
            <>
              <Text style={{ marginTop: 10 }}>Compras registradas:</Text>
              <Text style={{ marginTop: 10 }}>Total de compras: {pastShoppings.length}</Text>
            </>
          )
          : null
      }
      <View style={{ gap: 10, marginTop: 10 }}>
        {
          pastShoppings ?
            pastShoppings.map((pastShopping) => <PastShoppingCard pastShopping={pastShopping} key={pastShopping.id} />)
            : null
        }
      </View>
    </SafeAreaView>
  )
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
