import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { clearError, login, register } from '../slices/authSlice';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    dispatch(clearError());
    resetForm();
  };

  const onSubmit = () => {
    const safeName = name.trim();
    const safeEmail = email.trim().toLowerCase();
    const safePassword = password.trim();

    if (!safeEmail || !safePassword || (mode === 'register' && !safeName)) {
      return;
    }

    if (mode === 'register') {
      const existingUser = users.find((user) => user.email === safeEmail);
      dispatch(register({ name: safeName, email: safeEmail, password: safePassword }));

      if (!existingUser) {
        switchMode('login');
      }
      return;
    }

    dispatch(login({ email: safeEmail, password: safePassword }));
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(14, 165, 164, 0.45)', 'rgba(14, 165, 164, 0)']}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={styles.glowOne}
      />
      <LinearGradient
        colors={['rgba(249, 115, 22, 0.4)', 'rgba(249, 115, 22, 0)']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={styles.glowTwo}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centerWrap}
      >
        <Animated.View
          style={[
            styles.panel,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.heading}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</Text>
          <Text style={styles.subheading}>
            {mode === 'login'
              ? 'Continue where your community left off.'
              : 'Join the feed and start sharing instantly.'}
          </Text>

          <View style={styles.modeRow}>
            <Pressable
              onPress={() => switchMode('login')}
              style={[styles.modeButton, mode === 'login' && styles.modeButtonActive]}
            >
              <Text style={[styles.modeText, mode === 'login' && styles.modeTextActive]}>Login</Text>
            </Pressable>
            <Pressable
              onPress={() => switchMode('register')}
              style={[styles.modeButton, mode === 'register' && styles.modeButtonActive]}
            >
              <Text style={[styles.modeText, mode === 'register' && styles.modeTextActive]}>Register</Text>
            </Pressable>
          </View>

          {mode === 'register' && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#7f8aa3"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#7f8aa3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7f8aa3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.primaryButton} onPress={onSubmit}>
            <Text style={styles.primaryButtonText}>
              {mode === 'login' ? 'Enter Community' : 'Build My Account'}
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1220',
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  glowOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 999,
    top: -60,
    right: -40,
  },
  glowTwo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 999,
    bottom: -80,
    left: -30,
  },
  panel: {
    backgroundColor: '#f4f6fb',
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#dbe3f0',
    shadowColor: '#020617',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  overline: {
    color: '#0ea5a4',
    fontSize: 11,
    letterSpacing: 1.3,
    fontWeight: '700',
    marginBottom: 8,
  },
  heading: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subheading: {
    color: '#475569',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
  modeRow: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 13,
    padding: 4,
    marginBottom: 14,
  },
  modeButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  modeButtonActive: {
    backgroundColor: '#0f172a',
  },
  modeText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 14,
  },
  modeTextActive: {
    color: '#f8fafc',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c6d1e4',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: '#c62828',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 10,
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 2,
    borderRadius: 14,
    backgroundColor: '#f97316',
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#7c2d12',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff7ed',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
