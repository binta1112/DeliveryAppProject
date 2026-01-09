import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { authStyles } from '../../styles/authStyles';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity
      style={authStyles.checkboxContainer}
      onPress={() => onChange({ target: { checked: !checked } })}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderWidth: 2,
          borderColor: '#f97316',
          borderRadius: 4,
          backgroundColor: checked ? '#f97316' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {checked && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
      </View>
      <Text style={authStyles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;