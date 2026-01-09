import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { authStyles } from '../../styles/authStyles';

const SubmitButton = ({ loading, children, onPress }) => {
  return (
    <TouchableOpacity
      style={[authStyles.submitButton, loading && authStyles.submitButtonDisabled]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={authStyles.submitButtonText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;