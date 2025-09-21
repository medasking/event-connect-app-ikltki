
import { useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AdminCredentials {
  email: string;
  password: string;
  adminCode: string;
  twoFactorCode?: string;
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);

  // Admin session timeout (30 minutes)
  const ADMIN_SESSION_DURATION = 30 * 60 * 1000;
  
  // Predefined admin credentials (in production, this would be server-side)
  const ADMIN_CREDENTIALS = {
    email: 'admin@eventapp.com',
    password: 'AdminSecure2024!',
    adminCode: 'ADMIN_ACCESS_2024',
  };

  useEffect(() => {
    // Check if admin session has expired
    const checkSessionExpiry = () => {
      if (sessionExpiry && new Date() > sessionExpiry) {
        console.log('Admin session expired');
        signOutAdmin();
      }
    };

    const interval = setInterval(checkSessionExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [sessionExpiry]);

  const validateAdminCredentials = (credentials: AdminCredentials): boolean => {
    console.log('Validating admin credentials');
    
    // Check basic credentials
    if (credentials.email !== ADMIN_CREDENTIALS.email ||
        credentials.password !== ADMIN_CREDENTIALS.password ||
        credentials.adminCode !== ADMIN_CREDENTIALS.adminCode) {
      return false;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(credentials.password)) {
      return false;
    }

    return true;
  };

  const generateTwoFactorCode = (): string => {
    // In production, this would be sent via SMS/Email
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const signInAdmin = async (credentials: AdminCredentials): Promise<{ success: boolean; requiresTwoFactor?: boolean; error?: string }> => {
    console.log('Admin sign in attempt');
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate credentials
      if (!validateAdminCredentials(credentials)) {
        setIsLoading(false);
        return { success: false, error: 'Invalid admin credentials' };
      }

      // Check if two-factor is required
      if (!credentials.twoFactorCode) {
        const twoFactorCode = generateTwoFactorCode();
        console.log('Two-factor code generated:', twoFactorCode); // In production, this would be sent securely
        setRequiresTwoFactor(true);
        setIsLoading(false);
        return { success: false, requiresTwoFactor: true };
      }

      // Validate two-factor code (for demo, accept any 6-digit code)
      if (credentials.twoFactorCode.length !== 6 || !/^\d{6}$/.test(credentials.twoFactorCode)) {
        setIsLoading(false);
        return { success: false, error: 'Invalid two-factor authentication code' };
      }

      // Find admin user
      const adminUser = mockUsers.find(user => user.email === credentials.email && user.isAdmin);
      if (!adminUser) {
        setIsLoading(false);
        return { success: false, error: 'Admin user not found' };
      }

      // Set admin session
      const expiry = new Date(Date.now() + ADMIN_SESSION_DURATION);
      setAdminUser(adminUser);
      setSessionExpiry(expiry);
      setRequiresTwoFactor(false);
      setIsLoading(false);

      console.log('Admin authenticated successfully');
      return { success: true };

    } catch (error) {
      console.log('Admin authentication error:', error);
      setIsLoading(false);
      return { success: false, error: 'Authentication failed' };
    }
  };

  const signOutAdmin = () => {
    console.log('Admin signing out');
    setAdminUser(null);
    setSessionExpiry(null);
    setRequiresTwoFactor(false);
  };

  const isAdminAuthenticated = (): boolean => {
    if (!adminUser || !sessionExpiry) return false;
    return new Date() < sessionExpiry;
  };

  const extendAdminSession = () => {
    if (adminUser) {
      const newExpiry = new Date(Date.now() + ADMIN_SESSION_DURATION);
      setSessionExpiry(newExpiry);
      console.log('Admin session extended');
    }
  };

  const getSessionTimeRemaining = (): number => {
    if (!sessionExpiry) return 0;
    return Math.max(0, sessionExpiry.getTime() - Date.now());
  };

  return {
    adminUser,
    isLoading,
    requiresTwoFactor,
    signInAdmin,
    signOutAdmin,
    isAdminAuthenticated,
    extendAdminSession,
    getSessionTimeRemaining,
  };
};
