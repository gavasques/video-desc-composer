
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: 'pending' | 'configured' | 'ignored' | 'completed' | 'failed';
  className?: string;
}

const StatusBadge = React.memo(({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending': 
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="w-4 h-4" />
        };
      case 'configured':
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 'ignored':
      case 'failed':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertTriangle className="w-4 h-4" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`${config.color} ${className || ''}`}>
      {config.icon}
      <span className="ml-1 capitalize">{status}</span>
    </Badge>
  );
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
