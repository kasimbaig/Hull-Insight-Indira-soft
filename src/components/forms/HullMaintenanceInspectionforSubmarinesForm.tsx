import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LeakageDetail {
  id: string;
  location: string;
  observation: string;
  remarks: string;
}

interface KnownDefect {
  id: string;
  location: string;
  observation: string;
  remarks: string;
}

interface PendingLiquidation {
  id: string;
  location: string;
  observation: string;
  remarks: string;
}

interface RustingCorrosion {
  id: string;
  details: string;
}

interface StructuralDefect {
  id: string;
  details: string;
}

interface HullMaintenanceInspectionforSubmarinesFormData {
  // Header Fields
  inspectionForSubmarines: string;
  dateOfInspection: string;
  
  // WT/GT Integrity Section
  lastVacuumTest: string;
  leakages: LeakageDetail[];
  structuralDefects: string;
  conditionOfRubberSeals: string;
  conditionOfJoints: string;
  tightnessTest: string;
  
  // Defect History Section
  knownDefects: KnownDefect[];
  lastOhmInspection: string;
  pendingLiquidations: PendingLiquidation[];
  
  // Outer Casing
  outerCasing: string;
  ocPreservationStd: string;
  ocRusting: RustingCorrosion[];
  ocStructuralDefects: StructuralDefect[];
  
  // Internal Compartments
  internalCompartments: string;
  icPreservationStd: string;
  icRusting: RustingCorrosion[];
  icStructuralDefects: StructuralDefect[];
  
  // Wet Compartments
  wetCompartments: string;
  wcPreservationStd: string;
  wcRusting: RustingCorrosion[];
  wcStructuralDefects: StructuralDefect[];
  
  // Tank Tops / Free Flood Area
  tankTops: string;
  ttPreservationStd: string;
  ttRusting: RustingCorrosion[];
  ttStructuralDefects: StructuralDefect[];
  
  // Machinery Compartments
  machineryCompartments: string;
  mcPreservationStd: string;
  mcRusting: RustingCorrosion[];
  generalBilges: RustingCorrosion[];
  deckCovering: string;
  mcStructuralDefects: string;
  
  // Battery Pits
  batteryPits: string;
  paintScheme: string;
  bpDateOfApplication: string;
  detailsDefect: string;
  
  // Vacuum Test of Battery Pits
  vtBatteryPits: string;
  vtOpenloop: string;
  vtClosedLoop: string;
  
  // Tanks (Internal and External)
  intExtTanks: string;
  tanksPaintScheme: string;
  dateOfApplication: string;
  tanksDetailsOfDefect: string;
  
  // Solid Ballast Distribution
  solidBallast: string;
  sbRedistribution: string;
  
  // Towing/Mooring Arrangement
  towingHook: string;
  towingPendant: string;
  towingRope: string;
  
  // Miscellaneous hull fittings
  mhfBollards: string;
  mhfCleats: string;
  mhfFairleads: string;
  mhfCableClench: string;
  
  // Capstan/Windlass
  operationalState: string;
  periodicMaintenance: string;
  crewProficiency: string;
  checkOffList: string;
  capstanDetailsDefect: string;
  
  // Indicator Buoy
  preservationStatus: string;
  lastSurveyedBySs: string;
  conditionOfLugsDuringSurvey: string;
  conditionOfReleasing: string;
}

const HullMaintenanceInspectionforSubmarinesForm = () => {
  const [formData, setFormData] = useState<HullMaintenanceInspectionforSubmarinesFormData>({
    inspectionForSubmarines: "",
    dateOfInspection: "",
    lastVacuumTest: "",
    leakages: [],
    structuralDefects: "",
    conditionOfRubberSeals: "",
    conditionOfJoints: "",
    tightnessTest: "",
    knownDefects: [],
    lastOhmInspection: "",
    pendingLiquidations: [],
    outerCasing: "",
    ocPreservationStd: "",
    ocRusting: [],
    ocStructuralDefects: [],
    internalCompartments: "",
    icPreservationStd: "",
    icRusting: [],
    icStructuralDefects: [],
    wetCompartments: "",
    wcPreservationStd: "",
    wcRusting: [],
    wcStructuralDefects: [],
    tankTops: "",
    ttPreservationStd: "",
    ttRusting: [],
    ttStructuralDefects: [],
    machineryCompartments: "",
    mcPreservationStd: "",
    mcRusting: [],
    generalBilges: [],
    deckCovering: "",
    mcStructuralDefects: "",
    batteryPits: "",
    paintScheme: "",
    bpDateOfApplication: "",
    detailsDefect: "",
    vtBatteryPits: "",
    vtOpenloop: "",
    vtClosedLoop: "",
    intExtTanks: "",
    tanksPaintScheme: "",
    dateOfApplication: "",
    tanksDetailsOfDefect: "",
    solidBallast: "",
    sbRedistribution: "",
    towingHook: "",
    towingPendant: "",
    towingRope: "",
    mhfBollards: "",
    mhfCleats: "",
    mhfFairleads: "",
    mhfCableClench: "",
    operationalState: "",
    periodicMaintenance: "",
    crewProficiency: "",
    checkOffList: "",
    capstanDetailsDefect: "",
    preservationStatus: "",
    lastSurveyedBySs: "",
    conditionOfLugsDuringSurvey: "",
    conditionOfReleasing: "",
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  const handleInputChange = (field: keyof HullMaintenanceInspectionforSubmarinesFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Dynamic table handlers for leakages
  const handleAddLeakage = () => {
    const newLeakage: LeakageDetail = {
      id: Date.now().toString(),
      location: "",
      observation: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      leakages: [...prev.leakages, newLeakage]
    }));
  };

  const handleRemoveLeakage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      leakages: prev.leakages.filter(leakage => leakage.id !== id)
    }));
  };

  const handleUpdateLeakage = (id: string, field: keyof LeakageDetail, value: string) => {
    setFormData(prev => ({
      ...prev,
      leakages: prev.leakages.map(leakage =>
        leakage.id === id ? { ...leakage, [field]: value } : leakage
      )
    }));
  };

  // Similar handlers for other dynamic tables...
  const handleAddKnownDefect = () => {
    const newDefect: KnownDefect = {
      id: Date.now().toString(),
      location: "",
      observation: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      knownDefects: [...prev.knownDefects, newDefect]
    }));
  };

  const handleRemoveKnownDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      knownDefects: prev.knownDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateKnownDefect = (id: string, field: keyof KnownDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      knownDefects: prev.knownDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // Pending Liquidations handlers
  const handleAddPendingLiquidation = () => {
    const newLiquidation: PendingLiquidation = {
      id: Date.now().toString(),
      location: "",
      observation: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      pendingLiquidations: [...prev.pendingLiquidations, newLiquidation]
    }));
  };

  const handleRemovePendingLiquidation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      pendingLiquidations: prev.pendingLiquidations.filter(liquidation => liquidation.id !== id)
    }));
  };

  const handleUpdatePendingLiquidation = (id: string, field: keyof PendingLiquidation, value: string) => {
    setFormData(prev => ({
      ...prev,
      pendingLiquidations: prev.pendingLiquidations.map(liquidation =>
        liquidation.id === id ? { ...liquidation, [field]: value } : liquidation
      )
    }));
  };

  // Rusting/Corrosion handlers
  const handleAddRusting = (type: 'ocRusting' | 'icRusting' | 'wcRusting' | 'ttRusting' | 'mcRusting' | 'generalBilges') => {
    const newRusting: RustingCorrosion = {
      id: Date.now().toString(),
      details: ""
    };
    setFormData(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), newRusting]
    }));
  };

  const handleRemoveRusting = (type: 'ocRusting' | 'icRusting' | 'wcRusting' | 'ttRusting' | 'mcRusting' | 'generalBilges', id: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter(rusting => rusting.id !== id)
    }));
  };

  const handleUpdateRusting = (type: 'ocRusting' | 'icRusting' | 'wcRusting' | 'ttRusting' | 'mcRusting' | 'generalBilges', id: string, field: keyof RustingCorrosion, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).map(rusting =>
        rusting.id === id ? { ...rusting, [field]: value } : rusting
      )
    }));
  };

  // Structural Defects handlers
  const handleAddStructuralDefect = (type: 'ocStructuralDefects' | 'icStructuralDefects' | 'wcStructuralDefects' | 'ttStructuralDefects') => {
    const newDefect: StructuralDefect = {
      id: Date.now().toString(),
      details: ""
    };
    setFormData(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), newDefect]
    }));
  };

  const handleRemoveStructuralDefect = (type: 'ocStructuralDefects' | 'icStructuralDefects' | 'wcStructuralDefects' | 'ttStructuralDefects', id: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateStructuralDefect = (type: 'ocStructuralDefects' | 'icStructuralDefects' | 'wcStructuralDefects' | 'ttStructuralDefects', id: string, field: keyof StructuralDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).map(defect =>
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

    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionSubmarinesDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('hullMaintenanceInspectionSubmarinesDrafts', JSON.stringify(updatedDrafts));

    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionSubmarinesDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionSubmarinesDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('hullMaintenanceInspectionSubmarinesDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      inspectionForSubmarines: "",
      dateOfInspection: "",
      lastVacuumTest: "",
      leakages: [],
      structuralDefects: "",
      conditionOfRubberSeals: "",
      conditionOfJoints: "",
      tightnessTest: "",
      knownDefects: [],
      lastOhmInspection: "",
      pendingLiquidations: [],
      outerCasing: "",
      ocPreservationStd: "",
      ocRusting: [],
      ocStructuralDefects: [],
      internalCompartments: "",
      icPreservationStd: "",
      icRusting: [],
      icStructuralDefects: [],
      wetCompartments: "",
      wcPreservationStd: "",
      wcRusting: [],
      wcStructuralDefects: [],
      tankTops: "",
      ttPreservationStd: "",
      ttRusting: [],
      ttStructuralDefects: [],
      machineryCompartments: "",
      mcPreservationStd: "",
      mcRusting: [],
      generalBilges: [],
      deckCovering: "",
      mcStructuralDefects: "",
      batteryPits: "",
      paintScheme: "",
      bpDateOfApplication: "",
      detailsDefect: "",
      vtBatteryPits: "",
      vtOpenloop: "",
      vtClosedLoop: "",
      intExtTanks: "",
      tanksPaintScheme: "",
      dateOfApplication: "",
      tanksDetailsOfDefect: "",
      solidBallast: "",
      sbRedistribution: "",
      towingHook: "",
      towingPendant: "",
      towingRope: "",
      mhfBollards: "",
      mhfCleats: "",
      mhfFairleads: "",
      mhfCableClench: "",
      operationalState: "",
      periodicMaintenance: "",
      crewProficiency: "",
      checkOffList: "",
      capstanDetailsDefect: "",
      preservationStatus: "",
      lastSurveyedBySs: "",
      conditionOfLugsDuringSurvey: "",
      conditionOfReleasing: "",
    });
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.inspectionForSubmarines) {
      alert('Please select Inspection For Submarines INS');
      return;
    }
    
    if (!formData.dateOfInspection) {
      alert('Please enter Date of Inspection');
      return;
    }

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">HULL INSIGHT</h4>
          <h2 className="text-2xl font-bold text-gray-900 text-center">DETAILED REPORT ON ONBOARD HULL MAINTENANCE</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <Label htmlFor="inspectionForSubmarines">INSPECTION FOR SUBMARINES INS: *</Label>
              <Select value={formData.inspectionForSubmarines} onValueChange={(value) => handleInputChange('inspectionForSubmarines', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shivalik">SHIVALIK</SelectItem>
                  <SelectItem value="jamuna">JAMUNA</SelectItem>
                  <SelectItem value="bangaram">BANGARAM</SelectItem>
                  <SelectItem value="tarangini">TARANGINI</SelectItem>
                  <SelectItem value="saryu">SARYU</SelectItem>
                  <SelectItem value="kumbhir">KUMBHIR</SelectItem>
                  <SelectItem value="t-83">T-83</SelectItem>
                  <SelectItem value="airavat">AIRAVAT</SelectItem>
                  <SelectItem value="khanjar">KHANJAR</SelectItem>
                  <SelectItem value="shudershini">SHUDERSHINI</SelectItem>
                  <SelectItem value="trishul">TRISHUL</SelectItem>
                  <SelectItem value="teg">TEG</SelectItem>
                  <SelectItem value="ranvijay">RANVIJAY</SelectItem>
                  <SelectItem value="kirpan">KIRPAN</SelectItem>
                  <SelectItem value="delhi">DELHI</SelectItem>
                  <SelectItem value="survekshak">SURVEKSHAK</SelectItem>
                  <SelectItem value="jyoti">JYOTI</SelectItem>
                  <SelectItem value="sujata">SUJATA</SelectItem>
                  <SelectItem value="kabra">KABRA</SelectItem>
                  <SelectItem value="cankarso">CANKARSO</SelectItem>
                  <SelectItem value="t-84">T-84</SelectItem>
                  <SelectItem value="vibhuti">VIBHUTI</SelectItem>
                  <SelectItem value="nishank">NISHANK</SelectItem>
                  <SelectItem value="magar">MAGAR</SelectItem>
                  <SelectItem value="beas">BEAS</SelectItem>
                  <SelectItem value="suverna">SUVERNA</SelectItem>
                  <SelectItem value="sahyadri">SAHYADRI</SelectItem>
                  <SelectItem value="pralaya">PRALAYA</SelectItem>
                  <SelectItem value="cheriyam">CHERIYAM</SelectItem>
                  <SelectItem value="satpura">SATPURA</SelectItem>
                  <SelectItem value="jalashwa">JALASHWA</SelectItem>
                  <SelectItem value="tarkash">TARKASH</SelectItem>
                  <SelectItem value="karmuk">KARMUK</SelectItem>
                  <SelectItem value="sutlej">SUTLEJ</SelectItem>
                  <SelectItem value="sumedha">SUMEDHA</SelectItem>
                  <SelectItem value="prabal">PRABAL</SelectItem>
                  <SelectItem value="cora-divh">CORA DIVH</SelectItem>
                  <SelectItem value="battimalv">BATTIMALV</SelectItem>
                  <SelectItem value="chennai">CHENNAI</SelectItem>
                  <SelectItem value="sumitra">SUMITRA</SelectItem>
                  <SelectItem value="t-82">T-82</SelectItem>
                  <SelectItem value="kuthar">KUTHAR</SelectItem>
                  <SelectItem value="kondul">KONDUL</SelectItem>
                  <SelectItem value="subhdra">SUBHDRA</SelectItem>
                  <SelectItem value="darshak">DARSHAK</SelectItem>
                  <SelectItem value="bitra">BITRA</SelectItem>
                  <SelectItem value="chetlat">CHETLAT</SelectItem>
                  <SelectItem value="nireekshak">NIREEKSHAK</SelectItem>
                  <SelectItem value="karuva">KARUVA</SelectItem>
                  <SelectItem value="deepak">DEEPAK</SelectItem>
                  <SelectItem value="shakti">SHAKTI</SelectItem>
                  <SelectItem value="kolkata">KOLKATA</SelectItem>
                  <SelectItem value="investigator">INVETIGATOR</SelectItem>
                  <SelectItem value="sharda">SHARDA</SelectItem>
                  <SelectItem value="mumbai">MUMBAI</SelectItem>
                  <SelectItem value="gomti">GOMTI</SelectItem>
                  <SelectItem value="betwa">BETWA</SelectItem>
                  <SelectItem value="nashak">NASHAK</SelectItem>
                  <SelectItem value="koswari">KOSWARI</SelectItem>
                  <SelectItem value="cheetah">CHEETAH</SelectItem>
                  <SelectItem value="talwar">TALWAR</SelectItem>
                  <SelectItem value="kesari">KESARI</SelectItem>
                  <SelectItem value="aditya">ADITYA</SelectItem>
                  <SelectItem value="baratang">BARATANG</SelectItem>
                  <SelectItem value="kora">KORA</SelectItem>
                  <SelectItem value="kulish">KULISH</SelectItem>
                  <SelectItem value="rana">RANA</SelectItem>
                  <SelectItem value="kalpeni">KALPENI</SelectItem>
                  <SelectItem value="vipul">VIPUL</SelectItem>
                  <SelectItem value="tabar">TABAR</SelectItem>
                  <SelectItem value="trinkand">TRINKAND</SelectItem>
                  <SelectItem value="kochi">KOCHI</SelectItem>
                  <SelectItem value="sukanya">SUKANYA</SelectItem>
                  <SelectItem value="savitri">SAVITRI</SelectItem>
                  <SelectItem value="guldar">GULDAR</SelectItem>
                  <SelectItem value="brahmaputra">BRAHMAPUTRA</SelectItem>
                  <SelectItem value="gharial">GHARIAL</SelectItem>
                  <SelectItem value="ranvir">RANVIR</SelectItem>
                  <SelectItem value="nirupak">NIRUPAK</SelectItem>
                  <SelectItem value="vinash">VINASH</SelectItem>
                  <SelectItem value="kirch">KIRCH</SelectItem>
                  <SelectItem value="sandhayak">SANDHAYAK</SelectItem>
                  <SelectItem value="vidyut">VIDYUT</SelectItem>
                  <SelectItem value="tir">TIR</SelectItem>
                  <SelectItem value="gaj">GAJ</SelectItem>
                  <SelectItem value="car-nicobar">CAR NICOBAR</SelectItem>
                  <SelectItem value="sunayna">SUNAYNA</SelectItem>
                  <SelectItem value="mysore">MYSORE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateOfInspection">DATE OF INSPECTION: *</Label>
              <Input
                id="dateOfInspection"
                value={formData.dateOfInspection}
                onChange={(e) => handleInputChange('dateOfInspection', e.target.value)}
                placeholder="DD-MM-YYYY"
                required
              />
            </div>
          </div>

          {/* Main Table Structure */}
          <div className="overflow-x-auto">
            <Table className="border border-gray-300">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                  <TableHead className="border border-gray-300 text-center font-medium">Equipment/ System</TableHead>
                  <TableHead className="border border-gray-300 text-center font-medium">Description of Inspection</TableHead>
                  <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Row 1: WT/GT Integrity */}
                <TableRow>
                  <TableCell rowSpan={6} className="border border-gray-300 text-center">1</TableCell>
                  <TableCell rowSpan={6} className="border border-gray-300">WT/ GT Integrity*</TableCell>
                  <TableCell className="border border-gray-300">Date of Last Vacuum test undertaken*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.lastVacuumTest}
                      onChange={(e) => handleInputChange('lastVacuumTest', e.target.value)}
                      placeholder="DD-MM-YYYY"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Leakages / defects observed if any*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.leakages.length}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            if (count > formData.leakages.length) {
                              for (let i = formData.leakages.length; i < count; i++) {
                                handleAddLeakage();
                              }
                            } else if (count < formData.leakages.length) {
                              const toRemove = formData.leakages.slice(count);
                              toRemove.forEach(leakage => handleRemoveLeakage(leakage.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {formData.leakages.length > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Observation*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {formData.leakages.map((leakage, index) => (
                                <TableRow key={leakage.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={leakage.location}
                                      onChange={(e) => handleUpdateLeakage(leakage.id, 'location', e.target.value)}
                                      placeholder="Enter location"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={leakage.observation}
                                      onChange={(e) => handleUpdateLeakage(leakage.id, 'observation', e.target.value)}
                                      placeholder="Enter observation"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={leakage.remarks}
                                      onChange={(e) => handleUpdateLeakage(leakage.id, 'remarks', e.target.value)}
                                      placeholder="Enter remarks"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Structural defects on doors/ hatches / flap*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.structuralDefects}
                      onChange={(e) => handleInputChange('structuralDefects', e.target.value)}
                      placeholder="Enter structural defects"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Condition of rubber seals*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.conditionOfRubberSeals} onValueChange={(value) => handleInputChange('conditionOfRubberSeals', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Condition of Joints/ Surfaces of assembly hatch and soft patch*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.conditionOfJoints} onValueChange={(value) => handleInputChange('conditionOfJoints', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Tightness test for all compartments and conning tower*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.tightnessTest}
                      onChange={(e) => handleInputChange('tightnessTest', e.target.value)}
                      placeholder="Enter tightness test details"
                    />
                  </TableCell>
                </TableRow>
                
                {/* Row 2: Defect History/ Structure/ Location */}
                <TableRow>
                  <TableCell rowSpan={4} className="border border-gray-300 text-center">2</TableCell>
                  <TableCell rowSpan={4} className="border border-gray-300">Defect History/ Structure/ Location*</TableCell>
                  <TableCell className="border border-gray-300">Known / projected defects compartments/tanks*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.knownDefects.length}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            if (count > formData.knownDefects.length) {
                              for (let i = formData.knownDefects.length; i < count; i++) {
                                handleAddKnownDefect();
                              }
                            } else if (count < formData.knownDefects.length) {
                              const toRemove = formData.knownDefects.slice(count);
                              toRemove.forEach(defect => handleRemoveKnownDefect(defect.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {formData.knownDefects.length > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Observation*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {formData.knownDefects.map((defect, index) => (
                                <TableRow key={defect.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={defect.location}
                                      onChange={(e) => handleUpdateKnownDefect(defect.id, 'location', e.target.value)}
                                      placeholder="Enter location"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={defect.observation}
                                      onChange={(e) => handleUpdateKnownDefect(defect.id, 'observation', e.target.value)}
                                      placeholder="Enter observation"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={defect.remarks}
                                      onChange={(e) => handleUpdateKnownDefect(defect.id, 'remarks', e.target.value)}
                                      placeholder="Enter remarks"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Date of last OHM inspection by HITU</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.lastOhmInspection}
                      onChange={(e) => handleInputChange('lastOhmInspection', e.target.value)}
                      placeholder="DD-MM-YYYY"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Observations pending liquidation of last OHM*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.pendingLiquidations.length}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            if (count > formData.pendingLiquidations.length) {
                              for (let i = formData.pendingLiquidations.length; i < count; i++) {
                                handleAddPendingLiquidation();
                              }
                            } else if (count < formData.pendingLiquidations.length) {
                              const toRemove = formData.pendingLiquidations.slice(count);
                              toRemove.forEach(liquidation => handleRemovePendingLiquidation(liquidation.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {formData.pendingLiquidations.length > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Observation*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {formData.pendingLiquidations.map((liquidation, index) => (
                                <TableRow key={liquidation.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={liquidation.location}
                                      onChange={(e) => handleUpdatePendingLiquidation(liquidation.id, 'location', e.target.value)}
                                      placeholder="Enter location"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={liquidation.observation}
                                      onChange={(e) => handleUpdatePendingLiquidation(liquidation.id, 'observation', e.target.value)}
                                      placeholder="Enter observation"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={liquidation.remarks}
                                      onChange={(e) => handleUpdatePendingLiquidation(liquidation.id, 'remarks', e.target.value)}
                                      placeholder="Enter remarks"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Outer Casing*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">(i) Preservation Standards*</Label>
                        <Select value={formData.ocPreservationStd} onValueChange={(value) => handleInputChange('ocPreservationStd', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">(ii) Rusting / Corrosion*</Label>
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-sm">Enter Total Number of Rows.</Label>
                          <Input
                            type="number"
                            value={formData.ocRusting?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.ocRusting?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddRusting('ocRusting');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.ocRusting || []).slice(count);
                                toRemove.forEach(rusting => handleRemoveRusting('ocRusting', rusting.id));
                              }
                            }}
                            className="w-20"
                          />
                        </div>
                        {(formData.ocRusting?.length || 0) > 0 && (
                          <div className="overflow-x-auto">
                            <Table className="border border-gray-300">
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                  <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(formData.ocRusting || []).map((rusting, index) => (
                                  <TableRow key={rusting.id}>
                                    <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                    <TableCell className="border border-gray-300">
                                      <Input
                                        value={rusting.details}
                                        onChange={(e) => handleUpdateRusting('ocRusting', rusting.id, 'details', e.target.value)}
                                        placeholder="Enter details"
                                        className="border-0 p-1"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium">(iii) Structural Defects*</Label>
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-sm">Enter Total Number of Rows.</Label>
                          <Input
                            type="number"
                            value={formData.ocStructuralDefects?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.ocStructuralDefects?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddStructuralDefect('ocStructuralDefects');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.ocStructuralDefects || []).slice(count);
                                toRemove.forEach(defect => handleRemoveStructuralDefect('ocStructuralDefects', defect.id));
                              }
                            }}
                            className="w-20"
                          />
                        </div>
                        {(formData.ocStructuralDefects?.length || 0) > 0 && (
                          <div className="overflow-x-auto">
                            <Table className="border border-gray-300">
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                  <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(formData.ocStructuralDefects || []).map((defect, index) => (
                                  <TableRow key={defect.id}>
                                    <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                    <TableCell className="border border-gray-300">
                                      <Input
                                        value={defect.details}
                                        onChange={(e) => handleUpdateStructuralDefect('ocStructuralDefects', defect.id, 'details', e.target.value)}
                                        placeholder="Enter details"
                                        className="border-0 p-1"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 3: Internal Compartments */}
                <TableRow>
                  <TableCell rowSpan={3} className="border border-gray-300 text-center">3</TableCell>
                  <TableCell rowSpan={3} className="border border-gray-300">Internal Compartments*</TableCell>
                  <TableCell className="border border-gray-300">(i) Preservation Standards*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.icPreservationStd} onValueChange={(value) => handleInputChange('icPreservationStd', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">(ii) Rusting / Corrosion*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.icRusting?.length || 0}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            const currentLength = formData.icRusting?.length || 0;
                            if (count > currentLength) {
                              for (let i = currentLength; i < count; i++) {
                                handleAddRusting('icRusting');
                              }
                            } else if (count < currentLength) {
                              const toRemove = (formData.icRusting || []).slice(count);
                              toRemove.forEach(rusting => handleRemoveRusting('icRusting', rusting.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {(formData.icRusting?.length || 0) > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {(formData.icRusting || []).map((rusting, index) => (
                                <TableRow key={rusting.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={rusting.details}
                                      onChange={(e) => handleUpdateRusting('icRusting', rusting.id, 'details', e.target.value)}
                                      placeholder="Enter details"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">(iii) Structural Defects*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.icStructuralDefects?.length || 0}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            const currentLength = formData.icStructuralDefects?.length || 0;
                            if (count > currentLength) {
                              for (let i = currentLength; i < count; i++) {
                                handleAddStructuralDefect('icStructuralDefects');
                              }
                            } else if (count < currentLength) {
                              const toRemove = (formData.icStructuralDefects || []).slice(count);
                              toRemove.forEach(defect => handleRemoveStructuralDefect('icStructuralDefects', defect.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {(formData.icStructuralDefects?.length || 0) > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {(formData.icStructuralDefects || []).map((defect, index) => (
                                <TableRow key={defect.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={defect.details}
                                      onChange={(e) => handleUpdateStructuralDefect('icStructuralDefects', defect.id, 'details', e.target.value)}
                                      placeholder="Enter details"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 4: Wet Compartments */}
                <TableRow>
                  <TableCell rowSpan={3} className="border border-gray-300 text-center">4</TableCell>
                  <TableCell rowSpan={3} className="border border-gray-300">Wet Compartments*</TableCell>
                  <TableCell className="border border-gray-300">(i) Preservation Standards*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.wcPreservationStd} onValueChange={(value) => handleInputChange('wcPreservationStd', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">(ii) Rusting / Corrosion*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.wcRusting?.length || 0}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            const currentLength = formData.wcRusting?.length || 0;
                            if (count > currentLength) {
                              for (let i = currentLength; i < count; i++) {
                                handleAddRusting('wcRusting');
                              }
                            } else if (count < currentLength) {
                              const toRemove = (formData.wcRusting || []).slice(count);
                              toRemove.forEach(rusting => handleRemoveRusting('wcRusting', rusting.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {(formData.wcRusting?.length || 0) > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {(formData.wcRusting || []).map((rusting, index) => (
                                <TableRow key={rusting.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={rusting.details}
                                      onChange={(e) => handleUpdateRusting('wcRusting', rusting.id, 'details', e.target.value)}
                                      placeholder="Enter details"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">(iii) Structural Defects*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Enter Total Number of Rows.</Label>
                        <Input
                          type="number"
                          value={formData.wcStructuralDefects?.length || 0}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 0;
                            const currentLength = formData.wcStructuralDefects?.length || 0;
                            if (count > currentLength) {
                              for (let i = currentLength; i < count; i++) {
                                handleAddStructuralDefect('wcStructuralDefects');
                              }
                            } else if (count < currentLength) {
                              const toRemove = (formData.wcStructuralDefects || []).slice(count);
                              toRemove.forEach(defect => handleRemoveStructuralDefect('wcStructuralDefects', defect.id));
                            }
                          }}
                          className="w-20"
                        />
                      </div>
                      {(formData.wcStructuralDefects?.length || 0) > 0 && (
                        <div className="overflow-x-auto">
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {(formData.wcStructuralDefects || []).map((defect, index) => (
                                <TableRow key={defect.id}>
                                  <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={defect.details}
                                      onChange={(e) => handleUpdateStructuralDefect('wcStructuralDefects', defect.id, 'details', e.target.value)}
                                      placeholder="Enter details"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 3: Outer Casing */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">3</TableCell>
                  <TableCell className="border border-gray-300">Outer Casing*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-1">
                      <div className="font-semibold">Outer Casing*</div>
                      <div className="ml-4 space-y-1">
                        <div>(i) Preservation Standards*</div>
                        <div>(ii) Rusting / Corrosion*</div>
                        <div>(iii) Structural Defects*</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-4">
                      {/* (i) Preservation Standards */}
                      <div>
                        <Select value={formData.ocPreservationStd} onValueChange={(value) => handleInputChange('ocPreservationStd', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* (ii) Rusting / Corrosion */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sr No.</span>
                          <span className="text-sm">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            value={formData.ocRusting?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.ocRusting?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddRusting('ocRusting');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.ocRusting || []).slice(count);
                                toRemove.forEach(rusting => handleRemoveRusting('ocRusting', rusting.id));
                              }
                            }}
                            className="w-16 h-8"
                          />
                        </div>
                        {(formData.ocRusting?.length || 0) > 0 && (
                          <div className="space-y-1">
                            {(formData.ocRusting || []).map((rusting, index) => (
                              <div key={rusting.id} className="flex items-center gap-2">
                                <span className="text-sm w-8">{index + 1}</span>
                                <Input
                                  value={rusting.details}
                                  onChange={(e) => handleUpdateRusting('ocRusting', rusting.id, 'details', e.target.value)}
                                  placeholder="Enter details"
                                  className="flex-1 h-8"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* (iii) Structural Defects */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sr No.</span>
                          <span className="text-sm">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            value={formData.ocStructuralDefects?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.ocStructuralDefects?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddStructuralDefect('ocStructuralDefects');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.ocStructuralDefects || []).slice(count);
                                toRemove.forEach(defect => handleRemoveStructuralDefect('ocStructuralDefects', defect.id));
                              }
                            }}
                            className="w-16 h-8"
                          />
                        </div>
                        {(formData.ocStructuralDefects?.length || 0) > 0 && (
                          <div className="space-y-1">
                            {(formData.ocStructuralDefects || []).map((defect, index) => (
                              <div key={defect.id} className="flex items-center gap-2">
                                <span className="text-sm w-8">{index + 1}</span>
                                <Input
                                  value={defect.details}
                                  onChange={(e) => handleUpdateStructuralDefect('ocStructuralDefects', defect.id, 'details', e.target.value)}
                                  placeholder="Enter details"
                                  className="flex-1 h-8"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 4: Internal Compartments */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">4</TableCell>
                  <TableCell className="border border-gray-300">Internal Compartments*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-1">
                      <div className="font-semibold">Internal Compartments*</div>
                      <div className="ml-4 space-y-1">
                        <div>(i) Preservation Standards*</div>
                        <div>(ii) Rusting / Corrosion*</div>
                        <div>(iii) Structural Defects*</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-4">
                      {/* (i) Preservation Standards */}
                      <div>
                        <Select value={formData.icPreservationStd} onValueChange={(value) => handleInputChange('icPreservationStd', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* (ii) Rusting / Corrosion */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sr No.</span>
                          <span className="text-sm">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            value={formData.icRusting?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.icRusting?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddRusting('icRusting');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.icRusting || []).slice(count);
                                toRemove.forEach(rusting => handleRemoveRusting('icRusting', rusting.id));
                              }
                            }}
                            className="w-16 h-8"
                          />
                        </div>
                        {(formData.icRusting?.length || 0) > 0 && (
                          <div className="space-y-1">
                            {(formData.icRusting || []).map((rusting, index) => (
                              <div key={rusting.id} className="flex items-center gap-2">
                                <span className="text-sm w-8">{index + 1}</span>
                                <Input
                                  value={rusting.details}
                                  onChange={(e) => handleUpdateRusting('icRusting', rusting.id, 'details', e.target.value)}
                                  placeholder="Enter details"
                                  className="flex-1 h-8"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* (iii) Structural Defects */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sr No.</span>
                          <span className="text-sm">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            value={formData.icStructuralDefects?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.icStructuralDefects?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddStructuralDefect('icStructuralDefects');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.icStructuralDefects || []).slice(count);
                                toRemove.forEach(defect => handleRemoveStructuralDefect('icStructuralDefects', defect.id));
                              }
                            }}
                            className="w-16 h-8"
                          />
                        </div>
                        {(formData.icStructuralDefects?.length || 0) > 0 && (
                          <div className="space-y-1">
                            {(formData.icStructuralDefects || []).map((defect, index) => (
                              <div key={defect.id} className="flex items-center gap-2">
                                <span className="text-sm w-8">{index + 1}</span>
                                <Input
                                  value={defect.details}
                                  onChange={(e) => handleUpdateStructuralDefect('icStructuralDefects', defect.id, 'details', e.target.value)}
                                  placeholder="Enter details"
                                  className="flex-1 h-8"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 5: Wet Compartments */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">5</TableCell>
                  <TableCell className="border border-gray-300">Wet Compartments*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-1">
                      <div className="font-semibold">Wet Compartments*</div>
                      <div className="ml-4 space-y-1">
                        <div>(i) Preservation Standards*</div>
                        <div>(ii) Rusting / Corrosion*</div>
                        <div>(iii) Structural Defects*</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-4">
                      {/* (i) Preservation Standards */}
                      <div>
                        <Select value={formData.wcPreservationStd} onValueChange={(value) => handleInputChange('wcPreservationStd', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* (ii) Rusting / Corrosion */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sr No.</span>
                          <span className="text-sm">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            value={formData.wcRusting?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.wcRusting?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddRusting('wcRusting');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.wcRusting || []).slice(count);
                                toRemove.forEach(rusting => handleRemoveRusting('wcRusting', rusting.id));
                              }
                            }}
                            className="w-16 h-8"
                          />
                        </div>
                        {(formData.wcRusting?.length || 0) > 0 && (
                          <div className="space-y-1">
                            {(formData.wcRusting || []).map((rusting, index) => (
                              <div key={rusting.id} className="flex items-center gap-2">
                                <span className="text-sm w-8">{index + 1}</span>
                                <Input
                                  value={rusting.details}
                                  onChange={(e) => handleUpdateRusting('wcRusting', rusting.id, 'details', e.target.value)}
                                  placeholder="Enter details"
                                  className="flex-1 h-8"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* (iii) Structural Defects */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sr No.</span>
                          <span className="text-sm">Enter Total Number of Rows.</span>
                          <Input
                            type="number"
                            value={formData.wcStructuralDefects?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.wcStructuralDefects?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddStructuralDefect('wcStructuralDefects');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.wcStructuralDefects || []).slice(count);
                                toRemove.forEach(defect => handleRemoveStructuralDefect('wcStructuralDefects', defect.id));
                              }
                            }}
                            className="w-16 h-8"
                          />
                        </div>
                        {(formData.wcStructuralDefects?.length || 0) > 0 && (
                          <div className="space-y-1">
                            {(formData.wcStructuralDefects || []).map((defect, index) => (
                              <div key={defect.id} className="flex items-center gap-2">
                                <span className="text-sm w-8">{index + 1}</span>
                                <Input
                                  value={defect.details}
                                  onChange={(e) => handleUpdateStructuralDefect('wcStructuralDefects', defect.id, 'details', e.target.value)}
                                  placeholder="Enter details"
                                  className="flex-1 h-8"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 6: Tank Tops / Free Flood Area */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">6</TableCell>
                  <TableCell className="border border-gray-300">Tank Tops / Free Flood Area*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(i) Preservation Standards*</Label>
                        <Select value={formData.ttPreservationStd} onValueChange={(value) => handleInputChange('ttPreservationStd', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">(ii) Rusting / Corrosion*</Label>
                          <Label className="text-sm">Enter Total Number of Rows.</Label>
                          <Input
                            type="number"
                            value={formData.ttRusting?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.ttRusting?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddRusting('ttRusting');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.ttRusting || []).slice(count);
                                toRemove.forEach(rusting => handleRemoveRusting('ttRusting', rusting.id));
                              }
                            }}
                            className="w-20"
                          />
                        </div>
                        {(formData.ttRusting?.length || 0) > 0 && (
                          <div className="overflow-x-auto">
                            <Table className="border border-gray-300">
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                  <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(formData.ttRusting || []).map((rusting, index) => (
                                  <TableRow key={rusting.id}>
                                    <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                    <TableCell className="border border-gray-300">
                                      <Input
                                        value={rusting.details}
                                        onChange={(e) => handleUpdateRusting('ttRusting', rusting.id, 'details', e.target.value)}
                                        placeholder="Enter details"
                                        className="border-0 p-1"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">(iii) Structural Defects*</Label>
                            <Label className="text-sm">Enter Total Number of Rows.</Label>
                            <Input
                              type="number"
                              value={formData.ttStructuralDefects?.length || 0}
                              onChange={(e) => {
                                const count = parseInt(e.target.value) || 0;
                                const currentLength = formData.ttStructuralDefects?.length || 0;
                                if (count > currentLength) {
                                  for (let i = currentLength; i < count; i++) {
                                    handleAddStructuralDefect('ttStructuralDefects');
                                  }
                                } else if (count < currentLength) {
                                  const toRemove = (formData.ttStructuralDefects || []).slice(count);
                                  toRemove.forEach(defect => handleRemoveStructuralDefect('ttStructuralDefects', defect.id));
                                }
                              }}
                              className="w-20"
                            />
                          </div>
                          {(formData.ttStructuralDefects?.length || 0) > 0 && (
                            <div className="overflow-x-auto">
                              <Table className="border border-gray-300">
                                <TableHeader>
                                  <TableRow className="bg-gray-50">
                                    <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                    <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {(formData.ttStructuralDefects || []).map((defect, index) => (
                                    <TableRow key={defect.id}>
                                      <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                      <TableCell className="border border-gray-300">
                                        <Input
                                          value={defect.details}
                                          onChange={(e) => handleUpdateStructuralDefect('ttStructuralDefects', defect.id, 'details', e.target.value)}
                                          placeholder="Enter details"
                                          className="border-0 p-1"
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 7: Machinery Compartments */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">7</TableCell>
                  <TableCell className="border border-gray-300">Machinery Compartments*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(i) Preservation Standards*</Label>
                        <Select value={formData.mcPreservationStd} onValueChange={(value) => handleInputChange('mcPreservationStd', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">(ii) Rusting / Corrosion*</Label>
                          <Label className="text-sm">Enter Total Number of Rows.</Label>
                          <Input
                            type="number"
                            value={formData.mcRusting?.length || 0}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              const currentLength = formData.mcRusting?.length || 0;
                              if (count > currentLength) {
                                for (let i = currentLength; i < count; i++) {
                                  handleAddRusting('mcRusting');
                                }
                              } else if (count < currentLength) {
                                const toRemove = (formData.mcRusting || []).slice(count);
                                toRemove.forEach(rusting => handleRemoveRusting('mcRusting', rusting.id));
                              }
                            }}
                            className="w-20"
                          />
                        </div>
                        {(formData.mcRusting?.length || 0) > 0 && (
                          <div className="overflow-x-auto">
                            <Table className="border border-gray-300">
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                  <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(formData.mcRusting || []).map((rusting, index) => (
                                  <TableRow key={rusting.id}>
                                    <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                    <TableCell className="border border-gray-300">
                                      <Input
                                        value={rusting.details}
                                        onChange={(e) => handleUpdateRusting('mcRusting', rusting.id, 'details', e.target.value)}
                                        placeholder="Enter details"
                                        className="border-0 p-1"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">(iii) General Bilges Hygiene*</Label>
                            <Label className="text-sm">Enter Total Number of Rows.</Label>
                            <Input
                              type="number"
                              value={formData.generalBilges?.length || 0}
                              onChange={(e) => {
                                const count = parseInt(e.target.value) || 0;
                                const currentLength = formData.generalBilges?.length || 0;
                                if (count > currentLength) {
                                  for (let i = currentLength; i < count; i++) {
                                    handleAddRusting('generalBilges');
                                  }
                                } else if (count < currentLength) {
                                  const toRemove = (formData.generalBilges || []).slice(count);
                                  toRemove.forEach(bilge => handleRemoveRusting('generalBilges', bilge.id));
                                }
                              }}
                              className="w-20"
                            />
                          </div>
                          {(formData.generalBilges?.length || 0) > 0 && (
                            <div className="overflow-x-auto">
                              <Table className="border border-gray-300">
                                <TableHeader>
                                  <TableRow className="bg-gray-50">
                                    <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                                    <TableHead className="border border-gray-300 text-center font-medium">Details*</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {(formData.generalBilges || []).map((bilge, index) => (
                                    <TableRow key={bilge.id}>
                                      <TableCell className="border border-gray-300 text-center">{index + 1}</TableCell>
                                      <TableCell className="border border-gray-300">
                                        <Input
                                          value={bilge.details}
                                          onChange={(e) => handleUpdateRusting('generalBilges', bilge.id, 'details', e.target.value)}
                                          placeholder="Enter details"
                                          className="border-0 p-1"
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">(iv) Deck Coverings*</Label>
                          <Input
                            value={formData.deckCovering}
                            onChange={(e) => handleInputChange('deckCovering', e.target.value)}
                            placeholder="Enter deck covering details"
                            className="w-60"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">(v) Structural Defects*</Label>
                          <Input
                            value={formData.mcStructuralDefects}
                            onChange={(e) => handleInputChange('mcStructuralDefects', e.target.value)}
                            placeholder="Enter structural defects"
                            className="w-60"
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 8: Battery Pits */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">8</TableCell>
                  <TableCell className="border border-gray-300">Battery Pits*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(i) Paint Scheme*</Label>
                        <Input
                          value={formData.paintScheme}
                          onChange={(e) => handleInputChange('paintScheme', e.target.value)}
                          placeholder="Enter paint scheme"
                          className="w-60"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(ii) Date of application / whether in - date*</Label>
                        <Input
                          value={formData.bpDateOfApplication}
                          onChange={(e) => handleInputChange('bpDateOfApplication', e.target.value)}
                          placeholder="DD-MM-YYYY"
                          className="w-40"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(iii) Details of defects if any*</Label>
                        <Input
                          value={formData.detailsDefect}
                          onChange={(e) => handleInputChange('detailsDefect', e.target.value)}
                          placeholder="Enter defect details"
                          className="w-60"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 9: Vacuum Test of Battery Pits */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">9</TableCell>
                  <TableCell className="border border-gray-300">Vacuum Test of Battery Pits*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(i) Open Loop - Using Standard Blowers and Exhaust/Supply blowers.*</Label>
                        <Input
                          value={formData.vtOpenloop}
                          onChange={(e) => handleInputChange('vtOpenloop', e.target.value)}
                          placeholder="Enter open loop details"
                          className="w-60"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(ii) Closed Loop - Using Battery Power*</Label>
                        <Input
                          value={formData.vtClosedLoop}
                          onChange={(e) => handleInputChange('vtClosedLoop', e.target.value)}
                          placeholder="Enter closed loop details"
                          className="w-60"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 10: Tanks (Internal and External) */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">10</TableCell>
                  <TableCell className="border border-gray-300">Tanks (Internal and External)*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(i) Paint Scheme*</Label>
                        <Input
                          value={formData.tanksPaintScheme}
                          onChange={(e) => handleInputChange('tanksPaintScheme', e.target.value)}
                          placeholder="Enter paint scheme"
                          className="w-60"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(ii) Date of application / whether in - date*</Label>
                        <Input
                          value={formData.dateOfApplication}
                          onChange={(e) => handleInputChange('dateOfApplication', e.target.value)}
                          placeholder="DD-MM-YYYY"
                          className="w-40"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">(iii) Details of defects if any*</Label>
                        <Input
                          value={formData.tanksDetailsOfDefect}
                          onChange={(e) => handleInputChange('tanksDetailsOfDefect', e.target.value)}
                          placeholder="Enter defect details"
                          className="w-60"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 11: Solid Ballast Distribution */}
                <TableRow>
                  <TableCell className="border border-gray-300 text-center">11</TableCell>
                  <TableCell className="border border-gray-300">Solid Ballast Distribution*</TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">(i) Solid Ballast redistribution last carried out with details/ locations/ Authority*</Label>
                      <Input
                        value={formData.sbRedistribution}
                        onChange={(e) => handleInputChange('sbRedistribution', e.target.value)}
                        placeholder="Enter redistribution details"
                        className="w-60"
                      />
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Row 12: Towing/ Mooring Arrangement */}
                <TableRow>
                  <TableCell rowSpan={3} className="border border-gray-300 text-center">12</TableCell>
                  <TableCell rowSpan={3} className="border border-gray-300">Towing/ Mooring Arrangement*</TableCell>
                  <TableCell className="border border-gray-300">Towing hook( Sat/Unsat)*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.towingHook} onValueChange={(value) => handleInputChange('towingHook', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Towing pendant*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.towingPendant}
                      onChange={(e) => handleInputChange('towingPendant', e.target.value)}
                      placeholder="Enter towing pendant details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Towing Rope*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.towingRope}
                      onChange={(e) => handleInputChange('towingRope', e.target.value)}
                      placeholder="Enter towing rope details"
                    />
                  </TableCell>
                </TableRow>
                
                {/* Row 13: Miscellaneous hull fittings on weather deck */}
                <TableRow>
                  <TableCell rowSpan={4} className="border border-gray-300 text-center">13</TableCell>
                  <TableCell rowSpan={4} className="border border-gray-300">Miscellaneous hull fittings on weather deck*</TableCell>
                  <TableCell className="border border-gray-300">Bollards*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.mhfBollards}
                      onChange={(e) => handleInputChange('mhfBollards', e.target.value)}
                      placeholder="Enter bollards details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Cleats*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.mhfCleats}
                      onChange={(e) => handleInputChange('mhfCleats', e.target.value)}
                      placeholder="Enter cleats details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Fairleads*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.mhfFairleads}
                      onChange={(e) => handleInputChange('mhfFairleads', e.target.value)}
                      placeholder="Enter fairleads details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Cable clench*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.mhfCableClench}
                      onChange={(e) => handleInputChange('mhfCableClench', e.target.value)}
                      placeholder="Enter cable clench details"
                    />
                  </TableCell>
                </TableRow>
                
                {/* Row 14: Capstan/ Windlass */}
                <TableRow>
                  <TableCell rowSpan={5} className="border border-gray-300 text-center">14</TableCell>
                  <TableCell rowSpan={5} className="border border-gray-300">Capstan/ Windlass*</TableCell>
                  <TableCell className="border border-gray-300">Operational state (Ops/Non- Ops)*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.operationalState} onValueChange={(value) => handleInputChange('operationalState', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ops">Ops</SelectItem>
                        <SelectItem value="Non-Ops">Non-Ops</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Periodic Maintenance (Preservation / Greasing)*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.periodicMaintenance}
                      onChange={(e) => handleInputChange('periodicMaintenance', e.target.value)}
                      placeholder="Enter maintenance details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Crew proficiency*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.crewProficiency}
                      onChange={(e) => handleInputChange('crewProficiency', e.target.value)}
                      placeholder="Enter crew proficiency details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Check off list for Operation*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.checkOffList}
                      onChange={(e) => handleInputChange('checkOffList', e.target.value)}
                      placeholder="Enter check off list details"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Detail of Defect if any*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.capstanDetailsDefect}
                      onChange={(e) => handleInputChange('capstanDetailsDefect', e.target.value)}
                      placeholder="Enter defect details"
                    />
                  </TableCell>
                </TableRow>
                
                {/* Row 15: Indicator Buoy */}
                <TableRow>
                  <TableCell rowSpan={4} className="border border-gray-300 text-center">15</TableCell>
                  <TableCell rowSpan={4} className="border border-gray-300">Indicator Buoy*</TableCell>
                  <TableCell className="border border-gray-300">Preservation Status*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.preservationStatus}
                      onChange={(e) => handleInputChange('preservationStatus', e.target.value)}
                      placeholder="Enter preservation status"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">last surveyed by SS/DYD*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Input
                      value={formData.lastSurveyedBySs}
                      onChange={(e) => handleInputChange('lastSurveyedBySs', e.target.value)}
                      placeholder="DD-MM-YYYY"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Condition of Lugs during Survey*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.conditionOfLugsDuringSurvey} onValueChange={(value) => handleInputChange('conditionOfLugsDuringSurvey', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">Condition of Releasing / cutting mechanism*</TableCell>
                  <TableCell className="border border-gray-300">
                    <Select value={formData.conditionOfReleasing} onValueChange={(value) => handleInputChange('conditionOfReleasing', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button type="button" onClick={handleFetchDrafts} className="bg-blue-600 hover:bg-blue-700 text-white">
              Fetch Drafts
            </Button>
            <Button type="button" onClick={handleSaveDraft} className="bg-green-600 hover:bg-green-700 text-white">
              SAVE DRAFT
            </Button>
            <Button type="button" onClick={handleClear} className="bg-red-600 hover:bg-red-700 text-white">
              Clear
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save
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
                      <TableCell>{draft.formData.inspectionForSubmarines}</TableCell>
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

export default HullMaintenanceInspectionforSubmarinesForm;

