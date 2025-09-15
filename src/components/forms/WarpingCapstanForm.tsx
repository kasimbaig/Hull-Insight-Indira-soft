import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, FileText, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface WarpingCapstanData {
  ship: string;
  dateOfInspection: Date | null;
  make: string;
  type: string;
  yearManufacture: string;
  
  // Remote Control Panel
  observationsElectrical: string;
  remarksElectrical: string;
  observationsSwitches: string;
  remarksSwitches: string;
  observationsIndicator: string;
  remarksIndicator: string;
  
  // Oil Level
  observationsOilLevel: string;
  remarksOilLevel: string;
  
  // Oil in Gear Box
  observations320: string;
  remarks320: string;
  
  // Conditions of Foundations
  observationsFoundation: string;
  remarksFoundation: string;
  
  // Condition of Brake Band
  observationsBrakeBand: string;
  remarksBrakeBand: string;
  
  // Insulation of Motor and Cable
  observationsInsulation: string;
  remarksInsulation: string;
  
  // Greasing of Mechanical Parts
  observationsGreasing: string;
  remarksGreasing: string;
  
  // Greasing Points
  observationsGreasingPoint: string;
  remarksGreasingPoint: string;
  
  // Operational Trials
  observationsSpeed1: string;
  remarksSpeed1: string;
  observationsSpeed2: string;
  remarksSpeed2: string;
  
  // Drive
  observationsDrive: string;
  remarksDrive: string;
  
  // Condition of Capstan Drum
  observationsCapstan: string;
  remarksCapstan: string;
  
  // Any Other Observation
  remarksAnyOtherObserv: string;
  
  // Overall Remarks
  observationsOverall: string;
  
  // Authority Signature
  authoritySignature: File | null;
}

interface FormErrors {
  [key: string]: string;
}

interface DraftData {
  id: string;
  title: string;
  data: WarpingCapstanData;
  timestamp: string;
}

const WarpingCapstanForm: React.FC = () => {
  const [formData, setFormData] = useState<WarpingCapstanData>({
    ship: '',
    dateOfInspection: null,
    make: '',
    type: '',
    yearManufacture: '',
    observationsElectrical: '',
    remarksElectrical: '',
    observationsSwitches: '',
    remarksSwitches: '',
    observationsIndicator: '',
    remarksIndicator: '',
    observationsOilLevel: '',
    remarksOilLevel: '',
    observations320: '',
    remarks320: '',
    observationsFoundation: '',
    remarksFoundation: '',
    observationsBrakeBand: '',
    remarksBrakeBand: '',
    observationsInsulation: '',
    remarksInsulation: '',
    observationsGreasing: '',
    remarksGreasing: '',
    observationsGreasingPoint: '',
    remarksGreasingPoint: '',
    observationsSpeed1: '',
    remarksSpeed1: '',
    observationsSpeed2: '',
    remarksSpeed2: '',
    observationsDrive: '',
    remarksDrive: '',
    observationsCapstan: '',
    remarksCapstan: '',
    remarksAnyOtherObserv: '',
    observationsOverall: '',
    authoritySignature: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const shipOptions = [
    { value: '43', label: 'SHIVALIK' },
    { value: '84', label: 'JAMUNA' },
    { value: '23', label: 'BANGARAM' },
    { value: '56', label: 'TARANGINI' },
    { value: '99', label: 'SARYU' },
    { value: '31', label: 'KUMBHIR' },
    { value: '87', label: 'T-83' },
    { value: '27', label: 'AIRAVAT' },
    { value: '48', label: 'KHANJAR' },
    { value: '57', label: 'SHUDERSHINI' },
    { value: '59', label: 'TRISHUL' },
    { value: '62', label: 'TEG' },
    { value: '55', label: 'RANVIJAY' },
    { value: '47', label: 'KIRPAN' },
    { value: '35', label: 'DELHI' },
    { value: '83', label: 'SURVEKSHAK' },
    { value: '65', label: 'JYOTI' },
    { value: '94', label: 'SUJATA' },
    { value: '76', label: 'KABRA' },
    { value: '68', label: 'CANKARSO' },
    { value: '88', label: 'T-84' },
    { value: '18', label: 'VIBHUTI' },
    { value: '17', label: 'NISHANK' },
    { value: '25', label: 'MAGAR' },
    { value: '42', label: 'BEAS' },
    { value: '90', label: 'SUVERNA' },
    { value: '45', label: 'SAHYADRI' },
    { value: '16', label: 'PRALAYA' },
    { value: '74', label: 'CHERIYAM' },
    { value: '44', label: 'SATPURA' },
    { value: '20', label: 'JALASHWA' },
    { value: '63', label: 'TARKASH' },
    { value: '52', label: 'KARMUK' },
    { value: '82', label: 'SUTLEJ' },
    { value: '96', label: 'SUMEDHA' },
    { value: '15', label: 'PRABAL' },
    { value: '75', label: 'CORA DIVH' },
    { value: '21', label: 'BATTIMALV' },
    { value: '38', label: 'CHENNAI' },
    { value: '97', label: 'SUMITRA' },
    { value: '86', label: 'T-82' },
    { value: '46', label: 'KUTHAR' },
    { value: '69', label: 'KONDUL' },
    { value: '89', label: 'SUBHDRA' },
    { value: '80', label: 'DARSHAK' },
    { value: '24', label: 'BITRA' },
    { value: '73', label: 'CHETLAT' },
    { value: '81', label: 'NIREEKSHAK' },
    { value: '71', label: 'KARUVA' },
    { value: '67', label: 'DEEPAK' },
    { value: '123', label: 'SHAKTI' },
    { value: '36', label: 'KOLKATA' },
    { value: '85', label: 'INVETIGATOR' },
    { value: '93', label: 'SHARDA' },
    { value: '64', label: 'SHAKTI' },
    { value: '33', label: 'MUMBAI' },
    { value: '39', label: 'GOMTI' },
    { value: '41', label: 'BETWA' },
    { value: '13', label: 'NASHAK' },
    { value: '70', label: 'KOSWARI' },
    { value: '30', label: 'CHEETAH' },
    { value: '58', label: 'TALWAR' },
    { value: '28', label: 'KESARI' },
    { value: '66', label: 'ADITYA' },
    { value: '22', label: 'BARATANG' },
    { value: '49', label: 'KORA' },
    { value: '51', label: 'KULISH' },
    { value: '53', label: 'RANA' },
    { value: '77', label: 'KALPENI' },
    { value: '122', label: 'SHAKTI' },
    { value: '12', label: 'VIPUL' },
    { value: '60', label: 'TABAR' },
    { value: '61', label: 'TRINKAND' },
    { value: '37', label: 'KOCHI' },
    { value: '91', label: 'SUKANYA' },
    { value: '92', label: 'SAVITRI' },
    { value: '29', label: 'GULDAR' },
    { value: '40', label: 'BRAHMAPUTRA' },
    { value: '26', label: 'GHARIAL' },
    { value: '54', label: 'RANVIR' },
    { value: '79', label: 'NIRUPAK' },
    { value: '19', label: 'VINASH' },
    { value: '50', label: 'KIRCH' },
    { value: '78', label: 'SANDHAYAK' },
    { value: '14', label: 'VIDYUT' },
    { value: '95', label: 'TIR' },
    { value: '32', label: 'GAJ' },
    { value: '72', label: 'CAR NICOBAR' },
    { value: '98', label: 'SUNAYNA' },
    { value: '34', label: 'MYSORE' },
  ];

  const observationOptions = [
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SAT WITH OBSERVATION', label: 'SAT WITH OBSERVATION' },
  ];

  const opsNonOpsOptions = [
    { value: 'OPS', label: 'OPS' },
    { value: 'NON-OPS', label: 'NON-OPS' },
  ];

  const oilLevelOptions = [
    { value: 'LOW', label: 'LOW' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HIGH', label: 'HIGH' },
  ];

  const yesNoOptions = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' },
  ];

  const greasingPointOptions = [
    { value: 'SAT', label: 'SAT' },
    { value: 'PAINTED', label: 'PAINTED' },
    { value: 'CHOKED', label: 'CHOKED' },
  ];

  const driveOptions = [
    { value: 'SAT', label: 'SAT' },
    { value: 'ABNORMAL SOUND', label: 'ABNORMAL SOUND' },
  ];

  const capstanOptions = [
    { value: 'SAT', label: 'SAT' },
    { value: 'RUSTED', label: 'RUSTED' },
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('warping-capstan-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        if (parsedDraft.dateOfInspection) parsedDraft.dateOfInspection = new Date(parsedDraft.dateOfInspection);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error parsing saved draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage whenever formData changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('warping-capstan-draft', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof WarpingCapstanData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (field: keyof WarpingCapstanData, file: File | null) => {
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, JPEG, PNG are allowed.');
        return;
      }
      if (file.size > maxSize) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        return;
      }
    }
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ship || formData.ship === '0') {
      newErrors.ship = 'Please select Ship';
    }
    if (!formData.dateOfInspection) {
      newErrors.dateOfInspection = 'Please select Date of Inspection/Trials';
    }
    if (!formData.make.trim()) {
      newErrors.make = 'Please enter Make';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Please enter Type';
    }
    if (!formData.yearManufacture.trim()) {
      newErrors.yearManufacture = 'Please enter Year of Manufacture';
    }

    // Validate all observation and remark fields
    const fieldsToValidate = [
      'observationsElectrical', 'remarksElectrical',
      'observationsSwitches', 'remarksSwitches',
      'observationsIndicator', 'remarksIndicator',
      'observationsOilLevel', 'remarksOilLevel',
      'observations320', 'remarks320',
      'observationsFoundation', 'remarksFoundation',
      'observationsBrakeBand', 'remarksBrakeBand',
      'observationsInsulation', 'remarksInsulation',
      'observationsGreasing', 'remarksGreasing',
      'observationsGreasingPoint', 'remarksGreasingPoint',
      'observationsSpeed1', 'remarksSpeed1',
      'observationsSpeed2', 'remarksSpeed2',
      'observationsDrive', 'remarksDrive',
      'observationsCapstan', 'remarksCapstan',
      'remarksAnyOtherObserv',
      'observationsOverall'
    ];

    fieldsToValidate.forEach(field => {
      if (!formData[field as keyof WarpingCapstanData] || 
          (typeof formData[field as keyof WarpingCapstanData] === 'string' && 
           formData[field as keyof WarpingCapstanData] === '')) {
        newErrors[field] = `Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    });

    if (!formData.authoritySignature) {
      newErrors.authoritySignature = 'Please upload Authority Signature';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.removeItem('warping-capstan-draft');
      alert('Form submitted successfully!');
      clearForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    if (!formData.make.trim()) {
      alert('Please enter Make before saving draft');
      return;
    }

    const draftData: DraftData = {
      id: Date.now().toString(),
      title: `Warping Capstan - ${formData.make}`,
      data: { ...formData },
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('warping-capstan-drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('warping-capstan-drafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('warping-capstan-drafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: DraftData) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('warping-capstan-drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      ship: '',
      dateOfInspection: null,
      make: '',
      type: '',
      yearManufacture: '',
      observationsElectrical: '',
      remarksElectrical: '',
      observationsSwitches: '',
      remarksSwitches: '',
      observationsIndicator: '',
      remarksIndicator: '',
      observationsOilLevel: '',
      remarksOilLevel: '',
      observations320: '',
      remarks320: '',
      observationsFoundation: '',
      remarksFoundation: '',
      observationsBrakeBand: '',
      remarksBrakeBand: '',
      observationsInsulation: '',
      remarksInsulation: '',
      observationsGreasing: '',
      remarksGreasing: '',
      observationsGreasingPoint: '',
      remarksGreasingPoint: '',
      observationsSpeed1: '',
      remarksSpeed1: '',
      observationsSpeed2: '',
      remarksSpeed2: '',
      observationsDrive: '',
      remarksDrive: '',
      observationsCapstan: '',
      remarksCapstan: '',
      remarksAnyOtherObserv: '',
      observationsOverall: '',
      authoritySignature: null,
    });
    setErrors({});
  };

  const handleTextValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed');
    }
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const handleYearValidation = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    
    if (numericValue && parseInt(numericValue) > currentYear) {
      alert('Please enter a year in the past.');
      return '';
    }
    if (numericValue && parseInt(numericValue) < minYear) {
      alert(`Please enter a year greater than or equal to ${minYear}.`);
      return '';
    }
    
    return numericValue;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

    return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  };

  const ObservationSection = ({ 
    number, 
    title, 
    subtitle, 
    observationField, 
    remarksField, 
    options = observationOptions 
  }: {
    number: number;
    title: string;
    subtitle?: string;
    observationField: keyof WarpingCapstanData;
    remarksField: keyof WarpingCapstanData;
    options?: { value: string; label: string }[];
  }) => (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
          {number}
        </span>
        <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
      </div>
      {subtitle && (
        <div className="mb-4">
          <span className="text-sm font-medium">{subtitle}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium">
            Observations: <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData[observationField] as string}
            onValueChange={(value) => handleInputChange(observationField, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[observationField] && <p className="text-red-500 text-xs mt-1">{errors[observationField]}</p>}
        </div>
        <div className="md:col-span-2">
          <Label className="text-sm font-medium">
            Remarks: <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={formData[remarksField] as string}
            onChange={(e) => handleInputChange(remarksField, handleTextValidation(e.target.value))}
            rows={2}
            maxLength={1000}
            placeholder="Enter remarks"
          />
          {errors[remarksField] && <p className="text-red-500 text-xs mt-1">{errors[remarksField]}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <u>WARPING CAPSTAN</u>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <h3 className="text-lg font-semibold text-blue-600">Ship</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Ship: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.ship}
                      onValueChange={(value) => handleInputChange('ship', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {shipOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ship && <p className="text-red-500 text-xs mt-1">{errors.ship}</p>}
                  </div>
                </div>
              </div>

              {/* Date of Inspection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <h3 className="text-lg font-semibold text-blue-600">Date of Inspection/Trials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Date: <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfInspection ? format(formData.dateOfInspection, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfInspection || undefined}
                          onSelect={(date) => handleInputChange('dateOfInspection', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dateOfInspection && <p className="text-red-500 text-xs mt-1">{errors.dateOfInspection}</p>}
                  </div>
                </div>
              </div>

              {/* Make */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <h3 className="text-lg font-semibold text-blue-600">Make</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Make: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.make}
                      onChange={(e) => handleInputChange('make', handleTextValidation(e.target.value))}
                      maxLength={20}
                      placeholder="Enter make"
                    />
                    {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make}</p>}
                  </div>
                </div>
              </div>

              {/* Type */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <h3 className="text-lg font-semibold text-blue-600">Type</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Type: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', handleTextValidation(e.target.value))}
                      maxLength={20}
                      placeholder="Enter type"
                    />
                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                  </div>
                </div>
              </div>

              {/* Year of Manufacture */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                  <h3 className="text-lg font-semibold text-blue-600">Year of Manufacture</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Year: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.yearManufacture}
                      onChange={(e) => handleInputChange('yearManufacture', handleYearValidation(e.target.value))}
                      maxLength={4}
                      placeholder="Enter year"
                    />
                    {errors.yearManufacture && <p className="text-red-500 text-xs mt-1">{errors.yearManufacture}</p>}
                  </div>
                </div>
              </div>

              {/* Remote Control Panel */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                  <h3 className="text-lg font-semibold text-blue-600">Remote Control Panel</h3>
                </div>
                
                <ObservationSection
                  number={6}
                  title="Electrical Hygiene, Proper Connection of Connectors Using Lugs"
                  observationField="observationsElectrical"
                  remarksField="remarksElectrical"
                />
                
                <ObservationSection
                  number={6}
                  title="Status of Switches"
                  observationField="observationsSwitches"
                  remarksField="remarksSwitches"
                  options={opsNonOpsOptions}
                />
                
                <ObservationSection
                  number={6}
                  title="Status of Indicators"
                  observationField="observationsIndicator"
                  remarksField="remarksIndicator"
                  options={opsNonOpsOptions}
                />
              </div>

              {/* Oil Level */}
              <ObservationSection
                number={7}
                title="Oil Level"
                subtitle="Gear Box"
                observationField="observationsOilLevel"
                remarksField="remarksOilLevel"
                options={oilLevelOptions}
              />

              {/* Oil in Gear Box */}
              <ObservationSection
                number={8}
                title="Oil in Gear Box"
                subtitle="Servo System 320"
                observationField="observations320"
                remarksField="remarks320"
                options={yesNoOptions}
              />

              {/* Conditions of Foundations */}
              <ObservationSection
                number={9}
                title="Conditions of Foundations"
                subtitle="Corrosion/ Pitting/ Unpainted"
                observationField="observationsFoundation"
                remarksField="remarksFoundation"
              />

              {/* Condition of Brake Band */}
              <ObservationSection
                number={10}
                title="Condition of Brake Band"
                observationField="observationsBrakeBand"
                remarksField="remarksBrakeBand"
              />

              {/* Insulation of Motor and Cable */}
              <ObservationSection
                number={11}
                title="Insulation of Motor and Cable"
                subtitle="> 2 Ohms"
                observationField="observationsInsulation"
                remarksField="remarksInsulation"
              />

              {/* Greasing of Mechanical Parts */}
              <ObservationSection
                number={12}
                title="Greasing of Mechanical Parts"
                subtitle="Proper Greasing of Mechanical Parts"
                observationField="observationsGreasing"
                remarksField="remarksGreasing"
              />

              {/* Greasing Points */}
              <ObservationSection
                number={13}
                title="Greasing Points"
                subtitle="Condition of Greasing Nipple-Clean/ Painted/ Choked"
                observationField="observationsGreasingPoint"
                remarksField="remarksGreasingPoint"
                options={greasingPointOptions}
              />

              {/* Operational Trials */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">14</span>
                  <h3 className="text-lg font-semibold text-blue-600">Operational Trials</h3>
                </div>
                
                <ObservationSection
                  number={14}
                  title="Speed 1 - 750 RPM"
                  observationField="observationsSpeed1"
                  remarksField="remarksSpeed1"
                />
                
                <ObservationSection
                  number={14}
                  title="Speed 2 - 1500 RPM"
                  observationField="observationsSpeed2"
                  remarksField="remarksSpeed2"
                />
              </div>

              {/* Drive */}
              <ObservationSection
                number={15}
                title="Drive"
                subtitle="Check for Abnormal Sounds/ Excessive Noise During Pitted"
                observationField="observationsDrive"
                remarksField="remarksDrive"
                options={driveOptions}
              />

              {/* Condition of Capstan Drum */}
              <ObservationSection
                number={16}
                title="Condition of Capstan Drum"
                subtitle="Rusted/ Corroded/ Pitted"
                observationField="observationsCapstan"
                remarksField="remarksCapstan"
                options={capstanOptions}
              />

              {/* Any Other Observation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">17</span>
                  <h3 className="text-lg font-semibold text-blue-600">Any Other Observation</h3>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Remarks: <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={formData.remarksAnyOtherObserv}
                    onChange={(e) => handleInputChange('remarksAnyOtherObserv', handleTextValidation(e.target.value))}
                    rows={2}
                    maxLength={1000}
                    placeholder="Enter remarks"
                  />
                  {errors.remarksAnyOtherObserv && <p className="text-red-500 text-xs mt-1">{errors.remarksAnyOtherObserv}</p>}
                </div>
              </div>

              {/* Overall Remarks */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">18</span>
                  <h3 className="text-lg font-semibold text-blue-600">Overall Remarks</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.observationsOverall}
                      onValueChange={(value) => handleInputChange('observationsOverall', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.observationsOverall && <p className="text-red-500 text-xs mt-1">{errors.observationsOverall}</p>}
                  </div>
                </div>
              </div>

              {/* Authority Signature */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">19</span>
                  <h3 className="text-lg font-semibold text-blue-600">Authority Signature</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Upload File: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('authoritySignature', e.target.files?.[0] || null)}
                    />
                    {errors.authoritySignature && <p className="text-red-500 text-xs mt-1">{errors.authoritySignature}</p>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  type="button"
                  onClick={loadDrafts}
                  variant="outline"
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Fetch Drafts
                </Button>

                <Button
                  type="button"
                  onClick={saveDraft}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>

                <Button
                  type="button"
                  onClick={clearForm}
                  variant="destructive"
                  className="flex-1"
                >
                  Clear
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={showDraftModal} onOpenChange={setShowDraftModal}>
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
                    <TableHead>Make</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.data.make || 'No Make Data'}</TableCell>
                      <TableCell>{formatDate(draft.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => loadDraft(draft)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Fetch Data
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteDraft(draft.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
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

export default WarpingCapstanForm;
