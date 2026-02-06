import React, { lazy } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const CourierDemandesScreen = lazy(() => import('../screens/courier/CourierDemandesScreen'));
const CourierPropositionsScreen = lazy(() => import('../screens/courier/CourierPropositionsScreen'));
const CourierProfileScreen = lazy(() => import('../screens/courier/CourierProfileScreen'));
const NotificationsScreen = lazy(() => import('../screens/NotificationsScreen'));

const Tab = createBottomTabNavigator();

export default function CourierTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Demandes') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Propositions') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'Notifications') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF9955',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Demandes" component={CourierDemandesScreen} />
      <Tab.Screen name="Propositions" component={CourierPropositionsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profil" component={CourierProfileScreen} />
    </Tab.Navigator>
  );
}