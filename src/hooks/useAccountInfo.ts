
import { useState, useEffect } from 'react';
import { UserAccount } from '@/types/settings';
import { StorageService } from '@/services/StorageService';

export const useAccountInfo = () => {
  const [userInfo, setUserInfo] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = () => {
      const mockUserInfo: UserAccount = {
        name: "Canal Demo",
        email: "demo@youtube.com",
        channelId: "UC123456789",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        isVerified: true,
        joinedDate: "2020-03-15",
        connectionStatus: "connected"
      };
      setUserInfo(mockUserInfo);
      setLoading(false);
    };

    loadUserInfo();
  }, []);

  return { userInfo, loading, setUserInfo };
};
