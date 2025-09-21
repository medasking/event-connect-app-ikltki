
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { useAuth } from '../hooks/useAuth';
import { useAdminAuth } from '../hooks/useAdminAuth';
import Icon from './Icon';

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function TabBar({ activeTab, onTabPress }: TabBarProps) {
  const { user, isAdmin } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();

  const tabs = [
    { id: 'home', icon: 'home-outline', activeIcon: 'home' },
    { id: 'user-posts', icon: 'people-outline', activeIcon: 'people' },
    // Only show admin tab if user exists and is admin (authentication will be checked when pressed)
    ...(user?.isAdmin ? [{ id: 'admin-create', icon: 'shield-outline', activeIcon: 'shield-checkmark' }] : []),
    { id: 'create', icon: 'add-circle-outline', activeIcon: 'add-circle' },
    { id: 'messages', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
    { id: 'profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  const getTabColor = (tab: any) => {
    if (activeTab === tab.id) {
      // Special color for admin tab when active and authenticated
      if (tab.id === 'admin-create' && isAdmin() && isAdminAuthenticated()) {
        return colors.success;
      }
      return colors.primary;
    }
    
    // Special color for admin tab when not authenticated
    if (tab.id === 'admin-create' && (!isAdmin() || !isAdminAuthenticated())) {
      return colors.warning;
    }
    
    return colors.text;
  };

  return (
    <View style={[commonStyles.tabBar, styles.container]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            commonStyles.tabBarItem,
            tab.id === 'admin-create' && styles.adminTab
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={activeTab === tab.id ? tab.activeIcon as any : tab.icon as any}
            size={24}
            color={getTabColor(tab)}
          />
          {/* Security indicator for admin tab */}
          {tab.id === 'admin-create' && (
            <View style={[
              styles.securityIndicator,
              {
                backgroundColor: isAdmin() && isAdminAuthenticated() 
                  ? colors.success 
                  : colors.warning
              }
            ]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
  },
  adminTab: {
    position: 'relative',
  },
  securityIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
