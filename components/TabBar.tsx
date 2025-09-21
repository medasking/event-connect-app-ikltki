
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface TabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function TabBar({ activeTab, onTabPress }: TabBarProps) {
  const tabs = [
    { id: 'home', icon: 'home-outline', activeIcon: 'home' },
    { id: 'create', icon: 'add-circle-outline', activeIcon: 'add-circle' },
    { id: 'messages', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
    { id: 'profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={[commonStyles.tabBar, styles.container]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={commonStyles.tabBarItem}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={activeTab === tab.id ? tab.activeIcon as any : tab.icon as any}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.text}
          />
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
});
