import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface ManualHoistingFormData {
  ship: string;
  documentNo: string;
  dateOfInspection: Date | null;
  location: string;
  authority: string;
  inspectionDetails: {
    serialNo: string;
    item: string;
    location: string;
    condition: string;
    remarks: string;
  }[];
  recommendations: string;
  authoritySignature: File | null;
  authorityName: string;
  authorityRank: string;
  authorityDate: Date | null;
}

const ManualHoistingLiftingAndTransportingDevicesInMagazinesForm: React.FC = () => {
  const [formData, setFormData] = useState<ManualHoistingFormData>({
    ship: '',
    documentNo: '',
    dateOfInspection: null,
    location: '',
    authority: '',
    inspectionDetails: [
      {
        serialNo: 'A',
        item: '',
        location: '',
        condition: '',
        remarks: ''
      }
    ],
    recommendations: '',
    authoritySignature: null,
    authorityName: '',
    authorityRank: '',
    authorityDate: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<any>(null);

  const ships = [
    { value: '43', label: 'SHIVALIK' },
    { value: '84', label: 'JAMUNA' },
    { value: '23', label: 'BANGARAM' },
    { value: '56', label: 'TARANGINI' },
    { value: '99', label: 'SARYU' },
    { value: '31', label: 'KUMBHIR' },
    { value: '87', label: 'T-83' },
    { value: '27', label: 'AIRAVAT' },
    { value: '48', label: 'KHANJAR' },
    { value: '57', label: 'SHUDERSHINI' },
    { value: '59', label: 'TRISHUL' },
    { value: '62', label: 'TEG' },
    { value: '55', label: 'RANVIJAY' },
    { value: '47', label: 'KIRPAN' },
    { value: '35', label: 'DELHI' },
    { value: '83', label: 'SURVEKSHAK' },
    { value: '65', label: 'JYOTI' },
    { value: '94', label: 'SUJATA' },
    { value: '76', label: 'KABRA' },
    { value: '68', label: 'CANKARSO' },
    { value: '88', label: 'T-84' },
    { value: '18', label: 'VIBHUTI' },
    { value: '17', label: 'NISHANK' },
    { value: '25', label: 'MAGAR' },
    { value: '42', label: 'BEAS' },
    { value: '90', label: 'SUVERNA' },
    { value: '45', label: 'SAHYADRI' },
    { value: '16', label: 'PRALAYA' },
    { value: '74', label: 'CHERIYAM' },
    { value: '44', label: 'SATPURA' },
    { value: '20', label: 'JALASHWA' },
    { value: '63', label: 'TARKASH' },
    { value: '52', label: 'KARMUK' },
    { value: '82', label: 'SUTLEJ' },
    { value: '96', label: 'SUMEDHA' },
    { value: '15', label: 'PRABAL' },
    { value: '75', label: 'CORA DIVH' },
    { value: '21', label: 'BATTIMALV' },
    { value: '38', label: 'CHENNAI' },
    { value: '97', label: 'SUMITRA' },
    { value: '86', label: 'T-82' },
    { value: '46', label: 'KUTHAR' },
    { value: '69', label: 'KONDUL' },
    { value: '89', label: 'SUBHDRA' },
    { value: '80', label: 'DARSHAK' }
  ];

  const generateSerialNumber = (index: number): string => {
    if (index < 26) {
      return String.fromCharCode(65 + index); // A, B, C, etc.
    } else {
      const firstLetter = String.fromCharCode(65 + Math.floor(index / 26) - 1);
      const secondLetter = String.fromCharCode(65 + (index % 26));
      return firstLetter + secondLetter;
    }
  };

  const addInspectionDetail = () => {
    const newIndex = formData.inspectionDetails.length;
    const newSerialNo = generateSerialNumber(newIndex);
    
    setFormData(prev => ({
      ...prev,
      inspectionDetails: [
        ...prev.inspectionDetails,
        {
          serialNo: newSerialNo,
          item: '',
          location: '',
          condition: '',
          remarks: ''
        }
      ]
    }));
  };

  const removeInspectionDetail = (index: number) => {
    if (formData.inspectionDetails.length > 1) {
      setFormData(prev => ({
        ...prev,
        inspectionDetails: prev.inspectionDetails.filter((_, i) => i !== index)
      }));
    }
  };

  const updateInspectionDetail = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      inspectionDetails: prev.inspectionDetails.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.ship) newErrors.ship = 'Ship selection is required';
    if (!formData.documentNo) newErrors.documentNo = 'Document No. is required';
    if (!formData.dateOfInspection) newErrors.dateOfInspection = 'Date of Inspection is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.authority) newErrors.authority = 'Authority is required';
    if (!formData.authorityName) newErrors.authorityName = 'Authority Name is required';
    if (!formData.authorityRank) newErrors.authorityRank = 'Authority Rank is required';
    if (!formData.authorityDate) newErrors.authorityDate = 'Authority Date is required';

    // Validate inspection details
    formData.inspectionDetails.forEach((detail, index) => {
      if (!detail.item) newErrors[`item_${index}`] = 'Item is required';
      if (!detail.location) newErrors[`location_${index}`] = 'Location is required';
      if (!detail.condition) newErrors[`condition_${index}`] = 'Condition is required';
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
      
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        ship: '',
        documentNo: '',
        dateOfInspection: null,
        location: '',
        authority: '',
        inspectionDetails: [
          {
            serialNo: 'A',
            item: '',
            location: '',
            condition: '',
            remarks: ''
          }
        ],
        recommendations: '',
        authoritySignature: null,
        authorityName: '',
        authorityRank: '',
        authorityDate: null
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
      title: `Manual Hoisting Form - ${formData.ship ? ships.find(s => s.value === formData.ship)?.label : 'Draft'}`,
      data: formData,
      timestamp: new Date().toISOString()
    };

    const existingDrafts = JSON.parse(localStorage.getItem('manualHoistingDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('manualHoistingDrafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const loadDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('manualHoistingDrafts') || '[]');
    setDrafts(existingDrafts);
    setShowDraftModal(true);
  };

  const loadDraft = (draft: any) => {
    setFormData(draft.data);
    setShowDraftModal(false);
    setSelectedDraft(draft);
  };

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('manualHoistingDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            <u>MANUAL HOISTING LIFITING AND TRANSPORTING DEVICES IN MAGAZINES</u>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">1</span>
                <div className="section-header-inner">
                  <Label htmlFor="ship">Ship</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-3">
                    <Select value={formData.ship} onValueChange={(value) => setFormData(prev => ({ ...prev, ship: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {ships.map(ship => (
                          <SelectItem key={ship.value} value={ship.value}>
                            {ship.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Document No. */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">2</span>
                <div className="section-header-inner">
                  <Label htmlFor="documentNo">Document No.</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      id="documentNo"
                      value={formData.documentNo}
                      onChange={(e) => setFormData(prev => ({ ...prev, documentNo: e.target.value }))}
                      placeholder="Enter Document No."
                    />
                    {errors.documentNo && <p className="text-red-500 text-sm mt-1">{errors.documentNo}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Date and Location of Inspection */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">3</span>
                <div className="section-header-inner">
                  <Label>Date and Location of Inspection</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-3">
                    <Label htmlFor="dateOfInspection">Date of Inspection</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfInspection ? format(formData.dateOfInspection, 'dd-MM-yyyy') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfInspection || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, dateOfInspection: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dateOfInspection && <p className="text-red-500 text-sm mt-1">{errors.dateOfInspection}</p>}
                  </div>
                  <div className="col-md-3">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Authority */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">4</span>
                <div className="section-header-inner">
                  <Label htmlFor="authority">Authority</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      id="authority"
                      value={formData.authority}
                      onChange={(e) => setFormData(prev => ({ ...prev, authority: e.target.value }))}
                      placeholder="Enter authority"
                    />
                    {errors.authority && <p className="text-red-500 text-sm mt-1">{errors.authority}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Inspection Details */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">5</span>
                <div className="section-header-inner">
                  <Label>Inspection Details</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="table-responsive">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Serial No.</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Remarks</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.inspectionDetails.map((detail, index) => (
                        <TableRow key={index}>
                          <TableCell>{detail.serialNo}</TableCell>
                          <TableCell>
                            <Input
                              value={detail.item}
                              onChange={(e) => updateInspectionDetail(index, 'item', e.target.value)}
                              placeholder="Enter item"
                            />
                            {errors[`item_${index}`] && <p className="text-red-500 text-xs">{errors[`item_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={detail.location}
                              onChange={(e) => updateInspectionDetail(index, 'location', e.target.value)}
                              placeholder="Enter location"
                            />
                            {errors[`location_${index}`] && <p className="text-red-500 text-xs">{errors[`location_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={detail.condition}
                              onChange={(e) => updateInspectionDetail(index, 'condition', e.target.value)}
                              placeholder="Enter condition"
                            />
                            {errors[`condition_${index}`] && <p className="text-red-500 text-xs">{errors[`condition_${index}`]}</p>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={detail.remarks}
                              onChange={(e) => updateInspectionDetail(index, 'remarks', e.target.value)}
                              placeholder="Enter remarks"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeInspectionDetail(index)}
                              disabled={formData.inspectionDetails.length === 1}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <Button type="button" onClick={addInspectionDetail} variant="outline">
                    Add Row
                  </Button>
                </div>
              </div>
            </div>

            {/* Section 6: Recommendations */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">6</span>
                <div className="section-header-inner">
                  <Label htmlFor="recommendations">Recommendations</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-12">
                    <Textarea
                      id="recommendations"
                      value={formData.recommendations}
                      onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                      placeholder="Enter recommendations"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Authority Signature */}
            <div className="section-box">
              <div className="section-header">
                <span className="label-number">7</span>
                <div className="section-header-inner">
                  <Label>Authority Signature</Label>
                </div>
              </div>
              <div className="section-content">
                <div className="row">
                  <div className="col-md-4">
                    <Label htmlFor="authorityName">Name</Label>
                    <Input
                      id="authorityName"
                      value={formData.authorityName}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorityName: e.target.value }))}
                      placeholder="Enter name"
                    />
                    {errors.authorityName && <p className="text-red-500 text-sm mt-1">{errors.authorityName}</p>}
                  </div>
                  <div className="col-md-4">
                    <Label htmlFor="authorityRank">Rank</Label>
                    <Input
                      id="authorityRank"
                      value={formData.authorityRank}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorityRank: e.target.value }))}
                      placeholder="Enter rank"
                    />
                    {errors.authorityRank && <p className="text-red-500 text-sm mt-1">{errors.authorityRank}</p>}
                  </div>
                  <div className="col-md-4">
                    <Label htmlFor="authorityDate">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.authorityDate ? format(formData.authorityDate, 'dd-MM-yyyy') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.authorityDate || undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, authorityDate: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.authorityDate && <p className="text-red-500 text-sm mt-1">{errors.authorityDate}</p>}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <Label htmlFor="authoritySignature">Signature Upload</Label>
                    <Input
                      id="authoritySignature"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData(prev => ({ ...prev, authoritySignature: e.target.files?.[0] || null }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button type="button" onClick={saveDraft} variant="outline">
                Save Draft
              </Button>
              <Button type="button" onClick={loadDrafts} variant="outline">
                Load Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Draft Modal */}
      <Dialog open={showDraftModal} onOpenChange={setShowDraftModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Saved Drafts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500">No drafts found</p>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{draft.title}</h3>
                      <p className="text-sm text-gray-500">
                        Saved on: {new Date(draft.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => loadDraft(draft)}
                      >
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteDraft(draft.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManualHoistingLiftingAndTransportingDevicesInMagazinesForm;
