import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface ICCPFormData {
  ship: string;
  dateOfInspection: string;
  make: string;
  yearOfManufacture: string;
  remarksOverprotected: string;
  remarks170_270: string;
  remarksUnderProtected: string;
  observationsControlPanel: string;
  remarksControlPanel: string;
  observationsTerminal: string;
  remarksTerminal: string;
  observationsReading: string;
  remarksReading: string;
  observationsInspection: string;
  remarksInspection: string;
  dateLastDummyLoadTest: string;
  remarksDummy: string;
  dateLastReading: string;
  lastReadingDueOn: string;
  remarksLastReading: string;
  dateLastCalibration: string;
  lastCalibrationDueOn: string;
  remarksCalibration: string;
  remarksAnyOtherObserv: string;
  observationsOverall: string;
  authoritySignature: File | null;
}

interface DraftData {
  id: string;
  make: string;
  createdDate: string;
}

const ImpressedCurrentCathodicProtectionForm: React.FC = () => {
  const [formData, setFormData] = useState<ICCPFormData>({
    ship: '',
    dateOfInspection: '',
    make: '',
    yearOfManufacture: '',
    remarksOverprotected: '',
    remarks170_270: '',
    remarksUnderProtected: '',
    observationsControlPanel: '',
    remarksControlPanel: '',
    observationsTerminal: '',
    remarksTerminal: '',
    observationsReading: '',
    remarksReading: '',
    observationsInspection: '',
    remarksInspection: '',
    dateLastDummyLoadTest: '',
    remarksDummy: '',
    dateLastReading: '',
    lastReadingDueOn: '',
    remarksLastReading: '',
    dateLastCalibration: '',
    lastCalibrationDueOn: '',
    remarksCalibration: '',
    remarksAnyOtherObserv: '',
    observationsOverall: '',
    authoritySignature: null,
  });

  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftId, setDraftId] = useState<string>('');

  const ships = [
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

  const handleInputChange = (field: keyof ICCPFormData, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.ship || formData.ship === '0') {
      alert('Please Select Ship');
      return false;
    }
    if (!formData.dateOfInspection) {
      alert('Please Select Date of Inspection');
      return false;
    }
    if (!formData.make.trim()) {
      alert('Please Enter Make');
      return false;
    }
    if (!formData.yearOfManufacture.trim()) {
      alert('Please Enter Year of Manufacture');
      return false;
    }
    if (!formData.remarksOverprotected.trim()) {
      alert('Please Enter Check of Hull Potential < 170, Over-Protected Remarks');
      return false;
    }
    if (!formData.remarks170_270.trim()) {
      alert('Please Enter Check of Hull Potential 170-270 Remarks');
      return false;
    }
    if (!formData.remarksUnderProtected.trim()) {
      alert('Please Enter Check of Hull Potential > 450, Under-Protected Remarks');
      return false;
    }
    if (!formData.observationsControlPanel || formData.observationsControlPanel === '0') {
      alert('Please Select Condition of Cables and Connectors of Control Panel Observations');
      return false;
    }
    if (!formData.remarksControlPanel.trim()) {
      alert('Please Enter Condition of Cables and Connectors of Control Panel Remarks');
      return false;
    }
    if (!formData.observationsTerminal || formData.observationsTerminal === '0') {
      alert('Please Select Check Anode Fuse Terminal Resistance Limits (Unit) 0.5-1 K ohm Observations');
      return false;
    }
    if (!formData.remarksTerminal.trim()) {
      alert('Please Enter Check Anode Fuse Terminal Resistance Limits (Unit) 0.5-1 K ohm Remarks');
      return false;
    }
    if (!formData.observationsReading || formData.observationsReading === '0') {
      alert('Please Select Check For Readings from (ICCP Records Maintained by SS) Observations');
      return false;
    }
    if (!formData.remarksReading.trim()) {
      alert('Please Enter Check For Readings from (ICCP Records Maintained by SS) Remarks');
      return false;
    }
    if (!formData.observationsInspection || formData.observationsInspection === '0') {
      alert('Please Select Last QC Inspection Report (d.y dock) Observations');
      return false;
    }
    if (!formData.remarksInspection.trim()) {
      alert('Please Enter Last QC Inspection Report (d.y dock) Remarks');
      return false;
    }
    if (!formData.dateLastDummyLoadTest) {
      alert('Please Select Last Dummy Load Test Date');
      return false;
    }
    if (!formData.remarksDummy.trim()) {
      alert('Please Enter Last Dummy Load Test Remarks');
      return false;
    }
    if (!formData.dateLastReading) {
      alert('Please Select Date of Last Reading');
      return false;
    }
    if (!formData.lastReadingDueOn) {
      alert('Please Select Next Due on of Recording of Hull Potential with Portable RE');
      return false;
    }
    if (!formData.remarksLastReading.trim()) {
      alert('Please Enter Recording of Hull Potential with Portable RE Remarks');
      return false;
    }
    if (!formData.dateLastCalibration) {
      alert('Please Select Date of Last Calibration');
      return false;
    }
    if (!formData.lastCalibrationDueOn) {
      alert('Please Select Next Due on of Calibration of Portable RE');
      return false;
    }
    if (!formData.remarksCalibration.trim()) {
      alert('Please Enter Calibration of Portable RE Remarks');
      return false;
    }
    if (!formData.remarksAnyOtherObserv.trim()) {
      alert('Please Enter Any Other Observation Remarks');
      return false;
    }
    if (!formData.observationsOverall || formData.observationsOverall === '0') {
      alert('Please Select Overall Remarks Observations');
      return false;
    }
    if (!formData.authoritySignature) {
      alert('Please Upload Authority Signature');
      return false;
    }

    // Validate file type and size
    if (formData.authoritySignature) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(formData.authoritySignature.type)) {
        alert('Invalid file type. Please upload JPG, JPEG, or PNG files only.');
        return false;
      }
      if (formData.authoritySignature.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const handleClear = () => {
    setFormData({
      ship: '',
      dateOfInspection: '',
      make: '',
      yearOfManufacture: '',
      remarksOverprotected: '',
      remarks170_270: '',
      remarksUnderProtected: '',
      observationsControlPanel: '',
      remarksControlPanel: '',
      observationsTerminal: '',
      remarksTerminal: '',
      observationsReading: '',
      remarksReading: '',
      observationsInspection: '',
      remarksInspection: '',
      dateLastDummyLoadTest: '',
      remarksDummy: '',
      dateLastReading: '',
      lastReadingDueOn: '',
      remarksLastReading: '',
      dateLastCalibration: '',
      lastCalibrationDueOn: '',
      remarksCalibration: '',
      remarksAnyOtherObserv: '',
      observationsOverall: '',
      authoritySignature: null,
    });
    setDraftId('');
  };

  const handleSaveDraft = () => {
    if (!formData.make.trim() || !formData.yearOfManufacture.trim()) {
      alert('Please Enter Make and Year of Manufacture to save draft');
      return;
    }

    const draftData = {
      ...formData,
      id: draftId || Date.now().toString(),
      createdDate: new Date().toISOString(),
    };

    const existingDrafts = JSON.parse(localStorage.getItem('iccp_drafts') || '[]');
    if (draftId) {
      const index = existingDrafts.findIndex((draft: any) => draft.id === draftId);
      if (index !== -1) {
        existingDrafts[index] = draftData;
      }
    } else {
      existingDrafts.push(draftData);
    }

    localStorage.setItem('iccp_drafts', JSON.stringify(existingDrafts));
    alert('Draft saved successfully!');
    setDraftId(draftData.id);
  };

  const loadDrafts = () => {
    const savedDrafts = JSON.parse(localStorage.getItem('iccp_drafts') || '[]');
    setDrafts(savedDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: DraftData) => {
    const savedDrafts = JSON.parse(localStorage.getItem('iccp_drafts') || '[]');
    const selectedDraft = savedDrafts.find((d: any) => d.id === draft.id);
    if (selectedDraft) {
      setFormData(selectedDraft);
      setDraftId(selectedDraft.id);
    }
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      const savedDrafts = JSON.parse(localStorage.getItem('iccp_drafts') || '[]');
      const updatedDrafts = savedDrafts.filter((draft: any) => draft.id !== draftId);
      localStorage.setItem('iccp_drafts', JSON.stringify(updatedDrafts));
      setDrafts(updatedDrafts);
      if (draftId === draftId) {
        setDraftId('');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss.SSS');
  };

  const validateYear = (year: string) => {
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const enteredYear = parseInt(year);

    if (enteredYear > currentYear) {
      alert('Please enter a year in the past.');
      return false;
    }
    if (enteredYear < minYear) {
      alert(`Please enter a year greater than or equal to ${minYear}.`);
      return false;
    }
    return true;
  };

  const validateSpecialCharacters = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed.');
      return false;
    }
    return true;
  };

  const validateRemarks = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed.');
      return false;
    }
    if (value.length > 1000) {
      alert('Remarks cannot exceed 1000 characters.');
      return false;
    }
    return true;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">IMPRESSED CURRENT CATHODIC PROTECTION</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">(ICCP) - INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit}>

            <div className="space-y-6">
              {/* Section 1 - Ship */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <Label htmlFor="ship" className="text-lg font-medium">Ship</Label>
                  <div className="mt-2">
                    <Select value={formData.ship} onValueChange={(value) => handleInputChange('ship', value)}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {ships.map((ship) => (
                          <SelectItem key={ship.value} value={ship.value}>
                            {ship.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 2 - Date of Inspection/Trials */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <Label htmlFor="dateOfInspection" className="text-lg font-medium">
                    Date of Inspection/Trials<span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="date"
                      id="dateOfInspection"
                      value={formData.dateOfInspection}
                      onChange={(e) => handleInputChange('dateOfInspection', e.target.value)}
                      className="w-64"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 - Make */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <Label htmlFor="make" className="text-lg font-medium">
                    Make<span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="make"
                      value={formData.make}
                      onChange={(e) => {
                        if (validateSpecialCharacters(e.target.value)) {
                          handleInputChange('make', e.target.value);
                        }
                      }}
                      maxLength={20}
                      className="w-64"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 4 - Year of Manufacture */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <Label htmlFor="yearOfManufacture" className="text-lg font-medium">
                    Year of Manufacture<span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="yearOfManufacture"
                      value={formData.yearOfManufacture}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        handleInputChange('yearOfManufacture', value);
                      }}
                      onBlur={(e) => {
                        if (e.target.value && !validateYear(e.target.value)) {
                          handleInputChange('yearOfManufacture', '');
                        }
                      }}
                      maxLength={4}
                      className="w-64"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 5 - Check of Hull Potential */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="hullPotential" className="text-lg font-medium">Check of Hull Potential</Label>
                  </div>
                </div>
                
                <div className="ml-12 space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">i) &lt; 170, Over-Protected</div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksOverprotected}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksOverprotected', e.target.value);
                          }
                        }}
                        rows={2}
                        className="flex-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">ii) 170-270</div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks170_270}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarks170_270', e.target.value);
                          }
                        }}
                        rows={2}
                        className="flex-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">iii) &gt; 450, Under-Protected</div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksUnderProtected}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksUnderProtected', e.target.value);
                          }
                        }}
                        rows={2}
                        className="flex-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6 - Condition of Cables and Connectors of Control Panel */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="controlPanel" className="text-lg font-medium">Condition of Cables and Connectors of Control Panel</Label>
                  </div>
                </div>
                
                <div className="ml-12 space-y-4">
                  <div className="text-sm font-medium mb-2">
                    a) Carbon Deposit on Connectors, Pitted Lugs. Check Tightness of Electrical Cable, Connectors and Fasteners.
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsControlPanel} onValueChange={(value) => handleInputChange('observationsControlPanel', value)}>
                        <SelectTrigger className="mt-1">
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
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksControlPanel}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksControlPanel', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7 - Check Anode Fuse Terminal Resistance Limits */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="terminalResistance" className="text-lg font-medium">Check Anode Fuse Terminal Resistance Limits (Unit)</Label>
                  </div>
                </div>
                
                <div className="ml-12 space-y-4">
                  <div className="text-sm font-medium mb-2">a) 0.5-1 K ohm</div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsTerminal} onValueChange={(value) => handleInputChange('observationsTerminal', value)}>
                        <SelectTrigger className="mt-1">
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
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksTerminal}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksTerminal', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 8 - Check For Readings from ICCP Records */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="iccpReadings" className="text-lg font-medium">Check For Readings from (ICCP Records Maintained by SS)</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsReading} onValueChange={(value) => handleInputChange('observationsReading', value)}>
                        <SelectTrigger className="mt-1">
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
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksReading}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksReading', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 9 - Last QC Inspection Report */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    9
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="qcInspection" className="text-lg font-medium">Last QC Inspection Report (d.y dock)</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsInspection} onValueChange={(value) => handleInputChange('observationsInspection', value)}>
                        <SelectTrigger className="mt-1">
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
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksInspection}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksInspection', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 10 - Last Dummy Load Test */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    10
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="dummyLoadTest" className="text-lg font-medium">Last Dummy Load Test</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        id="dateLastDummyLoadTest"
                        value={formData.dateLastDummyLoadTest}
                        onChange={(e) => handleInputChange('dateLastDummyLoadTest', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksDummy}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksDummy', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 11 - Recording of Hull Potential with Portable RE */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    11
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="hullPotentialRecording" className="text-lg font-medium">Recording of Hull Potential with Portable RE</Label>
                  </div>
                </div>
                
                <div className="ml-12 space-y-4">
                  <div className="text-sm font-medium mb-2">
                    a) To be Recorded Fortnightly, Last Date of Recording Hull Potential Reading Date
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Date of Last Reading:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        id="dateLastReading"
                        value={formData.dateLastReading}
                        onChange={(e) => handleInputChange('dateLastReading', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="w-48">
                      <Label className="text-sm">Next Due on:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        id="lastReadingDueOn"
                        value={formData.lastReadingDueOn}
                        onChange={(e) => handleInputChange('lastReadingDueOn', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksLastReading}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksLastReading', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 12 - Calibration of Portable RE */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    12
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="portableRECalibration" className="text-lg font-medium">Calibration of Portable RE</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Date of Last Calibration:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        id="dateLastCalibration"
                        value={formData.dateLastCalibration}
                        onChange={(e) => handleInputChange('dateLastCalibration', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="w-48">
                      <Label className="text-sm">Next Due on:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        id="lastCalibrationDueOn"
                        value={formData.lastCalibrationDueOn}
                        onChange={(e) => handleInputChange('lastCalibrationDueOn', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksCalibration}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksCalibration', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 13 - Any Other Observation */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    13
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="anyOtherObservation" className="text-lg font-medium">Any Other Observation</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksAnyOtherObserv}
                        onChange={(e) => {
                          if (validateRemarks(e.target.value)) {
                            handleInputChange('remarksAnyOtherObserv', e.target.value);
                          }
                        }}
                        rows={2}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 14 - Overall Remarks */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    14
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="overallRemarks" className="text-lg font-medium">Overall Remarks</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsOverall} onValueChange={(value) => handleInputChange('observationsOverall', value)}>
                        <SelectTrigger className="mt-1">
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 15 - Authority Signature */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    15
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="authoritySignature" className="text-lg font-medium">
                      Authority Signature<span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-64">
                      <Input
                        type="file"
                        id="authoritySignature"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleInputChange('authoritySignature', file);
                        }}
                        className="mt-1"
                        required
                      />
                    </div>
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
                              <TableHead>Make</TableHead>
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
                                  <TableCell>{draft.make || 'No Inspection Data'}</TableCell>
                                  <TableCell>{formatDate(draft.createdDate)}</TableCell>
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

              <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={handleSaveDraft}>
                SAVE DRAFT
              </Button>
              <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded" onClick={handleClear}>
                Clear
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                Save
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressedCurrentCathodicProtectionForm;
