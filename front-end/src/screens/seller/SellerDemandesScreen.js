import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchDemandesLivraison } from '../../redux/slices/demandesLivraison.slice';
import CardPro from '../../components/ui/CardPro';
import Avatar from '../../components/ui/Avatar';
import StatusBadge from '../../components/ui/StatusBadge';
import FAB from '../../components/ui/FAB';
import { colors, gradients, spacing, typography, radii } from '../../styles/theme';

export default function SellerDemandesScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.demandesLivraison);
  const commerceantId = useAppSelector((s) => s.auth.commerceantId);

  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (commerceantId) {
      dispatch(fetchDemandesLivraison({ commerceantId }));
    }
  }, [dispatch, commerceantId]);

  const filteredItems = React.useMemo(() => {
    if (filter === 'ALL') return items;
    return items.filter((d) => d.statut === filter);
  }, [items, filter]);

  const stats = React.useMemo(() => {
    const open = items.filter((d) => d.statut === 'OPEN').length;
    const accepted = items.filter((d) => d.statut === 'ACCEPTED').length;
    const closed = items.filter((d) => d.statut === 'CLOSED').length;
    return { total: items.length, open, accepted, closed };
  }, [items]);

  const renderDemandeCard = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('DemandeDetail', { id: item.id })}
        activeOpacity={0.9}
      >
        <CardPro style={styles.demandeCard} variant="highlighted">
          <View style={styles.cardHeader}>
            <View style={styles.cardLeft}>
              <Avatar name={item.commande?.client?.nom || 'Client'} size={48} />
              <View style={styles.cardInfo}>
                <Text style={styles.clientName}>
                  {item.commande?.client?.nom} {item.commande?.client?.prenom}
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color={colors.primary} />
                  <Text style={styles.locationText}>{item.ville || 'Non spécifié'}</Text>
                </View>
              </View>
            </View>
            <StatusBadge status={item.statut} />
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="navigate-outline" size={16} color={colors.textMuted} />
              <Text style={styles.detailText} numberOfLines={1}>
                {item.adresseLivraison || item.commande?.addressLivraison || 'Adresse non spécifiée'}
              </Text>
            </View>

            {item.dateLivraison && (
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
                <Text style={styles.detailText}>
                  {new Date(item.dateLivraison).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            )}

            <View style={styles.detailItem}>
              <Ionicons name="pricetags-outline" size={16} color={colors.textMuted} />
              <Text style={styles.detailText}>
                {item.propositions?.length || 0} proposition(s) reçue(s)
              </Text>
            </View>
          </View>

          {item.acceptedProposal && (
            <View style={styles.acceptedBanner}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={styles.acceptedText}>
                Livreur accepté • {item.acceptedProposal.prix} MAD
              </Text>
            </View>
          )}

          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>Voir les détails</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        </CardPro>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const FilterChip = ({ label, value }) => (
    <TouchableOpacity
      onPress={() => setFilter(value)}
      style={[styles.filterChip, filter === value && styles.filterChipActive]}
    >
      <Text style={[styles.filterText, filter === value && styles.filterTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <Text style={styles.headerTitle}>Demandes de livraison</Text>
        <Text style={styles.headerSubtitle}>Gérez vos demandes et propositions</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="document-text" size={20} color="#FFF" />
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="hourglass" size={20} color="#FFF" />
            <Text style={styles.statValue}>{stats.open}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.statValue}>{stats.accepted}</Text>
            <Text style={styles.statLabel}>Acceptées</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="close-circle" size={20} color="#FFF" />
            <Text style={styles.statValue}>{stats.closed}</Text>
            <Text style={styles.statLabel}>Fermées</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { label: 'Toutes', value: 'ALL' },
            { label: 'En attente', value: 'OPEN' },
            { label: 'Acceptées', value: 'ACCEPTED' },
            { label: 'Fermées', value: 'CLOSED' },
          ]}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => <FilterChip label={item.label} value={item.value} />}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderDemandeCard}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="car-outline" size={48} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Aucune demande</Text>
            <Text style={styles.emptySubtitle}>
              Créez une demande de livraison depuis une commande
            </Text>
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.lg,
    padding: spacing(4),
    marginTop: spacing(5),
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { ...typography.h3, color: '#FFF', marginTop: spacing(1) },
  statLabel: { ...typography.caption, color: 'rgba(255,255,255,0.7)', marginTop: spacing(1) },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  filtersContainer: { paddingVertical: spacing(4), paddingLeft: spacing(5) },
  filterChip: {
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2.5),
    borderRadius: radii.full,
    backgroundColor: colors.card,
    marginRight: spacing(2),
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { ...typography.smallMedium, color: colors.textSecondary },
  filterTextActive: { color: '#FFF' },
  listContent: { paddingHorizontal: spacing(5), paddingBottom: spacing(10) },
  demandeCard: { marginBottom: spacing(4), overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cardInfo: { marginLeft: spacing(3), flex: 1 },
  clientName: { ...typography.bodySemiBold, color: colors.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing(1) },
  locationText: { ...typography.small, color: colors.textMuted, marginLeft: spacing(1) },
  cardDetails: { marginTop: spacing(4), gap: spacing(2) },
  detailItem: { flexDirection: 'row', alignItems: 'center' },
  detailText: { ...typography.small, color: colors.textSecondary, marginLeft: spacing(2), flex: 1 },
  acceptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing(3),
    borderRadius: radii.md,
    marginTop: spacing(4),
  },
  acceptedText: { ...typography.smallMedium, color: colors.success, marginLeft: spacing(2) },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing(4),
    paddingTop: spacing(3),
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  footerText: { ...typography.smallMedium, color: colors.primary, marginRight: spacing(1) },
  emptyContainer: { alignItems: 'center', paddingVertical: spacing(15) },
  emptyIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { ...typography.h4, color: colors.text, marginTop: spacing(4) },
  emptySubtitle: { ...typography.small, color: colors.textMuted, marginTop: spacing(2), textAlign: 'center', paddingHorizontal: spacing(8) },
});