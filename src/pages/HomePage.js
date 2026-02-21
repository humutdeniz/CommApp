import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { logout } from '../slices/authSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.label}>YOU ARE LIVE</Text>
        <Text style={styles.title}>Hey {currentUser?.name}, your circle is active.</Text>
        <Text style={styles.subtitle}>{currentUser?.email}</Text>

        <View style={styles.highlightRow}>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightValue}>24/7</Text>
            <Text style={styles.highlightLabel}>Realtime Feed</Text>
          </View>
          <View style={styles.highlightBoxAlt}>
            <Text style={styles.highlightValueAlt}>Secure</Text>
            <Text style={styles.highlightLabelAlt}>Auth Enabled</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={() => dispatch(logout())}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  bgTop: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 999,
    top: -90,
    left: -60,
    backgroundColor: '#14b8a6',
    opacity: 0.28,
  },
  bgBottom: {
    position: 'absolute',
    width: 290,
    height: 290,
    borderRadius: 999,
    right: -90,
    bottom: -110,
    backgroundColor: '#fb923c',
    opacity: 0.22,
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#dbe7f3',
    padding: 22,
    shadowColor: '#020617',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  label: {
    color: '#0ea5a4',
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '800',
    marginBottom: 10,
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: '#475569',
    marginTop: 10,
    marginBottom: 18,
    fontSize: 14,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  highlightBox: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  highlightBoxAlt: {
    flex: 1,
    backgroundColor: '#ffedd5',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#fdba74',
  },
  highlightValue: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  highlightLabel: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
  highlightValueAlt: {
    color: '#c2410c',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  highlightLabelAlt: {
    color: '#9a3412',
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#9a3412',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonText: {
    color: '#fff7ed',
    fontWeight: '800',
    letterSpacing: 0.2,
    fontSize: 15,
  },
});
