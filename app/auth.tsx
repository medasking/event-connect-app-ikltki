
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || (isSignUp && !username)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Check if trying to sign in with admin email
    if (!isSignUp && email.toLowerCase().includes('admin')) {
      Alert.alert(
        'Admin Access Required',
        'This appears to be an admin account. Admin users must use the secure admin login process.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);
    try {
      let success = false;
      if (isSignUp) {
        success = await signUp(username, email, password);
      } else {
        success = await signIn(email, password);
      }

      if (!success) {
        Alert.alert('Error', 'Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.log('Auth error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Icon name="calendar" size={48} color={colors.primary} />
          </View>
          
          <Text style={commonStyles.title}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            {isSignUp 
              ? 'Join the community and discover amazing events' 
              : 'Sign in to continue to your account'
            }
          </Text>

          <View style={styles.form}>
            {isSignUp && (
              <TextInput
                style={commonStyles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            )}
            
            <TextInput
              style={commonStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              text={isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              onPress={handleSubmit}
              style={[styles.submitButton, isLoading && styles.disabledButton]}
              textStyle={styles.submitButtonText}
            />
          </View>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.switchText}>
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : 'Don\'t have an account? Sign Up'
              }
            </Text>
          </TouchableOpacity>

          <View style={styles.adminNotice}>
            <Icon name="shield-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.adminNoticeText}>
              Admin users require secure authentication
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  submitButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  switchButton: {
    marginTop: 24,
    paddingVertical: 12,
  },
  switchText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  adminNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
  },
  adminNoticeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
