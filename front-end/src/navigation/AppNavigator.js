
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommandesListScreen from '../screens/CommandesListScreen';
import CommandeDetailScreen from '../screens/CommandeDetailScreen';
import ClientsListScreen from '../screens/ClientsListScreen';
import RappelsPendingScreen from '../screens/RappelsPendingScreen';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../styles/theme';

const Stack = createNativeStackNavigator();

const NavActions = ({ navigation }) => (
  <>
    <TouchableOpacity onPress={() => navigation.navigate('Commandes')}>
      <Text style={{ color: colors.primary, marginRight: 12 }}>Commandes</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Clients')}>
      <Text style={{ color: colors.primary, marginRight: 12 }}>Clients</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('RappelsPending')}>
      <Text style={{ color: colors.primary }}>Rappels</Text>
    </TouchableOpacity>
  </>
);

export const AppNavigator = () => (
  
    <Stack.Navigator>
      <Stack.Screen
        name="Commandes"
        component={CommandesListScreen}
        options={({ navigation }) => ({
          headerRight: () => <NavActions navigation={navigation} />,
          title: 'Commandes',
        })}
      />
      <Stack.Screen name="CommandeDetail" component={CommandeDetailScreen} options={{ title: 'Détail' }} />
      <Stack.Screen
        name="Clients"
        component={ClientsListScreen}
        options={({ navigation }) => ({
          headerRight: () => <NavActions navigation={navigation} />,
          title: 'Clients',
        })}
      />
      <Stack.Screen
        name="RappelsPending"
        component={RappelsPendingScreen}
        options={({ navigation }) => ({
          headerRight: () => <NavActions navigation={navigation} />,
          title: 'Rappels',
        })}
      />
    </Stack.Navigator>
 
);

export default AppNavigator;