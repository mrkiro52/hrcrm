// Candidate statuses (RU)
export type CandidateStatus =
  | 'Новый'
  | 'Недозвон'
  | 'Перезвон'
  | 'Назначено собеседование 1 этап'
  | 'Проведено собеседование 1 этап'
  | 'Назначено собеседование 2 этап'
  | 'Проведено собеседование 2 этап'
  | 'Прислали оффер'
  | 'Вышел на работу'
  | 'Отказ от компании после звонка'
  | 'Отказ от компании после собеседования'
  | 'Отказ кандидата'
  | 'Кадровый резерв';

export type CandidateContactPointType =
  | 'Перезвон'
  | 'Собеседование 1 этап'
  | 'Собеседование 2 этап'
  | 'Оффер'
  | 'Выход на работу'
  | 'Другое';

export interface CandidateContactPoint {
  id: string;
  type: CandidateContactPointType;
  dateTime: string; // ISO
  title: string;
  description?: string;
  done: boolean;
  createdAt: string; // ISO
}

// Main Candidate interface
export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  birthDate?: string; // YYYY-MM-DD
  position: string;
  resumeLink: string;
  status: CandidateStatus;
  jobId: string;
  lastUpdated: string;
  contactPoints?: CandidateContactPoint[];
}

// Job statuses
export type JobStatus = 'Open' | 'Closed';

// Job interface
export interface Job {
  jobId: string;
  jobTitle: string;
  department: string;
  status: JobStatus;
}
