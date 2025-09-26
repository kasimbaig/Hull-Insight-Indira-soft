import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { get, post } from '@/lib/api';
import DynamicTable from './DynamicTable';
import MaterialState from '@/components/forms/HullMaintenanceInspectionforShipsForm/MaterialState';
import Preservation from '@/components/forms/HullMaintenanceInspectionforShipsForm/Preservation';
import Documentation from '@/components/forms/HullMaintenanceInspectionforShipsForm/Documentation';
import WaterTight from '@/components/forms/HullMaintenanceInspectionforShipsForm/WaterTight';

interface Vessel {
  id: number;
  name: string;
  code: string;
  classofvessel: {
    id: number;
    name: string;
    code: string;
  };
  vesseltype: {
    id: number;
    name: string;
    code: string;
  };
  yard: {
    id: number;
    name: string;
    code: string;
  };
  command: {
    id: number;
    name: string;
    code: string;
  };
  year_of_build: number;
  year_of_delivery: number;
}

interface FormData {
  vesselId: string;
  inspectionDate: string;
  // OPDEFs
  opdefsSinceLastInspection: string;
  hullOpdefsRows: number;
  hullOpdefsData: Array<{ opdefDetails: string; remarks: string }>;
  // Hull Concessions
  hullConcessionsRows: number;
  hullConcessionsData: Array<{ hullConcessions: string; location: string; justification: string }>;
  // Other Ty repairs / known defects
  tyRepairsRows: number;
  tyRepairsData: Array<{ tyRepairs: string; location: string; justification: string }>;
  // Structural defects
  structuralDefectsRows: number;
  structuralDefectsData: Array<{ type: string; location: string; remarks: string }>;
  // Machinery Compartments
  presentPaintScheme: string;
  dateOfLastRenewal: string;
  presentPaintCondition: string;
  generalBilgesHygiene: string;
  presenceOfWaterOilInBilges: string;
  // Rusting / corrosion
  rustingCorrosionRows: number;
  rustingCorrosionData: Array<{ type: string; location: string; remarks: string }>;
  // Other observations
  otherObservationsRows: number;
  otherObservationsData: Array<{ observation: string }>;
  // Weather Decks
  weatherDecksPresentPaintScheme: string;
  weatherDecksDateOfLastRenewal: string;
  weatherDecksPresentPaintCondition: string;
  weatherDecksMaintenanceStandard: string;
  weatherDecksLastDateOfFrictionTest: string;
  weatherDecksRustingCorrosionRows: number;
  weatherDecksRustingCorrosionData: Array<{ type: string; location: string; remarks: string }>;
  weatherDecksOtherObservations: string;
  weatherDecksOtherObservationsRows: number;
  weatherDecksOtherObservationsData: Array<{ observation: string }>;
  // Helo/Flight Deck
  heloFlightDeckPresentPaintScheme: string;
  heloFlightDeckDateOfLastRenewal: string;
  heloFlightDeckPresentPaintCondition: string;
  heloFlightDeckMaintenanceStandard: string;
  heloFlightDeckLastDateOfFrictionTest: string;
  heloFlightDeckRustingCorrosionRows: number;
  heloFlightDeckRustingCorrosionData: Array<{ type: string; location: string; remarks: string }>;
  heloFlightDeckOtherObservationsRows: number;
  heloFlightDeckOtherObservationsData: Array<{ observation: string }>;
  // Internal compartments
  internalCompartmentsDefectsRows: number;
  internalCompartmentsDefectsData: Array<{ type: string; location: string; remarks: string }>;
  // Super structure
  superStructureDefectsRows: number;
  superStructureDefectsData: Array<{ type: string; location: string; remarks: string }>;
  // Deck covering
  deckCoveringPresentScheme: string;
  deckCoveringCracksPeelingRows: number;
  deckCoveringCracksPeelingData: Array<{ observation: string }>;
  deckCoveringAnyOtherDefectRows: number;
  deckCoveringAnyOtherDefectData: Array<{ observation: string }>;
  deckCoveringConditionOfEdgesRows: number;
  deckCoveringConditionOfEdgesData: Array<{ observation: string }>;
  deckCoveringConditionOfDadoesRows: number;
  deckCoveringConditionOfDadoesData: Array<{ observation: string }>;
  // Preservation (No 53/16)
  preservationRecord: string;
  preservationMaintenance: string;
  preservationInspection: string;
  preservationDocumentation: string;
  preservationCompliance: string;
  preservationRemarks: string;
  // Documentation
  hullSurveyRecord: string;
  hullPotentialMeasurements: string;
  emap: string;
  boatLogBook: string;
  recordOfDefects: string;
  hmpVmpLogBook: string;
  // Water Tight and Gas Tight Integrity (NO 01/15)
  airPressureTestEquipment: string;
  cycleCommencingFrom: string;
  compartmentsTestedSuccessfully: string;
  compartmentsTestedSuccessfullyRows: number;
  compartmentsTestedSuccessfullyData: Array<{ observation: string }>;
  compartmentsTestedNotProved: string;
  compartmentsTestedNotProvedRows: number;
  compartmentsTestedNotProvedData: Array<{ observation: string }>;
  planForRemainingCompts: string;
  planForRemainingComptsRows: number;
  planForRemainingComptsData: Array<{ observation: string; remarks: string }>;
  // 4.2 Citadel
  citadelTestStatus: string;
  citadelTestType: string;
  citadelTestResults: string;
  afuRoutines: string;
  afuDueForRenewal: string;
  // 4.3 W/T, G/T Doors/Hatches/Flaps
  wtGtDoorsDateOfUld: string;
  defectiveDoors: string;
  defectiveHatches: string;
  defectiveFlaps: string;
  rubberSealsCondition: string;
  otherDefectsRows: number;
  otherDefectsData: Array<{ observation: string; remarks: string }>;
  clipsWedgesMaintenance: string;
  clipsWedgesDefectsRows: number;
  clipsWedgesDefectsData: Array<{ observation: string; remarks: string }>;
  otherRemarksRows: number;
  otherRemarksData: Array<{ observation: string; remarks: string }>;
  // 4.4 Mushroom Heads
  mushroomHeadsDefectsRows: number;
  mushroomHeadsDefectsData: Array<{ location: string; type: string; frameStationFrom: string; frameStationTo: string; remarks: string }>;
  // Returns
  in378: string;
  quarterlyHullSurvey: string;
  hullPotentialIccp: string;
  boatReturnsHistory: string;
  // Miscellaneous Records
  policyFile: string;
  maintops: string;
  in305AnchorChain: string;
  in379DockingForm: string;
  hullSurveyReportYard: string;
  // HMP/VMP
  regularHmpVmp: string;
  hmpVmpAdequate: string;
  employedIawMaintops: string;
  // Habitability
  livingConditions: string;
  shipsHusbandry: string;
  acDiscipline: string;
  // Ships Husbandry tools
  authorisationTools: string;
  authorisationToolsText: string;
  heldAsPerAuthorisation: string;
  remarkIfAny: string;
  // Recommendations
  ssRecommendationsRows: number;
  ssRecommendationsData: Array<{ observation: string; remarks: string }>;
  // Lifting Appliances
  boatDavitsOps: string;
  boatDavitsLastLoadTest: string;
  boatDavitsDueLoadTest: string;
  boatDavitsRemarks: string;
  singleArmDavitOps: string;
  singleArmDavitLastLoadTest: string;
  singleArmDavitDueLoadTest: string;
  singleArmDavitRemarks: string;
  fixedRadialDavitOps: string;
  fixedRadialDavitLastLoadTest: string;
  fixedRadialDavitDueLoadTest: string;
  fixedRadialDavitRemarks: string;
  boatSlingsOps: string;
  boatSlingsLastLoadTest: string;
  boatSlingsDueLoadTest: string;
  boatSlingsRemarks: string;
  rasPointsOps: string;
  rasPointsLastLoadTest: string;
  rasPointsDueLoadTest: string;
  rasPointsRemarks: string;
  accommodationLadderOps: string;
  accommodationLadderLastLoadTest: string;
  accommodationLadderDueLoadTest: string;
  accommodationLadderRemarks: string;
  // Additional Lifting Appliances
  boomsOps: string;
  boomsLastLoadTest: string;
  boomsDueLoadTest: string;
  boomsRemarks: string;
  shipsBrowOps: string;
  shipsBrowLastLoadTest: string;
  shipsBrowDueLoadTest: string;
  shipsBrowRemarks: string;
  heloDeckHangarOps: string;
  heloDeckHangarLastLoadTest: string;
  heloDeckHangarDueLoadTest: string;
  heloDeckHangarRemarks: string;
  heloLandingGridOps: string;
  heloLandingGridLastLoadTest: string;
  heloLandingGridDueLoadTest: string;
  heloLandingGridRemarks: string;
  towingArrangementsOps: string;
  towingArrangementsLastLoadTest: string;
  towingArrangementsDueLoadTest: string;
  towingArrangementsRemarks: string;
  safetyNetsOps: string;
  safetyNetsLastLoadTest: string;
  safetyNetsDueLoadTest: string;
  safetyNetsRemarks: string;
  ho5HoistingOps: string;
  ho5HoistingLastLoadTest: string;
  ho5HoistingDueLoadTest: string;
  ho5HoistingRemarks: string;
  // Systems
  iccpSystemOperational: string;
  iccpSystemDetails: string;
  setPotentialWrtZincRE: string;
  readingInPanelWrtZincRE: string;
  externalReadingWrtPortableZincRE: string;
  lastCalibrationDateForZincRE: string;
  knownDefectsOfICCP: string;
  // Ventilation System
  ventilationSystemOperational: string;
  detailsOfDefects: string;
  stateOfATUOps: string;
  stateOfATUNonOps: string;
  atuRoutines: string;
  stateOfHEs: string;
  chokingOfTrunkings: string;
  // Fresh Water Systems
  freshWaterSystemsOperational: string;
  // Sewage Treatment Plant
  sewagePlantNameMakeType: string;
  sewagePlantOperational: string;
  sewagePlantDefects: string;
  sewagePlantRoutineIAWManual: string;
  sewagePlantEffluentTestResult: string;
  // Pre-wetting System
  preWettingSystemOperational: string;
  preWettingSystemDateLastOperated: string;
  preWettingSystemDefects: string;
  // Sanitary System
  sanitarySystemDefects: string;
  sanitarySystemChokes: string;
  sanitarySystemFlushingValves: string;
  sanitarySystemOBDValves: string;
  // Choking of trunkings table
  chokingTrunkingsRows: number;
  chokingTrunkingsData: Array<{ observation: string; remarks: string }>;
  // Fresh water systems table
  freshWaterSystemsRows: number;
  freshWaterSystemsData: Array<{ observation: string; remarks: string }>;
  freshWaterSystemsStatus: string;
  // 6.2 Details of defects table
  detailsOfDefectsRows: number;
  detailsOfDefectsData: Array<{ observation: string; remarks: string; frameStationFrom?: string; frameStationTo?: string }>;
  // 6.4 Details of defects table
  sewagePlantDefectsRows: number;
  sewagePlantDefectsData: Array<{ equipment: string; observation: string; remarks: string; frameStationFrom?: string; frameStationTo?: string }>;
  // Hull Equipment
  anchorChainCableLastSurvey: string;
  // Additional Hull Equipment fields
  dateOfLoadTest: string;
  anchorStrop: string;
  blakeSlip: string;
  compressor: string;
  // BER items table
  berItemsRows: number;
  berItemsData: Array<{ observation: string }>;
  // Deficiency table
  deficiencyRows: number;
  deficiencyData: Array<{ observation: string }>;
  // Additional Hull Equipment defects tables
  capstanDefectsRows: number;
  capstanDefectsData: Array<{ observation: string }>;
  winchesDefectsRows: number;
  winchesDefectsData: Array<{ observation: string }>;
  craneDefectsRows: number;
  craneDefectsData: Array<{ observation: string }>;
  hangarShutterDefectsRows: number;
  hangarShutterDefectsData: Array<{ observation: string }>;
  boomDefectsRows: number;
  boomDefectsData: Array<{ observation: string }>;
  asAberDefectsRows: number;
  asAberDefectsData: Array<{ observation: string }>;
  // Life Saving Appliances
  boatsAuthorisation: string;
  boatsHeldDeficiency: string;
  boatsBer: string;
  boatsLandedForRepairs: string;
  // Boats defects table
  boatsDefectsRows: number;
  boatsDefectsData: Array<{ equipment: string; observation: string; remarks: string }>;
  // Additional Boats fields
  boatsMaintenanceTwoPointLifting: string;
  boatsVisualExaminationHooks: string;
  boatsDPTestAdapter: string;
  boatsPeriodicInspection: string;
  boatsVisualSurveyStrongBack: string;
  // Life Rafts fields
  lifeRaftsAuthorisation: string;
  lifeRaftsHeldDeficiency: string;
  lifeRaftsBer: string;
  lifeRaftsLandedForSurvey: string;
  lifeRaftsStowageArrangements: string;
  lifeRaftsHydrostaticReleasingGear: string;
}

const HullMaintenanceInspectionforShipsForm = () => {
  const [formData, setFormData] = useState<FormData>({
    vesselId: '',
    inspectionDate: '',
    // OPDEFs
    opdefsSinceLastInspection: '',
    hullOpdefsRows: 0,
    hullOpdefsData: [],
    // Hull Concessions
    hullConcessionsRows: 0,
    hullConcessionsData: [],
    // Other Ty repairs / known defects
    tyRepairsRows: 0,
    tyRepairsData: [],
    // Structural defects
    structuralDefectsRows: 0,
    structuralDefectsData: [],
    // Machinery Compartments
    presentPaintScheme: '',
    dateOfLastRenewal: '',
    presentPaintCondition: '',
    generalBilgesHygiene: '',
    presenceOfWaterOilInBilges: '',
    // Rusting / corrosion
    rustingCorrosionRows: 0,
    rustingCorrosionData: [],
    // Other observations
    otherObservationsRows: 0,
    otherObservationsData: [],
    // Weather Decks
    weatherDecksPresentPaintScheme: '',
    weatherDecksDateOfLastRenewal: '',
    weatherDecksPresentPaintCondition: '',
    weatherDecksMaintenanceStandard: '',
    weatherDecksLastDateOfFrictionTest: '',
    weatherDecksRustingCorrosionRows: 0,
    weatherDecksRustingCorrosionData: [],
    weatherDecksOtherObservations: '',
    weatherDecksOtherObservationsRows: 0,
    weatherDecksOtherObservationsData: [],
    // Helo/Flight Deck
    heloFlightDeckPresentPaintScheme: '',
    heloFlightDeckDateOfLastRenewal: '',
    heloFlightDeckPresentPaintCondition: '',
    heloFlightDeckMaintenanceStandard: '',
    heloFlightDeckLastDateOfFrictionTest: '',
    heloFlightDeckRustingCorrosionRows: 0,
    heloFlightDeckRustingCorrosionData: [],
    heloFlightDeckOtherObservationsRows: 0,
    heloFlightDeckOtherObservationsData: [],
    // Internal compartments
    internalCompartmentsDefectsRows: 0,
    internalCompartmentsDefectsData: [],
    // Super structure
    superStructureDefectsRows: 0,
    superStructureDefectsData: [],
    // Deck covering
    deckCoveringPresentScheme: '',
    deckCoveringCracksPeelingRows: 0,
    deckCoveringCracksPeelingData: [],
    deckCoveringAnyOtherDefectRows: 0,
    deckCoveringAnyOtherDefectData: [],
    deckCoveringConditionOfEdgesRows: 0,
    deckCoveringConditionOfEdgesData: [],
    deckCoveringConditionOfDadoesRows: 0,
    deckCoveringConditionOfDadoesData: [],
    // Preservation (No 53/16)
    preservationRecord: '',
    preservationMaintenance: '',
    preservationInspection: '',
    preservationDocumentation: '',
    preservationCompliance: '',
    preservationRemarks: '',
    // Documentation
    hullSurveyRecord: '',
    hullPotentialMeasurements: '',
    emap: '',
    boatLogBook: '',
    recordOfDefects: '',
    hmpVmpLogBook: '',
    // Water Tight and Gas Tight Integrity (NO 01/15)
    airPressureTestEquipment: '',
    cycleCommencingFrom: '',
    compartmentsTestedSuccessfully: '',
    compartmentsTestedSuccessfullyRows: 0,
    compartmentsTestedSuccessfullyData: [],
    compartmentsTestedNotProved: '',
    compartmentsTestedNotProvedRows: 0,
    compartmentsTestedNotProvedData: [],
    planForRemainingCompts: '',
    planForRemainingComptsRows: 0,
    planForRemainingComptsData: [],
    // 4.2 Citadel
    citadelTestStatus: '',
    citadelTestType: '',
    citadelTestResults: '',
    afuRoutines: '',
    afuDueForRenewal: '',
    // 4.3 W/T, G/T Doors/Hatches/Flaps
    wtGtDoorsDateOfUld: '',
    defectiveDoors: '',
    defectiveHatches: '',
    defectiveFlaps: '',
    rubberSealsCondition: '',
    otherDefectsRows: 0,
    otherDefectsData: [],
    clipsWedgesMaintenance: '',
    clipsWedgesDefectsRows: 0,
    clipsWedgesDefectsData: [],
    otherRemarksRows: 0,
    otherRemarksData: [],
    // 4.4 Mushroom Heads
    mushroomHeadsDefectsRows: 0,
    mushroomHeadsDefectsData: [],
    // Returns
    in378: '',
    quarterlyHullSurvey: '',
    hullPotentialIccp: '',
    boatReturnsHistory: '',
    // Miscellaneous Records
    policyFile: '',
    maintops: '',
    in305AnchorChain: '',
    in379DockingForm: '',
    hullSurveyReportYard: '',
    // HMP/VMP
    regularHmpVmp: '',
    hmpVmpAdequate: '',
    employedIawMaintops: '',
    // Habitability
    livingConditions: '',
    shipsHusbandry: '',
    acDiscipline: '',
    // Ships Husbandry tools
    authorisationTools: '',
    authorisationToolsText: '',
    heldAsPerAuthorisation: '',
    remarkIfAny: '',
    // Recommendations
    ssRecommendationsRows: 0,
    ssRecommendationsData: [],
    // Lifting Appliances
    boatDavitsOps: '',
    boatDavitsLastLoadTest: '',
    boatDavitsDueLoadTest: '',
    boatDavitsRemarks: '',
    singleArmDavitOps: '',
    singleArmDavitLastLoadTest: '',
    singleArmDavitDueLoadTest: '',
    singleArmDavitRemarks: '',
    fixedRadialDavitOps: '',
    fixedRadialDavitLastLoadTest: '',
    fixedRadialDavitDueLoadTest: '',
    fixedRadialDavitRemarks: '',
    boatSlingsOps: '',
    boatSlingsLastLoadTest: '',
    boatSlingsDueLoadTest: '',
    boatSlingsRemarks: '',
    rasPointsOps: '',
    rasPointsLastLoadTest: '',
    rasPointsDueLoadTest: '',
    rasPointsRemarks: '',
    accommodationLadderOps: '',
    accommodationLadderLastLoadTest: '',
    accommodationLadderDueLoadTest: '',
    accommodationLadderRemarks: '',
    // Additional Lifting Appliances
    boomsOps: '',
    boomsLastLoadTest: '',
    boomsDueLoadTest: '',
    boomsRemarks: '',
    shipsBrowOps: '',
    shipsBrowLastLoadTest: '',
    shipsBrowDueLoadTest: '',
    shipsBrowRemarks: '',
    heloDeckHangarOps: '',
    heloDeckHangarLastLoadTest: '',
    heloDeckHangarDueLoadTest: '',
    heloDeckHangarRemarks: '',
    heloLandingGridOps: '',
    heloLandingGridLastLoadTest: '',
    heloLandingGridDueLoadTest: '',
    heloLandingGridRemarks: '',
    towingArrangementsOps: '',
    towingArrangementsLastLoadTest: '',
    towingArrangementsDueLoadTest: '',
    towingArrangementsRemarks: '',
    safetyNetsOps: '',
    safetyNetsLastLoadTest: '',
    safetyNetsDueLoadTest: '',
    safetyNetsRemarks: '',
    ho5HoistingOps: '',
    ho5HoistingLastLoadTest: '',
    ho5HoistingDueLoadTest: '',
    ho5HoistingRemarks: '',
    // Systems
    iccpSystemOperational: '',
    iccpSystemDetails: '',
    setPotentialWrtZincRE: '',
    readingInPanelWrtZincRE: '',
    externalReadingWrtPortableZincRE: '',
    lastCalibrationDateForZincRE: '',
    knownDefectsOfICCP: '',
    // Ventilation System
    ventilationSystemOperational: '',
    detailsOfDefects: '',
    stateOfATUOps: '',
    stateOfATUNonOps: '',
    atuRoutines: '',
    stateOfHEs: '',
    chokingOfTrunkings: '',
    // Fresh Water Systems
    freshWaterSystemsOperational: '',
    // Sewage Treatment Plant
    sewagePlantNameMakeType: '',
    sewagePlantOperational: '',
    sewagePlantDefects: '',
    sewagePlantRoutineIAWManual: '',
    sewagePlantEffluentTestResult: '',
    // Pre-wetting System
    preWettingSystemOperational: '',
    preWettingSystemDateLastOperated: '',
    preWettingSystemDefects: '',
    // Sanitary System
    sanitarySystemDefects: '',
    sanitarySystemChokes: '',
    sanitarySystemFlushingValves: '',
    sanitarySystemOBDValves: '',
    // Choking of trunkings table
    chokingTrunkingsRows: 0,
    chokingTrunkingsData: [],
    // Fresh water systems table
    freshWaterSystemsRows: 0,
    freshWaterSystemsData: [],
    freshWaterSystemsStatus: '',
    // 6.2 Details of defects table
    detailsOfDefectsRows: 0,
    detailsOfDefectsData: [],
    // 6.4 Details of defects table
    sewagePlantDefectsRows: 0,
    sewagePlantDefectsData: [],
    // Hull Equipment
    anchorChainCableLastSurvey: '',
    // Additional Hull Equipment fields
    dateOfLoadTest: '',
    anchorStrop: '',
    blakeSlip: '',
    compressor: '',
    // BER items table
    berItemsRows: 0,
    berItemsData: [],
    // Deficiency table
    deficiencyRows: 0,
    deficiencyData: [],
    // Additional Hull Equipment defects tables
    capstanDefectsRows: 0,
    capstanDefectsData: [],
    winchesDefectsRows: 0,
    winchesDefectsData: [],
    craneDefectsRows: 0,
    craneDefectsData: [],
    hangarShutterDefectsRows: 0,
    hangarShutterDefectsData: [],
    boomDefectsRows: 0,
    boomDefectsData: [],
    asAberDefectsRows: 0,
    asAberDefectsData: [],
    // Life Saving Appliances
    boatsAuthorisation: '',
    boatsHeldDeficiency: '',
    boatsBer: '',
    boatsLandedForRepairs: '',
    // Boats defects table
    boatsDefectsRows: 0,
    boatsDefectsData: [],
    // Additional Boats fields
    boatsMaintenanceTwoPointLifting: '',
    boatsVisualExaminationHooks: '',
    boatsDPTestAdapter: '',
    boatsPeriodicInspection: '',
    boatsVisualSurveyStrongBack: '',
    // Life Rafts fields
    lifeRaftsAuthorisation: '',
    lifeRaftsHeldDeficiency: '',
    lifeRaftsBer: '',
    lifeRaftsLandedForSurvey: '',
    lifeRaftsStowageArrangements: '',
    lifeRaftsHydrostaticReleasingGear: '',
  });

  const [inspectionDate, setInspectionDate] = useState<Date>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loadingVessels, setLoadingVessels] = useState(false);
  const [vesselError, setVesselError] = useState<string | null>(null);
  
  // Dialog and drafts state
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);
  const [apiDrafts, setApiDrafts] = useState<any[]>([]);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setInspectionDate(date);
      handleInputChange('inspectionDate', format(date, "dd-MM-yyyy"));
      setIsDatePickerOpen(false);
    }
  };

  const handleVesselChange = (vesselId: string) => {
    handleInputChange('vesselId', vesselId);
  };

  const handleDataChange = (dataField: string, rowIndex: number, field: 'observation' | 'remarks', value: string) => {
    setFormData(prev => {
      const currentData = (prev[dataField as keyof FormData] as any[]) || [];
      const updatedData = [...currentData];

      if (dataField === 'hullOpdefsData') {
        updatedData[rowIndex] = {
          ...(updatedData[rowIndex] || { opdefDetails: '', remarks: '' }),
          [field === 'observation' ? 'opdefDetails' : 'remarks']: value,
        };
      } else if (dataField === 'hullConcessionsData') {
        const currentItem = updatedData[rowIndex] || {
          hullConcessions: '',
          location: '',
          justification: '',
        };
        if (field === 'observation') {
          updatedData[rowIndex] = { ...currentItem, hullConcessions: value };
        } else if (field === 'remarks') {
          const parts = value.split(' | ');
          updatedData[rowIndex] = {
            ...currentItem,
            location: parts[0] || '',
            justification: parts[1] || '',
          };
        }
      } else if (dataField === 'rustingCorrosionData') {
        updatedData[rowIndex] = {
          ...(updatedData[rowIndex] || { type: '', location: '', remarks: '' }),
          [field === 'observation' ? 'type' : 'remarks']: value,
        };
      } else if (dataField === 'otherObservationsData') {
        updatedData[rowIndex] = {
          ...(updatedData[rowIndex] || { observation: '' }),
          observation: value,
        };
      }

      return {
        ...prev,
        [dataField]: updatedData,
      };
    });
  };

  // Fetch vessels from API
  useEffect(() => {
    const fetchVessels = async () => {
      setLoadingVessels(true);
      setVesselError(null);
      try {
        const response = await get('master/vessels/');
        if (response && response.data && Array.isArray(response.data)) {
          setVessels(response.data);
        } else if (Array.isArray(response)) {
          setVessels(response);
        } else {
          console.warn('Unexpected vessels response structure:', response);
          setVessels([]);
          setVesselError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching vessels:', error);
        setVesselError('Failed to load vessels data');
        setVessels([]);
      } finally {
        setLoadingVessels(false);
      }
    };

    fetchVessels();
  }, []);

  // Handler functions for dialog and drafts
  const handleFetchDrafts = async () => {
    setIsLoadingDrafts(true);
    try {
      const response = await get('hitumodule/hull-maintenance-inspection-for-ships/');
      if (response && Array.isArray(response)) {
        setApiDrafts(response);
        setIsDraftModalOpen(true);
      } else {
        setApiDrafts([]);
        setIsDraftModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
      setApiDrafts([]);
      setIsDraftModalOpen(true);
    } finally {
      setIsLoadingDrafts(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      const payload = {
        ...formData,
        vessel: vessels.find(v => v.id.toString() === formData.vesselId),
        auth_inspection: formData.inspectionDate
      };
      
      if (editingRecord) {
        await post(`hitumodule/hull-maintenance-inspection-for-ships/${editingRecord.id}/`, payload);
      } else {
        await post('hitumodule/hull-maintenance-inspection-for-ships/', payload);
      }
      
      // Refresh drafts list
      handleFetchDrafts();
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleClear = () => {
    setFormData({
      vesselId: '',
      inspectionDate: '',
      // OPDEFs
      opdefsSinceLastInspection: '',
      hullOpdefsRows: 0,
      hullOpdefsData: [],
      // Hull Concessions
      hullConcessionsRows: 0,
      hullConcessionsData: [],
      // Other Ty repairs / known defects
      tyRepairsRows: 0,
      tyRepairsData: [],
      // Structural defects
      structuralDefectsRows: 0,
      structuralDefectsData: [],
      // Machinery Compartments
      presentPaintScheme: '',
      dateOfLastRenewal: '',
      presentPaintCondition: '',
      generalBilgesHygiene: '',
      presenceOfWaterOilInBilges: '',
      rustingCorrosionRows: 0,
      rustingCorrosionData: [],
      otherObservationsRows: 0,
      otherObservationsData: [],
      // Weather Decks
      weatherDecksPresentPaintScheme: '',
      weatherDecksDateOfLastRenewal: '',
      weatherDecksPresentPaintCondition: '',
      weatherDecksMaintenanceStandard: '',
      weatherDecksRustingCorrosionRows: 0,
      weatherDecksRustingCorrosionData: [],
      weatherDecksOtherObservations: '',
      weatherDecksOtherObservationsRows: 0,
      weatherDecksOtherObservationsData: [],
      // Helo/Flight Deck
      heloFlightDeckPresentPaintScheme: '',
      heloFlightDeckDateOfLastRenewal: '',
      heloFlightDeckPresentPaintCondition: '',
      heloFlightDeckMaintenanceStandard: '',
      heloFlightDeckLastDateOfFrictionTest: '',
      heloFlightDeckRustingCorrosionRows: 0,
      heloFlightDeckRustingCorrosionData: [],
      heloFlightDeckOtherObservationsRows: 0,
      heloFlightDeckOtherObservationsData: [],
      // Internal compartments
      internalCompartmentsDefectsRows: 0,
      internalCompartmentsDefectsData: [],
      // Super structure
      superStructureDefectsRows: 0,
      superStructureDefectsData: [],
      // Deck covering
      deckCoveringPresentScheme: '',
      deckCoveringCracksPeelingRows: 0,
      deckCoveringCracksPeelingData: [],
      deckCoveringAnyOtherDefectRows: 0,
      deckCoveringAnyOtherDefectData: [],
      deckCoveringConditionOfEdgesRows: 0,
      deckCoveringConditionOfEdgesData: [],
      deckCoveringConditionOfDadoesRows: 0,
      deckCoveringConditionOfDadoesData: [],
      // Documentation
      documentationRows: 0,
      documentationData: [],
      // Water Tight and Gas Tight Integrity
      waterTightGasTightIntegrityRows: 0,
      waterTightGasTightIntegrityData: [],
      // Lifting Appliances
      liftingAppliancesRows: 0,
      liftingAppliancesData: [],
      // Systems
      systemsRows: 0,
      systemsData: [],
      // Hull Equipment
      hullEquipmentRows: 0,
      hullEquipmentData: [],
      // Life Saving Appliances
      lifeSavingAppliancesRows: 0,
      lifeSavingAppliancesData: [],
      // Recommendations
      recommendationsRows: 0,
      recommendationsData: [],
      // Life Rafts
      lifeRaftsAuthorisation: '',
      lifeRaftsHeldDeficiency: '',
      lifeRaftsBer: '',
      lifeRaftsLandedForSurvey: '',
      lifeRaftsStowageArrangements: '',
      lifeRaftsHydrostaticReleasingGear: '',
    });
    setEditingRecord(null);
    setInspectionDate(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    // Populate form with record data
    setFormData(prev => ({
      ...prev,
      vesselId: record.vessel?.id?.toString() || '',
      inspectionDate: record.auth_inspection || '',
    }));
    setIsDraftModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const recordId = Number(id);
      if (isNaN(recordId)) {
        return;
      }
      
      const payload = { id: recordId, delete: true };
      await post('hitumodule/hull-maintenance-inspection-for-ships/', payload);
      
      setApiDrafts(prev => prev.filter(record => record.id !== id));
      handleFetchDrafts();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <div className="flex items-center justify-center">
            <h2 className="text-3xl font-semibold underline">HULL MAINTENANCE INSPECTION FOR SHIPS</h2>
          </div>
        </div>

        {/* Date and Vessel Section */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center bg-white p-3 gap-6">
            {/* Date of Inspection */}
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-700 mb-2">
                DATE OF INSPECTION:<span className="text-red-500">*</span>
              </div>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal border border-gray-300 rounded px-3 py-2 hover:bg-white hover:text-gray-900 hover:border-gray-300 ${
                      !inspectionDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {inspectionDate ? format(inspectionDate, "dd-MM-yyyy") : "DD-MM-YYYY"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={inspectionDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Inspection for Ships INS */}
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-700 mb-2">
                INSPECTION FOR SHIPS INS:<span className="text-red-500">*</span>
              </div>
              <Select
                value={formData.vesselId}
                onValueChange={handleVesselChange}
                disabled={loadingVessels}
              >
                <SelectTrigger className="border border-gray-300 rounded px-3 py-2 w-full">
                  <SelectValue placeholder={loadingVessels ? "Loading vessels..." : "--Select--"} />
                </SelectTrigger>
                <SelectContent>
                  {vesselError ? (
                    <SelectItem value="" disabled>
                      Error loading vessels
                    </SelectItem>
                  ) : (
                    vessels.map((vessel) => (
                      <SelectItem key={vessel.id} value={vessel.id.toString()}>
                        {vessel.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Material State Component */}
        <MaterialState 
          formData={formData} 
          onInputChange={handleInputChange}
          onDataChange={(field, index, dataField, value) => {
            const updatedData = [...formData[field as keyof typeof formData] as any[]];
            updatedData[index] = {
              ...updatedData[index],
              [dataField]: value
            };
            setFormData(prev => ({ ...prev, [field]: updatedData }));
          }}
        />



        {/* Preservation Component */}
        <Preservation 
          formData={formData} 
          onInputChange={handleInputChange}
          onDataChange={(field, index, dataField, value) => {
            const updatedData = [...formData[field as keyof typeof formData] as any[]];
            updatedData[index] = {
              ...updatedData[index],
              [dataField]: value
            };
            setFormData(prev => ({ ...prev, [field]: updatedData }));
          }}
        />

        {/* Documentation Component */}
        <Documentation 
          formData={formData} 
          onInputChange={handleInputChange}
          onDataChange={(field, index, dataField, value) => {
            const updatedData = [...formData[field as keyof typeof formData] as any[]];
            updatedData[index] = {
              ...updatedData[index],
              [dataField]: value
            };
            setFormData(prev => ({ ...prev, [field]: updatedData }));
          }}
        />

        {/* WaterTight Component */}
        <WaterTight 
          formData={formData} 
          onInputChange={handleInputChange}
          onDataChange={(field, index, dataField, value) => {
            const updatedData = [...formData[field as keyof typeof formData] as any[]];
            updatedData[index] = {
              ...updatedData[index],
              [dataField]: value
            };
            setFormData(prev => ({ ...prev, [field]: updatedData }));
          }}
        />

        {/* Lifting Appliances Section */}
