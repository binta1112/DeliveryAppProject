import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { authStyles } from '../../styles/authStyles';

const InputField = ({ label, type, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const secureTextEntry = type === 'password' && !showPassword;

  return (
    <View style={authStyles.inputContainer}>
      <Text style={authStyles.label}>{label}</Text>
      <View style={authStyles.inputWrapper}>
        <TextInput
          style={[authStyles.input, error && authStyles.inputError]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize="none"
        />
        {type === 'password' && (
          <TouchableOpacity
            style={authStyles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={{ fontSize: 20 }}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={authStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;