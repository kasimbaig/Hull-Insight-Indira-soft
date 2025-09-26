import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface LiftingAppliancesProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: any) => void;
  setIsDatePickerOpen: (isOpen: boolean) => void;
  isDatePickerOpen: boolean;
}

const LiftingAppliances: React.FC<LiftingAppliancesProps> = ({
  formData,
  onInputChange,
  onDataChange,
  setIsDatePickerOpen,
  isDatePickerOpen,
}) => {
  return (
     <div className="bg-white border-b border-gray-200">
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Lifting Appliances</h3>
          </div>
          
          <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
            <div className="px-6 pb-6">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <tbody>
                  {/* Header Row */}
                  <tr>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      <span className="text-sm font-bold text-black">5.0</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={5}>
                      <span className="text-sm font-bold text-black">Operational state, last date of Load test details and known defects</span>
                    </td>
                  </tr>

                  {/* Sub Header Row */}
                  <tr className="bg-[#1a2746]">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white"></span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">OPS/Non-OPS</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">Last Load Test Date</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">Due Load Test Date</span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-white">Remarks</span>
                    </td>
                  </tr>
                  {/* Row 1: Boat Davits */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Boat Davits / Derricks and associated fittings<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatDavitsOps}
                        onValueChange={(value) => handleInputChange('boatDavitsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatDavitsLastLoadTest}
                          onChange={(e) => handleInputChange('boatDavitsLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatDavitsDueLoadTest}
                          onChange={(e) => handleInputChange('boatDavitsDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.boatDavitsRemarks}
                        onChange={(e) => handleInputChange('boatDavitsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 2: Single arm Davit */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Single arm Davit<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.singleArmDavitOps}
                        onValueChange={(value) => handleInputChange('singleArmDavitOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.singleArmDavitLastLoadTest}
                          onChange={(e) => handleInputChange('singleArmDavitLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.singleArmDavitDueLoadTest}
                          onChange={(e) => handleInputChange('singleArmDavitDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.singleArmDavitRemarks}
                        onChange={(e) => handleInputChange('singleArmDavitRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 3: Fixed radial Davit */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Fixed radial Davit<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.fixedRadialDavitOps}
                        onValueChange={(value) => handleInputChange('fixedRadialDavitOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.fixedRadialDavitLastLoadTest}
                          onChange={(e) => handleInputChange('fixedRadialDavitLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.fixedRadialDavitDueLoadTest}
                          onChange={(e) => handleInputChange('fixedRadialDavitDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.fixedRadialDavitRemarks}
                        onChange={(e) => handleInputChange('fixedRadialDavitRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 4: Boat slings */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Boat slings<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boatSlingsOps}
                        onValueChange={(value) => handleInputChange('boatSlingsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatSlingsLastLoadTest}
                          onChange={(e) => handleInputChange('boatSlingsLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boatSlingsDueLoadTest}
                          onChange={(e) => handleInputChange('boatSlingsDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.boatSlingsRemarks}
                        onChange={(e) => handleInputChange('boatSlingsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 5: RAS points */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        RAS points including (portable fittings)<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.rasPointsOps}
                        onValueChange={(value) => handleInputChange('rasPointsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.rasPointsLastLoadTest}
                          onChange={(e) => handleInputChange('rasPointsLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.rasPointsDueLoadTest}
                          onChange={(e) => handleInputChange('rasPointsDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.rasPointsRemarks}
                        onChange={(e) => handleInputChange('rasPointsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 6: Accommodation Ladder */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Accommodation Ladder<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.accommodationLadderOps}
                        onValueChange={(value) => handleInputChange('accommodationLadderOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.accommodationLadderLastLoadTest}
                          onChange={(e) => handleInputChange('accommodationLadderLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.accommodationLadderDueLoadTest}
                          onChange={(e) => handleInputChange('accommodationLadderDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.accommodationLadderRemarks}
                        onChange={(e) => handleInputChange('accommodationLadderRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 7: Booms */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Booms<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.boomsOps}
                        onValueChange={(value) => handleInputChange('boomsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boomsLastLoadTest}
                          onChange={(e) => handleInputChange('boomsLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.boomsDueLoadTest}
                          onChange={(e) => handleInputChange('boomsDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.boomsRemarks}
                        onChange={(e) => handleInputChange('boomsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 8: Ships brow */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Ships brow<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.shipsBrowOps}
                        onValueChange={(value) => handleInputChange('shipsBrowOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.shipsBrowLastLoadTest}
                          onChange={(e) => handleInputChange('shipsBrowLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.shipsBrowDueLoadTest}
                          onChange={(e) => handleInputChange('shipsBrowDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.shipsBrowRemarks}
                        onChange={(e) => handleInputChange('shipsBrowRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 9: Helo deck and Hangar deck rings / eyes */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Helo deck and Hangar deck rings / eyes<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.heloDeckHangarOps}
                        onValueChange={(value) => handleInputChange('heloDeckHangarOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloDeckHangarLastLoadTest}
                          onChange={(e) => handleInputChange('heloDeckHangarLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloDeckHangarDueLoadTest}
                          onChange={(e) => handleInputChange('heloDeckHangarDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.heloDeckHangarRemarks}
                        onChange={(e) => handleInputChange('heloDeckHangarRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 10: Helo Landing Grid */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Helo Landing Grid<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.heloLandingGridOps}
                        onValueChange={(value) => handleInputChange('heloLandingGridOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloLandingGridLastLoadTest}
                          onChange={(e) => handleInputChange('heloLandingGridLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.heloLandingGridDueLoadTest}
                          onChange={(e) => handleInputChange('heloLandingGridDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.heloLandingGridRemarks}
                        onChange={(e) => handleInputChange('heloLandingGridRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 11: Towing arrangements / towing rope(polypropylene) */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Towing arrangements / towing rope(polypropylene)<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.towingArrangementsOps}
                        onValueChange={(value) => handleInputChange('towingArrangementsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.towingArrangementsLastLoadTest}
                          onChange={(e) => handleInputChange('towingArrangementsLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.towingArrangementsDueLoadTest}
                          onChange={(e) => handleInputChange('towingArrangementsDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.towingArrangementsRemarks}
                        onChange={(e) => handleInputChange('towingArrangementsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 12: Safety nets */}
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Safety nets<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.safetyNetsOps}
                        onValueChange={(value) => handleInputChange('safetyNetsOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.safetyNetsLastLoadTest}
                          onChange={(e) => handleInputChange('safetyNetsLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.safetyNetsDueLoadTest}
                          onChange={(e) => handleInputChange('safetyNetsDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.safetyNetsRemarks}
                        onChange={(e) => handleInputChange('safetyNetsRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>

                  {/* Row 13: HO-5 hoisting arrangement */}
                  <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        HO-5 hoisting arrangement<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.ho5HoistingOps}
                        onValueChange={(value) => handleInputChange('ho5HoistingOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingLastLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingDueLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.ho5HoistingRemarks}
                        onChange={(e) => handleInputChange('ho5HoistingRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
                      />
                    </td>
                  </tr>
                   <tr className="bg-white">
                    <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                      {/* Blank column */}
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        Anchor Strop<span className="text-red-500">*</span>
                      </span>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Select
                        value={formData.ho5HoistingOps}
                        onValueChange={(value) => handleInputChange('ho5HoistingOps', value)}
                      >
                        <SelectTrigger className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ops">OPS</SelectItem>
                          <SelectItem value="non-ops">Non-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingLastLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingLastLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <div className="relative">
                        <Input
                          type="text"
                          value={formData.ho5HoistingDueLoadTest}
                          onChange={(e) => handleInputChange('ho5HoistingDueLoadTest', e.target.value)}
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
                    <td className="border-r border-t border-gray-300 px-4 py-3">
                      <Input
                        value={formData.ho5HoistingRemarks}
                        onChange={(e) => handleInputChange('ho5HoistingRemarks', e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                        placeholder="Enter remarks"
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

export default LiftingAppliances;
