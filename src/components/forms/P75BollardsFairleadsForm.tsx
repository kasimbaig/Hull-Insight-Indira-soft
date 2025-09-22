import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface P75BollardsFairleadsFormData {
  // Section 1: Lifting and Lowering of Mooring Telescopic Bollards
  observationsTelescopicBollards: string;
  remarksTelescopicBollards: string;
  
  // Section 2: Fairleads
  observationsFairleads: string;
  remarksFairleads: string;
}

const P75BollardsFairleadsForm: React.FC = () => {
  const [formData, setFormData] = useState<P75BollardsFairleadsFormData>({
    observationsTelescopicBollards: '',
    remarksTelescopicBollards: '',
    observationsFairleads: '',
    remarksFairleads: '',
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
    
    // Telescopic Bollards validation
    if (!formData.observationsTelescopicBollards || formData.observationsTelescopicBollards === '0') {
      newErrors.observationsTelescopicBollards = 'Telescopic Bollards observations is required';
    }
    if (!formData.remarksTelescopicBollards.trim()) {
      newErrors.remarksTelescopicBollards = 'Telescopic Bollards remarks is required';
    }
    
    // Fairleads validation
    if (!formData.observationsFairleads || formData.observationsFairleads === '0') {
      newErrors.observationsFairleads = 'Fairleads observations is required';
    }
    if (!formData.remarksFairleads.trim()) {
      newErrors.remarksFairleads = 'Fairleads remarks is required';
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
        observationsTelescopicBollards: '',
        remarksTelescopicBollards: '',
        observationsFairleads: '',
        remarksFairleads: '',
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
      title: `P-75 Bollards/Fairleads - Draft`,
      data: formData,
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('p75BollardsFairleadsDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('p75BollardsFairleadsDrafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('p75BollardsFairleadsDrafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: any) => {
    setFormData(draft.data);
    setShowDraftModal(false);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('p75BollardsFairleadsDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const clearForm = () => {
    setFormData({
      observationsTelescopicBollards: '',
      remarksTelescopicBollards: '',
      observationsFairleads: '',
      remarksFairleads: '',
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

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">P-75 CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">BOLLARDS / FAIRLEADS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-6">
              {/* Section 1 - Lifting and Lowering of Mooring Telescopic Bollards */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <Label className="text-lg font-medium">Lifting and Lowering of Mooring Telescopic Bollards (16 Nos)</Label>
                  </div>
                </div>
                
                <div className="ml-12 space-y-4">
                  <div className="text-sm font-medium mb-2">
                    <span className="text-red-500">*</span> Fwd - 04 Nos (Telescopic)<br/>
                    <span className="text-red-500">*</span> Aft - 08 Nos (Telescopic)<br/>
                    <span className="text-red-500">*</span> Aft - 04 Nos (Foldable)
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.observationsTelescopicBollards} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, observationsTelescopicBollards: value }))}
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
                      {errors.observationsTelescopicBollards && <p className="text-red-500 text-xs mt-1">{errors.observationsTelescopicBollards}</p>}
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksTelescopicBollards}
                        onChange={(e) => {
                          const value = handleRemarksValidation(e.target.value);
                          setFormData(prev => ({ ...prev, remarksTelescopicBollards: value }));
                        }}
                        rows={2}
                        className="mt-1"
                        placeholder="Enter remarks"
                      />
                      {errors.remarksTelescopicBollards && <p className="text-red-500 text-xs mt-1">{errors.remarksTelescopicBollards}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 - Fairleads */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <Label className="text-lg font-medium">Fairleads (16 Nos)</Label>
                  </div>
                </div>
                
                <div className="ml-12 space-y-4">
                  <div className="text-sm font-medium mb-2">
                    <span className="text-red-500">*</span> Fwd - 03 Nos (Foldable)<br/>
                    <span className="text-red-500">*</span> Aft - 03 Nos (Foldable)
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-48">
                      <Label className="text-sm">Observations:<span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.observationsFairleads} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, observationsFairleads: value }))}
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
                      {errors.observationsFairleads && <p className="text-red-500 text-xs mt-1">{errors.observationsFairleads}</p>}
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksFairleads}
                        onChange={(e) => {
                          const value = handleRemarksValidation(e.target.value);
                          setFormData(prev => ({ ...prev, remarksFairleads: value }));
                        }}
                        rows={2}
                        className="mt-1"
                        placeholder="Enter remarks"
                      />
                      {errors.remarksFairleads && <p className="text-red-500 text-xs mt-1">{errors.remarksFairleads}</p>}
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

export default P75BollardsFairleadsForm;