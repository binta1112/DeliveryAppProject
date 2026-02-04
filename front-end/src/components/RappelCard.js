import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card';
import PrimaryButton from './PrimaryButton';
import { colors, spacing } from '../styles/theme';

const RappelCard = React.memo(({ item, onMarkRead }) => (
  <Card style={styles.card}>
    <Text style={styles.title}>{item.contenu}</Text>
    <Text style={styles.muted}>{new Date(item.scheduledAt).toLocaleString()}</Text>
    <PrimaryButton title="Marquer lu" style={{ marginTop: spacing(2) }} onPress={() => onMarkRead(item.id)} />
  </Card>
));

const styles = StyleSheet.create({
  card: { padding: 16 },
  title: { fontWeight: '700', color: colors.text },
  muted: { color: colors.textMuted, marginTop: 4 },
});

export default RappelCard;