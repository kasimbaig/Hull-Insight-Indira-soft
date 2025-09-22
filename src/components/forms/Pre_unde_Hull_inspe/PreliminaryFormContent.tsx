import React from "react";
import PreliminaryFormHeader from "./PreliminaryFormHeader";
import PreliminaryFormSectionsPart1 from "./PreliminaryFormSectionsPart1";
import PreliminaryFormSectionsPart2 from "./PreliminaryFormSectionsPart2";

interface FormData {
  // Header
  insName: string;
  inspectionDate: string;
  authority: string;
  vesselId: string;
  vesselName: string;
  
  // Docking
  dockingVersion: string;
  natureOfDocking: string;
  dockBlocksWedged: number;
  dockBlocksCrushed: number;
  uwOpeningsClear: string;
  dockingDuration: string;
  
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
  
  // Signatures
  shipStaffSignature: File | null;
  refittingAuthSignature: File | null;
  hituInspectorSignature: File | null;
}

interface PreliminaryFormContentProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  onDataChange: (field: string, index: number, dataField: 'observation' | 'remarks', value: string) => void;
}

const PreliminaryFormContent: React.FC<PreliminaryFormContentProps> = ({
  formData,
  onInputChange,
  onDataChange
}) => {
  return (
    <>
      {/* Header and Docking Section */}
      <PreliminaryFormHeader 
        formData={formData} 
        onInputChange={onInputChange} 
      />

      {/* Inspection Sections Part 1 */}
      <PreliminaryFormSectionsPart1 
        formData={formData} 
        onInputChange={onInputChange}
        onDataChange={onDataChange}
      />

      {/* Inspection Sections Part 2 */}
      <PreliminaryFormSectionsPart2 
        formData={formData} 
        onInputChange={onInputChange}
        onDataChange={onDataChange}
      />

      {/* Signature Section */}
      <div className="bg-white border-b border-gray-200 mt-8">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">SIGNATURES</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ship Staff Signature */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onInputChange('shipStaffSignature', file);
                    }
                  }}
                  className="hidden"
                  id="shipStaffSignature"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('shipStaffSignature')?.click()}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-left justify-start bg-white hover:bg-gray-50"
                >
                  Choose File
                </button>
                <span className="ml-2 text-sm text-gray-500">
                  {formData.shipStaffSignature ? formData.shipStaffSignature.name : "No file chosen"}
                </span>
              </div>
              <label className="text-sm font-bold text-gray-700">
                Signature of Ship Staff<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Refitting Authority Signature */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onInputChange('refittingAuthSignature', file);
                    }
                  }}
                  className="hidden"
                  id="refittingAuthSignature"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('refittingAuthSignature')?.click()}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-left justify-start bg-white hover:bg-gray-50"
                >
                  Choose File
                </button>
                <span className="ml-2 text-sm text-gray-500">
                  {formData.refittingAuthSignature ? formData.refittingAuthSignature.name : "No file chosen"}
                </span>
              </div>
              <label className="text-sm font-bold text-gray-700">
                Signature of Refitting Authority<span className="text-red-500">*</span>
              </label>
            </div>

            {/* HITU Inspector Signature */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onInputChange('hituInspectorSignature', file);
                    }
                  }}
                  className="hidden"
                  id="hituInspectorSignature"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('hituInspectorSignature')?.click()}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-left justify-start bg-white hover:bg-gray-50"
                >
                  Choose File
                </button>
                <span className="ml-2 text-sm text-gray-500">
                  {formData.hituInspectorSignature ? formData.hituInspectorSignature.name : "No file chosen"}
                </span>
              </div>
              <label className="text-sm font-bold text-gray-700">
                Signature of HITU Inspector<span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreliminaryFormContent;
