import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../../styles/theme';

const statusConfig = {
  PENDING: { bg: colors.warningLight, text: colors.warning, label: 'En attente' },
  IN_PROGRESS: { bg: colors.infoLight, text: colors.info, label: 'En cours' },
  COMPLETED: { bg: colors.successLight, text: colors.success, label: 'Terminé' },
  CANCELED: { bg: colors.dangerLight, text: colors.danger, label: 'Annulé' },
  OPEN: { bg: colors.infoLight, text: colors.info, label: 'Ouvert' },
  CLOSED: { bg: colors.textMuted, text: '#FFF', label: 'Fermé' },
  ACCEPTED: { bg: colors.successLight, text: colors.success, label: 'Accepté' },
  REJECTED: { bg: colors.dangerLight, text: colors.danger, label: 'Rejeté' },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: spacing(3), paddingVertical: spacing(1.5), borderRadius: radii.full },
  text: { fontSize: 12, fontWeight: '600' },
});

export default StatusBadge;