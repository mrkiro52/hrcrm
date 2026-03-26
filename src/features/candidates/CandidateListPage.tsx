import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table';
import { Badge } from '@/shared/components/Badge';
import { Select } from '@/shared/components/Select';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { CandidateModal } from './CandidateModal';
import type { Candidate } from '@/types/models';
import { mockCandidates } from '@/services/mockData';
import { CANDIDATE_STATUSES, POSITIONS } from '@/config/constants';
import { formatDate } from '@/shared/utils/helpers';

const columnHelper = createColumnHelper<Candidate>();

export const CandidateListPage: React.FC = () => {
  const [data, setData] = useState<Candidate[]>(mockCandidates);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => <input type="checkbox" className="rounded" />,
        cell: () => <input type="checkbox" className="rounded" />,
      }),
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: 'name',
        header: 'Имя',
        cell: (info) => (
          <div className="font-medium text-neutral-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('position', {
        header: 'Позиция',
        cell: (info) => (
          <div className="text-sm text-neutral-600">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('experienceYears', {
        header: 'Лет опыта',
        cell: (info) => (
          <div className="text-sm text-neutral-600">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Статус',
        cell: (info) => <Badge status={info.getValue()} />,
      }),
      columnHelper.accessor('resumeLink', {
        header: 'Резюме',
        cell: (info) => (
          <a
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        ),
      }),
      columnHelper.accessor('lastUpdated', {
        header: 'Дата обновления',
        cell: (info) => (
          <div className="text-sm text-neutral-500">{formatDate(info.getValue())}</div>
        ),
      }),
    ],
    []
  );
  
  const filteredData = useMemo(() => {
    return data.filter((candidate) => {
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      const matchesPosition = positionFilter === 'all' || candidate.position === positionFilter;
      const matchesSearch =
        searchQuery === '' ||
        `${candidate.firstName} ${candidate.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesPosition && matchesSearch;
    });
  }, [data, statusFilter, positionFilter, searchQuery]);
  
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  
  const handleRowClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };
  
  const handleCreateNew = () => {
    setSelectedCandidate(null);
    setIsModalOpen(true);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-4">Список кандидатов</h1>
        
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-64">
            <Input
              placeholder="Поиск по имени..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Все позиции' },
              ...POSITIONS.map((pos) => ({ value: pos, label: pos })),
            ]}
          />
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Все статусы' },
              ...CANDIDATE_STATUSES.map((status) => ({ value: status, label: status })),
            ]}
          />
          
          <Button variant="primary" onClick={handleCreateNew}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg shadow-jira overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() && (
                        <span>
                          {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-neutral-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal */}
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidate={selectedCandidate}
        onSave={(candidate) => {
          console.log('Saved candidate:', candidate);
          // In a real app, this would update the state
        }}
        onDelete={(id) => {
          console.log('Deleted candidate:', id);
          // In a real app, this would remove from state
        }}
      />
    </div>
  );
};
