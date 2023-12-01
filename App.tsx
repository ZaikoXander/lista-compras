import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductList from './screens/ProductList';
import ProductEditor from './screens/ProductEditor';
import ShoppingList from './screens/ShoppingList';
import LastShoppingList from './screens/LastShoppingList';

import type TRootStackParamList from './screens/types/TRootStackParamList';

const Drawer = createDrawerNavigator<TRootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Última compra">
        <Drawer.Screen name="Lista de produtos" component={ProductList} />
        <Drawer.Screen name="Criar/Editar produto" component={ProductEditor} initialParams={
          {
            mode: 'create',
            updateListListener: () => {}
          }
        } />
        <Drawer.Screen name="Lista de compras" component={ShoppingList} />
        <Drawer.Screen name="Última compra" component={LastShoppingList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
