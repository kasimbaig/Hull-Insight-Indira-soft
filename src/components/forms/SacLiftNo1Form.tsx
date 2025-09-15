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

interface SacLiftNo1Data {
  ship: string;
  dateOfInspection: Date | null;
  typeOfLift: string;
  manufactureOem: string;
  yearManufacture: string;
  conditionOfFoundation: {
    observations: string;
    remarks: string;
  };
  conditionOfStructure: {
    observations: string;
    remarks: string;
  };
  conditionOfHydraulicSystem: {
    observations: string;
    remarks: string;
  };
  conditionOfElectricalSystem: {
    observations: string;
    remarks: string;
  };
  conditionOfControlPanel: {
    observations: string;
    remarks: string;
  };
  conditionOfSafetyDevices: {
    observations: string;
    remarks: string;
  };
  operationalTrials: {
    observations: string;
    remarks: string;
  };
  loadTesting: {
    observations: string;
    remarks: string;
  };
  emergencyOperation: {
    observations: string;
    remarks: string;
  };
  otherObservations: string;
  overallRemarks: string;
  authoritySignature: File | null;
}

const SacLiftNo1Form: React.FC = () => {
  const [formData, setFormData] = useState<SacLiftNo1Data>({
    ship: '',
    dateOfInspection: null,
    typeOfLift: '',
    manufactureOem: '',
    yearManufacture: '',
    conditionOfFoundation: { observations: '', remarks: '' },
    conditionOfStructure: { observations: '', remarks: '' },
    conditionOfHydraulicSystem: { observations: '', remarks: '' },
    conditionOfElectricalSystem: { observations: '', remarks: '' },
    conditionOfControlPanel: { observations: '', remarks: '' },
    conditionOfSafetyDevices: { observations: '', remarks: '' },
    operationalTrials: { observations: '', remarks: '' },
    loadTesting: { observations: '', remarks: '' },
    emergencyOperation: { observations: '', remarks: '' },
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
      title: `Draft - ${formData.ship || 'Untitled'} - ${formData.typeOfLift || 'No Type'}`
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
    if (!formData.typeOfLift) newErrors.typeOfLift = 'Type of Lift is required';
    if (!formData.manufactureOem) newErrors.manufactureOem = 'Manufacture/OEM is required';
    if (!formData.yearManufacture) newErrors.yearManufacture = 'Year of manufacture is required';
    if (!formData.authoritySignature) newErrors.authoritySignature = 'Authority signature is required';

    // Validate observations and remarks for each section
    const sections = [
      'conditionOfFoundation', 'conditionOfStructure', 'conditionOfHydraulicSystem',
      'conditionOfElectricalSystem', 'conditionOfControlPanel', 'conditionOfSafetyDevices',
      'operationalTrials', 'loadTesting', 'emergencyOperation'
    ];

    sections.forEach(section => {
      const sectionData = formData[section as keyof SacLiftNo1Data] as any;
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
      typeOfLift: '',
      manufactureOem: '',
      yearManufacture: '',
      conditionOfFoundation: { observations: '', remarks: '' },
      conditionOfStructure: { observations: '', remarks: '' },
      conditionOfHydraulicSystem: { observations: '', remarks: '' },
      conditionOfElectricalSystem: { observations: '', remarks: '' },
      conditionOfControlPanel: { observations: '', remarks: '' },
      conditionOfSafetyDevices: { observations: '', remarks: '' },
      operationalTrials: { observations: '', remarks: '' },
      loadTesting: { observations: '', remarks: '' },
      emergencyOperation: { observations: '', remarks: '' },
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
        ...prev[section as keyof SacLiftNo1Data] as any,
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SAC LIFT NO.1</h1>
        <p className="text-gray-600">Form for SAC Lift No.1 inspection and trials</p>
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
                <Label htmlFor="typeOfLift">Type of Lift *</Label>
                <Input
                  id="typeOfLift"
                  value={formData.typeOfLift}
                  onChange={(e) => setFormData(prev => ({ ...prev, typeOfLift: e.target.value }))}
                  placeholder="Enter type of lift"
                  maxLength={20}
                />
                {errors.typeOfLift && <p className="text-red-500 text-sm mt-1">{errors.typeOfLift}</p>}
              </div>

              <div>
                <Label htmlFor="manufactureOem">Manufacture/OEM *</Label>
                <Input
                  id="manufactureOem"
                  value={formData.manufactureOem}
                  onChange={(e) => setFormData(prev => ({ ...prev, manufactureOem: e.target.value }))}
                  placeholder="Enter manufacture/OEM"
                  maxLength={50}
                />
                {errors.manufactureOem && <p className="text-red-500 text-sm mt-1">{errors.manufactureOem}</p>}
              </div>

              <div>
                <Label htmlFor="yearManufacture">Year of Manufacture *</Label>
                <Input
                  id="yearManufacture"
                  value={formData.yearManufacture}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearManufacture: e.target.value }))}
                  placeholder="Enter year"
                  maxLength={4}
                />
                {errors.yearManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearManufacture}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Condition of Foundation */}
        <Card>
          <CardHeader>
            <CardTitle>6. Condition of Foundation</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="conditionOfFoundation"
              sectionData={formData.conditionOfFoundation}
            />
          </CardContent>
        </Card>

        {/* Condition of Structure */}
        <Card>
          <CardHeader>
            <CardTitle>7. Condition of Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="conditionOfStructure"
              sectionData={formData.conditionOfStructure}
            />
          </CardContent>
        </Card>

        {/* Condition of Hydraulic System */}
        <Card>
          <CardHeader>
            <CardTitle>8. Condition of Hydraulic System</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="conditionOfHydraulicSystem"
              sectionData={formData.conditionOfHydraulicSystem}
            />
          </CardContent>
        </Card>

        {/* Condition of Electrical System */}
        <Card>
          <CardHeader>
            <CardTitle>9. Condition of Electrical System</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="conditionOfElectricalSystem"
              sectionData={formData.conditionOfElectricalSystem}
            />
          </CardContent>
        </Card>

        {/* Condition of Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle>10. Condition of Control Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="conditionOfControlPanel"
              sectionData={formData.conditionOfControlPanel}
            />
          </CardContent>
        </Card>

        {/* Condition of Safety Devices */}
        <Card>
          <CardHeader>
            <CardTitle>11. Condition of Safety Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="conditionOfSafetyDevices"
              sectionData={formData.conditionOfSafetyDevices}
            />
          </CardContent>
        </Card>

        {/* Operational Trials */}
        <Card>
          <CardHeader>
            <CardTitle>12. Operational Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="operationalTrials"
              sectionData={formData.operationalTrials}
            />
          </CardContent>
        </Card>

        {/* Load Testing */}
        <Card>
          <CardHeader>
            <CardTitle>13. Load Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="loadTesting"
              sectionData={formData.loadTesting}
            />
          </CardContent>
        </Card>

        {/* Emergency Operation */}
        <Card>
          <CardHeader>
            <CardTitle>14. Emergency Operation</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              section="emergencyOperation"
              sectionData={formData.emergencyOperation}
            />
          </CardContent>
        </Card>

        {/* Other Observations */}
        <Card>
          <CardHeader>
            <CardTitle>15. Other Observations</CardTitle>
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
            <CardTitle>16. Overall Remarks</CardTitle>
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
            <CardTitle>17. Authority Signature *</CardTitle>
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

export default SacLiftNo1Form;
