import React, { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SellerDemandesScreen = lazy(() => import('../screens/seller/SellerDemandesScreen'));
const SellerDemandeDetailScreen = lazy(() => import('../screens/seller/SellerDemandeDetailScreen'));

const Stack = createNativeStackNavigator();

export default function SellerDemandesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DemandesList" component={SellerDemandesScreen} options={{ title: 'Demandes' }} />
      <Stack.Screen name="DemandeDetail" component={SellerDemandeDetailScreen} options={{ title: 'Détail' }} />
    </Stack.Navigator>
  );
}