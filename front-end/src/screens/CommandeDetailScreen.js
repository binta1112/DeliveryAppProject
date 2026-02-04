import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { commandesService } from '../services/commandes.service';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';
import Header from '../components/Header';
import { colors, spacing, radii } from '../styles/theme';
import PrimaryButton from '../components/PrimaryButton';
import { CommandeStatus } from '../types/commande';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createDemandeLivraison } from '../redux/slices/demandesLivraison.slice';

const CommandeDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [statut, setStatut] = useState(CommandeStatus.PENDING);

  const dispatch = useAppDispatch();

  const load = async () => {
    setLoading(true);
    const res = await commandesService.get(id);
    setData(res);
    setNote(res?.details ?? '');
    setStatut(res?.statut ?? CommandeStatus.PENDING);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const save = async () => {
    await commandesService.update(id, { details: note, statut });
    await load();
  };

  const createDemande = useCallback(() => {
    dispatch(createDemandeLivraison({ commandeId: id }));
  }, [dispatch, id]);

  if (loading || !data) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Header title="Détail commande" />
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>{data.client?.nom} {data.client?.prenom}</Text>
          <StatusPill statut={data.statut} />
        </View>
        <Text style={styles.label}>Adresse</Text>
        <Text style={styles.text}>{data.addressLivraison}</Text>

        <Text style={[styles.label, { marginTop: spacing(3) }]}>Statut</Text>
        <View style={styles.badges}>
          {Object.values(CommandeStatus).map((s) => (
            <PrimaryButton
              key={s}
              title={s}
              onPress={() => setStatut(s)}
              style={[
                styles.badgeBtn,
                s === statut && { backgroundColor: colors.primaryDark },
              ]}
            />
          ))}
        </View>

        <Text style={[styles.label, { marginTop: spacing(3) }]}>Bloc-note</Text>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={4}
          value={note}
          onChangeText={setNote}
          placeholder="Notes, rappels internes, consignes…"
        />

        <PrimaryButton title="Sauvegarder" onPress={save} style={{ marginTop: spacing(3) }} />
        <PrimaryButton title="Créer demande livraison" onPress={createDemande} style={{ marginTop: spacing(2) }} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(3) },
  card: { padding: spacing(4) },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing(2) },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  label: { marginTop: spacing(2), fontSize: 13, fontWeight: '700', color: colors.textMuted },
  text: { fontSize: 15, color: colors.text, marginTop: spacing(0.5) },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing(1) },
  badgeBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: radii.md },
  textarea: {
    marginTop: spacing(1),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing(3),
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
  },
});

export default CommandeDetailScreen;