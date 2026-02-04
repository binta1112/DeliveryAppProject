import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

const EmptyState = React.memo(({ title, subtitle }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
));

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  title: { fontWeight: '700', color: colors.text, fontSize: 16 },
  subtitle: { color: colors.textMuted, marginTop: 6, textAlign: 'center' },
});

export default EmptyState;