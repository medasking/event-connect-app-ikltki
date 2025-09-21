
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { mockConversations, mockMessages } from '../data/mockData';
import ConversationItem from '../components/ConversationItem';
import MessageItem from '../components/MessageItem';
import Icon from '../components/Icon';

export default function MessagesScreen() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleConversationPress = (conversationId: string) => {
    console.log('Opening conversation:', conversationId);
    setSelectedConversationId(conversationId);
  };

  const handleBackToConversations = () => {
    console.log('Back to conversations list');
    setSelectedConversationId(null);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      console.log('Cannot send empty message');
      return;
    }
    
    console.log('Sending message:', newMessage);
    // Here you would typically send the message to your backend
    setNewMessage('');
  };

  const selectedConversation = selectedConversationId 
    ? mockConversations.find(conv => conv.id === selectedConversationId)
    : null;

  const conversationMessages = selectedConversationId
    ? mockMessages.filter(msg => msg.conversationId === selectedConversationId)
    : [];

  if (selectedConversation) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={handleBackToConversations} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.chatTitle}>{selectedConversation.otherUser.name}</Text>
        </View>

        <ScrollView style={styles.messagesContainer}>
          {conversationMessages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ScrollView>

        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor={colors.grey}
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Icon name="send" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        
        <ScrollView style={styles.conversationsList}>
          {mockConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              onPress={() => handleConversationPress(conversation.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  conversationsList: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  messageInput: {
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
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
