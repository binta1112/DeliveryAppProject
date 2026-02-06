import React, { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const CommandesListScreen = lazy(() => import('../screens/CommandesListScreen'));
const CommandeDetailScreen = lazy(() => import('../screens/CommandeDetailScreen'));

const Stack = createNativeStackNavigator();

export default function SellerCommandesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Commandes" component={CommandesListScreen} options={{ title: 'Commandes' }} />
      <Stack.Screen name="CommandeDetail" component={CommandeDetailScreen} options={{ title: 'Détail' }} />
      <Stack.Screen name="TrackingScreen" component={lazy(() => import('../screens/seller/TrackingScreen'))} options={{ title: 'Suivi du livreur' }} />
      <Stack.Screen name="DetailLivreurScreen" component={lazy(() => import('../screens/courier/PublicProfile'))} options={{ title: 'Détails du livreur' }} />
    </Stack.Navigator>
  );
}