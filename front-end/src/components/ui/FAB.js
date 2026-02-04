import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { gradients, shadows, spacing } from '../../styles/theme';

const FAB = ({ onPress, icon = 'add' }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>
    <LinearGradient colors={gradients.primary} style={styles.button}>
      <Ionicons name={icon} size={28} color="#FFF" />
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: spacing(5),
    bottom: spacing(6),
    ...shadows.orange,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FAB;