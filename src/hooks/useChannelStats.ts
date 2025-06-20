
import { useState, useEffect } from 'react';
import { ChannelStats } from '@/types/settings';

export const useChannelStats = () => {
  const [stats, setStats] = useState<ChannelStats>({
    subscriberCount: "10.5K",
    videoCount: 127,
    totalViews: "1.2M"
  });

  return { stats, setStats };
};
