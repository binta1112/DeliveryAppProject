import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { colors, spacing, radii } from '../styles/theme';

const NewCommandeModal = ({ visible, onClose, onSubmit }) => {
  const [commerceantId, setCommerceantId] = useState('MOCK-COMMERCEANT-ID');
  const [clientId, setClientId] = useState('');
  const [addressLivraison, setAddressLivraison] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (!commerceantId || !clientId || !addressLivraison) return;
    onSubmit({ commerceantId, clientId, addressLivraison, details });
    setClientId('');
    setAddressLivraison('');
    setDetails('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Nouvelle commande</Text>
          <TextInput
            style={styles.input}
            placeholder="commerceantId"
            value={commerceantId}
            onChangeText={setCommerceantId}
          />
          <TextInput
            style={styles.input}
            placeholder="clientId"
            value={clientId}
            onChangeText={setClientId}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse de livraison"
            value={addressLivraison}
            onChangeText={setAddressLivraison}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Notes / détails"
            multiline
            numberOfLines={3}
            value={details}
            onChangeText={setDetails}
          />

          <PrimaryButton title="Créer" onPress={handleSubmit} style={{ marginTop: spacing(2) }} />
          <TouchableOpacity onPress={onClose} style={styles.cancel}>
            <Text style={{ color: colors.textMuted, fontWeight: '700' }}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0008', justifyContent: 'center', padding: spacing(4) },
  card: { backgroundColor: '#FFF', borderRadius: radii.lg, padding: spacing(4) },
  title: { fontSize: 18, fontWeight: '800', marginBottom: spacing(2), color: colors.text },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing(3),
    marginTop: spacing(2),
    backgroundColor: '#FFF',
  },
  textarea: { height: 90, textAlignVertical: 'top' },
  cancel: { marginTop: spacing(2), alignSelf: 'center' },
});

export default NewCommandeModal;