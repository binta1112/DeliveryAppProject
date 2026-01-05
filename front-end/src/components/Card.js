import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radii, shadows } from '../styles/theme';

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 14,
    ...shadows.card,
  },
});

export default Card;