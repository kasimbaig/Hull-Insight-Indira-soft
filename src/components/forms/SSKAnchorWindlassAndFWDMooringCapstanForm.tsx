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

interface SSKAnchorWindlassAndFWDMooringCapstanData {
  make: string;
  type: string;
  yearManufacture: string;
  hydraulicActuators: {
    observations: string;
    remarks: string;
  };
  foundationWindlass: {
    observations: string;
    remarks: string;
  };
  foundationCapstan: {
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
  greasing: {
    observations: string;
    remarks: string;
  };
  greasingPoint: {
    observations: string;
    remarks: string;
  };
  anchorIndicationPlate: {
    observations: string;
    remarks: string;
  };
  chainCounter: {
    observations: string;
    remarks: string;
  };
  chainLength: string;
  chainDiameter: string;
  bitterEnd: {
    observations: string;
    remarks: string;
  };
  payingOut: {
    observations: string;
    remarks: string;
  };
  heavingIn: {
    observations: string;
    remarks: string;
  };
  bandBrakeEngage: {
    observations: string;
    remarks: string;
  };
  bandBrakeDisengage: {
    observations: string;
    remarks: string;
  };
  screwStopperEngage: {
    observations: string;
    remarks: string;
  };
  screwStopperDisengage: {
    observations: string;
    remarks: string;
  };
  clutchEngage: {
    observations: string;
    remarks: string;
  };
  clutchDisengage: {
    observations: string;
    remarks: string;
  };
  warpingDrumEngage: {
    observations: string;
    remarks: string;
  };
  warpingDrumDisengage: {
    observations: string;
    remarks: string;
  };
  driveSounds: {
    observations: string;
    remarks: string;
  };
  anyOtherObserv: string;
  overallObservations: string;
}

const SSKAnchorWindlassAndFWDMooringCapstanForm: React.FC = () => {
  const [formData, setFormData] = useState<SSKAnchorWindlassAndFWDMooringCapstanData>({
    make: '',
    type: '',
    yearManufacture: '',
    hydraulicActuators: { observations: '', remarks: '' },
    foundationWindlass: { observations: '', remarks: '' },
    foundationCapstan: { observations: '', remarks: '' },
    insulationInside: { observations: '', remarks: '' },
    insulationOutside: { observations: '', remarks: '' },
    greasing: { observations: '', remarks: '' },
    greasingPoint: { observations: '', remarks: '' },
    anchorIndicationPlate: { observations: '', remarks: '' },
    chainCounter: { observations: '', remarks: '' },
    chainLength: '',
    chainDiameter: '',
    bitterEnd: { observations: '', remarks: '' },
    payingOut: { observations: '', remarks: '' },
    heavingIn: { observations: '', remarks: '' },
    bandBrakeEngage: { observations: '', remarks: '' },
    bandBrakeDisengage: { observations: '', remarks: '' },
    screwStopperEngage: { observations: '', remarks: '' },
    screwStopperDisengage: { observations: '', remarks: '' },
    clutchEngage: { observations: '', remarks: '' },
    clutchDisengage: { observations: '', remarks: '' },
    warpingDrumEngage: { observations: '', remarks: '' },
    warpingDrumDisengage: { observations: '', remarks: '' },
    driveSounds: { observations: '', remarks: '' },
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
    { value: 'CHOKED', label: 'CHOKED' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  const yesNoObservations = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('sskAnchorWindlassAndFWDMooringCapstan_draft');
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
      localStorage.setItem('sskAnchorWindlassAndFWDMooringCapstan_draft', JSON.stringify(formData));
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

    // Validate all observation sections
    const observationSections = [
      'hydraulicActuators', 'foundationWindlass', 'foundationCapstan', 'insulationInside', 'insulationOutside',
      'greasing', 'greasingPoint', 'anchorIndicationPlate', 'chainCounter', 'bitterEnd', 'payingOut', 'heavingIn',
      'bandBrakeEngage', 'bandBrakeDisengage', 'screwStopperEngage', 'screwStopperDisengage', 'clutchEngage',
      'clutchDisengage', 'warpingDrumEngage', 'warpingDrumDisengage', 'driveSounds'
    ];

    observationSections.forEach(section => {
      if (!formData[section as keyof SSKAnchorWindlassAndFWDMooringCapstanData]?.observations) {
        newErrors[`${section}_observations`] = 'Observations is required';
      }
      if (!formData[section as keyof SSKAnchorWindlassAndFWDMooringCapstanData]?.remarks?.trim()) {
        newErrors[`${section}_remarks`] = 'Remarks is required';
      }
    });

    // Chain length and diameter validation
    if (!formData.chainLength.trim()) {
      newErrors.chainLength = 'Chain Length remarks is required';
    }
    if (!formData.chainDiameter.trim()) {
      newErrors.chainDiameter = 'Chain Diameter remarks is required';
    }

    // Any other observation validation
    if (!formData.anyOtherObserv.trim()) {
      newErrors.anyOtherObserv = 'Remarks is required';
    }

    // Overall observations validation
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
        ...prev[parentField as keyof SSKAnchorWindlassAndFWDMooringCapstanData],
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
        foundationWindlass: { observations: '', remarks: '' },
        foundationCapstan: { observations: '', remarks: '' },
        insulationInside: { observations: '', remarks: '' },
        insulationOutside: { observations: '', remarks: '' },
        greasing: { observations: '', remarks: '' },
        greasingPoint: { observations: '', remarks: '' },
        anchorIndicationPlate: { observations: '', remarks: '' },
        chainCounter: { observations: '', remarks: '' },
        chainLength: '',
        chainDiameter: '',
        bitterEnd: { observations: '', remarks: '' },
        payingOut: { observations: '', remarks: '' },
        heavingIn: { observations: '', remarks: '' },
        bandBrakeEngage: { observations: '', remarks: '' },
        bandBrakeDisengage: { observations: '', remarks: '' },
        screwStopperEngage: { observations: '', remarks: '' },
        screwStopperDisengage: { observations: '', remarks: '' },
        clutchEngage: { observations: '', remarks: '' },
        clutchDisengage: { observations: '', remarks: '' },
        warpingDrumEngage: { observations: '', remarks: '' },
        warpingDrumDisengage: { observations: '', remarks: '' },
        driveSounds: { observations: '', remarks: '' },
        anyOtherObserv: '',
        overallObservations: ''
      });
      
      // Clear localStorage draft
      localStorage.removeItem('sskAnchorWindlassAndFWDMooringCapstan_draft');
      
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
      foundationWindlass: { observations: '', remarks: '' },
      foundationCapstan: { observations: '', remarks: '' },
      insulationInside: { observations: '', remarks: '' },
      insulationOutside: { observations: '', remarks: '' },
      greasing: { observations: '', remarks: '' },
      greasingPoint: { observations: '', remarks: '' },
      anchorIndicationPlate: { observations: '', remarks: '' },
      chainCounter: { observations: '', remarks: '' },
      chainLength: '',
      chainDiameter: '',
      bitterEnd: { observations: '', remarks: '' },
      payingOut: { observations: '', remarks: '' },
      heavingIn: { observations: '', remarks: '' },
      bandBrakeEngage: { observations: '', remarks: '' },
      bandBrakeDisengage: { observations: '', remarks: '' },
      screwStopperEngage: { observations: '', remarks: '' },
      screwStopperDisengage: { observations: '', remarks: '' },
      clutchEngage: { observations: '', remarks: '' },
      clutchDisengage: { observations: '', remarks: '' },
      warpingDrumEngage: { observations: '', remarks: '' },
      warpingDrumDisengage: { observations: '', remarks: '' },
      driveSounds: { observations: '', remarks: '' },
      anyOtherObserv: '',
      overallObservations: ''
    });
    setErrors({});
    localStorage.removeItem('sskAnchorWindlassAndFWDMooringCapstan_draft');
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
            value={formData[parentField as keyof SSKAnchorWindlassAndFWDMooringCapstanData]?.observations || ''}
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
            value={formData[parentField as keyof SSKAnchorWindlassAndFWDMooringCapstanData]?.remarks || ''}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ANCHOR WINDLASS AND FWD MOORING CAPSTAN</h2>
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

            {/* Control Panel (Torpedo Room) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">4</span>
                  Control Panel (Torpedo Room)
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

            {/* Conditions of Windlass Foundations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">5</span>
                  Conditions of Windlass Foundations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Corrosion/ Pitting/ Unpainted</h4>
                  <ObservationSection
                    title="Foundation Windlass"
                    parentField="foundationWindlass"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Conditions of Capstan Drum Foundations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">6</span>
                  Conditions of Capstan Drum Foundations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Corrosion/ Pitting/ Unpainted</h4>
                  <ObservationSection
                    title="Foundation Capstan"
                    parentField="foundationCapstan"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Securing of the Capstan Drum */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">7</span>
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
                  <h4 className="font-medium">b) Outside Casing (Harbour Conditions)</h4>
                  <ObservationSection
                    title="Insulation Outside"
                    parentField="insulationOutside"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Greasing of Mechanical Parts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">8</span>
                  Greasing of Mechanical Parts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Proper Greasing of Mechanical Parts</h4>
                  <ObservationSection
                    title="Greasing"
                    parentField="greasing"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Greasing Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">9</span>
                  Greasing Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Condition of Greasing Nipple-Clean/ Painted/ Choked</h4>
                  <ObservationSection
                    title="Greasing Point"
                    parentField="greasingPoint"
                    observationsOptions={greasingObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Flushness of the Anchor with the Submarine Keel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">10</span>
                  Flushness of the Anchor with the Submarine Keel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Check Anchor Indication Plate on Casing</h4>
                  <ObservationSection
                    title="Anchor Indication Plate"
                    parentField="anchorIndicationPlate"
                    observationsOptions={yesNoObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Availability of Indication */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">11</span>
                  Availability of Indication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Chain Counter (Torpedo room)</h4>
                  <ObservationSection
                    title="Chain Counter"
                    parentField="chainCounter"
                    observationsOptions={yesNoObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Chain Length */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">12</span>
                  Chain Length
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) 08 Shackles</h4>
                  <div>
                    <Label htmlFor="chainLength" className="text-sm font-medium">
                      Remarks: <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="chainLength"
                      value={formData.chainLength}
                      onChange={(e) => handleInputChange('chainLength', e.target.value)}
                      rows={2}
                      placeholder="Enter chain length remarks..."
                    />
                    {errors.chainLength && <p className="text-red-500 text-sm mt-1">{errors.chainLength}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chain Diameter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">13</span>
                  Chain Diameter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) 20.5 MM</h4>
                  <div>
                    <Label htmlFor="chainDiameter" className="text-sm font-medium">
                      Remarks: <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="chainDiameter"
                      value={formData.chainDiameter}
                      onChange={(e) => handleInputChange('chainDiameter', e.target.value)}
                      rows={2}
                      placeholder="Enter chain diameter remarks..."
                    />
                    {errors.chainDiameter && <p className="text-red-500 text-sm mt-1">{errors.chainDiameter}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anchor Chain Bitter End Paying Out Release Mechanism */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">14</span>
                  Anchor Chain Bitter End Paying Out Release Mechanism
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Operation of Bitter end Release Mechanism from Torpedo Room</h4>
                  <ObservationSection
                    title="Bitter End"
                    parentField="bitterEnd"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Operational Trails */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">15</span>
                  Operational Trails
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) (Paying Out) Speed 1 - Speed 2</h4>
                  <ObservationSection
                    title="Paying Out"
                    parentField="payingOut"
                    observationsOptions={satObservations}
                  />
                  <br />
                  <h4 className="font-medium">b) (Heaving In) Speed 1 - Speed 2</h4>
                  <ObservationSection
                    title="Heaving In"
                    parentField="heavingIn"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Band Brake Operations (Torpedo Room) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">16</span>
                  Band Brake Operations (Torpedo Room)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Engage</h4>
                  <ObservationSection
                    title="Band Brake Engage"
                    parentField="bandBrakeEngage"
                    observationsOptions={satObservations}
                  />
                  <br />
                  <h4 className="font-medium">b) Disengage</h4>
                  <ObservationSection
                    title="Band Brake Disengage"
                    parentField="bandBrakeDisengage"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Screw Stopper Operations (Torpedo Room) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">17</span>
                  Screw Stopper Operations (Torpedo Room)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Engage</h4>
                  <ObservationSection
                    title="Screw Stopper Engage"
                    parentField="screwStopperEngage"
                    observationsOptions={satObservations}
                  />
                  <br />
                  <h4 className="font-medium">b) Disengage</h4>
                  <ObservationSection
                    title="Screw Stopper Disengage"
                    parentField="screwStopperDisengage"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Clutch Operation (Torpedo Room) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">18</span>
                  Clutch Operation (Torpedo Room)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Engage</h4>
                  <ObservationSection
                    title="Clutch Engage"
                    parentField="clutchEngage"
                    observationsOptions={satObservations}
                  />
                  <br />
                  <h4 className="font-medium">b) Disengage</h4>
                  <ObservationSection
                    title="Clutch Disengage"
                    parentField="clutchDisengage"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Warping Drum Engagement During Anchoring Operation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">19</span>
                  Warping Drum Engagement During Anchoring Operation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Engage</h4>
                  <ObservationSection
                    title="Warping Drum Engage"
                    parentField="warpingDrumEngage"
                    observationsOptions={satObservations}
                  />
                  <br />
                  <h4 className="font-medium">b) Disengage</h4>
                  <ObservationSection
                    title="Warping Drum Disengage"
                    parentField="warpingDrumDisengage"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Drive */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">20</span>
                  Drive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium">a) Check for Abnormal Sounds/ Excessive Noise During Operation</h4>
                  <ObservationSection
                    title="Drive Sounds"
                    parentField="driveSounds"
                    observationsOptions={satObservations}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Any Other Observation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">21</span>
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
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">22</span>
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

export default SSKAnchorWindlassAndFWDMooringCapstanForm;
