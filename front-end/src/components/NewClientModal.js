import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { colors, spacing, radii } from '../styles/theme';

const NewClientModal = ({ visible, onClose, onSubmit }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [ville, setVille] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nom || !prenom || !address || !tel || !ville) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ nom, prenom, address, tel, ville });
      setNom('');
      setPrenom('');
      setAddress('');
      setTel('');
      setVille('');
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Impossible de créer le client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing(4) }}>
          <View style={styles.card}>
            <Text style={styles.title}>Nouveau client</Text>

            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor={colors.placeholder}
              value={nom}
              onChangeText={setNom}
            />
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              placeholderTextColor={colors.placeholder}
              value={prenom}
              onChangeText={setPrenom}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              placeholderTextColor={colors.placeholder}
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              placeholderTextColor={colors.placeholder}
              value={tel}
              onChangeText={setTel}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Ville"
              placeholderTextColor={colors.placeholder}
              value={ville}
              onChangeText={setVille}
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
  cancel: { marginTop: spacing(2), alignSelf: 'center' },
});

export default NewClientModal;