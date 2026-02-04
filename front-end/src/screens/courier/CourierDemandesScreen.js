import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchDemandesLivraison } from '../../redux/slices/demandesLivraison.slice';
import { createPropositionPrix } from '../../redux/slices/propositionsPrix.slice';
import CardPro from '../../components/ui/CardPro';
import Avatar from '../../components/ui/Avatar';
import StatusBadge from '../../components/ui/StatusBadge';
import GradientButton from '../../components/ui/GradientButton';
import { colors, gradients, spacing, typography, radii, shadows } from '../../styles/theme';

const villes = ['Toutes', 'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger'];

export default function CourierDemandesScreen() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.demandesLivraison);
  const livreurId = useAppSelector((s) => s.auth.livreurId);

  const [selectedVille, setSelectedVille] = useState('Toutes');
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchDemandesLivraison({ statut: 'OPEN' }));
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (selectedVille === 'Toutes') return items;
    return items.filter((d) => (d.ville || '').toLowerCase().includes(selectedVille.toLowerCase()));
  }, [items, selectedVille]);

  const handleSelectDemande = useCallback((item) => {
    setSelectedDemande(selectedDemande?.id === item.id ? null : item);
    setPrice('');
  }, [selectedDemande]);

  const handlePropose = useCallback(async () => {
    if (!selectedDemande || !price || !livreurId) {
      Alert.alert('Erreur', 'Veuillez sélectionner une demande et entrer un prix');
      return;
    }

    setSubmitting(true);
    try {
      const result = await dispatch(
        createPropositionPrix({
          demandeLivraisonId: selectedDemande.id,
          prix: Number(price),
          livreurId,
        })
      );

      if (createPropositionPrix.fulfilled.match(result)) {
        Alert.alert('Succès', 'Votre proposition a été envoyée !');
        setPrice('');
        setSelectedDemande(null);
      }
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, price, selectedDemande, livreurId]);

  const renderDemandeCard = useCallback(
    ({ item }) => {
      const isSelected = selectedDemande?.id === item.id;

      return (
        <TouchableOpacity onPress={() => handleSelectDemande(item)} activeOpacity={0.9}>
          <CardPro style={[styles.demandeCard, isSelected && styles.demandeCardSelected]}>
            {isSelected && <View style={styles.selectedIndicator} />}

            <View style={styles.cardHeader}>
              <View style={styles.cardLeft}>
                <Avatar name={item.commande?.client?.nom || 'Client'} size={44} />
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
                <Text style={styles.detailText}>{item.adresseLivraison || item.commande?.addressLivraison}</Text>
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
            </View>

            {isSelected && (
              <View style={styles.priceInputContainer}>
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.currencySymbol}>MAD</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Votre prix"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
                <GradientButton
                  title="Proposer"
                  onPress={handlePropose}
                  loading={submitting}
                  style={styles.proposeButton}
                />
              </View>
            )}
          </CardPro>
        </TouchableOpacity>
      );
    },
    [selectedDemande, price, submitting, handleSelectDemande, handlePropose]
  );

  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Demandes disponibles</Text>
          <Text style={styles.headerSubtitle}>{filtered.length} demandes trouvées</Text>
        </View>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={villes}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(v) => v}
          renderItem={({ item: v }) => (
            <TouchableOpacity
              onPress={() => setSelectedVille(v)}
              style={[styles.filterChip, selectedVille === v && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, selectedVille === v && styles.filterTextActive]}>{v}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={renderDemandeCard}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Aucune demande</Text>
            <Text style={styles.emptySubtitle}>Les nouvelles demandes apparaîtront ici</Text>
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
  headerContent: {},
  headerTitle: { ...typography.h2, color: '#FFF' },
  headerSubtitle: { ...typography.small, color: 'rgba(255,255,255,0.8)', marginTop: spacing(1) },
  filtersContainer: { paddingVertical: spacing(4), paddingLeft: spacing(5) },
  filterChip: {
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2),
    borderRadius: radii.full,
    backgroundColor: colors.card,
    marginRight: spacing(2),
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { ...typography.smallMedium, color: colors.textSecondary },
  filterTextActive: { color: '#FFF' },
  listContent: { paddingHorizontal: spacing(5), paddingBottom: spacing(10) },
  demandeCard: { marginBottom: spacing(4), overflow: 'hidden' },
  demandeCardSelected: { borderWidth: 2, borderColor: colors.primary },
  selectedIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.primary,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cardInfo: { marginLeft: spacing(3), flex: 1 },
  clientName: { ...typography.bodySemiBold, color: colors.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing(1) },
  locationText: { ...typography.small, color: colors.textMuted, marginLeft: spacing(1) },
  cardDetails: { marginTop: spacing(4), gap: spacing(2) },
  detailItem: { flexDirection: 'row', alignItems: 'center' },
  detailText: { ...typography.small, color: colors.textSecondary, marginLeft: spacing(2), flex: 1 },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing(4),
    paddingTop: spacing(4),
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing(3),
  },
  priceInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radii.lg,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
  },
  currencySymbol: { ...typography.bodySemiBold, color: colors.primary, marginRight: spacing(2) },
  priceInput: { flex: 1, ...typography.body, color: colors.text },
  proposeButton: { minWidth: 120 },
  emptyContainer: { alignItems: 'center', paddingVertical: spacing(15) },
  emptyTitle: { ...typography.h4, color: colors.text, marginTop: spacing(4) },
  emptySubtitle: { ...typography.small, color: colors.textMuted, marginTop: spacing(2) },
});