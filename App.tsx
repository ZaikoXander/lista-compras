import { useEffect, useRef, useState } from 'react'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ProductList from './screens/ProductList'
import ProductEditor from './screens/ProductEditor'
import ShoppingList from './screens/ShoppingList'
import LastShoppingList from './screens/LastShoppingList'
import PastShoppings from './screens/PastShoppings'

import type TRootStackParamList from './screens/types/TRootStackParamList'

const Tab = createMaterialTopTabNavigator<TRootStackParamList>()

type TScreenName = "Lista de produtos" | "Criar/Editar produto" | "Lista de compras" | "Última compra" | "Histórico de compras"

export default function App() {
  const [lastScreenVisited, setLastScreenVisited] = useState<TScreenName>()

  useEffect(() => {
    async function loadLastScreenVisited(): Promise<void> {
      try {
        const lastScreenVisited: TScreenName | null = await AsyncStorage.getItem('lastScreenVisited') as TScreenName | null
        if (lastScreenVisited !== null) {
          setLastScreenVisited(lastScreenVisited)
        } else {
          setLastScreenVisited('Lista de compras')
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadLastScreenVisited()
  }, [])

  const navigationRef = useRef<NavigationContainerRef<TRootStackParamList>>(null)

  function getActiveRouteName(state: any): string {
    const route = state.routes[state.index];
  
    if (route.state) {
      return getActiveRouteName(route.state);
    }
  
    return route.name;
  }

  useEffect(() => {
    async function saveActualLastScreenVisited() {
      if (navigationRef.current) {
        const state = navigationRef.current.getRootState();

        const currentRouteName = getActiveRouteName(state);
        await AsyncStorage.setItem('lastScreenVisited', currentRouteName);
      }
    }

    saveActualLastScreenVisited()
  }, []);

  useEffect(() => {
    async function setLastScreenVisitedListener() {
      const unsubscribe = navigationRef.current?.addListener('state', async () => {
        const state = navigationRef.current?.getRootState();
        const currentRouteName = getActiveRouteName(state);
        await AsyncStorage.setItem('lastScreenVisited', currentRouteName);
      });

      return unsubscribe;
    }

    setLastScreenVisitedListener()
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {
        lastScreenVisited &&
        <Tab.Navigator initialRouteName={lastScreenVisited}>
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
      }
    </NavigationContainer>
  )
}
