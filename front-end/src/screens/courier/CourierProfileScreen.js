import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import Avatar from '../../components/ui/Avatar';
import CardPro from '../../components/ui/CardPro';
import StorageService from '../../services/storageService';
import { colors, gradients, spacing, typography, radii, shadows } from '../../styles/theme';
import { useEffect } from 'react';
const MenuOption = ({ icon, label, onPress, danger }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <CardPro style={styles.menuOption}>
      <View style={[styles.menuIconWrapper, danger && { backgroundColor: colors.dangerLight }]}>
        <Ionicons name={icon} size={22} color={danger ? colors.danger : colors.primary} />
      </View>
      <Text style={[styles.menuLabel, danger && { color: colors.danger }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </CardPro>
  </TouchableOpacity>
);

export default function CourierProfileScreen() {
  useEffect(() => {
  (async () => {
    const s = await connectTrackingSocket();
    s.on("connect", () => {
      joinOrderRoom(orderId);

      setInterval(() => {
        sendDriverLocation({
          orderId,
          lat: 33.589,  // fake
          lng: -7.62,   // fake
          ts: Date.now(),
        });
      }, 2000);
    });
  })();
}, []);

  const dispatch = useDispatch();
  const { livreurId } = useAppSelector((s) => s.auth);

  const handleLogout = useCallback(() => {
  Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
    { text: 'Annuler', style: 'cancel' },
    {
      text: 'Déconnecter',
      style: 'destructive',
      onPress: async () => {
        await StorageService.clearTokens();
        dispatch(logout());
      },
    },
  ]);
}, [dispatch]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <Avatar name="Livreur" size={80} />
          <Text style={styles.profileName}>Livreur</Text>
          <Text style={styles.profileId}>ID: {livreurId || 'Non défini'}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="car" size={20} color="#FFF" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Livraisons</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="star" size={20} color="#FFF" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Note</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="cash" size={20} color="#FFF" />
              <Text style={styles.statValue}>2.4k</Text>
              <Text style={styles.statLabel}>Gains (MAD)</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Menu */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Compte</Text>
        <MenuOption icon="person-outline" label="Informations personnelles" onPress={() => {}} />
        <MenuOption icon="car-outline" label="Mon véhicule" onPress={() => {}} />
        <MenuOption icon="wallet-outline" label="Paiements" onPress={() => {}} />

        <Text style={styles.sectionTitle}>Paramètres</Text>
        <MenuOption icon="notifications-outline" label="Notifications" onPress={() => {}} />
        <MenuOption icon="shield-checkmark-outline" label="Confidentialité" onPress={() => {}} />
        <MenuOption icon="help-circle-outline" label="Aide & Support" onPress={() => {}} />

        <Text style={styles.sectionTitle}>Actions</Text>
        <MenuOption icon="log-out-outline" label="Se déconnecter" onPress={handleLogout} danger />
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerGradient: {
    paddingTop: spacing(15),
    paddingBottom: spacing(8),
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
  },
  headerContent: { alignItems: 'center' },
  profileName: { ...typography.h2, color: '#FFF', marginTop: spacing(3) },
  profileId: { ...typography.small, color: 'rgba(255,255,255,0.7)', marginTop: spacing(1) },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.lg,
    marginTop: spacing(5),
    marginHorizontal: spacing(5),
    padding: spacing(4),
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { ...typography.h3, color: '#FFF', marginTop: spacing(1) },
  statLabel: { ...typography.caption, color: 'rgba(255,255,255,0.7)', marginTop: spacing(1) },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  menuContainer: { padding: spacing(5) },
  sectionTitle: { ...typography.captionMedium, color: colors.textMuted, marginTop: spacing(4), marginBottom: spacing(3) },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  menuIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { ...typography.bodyMedium, color: colors.text, flex: 1, marginLeft: spacing(4) },
  footer: { alignItems: 'center', paddingVertical: spacing(6) },
  versionText: { ...typography.caption, color: colors.textMuted },
});