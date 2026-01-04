import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchClients } from '../redux/slices/clients.slice';
import Card from '../components/Card';
import Header from '../components/Header';
import { colors, spacing } from '../styles/theme';

const ClientsListScreen = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Header title="Clients" subtitle="Gestion des clients" />
      <FlatList
        data={items}
        keyExtractor={(c) => c.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing(2) }} />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.title}>{item.nom} {item.prenom}</Text>
            <Text style={styles.muted}>{item.address}</Text>
            <Text style={styles.muted}>{item.tel}</Text>
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

export default ClientsListScreen;