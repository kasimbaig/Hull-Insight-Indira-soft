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

interface OpdefDetail {
  id: string;
  srNo: string;
  opdefDetails: string;
  remarks: string;
}

interface HullConcession {
  id: string;
  srNo: string;
  hullConcessions: string;
  location: string;
  justification: string;
}

interface OtherDefect {
  id: string;
  srNo: string;
  defectDetails: string;
  remarks: string;
}

interface EdgeCondition {
  id: string;
  srNo: string;
  edgeDetails: string;
  remarks: string;
}

interface DadoCondition {
  id: string;
  srNo: string;
  dadoDetails: string;
  remarks: string;
}

interface CompartmentTested {
  id: string;
  srNo: string;
  compartmentDetails: string;
}

interface CompartmentNotProved {
  id: string;
  srNo: string;
  compartmentDetails: string;
}

interface PlanForRemaining {
  id: string;
  srNo: string;
  planDetails: string;
}

interface LiftingAppliance {
  id: string;
  name: string;
  status: string;
  checked: boolean;
  date: string;
}

interface BerItem {
  id: string;
  srNo: string;
  berDetails: string;
}

interface Recommendation {
  id: string;
  srNo: string;
  recommendationDetails: string;
}

interface HullMaintenanceInspectionforShipsFormData {
  // Header Fields
  inspectionForShips: string;
  dateOfInspection: string;
  
  // Material State Section
  noOfOpdefs: string;
  opdefDetails: OpdefDetail[];
  hullConcessions: HullConcession[];
  
  // Preservation Section
  otherDefects: OtherDefect[];
  edgeConditions: EdgeCondition[];
  dadoConditions: DadoCondition[];
  
  // Documentation Section
  hullSurveyRecord: string;
  
  // Water Tight and Gas Tight Integrity Section
  compartmentsTested: CompartmentTested[];
  compartmentsNotProved: CompartmentNotProved[];
  planForRemaining: PlanForRemaining[];
  
  // Lifting Appliances Section
  liftingAppliances: LiftingAppliance[];
  
  // Systems Section
  systemsOperational: string;
  systemsDateLastOperated: string;
  systemsDefects: string;
  sanitaryDefects: string;
  sanitaryChokes: string;
  flushingValves: string;
  obdValves: string;
  
  // Hull Equipment Section
  anchorSurveyDetails: string;
  anchorLoadTestDate: string;
  anchorStrop: string;
  blakeSlip: string;
  compressor: string;
  berItems: BerItem[];
  
  // Life Saving Appliances Section
  visualSurvey: string;
  lifeRaftsAuthorization: string;
  lifeRaftsHeld: string;
  lifeRaftsBer: string;
  
  // Habitability Section
  livingConditions: string;
  shipsHusbandry: string;
  acDiscipline: string;
  
  // Ships Husbandry Tools Section
  toolsAuthorization: string;
  toolsAuthorizationStatus: string;
  toolsHeld: string;
  toolsRemark: string;
  
  // Recommendations Section
  recommendations: Recommendation[];
  
  // Authority Signature Section
  authoritySignature: string;
}

const HullMaintenanceInspectionforShipsForm = () => {
  const [formData, setFormData] = useState<HullMaintenanceInspectionforShipsFormData>({
    inspectionForShips: "",
    dateOfInspection: "",
    noOfOpdefs: "",
    opdefDetails: [],
    hullConcessions: [],
    otherDefects: [],
    edgeConditions: [],
    dadoConditions: [],
    hullSurveyRecord: "",
    compartmentsTested: [],
    compartmentsNotProved: [],
    planForRemaining: [],
    liftingAppliances: [
      { id: "1", name: "Ships brow", status: "", checked: false, date: "" },
      { id: "2", name: "Helo deck and Hangar deck rings / eyes", status: "", checked: false, date: "" },
      { id: "3", name: "Helo Landing Grid", status: "", checked: false, date: "" }
    ],
    systemsOperational: "",
    systemsDateLastOperated: "",
    systemsDefects: "",
    sanitaryDefects: "",
    sanitaryChokes: "",
    flushingValves: "",
    obdValves: "",
    anchorSurveyDetails: "",
    anchorLoadTestDate: "",
    anchorStrop: "",
    blakeSlip: "",
    compressor: "",
    berItems: [],
    visualSurvey: "",
    lifeRaftsAuthorization: "",
    lifeRaftsHeld: "",
    lifeRaftsBer: "",
    livingConditions: "",
    shipsHusbandry: "",
    acDiscipline: "",
    toolsAuthorization: "",
    toolsAuthorizationStatus: "",
    toolsHeld: "",
    toolsRemark: "",
    recommendations: [],
    authoritySignature: "",
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  const handleInputChange = (field: keyof HullMaintenanceInspectionforShipsFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // OPDEF Details Functions
  const handleAddOpdefDetail = () => {
    const newDetail: OpdefDetail = {
      id: Date.now().toString(),
      srNo: "",
      opdefDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      opdefDetails: [...prev.opdefDetails, newDetail]
    }));
  };

  const handleRemoveOpdefDetail = (id: string) => {
    setFormData(prev => ({
      ...prev,
      opdefDetails: prev.opdefDetails.filter(detail => detail.id !== id)
    }));
  };

  const handleUpdateOpdefDetail = (id: string, field: keyof OpdefDetail, value: string) => {
    setFormData(prev => ({
      ...prev,
      opdefDetails: prev.opdefDetails.map(detail =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    }));
  };

  // Hull Concessions Functions
  const handleAddHullConcession = () => {
    const newConcession: HullConcession = {
      id: Date.now().toString(),
      srNo: "",
      hullConcessions: "",
      location: "",
      justification: ""
    };
    setFormData(prev => ({
      ...prev,
      hullConcessions: [...prev.hullConcessions, newConcession]
    }));
  };

  const handleRemoveHullConcession = (id: string) => {
    setFormData(prev => ({
      ...prev,
      hullConcessions: prev.hullConcessions.filter(concession => concession.id !== id)
    }));
  };

  const handleUpdateHullConcession = (id: string, field: keyof HullConcession, value: string) => {
    setFormData(prev => ({
      ...prev,
      hullConcessions: prev.hullConcessions.map(concession =>
        concession.id === id ? { ...concession, [field]: value } : concession
      )
    }));
  };

  // Other Defects Functions
  const handleAddOtherDefect = () => {
    const newDefect: OtherDefect = {
      id: Date.now().toString(),
      srNo: "",
      defectDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      otherDefects: [...prev.otherDefects, newDefect]
    }));
  };

  const handleRemoveOtherDefect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      otherDefects: prev.otherDefects.filter(defect => defect.id !== id)
    }));
  };

  const handleUpdateOtherDefect = (id: string, field: keyof OtherDefect, value: string) => {
    setFormData(prev => ({
      ...prev,
      otherDefects: prev.otherDefects.map(defect =>
        defect.id === id ? { ...defect, [field]: value } : defect
      )
    }));
  };

  // Edge Conditions Functions
  const handleAddEdgeCondition = () => {
    const newCondition: EdgeCondition = {
      id: Date.now().toString(),
      srNo: "",
      edgeDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      edgeConditions: [...prev.edgeConditions, newCondition]
    }));
  };

  const handleRemoveEdgeCondition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      edgeConditions: prev.edgeConditions.filter(condition => condition.id !== id)
    }));
  };

  const handleUpdateEdgeCondition = (id: string, field: keyof EdgeCondition, value: string) => {
    setFormData(prev => ({
      ...prev,
      edgeConditions: prev.edgeConditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    }));
  };

  // Dado Conditions Functions
  const handleAddDadoCondition = () => {
    const newCondition: DadoCondition = {
      id: Date.now().toString(),
      srNo: "",
      dadoDetails: "",
      remarks: ""
    };
    setFormData(prev => ({
      ...prev,
      dadoConditions: [...prev.dadoConditions, newCondition]
    }));
  };

  const handleRemoveDadoCondition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      dadoConditions: prev.dadoConditions.filter(condition => condition.id !== id)
    }));
  };

  const handleUpdateDadoCondition = (id: string, field: keyof DadoCondition, value: string) => {
    setFormData(prev => ({
      ...prev,
      dadoConditions: prev.dadoConditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    }));
  };

  // Compartment Tested Functions
  const handleAddCompartmentTested = () => {
    const newCompartment: CompartmentTested = {
      id: Date.now().toString(),
      srNo: "",
      compartmentDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      compartmentsTested: [...prev.compartmentsTested, newCompartment]
    }));
  };

  const handleRemoveCompartmentTested = (id: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsTested: prev.compartmentsTested.filter(compartment => compartment.id !== id)
    }));
  };

  const handleUpdateCompartmentTested = (id: string, field: keyof CompartmentTested, value: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsTested: prev.compartmentsTested.map(compartment =>
        compartment.id === id ? { ...compartment, [field]: value } : compartment
      )
    }));
  };

  // Compartment Not Proved Functions
  const handleAddCompartmentNotProved = () => {
    const newCompartment: CompartmentNotProved = {
      id: Date.now().toString(),
      srNo: "",
      compartmentDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      compartmentsNotProved: [...prev.compartmentsNotProved, newCompartment]
    }));
  };

  const handleRemoveCompartmentNotProved = (id: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsNotProved: prev.compartmentsNotProved.filter(compartment => compartment.id !== id)
    }));
  };

  const handleUpdateCompartmentNotProved = (id: string, field: keyof CompartmentNotProved, value: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentsNotProved: prev.compartmentsNotProved.map(compartment =>
        compartment.id === id ? { ...compartment, [field]: value } : compartment
      )
    }));
  };

  // Plan For Remaining Functions
  const handleAddPlanForRemaining = () => {
    const newPlan: PlanForRemaining = {
      id: Date.now().toString(),
      srNo: "",
      planDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      planForRemaining: [...prev.planForRemaining, newPlan]
    }));
  };

  const handleRemovePlanForRemaining = (id: string) => {
    setFormData(prev => ({
      ...prev,
      planForRemaining: prev.planForRemaining.filter(plan => plan.id !== id)
    }));
  };

  const handleUpdatePlanForRemaining = (id: string, field: keyof PlanForRemaining, value: string) => {
    setFormData(prev => ({
      ...prev,
      planForRemaining: prev.planForRemaining.map(plan =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    }));
  };

  // Lifting Appliance Functions
  const handleUpdateLiftingAppliance = (id: string, field: keyof LiftingAppliance, value: any) => {
    setFormData(prev => ({
      ...prev,
      liftingAppliances: prev.liftingAppliances.map(appliance =>
        appliance.id === id ? { ...appliance, [field]: value } : appliance
      )
    }));
  };

  // BER Items Functions
  const handleAddBerItem = () => {
    const newItem: BerItem = {
      id: Date.now().toString(),
      srNo: "",
      berDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      berItems: [...prev.berItems, newItem]
    }));
  };

  const handleRemoveBerItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      berItems: prev.berItems.filter(item => item.id !== id)
    }));
  };

  const handleUpdateBerItem = (id: string, field: keyof BerItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      berItems: prev.berItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Recommendations Functions
  const handleAddRecommendation = () => {
    const newRecommendation: Recommendation = {
      id: Date.now().toString(),
      srNo: "",
      recommendationDetails: ""
    };
    setFormData(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, newRecommendation]
    }));
  };

  const handleRemoveRecommendation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter(rec => rec.id !== id)
    }));
  };

  const handleUpdateRecommendation = (id: string, field: keyof Recommendation, value: string) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev.recommendations.map(rec =>
        rec.id === id ? { ...rec, [field]: value } : rec
      )
    }));
  };

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData }
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionShipsDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('hullMaintenanceInspectionShipsDrafts', JSON.stringify(updatedDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionShipsDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionShipsDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('hullMaintenanceInspectionShipsDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      inspectionForShips: "",
      dateOfInspection: "",
      noOfOpdefs: "",
      opdefDetails: [],
      hullConcessions: [],
      otherDefects: [],
      edgeConditions: [],
      dadoConditions: [],
      hullSurveyRecord: "",
      compartmentsTested: [],
      compartmentsNotProved: [],
      planForRemaining: [],
      liftingAppliances: [
        { id: "1", name: "Ships brow", status: "", checked: false, date: "" },
        { id: "2", name: "Helo deck and Hangar deck rings / eyes", status: "", checked: false, date: "" },
        { id: "3", name: "Helo Landing Grid", status: "", checked: false, date: "" }
      ],
      systemsOperational: "",
      systemsDateLastOperated: "",
      systemsDefects: "",
      sanitaryDefects: "",
      sanitaryChokes: "",
      flushingValves: "",
      obdValves: "",
      anchorSurveyDetails: "",
      anchorLoadTestDate: "",
      anchorStrop: "",
      blakeSlip: "",
      compressor: "",
      berItems: [],
      visualSurvey: "",
      lifeRaftsAuthorization: "",
      lifeRaftsHeld: "",
      lifeRaftsBer: "",
      livingConditions: "",
      shipsHusbandry: "",
      acDiscipline: "",
      toolsAuthorization: "",
      toolsAuthorizationStatus: "",
      toolsHeld: "",
      toolsRemark: "",
      recommendations: [],
      authoritySignature: "",
    });
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = [
      'inspectionForShips', 'dateOfInspection', 'noOfOpdefs', 'hullSurveyRecord'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof HullMaintenanceInspectionforShipsFormData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Validate date format
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(formData.dateOfInspection)) {
      alert('Please enter date in DD-MM-YYYY format');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

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
          <h2 className="text-2xl font-bold text-gray-900">DETAILED REPORT ON ONBOARD HULL MAINTENANCE</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <Label htmlFor="inspectionForShips" className="text-sm font-medium">INSPECTION FOR SHIPS INS: *</Label>
              <Select value={formData.inspectionForShips} onValueChange={(value) => handleInputChange('inspectionForShips', value)}>
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
              <Label htmlFor="dateOfInspection" className="text-sm font-medium">DATE OF INSPECTION: *</Label>
              <Input
                id="dateOfInspection"
                value={formData.dateOfInspection}
                onChange={(e) => handleInputChange('dateOfInspection', e.target.value)}
                placeholder="DD-MM-YYYY"
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* Material State Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Material State (No 01/15)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* 1.1 OPDEFs */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">1.1 OPDEFs:</h4>
                <div className="mb-4">
                  <Label htmlFor="noOfOpdefs" className="text-sm font-medium">(a) No. of OPDEFs Since last inspection*</Label>
                  <Input
                    id="noOfOpdefs"
                    value={formData.noOfOpdefs}
                    onChange={(e) => handleInputChange('noOfOpdefs', e.target.value)}
                    placeholder="Enter number of OPDEFs"
                    className="mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label className="text-sm font-medium">(b) Details of Hull OPDEFs*</Label>
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.opdefDetails.length}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        if (count > formData.opdefDetails.length) {
                          for (let i = formData.opdefDetails.length; i < count; i++) {
                            handleAddOpdefDetail();
                          }
                        } else if (count < formData.opdefDetails.length) {
                          const toRemove = formData.opdefDetails.slice(count);
                          toRemove.forEach(detail => handleRemoveOpdefDetail(detail.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  {formData.opdefDetails.length > 0 && (
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">OPDEF Details</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.opdefDetails.map((detail, index) => (
                            <TableRow key={detail.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={detail.srNo}
                                  onChange={(e) => handleUpdateOpdefDetail(detail.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={detail.opdefDetails}
                                  onChange={(e) => handleUpdateOpdefDetail(detail.id, 'opdefDetails', e.target.value)}
                                  placeholder="Enter OPDEF details"
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={detail.remarks}
                                  onChange={(e) => handleUpdateOpdefDetail(detail.id, 'remarks', e.target.value)}
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

              {/* 1.2 Hull Concessions */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">1.2 Hull Concessions*:</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.hullConcessions.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.hullConcessions.length) {
                        for (let i = formData.hullConcessions.length; i < count; i++) {
                          handleAddHullConcession();
                        }
                      } else if (count < formData.hullConcessions.length) {
                        const toRemove = formData.hullConcessions.slice(count);
                        toRemove.forEach(concession => handleRemoveHullConcession(concession.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.hullConcessions.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Hull Concessions</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Location</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Justification</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.hullConcessions.map((concession, index) => (
                          <TableRow key={concession.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.srNo}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.hullConcessions}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'hullConcessions', e.target.value)}
                                placeholder="Enter hull concessions"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.location}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'location', e.target.value)}
                                placeholder="Enter location"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={concession.justification}
                                onChange={(e) => handleUpdateHullConcession(concession.id, 'justification', e.target.value)}
                                placeholder="Enter justification"
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
            </CardContent>
          </Card>

          {/* Preservation Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Preservation (No 53/16)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* (c) Any other defect */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">(c) Any other defect*</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.otherDefects.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.otherDefects.length) {
                        for (let i = formData.otherDefects.length; i < count; i++) {
                          handleAddOtherDefect();
                        }
                      } else if (count < formData.otherDefects.length) {
                        const toRemove = formData.otherDefects.slice(count);
                        toRemove.forEach(defect => handleRemoveOtherDefect(defect.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.otherDefects.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Defect Details</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.otherDefects.map((defect, index) => (
                          <TableRow key={defect.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={defect.srNo}
                                onChange={(e) => handleUpdateOtherDefect(defect.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={defect.defectDetails}
                                onChange={(e) => handleUpdateOtherDefect(defect.id, 'defectDetails', e.target.value)}
                                placeholder="Enter defect details"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={defect.remarks}
                                onChange={(e) => handleUpdateOtherDefect(defect.id, 'remarks', e.target.value)}
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

              {/* (d) Condition of edges */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">(d) Condition of edges*</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.edgeConditions.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.edgeConditions.length) {
                        for (let i = formData.edgeConditions.length; i < count; i++) {
                          handleAddEdgeCondition();
                        }
                      } else if (count < formData.edgeConditions.length) {
                        const toRemove = formData.edgeConditions.slice(count);
                        toRemove.forEach(condition => handleRemoveEdgeCondition(condition.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.edgeConditions.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Edge Details</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.edgeConditions.map((condition, index) => (
                          <TableRow key={condition.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={condition.srNo}
                                onChange={(e) => handleUpdateEdgeCondition(condition.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={condition.edgeDetails}
                                onChange={(e) => handleUpdateEdgeCondition(condition.id, 'edgeDetails', e.target.value)}
                                placeholder="Enter edge details"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={condition.remarks}
                                onChange={(e) => handleUpdateEdgeCondition(condition.id, 'remarks', e.target.value)}
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

              {/* (e) Condition of dadoes */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">(e) Condition of dadoes*</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.dadoConditions.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.dadoConditions.length) {
                        for (let i = formData.dadoConditions.length; i < count; i++) {
                          handleAddDadoCondition();
                        }
                      } else if (count < formData.dadoConditions.length) {
                        const toRemove = formData.dadoConditions.slice(count);
                        toRemove.forEach(condition => handleRemoveDadoCondition(condition.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.dadoConditions.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Dado Details</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.dadoConditions.map((condition, index) => (
                          <TableRow key={condition.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={condition.srNo}
                                onChange={(e) => handleUpdateDadoCondition(condition.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={condition.dadoDetails}
                                onChange={(e) => handleUpdateDadoCondition(condition.id, 'dadoDetails', e.target.value)}
                                placeholder="Enter dado details"
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={condition.remarks}
                                onChange={(e) => handleUpdateDadoCondition(condition.id, 'remarks', e.target.value)}
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
            </CardContent>
          </Card>

          {/* Documentation Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">3.1 Documentation</h4>
                <div>
                  <Label htmlFor="hullSurveyRecord" className="text-sm font-medium">(a) Record of Hull survey by SS (NO 01/15)*</Label>
                  <Select value={formData.hullSurveyRecord} onValueChange={(value) => handleInputChange('hullSurveyRecord', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="not-available">Not Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Water Tight and Gas Tight Integrity Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Water Tight and Gas Tight Integrity (NO 01/15)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* (c) List of Compartments tested successfully */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">(c) List of Compartments tested successfully in presence of HITU*</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.compartmentsTested.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.compartmentsTested.length) {
                        for (let i = formData.compartmentsTested.length; i < count; i++) {
                          handleAddCompartmentTested();
                        }
                      } else if (count < formData.compartmentsTested.length) {
                        const toRemove = formData.compartmentsTested.slice(count);
                        toRemove.forEach(compartment => handleRemoveCompartmentTested(compartment.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.compartmentsTested.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Compartment Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.compartmentsTested.map((compartment, index) => (
                          <TableRow key={compartment.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={compartment.srNo}
                                onChange={(e) => handleUpdateCompartmentTested(compartment.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={compartment.compartmentDetails}
                                onChange={(e) => handleUpdateCompartmentTested(compartment.id, 'compartmentDetails', e.target.value)}
                                placeholder="Enter compartment details"
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

              {/* (d) List of Compartments tested but not proved */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">(d) List of Compartments tested but not proved in present cycle*</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.compartmentsNotProved.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.compartmentsNotProved.length) {
                        for (let i = formData.compartmentsNotProved.length; i < count; i++) {
                          handleAddCompartmentNotProved();
                        }
                      } else if (count < formData.compartmentsNotProved.length) {
                        const toRemove = formData.compartmentsNotProved.slice(count);
                        toRemove.forEach(compartment => handleRemoveCompartmentNotProved(compartment.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.compartmentsNotProved.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Compartment Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.compartmentsNotProved.map((compartment, index) => (
                          <TableRow key={compartment.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={compartment.srNo}
                                onChange={(e) => handleUpdateCompartmentNotProved(compartment.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={compartment.compartmentDetails}
                                onChange={(e) => handleUpdateCompartmentNotProved(compartment.id, 'compartmentDetails', e.target.value)}
                                placeholder="Enter compartment details"
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

              {/* (e) Plan for remaining compartments */}
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">(e) Plan for remaining compts*</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.planForRemaining.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.planForRemaining.length) {
                        for (let i = formData.planForRemaining.length; i < count; i++) {
                          handleAddPlanForRemaining();
                        }
                      } else if (count < formData.planForRemaining.length) {
                        const toRemove = formData.planForRemaining.slice(count);
                        toRemove.forEach(plan => handleRemovePlanForRemaining(plan.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.planForRemaining.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Plan Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.planForRemaining.map((plan, index) => (
                          <TableRow key={plan.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={plan.srNo}
                                onChange={(e) => handleUpdatePlanForRemaining(plan.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={plan.planDetails}
                                onChange={(e) => handleUpdatePlanForRemaining(plan.id, 'planDetails', e.target.value)}
                                placeholder="Enter plan details"
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
            </CardContent>
          </Card>

          {/* Lifting Appliances Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Lifting Appliances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {formData.liftingAppliances.map((appliance) => (
                <div key={appliance.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label className="text-sm font-medium">{appliance.name}*</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={appliance.status} 
                      onValueChange={(value) => handleUpdateLiftingAppliance(appliance.id, 'status', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="non-operational">Non-operational</SelectItem>
                        <SelectItem value="defective">Defective</SelectItem>
                      </SelectContent>
                    </Select>
                    <input
                      type="checkbox"
                      checked={appliance.checked}
                      onChange={(e) => handleUpdateLiftingAppliance(appliance.id, 'checked', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Input
                      type="text"
                      value={appliance.date}
                      onChange={(e) => handleUpdateLiftingAppliance(appliance.id, 'date', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="w-32"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Systems Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="systemsOperational" className="text-sm font-medium">(a) Operational / Non operational*</Label>
                  <Select value={formData.systemsOperational} onValueChange={(value) => handleInputChange('systemsOperational', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="non-operational">Non-operational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="systemsDateLastOperated" className="text-sm font-medium">(b) Date last operated*</Label>
                  <Input
                    id="systemsDateLastOperated"
                    value={formData.systemsDateLastOperated}
                    onChange={(e) => handleInputChange('systemsDateLastOperated', e.target.value)}
                    placeholder="DD-MM-YYYY"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="systemsDefects" className="text-sm font-medium">(c) Details of defects if any*</Label>
                <Textarea
                  id="systemsDefects"
                  value={formData.systemsDefects}
                  onChange={(e) => handleInputChange('systemsDefects', e.target.value)}
                  placeholder="Enter defect details..."
                  className="mt-1 min-h-[80px]"
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">6.6 Sanitary system</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sanitaryDefects" className="text-sm font-medium">(a) Defects if any*</Label>
                    <Textarea
                      id="sanitaryDefects"
                      value={formData.sanitaryDefects}
                      onChange={(e) => handleInputChange('sanitaryDefects', e.target.value)}
                      placeholder="Enter sanitary defects..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sanitaryChokes" className="text-sm font-medium">(b) Chokes if any*</Label>
                    <Textarea
                      id="sanitaryChokes"
                      value={formData.sanitaryChokes}
                      onChange={(e) => handleInputChange('sanitaryChokes', e.target.value)}
                      placeholder="Enter chokes details..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flushingValves" className="text-sm font-medium">(c) State of flushing valves*</Label>
                    <Textarea
                      id="flushingValves"
                      value={formData.flushingValves}
                      onChange={(e) => handleInputChange('flushingValves', e.target.value)}
                      placeholder="Enter flushing valves state..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="obdValves" className="text-sm font-medium">(d) State of OBD valves*</Label>
                    <Textarea
                      id="obdValves"
                      value={formData.obdValves}
                      onChange={(e) => handleInputChange('obdValves', e.target.value)}
                      placeholder="Enter OBD valves state..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hull Equipment Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Hull Equipment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">7.1 Anchor chain cable and associated fittings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="anchorSurveyDetails" className="text-sm font-medium">(a) Last survey details (NO 07/11)*</Label>
                    <Input
                      id="anchorSurveyDetails"
                      value={formData.anchorSurveyDetails}
                      onChange={(e) => handleInputChange('anchorSurveyDetails', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="anchorLoadTestDate" className="text-sm font-medium">(b) Date of Load test*</Label>
                    <Input
                      id="anchorLoadTestDate"
                      value={formData.anchorLoadTestDate}
                      onChange={(e) => handleInputChange('anchorLoadTestDate', e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="anchorStrop" className="text-sm font-medium">(ii) Anchor Strop*</Label>
                    <Select value={formData.anchorStrop} onValueChange={(value) => handleInputChange('anchorStrop', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="blakeSlip" className="text-sm font-medium">(iii) Blake Slip*</Label>
                    <Select value={formData.blakeSlip} onValueChange={(value) => handleInputChange('blakeSlip', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="compressor" className="text-sm font-medium">(iv) Compressor*</Label>
                    <Select value={formData.compressor} onValueChange={(value) => handleInputChange('compressor', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="non-operational">Non-operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">(c) BER items if any</Label>
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <Label className="text-sm">Enter Total Number of Rows.</Label>
                    <Input
                      type="number"
                      value={formData.berItems.length}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        if (count > formData.berItems.length) {
                          for (let i = formData.berItems.length; i < count; i++) {
                            handleAddBerItem();
                          }
                        } else if (count < formData.berItems.length) {
                          const toRemove = formData.berItems.slice(count);
                          toRemove.forEach(item => handleRemoveBerItem(item.id));
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                  {formData.berItems.length > 0 && (
                    <div className="overflow-x-auto">
                      <Table className="border border-gray-300">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                            <TableHead className="border border-gray-300 text-center font-medium">BER Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.berItems.map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={item.srNo}
                                  onChange={(e) => handleUpdateBerItem(item.id, 'srNo', e.target.value)}
                                  placeholder={`(${String.fromCharCode(97 + index)})`}
                                  className="border-0 p-1"
                                />
                              </TableCell>
                              <TableCell className="border border-gray-300 p-2">
                                <Input
                                  value={item.berDetails}
                                  onChange={(e) => handleUpdateBerItem(item.id, 'berDetails', e.target.value)}
                                  placeholder="Enter BER details"
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
            </CardContent>
          </Card>

          {/* Life Saving Appliances Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Life Saving Appliances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <Label htmlFor="visualSurvey" className="text-sm font-medium">(iv) Visual survey of strong back area of hooks, connecting rods, adapter plate, securing bolts, weld joints and GRP Laminate around it.*</Label>
                <Select value={formData.visualSurvey} onValueChange={(value) => handleInputChange('visualSurvey', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-attention">Needs Attention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-4 text-gray-800">8.2 Life Rafts</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lifeRaftsAuthorization" className="text-sm font-medium">(a) Authorisation*</Label>
                    <Textarea
                      id="lifeRaftsAuthorization"
                      value={formData.lifeRaftsAuthorization}
                      onChange={(e) => handleInputChange('lifeRaftsAuthorization', e.target.value)}
                      placeholder="Enter authorization details..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsHeld" className="text-sm font-medium">(b) Held / deficiency*</Label>
                    <Textarea
                      id="lifeRaftsHeld"
                      value={formData.lifeRaftsHeld}
                      onChange={(e) => handleInputChange('lifeRaftsHeld', e.target.value)}
                      placeholder="Enter held/deficiency details..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeRaftsBer" className="text-sm font-medium">(c) BER</Label>
                    <Textarea
                      id="lifeRaftsBer"
                      value={formData.lifeRaftsBer}
                      onChange={(e) => handleInputChange('lifeRaftsBer', e.target.value)}
                      placeholder="Enter BER details..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habitability Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Habitability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label htmlFor="livingConditions" className="text-sm font-medium">9.1 Living conditions*</Label>
                <Select value={formData.livingConditions} onValueChange={(value) => handleInputChange('livingConditions', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shipsHusbandry" className="text-sm font-medium">9.2 Ships husbandry*</Label>
                <Select value={formData.shipsHusbandry} onValueChange={(value) => handleInputChange('shipsHusbandry', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="acDiscipline" className="text-sm font-medium">9.3 A/C discipline*</Label>
                <Select value={formData.acDiscipline} onValueChange={(value) => handleInputChange('acDiscipline', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Ships Husbandry Tools Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Ships Husbandry tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <Label htmlFor="toolsAuthorization" className="text-sm font-medium">10.1 Authorisation of tools (NHQ policy letter NC/Policy/H-08/ Equipment dated 22 Aug 12 or amended vide*</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="toolsAuthorization"
                    value={formData.toolsAuthorization}
                    onChange={(e) => handleInputChange('toolsAuthorization', e.target.value)}
                    placeholder="Enter authorization details"
                    className="flex-1"
                  />
                  <Select value={formData.toolsAuthorizationStatus} onValueChange={(value) => handleInputChange('toolsAuthorizationStatus', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="-Select-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="toolsHeld" className="text-sm font-medium">10.2 Held as per Authorisation*</Label>
                <Select value={formData.toolsHeld} onValueChange={(value) => handleInputChange('toolsHeld', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-Select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="toolsRemark" className="text-sm font-medium">10.3 Remark if any*</Label>
                <Input
                  id="toolsRemark"
                  value={formData.toolsRemark}
                  onChange={(e) => handleInputChange('toolsRemark', e.target.value)}
                  placeholder="Enter remarks"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label className="text-sm font-medium">11.1 SS Recommendations:-*</Label>
                <div className="flex items-center gap-2 mb-2 mt-1">
                  <Label className="text-sm">Enter Total Number of Rows.</Label>
                  <Input
                    type="number"
                    value={formData.recommendations.length}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      if (count > formData.recommendations.length) {
                        for (let i = formData.recommendations.length; i < count; i++) {
                          handleAddRecommendation();
                        }
                      } else if (count < formData.recommendations.length) {
                        const toRemove = formData.recommendations.slice(count);
                        toRemove.forEach(rec => handleRemoveRecommendation(rec.id));
                      }
                    }}
                    className="w-20"
                  />
                </div>
                {formData.recommendations.length > 0 && (
                  <div className="overflow-x-auto">
                    <Table className="border border-gray-300">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                          <TableHead className="border border-gray-300 text-center font-medium">Recommendation Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.recommendations.map((rec, index) => (
                          <TableRow key={rec.id}>
                            <TableCell className="border border-gray-300 p-2">
                              <Input
                                value={rec.srNo}
                                onChange={(e) => handleUpdateRecommendation(rec.id, 'srNo', e.target.value)}
                                placeholder={`(${String.fromCharCode(97 + index)})`}
                                className="border-0 p-1"
                              />
                            </TableCell>
                            <TableCell className="border border-gray-300 p-2">
                              <Textarea
                                value={rec.recommendationDetails}
                                onChange={(e) => handleUpdateRecommendation(rec.id, 'recommendationDetails', e.target.value)}
                                placeholder="Enter recommendation details"
                                className="border-0 p-1 min-h-[60px]"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Authority Signature Section */}
          <Card className="border border-gray-300">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold text-center underline">Authority Signature</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div>
                <Label htmlFor="authoritySignature" className="text-sm font-medium">Authority Signature:</Label>
                <Input
                  id="authoritySignature"
                  value={formData.authoritySignature}
                  onChange={(e) => handleInputChange('authoritySignature', e.target.value)}
                  placeholder="Enter authority signature"
                  className="mt-1"
                />
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
                    <TableHead>Inspection Type</TableHead>
                    <TableHead>Inspection Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft) => (
                    <TableRow key={draft.id}>
                      <TableCell>{new Date(draft.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{draft.formData.inspectionForShips}</TableCell>
                      <TableCell>{draft.formData.dateOfInspection}</TableCell>
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

export default HullMaintenanceInspectionforShipsForm;