import React, { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Select } from '@/shared/components/Select';
import { Avatar } from '@/shared/components/Avatar';
import { Badge } from '@/shared/components/Badge';
import type { Candidate } from '@/types/models';
import { CANDIDATE_STATUSES, POSITIONS } from '@/config/constants';

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onSave?: (candidate: Candidate) => void;
  onDelete?: (id: string) => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Candidate>(
    candidate || {
      id: '',
      firstName: '',
      lastName: '',
      age: 0,
      experienceYears: 0,
      position: '',
      resumeLink: '',
      status: 'New',
      jobId: '',
      lastUpdated: new Date().toISOString(),
    }
  );
  
  const handleChange = (field: keyof Candidate, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    console.log('Saving candidate:', formData);
    onSave?.(formData);
    onClose();
  };
  
  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этого кандидата?')) {
      console.log('Deleting candidate:', formData.id);
      onDelete?.(formData.id);
      onClose();
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={candidate ? 'Редактирование кандидата' : 'Новый кандидат'} size="lg">
      <div className="space-y-6">
        {/* Header with Avatar */}
        {candidate && (
          <div className="flex items-center space-x-4 pb-4 border-b border-neutral-200">
            <Avatar firstName={formData.firstName} lastName={formData.lastName} size="lg" />
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {formData.firstName} {formData.lastName}
              </h3>
              <Badge status={formData.status} />
            </div>
          </div>
        )}
        
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Имя"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Введите имя"
          />
          
          <Input
            label="Фамилия"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Введите фамилию"
          />
          
          <Input
            label="Возраст"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
            placeholder="Введите возраст"
          />
          
          <Input
            label="Лет опыта"
            type="number"
            value={formData.experienceYears}
            onChange={(e) => handleChange('experienceYears', parseInt(e.target.value) || 0)}
            placeholder="Введите опыт"
          />
          
          <Select
            label="Позиция"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            options={[
              { value: '', label: 'Выберите позицию' },
              ...POSITIONS.map((pos) => ({ value: pos, label: pos })),
            ]}
          />
          
          <Select
            label="Статус"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            options={CANDIDATE_STATUSES.map((status) => ({ value: status, label: status }))}
          />
        </div>
        
        <Input
          label="Ссылка на резюме"
          value={formData.resumeLink}
          onChange={(e) => handleChange('resumeLink', e.target.value)}
          placeholder="https://example.com/resume.pdf"
        />
        
        {/* Comments Section (placeholder) */}
        <div className="pt-4 border-t border-neutral-200">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Комментарии</h4>
          <div className="space-y-2">
            <div className="bg-neutral-50 p-3 rounded-jira">
              <p className="text-xs text-neutral-500">15.01.2024, 10:30</p>
              <p className="text-sm text-neutral-700 mt-1">Кандидат прошёл первичное собеседование.</p>
            </div>
            <div className="bg-neutral-50 p-3 rounded-jira">
              <p className="text-xs text-neutral-500">16.01.2024, 14:15</p>
              <p className="text-sm text-neutral-700 mt-1">Назначено техническое интервью на 20.01.</p>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div>
            {candidate && (
              <Button variant="danger" onClick={handleDelete}>
                Удалить
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
