import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShipsHusbandryToolsProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const ShipsHusbandryTools: React.FC<ShipsHusbandryToolsProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Ships Husbandry tools</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                {/* 10.1 Authorisation of tools */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">10.1</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Authorisation of tools (NHQ policy letter NC/Policy/ H-08/ Equipment dated 22 Aug 12 or amended vide<span className="text-red-500">*</span>
                      </span>
                      <Input
                        type="text"
                        value={formData.authorisationToolsText}
                        onChange={(e) => handleInputChange('authorisationToolsText', e.target.value)}
                        className="border border-black rounded-xl px-3 py-2 w-auto focus:outline-none focus:ring-0"
                      />
                    </div>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.authorisationTools}
                      onValueChange={(value) => handleInputChange('authorisationTools', value)}
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

                {/* 10.2 Held as per Authorisation */}
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">10.2</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Held as per Authorisation<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Select
                      value={formData.heldAsPerAuthorisation}
                      onValueChange={(value) => handleInputChange('heldAsPerAuthorisation', value)}
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

                {/* 10.3 Remark if any */}
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-1/12">
                    <span className="text-sm font-medium text-gray-700">10.3</span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">
                      Remark if any<span className="text-red-500">*</span>
                    </span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                    <Input
                      type="text"
                      value={formData.remarkIfAny}
                      onChange={(e) => handleInputChange('remarkIfAny', e.target.value)}
                      className="border border-black rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

  );
};

export default ShipsHusbandryTools;
