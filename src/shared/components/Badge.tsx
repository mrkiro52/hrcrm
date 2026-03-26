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
    'Новый': 'bg-blue-100 text-blue-800',
    'Недозвон': 'bg-neutral-200 text-neutral-800',
    'Перезвон': 'bg-yellow-100 text-yellow-800',
    'Назначено собеседование 1 этап': 'bg-purple-100 text-purple-800',
    'Проведено собеседование 1 этап': 'bg-purple-100 text-purple-800',
    'Назначено собеседование 2 этап': 'bg-indigo-100 text-indigo-800',
    'Проведено собеседование 2 этап': 'bg-indigo-100 text-indigo-800',
    'Прислали оффер': 'bg-green-100 text-green-800',
    'Вышел на работу': 'bg-green-200 text-green-900',
    'Кадровый резерв': 'bg-blue-50 text-blue-800',
    'Отказ от компании после звонка': 'bg-red-50 text-red-800',
    'Отказ от компании после собеседования': 'bg-red-50 text-red-800',
    'Отказ кандидата': 'bg-red-50 text-red-800',
    'Open': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800',
  };
  
  return (
    <span className={cn(baseStyles, statusColors[status] || 'bg-gray-100 text-gray-800', className)}>
      {status}
    </span>
  );
};
