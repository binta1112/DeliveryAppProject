import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchPendingRappels, markRappelRead } from '../redux/slices/rappels.slice';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import Header from '../components/Header';
import { colors, spacing } from '../styles/theme';

const RappelsPendingScreen = () => {
  const dispatch = useAppDispatch();
  const { pending, loading } = useAppSelector((s) => s.rappels);

  useEffect(() => {
    dispatch(fetchPendingRappels());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Header title="Rappels" subtitle="Notifications de commandes" />
      <FlatList
        data={pending}
        keyExtractor={(r) => r.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing(2) }} />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.title}>{item.contenu}</Text>
            <Text style={styles.muted}>{new Date(item.scheduledAt).toLocaleString()}</Text>
            <PrimaryButton
              title="Marquer lu"
              style={{ marginTop: spacing(2) }}
              onPress={() => dispatch(markRappelRead(item.id))}
            />
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(3) },
  card: { padding: spacing(4) },
  title: { fontSize: 16, fontWeight: '700', color: colors.text },
  muted: { color: colors.textMuted, marginTop: spacing(0.5) },
});

export default RappelsPendingScreen;