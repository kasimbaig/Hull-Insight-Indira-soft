import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface OpdefDetail {
  id: string;
  srNo: string;
  opdefDetails: string;
  remarks: string;
}

interface HullConcession {
  id: string;
  srNo: string;
  hullConcessions: string;
  location: string;
  justification: string;
}

interface OtherDefect {
  id: string;
  srNo: string;
  defectDetails: string;
  remarks: string;
}

interface EdgeCondition {
  id: string;
  srNo: string;
  edgeDetails: string;
  remarks: string;
}

interface DadoCondition {
  id: string;
  srNo: string;
  dadoDetails: string;
  remarks: string;
}

interface HullStructure {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface DeckStructure {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface Bulkhead {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface MachinerySpace {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface InternalCompartment {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface SuperStructure {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface MachineryRusting {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface MachineryOtherObservation {
  id: string;
  srNo: string;
  observationDetails: string;
}

interface WeatherDeckRusting {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface HeloDeckRusting {
  id: string;
  srNo: string;
  type: string;
  location: string;
  remarks: string;
}

interface DeckCoveringCrack {
  id: string;
  srNo: string;
  crackDetails: string;
}

interface DeckCoveringDefect {
  id: string;
  srNo: string;
  defectDetails: string;
}

interface CompartmentTested {
  id: string;
  srNo: string;
  compartmentDetails: string;
}

interface CompartmentNotProved {
  id: string;
  srNo: string;
  compartmentDetails: string;
}

interface PlanForRemaining {
  id: string;
  srNo: string;
  planDetails: string;
}

interface WtGtDefect {
  id: string;
  srNo: string;
  defectDetails: string;
}

interface WtGtClipWedgeDefect {
  id: string;
  srNo: string;
  defectDetails: string;
}

interface WtGtOtherRemark {
  id: string;
  srNo: string;
  remarkDetails: string;
}

interface MushroomHead {
  id: string;
  srNo: string;
  location: string;
  type: string;
  frameStationFrom: string;
  frameStationTo: string;
  remarks: string;
}

interface LiftingAppliance {
  id: string;
  applianceName: string;
  opsStatus: string;
  lastLoadTestDate: string;
  dueLoadTestDate: string;
  remarks: string;
}

interface BerItem {
  id: string;
  srNo: string;
  berDetails: string;
}

interface Recommendation {
  id: string;
  srNo: string;
  recommendationDetails: string;
}

interface VentilationDefect {
  id: string;
  srNo: string;
  location: string;
  frameStationFrom: string;
  frameStationTo: string;
  remarks: string;
}

interface VentilationChoking {
  id: string;
  srNo: string;
  chokingDetails: string;
}

interface FreshWaterDefect {
  id: string;
  srNo: string;
  defectDetails: string;
}

interface SewageEquipment {
  id: string;
  srNo: string;
  equipment: string;
  location: string;
  frameStationFrom: string;
  frameStationTo: string;
  remarks: string;
}

interface HullEquipmentDefect {
  id: string;
  srNo: string;
  defectDetails: string;
}

interface BoatDefect {
  id: string;
  srNo: string;
  equipment: string;
  location: string;
  remarks: string;
}

interface HullMaintenanceInspectionforShipsFormData {
  // Header Fields
  inspectionForShips: string;
  dateOfInspection: string;
  
  // Material State Section
  noOfOpdefs: string;
  opdefDetails: OpdefDetail[];
  hullConcessions: HullConcession[];
  
  // Preservation Section
  // 2.1 Machinery Compartments
  machineryPaintScheme: string;
  machineryPaintRenewalDate: string;
  machineryPaintCondition: string;
  machineryBilgesHygiene: string;
  machineryBilgesWaterOil: string;
  machineryRusting: MachineryRusting[];
  machineryOtherObservations: MachineryOtherObservation[];
  
  // 2.2 Weather Decks
  weatherDeckPaintScheme: string;
  weatherDeckPaintRenewalDate: string;
  weatherDeckPaintCondition: string;
  weatherDeckMaintenanceStandard: string;
  weatherDeckRusting: WeatherDeckRusting[];
  
  // 2.3 Helo / Flight Deck
  heloDeckPaintScheme: string;
  heloDeckPaintRenewalDate: string;
  heloDeckPaintCondition: string;
  heloDeckMaintenanceStandard: string;
  heloDeckFrictionTestDate: string;
  heloDeckRusting: HeloDeckRusting[];
  
  // 2.4 Internal compartments
  internalCompartments: InternalCompartment[];
  
  // 2.5 Super structure
  superStructure: SuperStructure[];
  
  // 2.6 Deck covering
  deckCoveringPresentScheme: string;
  deckCoveringCracks: DeckCoveringCrack[];
  deckCoveringDefects: DeckCoveringDefect[];
  edgeConditions: EdgeCondition[];
  dadoConditions: DadoCondition[];
  
  // Documentation Section
  hullSurveyRecord: string;
  hullPotentialMeasurements: string;
  emap: string;
  boatLogBook: string;
  recordOfDefects: string;
  hmpVmpLogBook: string;
  
  // Returns Section
  in378: string;
  quarterlyHullSurvey: string;
  hullPotentialIccp: string;
  boatReturnsHistory: string;
  
  // Miscellaneous Records Section
  policyFile: string;
  mainTops: string;
  in305AnchorChain: string;
  in379DockingForm: string;
  hullSurveyReportYard: string;
  
  // HMP / VMP Section
  hmpVmpRegular: string;
  hmpVmpAdequate: string;
  hmpVmpMainTopsCompliant: string;
  
  // Water Tight and Gas Tight Integrity Section
  // 4.1 Air Pressure Test of W/T compartments
  aptEquipmentAvailability: string;
  aptCycleCommencingFrom: string;
  compartmentsTested: CompartmentTested[];
  compartmentsNotProved: CompartmentNotProved[];
  planForRemaining: PlanForRemaining[];
  
  // 4.2 Citadel
  citadelTestStatus: string;
  citadelTestType: string;
  citadelTestResults: string;
  citadelAfuRoutines: string;
  citadelAfuRenewal: string;
  
  // 4.3 W/T, G/T Doors/ Hatches /Flaps
  wtGtUldDate: string;
  wtGtDefectiveDoors: string;
  wtGtDefectiveHatches: string;
  wtGtDefectiveFlaps: string;
  wtGtRubberSealsCondition: string;
  wtGtOtherDefects: WtGtDefect[];
  wtGtClipsWedgesMaintenance: string;
  wtGtClipsWedgesDefects: WtGtClipWedgeDefect[];
  wtGtOtherRemarks: WtGtOtherRemark[];
  
  // 4.4 Mushroom Heads
  mushroomHeads: MushroomHead[];
  
  // Lifting Appliances Section
  liftingAppliances: LiftingAppliance[];
  
  // Systems Section
  // 6.1 ICCP system/ Cathodic protection
  iccpOperational: string;
  iccpSetPotential: string;
  iccpReadingPanel: string;
  iccpExternalReading: string;
  iccpLastCalibrationDate: string;
  iccpKnownDefects: string;
  
  // 6.2 Ventilation system
  ventilationOperational: string;
  ventilationDefects: VentilationDefect[];
  ventilationAtuOps: string;
  ventilationAtuNonOps: string;
  ventilationAtuRoutines: string;
  ventilationHes: string;
  ventilationChoking: VentilationChoking[];
  
  // 6.3 Fresh water systems
  freshWaterOperational: string;
  freshWaterDefects: FreshWaterDefect[];
  
  // 6.4 Sewage treatment plant
  sewageNameMakeType: string;
  sewageOperational: string;
  sewageEquipment: SewageEquipment[];
  sewageRoutineManual: string;
  sewageEffluentTest: string;
  
  // 6.5 Pre-wetting system
  preWettingOperational: string;
  preWettingLastOperated: string;
  preWettingDefects: string;
  
  // 6.6 Sanitary system
  sanitaryDefects: string;
  sanitaryChokes: string;
  flushingValves: string;
  obdValves: string;
  
  // Hull Equipment Section
  // 7.1 Anchor chain cable and associated fittings
  anchorSurveyDetails: string;
  anchorLoadTestDate: string;
  anchorStrop: string;
  blakeSlip: string;
  compressor: string;
  berItems: BerItem[];
  anchorDeficiencies: HullEquipmentDefect[];
  
  // 7.2 Capstan and Cable Holders
  capstanDefects: HullEquipmentDefect[];
  
  // 7.3 Winches
  winchesDefects: HullEquipmentDefect[];
  
  // 7.4 Crane
  craneDefects: HullEquipmentDefect[];
  
  // 7.5 Hangar Shutter
  hangarShutterDefects: HullEquipmentDefect[];
  
  // 7.6 Boom
  boomDefects: HullEquipmentDefect[];
  
  // 7.7 A's & A's / ABER
  asAberDefects: HullEquipmentDefect[];
  
  // Life Saving Appliances Section
  // 8.1 Boats
  boatsAuthorization: string;
  boatsHeldDeficiency: string;
  boatsBer: string;
  boatsLandedRepairs: string;
  boatDefects: BoatDefect[];
  boatsMaintenanceTwoPointLifting: string;
  boatsVisualExaminationHooks: string;
  boatsDpTestAdapter: string;
  boatsPeriodicInspection: string;
  boatsVisualSurveyStrongBack: string;
  
  // 8.2 Life Rafts
  lifeRaftsAuthorization: string;
  lifeRaftsHeldDeficiency: string;
  lifeRaftsBer: string;
  lifeRaftsLandedSurvey: string;
  lifeRaftsStowageArrangements: string;
  lifeRaftsHydrostaticReleasingGear: string;
  
  // Habitability Section
  livingConditions: string;
  shipsHusbandry: string;
  acDiscipline: string;
  
  // Ships Husbandry Tools Section
  toolsAuthorization: string;
  toolsAuthorizationStatus: string;
  toolsHeld: string;
  toolsRemark: string;
  
  // Recommendations Section
  recommendations: Recommendation[];
  
  // Authority Signature Section
  authoritySignature: File | null;
}

const HullMaintenanceInspectionforShipsForm = () => {
  const [formData, setFormData] = useState<HullMaintenanceInspectionforShipsFormData>({
    inspectionForShips: "",
    dateOfInspection: "",
    noOfOpdefs: "",
    opdefDetails: [],
    hullConcessions: [],
    // 2.1 Machinery Compartments
    machineryPaintScheme: "",
    machineryPaintRenewalDate: "",
    machineryPaintCondition: "",
    machineryBilgesHygiene: "",
    machineryBilgesWaterOil: "",
    machineryRusting: [],
    machineryOtherObservations: [],
    
    // 2.2 Weather Decks
    weatherDeckPaintScheme: "",
    weatherDeckPaintRenewalDate: "",
    weatherDeckPaintCondition: "",
    weatherDeckMaintenanceStandard: "",
    weatherDeckRusting: [],
    
    // 2.3 Helo / Flight Deck
    heloDeckPaintScheme: "",
    heloDeckPaintRenewalDate: "",
    heloDeckPaintCondition: "",
    heloDeckMaintenanceStandard: "",
    heloDeckFrictionTestDate: "",
    heloDeckRusting: [],
    
    // 2.4 Internal compartments
    internalCompartments: [],
    
    // 2.5 Super structure
    superStructure: [],
    
    // 2.6 Deck covering
    deckCoveringPresentScheme: "",
    deckCoveringCracks: [],
    deckCoveringDefects: [],
    edgeConditions: [],
    dadoConditions: [],
    hullSurveyRecord: "",
    compartmentsTested: [],
    compartmentsNotProved: [],
    planForRemaining: [],
    liftingAppliances: [
      { id: "1", applianceName: "Boat Davits / Derricks and associated fittings", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "2", applianceName: "Single arm Davit", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "3", applianceName: "Fixed radial Davit", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "4", applianceName: "Boat slings", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "5", applianceName: "RAS points including (portable fittings)", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "6", applianceName: "Accommodation Ladder", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "7", applianceName: "Booms", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "8", applianceName: "Ships brow", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "9", applianceName: "Helo deck and Hangar deck rings / eyes", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "10", applianceName: "Helo Landing Grid", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "11", applianceName: "Towing arrangements / towing rope(polypropylene)", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "12", applianceName: "Safety nets", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "13", applianceName: "HO-5 hoisting arrangement", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
      { id: "14", applianceName: "Anchor Strop", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" }
    ],
    // 6.1 ICCP system/ Cathodic protection
    iccpOperational: "",
    iccpSetPotential: "",
    iccpReadingPanel: "",
    iccpExternalReading: "",
    iccpLastCalibrationDate: "",
    iccpKnownDefects: "",
    
    // 6.2 Ventilation system
    ventilationOperational: "",
    ventilationDefects: [],
    ventilationAtuOps: "",
    ventilationAtuNonOps: "",
    ventilationAtuRoutines: "",
    ventilationHes: "",
    ventilationChoking: [],
    
    // 6.3 Fresh water systems
    freshWaterOperational: "",
    freshWaterDefects: [],
    
    // 6.4 Sewage treatment plant
    sewageNameMakeType: "",
    sewageOperational: "",
    sewageEquipment: [],
    sewageRoutineManual: "",
    sewageEffluentTest: "",
    
    // 6.5 Pre-wetting system
    preWettingOperational: "",
    preWettingLastOperated: "",
    preWettingDefects: "",
    
    // 6.6 Sanitary system
    sanitaryDefects: "",
    sanitaryChokes: "",
    flushingValves: "",
    obdValves: "",
    // 7.1 Anchor chain cable and associated fittings
    anchorSurveyDetails: "",
    anchorLoadTestDate: "",
    anchorStrop: "",
    blakeSlip: "",
    compressor: "",
    berItems: [],
    anchorDeficiencies: [],
    
    // 7.2 Capstan and Cable Holders
    capstanDefects: [],
    
    // 7.3 Winches
    winchesDefects: [],
    
    // 7.4 Crane
    craneDefects: [],
    
    // 7.5 Hangar Shutter
    hangarShutterDefects: [],
    
    // 7.6 Boom
    boomDefects: [],
    
    // 7.7 A's & A's / ABER
    asAberDefects: [],
    // 8.1 Boats
    boatsAuthorization: "",
    boatsHeldDeficiency: "",
    boatsBer: "",
    boatsLandedRepairs: "",
    boatDefects: [],
    boatsMaintenanceTwoPointLifting: "",
    boatsVisualExaminationHooks: "",
    boatsDpTestAdapter: "",
    boatsPeriodicInspection: "",
    boatsVisualSurveyStrongBack: "",
    
    // 8.2 Life Rafts
    lifeRaftsAuthorization: "",
    lifeRaftsHeldDeficiency: "",
    lifeRaftsBer: "",
    lifeRaftsLandedSurvey: "",
    lifeRaftsStowageArrangements: "",
    lifeRaftsHydrostaticReleasingGear: "",
    livingConditions: "",
    shipsHusbandry: "",
    acDiscipline: "",
    toolsAuthorization: "",
    toolsAuthorizationStatus: "",
    toolsHeld: "",
    toolsRemark: "",
    recommendations: [],
    authoritySignature: null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  const handleInputChange = (field: keyof HullMaintenanceInspectionforShipsFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        authoritySignature: file
      }));
    }
  };

  // OPDEF Details Functions
  const handleAddOpdefDetail = () => {
    const newDetail: OpdefDetail = {
      id: Date.now().toString(),
      srNo: "",
      opdefDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      opdefDetails: [...prev.opdefDetails, newDetail]
    }));
  };

  const handleRemoveOpdefDetail = (id: string) => {
    setFormData(prev => ({
      ...prev,
      opdefDetails: prev.opdefDetails.filter(detail => detail.id !== id)
    }));
  };

  const handleUpdateOpdefDetail = (id: string, field: keyof OpdefDetail, value: string) => {
    setFormData(prev => ({
      ...prev,
      opdefDetails: prev.opdefDetails.map(detail =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    }));
  };

  // Hull Concessions Functions
  const handleAddHullConcession = () => {
    const newConcession: HullConcession = {
      id: Date.now().toString(),
      srNo: "",
      hullConcessions: "",
      location: "",
      justification: ""
    };
    setFormData(prev => ({
      ...prev,
      hullConcessions: [...prev.hullConcessions, newConcession]
    }));
  };

  const handleRemoveHullConcession = (id: string) => {
    setFormData(prev => ({
      ...prev,
      hullConcessions: prev.hullConcessions.filter(concession => concession.id !== id)
    }));
  };

  const handleUpdateHullConcession = (id: string, field: keyof HullConcession, value: string) => {
    setFormData(prev => ({
      ...prev,
      hullConcessions: prev.hullConcessions.map(concession =>
        concession.id === id ? { ...concession, [field]: value } : concession
      )
    }));
  };


  // Edge Conditions Functions
  const handleAddEdgeCondition = () => {
    const newCondition: EdgeCondition = {
      id: Date.now().toString(),
      srNo: "",
      edgeDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      edgeConditions: [...prev.edgeConditions, newCondition]
    }));
  };

  const handleRemoveEdgeCondition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      edgeConditions: prev.edgeConditions.filter(condition => condition.id !== id)
    }));
  };

  const handleUpdateEdgeCondition = (id: string, field: keyof EdgeCondition, value: string) => {
    setFormData(prev => ({
      ...prev,
      edgeConditions: prev.edgeConditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    }));
  };

  // Dado Conditions Functions
  const handleAddDadoCondition = () => {
    const newCondition: DadoCondition = {
      id: Date.now().toString(),
      srNo: "",
      dadoDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      dadoConditions: [...prev.dadoConditions, newCondition]
    }));
  };

  const handleRemoveDadoCondition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      dadoConditions: prev.dadoConditions.filter(condition => condition.id !== id)
    }));
  };

  const handleUpdateDadoCondition = (id: string, field: keyof DadoCondition, value: string) => {
    setFormData(prev => ({
      ...prev,
      dadoConditions: prev.dadoConditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    }));
  };




  // Machinery Rusting Functions
  const handleAddMachineryRusting = () => {
    const newRusting: MachineryRusting = {
      id: Date.now().toString(),
      srNo: "",
      type: "",
      location: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      machineryRusting: [...prev.machineryRusting, newRusting]
    }));
  };

  const handleRemoveMachineryRusting = (id: string) => {
    setFormData(prev => ({
      ...prev,
      machineryRusting: prev.machineryRusting.filter(rusting => rusting.id !== id)
    }));
  };

  const handleUpdateMachineryRusting = (id: string, field: keyof MachineryRusting, value: string) => {
    setFormData(prev => ({
      ...prev,
      machineryRusting: prev.machineryRusting.map(rusting =>
        rusting.id === id ? { ...rusting, [field]: value } : rusting
      )
    }));
  };

  // Machinery Other Observations Functions
  const handleAddMachineryOtherObservation = () => {
    const newObservation: MachineryOtherObservation = {
      id: Date.now().toString(),
      srNo: "",
      observationDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      machineryOtherObservations: [...prev.machineryOtherObservations, newObservation]
    }));
  };

  const handleRemoveMachineryOtherObservation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      machineryOtherObservations: prev.machineryOtherObservations.filter(obs => obs.id !== id)
    }));
  };

  const handleUpdateMachineryOtherObservation = (id: string, field: keyof MachineryOtherObservation, value: string) => {
    setFormData(prev => ({
      ...prev,
      machineryOtherObservations: prev.machineryOtherObservations.map(obs =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    }));
  };

  // Weather Deck Rusting Functions
  const handleAddWeatherDeckRusting = () => {
    const newRusting: WeatherDeckRusting = {
      id: Date.now().toString(),
      srNo: "",
      type: "",
      location: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      weatherDeckRusting: [...prev.weatherDeckRusting, newRusting]
    }));
  };

  const handleRemoveWeatherDeckRusting = (id: string) => {
    setFormData(prev => ({
      ...prev,
      weatherDeckRusting: prev.weatherDeckRusting.filter(rusting => rusting.id !== id)
    }));
  };

  const handleUpdateWeatherDeckRusting = (id: string, field: keyof WeatherDeckRusting, value: string) => {
    setFormData(prev => ({
      ...prev,
      weatherDeckRusting: prev.weatherDeckRusting.map(rusting =>
        rusting.id === id ? { ...rusting, [field]: value } : rusting
      )
    }));
  };

  // Helo Deck Rusting Functions
  const handleAddHeloDeckRusting = () => {
    const newRusting: HeloDeckRusting = {
      id: Date.now().toString(),
      srNo: "",
      type: "",
      location: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      heloDeckRusting: [...prev.heloDeckRusting, newRusting]
    }));
  };

  const handleRemoveHeloDeckRusting = (id: string) => {
    setFormData(prev => ({
      ...prev,
      heloDeckRusting: prev.heloDeckRusting.filter(rusting => rusting.id !== id)
    }));
  };

  const handleUpdateHeloDeckRusting = (id: string, field: keyof HeloDeckRusting, value: string) => {
    setFormData(prev => ({
      ...prev,
      heloDeckRusting: prev.heloDeckRusting.map(rusting =>
        rusting.id === id ? { ...rusting, [field]: value } : rusting
      )
    }));
  };

  // Deck Covering Crack Functions
  const handleAddDeckCoveringCrack = () => {
    const newCrack: DeckCoveringCrack = {
      id: Date.now().toString(),
      srNo: "",
      crackDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      deckCoveringCracks: [...prev.deckCoveringCracks, newCrack]
    }));
  };

  const handleRemoveDeckCoveringCrack = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deckCoveringCracks: prev.deckCoveringCracks.filter(crack => crack.id !== id)
    }));
  };

  const handleUpdateDeckCoveringCrack = (id: string, field: keyof DeckCoveringCrack, value: string) => {
    setFormData(prev => ({
      ...prev,
      deckCoveringCracks: prev.deckCoveringCracks.map(crack =>
        crack.id === id ? { ...crack, [field]: value } : crack
      )
    }));
  };

  // Deck Covering Defect Functions
  const handleAddDeckCoveringDefect = () => {
    const newDefect: DeckCoveringDefect = {
      id: Date.now().toString(),
      srNo: "",
      defectDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      deckCoveringDefects: [...prev.deckCoveringDefects, newDefect]
    }));
  };

  const handleRemoveDeckCoveringDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deckCoveringDefects: prev.deckCoveringDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateDeckCoveringDefect = (id: string, field: keyof DeckCoveringDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      deckCoveringDefects: prev.deckCoveringDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // Internal Compartment Functions
  const handleAddInternalCompartment = () => {
    const newCompartment: InternalCompartment = {
      id: Date.now().toString(),
      srNo: "",
      type: "",
      location: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      internalCompartments: [...prev.internalCompartments, newCompartment]
    }));
  };

  const handleRemoveInternalCompartment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      internalCompartments: prev.internalCompartments.filter(compartment => compartment.id !== id)
    }));
  };

  const handleUpdateInternalCompartment = (id: string, field: keyof InternalCompartment, value: string) => {
    setFormData(prev => ({
      ...prev,
      internalCompartments: prev.internalCompartments.map(compartment =>
        compartment.id === id ? { ...compartment, [field]: value } : compartment
      )
    }));
  };

  // Super Structure Functions
  const handleAddSuperStructure = () => {
    const newStructure: SuperStructure = {
      id: Date.now().toString(),
      srNo: "",
      type: "",
      location: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      superStructure: [...prev.superStructure, newStructure]
    }));
  };

  const handleRemoveSuperStructure = (id: string) => {
    setFormData(prev => ({
      ...prev,
      superStructure: prev.superStructure.filter(structure => structure.id !== id)
    }));
  };

  const handleUpdateSuperStructure = (id: string, field: keyof SuperStructure, value: string) => {
    setFormData(prev => ({
      ...prev,
      superStructure: prev.superStructure.map(structure =>
        structure.id === id ? { ...structure, [field]: value } : structure
      )
    }));
  };

  // W/T, G/T Other Defects Functions
  const handleAddWtGtOtherDefect = () => {
    const newDefect: WtGtDefect = {
      id: Date.now().toString(),
      srNo: "",
      defectDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      wtGtOtherDefects: [...prev.wtGtOtherDefects, newDefect]
    }));
  };

  const handleRemoveWtGtOtherDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      wtGtOtherDefects: prev.wtGtOtherDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateWtGtOtherDefect = (id: string, field: keyof WtGtDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      wtGtOtherDefects: prev.wtGtOtherDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // W/T, G/T Clips/Wedges Defects Functions
  const handleAddWtGtClipWedgeDefect = () => {
    const newDefect: WtGtClipWedgeDefect = {
      id: Date.now().toString(),
      srNo: "",
      defectDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      wtGtClipsWedgesDefects: [...prev.wtGtClipsWedgesDefects, newDefect]
    }));
  };

  const handleRemoveWtGtClipWedgeDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      wtGtClipsWedgesDefects: prev.wtGtClipsWedgesDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateWtGtClipWedgeDefect = (id: string, field: keyof WtGtClipWedgeDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      wtGtClipsWedgesDefects: prev.wtGtClipsWedgesDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // W/T, G/T Other Remarks Functions
  const handleAddWtGtOtherRemark = () => {
    const newRemark: WtGtOtherRemark = {
      id: Date.now().toString(),
      srNo: "",
      remarkDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      wtGtOtherRemarks: [...prev.wtGtOtherRemarks, newRemark]
    }));
  };

  const handleRemoveWtGtOtherRemark = (id: string) => {
    setFormData(prev => ({
      ...prev,
      wtGtOtherRemarks: prev.wtGtOtherRemarks.filter(remark => remark.id !== id)
    }));
  };

  const handleUpdateWtGtOtherRemark = (id: string, field: keyof WtGtOtherRemark, value: string) => {
    setFormData(prev => ({
      ...prev,
      wtGtOtherRemarks: prev.wtGtOtherRemarks.map(remark =>
        remark.id === id ? { ...remark, [field]: value } : remark
      )
    }));
  };

  // Mushroom Heads Functions
  const handleAddMushroomHead = () => {
    const newHead: MushroomHead = {
      id: Date.now().toString(),
      srNo: "",
      location: "",
      type: "",
      frameStationFrom: "",
      frameStationTo: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      mushroomHeads: [...prev.mushroomHeads, newHead]
    }));
  };

  const handleRemoveMushroomHead = (id: string) => {
    setFormData(prev => ({
      ...prev,
      mushroomHeads: prev.mushroomHeads.filter(head => head.id !== id)
    }));
  };

  const handleUpdateMushroomHead = (id: string, field: keyof MushroomHead, value: string) => {
    setFormData(prev => ({
      ...prev,
      mushroomHeads: prev.mushroomHeads.map(head =>
        head.id === id ? { ...head, [field]: value } : head
      )
    }));
  };

  // Compartment Tested Functions
  const handleAddCompartmentTested = () => {
    const newCompartment: CompartmentTested = {
      id: Date.now().toString(),
      srNo: "",
      compartmentDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      compartmentsTested: [...prev.compartmentsTested, newCompartment]
    }));
  };

  const handleRemoveCompartmentTested = (id: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsTested: prev.compartmentsTested.filter(compartment => compartment.id !== id)
    }));
  };

  const handleUpdateCompartmentTested = (id: string, field: keyof CompartmentTested, value: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsTested: prev.compartmentsTested.map(compartment =>
        compartment.id === id ? { ...compartment, [field]: value } : compartment
      )
    }));
  };

  // Compartment Not Proved Functions
  const handleAddCompartmentNotProved = () => {
    const newCompartment: CompartmentNotProved = {
      id: Date.now().toString(),
      srNo: "",
      compartmentDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      compartmentsNotProved: [...prev.compartmentsNotProved, newCompartment]
    }));
  };

  const handleRemoveCompartmentNotProved = (id: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsNotProved: prev.compartmentsNotProved.filter(compartment => compartment.id !== id)
    }));
  };

  const handleUpdateCompartmentNotProved = (id: string, field: keyof CompartmentNotProved, value: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsNotProved: prev.compartmentsNotProved.map(compartment =>
        compartment.id === id ? { ...compartment, [field]: value } : compartment
      )
    }));
  };

  // Plan For Remaining Functions
  const handleAddPlanForRemaining = () => {
    const newPlan: PlanForRemaining = {
      id: Date.now().toString(),
      srNo: "",
      planDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      planForRemaining: [...prev.planForRemaining, newPlan]
    }));
  };

  const handleRemovePlanForRemaining = (id: string) => {
    setFormData(prev => ({
      ...prev,
      planForRemaining: prev.planForRemaining.filter(plan => plan.id !== id)
    }));
  };

  const handleUpdatePlanForRemaining = (id: string, field: keyof PlanForRemaining, value: string) => {
    setFormData(prev => ({
      ...prev,
      planForRemaining: prev.planForRemaining.map(plan =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    }));
  };

  // Lifting Appliance Functions
  const handleUpdateLiftingAppliance = (id: string, field: keyof LiftingAppliance, value: any) => {
    setFormData(prev => ({
      ...prev,
      liftingAppliances: prev.liftingAppliances.map(appliance =>
        appliance.id === id ? { ...appliance, [field]: value } : appliance
      )
    }));
  };

  // BER Items Functions
  const handleAddBerItem = () => {
    const newItem: BerItem = {
      id: Date.now().toString(),
      srNo: "",
      berDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      berItems: [...prev.berItems, newItem]
    }));
  };

  const handleRemoveBerItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      berItems: prev.berItems.filter(item => item.id !== id)
    }));
  };

  const handleUpdateBerItem = (id: string, field: keyof BerItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      berItems: prev.berItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Recommendations Functions
  const handleAddRecommendation = () => {
    const newRecommendation: Recommendation = {
      id: Date.now().toString(),
      srNo: "",
      recommendationDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, newRecommendation]
    }));
  };

  const handleRemoveRecommendation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter(rec => rec.id !== id)
    }));
  };

  const handleUpdateRecommendation = (id: string, field: keyof Recommendation, value: string) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev.recommendations.map(rec =>
        rec.id === id ? { ...rec, [field]: value } : rec
      )
    }));
  };

  // Ventilation Defects Functions
  const handleAddVentilationDefect = () => {
    const newDefect: VentilationDefect = {
      id: Date.now().toString(),
      srNo: "",
      location: "",
      frameStationFrom: "",
      frameStationTo: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      ventilationDefects: [...prev.ventilationDefects, newDefect]
    }));
  };

  const handleRemoveVentilationDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ventilationDefects: prev.ventilationDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateVentilationDefect = (id: string, field: keyof VentilationDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      ventilationDefects: prev.ventilationDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // Ventilation Choking Functions
  const handleAddVentilationChoking = () => {
    const newChoking: VentilationChoking = {
      id: Date.now().toString(),
      srNo: "",
      chokingDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      ventilationChoking: [...prev.ventilationChoking, newChoking]
    }));
  };

  const handleRemoveVentilationChoking = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ventilationChoking: prev.ventilationChoking.filter(choking => choking.id !== id)
    }));
  };

  const handleUpdateVentilationChoking = (id: string, field: keyof VentilationChoking, value: string) => {
    setFormData(prev => ({
      ...prev,
      ventilationChoking: prev.ventilationChoking.map(choking =>
        choking.id === id ? { ...choking, [field]: value } : choking
      )
    }));
  };

  // Fresh Water Defects Functions
  const handleAddFreshWaterDefect = () => {
    const newDefect: FreshWaterDefect = {
      id: Date.now().toString(),
      srNo: "",
      defectDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      freshWaterDefects: [...prev.freshWaterDefects, newDefect]
    }));
  };

  const handleRemoveFreshWaterDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      freshWaterDefects: prev.freshWaterDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateFreshWaterDefect = (id: string, field: keyof FreshWaterDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      freshWaterDefects: prev.freshWaterDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // Sewage Equipment Functions
  const handleAddSewageEquipment = () => {
    const newEquipment: SewageEquipment = {
      id: Date.now().toString(),
      srNo: "",
      equipment: "",
      location: "",
      frameStationFrom: "",
      frameStationTo: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      sewageEquipment: [...prev.sewageEquipment, newEquipment]
    }));
  };

  const handleRemoveSewageEquipment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      sewageEquipment: prev.sewageEquipment.filter(equipment => equipment.id !== id)
    }));
  };

  const handleUpdateSewageEquipment = (id: string, field: keyof SewageEquipment, value: string) => {
    setFormData(prev => ({
      ...prev,
      sewageEquipment: prev.sewageEquipment.map(equipment =>
        equipment.id === id ? { ...equipment, [field]: value } : equipment
      )
    }));
  };

  // Hull Equipment Defects Functions
  const handleAddHullEquipmentDefect = (type: 'anchorDeficiencies' | 'capstanDefects' | 'winchesDefects' | 'craneDefects' | 'hangarShutterDefects' | 'boomDefects' | 'asAberDefects') => {
    const newDefect: HullEquipmentDefect = {
      id: Date.now().toString(),
      srNo: "",
      defectDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), newDefect]
    }));
  };

  const handleRemoveHullEquipmentDefect = (type: 'anchorDeficiencies' | 'capstanDefects' | 'winchesDefects' | 'craneDefects' | 'hangarShutterDefects' | 'boomDefects' | 'asAberDefects', id: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateHullEquipmentDefect = (type: 'anchorDeficiencies' | 'capstanDefects' | 'winchesDefects' | 'craneDefects' | 'hangarShutterDefects' | 'boomDefects' | 'asAberDefects', id: string, field: keyof HullEquipmentDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // Boat Defects Functions
  const handleAddBoatDefect = () => {
    const newDefect: BoatDefect = {
      id: Date.now().toString(),
      srNo: "",
      equipment: "",
      location: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      boatDefects: [...prev.boatDefects, newDefect]
    }));
  };

  const handleRemoveBoatDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      boatDefects: prev.boatDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateBoatDefect = (id: string, field: keyof BoatDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      boatDefects: prev.boatDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData }
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionShipsDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('hullMaintenanceInspectionShipsDrafts', JSON.stringify(updatedDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionShipsDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionShipsDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('hullMaintenanceInspectionShipsDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      inspectionForShips: "",
      dateOfInspection: "",
      noOfOpdefs: "",
      opdefDetails: [],
      hullConcessions: [],
      // 2.1 Machinery Compartments
      machineryPaintScheme: "",
      machineryPaintRenewalDate: "",
      machineryPaintCondition: "",
      machineryBilgesHygiene: "",
      machineryBilgesWaterOil: "",
      machineryRusting: [],
      machineryOtherObservations: [],
      
      // 2.2 Weather Decks
      weatherDeckPaintScheme: "",
      weatherDeckPaintRenewalDate: "",
      weatherDeckPaintCondition: "",
      weatherDeckMaintenanceStandard: "",
      weatherDeckRusting: [],
      
      // 2.3 Helo / Flight Deck
      heloDeckPaintScheme: "",
      heloDeckPaintRenewalDate: "",
      heloDeckPaintCondition: "",
      heloDeckMaintenanceStandard: "",
      heloDeckFrictionTestDate: "",
      heloDeckRusting: [],
      
      // 2.4 Internal compartments
      internalCompartments: [],
      
      // 2.5 Super structure
      superStructure: [],
      
      // 2.6 Deck covering
      deckCoveringPresentScheme: "",
      deckCoveringCracks: [],
      deckCoveringDefects: [],
      edgeConditions: [],
      dadoConditions: [],
      hullSurveyRecord: "",
      hullPotentialMeasurements: "",
      emap: "",
      boatLogBook: "",
      recordOfDefects: "",
      hmpVmpLogBook: "",
      
      // Returns Section
      in378: "",
      quarterlyHullSurvey: "",
      hullPotentialIccp: "",
      boatReturnsHistory: "",
      
      // Miscellaneous Records Section
      policyFile: "",
      mainTops: "",
      in305AnchorChain: "",
      in379DockingForm: "",
      hullSurveyReportYard: "",
      
      // HMP / VMP Section
      hmpVmpRegular: "",
      hmpVmpAdequate: "",
      hmpVmpMainTopsCompliant: "",
      // 4.1 Air Pressure Test of W/T compartments
      aptEquipmentAvailability: "",
      aptCycleCommencingFrom: "",
      compartmentsTested: [],
      compartmentsNotProved: [],
      planForRemaining: [],
      
      // 4.2 Citadel
      citadelTestStatus: "",
      citadelTestType: "",
      citadelTestResults: "",
      citadelAfuRoutines: "",
      citadelAfuRenewal: "",
      
      // 4.3 W/T, G/T Doors/ Hatches /Flaps
      wtGtUldDate: "",
      wtGtDefectiveDoors: "",
      wtGtDefectiveHatches: "",
      wtGtDefectiveFlaps: "",
      wtGtRubberSealsCondition: "",
      wtGtOtherDefects: [],
      wtGtClipsWedgesMaintenance: "",
      wtGtClipsWedgesDefects: [],
      wtGtOtherRemarks: [],
      
      // 4.4 Mushroom Heads
      mushroomHeads: [],
      liftingAppliances: [
        { id: "1", applianceName: "Boat Davits / Derricks and associated fittings", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "2", applianceName: "Single arm Davit", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "3", applianceName: "Fixed radial Davit", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "4", applianceName: "Boat slings", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "5", applianceName: "RAS points including (portable fittings)", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "6", applianceName: "Accommodation Ladder", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "7", applianceName: "Booms", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "8", applianceName: "Ships brow", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "9", applianceName: "Helo deck and Hangar deck rings / eyes", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "10", applianceName: "Helo Landing Grid", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "11", applianceName: "Towing arrangements / towing rope(polypropylene)", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "12", applianceName: "Safety nets", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "13", applianceName: "HO-5 hoisting arrangement", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" },
        { id: "14", applianceName: "Anchor Strop", opsStatus: "", lastLoadTestDate: "", dueLoadTestDate: "", remarks: "" }
      ],
      // 6.1 ICCP system/ Cathodic protection
      iccpOperational: "",
      iccpSetPotential: "",
      iccpReadingPanel: "",
      iccpExternalReading: "",
      iccpLastCalibrationDate: "",
      iccpKnownDefects: "",
      
      // 6.2 Ventilation system
      ventilationOperational: "",
      ventilationDefects: [],
      ventilationAtuOps: "",
      ventilationAtuNonOps: "",
      ventilationAtuRoutines: "",
      ventilationHes: "",
      ventilationChoking: [],
      
      // 6.3 Fresh water systems
      freshWaterOperational: "",
      freshWaterDefects: [],
      
      // 6.4 Sewage treatment plant
      sewageNameMakeType: "",
      sewageOperational: "",
      sewageEquipment: [],
      sewageRoutineManual: "",
      sewageEffluentTest: "",
      
      // 6.5 Pre-wetting system
      preWettingOperational: "",
      preWettingLastOperated: "",
      preWettingDefects: "",
      
      // 6.6 Sanitary system
      sanitaryDefects: "",
      sanitaryChokes: "",
      flushingValves: "",
      obdValves: "",
      // 7.1 Anchor chain cable and associated fittings
      anchorSurveyDetails: "",
      anchorLoadTestDate: "",
      anchorStrop: "",
      blakeSlip: "",
      compressor: "",
      berItems: [],
      anchorDeficiencies: [],
      
      // 7.2 Capstan and Cable Holders
      capstanDefects: [],
      
      // 7.3 Winches
      winchesDefects: [],
      
      // 7.4 Crane
      craneDefects: [],
      
      // 7.5 Hangar Shutter
      hangarShutterDefects: [],
      
      // 7.6 Boom
      boomDefects: [],
      
      // 7.7 A's & A's / ABER
      asAberDefects: [],
      // 8.1 Boats
      boatsAuthorization: "",
      boatsHeldDeficiency: "",
      boatsBer: "",
      boatsLandedRepairs: "",
      boatDefects: [],
      boatsMaintenanceTwoPointLifting: "",
      boatsVisualExaminationHooks: "",
      boatsDpTestAdapter: "",
      boatsPeriodicInspection: "",
      boatsVisualSurveyStrongBack: "",
      
      // 8.2 Life Rafts
      lifeRaftsAuthorization: "",
      lifeRaftsHeldDeficiency: "",
      lifeRaftsBer: "",
      lifeRaftsLandedSurvey: "",
      lifeRaftsStowageArrangements: "",
      lifeRaftsHydrostaticReleasingGear: "",
      livingConditions: "",
      shipsHusbandry: "",
      acDiscipline: "",
      toolsAuthorization: "",
      toolsAuthorizationStatus: "",
      toolsHeld: "",
      toolsRemark: "",
      recommendations: [],
      authoritySignature: null,
    });
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = [
      'inspectionForShips', 'dateOfInspection', 'noOfOpdefs', 'hullSurveyRecord',
      'paintCondition', 'paintThickness', 'paintDefects', 'corrosionLevel', 'corrosionType', 'corrosionLocations'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof HullMaintenanceInspectionforShipsFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Validate date format
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(formData.dateOfInspection)) {
      alert('Please enter date in DD-MM-YYYY format');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDA2NkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SFVMTCBJbnNpZ2h0PC90ZXh0Pgo8L3N2Zz4K" 
              alt="Hull Insight Logo" 
              className="h-16 w-16"
            />
          </div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">HULL INSIGHT</h4>
          <h2 className="text-2xl font-bold text-gray-900">DETAILED REPORT ON ONBOARD HULL MAINTENANCE</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <Label htmlFor="inspectionForShips" className="text-sm font-medium">INSPECTION FOR SHIPS INS: *</Label>
              <Select value={formData.inspectionForShips} onValueChange={(value) => handleInputChange('inspectionForShips', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                  <SelectItem value="pre-docking">Pre-docking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateOfInspection" className="text-sm font-medium">DATE OF INSPECTION: *</Label>
              <Input
                id="dateOfInspection"
                value={formData.dateOfInspection}
                onChange={(e) => handleInputChange('dateOfInspection', e.target.value)}
                placeholder="DD-MM-YYYY"
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* Material State Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Material State (No 01/15)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* 1.1 OPDEFs */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">1.1 OPDEFs:</h4>
                <div className="mb-4">
                  <Label htmlFor="noOfOpdefs" className="text-sm font-medium">(a) No. of OPDEFs Since last inspection*</Label>
                  <Input
                    id="noOfOpdefs"
                    value={formData.noOfOpdefs}
                    onChange={(e) => handleInputChange('noOfOpdefs', e.target.value)}
                    placeholder="Enter number of OPDEFs"
                    className="mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label className="text-sm font-medium">(b) Details of Hull OPDEFs*</Label>
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.opdefDetails.length}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        if (count > formData.opdefDetails.length) {
                          for (let i = formData.opdefDetails.length; i < count; i++) {
                            handleAddOpdefDetail();
                          }
                        } else if (count < formData.opdefDetails.length) {
                          const toRemove = formData.opdefDetails.slice(count);
                          toRemove.forEach(detail => handleRemoveOpdefDetail(detail.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">OPDEF Details</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.opdefDetails.length > 0 ? (
                          formData.opdefDetails.map((detail, index) => (
                            <TableRow key={detail.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={detail.srNo}
                                  onChange={(e) => handleUpdateOpdefDetail(detail.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={detail.opdefDetails}
                                  onChange={(e) => handleUpdateOpdefDetail(detail.id, 'opdefDetails', e.target.value)}
                                  placeholder="Enter OPDEF details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={detail.remarks}
                                  onChange={(e) => handleUpdateOpdefDetail(detail.id, 'remarks', e.target.value)}
                                  placeholder="Enter remarks"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 1.2 Hull Concessions */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">1.2 Hull Concessions*:</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.hullConcessions.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.hullConcessions.length) {
                        for (let i = formData.hullConcessions.length; i < count; i++) {
                          handleAddHullConcession();
                        }
                      } else if (count < formData.hullConcessions.length) {
                        const toRemove = formData.hullConcessions.slice(count);
                        toRemove.forEach(concession => handleRemoveHullConcession(concession.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table className="border border-gray-300">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Hull Concessions</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Location</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Justification</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.hullConcessions.length > 0 ? (
                        formData.hullConcessions.map((concession, index) => (
                          <TableRow key={concession.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.srNo}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.hullConcessions}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'hullConcessions', e.target.value)}
                                placeholder="Enter hull concessions"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.location}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'location', e.target.value)}
                                placeholder="Enter location"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.justification}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'justification', e.target.value)}
                                placeholder="Enter justification"
                                className="border-0 p-1"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                            No rows added yet. Enter number of rows above to add data.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preservation Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Preservation (No 53/16)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 max-h-96 overflow-y-auto">
              {/* Section 2.1: Machinery Compartments */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">2.1 Machinery Compartments</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">(a) Present Paint scheme (NO 53/16): <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.machineryPaintScheme || ""}
                        onChange={(e) => handleInputChange("machineryPaintScheme", e.target.value)}
                        placeholder="Enter paint scheme"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(b) Date of last 100% renewal: <span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.machineryPaintRenewalDate || ""}
                        onChange={(e) => handleInputChange("machineryPaintRenewalDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(c) Present paint condition: <span className="text-red-500">*</span></Label>
                      <Select value={formData.machineryPaintCondition || ""} onValueChange={(value) => handleInputChange("machineryPaintCondition", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(d) General Bilges hygiene: <span className="text-red-500">*</span></Label>
                      <Select value={formData.machineryBilgesHygiene || ""} onValueChange={(value) => handleInputChange("machineryBilgesHygiene", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(e) Presence of water / oil in bilges: <span className="text-red-500">*</span></Label>
                      <Select value={formData.machineryBilgesWaterOil || ""} onValueChange={(value) => handleInputChange("machineryBilgesWaterOil", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="excessive">Excessive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* (f) Rusting / corrosion */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">(f) Rusting / corrosion*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.machineryRusting.length}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          if (count > formData.machineryRusting.length) {
                            for (let i = formData.machineryRusting.length; i < count; i++) {
                              handleAddMachineryRusting();
                            }
                          } else if (count < formData.machineryRusting.length) {
                            const toRemove = formData.machineryRusting.slice(count);
                            toRemove.forEach(item => handleRemoveMachineryRusting(item.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Type*</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.machineryRusting.length > 0 ? (
                            formData.machineryRusting.map((item, index) => (
                              <TableRow key={item.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.srNo}
                                    onChange={(e) => handleUpdateMachineryRusting(item.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.type}
                                    onChange={(e) => handleUpdateMachineryRusting(item.id, 'type', e.target.value)}
                                    placeholder="Enter type"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.location}
                                    onChange={(e) => handleUpdateMachineryRusting(item.id, 'location', e.target.value)}
                                    placeholder="Enter location"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.remarks}
                                    onChange={(e) => handleUpdateMachineryRusting(item.id, 'remarks', e.target.value)}
                                    placeholder="Enter remarks"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* (g) Other observations */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">(g) Other observations*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.machineryOtherObservations.length}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          if (count > formData.machineryOtherObservations.length) {
                            for (let i = formData.machineryOtherObservations.length; i < count; i++) {
                              handleAddMachineryOtherObservation();
                            }
                          } else if (count < formData.machineryOtherObservations.length) {
                            const toRemove = formData.machineryOtherObservations.slice(count);
                            toRemove.forEach(item => handleRemoveMachineryOtherObservation(item.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Observation Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.machineryOtherObservations.length > 0 ? (
                            formData.machineryOtherObservations.map((item, index) => (
                              <TableRow key={item.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.srNo}
                                    onChange={(e) => handleUpdateMachineryOtherObservation(item.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.observationDetails}
                                    onChange={(e) => handleUpdateMachineryOtherObservation(item.id, 'observationDetails', e.target.value)}
                                    placeholder="Enter observation details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2.2: Weather Decks */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">2.2 Weather Decks</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">(a) Present Paint scheme (NO 53/16): <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.weatherDeckPaintScheme || ""}
                        onChange={(e) => handleInputChange("weatherDeckPaintScheme", e.target.value)}
                        placeholder="Enter paint scheme"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(b) Date of last 100% renewal: <span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.weatherDeckPaintRenewalDate || ""}
                        onChange={(e) => handleInputChange("weatherDeckPaintRenewalDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(c) Present paint condition: <span className="text-red-500">*</span></Label>
                      <Select value={formData.weatherDeckPaintCondition || ""} onValueChange={(value) => handleInputChange("weatherDeckPaintCondition", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(d) Maintenance standard: <span className="text-red-500">*</span></Label>
                      <Select value={formData.weatherDeckMaintenanceStandard || ""} onValueChange={(value) => handleInputChange("weatherDeckMaintenanceStandard", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* (e) Rusting / corrosion */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">(e) Rusting / corrosion*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.weatherDeckRusting.length}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          if (count > formData.weatherDeckRusting.length) {
                            for (let i = formData.weatherDeckRusting.length; i < count; i++) {
                              handleAddWeatherDeckRusting();
                            }
                          } else if (count < formData.weatherDeckRusting.length) {
                            const toRemove = formData.weatherDeckRusting.slice(count);
                            toRemove.forEach(item => handleRemoveWeatherDeckRusting(item.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Type*</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.weatherDeckRusting.length > 0 ? (
                            formData.weatherDeckRusting.map((item, index) => (
                              <TableRow key={item.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.srNo}
                                    onChange={(e) => handleUpdateWeatherDeckRusting(item.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.type}
                                    onChange={(e) => handleUpdateWeatherDeckRusting(item.id, 'type', e.target.value)}
                                    placeholder="Enter type"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.location}
                                    onChange={(e) => handleUpdateWeatherDeckRusting(item.id, 'location', e.target.value)}
                                    placeholder="Enter location"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.remarks}
                                    onChange={(e) => handleUpdateWeatherDeckRusting(item.id, 'remarks', e.target.value)}
                                    placeholder="Enter remarks"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2.3: Bulkheads */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">2.3 Helo / Flight Deck</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">(a) Present Paint scheme (NO 53/16): <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.heloDeckPaintScheme || ""}
                        onChange={(e) => handleInputChange("heloDeckPaintScheme", e.target.value)}
                        placeholder="Enter paint scheme"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(b) Date of last 100% renewal: <span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.heloDeckPaintRenewalDate || ""}
                        onChange={(e) => handleInputChange("heloDeckPaintRenewalDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(c) Present paint condition: <span className="text-red-500">*</span></Label>
                      <Select value={formData.heloDeckPaintCondition || ""} onValueChange={(value) => handleInputChange("heloDeckPaintCondition", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(d) Maintenance standard: <span className="text-red-500">*</span></Label>
                      <Select value={formData.heloDeckMaintenanceStandard || ""} onValueChange={(value) => handleInputChange("heloDeckMaintenanceStandard", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(e) Date of last friction test: <span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.heloDeckFrictionTestDate || ""}
                        onChange={(e) => handleInputChange("heloDeckFrictionTestDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  {/* (f) Rusting / corrosion */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">(f) Rusting / corrosion*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.heloDeckRusting.length}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          if (count > formData.heloDeckRusting.length) {
                            for (let i = formData.heloDeckRusting.length; i < count; i++) {
                              handleAddHeloDeckRusting();
                            }
                          } else if (count < formData.heloDeckRusting.length) {
                            const toRemove = formData.heloDeckRusting.slice(count);
                            toRemove.forEach(item => handleRemoveHeloDeckRusting(item.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Type*</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.heloDeckRusting.length > 0 ? (
                            formData.heloDeckRusting.map((item, index) => (
                              <TableRow key={item.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.srNo}
                                    onChange={(e) => handleUpdateHeloDeckRusting(item.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.type}
                                    onChange={(e) => handleUpdateHeloDeckRusting(item.id, 'type', e.target.value)}
                                    placeholder="Enter type"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.location}
                                    onChange={(e) => handleUpdateHeloDeckRusting(item.id, 'location', e.target.value)}
                                    placeholder="Enter location"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={item.remarks}
                                    onChange={(e) => handleUpdateHeloDeckRusting(item.id, 'remarks', e.target.value)}
                                    placeholder="Enter remarks"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2.4: Internal compartments */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">2.4 Internal compartments</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.internalCompartments.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.internalCompartments.length) {
                        for (let i = formData.internalCompartments.length; i < count; i++) {
                          handleAddInternalCompartment();
                        }
                      } else if (count < formData.internalCompartments.length) {
                        const toRemove = formData.internalCompartments.slice(count);
                        toRemove.forEach(item => handleRemoveInternalCompartment(item.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table className="border border-gray-300">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Type*</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.internalCompartments.length > 0 ? (
                        formData.internalCompartments.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.srNo}
                                onChange={(e) => handleUpdateInternalCompartment(item.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.type}
                                onChange={(e) => handleUpdateInternalCompartment(item.id, 'type', e.target.value)}
                                placeholder="Enter type"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.location}
                                onChange={(e) => handleUpdateInternalCompartment(item.id, 'location', e.target.value)}
                                placeholder="Enter location"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.remarks}
                                onChange={(e) => handleUpdateInternalCompartment(item.id, 'remarks', e.target.value)}
                                placeholder="Enter remarks"
                                className="border-0 p-1"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                            No rows added yet. Enter number of rows above to add data.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Section 2.5: Super structure (NO 53/16) */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">2.5 Super structure (NO 53/16)</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.superStructure.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.superStructure.length) {
                        for (let i = formData.superStructure.length; i < count; i++) {
                          handleAddSuperStructure();
                        }
                      } else if (count < formData.superStructure.length) {
                        const toRemove = formData.superStructure.slice(count);
                        toRemove.forEach(item => handleRemoveSuperStructure(item.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table className="border border-gray-300">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Type*</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.superStructure.length > 0 ? (
                        formData.superStructure.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.srNo}
                                onChange={(e) => handleUpdateSuperStructure(item.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.type}
                                onChange={(e) => handleUpdateSuperStructure(item.id, 'type', e.target.value)}
                                placeholder="Enter type"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.location}
                                onChange={(e) => handleUpdateSuperStructure(item.id, 'location', e.target.value)}
                                placeholder="Enter location"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={item.remarks}
                                onChange={(e) => handleUpdateSuperStructure(item.id, 'remarks', e.target.value)}
                                placeholder="Enter remarks"
                                className="border-0 p-1"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                            No rows added yet. Enter number of rows above to add data.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Documentation Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 max-h-96 overflow-y-auto">
              {/* Section 3.1: Documentation */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">3.1 Documentation</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) Record of Hull survey by SS (NO 01/15)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hullSurveyRecord || ""} onValueChange={(value) => handleInputChange("hullSurveyRecord", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(b) Record of Hull potential measurements (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hullPotentialMeasurements || ""} onValueChange={(value) => handleInputChange("hullPotentialMeasurements", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(c) EMAP* <span className="text-red-500">*</span></Label>
                    <Select value={formData.emap || ""} onValueChange={(value) => handleInputChange("emap", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(d) Boat log book (NO 03/18)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.boatLogBook || ""} onValueChange={(value) => handleInputChange("boatLogBook", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(e) Record of defects* <span className="text-red-500">*</span></Label>
                    <Select value={formData.recordOfDefects || ""} onValueChange={(value) => handleInputChange("recordOfDefects", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(f) HMP/VMP log book* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hmpVmpLogBook || ""} onValueChange={(value) => handleInputChange("hmpVmpLogBook", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 3.2: Returns */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">3.2 Returns</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) IN-378 (NO 01/15)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.in378 || ""} onValueChange={(value) => handleInputChange("in378", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(b) Quarterly Hull survey by SS (NO 01/15)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.quarterlyHullSurvey || ""} onValueChange={(value) => handleInputChange("quarterlyHullSurvey", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(c) Hull Potential / ICCP (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hullPotentialIccp || ""} onValueChange={(value) => handleInputChange("hullPotentialIccp", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(d) Boat returns / Boat History sheet (NO 03/18)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.boatReturnsHistory || ""} onValueChange={(value) => handleInputChange("boatReturnsHistory", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 3.3: Miscellaneous Records */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">3.3 Miscellaneous Records</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) Policy file* <span className="text-red-500">*</span></Label>
                    <Select value={formData.policyFile || ""} onValueChange={(value) => handleInputChange("policyFile", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(b) MAINTOPs* <span className="text-red-500">*</span></Label>
                    <Select value={formData.mainTops || ""} onValueChange={(value) => handleInputChange("mainTops", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(c) IN 305 (Anchor chain cable - NO 07/11)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.in305AnchorChain || ""} onValueChange={(value) => handleInputChange("in305AnchorChain", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(d) IN 379 (Docking form)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.in379DockingForm || ""} onValueChange={(value) => handleInputChange("in379DockingForm", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(e) Hull Survey Report by yard* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hullSurveyReportYard || ""} onValueChange={(value) => handleInputChange("hullSurveyReportYard", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 3.4: HMP / VMP */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">3.4 HMP / VMP</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) Regular Yes / No* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hmpVmpRegular || ""} onValueChange={(value) => handleInputChange("hmpVmpRegular", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(b) Whether HMP / VMP Adequate* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hmpVmpAdequate || ""} onValueChange={(value) => handleInputChange("hmpVmpAdequate", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adequate">Adequate</SelectItem>
                        <SelectItem value="not-adequate">Not Adequate</SelectItem>
                        <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(c) Whether Employed IAW MAINTOPs or not* <span className="text-red-500">*</span></Label>
                    <Select value={formData.hmpVmpMainTopsCompliant || ""} onValueChange={(value) => handleInputChange("hmpVmpMainTopsCompliant", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliant">Compliant</SelectItem>
                        <SelectItem value="not-compliant">Not Compliant</SelectItem>
                        <SelectItem value="partially-compliant">Partially Compliant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Water Tight and Gas Tight Integrity Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Water Tight and Gas Tight Integrity (NO 01/15)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 max-h-96 overflow-y-auto">
              {/* Section 4.1: Air Pressure Test of W/T compartments */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">4.1 Air Pressure Test of W/T compartments</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) Availability of APT Equipment* <span className="text-red-500">*</span></Label>
                    <Select value={formData.aptEquipmentAvailability || ""} onValueChange={(value) => handleInputChange("aptEquipmentAvailability", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="under-maintenance">Under Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(b) Cycle (Commencing from)* <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      value={formData.aptCycleCommencingFrom || ""}
                      onChange={(e) => handleInputChange("aptCycleCommencingFrom", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">(c) List of Compartments tested successfully in presence of HITU*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.compartmentsTested?.length || 0}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          const currentLength = formData.compartmentsTested?.length || 0;
                          if (count > currentLength) {
                            for (let i = currentLength; i < count; i++) {
                              handleAddCompartmentTested();
                            }
                          } else if (count < currentLength) {
                            const toRemove = (formData.compartmentsTested || []).slice(count);
                            toRemove.forEach(compartment => handleRemoveCompartmentTested(compartment.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Compartment Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(formData.compartmentsTested?.length || 0) > 0 ? (
                            (formData.compartmentsTested || []).map((compartment, index) => (
                              <TableRow key={compartment.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={compartment.srNo}
                                    onChange={(e) => handleUpdateCompartmentTested(compartment.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={compartment.compartmentDetails}
                                    onChange={(e) => handleUpdateCompartmentTested(compartment.id, 'compartmentDetails', e.target.value)}
                                    placeholder="Enter compartment details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">(d) List of Compartments tested but not proved in present cycle*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.compartmentsNotProved?.length || 0}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          const currentLength = formData.compartmentsNotProved?.length || 0;
                          if (count > currentLength) {
                            for (let i = currentLength; i < count; i++) {
                              handleAddCompartmentNotProved();
                            }
                          } else if (count < currentLength) {
                            const toRemove = (formData.compartmentsNotProved || []).slice(count);
                            toRemove.forEach(compartment => handleRemoveCompartmentNotProved(compartment.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Compartment Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(formData.compartmentsNotProved?.length || 0) > 0 ? (
                            (formData.compartmentsNotProved || []).map((compartment, index) => (
                              <TableRow key={compartment.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={compartment.srNo}
                                    onChange={(e) => handleUpdateCompartmentNotProved(compartment.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={compartment.compartmentDetails}
                                    onChange={(e) => handleUpdateCompartmentNotProved(compartment.id, 'compartmentDetails', e.target.value)}
                                    placeholder="Enter compartment details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">(e) Plan for remaining compts*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.planForRemaining?.length || 0}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          const currentLength = formData.planForRemaining?.length || 0;
                          if (count > currentLength) {
                            for (let i = currentLength; i < count; i++) {
                              handleAddPlanForRemaining();
                            }
                          } else if (count < currentLength) {
                            const toRemove = (formData.planForRemaining || []).slice(count);
                            toRemove.forEach(plan => handleRemovePlanForRemaining(plan.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Plan Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(formData.planForRemaining?.length || 0) > 0 ? (
                            (formData.planForRemaining || []).map((plan, index) => (
                              <TableRow key={plan.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={plan.srNo}
                                    onChange={(e) => handleUpdatePlanForRemaining(plan.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={plan.planDetails}
                                    onChange={(e) => handleUpdatePlanForRemaining(plan.id, 'planDetails', e.target.value)}
                                    placeholder="Enter plan details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4.2: Citadel */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">4.2 Citadel</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) Status of last Citadel test* <span className="text-red-500">*</span></Label>
                    <Input
                      value={formData.citadelTestStatus || ""}
                      onChange={(e) => handleInputChange("citadelTestStatus", e.target.value)}
                      placeholder="Enter status"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(b) Type : Pre refit / Post Refit* <span className="text-red-500">*</span></Label>
                    <Select value={formData.citadelTestType || ""} onValueChange={(value) => handleInputChange("citadelTestType", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-refit">Pre Refit</SelectItem>
                        <SelectItem value="post-refit">Post Refit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(c) Results of Citadel test* <span className="text-red-500">*</span></Label>
                    <Select value={formData.citadelTestResults || ""} onValueChange={(value) => handleInputChange("citadelTestResults", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passed">Passed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="conditional">Conditional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(d) Routines on AFU* <span className="text-red-500">*</span></Label>
                    <Input
                      value={formData.citadelAfuRoutines || ""}
                      onChange={(e) => handleInputChange("citadelAfuRoutines", e.target.value)}
                      placeholder="Enter AFU routines"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(e) Whether AFU due for renewal* <span className="text-red-500">*</span></Label>
                    <Select value={formData.citadelAfuRenewal || ""} onValueChange={(value) => handleInputChange("citadelAfuRenewal", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 4.3: W/T, G/T Doors/ Hatches /Flaps */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">4.3 W/T, G/T Doors/ Hatches /Flaps</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">(a) Date of ULD* <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      value={formData.wtGtUldDate || ""}
                      onChange={(e) => handleInputChange("wtGtUldDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">(b) No of defective doors* <span className="text-red-500">*</span></Label>
                      <Input
                        type="number"
                        value={formData.wtGtDefectiveDoors || ""}
                        onChange={(e) => handleInputChange("wtGtDefectiveDoors", e.target.value)}
                        placeholder="Enter number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(c) No of defective hatches* <span className="text-red-500">*</span></Label>
                      <Input
                        type="number"
                        value={formData.wtGtDefectiveHatches || ""}
                        onChange={(e) => handleInputChange("wtGtDefectiveHatches", e.target.value)}
                        placeholder="Enter number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">(d) No of defective flaps* <span className="text-red-500">*</span></Label>
                      <Input
                        type="number"
                        value={formData.wtGtDefectiveFlaps || ""}
                        onChange={(e) => handleInputChange("wtGtDefectiveFlaps", e.target.value)}
                        placeholder="Enter number"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(e) Condition of rubber seals(visual)* <span className="text-red-500">*</span></Label>
                    <Select value={formData.wtGtRubberSealsCondition || ""} onValueChange={(value) => handleInputChange("wtGtRubberSealsCondition", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="needs-replacement">Needs Replacement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">(f) Other defects*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.wtGtOtherDefects?.length || 0}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          const currentLength = formData.wtGtOtherDefects?.length || 0;
                          if (count > currentLength) {
                            for (let i = currentLength; i < count; i++) {
                              handleAddWtGtOtherDefect();
                            }
                          } else if (count < currentLength) {
                            const toRemove = (formData.wtGtOtherDefects || []).slice(count);
                            toRemove.forEach(defect => handleRemoveWtGtOtherDefect(defect.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(formData.wtGtOtherDefects?.length || 0) > 0 ? (
                            (formData.wtGtOtherDefects || []).map((defect, index) => (
                              <TableRow key={defect.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={defect.srNo}
                                    onChange={(e) => handleUpdateWtGtOtherDefect(defect.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={defect.defectDetails}
                                    onChange={(e) => handleUpdateWtGtOtherDefect(defect.id, 'defectDetails', e.target.value)}
                                    placeholder="Enter defect details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">(g) Maintenance of clips / wedges* <span className="text-red-500">*</span></Label>
                    <Select value={formData.wtGtClipsWedgesMaintenance || ""} onValueChange={(value) => handleInputChange("wtGtClipsWedgesMaintenance", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="needs-attention">Needs Attention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">(h) Defects on clips/wedges*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.wtGtClipsWedgesDefects?.length || 0}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          const currentLength = formData.wtGtClipsWedgesDefects?.length || 0;
                          if (count > currentLength) {
                            for (let i = currentLength; i < count; i++) {
                              handleAddWtGtClipWedgeDefect();
                            }
                          } else if (count < currentLength) {
                            const toRemove = (formData.wtGtClipsWedgesDefects || []).slice(count);
                            toRemove.forEach(defect => handleRemoveWtGtClipWedgeDefect(defect.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(formData.wtGtClipsWedgesDefects?.length || 0) > 0 ? (
                            (formData.wtGtClipsWedgesDefects || []).map((defect, index) => (
                              <TableRow key={defect.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={defect.srNo}
                                    onChange={(e) => handleUpdateWtGtClipWedgeDefect(defect.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={defect.defectDetails}
                                    onChange={(e) => handleUpdateWtGtClipWedgeDefect(defect.id, 'defectDetails', e.target.value)}
                                    placeholder="Enter defect details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">(j) Other remarks*</h5>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">Enter Total Number of Rows.</Label>
                      <Input
                        type="number"
                        value={formData.wtGtOtherRemarks?.length || 0}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 0;
                          const currentLength = formData.wtGtOtherRemarks?.length || 0;
                          if (count > currentLength) {
                            for (let i = currentLength; i < count; i++) {
                              handleAddWtGtOtherRemark();
                            }
                          } else if (count < currentLength) {
                            const toRemove = (formData.wtGtOtherRemarks || []).slice(count);
                            toRemove.forEach(remark => handleRemoveWtGtOtherRemark(remark.id));
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Remark Details*</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(formData.wtGtOtherRemarks?.length || 0) > 0 ? (
                            (formData.wtGtOtherRemarks || []).map((remark, index) => (
                              <TableRow key={remark.id}>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={remark.srNo}
                                    onChange={(e) => handleUpdateWtGtOtherRemark(remark.id, 'srNo', e.target.value)}
                                    placeholder={`(${String.fromCharCode(97 + index)})`}
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                                <TableCell className="border border-gray-300 p-2">
                                  <Input
                                    value={remark.remarkDetails}
                                    onChange={(e) => handleUpdateWtGtOtherRemark(remark.id, 'remarkDetails', e.target.value)}
                                    placeholder="Enter remark details"
                                    className="border-0 p-1"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                                No rows added yet. Enter number of rows above to add data.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4.4: Mushroom Heads */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800 bg-blue-100 p-2 rounded">4.4 Mushroom Heads</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.mushroomHeads?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.mushroomHeads?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddMushroomHead();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.mushroomHeads || []).slice(count);
                          toRemove.forEach(head => handleRemoveMushroomHead(head.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Type*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Frame Station*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                        </TableRow>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium"></TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium"></TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium"></TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">From</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.mushroomHeads?.length || 0) > 0 ? (
                          (formData.mushroomHeads || []).map((head, index) => (
                            <TableRow key={head.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={head.srNo}
                                  onChange={(e) => handleUpdateMushroomHead(head.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={head.location}
                                  onChange={(e) => handleUpdateMushroomHead(head.id, 'location', e.target.value)}
                                  placeholder="Enter location"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={head.type}
                                  onChange={(e) => handleUpdateMushroomHead(head.id, 'type', e.target.value)}
                                  placeholder="Enter type"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={head.frameStationFrom}
                                  onChange={(e) => handleUpdateMushroomHead(head.id, 'frameStationFrom', e.target.value)}
                                  placeholder="From"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={head.frameStationTo}
                                  onChange={(e) => handleUpdateMushroomHead(head.id, 'frameStationTo', e.target.value)}
                                  placeholder="To"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={head.remarks}
                                  onChange={(e) => handleUpdateMushroomHead(head.id, 'remarks', e.target.value)}
                                  placeholder="Enter remarks"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5.0 Operational state, last date of Load test details and known defects */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Lifting Appliances</CardTitle>
            </CardHeader>
            <CardContent className="p-6 max-h-96 overflow-y-auto">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="border border-gray-300 text-center font-medium">OPS/Non-OPS</TableHead>
                      <TableHead className="border border-gray-300 text-center font-medium">Last Load Test Date</TableHead>
                      <TableHead className="border border-gray-300 text-center font-medium">Due Load Test Date</TableHead>
                      <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.liftingAppliances.map((appliance, index) => (
                      <TableRow key={appliance.id}>
                        <TableCell className="border border-gray-300 p-2">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">{appliance.applianceName}*</Label>
                            <Select 
                              value={appliance.opsStatus} 
                              onValueChange={(value) => handleUpdateLiftingAppliance(appliance.id, 'opsStatus', value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="--Select--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="OPS">OPS</SelectItem>
                                <SelectItem value="Non-OPS">Non-OPS</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell className="border border-gray-300 p-2">
                          <Input
                            type="text"
                            value={appliance.lastLoadTestDate}
                            onChange={(e) => handleUpdateLiftingAppliance(appliance.id, 'lastLoadTestDate', e.target.value)}
                            placeholder="DD-MM-YYYY"
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="border border-gray-300 p-2">
                          <Input
                            type="text"
                            value={appliance.dueLoadTestDate}
                            onChange={(e) => handleUpdateLiftingAppliance(appliance.id, 'dueLoadTestDate', e.target.value)}
                            placeholder="DD-MM-YYYY"
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="border border-gray-300 p-2">
                          <Input
                            type="text"
                            value={appliance.remarks}
                            onChange={(e) => handleUpdateLiftingAppliance(appliance.id, 'remarks', e.target.value)}
                            placeholder="Enter remarks"
                            className="w-full"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Systems Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 max-h-96 overflow-y-auto">
              
              {/* 6.1 ICCP system/ Cathodic protection */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">6.1 ICCP system/ Cathodic protection (NO 06/11 and NHQ Policy letter NC/ Policy/ H-77 dated 02 Mar 15)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="iccpOperational" className="text-sm font-medium">(a) Operational / Non operational*</Label>
                    <Select value={formData.iccpOperational} onValueChange={(value) => handleInputChange('iccpOperational', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="iccpSetPotential" className="text-sm font-medium">(b) Set potential wrt Zinc RE*</Label>
                    <Input
                      id="iccpSetPotential"
                      value={formData.iccpSetPotential}
                      onChange={(e) => handleInputChange('iccpSetPotential', e.target.value)}
                      placeholder="Enter set potential"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iccpReadingPanel" className="text-sm font-medium">(c) Reading in panel wrt Zinc RE*</Label>
                    <Input
                      id="iccpReadingPanel"
                      value={formData.iccpReadingPanel}
                      onChange={(e) => handleInputChange('iccpReadingPanel', e.target.value)}
                      placeholder="Enter panel reading"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iccpExternalReading" className="text-sm font-medium">(d) External Reading wrt portable Zinc RE*</Label>
                    <Input
                      id="iccpExternalReading"
                      value={formData.iccpExternalReading}
                      onChange={(e) => handleInputChange('iccpExternalReading', e.target.value)}
                      placeholder="Enter external reading"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iccpLastCalibrationDate" className="text-sm font-medium">(e) Last calibration date for Zinc RE*</Label>
                    <Input
                      id="iccpLastCalibrationDate"
                      value={formData.iccpLastCalibrationDate}
                      onChange={(e) => handleInputChange('iccpLastCalibrationDate', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iccpKnownDefects" className="text-sm font-medium">(f) Known defects of ICCP system if any*</Label>
                    <Textarea
                      id="iccpKnownDefects"
                      value={formData.iccpKnownDefects}
                      onChange={(e) => handleInputChange('iccpKnownDefects', e.target.value)}
                      placeholder="Enter known defects..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>

              {/* 6.2 Ventilation system */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">6.2 Ventilation system</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ventilationOperational" className="text-sm font-medium">(a) Operational / Non operational*</Label>
                    <Select value={formData.ventilationOperational} onValueChange={(value) => handleInputChange('ventilationOperational', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ventilationAtuOps" className="text-sm font-medium">(c) State of ATU Ops*</Label>
                    <Input
                      id="ventilationAtuOps"
                      value={formData.ventilationAtuOps}
                      onChange={(e) => handleInputChange('ventilationAtuOps', e.target.value)}
                      placeholder="Enter ATU Ops state"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ventilationAtuNonOps" className="text-sm font-medium">(d) State of ATU Non ops*</Label>
                    <Input
                      id="ventilationAtuNonOps"
                      value={formData.ventilationAtuNonOps}
                      onChange={(e) => handleInputChange('ventilationAtuNonOps', e.target.value)}
                      placeholder="Enter ATU Non ops state"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ventilationAtuRoutines" className="text-sm font-medium">(e) ATU Routines*</Label>
                    <Input
                      id="ventilationAtuRoutines"
                      value={formData.ventilationAtuRoutines}
                      onChange={(e) => handleInputChange('ventilationAtuRoutines', e.target.value)}
                      placeholder="Enter ATU routines"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ventilationHes" className="text-sm font-medium">(f) State of HEs*</Label>
                    <Input
                      id="ventilationHes"
                      value={formData.ventilationHes}
                      onChange={(e) => handleInputChange('ventilationHes', e.target.value)}
                      placeholder="Enter HEs state"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                {/* Ventilation Defects Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(b) Details of defects*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.ventilationDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.ventilationDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddVentilationDefect();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.ventilationDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveVentilationDefect(defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Frame Station*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.ventilationDefects?.length || 0) > 0 ? (
                          (formData.ventilationDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateVentilationDefect(defect.id, 'srNo', e.target.value)}
                                  placeholder="Enter Sr No."
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.location}
                                  onChange={(e) => handleUpdateVentilationDefect(defect.id, 'location', e.target.value)}
                                  placeholder="Enter location"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <div className="flex gap-1">
                                  <Input
                                    value={defect.frameStationFrom}
                                    onChange={(e) => handleUpdateVentilationDefect(defect.id, 'frameStationFrom', e.target.value)}
                                    placeholder="From"
                                    className="border-0 p-1"
                                  />
                                  <Input
                                    value={defect.frameStationTo}
                                    onChange={(e) => handleUpdateVentilationDefect(defect.id, 'frameStationTo', e.target.value)}
                                    placeholder="To"
                                    className="border-0 p-1"
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.remarks}
                                  onChange={(e) => handleUpdateVentilationDefect(defect.id, 'remarks', e.target.value)}
                                  placeholder="Enter remarks"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Ventilation Choking Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(g) Choking of trunkings if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.ventilationChoking?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.ventilationChoking?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddVentilationChoking();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.ventilationChoking || []).slice(count);
                          toRemove.forEach(choking => handleRemoveVentilationChoking(choking.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Choking Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.ventilationChoking?.length || 0) > 0 ? (
                          (formData.ventilationChoking || []).map((choking, index) => (
                            <TableRow key={choking.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={choking.srNo}
                                  onChange={(e) => handleUpdateVentilationChoking(choking.id, 'srNo', e.target.value)}
                                  placeholder="Enter Sr No."
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={choking.chokingDetails}
                                  onChange={(e) => handleUpdateVentilationChoking(choking.id, 'chokingDetails', e.target.value)}
                                  placeholder="Enter choking details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 6.3 Fresh water systems */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">6.3 Fresh water systems</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="freshWaterOperational" className="text-sm font-medium">(a) Operational / Non operational*</Label>
                    <Select value={formData.freshWaterOperational} onValueChange={(value) => handleInputChange('freshWaterOperational', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Fresh Water Defects Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(b) Details of defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.freshWaterDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.freshWaterDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddFreshWaterDefect();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.freshWaterDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveFreshWaterDefect(defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.freshWaterDefects?.length || 0) > 0 ? (
                          (formData.freshWaterDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateFreshWaterDefect(defect.id, 'srNo', e.target.value)}
                                  placeholder="Enter Sr No."
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateFreshWaterDefect(defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 6.4 Sewage treatment plant */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">6.4 Sewage treatment plant</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sewageNameMakeType" className="text-sm font-medium">(a) Name / make / type*</Label>
                    <Input
                      id="sewageNameMakeType"
                      value={formData.sewageNameMakeType}
                      onChange={(e) => handleInputChange('sewageNameMakeType', e.target.value)}
                      placeholder="Enter name/make/type"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sewageOperational" className="text-sm font-medium">(b) Operational / Non Operational*</Label>
                    <Select value={formData.sewageOperational} onValueChange={(value) => handleInputChange('sewageOperational', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sewageRoutineManual" className="text-sm font-medium">(d) Whether Routine undertaken IAW manual*</Label>
                    <Select value={formData.sewageRoutineManual} onValueChange={(value) => handleInputChange('sewageRoutineManual', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sewageEffluentTest" className="text-sm font-medium">(e) Details of last effluent test and result*</Label>
                    <Select value={formData.sewageEffluentTest} onValueChange={(value) => handleInputChange('sewageEffluentTest', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pass">Pass</SelectItem>
                        <SelectItem value="Fail">Fail</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Sewage Equipment Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(c) Details of defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.sewageEquipment?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.sewageEquipment?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddSewageEquipment();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.sewageEquipment || []).slice(count);
                          toRemove.forEach(equipment => handleRemoveSewageEquipment(equipment.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Equipment*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Frame Station*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.sewageEquipment?.length || 0) > 0 ? (
                          (formData.sewageEquipment || []).map((equipment, index) => (
                            <TableRow key={equipment.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={equipment.srNo}
                                  onChange={(e) => handleUpdateSewageEquipment(equipment.id, 'srNo', e.target.value)}
                                  placeholder="Enter Sr No."
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={equipment.equipment}
                                  onChange={(e) => handleUpdateSewageEquipment(equipment.id, 'equipment', e.target.value)}
                                  placeholder="Enter equipment"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={equipment.location}
                                  onChange={(e) => handleUpdateSewageEquipment(equipment.id, 'location', e.target.value)}
                                  placeholder="Enter location"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <div className="flex gap-1">
                                  <Input
                                    value={equipment.frameStationFrom}
                                    onChange={(e) => handleUpdateSewageEquipment(equipment.id, 'frameStationFrom', e.target.value)}
                                    placeholder="From"
                                    className="border-0 p-1"
                                  />
                                  <Input
                                    value={equipment.frameStationTo}
                                    onChange={(e) => handleUpdateSewageEquipment(equipment.id, 'frameStationTo', e.target.value)}
                                    placeholder="To"
                                    className="border-0 p-1"
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={equipment.remarks}
                                  onChange={(e) => handleUpdateSewageEquipment(equipment.id, 'remarks', e.target.value)}
                                  placeholder="Enter remarks"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 6.5 Pre-wetting system */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">6.5 Pre-wetting system</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preWettingOperational" className="text-sm font-medium">(a) Operational / Non operational*</Label>
                    <Select value={formData.preWettingOperational} onValueChange={(value) => handleInputChange('preWettingOperational', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preWettingLastOperated" className="text-sm font-medium">(b) Date last operated*</Label>
                    <Input
                      id="preWettingLastOperated"
                      value={formData.preWettingLastOperated}
                      onChange={(e) => handleInputChange('preWettingLastOperated', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="preWettingDefects" className="text-sm font-medium">(c) Details of defects if any*</Label>
                    <Textarea
                      id="preWettingDefects"
                      value={formData.preWettingDefects}
                      onChange={(e) => handleInputChange('preWettingDefects', e.target.value)}
                      placeholder="Enter defects details..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>

              {/* 6.6 Sanitary system */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">6.6 Sanitary system</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sanitaryDefects" className="text-sm font-medium">(a) Defects if any*</Label>
                    <Textarea
                      id="sanitaryDefects"
                      value={formData.sanitaryDefects}
                      onChange={(e) => handleInputChange('sanitaryDefects', e.target.value)}
                      placeholder="Enter sanitary defects..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sanitaryChokes" className="text-sm font-medium">(b) Chokes if any*</Label>
                    <Textarea
                      id="sanitaryChokes"
                      value={formData.sanitaryChokes}
                      onChange={(e) => handleInputChange('sanitaryChokes', e.target.value)}
                      placeholder="Enter chokes details..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flushingValves" className="text-sm font-medium">(c) State of flushing valves*</Label>
                    <Textarea
                      id="flushingValves"
                      value={formData.flushingValves}
                      onChange={(e) => handleInputChange('flushingValves', e.target.value)}
                      placeholder="Enter flushing valves state..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="obdValves" className="text-sm font-medium">(d) State of OBD valves*</Label>
                    <Textarea
                      id="obdValves"
                      value={formData.obdValves}
                      onChange={(e) => handleInputChange('obdValves', e.target.value)}
                      placeholder="Enter OBD valves state..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hull Equipment Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Hull Equipment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 max-h-96 overflow-y-auto">
              
              {/* 7.1 Anchor chain cable and associated fittings */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.1 Anchor chain cable and associated fittings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="anchorSurveyDetails" className="text-sm font-medium">(a) Last survey details (NO 07/11)*</Label>
                    <Input
                      id="anchorSurveyDetails"
                      value={formData.anchorSurveyDetails}
                      onChange={(e) => handleInputChange('anchorSurveyDetails', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="anchorLoadTestDate" className="text-sm font-medium">(b) Date of Load test*</Label>
                    <Input
                      id="anchorLoadTestDate"
                      value={formData.anchorLoadTestDate}
                      onChange={(e) => handleInputChange('anchorLoadTestDate', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="anchorStrop" className="text-sm font-medium">(ii) Anchor Strop*</Label>
                    <Select value={formData.anchorStrop} onValueChange={(value) => handleInputChange('anchorStrop', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="blakeSlip" className="text-sm font-medium">(iii) Blake Slip*</Label>
                    <Select value={formData.blakeSlip} onValueChange={(value) => handleInputChange('blakeSlip', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="compressor" className="text-sm font-medium">(iv) Compressor*</Label>
                    <Select value={formData.compressor} onValueChange={(value) => handleInputChange('compressor', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* BER Items Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(c) BER items if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.berItems?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.berItems?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddBerItem();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.berItems || []).slice(count);
                          toRemove.forEach(item => handleRemoveBerItem(item.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">BER Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.berItems?.length || 0) > 0 ? (
                          (formData.berItems || []).map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={item.srNo}
                                  onChange={(e) => handleUpdateBerItem(item.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={item.berDetails}
                                  onChange={(e) => handleUpdateBerItem(item.id, 'berDetails', e.target.value)}
                                  placeholder="Enter BER details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Anchor Deficiencies Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(d) Deficiency if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.anchorDeficiencies?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.anchorDeficiencies?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('anchorDeficiencies');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.anchorDeficiencies || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('anchorDeficiencies', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Deficiency Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.anchorDeficiencies?.length || 0) > 0 ? (
                          (formData.anchorDeficiencies || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('anchorDeficiencies', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('anchorDeficiencies', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter deficiency details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 7.2 Capstan and Cable Holders */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.2 Capstan and Cable Holders</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.capstanDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.capstanDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('capstanDefects');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.capstanDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('capstanDefects', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.capstanDefects?.length || 0) > 0 ? (
                          (formData.capstanDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('capstanDefects', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('capstanDefects', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 7.3 Winches */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.3 Winches</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.winchesDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.winchesDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('winchesDefects');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.winchesDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('winchesDefects', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.winchesDefects?.length || 0) > 0 ? (
                          (formData.winchesDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('winchesDefects', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('winchesDefects', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 7.4 Crane */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.4 Crane</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.craneDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.craneDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('craneDefects');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.craneDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('craneDefects', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.craneDefects?.length || 0) > 0 ? (
                          (formData.craneDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('craneDefects', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('craneDefects', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 7.5 Hangar Shutter */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.5 Hangar Shutter</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.hangarShutterDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.hangarShutterDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('hangarShutterDefects');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.hangarShutterDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('hangarShutterDefects', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.hangarShutterDefects?.length || 0) > 0 ? (
                          (formData.hangarShutterDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('hangarShutterDefects', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('hangarShutterDefects', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 7.6 Boom */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.6 Boom</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.boomDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.boomDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('boomDefects');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.boomDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('boomDefects', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.boomDefects?.length || 0) > 0 ? (
                          (formData.boomDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('boomDefects', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('boomDefects', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 7.7 A's & A's / ABER */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">7.7 A's & A's / ABER</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.asAberDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.asAberDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddHullEquipmentDefect('asAberDefects');
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.asAberDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveHullEquipmentDefect('asAberDefects', defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.asAberDefects?.length || 0) > 0 ? (
                          (formData.asAberDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('asAberDefects', defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.defectDetails}
                                  onChange={(e) => handleUpdateHullEquipmentDefect('asAberDefects', defect.id, 'defectDetails', e.target.value)}
                                  placeholder="Enter defect details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Life Saving Appliances Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Life Saving Appliances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 max-h-96 overflow-y-auto">
              
              {/* 8.1 Boats */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">8.1 Boats</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="boatsAuthorization" className="text-sm font-medium">(a) Authorisation*</Label>
                    <Input
                      id="boatsAuthorization"
                      value={formData.boatsAuthorization}
                      onChange={(e) => handleInputChange('boatsAuthorization', e.target.value)}
                      placeholder="Enter authorization"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="boatsHeldDeficiency" className="text-sm font-medium">(b) Held / Deficiency on board*</Label>
                    <Input
                      id="boatsHeldDeficiency"
                      value={formData.boatsHeldDeficiency}
                      onChange={(e) => handleInputChange('boatsHeldDeficiency', e.target.value)}
                      placeholder="Enter held/deficiency"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="boatsBer" className="text-sm font-medium">(c) BER*</Label>
                    <Input
                      id="boatsBer"
                      value={formData.boatsBer}
                      onChange={(e) => handleInputChange('boatsBer', e.target.value)}
                      placeholder="Enter BER"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="boatsLandedRepairs" className="text-sm font-medium">(d) Landed for repairs*</Label>
                    <Input
                      id="boatsLandedRepairs"
                      value={formData.boatsLandedRepairs}
                      onChange={(e) => handleInputChange('boatsLandedRepairs', e.target.value)}
                      placeholder="Enter landed for repairs"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                {/* Boat Defects Table */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium mb-2">(e) Defects if any*</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.boatDefects?.length || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const currentLength = formData.boatDefects?.length || 0;
                        if (count > currentLength) {
                          for (let i = currentLength; i < count; i++) {
                            handleAddBoatDefect();
                          }
                        } else if (count < currentLength) {
                          const toRemove = (formData.boatDefects || []).slice(count);
                          toRemove.forEach(defect => handleRemoveBoatDefect(defect.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Equipment*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(formData.boatDefects?.length || 0) > 0 ? (
                          (formData.boatDefects || []).map((defect, index) => (
                            <TableRow key={defect.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.srNo}
                                  onChange={(e) => handleUpdateBoatDefect(defect.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.equipment}
                                  onChange={(e) => handleUpdateBoatDefect(defect.id, 'equipment', e.target.value)}
                                  placeholder="Enter equipment"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.location}
                                  onChange={(e) => handleUpdateBoatDefect(defect.id, 'location', e.target.value)}
                                  placeholder="Enter location"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={defect.remarks}
                                  onChange={(e) => handleUpdateBoatDefect(defect.id, 'remarks', e.target.value)}
                                  placeholder="Enter remarks"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                              No rows added yet. Enter number of rows above to add data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Maintenance of two point lifting hooks */}
                <div className="space-y-4">
                  <h5 className="text-sm font-medium mb-2">(f) Maintenance of two point lifting hooks of Survey Motor Boats. (NO 03/18 refers) (Only For Survey Motor Boats)*</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="boatsMaintenanceTwoPointLifting" className="text-sm font-medium">Maintenance Status*</Label>
                      <Select value={formData.boatsMaintenanceTwoPointLifting} onValueChange={(value) => handleInputChange('boatsMaintenanceTwoPointLifting', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="Unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="boatsVisualExaminationHooks" className="text-sm font-medium">(i) Visual examination of Forward and aft lifting hooks arrangement*</Label>
                      <Select value={formData.boatsVisualExaminationHooks} onValueChange={(value) => handleInputChange('boatsVisualExaminationHooks', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="Unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="boatsDpTestAdapter" className="text-sm font-medium">(ii) DP test of adapter piece between the hook and the base plate being carried out annually by refitting authority.*</Label>
                      <Select value={formData.boatsDpTestAdapter} onValueChange={(value) => handleInputChange('boatsDpTestAdapter', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="boatsPeriodicInspection" className="text-sm font-medium">(iii) Periodic Inspection and maintenance / testing of lifting hook arrangement as stipulated MAINTOP MT- 17023 is carried out by SS.*</Label>
                      <Select value={formData.boatsPeriodicInspection} onValueChange={(value) => handleInputChange('boatsPeriodicInspection', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="boatsVisualSurveyStrongBack" className="text-sm font-medium">(iv) Visual survey of strong back area of hooks, connecting rods, adapter plate, securing bolts, weld joints and GRP Laminate around it.*</Label>
                      <Select value={formData.boatsVisualSurveyStrongBack} onValueChange={(value) => handleInputChange('boatsVisualSurveyStrongBack', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="Unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8.2 Life Rafts */}
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-4 text-gray-800">8.2 Life Rafts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lifeRaftsAuthorization" className="text-sm font-medium">(a) Authorisation*</Label>
                    <Input
                      id="lifeRaftsAuthorization"
                      value={formData.lifeRaftsAuthorization}
                      onChange={(e) => handleInputChange('lifeRaftsAuthorization', e.target.value)}
                      placeholder="Enter authorization"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsHeldDeficiency" className="text-sm font-medium">(b) Held / deficiency*</Label>
                    <Input
                      id="lifeRaftsHeldDeficiency"
                      value={formData.lifeRaftsHeldDeficiency}
                      onChange={(e) => handleInputChange('lifeRaftsHeldDeficiency', e.target.value)}
                      placeholder="Enter held/deficiency"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsBer" className="text-sm font-medium">(c) BER*</Label>
                    <Input
                      id="lifeRaftsBer"
                      value={formData.lifeRaftsBer}
                      onChange={(e) => handleInputChange('lifeRaftsBer', e.target.value)}
                      placeholder="Enter BER"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsLandedSurvey" className="text-sm font-medium">(d) Landed for survey*</Label>
                    <Input
                      id="lifeRaftsLandedSurvey"
                      value={formData.lifeRaftsLandedSurvey}
                      onChange={(e) => handleInputChange('lifeRaftsLandedSurvey', e.target.value)}
                      placeholder="Enter landed for survey"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsStowageArrangements" className="text-sm font-medium">(e) Stowage arrangements*</Label>
                    <Input
                      id="lifeRaftsStowageArrangements"
                      value={formData.lifeRaftsStowageArrangements}
                      onChange={(e) => handleInputChange('lifeRaftsStowageArrangements', e.target.value)}
                      placeholder="Enter stowage arrangements"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsHydrostaticReleasingGear" className="text-sm font-medium">(f) Hydrostatic releasing gear*</Label>
                    <Input
                      id="lifeRaftsHydrostaticReleasingGear"
                      value={formData.lifeRaftsHydrostaticReleasingGear}
                      onChange={(e) => handleInputChange('lifeRaftsHydrostaticReleasingGear', e.target.value)}
                      placeholder="Enter hydrostatic releasing gear"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habitability Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Habitability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label htmlFor="livingConditions" className="text-sm font-medium">9.1 Living conditions*</Label>
                <Select value={formData.livingConditions} onValueChange={(value) => handleInputChange('livingConditions', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shipsHusbandry" className="text-sm font-medium">9.2 Ships husbandry*</Label>
                <Select value={formData.shipsHusbandry} onValueChange={(value) => handleInputChange('shipsHusbandry', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="acDiscipline" className="text-sm font-medium">9.3 A/C discipline*</Label>
                <Select value={formData.acDiscipline} onValueChange={(value) => handleInputChange('acDiscipline', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Ships Husbandry Tools Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Ships Husbandry tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label htmlFor="toolsAuthorization" className="text-sm font-medium">10.1 Authorisation of tools (NHQ policy letter NC/Policy/H-08/ Equipment dated 22 Aug 12 or amended vide*</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="toolsAuthorization"
                    value={formData.toolsAuthorization}
                    onChange={(e) => handleInputChange('toolsAuthorization', e.target.value)}
                    placeholder="Enter authorization details"
                    className="flex-1"
                  />
                  <Select value={formData.toolsAuthorizationStatus} onValueChange={(value) => handleInputChange('toolsAuthorizationStatus', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="-Select-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="toolsHeld" className="text-sm font-medium">10.2 Held as per Authorisation*</Label>
                <Select value={formData.toolsHeld} onValueChange={(value) => handleInputChange('toolsHeld', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="toolsRemark" className="text-sm font-medium">10.3 Remark if any*</Label>
                <Input
                  id="toolsRemark"
                  value={formData.toolsRemark}
                  onChange={(e) => handleInputChange('toolsRemark', e.target.value)}
                  placeholder="Enter remarks"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label className="text-sm font-medium">11.1 SS Recommendations:-*</Label>
                <div className="flex items-center gap-2 mb-2 mt-1">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.recommendations.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.recommendations.length) {
                        for (let i = formData.recommendations.length; i < count; i++) {
                          handleAddRecommendation();
                        }
                      } else if (count < formData.recommendations.length) {
                        const toRemove = formData.recommendations.slice(count);
                        toRemove.forEach(rec => handleRemoveRecommendation(rec.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table className="border border-gray-300">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Recommendation Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.recommendations.length > 0 ? (
                        formData.recommendations.map((rec, index) => (
                          <TableRow key={rec.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={rec.srNo}
                                onChange={(e) => handleUpdateRecommendation(rec.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Textarea
                                value={rec.recommendationDetails}
                                onChange={(e) => handleUpdateRecommendation(rec.id, 'recommendationDetails', e.target.value)}
                                placeholder="Enter recommendation details"
                                className="border-0 p-1 min-h-[60px]"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} className="border border-gray-300 p-4 text-center text-gray-500">
                            No rows added yet. Enter number of rows above to add data.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authority Signature Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Authority Signature</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="authoritySignature" className="text-sm font-medium">Authority Signature: <span className="text-red-500">*</span></Label>
                <Input
                  id="authoritySignature"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, JPEG, PNG (Max 2MB)</p>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button
              type="button"
              onClick={handleFetchDrafts}
              className="px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold uppercase"
            >
              FETCH DRAFTS
            </Button>
            <Button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
            >
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

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Saved Drafts</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Inspection Type</TableHead>
                    <TableHead>Inspection Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft) => (
                    <TableRow key={draft.id}>
                      <TableCell>{new Date(draft.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{draft.formData.inspectionForShips}</TableCell>
                      <TableCell>{draft.formData.dateOfInspection}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditDraft(draft)}
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDeleteDraft(draft.id)}
                            variant="destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HullMaintenanceInspectionforShipsForm;