import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DynamicTable from "./DynamicTable";

interface FormData {
  // Underwater Cleaning
  marineGrowthRows: number;
  foreignObjectsRows: number;
  marineGrowthData: Array<{ observation: string; remarks: string }>;
  foreignObjectsData: Array<{ observation: string; remarks: string }>;
  
  // Painting
  outerBottomRows: number;
  sternAftRows: number;
  bootTopRows: number;
  ruddersRows: number;
  stabilizersRows: number;
  dockBlockRows: number;
  otherObservationsRows: number;
  paintSchemeRows: number;
  outerBottomData: Array<{ observation: string; remarks: string }>;
  sternAftData: Array<{ observation: string; remarks: string }>;
  bootTopData: Array<{ observation: string; remarks: string }>;
  ruddersData: Array<{ observation: string; remarks: string }>;
  stabilizersData: Array<{ observation: string; remarks: string }>;
  dockBlockData: Array<{ observation: string; remarks: string }>;
  otherObservationsData: Array<{ observation: string; remarks: string }>;
  paintSchemeData: Array<{ observation: string; remarks: string }>;
  
  // Rusting & Corrosion
  rustCorrosionAreasRows: number;
  rustGeneralOuterBottomRows: number;
  rustBootTopRows: number;
  rustSternAftRows: number;
  rustRuddersRows: number;
  rustBilgeKeelRows: number;
  rustDockBlockRows: number;
  rustOtherObservationsRows: number;
  rustCorrosionAreasData: Array<{ observation: string; remarks: string }>;
  rustGeneralOuterBottomData: Array<{ observation: string; remarks: string }>;
  rustBootTopData: Array<{ observation: string; remarks: string }>;
  rustSternAftData: Array<{ observation: string; remarks: string }>;
  rustRuddersData: Array<{ observation: string; remarks: string }>;
  rustBilgeKeelData: Array<{ observation: string; remarks: string }>;
  rustDockBlockData: Array<{ observation: string; remarks: string }>;
  rustOtherObservationsData: Array<{ observation: string; remarks: string }>;
  
  // Structure
  extentOfHullSurvey: string;
  structureHullSurveyRows: number;
  structureDentsRows: number;
  structureCracksRows: number;
  structureScratchRows: number;
  structureHolesRows: number;
  structureOtherObservationsRows: number;
  structureDefectsRows: number;
  structureStabilizersRows: number;
  structureHullSurveyData: Array<{ observation: string; remarks: string }>;
  structureDentsData: Array<{ observation: string; remarks: string }>;
  structureCracksData: Array<{ observation: string; remarks: string }>;
  structureScratchData: Array<{ observation: string; remarks: string }>;
  structureHolesData: Array<{ observation: string; remarks: string }>;
  structureOtherObservationsData: Array<{ observation: string; remarks: string }>;
  structureDefectsData: Array<{ observation: string; remarks: string }>;
  structureStabilizersData: Array<{ observation: string; remarks: string }>;
  
  // Sonar Dome
  sonarDomeCleanShipObservation: string;
  sonarDomeCleanShipRemarks: string;
  sonarDomeCracksObservation: string;
  sonarDomeCracksRemarks: string;
  sonarDomeGrpObservation: string;
  sonarDomeGrpRemarks: string;
  sonarDomeFairingObservation: string;
  sonarDomeFairingRemarks: string;
}

interface PreliminaryFormSectionsPart1Props {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  onDataChange: (field: string, index: number, dataField: 'observation' | 'remarks', value: string) => void;
}

const PreliminaryFormSectionsPart1: React.FC<PreliminaryFormSectionsPart1Props> = ({
  formData,
  onInputChange,
  onDataChange
}) => {
  return (
    <>
      {/* UNDERWATER CLEANING Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">UNDERWATER CLEANING</h3>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Presence of marine growth at<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Presence of marine growth at"
                    rowCount={formData.marineGrowthRows}
                    data={formData.marineGrowthData}
                    onRowCountChange={(count) => onInputChange('marineGrowthRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('marineGrowthData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Cleaning of Propellers<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Cleaning of Propellers"
                    rowCount={formData.foreignObjectsRows}
                    data={formData.foreignObjectsData}
                    onRowCountChange={(count) => onInputChange('foreignObjectsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('foreignObjectsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Remnants of ropes, fishing nets or any other foreign objects<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Remnants of ropes, fishing nets or any other foreign objects"
                    rowCount={formData.foreignObjectsRows}
                    data={formData.foreignObjectsData}
                    onRowCountChange={(count) => onInputChange('foreignObjectsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('foreignObjectsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PAINTING Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">PAINTING</h3>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Outer bottom between bilge keel<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Outer bottom between bilge keel"
                    rowCount={formData.outerBottomRows}
                    data={formData.outerBottomData}
                    onRowCountChange={(count) => onInputChange('outerBottomRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('outerBottomData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Stern /Aft cut up<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Stern /Aft cut up"
                    rowCount={formData.sternAftRows}
                    data={formData.sternAftData}
                    onRowCountChange={(count) => onInputChange('sternAftRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('sternAftData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Boot top<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Boot top"
                    rowCount={formData.bootTopRows}
                    data={formData.bootTopData}
                    onRowCountChange={(count) => onInputChange('bootTopRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('bootTopData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(d) Rudders<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Rudders"
                    rowCount={formData.ruddersRows}
                    data={formData.ruddersData}
                    onRowCountChange={(count) => onInputChange('ruddersRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('ruddersData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(e) Stabilizers<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Stabilizers"
                    rowCount={formData.stabilizersRows}
                    data={formData.stabilizersData}
                    onRowCountChange={(count) => onInputChange('stabilizersRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('stabilizersData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(f) Old dock block areas<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Old dock block areas"
                    rowCount={formData.dockBlockRows}
                    data={formData.dockBlockData}
                    onRowCountChange={(count) => onInputChange('dockBlockRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('dockBlockData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(g) Other observations<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Other observations"
                    rowCount={formData.otherObservationsRows}
                    data={formData.otherObservationsData}
                    onRowCountChange={(count) => onInputChange('otherObservationsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('otherObservationsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(h) Paint scheme being applied<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Paint scheme being applied"
                    rowCount={formData.paintSchemeRows}
                    data={formData.paintSchemeData}
                    onRowCountChange={(count) => onInputChange('paintSchemeRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('paintSchemeData', rowIndex, field, value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RUSTING & CORROSION Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">RUSTING & CORROSION</h3>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">Areas having rust & corrosion<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Areas having rust & corrosion"
                    rowCount={formData.rustCorrosionAreasRows}
                    data={formData.rustCorrosionAreasData}
                    onRowCountChange={(count) => onInputChange('rustCorrosionAreasRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustCorrosionAreasData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) General Outer bottom<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="General Outer bottom"
                    rowCount={formData.rustGeneralOuterBottomRows}
                    data={formData.rustGeneralOuterBottomData}
                    onRowCountChange={(count) => onInputChange('rustGeneralOuterBottomRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustGeneralOuterBottomData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Boot top<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Boot top"
                    rowCount={formData.rustBootTopRows}
                    data={formData.rustBootTopData}
                    onRowCountChange={(count) => onInputChange('rustBootTopRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustBootTopData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Stern / Aft cut up<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Stern / Aft cut up"
                    rowCount={formData.rustSternAftRows}
                    data={formData.rustSternAftData}
                    onRowCountChange={(count) => onInputChange('rustSternAftRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustSternAftData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(d) Rudders<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Rudders"
                    rowCount={formData.rustRuddersRows}
                    data={formData.rustRuddersData}
                    onRowCountChange={(count) => onInputChange('rustRuddersRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustRuddersData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(e) Bilge keel, stem, stabilizers, weld seams<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Bilge keel, stem, stabilizers, weld seams"
                    rowCount={formData.rustBilgeKeelRows}
                    data={formData.rustBilgeKeelData}
                    onRowCountChange={(count) => onInputChange('rustBilgeKeelRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustBilgeKeelData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(f) Old dock block areas<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Old dock block areas"
                    rowCount={formData.rustDockBlockRows}
                    data={formData.rustDockBlockData}
                    onRowCountChange={(count) => onInputChange('rustDockBlockRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustDockBlockData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(g) Other Observations<span className="text-red-500">*</span></span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Other Observations"
                    rowCount={formData.rustOtherObservationsRows}
                    data={formData.rustOtherObservationsData}
                    onRowCountChange={(count) => onInputChange('rustOtherObservationsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rustOtherObservationsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* STRUCTURE Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">STRUCTURE</h3>
        </div>
        
        <div className="p-6">
          {/* Extent of Hull Survey Input */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 min-w-[200px]">
                Extent of Hull Survey<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.extentOfHullSurvey}
                onChange={(e) => onInputChange('extentOfHullSurvey', e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="Enter extent of hull survey"
                required
              />
            </div>
          </div>
          
          <div className="bg-gray-100 max-h-96 overflow-y-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
              <tbody>
                <tr className="bg-[#f2f2f2]">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(a) Extent of hull survey<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Extent of hull survey"
                      rowCount={formData.structureHullSurveyRows}
                      data={formData.structureHullSurveyData}
                      onRowCountChange={(count) => onInputChange('structureHullSurveyRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureHullSurveyData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(b) Dents at<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Dents at"
                      rowCount={formData.structureDentsRows}
                      data={formData.structureDentsData}
                      onRowCountChange={(count) => onInputChange('structureDentsRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureDentsData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(c) Suspect cracks at<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Suspect cracks at"
                      rowCount={formData.structureCracksRows}
                      data={formData.structureCracksData}
                      onRowCountChange={(count) => onInputChange('structureCracksRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureCracksData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(d) Deep scratch/Notch at<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Deep scratch/Notch at"
                      rowCount={formData.structureScratchRows}
                      data={formData.structureScratchData}
                      onRowCountChange={(count) => onInputChange('structureScratchRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureScratchData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(e) Holes/doublers at<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Holes/doublers at"
                      rowCount={formData.structureHolesRows}
                      data={formData.structureHolesData}
                      onRowCountChange={(count) => onInputChange('structureHolesRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureHolesData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(f) Other Observations, if any<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Other Observations, if any"
                      rowCount={formData.structureOtherObservationsRows}
                      data={formData.structureOtherObservationsData}
                      onRowCountChange={(count) => onInputChange('structureOtherObservationsRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureOtherObservationsData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(g) SS to confirm known structural defects required to be undertaken during DD<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="SS to confirm known structural defects required to be undertaken during DD"
                      rowCount={formData.structureDefectsRows}
                      data={formData.structureDefectsData}
                      onRowCountChange={(count) => onInputChange('structureDefectsRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureDefectsData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                    <span className="text-sm font-medium text-gray-700">(h) Survey / Preservation underneath stabilizers<span className="text-red-500">*</span></span>
                  </td>
                  <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                    <DynamicTable
                      title="Survey / Preservation underneath stabilizers"
                      rowCount={formData.structureStabilizersRows}
                      data={formData.structureStabilizersData}
                      onRowCountChange={(count) => onInputChange('structureStabilizersRows', count)}
                      onDataChange={(rowIndex, field, value) => onDataChange('structureStabilizersData', rowIndex, field, value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SONAR DOME Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">SONAR DOME</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Clean Ship<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="text"
                    value={formData.sonarDomeCleanShipObservation}
                    onChange={(e) => onInputChange('sonarDomeCleanShipObservation', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Observation"
                  />
                  <Input
                    type="text"
                    value={formData.sonarDomeCleanShipRemarks}
                    onChange={(e) => onInputChange('sonarDomeCleanShipRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Cracks<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="text"
                    value={formData.sonarDomeCracksObservation}
                    onChange={(e) => onInputChange('sonarDomeCracksObservation', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Observation"
                  />
                  <Input
                    type="text"
                    value={formData.sonarDomeCracksRemarks}
                    onChange={(e) => onInputChange('sonarDomeCracksRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  GRP<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="text"
                    value={formData.sonarDomeGrpObservation}
                    onChange={(e) => onInputChange('sonarDomeGrpObservation', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Observation"
                  />
                  <Input
                    type="text"
                    value={formData.sonarDomeGrpRemarks}
                    onChange={(e) => onInputChange('sonarDomeGrpRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Fairing<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="text"
                    value={formData.sonarDomeFairingObservation}
                    onChange={(e) => onInputChange('sonarDomeFairingObservation', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Observation"
                  />
                  <Input
                    type="text"
                    value={formData.sonarDomeFairingRemarks}
                    onChange={(e) => onInputChange('sonarDomeFairingRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreliminaryFormSectionsPart1;
