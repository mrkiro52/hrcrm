import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from '@/shared/context/TaskContext';
import { Layout } from '@/features/layout/Layout';
import { KanbanPage } from '@/features/kanban/KanbanPage';
import { CandidateListPage } from '@/features/candidates/CandidateListPage';
import { CandidateDetailPage } from '@/features/candidates/CandidateDetailPage';
import { JobsPage } from '@/features/jobs/JobsPage';
import { CalendarPage } from '@/features/calendar/CalendarPage';
import { TasksPage } from '@/features/tasks/TasksPage';

function App() {
  return (
    <TaskProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/kanban" replace />} />
            <Route path="kanban" element={<KanbanPage />} />
            <Route path="candidates" element={<CandidateListPage />} />
            <Route path="candidates/:id" element={<CandidateDetailPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="tasks" element={<TasksPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;
