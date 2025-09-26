import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ObservationsTable from './ObservationsTable';
import ComplexTable from './ComplexTable';

interface SystemsProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
}

const Systems: React.FC<SystemsProps> = ({
  formData,
  onInputChange,
  onDataChange,
}) => {
  return (
      <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Systems</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 6.1 Systems Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">ICCP system/ Cathodic protection (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)</span>
                    </td>
                  </tr>

                  {/* ICCP system row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Operational / Non operational*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.iccpSystemDetails}
                        onChange={(e) => handleInputChange('iccpSystemDetails', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter details"
                      />
                    </td>
                  </tr>

                  {/* Set potential wrt Zinc RE row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Set potential wrt Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.setPotentialWrtZincRE}
                        onChange={(e) => handleInputChange('setPotentialWrtZincRE', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter value"
                      />
                    </td>
                  </tr>

                  {/* Reading in panel wrt Zinc RE row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Reading in panel wrt Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.readingInPanelWrtZincRE}
                        onChange={(e) => handleInputChange('readingInPanelWrtZincRE', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter reading"
                      />
                    </td>
                  </tr>

                  {/* External Reading wrt portable Zinc RE row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">External Reading wrt portable Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.externalReadingWrtPortableZincRE}
                        onChange={(e) => handleInputChange('externalReadingWrtPortableZincRE', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter reading"
                      />
                    </td>
                  </tr>

                  {/* Last calibration date for Zinc RE row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Last calibration date for Zinc RE*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.lastCalibrationDateForZincRE}
                          onChange={(e) => handleInputChange('lastCalibrationDateForZincRE', e.target.value)}
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

                  {/* Known defects of ICCP system if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Known defects of ICCP system if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.knownDefectsOfICCP}
                        onChange={(e) => handleInputChange('knownDefectsOfICCP', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter defects if any"
                      />
                    </td>
                  </tr>

                  {/* 6.2 Ventilation System Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-bold text-white">Ventilation system</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.ventilationSystemOperational}
                        onValueChange={(value) => handleInputChange('ventilationSystemOperational', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="non-operational">Non operational</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      {/* Blank column */}
                    </td>
                  </tr>

                  {/* Details of defects row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ComplexTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="detailsOfDefectsRows"
                        dataField="detailsOfDefectsData"
                        columns={[
                          { field: 'observation', label: 'Location*', placeholder: 'Enter location', required: true },
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

                  {/* State of ATU Ops row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of ATU Ops*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.stateOfATUOps}
                        onChange={(e) => handleInputChange('stateOfATUOps', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter ATU Ops state"
                      />
                    </td>
                  </tr>

                  {/* State of ATU Non ops row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of ATU Non ops*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.stateOfATUNonOps}
                        onChange={(e) => handleInputChange('stateOfATUNonOps', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter ATU Non ops state"
                      />
                    </td>
                  </tr>

                  {/* ATU Routines row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">ATU Routines*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.atuRoutines}
                        onChange={(e) => handleInputChange('atuRoutines', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter ATU routines"
                      />
                    </td>
                  </tr>

                  {/* State of HEs row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of HEs*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.stateOfHEs}
                        onChange={(e) => handleInputChange('stateOfHEs', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter HEs state"
                      />
                    </td>
                  </tr>

                  {/* Choking of trunkings if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Choking of trunkings if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="chokingTrunkingsRows"
                        dataField="chokingTrunkingsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 6.3 Fresh water systems Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.3</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-bold text-white">Fresh water systems</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.freshWaterSystemsStatus}
                        onValueChange={(value) => handleInputChange('freshWaterSystemsStatus', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPS">OPS</SelectItem>
                          <SelectItem value="NON-OPS">NON-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      {/* Blank column */}
                    </td>
                  </tr>

                  {/* Details of defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="freshWaterSystemsRows"
                        dataField="freshWaterSystemsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 6.4 Sewage treatment plant Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.4</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Sewage treatment plant</span>
                    </td>
                  </tr>

                  {/* Name / make / type row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Name / make / type*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sewagePlantNameMakeType}
                        onChange={(e) => handleInputChange('sewagePlantNameMakeType', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter name/make/type"
                      />
                    </td>
                  </tr>

                  {/* Operational / Non Operational row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Operational / Non Operational*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.sewagePlantOperational}
                        onValueChange={(value) => handleInputChange('sewagePlantOperational', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="non-operational">Non operational</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Details of defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ComplexTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="sewagePlantDefectsRows"
                        dataField="sewagePlantDefectsData"
                        columns={[
                          { field: 'equipment', label: 'Equipment*', placeholder: 'Enter equipment', required: true },
                          { field: 'observation', label: 'Location*', placeholder: 'Enter location', required: true },
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

                  {/* Whether Routine undertaken IAW manual row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Whether Routine undertaken IAW manual*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.sewagePlantRoutineIAWManual}
                        onValueChange={(value) => handleInputChange('sewagePlantRoutineIAWManual', value)}
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

                  {/* Details of last effluent test and result row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of last effluent test and result*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.sewagePlantEffluentTestResult}
                        onValueChange={(value) => handleInputChange('sewagePlantEffluentTestResult', value)}
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

                  {/* 6.5 Pre-wetting system Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.5</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Pre-wetting system</span>
                    </td>
                  </tr>

                  {/* Operational / Non Operational row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Operational / Non Operational*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.preWettingSystemOperational}
                        onValueChange={(value) => handleInputChange('preWettingSystemOperational', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="non-operational">Non operational</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Date last operated row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date last operated*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.preWettingSystemDateLastOperated}
                          onChange={(e) => handleInputChange('preWettingSystemDateLastOperated', e.target.value)}
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

                  {/* Details of defects if any row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Details of defects if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.preWettingSystemDefects}
                        onChange={(e) => handleInputChange('preWettingSystemDefects', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter defect details"
                      />
                    </td>
                  </tr>

                  {/* 6.6 Sanitary system Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">6.6</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Sanitary system</span>
                    </td>
                  </tr>

                  {/* Defects if any row */}
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
                      <Input
                        value={formData.sanitarySystemDefects}
                        onChange={(e) => handleInputChange('sanitarySystemDefects', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter defects if any"
                      />
                    </td>
                  </tr>

                  {/* Chokes if any row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Chokes if any*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemChokes}
                        onChange={(e) => handleInputChange('sanitarySystemChokes', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter chokes if any"
                      />
                    </td>
                  </tr>

                  {/* State of flushing valves row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of flushing valves*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemFlushingValves}
                        onChange={(e) => handleInputChange('sanitarySystemFlushingValves', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter flushing valves state"
                      />
                    </td>
                  </tr>

                  {/* State of OBD valves row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">State of OBD valves*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.sanitarySystemOBDValves}
                        onChange={(e) => handleInputChange('sanitarySystemOBDValves', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter OBD valves state"
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

export default Systems;
