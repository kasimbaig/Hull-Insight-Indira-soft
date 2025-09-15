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

interface SSKBollardsCleatBullRingData {
  mooringRetractableBollards: {
    observations: string;
    remarks: string;
  };
  liftingLoweringBullRing: {
    observations: string;
    remarks: string;
  };
  cleatsOnRescueSphere: {
    observations: string;
    remarks: string;
  };
}

const SSKBollardsCleatBullRingForm: React.FC = () => {
  const [formData, setFormData] = useState<SSKBollardsCleatBullRingData>({
    mooringRetractableBollards: { observations: '', remarks: '' },
    liftingLoweringBullRing: { observations: '', remarks: '' },
    cleatsOnRescueSphere: { observations: '', remarks: '' }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Options for observation types
  const satObservations = [
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('sskBollardsCleatBullRing_draft');
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
      localStorage.setItem('sskBollardsCleatBullRing_draft', JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate all observation sections
    const observationSections = [
      'mooringRetractableBollards', 'liftingLoweringBullRing', 'cleatsOnRescueSphere'
    ];

    observationSections.forEach(section => {
      if (!formData[section as keyof SSKBollardsCleatBullRingData]?.observations) {
        newErrors[`${section}_observations`] = 'Observations is required';
      }
      if (!formData[section as keyof SSKBollardsCleatBullRingData]?.remarks?.trim()) {
        newErrors[`${section}_remarks`] = 'Remarks is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNestedInputChange = (parentField: string, childField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof SSKBollardsCleatBullRingData],
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
        mooringRetractableBollards: { observations: '', remarks: '' },
        liftingLoweringBullRing: { observations: '', remarks: '' },
        cleatsOnRescueSphere: { observations: '', remarks: '' }
      });
      
      // Clear localStorage draft
      localStorage.removeItem('sskBollardsCleatBullRing_draft');
      
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
      mooringRetractableBollards: { observations: '', remarks: '' },
      liftingLoweringBullRing: { observations: '', remarks: '' },
      cleatsOnRescueSphere: { observations: '', remarks: '' }
    });
    setErrors({});
    localStorage.removeItem('sskBollardsCleatBullRing_draft');
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
            value={formData[parentField as keyof SSKBollardsCleatBullRingData]?.observations || ''}
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
            value={formData[parentField as keyof SSKBollardsCleatBullRingData]?.remarks || ''}
            onChange={(e) => handleNestedInputChange(parentField, 'remarks', e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
            rows={2}
            placeholder="Enter remarks..."
            maxLength={1000}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">BOLLARDS / CLEAT / BULL RING</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lifting and Lowering of Mooring Retractable Bollards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">1</span>
                  Lifting and Lowering of Mooring Retractable Bollards (6 Pairs)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ObservationSection
                  title="Mooring Retractable Bollards"
                  parentField="mooringRetractableBollards"
                  observationsOptions={satObservations}
                />
              </CardContent>
            </Card>

            {/* Lifting and Lowering (Bull Ring) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">2</span>
                  Lifting and Lowering (Bull Ring) (2 Nos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ObservationSection
                  title="Lifting Lowering Bull Ring"
                  parentField="liftingLoweringBullRing"
                  observationsOptions={satObservations}
                />
              </CardContent>
            </Card>

            {/* Conditions of Cleats on Rescue Sphere */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-2">3</span>
                  Conditions of Cleats on Rescue Sphere (4 nos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ObservationSection
                  title="Cleats On Rescue Sphere"
                  parentField="cleatsOnRescueSphere"
                  observationsOptions={satObservations}
                />
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

export default SSKBollardsCleatBullRingForm;
