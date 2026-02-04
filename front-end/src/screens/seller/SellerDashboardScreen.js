import React, { useMemo, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCommandes } from '../../redux/slices/commandes.slice';
import { fetchClients } from '../../redux/slices/clients.slice';
import ScreenHeader from '../../components/ui/ScreenHeader';
import StatCard from '../../components/ui/StatCard';
import CardPro from '../../components/ui/CardPro';
import Avatar from '../../components/ui/Avatar';
import { colors, gradients, spacing, typography, radii, shadows } from '../../styles/theme';

export default function SellerDashboardScreen() {
  const dispatch = useAppDispatch();
  const { items: commandes } = useAppSelector((s) => s.commandes);
  const { items: clients } = useAppSelector((s) => s.clients);
  const commerceantId = useAppSelector((s) => s.auth.commerceantId);

  useEffect(() => {
    if (commerceantId) {
      dispatch(fetchCommandes({ commerceantId }));
      dispatch(fetchClients());
    }
  }, [dispatch, commerceantId]);

  const stats = useMemo(() => {
    const pending = commandes.filter((c) => c.statut === 'PENDING').length;
    const inProgress = commandes.filter((c) => c.statut === 'IN_PROGRESS').length;
    const completed = commandes.filter((c) => c.statut === 'COMPLETED').length;

    return {
      totalCommandes: commandes.length,
      totalClients: clients.length,
      pending,
      inProgress,
      completed,
    };
  }, [commandes, clients]);

  const recentCommandes = useMemo(() => commandes.slice(0, 3), [commandes]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header avec gradient */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Bonjour 👋</Text>
            <Text style={styles.welcomeText}>Bienvenue sur votre dashboard</Text>
          </View>
          <Avatar name="Commerçant" size={50} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <StatCard title="Commandes" value={stats.totalCommandes} icon="receipt-outline" gradient />
          <View style={{ width: spacing(3) }} />
          <StatCard title="Clients" value={stats.totalClients} icon="people-outline" />
        </View>

        {/* Status Cards */}
        <View style={styles.statusRow}>
          <CardPro style={styles.statusCard}>
            <View style={[styles.statusDot, { backgroundColor: colors.warning }]} />
            <Text style={styles.statusValue}>{stats.pending}</Text>
            <Text style={styles.statusLabel}>En attente</Text>
          </CardPro>
          <CardPro style={styles.statusCard}>
            <View style={[styles.statusDot, { backgroundColor: colors.info }]} />
            <Text style={styles.statusValue}>{stats.inProgress}</Text>
            <Text style={styles.statusLabel}>En cours</Text>
          </CardPro>
          <CardPro style={styles.statusCard}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
            <Text style={styles.statusValue}>{stats.completed}</Text>
            <Text style={styles.statusLabel}>Terminées</Text>
          </CardPro>
        </View>

        {/* Recent Commandes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Commandes récentes</Text>
          <Text style={styles.seeAll}>Voir tout</Text>
        </View>

        {recentCommandes.length === 0 ? (
          <CardPro variant="outlined" style={styles.emptyCard}>
            <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Aucune commande récente</Text>
          </CardPro>
        ) : (
          recentCommandes.map((cmd) => (
            <CardPro key={cmd.id} style={styles.commandeCard} variant="highlighted">
              <View style={styles.commandeHeader}>
                <Avatar name={`${cmd.client?.nom} ${cmd.client?.prenom}`} size={40} />
                <View style={styles.commandeInfo}>
                  <Text style={styles.commandeName}>{cmd.client?.nom} {cmd.client?.prenom}</Text>
                  <Text style={styles.commandeAddress}>{cmd.addressLivraison}</Text>
                </View>
              </View>
            </CardPro>
          ))
        )}

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
        </View>

        <View style={styles.actionsRow}>
          <CardPro style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: colors.primaryLight + '20' }]}>
              <Ionicons name="add-circle" size={28} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Nouvelle commande</Text>
          </CardPro>
          <CardPro style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="person-add" size={28} color={colors.success} />
            </View>
            <Text style={styles.actionText}>Ajouter client</Text>
          </CardPro>
          <CardPro style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: colors.info + '20' }]}>
              <Ionicons name="car" size={28} color={colors.info} />
            </View>
            <Text style={styles.actionText}>Demande livraison</Text>
          </CardPro>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerGradient: {
    paddingTop: spacing(15),
    paddingBottom: spacing(10),
    paddingHorizontal: spacing(5),
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { ...typography.h2, color: '#FFF' },
  welcomeText: { ...typography.small, color: 'rgba(255,255,255,0.8)', marginTop: spacing(1) },
  content: { padding: spacing(5), marginTop: -spacing(8) },
  statsRow: { flexDirection: 'row', marginBottom: spacing(4) },
  statusRow: { flexDirection: 'row', gap: spacing(3), marginBottom: spacing(5) },
  statusCard: { flex: 1, alignItems: 'center', padding: spacing(3) },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginBottom: spacing(2) },
  statusValue: { ...typography.h3, color: colors.text },
  statusLabel: { ...typography.caption, color: colors.textMuted },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(3) },
  sectionTitle: { ...typography.h4, color: colors.text },
  seeAll: { ...typography.smallMedium, color: colors.primary },
  emptyCard: { alignItems: 'center', padding: spacing(8) },
  emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing(3) },
  commandeCard: { marginBottom: spacing(3) },
  commandeHeader: { flexDirection: 'row', alignItems: 'center' },
  commandeInfo: { marginLeft: spacing(3), flex: 1 },
  commandeName: { ...typography.bodySemiBold, color: colors.text },
  commandeAddress: { ...typography.small, color: colors.textMuted },
  actionsRow: { flexDirection: 'row', gap: spacing(3) },
  actionCard: { flex: 1, alignItems: 'center', padding: spacing(4) },
  actionIcon: { width: 56, height: 56, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', marginBottom: spacing(2) },
  actionText: { ...typography.captionMedium, color: colors.textSecondary, textAlign: 'center' },
});