import React from 'react';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { mockJobs } from '@/services/mockData';

export const JobsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Позиции</h1>
        <Button variant="primary" onClick={() => console.log('Create new job')}>
          + Добавить позицию
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-jira overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Отдел
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {mockJobs.map((job) => (
              <tr key={job.jobId} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">{job.jobId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">{job.jobTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-600">{job.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status={job.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-primary-500 hover:text-primary-600 mr-4"
                    onClick={() => console.log('Edit job:', job.jobId)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="text-danger-DEFAULT hover:text-danger-dark"
                    onClick={() => console.log('Delete job:', job.jobId)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
