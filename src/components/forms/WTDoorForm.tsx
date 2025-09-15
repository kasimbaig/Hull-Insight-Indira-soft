import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, FileText, Trash2, Edit, Plus, Minus } from 'lucide-react';

interface DoorEntry {
  id: number;
  location: string;
  typeOfDoor: string;
  conditionOfDoorCoamingCover: string;
  conditionOfDoorCoaming: string;
  conditionOfDogClipsHinges: string;
  conditionOfWedges: string;
  surfaceTruenessOfMetallicCoaming: string;
  adhesionAndSizeOfRubberBeading: string;
  materialOfRubberBeading: string;
  conditionOfRubberBeading: string;
  conditionOfSpringPistonMechanism: string;
  conditionOfAutoLockRetainingArrangement: string;
  itp: string;
  preservationStatusOfDoors: string;
  lubrication: string;
  uld: string;
  finalResult: string;
}

interface WTDoorData {
  ins: string;
  totalRows: number;
  doorEntries: DoorEntry[];
}

interface FormErrors {
  [key: string]: string;
}

interface DraftData {
  id: string;
  title: string;
  data: WTDoorData;
  timestamp: string;
}

const WTDoorForm: React.FC = () => {
  const [formData, setFormData] = useState<WTDoorData>({
    ins: '',
    totalRows: 1,
    doorEntries: [
      {
        id: 1,
        location: '',
        typeOfDoor: '',
        conditionOfDoorCoamingCover: '',
        conditionOfDoorCoaming: '',
        conditionOfDogClipsHinges: '',
        conditionOfWedges: '',
        surfaceTruenessOfMetallicCoaming: '',
        adhesionAndSizeOfRubberBeading: '',
        materialOfRubberBeading: '',
        conditionOfRubberBeading: '',
        conditionOfSpringPistonMechanism: '',
        conditionOfAutoLockRetainingArrangement: '',
        itp: '',
        preservationStatusOfDoors: '',
        lubrication: '',
        uld: '',
        finalResult: '',
      }
    ]
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const insOptions = [
    { value: 'SHIVALIK', label: 'SHIVALIK' },
    { value: 'JAMUNA', label: 'JAMUNA' },
    { value: 'BANGARAM', label: 'BANGARAM' },
    { value: 'TARANGINI', label: 'TARANGINI' },
    { value: 'SARYU', label: 'SARYU' },
    { value: 'KUMBHIR', label: 'KUMBHIR' },
    { value: 'T-83', label: 'T-83' },
    { value: 'AIRAVAT', label: 'AIRAVAT' },
    { value: 'KHANJAR', label: 'KHANJAR' },
    { value: 'SHUDERSHINI', label: 'SHUDERSHINI' },
    { value: 'TRISHUL', label: 'TRISHUL' },
    { value: 'TEG', label: 'TEG' },
    { value: 'RANVIJAY', label: 'RANVIJAY' },
    { value: 'KIRPAN', label: 'KIRPAN' },
    { value: 'DELHI', label: 'DELHI' },
    { value: 'SURVEKSHAK', label: 'SURVEKSHAK' },
    { value: 'JYOTI', label: 'JYOTI' },
    { value: 'SUJATA', label: 'SUJATA' },
    { value: 'KABRA', label: 'KABRA' },
    { value: 'CANKARSO', label: 'CANKARSO' },
    { value: 'T-84', label: 'T-84' },
    { value: 'VIBHUTI', label: 'VIBHUTI' },
    { value: 'NISHANK', label: 'NISHANK' },
    { value: 'MAGAR', label: 'MAGAR' },
    { value: 'BEAS', label: 'BEAS' },
    { value: 'SUVERNA', label: 'SUVERNA' },
    { value: 'SAHYADRI', label: 'SAHYADRI' },
    { value: 'PRALAYA', label: 'PRALAYA' },
    { value: 'CHERIYAM', label: 'CHERIYAM' },
    { value: 'SATPURA', label: 'SATPURA' },
    { value: 'JALASHWA', label: 'JALASHWA' },
    { value: 'TARKASH', label: 'TARKASH' },
    { value: 'KARMUK', label: 'KARMUK' },
    { value: 'SUTLEJ', label: 'SUTLEJ' },
    { value: 'SUMEDHA', label: 'SUMEDHA' },
    { value: 'PRABAL', label: 'PRABAL' },
    { value: 'CORA DIVH', label: 'CORA DIVH' },
    { value: 'BATTIMALV', label: 'BATTIMALV' },
    { value: 'CHENNAI', label: 'CHENNAI' },
    { value: 'SUMITRA', label: 'SUMITRA' },
    { value: 'T-82', label: 'T-82' },
    { value: 'KUTHAR', label: 'KUTHAR' },
    { value: 'KONDUL', label: 'KONDUL' },
    { value: 'SUBHDRA', label: 'SUBHDRA' },
    { value: 'DARSHAK', label: 'DARSHAK' },
    { value: 'BITRA', label: 'BITRA' },
    { value: 'CHETLAT', label: 'CHETLAT' },
    { value: 'NIREEKSHAK', label: 'NIREEKSHAK' },
    { value: 'KARUVA', label: 'KARUVA' },
    { value: 'DEEPAK', label: 'DEEPAK' },
    { value: 'SHAKTI', label: 'SHAKTI' },
    { value: 'KOLKATA', label: 'KOLKATA' },
    { value: 'INVETIGATOR', label: 'INVETIGATOR' },
    { value: 'SHARDA', label: 'SHARDA' },
    { value: 'MUMBAI', label: 'MUMBAI' },
    { value: 'GOMTI', label: 'GOMTI' },
    { value: 'BETWA', label: 'BETWA' },
    { value: 'NASHAK', label: 'NASHAK' },
    { value: 'KOSWARI', label: 'KOSWARI' },
    { value: 'CHEETAH', label: 'CHEETAH' },
    { value: 'TALWAR', label: 'TALWAR' },
    { value: 'KESARI', label: 'KESARI' },
    { value: 'ADITYA', label: 'ADITYA' },
    { value: 'BARATANG', label: 'BARATANG' },
    { value: 'KORA', label: 'KORA' },
    { value: 'KULISH', label: 'KULISH' },
    { value: 'RANA', label: 'RANA' },
    { value: 'KALPENI', label: 'KALPENI' },
    { value: 'VIPUL', label: 'VIPUL' },
    { value: 'TABAR', label: 'TABAR' },
    { value: 'TRINKAND', label: 'TRINKAND' },
    { value: 'KOCHI', label: 'KOCHI' },
    { value: 'SUKANYA', label: 'SUKANYA' },
    { value: 'SAVITRI', label: 'SAVITRI' },
    { value: 'GULDAR', label: 'GULDAR' },
    { value: 'BRAHMAPUTRA', label: 'BRAHMAPUTRA' },
    { value: 'GHARIAL', label: 'GHARIAL' },
    { value: 'RANVIR', label: 'RANVIR' },
    { value: 'NIRUPAK', label: 'NIRUPAK' },
    { value: 'VINASH', label: 'VINASH' },
    { value: 'KIRCH', label: 'KIRCH' },
    { value: 'SANDHAYAK', label: 'SANDHAYAK' },
    { value: 'VIDYUT', label: 'VIDYUT' },
    { value: 'TIR', label: 'TIR' },
    { value: 'GAJ', label: 'GAJ' },
    { value: 'CAR NICOBAR', label: 'CAR NICOBAR' },
    { value: 'SUNAYNA', label: 'SUNAYNA' },
    { value: 'MYSORE', label: 'MYSORE' },
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('wt-door-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error parsing saved draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage whenever formData changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('wt-door-draft', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof WTDoorData, value: any) => {
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

  const handleDoorEntryChange = (id: number, field: keyof DoorEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      doorEntries: prev.doorEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }));
    
    const errorKey = `${field}_${id}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleTotalRowsChange = (value: string) => {
    const numRows = parseInt(value) || 1;
    const currentRows = formData.doorEntries.length;
    
    if (numRows > currentRows) {
      // Add new rows
      const newEntries = [];
      for (let i = currentRows + 1; i <= numRows; i++) {
        newEntries.push({
          id: i,
          location: '',
          typeOfDoor: '',
          conditionOfDoorCoamingCover: '',
          conditionOfDoorCoaming: '',
          conditionOfDogClipsHinges: '',
          conditionOfWedges: '',
          surfaceTruenessOfMetallicCoaming: '',
          adhesionAndSizeOfRubberBeading: '',
          materialOfRubberBeading: '',
          conditionOfRubberBeading: '',
          conditionOfSpringPistonMechanism: '',
          conditionOfAutoLockRetainingArrangement: '',
          itp: '',
          preservationStatusOfDoors: '',
          lubrication: '',
          uld: '',
          finalResult: '',
        });
      }
      setFormData(prev => ({
        ...prev,
        totalRows: numRows,
        doorEntries: [...prev.doorEntries, ...newEntries]
      }));
    } else if (numRows < currentRows) {
      // Remove rows
      setFormData(prev => ({
        ...prev,
        totalRows: numRows,
        doorEntries: prev.doorEntries.slice(0, numRows)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        totalRows: numRows
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ins || formData.ins === '0') {
      newErrors.ins = 'Please select INS';
    }

    // Validate all door entries
    formData.doorEntries.forEach((entry, index) => {
      const requiredFields: (keyof DoorEntry)[] = [
        'location', 'typeOfDoor', 'conditionOfDoorCoamingCover', 'conditionOfDoorCoaming',
        'conditionOfDogClipsHinges', 'conditionOfWedges', 'surfaceTruenessOfMetallicCoaming',
        'adhesionAndSizeOfRubberBeading', 'materialOfRubberBeading', 'conditionOfRubberBeading',
        'conditionOfSpringPistonMechanism', 'conditionOfAutoLockRetainingArrangement',
        'itp', 'preservationStatusOfDoors', 'lubrication', 'uld', 'finalResult'
      ];

      requiredFields.forEach(field => {
        if (!entry[field] || entry[field].trim() === '') {
          newErrors[`${field}_${entry.id}`] = `Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} for row ${index + 1}`;
        }
      });
    });

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
      localStorage.removeItem('wt-door-draft');
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
    if (!formData.doorEntries[0]?.location.trim()) {
      alert('Please enter Location for row 1 before saving draft');
      return;
    }

    const draftData: DraftData = {
      id: Date.now().toString(),
      title: `WT Door - ${formData.doorEntries[0]?.location || 'No Location'}`,
      data: { ...formData },
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('wt-door-drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('wt-door-drafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('wt-door-drafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: DraftData) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('wt-door-drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      ins: '',
      totalRows: 1,
      doorEntries: [
        {
          id: 1,
          location: '',
          typeOfDoor: '',
          conditionOfDoorCoamingCover: '',
          conditionOfDoorCoaming: '',
          conditionOfDogClipsHinges: '',
          conditionOfWedges: '',
          surfaceTruenessOfMetallicCoaming: '',
          adhesionAndSizeOfRubberBeading: '',
          materialOfRubberBeading: '',
          conditionOfRubberBeading: '',
          conditionOfSpringPistonMechanism: '',
          conditionOfAutoLockRetainingArrangement: '',
          itp: '',
          preservationStatusOfDoors: '',
          lubrication: '',
          uld: '',
          finalResult: '',
        }
      ]
    });
    setErrors({});
  };

  const handleTextValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed');
    }
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const handleNumberValidation = (value: string) => {
    if (/[^0-9]/.test(value)) {
      alert('Only numbers are allowed');
    }
    return value.replace(/[^0-9]/g, '');
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

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <u>WT DOOR</u>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* INS Selection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      INS: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.ins}
                      onValueChange={(value) => handleInputChange('ins', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {insOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ins && <p className="text-red-500 text-xs mt-1">{errors.ins}</p>}
                  </div>
                </div>
              </div>

              {/* Total Rows Input */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Enter Total Number of Rows: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.totalRows.toString()}
                      onChange={(e) => handleTotalRowsChange(handleNumberValidation(e.target.value))}
                      maxLength={2}
                      placeholder="Enter number of rows"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Table */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Sr No.</TableHead>
                        <TableHead className="text-center">Location</TableHead>
                        <TableHead className="text-center">Type of Door</TableHead>
                        <TableHead className="text-center">Condition of Door Coaming Cover</TableHead>
                        <TableHead className="text-center">Condition of Door Coaming</TableHead>
                        <TableHead className="text-center">Condition of Dog clips/Hinges</TableHead>
                        <TableHead className="text-center">Condition of Wedges</TableHead>
                        <TableHead className="text-center">Surface Trueness of Metallic Coaming</TableHead>
                        <TableHead className="text-center">Adhesion & Size of Rubber Beading</TableHead>
                        <TableHead className="text-center">Material of Rubber Beading</TableHead>
                        <TableHead className="text-center">Condition of Rubber Beading</TableHead>
                        <TableHead className="text-center">Condition of Spring/Piston Mechanism</TableHead>
                        <TableHead className="text-center">Condition of Auto-lock/retaining arrangement</TableHead>
                        <TableHead className="text-center">ITP</TableHead>
                        <TableHead className="text-center">Preservation Status of Doors</TableHead>
                        <TableHead className="text-center">Lubrication</TableHead>
                        <TableHead className="text-center">ULD</TableHead>
                        <TableHead className="text-center">Final Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.doorEntries.map((entry, index) => (
                        <TableRow key={entry.id}>
                          <TableCell className="text-center">{entry.id}</TableCell>
                          <TableCell>
                            <Input
                              value={entry.location}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'location', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter location"
                            />
                            {errors[`location_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`location_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.typeOfDoor}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'typeOfDoor', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter type"
                            />
                            {errors[`typeOfDoor_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`typeOfDoor_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfDoorCoamingCover}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfDoorCoamingCover', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfDoorCoamingCover_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfDoorCoamingCover_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfDoorCoaming}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfDoorCoaming', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfDoorCoaming_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfDoorCoaming_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfDogClipsHinges}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfDogClipsHinges', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfDogClipsHinges_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfDogClipsHinges_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfWedges}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfWedges', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfWedges_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfWedges_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.surfaceTruenessOfMetallicCoaming}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'surfaceTruenessOfMetallicCoaming', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`surfaceTruenessOfMetallicCoaming_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`surfaceTruenessOfMetallicCoaming_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.adhesionAndSizeOfRubberBeading}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'adhesionAndSizeOfRubberBeading', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`adhesionAndSizeOfRubberBeading_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`adhesionAndSizeOfRubberBeading_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.materialOfRubberBeading}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'materialOfRubberBeading', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter material"
                            />
                            {errors[`materialOfRubberBeading_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`materialOfRubberBeading_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfRubberBeading}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfRubberBeading', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfRubberBeading_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfRubberBeading_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfSpringPistonMechanism}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfSpringPistonMechanism', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfSpringPistonMechanism_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfSpringPistonMechanism_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.conditionOfAutoLockRetainingArrangement}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'conditionOfAutoLockRetainingArrangement', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter condition"
                            />
                            {errors[`conditionOfAutoLockRetainingArrangement_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`conditionOfAutoLockRetainingArrangement_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.itp}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'itp', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter ITP"
                            />
                            {errors[`itp_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`itp_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.preservationStatusOfDoors}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'preservationStatusOfDoors', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter status"
                            />
                            {errors[`preservationStatusOfDoors_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`preservationStatusOfDoors_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.lubrication}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'lubrication', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter lubrication"
                            />
                            {errors[`lubrication_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`lubrication_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.uld}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'uld', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter ULD"
                            />
                            {errors[`uld_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`uld_${entry.id}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.finalResult}
                              onChange={(e) => handleDoorEntryChange(entry.id, 'finalResult', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter result"
                            />
                            {errors[`finalResult_${entry.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`finalResult_${entry.id}`]}</p>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                    <TableHead>Location</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.data.doorEntries[0]?.location || 'No Location Data'}</TableCell>
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

export default WTDoorForm;
