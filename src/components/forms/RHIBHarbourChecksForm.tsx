import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
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
  liftingSlingLoadTestReport: string;
  
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
  
  // Representatives
  shipRepresentative: string;
  trialTeamsRepresentative: string;
  
  // General Inspection
  conditionHullAppendagesGeneralInspection: string;
  
  // Machinery Fitted
  mainEnginesPowerSerialNo: string;
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
    liftingSlingLoadTestReport: '',
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
    shipRepresentative: '',
    trialTeamsRepresentative: '',
    conditionHullAppendagesGeneralInspection: '',
    mainEnginesPowerSerialNo: '',
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
      title: `Draft - ${formData.shipRepresentative || 'Untitled'} - ${formData.boatType || 'No Type'}`
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
    if (!formData.shipRepresentative) newErrors.shipRepresentative = 'Ship Representative is required';
    if (!formData.trialTeamsRepresentative) newErrors.trialTeamsRepresentative = 'Trial Teams Representative is required';
    if (!formData.conditionHullAppendagesGeneralInspection) newErrors.conditionHullAppendagesGeneralInspection = 'General Inspection is required';
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
      liftingSlingLoadTestReport: '',
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
      shipRepresentative: '',
      trialTeamsRepresentative: '',
      conditionHullAppendagesGeneralInspection: '',
      mainEnginesPowerSerialNo: '',
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
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-l-2 border-blue-400">
      <h4 className="font-medium text-gray-900 text-sm md:text-base">{title}</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Form Header */}
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 underline">RHIB - SHIP BORNE BOAT - HARBOUR CHECKS</h2>
            </div>
           
          </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Inspection and Documentation Checks */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with blue accent */}
            <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-800 font-bold mr-2">1.</span>
                General Inspection and Documentation Checks
              </h3>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6 space-y-4">
              <div className="space-y-4">
                {/* Item (a) */}
                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium mr-3">(a)</span>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">Boat Log Book i.a.w Appendix 'C' of NO 03/18 *</span>
                    <div className="mt-2">
                <Input
                  id="boatLogBook"
                  value={formData.boatLogBook}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatLogBook: e.target.value }))}
                        placeholder=""
                  maxLength={50}
                        className="border-gray-300 focus:border-blue-500"
                />
                    </div>
                {errors.boatLogBook && <p className="text-red-500 text-sm mt-1">{errors.boatLogBook}</p>}
                  </div>
              </div>

                {/* Item (b) */}
                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium mr-3">(b)</span>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">Records of Inspection and Maintenance of Boat and Lifting Arrangements i.a.w NO 03/18 *</span>
                    <div className="mt-2">
                <Input
                  id="inspectionMaintenanceRecords"
                  value={formData.inspectionMaintenanceRecords}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspectionMaintenanceRecords: e.target.value }))}
                        placeholder=""
                  maxLength={50}
                        className="border-gray-300 focus:border-blue-500"
                />
                    </div>
                {errors.inspectionMaintenanceRecords && <p className="text-red-500 text-sm mt-1">{errors.inspectionMaintenanceRecords}</p>}
                  </div>
              </div>

                {/* Item (c) */}
                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium mr-3">(c)</span>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">Records of Weighing of Boat i.a.w NO 03/18 *</span>
                    <div className="mt-2">
                <Input
                  id="weighingRecords"
                  value={formData.weighingRecords}
                  onChange={(e) => setFormData(prev => ({ ...prev, weighingRecords: e.target.value }))}
                        placeholder=""
                  maxLength={50}
                        className="border-gray-300 focus:border-blue-500"
                />
                    </div>
                {errors.weighingRecords && <p className="text-red-500 text-sm mt-1">{errors.weighingRecords}</p>}
                  </div>
              </div>

                {/* Item (d) */}
                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium mr-3">(d)</span>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">Boat Log Book Folder i.a.w Part II of Appendix 'C' of NO 03/18 *</span>
                    <div className="mt-2">
                <Input
                  id="boatLogFolder"
                  value={formData.boatLogFolder}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatLogFolder: e.target.value }))}
                        placeholder=""
                  maxLength={50}
                        className="border-gray-300 focus:border-blue-500"
                />
                    </div>
                {errors.boatLogFolder && <p className="text-red-500 text-sm mt-1">{errors.boatLogFolder}</p>}
              </div>
            </div>
              </div>
            </div>
          </div>

        {/* Lowering/Hoisting Test */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with blue accent */}
            <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-800 font-bold mr-2">2.</span>
                Lowering/Hoisting Test
              </h3>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6 space-y-6">
            {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium">Place:</span>
                  <div className="flex-1">
                <Input
                  id="placeLowering"
                  value={formData.placeLowering}
                  onChange={(e) => setFormData(prev => ({ ...prev, placeLowering: e.target.value }))}
                      placeholder=""
                  maxLength={20}
                      className="border-gray-300 focus:border-blue-500"
                />
                {errors.placeLowering && <p className="text-red-500 text-sm mt-1">{errors.placeLowering}</p>}
                  </div>
              </div>

                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium">Date:</span>
                  <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.loweringDate ? format(formData.loweringDate, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
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
              </div>

                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium">Boat Type:</span>
                  <div className="flex-1">
                <Input
                  id="boatType1"
                  value={formData.boatType1}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatType1: e.target.value }))}
                      placeholder=""
                  maxLength={20}
                      className="border-gray-300 focus:border-blue-500"
                />
                {errors.boatType1 && <p className="text-red-500 text-sm mt-1">{errors.boatType1}</p>}
                  </div>
              </div>

                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium">Representatives:  </span>
                  <div className="flex-1">
                <Input
                  id="representativesLowering"
                  value={formData.representativesLowering}
                  onChange={(e) => setFormData(prev => ({ ...prev, representativesLowering: e.target.value }))}
                      placeholder=""
                  maxLength={50}
                      className="border-gray-300 focus:border-blue-500"
                />
                {errors.representativesLowering && <p className="text-red-500 text-sm mt-1">{errors.representativesLowering}</p>}
                  </div>
              </div>
            </div>

            {/* Documentation */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4 text-base md:text-lg">Documentation</h4>
                <div className="space-y-4">
                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(a)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Load Test Certificate for Crane *</span>
                      <div className="mt-2">
                  <Input
                    id="loadTestCrane"
                    value={formData.loadTestCrane}
                    onChange={(e) => setFormData(prev => ({ ...prev, loadTestCrane: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(b)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Test Certificate for ARH *</span>
                      <div className="mt-2">
                  <Input
                    id="testCertificateArh"
                    value={formData.testCertificateArh}
                    onChange={(e) => setFormData(prev => ({ ...prev, testCertificateArh: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(c)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Lifting Sling Load Test Report and Visual Inspection of Lifting Eyes/Hooks *</span>
                      <div className="mt-2">
                  <Input
                    id="liftingSlingLoadTestReport"
                    value={formData.liftingSlingLoadTestReport}
                    onChange={(e) => setFormData(prev => ({ ...prev, liftingSlingLoadTestReport: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>
              </div>
            </div>

            {/* General Inspection Post Hoisting */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4 text-base md:text-lg">General Inspection Post Hoisting of Boat</h4>
                <div className="space-y-4">
                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(a)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Condition of Hull Appendages and Rubber Collar *</span>
                      <div className="mt-2">
                  <Input
                    id="conditionHullAppendages"
                    value={formData.conditionHullAppendages}
                    onChange={(e) => setFormData(prev => ({ ...prev, conditionHullAppendages: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(b)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Condition of Paint *</span>
                      <div className="mt-2">
                  <Input
                    id="conditionOfPaint"
                    value={formData.conditionOfPaint}
                    onChange={(e) => setFormData(prev => ({ ...prev, conditionOfPaint: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(c)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Condition of Hull Fittings (Loose/Not Secured) *</span>
                      <div className="mt-2">
                  <Input
                    id="conditionHullFittings"
                    value={formData.conditionHullFittings}
                    onChange={(e) => setFormData(prev => ({ ...prev, conditionHullFittings: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(d)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Condition of Lifting Arrangement Fitted on Boat (Inspect Records on Survey of Metallic Fitting for Lifting Arrangement) *</span>
                      <div className="mt-2">
                  <Input
                    id="conditionLiftingArrangement"
                    value={formData.conditionLiftingArrangement}
                    onChange={(e) => setFormData(prev => ({ ...prev, conditionLiftingArrangement: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(e)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Inspect Record of Lifting Slings/FSWR *</span>
                      <div className="mt-2">
                  <Input
                    id="inspectRecordSlings"
                    value={formData.inspectRecordSlings}
                    onChange={(e) => setFormData(prev => ({ ...prev, inspectRecordSlings: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Inspection of Webbing Sling */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4 text-base md:text-lg">Inspection of Webbing Sling</h4>
                <div className="space-y-4">
                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(a)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Visual Survey of Webbing Sling *</span>
                      <div className="mt-2">
                  <Input
                    id="visualSurveySling"
                    value={formData.visualSurveySling}
                    onChange={(e) => setFormData(prev => ({ ...prev, visualSurveySling: e.target.value }))}
                          placeholder=""
                    maxLength={50}
                          className="border-gray-300 focus:border-blue-500"
                  />
                      </div>
                    </div>
                </div>

                  <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                    <span className="text-gray-800 font-medium mr-3">(b)</span>
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">Year of Manufacture *</span>
                      <div className="mt-2">
                  <Input
                    id="yearOfManufactureSling"
                    value={formData.yearOfManufactureSling}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearOfManufactureSling: e.target.value }))}
                          placeholder=""
                    maxLength={4}
                          className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
                </div>
              </div>
            </div>
          </div>

        {/* Harbour Checks */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with blue accent */}
            <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-800 font-bold mr-2">3.</span>
                Harbour Checks
              </h3>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6">
              <div className="table-responsive">
                <table className="table table-striped table-bordered w-full">
                  <tbody>
                    {/* Row 1: Place and Date */}
                    <tr>
                      <td className="p-3">
                        <label htmlFor="place" className="block text-gray-800 font-medium mb-2">
                          Place: <strong className="text-red-500">*</strong>
                        </label>
                        <Input
                          id="place"
                          value={formData.place}
                          onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                          placeholder=""
                          maxLength={20}
                          className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                        />
                        {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
                      </td>
                      <td className="p-3">
                        <label htmlFor="harbourDate" className="block text-gray-800 font-medium mb-2">
                          Date: <strong className="text-red-500">*</strong>
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal border border-gray-300 focus:border-blue-500 rounded px-3 py-2">
                              {formData.harbourDate ? format(formData.harbourDate, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
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
                      </td>
                    </tr>

                    {/* Row 2: Boat Type and Boat Regn No */}
                    <tr>
                      <td className="p-3">
                        <label htmlFor="boatType" className="block text-gray-800 font-medium mb-2">
                          Boat Type: <strong className="text-red-500">*</strong>
                        </label>
                        <Input
                          id="boatType"
                          value={formData.boatType}
                          onChange={(e) => setFormData(prev => ({ ...prev, boatType: e.target.value }))}
                          placeholder=""
                          maxLength={50}
                          className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                        />
                        {errors.boatType && <p className="text-red-500 text-sm mt-1">{errors.boatType}</p>}
                      </td>
                      <td className="p-3">
                        <label htmlFor="boatRegnNo" className="block text-gray-800 font-medium mb-2">
                          Boat Regn No: <strong className="text-red-500">*</strong>
                        </label>
                        <Input
                          id="boatRegnNo"
                          value={formData.boatRegnNo}
                          onChange={(e) => setFormData(prev => ({ ...prev, boatRegnNo: e.target.value }))}
                          placeholder=""
                          maxLength={50}
                          className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                        />
                        {errors.boatRegnNo && <p className="text-red-500 text-sm mt-1">{errors.boatRegnNo}</p>}
                      </td>
                    </tr>

                    {/* Row 3: Representatives */}
                    <tr>
                      <td className="p-3">
                        <label className="block text-gray-800 font-medium mb-2">Representatives</label>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="shipRepresentative" className="block text-gray-800 font-medium mb-1">
                              (a) Ship: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="shipRepresentative"
                              value={formData.shipRepresentative}
                              onChange={(e) => setFormData(prev => ({ ...prev, shipRepresentative: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                            {errors.shipRepresentative && <p className="text-red-500 text-sm mt-1">{errors.shipRepresentative}</p>}
                          </div>
                          <div>
                            <label htmlFor="trialTeamsRepresentative" className="block text-gray-800 font-medium mb-1">
                              (b) Trial Teams: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="trialTeamsRepresentative"
                              value={formData.trialTeamsRepresentative}
                              onChange={(e) => setFormData(prev => ({ ...prev, trialTeamsRepresentative: e.target.value }))}
                              placeholder=""
                              maxLength={50}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                            {errors.trialTeamsRepresentative && <p className="text-red-500 text-sm mt-1">{errors.trialTeamsRepresentative}</p>}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4: General Inspection */}
                    <tr>
                      <td className="p-3">
                        <label className="block text-gray-800 font-medium mb-2">General Inspection</label>
                      </td>
                      <td className="p-3">
                        <label htmlFor="conditionHullAppendagesGeneralInspection" className="block text-gray-800 font-medium mb-1">
                          Condition of Hull, Appendages and Rubber Collar-SAT: <strong className="text-red-500">*</strong>
                        </label>
                        <Input
                          id="conditionHullAppendagesGeneralInspection"
                          value={formData.conditionHullAppendagesGeneralInspection}
                          onChange={(e) => setFormData(prev => ({ ...prev, conditionHullAppendagesGeneralInspection: e.target.value }))}
                          placeholder=""
                          maxLength={50}
                          className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                        />
                        {errors.conditionHullAppendagesGeneralInspection && <p className="text-red-500 text-sm mt-1">{errors.conditionHullAppendagesGeneralInspection}</p>}
                      </td>
                    </tr>

                    {/* Row 5: Machinery Fitted Header */}
                    <tr>
                      <td colSpan={2} className="p-3 bg-gray-50">
                        <strong className="text-gray-800">Machinery Fitted</strong>
                      </td>
                    </tr>

                    {/* Row 6: Main Engines */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(a) Main Engines</span>
                      </td>
                      <td className="p-3">
                        <label htmlFor="mainEnginesPowerSerialNo" className="block text-gray-800 font-medium mb-1">
                          Power/Serial No: <strong className="text-red-500">*</strong>
                        </label>
                        <Input
                          id="mainEnginesPowerSerialNo"
                          value={formData.mainEnginesPowerSerialNo}
                          onChange={(e) => setFormData(prev => ({ ...prev, mainEnginesPowerSerialNo: e.target.value }))}
                          placeholder=""
                          maxLength={20}
                          className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                        />
                      </td>
                    </tr>

                    {/* Row 7: Drive Units */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(b) Drive Units</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="driveUnitsMake" className="block text-gray-800 font-medium mb-1">
                              Make: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="driveUnitsMake"
                              value={formData.driveUnitsMake}
                              onChange={(e) => setFormData(prev => ({ ...prev, driveUnitsMake: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label htmlFor="driveUnitsSerialNo" className="block text-gray-800 font-medium mb-1">
                              Serial No: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="driveUnitsSerialNo"
                              value={formData.driveUnitsSerialNo}
                              onChange={(e) => setFormData(prev => ({ ...prev, driveUnitsSerialNo: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 8: Transom Shield */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(c) Transom Shield</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="transomShieldMake" className="block text-gray-800 font-medium mb-1">
                              Make: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="transomShieldMake"
                              value={formData.transomShieldMake}
                              onChange={(e) => setFormData(prev => ({ ...prev, transomShieldMake: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label htmlFor="transomShieldSerialNo" className="block text-gray-800 font-medium mb-1">
                              Serial No: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="transomShieldSerialNo"
                              value={formData.transomShieldSerialNo}
                              onChange={(e) => setFormData(prev => ({ ...prev, transomShieldSerialNo: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 9: Bilge Pump (Motor Driven) */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(d) Bilge Pump (Motor Driven)</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="bilgePumpMotorMake" className="block text-gray-800 font-medium mb-1">
                              Make: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="bilgePumpMotorMake"
                              value={formData.bilgePumpMotorMake}
                              onChange={(e) => setFormData(prev => ({ ...prev, bilgePumpMotorMake: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label htmlFor="bilgePumpMotorCapacity" className="block text-gray-800 font-medium mb-1">
                              Capacity: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="bilgePumpMotorCapacity"
                              value={formData.bilgePumpMotorCapacity}
                              onChange={(e) => setFormData(prev => ({ ...prev, bilgePumpMotorCapacity: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 10: Bilge Pump (Hand Operated) */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(e) Bilge Pump (Hand Operated)</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="bilgePumpHandMake" className="block text-gray-800 font-medium mb-1">
                              Make: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="bilgePumpHandMake"
                              value={formData.bilgePumpHandMake}
                              onChange={(e) => setFormData(prev => ({ ...prev, bilgePumpHandMake: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label htmlFor="bilgePumpHandCapacity" className="block text-gray-800 font-medium mb-1">
                              Capacity: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="bilgePumpHandCapacity"
                              value={formData.bilgePumpHandCapacity}
                              onChange={(e) => setFormData(prev => ({ ...prev, bilgePumpHandCapacity: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 11: Batteries */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(f) Batteries</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="batteriesMake" className="block text-gray-800 font-medium mb-1">
                              Make: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="batteriesMake"
                              value={formData.batteriesMake}
                              onChange={(e) => setFormData(prev => ({ ...prev, batteriesMake: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label htmlFor="batteriesModel" className="block text-gray-800 font-medium mb-1">
                              Model: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="batteriesModel"
                              value={formData.batteriesModel}
                              onChange={(e) => setFormData(prev => ({ ...prev, batteriesModel: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 12: DG Set */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(g) DG Set</span>
                      </td>
                      <td className="p-3">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="dgSetMake" className="block text-gray-800 font-medium mb-1">
                              Make: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="dgSetMake"
                              value={formData.dgSetMake}
                              onChange={(e) => setFormData(prev => ({ ...prev, dgSetMake: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label htmlFor="dgSetModel" className="block text-gray-800 font-medium mb-1">
                              Model: <strong className="text-red-500">*</strong>
                            </label>
                            <Input
                              id="dgSetModel"
                              value={formData.dgSetModel}
                              onChange={(e) => setFormData(prev => ({ ...prev, dgSetModel: e.target.value }))}
                              placeholder=""
                              maxLength={20}
                              className="w-full border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        {/* Sub-Components */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with blue accent */}
            <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-800 font-bold mr-2">4.</span>
                Sub-Components
              </h3>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6">
              <div className="table-responsive">
                <table className="table table-striped table-bordered w-full">
                  <tbody>
                    {/* Row 1: Main Engine Function Trials */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(a) Main Engine Function Trials</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.mainEngine.observations}
                              onValueChange={(value) => updateSectionData('mainEngine', 'observations', value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select observation" />
                              </SelectTrigger>
                              <SelectContent>
                                {observations.map(obs => (
                                  <SelectItem key={obs} value={obs}>{obs}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.mainEngine_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.mainEngine_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.mainEngine.remarks}
                              onChange={(e) => updateSectionData('mainEngine', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.mainEngine_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.mainEngine_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2: Steering System */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(b) Steering System Including Propeller and Rudder Functional Checks</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.steeringSystem.observations}
                              onValueChange={(value) => updateSectionData('steeringSystem', 'observations', value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select observation" />
                              </SelectTrigger>
                              <SelectContent>
                                {observations.map(obs => (
                                  <SelectItem key={obs} value={obs}>{obs}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.steeringSystem_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.steeringSystem_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.steeringSystem.remarks}
                              onChange={(e) => updateSectionData('steeringSystem', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.steeringSystem_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.steeringSystem_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3: Main Engine Gauges & Alarms */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(c) Main Engine Gauges & Alarms</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.engineGauges.observations}
                              onValueChange={(value) => updateSectionData('engineGauges', 'observations', value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select observation" />
                              </SelectTrigger>
                              <SelectContent>
                                {observations.map(obs => (
                                  <SelectItem key={obs} value={obs}>{obs}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.engineGauges_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.engineGauges_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.engineGauges.remarks}
                              onChange={(e) => updateSectionData('engineGauges', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.engineGauges_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.engineGauges_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4: Battery */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(d) Battery Terminal voltage (Pre and Post Starting Operation, Specific Gravity, Electrolyte Levels)</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.battery.observations}
                              onValueChange={(value) => updateSectionData('battery', 'observations', value)}
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
                            {errors.battery_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.battery_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.battery.remarks}
                              onChange={(e) => updateSectionData('battery', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.battery_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.battery_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 5: Battery Charging */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(e) Battery Charging Mechanism Including Integrity of Connectors/Battery Charging Sockets and Associated Switches</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.batteryCharging.observations}
                              onValueChange={(value) => updateSectionData('batteryCharging', 'observations', value)}
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
                            {errors.batteryCharging_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.batteryCharging_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.batteryCharging.remarks}
                              onChange={(e) => updateSectionData('batteryCharging', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.batteryCharging_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.batteryCharging_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 6: Fuel System */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(f) Fuel System Including Tanks and Associated Piping</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.fuelSystem.observations}
                              onValueChange={(value) => updateSectionData('fuelSystem', 'observations', value)}
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
                            {errors.fuelSystem_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.fuelSystem_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.fuelSystem.remarks}
                              onChange={(e) => updateSectionData('fuelSystem', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.fuelSystem_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.fuelSystem_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 7: Bilge Pump (Motor Driven) */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(g) Bilge Pump (Motor Driven)</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.bilgePumpMotor.observations}
                              onValueChange={(value) => updateSectionData('bilgePumpMotor', 'observations', value)}
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
                            {errors.bilgePumpMotor_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.bilgePumpMotor_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.bilgePumpMotor.remarks}
                              onChange={(e) => updateSectionData('bilgePumpMotor', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.bilgePumpMotor_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.bilgePumpMotor_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 8: Engine Cabinet & Securing Clips */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(h) Engine Cabinet & Securing Clips</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.engineCabinet.observations}
                              onValueChange={(value) => updateSectionData('engineCabinet', 'observations', value)}
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
                            {errors.engineCabinet_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.engineCabinet_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.engineCabinet.remarks}
                              onChange={(e) => updateSectionData('engineCabinet', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.engineCabinet_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.engineCabinet_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 9: Bilge Pump (Hand Operated) */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(i) Bilge Pump (Hand Operated)</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.bilgePumpHand.observations}
                              onValueChange={(value) => updateSectionData('bilgePumpHand', 'observations', value)}
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
                            {errors.bilgePumpHand_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.bilgePumpHand_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.bilgePumpHand.remarks}
                              onChange={(e) => updateSectionData('bilgePumpHand', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.bilgePumpHand_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.bilgePumpHand_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 10: Status of Bilges */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(j) Status of Bilges</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.statusBilges.observations}
                              onValueChange={(value) => updateSectionData('statusBilges', 'observations', value)}
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
                            {errors.statusBilges_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.statusBilges_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.statusBilges.remarks}
                              onChange={(e) => updateSectionData('statusBilges', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.statusBilges_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.statusBilges_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 11: Lights */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(k) Lights</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.lights.observations}
                              onValueChange={(value) => updateSectionData('lights', 'observations', value)}
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
                            {errors.lights_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.lights_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.lights.remarks}
                              onChange={(e) => updateSectionData('lights', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.lights_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.lights_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 12: Horn */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(l) Horn</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.horn.observations}
                              onValueChange={(value) => updateSectionData('horn', 'observations', value)}
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
                            {errors.horn_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.horn_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.horn.remarks}
                              onChange={(e) => updateSectionData('horn', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.horn_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.horn_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 13: Mast Light */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(m) Mast Light</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.mastLight.observations}
                              onValueChange={(value) => updateSectionData('mastLight', 'observations', value)}
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
                            {errors.mastLight_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.mastLight_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.mastLight.remarks}
                              onChange={(e) => updateSectionData('mastLight', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.mastLight_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.mastLight_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 14: Side Light Port */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(n) Side Light Port</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.sideLightPort.observations}
                              onValueChange={(value) => updateSectionData('sideLightPort', 'observations', value)}
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
                            {errors.sideLightPort_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.sideLightPort_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.sideLightPort.remarks}
                              onChange={(e) => updateSectionData('sideLightPort', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.sideLightPort_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.sideLightPort_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 15: Side Light Stbd */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(o) Side Light Stbd</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.sideLightStbd.observations}
                              onValueChange={(value) => updateSectionData('sideLightStbd', 'observations', value)}
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
                            {errors.sideLightStbd_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.sideLightStbd_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.sideLightStbd.remarks}
                              onChange={(e) => updateSectionData('sideLightStbd', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.sideLightStbd_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.sideLightStbd_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 16: NUC Lights */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(p) NUC Lights</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.nucLights.observations}
                              onValueChange={(value) => updateSectionData('nucLights', 'observations', value)}
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
                            {errors.nucLights_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.nucLights_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.nucLights.remarks}
                              onChange={(e) => updateSectionData('nucLights', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.nucLights_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.nucLights_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 17: Search Light */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(q) Search Light</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.searchLight.observations}
                              onValueChange={(value) => updateSectionData('searchLight', 'observations', value)}
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
                            {errors.searchLight_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.searchLight_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.searchLight.remarks}
                              onChange={(e) => updateSectionData('searchLight', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.searchLight_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.searchLight_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 18: Fire & Smoke Detector */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(r) Fire & Smoke Detector</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.fireSmokeDetector.observations}
                              onValueChange={(value) => updateSectionData('fireSmokeDetector', 'observations', value)}
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
                            {errors.fireSmokeDetector_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.fireSmokeDetector_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.fireSmokeDetector.remarks}
                              onChange={(e) => updateSectionData('fireSmokeDetector', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.fireSmokeDetector_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.fireSmokeDetector_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 19: Navigation and Communication System */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(s) Navigation and Communication System</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.navComSystem.observations}
                              onValueChange={(value) => updateSectionData('navComSystem', 'observations', value)}
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
                            {errors.navComSystem_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.navComSystem_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.navComSystem.remarks}
                              onChange={(e) => updateSectionData('navComSystem', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.navComSystem_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.navComSystem_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 20: Control System/Wiring */}
                    <tr>
                      <td className="p-3">
                        <span className="text-gray-800 font-medium">(t) Control System/Wiring Including Proper Cleaning, Sealing, Insulation, Continuity etc.</span>
                      </td>
                      <td className="p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Observations: <strong className="text-red-500">*</strong>
                            </label>
                            <Select
                              value={formData.controlSystem.observations}
                              onValueChange={(value) => updateSectionData('controlSystem', 'observations', value)}
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
                            {errors.controlSystem_observations && (
                              <p className="text-red-500 text-sm mt-1">{errors.controlSystem_observations}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-800 font-medium mb-1">
                              Remarks: <strong className="text-red-500">*</strong>
                            </label>
                            <Textarea
                              value={formData.controlSystem.remarks}
                              onChange={(e) => updateSectionData('controlSystem', 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                              rows={2}
                              className="w-full"
                            />
                            {errors.controlSystem_remarks && (
                              <p className="text-red-500 text-sm mt-1">{errors.controlSystem_remarks}</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        {/* Result of Harbour Checks */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with blue accent */}
            <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-800 font-bold mr-2">5.</span>
                Result of Harbour Checks
              </h3>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium mr-3">(a)</span>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">Specific Defects Observed Periodically *</span>
                    <div className="mt-2">
                <Input
                  id="specificDefects"
                  value={formData.specificDefects}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificDefects: e.target.value }))}
                        placeholder=""
                  maxLength={100}
                        className="border-gray-300 focus:border-blue-500"
                />
                    </div>
                {errors.specificDefects && <p className="text-red-500 text-sm mt-1">{errors.specificDefects}</p>}
                  </div>
              </div>

                <div className="flex items-center border-l-2 border-blue-400 pl-4 py-2">
                  <span className="text-gray-800 font-medium mr-3">(b)</span>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium">Overall Status *</span>
                    <div className="mt-2">
                <Input
                  id="overallStatus"
                  value={formData.overallStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, overallStatus: e.target.value }))}
                        placeholder=""
                  maxLength={100}
                        className="border-gray-300 focus:border-blue-500"
                />
                    </div>
                {errors.overallStatus && <p className="text-red-500 text-sm mt-1">{errors.overallStatus}</p>}
              </div>
            </div>
              </div>
            </div>
          </div>

        {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base" onClick={() => setIsDraftModalOpen(true)}>
            Fetch Drafts
          </Button>
          
            <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base" onClick={saveDraft}>
            SAVE DRAFT
          </Button>
          
            <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base" onClick={resetForm}>
            Clear
          </Button>
          
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base">
            Save
          </Button>
        </div>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
                <DialogTitle className="text-lg md:text-xl">Saved Drafts</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {drafts.length === 0 ? (
                  <p className="text-center text-gray-500">No drafts saved yet</p>
                ) : (
                  drafts.map((draft) => (
                      <div key={draft.id} className="border rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm md:text-base">{draft.title}</h3>
                            <p className="text-xs md:text-sm text-gray-500">
                            {new Date(draft.timestamp).toLocaleString()}
                          </p>
                        </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setFormData(draft);
                              setIsDraftModalOpen(false);
                            }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs md:text-sm"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              const updatedDrafts = drafts.filter(d => d.id !== draft.id);
                              setDrafts(updatedDrafts);
                              localStorage.setItem('rhibHarbourChecks_drafts', JSON.stringify(updatedDrafts));
                            }}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs md:text-sm"
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
    </div>
  );
};

export default RHIBHarbourChecksForm;
