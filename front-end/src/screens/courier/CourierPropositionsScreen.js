import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchPropositionsByLivreur } from '../../redux/slices/propositionsPrix.slice';
import CardPro from '../../components/ui/CardPro';
import StatusBadge from '../../components/ui/StatusBadge';
import { colors, gradients, spacing, typography, radii } from '../../styles/theme';

export default function CourierPropositionsScreen() {
  const dispatch = useAppDispatch();
  const livreurId = useAppSelector((s) => s.auth.livreurId);
  const { byLivreur } = useAppSelector((s) => s.propositionsPrix);

  useFocusEffect(
    React.useCallback(() => {
      if (livreurId) {
        dispatch(fetchPropositionsByLivreur(livreurId));
      }
    }, [dispatch, livreurId])
  );

  const allPropositions = useMemo(() => byLivreur || [], [byLivreur]);

  const stats = useMemo(() => {
    const accepted = allPropositions.filter((p) => p.statut === 'ACCEPTED').length;
    const pending = allPropositions.filter((p) => p.statut === 'PENDING').length;
    const rejected = allPropositions.filter((p) => p.statut === 'REJECTED').length;
    return { total: allPropositions.length, accepted, pending, rejected };
  }, [allPropositions]);

  const renderPropositionCard = ({ item }) => (
    <CardPro style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix proposé</Text>
          <Text style={styles.priceValue}>{item.prix} MAD</Text>
        </View>
        <StatusBadge status={item.statut} />
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="receipt-outline" size={16} color={colors.textMuted} />
          <Text style={styles.detailText}>Demande #{item.demandeLivraison?.id?.slice(0, 8)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={colors.textMuted} />
          <Text style={styles.detailText}>
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Date inconnue'}
          </Text>
        </View>
      </View>

      {item.statut === 'ACCEPTED' && (
        <View style={styles.acceptedBanner}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.acceptedText}>Proposition acceptée !</Text>
        </View>
      )}
    </CardPro>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <Text style={styles.headerTitle}>Mes propositions</Text>
        <Text style={styles.headerSubtitle}>Historique de vos offres</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.accepted}</Text>
            <Text style={styles.statLabel}>Acceptées</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.rejected}</Text>
            <Text style={styles.statLabel}>Refusées</Text>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={allPropositions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderPropositionCard}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Aucune proposition</Text>
            <Text style={styles.emptySubtitle}>Vos propositions de prix apparaîtront ici</Text>
          </View>
        }
      />
    </View>
  );
}

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
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.lg,
    padding: spacing(4),
    marginTop: spacing(5),
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { ...typography.h3, color: '#FFF' },
  statLabel: { ...typography.caption, color: 'rgba(255,255,255,0.7)', marginTop: spacing(1) },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  listContent: { padding: spacing(5) },
  card: { marginBottom: spacing(4) },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceContainer: {},
  priceLabel: { ...typography.caption, color: colors.textMuted },
  priceValue: { ...typography.h3, color: colors.primary, marginTop: spacing(1) },
  cardDetails: { marginTop: spacing(4), gap: spacing(2) },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailText: { ...typography.small, color: colors.textSecondary, marginLeft: spacing(2) },
  acceptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing(3),
    borderRadius: radii.md,
    marginTop: spacing(4),
  },
  acceptedText: { ...typography.smallMedium, color: colors.success, marginLeft: spacing(2) },
  emptyContainer: { alignItems: 'center', paddingVertical: spacing(15) },
  emptyTitle: { ...typography.h4, color: colors.text, marginTop: spacing(4) },
  emptySubtitle: { ...typography.small, color: colors.textMuted, marginTop: spacing(2) },
});