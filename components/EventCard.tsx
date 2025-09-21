
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { Event } from '../types';
import Icon from './Icon';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  onComment: () => void;
  onAttend: () => void;
}

export default function EventCard({ event, onPress, onComment, onAttend }: EventCardProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={[
      commonStyles.card,
      styles.container,
      event.isAdminPost && styles.adminCard
    ]} onPress={onPress}>
      {/* Admin Post Header */}
      {event.isAdminPost && (
        <View style={styles.adminHeader}>
          <View style={styles.adminBadge}>
            <Icon name="shield-checkmark" size={16} color={colors.success} />
            <Text style={styles.adminBadgeText}>OFFICIAL</Text>
          </View>
          <View style={styles.adminIndicator}>
            <Text style={styles.adminIndicatorText}>Admin Post</Text>
          </View>
        </View>
      )}

      {/* Event Image */}
      {event.imageUrl && (
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
      )}

      {/* Event Content */}
      <View style={styles.content}>
        <Text style={[
          styles.title,
          event.isAdminPost && styles.adminTitle
        ]}>
          {event.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={3}>
          {event.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="calendar-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>

        {/* Organizer Info */}
        <View style={styles.organizer}>
          {event.organizer.avatar && (
            <Image source={{ uri: event.organizer.avatar }} style={styles.avatar} />
          )}
          <View style={styles.organizerInfo}>
            <Text style={styles.organizerName}>
              {event.organizer.name}
              {event.organizer.isAdmin && (
                <Text style={styles.adminTag}> • Admin</Text>
              )}
            </Text>
            <Text style={styles.organizerRole}>
              {event.isAdminPost ? 'Official Announcement' : 'Event Organizer'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onComment}>
            <Icon name="chatbubble-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.actionText}>
              {event.comments?.length || 0} Comments
            </Text>
          </TouchableOpacity>

          {!event.isAdminPost && (
            <TouchableOpacity style={styles.actionButton} onPress={onAttend}>
              <Icon name="people-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.actionText}>
                {event.attendees} Attending
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  adminCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    backgroundColor: colors.successLight,
  },
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.success + '30',
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.background,
    letterSpacing: 0.5,
  },
  adminIndicator: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  adminIndicatorText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.success,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 24,
  },
  adminTitle: {
    color: colors.success,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  details: {
    gap: 8,
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  organizer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  adminTag: {
    color: colors.success,
    fontSize: 12,
  },
  organizerRole: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
