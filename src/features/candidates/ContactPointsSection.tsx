import React, { useMemo, useState } from 'react';
import type { Candidate, CandidateContactPoint, CandidateContactPointType } from '@/types/models';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { REJECTION_STATUSES } from '@/config/constants';

const CONTACT_POINT_TYPES: Array<{ value: CandidateContactPointType; label: string }> = [
  { value: 'Перезвон', label: 'Перезвон' },
  { value: 'Собеседование 1 этап', label: 'Собеседование 1 этап' },
  { value: 'Собеседование 2 этап', label: 'Собеседование 2 этап' },
  { value: 'Оффер', label: 'Оффер' },
  { value: 'Выход на работу', label: 'Выход на работу' },
  { value: 'Другое', label: 'Другое' },
];

function isRejectionStatus(status: Candidate['status']): boolean {
  return (REJECTION_STATUSES as readonly string[]).includes(status);
}

export const ContactPointsSection: React.FC<{
  candidate: Candidate;
  onChange?: (next: CandidateContactPoint[]) => void;
}> = ({ candidate, onChange }) => {
  const disabled = isRejectionStatus(candidate.status);

  const points = useMemo(() => candidate.contactPoints ?? [], [candidate.contactPoints]);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState({
    type: 'Перезвон' as CandidateContactPointType,
    date: '',
    time: '',
    title: '',
    description: '',
  });

  const sorted = useMemo(() => {
    return [...points].sort((a, b) => (a.dateTime > b.dateTime ? 1 : -1));
  }, [points]);

  const handleToggleDone = (id: string) => {
    const next = points.map((p) => (p.id === id ? { ...p, done: !p.done } : p));
    onChange?.(next);
  };

  const handleAdd = () => {
    if (!draft.title.trim()) return;
    if (!draft.date || !draft.time) return;

    const nextPoint: CandidateContactPoint = {
      id: `cp-${Date.now()}`,
      type: draft.type,
      dateTime: new Date(`${draft.date}T${draft.time}:00`).toISOString(),
      title: draft.title,
      description: draft.description || undefined,
      done: false,
      createdAt: new Date().toISOString(),
    };

    onChange?.([...points, nextPoint]);
    setIsAdding(false);
    setDraft({ type: 'Перезвон', date: '', time: '', title: '', description: '' });
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-700 uppercase">Точки контакта</h2>
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled}
          onClick={() => setIsAdding((v) => !v)}
        >
          + Добавить
        </Button>
      </div>

      {disabled && (
        <div className="text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-jira p-3">
          Для статусов отказа задачи/точки контакта недоступны.
        </div>
      )}

      {isAdding && !disabled && (
        <div className="bg-white border border-primary-200 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Тип"
              value={draft.type}
              onChange={(e) => setDraft((p) => ({ ...p, type: e.target.value as CandidateContactPointType }))}
              options={CONTACT_POINT_TYPES}
            />
            <Input
              label="Название"
              value={draft.title}
              onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
              placeholder="Например: Перезвонить"
            />
            <Input
              label="Дата"
              type="date"
              value={draft.date}
              onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))}
            />
            <Input
              label="Время"
              type="time"
              value={draft.time}
              onChange={(e) => setDraft((p) => ({ ...p, time: e.target.value }))}
            />
          </div>

          <div className="mt-4">
            <Input
              label="Описание"
              value={draft.description}
              onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
              placeholder="(необязательно)"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Добавить
            </Button>
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="text-sm text-neutral-500">Пока нет точек контакта.</div>
      ) : (
        <div className="space-y-2">
          {sorted.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <button
                  disabled={disabled}
                  onClick={() => handleToggleDone(p.id)}
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    p.done
                      ? 'border-success-DEFAULT bg-success-DEFAULT'
                      : 'border-neutral-400 hover:border-primary-500'
                  } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                  title={p.done ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
                >
                  {p.done && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                <div className={p.done ? 'opacity-70' : ''}>
                  <div className="text-sm font-medium text-neutral-900">
                    {p.title}{' '}
                    <span className="text-xs font-semibold text-neutral-500">({p.type})</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {new Date(p.dateTime).toLocaleString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  {p.description && <div className="text-sm text-neutral-700 mt-1">{p.description}</div>}
                </div>
              </div>

              {p.done && (
                <span className="text-xs text-success-dark bg-success-light px-2 py-0.5 rounded-full">Выполнено</span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
