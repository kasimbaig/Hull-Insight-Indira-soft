import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ObservationsTable from './ObservationsTable';
import MultiColumnTable from './MultiColumnTable';

interface PreservationProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
  setIsDatePickerOpen: (isOpen: boolean) => void;
  isDatePickerOpen: boolean;
}

const Preservation: React.FC<PreservationProps> = ({
  formData,
  onInputChange,
  onDataChange,
  setIsDatePickerOpen,
  isDatePickerOpen,
}) => {
  return (
   <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Preservation (No 53/16)</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* 2.1 Machinery Compartments Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">2.1</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Machinery Compartments</span>
                    </td>
                  </tr>

                  {/* Present Paint scheme row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present Paint scheme (NO 53/16)*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.presentPaintScheme}
                        onChange={(e) => handleInputChange('presentPaintScheme', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter paint scheme details"
                      />
                    </td>
                  </tr>

                  {/* Date of last 100% renewal row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date of last 100% renewal*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.dateOfLastRenewal}
                          onChange={(e) => handleInputChange('dateOfLastRenewal', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Present paint condition row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present paint condition*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.presentPaintCondition}
                        onValueChange={(value) => handleInputChange('presentPaintCondition', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* General Bilges hygiene row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">General Bilges hygiene*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.generalBilgesHygiene}
                        onValueChange={(value) => handleInputChange('generalBilgesHygiene', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Presence of water / oil in bilges row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Presence of water / oil in bilges*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.presenceOfWaterOilInBilges}
                        onValueChange={(value) => handleInputChange('presenceOfWaterOilInBilges', value)}
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

                  {/* Rusting / corrosion row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Rusting / corrosion*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <MultiColumnTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="rustingCorrosionRows"
                        dataField="rustingCorrosionData"
                        columns={[
                          { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                          { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
                      />
                    </td>
                  </tr>

                  {/* Other observations row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(g)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Other observations*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="otherObservationsRows"
                        dataField="otherObservationsData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* 2.2 Weather Decks Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">2.2</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Weather Decks</span>
                    </td>
                  </tr>

                  {/* Weather Decks Present Paint Scheme row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present Paint Scheme*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.weatherDecksPresentPaintScheme}
                        onChange={(e) => handleInputChange('weatherDecksPresentPaintScheme', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter paint scheme details"
                      />
                    </td>
                  </tr>

                  {/* Weather Decks Date of last 100% renewal row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date of last 100% renewal*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.weatherDecksDateOfLastRenewal}
                          onChange={(e) => handleInputChange('weatherDecksDateOfLastRenewal', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Weather Decks Present paint condition row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present paint condition*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.weatherDecksPresentPaintCondition}
                        onValueChange={(value) => handleInputChange('weatherDecksPresentPaintCondition', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Weather Decks Maintenance standard row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Maintenance standard*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.weatherDecksMaintenanceStandard}
                        onValueChange={(value) => handleInputChange('weatherDecksMaintenanceStandard', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>


                  {/* Weather Decks Rusting / corrosion row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Rusting / corrosion*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <MultiColumnTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="weatherDecksRustingCorrosionRows"
                        dataField="weatherDecksRustingCorrosionData"
                        columns={[
                          { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                          { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
                      />
                    </td>
                  </tr>

                  {/* Weather Decks Other observations row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(g)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Other observations*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.weatherDecksOtherObservations}
                        onChange={(e) => handleInputChange('weatherDecksOtherObservations', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter other observations"
                      />
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">2.3</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Helo / Flight Deck (NO 53/16)</span>
                    </td>
                  </tr>

                  {/* Helo/Flight Deck Present Paint Scheme row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present Paint Scheme*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.heloFlightDeckPresentPaintScheme}
                        onChange={(e) => handleInputChange('heloFlightDeckPresentPaintScheme', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter paint scheme details"
                      />
                    </td>
                  </tr>

                  {/* Helo/Flight Deck Date of last 100% renewal row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Date of last 100% renewal*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloFlightDeckDateOfLastRenewal}
                          onChange={(e) => handleInputChange('heloFlightDeckDateOfLastRenewal', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Helo/Flight Deck Present paint condition row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present paint condition*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.heloFlightDeckPresentPaintCondition}
                        onValueChange={(value) => handleInputChange('heloFlightDeckPresentPaintCondition', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Helo/Flight Deck Maintenance standard row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Maintenance standard*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.heloFlightDeckMaintenanceStandard}
                        onValueChange={(value) => handleInputChange('heloFlightDeckMaintenanceStandard', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>

                  {/* Helo/Flight Deck Last date of friction test row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Last date of friction test*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloFlightDeckLastDateOfFrictionTest}
                          onChange={(e) => handleInputChange('heloFlightDeckLastDateOfFrictionTest', e.target.value)}
                          className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                          placeholder="DD-MM-YYYY"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        >
                          📅
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Helo/Flight Deck Rusting / corrosion row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Rusting / corrosion*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <MultiColumnTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="heloFlightDeckRustingCorrosionRows"
                        dataField="heloFlightDeckRustingCorrosionData"
                        columns={[
                          { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                          { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
                      />
                    </td>
                  </tr>

                  {/* 2.4 Internal compartments Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">2.4</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Internal compartments</span>
                    </td>
                  </tr>

                  {/* Internal compartments table row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <MultiColumnTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="internalCompartmentsDefectsRows"
                        dataField="internalCompartmentsDefectsData"
                        columns={[
                          { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                          { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
                      />
                    </td>
                  </tr>

                  {/* 2.5 Super structure Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">2.5</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <span className="text-sm font-bold text-white">Super structure (NO 53/16)</span>
                    </td>
                  </tr>

                  {/* Super structure table row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                      <MultiColumnTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="superStructureDefectsRows"
                        dataField="superStructureDefectsData"
                        columns={[
                          { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                          { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                          { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                        ]}
                      />
                    </td>
                  </tr>

                  {/* 2.6 Deck covering Header */}
                  <tr style={{ backgroundColor: '#1a2746' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-white">2.6</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-bold text-white">Deck covering (NCD 3717 Issue IV Apr 17) (NHQ Policy Letter NC/Policy/ H-114/ Material dated 16 Sep 17 and H-122 dated 24 Apr 17 or amended vide
                      <Input
                        type="text"
                        value={formData.deckCoveringInput}
                        onChange={(e) => onInputChange('deckCoveringInput', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-auto focus:outline-none focus:ring-0 text-black"
                        placeholder="Enter details"
                      />)
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                    </td>
                  </tr>

                  {/* Deck covering Present Scheme row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Present Scheme*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        type="text"
                        value={formData.deckCoveringPresentScheme}
                        onChange={(e) => handleInputChange('deckCoveringPresentScheme', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter present scheme details"
                      />
                    </td>
                  </tr>

                  {/* Deck covering Cracks / peeling off row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Cracks / peeling off*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="deckCoveringCracksPeelingRows"
                        dataField="deckCoveringCracksPeelingData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* Deck covering Any other defect row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Any other defect*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="deckCoveringAnyOtherDefectRows"
                        dataField="deckCoveringAnyOtherDefectData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* Deck covering Condition of edges row */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Condition of edges*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="deckCoveringConditionOfEdgesRows"
                        dataField="deckCoveringConditionOfEdgesData"
                        placeholder="Enter observation"
                      />
                    </td>
                  </tr>

                  {/* Deck covering Condition of dadoes row */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">Condition of dadoes*</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <ObservationsTable
                        formData={formData}
                        onInputChange={onInputChange}
                        onDataChange={onDataChange}
                        rowsField="deckCoveringConditionOfDadoesRows"
                        dataField="deckCoveringConditionOfDadoesData"
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

export default Preservation;
