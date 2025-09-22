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
import { CalendarIcon, Save, FileText, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface RasCapstanData {
  ship: string;
  dateOfInspection: Date | null;
  make: string;
  type: string;
  yearOfManufacture: string;
  refDocuments: string;
  completionOfCompleteOverhaul: {
    observations: string;
    remarks: string;
  };
  dateOfLastStructuralSurvey: Date | null;
  listOfPendingObservations: {
    observations: string;
    remarks: string;
  };
  completionOfLoadTesting: {
    observations: string;
    remarks: string;
  };
  checkLoadTesting: {
    observations: string;
    remarks: string;
  };
  conditionOfFoundationDeck: {
    observations: string;
    remarks: string;
  };
  conditionOfCapstan: {
    observations: string;
    remarks: string;
  };
  conditionOfBrakeBrake: {
    observations: string;
    remarks: string;
  };
  conditionGreasingPoints: {
    observations: string;
    remarks: string;
  };
  greaseUsed: {
    observations: string;
    remarks: string;
  };
  greasingOfAllMovable: {
    observations: string;
    remarks: string;
  };
  lastDateOilChange: Date | null;
  oilBeingUsedInGearBox: {
    observations: string;
    remarks: string;
  };
  oilLevelInGearBox: {
    observations: string;
    remarks: string;
  };
  insulationChecks: {
    observations: string;
    remarks: string;
  };
  spmChecks: {
    observations: string;
    remarks: string;
  };
  conditionOfCable: {
    observations: string;
    remarks: string;
  };
  conditionOfEarthing: {
    observations: string;
    remarks: string;
  };
  tightnessOfElectrical: {
    observations: string;
    remarks: string;
  };
  conditionOfJb: {
    observations: string;
    remarks: string;
  };
  electricalChecks: {
    observations: string;
    remarks: string;
  };
  availabilityOfReports: {
    observations: string;
    remarks: string;
  };
  trailsInAllSpeeds: {
    observations: string;
    remarks: string;
  };
  driveGearBox: {
    observations: string;
    remarks: string;
  };
  oilLeakage: {
    observations: string;
    remarks: string;
  };
  otherObservations: string;
  overallRemarks: string;
  authoritySignature: File | null;
}

const RasCapstanForm: React.FC = () => {
  const [formData, setFormData] = useState<RasCapstanData>({
    ship: '',
    dateOfInspection: null,
    make: '',
    type: '',
    yearOfManufacture: '',
    refDocuments: '',
    completionOfCompleteOverhaul: { observations: '', remarks: '' },
    dateOfLastStructuralSurvey: null,
    listOfPendingObservations: { observations: '', remarks: '' },
    completionOfLoadTesting: { observations: '', remarks: '' },
    checkLoadTesting: { observations: '', remarks: '' },
    conditionOfFoundationDeck: { observations: '', remarks: '' },
    conditionOfCapstan: { observations: '', remarks: '' },
    conditionOfBrakeBrake: { observations: '', remarks: '' },
    conditionGreasingPoints: { observations: '', remarks: '' },
    greaseUsed: { observations: '', remarks: '' },
    greasingOfAllMovable: { observations: '', remarks: '' },
    lastDateOilChange: null,
    oilBeingUsedInGearBox: { observations: '', remarks: '' },
    oilLevelInGearBox: { observations: '', remarks: '' },
    insulationChecks: { observations: '', remarks: '' },
    spmChecks: { observations: '', remarks: '' },
    conditionOfCable: { observations: '', remarks: '' },
    conditionOfEarthing: { observations: '', remarks: '' },
    tightnessOfElectrical: { observations: '', remarks: '' },
    conditionOfJb: { observations: '', remarks: '' },
    electricalChecks: { observations: '', remarks: '' },
    availabilityOfReports: { observations: '', remarks: '' },
    trailsInAllSpeeds: { observations: '', remarks: '' },
    driveGearBox: { observations: '', remarks: '' },
    oilLeakage: { observations: '', remarks: '' },
    otherObservations: '',
    overallRemarks: '',
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
    const savedDrafts = localStorage.getItem('rasCapstan_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  };

  const saveDraft = () => {
    const draftData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      title: `Draft - ${formData.ship || 'Untitled'} - ${formData.make || 'No Make'}`
    };
    
    const updatedDrafts = [...drafts, draftData];
    setDrafts(updatedDrafts);
    localStorage.setItem('rasCapstan_drafts', JSON.stringify(updatedDrafts));
    setIsDraftModalOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ship) newErrors.ship = 'Ship selection is required';
    if (!formData.dateOfInspection) newErrors.dateOfInspection = 'Date of inspection is required';
    if (!formData.make) newErrors.make = 'Make & Model is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.yearOfManufacture) newErrors.yearOfManufacture = 'Year of manufacture is required';
    if (!formData.refDocuments) newErrors.refDocuments = 'Ref Documents is required';
    if (!formData.authoritySignature) newErrors.authoritySignature = 'Authority signature is required';

    // Validate observations and remarks for each section
    const sections = [
      'completionOfCompleteOverhaul', 'listOfPendingObservations', 'completionOfLoadTesting',
      'checkLoadTesting', 'conditionOfFoundationDeck', 'conditionOfCapstan', 'conditionOfBrakeBrake',
      'conditionGreasingPoints', 'greaseUsed', 'greasingOfAllMovable', 'oilBeingUsedInGearBox',
      'oilLevelInGearBox', 'insulationChecks', 'spmChecks', 'conditionOfCable', 'conditionOfEarthing',
      'tightnessOfElectrical', 'conditionOfJb', 'electricalChecks', 'availabilityOfReports',
      'trailsInAllSpeeds', 'driveGearBox', 'oilLeakage'
    ];

    sections.forEach(section => {
      const sectionData = formData[section as keyof RasCapstanData] as any;
      if (!sectionData.observations) {
        newErrors[`${section}_observations`] = 'Observations are required';
      }
      if (!sectionData.remarks) {
        newErrors[`${section}_remarks`] = 'Remarks are required';
      }
    });

    if (!formData.otherObservations) newErrors.otherObservations = 'Other observations are required';
    if (!formData.overallRemarks) newErrors.overallRemarks = 'Overall remarks are required';

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
      ship: '',
      dateOfInspection: null,
      make: '',
      type: '',
      yearOfManufacture: '',
      refDocuments: '',
      completionOfCompleteOverhaul: { observations: '', remarks: '' },
      dateOfLastStructuralSurvey: null,
      listOfPendingObservations: { observations: '', remarks: '' },
      completionOfLoadTesting: { observations: '', remarks: '' },
      checkLoadTesting: { observations: '', remarks: '' },
      conditionOfFoundationDeck: { observations: '', remarks: '' },
      conditionOfCapstan: { observations: '', remarks: '' },
      conditionOfBrakeBrake: { observations: '', remarks: '' },
      conditionGreasingPoints: { observations: '', remarks: '' },
      greaseUsed: { observations: '', remarks: '' },
      greasingOfAllMovable: { observations: '', remarks: '' },
      lastDateOilChange: null,
      oilBeingUsedInGearBox: { observations: '', remarks: '' },
      oilLevelInGearBox: { observations: '', remarks: '' },
      insulationChecks: { observations: '', remarks: '' },
      spmChecks: { observations: '', remarks: '' },
      conditionOfCable: { observations: '', remarks: '' },
      conditionOfEarthing: { observations: '', remarks: '' },
      tightnessOfElectrical: { observations: '', remarks: '' },
      conditionOfJb: { observations: '', remarks: '' },
      electricalChecks: { observations: '', remarks: '' },
      availabilityOfReports: { observations: '', remarks: '' },
      trailsInAllSpeeds: { observations: '', remarks: '' },
      driveGearBox: { observations: '', remarks: '' },
      oilLeakage: { observations: '', remarks: '' },
      otherObservations: '',
      overallRemarks: '',
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

  const updateSectionData = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof RasCapstanData] as any,
        [field]: value
      }
    }));
  };

  const ObservationSection: React.FC<{ 
    title: string; 
    section: string; 
    sectionData: { observations: string; remarks: string };
    required?: boolean;
  }> = ({ title, section, sectionData, required = true }) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Observations {required && '*'}</Label>
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
          <Label>Remarks {required && '*'}</Label>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RAS CAPSTAN</h1>
        <p className="text-gray-600">Form for RAS Capstan inspection and trials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ship">Ship *</Label>
                <Select value={formData.ship} onValueChange={(value) => setFormData(prev => ({ ...prev, ship: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Ship" />
                  </SelectTrigger>
                  <SelectContent>
                    {ships.map(ship => (
                      <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfInspection">Date of Inspection/Trials *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfInspection ? format(formData.dateOfInspection, 'dd/MM/yyyy') : 'Select date'}
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

              <div>
                <Label htmlFor="make">Make & Model *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
                  placeholder="Enter make & model"
                  maxLength={20}
                />
                {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Enter type"
                  maxLength={20}
                />
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div>
                <Label htmlFor="yearOfManufacture">Year of Manufacture *</Label>
                <Input
                  id="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearOfManufacture: e.target.value }))}
                  placeholder="Enter year"
                  maxLength={4}
                />
                {errors.yearOfManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearOfManufacture}</p>}
              </div>

              <div>
                <Label htmlFor="refDocuments">Ref Documents *</Label>
                <Input
                  id="refDocuments"
                  value={formData.refDocuments}
                  onChange={(e) => setFormData(prev => ({ ...prev, refDocuments: e.target.value }))}
                  placeholder="Enter ref documents"
                  maxLength={50}
                />
                {errors.refDocuments && <p className="text-red-500 text-sm mt-1">{errors.refDocuments}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Routines */}
        <Card>
          <CardHeader>
            <CardTitle>7. Maintenance Routines i.a.w Maintop & OEM Manual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">a) Completion of Complete Overhaul (NR/MR) i.a.w Maintops to be Confirmed by SS/Refitting Authority</p>
            <ObservationSection
              title=""
              section="completionOfCompleteOverhaul"
              sectionData={formData.completionOfCompleteOverhaul}
            />
          </CardContent>
        </Card>

        {/* Structure */}
        <Card>
          <CardHeader>
            <CardTitle>8. Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">SS to Confirm</p>
            <p className="text-sm text-gray-600">a) Date of Last Structural Survey of Surrounding Structure and Equipment Foundation</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfLastStructuralSurvey ? format(formData.dateOfLastStructuralSurvey, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfLastStructuralSurvey || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateOfLastStructuralSurvey: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <p className="text-sm text-gray-600">b) List of Pending Observations for Liquidation(if any)</p>
            <ObservationSection
              title=""
              section="listOfPendingObservations"
              sectionData={formData.listOfPendingObservations}
            />
          </CardContent>
        </Card>

        {/* Load Testing */}
        <Card>
          <CardHeader>
            <CardTitle>9. Load Testing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">SS To Confirm</p>
            <p className="text-sm text-gray-600">a) Completion of Load Testing i.a.w OEM Manual</p>
            <ObservationSection
              title=""
              section="completionOfLoadTesting"
              sectionData={formData.completionOfLoadTesting}
            />
            
            <p className="text-sm text-gray-600">b) Check Load Testing Certificates</p>
            <ObservationSection
              title=""
              section="checkLoadTesting"
              sectionData={formData.checkLoadTesting}
            />
          </CardContent>
        </Card>

        {/* Visual Inspection */}
        <Card>
          <CardHeader>
            <CardTitle>10. Visual Inspection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">a) Condition of Foundation Deck Plate and Surrounding Deck Plate and Surrounding Structure and Foundation</p>
            <ObservationSection
              title=""
              section="conditionOfFoundationDeck"
              sectionData={formData.conditionOfFoundationDeck}
            />
            
            <p className="text-sm text-gray-600">b) Condition of Capstan Drum</p>
            <ObservationSection
              title=""
              section="conditionOfCapstan"
              sectionData={formData.conditionOfCapstan}
            />
            
            <p className="text-sm text-gray-600">c) Condition of Brake/Brake Band (wear & tear,deep scoring marks,etc)</p>
            <ObservationSection
              title=""
              section="conditionOfBrakeBrake"
              sectionData={formData.conditionOfBrakeBrake}
            />
          </CardContent>
        </Card>

        {/* Greasing */}
        <Card>
          <CardHeader>
            <CardTitle>11. Greasing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">a) Condition of Greasing Points</p>
            <ObservationSection
              title=""
              section="conditionGreasingPoints"
              sectionData={formData.conditionGreasingPoints}
            />
            
            <p className="text-sm text-gray-600 font-medium">SS to Confirm</p>
            <p className="text-sm text-gray-600">b) Grease used i.a.w OEM Manual Points</p>
            <ObservationSection
              title=""
              section="greaseUsed"
              sectionData={formData.greaseUsed}
            />
            
            <p className="text-sm text-gray-600">c) Greasing of all Movable Parts</p>
            <ObservationSection
              title=""
              section="greasingOfAllMovable"
              sectionData={formData.greasingOfAllMovable}
            />
          </CardContent>
        </Card>

        {/* Oil */}
        <Card>
          <CardHeader>
            <CardTitle>12. Oil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">SS to Confirm</p>
            <p className="text-sm text-gray-600">a) Last Date of Oil Change (annual i.a.w MainTops)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastDateOilChange ? format(formData.lastDateOilChange, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastDateOilChange || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastDateOilChange: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <p className="text-sm text-gray-600">b) Oil Being Used in Gear Box 80W 19 (Reduction gear box)<br/>MTE 10A(Hydraulic oil)</p>
            <ObservationSection
              title=""
              section="oilBeingUsedInGearBox"
              sectionData={formData.oilBeingUsedInGearBox}
            />
            
            <p className="text-sm text-gray-600">c) Oil Level in Gear Box</p>
            <ObservationSection
              title=""
              section="oilLevelInGearBox"
              sectionData={formData.oilLevelInGearBox}
            />
          </CardContent>
        </Card>

        {/* Electrical Checks */}
        <Card>
          <CardHeader>
            <CardTitle>13. Electrical Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">Checks by ETMA/SS</p>
            <p className="text-sm text-gray-600">a) Insulation Checks</p>
            <ObservationSection
              title=""
              section="insulationChecks"
              sectionData={formData.insulationChecks}
            />
            
            <p className="text-sm text-gray-600">b) SPM Checks For Motor</p>
            <ObservationSection
              title=""
              section="spmChecks"
              sectionData={formData.spmChecks}
            />
            
            <p className="text-sm text-gray-600">c) Condition of Cable Connections</p>
            <ObservationSection
              title=""
              section="conditionOfCable"
              sectionData={formData.conditionOfCable}
            />
            
            <p className="text-sm text-gray-600">d) Condition of Earthing Connections</p>
            <ObservationSection
              title=""
              section="conditionOfEarthing"
              sectionData={formData.conditionOfEarthing}
            />
            
            <p className="text-sm text-gray-600">e) Tightness of Electrical Cable Fasteners</p>
            <ObservationSection
              title=""
              section="tightnessOfElectrical"
              sectionData={formData.tightnessOfElectrical}
            />
            
            <p className="text-sm text-gray-600">f) Condition of JB/Control Panel</p>
            <ObservationSection
              title=""
              section="conditionOfJb"
              sectionData={formData.conditionOfJb}
            />
          </CardContent>
        </Card>

        {/* Electrical Checks by ETMA */}
        <Card>
          <CardHeader>
            <CardTitle>14. Electrical Checks by ETMA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">a) Completed</p>
            <ObservationSection
              title=""
              section="electricalChecks"
              sectionData={formData.electricalChecks}
            />
            
            <p className="text-sm text-gray-600">b) Availability of Reports</p>
            <ObservationSection
              title=""
              section="availabilityOfReports"
              sectionData={formData.availabilityOfReports}
            />
          </CardContent>
        </Card>

        {/* Operational Checks */}
        <Card>
          <CardHeader>
            <CardTitle>15. Operational Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">a) Trails in all speeds</p>
            <ObservationSection
              title=""
              section="trailsInAllSpeeds"
              sectionData={formData.trailsInAllSpeeds}
            />
            
            <p className="text-sm text-gray-600">b) Drive Gear Box in Noise and Vibrations</p>
            <ObservationSection
              title=""
              section="driveGearBox"
              sectionData={formData.driveGearBox}
            />
            
            <p className="text-sm text-gray-600">c) Oil Leakage From Gear Box</p>
            <ObservationSection
              title=""
              section="oilLeakage"
              sectionData={formData.oilLeakage}
            />
          </CardContent>
        </Card>

        {/* Other Observations */}
        <Card>
          <CardHeader>
            <CardTitle>16. Other Observations</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="otherObservations">Remarks *</Label>
              <Textarea
                id="otherObservations"
                value={formData.otherObservations}
                onChange={(e) => setFormData(prev => ({ ...prev, otherObservations: e.target.value }))}
                placeholder="Enter other observations"
                rows={2}
              />
              {errors.otherObservations && <p className="text-red-500 text-sm mt-1">{errors.otherObservations}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Overall Remarks */}
        <Card>
          <CardHeader>
            <CardTitle>17. Overall Remarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="overallRemarks">Remarks *</Label>
              <Textarea
                id="overallRemarks"
                value={formData.overallRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, overallRemarks: e.target.value }))}
                placeholder="Enter overall remarks"
                rows={2}
              />
              {errors.overallRemarks && <p className="text-red-500 text-sm mt-1">{errors.overallRemarks}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Authority Signature */}
        <Card>
          <CardHeader>
            <CardTitle>18. Authority Signature *</CardTitle>
          </CardHeader>
          <CardContent>
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

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="button" onClick={() => setIsDraftModalOpen(true)} className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase">
            Fetch Drafts
          </Button>
          
          <Button type="button" onClick={saveDraft} className="px-6 bg-green-600 hover:bg-green-700 text-white font-semibold uppercase">
            Save Draft
          </Button>
          
          <Button type="button" onClick={resetForm} className="px-6 bg-red-600 hover:bg-red-700 text-white font-semibold uppercase">
            Clear
          </Button>
          
          <Button type="submit" className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase">
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
                            localStorage.setItem('rasCapstan_drafts', JSON.stringify(updatedDrafts));
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
    </div>
  );
};

export default RasCapstanForm;
