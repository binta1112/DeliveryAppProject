import { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen(props) {
  const loading = useRef(new Animated.Value(0)).current;

  const startAnimation = async () => {
    Animated.timing(loading, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      if (seen === 'true') {
        props.navigation.replace('Login');
      } else {
        props.navigation.replace('Onboarding');
      }
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.decorationTopLeft}>
        {[...Array(15)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.ray,
              {
                transform: [{ rotate: `${i * 6.5}deg` }],
                opacity: 0.1 + i * 0.04,
                transformOrigin: 'left center',
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/image_welcome_pg1.png')}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
        <View>
          <View style={{ width: 300, height: 10, borderRadius: 50, backgroundColor: '#eee', overflow: 'hidden', marginTop: 16 }}>
            <Animated.View
              style={{
                width: loading.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                }),
                height: 10,
                borderRadius: 50,
                backgroundColor: '#FF6B35',
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.decorationBottomRight}>
        {[...Array(15)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.ray,
              {
                transform: [{ rotate: `${i * 6.5}deg` }],
                opacity: 0.1 + i * 0.04,
                transformOrigin: 'right center',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorationTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    height: 200,
  },
  decorationBottomRight: {
    position: 'absolute',
    bottom: -90,
    right: 140,
    width: 200,
    height: 200,
  },
  ray: {
    position: 'absolute',
    width: 250,
    height: 4,
    backgroundColor: '#FF6B35',
    left: 100,
    top: 100,
    
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 10,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  letterF: {
    width: 28,
    height: 48,
    position: 'relative',
  },
  fVertical: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 6,
    height: 48,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
  },
  fHorizontalTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 24,
    height: 6,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
  },
  fHorizontalMiddle: {
    position: 'absolute',
    left: 0,
    top: 21,
    width: 20,
    height: 6,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
  },
  ooContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  oOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  letterD: {
    width: 32,
    height: 48,
    position: 'relative',
  },
  dVertical: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 6,
    height: 48,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
  },
  dCurve: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 32,
    height: 48,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
  },
});
