
import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { mockEvents } from '../data/mockData';
import EventCard from '../components/EventCard';
import Icon from '../components/Icon';

interface MainFeedProps {
  onEventPress: (eventId: string) => void;
  onComment: (eventId: string) => void;
  onAttend: (eventId: string) => void;
}

export default function MainFeed({ onEventPress, onComment, onAttend }: MainFeedProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log('Refreshing main feed...');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Separate admin posts and user posts
  const adminPosts = mockEvents.filter(event => event.isAdminPost);
  const userPosts = mockEvents.filter(event => !event.isAdminPost);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Admin Posts Section */}
      {adminPosts.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="shield-checkmark" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Official Announcements</Text>
          </View>
          {adminPosts.map((event) => (
            <View key={event.id} style={styles.adminPostWrapper}>
              <EventCard
                event={event}
                onPress={() => onEventPress(event.id)}
                onComment={() => onComment(event.id)}
                onAttend={() => onAttend(event.id)}
              />
            </View>
          ))}
        </View>
      )}

      {/* User Posts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="people" size={20} color={colors.text} />
          <Text style={styles.sectionTitle}>Community Events</Text>
        </View>
        {userPosts.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => onEventPress(event.id)}
            onComment={() => onComment(event.id)}
            onAttend={() => onAttend(event.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  adminPostWrapper: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
});
