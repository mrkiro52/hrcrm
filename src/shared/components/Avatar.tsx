import React from 'react';
import { cn } from '@/shared/utils/helpers';
import { getInitials } from '@/shared/utils/helpers';

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
  };
  
  const initials = getInitials(firstName, lastName);
  
  // Generate a consistent color based on the name
  const colorIndex = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % 5;
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
  ];
  
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full text-white font-semibold',
        sizes[size],
        colors[colorIndex],
        className
      )}
    >
      {initials}
    </div>
  );
};
