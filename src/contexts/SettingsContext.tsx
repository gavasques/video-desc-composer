
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  settings: any;
  updateSettings: (newSettings: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  userInfo: any;
  setUserInfo: (user: any) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'pt-BR',
    notifications: {
      success: true,
      errors: true,
      updates: false,
      marketing: false
    },
    backup: {
      enabled: true,
      frequency: 'daily',
      location: 'local'
    },
    logs: {
      level: 'info',
      retention: '30'
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Load settings and auth state on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }

    const savedAuth = localStorage.getItem('auth-state');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setIsAuthenticated(parsedAuth.isAuthenticated);
        setUserInfo(parsedAuth.userInfo);
      } catch (error) {
        console.error('Failed to parse saved auth state:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem('app-settings', JSON.stringify(newSettings));
  };

  const setAuthenticatedWithPersistence = (auth: boolean) => {
    setIsAuthenticated(auth);
    const authState = { isAuthenticated: auth, userInfo: auth ? userInfo : null };
    localStorage.setItem('auth-state', JSON.stringify(authState));
  };

  const setUserInfoWithPersistence = (user: any) => {
    setUserInfo(user);
    const authState = { isAuthenticated: isAuthenticated, userInfo: user };
    localStorage.setItem('auth-state', JSON.stringify(authState));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        isAuthenticated,
        setIsAuthenticated: setAuthenticatedWithPersistence,
        userInfo,
        setUserInfo: setUserInfoWithPersistence,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
