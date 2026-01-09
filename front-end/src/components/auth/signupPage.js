import  { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useAuth from '../../hooks/useAuth';
import { validationService } from '../../services/ValidationService';
import InputField from './InputField';
import Checkbox from './Checkbox';
import SubmitButton from './SubmitButton';
import SocialButton from './SocialButton';
import Divider from './Divider';
import { authStyles } from '../../styles/authStyles';

const SignUpPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { Register, isloading } = useAuth();

  const handleSubmit = async () => {   

    const validation = validationService.validateRegisterForm(fullName, email, password, passwordConfirmation);
    setValidationErrors(validation.errors);

    if (!validation.isValid) return;
    if (!acceptTerms) {
      Alert.alert('Error', 'You must accept the Terms & Conditions');
      return;
    }

    try {
      await Register(fullName, email, password);
      Alert.alert('Success', 'Registration successful!');
      // Navigation ou autre logique après succès
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Info', `${provider} login not implemented`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['#ffbf6d','#ffccbb']}
        style={authStyles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width: '100%',  }}>
            <View style={authStyles.header}>
              <Text style={authStyles.title}>Sign Up</Text>
              <Text style={authStyles.subtitle}>Create a new account</Text>
            </View>

            

            <View style={authStyles.card}>
              <InputField
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={setFullName}
                error={validationErrors.fullName}
              />
              <InputField
                label="EMAIL"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={setEmail}
                error={validationErrors.email}
              />

              <InputField
                label="PASSWORD"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={setPassword}
                error={validationErrors.password}
              />
              <InputField
                label="PASSWORD CONFIRMATION"
                type="password"
                placeholder="••••••••••"
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
                error={validationErrors.passwordConfirmation}
              />              

              <View style={authStyles.rememberRow}>
                <Checkbox
                  label="Agree to Terms & Conditions"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />               
              </View>

              <SubmitButton loading={isloading} onPress={handleSubmit}>
                SIGN UP
              </SubmitButton>

              <View style={authStyles.signupContainer}>
                <Text style={authStyles.signupText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}
                >
                  <Text style={authStyles.signupLink}>LOG IN</Text>
                </TouchableOpacity>
              </View>

              <Divider text="Or" />

              <View style={authStyles.socialContainer}>
                <SocialButton
                  icon="f"
                  type="facebook"
                  onPress={() => handleSocialLogin('Facebook')}
                />
                <SocialButton
                  icon="X"
                  type="twitter"
                  onPress={() => handleSocialLogin('Twitter')}
                />
                <SocialButton
                  icon=""
                  type="apple"
                  onPress={() => handleSocialLogin('Apple')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;