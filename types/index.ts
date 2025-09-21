
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  authorId: string;
  author: User;
  attendees: User[];
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  eventId: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  updatedAt: Date;
}
