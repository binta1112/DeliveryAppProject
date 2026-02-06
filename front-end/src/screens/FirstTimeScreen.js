import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { completeFirstTime } from '../redux/slices/authSlice';
import { colors, spacing } from '../styles/theme';

export default function FirstTimeScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleContinue = useCallback(() => {
    dispatch(completeFirstTime());
    navigation.navigate('Login');
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.text}>
        Connectez-vous pour commencer
      </Text>

      <TouchableOpacity style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing(6), backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: '800', color: colors.primary },
  text: { marginTop: spacing(2), textAlign: 'center', color: colors.textMuted },
  btn: { marginTop: spacing(4), backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 32, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
});