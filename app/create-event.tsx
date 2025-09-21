
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from '../components/Button';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleCreateEvent = () => {
    console.log('Creating event:', { title, description, location, date });
    
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter an event description');
      return;
    }
    
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter an event location');
      return;
    }
    
    if (!date.trim()) {
      Alert.alert('Error', 'Please enter an event date');
      return;
    }

    // Here you would typically save the event to your backend
    Alert.alert('Success', 'Event created successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form
          setTitle('');
          setDescription('');
          setLocation('');
          setDate('');
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Create New Event</Text>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter event title"
              placeholderTextColor={colors.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your event"
              placeholderTextColor={colors.grey}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Event location"
              placeholderTextColor={colors.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date & Time</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="e.g., Dec 25, 2024 at 7:00 PM"
              placeholderTextColor={colors.grey}
            />
          </View>

          <Button
            text="Create Event"
            onPress={handleCreateEvent}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
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
