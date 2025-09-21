
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { useAuth } from '../hooks/useAuth';
import { useAdminAuth } from '../hooks/useAdminAuth';

// Screen imports
import MainFeed from './main-feed';
import CreateEventScreen from './create-event';
import ProfileScreen from './profile';
import AuthScreen from './auth';
import UserPosts from './user-posts';
import EventDetailScreen from './event-detail';
import MessagesScreen from './messages';
import AdminCreateScreen from './admin-create';
import AdminLoginScreen from './admin-login';

// Component imports
import TabBar from '../components/TabBar';

export default function MainScreen() {
  const { user, isLoading, isAdmin } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

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
    console.log('Create post pressed');
    setActiveTab('create');
  };

  const handleTabPress = (tab: string) => {
    console.log('Tab pressed:', tab);
    
    // Handle admin tab specially
    if (tab === 'admin-create') {
      if (!isAdmin() || !isAdminAuthenticated()) {
        setShowAdminLogin(true);
        return;
      }
    }
    
    setActiveTab(tab);
    setSelectedEventId(null);
  };

  const handleAdminAuthenticated = () => {
    console.log('Admin authenticated successfully');
    setShowAdminLogin(false);
    setActiveTab('admin-create');
  };

  const handleBackFromAdminLogin = () => {
    console.log('Back from admin login');
    setShowAdminLogin(false);
  };

  const renderContent = () => {
    // Show admin login if requested
    if (showAdminLogin) {
      return (
        <AdminLoginScreen
          onAdminAuthenticated={handleAdminAuthenticated}
          onBack={handleBackFromAdminLogin}
        />
      );
    }

    // Show event detail if selected
    if (selectedEventId) {
      return (
        <EventDetailScreen
          eventId={selectedEventId}
          onBack={() => setSelectedEventId(null)}
        />
      );
    }

    // Show appropriate screen based on active tab
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
        // Double-check admin authentication
        if (!isAdmin() || !isAdminAuthenticated()) {
          setShowAdminLogin(true);
          return null;
        }
        return <AdminCreateScreen />;
      case 'create':
        return <CreateEventScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return (
          <MainFeed
            onEventPress={handleEventPress}
            onComment={handleComment}
            onAttend={handleAttend}
          />
        );
    }
  };

  // Show auth screen if user is not authenticated
  if (!user && !isLoading) {
    return <AuthScreen />;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        {renderContent()}
        {!showAdminLogin && !selectedEventId && (
          <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
        )}
      </View>
    </SafeAreaView>
  );
}
