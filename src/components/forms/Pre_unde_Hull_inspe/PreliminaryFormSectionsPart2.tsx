import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DynamicTable from "../DynamicTable";

interface FormData {
  // Rudder
  rudderCracksDentsRows: number;
  rudderMisalignmentRows: number;
  rudderCracksDentsData: Array<{ observation: string; remarks: string }>;
  rudderMisalignmentData: Array<{ observation: string; remarks: string }>;
  
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

interface PreliminaryFormSectionsPart2Props {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  onDataChange: (field: string, index: number, dataField: 'observation' | 'remarks', value: string) => void;
}

const PreliminaryFormSectionsPart2: React.FC<PreliminaryFormSectionsPart2Props> = ({
  formData,
  onInputChange,
  onDataChange
}) => {
  return (
    <>
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
                  <span className="text-sm font-medium text-gray-700">(a) Cracks/dents/fouling<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(b) Mis-alignment if any<span className="text-red-500">*</span></span>
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  ICCP Serviceability<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Select value={formData.cathodicProtectionIccpServiceability} onValueChange={(value) => onInputChange('cathodicProtectionIccpServiceability', value)}>
                    <SelectTrigger className="flex-1 border border-gray-300 rounded px-3 py-2">
                      <SelectValue placeholder="Select observation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Not Working">Not Working</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={formData.cathodicProtectionIccpServiceabilityRemarks}
                    onChange={(e) => onInputChange('cathodicProtectionIccpServiceabilityRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Sacrificial Anodes<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Select value={formData.cathodicProtectionSacrificialAnodes} onValueChange={(value) => onInputChange('cathodicProtectionSacrificialAnodes', value)}>
                    <SelectTrigger className="flex-1 border border-gray-300 rounded px-3 py-2">
                      <SelectValue placeholder="Select observation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Depleted">Depleted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={formData.cathodicProtectionSacrificialAnodesRemarks}
                    onChange={(e) => onInputChange('cathodicProtectionSacrificialAnodesRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  ICCP Anodes<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Select value={formData.cathodicProtectionIccpAnodes} onValueChange={(value) => onInputChange('cathodicProtectionIccpAnodes', value)}>
                    <SelectTrigger className="flex-1 border border-gray-300 rounded px-3 py-2">
                      <SelectValue placeholder="Select observation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Corroded">Corroded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={formData.cathodicProtectionIccpAnodesRemarks}
                    onChange={(e) => onInputChange('cathodicProtectionIccpAnodesRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  ICCP Reference Electrode<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Select value={formData.cathodicProtectionIccpReferenceElectrode} onValueChange={(value) => onInputChange('cathodicProtectionIccpReferenceElectrode', value)}>
                    <SelectTrigger className="flex-1 border border-gray-300 rounded px-3 py-2">
                      <SelectValue placeholder="Select observation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Faulty">Faulty</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={formData.cathodicProtectionIccpReferenceElectrodeRemarks}
                    onChange={(e) => onInputChange('cathodicProtectionIccpReferenceElectrodeRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Dielectric Shields<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Select value={formData.cathodicProtectionDielectricShields} onValueChange={(value) => onInputChange('cathodicProtectionDielectricShields', value)}>
                    <SelectTrigger className="flex-1 border border-gray-300 rounded px-3 py-2">
                      <SelectValue placeholder="Select observation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={formData.cathodicProtectionDielectricShieldsRemarks}
                    onChange={(e) => onInputChange('cathodicProtectionDielectricShieldsRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Pre-Docking Checks<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Select value={formData.cathodicProtectionPreDockingChecks} onValueChange={(value) => onInputChange('cathodicProtectionPreDockingChecks', value)}>
                    <SelectTrigger className="flex-1 border border-gray-300 rounded px-3 py-2">
                      <SelectValue placeholder="Select observation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Partial">Partial</SelectItem>
                      <SelectItem value="Not Done">Not Done</SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={formData.cathodicProtectionPreDockingChecksRemarks}
                    onChange={(e) => onInputChange('cathodicProtectionPreDockingChecksRemarks', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="Remarks"
                  />
                </div>
              </div>
            </div>
          </div>
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
                  <span className="text-sm font-medium text-gray-700">(a) Cleaning of propellers.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(b) Condition of edges of propeller blades.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(c) Condition of propeller hubs<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(d) Pitting / erosion if any<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(e) Condition of epoxy coating of shaft (P/S)<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(a) Eddy cone / Rope guards, U/W gratings etc.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(b) Water seepage from OBD sea tubes etc.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(c) Missing parts like draught marks, gratings, hull outfit parts etc.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(d) Blanking of any parts like Sea Tubes, Propeller shafts boss, rudder stock boss, etc.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(e) Condition of scupper lips<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(f) Condition of Araldite fairing of rudders, 'A' brackets, stabilizer, Echo sounders, log rod, eddy cones , eddy plates, rope guards, U/W openings.<span className="text-red-500">*</span></span>
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
                  <span className="text-sm font-medium text-gray-700">(g) Angle of list.<span className="text-red-500">*</span></span>
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

      {/* OTHER OBSERVATIONS Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">OTHER OBSERVATIONS</h3>
        </div>
        
        <div className="p-6">
          <DynamicTable
            title="Other Observations"
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

export default PreliminaryFormSectionsPart2;
