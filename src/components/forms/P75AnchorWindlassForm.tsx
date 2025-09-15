import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
    <div className="section-box">
      <div className="section-header">
        <span className="label-number">{sectionNumber}</span>
        <div className="section-header-inner">
          <Label>{title}</Label>
        </div>
      </div>
      <div className="section-header-inner">{subtitle}</div>
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
    <div className="section-box">
      <div className="section-header">
        <span className="label-number">{sectionNumber}</span>
        <div className="section-header-inner">
          <Label>{title}</Label>
        </div>
      </div>
      <div className="section-header-inner">{subtitleA}</div>
      <div className="section-content">
        <div className="row">
          <div className="col-md-4">
            <Label className="observation-label">Observations:<strong className="text-red-500">*</strong></Label>
            <Select 
              value={formData[observationFieldA]} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, [observationFieldA]: value }))}
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
            {errors[observationFieldA] && <p className="text-red-500 text-xs">{errors[observationFieldA]}</p>}
          </div>
          <div className="col-md-8">
            <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
            <Textarea
              value={formData[remarksFieldA]}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, [remarksFieldA]: value }));
              }}
              rows={2}
              placeholder="Enter remarks"
            />
            {errors[remarksFieldA] && <p className="text-red-500 text-xs">{errors[remarksFieldA]}</p>}
          </div>
        </div>
      </div>
      <br />
      <div className="section-header-inner">{subtitleB}</div>
      <div className="section-content">
        <div className="row">
          <div className="col-md-4">
            <Label className="observation-label">Observations:<strong className="text-red-500">*</strong></Label>
            <Select 
              value={formData[observationFieldB]} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, [observationFieldB]: value }))}
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
            {errors[observationFieldB] && <p className="text-red-500 text-xs">{errors[observationFieldB]}</p>}
          </div>
          <div className="col-md-8">
            <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
            <Textarea
              value={formData[remarksFieldB]}
              onChange={(e) => {
                const value = handleRemarksValidation(e.target.value);
                setFormData(prev => ({ ...prev, [remarksFieldB]: value }));
              }}
              rows={2}
              placeholder="Enter remarks"
            />
            {errors[remarksFieldB] && <p className="text-red-500 text-xs">{errors[remarksFieldB]}</p>}
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
              <u>ANCHOR WINDLASS</u>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Make */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">1</span>
                <Label htmlFor="make">Make<strong className="text-red-500">*</strong></Label>
              </div>
              <div className="section-content">
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => {
                    const value = handleSpecialCharValidation(e.target.value);
                    setFormData(prev => ({ ...prev, make: value }));
                  }}
                  maxLength={20}
                  placeholder="Enter make"
                />
                {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
              </div>
            </div>

            {/* Section 2: Type */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">2</span>
                <Label htmlFor="type">Type<strong className="text-red-500">*</strong></Label>
              </div>
              <div className="section-content">
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => {
                    const value = handleSpecialCharValidation(e.target.value);
                    setFormData(prev => ({ ...prev, type: value }));
                  }}
                  maxLength={20}
                  placeholder="Enter type"
                />
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>
            </div>

            {/* Section 3: Year of Manufacture */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">3</span>
                <Label htmlFor="yearManufacture">Year of Manufacture<strong className="text-red-500">*</strong></Label>
              </div>
              <div className="section-content">
                <Input
                  id="yearManufacture"
                  value={formData.yearManufacture}
                  onChange={(e) => handleYearChange(e.target.value)}
                  maxLength={4}
                  placeholder="Enter year"
                />
                {errors.yearManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearManufacture}</p>}
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
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">16</span>
                <Label>Any Other Observation</Label>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-12">
                    <Label className="remarks-label">Remarks:<strong className="text-red-500">*</strong></Label>
                    <Textarea
                      value={formData.remarksAnyOtherObserv}
                      onChange={(e) => {
                        const value = handleRemarksValidation(e.target.value);
                        setFormData(prev => ({ ...prev, remarksAnyOtherObserv: value }));
                      }}
                      rows={2}
                      placeholder="Enter remarks"
                    />
                    {errors.remarksAnyOtherObserv && <p className="text-red-500 text-sm mt-1">{errors.remarksAnyOtherObserv}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 17: Overall Remarks */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">17</span>
                <Label>Overall Remarks</Label>
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
                    {errors.observationsOverall && <p className="text-red-500 text-sm mt-1">{errors.observationsOverall}</p>}
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

export default P75AnchorWindlassForm;

