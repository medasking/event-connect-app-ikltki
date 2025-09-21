
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAdminAuth } from '../hooks/useAdminAuth';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface AdminLoginScreenProps {
  onAdminAuthenticated: () => void;
  onBack: () => void;
}

export default function AdminLoginScreen({ onAdminAuthenticated, onBack }: AdminLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  const { signInAdmin, isLoading, requiresTwoFactor } = useAdminAuth();

  const MAX_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockoutTime > 0) {
      interval = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1000) {
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTime]);

  const handleAdminLogin = async () => {
    if (isLocked) {
      Alert.alert('Account Locked', `Too many failed attempts. Try again in ${Math.ceil(lockoutTime / 60000)} minutes.`);
      return;
    }

    if (!email || !password || !adminCode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (requiresTwoFactor && !twoFactorCode) {
      Alert.alert('Error', 'Please enter the two-factor authentication code');
      return;
    }

    const result = await signInAdmin({
      email,
      password,
      adminCode,
      twoFactorCode: requiresTwoFactor ? twoFactorCode : undefined,
    });

    if (result.success) {
      console.log('Admin login successful');
      setAttempts(0);
      onAdminAuthenticated();
    } else if (result.requiresTwoFactor) {
      Alert.alert(
        'Two-Factor Authentication Required',
        'A 6-digit verification code has been generated. For demo purposes, enter any 6-digit number.',
        [{ text: 'OK' }]
      );
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(LOCKOUT_DURATION);
        Alert.alert(
          'Account Locked',
          `Too many failed login attempts. Account locked for ${LOCKOUT_DURATION / 60000} minutes.`
        );
      } else {
        Alert.alert(
          'Authentication Failed',
          `${result.error}\n\nAttempts remaining: ${MAX_ATTEMPTS - newAttempts}`
        );
      }
    }
  };

  const formatLockoutTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.securityBadge}>
            <Icon name="shield-checkmark" size={32} color={colors.primary} />
          </View>
          <Text style={commonStyles.title}>Admin Access</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            High-security authentication required
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.securityNotice}>
            <Icon name="warning" size={20} color={colors.warning} />
            <Text style={styles.securityText}>
              This is a secure admin area. All login attempts are monitored and logged.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Admin Email</Text>
            <TextInput
              style={[commonStyles.input, isLocked && styles.disabledInput]}
              placeholder="Enter admin email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLocked}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Admin Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[commonStyles.input, styles.passwordInput, isLocked && styles.disabledInput]}
                placeholder="Enter secure admin password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!isLocked}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLocked}
              >
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={isLocked ? colors.textSecondary : colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Admin Access Code</Text>
            <TextInput
              style={[commonStyles.input, isLocked && styles.disabledInput]}
              placeholder="Enter admin access code"
              value={adminCode}
              onChangeText={setAdminCode}
              autoCapitalize="characters"
              editable={!isLocked}
            />
          </View>

          {requiresTwoFactor && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Two-Factor Authentication</Text>
              <TextInput
                style={[commonStyles.input, styles.twoFactorInput]}
                placeholder="Enter 6-digit code"
                value={twoFactorCode}
                onChangeText={setTwoFactorCode}
                keyboardType="numeric"
                maxLength={6}
              />
              <Text style={styles.twoFactorHint}>
                For demo: Enter any 6-digit number
              </Text>
            </View>
          )}

          {isLocked && (
            <View style={styles.lockoutContainer}>
              <Icon name="time" size={20} color={colors.error} />
              <Text style={styles.lockoutText}>
                Account locked for: {formatLockoutTime(lockoutTime)}
              </Text>
            </View>
          )}

          <Button
            text={isLoading ? 'Authenticating...' : 'Secure Admin Login'}
            onPress={handleAdminLogin}
            style={[
              styles.loginButton,
              (isLoading || isLocked) && styles.disabledButton
            ]}
            textStyle={styles.loginButtonText}
            disabled={isLoading || isLocked}
          />

          <View style={styles.attemptsContainer}>
            <Text style={styles.attemptsText}>
              Login attempts: {attempts}/{MAX_ATTEMPTS}
            </Text>
          </View>
        </View>

        <View style={styles.demoInfo}>
          <Text style={styles.demoTitle}>Demo Credentials:</Text>
          <Text style={styles.demoText}>Email: admin@eventapp.com</Text>
          <Text style={styles.demoText}>Password: AdminSecure2024!</Text>
          <Text style={styles.demoText}>Access Code: ADMIN_ACCESS_2024</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    padding: 8,
  },
  securityBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    gap: 20,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningLight,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.warning,
    fontWeight: '500',
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  twoFactorInput: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 4,
  },
  twoFactorHint: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  lockoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  lockoutText: {
    color: colors.error,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  loginButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledInput: {
    opacity: 0.5,
    backgroundColor: colors.backgroundSecondary,
  },
  attemptsContainer: {
    alignItems: 'center',
  },
  attemptsText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  demoInfo: {
    marginTop: 32,
    padding: 16,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginBottom: 32,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
});
