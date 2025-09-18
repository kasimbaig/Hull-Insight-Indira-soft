import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PreWettingSystemFormData {
  ship: string;
  dateOfInspection: string;
  observationsRemoteMode: string;
  remarksRemoteMode: string;
  observationsLocalMode: string;
  remarksLocalMode: string;
  observationsFiremanRunning: string;
  remarksFiremanRunning: string;
  observationsFireMainPressure: string;
  remarksFireMainPressure: string;
  zoneNozzleChecks: string;
  nozzlesCount: string;
  observationsSparedArea: string;
  remarksSparedArea: string;
  observationsLeakages: string;
  remarksLeakages: string;
  observationsModeOfOperation: string;
  remarksModeOfOperation: string;
  overallRemarks: string;
  authoritySignature: File | null;
}

const PreWettingSystemForm: React.FC = () => {
  const [formData, setFormData] = useState<PreWettingSystemFormData>({
    ship: '',
    dateOfInspection: '',
    observationsRemoteMode: '',
    remarksRemoteMode: '',
    observationsLocalMode: '',
    remarksLocalMode: '',
    observationsFiremanRunning: '',
    remarksFiremanRunning: '',
    observationsFireMainPressure: '',
    remarksFireMainPressure: '',
    zoneNozzleChecks: '',
    nozzlesCount: '',
    observationsSparedArea: '',
    remarksSparedArea: '',
    observationsLeakages: '',
    remarksLeakages: '',
    observationsModeOfOperation: '',
    remarksModeOfOperation: '',
    overallRemarks: '',
    authoritySignature: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const ships = [
    { value: '0', label: '--Select--' },
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
    { value: '34', label: 'MYSORE' }
  ];

  const observationOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Ship validation
    if (!formData.ship || formData.ship === '0') {
      newErrors.ship = 'Ship is required';
    }
    
    // Date validation
    if (!formData.dateOfInspection || formData.dateOfInspection === 'DD-MM-YYYY') {
      newErrors.dateOfInspection = 'Date of Inspection/Trials is required';
    } else if (!isValidDate(formData.dateOfInspection)) {
      newErrors.dateOfInspection = 'Please enter a valid date in DD-MM-YYYY format';
    }
    
    // Remote Mode validation
    if (!formData.observationsRemoteMode || formData.observationsRemoteMode === '0') {
      newErrors.observationsRemoteMode = 'Remote Mode observations is required';
    }
    if (!formData.remarksRemoteMode.trim()) {
      newErrors.remarksRemoteMode = 'Remote Mode remarks is required';
    }
    
    // Local Mode validation
    if (!formData.observationsLocalMode || formData.observationsLocalMode === '0') {
      newErrors.observationsLocalMode = 'Local Mode/Manual Mode observations is required';
    }
    if (!formData.remarksLocalMode.trim()) {
      newErrors.remarksLocalMode = 'Local Mode/Manual Mode remarks is required';
    }
    
    // Fireman Running validation
    if (!formData.observationsFiremanRunning || formData.observationsFiremanRunning === '0') {
      newErrors.observationsFiremanRunning = 'Number of Fireman Running observations is required';
    }
    if (!formData.remarksFiremanRunning.trim()) {
      newErrors.remarksFiremanRunning = 'Number of Fireman Running remarks is required';
    }
    
    // Fire Main Pressure validation
    if (!formData.observationsFireMainPressure || formData.observationsFireMainPressure === '0') {
      newErrors.observationsFireMainPressure = 'Fire-Main Pressure observations is required';
    }
    if (!formData.remarksFireMainPressure.trim()) {
      newErrors.remarksFireMainPressure = 'Fire-Main Pressure remarks is required';
    }
    
    // Nozzle Checks validation
    if (!formData.zoneNozzleChecks.trim()) {
      newErrors.zoneNozzleChecks = 'Nozzle Checks Zone is required';
    }
    if (!formData.nozzlesCount.trim()) {
      newErrors.nozzlesCount = 'Nozzle Checks No.of Nozzles is required';
    }
    
    // Spared Area validation
    if (!formData.observationsSparedArea || formData.observationsSparedArea === '0') {
      newErrors.observationsSparedArea = 'Spared Area Checks observations is required';
    }
    if (!formData.remarksSparedArea.trim()) {
      newErrors.remarksSparedArea = 'Spared Area Checks remarks is required';
    }
    
    // Leakages validation
    if (!formData.observationsLeakages || formData.observationsLeakages === '0') {
      newErrors.observationsLeakages = 'Leakages observations is required';
    }
    if (!formData.remarksLeakages.trim()) {
      newErrors.remarksLeakages = 'Leakages remarks is required';
    }
    
    // Mode of Operation validation
    if (!formData.observationsModeOfOperation || formData.observationsModeOfOperation === '0') {
      newErrors.observationsModeOfOperation = 'Mode of Operation Checks observations is required';
    }
    if (!formData.remarksModeOfOperation.trim()) {
      newErrors.remarksModeOfOperation = 'Mode of Operation Checks remarks is required';
    }
    
    // Overall Remarks validation
    if (!formData.overallRemarks.trim()) {
      newErrors.overallRemarks = 'Overall Remarks is required';
    }
    
    // Authority Signature validation
    if (!formData.authoritySignature) {
      newErrors.authoritySignature = 'Authority Signature is required';
    } else {
      const file = formData.authoritySignature;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      
      if (!allowedTypes.includes(file.type)) {
        newErrors.authoritySignature = 'Invalid file type. Only JPG, JPEG, and PNG files are allowed';
      } else if (file.size > maxSize) {
        newErrors.authoritySignature = 'File size exceeds 2MB. Please upload a smaller file';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidDate = (dateString: string): boolean => {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
    return datePattern.test(dateString);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        ship: '',
        dateOfInspection: '',
        observationsRemoteMode: '',
        remarksRemoteMode: '',
        observationsLocalMode: '',
        remarksLocalMode: '',
        observationsFiremanRunning: '',
        remarksFiremanRunning: '',
        observationsFireMainPressure: '',
        remarksFireMainPressure: '',
        zoneNozzleChecks: '',
        nozzlesCount: '',
        observationsSparedArea: '',
        remarksSparedArea: '',
        observationsLeakages: '',
        remarksLeakages: '',
        observationsModeOfOperation: '',
        remarksModeOfOperation: '',
        overallRemarks: '',
        authoritySignature: null
      });
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      title: `Pre-Wetting System - ${formData.ship || 'Draft'}`,
      data: formData,
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('preWettingSystemDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('preWettingSystemDrafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('preWettingSystemDrafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: any) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('preWettingSystemDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      ship: '',
      dateOfInspection: '',
      observationsRemoteMode: '',
      remarksRemoteMode: '',
      observationsLocalMode: '',
      remarksLocalMode: '',
      observationsFiremanRunning: '',
      remarksFiremanRunning: '',
      observationsFireMainPressure: '',
      remarksFireMainPressure: '',
      zoneNozzleChecks: '',
      nozzlesCount: '',
      observationsSparedArea: '',
      remarksSparedArea: '',
      observationsLeakages: '',
      remarksLeakages: '',
      observationsModeOfOperation: '',
      remarksModeOfOperation: '',
      overallRemarks: '',
      authoritySignature: null
    });
    setErrors({});
  };

  const handleRemarksValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed.');
    }
    
    const cleanedValue = value.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 1000);
    
    if (value.length >= 1000) {
      alert('Remarks cannot exceed 1000 characters.');
    }
    
    return cleanedValue;
  };

  const handleZoneValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed');
    }
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const handleNumberValidation = (value: string) => {
    if (/[^0-9]/.test(value)) {
      alert('Only Numbers Are Allowed');
    }
    return value.replace(/[^0-9]/g, '');
  };

  const renderObservationSection = (
    sectionNumber: number,
    title: string,
    observationField: keyof PreWettingSystemFormData,
    remarksField: keyof PreWettingSystemFormData,
    subtitle?: string
  ) => (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {sectionNumber}
        </div>
        <div className="flex-1">
          <Label className="text-lg font-medium">{title}</Label>
        </div>
      </div>
      
      <div className="ml-12 space-y-4">
        {subtitle && (
          <div className="text-sm font-medium mb-2">{subtitle}<span className="text-red-500">*</span></div>
        )}
        <div className="flex items-start space-x-4">
          <div className="w-48">
            <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
            <Select 
              value={formData[observationField]} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, [observationField]: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="--Select--" />
              </SelectTrigger>
              <SelectContent>
                {observationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[observationField] && <p className="text-red-500 text-xs mt-1">{errors[observationField]}</p>}
          </div>
          <div className="flex-1">
            <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
            <Textarea
              value={formData[remarksField]}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, [remarksField]: value }));
              }}
              rows={2}
              className="mt-1"
              placeholder="Enter remarks"
            />
            {errors[remarksField] && <p className="text-red-500 text-xs mt-1">{errors[remarksField]}</p>}
          </div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">PRE WETTING SYSTEM</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                {/* Ship Selection */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <Label className="text-lg font-medium">Ship</Label>
                    </div>
                  </div>
                  
                  <div className="ml-12">
                    <div className="w-64">
                      <Select 
                        value={formData.ship} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, ship: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          {ships.map(ship => (
                            <SelectItem key={ship.value} value={ship.value}>
                              {ship.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ship && <p className="text-red-500 text-xs mt-1">{errors.ship}</p>}
                    </div>
                  </div>
                </div>

                {/* Date of Inspection */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <Label className="text-lg font-medium">Date of Inspection/Trials<span className="text-red-500">*</span></Label>
                    </div>
                  </div>
                  
                  <div className="ml-12">
                    <div className="w-64">
                      <Input
                        type="text"
                        value={formData.dateOfInspection}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfInspection: e.target.value }))}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        className="mt-1"
                      />
                      {errors.dateOfInspection && <p className="text-red-500 text-xs mt-1">{errors.dateOfInspection}</p>}
                    </div>
                  </div>
                </div>

                {/* Remote Mode */}
                {renderObservationSection(
                  3,
                  "Remote Mode",
                  "observationsRemoteMode",
                  "remarksRemoteMode",
                  "Check If System Can be Operated Remotely From DCHQ/Ops Room"
                )}

                {/* Local Mode */}
                {renderObservationSection(
                  4,
                  "Local Mode/Manual Mode",
                  "observationsLocalMode",
                  "remarksLocalMode",
                  "Check Operation of System Locally"
                )}

                {/* Number of Fireman Running */}
                {renderObservationSection(
                  5,
                  "Number of Fireman Running",
                  "observationsFiremanRunning",
                  "remarksFiremanRunning",
                  "Functioning of Fire Main"
                )}

                {/* Fire-Main Pressure */}
                {renderObservationSection(
                  6,
                  "Fire-Main Pressure",
                  "observationsFireMainPressure",
                  "remarksFireMainPressure",
                  "Checks for Operating Pressure"
                )}

                {/* Nozzle Checks */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      7
                    </div>
                    <div className="flex-1">
                      <Label className="text-lg font-medium">Nozzle Checks</Label>
                    </div>
                  </div>
                  
                  <div className="ml-12 space-y-4">
                    <div className="text-sm font-medium mb-2">Checks for Chokes Defects, No.of Nozzles in the Section<span className="text-red-500">*</span></div>
                    <div className="flex items-start space-x-4">
                      <div className="w-48">
                        <Label className="text-sm">Zone:<span className="text-red-500">*</span></Label>
                        <Input
                          type="text"
                          value={formData.zoneNozzleChecks}
                          onChange={(e) => {
                            const value = handleZoneValidation(e.target.value);
                            setFormData(prev => ({ ...prev, zoneNozzleChecks: value }));
                          }}
                          maxLength={20}
                          placeholder="Enter zone"
                          className="mt-1"
                        />
                        {errors.zoneNozzleChecks && <p className="text-red-500 text-xs mt-1">{errors.zoneNozzleChecks}</p>}
                      </div>
                      <div className="w-48">
                        <Label className="text-sm">No. of Nozzles:<span className="text-red-500">*</span></Label>
                        <Input
                          type="text"
                          value={formData.nozzlesCount}
                          onChange={(e) => {
                            const value = handleNumberValidation(e.target.value);
                            setFormData(prev => ({ ...prev, nozzlesCount: value }));
                          }}
                          maxLength={10}
                          placeholder="Enter count"
                          className="mt-1"
                        />
                        {errors.nozzlesCount && <p className="text-red-500 text-xs mt-1">{errors.nozzlesCount}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spared Area Checks */}
                {renderObservationSection(
                  8,
                  "Spared Area Checks",
                  "observationsSparedArea",
                  "remarksSparedArea",
                  "Checks for Proper Area Coverage"
                )}

                {/* Leakages */}
                {renderObservationSection(
                  9,
                  "Leakages",
                  "observationsLeakages",
                  "remarksLeakages",
                  "Checks for Leakage from Nozzles/Unions/Lines etc"
                )}

                {/* Mode of Operation Checks */}
                {renderObservationSection(
                  10,
                  "Mode of Operation Checks",
                  "observationsModeOfOperation",
                  "remarksModeOfOperation",
                  "Checks for Operational State in Different Modes"
                )}

                {/* Overall Remarks */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      11
                    </div>
                    <div className="flex-1">
                      <Label className="text-lg font-medium">Overall Remarks</Label>
                    </div>
                  </div>
                  
                  <div className="ml-12">
                    <div className="flex-1">
                      <Label className="text-sm">Overall Remarks<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.overallRemarks}
                        onChange={(e) => {
                          const value = handleRemarksValidation(e.target.value);
                          setFormData(prev => ({ ...prev, overallRemarks: value }));
                        }}
                        rows={2}
                        className="mt-1"
                        placeholder="Enter overall remarks"
                      />
                      {errors.overallRemarks && <p className="text-red-500 text-xs mt-1">{errors.overallRemarks}</p>}
                    </div>
                  </div>
                </div>

                {/* Authority Signature */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      12
                    </div>
                    <div className="flex-1">
                      <Label className="text-lg font-medium">Authority Signature<span className="text-red-500">*</span></Label>
                    </div>
                  </div>
                  
                  <div className="ml-12">
                    <div className="w-64">
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setFormData(prev => ({ ...prev, authoritySignature: file }));
                        }}
                        className="mt-1"
                      />
                      {errors.authoritySignature && <p className="text-red-500 text-xs mt-1">{errors.authoritySignature}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <Dialog open={showDraftModal} onOpenChange={setShowDraftModal}>
                  <DialogTrigger asChild>
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={loadDrafts}>
                      Fetch Drafts
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Draft Data</DialogTitle>
                    </DialogHeader>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Sr No.</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Created Date</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {drafts.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center">
                                    Data is not available
                                  </TableCell>
                                </TableRow>
                              ) : (
                                drafts.map((draft, index) => (
                                  <TableRow key={draft.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{draft.data.observationsRemoteMode || 'No Inspection Data'}</TableCell>
                                    <TableCell>{new Date(draft.timestamp).toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                        size="sm"
                                        onClick={() => loadDraft(draft)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        size="sm"
                                        onClick={() => deleteDraft(draft.id)}
                                      >
                                        Delete
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={saveDraft}>
                  SAVE DRAFT
                </Button>
                <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded" onClick={clearForm}>
                  Clear
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Save'}
                </Button>
              </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreWettingSystemForm;
