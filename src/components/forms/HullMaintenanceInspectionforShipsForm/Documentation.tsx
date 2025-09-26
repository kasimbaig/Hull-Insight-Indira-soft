import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentationProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const Documentation: React.FC<DocumentationProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="bg-[#c7d9f0] text-black px-6 py-4">
        <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Documentation</h3>
      </div>
      
      <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <tbody>
            {/* 3.1 Documentation Header */}
            <tr style={{ backgroundColor: '#1a2746' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-bold text-white">3.1</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                <span className="text-sm font-bold text-white">Documentation</span>
              </td>
            </tr>

            {/* Documentation Items */}
            {/* (a) Record of Hull survey by SS (NO 01/15)* */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(a)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Record of Hull survey by SS (NO 01/15)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.hullSurveyRecord}
                  onValueChange={(value) => onInputChange('hullSurveyRecord', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (b) Record of Hull potential measurements */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(b)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Record of Hull potential measurements (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.hullPotentialMeasurements}
                  onValueChange={(value) => onInputChange('hullPotentialMeasurements', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (c) EMAP */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(c)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  EMAP<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.emap}
                  onValueChange={(value) => onInputChange('emap', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (d) Boat log book */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(d)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Boat log book (NO 03/18)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.boatLogBook}
                  onValueChange={(value) => onInputChange('boatLogBook', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (e) Record of defects */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(e)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Record of defects<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.recordOfDefects}
                  onValueChange={(value) => onInputChange('recordOfDefects', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (f) HMP/VMP log book */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(f)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  HMP/VMP log book<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.hmpVmpLogBook}
                  onValueChange={(value) => onInputChange('hmpVmpLogBook', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* 3.2 Returns Header */}
            <tr style={{ backgroundColor: '#1a2746' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-bold text-white">3.2</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                <span className="text-sm font-bold text-white">Returns</span>
              </td>
            </tr>

            {/* (a) IN-378 */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(a)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  IN-378 (NO 01/15)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.in378}
                  onValueChange={(value) => onInputChange('in378', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (b) Quarterly Hull survey by SS */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(b)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Quarterly Hull survey by SS (NO 01/15)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.quarterlyHullSurvey}
                  onValueChange={(value) => onInputChange('quarterlyHullSurvey', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (c) Hull Potential / ICCP */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(c)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Hull Potential / ICCP (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.hullPotentialIccp}
                  onValueChange={(value) => onInputChange('hullPotentialIccp', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (d) Boat returns / Boat History sheet */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(d)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Boat returns / Boat History sheet (NO 03/18)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.boatReturnsHistory}
                  onValueChange={(value) => onInputChange('boatReturnsHistory', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* 3.3 Miscellaneous Records Header */}
            <tr style={{ backgroundColor: '#1a2746' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-bold text-white">3.3</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                <span className="text-sm font-bold text-white">Miscellaneous Records</span>
              </td>
            </tr>

            {/* (a) Policy file */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(a)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Policy file<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.policyFile}
                  onValueChange={(value) => onInputChange('policyFile', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (b) MAINTOPs */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(b)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  MAINTOPs<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.maintops}
                  onValueChange={(value) => onInputChange('maintops', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (c) IN 305 (Anchor chain cable - NO 07/11) */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(c)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  IN 305 (Anchor chain cable - NO 07/11)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.in305AnchorChain}
                  onValueChange={(value) => onInputChange('in305AnchorChain', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (d) IN 379 (Docking form) */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(d)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  IN 379 (Docking form)<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.in379DockingForm}
                  onValueChange={(value) => onInputChange('in379DockingForm', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (e) Hull Survey Report by yard */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(e)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Hull Survey Report by yard<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.hullSurveyReportYard}
                  onValueChange={(value) => onInputChange('hullSurveyReportYard', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Updated</SelectItem>
                    <SelectItem value="not_updated">Not Updated</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* 3.4 HMP/VMP Header */}
            <tr style={{ backgroundColor: '#1a2746' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-bold text-white">3.4</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                <span className="text-sm font-bold text-white">HMP / VMP</span>
              </td>
            </tr>

            {/* (a) Regular Yes / No */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(a)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Regular Yes / No<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.regularHmpVmp}
                  onValueChange={(value) => onInputChange('regularHmpVmp', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (b) Whether HMP / VMP Adequate */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(b)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Whether HMP / VMP Adequate<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.hmpVmpAdequate}
                  onValueChange={(value) => onInputChange('hmpVmpAdequate', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>

            {/* (c) Whether Employed IAW MAINTOPs or not */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/12">
                <span className="text-sm font-medium text-gray-700">(c)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">
                  Whether Employed IAW MAINTOPs or not<span className="text-red-500">*</span>
                </span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3 w-1/4">
                <Select
                  value={formData.employedIawMaintops}
                  onValueChange={(value) => onInputChange('employedIawMaintops', value)}
                >
                  <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
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

export default Documentation;
