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
import { CalendarIcon, Save, FileText, Trash2, Edit, Plus, Minus } from 'lucide-react';
import { format } from 'date-fns';

interface TankCompartmentData {
  tank: string;
  observation: string;
  recommendation: string;
  remark: string;
}

interface InspectorData {
  name: string;
  rank: string;
  designation: string;
}

interface UWCompartmentsData {
  // Basic Information
  inspectionIns: string;
  dateOfInspection: Date | null;
  
  // Dynamic Tables
  tankCompartments: TankCompartmentData[];
  inspectors: InspectorData[];
  
  // Summary Data
  totalNumberOfUWCompartment: string;
  noOfUWCompartmentOffered: string;
  noOfCompartmentInspected: string;
  totalNoOfCompartmentSat: string;
  totalNoOfCompartmentUnsat: string;
  
  totalNoOfTanks: string;
  noOfTanksOffered: string;
  noOfTanksInspected: string;
  totalNoOfTanksSat: string;
  totalNoOfTanksUnsat: string;
  totalNoOfTanksSatStar: string;
}

interface FormErrors {
  [key: string]: string;
}

interface DraftData {
  id: string;
  title: string;
  data: UWCompartmentsData;
  timestamp: string;
}

const UWCompartmentsHullInspectionReportForm: React.FC = () => {
  const [formData, setFormData] = useState<UWCompartmentsData>({
    inspectionIns: '',
    dateOfInspection: null,
    tankCompartments: [{ tank: '', observation: '', recommendation: '', remark: '' }],
    inspectors: [{ name: '', rank: '', designation: '' }],
    totalNumberOfUWCompartment: '',
    noOfUWCompartmentOffered: '',
    noOfCompartmentInspected: '',
    totalNoOfCompartmentSat: '',
    totalNoOfCompartmentUnsat: '',
    totalNoOfTanks: '',
    noOfTanksOffered: '',
    noOfTanksInspected: '',
    totalNoOfTanksSat: '',
    totalNoOfTanksUnsat: '',
    totalNoOfTanksSatStar: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string>('');

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

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('uw-compartments-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        // Convert date strings back to Date objects
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
      localStorage.setItem('uw-compartments-draft', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof UWCompartmentsData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTankCompartmentChange = (index: number, field: keyof TankCompartmentData, value: string) => {
    const updatedTanks = [...formData.tankCompartments];
    updatedTanks[index] = { ...updatedTanks[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      tankCompartments: updatedTanks
    }));
  };

  const handleInspectorChange = (index: number, field: keyof InspectorData, value: string) => {
    const updatedInspectors = [...formData.inspectors];
    updatedInspectors[index] = { ...updatedInspectors[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      inspectors: updatedInspectors
    }));
  };

  const addTankCompartmentRow = () => {
    setFormData(prev => ({
      ...prev,
      tankCompartments: [...prev.tankCompartments, { tank: '', observation: '', recommendation: '', remark: '' }]
    }));
  };

  const removeTankCompartmentRow = (index: number) => {
    if (formData.tankCompartments.length > 1) {
      const updatedTanks = formData.tankCompartments.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        tankCompartments: updatedTanks
      }));
    }
  };

  const addInspectorRow = () => {
    setFormData(prev => ({
      ...prev,
      inspectors: [...prev.inspectors, { name: '', rank: '', designation: '' }]
    }));
  };

  const removeInspectorRow = (index: number) => {
    if (formData.inspectors.length > 1) {
      const updatedInspectors = formData.inspectors.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        inspectors: updatedInspectors
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic Information validation
    if (!formData.inspectionIns || formData.inspectionIns === '0') {
      newErrors.inspectionIns = 'Please select U/W Compartments Inspection Report - INS';
    }
    if (!formData.dateOfInspection) {
      newErrors.dateOfInspection = 'Please select Date of Inspection';
    }

    // Tank/Compartment validation
    formData.tankCompartments.forEach((tank, index) => {
      if (!tank.tank.trim()) {
        newErrors[`tank_${index}`] = `Please enter Tanks/Compartment ${index + 1}`;
      }
      if (!tank.observation.trim()) {
        newErrors[`observation_${index}`] = `Please enter Observation ${index + 1}`;
      }
      if (!tank.recommendation.trim()) {
        newErrors[`recommendation_${index}`] = `Please enter Recommendation ${index + 1}`;
      }
      if (!tank.remark.trim()) {
        newErrors[`remark_${index}`] = `Please enter Remarks ${index + 1}`;
      }
    });

    // Summary validation
    if (!formData.totalNumberOfUWCompartment.trim()) {
      newErrors.totalNumberOfUWCompartment = 'Please enter Total Number of U/W Compartments';
    }
    if (!formData.noOfUWCompartmentOffered.trim()) {
      newErrors.noOfUWCompartmentOffered = 'Please enter No. of U/W Compartments Offered';
    }
    if (!formData.noOfCompartmentInspected.trim()) {
      newErrors.noOfCompartmentInspected = 'Please enter No. of Compartments Inspected';
    }
    if (!formData.totalNoOfCompartmentSat.trim()) {
      newErrors.totalNoOfCompartmentSat = 'Please enter Total Number of Compartment SAT/ SAT*';
    }
    if (!formData.totalNoOfCompartmentUnsat.trim()) {
      newErrors.totalNoOfCompartmentUnsat = 'Please enter Total Number of Compartment UNSAT';
    }
    if (!formData.totalNoOfTanks.trim()) {
      newErrors.totalNoOfTanks = 'Please enter Total Number of Tanks';
    }
    if (!formData.noOfTanksOffered.trim()) {
      newErrors.noOfTanksOffered = 'Please enter No. of Tanks Offered';
    }
    if (!formData.noOfTanksInspected.trim()) {
      newErrors.noOfTanksInspected = 'Please enter No. of Tanks Inspected';
    }
    if (!formData.totalNoOfTanksSat.trim()) {
      newErrors.totalNoOfTanksSat = 'Please enter Total Number of Tanks SAT/ SAT*';
    }
    if (!formData.totalNoOfTanksUnsat.trim()) {
      newErrors.totalNoOfTanksUnsat = 'Please enter Total Number of Tanks UNSAT';
    }
    if (!formData.totalNoOfTanksSatStar.trim()) {
      newErrors.totalNoOfTanksSatStar = 'Please enter Total Number of Tanks SAT*';
    }

    // Inspector validation
    formData.inspectors.forEach((inspector, index) => {
      if (!inspector.name.trim()) {
        newErrors[`inspector_name_${index}`] = `Please enter Name ${index + 1}`;
      }
      if (!inspector.rank.trim()) {
        newErrors[`inspector_rank_${index}`] = `Please enter Rank ${index + 1}`;
      }
      if (!inspector.designation.trim()) {
        newErrors[`inspector_designation_${index}`] = `Please enter Designation ${index + 1}`;
      }
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      localStorage.removeItem('uw-compartments-draft');
      
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        inspectionIns: '',
        dateOfInspection: null,
        tankCompartments: [{ tank: '', observation: '', recommendation: '', remark: '' }],
        inspectors: [{ name: '', rank: '', designation: '' }],
        totalNumberOfUWCompartment: '',
        noOfUWCompartmentOffered: '',
        noOfCompartmentInspected: '',
        totalNoOfCompartmentSat: '',
        totalNoOfCompartmentUnsat: '',
        totalNoOfTanks: '',
        noOfTanksOffered: '',
        noOfTanksInspected: '',
        totalNoOfTanksSat: '',
        totalNoOfTanksUnsat: '',
        totalNoOfTanksSatStar: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    if (!formData.inspectionIns || formData.inspectionIns === '0') {
      alert('Please select U/W Compartments Inspection Report - INS before saving draft');
      return;
    }

    const draftData: DraftData = {
      id: Date.now().toString(),
      title: `U/W Compartments - ${shipOptions.find(s => s.value === formData.inspectionIns)?.label || 'Draft'}`,
      data: { ...formData },
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('uw-compartments-drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('uw-compartments-drafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('uw-compartments-drafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: DraftData) => {
    setFormData(draft.data);
    setSelectedDraftId(draft.id);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('uw-compartments-drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      inspectionIns: '',
      dateOfInspection: null,
      tankCompartments: [{ tank: '', observation: '', recommendation: '', remark: '' }],
      inspectors: [{ name: '', rank: '', designation: '' }],
      totalNumberOfUWCompartment: '',
      noOfUWCompartmentOffered: '',
      noOfCompartmentInspected: '',
      totalNoOfCompartmentSat: '',
      totalNoOfCompartmentUnsat: '',
      totalNoOfTanks: '',
      noOfTanksOffered: '',
      noOfTanksInspected: '',
      totalNoOfTanksSat: '',
      totalNoOfTanksUnsat: '',
      totalNoOfTanksSatStar: '',
    });
    setErrors({});
    setSelectedDraftId('');
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
                <u>U/W COMPARTMENTS INSPECTION REPORT - INS</u>
              </h2>
              <div className="flex justify-center">
                <Select
                  value={formData.inspectionIns}
                  onValueChange={(value) => handleInputChange('inspectionIns', value)}
                >
                  <SelectTrigger className="w-64">
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
              </div>
              {errors.inspectionIns && <p className="text-red-500 text-sm mt-1">{errors.inspectionIns}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">
                      Date of Inspection: <span className="text-red-500">*</span>
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
                    {errors.dateOfInspection && <p className="text-red-500 text-sm mt-1">{errors.dateOfInspection}</p>}
                  </div>
                </div>
              </div>

              {/* Tank/Compartment Table */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-blue-600">Tanks/Compartment Details</h3>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={addTankCompartmentRow}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Row
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Sr No.</TableHead>
                        <TableHead>Tanks/Compartment <span className="text-red-500">*</span></TableHead>
                        <TableHead>Observation <span className="text-red-500">*</span></TableHead>
                        <TableHead>Recommendation <span className="text-red-500">*</span></TableHead>
                        <TableHead>Remarks <span className="text-red-500">*</span></TableHead>
                        <TableHead className="w-20">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.tankCompartments.map((tank, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell>
                            <Input
                              value={tank.tank}
                              onChange={(e) => handleTankCompartmentChange(index, 'tank', handleTextValidation(e.target.value))}
                              maxLength={20}
                              placeholder="Enter tank/compartment"
                            />
                            {errors[`tank_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`tank_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={tank.observation}
                              onChange={(e) => handleTankCompartmentChange(index, 'observation', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter observation"
                            />
                            {errors[`observation_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`observation_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={tank.recommendation}
                              onChange={(e) => handleTankCompartmentChange(index, 'recommendation', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter recommendation"
                            />
                            {errors[`recommendation_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`recommendation_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={tank.remark}
                              onChange={(e) => handleTankCompartmentChange(index, 'remark', handleTextValidation(e.target.value))}
                              maxLength={50}
                              placeholder="Enter remarks"
                            />
                            {errors[`remark_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`remark_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            {formData.tankCompartments.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeTankCompartmentRow(index)}
                                size="sm"
                                variant="destructive"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Summary Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Summary of Inspection of U/W Compartments and Tanks</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Internal U/W Compartments */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">INTERNAL U/W COMPARTMENTS</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(a)</span>
                        <Label className="text-sm font-medium flex-1">Total Number of U/W Compartments <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNumberOfUWCompartment}
                          onChange={(e) => handleInputChange('totalNumberOfUWCompartment', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNumberOfUWCompartment && <p className="text-red-500 text-xs mt-1">{errors.totalNumberOfUWCompartment}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(b)</span>
                        <Label className="text-sm font-medium flex-1">No. of U/W Compartments offered <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.noOfUWCompartmentOffered}
                          onChange={(e) => handleInputChange('noOfUWCompartmentOffered', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.noOfUWCompartmentOffered && <p className="text-red-500 text-xs mt-1">{errors.noOfUWCompartmentOffered}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(c)</span>
                        <Label className="text-sm font-medium flex-1">No. of Compartments inspected <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.noOfCompartmentInspected}
                          onChange={(e) => handleInputChange('noOfCompartmentInspected', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.noOfCompartmentInspected && <p className="text-red-500 text-xs mt-1">{errors.noOfCompartmentInspected}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(d)</span>
                        <Label className="text-sm font-medium flex-1">Total number of Compartments-SAT/ SAT* <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNoOfCompartmentSat}
                          onChange={(e) => handleInputChange('totalNoOfCompartmentSat', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNoOfCompartmentSat && <p className="text-red-500 text-xs mt-1">{errors.totalNoOfCompartmentSat}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(e)</span>
                        <Label className="text-sm font-medium flex-1">Total number of Compartments-UNSAT <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNoOfCompartmentUnsat}
                          onChange={(e) => handleInputChange('totalNoOfCompartmentUnsat', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNoOfCompartmentUnsat && <p className="text-red-500 text-xs mt-1">{errors.totalNoOfCompartmentUnsat}</p>}
                    </div>
                  </div>

                  {/* Tanks */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">TANKS</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(a)</span>
                        <Label className="text-sm font-medium flex-1">Total Number of tanks <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNoOfTanks}
                          onChange={(e) => handleInputChange('totalNoOfTanks', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNoOfTanks && <p className="text-red-500 text-xs mt-1">{errors.totalNoOfTanks}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(b)</span>
                        <Label className="text-sm font-medium flex-1">No. of tanks offered <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.noOfTanksOffered}
                          onChange={(e) => handleInputChange('noOfTanksOffered', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.noOfTanksOffered && <p className="text-red-500 text-xs mt-1">{errors.noOfTanksOffered}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(c)</span>
                        <Label className="text-sm font-medium flex-1">No. of tanks inspected <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.noOfTanksInspected}
                          onChange={(e) => handleInputChange('noOfTanksInspected', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.noOfTanksInspected && <p className="text-red-500 text-xs mt-1">{errors.noOfTanksInspected}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(d)</span>
                        <Label className="text-sm font-medium flex-1">Total number of tanks-SAT/ SAT* <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNoOfTanksSat}
                          onChange={(e) => handleInputChange('totalNoOfTanksSat', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNoOfTanksSat && <p className="text-red-500 text-xs mt-1">{errors.totalNoOfTanksSat}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(e)</span>
                        <Label className="text-sm font-medium flex-1">Total number of tanks-UNSAT <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNoOfTanksUnsat}
                          onChange={(e) => handleInputChange('totalNoOfTanksUnsat', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNoOfTanksUnsat && <p className="text-red-500 text-xs mt-1">{errors.totalNoOfTanksUnsat}</p>}
                      
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(f)</span>
                        <Label className="text-sm font-medium flex-1">Total number of tanks-SAT* <span className="text-red-500">*</span></Label>
                        <Input
                          value={formData.totalNoOfTanksSatStar}
                          onChange={(e) => handleInputChange('totalNoOfTanksSatStar', handleNumberValidation(e.target.value))}
                          maxLength={5}
                          className="w-24"
                        />
                      </div>
                      {errors.totalNoOfTanksSatStar && <p className="text-red-500 text-xs mt-1">{errors.totalNoOfTanksSatStar}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspector Table */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-blue-600">Inspector Details</h3>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={addInspectorRow}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Row
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Sr No.</TableHead>
                        <TableHead>Name <span className="text-red-500">*</span></TableHead>
                        <TableHead>Rank <span className="text-red-500">*</span></TableHead>
                        <TableHead>Designation <span className="text-red-500">*</span></TableHead>
                        <TableHead className="w-20">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.inspectors.map((inspector, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell>
                            <Input
                              value={inspector.name}
                              onChange={(e) => handleInspectorChange(index, 'name', handleTextValidation(e.target.value))}
                              maxLength={20}
                              placeholder="Enter name"
                            />
                            {errors[`inspector_name_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`inspector_name_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={inspector.rank}
                              onChange={(e) => handleInspectorChange(index, 'rank', handleTextValidation(e.target.value))}
                              maxLength={10}
                              placeholder="Enter rank"
                            />
                            {errors[`inspector_rank_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`inspector_rank_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={inspector.designation}
                              onChange={(e) => handleInspectorChange(index, 'designation', handleTextValidation(e.target.value))}
                              maxLength={10}
                              placeholder="Enter designation"
                            />
                            {errors[`inspector_designation_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`inspector_designation_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            {formData.inspectors.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeInspectorRow(index)}
                                size="sm"
                                variant="destructive"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            )}
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  Fetch Drafts
                </Button>

                <Button
                  type="button"
                  onClick={saveDraft}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                >
                  SAVE DRAFT
                </Button>

                <Button
                  type="button"
                  onClick={clearForm}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                >
                  Clear
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
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
                    <TableHead>INS</TableHead>
                    <TableHead>Date of Inspection</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{shipOptions.find(s => s.value === draft.data.inspectionIns)?.label || 'No Inspection Data'}</TableCell>
                      <TableCell>{draft.data.dateOfInspection ? format(draft.data.dateOfInspection, 'dd-MM-yyyy') : 'No Date Provided'}</TableCell>
                      <TableCell>{formatDate(draft.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => loadDraft(draft)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => deleteDraft(draft.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
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

export default UWCompartmentsHullInspectionReportForm;
