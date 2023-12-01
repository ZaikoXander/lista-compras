import { useEffect, useState } from "react"
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"

import api from "../../api"

import Product from "./Product"

import type IProduct from "../ProductList/types/IProduct"

export interface ISelectedProduct extends IProduct {
  quantity: number
}

export default function ShoppingList() {
  const [products, setProducts] = useState<ISelectedProduct[]>([])
  const [availableProducts, setAvailableProducts] = useState<ISelectedProduct[]>([])

  function handleAddProduct(product: ISelectedProduct) {
    const productIndex = products.findIndex((p) => p.id === product.id)

    if (productIndex === -1) {
      setProducts([...products, { ...product, quantity: 1 }])
      return
    }

    const modifiedProduct = products[productIndex]
    modifiedProduct.quantity += 1

    setProducts([...products.slice(0, productIndex), modifiedProduct, ...products.slice(productIndex + 1)])
  }

  function handleRemoveProduct(id: string) {
    const filteredProducts = products.filter((product) => product.id !== id)

    setProducts(filteredProducts)
  }

  function updateProductQuantity(id: string, operation: string) {
    const productIndex = products.findIndex((p) => p.id === id)
    const modifiedProduct = products[productIndex]

    switch (operation) {
      case '+':
        modifiedProduct.quantity += 1

        break
      case '-':
        modifiedProduct.quantity -= 1

        break
    }

    if (modifiedProduct.quantity === 0) {
      setProducts([...products.slice(0, productIndex), ...products.slice(productIndex + 1)])
      return
    }

    setProducts([...products.slice(0, productIndex), modifiedProduct, ...products.slice(productIndex + 1)])
  }

  async function saveShoppingList() {
    await api.post('/shoppingList', { products })

    setProducts([])
  }

  useEffect(() => {
    async function loadAvailableProducts() {
      const { data: loadedAvailableProducts } = await api.get('/product')
  
      setAvailableProducts(loadedAvailableProducts)
    }

    loadAvailableProducts()
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 40 }}>

        <View style={{ borderBlockColor: 'gray', borderWidth: 3, padding: 10 }}>
          <Text style={styles.title}>Lista de compras</Text>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ gap: 4 }}>
                  <Pressable
                    style={{ padding: 2, backgroundColor: 'lightgreen', borderRadius: 4 }}
                    onPress={() => updateProductQuantity(item.id, '+')}
                  >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> + </Text>
                  </Pressable>
                  <Pressable
                    style={{ padding: 2, backgroundColor: 'lightcoral', borderRadius: 4 }}
                    onPress={() => updateProductQuantity(item.id, '-')}
                  >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> - </Text>
                  </Pressable>
                </View>
                <Product
                  product={item}
                  removeProduct={handleRemoveProduct}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
            <Pressable
              style={{ backgroundColor: 'lightcoral', borderRadius: 4, marginTop: 40, padding: 10 }}
              onPress={() => setProducts([])}
            >
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Limpar lista</Text>
            </Pressable>
            <Pressable
              style={{ backgroundColor: 'lightgreen', borderRadius: 4, marginTop: 40, padding: 10 }}
              onPress={saveShoppingList}
            >
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Completar lista</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={[styles.title, { fontSize: 15 }]}>Produtos disponíveis</Text>
          <FlatList
            data={availableProducts}
            renderItem={({ item }) => (
              <>
                <Product
                  product={item}
                  removeProduct={handleRemoveProduct}
                  hideButtons
                  showQuantity
                />
                <Pressable
                  style={{ padding: 10, borderRadius: 5, backgroundColor: 'lightblue' }}
                  onPress={() => handleAddProduct(item)}
                >
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Adicionar na lista</Text>
                </Pressable>
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

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