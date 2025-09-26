import React from 'react';
import { Input } from '@/components/ui/input';

interface ObservationsTableProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
  rowsField: string;
  dataField: string;
  placeholder?: string;
  maxHeight?: string;
}

const ObservationsTable: React.FC<ObservationsTableProps> = ({
  formData,
  onInputChange,
  onDataChange,
  rowsField,
  dataField,
  placeholder = "Enter observation",
  maxHeight = "max-h-80"
}) => {
  const rowsCount = formData[rowsField] || 0;
  const dataArray = formData[dataField] || [];

  return (
    <div className="space-y-4">
      {/* Custom 2-Column Table */}
      <div className={`${rowsCount > 5 ? maxHeight + ' overflow-y-auto' : ''}`}>
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="sticky top-0">
            <tr className="bg-[#1a2746] text-white">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <span>Enter Total Number of Rows:</span>
                  <Input
                    type="number"
                    min="0"
                    value={rowsCount}
                    onChange={(e) => onInputChange(rowsField, parseInt(e.target.value) || 0)}
                    className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-0 text-black"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsCount === 0 ? (
              <tr>
                <td colSpan={2} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                  No rows added yet. Increase the count above to add observations.
                </td>
              </tr>
            ) : (
              Array.from({ length: rowsCount }, (_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                    ({String.fromCharCode(97 + index)})
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      type="text"
                      value={dataArray[index]?.observation || ''}
                      onChange={(e) => {
                        const updatedData = [...dataArray];
                        updatedData[index] = {
                          ...updatedData[index],
                          observation: e.target.value
                        };
                        onDataChange(dataField, index, 'observation', e.target.value);
                      }}
                      className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                      placeholder={placeholder}
                      required
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ObservationsTable;
