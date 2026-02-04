import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, radii, shadows, spacing, typography } from '../../styles/theme';

const StatCard = ({ title, value, icon, gradient = false }) => {
  const Container = gradient ? LinearGradient : View;
  const containerProps = gradient ? { colors: gradients.primary, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } } : {};

  return (
    <Container {...containerProps} style={[styles.card, gradient && styles.gradientCard]}>
      <View style={[styles.iconWrapper, gradient && styles.iconWrapperGradient]}>
        <Ionicons name={icon} size={24} color={gradient ? '#FFF' : colors.primary} />
      </View>
      <Text style={[styles.value, gradient && styles.textWhite]}>{value}</Text>
      <Text style={[styles.title, gradient && styles.textWhiteLight]}>{title}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing(4),
    ...shadows.md,
  },
  gradientCard: { ...shadows.orange },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(3),
  },
  iconWrapperGradient: { backgroundColor: 'rgba(255,255,255,0.2)' },
  value: { ...typography.h2, color: colors.text },
  title: { ...typography.small, color: colors.textMuted, marginTop: spacing(1) },
  textWhite: { color: '#FFF' },
  textWhiteLight: { color: 'rgba(255,255,255,0.8)' },
});

export default StatCard;