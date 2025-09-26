import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColumnConfig {
  field: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'dropdown';
  options?: { value: string; label: string }[];
}

interface MultiColumnTableProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
  rowsField: string;
  dataField: string;
  columns: ColumnConfig[];
  maxHeight?: string;
}

const MultiColumnTable: React.FC<MultiColumnTableProps> = ({
  formData,
  onInputChange,
  onDataChange,
  rowsField,
  dataField,
  columns,
  maxHeight = "max-h-80",
}) => {
  const numRows = formData[rowsField] || 0;
  const data = formData[dataField] || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows:</span>
        <Input
          type="number"
          min="0"
          value={numRows}
          onChange={(e) => onInputChange(rowsField, parseInt(e.target.value) || 0)}
          className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
        />
      </div>

      <div className={`${numRows > 5 ? maxHeight + ' overflow-y-auto' : ''}`}>
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="sticky top-0">
            <tr className="bg-[#1a2746] text-white">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
              {columns.map((column, index) => (
                <th key={index} className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {numRows === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                  No rows added yet. Increase the count above to add observations.
                </td>
              </tr>
            ) : (
              Array.from({ length: numRows }, (_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                    {index + 1}
                  </td>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="border border-gray-300 px-3 py-2">
                      {column.type === 'dropdown' && column.options ? (
                        <Select
                          value={data[index]?.[column.field] || ''}
                          onValueChange={(value) => {
                            onDataChange(dataField, index, column.field, value);
                          }}
                        >
                          <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full text-black">
                            <SelectValue placeholder={column.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {column.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type="text"
                          value={data[index]?.[column.field] || ''}
                          onChange={(e) => {
                            const updatedData = [...data];
                            updatedData[index] = {
                              ...updatedData[index],
                              [column.field]: e.target.value
                            };
                            onDataChange(dataField, index, column.field, e.target.value);
                          }}
                          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                          placeholder={column.placeholder}
                          required={column.required}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiColumnTable;
