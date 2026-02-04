import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Camera, X } from 'lucide-react-native';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/slices/authSlice';

const TRANSPORT_TYPES = [
  { id: 'moto', label: 'Moto' },
  { id: 'voiture', label: 'Voiture' },
  { id: 'velo', label: 'Vélo' },
  { id: 'scooter', label: 'Scooter' },
];

export default function DeliveryDetailsScreen({ navigation, route }) {
  const { Register } = useAuth();
  const dispatch = useDispatch();

  const [transportType, setTransportType] = useState('');
  const [vehicleRegistration, setVehicleRegistration] = useState('');
  const [vehicleImages, setVehicleImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeImage = (index) => {
    setVehicleImages(vehicleImages.filter((_, i) => i !== index));
  };

  const completeRegistration = useCallback(async () => {
    setLoading(true);
    try {
      const user = {
        nom: route.params?.nom,
        prenom: route.params?.prenom,
        email: route.params?.email,
        password: route.params?.password,
        role: 'courier',
      };
      await Register(user);

      dispatch(setAuthUser({ role: 'courier', firstTime: true }));
      
      const rootNav = navigation.getParent();
      rootNav?.reset({
        index: 0,
        routes: [{ name: 'FirstTime' }],
      });
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  }, [Register, dispatch, navigation, route.params]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Détails Livreur</Text>
        <Text style={styles.subtitle}>Complétez votre profil (optionnel)</Text>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Type de transport</Text>

          <View style={styles.transportGrid}>
            {TRANSPORT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.transportCard, transportType === type.id && styles.transportCardSelected]}
                onPress={() => setTransportType(type.id)}
              >
                <Text style={[styles.transportLabel, transportType === type.id && styles.transportLabelSelected]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Matricule</Text>
          <TextInput style={styles.input} placeholder="Ex: AB-123-CD" value={vehicleRegistration} onChangeText={setVehicleRegistration} />

          <Text style={styles.label}>Photos du véhicule</Text>
          <View style={styles.imagesContainer}>
            {vehicleImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                  <X size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addImageButton}>
              <Camera size={32} color="#FF9955" />
              <Text style={styles.addImageText}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={completeRegistration} disabled={loading}>
            <Text style={styles.continueButtonText}>{loading ? 'Chargement...' : 'Terminer'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF9955' },
  scrollContent: { padding: 24, paddingTop: 60 },
  title: { fontSize: 36, color: '#FFF', textAlign: 'center', fontWeight: '700' },
  subtitle: { color: '#FFD4B3', textAlign: 'center', marginBottom: 32 },
  formContainer: { backgroundColor: '#FFF', borderRadius: 24, padding: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  transportGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  transportCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#F8F8F8' },
  transportCardSelected: { borderColor: '#FF9955', borderWidth: 2, backgroundColor: '#FFF0E5' },
  transportLabel: { fontWeight: '600', color: '#666' },
  transportLabelSelected: { color: '#FF9955' },
  label: { marginTop: 12, fontWeight: '600' },
  input: { backgroundColor: '#F8F8F8', borderRadius: 12, padding: 16 },
  imagesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  image: { width: 100, height: 100, borderRadius: 12 },
  imageWrapper: { position: 'relative' },
  removeButton: { position: 'absolute', top: -8, right: -8, backgroundColor: '#FF5555', borderRadius: 12, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  addImageButton: { width: 100, height: 100, borderWidth: 2, borderStyle: 'dashed', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  addImageText: { marginTop: 6, color: '#FF9955', fontWeight: '600' },
  continueButton: { backgroundColor: '#FF9955', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  continueButtonText: { color: '#FFF', fontWeight: '700' },
});