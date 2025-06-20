
import { useState, useEffect } from 'react';
import { QuotaUsage } from '@/types/settings';
import { ApiService } from '@/services/ApiService';

export const useQuotaMonitoring = () => {
  const [quotaUsage, setQuotaUsage] = useState<QuotaUsage>({
    used: 850,
    limit: 10000,
    resetDate: '2024-06-21'
  });

  useEffect(() => {
    const loadQuotaUsage = async () => {
      try {
        const usage = await ApiService.getQuotaUsage();
        setQuotaUsage(usage);
      } catch (error) {
        console.error('Failed to load quota usage:', error);
      }
    };

    loadQuotaUsage();
  }, []);

  const quotaPercentage = (quotaUsage.used / quotaUsage.limit) * 100;
  const isNearLimit = quotaPercentage > 80;

  return { quotaUsage, quotaPercentage, isNearLimit };
};
