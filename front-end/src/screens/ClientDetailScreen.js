import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateClient, deleteClient } from '../redux/slices/clients.slice';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radii, typography } from '../styles/theme';

const ClientDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { client } = route.params;

  const [nom, setNom] = useState(client.nom);
  const [prenom, setPrenom] = useState(client.prenom);
  const [address, setAddress] = useState(client.address);
  const [tel, setTel] = useState(client.tel);
  const [ville, setVille] = useState(client.ville);

  const handleSave = useCallback(async () => {
    const result = await dispatch(updateClient({
      id: client.id,
      dto: { nom, prenom, address, tel, ville },
    }));

    if (updateClient.fulfilled.match(result)) {
      Alert.alert('Succès', 'Client mis à jour');
      navigation.goBack();
    } else {
      Alert.alert('Erreur', 'Impossible de mettre à jour');
    }
  }, [dispatch, client.id, nom, prenom, address, tel, ville, navigation]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Supprimer',
      'Voulez-vous supprimer ce client ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            const result = await dispatch(deleteClient(client.id));
            if (deleteClient.fulfilled.match(result)) {
              Alert.alert('Supprimé', 'Client supprimé');
              navigation.goBack();
            } else {
              Alert.alert('Erreur', "Impossible de supprimer : ce client a des commandes");
            }
          },
        },
      ]
    );
  }, [dispatch, client.id, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Détails client</Text>

      <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Nom" placeholderTextColor={colors.placeholder} />
      <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholder="Prénom" placeholderTextColor={colors.placeholder} />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Adresse" placeholderTextColor={colors.placeholder} />
      <TextInput style={styles.input} value={tel} onChangeText={setTel} placeholder="Téléphone" keyboardType="phone-pad" placeholderTextColor={colors.placeholder} />
      <TextInput style={styles.input} value={ville} onChangeText={setVille} placeholder="Ville" placeholderTextColor={colors.placeholder} />

      <PrimaryButton title="Enregistrer" onPress={handleSave} style={{ marginTop: spacing(3) }} />

      <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Supprimer le client</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(4) },
  title: { ...typography.h3, color: colors.text, marginBottom: spacing(4) },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing(3),
    marginTop: spacing(2),
    backgroundColor: '#FAFAFA',
    color: colors.text,
  },
  deleteBtn: { marginTop: spacing(4), alignItems: 'center' },
  deleteText: { color: colors.danger, fontWeight: '700' },
});

export default ClientDetailScreen;