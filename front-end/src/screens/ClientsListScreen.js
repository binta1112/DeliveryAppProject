import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchClients, createClient } from '../redux/slices/clients.slice';
import ClientCard from '../components/ClientCard';
import NewClientModal from '../components/NewClientModal';
import FAB from '../components/ui/FAB';
import { colors, gradients, spacing, typography, radii } from '../styles/theme';

const ClientsListScreen = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.clients);
  const commerceantId = useAppSelector((s) => s.auth.commerceantId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleCreate = useCallback(
    async (payload) => {
      if (!commerceantId) {
        Alert.alert('Erreur', 'CommerceantId non trouvé');
        return;
      }

      const result = await dispatch(createClient({ ...payload, commerceantId }));

      if (createClient.fulfilled.match(result)) {
        setShowModal(false);
        Alert.alert('Succès', 'Client créé avec succès');
      } else {
        throw new Error(result.error?.message || 'Erreur lors de la création');
      }
    },
    [dispatch, commerceantId]
  );

  const renderItem = useCallback(({ item }) => <ClientCard item={item} />, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <Text style={styles.headerTitle}>Mes clients</Text>
        <Text style={styles.headerSubtitle}>{items.length} clients enregistrés</Text>
      </LinearGradient>

      {/* List */}
      <FlatList
        data={items}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Aucun client</Text>
            <Text style={styles.emptySubtitle}>Ajoutez votre premier client avec le bouton +</Text>
          </View>
        }
      />

      <FAB onPress={() => setShowModal(true)} icon="person-add" />
      <NewClientModal visible={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerGradient: {
    paddingTop: spacing(15),
    paddingBottom: spacing(6),
    paddingHorizontal: spacing(5),
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
  },
  headerTitle: { ...typography.h2, color: '#FFF' },
  headerSubtitle: { ...typography.small, color: 'rgba(255,255,255,0.8)', marginTop: spacing(1) },
  listContent: { padding: spacing(5) },
  emptyContainer: { alignItems: 'center', paddingVertical: spacing(15) },
  emptyTitle: { ...typography.h4, color: colors.text, marginTop: spacing(4) },
  emptySubtitle: { ...typography.small, color: colors.textMuted, marginTop: spacing(2), textAlign: 'center' },
});

export default ClientsListScreen;