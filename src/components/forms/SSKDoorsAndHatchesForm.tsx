import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, FileText } from 'lucide-react';

interface SSKDoorsAndHatchesData {
  observations_upper_lid: string;
  remarks_upper_lid: string;
  observations_chalk_upper_lid: string;
  remarks_chalk_upper_lid: string;
  observations_lower_lid: string;
  remarks_lower_lid: string;
  observations_chalk_lower_lid: string;
  remarks_chalk_lower_lid: string;
  observations_upper_lid_access: string;
  remarks_upper_lid_access: string;
  observations_chalk_upper_lid_access: string;
  remarks_chalk_upper_lid_access: string;
  observations_lower_lid_access: string;
  remarks_lower_lid_access: string;
  observations_chalk_lower_lid_access: string;
  remarks_chalk_lower_lid_access: string;
  observations_pressure_proof_sealing: string;
  remarks_pressure_proof_sealing: string;
  observations_chalk_sealing: string;
  remarks_chalk_sealing: string;
  observations_escape_hatch_sealing: string;
  remarks_escape_hatch_sealing: string;
  observations_escape_hatch_chalk: string;
  remarks_escape_hatch_chalk: string;
  observations_torpedo_room_sealing: string;
  remarks_torpedo_room_sealing: string;
  observations_torpedo_room_chalk: string;
  remarks_torpedo_room_chalk: string;
  observations_cic_sealing: string;
  remarks_cic_sealing: string;
  observations_cic_chalk: string;
  remarks_cic_chalk: string;
  remarks_any_other_observ: string;
  observations_overall: string;
}

const SSKDoorsAndHatchesForm: React.FC = () => {
  const [formData, setFormData] = useState<SSKDoorsAndHatchesData>({
    observations_upper_lid: '',
    remarks_upper_lid: '',
    observations_chalk_upper_lid: '',
    remarks_chalk_upper_lid: '',
    observations_lower_lid: '',
    remarks_lower_lid: '',
    observations_chalk_lower_lid: '',
    remarks_chalk_lower_lid: '',
    observations_upper_lid_access: '',
    remarks_upper_lid_access: '',
    observations_chalk_upper_lid_access: '',
    remarks_chalk_upper_lid_access: '',
    observations_lower_lid_access: '',
    remarks_lower_lid_access: '',
    observations_chalk_lower_lid_access: '',
    remarks_chalk_lower_lid_access: '',
    observations_pressure_proof_sealing: '',
    remarks_pressure_proof_sealing: '',
    observations_chalk_sealing: '',
    remarks_chalk_sealing: '',
    observations_escape_hatch_sealing: '',
    remarks_escape_hatch_sealing: '',
    observations_escape_hatch_chalk: '',
    remarks_escape_hatch_chalk: '',
    observations_torpedo_room_sealing: '',
    remarks_torpedo_room_sealing: '',
    observations_torpedo_room_chalk: '',
    remarks_torpedo_room_chalk: '',
    observations_cic_sealing: '',
    remarks_cic_sealing: '',
    observations_cic_chalk: '',
    remarks_cic_chalk: '',
    remarks_any_other_observ: '',
    observations_overall: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const observationOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('sskDoorsAndHatchesDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('sskDoorsAndHatchesDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate all observation fields
    const observationFields = [
      'observations_upper_lid', 'observations_chalk_upper_lid', 'observations_lower_lid', 'observations_chalk_lower_lid',
      'observations_upper_lid_access', 'observations_chalk_upper_lid_access', 'observations_lower_lid_access', 'observations_chalk_lower_lid_access',
      'observations_pressure_proof_sealing', 'observations_chalk_sealing', 'observations_escape_hatch_sealing', 'observations_escape_hatch_chalk',
      'observations_torpedo_room_sealing', 'observations_torpedo_room_chalk', 'observations_cic_sealing', 'observations_cic_chalk',
      'observations_overall'
    ];

    observationFields.forEach(field => {
      if (!formData[field as keyof SSKDoorsAndHatchesData] || formData[field as keyof SSKDoorsAndHatchesData] === '0') {
        newErrors[field] = `${field.replace('observations_', '').replace(/_/g, ' ')} observations is required`;
      }
    });

    // Validate all remarks fields
    const remarksFields = [
      'remarks_upper_lid', 'remarks_chalk_upper_lid', 'remarks_lower_lid', 'remarks_chalk_lower_lid',
      'remarks_upper_lid_access', 'remarks_chalk_upper_lid_access', 'remarks_lower_lid_access', 'remarks_chalk_lower_lid_access',
      'remarks_pressure_proof_sealing', 'remarks_chalk_sealing', 'remarks_escape_hatch_sealing', 'remarks_escape_hatch_chalk',
      'remarks_torpedo_room_sealing', 'remarks_torpedo_room_chalk', 'remarks_cic_sealing', 'remarks_cic_chalk',
      'remarks_any_other_observ'
    ];

    remarksFields.forEach(field => {
      if (!formData[field as keyof SSKDoorsAndHatchesData].trim()) {
        newErrors[field] = `${field.replace('remarks_', '').replace(/_/g, ' ')} remarks is required`;
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
      // Clear draft after successful submission
      localStorage.removeItem('sskDoorsAndHatchesDraft');
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('sskDoorsAndHatchesDraft');
    setFormData({
      observations_upper_lid: '',
      remarks_upper_lid: '',
      observations_chalk_upper_lid: '',
      remarks_chalk_upper_lid: '',
      observations_lower_lid: '',
      remarks_lower_lid: '',
      observations_chalk_lower_lid: '',
      remarks_chalk_lower_lid: '',
      observations_upper_lid_access: '',
      remarks_upper_lid_access: '',
      observations_chalk_upper_lid_access: '',
      remarks_chalk_upper_lid_access: '',
      observations_lower_lid_access: '',
      remarks_lower_lid_access: '',
      observations_chalk_lower_lid_access: '',
      remarks_chalk_lower_lid_access: '',
      observations_pressure_proof_sealing: '',
      remarks_pressure_proof_sealing: '',
      observations_chalk_sealing: '',
      remarks_chalk_sealing: '',
      observations_escape_hatch_sealing: '',
      remarks_escape_hatch_sealing: '',
      observations_escape_hatch_chalk: '',
      remarks_escape_hatch_chalk: '',
      observations_torpedo_room_sealing: '',
      remarks_torpedo_room_sealing: '',
      observations_torpedo_room_chalk: '',
      remarks_torpedo_room_chalk: '',
      observations_cic_sealing: '',
      remarks_cic_sealing: '',
      observations_cic_chalk: '',
      remarks_cic_chalk: '',
      remarks_any_other_observ: '',
      observations_overall: ''
    });
    setErrors({});
  };

  const saveDraft = () => {
    const draft = {
      id: Date.now().toString(),
      data: formData,
      timestamp: new Date().toISOString()
    };
    const updatedDrafts = [...drafts, draft];
    setDrafts(updatedDrafts);
    localStorage.setItem('sskDoorsAndHatches_drafts', JSON.stringify(updatedDrafts));
    alert('Draft saved successfully!');
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
    title: string,
    observationField: keyof SSKDoorsAndHatchesData,
    remarksField: keyof SSKDoorsAndHatchesData,
    subtitle?: string
  ) => (
    <div className="space-y-4">
      {subtitle && <h5 className="font-medium text-gray-700 mb-3">{subtitle}</h5>}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Observations <span className="text-red-500">*</span></Label>
            <Select
              value={formData[observationField]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, [observationField]: value }))}
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
            {errors[observationField] && (
              <p className="text-red-500 text-xs">{errors[observationField]}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Remarks <span className="text-red-500">*</span></Label>
            <Textarea
              value={formData[remarksField]}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, [remarksField]: value }));
              }}
              rows={2}
              placeholder="Enter remarks"
            />
            {errors[remarksField] && (
              <p className="text-red-500 text-xs">{errors[remarksField]}</p>
            )}
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
              <h4 className="text-xl font-bold text-pink-600 mb-2">SSK CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">DOORS AND HATCHES</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Battery Loading Hatch */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold mr-2">1</span>
                    Battery Loading Hatch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Upper Lid</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_upper_lid',
                        'remarks_upper_lid'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_chalk_upper_lid',
                        'remarks_chalk_upper_lid'
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Lower Lid</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_lower_lid',
                        'remarks_lower_lid'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_chalk_lower_lid',
                        'remarks_chalk_lower_lid'
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Access Trunk */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold mr-2">2</span>
                    Access Trunk
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Upper Lid</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_upper_lid_access',
                        'remarks_upper_lid_access'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_chalk_upper_lid_access',
                        'remarks_chalk_upper_lid_access'
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Lower Lid</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_lower_lid_access',
                        'remarks_lower_lid_access'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_chalk_lower_lid_access',
                        'remarks_chalk_lower_lid_access'
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pressure Proof Bulk Head Door */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold mr-2">3</span>
                    Pressure Proof Bulk Head Door
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderObservationSection(
                    "a) Conditions of Rubber Sealing",
                    'observations_pressure_proof_sealing',
                    'remarks_pressure_proof_sealing'
                  )}
                  {renderObservationSection(
                    "b) Chalk Impression Test",
                    'observations_chalk_sealing',
                    'remarks_chalk_sealing'
                  )}
                </CardContent>
              </Card>

              {/* Rescue Sphere Hatch */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold mr-2">4</span>
                    Rescue Sphere Hatch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Escape Hatch</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_escape_hatch_sealing',
                        'remarks_escape_hatch_sealing'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_escape_hatch_chalk',
                        'remarks_escape_hatch_chalk'
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Hatch in Torpedo Room</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_torpedo_room_sealing',
                        'remarks_torpedo_room_sealing'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_torpedo_room_chalk',
                        'remarks_torpedo_room_chalk'
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">Hatch in CIC</h5>
                    <div className="space-y-4">
                      {renderObservationSection(
                        "a) Conditions of Rubber Sealing",
                        'observations_cic_sealing',
                        'remarks_cic_sealing'
                      )}
                      {renderObservationSection(
                        "b) Chalk Impression Test",
                        'observations_cic_chalk',
                        'remarks_cic_chalk'
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Any Other Observation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold mr-2">5</span>
                    Any Other Observation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Remarks <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarks_any_other_observ}
                      onChange={(e) => {
                        const value = handleRemarksValidation(e.target.value);
                        setFormData(prev => ({ ...prev, remarks_any_other_observ: value }));
                      }}
                      rows={2}
                      placeholder="Enter remarks"
                    />
                    {errors.remarks_any_other_observ && (
                      <p className="text-red-500 text-xs">{errors.remarks_any_other_observ}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Remarks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold mr-2">6</span>
                    Overall Remarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Observations <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.observations_overall}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, observations_overall: value }))}
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
                    {errors.observations_overall && (
                      <p className="text-red-500 text-xs">{errors.observations_overall}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    {/* <Button type="button" variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" /> Preview
                    </Button> */}
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>SSK Doors and Hatches Form Data</DialogTitle>
                    </DialogHeader>
                    <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md">
                      {JSON.stringify(formData, null, 2)}
                    </pre>
                  </DialogContent>
                </Dialog>
                <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={() => setIsDraftModalOpen(true)}>
                  Fetch Drafts
                </Button>
                
                <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={saveDraft}>
                  SAVE DRAFT
                </Button>
                
                <Button
                  type="button"
                  variant="destructive"
                  onClick={clearDraft}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                >
                  Clear
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSKDoorsAndHatchesForm;
