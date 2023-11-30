import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductList from './screens/ProductList';
import ProductEditor from './screens/ProductEditor';
import ShoppingList from './screens/ShoppingList';

import type TRootStackParamList from './screens/types/TRootStackParamList';
import LastShoppingList from './screens/LastShoppingList';

const Stack = createStackNavigator<TRootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Última compra">
        <Stack.Screen name="Lista de produtos" component={ProductList} />
        <Stack.Screen name="Criar/Editar produto" component={ProductEditor} />
        <Stack.Screen name="Lista de compras" component={ShoppingList} />
        <Stack.Screen name="Última compra" component={LastShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
