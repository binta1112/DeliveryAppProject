import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radii, shadows, spacing } from '../../styles/theme';

const GradientButton = ({ title, onPress, loading, disabled, style, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}
    style={[styles.wrapper, disabled && styles.disabled, style]}
  >
    <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: { borderRadius: radii.lg, overflow: 'hidden', ...shadows.orange },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing(4),
    paddingHorizontal: spacing(6),
  },
  text: { color: colors.textLight, fontSize: 16, fontWeight: '700' },
  icon: { marginRight: spacing(2) },
  disabled: { opacity: 0.5 },
});

export default GradientButton;