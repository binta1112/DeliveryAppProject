import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchCommandes, createCommande } from '../redux/slices/commandes.slice';
import CommandeCard from '../components/CommandeCard';
import NewCommandeModal from '../components/NewCommandeModal';
import FAB from '../components/ui/FAB';
import { colors, gradients, spacing, typography, radii } from '../styles/theme';
import { TouchableOpacity } from 'react-native';

const CommandesListScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.commandes);
  const commerceantId = useAppSelector((s) => s.auth.commerceantId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (commerceantId) {
      dispatch(fetchCommandes({ commerceantId }));
    }
  }, [dispatch, commerceantId]);

  const handleCreate = useCallback(
    async (payload) => {
      if (!commerceantId) {
        Alert.alert('Erreur', 'CommerceantId non trouvé');
        return;
      }

      const result = await dispatch(createCommande({ ...payload, commerceantId }));

      if (createCommande.fulfilled.match(result)) {
        setShowModal(false);
        Alert.alert('Succès', 'Commande créée avec succès');
      } else {
        throw new Error(result.error?.message || 'Erreur lors de la création');
      }
    },
    [dispatch, commerceantId]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('CommandeDetail', { id: item.id })} activeOpacity={0.9}>
        <CommandeCard item={item} />
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <Text style={styles.headerTitle}>Mes commandes</Text>
        <Text style={styles.headerSubtitle}>{items.length} commandes</Text>
      </LinearGradient>

      {/* List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Aucune commande</Text>
            <Text style={styles.emptySubtitle}>Créez votre première commande avec le bouton +</Text>
          </View>
        }
      />

      <FAB onPress={() => setShowModal(true)} icon="add" />
      <NewCommandeModal visible={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreate} />
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

export default CommandesListScreen;