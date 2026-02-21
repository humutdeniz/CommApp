import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AuthLayout, { authStyles } from '../components/AuthLayout';
import { clearError, register } from '../slices/authSlice';

export default function RegisterPage({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
       
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const onSubmit = () => {
    const safeName = name.trim();
    const safeEmail = email.trim().toLowerCase();
    const safePassword = password.trim();
    if (!safeName || !safeEmail || !safePassword) return;

    const existingUser = users.find((user) => user.email === safeEmail);
    dispatch(register({ name: safeName, email: safeEmail, password: safePassword }));

    if (!existingUser) {
      navigation.navigate('Login');
    }
  };

  const goToLogin = () => {
    dispatch(clearError());
    setName('');
    setEmail('');
    setPassword('');
    navigation.navigate('Login');
  };

  return (
    <AuthLayout>
      <Animated.View
        style={[
          authStyles.panel,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={authStyles.heading}>Create Account</Text>
        <Text style={authStyles.subheading}>Join the feed and start sharing instantly.</Text>

        <TextInput
          style={authStyles.input}
          placeholder="Full Name"
          placeholderTextColor="#7f8aa3"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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
          <Text style={authStyles.primaryButtonText}>Build My Account</Text>
        </Pressable>

        <View style={authStyles.switchRow}>
          <Text style={authStyles.switchText}>Already have an account?</Text>
          <Pressable onPress={goToLogin}>
            <Text style={authStyles.switchLink}>Login</Text>
          </Pressable>
        </View>
      </Animated.View>
    </AuthLayout>
  );
}
