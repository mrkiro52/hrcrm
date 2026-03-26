import React from 'react';
import { cn } from '@/shared/utils/helpers';
import type { CandidateStatus } from '@/types/models';

interface BadgeProps {
  status: CandidateStatus | 'Open' | 'Closed';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium';
  
  const statusColors: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Interview': 'bg-purple-100 text-purple-800',
    'Offered': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Open': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800',
  };
  
  return (
    <span className={cn(baseStyles, statusColors[status] || 'bg-gray-100 text-gray-800', className)}>
      {status}
    </span>
  );
};
