import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radii, shadows, spacing } from '../../styles/theme';

const CardPro = ({ children, style, onPress, variant = 'default' }) => {
  const Container = onPress ? TouchableOpacity : View;

  const variantStyles = {
    default: { backgroundColor: colors.card },
    highlighted: { backgroundColor: colors.cardAlt, borderLeftWidth: 4, borderLeftColor: colors.primary },
    outlined: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  };

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.card, variantStyles[variant], style]}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: spacing(4),
    ...shadows.md,
  },
});

export default CardPro;