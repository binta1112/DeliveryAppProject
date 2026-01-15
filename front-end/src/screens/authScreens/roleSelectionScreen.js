import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Store, Truck } from 'lucide-react-native';

import useAuth from '../../hooks/useAuth';

export default function RoleSelectionScreen(props) {
    console.log('Props received in RoleSelectionScreen:', props);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);

  const { Register } = useAuth();

  const handleContinue = async () => {
    console.log('Selected Role:', selectedRole);
    if (!selectedRole) return;

    if (selectedRole === 'courier') {    

      props.navigation.navigate('CourierDetails', {
       nom: props.route.params.fullName,
       prenom: '####',
       email: props.route.params.email,
       password: props.route.params.password,
       role: 'courier',
      } );
    } else {
      

      try {
        setLoading(true);
        const user = {
          nom: props.route.params.fullName,
          prenom: '####',
          email: props.route.params.email,
          password: props.route.params.password,
          role: 'seller',
        };
        const response = await Register(user);
        console.log('Registration successful for seller:', response);
        // Navigate to the next screen or show success message
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you want to use the app
        </Text>

        <View style={styles.cardsContainer}>
          {/* SELLER */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'seller' && styles.roleCardSelected,
            ]}
            onPress={() => setSelectedRole('seller')}
          >
            <View
              style={[
                styles.iconContainer,
                selectedRole === 'seller' && styles.iconContainerSelected,
              ]}
            >
              <Store
                size={48}
                color={selectedRole === 'seller' ? '#FFFFFF' : '#FF9955'}
              />
            </View>

            <Text style={styles.roleTitle}>Commerçant</Text>
            <Text style={styles.roleDescription}>
              Gérez vos commandes, suivez vos ventes et organisez vos livraisons
            </Text>

            <View
              style={[
                styles.radioButton,
                selectedRole === 'seller' && styles.radioButtonSelected,
              ]}
            >
              {selectedRole === 'seller' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>

          {/* COURIER */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'courier' && styles.roleCardSelected,
            ]}
            onPress={() => setSelectedRole('courier')}
          >
            <View
              style={[
                styles.iconContainer,
                selectedRole === 'courier' && styles.iconContainerSelected,
              ]}
            >
              <Truck
                size={48}
                color={selectedRole === 'courier' ? '#FFFFFF' : '#FF9955'}
              />
            </View>

            <Text style={styles.roleTitle}>Livreur</Text>
            <Text style={styles.roleDescription}>
              Acceptez des courses, effectuez des livraisons et gagnez de l'argent
            </Text>

            <View
              style={[
                styles.radioButton,
                selectedRole === 'courier' && styles.radioButtonSelected,
              ]}
            >
              {selectedRole === 'courier' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole || loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Chargement...' : 'Continuer'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF9955' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontSize: 36, fontWeight: '700', color: '#FFF', textAlign: 'center' },
  subtitle: { color: '#FFD4B3', textAlign: 'center', marginBottom: 40 },
  cardsContainer: { gap: 20, marginBottom: 32 },
  roleCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  roleCardSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#FFF9F0',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerSelected: { backgroundColor: '#FF9955' },
  roleTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  roleDescription: { textAlign: 'center', color: '#666', marginBottom: 16 },
  radioButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: { borderColor: '#FF9955' },
  radioButtonInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF9955',
  },
  continueButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: { opacity: 0.5 },
  continueButtonText: {
    color: '#FF9955',
    fontWeight: '700',
    fontSize: 16,
  },
  backButtonText: { color: '#FFF', textAlign: 'center', fontSize: 16 },
});
