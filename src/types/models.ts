// Candidate statuses
export type CandidateStatus = 'New' | 'In Progress' | 'Interview' | 'Offered' | 'Rejected';

// Main Candidate interface
export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  experienceYears: number;
  position: string;
  resumeLink: string;
  status: CandidateStatus;
  jobId: string;
  lastUpdated: string;
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
