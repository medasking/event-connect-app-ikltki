
import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAuth } from '../hooks/useAuth';
import { mockEvents } from '../data/mockData';
import EventCard from '../components/EventCard';
import TabBar from '../components/TabBar';
import AuthScreen from './auth';
import CreateEventScreen from './create-event';
import MessagesScreen from './messages';
import ProfileScreen from './profile';
import EventDetailScreen from './event-detail';

export default function MainScreen() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log('Refreshing feed...');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleEventPress = (eventId: string) => {
    console.log('Event pressed:', eventId);
    setSelectedEventId(eventId);
  };

  const handleComment = (eventId: string) => {
    console.log('Comment on event:', eventId);
    setSelectedEventId(eventId);
  };

  const handleAttend = (eventId: string) => {
    console.log('Attend event:', eventId);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.content}>
          {/* Loading state could be enhanced with a proper loading component */}
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (selectedEventId) {
    return (
      <EventDetailScreen 
        eventId={selectedEventId} 
        onBack={() => setSelectedEventId(null)} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => handleEventPress(event.id)}
                onComment={() => handleComment(event.id)}
                onAttend={() => handleAttend(event.id)}
              />
            ))}
          </ScrollView>
        );
      case 'create':
        return <CreateEventScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1 }}>
        {renderContent()}
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
