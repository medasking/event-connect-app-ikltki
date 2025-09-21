
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function AdminCreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [isAnnouncement, setIsAnnouncement] = useState(false);

  const handleCreatePost = () => {
    console.log('Creating admin post:', { title, description, location, date, isAnnouncement });
    
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a post title');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a post description');
      return;
    }

    // Here you would typically save the admin post to your backend
    Alert.alert('Success', 'Admin post created successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form
          setTitle('');
          setDescription('');
          setLocation('');
          setDate('');
          setIsAnnouncement(false);
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Icon name="shield-checkmark" size={32} color={colors.primary} />
          <Text style={styles.title}>Admin Post</Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Post Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter post title"
              placeholderTextColor={colors.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your announcement or post"
              placeholderTextColor={colors.grey}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location (Optional)</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Location if applicable"
              placeholderTextColor={colors.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date & Time (Optional)</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="e.g., Dec 25, 2024 at 7:00 PM"
              placeholderTextColor={colors.grey}
            />
          </View>

          <Button
            text="Create Admin Post"
            onPress={handleCreatePost}
            style={styles.createButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 12,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
});
