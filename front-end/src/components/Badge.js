import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, radii } from '../styles/theme';

const Badge = ({ label, tone = 'default', style }) => {
  const bg = {
    default: '#E5E7EB',
    success: '#DCFCE7',
    warning: '#FEF9C3',
    danger: '#FEE2E2',
  }[tone] || '#E5E7EB';

  const fg = {
    default: colors.text,
    success: '#16A34A',
    warning: '#CA8A04',
    danger: '#B91C1C',
  }[tone] || colors.text;

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.text, { color: fg }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: radii.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 12, fontWeight: '700' },
});

export default Badge;