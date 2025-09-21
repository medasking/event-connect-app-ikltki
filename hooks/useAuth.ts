
import { useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { useAdminAuth } from './useAdminAuth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { adminUser, isAdminAuthenticated } = useAdminAuth();

  useEffect(() => {
    // Check for admin authentication first
    if (isAdminAuthenticated() && adminUser) {
      setUser(adminUser);
      setIsLoading(false);
      return;
    }

    // Simulate loading for regular users
    setTimeout(() => {
      // For demo purposes, set a regular user if no admin is authenticated
      if (!adminUser) {
        setUser(mockUsers[1]); // Sarah Smith - regular user
      }
      setIsLoading(false);
    }, 1000);
  }, [adminUser, isAdminAuthenticated]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    console.log('Regular user signing in with:', email);
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find user by email (excluding admin users for regular login)
        const foundUser = mockUsers.find(u => u.email === email && !u.isAdmin);
        if (foundUser) {
          setUser(foundUser);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1500);
    });
  };

  const signUp = async (username: string, email: string, password: string): Promise<boolean> => {
    console.log('Signing up with:', username, email);
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          username,
          name: username.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email,
          isAdmin: false, // Regular users are never admin
          createdAt: new Date(),
        };
        setUser(newUser);
        setIsLoading(false);
        resolve(true);
      }, 1500);
    });
  };

  const signOut = () => {
    console.log('Signing out');
    setUser(null);
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
  };

  // Enhanced admin check
  const isAdmin = (): boolean => {
    return user?.isAdmin === true && isAdminAuthenticated();
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    logout,
    isAdmin,
  };
};
