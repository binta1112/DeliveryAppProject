import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, radii } from '../../styles/theme';

const Avatar = ({ name, imageUrl, size = 48 }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  if (imageUrl) {
    return <Image source={{ uri: imageUrl }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />;
  }

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.textLight, fontWeight: '700' },
  image: { resizeMode: 'cover' },
});

export default Avatar;