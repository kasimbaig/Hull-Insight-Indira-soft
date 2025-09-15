import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Save, FileText, Trash2, Edit } from 'lucide-react';

interface SSKTowingArrangementsData {
  functionalChecksObservations: string;
  functionalChecksRemarks: string;
}

interface FormErrors {
  [key: string]: string;
}

interface DraftData {
  id: string;
  title: string;
  data: SSKTowingArrangementsData;
  timestamp: string;
}

const SSKTowingArrangementsForm: React.FC = () => {
  const [formData, setFormData] = useState<SSKTowingArrangementsData>({
    functionalChecksObservations: '',
    functionalChecksRemarks: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string>('');

  const observationsOptions = [
    { value: '0', label: '--Select--' },
    { value: 'SAT', label: 'SAT' },
    { value: 'UNSAT', label: 'UNSAT' },
    { value: 'SATWITHOBSERVATION', label: 'SAT WITH OBSERVATION' },
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('ssk-towing-arrangements-draft');
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
      localStorage.setItem('ssk-towing-arrangements-draft', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof SSKTowingArrangementsData, value: string) => {
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Functional Checks validation
    if (!formData.functionalChecksObservations || formData.functionalChecksObservations === '0') {
      newErrors.functionalChecksObservations = 'Please select Functional Checks of Tripping of the Towing Hook Mechanism observations';
    }
    if (!formData.functionalChecksRemarks.trim()) {
      newErrors.functionalChecksRemarks = 'Please enter Functional Checks of Tripping of the Towing Hook Mechanism remarks';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      localStorage.removeItem('ssk-towing-arrangements-draft');
      
      alert('Form submitted successfully!');
      setFormData({
        functionalChecksObservations: '',
        functionalChecksRemarks: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    if (!formData.functionalChecksObservations || formData.functionalChecksObservations === '0') {
      alert('Please select Functional Checks of Tripping of the Towing Hook Mechanism observations before saving draft');
      return;
    }

    const draftData: DraftData = {
      id: Date.now().toString(),
      title: `SSK Towing Arrangements - ${formData.functionalChecksObservations}`,
      data: { ...formData },
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('ssk-towing-arrangements-drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('ssk-towing-arrangements-drafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('ssk-towing-arrangements-drafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: DraftData) => {
    setFormData(draft.data);
    setSelectedDraftId(draft.id);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('ssk-towing-arrangements-drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      functionalChecksObservations: '',
      functionalChecksRemarks: '',
    });
    setErrors({});
    setSelectedDraftId('');
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

    return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-pink-600 mb-2">SSK CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">TOWING ARRANGEMENTS</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Functional Checks Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <Label className="text-lg font-semibold">
                    Functional Checks of Tripping of the Towing Hook Mechanism
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">
                      Observations: <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.functionalChecksObservations}
                      onValueChange={(value) => handleInputChange('functionalChecksObservations', value)}
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
                    {errors.functionalChecksObservations && (
                      <p className="text-red-500 text-sm mt-1">{errors.functionalChecksObservations}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">
                      Remarks: <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={formData.functionalChecksRemarks}
                      onChange={(e) => {
                        const value = handleRemarksValidation(e.target.value);
                        handleInputChange('functionalChecksRemarks', value);
                      }}
                      placeholder="Enter remarks"
                      rows={2}
                      className="resize-none"
                    />
                    {errors.functionalChecksRemarks && (
                      <p className="text-red-500 text-sm mt-1">{errors.functionalChecksRemarks}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  type="button"
                  onClick={loadDrafts}
                  variant="outline"
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Fetch Drafts
                </Button>

                <Button
                  type="button"
                  onClick={saveDraft}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>

                <Button
                  type="button"
                  onClick={clearForm}
                  variant="destructive"
                  className="flex-1"
                >
                  Clear
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={showDraftModal} onOpenChange={setShowDraftModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No drafts found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Functional Checks of Tripping of the Towing Hook Mechanism</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.data.functionalChecksObservations || 'No Inspection Data'}</TableCell>
                      <TableCell>{formatDate(draft.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => loadDraft(draft)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Fetch Data
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteDraft(draft.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
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

export default SSKTowingArrangementsForm;
