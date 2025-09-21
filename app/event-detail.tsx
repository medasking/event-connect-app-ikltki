
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { mockEvents, mockComments } from '../data/mockData';
import CommentItem from '../components/CommentItem';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface EventDetailScreenProps {
  eventId: string;
  onBack: () => void;
}

export default function EventDetailScreen({ eventId, onBack }: EventDetailScreenProps) {
  const [newComment, setNewComment] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  const event = mockEvents.find(e => e.id === eventId);
  const eventComments = mockComments.filter(comment => comment.eventId === eventId);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    
    console.log('Adding comment:', newComment);
    // Here you would typically save the comment to your backend
    setNewComment('');
    Alert.alert('Success', 'Comment added successfully!');
  };

  const handleAttendToggle = () => {
    setIsAttending(!isAttending);
    console.log('Attendance toggled:', !isAttending);
    Alert.alert(
      'Success', 
      isAttending ? 'You are no longer attending this event' : 'You are now attending this event!'
    );
  };

  const handleShare = () => {
    console.log('Share event:', eventId);
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  if (!event) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.errorText}>Event not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Icon name="share" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.eventHeader}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{formatDate(event.date)}</Text>
            <Text style={styles.location}>{event.location}</Text>
          </View>

          <View style={styles.organizerSection}>
            <Text style={styles.sectionTitle}>Organized by</Text>
            <View style={styles.organizerInfo}>
              <View style={styles.organizerAvatar}>
                <Text style={styles.organizerAvatarText}>
                  {event.organizer.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.organizerName}>{event.organizer.name}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{event.attendees}</Text>
              <Text style={styles.statLabel}>Attending</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{eventComments.length}</Text>
              <Text style={styles.statLabel}>Comments</Text>
            </View>
          </View>

          <View style={styles.actionsSection}>
            <Button
              text={isAttending ? "Cancel Attendance" : "Attend Event"}
              onPress={handleAttendToggle}
              style={[
                styles.attendButton,
                isAttending && styles.attendingButton
              ]}
              textStyle={isAttending ? styles.attendingButtonText : undefined}
            />
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Comments ({eventComments.length})</Text>
            
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Add a comment..."
                placeholderTextColor={colors.grey}
                multiline
              />
              <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
                <Icon name="send" size={20} color={colors.background} />
              </TouchableOpacity>
            </View>

            <View style={styles.commentsList}>
              {eventComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
              {eventComments.length === 0 && (
                <Text style={styles.noCommentsText}>
                  No comments yet. Be the first to comment!
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  shareButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  eventHeader: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: colors.grey,
  },
  organizerSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  organizerAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.grey,
  },
  actionsSection: {
    marginBottom: 32,
  },
  attendButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  attendingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  attendingButtonText: {
    color: colors.primary,
  },
  commentsSection: {
    marginBottom: 40,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: colors.text,
  },
  addCommentButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsList: {
    marginTop: 8,
  },
  noCommentsText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    marginTop: 50,
  },
});
