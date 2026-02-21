import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AuthLayout, { authStyles } from '../components/AuthLayout';
import { clearError, login } from '../slices/authSlice';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const onSubmit = () => {
    const safeEmail = email.trim().toLowerCase();
    const safePassword = password.trim();
    if (!safeEmail || !safePassword) return;

    dispatch(login({ email: safeEmail, password: safePassword }));
    setPassword('');
  };

  const goToRegister = () => {
    dispatch(clearError());
    setEmail('');
    setPassword('');
    navigation.navigate('Register');
  };

  return (
    <AuthLayout>
      <Animated.View
        style={[
          authStyles.panel,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={authStyles.heading}>Welcome Back</Text>
        <Text style={authStyles.subheading}>Continue where your community left off.</Text>

        <TextInput
          style={authStyles.input}
          placeholder="Email Address"
          placeholderTextColor="#7f8aa3"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={authStyles.input}
          placeholder="Password"
          placeholderTextColor="#7f8aa3"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

        <Pressable style={authStyles.primaryButton} onPress={onSubmit}>
          <Text style={authStyles.primaryButtonText}>Enter Community</Text>
        </Pressable>

        <View style={authStyles.switchRow}>
          <Text style={authStyles.switchText}>Don't have an account?</Text>
          <Pressable onPress={goToRegister}>
            <Text style={authStyles.switchLink}>Register</Text>
          </Pressable>
        </View>
      </Animated.View>
    </AuthLayout>
  );
}
