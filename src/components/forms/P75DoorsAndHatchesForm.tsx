import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface P75DoorsAndHatchesFormData {
  // WT/GT Doors
  observationsCofferdamFwd: string;
  remarksCofferdamFwd: string;
  observationsCofferdamAft: string;
  remarksCofferdamAft: string;
  observationsFwdGTDoor: string;
  remarksFwdGTDoor: string;
  observationsAftGTDoor: string;
  remarksAftGTDoor: string;
  
  // WT/GT Hatches
  observationsEmbarkationHatch: string;
  remarksEmbarkationHatch: string;
  observationsFwdBatteryHatch: string;
  remarksFwdBatteryHatch: string;
  observationsNavigationUpper: string;
  remarksNavigationUpper: string;
  observationsNavigationLower: string;
  remarksNavigationLower: string;
  observationsCentralAccess: string;
  remarksCentralAccess: string;
  observationsEQUpper: string;
  remarksEQUpper: string;
  observationsEQLower: string;
  remarksEQLower: string;
  observationsAftBatteryHatch: string;
  remarksAftBatteryHatch: string;
  observationsGTVentilation: string;
  remarksGTVentilation: string;
  
  // Other sections
  remarksAnyOtherObserv: string;
  observationsOverall: string;
}

const P75DoorsAndHatchesForm: React.FC = () => {
  const [formData, setFormData] = useState<P75DoorsAndHatchesFormData>({
    observationsCofferdamFwd: '',
    remarksCofferdamFwd: '',
    observationsCofferdamAft: '',
    remarksCofferdamAft: '',
    observationsFwdGTDoor: '',
    remarksFwdGTDoor: '',
    observationsAftGTDoor: '',
    remarksAftGTDoor: '',
    observationsEmbarkationHatch: '',
    remarksEmbarkationHatch: '',
    observationsFwdBatteryHatch: '',
    remarksFwdBatteryHatch: '',
    observationsNavigationUpper: '',
    remarksNavigationUpper: '',
    observationsNavigationLower: '',
    remarksNavigationLower: '',
    observationsCentralAccess: '',
    remarksCentralAccess: '',
    observationsEQUpper: '',
    remarksEQUpper: '',
    observationsEQLower: '',
    remarksEQLower: '',
    observationsAftBatteryHatch: '',
    remarksAftBatteryHatch: '',
    observationsGTVentilation: '',
    remarksGTVentilation: '',
    remarksAnyOtherObserv: '',
    observationsOverall: '',
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate all observation fields
    const observationFields = [
      'observationsCofferdamFwd', 'observationsCofferdamAft', 'observationsFwdGTDoor', 'observationsAftGTDoor',
      'observationsEmbarkationHatch', 'observationsFwdBatteryHatch', 'observationsNavigationUpper', 'observationsNavigationLower',
      'observationsCentralAccess', 'observationsEQUpper', 'observationsEQLower', 'observationsAftBatteryHatch',
      'observationsGTVentilation', 'observationsOverall'
    ];
    
    observationFields.forEach(field => {
      if (!formData[field as keyof P75DoorsAndHatchesFormData] || formData[field as keyof P75DoorsAndHatchesFormData] === '0') {
        newErrors[field] = `${field.replace('observations', '').replace(/([A-Z])/g, ' $1').trim()} observations is required`;
      }
    });

    // Validate all remarks fields
    const remarksFields = [
      'remarksCofferdamFwd', 'remarksCofferdamAft', 'remarksFwdGTDoor', 'remarksAftGTDoor',
      'remarksEmbarkationHatch', 'remarksFwdBatteryHatch', 'remarksNavigationUpper', 'remarksNavigationLower',
      'remarksCentralAccess', 'remarksEQUpper', 'remarksEQLower', 'remarksAftBatteryHatch',
      'remarksGTVentilation', 'remarksAnyOtherObserv'
    ];
    
    remarksFields.forEach(field => {
      if (!formData[field as keyof P75DoorsAndHatchesFormData].trim()) {
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
        observationsCofferdamFwd: '',
        remarksCofferdamFwd: '',
        observationsCofferdamAft: '',
        remarksCofferdamAft: '',
        observationsFwdGTDoor: '',
        remarksFwdGTDoor: '',
        observationsAftGTDoor: '',
        remarksAftGTDoor: '',
        observationsEmbarkationHatch: '',
        remarksEmbarkationHatch: '',
        observationsFwdBatteryHatch: '',
        remarksFwdBatteryHatch: '',
        observationsNavigationUpper: '',
        remarksNavigationUpper: '',
        observationsNavigationLower: '',
        remarksNavigationLower: '',
        observationsCentralAccess: '',
        remarksCentralAccess: '',
        observationsEQUpper: '',
        remarksEQUpper: '',
        observationsEQLower: '',
        remarksEQLower: '',
        observationsAftBatteryHatch: '',
        remarksAftBatteryHatch: '',
        observationsGTVentilation: '',
        remarksGTVentilation: '',
        remarksAnyOtherObserv: '',
        observationsOverall: '',
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
      title: `P-75 Doors/Hatches - Draft`,
      data: formData,
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('p75DoorsAndHatchesDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('p75DoorsAndHatchesDrafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('p75DoorsAndHatchesDrafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: any) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('p75DoorsAndHatchesDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      observationsCofferdamFwd: '',
      remarksCofferdamFwd: '',
      observationsCofferdamAft: '',
      remarksCofferdamAft: '',
      observationsFwdGTDoor: '',
      remarksFwdGTDoor: '',
      observationsAftGTDoor: '',
      remarksAftGTDoor: '',
      observationsEmbarkationHatch: '',
      remarksEmbarkationHatch: '',
      observationsFwdBatteryHatch: '',
      remarksFwdBatteryHatch: '',
      observationsNavigationUpper: '',
      remarksNavigationUpper: '',
      observationsNavigationLower: '',
      remarksNavigationLower: '',
      observationsCentralAccess: '',
      remarksCentralAccess: '',
      observationsEQUpper: '',
      remarksEQUpper: '',
      observationsEQLower: '',
      remarksEQLower: '',
      observationsAftBatteryHatch: '',
      remarksAftBatteryHatch: '',
      observationsGTVentilation: '',
      remarksGTVentilation: '',
      remarksAnyOtherObserv: '',
      observationsOverall: '',
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

  const renderObservationSection = (
    sectionNumber: number,
    title: string,
    observationField: keyof P75DoorsAndHatchesFormData,
    remarksField: keyof P75DoorsAndHatchesFormData,
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

  const renderDualSection = (
    sectionNumber: number,
    title: string,
    subtitleA: string,
    subtitleB: string,
    observationFieldA: keyof P75DoorsAndHatchesFormData,
    remarksFieldA: keyof P75DoorsAndHatchesFormData,
    observationFieldB: keyof P75DoorsAndHatchesFormData,
    remarksFieldB: keyof P75DoorsAndHatchesFormData
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">DOORS AND HATCHES</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-6">
              {/* WT/GT Doors Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">WT/GT Doors</h3>
                
                {/* Section 1 */}
                {renderObservationSection(
                  1,
                  "Cofferdam Fwd Bulkhead WT Door (Pressure Proof Bulkhead Door)",
                  "observationsCofferdamFwd",
                  "remarksCofferdamFwd",
                  "a) Conditions of Rubber Sealing"
                )}

                {/* Section 2 */}
                {renderObservationSection(
                  2,
                  "Cofferdam Aft Bulkhead WT Door (Pressure Proof Bulkhead Door)",
                  "observationsCofferdamAft",
                  "remarksCofferdamAft",
                  "a) Conditions of Rubber Sealing"
                )}

                {/* Section 3 */}
                {renderObservationSection(
                  3,
                  "Fwd GT Door of Engine Room",
                  "observationsFwdGTDoor",
                  "remarksFwdGTDoor",
                  "a) Conditions of Rubber Sealing"
                )}

                {/* Section 4 */}
                {renderObservationSection(
                  4,
                  "Aft GT Door of Engine Room",
                  "observationsAftGTDoor",
                  "remarksAftGTDoor",
                  "a) Conditions of Rubber Sealing"
                )}
              </div>

              {/* WT/GT Hatches Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">WT/GT Hatches</h3>
                
                {/* Section 5 */}
                {renderObservationSection(
                  5,
                  "Embarkation / Torpedo Loading Hatch (Upper Lid)",
                  "observationsEmbarkationHatch",
                  "remarksEmbarkationHatch",
                  "a) Conditions of Rubber Sealing"
                )}

                {/* Section 6 */}
                {renderObservationSection(
                  6,
                  "Fwd Battery Loading Hatch (Upper Lid - Bolted)",
                  "observationsFwdBatteryHatch",
                  "remarksFwdBatteryHatch",
                  "a) Conditions of Rubber Sealing"
                )}

                {/* Section 7 */}
                {renderDualSection(
                  7,
                  "Navigation Hatch",
                  "Upper Lid - a) Conditions of Rubber Sealing",
                  "Lower Lid - b) Conditions of Rubber Sealing",
                  "observationsNavigationUpper",
                  "remarksNavigationUpper",
                  "observationsNavigationLower",
                  "remarksNavigationLower"
                )}

                {/* Section 8 */}
                {renderObservationSection(
                  8,
                  "Central Access Hatch (Upper Lid)",
                  "observationsCentralAccess",
                  "remarksCentralAccess",
                  "a) Conditions of Rubber Sealing"
                )}

                {/* Section 9 */}
                {renderDualSection(
                  9,
                  "EQ",
                  "Upper Lid - a) Conditions of Rubber Sealing",
                  "Lower Lid - b) Conditions of Rubber Sealing",
                  "observationsEQUpper",
                  "remarksEQUpper",
                  "observationsEQLower",
                  "remarksEQLower"
                )}

                {/* Section 10 */}
                {renderObservationSection(
                  10,
                  "Aft Battery Loading Hatch (Upper Lid - Bolted)",
                  "observationsAftBatteryHatch",
                  "remarksAftBatteryHatch"
                )}

                {/* Section 11 */}
                {renderObservationSection(
                  11,
                  "GT Hatch of Ventilation Compartment",
                  "observationsGTVentilation",
                  "remarksGTVentilation"
                )}
              </div>

              {/* Section 12: Any Other Observation */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    12
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

              {/* Section 13: Overall Remarks */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    13
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
                                  <TableCell>{draft.title || 'No Inspection Data'}</TableCell>
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

export default P75DoorsAndHatchesForm;