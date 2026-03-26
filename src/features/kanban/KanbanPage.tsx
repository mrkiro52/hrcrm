import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import { Avatar } from '@/shared/components/Avatar';
import type { Candidate, CandidateStatus } from '@/types/models';
import { mockCandidates } from '@/services/mockData';
import { KANBAN_STATUSES } from '@/config/constants';

export const KanbanPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  
  const groupedCandidates = KANBAN_STATUSES.reduce((acc, status) => {
    acc[status] = candidates.filter((c) => c.status === status);
    return acc;
  }, {} as Record<CandidateStatus, Candidate[]>);
  
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    
    const newStatus = destination.droppableId as CandidateStatus;
    const candidateId = draggableId;
    
    console.log(`Moving candidate ${candidateId} to ${newStatus}`);
    
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
  };
  
  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Доска кандидатов</h1>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4 h-[calc(100vh-12rem)]">
          {KANBAN_STATUSES.map((status) => (
            <div key={status} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-neutral-700 text-sm uppercase">
                  {status}
                </h3>
                <span className="bg-neutral-200 text-neutral-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {groupedCandidates[status].length}
                </span>
              </div>
              
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 bg-neutral-100 rounded-lg p-2 overflow-y-auto space-y-2 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-neutral-200' : ''
                    }`}
                  >
                    {groupedCandidates[status].map((candidate, index) => (
                      <Draggable
                        key={candidate.id}
                        draggableId={candidate.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg p-3 shadow-sm border-2 border-transparent hover:border-primary-300 transition-all ${
                              snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-2 mb-2">
                              <Avatar
                                firstName={candidate.firstName}
                                lastName={candidate.lastName}
                                size="sm"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900 truncate">
                                  {candidate.firstName} {candidate.lastName}
                                </p>
                                <p className="text-xs text-neutral-500 truncate">
                                  {candidate.position}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-neutral-500">
                              <span>{candidate.phone || '—'}</span>
                              <a
                                href={candidate.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-primary-600"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
