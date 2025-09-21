
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { useAuth } from '../hooks/useAuth';
import TabBar from '../components/TabBar';
import AuthScreen from './auth';
import CreateEventScreen from './create-event';
import AdminCreateScreen from './admin-create';
import MessagesScreen from './messages';
import ProfileScreen from './profile';
import EventDetailScreen from './event-detail';
import MainFeed from './main-feed';
import UserPosts from './user-posts';

export default function MainScreen() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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

  const handleCreatePost = () => {
    console.log('Navigate to create post');
    setActiveTab('create');
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
          <MainFeed
            onEventPress={handleEventPress}
            onComment={handleComment}
            onAttend={handleAttend}
          />
        );
      case 'user-posts':
        return (
          <UserPosts
            onEventPress={handleEventPress}
            onComment={handleComment}
            onAttend={handleAttend}
            onCreatePost={handleCreatePost}
          />
        );
      case 'admin-create':
        return user?.isAdmin ? <AdminCreateScreen /> : <CreateEventScreen />;
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
