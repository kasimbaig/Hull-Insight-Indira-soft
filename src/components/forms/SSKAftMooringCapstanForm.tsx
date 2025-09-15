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

interface SSKAftMooringCapstanData {
  make: string;
  type: string;
  yearManufacture: string;
  hydraulicActuators: {
    observations: string;
    remarks: string;
  };
  properGreasing: {
    observations: string;
    remarks: string;
  };
  greasingNippleCondition: {
    observations: string;
    remarks: string;
  };
  capstanDrumFoundation: {
    observations: string;
    remarks: string;
  };
  insulationInside: {
    observations: string;
    remarks: string;
  };
  insulationOutside: {
    observations: string;
    remarks: string;
  };
  speed1Clockwise: {
    observations: string;
    remarks: string;
  };
  abnormalSounds: {
    observations: string;
    remarks: string;
  };
  anyOtherObserv: string;
  overallObservations: string;
}

const SSKAftMooringCapstanForm: React.FC = () => {
  const [formData, setFormData] = useState<SSKAftMooringCapstanData>({
    make: '',
    type: '',
    yearManufacture: '',
    hydraulicActuators: {
      observations: '',
      remarks: ''
    },
    properGreasing: {
      observations: '',
      remarks: ''
    },
    greasingNippleCondition: {
      observations: '',
      remarks: ''
    },
    capstanDrumFoundation: {
      observations: '',
      remarks: ''
    },
    insulationInside: {
      observations: '',
      remarks: ''
    },
    insulationOutside: {
      observations: '',
      remarks: ''
    },
    speed1Clockwise: {
      observations: '',
      remarks: ''
    },
    abnormalSounds: {
      observations: '',
      remarks: ''
    },
    anyOtherObserv: '',
    overallObservations: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Options for different observation types
  const opsObservations = [
    { value: 'OPS', label: 'OPS' },
    { value: 'NON-OPS', label: 'NON-OPS' }
  ];

  const satObservations = [
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  const greasingObservations = [
    { value: 'SAT', label: 'SAT' },
    { value: 'PAINTED', label: 'PAINTED' },
    { value: 'CHOKED', label: 'CHOKED' }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('sskAftMooringCapstan_draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage whenever form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('sskAftMooringCapstan_draft', JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!formData.yearManufacture.trim()) {
      newErrors.yearManufacture = 'Year of Manufacture is required';
    } else {
      const year = parseInt(formData.yearManufacture);
      const currentYear = new Date().getFullYear();
      if (year > currentYear || year < 1900) {
        newErrors.yearManufacture = 'Please enter a valid year between 1900 and current year';
      }
    }

    // Hydraulic Actuators validation
    if (!formData.hydraulicActuators.observations) {
      newErrors.hydraulicActuators_observations = 'Observations is required';
    }
    if (!formData.hydraulicActuators.remarks.trim()) {
      newErrors.hydraulicActuators_remarks = 'Remarks is required';
    }

    // Proper Greasing validation
    if (!formData.properGreasing.observations) {
      newErrors.properGreasing_observations = 'Observations is required';
    }
    if (!formData.properGreasing.remarks.trim()) {
      newErrors.properGreasing_remarks = 'Remarks is required';
    }

    // Greasing Nipple Condition validation
    if (!formData.greasingNippleCondition.observations) {
      newErrors.greasingNippleCondition_observations = 'Observations is required';
    }
    if (!formData.greasingNippleCondition.remarks.trim()) {
      newErrors.greasingNippleCondition_remarks = 'Remarks is required';
    }

    // Capstan Drum Foundation validation
    if (!formData.capstanDrumFoundation.observations) {
      newErrors.capstanDrumFoundation_observations = 'Observations is required';
    }
    if (!formData.capstanDrumFoundation.remarks.trim()) {
      newErrors.capstanDrumFoundation_remarks = 'Remarks is required';
    }

    // Insulation Inside validation
    if (!formData.insulationInside.observations) {
      newErrors.insulationInside_observations = 'Observations is required';
    }
    if (!formData.insulationInside.remarks.trim()) {
      newErrors.insulationInside_remarks = 'Remarks is required';
    }

    // Insulation Outside validation
    if (!formData.insulationOutside.observations) {
      newErrors.insulationOutside_observations = 'Observations is required';
    }
    if (!formData.insulationOutside.remarks.trim()) {
      newErrors.insulationOutside_remarks = 'Remarks is required';
    }

    // Speed 1 Clockwise validation
    if (!formData.speed1Clockwise.observations) {
      newErrors.speed1Clockwise_observations = 'Observations is required';
    }
    if (!formData.speed1Clockwise.remarks.trim()) {
      newErrors.speed1Clockwise_remarks = 'Remarks is required';
    }

    // Abnormal Sounds validation
    if (!formData.abnormalSounds.observations) {
      newErrors.abnormalSounds_observations = 'Observations is required';
    }
    if (!formData.abnormalSounds.remarks.trim()) {
      newErrors.abnormalSounds_remarks = 'Remarks is required';
    }

    // Any Other Observation validation
    if (!formData.anyOtherObserv.trim()) {
      newErrors.anyOtherObserv = 'Remarks is required';
    }

    // Overall Observations validation
    if (!formData.overallObservations) {
      newErrors.overallObservations = 'Observations is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleNestedInputChange = (parentField: string, childField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof SSKAftMooringCapstanData],
        [childField]: value
      }
    }));
    // Clear error when user starts typing
    const errorKey = `${parentField}_${childField}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleYearChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      handleInputChange('yearManufacture', numericValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      // Clear the form after successful submission
      setFormData({
        make: '',
        type: '',
        yearManufacture: '',
        hydraulicActuators: { observations: '', remarks: '' },
        properGreasing: { observations: '', remarks: '' },
        greasingNippleCondition: { observations: '', remarks: '' },
        capstanDrumFoundation: { observations: '', remarks: '' },
        insulationInside: { observations: '', remarks: '' },
        insulationOutside: { observations: '', remarks: '' },
        speed1Clockwise: { observations: '', remarks: '' },
        abnormalSounds: { observations: '', remarks: '' },
        anyOtherObserv: '',
        overallObservations: ''
      });
      
      // Clear localStorage draft
      localStorage.removeItem('sskAftMooringCapstan_draft');
      
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      make: '',
      type: '',
      yearManufacture: '',
      hydraulicActuators: { observations: '', remarks: '' },
      properGreasing: { observations: '', remarks: '' },
      greasingNippleCondition: { observations: '', remarks: '' },
      capstanDrumFoundation: { observations: '', remarks: '' },
      insulationInside: { observations: '', remarks: '' },
      insulationOutside: { observations: '', remarks: '' },
      speed1Clockwise: { observations: '', remarks: '' },
      abnormalSounds: { observations: '', remarks: '' },
      anyOtherObserv: '',
      overallObservations: ''
    });
    setErrors({});
    localStorage.removeItem('sskAftMooringCapstan_draft');
  };

  const ObservationSection: React.FC<{
    title: string;
    parentField: string;
    observationsOptions: Array<{ value: string; label: string }>;
  }> = ({ title, parentField, observationsOptions }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor={`${parentField}_observations`} className="text-sm font-medium">
            Observations: <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData[parentField as keyof SSKAftMooringCapstanData]?.observations || ''}
            onValueChange={(value) => handleNestedInputChange(parentField, 'observations', value)}
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
          {errors[`${parentField}_observations`] && (
            <p className="text-red-500 text-sm mt-1">{errors[`${parentField}_observations`]}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor={`${parentField}_remarks`} className="text-sm font-medium">
            Remarks: <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id={`${parentField}_remarks`}
            value={formData[parentField as keyof SSKAftMooringCapstanData]?.remarks || ''}
            onChange={(e) => handleNestedInputChange(parentField, 'remarks', e.target.value)}
            rows={2}
            placeholder="Enter remarks..."
          />
          {errors[`${parentField}_remarks`] && (
            <p className="text-red-500 text-sm mt-1">{errors[`${parentField}_remarks`]}</p>
          )}
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
              <h4 className="text-xl font-bold text-blue-600 mb-2">SSK CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AFT MOORING CAPSTAN</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="make" className="text-sm font-medium">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">1</span>
                    Make <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                    placeholder="Enter make"
                    maxLength={20}
                  />
                  {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
                </div>
                <div>
                  <Label htmlFor="type" className="text-sm font-medium">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">2</span>
                    Type <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                    placeholder="Enter type"
                    maxLength={20}
                  />
                  {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="yearManufacture" className="text-sm font-medium">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">3</span>
                  Year of Manufacture <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="yearManufacture"
                  value={formData.yearManufacture}
                  onChange={(e) => handleYearChange(e.target.value)}
                  placeholder="Enter year"
                  maxLength={4}
                />
                {errors.yearManufacture && <p className="text-red-500 text-sm mt-1">{errors.yearManufacture}</p>}
              </div>
            </div>

            {/* Control Panel AFT Capstan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">4</span>
                  Control Panel AFT Capstan (Control Room)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Hydraulic Actuators</h4>
                  <ObservationSection
                    title="Hydraulic Actuators"
                    parentField="hydraulicActuators"
                    observationsOptions={opsObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Greasing of Mechanical Parts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">5</span>
                  Greasing of Mechanical Parts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Proper Greasing of Mechanical Parts</h4>
                  <ObservationSection
                    title="Proper Greasing"
                    parentField="properGreasing"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Greasing Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">6</span>
                  Greasing Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Condition of Greasing Nipple-Clean/ Painted/ Choked</h4>
                  <ObservationSection
                    title="Greasing Nipple Condition"
                    parentField="greasingNippleCondition"
                    observationsOptions={greasingObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Conditions of Capstan Drum Foundations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">7</span>
                  Conditions of Capstan Drum Foundations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Corrosion/ Pitting/ Unpainted</h4>
                  <ObservationSection
                    title="Capstan Drum Foundation"
                    parentField="capstanDrumFoundation"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Securing of the Capstan Drum */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">8</span>
                  Securing of the Capstan Drum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Inside Casing (Sailing)</h4>
                  <ObservationSection
                    title="Insulation Inside"
                    parentField="insulationInside"
                    observationsOptions={satObservations}
                  />
                  <br />
                  <h4 className="font-medium">b) Outside Casing (Harbor Operation)</h4>
                  <ObservationSection
                    title="Insulation Outside"
                    parentField="insulationOutside"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Operational Trails */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">9</span>
                  Operational Trails
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Speed 1 (Clock Wise)</h4>
                  <ObservationSection
                    title="Speed 1 Clockwise"
                    parentField="speed1Clockwise"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Drive */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">10</span>
                  Drive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Check for Abnormal Sounds/ Excessive Noise During Operation</h4>
                  <ObservationSection
                    title="Abnormal Sounds"
                    parentField="abnormalSounds"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Any Other Observation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">11</span>
                  Any Other Observation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="anyOtherObserv" className="text-sm font-medium">
                    Remarks: <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="anyOtherObserv"
                    value={formData.anyOtherObserv}
                    onChange={(e) => handleInputChange('anyOtherObserv', e.target.value)}
                    rows={2}
                    placeholder="Enter any other observations..."
                  />
                  {errors.anyOtherObserv && <p className="text-red-500 text-sm mt-1">{errors.anyOtherObserv}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Overall Remarks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">12</span>
                  Overall Remarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="overallObservations" className="text-sm font-medium">
                    Observations: <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.overallObservations}
                    onValueChange={(value) => handleInputChange('overallObservations', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {satObservations.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.overallObservations && <p className="text-red-500 text-sm mt-1">{errors.overallObservations}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
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

export default SSKAftMooringCapstanForm;
