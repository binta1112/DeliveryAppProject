import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radii } from '../styles/theme';

const PrimaryButton = ({ title, onPress, style, disabled }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.btn,
      disabled && { opacity: 0.5 },
      style,
    ]}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});

export default PrimaryButton;