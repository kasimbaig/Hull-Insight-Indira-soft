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
import { CalendarIcon, Save, FileText, Trash2, Edit, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface StructuralSoundnessData {
  // Basic Information
  ship: string;
  shipDate: Date | null;
  frequency: string;
  inspectionBy: string;
  lastUndertakenOn: Date | null;
  
  // Visual Inspection
  viHangerDeckHeadObservations: string;
  viBulkheadsObservations: string;
  viDeckDadoObservations: string;
  
  // Hanger Door
  hdType: string;
  hdMake: string;
  hdNormalModeObservations: string;
  hdEmergencyModeObservations: string;
  hdDefectObservations: string;
  hdSatUnsatObservations: string;
  
  // Helo Traversing System
  htsType: string;
  htsMake: string;
  htsNormalModeObservations: string;
  htsEmergencyModeObservations: string;
  htsDefectObservations: string;
  htsSatUnsatObservations: string;
  
  // Deck Rings/Lashing Points
  deckRingsVisualInspection: string;
  loadTestDate: Date | null;
  certificates: string;
  
  // Helo Safety Nets
  heloSafetyNetsObservations: string;
  
  // Harpoon Grid
  harpoonGridObservations: string;
  
  // Preservation of Helo/Hanger Deck
  paintSchemeObservations: string;
  paintSchemeRenewedObservations: string;
  paintSchemeConditionObservations: string;
  frictionTestDate: Date | null;
  frictionTestSatUnsat: string;
  
  // Drainage
  drainageHeloDeckVi: string;
  drainageHangerVi: string;
  
  // Final Observation
  foAnyOtherObservation: string;
  foRecommendation: string;
  foRemarks: string;
  
  // Authority Signature
  authoritySignature: File | null;
}

interface FormErrors {
  [key: string]: string;
}

interface DraftData {
  id: string;
  title: string;
  data: StructuralSoundnessData;
  timestamp: string;
}

const StructuralSoundnessOfHeloHangerForm: React.FC = () => {
  const [formData, setFormData] = useState<StructuralSoundnessData>({
    ship: '',
    shipDate: null,
    frequency: '',
    inspectionBy: '',
    lastUndertakenOn: null,
    viHangerDeckHeadObservations: '',
    viBulkheadsObservations: '',
    viDeckDadoObservations: '',
    hdType: '',
    hdMake: '',
    hdNormalModeObservations: '',
    hdEmergencyModeObservations: '',
    hdDefectObservations: '',
    hdSatUnsatObservations: '',
    htsType: '',
    htsMake: '',
    htsNormalModeObservations: '',
    htsEmergencyModeObservations: '',
    htsDefectObservations: '',
    htsSatUnsatObservations: '',
    deckRingsVisualInspection: '',
    loadTestDate: null,
    certificates: '',
    heloSafetyNetsObservations: '',
    harpoonGridObservations: '',
    paintSchemeObservations: '',
    paintSchemeRenewedObservations: '',
    paintSchemeConditionObservations: '',
    frictionTestDate: null,
    frictionTestSatUnsat: '',
    drainageHeloDeckVi: '',
    drainageHangerVi: '',
    foAnyOtherObservation: '',
    foRecommendation: '',
    foRemarks: '',
    authoritySignature: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string>('');

  const observationsOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' },
  ];

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
    const savedDraft = localStorage.getItem('structural-soundness-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        // Convert date strings back to Date objects
        if (parsedDraft.shipDate) parsedDraft.shipDate = new Date(parsedDraft.shipDate);
        if (parsedDraft.lastUndertakenOn) parsedDraft.lastUndertakenOn = new Date(parsedDraft.lastUndertakenOn);
        if (parsedDraft.loadTestDate) parsedDraft.loadTestDate = new Date(parsedDraft.loadTestDate);
        if (parsedDraft.frictionTestDate) parsedDraft.frictionTestDate = new Date(parsedDraft.frictionTestDate);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error parsing saved draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage whenever formData changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('structural-soundness-draft', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof StructuralSoundnessData, value: any) => {
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic Information validation
    if (!formData.ship || formData.ship === '0') {
      newErrors.ship = 'Please select Ship';
    }
    if (!formData.shipDate) {
      newErrors.shipDate = 'Please select Date';
    }
    if (!formData.frequency.trim()) {
      newErrors.frequency = 'Please enter Frequency';
    }
    if (!formData.inspectionBy.trim()) {
      newErrors.inspectionBy = 'Please enter Inspection by';
    }
    if (!formData.lastUndertakenOn) {
      newErrors.lastUndertakenOn = 'Please select Last Undertaken on';
    }

    // Visual Inspection validation
    if (!formData.viHangerDeckHeadObservations || formData.viHangerDeckHeadObservations === '0') {
      newErrors.viHangerDeckHeadObservations = 'Please select Hanger Deck Head & Hanger Top observations';
    }
    if (!formData.viBulkheadsObservations || formData.viBulkheadsObservations === '0') {
      newErrors.viBulkheadsObservations = 'Please select Bulkheads (FWD, Port & STBD) observations';
    }
    if (!formData.viDeckDadoObservations || formData.viDeckDadoObservations === '0') {
      newErrors.viDeckDadoObservations = 'Please select Deck and Dado Areas observations';
    }

    // Hanger Door validation
    if (!formData.hdType.trim()) {
      newErrors.hdType = 'Please enter Type';
    }
    if (!formData.hdMake.trim()) {
      newErrors.hdMake = 'Please enter Make';
    }
    if (!formData.hdNormalModeObservations || formData.hdNormalModeObservations === '0') {
      newErrors.hdNormalModeObservations = 'Please select Normal Mode-Ops/Non-ops observations';
    }
    if (!formData.hdEmergencyModeObservations || formData.hdEmergencyModeObservations === '0') {
      newErrors.hdEmergencyModeObservations = 'Please select Emergency Mode-Ops/Non-ops observations';
    }
    if (!formData.hdDefectObservations || formData.hdDefectObservations === '0') {
      newErrors.hdDefectObservations = 'Please select Defects/Observation observations';
    }
    if (!formData.hdSatUnsatObservations || formData.hdSatUnsatObservations === '0') {
      newErrors.hdSatUnsatObservations = 'Please select SAT/UNSAT observations';
    }

    // Helo Traversing System validation
    if (!formData.htsType.trim()) {
      newErrors.htsType = 'Please enter Type';
    }
    if (!formData.htsMake.trim()) {
      newErrors.htsMake = 'Please enter Make';
    }
    if (!formData.htsNormalModeObservations || formData.htsNormalModeObservations === '0') {
      newErrors.htsNormalModeObservations = 'Please select Normal Mode-Ops/Non-ops observations';
    }
    if (!formData.htsEmergencyModeObservations || formData.htsEmergencyModeObservations === '0') {
      newErrors.htsEmergencyModeObservations = 'Please select Emergency Mode-Ops/Non-ops observations';
    }
    if (!formData.htsDefectObservations || formData.htsDefectObservations === '0') {
      newErrors.htsDefectObservations = 'Please select Defects/Observation observations';
    }
    if (!formData.htsSatUnsatObservations || formData.htsSatUnsatObservations === '0') {
      newErrors.htsSatUnsatObservations = 'Please select SAT/UNSAT observations';
    }

    // Deck Rings/Lashing Points validation
    if (!formData.deckRingsVisualInspection || formData.deckRingsVisualInspection === '0') {
      newErrors.deckRingsVisualInspection = 'Please select Visual Inspection observations';
    }
    if (!formData.loadTestDate) {
      newErrors.loadTestDate = 'Please select Load Test Date';
    }
    if (!formData.certificates.trim()) {
      newErrors.certificates = 'Please enter Certificates';
    }

    // Preservation validation
    if (!formData.paintSchemeObservations || formData.paintSchemeObservations === '0') {
      newErrors.paintSchemeObservations = 'Please select Paint Scheme observations';
    }
    if (!formData.paintSchemeRenewedObservations || formData.paintSchemeRenewedObservations === '0') {
      newErrors.paintSchemeRenewedObservations = 'Please select Paint Scheme Renewed on observations';
    }
    if (!formData.paintSchemeConditionObservations || formData.paintSchemeConditionObservations === '0') {
      newErrors.paintSchemeConditionObservations = 'Please select Present Paint Condition observations';
    }
    if (!formData.frictionTestDate) {
      newErrors.frictionTestDate = 'Please select Friction Test Date';
    }
    if (!formData.frictionTestSatUnsat || formData.frictionTestSatUnsat === '0') {
      newErrors.frictionTestSatUnsat = 'Please select Friction Test-SAT/UNSAT observations';
    }

    // Drainage validation
    if (!formData.drainageHeloDeckVi || formData.drainageHeloDeckVi === '0') {
      newErrors.drainageHeloDeckVi = 'Please select Helo Deck observations';
    }
    if (!formData.drainageHangerVi || formData.drainageHangerVi === '0') {
      newErrors.drainageHangerVi = 'Please select Hanger observations';
    }

    // Final Observation validation
    if (!formData.foAnyOtherObservation || formData.foAnyOtherObservation === '0') {
      newErrors.foAnyOtherObservation = 'Please select Any other Observation observations';
    }
    if (!formData.foRecommendation || formData.foRecommendation === '0') {
      newErrors.foRecommendation = 'Please select Recommendations observations';
    }
    if (!formData.foRemarks.trim()) {
      newErrors.foRemarks = 'Please enter Remarks';
    }

    // Authority Signature validation
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      localStorage.removeItem('structural-soundness-draft');
      
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        ship: '',
        shipDate: null,
        frequency: '',
        inspectionBy: '',
        lastUndertakenOn: null,
        viHangerDeckHeadObservations: '',
        viBulkheadsObservations: '',
        viDeckDadoObservations: '',
        hdType: '',
        hdMake: '',
        hdNormalModeObservations: '',
        hdEmergencyModeObservations: '',
        hdDefectObservations: '',
        hdSatUnsatObservations: '',
        htsType: '',
        htsMake: '',
        htsNormalModeObservations: '',
        htsEmergencyModeObservations: '',
        htsDefectObservations: '',
        htsSatUnsatObservations: '',
        deckRingsVisualInspection: '',
        loadTestDate: null,
        certificates: '',
        heloSafetyNetsObservations: '',
        harpoonGridObservations: '',
        paintSchemeObservations: '',
        paintSchemeRenewedObservations: '',
        paintSchemeConditionObservations: '',
        frictionTestDate: null,
        frictionTestSatUnsat: '',
        drainageHeloDeckVi: '',
        drainageHangerVi: '',
        foAnyOtherObservation: '',
        foRecommendation: '',
        foRemarks: '',
        authoritySignature: null,
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
    if (!formData.ship || formData.ship === '0') {
      alert('Please select Ship before saving draft');
      return;
    }

    const draftData: DraftData = {
      id: Date.now().toString(),
      title: `Structural Soundness - ${shipOptions.find(s => s.value === formData.ship)?.label || 'Draft'}`,
      data: { ...formData },
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('structural-soundness-drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('structural-soundness-drafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('structural-soundness-drafts') || '[]');
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
    localStorage.setItem('structural-soundness-drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      ship: '',
      shipDate: null,
      frequency: '',
      inspectionBy: '',
      lastUndertakenOn: null,
      viHangerDeckHeadObservations: '',
      viBulkheadsObservations: '',
      viDeckDadoObservations: '',
      hdType: '',
      hdMake: '',
      hdNormalModeObservations: '',
      hdEmergencyModeObservations: '',
      hdDefectObservations: '',
      hdSatUnsatObservations: '',
      htsType: '',
      htsMake: '',
      htsNormalModeObservations: '',
      htsEmergencyModeObservations: '',
      htsDefectObservations: '',
      htsSatUnsatObservations: '',
      deckRingsVisualInspection: '',
      loadTestDate: null,
      certificates: '',
      heloSafetyNetsObservations: '',
      harpoonGridObservations: '',
      paintSchemeObservations: '',
      paintSchemeRenewedObservations: '',
      paintSchemeConditionObservations: '',
      frictionTestDate: null,
      frictionTestSatUnsat: '',
      drainageHeloDeckVi: '',
      drainageHangerVi: '',
      foAnyOtherObservation: '',
      foRecommendation: '',
      foRemarks: '',
      authoritySignature: null,
    });
    setErrors({});
    setSelectedDraftId('');
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

  const handleTextValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special characters are not allowed');
    }
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a JPG, JPEG, or PNG file.');
        return;
      }
      
      // Validate file size (2MB max)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        return;
      }
      
      handleInputChange('authoritySignature', file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <u>STRUCTURAL SOUNDNESS OF HELO HANGER</u>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
                  </div>
                  
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
                          {formData.shipDate ? format(formData.shipDate, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.shipDate || undefined}
                          onSelect={(date) => handleInputChange('shipDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.shipDate && <p className="text-red-500 text-sm mt-1">{errors.shipDate}</p>}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">
                      Frequency: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.frequency}
                      onChange={(e) => {
                        const value = handleTextValidation(e.target.value);
                        handleInputChange('frequency', value);
                      }}
                      maxLength={20}
                      placeholder="Enter frequency"
                    />
                    {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">
                      Inspection by: <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.inspectionBy}
                      onChange={(e) => {
                        const value = handleTextValidation(e.target.value);
                        handleInputChange('inspectionBy', value);
                      }}
                      maxLength={20}
                      placeholder="Enter inspection by"
                    />
                    {errors.inspectionBy && <p className="text-red-500 text-sm mt-1">{errors.inspectionBy}</p>}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">
                      Last Undertaken on: <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.lastUndertakenOn ? format(formData.lastUndertakenOn, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.lastUndertakenOn || undefined}
                          onSelect={(date) => handleInputChange('lastUndertakenOn', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.lastUndertakenOn && <p className="text-red-500 text-sm mt-1">{errors.lastUndertakenOn}</p>}
                  </div>
                </div>
              </div>

              {/* Visual Inspection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Visual Inspection</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    <Label className="text-lg font-semibold">Hanger Deck Head & Hanger Top</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.viHangerDeckHeadObservations}
                      onValueChange={(value) => handleInputChange('viHangerDeckHeadObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.viHangerDeckHeadObservations && <p className="text-red-500 text-sm mt-1">{errors.viHangerDeckHeadObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    <Label className="text-lg font-semibold">Bulkheads (FWD, Port & STBD)</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.viBulkheadsObservations}
                      onValueChange={(value) => handleInputChange('viBulkheadsObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.viBulkheadsObservations && <p className="text-red-500 text-sm mt-1">{errors.viBulkheadsObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    <Label className="text-lg font-semibold">Deck and Dado Areas</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.viDeckDadoObservations}
                      onValueChange={(value) => handleInputChange('viDeckDadoObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.viDeckDadoObservations && <p className="text-red-500 text-sm mt-1">{errors.viDeckDadoObservations}</p>}
                  </div>
                </div>
              </div>

              {/* Hanger Door */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Hanger Door - 01 No</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    <Label className="text-lg font-semibold">Type & Make</Label>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Type: <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.hdType}
                        onChange={(e) => {
                          const value = handleTextValidation(e.target.value);
                          handleInputChange('hdType', value);
                        }}
                        maxLength={50}
                        placeholder="Enter type"
                      />
                      {errors.hdType && <p className="text-red-500 text-sm mt-1">{errors.hdType}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Make: <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.hdMake}
                        onChange={(e) => {
                          const value = handleTextValidation(e.target.value);
                          handleInputChange('hdMake', value);
                        }}
                        maxLength={50}
                        placeholder="Enter make"
                      />
                      {errors.hdMake && <p className="text-red-500 text-sm mt-1">{errors.hdMake}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    <Label className="text-lg font-semibold">Normal Mode-Ops/Non-ops</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.hdNormalModeObservations}
                      onValueChange={(value) => handleInputChange('hdNormalModeObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.hdNormalModeObservations && <p className="text-red-500 text-sm mt-1">{errors.hdNormalModeObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                    <Label className="text-lg font-semibold">Emergency Mode-Ops/Non-ops</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.hdEmergencyModeObservations}
                      onValueChange={(value) => handleInputChange('hdEmergencyModeObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.hdEmergencyModeObservations && <p className="text-red-500 text-sm mt-1">{errors.hdEmergencyModeObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                    <Label className="text-lg font-semibold">Defects/Observation</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.hdDefectObservations}
                      onValueChange={(value) => handleInputChange('hdDefectObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.hdDefectObservations && <p className="text-red-500 text-sm mt-1">{errors.hdDefectObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                    <Label className="text-lg font-semibold">SAT/UNSAT</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.hdSatUnsatObservations}
                      onValueChange={(value) => handleInputChange('hdSatUnsatObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.hdSatUnsatObservations && <p className="text-red-500 text-sm mt-1">{errors.hdSatUnsatObservations}</p>}
                  </div>
                </div>
              </div>

              {/* Helo Traversing System */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Helo Traversing System</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                    <Label className="text-lg font-semibold">Type & Make</Label>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Type: <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.htsType}
                        onChange={(e) => {
                          const value = handleTextValidation(e.target.value);
                          handleInputChange('htsType', value);
                        }}
                        maxLength={50}
                        placeholder="Enter type"
                      />
                      {errors.htsType && <p className="text-red-500 text-sm mt-1">{errors.htsType}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Make: <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.htsMake}
                        onChange={(e) => {
                          const value = handleTextValidation(e.target.value);
                          handleInputChange('htsMake', value);
                        }}
                        maxLength={50}
                        placeholder="Enter make"
                      />
                      {errors.htsMake && <p className="text-red-500 text-sm mt-1">{errors.htsMake}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</span>
                    <Label className="text-lg font-semibold">Normal Mode-Ops/Non-ops</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.htsNormalModeObservations}
                      onValueChange={(value) => handleInputChange('htsNormalModeObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.htsNormalModeObservations && <p className="text-red-500 text-sm mt-1">{errors.htsNormalModeObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                    <Label className="text-lg font-semibold">Emergency Mode-Ops/Non-ops</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.htsEmergencyModeObservations}
                      onValueChange={(value) => handleInputChange('htsEmergencyModeObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.htsEmergencyModeObservations && <p className="text-red-500 text-sm mt-1">{errors.htsEmergencyModeObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</span>
                    <Label className="text-lg font-semibold">Defects/Observation</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.htsDefectObservations}
                      onValueChange={(value) => handleInputChange('htsDefectObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.htsDefectObservations && <p className="text-red-500 text-sm mt-1">{errors.htsDefectObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</span>
                    <Label className="text-lg font-semibold">SAT/UNSAT</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.htsSatUnsatObservations}
                      onValueChange={(value) => handleInputChange('htsSatUnsatObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.htsSatUnsatObservations && <p className="text-red-500 text-sm mt-1">{errors.htsSatUnsatObservations}</p>}
                  </div>
                </div>
              </div>

              {/* Deck Rings/Lashing Points */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Deck Rings/Lashing Points</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">14</span>
                    <Label className="text-lg font-semibold">Visual Inspection</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.deckRingsVisualInspection}
                      onValueChange={(value) => handleInputChange('deckRingsVisualInspection', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.deckRingsVisualInspection && <p className="text-red-500 text-sm mt-1">{errors.deckRingsVisualInspection}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">15</span>
                    <Label className="text-lg font-semibold">Load Test Date & Certificates</Label>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Load Test Date: <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.loadTestDate ? format(formData.loadTestDate, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.loadTestDate || undefined}
                            onSelect={(date) => handleInputChange('loadTestDate', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.loadTestDate && <p className="text-red-500 text-sm mt-1">{errors.loadTestDate}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Certificates: <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.certificates}
                        onChange={(e) => {
                          const value = handleTextValidation(e.target.value);
                          handleInputChange('certificates', value);
                        }}
                        maxLength={50}
                        placeholder="Enter certificates"
                      />
                      {errors.certificates && <p className="text-red-500 text-sm mt-1">{errors.certificates}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Helo Safety Nets */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Helo Safety Nets</h3>
                <div className="text-gray-600 italic">
                  <p>This section is for reference only - no specific observations required in the original form.</p>
                </div>
              </div>

              {/* Harpoon Grid */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Harpoon Grid</h3>
                <div className="text-gray-600 italic">
                  <p>This section is for reference only - no specific observations required in the original form.</p>
                </div>
              </div>

              {/* Preservation of Helo/Hanger Deck */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Preservation of Helo/Hanger Deck</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">16</span>
                    <Label className="text-lg font-semibold">Paint Scheme</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.paintSchemeObservations}
                      onValueChange={(value) => handleInputChange('paintSchemeObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.paintSchemeObservations && <p className="text-red-500 text-sm mt-1">{errors.paintSchemeObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">17</span>
                    <Label className="text-lg font-semibold">Paint Scheme Renewed on</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.paintSchemeRenewedObservations}
                      onValueChange={(value) => handleInputChange('paintSchemeRenewedObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.paintSchemeRenewedObservations && <p className="text-red-500 text-sm mt-1">{errors.paintSchemeRenewedObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">18</span>
                    <Label className="text-lg font-semibold">Present Paint Condition</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.paintSchemeConditionObservations}
                      onValueChange={(value) => handleInputChange('paintSchemeConditionObservations', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.paintSchemeConditionObservations && <p className="text-red-500 text-sm mt-1">{errors.paintSchemeConditionObservations}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">19</span>
                    <Label className="text-lg font-semibold">Friction Test Date</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Friction Test Date: <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.frictionTestDate ? format(formData.frictionTestDate, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.frictionTestDate || undefined}
                          onSelect={(date) => handleInputChange('frictionTestDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.frictionTestDate && <p className="text-red-500 text-sm mt-1">{errors.frictionTestDate}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">20</span>
                    <Label className="text-lg font-semibold">Friction Test-SAT/UNSAT</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.frictionTestSatUnsat}
                      onValueChange={(value) => handleInputChange('frictionTestSatUnsat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.frictionTestSatUnsat && <p className="text-red-500 text-sm mt-1">{errors.frictionTestSatUnsat}</p>}
                  </div>
                </div>
              </div>

              {/* Drainage */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Drainage</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(a)</span>
                    <Label className="text-lg font-semibold">Helo Deck</Label>
                  </div>
                  <div className="flex items-center space-x-3 ml-11">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">21</span>
                    <Label className="text-lg font-semibold">Visual Inspection</Label>
                  </div>
                  <div className="ml-22">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.drainageHeloDeckVi}
                      onValueChange={(value) => handleInputChange('drainageHeloDeckVi', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.drainageHeloDeckVi && <p className="text-red-500 text-sm mt-1">{errors.drainageHeloDeckVi}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">(b)</span>
                    <Label className="text-lg font-semibold">Hanger</Label>
                  </div>
                  <div className="flex items-center space-x-3 ml-11">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">22</span>
                    <Label className="text-lg font-semibold">Visual Inspection</Label>
                  </div>
                  <div className="ml-22">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.drainageHangerVi}
                      onValueChange={(value) => handleInputChange('drainageHangerVi', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.drainageHangerVi && <p className="text-red-500 text-sm mt-1">{errors.drainageHangerVi}</p>}
                  </div>
                </div>
              </div>

              {/* Final Observation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Final Observation</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">23</span>
                    <Label className="text-lg font-semibold">Any other Observation</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.foAnyOtherObservation}
                      onValueChange={(value) => handleInputChange('foAnyOtherObservation', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.foAnyOtherObservation && <p className="text-red-500 text-sm mt-1">{errors.foAnyOtherObservation}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">24</span>
                    <Label className="text-lg font-semibold">Recommendations</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.foRecommendation}
                      onValueChange={(value) => handleInputChange('foRecommendation', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {observationsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.foRecommendation && <p className="text-red-500 text-sm mt-1">{errors.foRecommendation}</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">25</span>
                    <Label className="text-lg font-semibold">Remarks</Label>
                  </div>
                  <div className="ml-11">
                    <Label className="text-sm font-medium">
                      Remarks: <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={formData.foRemarks}
                      onChange={(e) => {
                        const value = handleRemarksValidation(e.target.value);
                        handleInputChange('foRemarks', value);
                      }}
                      rows={2}
                      placeholder="Enter remarks"
                      className="resize-none"
                    />
                    {errors.foRemarks && <p className="text-red-500 text-sm mt-1">{errors.foRemarks}</p>}
                  </div>
                </div>
              </div>

              {/* Authority Signature */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">26</span>
                  <Label className="text-lg font-semibold">
                    Authority Signature <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="ml-11">
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="max-w-xs"
                    />
                    {formData.authoritySignature && (
                      <span className="text-sm text-green-600">
                        {formData.authoritySignature.name}
                      </span>
                    )}
                  </div>
                  {errors.authoritySignature && <p className="text-red-500 text-sm mt-1">{errors.authoritySignature}</p>}
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
                    <TableHead>Ship</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{shipOptions.find(s => s.value === draft.data.ship)?.label || 'No Inspection Data'}</TableCell>
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

export default StructuralSoundnessOfHeloHangerForm;
