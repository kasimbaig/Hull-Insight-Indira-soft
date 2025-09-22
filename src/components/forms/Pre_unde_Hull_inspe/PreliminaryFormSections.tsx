import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DynamicTable from "../DynamicTable";

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
  
  // Cathodic Protection System
  cathodicProtectionIccpServiceability: string;
  cathodicProtectionIccpServiceabilityRemarks: string;
  cathodicProtectionSacrificialAnodes: string;
  cathodicProtectionSacrificialAnodesRemarks: string;
  cathodicProtectionIccpAnodes: string;
  cathodicProtectionIccpAnodesRemarks: string;
  cathodicProtectionIccpReferenceElectrode: string;
  cathodicProtectionIccpReferenceElectrodeRemarks: string;
  cathodicProtectionDielectricShields: string;
  cathodicProtectionDielectricShieldsRemarks: string;
  cathodicProtectionPreDockingChecks: string;
  cathodicProtectionPreDockingChecksRemarks: string;
  
  // Rudder
  rudderCracksDentsRows: number;
  rudderMisalignmentRows: number;
  rudderCracksDentsData: Array<{ observation: string; remarks: string }>;
  rudderMisalignmentData: Array<{ observation: string; remarks: string }>;
  
  // Propellers
  propellerCleaningRows: number;
  propellerEdgesRows: number;
  propellerHubsRows: number;
  propellerPittingRows: number;
  propellerEpoxyCoatingRows: number;
  propellerCleaningData: Array<{ observation: string; remarks: string }>;
  propellerEdgesData: Array<{ observation: string; remarks: string }>;
  propellerHubsData: Array<{ observation: string; remarks: string }>;
  propellerPittingData: Array<{ observation: string; remarks: string }>;
  propellerEpoxyCoatingData: Array<{ observation: string; remarks: string }>;
  
  // Miscellaneous
  miscellaneousEddyConeRows: number;
  miscellaneousWaterSeepageRows: number;
  miscellaneousMissingPartsRows: number;
  miscellaneousBlankingRows: number;
  miscellaneousScupperLipsRows: number;
  miscellaneousAralditeFairingRows: number;
  miscellaneousAngleOfListRows: number;
  miscellaneousEddyConeData: Array<{ observation: string; remarks: string }>;
  miscellaneousWaterSeepageData: Array<{ observation: string; remarks: string }>;
  miscellaneousMissingPartsData: Array<{ observation: string; remarks: string }>;
  miscellaneousBlankingData: Array<{ observation: string; remarks: string }>;
  miscellaneousScupperLipsData: Array<{ observation: string; remarks: string }>;
  miscellaneousAralditeFairingData: Array<{ observation: string; remarks: string }>;
  miscellaneousAngleOfListData: Array<{ observation: string; remarks: string }>;
  
  // Other Observations
  otherObservationsRows: number;
  otherObservationsData: Array<{ observation: string; remarks: string }>;
}

interface PreliminaryFormSectionsProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  onDataChange: (field: string, index: number, dataField: 'observation' | 'remarks', value: string) => void;
}

const PreliminaryFormSections: React.FC<PreliminaryFormSectionsProps> = ({
  formData,
  onInputChange,
  onDataChange
}) => {
  const renderSection = (title: string, subsections: Array<{label: string, rows: number, data: Array<{observation: string; remarks: string}>}>) => (
    <div className="bg-white border-b border-gray-200">
      <div className="bg-[#c7d9f0] text-black px-6 py-4">
        <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">{title}</h3>
      </div>
      
      <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <tbody>
            {subsections.map((subsection, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">{subsection.label}</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title={subsection.label}
                    rowCount={subsection.rows}
                    data={subsection.data}
                    onRowCountChange={(count) => onInputChange(`${title.toLowerCase().replace(/\s+/g, '')}Rows` as keyof FormData, count)}
                    onDataChange={(rowIndex, field, value) => onDataChange(`${title.toLowerCase().replace(/\s+/g, '')}Data`, rowIndex, field, value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
                  <span className="text-sm font-medium text-gray-700">(a) Presence of marine growth at*</span>
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
                  <span className="text-sm font-medium text-gray-700">(b) Cleaning of Propellers*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Cleaning of Propellers"
                    rowCount={formData.propellerCleaningRows}
                    data={formData.propellerCleaningData}
                    onRowCountChange={(count) => onInputChange('propellerCleaningRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('propellerCleaningData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Remnants of ropes, fishing nets or any other foreign objects*</span>
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
                  <span className="text-sm font-medium text-gray-700">Condition of A/F*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Condition of A/F"
                    rowCount={formData.outerBottomRows}
                    data={formData.outerBottomData}
                    onRowCountChange={(count) => onInputChange('outerBottomRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('outerBottomData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Outer bottom between bilge keel*</span>
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
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Stern /Aft cut up*</span>
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
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Boot top*</span>
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
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(d) Rudders*</span>
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
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(e) Stabilizers*</span>
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
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(f) Old dock block areas*</span>
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
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(g) Other observations*</span>
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
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(h) Paint scheme being applied*</span>
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
                  <span className="text-sm font-medium text-gray-700">Areas having rust & corrosion*</span>
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
                  <span className="text-sm font-medium text-gray-700">(a) General Outer bottom*</span>
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
                  <span className="text-sm font-medium text-gray-700">(b) Boot top*</span>
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
                  <span className="text-sm font-medium text-gray-700">(c) Stern / Aft cut up*</span>
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
                  <span className="text-sm font-medium text-gray-700">(d) Rudders*</span>
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
                  <span className="text-sm font-medium text-gray-700">(e) Bilge keel, stem, stabilizers, weld seams*</span>
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
                  <span className="text-sm font-medium text-gray-700">(f) Old dock block areas*</span>
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
                  <span className="text-sm font-medium text-gray-700">(g) Other Observations*</span>
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
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Extent of Hull Survey<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.extentOfHullSurvey || ''}
                onChange={(e) => onInputChange('extentOfHullSurvey', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-52"
                placeholder="Enter extent of hull survey"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Extent of hull survey*</span>
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
                  <span className="text-sm font-medium text-gray-700">(b) Dents at*</span>
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
                  <span className="text-sm font-medium text-gray-700">(c) Suspect cracks at*</span>
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
                  <span className="text-sm font-medium text-gray-700">(d) Deep scratch/Notch at*</span>
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
                  <span className="text-sm font-medium text-gray-700">(e) Holes/doublers at*</span>
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
                  <span className="text-sm font-medium text-gray-700">(f) Other Observations, if any*</span>
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
                  <span className="text-sm font-medium text-gray-700">(g) SS to confirm known structural defects required to be undertaken during DD*</span>
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
                  <span className="text-sm font-medium text-gray-700">(h) Survey / Preservation underneath stabilizers*</span>
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

      {/* SONAR DOME Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">SONAR DOME</h3>
        </div>
        
        <div className="p-6">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="sticky top-0">
              <tr className="bg-[#1a2746] text-white">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium"></th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Observation<span className="text-red-500">*</span></th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Remarks<span className="text-red-500">*</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "(a) Clean ship*", obs: formData.sonarDomeCleanShipObservation, rem: formData.sonarDomeCleanShipRemarks },
                { label: "(b) Cracks/dents/fouling*", obs: formData.sonarDomeCracksObservation, rem: formData.sonarDomeCracksRemarks },
                { label: "(c) If GRP dome, Delamination, blistering, cracking of Gel / GRP coat*", obs: formData.sonarDomeGrpObservation, rem: formData.sonarDomeGrpRemarks },
                { label: "(d) Condition of fairing skirt*", obs: formData.sonarDomeFairingObservation, rem: formData.sonarDomeFairingRemarks }
              ].map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                  <td className="border border-gray-300 px-3 py-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      type="text"
                      value={item.obs}
                      onChange={(e) => onInputChange(`sonarDome${item.label.split(' ')[1]}Observation` as keyof FormData, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      placeholder="Enter observation"
                      required
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      type="text"
                      value={item.rem}
                      onChange={(e) => onInputChange(`sonarDome${item.label.split(' ')[1]}Remarks` as keyof FormData, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      placeholder="Enter remarks"
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* RUDDER Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">RUDDER</h3>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Cracks/dents/fouling*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Cracks/dents/fouling"
                    rowCount={formData.rudderCracksDentsRows}
                    data={formData.rudderCracksDentsData}
                    onRowCountChange={(count) => onInputChange('rudderCracksDentsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rudderCracksDentsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Mis-alignment if any*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Mis-alignment if any"
                    rowCount={formData.rudderMisalignmentRows}
                    data={formData.rudderMisalignmentData}
                    onRowCountChange={(count) => onInputChange('rudderMisalignmentRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('rudderMisalignmentData', rowIndex, field, value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CATHODIC PROTECTION SYSTEM Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">CATHODIC PROTECTION SYSTEM</h3>
        </div>
        
        <div className="p-6">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="sticky top-0">
              <tr className="bg-[#1a2746] text-white">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium"></th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Observation<span className="text-red-500">*</span></th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Remarks<span className="text-red-500">*</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "(a) Serviceability check of ICCP system*", obs: formData.cathodicProtectionIccpServiceability, rem: formData.cathodicProtectionIccpServiceabilityRemarks },
                { label: "(b) Condition of sacrificial anodes*", obs: formData.cathodicProtectionSacrificialAnodes, rem: formData.cathodicProtectionSacrificialAnodesRemarks },
                { label: "(c) Condition of ICCP anodes and fairing*", obs: formData.cathodicProtectionIccpAnodes, rem: formData.cathodicProtectionIccpAnodesRemarks },
                { label: "(d) Condition of ICCP reference electrode and fairing*", obs: formData.cathodicProtectionIccpReferenceElectrode, rem: formData.cathodicProtectionIccpReferenceElectrodeRemarks },
                { label: "(e) Condition of dielectric shields*", obs: formData.cathodicProtectionDielectricShields, rem: formData.cathodicProtectionDielectricShieldsRemarks },
                { label: "(f) SS to confirm pre-docking checks of ICCP*", obs: formData.cathodicProtectionPreDockingChecks, rem: formData.cathodicProtectionPreDockingChecksRemarks }
              ].map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                  <td className="border border-gray-300 px-3 py-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Select value={item.obs} onValueChange={(value) => onInputChange(`cathodicProtection${item.label.split(' ')[1]}Observation` as keyof FormData, value)}>
                      <SelectTrigger className="border border-gray-300 rounded px-3 py-2">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good">SAT</SelectItem>
                        <SelectItem value="Fair">UNSAT</SelectItem>
                       
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      type="text"
                      value={item.rem}
                      onChange={(e) => onInputChange(`cathodicProtection${item.label.split(' ')[1]}Remarks` as keyof FormData, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      placeholder="Enter remarks"
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      

      {/* PROPELLERS Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">PROPELLERS</h3>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Cleaning of propellers.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Cleaning of propellers"
                    rowCount={formData.propellerCleaningRows}
                    data={formData.propellerCleaningData}
                    onRowCountChange={(count) => onInputChange('propellerCleaningRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('propellerCleaningData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Condition of edges of propeller blades.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Condition of edges of propeller blades"
                    rowCount={formData.propellerEdgesRows}
                    data={formData.propellerEdgesData}
                    onRowCountChange={(count) => onInputChange('propellerEdgesRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('propellerEdgesData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Condition of propeller hubs*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Condition of propeller hubs"
                    rowCount={formData.propellerHubsRows}
                    data={formData.propellerHubsData}
                    onRowCountChange={(count) => onInputChange('propellerHubsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('propellerHubsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(d) Pitting / erosion if any*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Pitting / erosion if any"
                    rowCount={formData.propellerPittingRows}
                    data={formData.propellerPittingData}
                    onRowCountChange={(count) => onInputChange('propellerPittingRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('propellerPittingData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(e) Condition of epoxy coating of shaft (P/S)*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Condition of epoxy coating of shaft (P/S)"
                    rowCount={formData.propellerEpoxyCoatingRows}
                    data={formData.propellerEpoxyCoatingData}
                    onRowCountChange={(count) => onInputChange('propellerEpoxyCoatingRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('propellerEpoxyCoatingData', rowIndex, field, value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MISCELLANEOUS Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">MISCELLANEOUS</h3>
        </div>
        
        <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <tbody>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(a) Eddy cone / Rope guards, U/W gratings etc.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Eddy cone / Rope guards, U/W gratings etc"
                    rowCount={formData.miscellaneousEddyConeRows}
                    data={formData.miscellaneousEddyConeData}
                    onRowCountChange={(count) => onInputChange('miscellaneousEddyConeRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousEddyConeData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(b) Water seepage from OBD sea tubes etc.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Water seepage from OBD sea tubes etc"
                    rowCount={formData.miscellaneousWaterSeepageRows}
                    data={formData.miscellaneousWaterSeepageData}
                    onRowCountChange={(count) => onInputChange('miscellaneousWaterSeepageRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousWaterSeepageData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(c) Missing parts like draught marks, gratings, hull outfit parts etc.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Missing parts like draught marks, gratings, hull outfit parts etc"
                    rowCount={formData.miscellaneousMissingPartsRows}
                    data={formData.miscellaneousMissingPartsData}
                    onRowCountChange={(count) => onInputChange('miscellaneousMissingPartsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousMissingPartsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(d) Blanking of any parts like Sea Tubes, Propeller shafts boss, rudder stock boss, etc.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Blanking of any parts like Sea Tubes, Propeller shafts boss, rudder stock boss, etc"
                    rowCount={formData.miscellaneousBlankingRows}
                    data={formData.miscellaneousBlankingData}
                    onRowCountChange={(count) => onInputChange('miscellaneousBlankingRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousBlankingData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(e) Condition of scupper lips*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Condition of scupper lips"
                    rowCount={formData.miscellaneousScupperLipsRows}
                    data={formData.miscellaneousScupperLipsData}
                    onRowCountChange={(count) => onInputChange('miscellaneousScupperLipsRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousScupperLipsData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(f) Condition of Araldite fairing of rudders, 'A' brackets, stabilizer, Echo sounders, log rod, eddy cones , eddy plates, rope guards, U/W openings.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Condition of Araldite fairing of rudders, 'A' brackets, stabilizer, Echo sounders, log rod, eddy cones , eddy plates, rope guards, U/W openings"
                    rowCount={formData.miscellaneousAralditeFairingRows}
                    data={formData.miscellaneousAralditeFairingData}
                    onRowCountChange={(count) => onInputChange('miscellaneousAralditeFairingRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousAralditeFairingData', rowIndex, field, value)}
                  />
                </td>
              </tr>
              <tr className="bg-[#f2f2f2]">
                <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                  <span className="text-sm font-medium text-gray-700">(g) Angle of list.*</span>
                </td>
                <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                  <DynamicTable
                    title="Angle of list"
                    rowCount={formData.miscellaneousAngleOfListRows}
                    data={formData.miscellaneousAngleOfListData}
                    onRowCountChange={(count) => onInputChange('miscellaneousAngleOfListRows', count)}
                    onDataChange={(rowIndex, field, value) => onDataChange('miscellaneousAngleOfListData', rowIndex, field, value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Other Observations Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">OTHER OBSERVATIONS</h3>
        </div>
        
        <div className="p-6">
          <DynamicTable
            title="Other observations"
            rowCount={formData.otherObservationsRows}
            data={formData.otherObservationsData}
            onRowCountChange={(count) => onInputChange('otherObservationsRows', count)}
            onDataChange={(rowIndex, field, value) => onDataChange('otherObservationsData', rowIndex, field, value)}
          />
        </div>
      </div>
    </>
  );
};

export default PreliminaryFormSections;
