import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PaginationDots({ total, current }) {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: '#FF6B35',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotInactive: {
    backgroundColor: '#E0E0E0',
  },
});
