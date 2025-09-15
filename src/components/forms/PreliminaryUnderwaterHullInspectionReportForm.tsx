import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Inspector {
  id: string;
  inspectorName: string;
  inspectorRank: string;
  inspectorDesignation: string;
}

interface Observation {
  id: string;
  srNo: string;
  observation: string;
}

interface Remark {
  id: string;
  srNo: string;
  remark: string;
}

interface PreliminaryUnderwaterHullInspectionReportFormData {
  // Header Fields
  preInspection: string;
  dtInspection: string;
  authInspection: string;
  
  // HITU's Inspectors
  inspectors: Inspector[];
  
  // DOCKING Section
  dockingVersion: string;
  natureDocking: string;
  noDockBlocksWedged: string;
  noDockBlocksExcessCrush: string;
  uwOpeningClear: string;
  durationOfDocking: string;
  
  // UNDERWATER CLEANING Section
  underwaterCleaningObservations: Observation[];
  underwaterCleaningRemarks: Remark[];
  
  // PAINTING Section
  paintingObservations: Observation[];
  paintingRemarks: Remark[];
  
  // RUSTING & CORROSION Section
  rustingCorrosionObservations: Observation[];
  rustingCorrosionRemarks: Remark[];
  
  // STRUCTURE Section
  structureObservations: Observation[];
  structureRemarks: Remark[];
  
  // SONAR DOME Section
  sonarDomeObservations: Observation[];
  sonarDomeRemarks: Remark[];
  
  // RUDDER Section
  rudderObservations: Observation[];
  rudderRemarks: Remark[];
  
  // CATHODIC PROTECTION SYSTEM Section
  cathodicProtectionObservations: Observation[];
  cathodicProtectionRemarks: Remark[];
  
  // PROPELLERS Section
  propellersObservations: Observation[];
  propellersRemarks: Remark[];
  
  // MISCELLANEOUS Section
  miscellaneousObservations: Observation[];
  miscellaneousRemarks: Remark[];
  
  // Other observations
  otherObservations: string;
  
  // Signatures
  signShipStaff: File | null;
  signRefittingAuth: File | null;
  signHituInspector: File | null;
  
  // Signature Details
  shipStaffName: string;
  shipStaffRank: string;
  shipStaffDesignation: string;
  refittingAuthName: string;
  refittingAuthRank: string;
  refittingAuthDesignation: string;
  hituInspectorName: string;
  hituInspectorRank: string;
  hituInspectorDesignation: string;
}

const PreliminaryUnderwaterHullInspectionReportForm = () => {
  const [formData, setFormData] = useState<PreliminaryUnderwaterHullInspectionReportFormData>({
    preInspection: "",
    dtInspection: "",
    authInspection: "",
    inspectors: [],
    dockingVersion: "",
    natureDocking: "",
    noDockBlocksWedged: "",
    noDockBlocksExcessCrush: "",
    uwOpeningClear: "",
    durationOfDocking: "",
    underwaterCleaningObservations: [],
    underwaterCleaningRemarks: [],
    paintingObservations: [],
    paintingRemarks: [],
    rustingCorrosionObservations: [],
    rustingCorrosionRemarks: [],
    structureObservations: [],
    structureRemarks: [],
    sonarDomeObservations: [],
    sonarDomeRemarks: [],
    rudderObservations: [],
    rudderRemarks: [],
    cathodicProtectionObservations: [],
    cathodicProtectionRemarks: [],
    propellersObservations: [],
    propellersRemarks: [],
    miscellaneousObservations: [],
    miscellaneousRemarks: [],
    otherObservations: "",
    signShipStaff: null,
    signRefittingAuth: null,
    signHituInspector: null,
    shipStaffName: "",
    shipStaffRank: "",
    shipStaffDesignation: "",
    refittingAuthName: "",
    refittingAuthRank: "",
    refittingAuthDesignation: "",
    hituInspectorName: "",
    hituInspectorRank: "",
    hituInspectorDesignation: "",
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  const handleInputChange = (field: keyof PreliminaryUnderwaterHullInspectionReportFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Inspector Functions
  const handleAddInspector = () => {
    const newInspector: Inspector = {
      id: Date.now().toString(),
      inspectorName: "",
      inspectorRank: "",
      inspectorDesignation: ""
    };
    setFormData(prev => ({
      ...prev,
      inspectors: [...prev.inspectors, newInspector]
    }));
  };

  const handleRemoveInspector = (id: string) => {
    setFormData(prev => ({
      ...prev,
      inspectors: prev.inspectors.filter(inspector => inspector.id !== id)
    }));
  };

  const handleUpdateInspector = (id: string, field: keyof Inspector, value: string) => {
    setFormData(prev => ({
      ...prev,
      inspectors: prev.inspectors.map(inspector =>
        inspector.id === id ? { ...inspector, [field]: value } : inspector
      )
    }));
  };

  // Generic functions for observations and remarks
  const createObservationHandlers = (section: string) => {
    const observationsKey = `${section}Observations` as keyof PreliminaryUnderwaterHullInspectionReportFormData;
    const remarksKey = `${section}Remarks` as keyof PreliminaryUnderwaterHullInspectionReportFormData;

    const handleAddObservation = () => {
      const newObservation: Observation = {
        id: Date.now().toString(),
        srNo: "",
        observation: ""
      };
      setFormData(prev => ({
        ...prev,
        [observationsKey]: [...(prev[observationsKey] as Observation[]), newObservation]
      }));
    };

    const handleRemoveObservation = (id: string) => {
      setFormData(prev => ({
        ...prev,
        [observationsKey]: (prev[observationsKey] as Observation[]).filter(obs => obs.id !== id)
      }));
    };

    const handleUpdateObservation = (id: string, field: keyof Observation, value: string) => {
      setFormData(prev => ({
        ...prev,
        [observationsKey]: (prev[observationsKey] as Observation[]).map(obs =>
          obs.id === id ? { ...obs, [field]: value } : obs
        )
      }));
    };

    const handleAddRemark = () => {
      const newRemark: Remark = {
        id: Date.now().toString(),
        srNo: "",
        remark: ""
      };
      setFormData(prev => ({
        ...prev,
        [remarksKey]: [...(prev[remarksKey] as Remark[]), newRemark]
      }));
    };

    const handleRemoveRemark = (id: string) => {
      setFormData(prev => ({
        ...prev,
        [remarksKey]: (prev[remarksKey] as Remark[]).filter(remark => remark.id !== id)
      }));
    };

    const handleUpdateRemark = (id: string, field: keyof Remark, value: string) => {
      setFormData(prev => ({
        ...prev,
        [remarksKey]: (prev[remarksKey] as Remark[]).map(remark =>
          remark.id === id ? { ...remark, [field]: value } : remark
        )
      }));
    };

    return {
      handleAddObservation,
      handleRemoveObservation,
      handleUpdateObservation,
      handleAddRemark,
      handleRemoveRemark,
      handleUpdateRemark
    };
  };

  const underwaterCleaningHandlers = createObservationHandlers('underwaterCleaning');
  const paintingHandlers = createObservationHandlers('painting');
  const rustingCorrosionHandlers = createObservationHandlers('rustingCorrosion');
  const structureHandlers = createObservationHandlers('structure');
  const sonarDomeHandlers = createObservationHandlers('sonarDome');
  const rudderHandlers = createObservationHandlers('rudder');
  const cathodicProtectionHandlers = createObservationHandlers('cathodicProtection');
  const propellersHandlers = createObservationHandlers('propellers');
  const miscellaneousHandlers = createObservationHandlers('miscellaneous');

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData }
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('preliminaryUnderwaterHullInspectionDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('preliminaryUnderwaterHullInspectionDrafts', JSON.stringify(updatedDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('preliminaryUnderwaterHullInspectionDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('preliminaryUnderwaterHullInspectionDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('preliminaryUnderwaterHullInspectionDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      preInspection: "",
      dtInspection: "",
      authInspection: "",
      inspectors: [],
      dockingVersion: "",
      natureDocking: "",
      noDockBlocksWedged: "",
      noDockBlocksExcessCrush: "",
      uwOpeningClear: "",
      durationOfDocking: "",
      underwaterCleaningObservations: [],
      underwaterCleaningRemarks: [],
      paintingObservations: [],
      paintingRemarks: [],
      rustingCorrosionObservations: [],
      rustingCorrosionRemarks: [],
      structureObservations: [],
      structureRemarks: [],
      sonarDomeObservations: [],
      sonarDomeRemarks: [],
      rudderObservations: [],
      rudderRemarks: [],
      cathodicProtectionObservations: [],
      cathodicProtectionRemarks: [],
      propellersObservations: [],
      propellersRemarks: [],
      miscellaneousObservations: [],
      miscellaneousRemarks: [],
      otherObservations: "",
      signShipStaff: null,
      signRefittingAuth: null,
      signHituInspector: null,
      shipStaffName: "",
      shipStaffRank: "",
      shipStaffDesignation: "",
      refittingAuthName: "",
      refittingAuthRank: "",
      refittingAuthDesignation: "",
      hituInspectorName: "",
      hituInspectorRank: "",
      hituInspectorDesignation: "",
    });
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = [
      'preInspection', 'dtInspection', 'authInspection'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof PreliminaryUnderwaterHullInspectionReportFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Validate date format
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(formData.dtInspection)) {
      alert('Please enter date in DD-MM-YYYY format');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const renderObservationTable = (
    observations: Observation[],
    remarks: Remark[],
    sectionName: string,
    handlers: any
  ) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-md font-medium mb-4 text-gray-800">Observation*</h4>
        <div className="flex items-center gap-2 mb-2">
          <Label className="text-sm">Enter Total Number of Rows.</Label>
          <Input
            type="number"
            value={observations.length}
            onChange={(e) => {
              const count = parseInt(e.target.value) || 0;
              if (count > observations.length) {
                for (let i = observations.length; i < count; i++) {
                  handlers.handleAddObservation();
                }
              } else if (count < observations.length) {
                const toRemove = observations.slice(count);
                toRemove.forEach(obs => handlers.handleRemoveObservation(obs.id));
              }
            }}
            className="w-20"
          />
        </div>
        {observations.length > 0 && (
          <div className="overflow-x-auto">
            <Table className="border border-gray-300">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                  <TableHead className="border border-gray-300 text-center font-medium">Observation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {observations.map((obs, index) => (
                  <TableRow key={obs.id}>
                    <TableCell className="border border-gray-300 p-2">
                      <Input
                        value={obs.srNo}
                        onChange={(e) => handlers.handleUpdateObservation(obs.id, 'srNo', e.target.value)}
                        placeholder={`(${String.fromCharCode(97 + index)})`}
                        className="border-0 p-1"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      <Input
                        value={obs.observation}
                        onChange={(e) => handlers.handleUpdateObservation(obs.id, 'observation', e.target.value)}
                        placeholder="Enter observation"
                        className="border-0 p-1"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-md font-medium mb-4 text-gray-800">Remarks*</h4>
        <div className="flex items-center gap-2 mb-2">
          <Label className="text-sm">Enter Total Number of Rows.</Label>
          <Input
            type="number"
            value={remarks.length}
            onChange={(e) => {
              const count = parseInt(e.target.value) || 0;
              if (count > remarks.length) {
                for (let i = remarks.length; i < count; i++) {
                  handlers.handleAddRemark();
                }
              } else if (count < remarks.length) {
                const toRemove = remarks.slice(count);
                toRemove.forEach(remark => handlers.handleRemoveRemark(remark.id));
              }
            }}
            className="w-20"
          />
        </div>
        {remarks.length > 0 && (
          <div className="overflow-x-auto">
            <Table className="border border-gray-300">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                  <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {remarks.map((remark, index) => (
                  <TableRow key={remark.id}>
                    <TableCell className="border border-gray-300 p-2">
                      <Input
                        value={remark.srNo}
                        onChange={(e) => handlers.handleUpdateRemark(remark.id, 'srNo', e.target.value)}
                        placeholder={`(${String.fromCharCode(97 + index)})`}
                        className="border-0 p-1"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 p-2">
                      <Input
                        value={remark.remark}
                        onChange={(e) => handlers.handleUpdateRemark(remark.id, 'remark', e.target.value)}
                        placeholder="Enter remarks"
                        className="border-0 p-1"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDA2NkZGIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SFVMTCBJbnNpZ2h0PC90ZXh0Pgo8L3N2Zz4K" 
              alt="Hull Insight Logo" 
              className="h-16 w-16"
            />
          </div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">HULL INSIGHT</h4>
          <h2 className="text-2xl font-bold text-gray-900">PRELIMINARY UNDERWATER HULL INSPECTION REPORT</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <Label htmlFor="preInspection" className="text-sm font-medium">INS name: *</Label>
              <Select value={formData.preInspection} onValueChange={(value) => handleInputChange('preInspection', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                  <SelectItem value="pre-docking">Pre-docking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dtInspection" className="text-sm font-medium">Date of Inspection: *</Label>
              <Input
                id="dtInspection"
                value={formData.dtInspection}
                onChange={(e) => handleInputChange('dtInspection', e.target.value)}
                placeholder="DD-MM-YYYY"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="authInspection" className="text-sm font-medium">Authority for Inspection: *</Label>
              <Input
                id="authInspection"
                value={formData.authInspection}
                onChange={(e) => handleInputChange('authInspection', e.target.value)}
                placeholder="Enter authority"
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* HITU's Inspectors */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">HITU's Inspectors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm">Enter Total Number of Rows.</Label>
                <Input
                  type="number"
                  value={formData.inspectors.length}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 0;
                    if (count > formData.inspectors.length) {
                      for (let i = formData.inspectors.length; i < count; i++) {
                        handleAddInspector();
                      }
                    } else if (count < formData.inspectors.length) {
                      const toRemove = formData.inspectors.slice(count);
                      toRemove.forEach(inspector => handleRemoveInspector(inspector.id));
                    }
                  }}
                  className="w-20"
                />
              </div>
              {formData.inspectors.length > 0 && (
                <div className="overflow-x-auto">
                  <Table className="border border-gray-300">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="border border-gray-300 text-center font-medium">Inspector Name</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Inspector Rank</TableHead>
                        <TableHead className="border border-gray-300 text-center font-medium">Inspector Designation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.inspectors.map((inspector) => (
                        <TableRow key={inspector.id}>
                          <TableCell className="border border-gray-300 p-2">
                            <Input
                              value={inspector.inspectorName}
                              onChange={(e) => handleUpdateInspector(inspector.id, 'inspectorName', e.target.value)}
                              placeholder="Enter inspector name"
                              className="border-0 p-1"
                            />
                          </TableCell>
                          <TableCell className="border border-gray-300 p-2">
                            <Input
                              value={inspector.inspectorRank}
                              onChange={(e) => handleUpdateInspector(inspector.id, 'inspectorRank', e.target.value)}
                              placeholder="Enter inspector rank"
                              className="border-0 p-1"
                            />
                          </TableCell>
                          <TableCell className="border border-gray-300 p-2">
                            <Input
                              value={inspector.inspectorDesignation}
                              onChange={(e) => handleUpdateInspector(inspector.id, 'inspectorDesignation', e.target.value)}
                              placeholder="Enter inspector designation"
                              className="border-0 p-1"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* DOCKING Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">DOCKING</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dockingVersion" className="text-sm font-medium">Docking Version: *</Label>
                  <Select value={formData.dockingVersion} onValueChange={(value) => handleInputChange('dockingVersion', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry-dock">Dry Dock</SelectItem>
                      <SelectItem value="floating-dock">Floating Dock</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="natureDocking" className="text-sm font-medium">Nature of Docking: *</Label>
                  <Input
                    id="natureDocking"
                    value={formData.natureDocking}
                    onChange={(e) => handleInputChange('natureDocking', e.target.value)}
                    placeholder="Enter nature of docking"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="noDockBlocksWedged" className="text-sm font-medium">No. of Dock Blocks Wedged: *</Label>
                  <Input
                    id="noDockBlocksWedged"
                    value={formData.noDockBlocksWedged}
                    onChange={(e) => handleInputChange('noDockBlocksWedged', e.target.value)}
                    placeholder="Enter number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="noDockBlocksExcessCrush" className="text-sm font-medium">No. of Dock Blocks Excess Crush: *</Label>
                  <Input
                    id="noDockBlocksExcessCrush"
                    value={formData.noDockBlocksExcessCrush}
                    onChange={(e) => handleInputChange('noDockBlocksExcessCrush', e.target.value)}
                    placeholder="Enter number"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="uwOpeningClear" className="text-sm font-medium">U/W Opening Clear: *</Label>
                  <Select value={formData.uwOpeningClear} onValueChange={(value) => handleInputChange('uwOpeningClear', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="durationOfDocking" className="text-sm font-medium">Duration of Docking: *</Label>
                  <Input
                    id="durationOfDocking"
                    value={formData.durationOfDocking}
                    onChange={(e) => handleInputChange('durationOfDocking', e.target.value)}
                    placeholder="Enter duration"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* UNDERWATER CLEANING Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">UNDERWATER CLEANING</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.underwaterCleaningObservations,
                formData.underwaterCleaningRemarks,
                'underwaterCleaning',
                underwaterCleaningHandlers
              )}
            </CardContent>
          </Card>

          {/* PAINTING Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">PAINTING</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.paintingObservations,
                formData.paintingRemarks,
                'painting',
                paintingHandlers
              )}
            </CardContent>
          </Card>

          {/* RUSTING & CORROSION Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">RUSTING & CORROSION</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.rustingCorrosionObservations,
                formData.rustingCorrosionRemarks,
                'rustingCorrosion',
                rustingCorrosionHandlers
              )}
            </CardContent>
          </Card>

          {/* STRUCTURE Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">STRUCTURE</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.structureObservations,
                formData.structureRemarks,
                'structure',
                structureHandlers
              )}
            </CardContent>
          </Card>

          {/* SONAR DOME Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">SONAR DOME</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.sonarDomeObservations,
                formData.sonarDomeRemarks,
                'sonarDome',
                sonarDomeHandlers
              )}
            </CardContent>
          </Card>

          {/* RUDDER Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">RUDDER</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.rudderObservations,
                formData.rudderRemarks,
                'rudder',
                rudderHandlers
              )}
            </CardContent>
          </Card>

          {/* CATHODIC PROTECTION SYSTEM Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">CATHODIC PROTECTION SYSTEM</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.cathodicProtectionObservations,
                formData.cathodicProtectionRemarks,
                'cathodicProtection',
                cathodicProtectionHandlers
              )}
            </CardContent>
          </Card>

          {/* PROPELLERS Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">PROPELLERS</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.propellersObservations,
                formData.propellersRemarks,
                'propellers',
                propellersHandlers
              )}
            </CardContent>
          </Card>

          {/* MISCELLANEOUS Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">MISCELLANEOUS</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderObservationTable(
                formData.miscellaneousObservations,
                formData.miscellaneousRemarks,
                'miscellaneous',
                miscellaneousHandlers
              )}
            </CardContent>
          </Card>

          {/* Other observations */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Other observations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="otherObservations" className="text-sm font-medium">Other observations*</Label>
                <Textarea
                  id="otherObservations"
                  value={formData.otherObservations}
                  onChange={(e) => handleInputChange('otherObservations', e.target.value)}
                  placeholder="Enter other observations..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Signatures Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ship Staff Signature */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signShipStaff" className="text-sm font-medium">Ship Staff Signature*</Label>
                    <Input
                      id="signShipStaff"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('signShipStaff', e.target.files?.[0] || null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipStaffName" className="text-sm font-medium">Name*</Label>
                    <Input
                      id="shipStaffName"
                      value={formData.shipStaffName}
                      onChange={(e) => handleInputChange('shipStaffName', e.target.value)}
                      placeholder="Enter name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipStaffRank" className="text-sm font-medium">Rank*</Label>
                    <Input
                      id="shipStaffRank"
                      value={formData.shipStaffRank}
                      onChange={(e) => handleInputChange('shipStaffRank', e.target.value)}
                      placeholder="Enter rank"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipStaffDesignation" className="text-sm font-medium">Designation*</Label>
                    <Input
                      id="shipStaffDesignation"
                      value={formData.shipStaffDesignation}
                      onChange={(e) => handleInputChange('shipStaffDesignation', e.target.value)}
                      placeholder="Enter designation"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Refitting Authority Signature */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signRefittingAuth" className="text-sm font-medium">Refitting Authority Signature*</Label>
                    <Input
                      id="signRefittingAuth"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('signRefittingAuth', e.target.files?.[0] || null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refittingAuthName" className="text-sm font-medium">Name*</Label>
                    <Input
                      id="refittingAuthName"
                      value={formData.refittingAuthName}
                      onChange={(e) => handleInputChange('refittingAuthName', e.target.value)}
                      placeholder="Enter name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refittingAuthRank" className="text-sm font-medium">Rank*</Label>
                    <Input
                      id="refittingAuthRank"
                      value={formData.refittingAuthRank}
                      onChange={(e) => handleInputChange('refittingAuthRank', e.target.value)}
                      placeholder="Enter rank"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refittingAuthDesignation" className="text-sm font-medium">Designation*</Label>
                    <Input
                      id="refittingAuthDesignation"
                      value={formData.refittingAuthDesignation}
                      onChange={(e) => handleInputChange('refittingAuthDesignation', e.target.value)}
                      placeholder="Enter designation"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* HITU Inspector Signature */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signHituInspector" className="text-sm font-medium">HITU Inspector Signature*</Label>
                    <Input
                      id="signHituInspector"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('signHituInspector', e.target.files?.[0] || null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hituInspectorName" className="text-sm font-medium">Name*</Label>
                    <Input
                      id="hituInspectorName"
                      value={formData.hituInspectorName}
                      onChange={(e) => handleInputChange('hituInspectorName', e.target.value)}
                      placeholder="Enter name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hituInspectorRank" className="text-sm font-medium">Rank*</Label>
                    <Input
                      id="hituInspectorRank"
                      value={formData.hituInspectorRank}
                      onChange={(e) => handleInputChange('hituInspectorRank', e.target.value)}
                      placeholder="Enter rank"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hituInspectorDesignation" className="text-sm font-medium">Designation*</Label>
                    <Input
                      id="hituInspectorDesignation"
                      value={formData.hituInspectorDesignation}
                      onChange={(e) => handleInputChange('hituInspectorDesignation', e.target.value)}
                      placeholder="Enter designation"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button type="button" onClick={handleFetchDrafts} variant="outline" className="px-6">
              Fetch Drafts
            </Button>
            <Button type="button" onClick={handleSaveDraft} variant="outline" className="px-6">
              SAVE DRAFT
            </Button>
            <Button type="button" onClick={handleClear} variant="outline" className="px-6">
              Clear
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
              Save
            </Button>
          </div>
        </form>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Saved Drafts</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>INS Name</TableHead>
                    <TableHead>Inspection Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft) => (
                    <TableRow key={draft.id}>
                      <TableCell>{new Date(draft.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{draft.formData.preInspection}</TableCell>
                      <TableCell>{draft.formData.dtInspection}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditDraft(draft)}
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDeleteDraft(draft.id)}
                            variant="destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PreliminaryUnderwaterHullInspectionReportForm;
