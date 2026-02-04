import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardPro from './ui/CardPro';
import Avatar from './ui/Avatar';
import StatusBadge from './ui/StatusBadge';
import { colors, spacing, typography, radii } from '../styles/theme';

const DemandeCard = React.memo(({ item }) => (
  <CardPro style={styles.card} variant="highlighted">
    <View style={styles.header}>
      <View style={styles.left}>
        <Avatar name={item.commande?.client?.nom || 'Client'} size={44} />
        <View style={styles.info}>
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

    <View style={styles.details}>
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
          {item.propositions?.length || 0} proposition(s)
        </Text>
      </View>
    </View>

    {item.acceptedProposal && (
      <View style={styles.acceptedBanner}>
        <Ionicons name="checkmark-circle" size={16} color={colors.success} />
        <Text style={styles.acceptedText}>
          Livreur accepté • {item.acceptedProposal.prix} MAD
        </Text>
      </View>
    )}
  </CardPro>
));

const styles = StyleSheet.create({
  card: { marginBottom: spacing(3) },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  info: { marginLeft: spacing(3), flex: 1 },
  clientName: { ...typography.bodySemiBold, color: colors.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing(1) },
  locationText: { ...typography.small, color: colors.textMuted, marginLeft: spacing(1) },
  details: { marginTop: spacing(4), gap: spacing(2) },
  detailItem: { flexDirection: 'row', alignItems: 'center' },
  detailText: { ...typography.small, color: colors.textSecondary, marginLeft: spacing(2), flex: 1 },
  acceptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing(2.5),
    borderRadius: radii.md,
    marginTop: spacing(3),
  },
  acceptedText: { ...typography.captionMedium, color: colors.success, marginLeft: spacing(2) },
});

export default DemandeCard;