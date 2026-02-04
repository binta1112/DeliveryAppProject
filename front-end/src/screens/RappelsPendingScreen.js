import React, { useEffect, useCallback } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchPendingRappels, markRappelRead } from '../redux/slices/rappels.slice';
import Header from '../components/Header';
import RappelCard from '../components/RappelCard';
import { colors, spacing } from '../styles/theme';

const RappelsPendingScreen = () => {
  const dispatch = useAppDispatch();
  const { pending, loading } = useAppSelector((s) => s.rappels);

  useEffect(() => {
    dispatch(fetchPendingRappels());
  }, [dispatch]);

  const handleMarkRead = useCallback((id) => {
    dispatch(markRappelRead(id));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }) => <RappelCard item={item} onMarkRead={handleMarkRead} />,
    [handleMarkRead]
  );

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Header title="Rappels" subtitle="Notifications de commandes" />
      <FlatList
        data={pending}
        keyExtractor={(r) => r.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing(2) }} />}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(3) },
});

export default RappelsPendingScreen;