import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const typography = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  body: { fontSize: 14, color: colors.text },
  muted: { fontSize: 14, color: colors.textMuted },
  caption: { fontSize: 12, color: colors.textMuted },
});