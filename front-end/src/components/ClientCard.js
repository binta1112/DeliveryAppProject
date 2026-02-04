import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardPro from './ui/CardPro';
import Avatar from './ui/Avatar';
import { colors, spacing, typography } from '../styles/theme';

const ClientCard = React.memo(({ item }) => (
  <CardPro style={styles.card}>
    <View style={styles.row}>
      <Avatar name={`${item.nom} ${item.prenom}`} size={48} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.nom} {item.prenom}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.detail}>{item.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={14} color={colors.textMuted} />
          <Text style={styles.detail}>{item.tel}</Text>
        </View>
      </View>
    </View>
  </CardPro>
));

const styles = StyleSheet.create({
  card: { marginBottom: spacing(3) },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { marginLeft: spacing(4), flex: 1 },
  name: { ...typography.bodySemiBold, color: colors.text, marginBottom: spacing(1) },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing(1) },
  detail: { ...typography.small, color: colors.textMuted, marginLeft: spacing(2) },
});

export default ClientCard;