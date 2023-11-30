import React, { useState } from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, TextInput, View } from 'react-native';

import api from '../api';

import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type TRootStackParamList from './types/TRootStackParamList';
import type IProduct from './ProductList/types/IProduct';

interface IProductEditorProps {
  route: RouteProp<TRootStackParamList, 'Criar/Editar produto'>
  navigation: StackNavigationProp<TRootStackParamList, 'Criar/Editar produto'>
}

const ProductEditor = ({ route, navigation }: IProductEditorProps) => {
  const { product, mode, updateListListener } = route.params;
  const [productData, setProductData] = useState<IProduct>(product || { id: '', name: '', price: '' });
  const { name, price } = productData

  async function handleSave() {
    if (mode === 'edit') {
      await api.put(`/product/${productData.id}`, productData)
    } else if (mode === 'create') {
      await api.post('/product', productData)
    }

    updateListListener();
    navigation.navigate('Lista de produtos');
  }

  const title = {
    edit: 'Editar produto',
    create: 'Adicionar produto',
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{ title[mode] }</Text>

      <View>
        <Text style={[styles.label, styles.inputLabel]}>Nome do produto:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setProductData({ ...productData, name: text })}
          placeholder='Coca Cola 3L'
          placeholderTextColor={'gray'}
        />
      </View>

      <View>
        <Text style={[styles.label, styles.inputLabel]}>Preço do produto:</Text>
        <TextInput
          style={styles.input}
          value={ price.length === 0 ? price : `R$ ${price.replace('.', ',')}` }
          onChangeText={(price) => {
            const validatedPrice = price.replace('R$ ', '').replace(',', '.')
            setProductData({ ...productData, price: validatedPrice })
          }}
          inputMode='numeric'
          placeholder='R$ 14,39'
          placeholderTextColor={'gray'}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: 'lightcoral' }]}
          onPress={() => navigation.navigate('Lista de produtos')}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: 'lightgreen' }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputLabel: {
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ProductEditor
