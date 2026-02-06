import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../api/client';
import { colors, spacing, typography, radii, gradients } from '../styles/theme';

const NotificationItem = ({ item, onPress }) => {
  const isNew = !item.read;

  const getIcon = () => {
    if (item.title?.toLowerCase().includes('proposition')) return 'pricetag';
    if (item.title?.toLowerCase().includes('accepté')) return 'checkmark-circle';
    if (item.title?.toLowerCase().includes('refusé')) return 'close-circle';
    return 'notifications';
  };

  const getIconColor = () => {
    if (item.title?.toLowerCase().includes('accepté')) return '#4CAF50';
    if (item.title?.toLowerCase().includes('refusé')) return '#F44336';
    return '#FF9955';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.card, isNew && styles.cardNew]}>
        {isNew && <View style={styles.newBadge} />}

        <View style={[styles.iconContainer, { backgroundColor: `${getIconColor()}15` }]}>
          <Ionicons name={getIcon()} size={24} color={getIconColor()} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.body} numberOfLines={2}>
            {item.body}
          </Text>
          <Text style={styles.time}>{formatDate(item.createdAt)}</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

export default function NotificationsScreen() {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await api.get('/notifications');
      setItems(res.data);
    } catch (error) {
      console.log('Erreur fetch notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.log('Erreur mark as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await api.patch('/notifications/read-all');
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.log('Erreur mark all:', error);
    }
  }, []);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="notifications-off-outline" size={64} color={colors.textMuted} />
      </View>
      <Text style={styles.emptyTitle}>Aucune notification</Text>
      <Text style={styles.emptySubtitle}>
        Vous recevrez des notifications lorsqu'il y aura des mises à jour importantes.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>
              {items.length > 0
                ? `${items.length} notification${items.length > 1 ? 's' : ''}`
                : 'Restez informé'}
            </Text>
          </View>

          {items.length > 0 && (
            <TouchableOpacity style={styles.markAllBtn} onPress={markAllAsRead}>
              <Ionicons name="checkmark-done-outline" size={18} color="#FFF" />
              <Text style={styles.markAllText}>Tout lu</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <FlatList
        data={items}
        keyExtractor={(n) => n.id}
        renderItem={({ item }) => (
          <NotificationItem item={item} onPress={() => markAsRead(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={!loading && renderEmpty()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF9955']}
            tintColor="#FF9955"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: spacing(15),
    paddingBottom: spacing(6),
    paddingHorizontal: spacing(5),
    borderBottomLeftRadius: radii.xxl,
    borderBottomRightRadius: radii.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing(1),
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(1.5),
    borderRadius: radii.md,
  },
  markAllText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: spacing(1),
  },
  listContent: {
    padding: spacing(4),
    paddingBottom: spacing(10),
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: radii.lg,
    padding: spacing(4),
    marginBottom: spacing(3),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardNew: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9955',
  },
  newBadge: {
    position: 'absolute',
    top: spacing(3),
    right: spacing(3),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9955',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing(3),
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing(1),
  },
  body: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing(2),
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing(15),
    paddingHorizontal: spacing(6),
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(5),
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing(2),
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});