import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';

interface RHIBHarbourChecksData {
  // General Inspection and Documentation Checks
  boatLogBook: string;
  inspectionMaintenanceRecords: string;
  weighingRecords: string;
  boatLogFolder: string;
  
  // Lowering/Hoisting Test
  placeLowering: string;
  loweringDate: Date | null;
  boatType1: string;
  representativesLowering: string;
  
  // Documentation
  loadTestCrane: string;
  testCertificateArh: string;
  loadTestCrane2: string;
  
  // General Inspection Post Hoisting
  conditionHullAppendages: string;
  conditionOfPaint: string;
  conditionHullFittings: string;
  conditionLiftingArrangement: string;
  inspectRecordSlings: string;
  
  // Inspection of Webbing Sling
  visualSurveySling: string;
  yearOfManufactureSling: string;
  
  // Harbour Checks
  place: string;
  harbourDate: Date | null;
  boatType: string;
  boatRegnNo: string;
  ship: string;
  trialTeams: string;
  conditionHullAppendagesGeneralInspection: string;
  
  // Machinery Fitted
  mainEnginesSerialNo: string;
  driveUnitsMake: string;
  driveUnitsSerialNo: string;
  transomShieldMake: string;
  transomShieldSerialNo: string;
  bilgePumpMotorMake: string;
  bilgePumpMotorCapacity: string;
  bilgePumpHandMake: string;
  bilgePumpHandCapacity: string;
  batteriesMake: string;
  batteriesModel: string;
  dgSetMake: string;
  dgSetModel: string;
  
  // Sub-Components Observations and Remarks
  mainEngine: { observations: string; remarks: string };
  steeringSystem: { observations: string; remarks: string };
  engineGauges: { observations: string; remarks: string };
  battery: { observations: string; remarks: string };
  batteryCharging: { observations: string; remarks: string };
  fuelSystem: { observations: string; remarks: string };
  bilgePumpMotor: { observations: string; remarks: string };
  engineCabinet: { observations: string; remarks: string };
  bilgePumpHand: { observations: string; remarks: string };
  statusBilges: { observations: string; remarks: string };
  lights: { observations: string; remarks: string };
  horn: { observations: string; remarks: string };
  mastLight: { observations: string; remarks: string };
  sideLightPort: { observations: string; remarks: string };
  sideLightStbd: { observations: string; remarks: string };
  nucLights: { observations: string; remarks: string };
  searchLight: { observations: string; remarks: string };
  fireSmokeDetector: { observations: string; remarks: string };
  navComSystem: { observations: string; remarks: string };
  controlSystem: { observations: string; remarks: string };
  
  // Result of Harbour Checks
  specificDefects: string;
  overallStatus: string;
}

const RHIBHarbourChecksForm: React.FC = () => {
  const [formData, setFormData] = useState<RHIBHarbourChecksData>({
    boatLogBook: '',
    inspectionMaintenanceRecords: '',
    weighingRecords: '',
    boatLogFolder: '',
    placeLowering: '',
    loweringDate: null,
    boatType1: '',
    representativesLowering: '',
    loadTestCrane: '',
    testCertificateArh: '',
    loadTestCrane2: '',
    conditionHullAppendages: '',
    conditionOfPaint: '',
    conditionHullFittings: '',
    conditionLiftingArrangement: '',
    inspectRecordSlings: '',
    visualSurveySling: '',
    yearOfManufactureSling: '',
    place: '',
    harbourDate: null,
    boatType: '',
    boatRegnNo: '',
    ship: '',
    trialTeams: '',
    conditionHullAppendagesGeneralInspection: '',
    mainEnginesSerialNo: '',
    driveUnitsMake: '',
    driveUnitsSerialNo: '',
    transomShieldMake: '',
    transomShieldSerialNo: '',
    bilgePumpMotorMake: '',
    bilgePumpMotorCapacity: '',
    bilgePumpHandMake: '',
    bilgePumpHandCapacity: '',
    batteriesMake: '',
    batteriesModel: '',
    dgSetMake: '',
    dgSetModel: '',
    mainEngine: { observations: '', remarks: '' },
    steeringSystem: { observations: '', remarks: '' },
    engineGauges: { observations: '', remarks: '' },
    battery: { observations: '', remarks: '' },
    batteryCharging: { observations: '', remarks: '' },
    fuelSystem: { observations: '', remarks: '' },
    bilgePumpMotor: { observations: '', remarks: '' },
    engineCabinet: { observations: '', remarks: '' },
    bilgePumpHand: { observations: '', remarks: '' },
    statusBilges: { observations: '', remarks: '' },
    lights: { observations: '', remarks: '' },
    horn: { observations: '', remarks: '' },
    mastLight: { observations: '', remarks: '' },
    sideLightPort: { observations: '', remarks: '' },
    sideLightStbd: { observations: '', remarks: '' },
    nucLights: { observations: '', remarks: '' },
    searchLight: { observations: '', remarks: '' },
    fireSmokeDetector: { observations: '', remarks: '' },
    navComSystem: { observations: '', remarks: '' },
    controlSystem: { observations: '', remarks: '' },
    specificDefects: '',
    overallStatus: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const observations = ['SAT', 'UNSAT', 'SAT WITH OBSERVATION'];

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    const savedDrafts = localStorage.getItem('rhibHarbourChecks_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  };

  const saveDraft = () => {
    const draftData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      title: `Draft - ${formData.ship || 'Untitled'} - ${formData.boatType || 'No Type'}`
    };
    
    const updatedDrafts = [...drafts, draftData];
    setDrafts(updatedDrafts);
    localStorage.setItem('rhibHarbourChecks_drafts', JSON.stringify(updatedDrafts));
    setIsDraftModalOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.boatLogBook) newErrors.boatLogBook = 'Boat Log Book is required';
    if (!formData.inspectionMaintenanceRecords) newErrors.inspectionMaintenanceRecords = 'Inspection and Maintenance Records are required';
    if (!formData.weighingRecords) newErrors.weighingRecords = 'Weighing Records are required';
    if (!formData.boatLogFolder) newErrors.boatLogFolder = 'Boat Log Book Folder is required';
    if (!formData.placeLowering) newErrors.placeLowering = 'Place is required';
    if (!formData.loweringDate) newErrors.loweringDate = 'Lowering Date is required';
    if (!formData.boatType1) newErrors.boatType1 = 'Boat Type is required';
    if (!formData.representativesLowering) newErrors.representativesLowering = 'Representatives are required';
    if (!formData.place) newErrors.place = 'Harbour Checks Place is required';
    if (!formData.harbourDate) newErrors.harbourDate = 'Harbour Checks Date is required';
    if (!formData.boatType) newErrors.boatType = 'Boat Type is required';
    if (!formData.boatRegnNo) newErrors.boatRegnNo = 'Boat Registration Number is required';
    if (!formData.ship) newErrors.ship = 'Ship is required';
    if (!formData.trialTeams) newErrors.trialTeams = 'Trial Teams are required';
    if (!formData.specificDefects) newErrors.specificDefects = 'Specific Defects are required';
    if (!formData.overallStatus) newErrors.overallStatus = 'Overall Status is required';

    // Validate observations and remarks for each section
    const sections = [
      'mainEngine', 'steeringSystem', 'engineGauges', 'battery', 'batteryCharging',
      'fuelSystem', 'bilgePumpMotor', 'engineCabinet', 'bilgePumpHand', 'statusBilges',
      'lights', 'horn', 'mastLight', 'sideLightPort', 'sideLightStbd', 'nucLights',
      'searchLight', 'fireSmokeDetector', 'navComSystem', 'controlSystem'
    ];

    sections.forEach(section => {
      const sectionData = formData[section as keyof RHIBHarbourChecksData] as any;
      if (!sectionData.observations) {
        newErrors[`${section}_observations`] = 'Observations are required';
      }
      if (!sectionData.remarks) {
        newErrors[`${section}_remarks`] = 'Remarks are required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      boatLogBook: '',
      inspectionMaintenanceRecords: '',
      weighingRecords: '',
      boatLogFolder: '',
      placeLowering: '',
      loweringDate: null,
      boatType1: '',
      representativesLowering: '',
      loadTestCrane: '',
      testCertificateArh: '',
      loadTestCrane2: '',
      conditionHullAppendages: '',
      conditionOfPaint: '',
      conditionHullFittings: '',
      conditionLiftingArrangement: '',
      inspectRecordSlings: '',
      visualSurveySling: '',
      yearOfManufactureSling: '',
      place: '',
      harbourDate: null,
      boatType: '',
      boatRegnNo: '',
      ship: '',
      trialTeams: '',
      conditionHullAppendagesGeneralInspection: '',
      mainEnginesSerialNo: '',
      driveUnitsMake: '',
      driveUnitsSerialNo: '',
      transomShieldMake: '',
      transomShieldSerialNo: '',
      bilgePumpMotorMake: '',
      bilgePumpMotorCapacity: '',
      bilgePumpHandMake: '',
      bilgePumpHandCapacity: '',
      batteriesMake: '',
      batteriesModel: '',
      dgSetMake: '',
      dgSetModel: '',
      mainEngine: { observations: '', remarks: '' },
      steeringSystem: { observations: '', remarks: '' },
      engineGauges: { observations: '', remarks: '' },
      battery: { observations: '', remarks: '' },
      batteryCharging: { observations: '', remarks: '' },
      fuelSystem: { observations: '', remarks: '' },
      bilgePumpMotor: { observations: '', remarks: '' },
      engineCabinet: { observations: '', remarks: '' },
      bilgePumpHand: { observations: '', remarks: '' },
      statusBilges: { observations: '', remarks: '' },
      lights: { observations: '', remarks: '' },
      horn: { observations: '', remarks: '' },
      mastLight: { observations: '', remarks: '' },
      sideLightPort: { observations: '', remarks: '' },
      sideLightStbd: { observations: '', remarks: '' },
      nucLights: { observations: '', remarks: '' },
      searchLight: { observations: '', remarks: '' },
      fireSmokeDetector: { observations: '', remarks: '' },
      navComSystem: { observations: '', remarks: '' },
      controlSystem: { observations: '', remarks: '' },
      specificDefects: '',
      overallStatus: '',
    });
    setErrors({});
  };

  const updateSectionData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof RHIBHarbourChecksData] as any,
        [field]: value
      }
    }));
  };

  const ObservationSection: React.FC<{ 
    title: string; 
    section: string; 
    sectionData: { observations: string; remarks: string };
  }> = ({ title, section, sectionData }) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Observations *</Label>
          <Select
            value={sectionData.observations}
            onValueChange={(value) => updateSectionData(section, 'observations', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select observation" />
            </SelectTrigger>
            <SelectContent>
              {observations.map(obs => (
                <SelectItem key={obs} value={obs}>{obs}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[`${section}_observations`] && (
            <p className="text-red-500 text-sm mt-1">{errors[`${section}_observations`]}</p>
          )}
        </div>
        <div>
          <Label>Remarks *</Label>
          <Textarea
            value={sectionData.remarks}
            onChange={(e) => updateSectionData(section, 'remarks', e.target.value)}
            placeholder="Enter remarks"
            rows={2}
          />
          {errors[`${section}_remarks`] && (
            <p className="text-red-500 text-sm mt-1">{errors[`${section}_remarks`]}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RHIB - SHIP BORNE BOAT - HARBOUR CHECKS</h1>
        <p className="text-gray-600">Form for RHIB Ship Borne Boat Harbour Checks</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Inspection and Documentation Checks */}
        <Card>
          <CardHeader>
            <CardTitle>1. General Inspection and Documentation Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="boatLogBook">(a) Boat Log Book i.a.w Appendix 'C' of NO 03/18 *</Label>
                <Input
                  id="boatLogBook"
                  value={formData.boatLogBook}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatLogBook: e.target.value }))}
                  placeholder="Enter boat log book details"
                  maxLength={50}
                />
                {errors.boatLogBook && <p className="text-red-500 text-sm mt-1">{errors.boatLogBook}</p>}
              </div>

              <div>
                <Label htmlFor="inspectionMaintenanceRecords">(b) Records of Inspection and Maintenance of Boat and Lifting Arrangements i.a.w NO 03/18 *</Label>
                <Input
                  id="inspectionMaintenanceRecords"
                  value={formData.inspectionMaintenanceRecords}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspectionMaintenanceRecords: e.target.value }))}
                  placeholder="Enter inspection and maintenance records"
                  maxLength={50}
                />
                {errors.inspectionMaintenanceRecords && <p className="text-red-500 text-sm mt-1">{errors.inspectionMaintenanceRecords}</p>}
              </div>

              <div>
                <Label htmlFor="weighingRecords">(c) Records of Weighing of Boat i.a.w NO 03/18 *</Label>
                <Input
                  id="weighingRecords"
                  value={formData.weighingRecords}
                  onChange={(e) => setFormData(prev => ({ ...prev, weighingRecords: e.target.value }))}
                  placeholder="Enter weighing records"
                  maxLength={50}
                />
                {errors.weighingRecords && <p className="text-red-500 text-sm mt-1">{errors.weighingRecords}</p>}
              </div>

              <div>
                <Label htmlFor="boatLogFolder">(d) Boat Log Book Folder i.a.w Part II of Appendix 'C' of NO 03/18 *</Label>
                <Input
                  id="boatLogFolder"
                  value={formData.boatLogFolder}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatLogFolder: e.target.value }))}
                  placeholder="Enter boat log book folder details"
                  maxLength={50}
                />
                {errors.boatLogFolder && <p className="text-red-500 text-sm mt-1">{errors.boatLogFolder}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lowering/Hoisting Test */}
        <Card>
          <CardHeader>
            <CardTitle>2. Lowering/Hoisting Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="placeLowering">Place *</Label>
                <Input
                  id="placeLowering"
                  value={formData.placeLowering}
                  onChange={(e) => setFormData(prev => ({ ...prev, placeLowering: e.target.value }))}
                  placeholder="Enter place"
                  maxLength={20}
                />
                {errors.placeLowering && <p className="text-red-500 text-sm mt-1">{errors.placeLowering}</p>}
              </div>

              <div>
                <Label htmlFor="loweringDate">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.loweringDate ? format(formData.loweringDate, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.loweringDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, loweringDate: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.loweringDate && <p className="text-red-500 text-sm mt-1">{errors.loweringDate}</p>}
              </div>

              <div>
                <Label htmlFor="boatType1">Boat Type *</Label>
                <Input
                  id="boatType1"
                  value={formData.boatType1}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatType1: e.target.value }))}
                  placeholder="Enter boat type"
                  maxLength={20}
                />
                {errors.boatType1 && <p className="text-red-500 text-sm mt-1">{errors.boatType1}</p>}
              </div>

              <div>
                <Label htmlFor="representativesLowering">Representatives *</Label>
                <Input
                  id="representativesLowering"
                  value={formData.representativesLowering}
                  onChange={(e) => setFormData(prev => ({ ...prev, representativesLowering: e.target.value }))}
                  placeholder="Enter representatives"
                  maxLength={50}
                />
                {errors.representativesLowering && <p className="text-red-500 text-sm mt-1">{errors.representativesLowering}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Harbour Checks */}
        <Card>
          <CardHeader>
            <CardTitle>3. Harbour Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="place">Place *</Label>
                <Input
                  id="place"
                  value={formData.place}
                  onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                  placeholder="Enter place"
                  maxLength={20}
                />
                {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
              </div>

              <div>
                <Label htmlFor="harbourDate">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.harbourDate ? format(formData.harbourDate, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.harbourDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, harbourDate: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.harbourDate && <p className="text-red-500 text-sm mt-1">{errors.harbourDate}</p>}
              </div>

              <div>
                <Label htmlFor="boatType">Boat Type *</Label>
                <Input
                  id="boatType"
                  value={formData.boatType}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatType: e.target.value }))}
                  placeholder="Enter boat type"
                  maxLength={50}
                />
                {errors.boatType && <p className="text-red-500 text-sm mt-1">{errors.boatType}</p>}
              </div>

              <div>
                <Label htmlFor="boatRegnNo">Boat Registration Number *</Label>
                <Input
                  id="boatRegnNo"
                  value={formData.boatRegnNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatRegnNo: e.target.value }))}
                  placeholder="Enter boat registration number"
                  maxLength={50}
                />
                {errors.boatRegnNo && <p className="text-red-500 text-sm mt-1">{errors.boatRegnNo}</p>}
              </div>

              <div>
                <Label htmlFor="ship">Ship *</Label>
                <Input
                  id="ship"
                  value={formData.ship}
                  onChange={(e) => setFormData(prev => ({ ...prev, ship: e.target.value }))}
                  placeholder="Enter ship"
                  maxLength={20}
                />
                {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
              </div>

              <div>
                <Label htmlFor="trialTeams">Trial Teams *</Label>
                <Input
                  id="trialTeams"
                  value={formData.trialTeams}
                  onChange={(e) => setFormData(prev => ({ ...prev, trialTeams: e.target.value }))}
                  placeholder="Enter trial teams"
                  maxLength={50}
                />
                {errors.trialTeams && <p className="text-red-500 text-sm mt-1">{errors.trialTeams}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sub-Components */}
        <Card>
          <CardHeader>
            <CardTitle>4. Sub-Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ObservationSection
              title="(a) Main Engine Function Trials"
              section="mainEngine"
              sectionData={formData.mainEngine}
            />
            
            <ObservationSection
              title="(b) Steering System Including Propeller and Rudder Functional Checks"
              section="steeringSystem"
              sectionData={formData.steeringSystem}
            />
            
            <ObservationSection
              title="(c) Main Engine Gauges & Alarms"
              section="engineGauges"
              sectionData={formData.engineGauges}
            />
            
            <ObservationSection
              title="(d) Battery - Terminal voltage (Pre and Post Starting Operation, Specific Gravity, Electrolyte Levels)"
              section="battery"
              sectionData={formData.battery}
            />
            
            <ObservationSection
              title="(e) Battery Charging Mechanism Including Integrity of Connectors/Battery Charging Sockets and Associated Switches"
              section="batteryCharging"
              sectionData={formData.batteryCharging}
            />
            
            <ObservationSection
              title="(f) Fuel System Including Tanks and Associated Piping"
              section="fuelSystem"
              sectionData={formData.fuelSystem}
            />
            
            <ObservationSection
              title="(g) Bilge Pump (Motor Driven)"
              section="bilgePumpMotor"
              sectionData={formData.bilgePumpMotor}
            />
            
            <ObservationSection
              title="(h) Engine Cabinet & Securing Clips"
              section="engineCabinet"
              sectionData={formData.engineCabinet}
            />
            
            <ObservationSection
              title="(i) Bilge Pump (Hand Operated)"
              section="bilgePumpHand"
              sectionData={formData.bilgePumpHand}
            />
            
            <ObservationSection
              title="(j) Status of Bilges"
              section="statusBilges"
              sectionData={formData.statusBilges}
            />
            
            <ObservationSection
              title="(k) Lights"
              section="lights"
              sectionData={formData.lights}
            />
            
            <ObservationSection
              title="(l) Horn"
              section="horn"
              sectionData={formData.horn}
            />
            
            <ObservationSection
              title="(m) Mast Light"
              section="mastLight"
              sectionData={formData.mastLight}
            />
            
            <ObservationSection
              title="(n) Side Light Port"
              section="sideLightPort"
              sectionData={formData.sideLightPort}
            />
            
            <ObservationSection
              title="(o) Side Light Stbd"
              section="sideLightStbd"
              sectionData={formData.sideLightStbd}
            />
            
            <ObservationSection
              title="(p) NUC Lights"
              section="nucLights"
              sectionData={formData.nucLights}
            />
            
            <ObservationSection
              title="(q) Search Light"
              section="searchLight"
              sectionData={formData.searchLight}
            />
            
            <ObservationSection
              title="(r) Fire & Smoke Detector"
              section="fireSmokeDetector"
              sectionData={formData.fireSmokeDetector}
            />
            
            <ObservationSection
              title="(s) Navigation and Communication System"
              section="navComSystem"
              sectionData={formData.navComSystem}
            />
            
            <ObservationSection
              title="(t) Control System/Wiring Including Proper Cleaning, Sealing, Insulation, Continuity etc."
              section="controlSystem"
              sectionData={formData.controlSystem}
            />
          </CardContent>
        </Card>

        {/* Result of Harbour Checks */}
        <Card>
          <CardHeader>
            <CardTitle>5. Result of Harbour Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specificDefects">(a) Specific Defects Observed Periodically *</Label>
                <Input
                  id="specificDefects"
                  value={formData.specificDefects}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificDefects: e.target.value }))}
                  placeholder="Enter specific defects"
                  maxLength={100}
                />
                {errors.specificDefects && <p className="text-red-500 text-sm mt-1">{errors.specificDefects}</p>}
              </div>

              <div>
                <Label htmlFor="overallStatus">(b) Overall Status *</Label>
                <Input
                  id="overallStatus"
                  value={formData.overallStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, overallStatus: e.target.value }))}
                  placeholder="Enter overall status"
                  maxLength={100}
                />
                {errors.overallStatus && <p className="text-red-500 text-sm mt-1">{errors.overallStatus}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Form
          </Button>
          
          <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Save Draft</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Do you want to save this form as a draft?</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDraftModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveDraft}>
                    Save Draft
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button type="button" variant="outline" onClick={resetForm}>
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RHIBHarbourChecksForm;
