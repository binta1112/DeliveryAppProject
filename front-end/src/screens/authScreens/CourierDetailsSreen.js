import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Camera, X } from 'lucide-react-native';

const TRANSPORT_TYPES = [
  { id: 'moto', label: 'Moto' },
  { id: 'voiture', label: 'Voiture' },
  { id: 'velo', label: 'Vélo' },
  { id: 'scooter', label: 'Scooter' },
];

export default function DeliveryDetailsScreen({ navigation, ...props }) {
  const { fullName, email, password, role } = props;

  const [transportType, setTransportType] = useState('');
  const [vehicleRegistration, setVehicleRegistration] = useState('');
  const [vehicleImages, setVehicleImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = () => {
    Alert.alert(
      'Ajouter une photo',
      'Cette fonctionnalité nécessite les permissions camera/galerie',
      [{ text: 'OK' }]
    );
  };

  const removeImage = (index) => {
    setVehicleImages(vehicleImages.filter((_, i) => i !== index));
  };

  const handleSkip = async () => {
    await completeRegistration({});
  };

  const handleContinue = async () => {
    if (!transportType) {
      Alert.alert(
        'Information requise',
        'Veuillez sélectionner un type de transport'
      );
      return;
    }

    await completeRegistration({
      transportType,
      vehicleRegistration,
      vehicleImages,
    });
  };

  const completeRegistration = async (deliveryData) => {
    setLoading(true);
    try {
      // Appel API ici
      console.log(deliveryData);
    } catch (error) {
      Alert.alert('Erreur', error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.title}>Détails Livreur</Text>
        <Text style={styles.subtitle}>Complétez votre profil (optionnel)</Text>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Type de transport</Text>
          <Text style={styles.sectionSubtitle}>
            Sélectionnez votre moyen de transport
          </Text>

          <View style={styles.transportGrid}>
            {TRANSPORT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.transportCard,
                  transportType === type.id && styles.transportCardSelected,
                ]}
                onPress={() => setTransportType(type.id)}
              >
                <Text
                  style={[
                    styles.transportLabel,
                    transportType === type.id && styles.transportLabelSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Matricule du véhicule</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: AB-123-CD"
            value={vehicleRegistration}
            onChangeText={setVehicleRegistration}
            autoCapitalize="characters"
          />

          <Text style={styles.label}>Photos du véhicule</Text>
          <Text style={styles.helperText}>
            Ajoutez des photos de votre véhicule pour rassurer les clients
          </Text>

          <View style={styles.imagesContainer}>
            {vehicleImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <X size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}

            {vehicleImages.length < 4 && (
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={handleImagePicker}
              >
                <Camera size={32} color="#FF9955" />
                <Text style={styles.addImageText}>Ajouter</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Chargement...' : 'Terminer'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip} disabled={loading}>
            <Text style={styles.skipButtonText}>Passer cette étape</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>

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
  sectionSubtitle: { color: '#666', marginBottom: 16 },
  transportGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  transportCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  transportCardSelected: {
    borderColor: '#FF9955',
    borderWidth: 2,
    backgroundColor: '#FFF0E5',
  },
  transportLabel: { fontWeight: '600', color: '#666' },
  transportLabelSelected: { color: '#FF9955' },
  label: { marginTop: 12, fontWeight: '600' },
  helperText: { fontSize: 12, color: '#999', marginBottom: 12 },
  input: { backgroundColor: '#F8F8F8', borderRadius: 12, padding: 16 },
  imagesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  image: { width: 100, height: 100, borderRadius: 12 },
  imageWrapper: { position: 'relative' },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF5555',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    backgroundColor: '#FF9955',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: { color: '#FFF', fontWeight: '700' },
  skipButtonText: { color: '#999', textAlign: 'center', marginTop: 12 },
  backButtonText: { color: '#FFF', textAlign: 'center', marginTop: 16 },
});
