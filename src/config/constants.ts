// App configuration (no backend, pure frontend)
export const APP_CONFIG = {
  APP_NAME: 'HR CRM',
  MIN_WIDTH: 1280,
} as const;

// Status options for candidates
export const CANDIDATE_STATUSES = [
  'New',
  'In Progress', 
  'Interview',
  'Offered',
  'Rejected',
] as const;

// Position options
export const POSITIONS = [
  'Менеджер по продажам',
  'Специалист по негабариту',
] as const;
