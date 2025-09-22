import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface PendingObservation {
  id: string;
  srNo: string;
  equipment: string;
  observation: string;
  remarks: string;
}

interface SacLiftNo1Data {
  // Basic Information
  ship: string;
  dateOfInspection: Date | null;
  makeModel: string;
  type: string;
  yearOfManufacture: string;
  refDocuments: string;
  maintenanceRoutines: string;
  
  // Structure Section
  platformDate: Date | null;
  platformRemarks: string;
  listShallStructureDate: Date | null;
  listShallStructureRemarks: string;
  equipmentFoundationsDate: Date | null;
  equipmentFoundationsRemarks: string;
  supportingDecksDate: Date | null;
  supportingDecksRemarks: string;
  hydraulicOilTanksDate: Date | null;
  hydraulicOilTanksRemarks: string;
  pendingObservations: PendingObservation[];
  lastDateCompletionIV: Date | null;
  lastDateCompletionIVRemarks: string;
  
  // Visual Condition Section
  deckSupportObservations: string;
  deckSupportRemarks: string;
  rustingCorrosionObservations: string;
  rustingCorrosionRemarks: string;
  dustMoistureObservations: string;
  dustMoistureRemarks: string;
  attachmentCableObservations: string;
  attachmentCableRemarks: string;
  checkStructureObservations: string;
  checkStructureRemarks: string;
  liftGuidesObservations: string;
  liftGuidesRemarks: string;
  guardRailingObservations: string;
  guardRailingRemarks: string;
  autoTensioningObservations: string;
  autoTensioningRemarks: string;
  rubberDampersObservations: string;
  rubberDampersRemarks: string;
  bronzePadsObservations: string;
  bronzePadsRemarks: string;
  rubberCoamingObservations: string;
  rubberCoamingRemarks: string;
  waterDrainObservations: string;
  waterDrainRemarks: string;
  securingFasteningObservations: string;
  securingFasteningRemarks: string;
  lockingDevicesObservations: string;
  lockingDevicesRemarks: string;
  
  // Greasing Section
  typeOfGreaseObservations: string;
  typeOfGreaseRemarks: string;
  conditionGreasingPointsObservations: string;
  conditionGreasingPointsRemarks: string;
  greaseLayerObservations: string;
  greaseLayerRemarks: string;
  bearingsObservations: string;
  bearingsRemarks: string;
  liftGuidesGreasingObservations: string;
  liftGuidesGreasingRemarks: string;
  blocksCablesObservations: string;
  blocksCablesRemarks: string;
  lockingDevicesGreasingObservations: string;
  lockingDevicesGreasingRemarks: string;
  sprocketsObservations: string;
  sprocketsRemarks: string;
  rollersObservations: string;
  rollersRemarks: string;
  rockersObservations: string;
  rockersRemarks: string;
  liftCoversObservations: string;
  liftCoversRemarks: string;
  ssConfirmGreasingObservations: string;
  ssConfirmGreasingRemarks: string;
  
  // Wire Ropes Section
  visualConditionRopesObservations: string;
  visualConditionRopesRemarks: string;
  dateLastChanged: Date | null;
  dateLastChangedRemarks: string;
  dateLastServiceability: Date | null;
  dateLastServiceabilityRemarks: string;
  rustingCorrosionRopesObservations: string;
  rustingCorrosionRopesRemarks: string;
  greasingRopesObservations: string;
  greasingRopesRemarks: string;
  
  // Oil Section
  hydraulicDriveOilRemarks: string;
  gearOilObservations: string;
  gearOilRemarks: string;
  ssConfirmOilObservations: string;
  ssConfirmOilRemarks: string;
  dateOilChange: Date | null;
  dateOilChangeRemarks: string;
  dateOilAnalysis: Date | null;
  dateOilAnalysisRemarks: string;
  dateCleaningFilters: Date | null;
  dateCleaningFiltersRemarks: string;
  dateReplacementFilters: Date | null;
  dateReplacementFiltersRemarks: string;
  oilLevelObservations: string;
  oilLevelRemarks: string;
  leakagesObservations: string;
  leakagesRemarks: string;
  calibrationCertificatesObservations: string;
  calibrationCertificatesRemarks: string;
  
  // Visual Condition Section 2
  deckFoundationStructureObservations: string;
  deckFoundationStructureRemarks: string;
  rustingCorrosionStructureObservations: string;
  rustingCorrosionStructureRemarks: string;
  attachmentChainObservations: string;
  attachmentChainRemarks: string;
  checkStructureMechanismObservations: string;
  checkStructureMechanismRemarks: string;
  shocksAbsorbersDamageObservations: string;
  shocksAbsorbersDamageRemarks: string;
  fastenersShockAbsorbersObservations: string;
  fastenersShockAbsorbersRemarks: string;
  rubberMetalJointsObservations: string;
  rubberMetalJointsRemarks: string;
  externalSurfaceRubberObservations: string;
  externalSurfaceRubberRemarks: string;
  deformationMetalObservations: string;
  deformationMetalRemarks: string;
  recordInspectionObservations: string;
  recordInspectionRemarks: string;
  conditionCoamingObservations: string;
  conditionCoamingRemarks: string;
  waterDischargeObservations: string;
  waterDischargeRemarks: string;
  
  // Electric Checks Section
  recordsInsulationObservations: string;
  recordsInsulationRemarks: string;
  controlsBoardsObservations: string;
  controlsBoardsRemarks: string;
  controlsPanelObservations: string;
  controlsPanelRemarks: string;
  inputTerminalsObservations: string;
  inputTerminalsRemarks: string;
  outputTerminalsObservations: string;
  outputTerminalsRemarks: string;
  tightnessCableObservations: string;
  tightnessCableRemarks: string;
  conditionJBControlObservations: string;
  conditionJBControlRemarks: string;
  
  // Electric Checks by ETMA Section
  completedObservations: string;
  completedRemarks: string;
  availabilityReportObservations: string;
  availabilityReportRemarks: string;
  spmCheckObservations: string;
  spmCheckRemarks: string;
  groundingBondingObservations: string;
  groundingBondingRemarks: string;
  
  // Limit Switches Section
  visualConditionLimitObservations: string;
  visualConditionLimitRemarks: string;
  availabilityLimitSwitchesObservations: string;
  availabilityLimitSwitchesRemarks: string;
  redLinesFlagObservations: string;
  redLinesFlagRemarks: string;
  
  // Load Testing Section
  dateLastLoadTesting: Date | null;
  dateLastLoadTestingRemarks: string;
  staticLoadLiftObservations: string;
  staticLoadLiftRemarks: string;
  staticLoadLockingObservations: string;
  staticLoadLockingRemarks: string;
  dynamicLoadObservations: string;
  dynamicLoadRemarks: string;
  safeWorkingLoadObservations: string;
  safeWorkingLoadRemarks: string;
  noOperationsObservations: string;
  noOperationsRemarks: string;
  emergencyStopObservations: string;
  emergencyStopRemarks: string;
  ssConfirmOilLeakagesObservations: string;
  ssConfirmOilLeakagesRemarks: string;
  
  // Operational/Functional Check Section
  hoistingSpeedsSlowObservations: string;
  hoistingSpeedsSlowRemarks: string;
  hoistingSpeedsHighObservations: string;
  hoistingSpeedsHighRemarks: string;
  loweringSpeedsSlowObservations: string;
  loweringSpeedsSlowRemarks: string;
  loweringSpeedsHighObservations: string;
  loweringSpeedsHighRemarks: string;
  workingPressureObservations: string;
  workingPressureRemarks: string;
  operationLimitSwitchesObservations: string;
  operationLimitSwitchesRemarks: string;
  operationAllLocksObservations: string;
  operationAllLocksRemarks: string;
  accurateStoppingObservations: string;
  accurateStoppingRemarks: string;
  activateStopObservations: string;
  activateStopRemarks: string;
  operationEmergencyModeObservations: string;
  operationEmergencyModeRemarks: string;
  guardRailingOperationObservations: string;
  guardRailingOperationRemarks: string;
  electroMagneticBrakeObservations: string;
  electroMagneticBrakeRemarks: string;
  emergencyBrakesObservations: string;
  emergencyBrakesRemarks: string;
  excessiveVibrationObservations: string;
  excessiveVibrationRemarks: string;
  automaticOperationObservations: string;
  automaticOperationRemarks: string;
  operationIndicatorLampsObservations: string;
  operationIndicatorLampsRemarks: string;
  rollerMechanismObservations: string;
  rollerMechanismRemarks: string;
  safetyCheckObservations: string;
  safetyCheckRemarks: string;
  switchOffPowerObservations: string;
  switchOffPowerRemarks: string;
  driveGearBoxObservations: string;
  driveGearBoxRemarks: string;
  freeMovementObservations: string;
  freeMovementRemarks: string;
  hinderedMovementObservations: string;
  hinderedMovementRemarks: string;
  manualOperationObservations: string;
  manualOperationRemarks: string;
  checkOilLeakagesObservations: string;
  checkOilLeakagesRemarks: string;
  
  // Any Other Observation
  anyOtherObservationRemarks: string;
  
  // Overall Remarks
  overallRemarks: string;
  
  // Authority Signature
  authoritySignature: File | null;
}

const SacLiftNo1Form: React.FC = () => {
  const [formData, setFormData] = useState<SacLiftNo1Data>({
    // Basic Information
    ship: '',
    dateOfInspection: null,
    makeModel: '',
    type: '',
    yearOfManufacture: '',
    refDocuments: '',
    maintenanceRoutines: '',
    
    // Structure Section
    platformDate: null,
    platformRemarks: '',
    listShallStructureDate: null,
    listShallStructureRemarks: '',
    equipmentFoundationsDate: null,
    equipmentFoundationsRemarks: '',
    supportingDecksDate: null,
    supportingDecksRemarks: '',
    hydraulicOilTanksDate: null,
    hydraulicOilTanksRemarks: '',
    pendingObservations: [],
    lastDateCompletionIV: null,
    lastDateCompletionIVRemarks: '',
    
    // Visual Condition Section
    deckSupportObservations: '',
    deckSupportRemarks: '',
    rustingCorrosionObservations: '',
    rustingCorrosionRemarks: '',
    dustMoistureObservations: '',
    dustMoistureRemarks: '',
    attachmentCableObservations: '',
    attachmentCableRemarks: '',
    checkStructureObservations: '',
    checkStructureRemarks: '',
    liftGuidesObservations: '',
    liftGuidesRemarks: '',
    guardRailingObservations: '',
    guardRailingRemarks: '',
    autoTensioningObservations: '',
    autoTensioningRemarks: '',
    rubberDampersObservations: '',
    rubberDampersRemarks: '',
    bronzePadsObservations: '',
    bronzePadsRemarks: '',
    rubberCoamingObservations: '',
    rubberCoamingRemarks: '',
    waterDrainObservations: '',
    waterDrainRemarks: '',
    securingFasteningObservations: '',
    securingFasteningRemarks: '',
    lockingDevicesObservations: '',
    lockingDevicesRemarks: '',
    
    // Greasing Section
    typeOfGreaseObservations: '',
    typeOfGreaseRemarks: '',
    conditionGreasingPointsObservations: '',
    conditionGreasingPointsRemarks: '',
    greaseLayerObservations: '',
    greaseLayerRemarks: '',
    bearingsObservations: '',
    bearingsRemarks: '',
    liftGuidesGreasingObservations: '',
    liftGuidesGreasingRemarks: '',
    blocksCablesObservations: '',
    blocksCablesRemarks: '',
    lockingDevicesGreasingObservations: '',
    lockingDevicesGreasingRemarks: '',
    sprocketsObservations: '',
    sprocketsRemarks: '',
    rollersObservations: '',
    rollersRemarks: '',
    rockersObservations: '',
    rockersRemarks: '',
    liftCoversObservations: '',
    liftCoversRemarks: '',
    ssConfirmGreasingObservations: '',
    ssConfirmGreasingRemarks: '',
    
    // Wire Ropes Section
    visualConditionRopesObservations: '',
    visualConditionRopesRemarks: '',
    dateLastChanged: null,
    dateLastChangedRemarks: '',
    dateLastServiceability: null,
    dateLastServiceabilityRemarks: '',
    rustingCorrosionRopesObservations: '',
    rustingCorrosionRopesRemarks: '',
    greasingRopesObservations: '',
    greasingRopesRemarks: '',
    
    // Oil Section
    hydraulicDriveOilRemarks: '',
    gearOilObservations: '',
    gearOilRemarks: '',
    ssConfirmOilObservations: '',
    ssConfirmOilRemarks: '',
    dateOilChange: null,
    dateOilChangeRemarks: '',
    dateOilAnalysis: null,
    dateOilAnalysisRemarks: '',
    dateCleaningFilters: null,
    dateCleaningFiltersRemarks: '',
    dateReplacementFilters: null,
    dateReplacementFiltersRemarks: '',
    oilLevelObservations: '',
    oilLevelRemarks: '',
    leakagesObservations: '',
    leakagesRemarks: '',
    calibrationCertificatesObservations: '',
    calibrationCertificatesRemarks: '',
    
    // Visual Condition Section 2
    deckFoundationStructureObservations: '',
    deckFoundationStructureRemarks: '',
    rustingCorrosionStructureObservations: '',
    rustingCorrosionStructureRemarks: '',
    attachmentChainObservations: '',
    attachmentChainRemarks: '',
    checkStructureMechanismObservations: '',
    checkStructureMechanismRemarks: '',
    shocksAbsorbersDamageObservations: '',
    shocksAbsorbersDamageRemarks: '',
    fastenersShockAbsorbersObservations: '',
    fastenersShockAbsorbersRemarks: '',
    rubberMetalJointsObservations: '',
    rubberMetalJointsRemarks: '',
    externalSurfaceRubberObservations: '',
    externalSurfaceRubberRemarks: '',
    deformationMetalObservations: '',
    deformationMetalRemarks: '',
    recordInspectionObservations: '',
    recordInspectionRemarks: '',
    conditionCoamingObservations: '',
    conditionCoamingRemarks: '',
    waterDischargeObservations: '',
    waterDischargeRemarks: '',
    
    // Electric Checks Section
    recordsInsulationObservations: '',
    recordsInsulationRemarks: '',
    controlsBoardsObservations: '',
    controlsBoardsRemarks: '',
    controlsPanelObservations: '',
    controlsPanelRemarks: '',
    inputTerminalsObservations: '',
    inputTerminalsRemarks: '',
    outputTerminalsObservations: '',
    outputTerminalsRemarks: '',
    tightnessCableObservations: '',
    tightnessCableRemarks: '',
    conditionJBControlObservations: '',
    conditionJBControlRemarks: '',
    
    // Electric Checks by ETMA Section
    completedObservations: '',
    completedRemarks: '',
    availabilityReportObservations: '',
    availabilityReportRemarks: '',
    spmCheckObservations: '',
    spmCheckRemarks: '',
    groundingBondingObservations: '',
    groundingBondingRemarks: '',
    
    // Limit Switches Section
    visualConditionLimitObservations: '',
    visualConditionLimitRemarks: '',
    availabilityLimitSwitchesObservations: '',
    availabilityLimitSwitchesRemarks: '',
    redLinesFlagObservations: '',
    redLinesFlagRemarks: '',
    
    // Load Testing Section
    dateLastLoadTesting: null,
    dateLastLoadTestingRemarks: '',
    staticLoadLiftObservations: '',
    staticLoadLiftRemarks: '',
    staticLoadLockingObservations: '',
    staticLoadLockingRemarks: '',
    dynamicLoadObservations: '',
    dynamicLoadRemarks: '',
    safeWorkingLoadObservations: '',
    safeWorkingLoadRemarks: '',
    noOperationsObservations: '',
    noOperationsRemarks: '',
    emergencyStopObservations: '',
    emergencyStopRemarks: '',
    ssConfirmOilLeakagesObservations: '',
    ssConfirmOilLeakagesRemarks: '',
    
    // Operational/Functional Check Section
    hoistingSpeedsSlowObservations: '',
    hoistingSpeedsSlowRemarks: '',
    hoistingSpeedsHighObservations: '',
    hoistingSpeedsHighRemarks: '',
    loweringSpeedsSlowObservations: '',
    loweringSpeedsSlowRemarks: '',
    loweringSpeedsHighObservations: '',
    loweringSpeedsHighRemarks: '',
    workingPressureObservations: '',
    workingPressureRemarks: '',
    operationLimitSwitchesObservations: '',
    operationLimitSwitchesRemarks: '',
    operationAllLocksObservations: '',
    operationAllLocksRemarks: '',
    accurateStoppingObservations: '',
    accurateStoppingRemarks: '',
    activateStopObservations: '',
    activateStopRemarks: '',
    operationEmergencyModeObservations: '',
    operationEmergencyModeRemarks: '',
    guardRailingOperationObservations: '',
    guardRailingOperationRemarks: '',
    electroMagneticBrakeObservations: '',
    electroMagneticBrakeRemarks: '',
    emergencyBrakesObservations: '',
    emergencyBrakesRemarks: '',
    excessiveVibrationObservations: '',
    excessiveVibrationRemarks: '',
    automaticOperationObservations: '',
    automaticOperationRemarks: '',
    operationIndicatorLampsObservations: '',
    operationIndicatorLampsRemarks: '',
    rollerMechanismObservations: '',
    rollerMechanismRemarks: '',
    safetyCheckObservations: '',
    safetyCheckRemarks: '',
    switchOffPowerObservations: '',
    switchOffPowerRemarks: '',
    driveGearBoxObservations: '',
    driveGearBoxRemarks: '',
    freeMovementObservations: '',
    freeMovementRemarks: '',
    hinderedMovementObservations: '',
    hinderedMovementRemarks: '',
    manualOperationObservations: '',
    manualOperationRemarks: '',
    checkOilLeakagesObservations: '',
    checkOilLeakagesRemarks: '',
    
    // Any Other Observation
    anyOtherObservationRemarks: '',
    
    // Overall Remarks
    overallRemarks: '',
    
    // Authority Signature
    authoritySignature: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const ships = [
    'SHIVALIK', 'JAMUNA', 'BANGARAM', 'TARANGINI', 'SARYU', 'KUMBHIR', 'T-83', 'AIRAVAT',
    'KHANJAR', 'SHUDERSHINI', 'TRISHUL', 'TEG', 'RANVIJAY', 'KIRPAN', 'DELHI', 'SURVEKSHAK',
    'JYOTI', 'SUJATA', 'KABRA', 'CANKARSO', 'T-84', 'VIBHUTI', 'NISHANK', 'MAGAR', 'BEAS',
    'SUVERNA', 'SAHYADRI', 'PRALAYA', 'CHERIYAM', 'SATPURA', 'JALASHWA', 'TARKASH', 'KARMUK',
    'SUTLEJ', 'SUMEDHA', 'PRABAL', 'CORA DIVH', 'BATTIMALV', 'CHENNAI', 'SUMITRA', 'T-82',
    'KUTHAR', 'KONDUL', 'SUBHDRA', 'DARSHAK', 'BITRA', 'CHETLAT', 'NIREEKSHAK', 'KARUVA',
    'DEEPAK', 'SHAKTI', 'KOLKATA', 'INVETIGATOR', 'SHARDA', 'MUMBAI', 'GOMTI', 'BETWA',
    'NASHAK', 'KOSWARI', 'CHEETAH', 'TALWAR', 'KESARI', 'ADITYA', 'BARATANG', 'KORA',
    'KULISH', 'RANA', 'KALPENI', 'VIPUL', 'TABAR', 'TRINKAND', 'KOCHI', 'SUKANYA',
    'SAVITRI', 'GULDAR', 'BRAHMAPUTRA', 'GHARIAL', 'RANVIR', 'NIRUPAK', 'VINASH', 'KIRCH',
    'SANDHAYAK', 'VIDYUT', 'TIR', 'GAJ', 'CAR NICOBAR', 'SUNAYNA', 'MYSORE'
  ];

  const observations = ['SAT', 'UNSAT', 'SAT WITH OBSERVATION'];

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    const savedDrafts = localStorage.getItem('sacLiftNo1_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  };

  const saveDraft = () => {
    const draftData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      title: `Draft - ${formData.ship || 'Untitled'} - ${formData.type || 'No Type'}`
    };
    
    const updatedDrafts = [...drafts, draftData];
    setDrafts(updatedDrafts);
    localStorage.setItem('sacLiftNo1_drafts', JSON.stringify(updatedDrafts));
    setIsDraftModalOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ship) newErrors.ship = 'Ship selection is required';
    if (!formData.dateOfInspection) newErrors.dateOfInspection = 'Date of inspection is required';
    if (!formData.makeModel) newErrors.makeModel = 'Make & Model is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.yearOfManufacture) newErrors.yearOfManufacture = 'Year of Manufacture is required';
    if (!formData.authoritySignature) newErrors.authoritySignature = 'Authority signature is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('SAC LIFT NO.1 form submitted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      // Basic Information
      ship: '',
      dateOfInspection: null,
      makeModel: '',
      type: '',
      yearOfManufacture: '',
      refDocuments: '',
      maintenanceRoutines: '',
      
      // Structure Section
      platformDate: null,
      platformRemarks: '',
      listShallStructureDate: null,
      listShallStructureRemarks: '',
      equipmentFoundationsDate: null,
      equipmentFoundationsRemarks: '',
      supportingDecksDate: null,
      supportingDecksRemarks: '',
      hydraulicOilTanksDate: null,
      hydraulicOilTanksRemarks: '',
      pendingObservations: [],
      lastDateCompletionIV: null,
      lastDateCompletionIVRemarks: '',
      
      // Visual Condition Section
      deckSupportObservations: '',
      deckSupportRemarks: '',
      rustingCorrosionObservations: '',
      rustingCorrosionRemarks: '',
      dustMoistureObservations: '',
      dustMoistureRemarks: '',
      attachmentCableObservations: '',
      attachmentCableRemarks: '',
      checkStructureObservations: '',
      checkStructureRemarks: '',
      liftGuidesObservations: '',
      liftGuidesRemarks: '',
      guardRailingObservations: '',
      guardRailingRemarks: '',
      autoTensioningObservations: '',
      autoTensioningRemarks: '',
      rubberDampersObservations: '',
      rubberDampersRemarks: '',
      bronzePadsObservations: '',
      bronzePadsRemarks: '',
      rubberCoamingObservations: '',
      rubberCoamingRemarks: '',
      waterDrainObservations: '',
      waterDrainRemarks: '',
      securingFasteningObservations: '',
      securingFasteningRemarks: '',
      lockingDevicesObservations: '',
      lockingDevicesRemarks: '',
      
      // Greasing Section
      typeOfGreaseObservations: '',
      typeOfGreaseRemarks: '',
      conditionGreasingPointsObservations: '',
      conditionGreasingPointsRemarks: '',
      greaseLayerObservations: '',
      greaseLayerRemarks: '',
      bearingsObservations: '',
      bearingsRemarks: '',
      liftGuidesGreasingObservations: '',
      liftGuidesGreasingRemarks: '',
      blocksCablesObservations: '',
      blocksCablesRemarks: '',
      lockingDevicesGreasingObservations: '',
      lockingDevicesGreasingRemarks: '',
      sprocketsObservations: '',
      sprocketsRemarks: '',
      rollersObservations: '',
      rollersRemarks: '',
      rockersObservations: '',
      rockersRemarks: '',
      liftCoversObservations: '',
      liftCoversRemarks: '',
      ssConfirmGreasingObservations: '',
      ssConfirmGreasingRemarks: '',
      
      // Wire Ropes Section
      visualConditionRopesObservations: '',
      visualConditionRopesRemarks: '',
      dateLastChanged: null,
      dateLastChangedRemarks: '',
      dateLastServiceability: null,
      dateLastServiceabilityRemarks: '',
      rustingCorrosionRopesObservations: '',
      rustingCorrosionRopesRemarks: '',
      greasingRopesObservations: '',
      greasingRopesRemarks: '',
      
      // Oil Section
      hydraulicDriveOilRemarks: '',
      gearOilObservations: '',
      gearOilRemarks: '',
      ssConfirmOilObservations: '',
      ssConfirmOilRemarks: '',
      dateOilChange: null,
      dateOilChangeRemarks: '',
      dateOilAnalysis: null,
      dateOilAnalysisRemarks: '',
      dateCleaningFilters: null,
      dateCleaningFiltersRemarks: '',
      dateReplacementFilters: null,
      dateReplacementFiltersRemarks: '',
      oilLevelObservations: '',
      oilLevelRemarks: '',
      leakagesObservations: '',
      leakagesRemarks: '',
      calibrationCertificatesObservations: '',
      calibrationCertificatesRemarks: '',
      
      // Visual Condition Section 2
      deckFoundationStructureObservations: '',
      deckFoundationStructureRemarks: '',
      rustingCorrosionStructureObservations: '',
      rustingCorrosionStructureRemarks: '',
      attachmentChainObservations: '',
      attachmentChainRemarks: '',
      checkStructureMechanismObservations: '',
      checkStructureMechanismRemarks: '',
      shocksAbsorbersDamageObservations: '',
      shocksAbsorbersDamageRemarks: '',
      fastenersShockAbsorbersObservations: '',
      fastenersShockAbsorbersRemarks: '',
      rubberMetalJointsObservations: '',
      rubberMetalJointsRemarks: '',
      externalSurfaceRubberObservations: '',
      externalSurfaceRubberRemarks: '',
      deformationMetalObservations: '',
      deformationMetalRemarks: '',
      recordInspectionObservations: '',
      recordInspectionRemarks: '',
      conditionCoamingObservations: '',
      conditionCoamingRemarks: '',
      waterDischargeObservations: '',
      waterDischargeRemarks: '',
      
      // Electric Checks Section
      recordsInsulationObservations: '',
      recordsInsulationRemarks: '',
      controlsBoardsObservations: '',
      controlsBoardsRemarks: '',
      controlsPanelObservations: '',
      controlsPanelRemarks: '',
      inputTerminalsObservations: '',
      inputTerminalsRemarks: '',
      outputTerminalsObservations: '',
      outputTerminalsRemarks: '',
      tightnessCableObservations: '',
      tightnessCableRemarks: '',
      conditionJBControlObservations: '',
      conditionJBControlRemarks: '',
      
      // Electric Checks by ETMA Section
      completedObservations: '',
      completedRemarks: '',
      availabilityReportObservations: '',
      availabilityReportRemarks: '',
      spmCheckObservations: '',
      spmCheckRemarks: '',
      groundingBondingObservations: '',
      groundingBondingRemarks: '',
      
      // Limit Switches Section
      visualConditionLimitObservations: '',
      visualConditionLimitRemarks: '',
      availabilityLimitSwitchesObservations: '',
      availabilityLimitSwitchesRemarks: '',
      redLinesFlagObservations: '',
      redLinesFlagRemarks: '',
      
      // Load Testing Section
      dateLastLoadTesting: null,
      dateLastLoadTestingRemarks: '',
      staticLoadLiftObservations: '',
      staticLoadLiftRemarks: '',
      staticLoadLockingObservations: '',
      staticLoadLockingRemarks: '',
      dynamicLoadObservations: '',
      dynamicLoadRemarks: '',
      safeWorkingLoadObservations: '',
      safeWorkingLoadRemarks: '',
      noOperationsObservations: '',
      noOperationsRemarks: '',
      emergencyStopObservations: '',
      emergencyStopRemarks: '',
      ssConfirmOilLeakagesObservations: '',
      ssConfirmOilLeakagesRemarks: '',
      
      // Operational/Functional Check Section
      hoistingSpeedsSlowObservations: '',
      hoistingSpeedsSlowRemarks: '',
      hoistingSpeedsHighObservations: '',
      hoistingSpeedsHighRemarks: '',
      loweringSpeedsSlowObservations: '',
      loweringSpeedsSlowRemarks: '',
      loweringSpeedsHighObservations: '',
      loweringSpeedsHighRemarks: '',
      workingPressureObservations: '',
      workingPressureRemarks: '',
      operationLimitSwitchesObservations: '',
      operationLimitSwitchesRemarks: '',
      operationAllLocksObservations: '',
      operationAllLocksRemarks: '',
      accurateStoppingObservations: '',
      accurateStoppingRemarks: '',
      activateStopObservations: '',
      activateStopRemarks: '',
      operationEmergencyModeObservations: '',
      operationEmergencyModeRemarks: '',
      guardRailingOperationObservations: '',
      guardRailingOperationRemarks: '',
      electroMagneticBrakeObservations: '',
      electroMagneticBrakeRemarks: '',
      emergencyBrakesObservations: '',
      emergencyBrakesRemarks: '',
      excessiveVibrationObservations: '',
      excessiveVibrationRemarks: '',
      automaticOperationObservations: '',
      automaticOperationRemarks: '',
      operationIndicatorLampsObservations: '',
      operationIndicatorLampsRemarks: '',
      rollerMechanismObservations: '',
      rollerMechanismRemarks: '',
      safetyCheckObservations: '',
      safetyCheckRemarks: '',
      switchOffPowerObservations: '',
      switchOffPowerRemarks: '',
      driveGearBoxObservations: '',
      driveGearBoxRemarks: '',
      freeMovementObservations: '',
      freeMovementRemarks: '',
      hinderedMovementObservations: '',
      hinderedMovementRemarks: '',
      manualOperationObservations: '',
      manualOperationRemarks: '',
      checkOilLeakagesObservations: '',
      checkOilLeakagesRemarks: '',
      
      // Any Other Observation
      anyOtherObservationRemarks: '',
      
      // Overall Remarks
      overallRemarks: '',
      
      // Authority Signature
      authoritySignature: null,
    });
    setErrors({});
  };

  const handleFileUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setFormData(prev => ({ ...prev, authoritySignature: file }));
  };

  const addPendingObservation = () => {
    const newObservation: PendingObservation = {
      id: Date.now().toString(),
      srNo: '',
      equipment: '',
      observation: '',
      remarks: '',
    };
    setFormData(prev => ({
      ...prev,
      pendingObservations: [...prev.pendingObservations, newObservation]
    }));
  };

  const removePendingObservation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      pendingObservations: prev.pendingObservations.filter(obs => obs.id !== id)
    }));
  };

  const updatePendingObservation = (id: string, field: keyof PendingObservation, value: string) => {
    setFormData(prev => ({
      ...prev,
      pendingObservations: prev.pendingObservations.map(obs =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    }));
  };

  const renderObservationSection = (title: string, observationsField: keyof SacLiftNo1Data, remarksField: keyof SacLiftNo1Data) => (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Observations:*</Label>
          <Select
            value={formData[observationsField] as string}
            onValueChange={(value) => setFormData(prev => ({ ...prev, [observationsField]: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              {observations.map(obs => (
                <SelectItem key={obs} value={obs}>{obs}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Remarks:*</Label>
          <Textarea
            value={formData[remarksField] as string}
            onChange={(e) => setFormData(prev => ({ ...prev, [remarksField]: e.target.value }))}
            placeholder="Enter remarks"
            rows={2}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">SAC LIFT NO.1</h1>
        <p className="text-gray-600">Inspection and Trials Form</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Ship */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <Label htmlFor="ship" className="text-sm font-medium text-gray-700">Ship</Label>
                <div className="mt-2">
                  <Select value={formData.ship} onValueChange={(value) => setFormData(prev => ({ ...prev, ship: value }))}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {ships.map(ship => (
                        <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
                </div>
              </div>
            </div>

          {/* Date of Inspection/Trials */}
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <Label htmlFor="dateOfInspection" className="text-lg font-medium">Date of Inspection/Trials<span className="text-red-500">*</span></Label>
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-64 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfInspection ? format(formData.dateOfInspection, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfInspection || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateOfInspection: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfInspection && <p className="text-red-500 text-sm mt-1">{errors.dateOfInspection}</p>}
              </div>
            </div>
          </div>

          {/* Make & Model */}
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <Label htmlFor="makeModel" className="text-lg font-medium">Make & Model<span className="text-red-500">*</span></Label>
              <div className="mt-2">
                <Input
                  id="makeModel"
                  value={formData.makeModel}
                  onChange={(e) => setFormData(prev => ({ ...prev, makeModel: e.target.value }))}
                  placeholder="Enter make & model"
                  maxLength={50}
                  className="w-64"
                />
                {errors.makeModel && <p className="text-red-500 text-sm mt-1">{errors.makeModel}</p>}
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div className="flex-1">
              <Label htmlFor="type" className="text-lg font-medium">Type<span className="text-red-500">*</span></Label>
              <div className="mt-2">
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Enter type"
                  maxLength={50}
                  className="w-64"
                />
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>
            </div>
          </div>

          {/* Year of Manufacture */}
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div className="flex-1">
              <Label htmlFor="yearOfManufacture" className="text-lg font-medium">Year of Manufacture<span className="text-red-500">*</span></Label>
              <div className="mt-2">
                <Input
                  id="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearOfManufacture: e.target.value }))}
                  placeholder="Enter year"
                  maxLength={4}
                  className="w-64"
                />
                {errors.yearOfManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearOfManufacture}</p>}
              </div>
            </div>
          </div>

          {/* Ref Documents */}
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              6
            </div>
            <div className="flex-1">
              <Label htmlFor="refDocuments" className="text-lg font-medium">Ref Documents<span className="text-red-500">*</span></Label>
              <div className="mt-2">
                <Input
                  id="refDocuments"
                  value={formData.refDocuments}
                  onChange={(e) => setFormData(prev => ({ ...prev, refDocuments: e.target.value }))}
                  placeholder="Enter reference documents"
                  maxLength={100}
                  className="w-64"
                />
              </div>
            </div>
          </div>

            {/* Maintenance Routines */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                7
              </div>
              <div className="flex-1">
                <Label htmlFor="maintenanceRoutines" className="text-sm font-medium text-gray-700">Maintenance Routines i.a.w Maintop & OEM Manual*</Label>
                <div className="mt-2">
                  <Input
                    id="maintenanceRoutines"
                    value={formData.maintenanceRoutines}
                    onChange={(e) => setFormData(prev => ({ ...prev, maintenanceRoutines: e.target.value }))}
                    placeholder="Enter maintenance routines"
                    maxLength={100}
                    className="w-64"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Structure Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">8. Structure</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">

            {/* a) Date of Last Structural Survey of */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 text-sm">a) Date of Last Structural Survey of</h4>
              
              {/* i) Platform */}
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50 mb-4">
                <div className="text-sm font-medium text-gray-700">i) Platform</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Date:*</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.platformDate ? format(formData.platformDate, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.platformDate || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, platformDate: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Remarks:*</Label>
                    <Textarea
                      value={formData.platformRemarks}
                      onChange={(e) => setFormData(prev => ({ ...prev, platformRemarks: e.target.value }))}
                      placeholder="Enter remarks"
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

            {/* ii) List Shall Structure */}
            <div className="space-y-2">
              <div className="text-sm font-medium">ii) List Shall Structure</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date:<span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.listShallStructureDate ? format(formData.listShallStructureDate, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.listShallStructureDate || undefined}
                        onSelect={(date) => setFormData(prev => ({ ...prev, listShallStructureDate: date || null }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.listShallStructureRemarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, listShallStructureRemarks: e.target.value }))}
                    placeholder="Enter remarks"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* iii) Equipment Foundations */}
            <div className="space-y-2">
              <div className="text-sm font-medium">iii) Equipment Foundations</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date:<span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.equipmentFoundationsDate ? format(formData.equipmentFoundationsDate, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.equipmentFoundationsDate || undefined}
                        onSelect={(date) => setFormData(prev => ({ ...prev, equipmentFoundationsDate: date || null }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.equipmentFoundationsRemarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, equipmentFoundationsRemarks: e.target.value }))}
                    placeholder="Enter remarks"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* iv) Supporting Decks */}
            <div className="space-y-2">
              <div className="text-sm font-medium">iv) Supporting Decks</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date:<span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.supportingDecksDate ? format(formData.supportingDecksDate, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.supportingDecksDate || undefined}
                        onSelect={(date) => setFormData(prev => ({ ...prev, supportingDecksDate: date || null }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.supportingDecksRemarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, supportingDecksRemarks: e.target.value }))}
                    placeholder="Enter remarks"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* v) Hydraulic Oil Tanks */}
            <div className="space-y-2">
              <div className="text-sm font-medium">v) Hydraulic Oil Tanks</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date:<span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.hydraulicOilTanksDate ? format(formData.hydraulicOilTanksDate, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.hydraulicOilTanksDate || undefined}
                        onSelect={(date) => setFormData(prev => ({ ...prev, hydraulicOilTanksDate: date || null }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.hydraulicOilTanksRemarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, hydraulicOilTanksRemarks: e.target.value }))}
                    placeholder="Enter remarks"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* b) List of Pending Observations */}
          <div className="ml-12 space-y-4">
            <div className="text-sm font-medium mb-4">b) List of Pending Observations for Liquidation (if any)</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enter Total Number of Rows.</Label>
                <Button
                  type="button"
                  onClick={addPendingObservation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  Add Row
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Sr.</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Equipment*</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Observation*</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Remarks*</th>
                      <th className="border border-gray-300 px-3 py-2 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.pendingObservations.map((obs, index) => (
                      <tr key={obs.id}>
                        <td className="border border-gray-300 px-3 py-2">
                          <Input
                            value={obs.srNo}
                            onChange={(e) => updatePendingObservation(obs.id, 'srNo', e.target.value)}
                            placeholder={`${index + 1}`}
                            className="border-0 p-1 w-16"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <Input
                            value={obs.equipment}
                            onChange={(e) => updatePendingObservation(obs.id, 'equipment', e.target.value)}
                            placeholder="Enter equipment"
                            className="border-0 p-1"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <Input
                            value={obs.observation}
                            onChange={(e) => updatePendingObservation(obs.id, 'observation', e.target.value)}
                            placeholder="Enter observation"
                            className="border-0 p-1"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <Input
                            value={obs.remarks}
                            onChange={(e) => updatePendingObservation(obs.id, 'remarks', e.target.value)}
                            placeholder="Enter remarks"
                            className="border-0 p-1"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <Button
                            type="button"
                            onClick={() => removePendingObservation(obs.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* c) Last Date of Completion */}
          <div className="ml-12 space-y-4">
            <div className="text-sm font-medium mb-4">c) Last Date of Completion of IV-Annual Routines i.a.w MAINTOPs.</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date:<span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastDateCompletionIV ? format(formData.lastDateCompletionIV, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastDateCompletionIV || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastDateCompletionIV: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Remarks:<span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.lastDateCompletionIVRemarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastDateCompletionIVRemarks: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
              </div>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Visual Condition Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">9. Visual Condition</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Deck Support and Equipment Foundation Structure', 'deckSupportObservations', 'deckSupportRemarks')}
            {renderObservationSection('b) Rusting/ Corrosion/ Preservation of Lift and Associated Structure', 'rustingCorrosionObservations', 'rustingCorrosionRemarks')}
            {renderObservationSection('c) Dust/ Moisture/ Foreign Objects/ Rusting/ Corrosion on Lift Mechanism & External Moving Parts', 'dustMoistureObservations', 'dustMoistureRemarks')}
            {renderObservationSection('d) Attachment of Cable to Fixed Point and Pulleys', 'attachmentCableObservations', 'attachmentCableRemarks')}
            {renderObservationSection('e) Check all Structure and Mechanism for Defect/ Deformation/ Damage', 'checkStructureObservations', 'checkStructureRemarks')}
            {renderObservationSection('f) Lift Guides & Rail Tracks.', 'liftGuidesObservations', 'liftGuidesRemarks')}
            {renderObservationSection('g) Guard Railing and Stanchions', 'guardRailingObservations', 'guardRailingRemarks')}
            {renderObservationSection('h) Auto-tensioning Gear of Wire Rope Assembly', 'autoTensioningObservations', 'autoTensioningRemarks')}
            {renderObservationSection('i) Rubber Dampers on Shock Absorbers - Damaged/ Worn', 'rubberDampersObservations', 'rubberDampersRemarks')}
            {renderObservationSection('j) Condition of Bronze Pads on Cross Arm', 'bronzePadsObservations', 'bronzePadsRemarks')}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">k) Coaming of Lift Problem:</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Condition of Rubber Coaming/ Gasket', 'rubberCoamingObservations', 'rubberCoamingRemarks')}
                {renderObservationSection('ii) Water Drain Arrangement Form Sealing Cover/ Water Tightness of Lift Cover (Pour Water to Check Sealing)', 'waterDrainObservations', 'waterDrainRemarks')}
              </div>
            </div>
            
            {renderObservationSection('l) Securing/ Fastening of all Cable/ Pipe Hangers to The Hull Structure', 'securingFasteningObservations', 'securingFasteningRemarks')}
            {renderObservationSection('m) Condition of Locking Devices/ Locks - Deck No.1(24) & No.5(01).', 'lockingDevicesObservations', 'lockingDevicesRemarks')}
          </CardContent>
        </Card>

        {/* Greasing Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">10. Greasing (Thin Layer of Grease on all Unpainted Mental Surfaces)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Type of Grease Used (OEM-Lythol 24)', 'typeOfGreaseObservations', 'typeOfGreaseRemarks')}
            {renderObservationSection('b) Condition of Greasing Points', 'conditionGreasingPointsObservations', 'conditionGreasingPointsRemarks')}
            {renderObservationSection('c) Grease Layer on Friction Parts', 'greaseLayerObservations', 'greaseLayerRemarks')}
            {renderObservationSection('d) Bearings', 'bearingsObservations', 'bearingsRemarks')}
            {renderObservationSection('e) Lift Guides', 'liftGuidesGreasingObservations', 'liftGuidesGreasingRemarks')}
            {renderObservationSection('f) Blocks and Cables', 'blocksCablesObservations', 'blocksCablesRemarks')}
            {renderObservationSection('g) Locking Devices', 'lockingDevicesGreasingObservations', 'lockingDevicesGreasingRemarks')}
            {renderObservationSection('h) Sprockets of Rail Stanchions', 'sprocketsObservations', 'sprocketsRemarks')}
            {renderObservationSection('i) Rollers and Support Rollers', 'rollersObservations', 'rollersRemarks')}
            {renderObservationSection('j) Rockers', 'rockersObservations', 'rockersRemarks')}
            {renderObservationSection('k) Between Lift Covers & Lug Joint', 'liftCoversObservations', 'liftCoversRemarks')}
            {renderObservationSection('l) SS to Confirm (Greasing between Gearing of Reduction Gear, Sprokets and other Inaccessible and OEM Manual)', 'ssConfirmGreasingObservations', 'ssConfirmGreasingRemarks')}
          </CardContent>
        </Card>

        {/* Wire Ropes Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">11. Wire Ropes</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Visual Condition - Ropes & End Fitting', 'visualConditionRopesObservations', 'visualConditionRopesRemarks')}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>b) Date of Last Changed / Replaced (to be replaced every 5 years) - Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateLastChanged ? format(formData.dateLastChanged, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateLastChanged || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateLastChanged: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.dateLastChangedRemarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateLastChangedRemarks: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>c) Date of Last Serviceability Check - Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateLastServiceability ? format(formData.dateLastServiceability, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateLastServiceability || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateLastServiceability: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.dateLastServiceabilityRemarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateLastServiceabilityRemarks: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">d) Condition of Wire Ropes</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Rusting/ Corrosion', 'rustingCorrosionRopesObservations', 'rustingCorrosionRopesRemarks')}
                {renderObservationSection('ii) Greasing (Thin Layer of Grease)', 'greasingRopesObservations', 'greasingRopesRemarks')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Oil Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">12. Oil</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label>a) Hydraulic Drive Oil - AYN Oil / OEM Approved</Label>
              <Textarea
                value={formData.hydraulicDriveOilRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, hydraulicDriveOilRemarks: e.target.value }))}
                placeholder="Enter remarks"
                rows={2}
              />
            </div>

            {renderObservationSection('b) Gear Oil - AMT-10', 'gearOilObservations', 'gearOilRemarks')}
            {renderObservationSection('c) SS to Confirm (Oil in Movable Joints, Antifriction Bearing & Chains)', 'ssConfirmOilObservations', 'ssConfirmOilRemarks')}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>d) Date of Oil Change (Working Fluid to be Replaced Every 5 year i.a.w Manual) - Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOilChange ? format(formData.dateOilChange, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOilChange || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateOilChange: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.dateOilChangeRemarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOilChangeRemarks: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>e) Date of Last Oil Analysis Certificate of Testing Held/not Held (Annual OEM Manual - if not replaced) - Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOilAnalysis ? format(formData.dateOilAnalysis, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOilAnalysis || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateOilAnalysis: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.dateOilAnalysisRemarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOilAnalysisRemarks: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">f) SS to Confirm (Oil in Movable Joints, Anti-friction Bearing & Chains)</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>i) Date of Cleaning of Oil Filters (6 months i.a.w OEM Manual) - Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateCleaningFilters ? format(formData.dateCleaningFilters, 'dd/MM/yyyy') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateCleaningFilters || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, dateCleaningFilters: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Remarks *</Label>
                    <Textarea
                      value={formData.dateCleaningFiltersRemarks}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateCleaningFiltersRemarks: e.target.value }))}
                      placeholder="Enter remarks"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>ii) Date of Replacement of Hydraulic Drive Oil Filters - Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateReplacementFilters ? format(formData.dateReplacementFilters, 'dd/MM/yyyy') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateReplacementFilters || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, dateReplacementFilters: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Remarks *</Label>
                    <Textarea
                      value={formData.dateReplacementFiltersRemarks}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateReplacementFiltersRemarks: e.target.value }))}
                      placeholder="Enter remarks"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>

            {renderObservationSection('g) Oil Level in Tanks Pump Units and Reduction Gear Box', 'oilLevelObservations', 'oilLevelRemarks')}
            {renderObservationSection('h) Leakages from (Detachable Connection, Fixed Pipes, Flexible Lines etc.)', 'leakagesObservations', 'leakagesRemarks')}
            {renderObservationSection('i) Calibration Certificates of Measuring Instruments(Once in 2 years i.aiw. OEM Manual)', 'calibrationCertificatesObservations', 'calibrationCertificatesRemarks')}
          </CardContent>
        </Card>

        {/* Visual Condition Section 2 */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">13. Visual Condition</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Deck Foundation Structure', 'deckFoundationStructureObservations', 'deckFoundationStructureRemarks')}
            {renderObservationSection('b) Rusting/Corrosion/ Preservation of Lift and Associated Structure', 'rustingCorrosionStructureObservations', 'rustingCorrosionStructureRemarks')}
            {renderObservationSection('c) Attachment of Chain to Holder', 'attachmentChainObservations', 'attachmentChainRemarks')}
            {renderObservationSection('d) Check all Structure and Mechanism for Defects/ Deformation/ Damage', 'checkStructureMechanismObservations', 'checkStructureMechanismRemarks')}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">e) Shocks Absorbers</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Damage/ Worn/ Defective', 'shocksAbsorbersDamageObservations', 'shocksAbsorbersDamageRemarks')}
                {renderObservationSection('ii) Fasteners of Shock Absorbers', 'fastenersShockAbsorbersObservations', 'fastenersShockAbsorbersRemarks')}
                {renderObservationSection('iii) Rubber to Metal Joints', 'rubberMetalJointsObservations', 'rubberMetalJointsRemarks')}
                {renderObservationSection('iv) External Surface of Rubber (Tears/ Open Deep Cracks)', 'externalSurfaceRubberObservations', 'externalSurfaceRubberRemarks')}
                {renderObservationSection('v) Deformation of Metal Reinforcement', 'deformationMetalObservations', 'deformationMetalRemarks')}
                {renderObservationSection('vi) Record of Inspection - once a month', 'recordInspectionObservations', 'recordInspectionRemarks')}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">f) Coaming of Lift Platform</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Condition of Coaming', 'conditionCoamingObservations', 'conditionCoamingRemarks')}
                {renderObservationSection('ii) Water Discharge/ Arrangement Form Sealing Cover/Water Tightness of Lift Cover (Pour Water to Check Sealing)', 'waterDischargeObservations', 'waterDischargeRemarks')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Electric Checks Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">14. Electric Checks (in Addition to Standard Check by ETMA)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Records of Insulation Measurement (Once a Week & Part of Lift Pre-startup Checks i.w.a OEM Operating Instructions)', 'recordsInsulationObservations', 'recordsInsulationRemarks')}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">b) Insulation Measurement by ETMA/SS)</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Controls Boards (15-) not less than 0.3 M-Ohms', 'controlsBoardsObservations', 'controlsBoardsRemarks')}
                {renderObservationSection('ii) Controls Panel (16my, 19my) - not less than 0.3-Ohms', 'controlsPanelObservations', 'controlsPanelRemarks')}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">iii) Control Station (8-cy to 12-cy)and Magnetic starters (13my & 14mM)</h4>
                  <div className="space-y-4">
                    {renderObservationSection('i) Input Terminals (M1, M2, M3) not less than 01 M-Ohms', 'inputTerminalsObservations', 'inputTerminalsRemarks')}
                    {renderObservationSection('ii) Output Terminals (C1, C2, C3) not less than 02 M-Ohm', 'outputTerminalsObservations', 'outputTerminalsRemarks')}
                  </div>
                </div>
              </div>
            </div>

            {renderObservationSection('c) Tightness of Cable Fasteners', 'tightnessCableObservations', 'tightnessCableRemarks')}
            {renderObservationSection('d) Condition of JB, Control Panel and Remote Panel', 'conditionJBControlObservations', 'conditionJBControlRemarks')}
          </CardContent>
        </Card>

        {/* Electric Checks by ETMA Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">15. Electric Checks by ETMA</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Completed', 'completedObservations', 'completedRemarks')}
            {renderObservationSection('b) Availability of Report', 'availabilityReportObservations', 'availabilityReportRemarks')}
            {renderObservationSection('c) SPM Check of all 07 Motors (ETMA)', 'spmCheckObservations', 'spmCheckRemarks')}
            {renderObservationSection('d) Grounding and Bonding Connection', 'groundingBondingObservations', 'groundingBondingRemarks')}
          </CardContent>
        </Card>

        {/* Limit Switches Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">16. Limit Switches</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {renderObservationSection('a) Visual Condition', 'visualConditionLimitObservations', 'visualConditionLimitRemarks')}
            {renderObservationSection('b) Availability of all Limit Switches', 'availabilityLimitSwitchesObservations', 'availabilityLimitSwitchesRemarks')}
            {renderObservationSection('c) Red Lines on Flag to be in Vertical Position when Lift Secured for Sea', 'redLinesFlagObservations', 'redLinesFlagRemarks')}
          </CardContent>
        </Card>

        {/* Load Testing Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">17. Load Testing</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>a) Date of Last Load Testing (Periodicity 27 month) - Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateLastLoadTesting ? format(formData.dateLastLoadTesting, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateLastLoadTesting || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateLastLoadTesting: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.dateLastLoadTestingRemarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateLastLoadTestingRemarks: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">b) Check Certificates - Static and Dynamic Load Testing i.a.w OEM Manual</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Static Load LIFT - (37.53 T)', 'staticLoadLiftObservations', 'staticLoadLiftRemarks')}
                {renderObservationSection('ii) Static Load LOCKING DEVICE - (14.5 T)', 'staticLoadLockingObservations', 'staticLoadLockingRemarks')}
                {renderObservationSection('iii) Dynamic Load - (33 T)', 'dynamicLoadObservations', 'dynamicLoadRemarks')}
                {renderObservationSection('iv) Safe Working Load (30 T)', 'safeWorkingLoadObservations', 'safeWorkingLoadRemarks')}
                {renderObservationSection('v) No of Operations During Test (b) & (c) (03 Hoist & Lowering)', 'noOperationsObservations', 'noOperationsRemarks')}
              </div>
            </div>

            {renderObservationSection('c) \'Emergency STOP\' Check Undertaken During Dynamic Load Test and Outcome', 'emergencyStopObservations', 'emergencyStopRemarks')}
            {renderObservationSection('d) SS Confirm to no Oil Leakages During Load Testing', 'ssConfirmOilLeakagesObservations', 'ssConfirmOilLeakagesRemarks')}
          </CardContent>
        </Card>

        {/* Operational/Functional Check Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">18. Operational / Functional Check ("Normal","Emergency" and "Manual" Operation)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">a) Hoisting Speeds</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Slow - 3.8 m/min to 4.4 m/min (initial and final stages)', 'hoistingSpeedsSlowObservations', 'hoistingSpeedsSlowRemarks')}
                {renderObservationSection('ii) High - 17 m/min to 19 m/min (check - automatic switching form slow to high speed at lower and top level after 2-3 seconds of operation)', 'hoistingSpeedsHighObservations', 'hoistingSpeedsHighRemarks')}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">b) Lowering Speeds</h4>
              <div className="space-y-4">
                {renderObservationSection('i) Slow - 1.9 to 2.4 m/min', 'loweringSpeedsSlowObservations', 'loweringSpeedsSlowRemarks')}
                {renderObservationSection('ii) High - 20 to 25 m/min', 'loweringSpeedsHighObservations', 'loweringSpeedsHighRemarks')}
              </div>
            </div>

            {renderObservationSection('c) Working Pressure of Hydraulic Liquid in Power Drive (normal - 0.49 MPa / 4.9 bar)', 'workingPressureObservations', 'workingPressureRemarks')}
            {renderObservationSection('d) Operation of Limit Switches and Automatic Response of Lift Mechanism', 'operationLimitSwitchesObservations', 'operationLimitSwitchesRemarks')}
            {renderObservationSection('e) Operation of all Locks (24 on deck no.1 and 01 on deck no.5)', 'operationAllLocksObservations', 'operationAllLocksRemarks')}
            {renderObservationSection('f) Accurate Stopping of Lift at all Location and Levelling of Lift at all Deck Stops.', 'accurateStoppingObservations', 'accurateStoppingRemarks')}
            {renderObservationSection('g) Activate \'STOP\' During Hoisting and Lowering at Different Locations (zero creep permitted)', 'activateStopObservations', 'activateStopRemarks')}
            {renderObservationSection('h) Operation in "Emergency Mode"', 'operationEmergencyModeObservations', 'operationEmergencyModeRemarks')}
            {renderObservationSection('i) Guard Railing Operation', 'guardRailingOperationObservations', 'guardRailingOperationRemarks')}
            {renderObservationSection('j) Electro-magnetic Brake Operation', 'electroMagneticBrakeObservations', 'electroMagneticBrakeRemarks')}
            {renderObservationSection('k) Emergency Brakes (Band / Block)', 'emergencyBrakesObservations', 'emergencyBrakesRemarks')}
            {renderObservationSection('l) Check for Excessive Vibration of Mechanism , Structure and Piping', 'excessiveVibrationObservations', 'excessiveVibrationRemarks')}
            {renderObservationSection('m) Automatic Operation of Upper Lift Covers', 'automaticOperationObservations', 'automaticOperationRemarks')}
            {renderObservationSection('n) Operation of Indicator Lamps in Control Panel', 'operationIndicatorLampsObservations', 'operationIndicatorLampsRemarks')}
            {renderObservationSection('o) Roller Mechanism', 'rollerMechanismObservations', 'rollerMechanismRemarks')}
            {renderObservationSection('p) Safety Check - Operation of Warning Bell and Lights', 'safetyCheckObservations', 'safetyCheckRemarks')}
            {renderObservationSection('q) Switch off Power Supply to Check Emergency Response of Lifts / Brake During Hoisting and Lowering Operation.', 'switchOffPowerObservations', 'switchOffPowerRemarks')}
            {renderObservationSection('r) Drive / Gear Box Noise and Vibrations', 'driveGearBoxObservations', 'driveGearBoxRemarks')}
            {renderObservationSection('s) Free Movement of all Pulleys', 'freeMovementObservations', 'freeMovementRemarks')}
            {renderObservationSection('t) Hindered/ Jerky Movement During Operation (if any).', 'hinderedMovementObservations', 'hinderedMovementRemarks')}
            {renderObservationSection('u) Manual Operation Checks (only for lowering of the platform).', 'manualOperationObservations', 'manualOperationRemarks')}
            {renderObservationSection('v) Check of all Oil Leakages from Fixed and Flexible Lines and Gear Box - During and After Trails.', 'checkOilLeakagesObservations', 'checkOilLeakagesRemarks')}
          </CardContent>
        </Card>

        {/* Any Other Observation */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">19. Any Other Observation</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <Label htmlFor="anyOtherObservationRemarks">Remarks *</Label>
              <Textarea
                id="anyOtherObservationRemarks"
                value={formData.anyOtherObservationRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, anyOtherObservationRemarks: e.target.value }))}
                placeholder="Enter any other observations"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Overall Remarks */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">20. Overall Remarks</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <Label htmlFor="overallRemarks">Remarks *</Label>
              <Textarea
                id="overallRemarks"
                value={formData.overallRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, overallRemarks: e.target.value }))}
                placeholder="Enter overall remarks"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Authority Signature */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold">21. Authority Signature*</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <Label htmlFor="authoritySignature">Upload Signature *</Label>
              <Input
                id="authoritySignature"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="w-full"
              />
              {errors.authoritySignature && <p className="text-red-500 text-sm mt-1">{errors.authoritySignature}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card>
          <CardContent className="pt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> If Lifts are Going to be Operated After Long Period of Inactivity (After Completion of Trials), 
                Maintenance to be Undertaken i.a.w Section 8 of OEM Manual and in-house Trials to be Undertaken Prior Commencing Operations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Note Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                !
              </div>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Note:</h4>
              <p className="text-yellow-700 text-sm">
                If Lifts are Going to be Operated After Long Period of Inactivity (After Completion of Trials), 
                Maintenance to be Undertaken i.a.w Section 8 of OEM Manual and in-house Trials to be Undertaken Prior Commencing Operations.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={() => setIsDraftModalOpen(true)}>
            Fetch Drafts
          </Button>
          
          <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={saveDraft}>
            SAVE DRAFT
          </Button>
          
          <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded" onClick={resetForm}>
            Clear
          </Button>
          
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Save
          </Button>
        </div>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Saved Drafts</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {drafts.length === 0 ? (
                  <p className="text-center text-gray-500">No drafts saved yet</p>
                ) : (
                  drafts.map((draft) => (
                    <div key={draft.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{draft.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(draft.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setFormData(draft);
                              setIsDraftModalOpen(false);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              const updatedDrafts = drafts.filter(d => d.id !== draft.id);
                              setDrafts(updatedDrafts);
                              localStorage.setItem('sacLiftNo1_drafts', JSON.stringify(updatedDrafts));
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};

export default SacLiftNo1Form;
