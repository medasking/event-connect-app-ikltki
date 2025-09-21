
import { User, Event, Comment, Message, Conversation } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Event enthusiast and community organizer',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    username: 'sarah_smith',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Love connecting people through amazing events',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    username: 'mike_wilson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech meetup organizer',
    createdAt: new Date('2024-02-01'),
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Meetup 2024',
    description: 'Join us for an exciting tech meetup where we\'ll discuss the latest trends in mobile development, AI, and web technologies. Great networking opportunities!',
    date: new Date('2024-03-15T18:00:00'),
    location: 'Downtown Conference Center',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    authorId: '1',
    author: mockUsers[0],
    attendees: [mockUsers[0], mockUsers[1]],
    comments: [],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    title: 'Community Art Workshop',
    description: 'Unleash your creativity in our community art workshop! All skill levels welcome. We\'ll provide materials and guidance.',
    date: new Date('2024-03-20T14:00:00'),
    location: 'Community Arts Center',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
    authorId: '2',
    author: mockUsers[1],
    attendees: [mockUsers[1], mockUsers[2]],
    comments: [],
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '3',
    title: 'Startup Networking Night',
    description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts. Pitch your ideas and find potential collaborators!',
    date: new Date('2024-03-25T19:00:00'),
    location: 'Innovation Hub',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
    authorId: '3',
    author: mockUsers[2],
    attendees: [mockUsers[2]],
    comments: [],
    createdAt: new Date('2024-02-10'),
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This looks amazing! Can\'t wait to attend.',
    authorId: '2',
    author: mockUsers[1],
    eventId: '1',
    createdAt: new Date('2024-02-02'),
  },
  {
    id: '2',
    content: 'Great initiative! Will there be beginner-friendly sessions?',
    authorId: '3',
    author: mockUsers[2],
    eventId: '1',
    createdAt: new Date('2024-02-03'),
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey! Are you going to the tech meetup?',
    senderId: '2',
    sender: mockUsers[1],
    receiverId: '1',
    receiver: mockUsers[0],
    createdAt: new Date('2024-02-15T10:30:00'),
    read: true,
  },
  {
    id: '2',
    content: 'Yes! Looking forward to it. Are you presenting?',
    senderId: '1',
    sender: mockUsers[0],
    receiverId: '2',
    receiver: mockUsers[1],
    createdAt: new Date('2024-02-15T10:35:00'),
    read: true,
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[1],
    updatedAt: new Date('2024-02-15T10:35:00'),
  },
];

// Current user (for demo purposes)
export const currentUser: User = mockUsers[0];

// Add comments to events
mockEvents[0].comments = mockComments;
