import { Pressable, StyleSheet, Text, View } from "react-native";

import api from "../../api"

import type IProduct from "./types/IProduct"
import type { StackNavigationProp } from "@react-navigation/stack"
import type TRootStackParamList from "../types/TRootStackParamList"

import productListStyles from "./productListStyles"

interface IProductProps {
  navigation: StackNavigationProp<TRootStackParamList, 'Lista de produtos'>
  product: IProduct
  updateListListener: () => void
}

export default function Product({ navigation, product, updateListListener }: IProductProps) {
  const formattedPrice = product.price.replace('.', ',')

  async function handleEditProduct() {
    navigation.navigate('Criar/Editar produto', {
      product,
      mode: 'edit',
      updateListListener
    });
  }

  async function handleRemoveProduct(id: string) {
    await api.delete(`/product/${id}`)

    updateListListener()
  }

  return (
    <View style={styles.productContainer}>
      <View>
        <Text>Produto: {product.name}</Text>
        <Text>Preço: R$ {formattedPrice}</Text>
      </View>
      <Pressable onPress={() => handleEditProduct()} style={styles.editButton}>
        <Text style={productListStyles.buttonText}>Editar</Text>
      </Pressable>
      <Pressable onPress={() => handleRemoveProduct(product.id)} style={styles.removeButton}>
        <Text style={productListStyles.buttonText}>Remover</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: 'lightblue',
    ...productListStyles.button,
  },
  removeButton: {
    backgroundColor: 'lightcoral',
    ...productListStyles.button,
  }
});