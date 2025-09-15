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
              </TableBody>
            </Table>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button type="button" onClick={handleFetchDrafts} variant="outline">
              Fetch Drafts
            </Button>
            <Button type="button" onClick={handleSaveDraft} variant="outline">
              SAVE DRAFT
            </Button>
            <Button type="button" onClick={handleClear} variant="outline">
              Clear
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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

