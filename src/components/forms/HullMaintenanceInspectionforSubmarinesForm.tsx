import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Interfaces for dynamic table data
interface DynamicRow {
  id: string;
  location?: string;
  observation?: string;
  remarks?: string;
  details?: string;
}

interface FormData {
  inspectionForSubmarines: string;
  dateOfInspection: Date | null;

  // 1. WT/GT Integrity
  lastVacuumTest: Date | null;
  leakages: DynamicRow[];
  structuralDefects: string;
  conditionOfRubberSeals: string;
  conditionOfJoints: string;
  tightnessTest: string;

  // 2. Defect History
  knownDefects: DynamicRow[];
  lastOhmInspection: Date | null;
  pendingLiquidations: DynamicRow[];

  // 3. Towing/Mooring Arrangement
  towingHook: string;
  towingPendant: string;
  towingRope: string;

  // 4. Miscellaneous hull fittings
  mhfBollards: string;
  mhfCleats: string;
  mhfFairleads: string;
  mhfCableClench: string;

  // 5. Capstan/Windlass
  operationalState: string;
  periodicMaintenance: string;
  crewProficiency: string;
  checkOffList: string;
  capstanDetailsDefect: string;

  // 6. Indicator Buoy
  preservationStatus: string;
  lastSurveyedBySs: Date | null;
  conditionOfLugsDuringSurvey: string;
  conditionOfReleasing: string;
}

const initialFormData: FormData = {
  inspectionForSubmarines: "",
  dateOfInspection: null,

  lastVacuumTest: null,
  leakages: [{ id: "1", location: "", observation: "", remarks: "" }],
  structuralDefects: "",
  conditionOfRubberSeals: "",
  conditionOfJoints: "",
  tightnessTest: "",

  knownDefects: [{ id: "1", location: "", observation: "", remarks: "" }],
  lastOhmInspection: null,
  pendingLiquidations: [{ id: "1", location: "", observation: "", remarks: "" }],

  towingHook: "",
  towingPendant: "",
  towingRope: "",

  mhfBollards: "",
  mhfCleats: "",
  mhfFairleads: "",
  mhfCableClench: "",

  operationalState: "",
  periodicMaintenance: "",
  crewProficiency: "",
  checkOffList: "",
  capstanDetailsDefect: "",

  preservationStatus: "",
  lastSurveyedBySs: null,
  conditionOfLugsDuringSurvey: "",
  conditionOfReleasing: "",
};

const HullMaintenanceInspectionforSubmarinesForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  // Handlers for dynamic tables
  const addRow = (field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...(prev[field] as DynamicRow[]),
        { id: Date.now().toString(), location: "", observation: "", remarks: "" },
      ],
    }));
  };

  const removeRow = (field: keyof FormData, id: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as DynamicRow[]).length > 1
        ? (prev[field] as DynamicRow[]).filter((row) => row.id !== id)
        : prev[field],
    }));
  };

  const handleSaveDraft = () => {

    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData }
    };
  
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionSubmarinesDrafts') || '[]');
    const updatedDrafts = hidDraftId 
      ? existingDrafts.map(draft => draft.id === hidDraftId ? draftData : draft)
      : [...existingDrafts, draftData];
    localStorage.setItem('hullMaintenanceInspectionSubmarinesDrafts', JSON.stringify(updatedDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setHidDraftId(null);
    setIsDraftModalOpen(false);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionSubmarinesDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('hullMaintenanceInspectionSubmarinesDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('hullMaintenanceInspectionSubmarinesDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const updateRow = (
    field: keyof FormData,
    id: string,
    key: keyof DynamicRow,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as DynamicRow[]).map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      ),
    }));
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field: keyof FormData, date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date || null,
    }));
  };

  // Ship options
  const shipOptions = [
    { value: "43", label: "SHIVALIK" },
    { value: "84", label: "JAMUNA" },
    // ...add more as needed
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation as needed
    alert("Form submitted!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800 font-semibold text-center">
              DETAILED REPORT ON ONBOARD HULL MAINTENANCE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium">
                    INSPECTION FOR SUBMARINES INS <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.inspectionForSubmarines}
                    onValueChange={(value) => handleInputChange("inspectionForSubmarines", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    DATE OF INSPECTION <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfInspection
                          ? format(formData.dateOfInspection, "dd-MM-yyyy")
                          : "DD-MM-YYYY"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfInspection || undefined}
                        onSelect={(date) => handleDateChange("dateOfInspection", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Main Table Structure */}
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="border border-gray-300 text-center font-medium">Sr No.</TableHead>
                      <TableHead className="border border-gray-300 text-center font-medium">Equipment/ System</TableHead>
                      <TableHead className="border border-gray-300 text-center font-medium">Description of Inspection</TableHead>
                      <TableHead className="border border-gray-300 text-center font-medium">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* 1. WT/GT Integrity */}
                    <TableRow>
                      <TableCell rowSpan={6} className="border border-gray-300 text-center align-top">1</TableCell>
                      <TableCell rowSpan={6} className="border border-gray-300 align-top">WT/ GT Integrity*</TableCell>
                      <TableCell className="border border-gray-300">Date of Last Vacuum test undertaken*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.lastVacuumTest
                                ? format(formData.lastVacuumTest, "dd-MM-yyyy")
                                : "DD-MM-YYYY"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.lastVacuumTest || undefined}
                              onSelect={(date) => handleDateChange("lastVacuumTest", date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Leakages / defects observed if any*</TableCell>
                      <TableCell className="border border-gray-300">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Enter Total Number of Rows.</Label>
                            <Input
                              type="number"
                              value={formData.leakages.length}
                              onChange={(e) => {
                                const count = parseInt(e.target.value) || 0;
                                if (count > formData.leakages.length) {
                                  for (let i = formData.leakages.length; i < count; i++) addRow("leakages");
                                } else if (count < formData.leakages.length && count > 0) {
                                  const toRemove = formData.leakages.slice(count);
                                  toRemove.forEach((row) => removeRow("leakages", row.id));
                                }
                              }}
                              className="w-20"
                              min="1"
                            />
                          </div>
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Observation*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {formData.leakages.map((row, idx) => (
                                <TableRow key={row.id}>
                                  <TableCell className="border border-gray-300 text-center">{idx + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.location}
                                      onChange={(e) => updateRow("leakages", row.id, "location", e.target.value)}
                                      maxLength={20}
                                      placeholder="Enter location"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.observation}
                                      onChange={(e) => updateRow("leakages", row.id, "observation", e.target.value)}
                                      maxLength={50}
                                      placeholder="Enter observation"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.remarks}
                                      onChange={(e) => updateRow("leakages", row.id, "remarks", e.target.value)}
                                      maxLength={50}
                                      placeholder="Enter remarks"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Structural defects on doors/ hatches / flap*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.structuralDefects}
                          onChange={(e) => handleInputChange("structuralDefects", e.target.value)}
                          maxLength={100}
                          placeholder="Enter structural defects"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Condition of rubber seals*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Select
                          value={formData.conditionOfRubberSeals}
                          onValueChange={(value) => handleInputChange("conditionOfRubberSeals", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Condition of Joints/ Surfaces of assembly hatch and soft patch*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Select
                          value={formData.conditionOfJoints}
                          onValueChange={(value) => handleInputChange("conditionOfJoints", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Tightness test for all compartments and conning tower*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.tightnessTest}
                          onChange={(e) => handleInputChange("tightnessTest", e.target.value)}
                          maxLength={100}
                          placeholder="Enter tightness test details"
                        />
                      </TableCell>
                    </TableRow>

                    {/* 2. Defect History/Structure/Location */}
                    <TableRow>
                      <TableCell rowSpan={3} className="border border-gray-300 text-center align-top">2</TableCell>
                      <TableCell rowSpan={3} className="border border-gray-300 align-top">Defect History/ Structure/ Location*</TableCell>
                      <TableCell className="border border-gray-300">Known / projected defects compartments/tanks*</TableCell>
                      <TableCell className="border border-gray-300">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Enter Total Number of Rows.</Label>
                            <Input
                              type="number"
                              value={formData.knownDefects.length}
                              onChange={(e) => {
                                const count = parseInt(e.target.value) || 0;
                                if (count > formData.knownDefects.length) {
                                  for (let i = formData.knownDefects.length; i < count; i++) addRow("knownDefects");
                                } else if (count < formData.knownDefects.length && count > 0) {
                                  const toRemove = formData.knownDefects.slice(count);
                                  toRemove.forEach((row) => removeRow("knownDefects", row.id));
                                }
                              }}
                              className="w-20"
                              min="1"
                            />
                          </div>
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Observation*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {formData.knownDefects.map((row, idx) => (
                                <TableRow key={row.id}>
                                  <TableCell className="border border-gray-300 text-center">{idx + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.location}
                                      onChange={(e) => updateRow("knownDefects", row.id, "location", e.target.value)}
                                      maxLength={20}
                                      placeholder="Enter location"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.observation}
                                      onChange={(e) => updateRow("knownDefects", row.id, "observation", e.target.value)}
                                      maxLength={50}
                                      placeholder="Enter observation"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.remarks}
                                      onChange={(e) => updateRow("knownDefects", row.id, "remarks", e.target.value)}
                                      maxLength={50}
                                      placeholder="Enter remarks"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Date of last OHM inspection by HITU</TableCell>
                      <TableCell className="border border-gray-300">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.lastOhmInspection
                                ? format(formData.lastOhmInspection, "dd-MM-yyyy")
                                : "DD-MM-YYYY"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.lastOhmInspection || undefined}
                              onSelect={(date) => handleDateChange("lastOhmInspection", date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Observations pending liquidation of last OHM*</TableCell>
                      <TableCell className="border border-gray-300">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Enter Total Number of Rows.</Label>
                            <Input
                              type="number"
                              value={formData.pendingLiquidations.length}
                              onChange={(e) => {
                                const count = parseInt(e.target.value) || 0;
                                if (count > formData.pendingLiquidations.length) {
                                  for (let i = formData.pendingLiquidations.length; i < count; i++) addRow("pendingLiquidations");
                                } else if (count < formData.pendingLiquidations.length && count > 0) {
                                  const toRemove = formData.pendingLiquidations.slice(count);
                                  toRemove.forEach((row) => removeRow("pendingLiquidations", row.id));
                                }
                              }}
                              className="w-20"
                              min="1"
                            />
                          </div>
                          <Table className="border border-gray-300">
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="border border-gray-300 text-center font-medium">Sr No</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Location*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Observation*</TableHead>
                                <TableHead className="border border-gray-300 text-center font-medium">Remarks*</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {formData.pendingLiquidations.map((row, idx) => (
                                <TableRow key={row.id}>
                                  <TableCell className="border border-gray-300 text-center">{idx + 1}</TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.location}
                                      onChange={(e) => updateRow("pendingLiquidations", row.id, "location", e.target.value)}
                                      maxLength={20}
                                      placeholder="Enter location"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.observation}
                                      onChange={(e) => updateRow("pendingLiquidations", row.id, "observation", e.target.value)}
                                      maxLength={50}
                                      placeholder="Enter observation"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                  <TableCell className="border border-gray-300">
                                    <Input
                                      value={row.remarks}
                                      onChange={(e) => updateRow("pendingLiquidations", row.id, "remarks", e.target.value)}
                                      maxLength={50}
                                      placeholder="Enter remarks"
                                      className="border-0 p-1"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>


                    {/* 3. Towing/Mooring Arrangement */}
                    <TableRow>
                      <TableCell rowSpan={3} className="border border-gray-300 text-center align-top">3</TableCell>
                      <TableCell rowSpan={3} className="border border-gray-300 align-top">Towing/ Mooring Arrangement*</TableCell>
                      <TableCell className="border border-gray-300">Towing hook (Sat/Unsat)*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.towingHook}
                          onChange={(e) => handleInputChange("towingHook", e.target.value)}
                          maxLength={100}
                          placeholder="Enter towing hook status"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Towing pendant*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.towingPendant}
                          onChange={(e) => handleInputChange("towingPendant", e.target.value)}
                          maxLength={100}
                          placeholder="Enter towing pendant details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Towing Rope*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.towingRope}
                          onChange={(e) => handleInputChange("towingRope", e.target.value)}
                          maxLength={100}
                          placeholder="Enter towing rope details"
                        />
                      </TableCell>
                    </TableRow>

                    {/* 4. Miscellaneous hull fittings */}
                    <TableRow>
                      <TableCell rowSpan={4} className="border border-gray-300 text-center align-top">4</TableCell>
                      <TableCell rowSpan={4} className="border border-gray-300 align-top">Miscellaneous hull fittings on weather deck*</TableCell>
                      <TableCell className="border border-gray-300">Bollards*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.mhfBollards}
                          onChange={(e) => handleInputChange("mhfBollards", e.target.value)}
                          maxLength={100}
                          placeholder="Enter bollards details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Cleats*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.mhfCleats}
                          onChange={(e) => handleInputChange("mhfCleats", e.target.value)}
                          maxLength={100}
                          placeholder="Enter cleats details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Fairleads*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.mhfFairleads}
                          onChange={(e) => handleInputChange("mhfFairleads", e.target.value)}
                          maxLength={100}
                          placeholder="Enter fairleads details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Cable clench*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.mhfCableClench}
                          onChange={(e) => handleInputChange("mhfCableClench", e.target.value)}
                          maxLength={100}
                          placeholder="Enter cable clench details"
                        />
                      </TableCell>
                    </TableRow>

                    {/* 5. Capstan/Windlass */}
                    <TableRow>
                      <TableCell rowSpan={5} className="border border-gray-300 text-center align-top">5</TableCell>
                      <TableCell rowSpan={5} className="border border-gray-300 align-top">Capstan/ Windlass*</TableCell>
                      <TableCell className="border border-gray-300">Operational state (Ops/Non- Ops)*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.operationalState}
                          onChange={(e) => handleInputChange("operationalState", e.target.value)}
                          maxLength={100}
                          placeholder="Enter operational state"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Periodic Maintenance (Preservation / Greasing)*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.periodicMaintenance}
                          onChange={(e) => handleInputChange("periodicMaintenance", e.target.value)}
                          maxLength={100}
                          placeholder="Enter periodic maintenance details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Crew proficiency*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.crewProficiency}
                          onChange={(e) => handleInputChange("crewProficiency", e.target.value)}
                          maxLength={100}
                          placeholder="Enter crew proficiency details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Check off list for Operation*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.checkOffList}
                          onChange={(e) => handleInputChange("checkOffList", e.target.value)}
                          maxLength={100}
                          placeholder="Enter check off list details"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Detail of Defect if any*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.capstanDetailsDefect}
                          onChange={(e) => handleInputChange("capstanDetailsDefect", e.target.value)}
                          maxLength={100}
                          placeholder="Enter defect details"
                        />
                      </TableCell>
                    </TableRow>

                    {/* 6. Indicator Buoy */}
                    <TableRow>
                      <TableCell rowSpan={4} className="border border-gray-300 text-center align-top">6</TableCell>
                      <TableCell rowSpan={4} className="border border-gray-300 align-top">Indicator Buoy*</TableCell>
                      <TableCell className="border border-gray-300">Preservation Status*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={formData.preservationStatus}
                          onChange={(e) => handleInputChange("preservationStatus", e.target.value)}
                          maxLength={100}
                          placeholder="Enter preservation status"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">last surveyed by SS/DYD*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.lastSurveyedBySs
                                ? format(formData.lastSurveyedBySs, "dd-MM-yyyy")
                                : "DD-MM-YYYY"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.lastSurveyedBySs || undefined}
                              onSelect={(date) => handleDateChange("lastSurveyedBySs", date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Condition of Lugs during Survey*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Select
                          value={formData.conditionOfLugsDuringSurvey}
                          onValueChange={(value) => handleInputChange("conditionOfLugsDuringSurvey", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-gray-300">Condition of Releasing / cutting mechanism*</TableCell>
                      <TableCell className="border border-gray-300">
                        <Select
                          value={formData.conditionOfReleasing}
                          onValueChange={(value) => handleInputChange("conditionOfReleasing", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAT">SAT</SelectItem>
                            <SelectItem value="UNSAT">UNSAT</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button
              type="button"
              onClick={handleFetchDrafts}
              className="px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold uppercase"
            >
              FETCH DRAFTS
            </Button>
            <Button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
            >
              SAVE DRAFT
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              className="px-6 bg-red-500 hover:bg-red-600 text-white font-semibold uppercase"
            >
              CLEAR
            </Button>
            <Button
              type="submit"
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase"
            >
              SAVE
            </Button>
          </div>
            </form>
          </CardContent>
        </Card>
      </div>

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
  );
};

export default HullMaintenanceInspectionforSubmarinesForm;