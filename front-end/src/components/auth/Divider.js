import React from 'react';
import { View, Text } from 'react-native';
import { authStyles } from '../../styles/authStyles';

const Divider = ({ text }) => {
  return (
    <View style={authStyles.dividerContainer}>
      <View style={authStyles.dividerLine} />
      <Text style={authStyles.dividerText}>{text}</Text>
      <View style={authStyles.dividerLine} />
    </View>
  );
};

export default Divider;