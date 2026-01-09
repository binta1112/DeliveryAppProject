
import { View, StyleSheet, Image } from 'react-native';

export default function DeliveryIllustration() {
  return (
    <View style={styles.illustrationContainer}>
      <Image
        source={require('../../../assets/image_welcome_pg1.png')}
        style={{ width: 280, height: 280, resizeMode: 'contain' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
});
