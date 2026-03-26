import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCandidates } from '@/services/mockData';
import { Avatar } from '@/shared/components/Avatar';
import { Badge } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import { ContactPointsSection } from './ContactPointsSection';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const candidate = useMemo(() => {
    return mockCandidates.find((c) => c.id === id) || null;
  }, [id]);

  const [contactPoints, setContactPoints] = useState(candidate?.contactPoints ?? []);

  if (!candidate) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-neutral-900">Кандидат не найден</h1>
        <p className="text-sm text-neutral-600 mt-2">Проверьте ссылку или вернитесь к списку кандидатов.</p>
        <div className="mt-4">
          <Link to="/candidates" className="text-primary-500 hover:text-primary-600">
            ← Назад к списку
          </Link>
        </div>
      </div>
    );
  }

  const fullName = [candidate.lastName, candidate.firstName, candidate.middleName].filter(Boolean).join(' ');

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <Link to="/candidates" className="text-sm text-primary-500 hover:text-primary-600">
          ← Назад к списку кандидатов
        </Link>
      </div>

      <div className="bg-white shadow-jira rounded-lg border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar firstName={candidate.firstName} lastName={candidate.lastName} size="lg" />
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">{fullName}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge status={candidate.status} />
                <span className="text-sm text-neutral-600">{candidate.position}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => console.log('Редактировать кандидата', candidate.id)}>
              Редактировать
            </Button>
            <Button variant="primary" onClick={() => window.open(candidate.resumeLink, '_blank')}> 
              Открыть резюме
            </Button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-neutral-700 uppercase">Контакты</h2>
            <div className="text-sm text-neutral-800">
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-500">Телефон</span>
                <span>{candidate.phone || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-500">Email</span>
                <span className="text-neutral-400">(пока нет)</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-neutral-700 uppercase">Анкета</h2>
            <div className="text-sm text-neutral-800">
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-500">Дата рождения</span>
                <span>{candidate.birthDate || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-500">Позиция</span>
                <span>{candidate.position}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-500">JobID</span>
                <span>{candidate.jobId}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-500">Последнее обновление</span>
                <span>{candidate.lastUpdated}</span>
              </div>
            </div>
          </section>

          <section className="col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-neutral-700 uppercase">Комментарии</h2>
            <div className="space-y-2">
              <div className="bg-neutral-50 p-3 rounded-jira">
                <div className="text-xs text-neutral-500">Заглушка</div>
                <div className="text-sm text-neutral-800 mt-1">Здесь будут комментарии по кандидату.</div>
              </div>
            </div>
          </section>

          <div className="col-span-2">
            <ContactPointsSection
              candidate={{ ...candidate, contactPoints }}
              onChange={(next) => {
                console.log('Contact points updated', candidate.id, next);
                setContactPoints(next);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
