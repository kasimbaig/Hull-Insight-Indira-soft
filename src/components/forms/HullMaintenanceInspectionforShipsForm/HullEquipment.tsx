import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ObservationsTable from './ObservationsTable';

interface HullEquipmentProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
}

const HullEquipment: React.FC<HullEquipmentProps> = ({
  formData,
  onInputChange,
  onDataChange,
}) => {
  return (
     <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Hull Equipment</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 7.1 Anchor chain cable and associated fittings Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Anchor chain cable and associated fittings</span>
                    </td>
                  </tr>

                  {/* Last survey details row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Last survey details (NO 07/11)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.anchorChainCableLastSurvey}
                          onChange={(e) => handleInputChange('anchorChainCableLastSurvey', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          ??
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Date of Load test row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date of Load test*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.dateOfLoadTest}
                          onChange={(e) => handleInputChange('dateOfLoadTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          ??
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Anchor Strop row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(ii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Anchor Strop*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.anchorStrop}
                        onValueChange={(value) => handleInputChange('anchorStrop', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Blake Slip row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Blake Slip*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.blakeSlip}
                        onValueChange={(value) => handleInputChange('blakeSlip', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Compressor row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iv)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Compressor*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.compressor}
                        onValueChange={(value) => handleInputChange('compressor', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">SAT</SelectItem>
                          <SelectItem value="unsat">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* BER items if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">BER items if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="berItemsRows"
                        dataField="berItemsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* Deficiency if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Deficiency if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="deficiencyRows"
                        dataField="deficiencyData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 7.2 Capstan and Cable Holders Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Capstan and Cable Holders</span>
                    </td>
                  </tr>

                  {/* Capstan Defects if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="capstanDefectsRows"
                        dataField="capstanDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 7.3 Winches Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.3</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Winches</span>
                    </td>
                  </tr>

                  {/* Winches Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="winchesDefectsRows"
                        dataField="winchesDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 7.4 Crane Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.4</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Crane</span>
                    </td>
                  </tr>

                  {/* Crane Defects if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="craneDefectsRows"
                        dataField="craneDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 7.5 Hangar Shutter Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.5</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Hangar Shutter</span>
                    </td>
                  </tr>

                  {/* Hangar Shutter Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="hangarShutterDefectsRows"
                        dataField="hangarShutterDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 7.6 Boom Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.6</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Boom</span>
                    </td>
                  </tr>

                  {/* Boom Defects if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="boomDefectsRows"
                        dataField="boomDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 7.7 A's & A's / ABER Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">7.7</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">A's & A's / ABER</span>
                    </td>
                  </tr>

                  {/* A's & A's / ABER Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="asAberDefectsRows"
                        dataField="asAberDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  );
};

export default HullEquipment;
