import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchDemandeLivraisonById, acceptDemandeProposal } from '../../redux/slices/demandesLivraison.slice';
import CardPro from '../../components/ui/CardPro';
import Avatar from '../../components/ui/Avatar';
import StatusBadge from '../../components/ui/StatusBadge';
import GradientButton from '../../components/ui/GradientButton';
import ScreenLoader from '../../components/ScreenLoader';
import { colors, gradients, spacing, typography, radii } from '../../styles/theme';

export default function SellerDemandeDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { current, loading } = useAppSelector((s) => s.demandesLivraison);

  useEffect(() => {
    dispatch(fetchDemandeLivraisonById(id));
  }, [dispatch, id]);

  const handleAccept = useCallback(
    (proposalId) => {
      Alert.alert(
        'Confirmer',
        'Voulez-vous accepter cette proposition ?',
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Accepter',
            onPress: async () => {
              const result = await dispatch(acceptDemandeProposal({ demandeId: id, proposalId }));
              if (acceptDemandeProposal.fulfilled.match(result)) {
                Alert.alert('Succès', 'Proposition acceptée !');
              }
            },
          },
        ]
      );
    },
    [dispatch, id]
  );

  if (loading || !current) return <ScreenLoader />;

  const renderProposalCard = ({ item }) => {
    const isAccepted = item.statut === 'ACCEPTED';
    const isPending = item.statut === 'PENDING';

    return (
      <CardPro style={[styles.proposalCard, isAccepted && styles.proposalCardAccepted]}>
        <View style={styles.proposalHeader}>
          <View style={styles.proposalLeft}>
            <Avatar name={`Livreur ${item.livreur?.livreur_id}`} size={44} />
            <View style={styles.proposalInfo}>
              <Text style={styles.proposalLivreur}>Livreur #{item.livreur?.livreur_id}</Text>
              <Text style={styles.proposalDate}>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Date inconnue'}
              </Text>
            </View>
          </View>
          <View style={styles.proposalPriceContainer}>
            <Text style={styles.proposalPriceLabel}>Prix proposé</Text>
            <Text style={styles.proposalPrice}>{item.prix} MAD</Text>
          </View>
        </View>

        <View style={styles.proposalFooter}>
          <StatusBadge status={item.statut} />
          {isPending && current.statut === 'OPEN' && (
            <GradientButton
              title="Accepter"
              onPress={() => handleAccept(item.id)}
              style={styles.acceptButton}
            />
          )}
        </View>

        {isAccepted && (
          <View style={styles.acceptedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.acceptedText}>Cette proposition a été acceptée</Text>
          </View>
        )}
      </CardPro>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Détail de la demande</Text>
          <StatusBadge status={current.statut} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Info Card */}
        <CardPro style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Informations</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Client</Text>
              <Text style={styles.infoValue}>
                {current.commande?.client?.nom} {current.commande?.client?.prenom}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Ville</Text>
              <Text style={styles.infoValue}>{current.ville || 'Non spécifiée'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="navigate-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Adresse de livraison</Text>
              <Text style={styles.infoValue}>
                {current.adresseLivraison || current.commande?.addressLivraison || 'Non spécifiée'}
              </Text>
            </View>
          </View>

          {current.dateLivraison && (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date de livraison</Text>
                <Text style={styles.infoValue}>
                  {new Date(current.dateLivraison).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          )}

          {current.details && (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Détails</Text>
                <Text style={styles.infoValue}>{current.details}</Text>
              </View>
            </View>
          )}
        </CardPro>

        {/* Propositions Section */}
        <View style={styles.propositionsSection}>
          <View style={styles.propositionsHeader}>
            <Text style={styles.sectionTitle}>Propositions reçues</Text>
            <View style={styles.propositionsCount}>
              <Text style={styles.propositionsCountText}>{current.propositions?.length || 0}</Text>
            </View>
          </View>

          {current.propositions?.length === 0 ? (
            <CardPro style={styles.emptyProposals}>
              <Ionicons name="hourglass-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyProposalsTitle}>Aucune proposition</Text>
              <Text style={styles.emptyProposalsText}>
                Les livreurs peuvent voir votre demande et vous envoyer leurs propositions de prix
              </Text>
            </CardPro>
          ) : (
            <FlatList
              data={current.propositions}
              keyExtractor={(item) => item.id}
              renderItem={renderProposalCard}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerGradient: {
    paddingTop: spacing(12),
    paddingBottom: spacing(6),
    paddingHorizontal: spacing(5),
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(3),
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { ...typography.h2, color: '#FFF' },
  scrollContent: { padding: spacing(5) },
  infoCard: { marginBottom: spacing(5) },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing(4) },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing(4) },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: { marginLeft: spacing(3), flex: 1 },
  infoLabel: { ...typography.caption, color: colors.textMuted },
  infoValue: { ...typography.bodyMedium, color: colors.text, marginTop: spacing(1) },
  propositionsSection: {},
  propositionsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing(4) },
  propositionsCount: {
    marginLeft: spacing(2),
    backgroundColor: colors.primary,
    paddingHorizontal: spacing(2.5),
    paddingVertical: spacing(1),
    borderRadius: radii.full,
  },
  propositionsCountText: { ...typography.captionMedium, color: '#FFF' },
  proposalCard: { marginBottom: spacing(3) },
  proposalCardAccepted: { borderWidth: 2, borderColor: colors.success },
  proposalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  proposalLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  proposalInfo: { marginLeft: spacing(3) },
  proposalLivreur: { ...typography.bodySemiBold, color: colors.text },
  proposalDate: { ...typography.caption, color: colors.textMuted, marginTop: spacing(0.5) },
  proposalPriceContainer: { alignItems: 'flex-end' },
  proposalPriceLabel: { ...typography.caption, color: colors.textMuted },
  proposalPrice: { ...typography.h3, color: colors.primary, marginTop: spacing(0.5) },
  proposalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing(4),
    paddingTop: spacing(3),
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  acceptButton: { paddingVertical: spacing(2.5), paddingHorizontal: spacing(4) },
  acceptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing(3),
    borderRadius: radii.md,
    marginTop: spacing(4),
  },
  acceptedText: { ...typography.smallMedium, color: colors.success, marginLeft: spacing(2) },
  emptyProposals: { alignItems: 'center', padding: spacing(8) },
  emptyProposalsTitle: { ...typography.h4, color: colors.text, marginTop: spacing(4) },
  emptyProposalsText: { ...typography.small, color: colors.textMuted, marginTop: spacing(2), textAlign: 'center' },
});