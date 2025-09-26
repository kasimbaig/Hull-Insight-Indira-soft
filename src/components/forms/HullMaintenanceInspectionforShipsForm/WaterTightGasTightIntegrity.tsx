import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import ObservationsTable from './ObservationsTable';
import MultiColumnTable from './MultiColumnTable';
import ComplexTable from './ComplexTable';

interface WaterTightGasTightIntegrityProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
}

const WaterTightGasTightIntegrity: React.FC<WaterTightGasTightIntegrityProps> = ({
  formData,
  onInputChange,
  onDataChange,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Water Tight and Gas Tight Integrity (NO 01/15)</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 4.1 Air Pressure Test Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">4.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Air Pressure Test of W/T compartments</span>
                    </td>
                  </tr>

                  {/* Availability of APT Equipment row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Availability of APT Equipment*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.airPressureTestEquipment}
                        onValueChange={(value) => handleInputChange('airPressureTestEquipment', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Cycle (Commencing from) row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Cycle (Commencing from)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal border border-gray-300 rounded px-3 py-2 hover:bg-white hover:text-gray-900 hover:border-gray-300 ${
                              !formData.cycleCommencingFrom && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.cycleCommencingFrom ? format(new Date(formData.cycleCommencingFrom), "dd-MM-yyyy") : "DD-MM-YYYY"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.cycleCommencingFrom ? new Date(formData.cycleCommencingFrom) : undefined}
                            onSelect={(date) => handleInputChange('cycleCommencingFrom', date ? date.toISOString() : '')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>

                  {/* List of Compartments tested successfully row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">List of Compartments tested successfully in presence of HITU*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="compartmentsTestedSuccessfullyRows"
                        dataField="compartmentsTestedSuccessfullyData"
                        placeholder="Enter compartment details"
                      />
                    </td>
                  </tr>

                  {/* List of Compartments tested but not proved row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">List of Compartments tested but not proved in present cycle*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="compartmentsTestedNotProvedRows"
                        dataField="compartmentsTestedNotProvedData"
                        placeholder="Enter compartment details"
                      />
                    </td>
                  </tr>

                  {/* Plan for remaining compts row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Plan for remaining compts*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="planForRemainingComptsRows"
                        dataField="planForRemainingComptsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 4.2 Citadel Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">4.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Citadel</span>
                    </td>
                  </tr>

                  {/* Status of last Citadel test row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Status of last Citadel test*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.citadelTestStatus}
                        onChange={(e) => handleInputChange('citadelTestStatus', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter test status"
                      />
                    </td>
                  </tr>

                  {/* Type: Pre refit / Post Refit row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Type : Pre refit / Post Refit*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.citadelTestType}
                        onValueChange={(value) => handleInputChange('citadelTestType', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PRE REFIT">PRE REFIT</SelectItem>
                          <SelectItem value="POST REFIT">POST REFIT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Results of Citadel test row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Results of Citadel test*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.citadelTestResults}
                        onValueChange={(value) => handleInputChange('citadelTestResults', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Routines on AFU row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Routines on AFU*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.afuRoutines}
                        onChange={(e) => handleInputChange('afuRoutines', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter AFU routines"
                      />
                    </td>
                  </tr>

                  {/* Whether AFU due for renewal row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Whether AFU due for renewal*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.afuDueForRenewal}
                        onValueChange={(value) => handleInputChange('afuDueForRenewal', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* 4.3 W/T, G/T Doors/Hatches/Flaps Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">4.3</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">W/T, G/T Doors/ Hatches /Flaps</span>
                    </td>
                  </tr>

                  {/* Date of ULD row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date of ULD*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal border border-gray-300 rounded px-3 py-2 hover:bg-white hover:text-gray-900 hover:border-gray-300 ${
                              !formData.wtGtDoorsDateOfUld && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.wtGtDoorsDateOfUld ? format(new Date(formData.wtGtDoorsDateOfUld), "dd-MM-yyyy") : "DD-MM-YYYY"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.wtGtDoorsDateOfUld ? new Date(formData.wtGtDoorsDateOfUld) : undefined}
                            onSelect={(date) => handleInputChange('wtGtDoorsDateOfUld', date ? date.toISOString() : '')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>

                  {/* No of defective doors row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">No of defective doors*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.defectiveDoors}
                        onChange={(e) => handleInputChange('defectiveDoors', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter number"
                      />
                    </td>
                  </tr>

                  {/* No of defective hatches row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">No of defective hatches*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.defectiveHatches}
                        onChange={(e) => handleInputChange('defectiveHatches', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter number"
                      />
                    </td>
                  </tr>

                  {/* No of defective flaps row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">No of defective flaps*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.defectiveFlaps}
                        onChange={(e) => handleInputChange('defectiveFlaps', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter number"
                      />
                    </td>
                  </tr>

                  {/* Condition of rubber seals row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Condition of rubber seals(visual)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.rubberSealsCondition}
                        onValueChange={(value) => handleInputChange('rubberSealsCondition', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Other defects row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Other defects*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="otherDefectsRows"
                        dataField="otherDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* Maintenance of clips / wedges row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(g)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Maintenance of clips / wedges*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.clipsWedgesMaintenance}
                        onValueChange={(value) => handleInputChange('clipsWedgesMaintenance', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Defects on clips/wedges row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(h)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Defects on clips/wedges*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="clipsWedgesDefectsRows"
                        dataField="clipsWedgesDefectsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* Other remarks row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(j)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Other remarks*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="otherRemarksRows"
                        dataField="otherRemarksData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 4.4 Mushroom Heads Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">4.4</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Mushroom Heads</span>
                    </td>
                  </tr>

                  {/* Details of defects row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={4}>
                      <ComplexTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="mushroomHeadsDefectsRows"
                        dataField="mushroomHeadsDefectsData"
                        columns={[
                          { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                          { 
                            label: 'Frame Station', 
                            subColumns: [
                              { field: 'frameStationFrom', label: 'From', placeholder: 'From', required: true },
                              { field: 'frameStationTo', label: 'To', placeholder: 'To', required: true }
                            ]
                          },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
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

export default WaterTightGasTightIntegrity;
