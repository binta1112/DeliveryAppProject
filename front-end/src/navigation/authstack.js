import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../components/auth/LoginPage';
import SignUpPage from '../components/auth/signupPage';
import OnboardingScreen from '../screens/quick_start/welcome2';
import SplashScreen from '../screens/quick_start/splashScreen';
const Stack = createNativeStackNavigator();
export default  function AuthStack() {

    return (
        <Stack.Navigator
         screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
            />
            <Stack.Screen name="Login">
               {
                (props) => {
                    return <LoginPage {...props} />
                }
               }
            </Stack.Screen>
                <Stack.Screen 
                name="SignUp"
                component={SignUpPage}
                />
                
        </Stack.Navigator>
    )

}