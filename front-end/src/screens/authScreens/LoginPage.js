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
import InputField from '../../components/auth/InputField';
import Checkbox from '../../components/auth/Checkbox';
import SubmitButton from '../../components/auth/SubmitButton';
import SocialButton from '../../components/auth/SocialButton';
import Divider from '../../components/auth/Divider';
import { authStyles } from '../../styles/authStyles';

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { Login,  isloading } = useAuth();
  

  const handleSubmit = async () => {   
    const validation = validationService.validateLoginForm(email, password);
    setValidationErrors(validation.errors);
  
   if (!validation.isValid) return;
    console.log('Submitting login form with:', { email, password, rememberMe });
    
    try {
      await Login(email, password);
      Alert.alert('Success', 'Login successful!');
      // Navigation ou autre logique après succès
    } catch (err) {
      console.log('Login failed:', err);
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
              <Text style={authStyles.title}>Log In</Text>
              <Text style={authStyles.subtitle}>
                Please sign in to your existing account
              </Text>
            </View>

            <View style={authStyles.card}>
              <InputField
                label="EMAIL"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange= {(text) => {setEmail(text);
                 const emailValidation = validationService.validateEmail(email);
                 setValidationErrors((prev) => ({ ...prev,email: emailValidation == false ? null : 'Invalid email address' }));
                }}
                error={validationErrors.email}
              />

              <InputField
              label="PASSWORD"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(text) => {
                setPassword(text);
                const pwdValidation = validationService.validatePassword(text);
                setValidationErrors((prev) => ({
                  ...prev,
                  password: pwdValidation ? null : 'Password must be at least 8 characters, include uppercase, lowercase, and a number',
                }));
              }}
              error={validationErrors.password}
            />
              

              <View style={authStyles.rememberRow}>
                <Checkbox
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <TouchableOpacity>
                  <Text style={authStyles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>
              </View>

              <SubmitButton loading={isloading} onPress={handleSubmit}>
                LOG IN
              </SubmitButton>

              <View style={authStyles.signupContainer}>
                <Text style={authStyles.signupText}>Don't have an account?</Text>
                <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}
                >
                  <Text style={authStyles.signupLink}  >SIGN UP</Text>
                </TouchableOpacity>
              </View>             
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;