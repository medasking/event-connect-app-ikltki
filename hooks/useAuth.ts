
import { useState, useEffect } from 'react';
import { User } from '../types';
import { currentUser } from '../data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUser(currentUser);
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    console.log('Signing in with:', email);
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(currentUser);
        setIsLoading(false);
        resolve(true);
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
          email,
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

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};
