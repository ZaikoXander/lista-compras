import { useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Pressable, SafeAreaView, View } from "react-native";

import api from "../../api";

import Product from "./Product";

import productListStyles from "./productListStyles";

import type { StackNavigationProp } from "@react-navigation/stack";
import type IProduct from "./types/IProduct";
import type TRootStackParamList from "../types/TRootStackParamList";

interface IProductListProps {
  navigation: StackNavigationProp<TRootStackParamList, 'Lista de produtos'>
}

export default function ProductList({ navigation }: IProductListProps) {
  const [products, setProducts] = useState<IProduct[]>([])

  async function loadProducts() {
    const { data: loadedProducts } = await api.get('/product')
    
    setProducts(loadedProducts)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleAddProduct() {
    navigation.navigate('Criar/Editar produto', {
      mode: 'create',
      updateListListener: loadProducts
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de produtos</Text>
      <View>
        <FlatList
          data={products}
          renderItem={
            ({ item }) => (
              <Product navigation={navigation} product={item} updateListListener={loadProducts} />
            )
          }
          keyExtractor={(item) => item.id}
        />
      </View>
      <Pressable onPress={handleAddProduct} style={styles.addButton}>
        <Text style={productListStyles.buttonText}>Adicionar Produto</Text>
      </Pressable>
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
  },
  addButton: {
    backgroundColor: 'lightgreen',
    marginTop: 10,
    ...productListStyles.button,
  }
});
