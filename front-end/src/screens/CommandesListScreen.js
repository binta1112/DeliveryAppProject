import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchCommandes, createCommande } from '../redux/slices/commandes.slice';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';
import Header from '../components/Header';
import { colors, spacing, radii, shadows } from '../styles/theme';
import NewCommandeModal from '../components/NewCommandeModal';

const CommandesListScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.commandes);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCommandes({ commerceantId: 'MOCK-COMMERCEANT-ID' })); // remplace par l’ID réel
  }, [dispatch]);

  const handleCreate = async (payload) => {
    // payload: { commerceantId, clientId, addressLivraison, details }
    await dispatch(createCommande(payload));
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Commandes" subtitle="Bloc-note des commandes" />

      {loading ? (
        <ActivityIndicator />
      ) : items.length === 0 ? (
        <Card style={{ padding: spacing(4), alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>Aucune commande</Text>
          <Text style={{ color: colors.textMuted, marginTop: spacing(1) }}>
            Ajoute ta première commande avec le bouton +
          </Text>
        </Card>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: spacing(2) }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('CommandeDetail', { id: item.id })}>
              <Card style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.title}>{item.client?.nom} {item.client?.prenom}</Text>
                  <StatusPill statut={item.statut} />
                </View>
                <Text style={styles.muted}>{item.addressLivraison}</Text>
                {item.details ? <Text style={styles.details}>{item.details}</Text> : null}
              </Card>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <NewCommandeModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(3) },
  card: { padding: spacing(4) },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(2) },
  title: { fontSize: 16, fontWeight: '700', color: colors.text },
  muted: { color: colors.textMuted, marginBottom: spacing(1) },
  details: { color: colors.text, fontSize: 14 },
  fab: {
    position: 'absolute',
    right: spacing(4),
    bottom: spacing(6),
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  fabText: { color: '#FFF', fontSize: 28, fontWeight: '800', marginTop: -2 },
});

export default CommandesListScreen;