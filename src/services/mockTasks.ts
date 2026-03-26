import type { Task, Meeting } from '@/types/tasks';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Позвонить Ивану Петрову',
    description: 'Обсудить условия работы',
    completed: false,
    createdAt: '2024-01-15T10:00:00',
  },
  {
    id: '2',
    title: 'Подготовить документы для новых сотрудников',
    description: 'Трудовые договоры, NDA',
    completed: false,
    createdAt: '2024-01-16T11:00:00',
  },
  {
    id: '3',
    title: 'Провести собеседование с Марией',
    description: 'Техническое интервью',
    completed: true,
    createdAt: '2024-01-14T14:00:00',
  },
  {
    id: '4',
    title: 'Обновить объявления на HeadHunter',
    description: 'Добавить новые вакансии',
    completed: false,
    createdAt: '2024-01-17T09:00:00',
  },
  {
    id: '5',
    title: 'Отправить оффер Алексею Козлову',
    description: 'Финальное предложение о работе',
    completed: false,
    createdAt: '2024-01-17T15:00:00',
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Собеседование с Иваном Петровым',
    description: 'Первичное интервью на позицию менеджера по продажам',
    date: '2024-01-20',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: '2',
    title: 'Встреча с руководителем отдела',
    description: 'Обсуждение новых вакансий',
    date: '2024-01-20',
    startTime: '14:00',
    endTime: '15:00',
  },
  {
    id: '3',
    title: 'Техническое интервью - Мария Сидорова',
    description: 'Проверка навыков работы с негабаритными грузами',
    date: '2024-01-22',
    startTime: '11:00',
    endTime: '12:30',
  },
];
