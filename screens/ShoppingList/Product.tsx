import { Pressable, StyleSheet, Text, View } from "react-native";

import productListStyles from "../ProductList/productListStyles";
import type { ISelectedProduct } from ".";

interface IProductProps {
  product: ISelectedProduct
  removeProduct: (id: string) => void
  hideButtons?: boolean
  showQuantity?: boolean
}

export default function Product({ product, removeProduct, hideButtons, showQuantity }: IProductProps) {
  const { id, name, price, quantity } = product
  const formattedPrice = price.replace('.', ',')

  async function handleRemoveProduct(id: string) {
    removeProduct(id)
  }

  return (
    <View style={styles.productContainer}>
      <View>
        <Text>Nome: {name}</Text>
        <Text>Preço: R$ {formattedPrice}</Text>
        { !showQuantity && <Text>Quantidade: {quantity}</Text> }
      </View>
      {
        !hideButtons &&
        <Pressable onPress={() => handleRemoveProduct(id)} style={[styles.removeButton, { justifyContent: "center" }]}>
          <Text style={productListStyles.buttonText}>Remover</Text>
        </Pressable>
      }
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