import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PaginationDots from '../components/PaginationDots';
import ChefIllustration from './OnboardingIllustrations/ChefIllustration';
import FavoritesIllustration from './OnboardingIllustrations/FavoritesIllustration';
import DeliveryIllustration from './OnboardingIllustrations/DeliveryIllustration';

function renderIllustration(type) {
  switch (type) {
    case 'chef':
      return <ChefIllustration />;
    case 'favorites':
      return <FavoritesIllustration />;
    case 'delivery':
      return <DeliveryIllustration />;
    default:
      return null;
  }
}

export default function OnboardingSlide({
  item,
  index,
  currentIndex,
  total,
  onNext,
  onSkip,
}) {
  return (
    <View style={styles.slide}>
      {renderIllustration(item.illustration)}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <PaginationDots total={total} current={currentIndex} />
        <TouchableOpacity style={styles.nextButton} onPress={onNext} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>
            {currentIndex === total - 1 ? 'GET STARTED' : 'NEXT'}
          </Text>
        </TouchableOpacity>
        {currentIndex < total - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={onSkip} activeOpacity={0.6}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7A7A7A',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  nextButton: {
    width: '100%',
    height: 56,
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
