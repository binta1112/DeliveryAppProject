import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PrimaryButton from './PrimaryButton';
import { colors, spacing, radii } from '../styles/theme';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchClients } from '../redux/slices/clients.slice';

const NewCommandeModal = ({ visible, onClose, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { items: clients } = useAppSelector((s) => s.clients);
  const commerceantId = useAppSelector((s) => s.auth.commerceantId);

  const [clientId, setClientId] = useState('');
  const [addressLivraison, setAddressLivraison] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && commerceantId) {
      dispatch(fetchClients({ commerceantId }));
    }
  }, [visible, commerceantId, dispatch]);

  const handleSubmit = async () => {
    if (!clientId) {
      Alert.alert('Erreur', 'Veuillez sélectionner un client');
      return;
    }
    if (!addressLivraison) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse de livraison');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ clientId, addressLivraison, details });
      setClientId('');
      setAddressLivraison('');
      setDetails('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing(4) }}>
          <View style={styles.card}>
            <Text style={styles.title}>Nouvelle commande</Text>

            <Text style={styles.label}>Client</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={clientId} onValueChange={setClientId} style={styles.picker}>
                <Picker.Item label="-- Sélectionnez un client --" value="" />
                {clients.map((c) => (
                  <Picker.Item key={c.id} label={`${c.nom} ${c.prenom}`} value={c.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Adresse de livraison"
              placeholderTextColor={colors.placeholder}
              value={addressLivraison}
              onChangeText={setAddressLivraison}
            />

            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Notes / détails (optionnel)"
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={3}
              value={details}
              onChangeText={setDetails}
            />

            <PrimaryButton
              title={loading ? 'Création...' : 'Créer'}
              onPress={handleSubmit}
              disabled={loading}
              style={{ marginTop: spacing(2) }}
            />
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={{ color: colors.textMuted, fontWeight: '700' }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0008' },
  card: { backgroundColor: '#FFF', borderRadius: radii.lg, padding: spacing(4) },
  title: { fontSize: 18, fontWeight: '800', marginBottom: spacing(2), color: colors.text },
  label: { marginTop: spacing(2), fontWeight: '600', color: colors.text },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    marginTop: spacing(1),
    backgroundColor: '#FAFAFA',
  },
  picker: { height: 50, color: colors.text },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing(3),
    marginTop: spacing(2),
    backgroundColor: '#FAFAFA',
    color: colors.text,
    fontSize: 16,
  },
  textarea: { height: 90, textAlignVertical: 'top' },
  cancel: { marginTop: spacing(2), alignSelf: 'center' },
});

export default NewCommandeModal;