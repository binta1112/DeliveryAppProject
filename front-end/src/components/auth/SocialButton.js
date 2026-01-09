import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { authStyles } from '../../styles/authStyles';

const SocialButton = ({ icon, type, onPress }) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'facebook':
        return authStyles.socialButtonFacebook;
      case 'twitter':
        return authStyles.socialButtonTwitter;
      case 'apple':
        return authStyles.socialButtonApple;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      style={[authStyles.socialButton, getButtonStyle()]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={authStyles.socialIcon}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;