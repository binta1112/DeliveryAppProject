import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/authScreens/LoginPage';
import OnboardingScreen from '../screens/quick_start/welcome2';
import SplashScreen from '../screens/quick_start/splashScreen';
import RoleSelectionScreen from '../screens/authScreens/roleSelectionScreen';
import CourierDetailsScreen from '../screens/authScreens/CourierDetailsSreen';
import SignUpPage from '../screens/authScreens/signupPage';
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
            <Stack.Screen
              name="CourierDetails"
              component={CourierDetailsScreen}
            />
            <Stack.Screen 
              name="RoleSelection"
              component={RoleSelectionScreen}
            />
                
        </Stack.Navigator>
    )

}