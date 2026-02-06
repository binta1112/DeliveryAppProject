import React, { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ClientsListScreen = lazy(() => import('../screens/ClientsListScreen'));
const ClientDetailScreen = lazy(() => import('../screens/ClientDetailScreen'));

const Stack = createNativeStackNavigator();

export default function SellerClientsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClientsList" component={ClientsListScreen} options={{ title: 'Clients' }} />
      <Stack.Screen name="ClientDetail" component={ClientDetailScreen} options={{ title: 'Client' }} />
    </Stack.Navigator>
  );
}