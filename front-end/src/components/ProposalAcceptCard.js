import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card';
import PrimaryButton from './PrimaryButton';
import { colors, spacing } from '../styles/theme';

const ProposalAcceptCard = React.memo(({ item, onAccept }) => (
  <Card style={styles.card}>
    <Text style={styles.title}>Prix proposé: {item.prix} MAD</Text>
    <Text style={styles.sub}>Livreur ID: {item?.livreur?.livreur_id}</Text>
    <Text style={styles.sub}>Statut: {item?.statut}</Text>
    {item?.statut !== 'ACCEPTED' && (
      <PrimaryButton
        title="Accepter"
        style={{ marginTop: spacing(2) }}
        onPress={() => onAccept(item.id)}
      />
    )}
  </Card>
));

const styles = StyleSheet.create({
  card: { padding: 16 },
  title: { fontWeight: '700', color: colors.text },
  sub: { color: colors.textMuted, marginTop: 4 },
});

export default ProposalAcceptCard;