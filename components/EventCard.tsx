
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  onComment: () => void;
  onAttend: () => void;
}

export default function EventCard({ event, onPress, onComment, onAttend }: EventCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={[styles.container, event.isAdminPost && styles.adminPost]} onPress={onPress}>
      {event.imageUrl && (
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.authorInfo}>
            {event.author.avatar && (
              <Image source={{ uri: event.author.avatar }} style={styles.avatar} />
            )}
            <View style={styles.authorDetails}>
              <View style={styles.authorNameRow}>
                <Text style={styles.authorName}>{event.author.name}</Text>
                {event.isAdminPost && (
                  <View style={styles.adminBadge}>
                    <Icon name="shield-checkmark" size={14} color={colors.background} />
                    <Text style={styles.adminBadgeText}>ADMIN</Text>
                  </View>
                )}
              </View>
              <Text style={styles.date}>{formatDate(event.createdAt)}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.title, event.isAdminPost && styles.adminTitle]}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {event.description}
        </Text>

        <View style={styles.eventDetails}>
          <View style={styles.detailItem}>
            <Icon name="calendar-outline" size={16} color={colors.grey} />
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="location-outline" size={16} color={colors.grey} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onAttend}>
            <Icon name="checkmark-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.actionText}>{event.attendees} Attending</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onComment}>
            <Icon name="chatbubble-outline" size={20} color={colors.grey} />
            <Text style={styles.actionText}>{event.comments.length} Comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    ...commonStyles.shadow,
  },
  adminPost: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorDetails: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.background,
    marginLeft: 2,
  },
  date: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  adminTitle: {
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
    marginBottom: 16,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.grey,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: colors.grey,
    marginLeft: 6,
  },
});
