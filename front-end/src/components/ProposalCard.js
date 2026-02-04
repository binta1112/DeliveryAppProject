import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { colors } from '../styles/theme';

const ProposalCard = React.memo(({ item }) => (
  <Card style={styles.card}>
    <Text style={styles.title}>Prix proposé: {item.prix} MAD</Text>
    <Text style={styles.sub}>Livreur ID: {item?.livreur?.livreur_id}</Text>
    <Text style={styles.sub}>Statut: {item?.statut}</Text>
  </Card>
));

const styles = StyleSheet.create({
  card: { padding: 16 },
  title: { fontWeight: '700', color: colors.text },
  sub: { color: colors.textMuted, marginTop: 4 },
});

export default ProposalCard;