import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/shared/components/Avatar';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-neutral-200 h-16 flex items-center px-6 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-semibold text-neutral-900">HR CRM Нептумар</span>
          <span className="text-xs text-neutral-500">by kireev khanil</span>
        </Link>
        
        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Поиск кандидатов..."
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-jira text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* User */}
        <div className="flex items-center space-x-3">
          <Avatar firstName="Админ" lastName="Система" size="sm" />
        </div>
      </div>
    </header>
  );
};
