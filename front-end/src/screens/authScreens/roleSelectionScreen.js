import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Store, Truck } from 'lucide-react-native';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/slices/authSlice';

export default function RoleSelectionScreen(props) {
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);

  const { Register } = useAuth();
  const dispatch = useDispatch();

  const handleContinue = useCallback(async () => {
    if (!selectedRole) return;

    const fullName = props.route.params.fullName || '';
    const parts = fullName.trim().split(/\s+/);
    const prenom = parts[0] || '';
    const nom = parts.slice(1).join(' ') || '';

    if (selectedRole === 'courier') {
      props.navigation.navigate('CourierDetails', {
        nom,
        prenom,
        email: props.route.params.email,
        password: props.route.params.password,
        role: 'courier',
      });
      return;
    }

    setLoading(true);
    try {
      const user = {
        nom,
        prenom,
        email: props.route.params.email,
        password: props.route.params.password,
        role: 'seller',
      };
      await Register(user);

      dispatch(setAuthUser({ role: 'seller', firstTime: true }));
      
      const rootNav = props.navigation.getParent();
      rootNav?.reset({
        index: 0,
        routes: [{ name: 'FirstTime' }],
      });
    } finally {
      setLoading(false);
    }
  }, [Register, dispatch, props, selectedRole]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>Select how you want to use the app</Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === 'seller' && styles.roleCardSelected]}
            onPress={() => setSelectedRole('seller')}
          >
            <View style={[styles.iconContainer, selectedRole === 'seller' && styles.iconContainerSelected]}>
              <Store size={48} color={selectedRole === 'seller' ? '#FFFFFF' : '#FF9955'} />
            </View>
            <Text style={styles.roleTitle}>Commerçant</Text>
            <Text style={styles.roleDescription}>Gérez vos commandes, clients et demandes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleCard, selectedRole === 'courier' && styles.roleCardSelected]}
            onPress={() => setSelectedRole('courier')}
          >
            <View style={[styles.iconContainer, selectedRole === 'courier' && styles.iconContainerSelected]}>
              <Truck size={48} color={selectedRole === 'courier' ? '#FFFFFF' : '#FF9955'} />
            </View>
            <Text style={styles.roleTitle}>Livreur</Text>
            <Text style={styles.roleDescription}>Consultez les demandes et proposez un prix</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !selectedRole && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedRole || loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Chargement...' : 'Continuer'}
          </Text>
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
  roleCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 3, borderColor: 'transparent' },
  roleCardSelected: { borderColor: '#FFD700', backgroundColor: '#FFF9F0' },
  iconContainer: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#FFF0E5', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  iconContainerSelected: { backgroundColor: '#FF9955' },
  roleTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  roleDescription: { textAlign: 'center', color: '#666', marginBottom: 16 },
  continueButton: { backgroundColor: '#FFF', borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 16 },
  continueButtonDisabled: { opacity: 0.5 },
  continueButtonText: { color: '#FF9955', fontWeight: '700', fontSize: 16 },
});