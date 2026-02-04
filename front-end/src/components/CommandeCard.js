import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardPro from './ui/CardPro';
import Avatar from './ui/Avatar';
import StatusBadge from './ui/StatusBadge';
import { colors, spacing, typography } from '../styles/theme';

const CommandeCard = React.memo(({ item }) => (
  <CardPro style={styles.card} variant="highlighted">
    <View style={styles.header}>
      <View style={styles.left}>
        <Avatar name={`${item.client?.nom} ${item.client?.prenom}`} size={44} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.client?.nom} {item.client?.prenom}</Text>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={14} color={colors.primary} />
            <Text style={styles.address}>{item.addressLivraison}</Text>
          </View>
        </View>
      </View>
      <StatusBadge status={item.statut} />
    </View>
    {item.details && (
      <View style={styles.detailsBox}>
        <Ionicons name="document-text-outline" size={16} color={colors.textMuted} />
        <Text style={styles.details}>{item.details}</Text>
      </View>
    )}
  </CardPro>
));

const styles = StyleSheet.create({
  card: { marginBottom: spacing(3) },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  info: { marginLeft: spacing(3), flex: 1 },
  name: { ...typography.bodySemiBold, color: colors.text },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing(1) },
  address: { ...typography.small, color: colors.textMuted, marginLeft: spacing(1), flex: 1 },
  detailsBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing(3),
    padding: spacing(3),
    backgroundColor: colors.background,
    borderRadius: spacing(2),
  },
  details: { ...typography.small, color: colors.textSecondary, marginLeft: spacing(2), flex: 1 },
});

export default CommandeCard;