import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default function AuthLayout({ children }) {
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
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export const authStyles = StyleSheet.create({
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    color: '#475569',
    fontSize: 13,
  },
  switchLink: {
    color: '#f97316',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
});
