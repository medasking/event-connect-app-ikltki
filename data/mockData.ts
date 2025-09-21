
import { User, Event, Comment, Message, Conversation } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Event enthusiast and community organizer',
    isAdmin: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    username: 'sarah_smith',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Love connecting people through amazing events',
    isAdmin: false,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    username: 'mike_wilson',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech meetup organizer',
    isAdmin: false,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    username: 'admin_lisa',
    name: 'Lisa Admin',
    email: 'lisa@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Community Administrator',
    isAdmin: true,
    createdAt: new Date('2024-01-10'),
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Official Community Announcement',
    description: 'Important updates about our community guidelines and upcoming platform changes. All members are encouraged to read and participate in the discussion.',
    date: new Date('2024-03-10T10:00:00'),
    location: 'Community Platform',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    authorId: '1',
    author: mockUsers[0],
    organizer: mockUsers[0],
    attendees: 150,
    comments: [],
    isAdminPost: true,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '2',
    title: 'Platform Maintenance Notice',
    description: 'Scheduled maintenance will occur on March 12th from 2:00 AM to 4:00 AM EST. During this time, some features may be temporarily unavailable.',
    date: new Date('2024-03-12T02:00:00'),
    location: 'Platform Wide',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
    authorId: '4',
    author: mockUsers[3],
    organizer: mockUsers[3],
    attendees: 0,
    comments: [],
    isAdminPost: true,
    createdAt: new Date('2024-01-30'),
  },
  {
    id: '3',
    title: 'Tech Meetup 2024',
    description: 'Join us for an exciting tech meetup where we\'ll discuss the latest trends in mobile development, AI, and web technologies. Great networking opportunities!',
    date: new Date('2024-03-15T18:00:00'),
    location: 'Downtown Conference Center',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    authorId: '2',
    author: mockUsers[1],
    organizer: mockUsers[1],
    attendees: 25,
    comments: [],
    isAdminPost: false,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Community Art Workshop',
    description: 'Unleash your creativity in our community art workshop! All skill levels welcome. We\'ll provide materials and guidance.',
    date: new Date('2024-03-20T14:00:00'),
    location: 'Community Arts Center',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop',
    authorId: '2',
    author: mockUsers[1],
    organizer: mockUsers[1],
    attendees: 18,
    comments: [],
    isAdminPost: false,
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    title: 'Startup Networking Night',
    description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts. Pitch your ideas and find potential collaborators!',
    date: new Date('2024-03-25T19:00:00'),
    location: 'Innovation Hub',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
    authorId: '3',
    author: mockUsers[2],
    organizer: mockUsers[2],
    attendees: 12,
    comments: [],
    isAdminPost: false,
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
    eventId: '3',
    createdAt: new Date('2024-02-02'),
  },
  {
    id: '2',
    content: 'Great initiative! Will there be beginner-friendly sessions?',
    authorId: '3',
    author: mockUsers[2],
    eventId: '3',
    createdAt: new Date('2024-02-03'),
  },
  {
    id: '3',
    content: 'Thanks for the update! Very helpful information.',
    authorId: '2',
    author: mockUsers[1],
    eventId: '1',
    createdAt: new Date('2024-01-26'),
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
    conversationId: '1',
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
    conversationId: '1',
    createdAt: new Date('2024-02-15T10:35:00'),
    read: true,
  },
  {
    id: '3',
    content: 'Not presenting this time, but excited to learn!',
    senderId: '2',
    sender: mockUsers[1],
    receiverId: '1',
    receiver: mockUsers[0],
    conversationId: '1',
    createdAt: new Date('2024-02-15T10:40:00'),
    read: false,
  },
  {
    id: '4',
    content: 'Are you organizing any events soon?',
    senderId: '3',
    sender: mockUsers[2],
    receiverId: '1',
    receiver: mockUsers[0],
    conversationId: '2',
    createdAt: new Date('2024-02-16T14:20:00'),
    read: true,
  },
  {
    id: '5',
    content: 'Yes! Planning a startup networking event next month.',
    senderId: '1',
    sender: mockUsers[0],
    receiverId: '3',
    receiver: mockUsers[2],
    conversationId: '2',
    createdAt: new Date('2024-02-16T14:25:00'),
    read: true,
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    otherUser: mockUsers[1],
    lastMessage: mockMessages[2],
    updatedAt: new Date('2024-02-15T10:40:00'),
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[2]],
    otherUser: mockUsers[2],
    lastMessage: mockMessages[4],
    updatedAt: new Date('2024-02-16T14:25:00'),
  },
];

// Current user (for demo purposes - this is an admin user)
export const currentUser: User = mockUsers[0];

// Add comments to events
mockEvents[2].comments = [mockComments[0], mockComments[1]];
mockEvents[0].comments = [mockComments[2]];
