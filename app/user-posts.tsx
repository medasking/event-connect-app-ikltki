
import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import EventCard from '../components/EventCard';
import Icon from '../components/Icon';

interface UserPostsProps {
  onEventPress: (eventId: string) => void;
  onComment: (eventId: string) => void;
  onAttend: (eventId: string) => void;
  onCreatePost: () => void;
}

export default function UserPosts({ onEventPress, onComment, onAttend, onCreatePost }: UserPostsProps) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log('Refreshing user posts...');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Filter only user posts (non-admin posts)
  const userPosts = mockEvents.filter(event => !event.isAdminPost);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="people" size={24} color={colors.text} />
          <Text style={styles.headerTitle}>Community Events</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={onCreatePost}>
          <Icon name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {userPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="calendar-outline" size={64} color={colors.grey} />
            <Text style={styles.emptyTitle}>No Community Events Yet</Text>
            <Text style={styles.emptyDescription}>
              Be the first to create an event for the community!
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={onCreatePost}>
              <Text style={styles.emptyButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        ) : (
          userPosts.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => onEventPress(event.id)}
              onComment={() => onComment(event.id)}
              onAttend={() => onAttend(event.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
