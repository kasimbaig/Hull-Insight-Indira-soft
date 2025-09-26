import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HabitabilityProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const Habitability: React.FC<HabitabilityProps> = ({
  formData,
  onInputChange,
}) => {
  return (
     <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Habitability</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                {/* 9.1 Living conditions */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">9.1</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Living conditions<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.livingConditions}
                      onValueChange={(value) => handleInputChange('livingConditions', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* 9.2 Ships husbandry */}
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">9.2</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Ships husbandry<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.shipsHusbandry}
                      onValueChange={(value) => handleInputChange('shipsHusbandry', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* 9.3 A/C discipline */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">9.3</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      A/C discipline<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.acDiscipline}
                      onValueChange={(value) => handleInputChange('acDiscipline', value)}
                    >
                      <SelectTrigger className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="unsat">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  );
};

export default Habitability;
