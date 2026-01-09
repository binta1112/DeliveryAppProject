import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/authstack';
import { AppNavigator } from './src/navigation/AppNavigator';
import {  useSelector } from 'react-redux';

export default function AppRootComponent() {
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
        
      {isLoggedIn ? <AppNavigator /> :  <AuthStack/>}
    </NavigationContainer>   
     
  );
}
