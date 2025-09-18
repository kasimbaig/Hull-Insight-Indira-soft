import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface P75FWDMooringCapstanFormData {
  make: string;
  type: string;
  yearManufacture: string;
  observationsHydraulicActuators: string;
  remarksHydraulicActuators: string;
  observationsMechanicalGreasing: string;
  remarksMechanicalGreasing: string;
  observationsGreasingCondition: string;
  remarksGreasingCondition: string;
  observationsCapstanFoundation: string;
  remarksCapstanFoundation: string;
  observationsCapstanInsulation: string;
  remarksCapstanInsulation: string;
  observationsCapstanOutside: string;
  remarksCapstanOutside: string;
  observationsOperationalTrails: string;
  remarksOperationalTrails: string;
  observationsDriveNoise: string;
  remarksDriveNoise: string;
  remarksOtherObservations: string;
  observationsOverall: string;
}

const P75FWDMooringCapstanForm: React.FC = () => {
  const [formData, setFormData] = useState<P75FWDMooringCapstanFormData>({
    make: '',
    type: '',
    yearManufacture: '',
    observationsHydraulicActuators: '',
    remarksHydraulicActuators: '',
    observationsMechanicalGreasing: '',
    remarksMechanicalGreasing: '',
    observationsGreasingCondition: '',
    remarksGreasingCondition: '',
    observationsCapstanFoundation: '',
    remarksCapstanFoundation: '',
    observationsCapstanInsulation: '',
    remarksCapstanInsulation: '',
    observationsCapstanOutside: '',
    remarksCapstanOutside: '',
    observationsOperationalTrails: '',
    remarksOperationalTrails: '',
    observationsDriveNoise: '',
    remarksDriveNoise: '',
    remarksOtherObservations: '',
    observationsOverall: ''
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

  const greasingConditionOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'PAINTED', label: 'PAINTED' },
    { value: 'CHOKED', label: 'CHOKED' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic fields validation
    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!formData.yearManufacture.trim()) {
      newErrors.yearManufacture = 'Year of Manufacture is required';
    }
    
    // Hydraulic Actuators validation
    if (!formData.observationsHydraulicActuators || formData.observationsHydraulicActuators === '0') {
      newErrors.observationsHydraulicActuators = 'Control Panel (Torpedo Room) Hydraulic Actuators observations is required';
    }
    if (!formData.remarksHydraulicActuators.trim()) {
      newErrors.remarksHydraulicActuators = 'Control Panel (Torpedo Room) Hydraulic Actuators remarks is required';
    }
    
    // Mechanical Greasing validation
    if (!formData.observationsMechanicalGreasing || formData.observationsMechanicalGreasing === '0') {
      newErrors.observationsMechanicalGreasing = 'Greasing of Mechanical Parts observations is required';
    }
    if (!formData.remarksMechanicalGreasing.trim()) {
      newErrors.remarksMechanicalGreasing = 'Greasing of Mechanical Parts remarks is required';
    }
    
    // Greasing Condition validation
    if (!formData.observationsGreasingCondition || formData.observationsGreasingCondition === '0') {
      newErrors.observationsGreasingCondition = 'Greasing Points observations is required';
    }
    if (!formData.remarksGreasingCondition.trim()) {
      newErrors.remarksGreasingCondition = 'Greasing Points remarks is required';
    }
    
    // Capstan Foundation validation
    if (!formData.observationsCapstanFoundation || formData.observationsCapstanFoundation === '0') {
      newErrors.observationsCapstanFoundation = 'Conditions of Capstan Drum Foundations observations is required';
    }
    if (!formData.remarksCapstanFoundation.trim()) {
      newErrors.remarksCapstanFoundation = 'Conditions of Capstan Drum Foundations remarks is required';
    }
    
    // Capstan Insulation validation
    if (!formData.observationsCapstanInsulation || formData.observationsCapstanInsulation === '0') {
      newErrors.observationsCapstanInsulation = 'Securing of the Capstan Drum Inside Casing (Sailing) observations is required';
    }
    if (!formData.remarksCapstanInsulation.trim()) {
      newErrors.remarksCapstanInsulation = 'Securing of the Capstan Drum Inside Casing (Sailing) remarks is required';
    }
    
    // Capstan Outside validation
    if (!formData.observationsCapstanOutside || formData.observationsCapstanOutside === '0') {
      newErrors.observationsCapstanOutside = 'Securing of the Capstan Drum Outside Casing (Harbour Operation) observations is required';
    }
    if (!formData.remarksCapstanOutside.trim()) {
      newErrors.remarksCapstanOutside = 'Securing of the Capstan Drum Outside Casing (Harbour Operation) remarks is required';
    }
    
    // Operational Trails validation
    if (!formData.observationsOperationalTrails || formData.observationsOperationalTrails === '0') {
      newErrors.observationsOperationalTrails = 'Operational Trails observations is required';
    }
    if (!formData.remarksOperationalTrails.trim()) {
      newErrors.remarksOperationalTrails = 'Operational Trails remarks is required';
    }
    
    // Drive Noise validation
    if (!formData.observationsDriveNoise || formData.observationsDriveNoise === '0') {
      newErrors.observationsDriveNoise = 'Drive observations is required';
    }
    if (!formData.remarksDriveNoise.trim()) {
      newErrors.remarksDriveNoise = 'Drive remarks is required';
    }
    
    // Other Observations validation
    if (!formData.remarksOtherObservations.trim()) {
      newErrors.remarksOtherObservations = 'Any Other Observation remarks is required';
    }
    
    // Overall Remarks validation
    if (!formData.observationsOverall || formData.observationsOverall === '0') {
      newErrors.observationsOverall = 'Overall Remarks observations is required';
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
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        make: '',
        type: '',
        yearManufacture: '',
        observationsHydraulicActuators: '',
        remarksHydraulicActuators: '',
        observationsMechanicalGreasing: '',
        remarksMechanicalGreasing: '',
        observationsGreasingCondition: '',
        remarksGreasingCondition: '',
        observationsCapstanFoundation: '',
        remarksCapstanFoundation: '',
        observationsCapstanInsulation: '',
        remarksCapstanInsulation: '',
        observationsCapstanOutside: '',
        remarksCapstanOutside: '',
        observationsOperationalTrails: '',
        remarksOperationalTrails: '',
        observationsDriveNoise: '',
        remarksDriveNoise: '',
        remarksOtherObservations: '',
        observationsOverall: ''
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
      title: `P-75 FWD Mooring Capstan - ${formData.make || 'Draft'}`,
      data: formData,
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('p75FWDMooringCapstanDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('p75FWDMooringCapstanDrafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('p75FWDMooringCapstanDrafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: any) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('p75FWDMooringCapstanDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      make: '',
      type: '',
      yearManufacture: '',
      observationsHydraulicActuators: '',
      remarksHydraulicActuators: '',
      observationsMechanicalGreasing: '',
      remarksMechanicalGreasing: '',
      observationsGreasingCondition: '',
      remarksGreasingCondition: '',
      observationsCapstanFoundation: '',
      remarksCapstanFoundation: '',
      observationsCapstanInsulation: '',
      remarksCapstanInsulation: '',
      observationsCapstanOutside: '',
      remarksCapstanOutside: '',
      observationsOperationalTrails: '',
      remarksOperationalTrails: '',
      observationsDriveNoise: '',
      remarksDriveNoise: '',
      remarksOtherObservations: '',
      observationsOverall: ''
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

  const handleMakeTypeValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert('Special Characters Are Not Allowed');
    }
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const handleYearValidation = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    
    if (numericValue) {
      const enteredYear = parseInt(numericValue);
      
      if (enteredYear > currentYear) {
        alert("Please enter a year in the past.");
        return '';
      } else if (enteredYear < minYear) {
        alert("Please enter a year greater than or equal to " + minYear + ".");
        return '';
      }
    }
    
    return numericValue;
  };

  const renderObservationSection = (
    sectionNumber: number,
    title: string,
    observationField: keyof P75FWDMooringCapstanFormData,
    remarksField: keyof P75FWDMooringCapstanFormData,
    subtitle?: string,
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

  const renderCapstanSecuringSection = () => (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
          8
        </div>
        <div className="flex-1">
          <Label className="text-lg font-medium">Securing of the Capstan Drum</Label>
        </div>
      </div>
      
      <div className="ml-12 space-y-4">
        <div>
          <div className="text-sm font-medium mb-2">a) Inside Casing (Sailing)<span className="text-red-500">*</span></div>
          <div className="flex items-start space-x-4">
            <div className="w-48">
              <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
              <Select 
                value={formData.observationsCapstanInsulation} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, observationsCapstanInsulation: value }))}
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
              {errors.observationsCapstanInsulation && <p className="text-red-500 text-xs mt-1">{errors.observationsCapstanInsulation}</p>}
            </div>
            <div className="flex-1">
              <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
              <Textarea
                value={formData.remarksCapstanInsulation}
                onChange={(e) => {
                  const value = handleRemarksValidation(e.target.value);
                  setFormData(prev => ({ ...prev, remarksCapstanInsulation: value }));
                }}
                rows={2}
                className="mt-1"
                placeholder="Enter remarks"
              />
              {errors.remarksCapstanInsulation && <p className="text-red-500 text-xs mt-1">{errors.remarksCapstanInsulation}</p>}
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">b) Outside Casing (Harbour Operation)<span className="text-red-500">*</span></div>
          <div className="flex items-start space-x-4">
            <div className="w-48">
              <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
              <Select 
                value={formData.observationsCapstanOutside} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, observationsCapstanOutside: value }))}
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
              {errors.observationsCapstanOutside && <p className="text-red-500 text-xs mt-1">{errors.observationsCapstanOutside}</p>}
            </div>
            <div className="flex-1">
              <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
              <Textarea
                value={formData.remarksCapstanOutside}
                onChange={(e) => {
                  const value = handleRemarksValidation(e.target.value);
                  setFormData(prev => ({ ...prev, remarksCapstanOutside: value }));
                }}
                rows={2}
                className="mt-1"
                placeholder="Enter remarks"
              />
              {errors.remarksCapstanOutside && <p className="text-red-500 text-xs mt-1">{errors.remarksCapstanOutside}</p>}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">FWD MOORING CAPSTAN</h2>
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
                        const value = handleMakeTypeValidation(e.target.value);
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
                        const value = handleMakeTypeValidation(e.target.value);
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
                      onChange={(e) => {
                        const value = handleYearValidation(e.target.value);
                        setFormData(prev => ({ ...prev, yearManufacture: value }));
                      }}
                      maxLength={4}
                      placeholder="Enter year"
                      className="w-64"
                      required
                    />
                    {errors.yearManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearManufacture}</p>}
                  </div>
                </div>
              </div>

            {/* Control Panel Section */}
            {renderObservationSection(
              4,
              "Control Panel (Torpedo Room)",
              "observationsHydraulicActuators",
              "remarksHydraulicActuators",
              "a) Hydraulic Actuators"
            )}

            {/* Greasing of Mechanical Parts */}
            {renderObservationSection(
              5,
              "Greasing of Mechanical Parts",
              "observationsMechanicalGreasing",
              "remarksMechanicalGreasing",
              "a) Proper Greasing of Mechanical Parts"
            )}

            {/* Greasing Points */}
            {renderObservationSection(
              6,
              "Greasing Points",
              "observationsGreasingCondition",
              "remarksGreasingCondition",
              "a) Condition of Greasing Nipple-Clean/ Painted/ Choked",
              greasingConditionOptions
            )}

            {/* Conditions of Capstan Drum Foundations */}
            {renderObservationSection(
              7,
              "Conditions of Capstan Drum Foundations",
              "observationsCapstanFoundation",
              "remarksCapstanFoundation",
              "a) Corrosion/ Pitting/ Unpainted"
            )}

            {/* Securing of the Capstan Drum */}
            {renderCapstanSecuringSection()}

            {/* Operational Trails */}
            {renderObservationSection(
              9,
              "Operational Trails",
              "observationsOperationalTrails",
              "remarksOperationalTrails",
              "a) Speed 1-10 (Unidirectional)"
            )}

            {/* Drive */}
            {renderObservationSection(
              10,
              "Drive",
              "observationsDriveNoise",
              "remarksDriveNoise",
              "a) Check for Abnormal Sounds/ Excessive Noise During Operation"
            )}

              {/* Any Other Observation */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    11
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
                        value={formData.remarksOtherObservations}
                        onChange={(e) => {
                          const value = handleRemarksValidation(e.target.value);
                          setFormData(prev => ({ ...prev, remarksOtherObservations: value }));
                        }}
                        rows={2}
                        className="mt-1"
                        placeholder="Enter remarks"
                      />
                      {errors.remarksOtherObservations && <p className="text-red-500 text-xs mt-1">{errors.remarksOtherObservations}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Remarks */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    12
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

export default P75FWDMooringCapstanForm;
