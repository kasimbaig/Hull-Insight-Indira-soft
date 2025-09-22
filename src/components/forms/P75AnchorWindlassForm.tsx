import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface P75AnchorWindlassFormData {
  make: string;
  type: string;
  yearManufacture: string;
  observationsHydraulic: string;
  remarksHydraulic: string;
  observationsFoundation: string;
  remarksFoundation: string;
  observationsGreasing: string;
  remarksGreasing: string;
  observationsGreasingPoint: string;
  remarksGreasingPoint: string;
  observationsAnchorKeel: string;
  remarksAnchorKeel: string;
  observationsIndication: string;
  remarksIndication: string;
  observationsChainLength: string;
  remarksChainLength: string;
  observationsOperationalTrials: string;
  remarksOperationalTrials: string;
  observationsReleaseOpen: string;
  remarksReleaseOpen: string;
  observationsClosed: string;
  remarksClosed: string;
  observationsEngage: string;
  remarksEngage: string;
  observationsDisengage: string;
  remarksDisengage: string;
  observationsEngageWarping: string;
  remarksEngageWarping: string;
  observationsDisengageWarping: string;
  remarksDisengageWarping: string;
  observationsDriveSounds: string;
  remarksDriveSounds: string;
  remarksAnyOtherObserv: string;
  observationsOverall: string;
}

const P75AnchorWindlassForm: React.FC = () => {
  const [formData, setFormData] = useState<P75AnchorWindlassFormData>({
    make: '', type: '', yearManufacture: '',
    observationsHydraulic: '', remarksHydraulic: '',
    observationsFoundation: '', remarksFoundation: '',
    observationsGreasing: '', remarksGreasing: '',
    observationsGreasingPoint: '', remarksGreasingPoint: '',
    observationsAnchorKeel: '', remarksAnchorKeel: '',
    observationsIndication: '', remarksIndication: '',
    observationsChainLength: '', remarksChainLength: '',
    observationsOperationalTrials: '', remarksOperationalTrials: '',
    observationsReleaseOpen: '', remarksReleaseOpen: '',
    observationsClosed: '', remarksClosed: '',
    observationsEngage: '', remarksEngage: '',
    observationsDisengage: '', remarksDisengage: '',
    observationsEngageWarping: '', remarksEngageWarping: '',
    observationsDisengageWarping: '', remarksDisengageWarping: '',
    observationsDriveSounds: '', remarksDriveSounds: '',
    remarksAnyOtherObserv: '', observationsOverall: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const observationOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  const greasingPointOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'PAINTED', label: 'PAINTED' },
    { value: 'CHOKED', label: 'CHOKED' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.yearManufacture.trim()) newErrors.yearManufacture = 'Year of Manufacture is required';
    
    // Validate all observation fields
    const observationFields = [
      'observationsHydraulic', 'observationsFoundation', 'observationsGreasing',
      'observationsGreasingPoint', 'observationsAnchorKeel', 'observationsIndication',
      'observationsChainLength', 'observationsOperationalTrials', 'observationsReleaseOpen',
      'observationsClosed', 'observationsEngage', 'observationsDisengage',
      'observationsEngageWarping', 'observationsDisengageWarping', 'observationsDriveSounds',
      'observationsOverall'
    ];
    
    observationFields.forEach(field => {
      if (!formData[field as keyof P75AnchorWindlassFormData] || formData[field as keyof P75AnchorWindlassFormData] === '0') {
        newErrors[field] = `${field.replace('observations', '').replace(/([A-Z])/g, ' $1').trim()} observations is required`;
      }
    });

    // Validate all remarks fields
    const remarksFields = [
      'remarksHydraulic', 'remarksFoundation', 'remarksGreasing',
      'remarksGreasingPoint', 'remarksAnchorKeel', 'remarksIndication',
      'remarksChainLength', 'remarksOperationalTrials', 'remarksReleaseOpen',
      'remarksClosed', 'remarksEngage', 'remarksDisengage',
      'remarksEngageWarping', 'remarksDisengageWarping', 'remarksDriveSounds',
      'remarksAnyOtherObserv'
    ];
    
    remarksFields.forEach(field => {
      if (!formData[field as keyof P75AnchorWindlassFormData].trim()) {
        newErrors[field] = `${field.replace('remarks', '').replace(/([A-Z])/g, ' $1').trim()} remarks is required`;
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        make: '', type: '', yearManufacture: '',
        observationsHydraulic: '', remarksHydraulic: '',
        observationsFoundation: '', remarksFoundation: '',
        observationsGreasing: '', remarksGreasing: '',
        observationsGreasingPoint: '', remarksGreasingPoint: '',
        observationsAnchorKeel: '', remarksAnchorKeel: '',
        observationsIndication: '', remarksIndication: '',
        observationsChainLength: '', remarksChainLength: '',
        observationsOperationalTrials: '', remarksOperationalTrials: '',
        observationsReleaseOpen: '', remarksReleaseOpen: '',
        observationsClosed: '', remarksClosed: '',
        observationsEngage: '', remarksEngage: '',
        observationsDisengage: '', remarksDisengage: '',
        observationsEngageWarping: '', remarksEngageWarping: '',
        observationsDisengageWarping: '', remarksDisengageWarping: '',
        observationsDriveSounds: '', remarksDriveSounds: '',
        remarksAnyOtherObserv: '', observationsOverall: ''
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
      title: `P-75 Anchor Windlass - ${formData.make || 'Draft'}`,
      data: formData,
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('p75AnchorWindlassDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('p75AnchorWindlassDrafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('p75AnchorWindlassDrafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: any) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('p75AnchorWindlassDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      make: '', type: '', yearManufacture: '',
      observationsHydraulic: '', remarksHydraulic: '',
      observationsFoundation: '', remarksFoundation: '',
      observationsGreasing: '', remarksGreasing: '',
      observationsGreasingPoint: '', remarksGreasingPoint: '',
      observationsAnchorKeel: '', remarksAnchorKeel: '',
      observationsIndication: '', remarksIndication: '',
      observationsChainLength: '', remarksChainLength: '',
      observationsOperationalTrials: '', remarksOperationalTrials: '',
      observationsReleaseOpen: '', remarksReleaseOpen: '',
      observationsClosed: '', remarksClosed: '',
      observationsEngage: '', remarksEngage: '',
      observationsDisengage: '', remarksDisengage: '',
      observationsEngageWarping: '', remarksEngageWarping: '',
      observationsDisengageWarping: '', remarksDisengageWarping: '',
      observationsDriveSounds: '', remarksDriveSounds: '',
      remarksAnyOtherObserv: '', observationsOverall: ''
    });
    setErrors({});
  };

  const handleYearChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue) {
      const year = parseInt(numericValue);
      const currentYear = new Date().getFullYear();
      const minYear = 1900;
      
      if (year > currentYear) {
        alert('Please enter a year in the past.');
        return;
      }
      
      if (year < minYear) {
        alert(`Please enter a year greater than or equal to ${minYear}.`);
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, yearManufacture: numericValue }));
  };

  const handleSpecialCharValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special Characters Are Not Allowed');
      return value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
    return value;
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

  const renderObservationSection = (
    sectionNumber: number,
    title: string,
    subtitle: string,
    observationField: keyof P75AnchorWindlassFormData,
    remarksField: keyof P75AnchorWindlassFormData,
    options = observationOptions
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
        <div className="text-sm font-medium mb-2">{subtitle}<span className="text-red-500">*</span></div>
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
                {options.map(option => (
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

  const renderDualSection = (
    sectionNumber: number,
    title: string,
    subtitleA: string,
    subtitleB: string,
    observationFieldA: keyof P75AnchorWindlassFormData,
    remarksFieldA: keyof P75AnchorWindlassFormData,
    observationFieldB: keyof P75AnchorWindlassFormData,
    remarksFieldB: keyof P75AnchorWindlassFormData
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
        <div>
          <div className="text-sm font-medium mb-2">{subtitleA}<span className="text-red-500">*</span></div>
          <div className="flex items-start space-x-4">
            <div className="w-48">
              <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
              <Select 
                value={formData[observationFieldA]} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, [observationFieldA]: value }))}
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
              {errors[observationFieldA] && <p className="text-red-500 text-xs mt-1">{errors[observationFieldA]}</p>}
            </div>
            <div className="flex-1">
              <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
              <Textarea
                value={formData[remarksFieldA]}
                onChange={(e) => {
                  const value = handleRemarksValidation(e.target.value);
                  setFormData(prev => ({ ...prev, [remarksFieldA]: value }));
                }}
                rows={2}
                className="mt-1"
                placeholder="Enter remarks"
              />
              {errors[remarksFieldA] && <p className="text-red-500 text-xs mt-1">{errors[remarksFieldA]}</p>}
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">{subtitleB}<span className="text-red-500">*</span></div>
          <div className="flex items-start space-x-4">
            <div className="w-48">
              <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
              <Select 
                value={formData[observationFieldB]} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, [observationFieldB]: value }))}
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
              {errors[observationFieldB] && <p className="text-red-500 text-xs mt-1">{errors[observationFieldB]}</p>}
            </div>
            <div className="flex-1">
              <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
              <Textarea
                value={formData[remarksFieldB]}
                onChange={(e) => {
                  const value = handleRemarksValidation(e.target.value);
                  setFormData(prev => ({ ...prev, [remarksFieldB]: value }));
                }}
                rows={2}
                className="mt-1"
                placeholder="Enter remarks"
              />
              {errors[remarksFieldB] && <p className="text-red-500 text-xs mt-1">{errors[remarksFieldB]}</p>}
            </div>
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
              <h4 className="text-xl font-bold text-blue-600 mb-2">P-75 CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ANCHOR WINDLASS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-6">
              {/* Section 1 - Make */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <Label htmlFor="make" className="text-lg font-medium">
                    Make<span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="make"
                      value={formData.make}
                      onChange={(e) => {
                        const value = handleSpecialCharValidation(e.target.value);
                        setFormData(prev => ({ ...prev, make: value }));
                      }}
                      maxLength={20}
                      placeholder="Enter make"
                      className="w-64"
                      required
                    />
                    {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2 - Type */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <Label htmlFor="type" className="text-lg font-medium">
                    Type<span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => {
                        const value = handleSpecialCharValidation(e.target.value);
                        setFormData(prev => ({ ...prev, type: value }));
                      }}
                      maxLength={20}
                      placeholder="Enter type"
                      className="w-64"
                      required
                    />
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                  </div>
                </div>
              </div>

              {/* Section 3 - Year of Manufacture */}
              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <Label htmlFor="yearManufacture" className="text-lg font-medium">
                    Year of Manufacture<span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="yearManufacture"
                      value={formData.yearManufacture}
                      onChange={(e) => handleYearChange(e.target.value)}
                      maxLength={4}
                      placeholder="Enter year"
                      className="w-64"
                      required
                    />
                    {errors.yearManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearManufacture}</p>}
                  </div>
                </div>
              </div>

            {/* Sections 4-17: Various inspection sections */}
            {renderObservationSection(4, "Control Panel (Torpedo Room)", "a) Hydraulic Actuators", "observationsHydraulic", "remarksHydraulic")}
            {renderObservationSection(5, "Conditions of Windlass Foundations", "a) Corrosion/ Pitting/ Unpainted", "observationsFoundation", "remarksFoundation")}
            {renderObservationSection(6, "Greasing of Mechanical Parts", "a) Proper Greasing of Mechanical Parts", "observationsGreasing", "remarksGreasing")}
            {renderObservationSection(7, "Greasing Points", "a) Condition of Greasing Nipple-Clean/ Painted/ Choked", "observationsGreasingPoint", "remarksGreasingPoint", greasingPointOptions)}
            {renderObservationSection(8, "Flushness of the Anchor with the Submarine Keel", "a) Check Anchor Indication Plate on Casing", "observationsAnchorKeel", "remarksAnchorKeel")}
            {renderObservationSection(9, "Availability of Indication", "a) Stowage Positions Chain Counter (0,0) (Torpedo room)", "observationsIndication", "remarksIndication")}
            {renderObservationSection(10, "Chain Length", "a) 06 Shackles (Length - 30 Mtr each Shackle)", "observationsChainLength", "remarksChainLength")}
            {renderObservationSection(11, "Operational Trials", "a) Speed 1-10 (Unidirectional)", "observationsOperationalTrials", "remarksOperationalTrials")}
            
            {renderDualSection(12, "Screw Stopper Operations (Torpedo Room)", "a) Release (open)", "b) Closed", "observationsReleaseOpen", "remarksReleaseOpen", "observationsClosed", "remarksClosed")}
            {renderDualSection(13, "Clutch Operation (Torpedo Room)", "a) Engage", "b) Disengage", "observationsEngage", "remarksEngage", "observationsDisengage", "remarksDisengage")}
            {renderDualSection(14, "Warping Drum Engagement During Anchoring Operation", "a) Engage", "b) Disengage", "observationsEngageWarping", "remarksEngageWarping", "observationsDisengageWarping", "remarksDisengageWarping")}
            
            {renderObservationSection(15, "Drive", "a) Check for Abnormal Sounds/Excessive Noise During Operation", "observationsDriveSounds", "remarksDriveSounds")}

              {/* Section 16: Any Other Observation */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    16
                  </div>
                  <div className="flex-1">
                    <Label className="text-lg font-medium">Any Other Observation</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksAnyOtherObserv}
                        onChange={(e) => {
                          const value = handleRemarksValidation(e.target.value);
                          setFormData(prev => ({ ...prev, remarksAnyOtherObserv: value }));
                        }}
                        rows={2}
                        className="mt-1"
                        placeholder="Enter remarks"
                      />
                      {errors.remarksAnyOtherObserv && <p className="text-red-500 text-xs mt-1">{errors.remarksAnyOtherObserv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 17: Overall Remarks */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    17
                  </div>
                  <div className="flex-1">
                    <Label className="text-lg font-medium">Overall Remarks</Label>
                  </div>
                </div>
                
                <div className="ml-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.observationsOverall} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, observationsOverall: value }))}
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
                      {errors.observationsOverall && <p className="text-red-500 text-xs mt-1">{errors.observationsOverall}</p>}
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
                                  <TableCell>{draft.data.make || 'No Inspection Data'}</TableCell>
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

export default P75AnchorWindlassForm;

