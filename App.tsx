import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ProductList from './screens/ProductList'
import ProductEditor from './screens/ProductEditor'
import ShoppingList from './screens/ShoppingList'
import LastShoppingList from './screens/LastShoppingList'
import PastShoppings from './screens/PastShoppings'

import type TRootStackParamList from './screens/types/TRootStackParamList'

const Tab = createMaterialTopTabNavigator<TRootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Lista de compras">
        <Tab.Screen name="Lista de produtos" component={ProductList} />
        <Tab.Screen name="Criar/Editar produto" component={ProductEditor} initialParams={
          {
            mode: 'create',
            updateListListener: () => {}
          }
        } />
        <Tab.Screen name="Lista de compras" component={ShoppingList} />
        <Tab.Screen name="Última compra" component={LastShoppingList} />
        <Tab.Screen name="Histórico de compras" component={PastShoppings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
