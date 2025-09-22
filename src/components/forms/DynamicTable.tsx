import React from "react";
import { Input } from "@/components/ui/input";

interface DynamicTableProps {
  title: string;
  rowCount: number;
  data: Array<{ observation: string; remarks: string }>;
  onRowCountChange: (count: number) => void;
  onDataChange: (index: number, field: 'observation' | 'remarks', value: string) => void;
  className?: string;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  title,
  rowCount,
  data,
  onRowCountChange,
  onDataChange,
  className = ""
}) => {

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Row Counter */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-700">Enter Total Number of Rows.</span>
          <Input
            type="number"
            min="0"
            value={rowCount}
            onChange={(e) => onRowCountChange(parseInt(e.target.value) || 0)}
            className="w-20 border border-gray-300 rounded px-2 py-1"
          />
        </div>
        {rowCount === 0 && (
          <p className="text-sm text-gray-600 italic">
            💡 If you need to add observations, please increase the count above.
          </p>
        )}
      </div>

      {/* Dynamic Table */}
      <div className={`${rowCount > 5 ? 'max-h-80 overflow-y-auto' : ''}`}>
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="sticky top-0">
            <tr className="bg-[#1a2746] text-white">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Sr No.</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Observation<span className="text-red-500">*</span></th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Remarks<span className="text-red-500">*</span></th>
            </tr>
          </thead>
          <tbody>
            {rowCount === 0 ? (
              <tr>
                <td colSpan={3} className="border border-gray-300 px-3 py-8 text-center text-gray-500 italic">
                  No rows added yet. Increase the count above to add observations.
                </td>
              </tr>
            ) : (
              Array.from({ length: rowCount }, (_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      type="text"
                      value={data[index]?.observation || ''}
                      onChange={(e) => onDataChange(index, 'observation', e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      placeholder="Enter observation"
                      required
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      type="text"
                      value={data[index]?.remarks || ''}
                      onChange={(e) => onDataChange(index, 'remarks', e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      placeholder="Enter remarks"
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

export default DynamicTable;
