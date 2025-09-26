import React from "react";
import { Input } from "@/components/ui/input";

interface DynamicTableProps {
  title: string;
  rowCount: number;
  data: Array<{ [key: string]: string }>;
  columns: Array<{ key: string; label: string; placeholder: string }>;
  onRowCountChange: (count: number) => void;
  onDataChange: (rowIndex: number, field: string, value: string) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  title,
  rowCount,
  data,
  columns,
  onRowCountChange,
  onDataChange
}) => {
  return (
    <div className="space-y-4">
      {/* Row Count Input */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows:</span>
        <Input
          type="number"
          min="0"
          value={rowCount}
          onChange={(e) => onRowCountChange(parseInt(e.target.value) || 0)}
          className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
        />
      </div>

      {/* Dynamic Table */}
      {rowCount > 0 && (
        <div className={`${rowCount > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="sticky top-0">
              <tr className="bg-[#1a2746] text-white">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
                {columns.map((column) => (
                  <th key={column.key} className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowCount === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                    No rows added yet. Increase the count above to add observations.
                  </td>
                </tr>
              ) : (
                Array.from({ length: rowCount }, (_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                      {index + 1}
                    </td>
                    {columns.map((column) => (
                      <td key={column.key} className="border border-gray-300 px-3 py-2">
                        <Input
                          type="text"
                          value={data[index]?.[column.key] || ''}
                          onChange={(e) => onDataChange(index, column.key, e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                          placeholder={column.placeholder}
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
