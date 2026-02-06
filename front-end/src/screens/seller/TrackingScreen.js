import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import {
  connectTrackingSocket,
  joinOrderRoom,
  disconnectTrackingSocket,
} from '../../services/tracking.service';

const TrackingScreen = ({ route }) => {
  const { orderId } = route.params;

  const [driverPosition, setDriverPosition] = useState(null);
  const [path, setPath] = useState([]); 
  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);
  const ENABLE_SIM = __DEV__;

  useEffect(() => {
    let isMounted = true;
    let s = null;
    setPath([]);
    (async () => {
      s = await connectTrackingSocket();

      const startRoom = () => {
        joinOrderRoom(orderId);
        if (ENABLE_SIM) s.emit('simulate_driver_start', { orderId, everyMs: 2000 });
      };

      if (s.connected) startRoom();
      else s.once('connect', startRoom);

      
      s.on('driver_location_update', (data) => {
        if (!isMounted) return;
        if (data?.orderId !== orderId) return;

        const next = { latitude: data.lat, longitude: data.lng };

        setDriverPosition(next);
        setPath((prev) => {
          // éviter doublons trop proches
          const last = prev[prev.length - 1];
          if (last && Math.abs(last.latitude - next.latitude) < 0.000001 && Math.abs(last.longitude - next.longitude) < 0.000001) {
            return prev;
          }
          return [...prev, next];
        });

        setLoading(false);
      });

      s.on('connect_error', (err) => console.log("WS connect_error:", err?.message));
    })();

    return () => {
      isMounted = false;
      if (ENABLE_SIM && s?.connected) s.emit('simulate_driver_stop');
      disconnectTrackingSocket();
    };
  }, [orderId]);

  
  useEffect(() => {
    if (path.length < 2 || !mapRef.current) return;
    mapRef.current.fitToCoordinates(path, {
      edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
      animated: true,
    });
  }, [path]);

  return (
    <View style={styles.container}>
      

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : driverPosition ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            ...driverPosition,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/*  Trajet */}
          {path.length >= 2 && (
            <Polyline coordinates={path} strokeWidth={4} />
          )}

          <Marker coordinate={driverPosition} title="Livreur" />
        </MapView>
      ) : (
        <Text>Aucune position reçue pour le livreur.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', margin: 16, textAlign: 'center' },
  map: { flex: 1 },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrackingScreen;
