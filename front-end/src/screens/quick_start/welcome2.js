
import {
  View,  
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

  import { useNavigation } from '@react-navigation/native';
  import OnboardingSlide from '../../components/OnboardingSlide';
  import useOnboardingNavigation from '../../hooks/useOnboardingNavigation';

  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const onboardingData = [
    {
      title: 'Order from choosen chef',
      description:
        'Get all your loved foods in one once place, you just place the orer we do the rest',
      illustration: 'chef',
    },
    {
      title: 'All your favorites',
      description:
        'Get all your loved foods in one once place, you just place the orer we do the rest',
      illustration: 'favorites',
    },
    {
      title: 'Free delivery offers',
      description:
        'Get all your loved foods in one once place, you just place the orer we do the rest',
      illustration: 'delivery',
    },
  ];

  export default  function OnboardingScreen() {
    const navigation = useNavigation();
    const {
      currentIndex,
      scrollViewRef,
      handleScroll,
      handleNext,
      handleSkip,
    } = useOnboardingNavigation(onboardingData.length, navigation);

    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {onboardingData.map((item, index) => (
            <View key={index} style={{ width: SCREEN_WIDTH }}>
              <OnboardingSlide
                item={item}
                index={index}
                currentIndex={currentIndex}
                total={onboardingData.length}
                onNext={handleNext}
                onSkip={handleSkip}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    slide: {
    backgroundColor: '#FF6B35',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7A7A7A',
  },
});
