import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, FileText, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface SSKRescueSphereData {
  lockingClawsMovement: {
    observations: string;
    remarks: string;
  };
  callotteClawCleaned: {
    observations: string;
    remarks: string;
  };
  movingPartsGreased: {
    observations: string;
    remarks: string;
  };
  clawFilledOtina: {
    observations: string;
    remarks: string;
  };
  freeFloodedSpace: {
    observations: string;
    remarks: string;
  };
  deckCovering: {
    observations: string;
    remarks: string;
  };
  mastRaising: {
    observations: string;
    remarks: string;
  };
  fanDelivery: {
    observations: string;
    remarks: string;
  };
  powerSupply: {
    observations: string;
    remarks: string;
  };
  hatchWatering: {
    observations: string;
    remarks: string;
  };
  functionalTest: {
    observations: string;
    remarks: string;
  };
  visualInspection: {
    observations: string;
    remarks: string;
  };
  totalPresent: {
    observations: string;
    remarks: string;
  };
  totalRenewed: {
    observations: string;
    remarks: string;
  };
  pressureTestRecorded: {
    observations: string;
    remarks: string;
  };
  pressureTestDate: {
    date: Date | null;
    remarks: string;
  };
  grpBodyDamage: {
    observations: string;
    remarks: string;
  };
  screwsTightness: {
    observations: string;
    remarks: string;
  };
  screwsTighteningDate: {
    date: Date | null;
    remarks: string;
  };
  screwsPresent: {
    observations: string;
    remarks: string;
  };
  lockTitePresence: {
    observations: string;
    remarks: string;
  };
  sikaflexPresence: {
    observations: string;
    remarks: string;
  };
  inspectionDate: {
    date: Date | null;
    remarks: string;
  };
}

interface FormErrors {
  [key: string]: string;
}

const SSKRescueSphereForm: React.FC = () => {
  const [formData, setFormData] = useState<SSKRescueSphereData>({
    lockingClawsMovement: { observations: '', remarks: '' },
    callotteClawCleaned: { observations: '', remarks: '' },
    movingPartsGreased: { observations: '', remarks: '' },
    clawFilledOtina: { observations: '', remarks: '' },
    freeFloodedSpace: { observations: '', remarks: '' },
    deckCovering: { observations: '', remarks: '' },
    mastRaising: { observations: '', remarks: '' },
    fanDelivery: { observations: '', remarks: '' },
    powerSupply: { observations: '', remarks: '' },
    hatchWatering: { observations: '', remarks: '' },
    functionalTest: { observations: '', remarks: '' },
    visualInspection: { observations: '', remarks: '' },
    totalPresent: { observations: '', remarks: '' },
    totalRenewed: { observations: '', remarks: '' },
    pressureTestRecorded: { observations: '', remarks: '' },
    pressureTestDate: { date: null, remarks: '' },
    grpBodyDamage: { observations: '', remarks: '' },
    screwsTightness: { observations: '', remarks: '' },
    screwsTighteningDate: { date: null, remarks: '' },
    screwsPresent: { observations: '', remarks: '' },
    lockTitePresence: { observations: '', remarks: '' },
    sikaflexPresence: { observations: '', remarks: '' },
    inspectionDate: { date: null, remarks: '' },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const observationsOptions = [
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' },
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('ssk-rescue-sphere-draft');
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
      localStorage.setItem('ssk-rescue-sphere-draft', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);


  const handleInputChange = (field: string, value: string) => {
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

  const handleObservationChange = (parentField: string, field: 'observations' | 'remarks', value: string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof SSKRescueSphereData],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    const errorKey = `${parentField}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleDateChange = (parentField: string, field: 'date' | 'remarks', value: Date | string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof SSKRescueSphereData],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    const errorKey = `${parentField}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate all observation sections
    const observationFields = [
      'lockingClawsMovement', 'callotteClawCleaned', 'movingPartsGreased', 
      'clawFilledOtina', 'freeFloodedSpace', 'deckCovering', 'mastRaising',
      'fanDelivery', 'powerSupply', 'hatchWatering', 'functionalTest',
      'visualInspection', 'totalPresent', 'totalRenewed', 'pressureTestRecorded',
      'grpBodyDamage', 'screwsTightness', 'screwsPresent', 'lockTitePresence',
      'sikaflexPresence'
    ];

    observationFields.forEach(field => {
      const section = formData[field as keyof SSKRescueSphereData] as { observations: string; remarks: string };
      if (!section.observations || section.observations === '0') {
        newErrors[`${field}_observations`] = 'Please select an observation';
      }
      if (!section.remarks.trim()) {
        newErrors[`${field}_remarks`] = 'Remarks are required';
      }
    });

    // Validate date sections
    const dateFields = ['pressureTestDate', 'screwsTighteningDate', 'inspectionDate'];
    dateFields.forEach(field => {
      const section = formData[field as keyof SSKRescueSphereData] as { date: Date | null; remarks: string };
      if (!section.date) {
        newErrors[`${field}_date`] = 'Date is required';
      }
      if (!section.remarks.trim()) {
        newErrors[`${field}_remarks`] = 'Remarks are required';
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
      localStorage.removeItem('ssk-rescue-sphere-draft');
      
      alert('Form submitted successfully!');
      setFormData({
        lockingClawsMovement: { observations: '', remarks: '' },
        callotteClawCleaned: { observations: '', remarks: '' },
        movingPartsGreased: { observations: '', remarks: '' },
        clawFilledOtina: { observations: '', remarks: '' },
        freeFloodedSpace: { observations: '', remarks: '' },
        deckCovering: { observations: '', remarks: '' },
        mastRaising: { observations: '', remarks: '' },
        fanDelivery: { observations: '', remarks: '' },
        powerSupply: { observations: '', remarks: '' },
        hatchWatering: { observations: '', remarks: '' },
        functionalTest: { observations: '', remarks: '' },
        visualInspection: { observations: '', remarks: '' },
        totalPresent: { observations: '', remarks: '' },
        totalRenewed: { observations: '', remarks: '' },
        pressureTestRecorded: { observations: '', remarks: '' },
        pressureTestDate: { date: null, remarks: '' },
        grpBodyDamage: { observations: '', remarks: '' },
        screwsTightness: { observations: '', remarks: '' },
        screwsTighteningDate: { date: null, remarks: '' },
        screwsPresent: { observations: '', remarks: '' },
        lockTitePresence: { observations: '', remarks: '' },
        sikaflexPresence: { observations: '', remarks: '' },
        inspectionDate: { date: null, remarks: '' },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('ssk-rescue-sphere-draft');
    setFormData({
      lockingClawsMovement: { observations: '', remarks: '' },
      callotteClawCleaned: { observations: '', remarks: '' },
      movingPartsGreased: { observations: '', remarks: '' },
      clawFilledOtina: { observations: '', remarks: '' },
      freeFloodedSpace: { observations: '', remarks: '' },
      deckCovering: { observations: '', remarks: '' },
      mastRaising: { observations: '', remarks: '' },
      fanDelivery: { observations: '', remarks: '' },
      powerSupply: { observations: '', remarks: '' },
      hatchWatering: { observations: '', remarks: '' },
      functionalTest: { observations: '', remarks: '' },
      visualInspection: { observations: '', remarks: '' },
      totalPresent: { observations: '', remarks: '' },
      totalRenewed: { observations: '', remarks: '' },
      pressureTestRecorded: { observations: '', remarks: '' },
      pressureTestDate: { date: null, remarks: '' },
      grpBodyDamage: { observations: '', remarks: '' },
      screwsTightness: { observations: '', remarks: '' },
      screwsTighteningDate: { date: null, remarks: '' },
      screwsPresent: { observations: '', remarks: '' },
      lockTitePresence: { observations: '', remarks: '' },
      sikaflexPresence: { observations: '', remarks: '' },
      inspectionDate: { date: null, remarks: '' },
    });
  };

  const saveDraft = () => {
    const draft = {
      id: Date.now().toString(),
      data: formData,
      timestamp: new Date().toISOString()
    };
    const updatedDrafts = [...drafts, draft];
    setDrafts(updatedDrafts);
    localStorage.setItem('sskRescueSphere_drafts', JSON.stringify(updatedDrafts));
    alert('Draft saved successfully!');
  };

  const ObservationSection: React.FC<{
    title: string;
    parentField: string;
    observationsOptions: Array<{ value: string; label: string }>;
    testType?: string;
  }> = ({ title, parentField, observationsOptions, testType }) => {
    const section = formData[parentField as keyof SSKRescueSphereData] as { observations: string; remarks: string };
    
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {title.split(' ')[0]}
          </span>
          <Label className="text-lg font-semibold">{title}</Label>
        </div>
        {testType && (
          <div className="text-sm text-gray-600 italic mb-4">{testType}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium">
              Observations: <span className="text-red-500">*</span>
            </Label>
            <Select
              value={section?.observations || ''}
              onValueChange={(value) => handleObservationChange(parentField, 'observations', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="--Select--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">--Select--</SelectItem>
                {observationsOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[`${parentField}_observations`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${parentField}_observations`]}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium">
              Remarks: <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={section?.remarks || ''}
              onChange={(e) => handleObservationChange(parentField, 'remarks', e.target.value)}
              placeholder="Enter remarks"
              rows={2}
              className="resize-none"
            />
            {errors[`${parentField}_remarks`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${parentField}_remarks`]}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DateSection: React.FC<{
    title: string;
    parentField: string;
    testType?: string;
  }> = ({ title, parentField, testType }) => {
    const section = formData[parentField as keyof SSKRescueSphereData] as { date: Date | null; remarks: string };
    
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {title.split(' ')[0]}
          </span>
          <Label className="text-lg font-semibold">{title}</Label>
        </div>
        {testType && (
          <div className="text-sm text-gray-600 italic mb-4">{testType}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {section?.date ? format(section.date, 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={section?.date || undefined}
                  onSelect={(date) => handleDateChange(parentField, 'date', date || null)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors[`${parentField}_date`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${parentField}_date`]}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium">
              Remarks: <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={section?.remarks || ''}
              onChange={(e) => handleDateChange(parentField, 'remarks', e.target.value)}
              placeholder="Enter remarks"
              rows={2}
              className="resize-none"
            />
            {errors[`${parentField}_remarks`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${parentField}_remarks`]}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">SSK CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">RESCUE SPHERE</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Observation Sections */}
            <div className="space-y-6">
              <ObservationSection
                title="1. Check Locking Claws are Free for Movement"
                parentField="lockingClawsMovement"
                observationsOptions={observationsOptions}
                testType="a) Functional Test"
              />

              <ObservationSection
                title="2. Callotte and Claw Well are Cleaned"
                parentField="callotteClawCleaned"
                observationsOptions={observationsOptions}
                testType="a) Functional Test"
              />

              <ObservationSection
                title="3. Moving Parts are Greased"
                parentField="movingPartsGreased"
                observationsOptions={observationsOptions}
                testType="a) Functional Test"
              />

              <ObservationSection
                title="4. Claw Well Filled with 30 kg Shell Otina Compound"
                parentField="clawFilledOtina"
                observationsOptions={observationsOptions}
                testType="a) Functional Test"
              />

              <ObservationSection
                title="5. The Free Flooded Space of The Floating Body While on Surface are Self Draining"
                parentField="freeFloodedSpace"
                observationsOptions={observationsOptions}
              />

              <ObservationSection
                title="6. Must Covering on The Deck"
                parentField="deckCovering"
                observationsOptions={observationsOptions}
                testType="a) Visual Inspection Functional Test"
              />

              <ObservationSection
                title="7. Raising of the Mast and Tightness of Mast Joint Seal"
                parentField="mastRaising"
                observationsOptions={observationsOptions}
                testType="a) Functional Test Water Tightness Check"
              />

              <ObservationSection
                title="8. Delivery of the Electric Fan at Least 80 m3/Hr."
                parentField="fanDelivery"
                observationsOptions={observationsOptions}
                testType="a) Measurement of Air Volume in Case of Unmanned Sphere with Elevated Ventilation Mast, Operation by Means of Built-in Electric Fan"
              />

              <ObservationSection
                title="9. Proof of Sufficiency Power Supply for the Electric Consume (to be Checked by ETMA)"
                parentField="powerSupply"
                observationsOptions={observationsOptions}
                testType="a) Electrical Load, Current and Voltage Measurement, Battery Capacity and Calculation of Discretion Rate There of"
              />

              <ObservationSection
                title="10. Watering of the Free Space between the Hatch Covers of the Rescue Sphere and Hatch Covers of the Pressure Hull"
                parentField="hatchWatering"
                observationsOptions={observationsOptions}
                testType="a) Functional Test"
              />

              <ObservationSection
                title="11. Inter-Locking Equipment for the Hatch Covers of the Rescue Sphere"
                parentField="functionalTest"
                observationsOptions={observationsOptions}
                testType="a) Functional Test"
              />

              <ObservationSection
                title="12. Guides Rails (alignment) of the Rescue Sphere"
                parentField="visualInspection"
                observationsOptions={observationsOptions}
                testType="a) Visual Inspection During Insertion of the Rescue Sphere"
              />

              <ObservationSection
                title="13. Renewal of All Zinc Anodes Undertaken for Spherical Segment"
                parentField="totalPresent"
                observationsOptions={observationsOptions}
                testType="a) Total Present"
              />

              <ObservationSection
                title="13. Renewal of All Zinc Anodes Undertaken for Spherical Segment (Continued)"
                parentField="totalRenewed"
                observationsOptions={observationsOptions}
                testType="b) Total Renewed"
              />

              <ObservationSection
                title="14. Pressure Test Completion"
                parentField="pressureTestRecorded"
                observationsOptions={observationsOptions}
                testType="a) Recorded Value"
              />

              <DateSection
                title="14. Pressure Test Completion (Continued)"
                parentField="pressureTestDate"
                testType="b) Date of Test"
              />

              <ObservationSection
                title="15. GRP Body"
                parentField="grpBodyDamage"
                observationsOptions={observationsOptions}
                testType="a) Physical Damage"
              />

              <ObservationSection
                title="16. Check Screws Securing GRP Body with Rescue Sphere for Tightness"
                parentField="screwsTightness"
                observationsOptions={observationsOptions}
                testType="a) Record Torque Value to which Tightened"
              />

              <DateSection
                title="16. Check Screws Securing GRP Body with Rescue Sphere for Tightness (Continued)"
                parentField="screwsTighteningDate"
                testType="b) Last Date of Tightening Value to be Tightened as per TM"
              />

              <ObservationSection
                title="17. Confirm All 38 Screws Present"
                parentField="screwsPresent"
                observationsOptions={observationsOptions}
              />

              <ObservationSection
                title="18. Presence of Lock-Tite in The Screws"
                parentField="lockTitePresence"
                observationsOptions={observationsOptions}
              />

              <ObservationSection
                title="19. Presence of Sikaflex-252 on All Screws"
                parentField="sikaflexPresence"
                observationsOptions={observationsOptions}
              />

              <DateSection
                title="20. Inspection Undertaken within 8 Months by Removing and Placing on Cradle"
                parentField="inspectionDate"
                testType="a) Last Inspection Date"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={() => setIsDraftModalOpen(true)}>
                Fetch Drafts
              </Button>
              
              <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={saveDraft}>
                SAVE DRAFT
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={clearDraft}
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

              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="hidden">
                    <FileText className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Form Preview</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                      {JSON.stringify(formData, null, 2)}
                    </pre>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSKRescueSphereForm;
