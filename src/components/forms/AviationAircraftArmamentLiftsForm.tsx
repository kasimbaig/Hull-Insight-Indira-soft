import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, FileText, Trash2, Edit } from 'lucide-react';

const AviationAircraftArmamentLiftsForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    dateOfInspection: "",
    makeModel: "",
    type: "",
    yearOfManufacture: "",
    refDocuments: "",
    maintenanceRoutines: "",
    dateOfLastStructuralSurvey: "",
    structureRemarks: "",
    totalRows: 1,
    equipment1: "",
    observation1: "",
    remarks1: "",
    greasingPointsObservations: "",
    greasingPointsRemarks: "",
    greaseLayerObservations: "",
    greaseLayerRemarks: "",
    bearingsObservations: "",
    bearingsRemarks: "",
    liftGuidesObservations: "",
    liftGuidesRemarks: "",
    chainHoldersObservations: "",
    chainHoldersRemarks: "",
    rollersObservations: "",
    rollersRemarks: "",
    rockersObservations: "",
    rockersRemarks: "",
    liftCoversLugJointObservations: "",
    liftCoversLugJointRemarks: "",
    ssToConfirmGreasingObservations: "",
    ssToConfirmGreasingRemarks: "",
    hydraulicDriveRemarks: "",
    dateOfOilChange: "",
    oilChangeRemarks: "",
    dateOfLastOilAnalysis: "",
    oilAnalysisRemarks: "",
    oilLevelInTanksObservations: "",
    oilLevelInTanksRemarks: "",
    leakagesDetachableConnectionObservations: "",
    leakagesDetachableConnectionRemarks: "",
    ssToConfirmOilInMovableJointsObservations: "",
    ssToConfirmOilInMovableJointsRemarks: "",
    deckFoundationStructureObservations: "",
    deckFoundationStructureRemarks: "",
    rustingObservations: "",
    rustingRemarks: "",
    attachmentOfChainToHolderObservations: "",
    attachmentOfChainToHolderRemarks: "",
    checkStructureObservations: "",
    checkStructureRemarks: "",
    rubberDampersOnShockObservations: "",
    rubberDampersOnShockRemarks: "",
    coamingOfLiftObservations: "",
    coamingOfLiftRemarks: "",
    waterDischargeObservations: "",
    waterDischargeObservationsRemarks: "",
    clearanceBetweenGuidePlatesObservations: "",
    clearanceBetweenGuidePlatesRemarks: "",
    wireRopesObservations: "",
    wireRopesObservationsRemarks: "",
    dateOfLastChangeReplaced: "",
    dateOfLastChangeReplacedRemarks: "",
    dateOfLastServiceability: "",
    lastServiceabilityRemarks: "",
    electricChecksObservations: "",
    electricChecksRemarks: "",
    magneticStartersObservations: "",
    magneticStartersRemarks: "",
    electricDriveCircuitObservations: "",
    electricDriveCircuitRemarks: "",
    electricChecksByEtmaObservations: "",
    electricChecksByEtmaRemarks: "",
    availabilityOfReportObservations: "",
    availabilityOfReportRemarks: "",
    availabilityOfAllLimitSwitchesObservations: "",
    availabilityOfAllLimitSwitchesRemarks: "",
    redLinesOnFlagObservations: "",
    redLinesOnFlagRemarks: "",
    dateLastLoadTesting: "",
    lastLoadTestingRemarks: "",
    staticDynamicLoadtestingObservations: "",
    staticDynamicLoadtestingRemarks: "",
    emergencyStopObservations: "",
    emergencyStopRemarks: "",
    ssConfirmToNoOilLeakagesDuringLoadTestingObservations: "",
    ssConfirmToNoOilLeakagesDuringLoadTestingRemarks: "",
    operationalFunctionalCheckObservations: "",
    operationalFunctionalCheckRemarks: "",
    automaticSwitchingFormObservations: "",
    automaticSwitchingFormRemarks: "",
    loweringSpeedsObservations: "",
    loweringSpeedsRemarks: "",
    high11MMinObservations: "",
    high11MMinObservationsRemarks: "",
    operationOfLimitSwitchesObservations: "",
    operationOfLimitSwitchesRemarks: "",
    accurateStoppingObservations: "",
    accurateStoppingRemarks: "",
    activateStopObservations: "",
    activateStopRemarks: "",
    checkForOilLeakagesObservations: "",
    checkForOilLeakagesRemarks: "",
    checkForExcessiveObservations: "",
    checkForExcessiveRemarks: "",
    emergencyModeObservation: "",
    emergencyModeRemarks: "",
    electroMagneticObservations: "",
    electroMagneticRemarks: "",
    blockBrakeOperationObservations: "",
    blockBrakeOperationRemarks: "",
    automaticOperationOfUpperLiftCoversObservations: "",
    automaticOperationOfUpperLiftCoversRemarks: "",
    operationOfIndicatorObservations: "",
    operationOfIndicatorRemarks: "",
    rollerMechanismObservations: "",
    rollerMechanismRemarks: "",
    operationOfWarningObservations: "",
    operationOfWarningRemarks: "",
    switchOffPowerSupplyObservations: "",
    switchOffPowerSupplyRemarks: "",
    driveGearBoxObservations: "",
    driveGearBoxRemarks: "",
    freeMovementObservations: "",
    freeMovementRemarks: "",
    hinderedJerkyMovementObservations: "",
    hinderedJerkyMovementRemarks: "",
    otherObservations: "",
    otherObservationsRemarks: "",
    overAllRemarks: "",
    authoritySignature: null,
  });

  const [dynamicRows, setDynamicRows] = useState([]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const addDynamicRow = () => {
    const newRow = {
      id: Date.now(),
      equipment: "",
      observation: "",
      remarks: ""
    };
    setDynamicRows(prev => [...prev, newRow]);
  };

  const removeDynamicRow = (id) => {
    setDynamicRows(prev => prev.filter(row => row.id !== id));
  };

  const updateDynamicRow = (id, field, value) => {
    setDynamicRows(prev => 
      prev.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  // Draft functionality
  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: hidDraftId || Date.now().toString()
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('aviation-aircraft-armament-lifts-drafts') || '[]');
    const updatedDrafts = hidDraftId 
      ? existingDrafts.map(draft => draft.id === hidDraftId ? draftData : draft)
      : [...existingDrafts, draftData];
    
    localStorage.setItem('aviation-aircraft-armament-lifts-drafts', JSON.stringify(updatedDrafts));
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const savedDrafts = JSON.parse(localStorage.getItem('aviation-aircraft-armament-lifts-drafts') || '[]');
    setDrafts(savedDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft) => {
    setFormData(draft);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('aviation-aircraft-armament-lifts-drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      dateOfInspection: "",
      makeModel: "",
      type: "",
      yearOfManufacture: "",
      refDocuments: "",
      maintenanceRoutines: "",
      dateOfLastStructuralSurvey: "",
      structureRemarks: "",
      totalRows: 1,
      equipment1: "",
      observation1: "",
      remarks1: "",
      greasingPointsObservations: "",
      greasingPointsRemarks: "",
      greaseLayerObservations: "",
      greaseLayerRemarks: "",
      bearingsObservations: "",
      bearingsRemarks: "",
      liftGuidesObservations: "",
      liftGuidesRemarks: "",
      chainHoldersObservations: "",
      chainHoldersRemarks: "",
      rollersObservations: "",
      rollersRemarks: "",
      rockersObservations: "",
      rockersRemarks: "",
      liftCoversLugJointObservations: "",
      liftCoversLugJointRemarks: "",
      ssToConfirmGreasingObservations: "",
      ssToConfirmGreasingRemarks: "",
      hydraulicDriveRemarks: "",
      dateOfOilChange: "",
      oilChangeRemarks: "",
      dateOfLastOilAnalysis: "",
      oilAnalysisRemarks: "",
      oilLevelInTanksObservations: "",
      oilLevelInTanksRemarks: "",
      leakagesDetachableConnectionObservations: "",
      leakagesDetachableConnectionRemarks: "",
      ssToConfirmOilInMovableJointsObservations: "",
      ssToConfirmOilInMovableJointsRemarks: "",
      deckFoundationStructureObservations: "",
      deckFoundationStructureRemarks: "",
      rustingObservations: "",
      rustingRemarks: "",
      attachmentOfChainToHolderObservations: "",
      attachmentOfChainToHolderRemarks: "",
      checkStructureObservations: "",
      checkStructureRemarks: "",
      rubberDampersOnShockObservations: "",
      rubberDampersOnShockRemarks: "",
      coamingOfLiftObservations: "",
      coamingOfLiftRemarks: "",
      waterDischargeObservations: "",
      waterDischargeObservationsRemarks: "",
      clearanceBetweenGuidePlatesObservations: "",
      clearanceBetweenGuidePlatesRemarks: "",
      wireRopesObservations: "",
      wireRopesObservationsRemarks: "",
      dateOfLastChangeReplaced: "",
      dateOfLastChangeReplacedRemarks: "",
      dateOfLastServiceability: "",
      lastServiceabilityRemarks: "",
      electricChecksObservations: "",
      electricChecksRemarks: "",
      magneticStartersObservations: "",
      magneticStartersRemarks: "",
      electricDriveCircuitObservations: "",
      electricDriveCircuitRemarks: "",
      electricChecksByEtmaObservations: "",
      electricChecksByEtmaRemarks: "",
      availabilityOfReportObservations: "",
      availabilityOfReportRemarks: "",
      availabilityOfAllLimitSwitchesObservations: "",
      availabilityOfAllLimitSwitchesRemarks: "",
      redLinesOnFlagObservations: "",
      redLinesOnFlagRemarks: "",
      dateLastLoadTesting: "",
      lastLoadTestingRemarks: "",
      staticDynamicLoadtestingObservations: "",
      staticDynamicLoadtestingRemarks: "",
      emergencyStopObservations: "",
      emergencyStopRemarks: "",
      ssConfirmToNoOilLeakagesDuringLoadTestingObservations: "",
      ssConfirmToNoOilLeakagesDuringLoadTestingRemarks: "",
      operationalFunctionalCheckObservations: "",
      operationalFunctionalCheckRemarks: "",
      automaticSwitchingFormObservations: "",
      automaticSwitchingFormRemarks: "",
      loweringSpeedsObservations: "",
      loweringSpeedsRemarks: "",
      high11MMinObservations: "",
      high11MMinObservationsRemarks: "",
      operationOfLimitSwitchesObservations: "",
      operationOfLimitSwitchesRemarks: "",
      accurateStoppingObservations: "",
      accurateStoppingRemarks: "",
      activateStopObservations: "",
      activateStopRemarks: "",
      checkForOilLeakagesObservations: "",
      checkForOilLeakagesRemarks: "",
      checkForExcessiveObservations: "",
      checkForExcessiveRemarks: "",
      emergencyModeObservation: "",
      emergencyModeRemarks: "",
      electroMagneticObservations: "",
      electroMagneticRemarks: "",
      blockBrakeOperationObservations: "",
      blockBrakeOperationRemarks: "",
      automaticOperationOfUpperLiftCoversObservations: "",
      automaticOperationOfUpperLiftCoversRemarks: "",
      operationOfIndicatorObservations: "",
      operationOfIndicatorRemarks: "",
      rollerMechanismObservations: "",
      rollerMechanismRemarks: "",
      operationOfWarningObservations: "",
      operationOfWarningRemarks: "",
      switchOffPowerSupplyObservations: "",
      switchOffPowerSupplyRemarks: "",
      driveGearBoxObservations: "",
      driveGearBoxRemarks: "",
      freeMovementObservations: "",
      freeMovementRemarks: "",
      hinderedJerkyMovementObservations: "",
      hinderedJerkyMovementRemarks: "",
      otherObservations: "",
      otherObservationsRemarks: "",
      overAllRemarks: "",
      authoritySignature: null,
    });
    setHidDraftId("");
  };

  const shipOptions = [
    "SHIVALIK", "JAMUNA", "BANGARAM", "TARANGINI", "SARYU", "KUMBHIR", "T-83", "AIRAVAT",
    "KHANJAR", "SHUDERSHINI", "TRISHUL", "TEG", "RANVIJAY", "KIRPAN", "DELHI", "SURVEKSHAK",
    "JYOTI", "SUJATA", "KABRA", "CANKARSO", "T-84", "VIBHUTI", "NISHANK", "MAGAR", "BEAS",
    "SUVERNA", "SAHYADRI", "PRALAYA", "CHERIYAM", "SATPURA", "JALASHWA", "TARKASH", "KARMUK",
    "SUTLEJ", "SUMEDHA", "PRABAL", "CORA DIVH", "BATTIMALV", "CHENNAI", "SUMITRA", "T-82",
    "KUTHAR", "KONDUL", "SUBHDRA", "DARSHAK", "BITRA", "CHETLAT", "NIREEKSHAK", "KARUVA",
    "DEEPAK", "SHAKTI", "KOLKATA", "INVETIGATOR", "SHARDA", "MUMBAI", "GOMTI", "BETWA",
    "NASHAK", "KOSWARI", "CHEETAH", "TALWAR", "KESARI", "ADITYA", "BARATANG", "KORA",
    "KULISH", "RANA", "KALPENI", "VIPUL", "TABAR", "TRINKAND", "KOCHI", "SUKANYA", "SAVITRI",
    "GULDAR", "BRAHMAPUTRA", "GHARIAL", "RANVIR", "NIRUPAK", "VINASH", "KIRCH", "SANDHAYAK",
    "VIDYUT", "TIR", "GAJ", "CAR NICOBAR", "SUNAYNA", "MYSORE"
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">AVIATION / AIRCRAFT ARMAMENT LIFTS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                <Label className="text-lg font-semibold">Ship</Label>
              </div>
              <Select value={formData.ship} onValueChange={(value) => handleInputChange("ship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  {shipOptions.map((ship) => (
                    <SelectItem key={ship} value={ship}>
                      {ship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section 2: Date of Inspection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                <Label className="text-lg font-semibold">Date of Inspection/Trials</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                type="date"
                value={formData.dateOfInspection}
                onChange={(e) => handleInputChange("dateOfInspection", e.target.value)}
                required
              />
            </div>

            {/* Section 3: Make & Model */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-lg font-semibold">Make & Model</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                value={formData.makeModel}
                onChange={(e) => handleInputChange("makeModel", e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Section 4: Type */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                <Label className="text-lg font-semibold">Type</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Section 5: Year of Manufacture */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                <Label className="text-lg font-semibold">Year of Manufacture</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                type="number"
                value={formData.yearOfManufacture}
                onChange={(e) => handleInputChange("yearOfManufacture", e.target.value)}
                maxLength={4}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            {/* Section 6: Ref Documents */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-lg font-semibold">Ref Documents</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                value={formData.refDocuments}
                onChange={(e) => handleInputChange("refDocuments", e.target.value)}
                maxLength={50}
                required
              />
            </div>

            {/* Section 7: Maintenance Routines */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-lg font-semibold">Maintenance routines i.a.w Maintop & OEM Manual</Label>
                <span className="text-red-500">*</span>
              </div>
              <Input
                value={formData.maintenanceRoutines}
                onChange={(e) => handleInputChange("maintenanceRoutines", e.target.value)}
                maxLength={50}
                required
              />
            </div>

            {/* Section 8: Structure */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-lg font-semibold">Structure</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Date of Last Structural Survey of Cabin and Lift Shaft Structure</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Date:</Label>
                      <Input
                        type="date"
                        value={formData.dateOfLastStructuralSurvey}
                        onChange={(e) => handleInputChange("dateOfLastStructuralSurvey", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.structureRemarks}
                        onChange={(e) => handleInputChange("structureRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) List of Pending Observations for Liquidation (if any)</Label>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
                      <Input
                        type="number"
                        value={formData.totalRows}
                        onChange={(e) => handleInputChange("totalRows", parseInt(e.target.value) || 1)}
                        min="1"
                        max="10"
                        className="w-20"
                      />
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sr No.</TableHead>
                          <TableHead>Equipment</TableHead>
                          <TableHead>Observation</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: formData.totalRows }, (_, i) => (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>
                              <Input
                                value={i === 0 ? formData.equipment1 : ""}
                                onChange={(e) => handleInputChange(`equipment${i + 1}`, e.target.value)}
                                maxLength={20}
                                required
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={i === 0 ? formData.observation1 : ""}
                                onChange={(e) => handleInputChange(`observation${i + 1}`, e.target.value)}
                                maxLength={50}
                                required
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={i === 0 ? formData.remarks1 : ""}
                                onChange={(e) => handleInputChange(`remarks${i + 1}`, e.target.value)}
                                maxLength={50}
                                required
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: Greasing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-lg font-semibold">Greasing (thin layer of grease on all unpainted mental surfaces)</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Condition of Greasing Points</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.greasingPointsObservations} onValueChange={(value) => handleInputChange("greasingPointsObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.greasingPointsRemarks}
                        onChange={(e) => handleInputChange("greasingPointsRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Grease Layer on Friction Parts</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.greaseLayerObservations} onValueChange={(value) => handleInputChange("greaseLayerObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.greaseLayerRemarks}
                        onChange={(e) => handleInputChange("greaseLayerRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) Bearings</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.bearingsObservations} onValueChange={(value) => handleInputChange("bearingsObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.bearingsRemarks}
                        onChange={(e) => handleInputChange("bearingsRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">d) Lift Guides</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.liftGuidesObservations} onValueChange={(value) => handleInputChange("liftGuidesObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.liftGuidesRemarks}
                        onChange={(e) => handleInputChange("liftGuidesRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">e) Chain & Holders</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.chainHoldersObservations} onValueChange={(value) => handleInputChange("chainHoldersObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.chainHoldersRemarks}
                        onChange={(e) => handleInputChange("chainHoldersRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">f) Rollers</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.rollersObservations} onValueChange={(value) => handleInputChange("rollersObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.rollersRemarks}
                        onChange={(e) => handleInputChange("rollersRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">g) Rockers</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.rockersObservations} onValueChange={(value) => handleInputChange("rockersObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.rockersRemarks}
                        onChange={(e) => handleInputChange("rockersRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">h) Between Lift Covers & Lug Joint</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.liftCoversLugJointObservations} onValueChange={(value) => handleInputChange("liftCoversLugJointObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.liftCoversLugJointRemarks}
                        onChange={(e) => handleInputChange("liftCoversLugJointRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">i) SS to Confirm (greasing between gearing of reduction gear, sprokets and other inaccessible and OEM manual)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.ssToConfirmGreasingObservations} onValueChange={(value) => handleInputChange("ssToConfirmGreasingObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.ssToConfirmGreasingRemarks}
                        onChange={(e) => handleInputChange("ssToConfirmGreasingRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10: Oil */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-lg font-semibold">Oil</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Hydraulic Drive Oil - AYN Oil / OEM Approved</Label>
                  <div className="mt-2">
                    <Label className="text-sm">Remarks:</Label>
                    <Textarea
                      value={formData.hydraulicDriveRemarks}
                      onChange={(e) => handleInputChange("hydraulicDriveRemarks", e.target.value)}
                      rows={2}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Date of Oil Change (working fluid to be replaced every 5 year i.a.w manual)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Date:</Label>
                      <Input
                        type="date"
                        value={formData.dateOfOilChange}
                        onChange={(e) => handleInputChange("dateOfOilChange", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.oilChangeRemarks}
                        onChange={(e) => handleInputChange("oilChangeRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) Date of Last Oil Analysis (Annual i.a.w OEM manual - if not replaced)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Date:</Label>
                      <Input
                        type="date"
                        value={formData.dateOfLastOilAnalysis}
                        onChange={(e) => handleInputChange("dateOfLastOilAnalysis", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.oilAnalysisRemarks}
                        onChange={(e) => handleInputChange("oilAnalysisRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">d) Oil Level in Tanks Pump Units and Reduction Gear Box</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.oilLevelInTanksObservations} onValueChange={(value) => handleInputChange("oilLevelInTanksObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.oilLevelInTanksRemarks}
                        onChange={(e) => handleInputChange("oilLevelInTanksRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">e) Leakages (Detachable connection, fixed pipes, flexible lines)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.leakagesDetachableConnectionObservations} onValueChange={(value) => handleInputChange("leakagesDetachableConnectionObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.leakagesDetachableConnectionRemarks}
                        onChange={(e) => handleInputChange("leakagesDetachableConnectionRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">f) SS to Confirm (Oil in movable joints, antifriction bearing & chains)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.ssToConfirmOilInMovableJointsObservations} onValueChange={(value) => handleInputChange("ssToConfirmOilInMovableJointsObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.ssToConfirmOilInMovableJointsRemarks}
                        onChange={(e) => handleInputChange("ssToConfirmOilInMovableJointsRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11: Visual Condition */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-lg font-semibold">Visual Condition</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Deck Foundation Structure</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.deckFoundationStructureObservations} onValueChange={(value) => handleInputChange("deckFoundationStructureObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.deckFoundationStructureRemarks}
                        onChange={(e) => handleInputChange("deckFoundationStructureRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 12: Wire Ropes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-lg font-semibold">Wire Ropes</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Visual Condition - ropes & end fitting</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.wireRopesObservations} onValueChange={(value) => handleInputChange("wireRopesObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.wireRopesObservationsRemarks}
                        onChange={(e) => handleInputChange("wireRopesObservationsRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Date of Last Changed / Replaced (to be replaced every 5 years)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Date:</Label>
                      <Input
                        type="date"
                        value={formData.dateOfLastChangeReplaced}
                        onChange={(e) => handleInputChange("dateOfLastChangeReplaced", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.dateOfLastChangeReplacedRemarks}
                        onChange={(e) => handleInputChange("dateOfLastChangeReplacedRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) Date of Last Serviceability Check</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Date:</Label>
                      <Input
                        type="date"
                        value={formData.dateOfLastServiceability}
                        onChange={(e) => handleInputChange("dateOfLastServiceability", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.lastServiceabilityRemarks}
                        onChange={(e) => handleInputChange("lastServiceabilityRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 13: Electric Checks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-lg font-semibold">Electric Checks (in addition to standard check by ETMA)</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Insulation Measurement by ETMA/SS)</Label>
                  <div className="ml-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">i) Terminate of Control Board , Control Panel and Junction Box (&gt;0.5 M-Ohm)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.electricChecksObservations} onValueChange={(value) => handleInputChange("electricChecksObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.electricChecksRemarks}
                            onChange={(e) => handleInputChange("electricChecksRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">ii) Magnetic Starters (&gt; 1.0 M-Ohm)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.magneticStartersObservations} onValueChange={(value) => handleInputChange("magneticStartersObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.magneticStartersRemarks}
                            onChange={(e) => handleInputChange("magneticStartersRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">iii) Electric Drive Circuit (&gt; 1.0 M-Ohm)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.electricDriveCircuitObservations} onValueChange={(value) => handleInputChange("electricDriveCircuitObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.electricDriveCircuitRemarks}
                            onChange={(e) => handleInputChange("electricDriveCircuitRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 14: Electric Checks by ETMA */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-lg font-semibold">Electric Checks by ETMA</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Completed</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.electricChecksByEtmaObservations} onValueChange={(value) => handleInputChange("electricChecksByEtmaObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.electricChecksByEtmaRemarks}
                        onChange={(e) => handleInputChange("electricChecksByEtmaRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Availability of Report</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.availabilityOfReportObservations} onValueChange={(value) => handleInputChange("availabilityOfReportObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.availabilityOfReportRemarks}
                        onChange={(e) => handleInputChange("availabilityOfReportRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 15: Limit Switches */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-lg font-semibold">Limit Switches</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Availability of All Limit Switches</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.availabilityOfAllLimitSwitchesObservations} onValueChange={(value) => handleInputChange("availabilityOfAllLimitSwitchesObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.availabilityOfAllLimitSwitchesRemarks}
                        onChange={(e) => handleInputChange("availabilityOfAllLimitSwitchesRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Red Lines on Flag to be in Vertical Position When Lift Secured for Sea</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.redLinesOnFlagObservations} onValueChange={(value) => handleInputChange("redLinesOnFlagObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.redLinesOnFlagRemarks}
                        onChange={(e) => handleInputChange("redLinesOnFlagRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 16: Load Testing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">16</span>
                <Label className="text-lg font-semibold">Load Testing</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Date of Last Load Testing</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Date:</Label>
                      <Input
                        type="date"
                        value={formData.dateLastLoadTesting}
                        onChange={(e) => handleInputChange("dateLastLoadTesting", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.lastLoadTestingRemarks}
                        onChange={(e) => handleInputChange("lastLoadTestingRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Check Certificates - Static and Dynamic Load Testing</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.staticDynamicLoadtestingObservations} onValueChange={(value) => handleInputChange("staticDynamicLoadtestingObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.staticDynamicLoadtestingRemarks}
                        onChange={(e) => handleInputChange("staticDynamicLoadtestingRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) 'Emergency STOP' Check Undertaken During Dynamic Load Test and Outcome</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.emergencyStopObservations} onValueChange={(value) => handleInputChange("emergencyStopObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.emergencyStopRemarks}
                        onChange={(e) => handleInputChange("emergencyStopRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">d) SS Confirm to no Oil Leakages During Load Testing</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Observations:</Label>
                      <Select value={formData.ssConfirmToNoOilLeakagesDuringLoadTestingObservations} onValueChange={(value) => handleInputChange("ssConfirmToNoOilLeakagesDuringLoadTestingObservations", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Remarks:</Label>
                      <Textarea
                        value={formData.ssConfirmToNoOilLeakagesDuringLoadTestingRemarks}
                        onChange={(e) => handleInputChange("ssConfirmToNoOilLeakagesDuringLoadTestingRemarks", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 17: Operational / Functional Check */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">17</span>
                <Label className="text-lg font-semibold">Operational / Functional Check</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Hoisting Speeds</Label>
                  <div className="ml-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">i) Slow - 03 m/min (Initial and Final Stages)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.operationalFunctionalCheckObservations} onValueChange={(value) => handleInputChange("operationalFunctionalCheckObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.operationalFunctionalCheckRemarks}
                            onChange={(e) => handleInputChange("operationalFunctionalCheckRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">ii) High - 10 m/min (Check - Automatic Switching Form Slow to High Speed at Lower and Top Level After 2-3 Seconds of Operation)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.automaticSwitchingFormObservations} onValueChange={(value) => handleInputChange("automaticSwitchingFormObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.automaticSwitchingFormRemarks}
                            onChange={(e) => handleInputChange("automaticSwitchingFormRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Lowering Speeds</Label>
                  <div className="ml-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">i) Slow - 3.6 m/min</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.loweringSpeedsObservations} onValueChange={(value) => handleInputChange("loweringSpeedsObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.loweringSpeedsRemarks}
                            onChange={(e) => handleInputChange("loweringSpeedsRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">ii) High - 11 m/min</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label className="text-sm">Observations:</Label>
                          <Select value={formData.high11MMinObservations} onValueChange={(value) => handleInputChange("high11MMinObservations", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="--Select--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAT">SAT</SelectItem>
                              <SelectItem value="UNSAT">UNSAT</SelectItem>
                              <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Remarks:</Label>
                          <Textarea
                            value={formData.high11MMinObservationsRemarks}
                            onChange={(e) => handleInputChange("high11MMinObservationsRemarks", e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 18: Other Observation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">18</span>
                <Label className="text-lg font-semibold">Other Observation</Label>
              </div>
              
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Observations:</Label>
                    <Select value={formData.otherObservations} onValueChange={(value) => handleInputChange("otherObservations", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT*">SAT*</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Remarks:</Label>
                    <Textarea
                      value={formData.otherObservationsRemarks}
                      onChange={(e) => handleInputChange("otherObservationsRemarks", e.target.value)}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 19: Overall Remarks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">19</span>
                <Label className="text-lg font-semibold">Overall Remarks</Label>
              </div>
              
              <div className="ml-6">
                <Label className="text-sm">Remarks:</Label>
                <Textarea
                  value={formData.overAllRemarks}
                  onChange={(e) => handleInputChange("overAllRemarks", e.target.value)}
                  rows={2}
                  required
                />
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">Note:</span>
                <p className="text-sm text-gray-700">
                  If lifts are going to be operated after long period of inactivity (after completion of trials), 
                  maintenance to be undertaken i.a.w Section 8 of OEM manual and in-house trials to be undertaken 
                  prior commencing operations.
                </p>
              </div>
            </div>

            {/* Section 20: Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">20</span>
                <Label className="text-lg font-semibold">Authority Signature</Label>
                <span className="text-red-500">*</span>
              </div>
              <div className="ml-6">
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("authoritySignature", e.target.files[0])}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button 
                type="button" 
                onClick={handleFetchDrafts} 
                className="px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold uppercase"
              >
                <FileText className="h-4 w-4 mr-2" />
                FETCH DRAFTS
              </Button>
              <Button 
                type="button" 
                onClick={handleSaveDraft} 
                className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
              >
                <Save className="h-4 w-4 mr-2" />
                SAVE DRAFT
              </Button>
              <Button 
                type="button" 
                onClick={handleClear} 
                className="px-6 bg-red-500 hover:bg-red-600 text-white font-semibold uppercase"
              >
                CLEAR
              </Button>
              <Button 
                type="submit" 
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase"
              >
                SAVE
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No drafts found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Make & Model</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.makeModel || "No Inspection Data"}</TableCell>
                      <TableCell>
                        {draft.timestamp ? new Date(draft.timestamp).toLocaleString() : "No Date"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditDraft(draft)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteDraft(draft.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AviationAircraftArmamentLiftsForm;
