import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import MultiColumnTable from './MultiColumnTable';

interface LifeSavingAppliancesProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
  setIsDatePickerOpen: (isOpen: boolean) => void;
  isDatePickerOpen: boolean;
}

const LifeSavingAppliances: React.FC<LifeSavingAppliancesProps> = ({
  formData,
  onInputChange,
  onDataChange,
  setIsDatePickerOpen,
  isDatePickerOpen,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Life Saving Appliances</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 8.1 Boats Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">8.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Boats</span>
                    </td>
                  </tr>

                  {/* Authorisation row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Authorisation*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsAuthorisation}
                        onChange={(e) => handleInputChange('boatsAuthorisation', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter authorisation details"
                      />
                    </td>
                  </tr>

                  {/* Held / Deficiency on board row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Held / Deficiency on board*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsHeldDeficiency}
                        onChange={(e) => handleInputChange('boatsHeldDeficiency', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter details"
                      />
                    </td>
                  </tr>

                  {/* BER row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">BER*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsBer}
                        onChange={(e) => handleInputChange('boatsBer', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter BER details"
                      />
                    </td>
                  </tr>

                  {/* Landed for repairs row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Landed for repairs*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.boatsLandedForRepairs}
                        onChange={(e) => handleInputChange('boatsLandedForRepairs', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter repair details"
                      />
                    </td>
                  </tr>

                  {/* Defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <MultiColumnTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="boatsDefectsRows"
                        dataField="boatsDefectsData"
                        columns={[
                          { field: 'equipment', label: 'Equipment*', placeholder: 'Enter equipment', required: true },
                          { field: 'observation', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
                      />
                    </td>
                  </tr>

                  {/* Maintenance of two point lifting hooks row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Maintenance of two point lifting hooks of Survey Motor Boats. (NO 03/18 refers) (Only For Survey Motor Boats)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsMaintenanceTwoPointLifting}
                        onValueChange={(value) => handleInputChange('boatsMaintenanceTwoPointLifting', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Visual examination of Forward and aft lifting hooks row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(i)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Visual examination of Forward and aft lifting hooks arrangement*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsVisualExaminationHooks}
                        onValueChange={(value) => handleInputChange('boatsVisualExaminationHooks', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* DP test of adapter piece row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(ii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">DP test of adapter piece between the hook and the base plate being carried out annually by refitting authority.*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsDPTestAdapter}
                        onValueChange={(value) => handleInputChange('boatsDPTestAdapter', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Periodic Inspection and maintenance row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iii)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Periodic Inspection and maintenance / testing of lifting hook arrangement as stipulated MAINTOP MT- 17023 is carried out by SS.*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsPeriodicInspection}
                        onValueChange={(value) => handleInputChange('boatsPeriodicInspection', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Visual survey of strong back area row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(iv)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Visual survey of strong back area of hooks, connecting rods, adapter plate, securing bolts, weld joints and GRP Laminate around it.*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatsVisualSurveyStrongBack}
                        onValueChange={(value) => handleInputChange('boatsVisualSurveyStrongBack', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* 8.2 Life Rafts Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">8.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Life Rafts</span>
                    </td>
                  </tr>

                  {/* Life Rafts Authorisation row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Authorisation*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsAuthorisation}
                        onChange={(e) => handleInputChange('lifeRaftsAuthorisation', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter authorisation details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Held / deficiency row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Held / deficiency*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsHeldDeficiency}
                        onChange={(e) => handleInputChange('lifeRaftsHeldDeficiency', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts BER row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">BER*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsBer}
                        onChange={(e) => handleInputChange('lifeRaftsBer', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter BER details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Landed for survey row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Landed for survey*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsLandedForSurvey}
                        onChange={(e) => handleInputChange('lifeRaftsLandedForSurvey', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter survey details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Stowage arrangements row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Stowage arrangements*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsStowageArrangements}
                        onChange={(e) => handleInputChange('lifeRaftsStowageArrangements', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter stowage details"
                      />
                    </td>
                  </tr>

                  {/* Life Rafts Hydrostatic releasing gear row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Hydrostatic releasing gear*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.lifeRaftsHydrostaticReleasingGear}
                        onChange={(e) => handleInputChange('lifeRaftsHydrostaticReleasingGear', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter gear details"
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

export default LifeSavingAppliances;
