import React, { useMemo, Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './authstack';
import AppTabs from './appTabs';
import FirstTimeScreen from '../screens/FirstTimeScreen';
import { useAppSelector } from '../hooks/useAppSelector';
import ScreenLoader from '../components/ScreenLoader';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, firstTime } = useAppSelector((s) => s.auth);

  const initialRoute = useMemo(() => {
    if (!isLoggedIn) return 'Auth';
    if (firstTime) return 'FirstTime';
    return 'Main';
  }, [isLoggedIn, firstTime]);

  return (
    <Suspense fallback={<ScreenLoader />}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        {!isLoggedIn ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            {firstTime && <Stack.Screen name="FirstTime" component={FirstTimeScreen} />}
            <Stack.Screen name="Main" component={AppTabs} />
          </>
        )}
      </Stack.Navigator>
    </Suspense>
  );
}