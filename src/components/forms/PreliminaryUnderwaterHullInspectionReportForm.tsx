
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PreliminaryUnderwaterHullInspectionReportFormData {
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

const PreliminaryUnderwaterHullInspectionReportForm: React.FC = () => {
  const [formData, setFormData] = useState<PreliminaryUnderwaterHullInspectionReportFormData>({
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
    <div className="section-box">
      <div className="section-header">
        <span className="label-number">{sectionNumber}</span>
        <div className="section-header-inner">
          <Label>{title}</Label>
        </div>
      </div>
      {subtitle && (
        <div className="section-header-inner">
          <Label>{subtitle} <strong className="text-red-500">*</strong></Label>
        </div>
      )}
      <div className="section-content">
        <div className="row">
          <div className="col-md-4">
            <Label className="observation-label">Observations:<strong className="text-red-500">*</strong></Label>
            <Select 
              value={formData[observationField]} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, [observationField]: value }))}
            >
              <SelectTrigger>
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
            {errors[observationField] && <p className="text-red-500 text-xs">{errors[observationField]}</p>}
          </div>
          <div className="col-md-8">
            <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
            <Textarea
              value={formData[remarksField]}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, [remarksField]: value }));
              }}
              rows={2}
              placeholder="Enter remarks"
            />
            {errors[remarksField] && <p className="text-red-500 text-xs">{errors[remarksField]}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCapstanSecuringSection = () => (
    <div className="section-box">
      <div className="section-header">
        <span className="label-number">8</span>
        <div className="section-header-inner">
          <Label>Securing of the Capstan Drum</Label>
        </div>
      </div>
      
      <div className="section-header-inner">
        <Label>a) Inside Casing (Sailing)</Label>
      </div>
      <div className="section-content">
        <div className="row">
          <div className="col-md-4">
            <Label className="observation-label">Observations:<strong className="text-red-500">*</strong></Label>
            <Select 
              value={formData.observationsCapstanInsulation} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, observationsCapstanInsulation: value }))}
            >
              <SelectTrigger>
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
            {errors.observationsCapstanInsulation && <p className="text-red-500 text-xs">{errors.observationsCapstanInsulation}</p>}
          </div>
          <div className="col-md-8">
            <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
            <Textarea
              value={formData.remarksCapstanInsulation}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, remarksCapstanInsulation: value }));
              }}
              rows={2}
              placeholder="Enter remarks"
            />
            {errors.remarksCapstanInsulation && <p className="text-red-500 text-xs">{errors.remarksCapstanInsulation}</p>}
          </div>
        </div>
      </div>
      
      <br />
      
      <div className="section-header-inner">
        <Label>b) Outside Casing (Harbour Operation)</Label>
      </div>
      <div className="section-content">
        <div className="row">
          <div className="col-md-4">
            <Label className="observation-label">Observations:<strong className="text-red-500">*</strong></Label>
            <Select 
              value={formData.observationsCapstanOutside} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, observationsCapstanOutside: value }))}
            >
              <SelectTrigger>
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
            {errors.observationsCapstanOutside && <p className="text-red-500 text-xs">{errors.observationsCapstanOutside}</p>}
          </div>
          <div className="col-md-8">
            <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
            <Textarea
              value={formData.remarksCapstanOutside}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, remarksCapstanOutside: value }));
              }}
              rows={2}
              placeholder="Enter remarks"
            />
            {errors.remarksCapstanOutside && <p className="text-red-500 text-xs">{errors.remarksCapstanOutside}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <div className="text-orange-500 text-lg font-bold">P-75 CLASS</div>
            <div className="text-2xl font-bold">
              <u>FWD MOORING CAPSTAN</u>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">1</span>
                <Label>Make<strong className="text-red-500">*</strong></Label>
                <Input
                  value={formData.make}
                  onChange={(e) => {
                    const value = handleMakeTypeValidation(e.target.value);
                    setFormData(prev => ({ ...prev, make: value }));
                  }}
                  maxLength={20}
                  placeholder="Enter make"
                />
                {errors.make && <p className="text-red-500 text-xs">{errors.make}</p>}
              </div>
            </div>

            <div className="section-box">
              <div className="section-header">
                <span className="label-number">2</span>
                <Label>Type<strong className="text-red-500">*</strong></Label>
                <Input
                  value={formData.type}
                  onChange={(e) => {
                    const value = handleMakeTypeValidation(e.target.value);
                    setFormData(prev => ({ ...prev, type: value }));
                  }}
                  maxLength={20}
                  placeholder="Enter type"
                />
                {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
              </div>
            </div>

            <div className="section-box">
              <div className="section-header">
                <span className="label-number">3</span>
                <Label>Year of Manufacture<strong className="text-red-500">*</strong></Label>
                <Input
                  value={formData.yearManufacture}
                  onChange={(e) => {
                    const value = handleYearValidation(e.target.value);
                    setFormData(prev => ({ ...prev, yearManufacture: value }));
                  }}
                  maxLength={4}
                  placeholder="Enter year"
                />
                {errors.yearManufacture && <p className="text-red-500 text-xs">{errors.yearManufacture}</p>}
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
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">11</span>
                <div className="section-header-inner">
                  <Label>Any Other Observation</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-12">
                    <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
                    <Textarea
                      value={formData.remarksOtherObservations}
                      onChange={(e) => {
                        const value = handleRemarksValidation(e.target.value);
                        setFormData(prev => ({ ...prev, remarksOtherObservations: value }));
                      }}
                      rows={2}
                      placeholder="Enter remarks"
                    />
                    {errors.remarksOtherObservations && <p className="text-red-500 text-xs">{errors.remarksOtherObservations}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Remarks */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">12</span>
                <div className="section-header-inner">
                  <Label>Overall Remarks</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-4">
                    <Label className="observation-label">Observations:<strong className="text-red-500">*</strong></Label>
                    <Select 
                      value={formData.observationsOverall} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, observationsOverall: value }))}
                    >
                      <SelectTrigger>
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
                    {errors.observationsOverall && <p className="text-red-500 text-xs">{errors.observationsOverall}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button type="button" onClick={loadDrafts} variant="outline">
                Fetch Drafts
              </Button>
              <Button type="button" onClick={saveDraft} variant="outline">
                Save Draft
              </Button>
              <Button type="button" onClick={clearForm} variant="destructive">
                Clear
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Save'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Draft Modal */}
      <Dialog open={showDraftModal} onOpenChange={setShowDraftModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500">No drafts found</p>
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
                      <TableCell>{draft.data.make || 'No Inspection Data'}</TableCell>
                      <TableCell>{new Date(draft.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => loadDraft(draft)}
                          >
                            Fetch Data
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteDraft(draft.id)}
                          >
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

export default PreliminaryUnderwaterHullInspectionReportForm;
