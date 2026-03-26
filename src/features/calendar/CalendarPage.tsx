import React, { useState } from 'react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';
import { cn } from '@/shared/utils/helpers';
import type { Meeting } from '@/types/tasks';
import { mockMeetings } from '@/services/mockTasks';

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  // Generate 7 days starting from currentDate
  const getDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = getDays();

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleAddMeeting = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveMeeting = () => {
    if (!newMeeting.title || !newMeeting.startTime || !newMeeting.endTime) return;

    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      description: newMeeting.description,
      date: selectedDate,
      startTime: newMeeting.startTime,
      endTime: newMeeting.endTime,
    };

    setMeetings((prev) => [...prev, meeting]);
    setNewMeeting({ title: '', description: '', startTime: '', endTime: '' });
    setIsModalOpen(false);
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  const getMeetingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return meetings.filter((m) => m.date === dateStr);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  const formatDayOfWeek = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      weekday: 'short',
    }).format(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Календарь встреч</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={handlePrevWeek}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <span className="text-sm font-medium text-neutral-700 px-4">
            {formatDate(days[0])} - {formatDate(days[6])}
          </span>
          <Button variant="ghost" onClick={handleNextWeek}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((date, index) => {
          const dayMeetings = getMeetingsForDate(date);
          const dateStr = date.toISOString().split('T')[0];

          return (
            <div
              key={index}
              className={cn(
                'bg-white rounded-lg shadow-sm p-4 border-2 min-h-[300px]',
                isToday(date) ? 'border-primary-500' : 'border-neutral-200'
              )}
            >
              {/* Day Header */}
              <div className="mb-3">
                <div
                  className={cn(
                    'text-xs font-semibold uppercase',
                    isToday(date) ? 'text-primary-600' : 'text-neutral-500'
                  )}
                >
                  {formatDayOfWeek(date)}
                </div>
                <div
                  className={cn(
                    'text-2xl font-bold',
                    isToday(date) ? 'text-primary-600' : 'text-neutral-900'
                  )}
                >
                  {date.getDate()}
                </div>
              </div>

              {/* Meetings */}
              <div className="space-y-2 mb-3">
                {dayMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="bg-primary-50 border border-primary-200 rounded p-2 text-xs group relative"
                  >
                    <div className="font-medium text-primary-900 mb-1">{meeting.title}</div>
                    <div className="text-primary-700">
                      {meeting.startTime} - {meeting.endTime}
                    </div>
                    {meeting.description && (
                      <div className="text-primary-600 mt-1">{meeting.description}</div>
                    )}
                    <button
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-danger-DEFAULT hover:text-danger-dark"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={() => handleAddMeeting(dateStr)}
                className="w-full py-2 border border-dashed border-neutral-300 rounded text-neutral-500 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors text-sm"
              >
                + Добавить встречу
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Meeting Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Новая встреча"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Название встречи"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
            placeholder="Введите название"
          />

          <Input
            label="Описание"
            value={newMeeting.description}
            onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
            placeholder="Добавьте описание (необязательно)"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Время начала"
              type="time"
              value={newMeeting.startTime}
              onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
            />

            <Input
              label="Время окончания"
              type="time"
              value={newMeeting.endTime}
              onChange={(e) => setNewMeeting({ ...newMeeting, endTime: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSaveMeeting}>
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
