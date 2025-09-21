
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAdminAuth } from '../hooks/useAdminAuth';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function AdminCreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);

  const { 
    adminUser, 
    signOutAdmin, 
    isAdminAuthenticated, 
    extendAdminSession, 
    getSessionTimeRemaining 
  } = useAdminAuth();

  useEffect(() => {
    // Update session time every second
    const interval = setInterval(() => {
      const timeRemaining = getSessionTimeRemaining();
      setSessionTimeRemaining(timeRemaining);
      
      // Warn when session is about to expire (5 minutes remaining)
      if (timeRemaining <= 5 * 60 * 1000 && timeRemaining > 4 * 60 * 1000) {
        Alert.alert(
          'Session Expiring Soon',
          'Your admin session will expire in 5 minutes. Would you like to extend it?',
          [
            { text: 'Extend Session', onPress: extendAdminSession },
            { text: 'Continue', style: 'cancel' }
          ]
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCreatePost = async () => {
    if (!isAdminAuthenticated()) {
      Alert.alert('Session Expired', 'Your admin session has expired. Please log in again.');
      signOutAdmin();
      return;
    }

    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsCreating(true);

    try {
      // Simulate API call to create admin post
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Admin post created:', {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        author: adminUser?.name,
        isAdminPost: true,
        createdAt: new Date(),
      });

      Alert.alert(
        'Success',
        'Admin post created successfully!',
        [
          {
            text: 'Create Another',
            onPress: () => {
              setTitle('');
              setDescription('');
              setLocation('');
            }
          },
          { text: 'OK', style: 'default' }
        ]
      );

    } catch (error) {
      console.log('Error creating admin post:', error);
      Alert.alert('Error', 'Failed to create admin post. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of the admin panel?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: signOutAdmin 
        }
      ]
    );
  };

  const formatSessionTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSessionColor = (): string => {
    if (sessionTimeRemaining <= 5 * 60 * 1000) return colors.error; // Red for < 5 minutes
    if (sessionTimeRemaining <= 10 * 60 * 1000) return colors.warning; // Orange for < 10 minutes
    return colors.success; // Green for > 10 minutes
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.adminBadge}>
              <Icon name="shield-checkmark" size={24} color={colors.success} />
              <Text style={styles.adminText}>Admin Panel</Text>
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Icon name="log-out-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.sessionInfo}>
            <Icon name="time" size={16} color={getSessionColor()} />
            <Text style={[styles.sessionText, { color: getSessionColor() }]}>
              Session: {formatSessionTime(sessionTimeRemaining)}
            </Text>
            <TouchableOpacity 
              style={styles.extendButton} 
              onPress={extendAdminSession}
            >
              <Text style={styles.extendButtonText}>Extend</Text>
            </TouchableOpacity>
          </View>

          <Text style={commonStyles.title}>Create Admin Post</Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Official announcements and important updates
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.securityNotice}>
            <Icon name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.securityText}>
              Admin posts are prominently displayed and marked as official content.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Post Title *</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Enter official post title"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
            <Text style={styles.characterCount}>{title.length}/100</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[commonStyles.input, styles.descriptionInput]}
              placeholder="Enter detailed description of the announcement or update"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.characterCount}>{description.length}/1000</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location (Optional)</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Platform-wide, Specific section, etc."
              value={location}
              onChangeText={setLocation}
              maxLength={100}
            />
          </View>

          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Preview:</Text>
            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <Icon name="shield-checkmark" size={16} color={colors.success} />
                <Text style={styles.previewBadge}>OFFICIAL</Text>
              </View>
              <Text style={styles.previewPostTitle}>
                {title || 'Post Title'}
              </Text>
              <Text style={styles.previewDescription}>
                {description || 'Post description will appear here...'}
              </Text>
              {location && (
                <Text style={styles.previewLocation}>📍 {location}</Text>
              )}
            </View>
          </View>

          <Button
            text={isCreating ? 'Creating Admin Post...' : 'Create Official Post'}
            onPress={handleCreatePost}
            style={[
              styles.createButton,
              isCreating && styles.disabledButton
            ]}
            textStyle={styles.createButtonText}
            disabled={isCreating}
          />
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
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  adminText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  signOutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.errorLight,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sessionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  extendButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
  },
  extendButtonText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    gap: 24,
    paddingBottom: 32,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
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
  characterCount: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  descriptionInput: {
    height: 120,
    paddingTop: 12,
  },
  previewContainer: {
    gap: 12,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  previewCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  previewBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
    letterSpacing: 0.5,
  },
  previewPostTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  previewLocation: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  createButton: {
    backgroundColor: colors.success,
    marginTop: 8,
  },
  createButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
