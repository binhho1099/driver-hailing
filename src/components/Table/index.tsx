'use client';
import { useState } from 'react';

export type TColumnTable = {
  key: string;
  title: string;
  render?: (value, record) => React.ReactNode;
};

export type TDataTable = {
  id: string;
  [key: string]: string;
};

export interface TableProps {
  columns: TColumnTable[];
  data: TDataTable[];
}

const TableWithCheckbox = ({ columns, data }: TableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const isAllSelected = selectedRows.length === data.length && data.length > 0;

  const handleSelectAll = () => {
    setSelectedRows(isAllSelected ? [] : data.map((row) => row.id));
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id],
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            {columns.map((col) => (
              <th key={col.key} className="p-3 border text-left">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border hover:bg-gray-50">
              <td className="p-3 border text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.key} className="p-3 border">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithCheckbox;
