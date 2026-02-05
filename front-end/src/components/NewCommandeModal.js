import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
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
  const [clientLabel, setClientLabel] = useState('');
  const [addressLivraison, setAddressLivraison] = useState('');
  const [details, setDetails] = useState('');
  const [showClientPicker, setShowClientPicker] = useState(false);

  const [dateLivraison, setDateLivraison] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (visible && commerceantId) {
      dispatch(fetchClients({ commerceantId }));
    }
  }, [visible, commerceantId, dispatch]);

  const handleSelectClient = (client) => {
    setClientId(client.id);
    setClientLabel(`${client.nom} ${client.prenom}`);
    setShowClientPicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDateLivraison(selectedDate);
  };

  const handleSubmit = async () => {
    if (!clientId) {
      Alert.alert('Erreur', 'Veuillez sélectionner un client');
      return;
    }
    if (!addressLivraison) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse de livraison');
      return;
    }
    await onSubmit({
      clientId,
      addressLivraison,
      details,
      dateLivraison: dateLivraison ? dateLivraison.toISOString() : null,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing(4) }}>
          <View style={styles.card}>
            <Text style={styles.title}>Nouvelle commande</Text>

            {/* Client selector */}
            <Text style={styles.label}>Client</Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => setShowClientPicker(true)}>
              <Text style={clientLabel ? styles.selectText : styles.selectPlaceholder}>
                {clientLabel || 'Sélectionnez un client'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            {/* Date de livraison */}
            <Text style={styles.label}>Date de livraison</Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => setShowDatePicker(true)}>
              <Text style={dateLivraison ? styles.selectText : styles.selectPlaceholder}>
                {dateLivraison ? dateLivraison.toLocaleString('fr-FR') : 'Choisir une date'}
              </Text>
              <Ionicons name="calendar" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            {showDatePicker && (
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={dateLivraison || new Date()}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                textColor={colors.text}
              />
            </View>
          )}

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

            <PrimaryButton title="Créer" onPress={handleSubmit} style={{ marginTop: spacing(2) }} />
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={{ color: colors.textMuted, fontWeight: '700' }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Client picker modal */}
        <Modal visible={showClientPicker} transparent animationType="fade">
          <View style={styles.pickerBackdrop}>
            <View style={styles.pickerCard}>
              <Text style={styles.pickerTitle}>Choisir un client</Text>

              {clients.length === 0 ? (
                <Text style={styles.emptyText}>Aucun client trouvé</Text>
              ) : (
                <FlatList
                  data={clients}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.clientRow} onPress={() => handleSelectClient(item)}>
                      <Text style={styles.clientName}>{item.nom} {item.prenom}</Text>
                      <Text style={styles.clientPhone}>{item.tel}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}

              <TouchableOpacity onPress={() => setShowClientPicker(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#0008' },
  card: { backgroundColor: '#FFF', borderRadius: radii.lg, padding: spacing(4) },
  title: { fontSize: 18, fontWeight: '800', marginBottom: spacing(2), color: colors.text },
  label: { marginTop: spacing(2), fontWeight: '600', color: colors.text },

  selectInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing(3),
    marginTop: spacing(1),
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: { color: colors.text, fontSize: 16 },
  selectPlaceholder: { color: colors.placeholder, fontSize: 16 },

  datePickerContainer: {
  backgroundColor: '#F5F5F5',
  borderRadius: radii.md,
  marginTop: spacing(2),
  paddingVertical: spacing(1),
  },

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

  pickerBackdrop: { flex: 1, backgroundColor: '#0008', justifyContent: 'center', padding: spacing(4) },
  pickerCard: { backgroundColor: '#FFF', borderRadius: radii.lg, padding: spacing(4), maxHeight: '70%' },
  pickerTitle: { fontSize: 18, fontWeight: '700', marginBottom: spacing(3) },
  clientRow: { paddingVertical: spacing(3), borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  clientName: { fontSize: 16, fontWeight: '600', color: colors.text },
  clientPhone: { fontSize: 12, color: colors.textMuted },
  emptyText: { textAlign: 'center', color: colors.textMuted, marginTop: spacing(2) },
  closeBtn: { marginTop: spacing(3), alignSelf: 'center' },
  closeBtnText: { color: colors.primary, fontWeight: '700' },
});

export default NewCommandeModal;