import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

const FilterChip = React.memo(({ label, active, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.active]}>
    <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFE8D6',
    marginRight: 8,
  },
  active: { backgroundColor: colors.primary },
  text: { color: colors.primaryDark, fontWeight: '600' },
  textActive: { color: '#FFF' },
});

export default FilterChip;