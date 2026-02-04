import React, { lazy } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const SellerDashboardScreen = lazy(() => import('../screens/seller/SellerDashboardScreen'));
const SellerCommandesStack = lazy(() => import('./sellerCommandesStack'));
const ClientsListScreen = lazy(() => import('../screens/ClientsListScreen'));
const SellerDemandesStack = lazy(() => import('./sellerDemandesStack'));
const SellerProfileScreen = lazy(() => import('../screens/seller/SellerProfileScreen'));

const Tab = createBottomTabNavigator();

export default function SellerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Commandes') iconName = focused ? 'clipboard' : 'clipboard-outline';
          else if (route.name === 'Clients') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Demandes') iconName = focused ? 'car' : 'car-outline';
          else if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF9955',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
      <Tab.Screen name="Commandes" component={SellerCommandesStack} options={{ headerShown: false }} />
      <Tab.Screen name="Clients" component={ClientsListScreen} />
      <Tab.Screen name="Demandes" component={SellerDemandesStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profil" component={SellerProfileScreen} />
    </Tab.Navigator>
  );
}