import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Interfaces for form data
interface AmbientCondition {
  id: string;
  regime: string;
  swpTemp0900: string;
  swpTemp1200: string;
  atmTemp0900: string;
  atmTemp1200: string;
  atmRel0900: string;
  atmRel1200: string;
  remarks: string;
}

interface ACPlantData {
  id: string;
  srNo: number;
  acPlantNo: string;
  evaTempIn: string;
  evaTempOut: string;
  tevTempIn: string;
  tevTempOut: string;
  condTempIn: string;
  condTempOut: string;
  remarks: string;
}

interface CompartmentRecord {
  id: string;
  srNo: number;
  compartmentName: string;
  occupancyD: string;
  occupancyA: string;
  fedByATU: string;
  fedByACPlant: string;
  dryBulbD: string;
  dryBulbA: string;
  wetBulbD: string;
  wetBulbA: string;
  rhDesign: string;
  rhMeasured: string;
  remarks: string;
}

interface MachineryRecord {
  id: string;
  srNo: number;
  compartmentName: string;
  occupancyD: string;
  occupancyA: string;
  fedByATU: string;
  fedBySupply: string;
  dryBulbD: string;
  dryBulbA: string;
  wetBulbD: string;
  wetBulbA: string;
  rhDesign: string;
  rhMeasured: string;
  remarks: string;
}

interface HVACPhase2FormData {
  ship: string;
  documentNo: string;
  dateOfConductOfTrials: string;
  locationOfConductOfTrials: string;
  ambientConditions: AmbientCondition[];
  acPlantData: ACPlantData[];
  compartmentRecords: CompartmentRecord[];
  machineryRecords: MachineryRecord[];
  authoritySignature: File | null;
}

const HVACPhase2Form = () => {
  const [formData, setFormData] = useState<HVACPhase2FormData>({
    ship: "0",
    documentNo: "",
    dateOfConductOfTrials: "",
    locationOfConductOfTrials: "",
    ambientConditions: [{
      id: "1", regime: "", swpTemp0900: "", swpTemp1200: "", atmTemp0900: "", 
      atmTemp1200: "", atmRel0900: "", atmRel1200: "", remarks: ""
    }],
    acPlantData: [{
      id: "1", srNo: 1, acPlantNo: "", evaTempIn: "", evaTempOut: "", tevTempIn: "",
      tevTempOut: "", condTempIn: "", condTempOut: "", remarks: ""
    }],
    compartmentRecords: [{
      id: "1", srNo: 1, compartmentName: "", occupancyD: "", occupancyA: "", fedByATU: "",
      fedByACPlant: "", dryBulbD: "", dryBulbA: "", wetBulbD: "", wetBulbA: "",
      rhDesign: "", rhMeasured: "", remarks: ""
    }],
    machineryRecords: [{
      id: "1", srNo: 1, compartmentName: "", occupancyD: "", occupancyA: "", fedByATU: "",
      fedBySupply: "", dryBulbD: "", dryBulbA: "", wetBulbD: "", wetBulbA: "",
      rhDesign: "", rhMeasured: "", remarks: ""
    }],
    authoritySignature: null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Ship options
  const shipOptions = [
    "SHIVALIK", "JAMUNA", "BANGARAM", "TARANGINI", "SARYU", "KUMBHIR", "T-83", "AIRAVAT", 
    "KHANJAR", "SHUDERSHINI", "TRISHUL", "TEG", "RANVIJAY", "KIRPAN", "DELHI", "SURVEKSHAK",
    "JYOTI", "SUJATA", "KABRA", "CANKARSO", "T-84", "VIBHUTI", "NISHANK", "MAGAR", "BEAS",
    "SUVERNA", "SAHYADRI", "PRALAYA", "CHERIYAM", "SATPURA", "JALASHWA", "TARKASH", "KARMUK",
    "SUTLEJ", "SUMEDHA", "PRABAL", "CORA DIVH", "BATTIMALV", "CHENNAI", "SUMITRA", "T-82",
    "KUTHAR", "KONDUL", "SUBHDRA", "DARSHAK", "BITRA", "CHETLAT", "NIREEKSHAK", "KARUVA",
    "DEEPAK", "SHAKTI", "KOLKATA", "INVETIGATOR", "SHARDA", "MUMBAI", "GOMTI", "BETWA",
    "NASHAK", "KOSWARI", "CHEETAH", "TALWAR", "KESARI", "ADITYA", "BARATANG", "KORA",
    "KULISH", "RANA", "KALPENI", "VIPUL", "TABAR", "TRINKAND", "KOCHI", "SUKANYA",
    "SAVITRI", "GULDAR", "BRAHMAPUTRA", "GHARIAL", "RANVIR", "NIRUPAK", "VINASH", "KIRCH",
    "SANDHAYAK", "VIDYUT", "TIR", "GAJ", "CAR NICOBAR", "SUNAYNA", "MYSORE"
  ];

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "dd-MM-yyyy");
      handleChange("dateOfConductOfTrials", formattedDate);
      setCalendarOpen(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload JPG, JPEG, or PNG files only.');
        event.target.value = '';
        return;
      }

      if (file.size > maxSize) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        event.target.value = '';
        return;
      }
    }
    setFormData(prev => ({ ...prev, authoritySignature: file }));
  };

  // Dynamic table handlers

  const handleAmbientConditionChange = (id: string, field: keyof AmbientCondition, value: string) => {
    setFormData(prev => ({
      ...prev,
      ambientConditions: prev.ambientConditions.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // AC Plant Data handlers
  const handleACPlantDataChange = (id: string, field: keyof ACPlantData, value: string) => {
    setFormData(prev => ({
      ...prev,
      acPlantData: prev.acPlantData.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateACPlantDataRows = (count: number) => {
    const currentCount = formData.acPlantData.length;
    if (count > currentCount) {
      // Add rows
      const newRows = [];
      for (let i = currentCount + 1; i <= count; i++) {
        newRows.push({
          id: i.toString(),
          srNo: i,
          acPlantNo: "",
          evaTempIn: "",
          evaTempOut: "",
          tevTempIn: "",
          tevTempOut: "",
          condTempIn: "",
          condTempOut: "",
          remarks: ""
        });
      }
      setFormData(prev => ({
        ...prev,
        acPlantData: [...prev.acPlantData, ...newRows]
      }));
    } else if (count < currentCount) {
      // Remove rows
      setFormData(prev => ({
        ...prev,
        acPlantData: prev.acPlantData.slice(0, count)
      }));
    }
  };

  // Compartment Records handlers
  const handleCompartmentRecordChange = (id: string, field: keyof CompartmentRecord, value: string) => {
    setFormData(prev => ({
      ...prev,
      compartmentRecords: prev.compartmentRecords.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateCompartmentRecordRows = (count: number) => {
    const currentCount = formData.compartmentRecords.length;
    if (count > currentCount) {
      // Add rows
      const newRows = [];
      for (let i = currentCount + 1; i <= count; i++) {
        newRows.push({
          id: i.toString(),
          srNo: i,
          compartmentName: "",
          occupancyD: "",
          occupancyA: "",
          fedByATU: "",
          fedByACPlant: "",
          dryBulbD: "",
          dryBulbA: "",
          wetBulbD: "",
          wetBulbA: "",
          rhDesign: "",
          rhMeasured: "",
          remarks: ""
        });
      }
      setFormData(prev => ({
        ...prev,
        compartmentRecords: [...prev.compartmentRecords, ...newRows]
      }));
    } else if (count < currentCount) {
      // Remove rows
      setFormData(prev => ({
        ...prev,
        compartmentRecords: prev.compartmentRecords.slice(0, count)
      }));
    }
  };

  // Machinery Records handlers
  const handleMachineryRecordChange = (id: string, field: keyof MachineryRecord, value: string) => {
    setFormData(prev => ({
      ...prev,
      machineryRecords: prev.machineryRecords.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateMachineryRecordRows = (count: number) => {
    const currentCount = formData.machineryRecords.length;
    if (count > currentCount) {
      // Add rows
      const newRows = [];
      for (let i = currentCount + 1; i <= count; i++) {
        newRows.push({
          id: i.toString(),
          srNo: i,
          compartmentName: "",
          occupancyD: "",
          occupancyA: "",
          fedByATU: "",
          fedBySupply: "",
          dryBulbD: "",
          dryBulbA: "",
          wetBulbD: "",
          wetBulbA: "",
          rhDesign: "",
          rhMeasured: "",
          remarks: ""
        });
      }
      setFormData(prev => ({
        ...prev,
        machineryRecords: [...prev.machineryRecords, ...newRows]
      }));
    } else if (count < currentCount) {
      // Remove rows
      setFormData(prev => ({
        ...prev,
        machineryRecords: prev.machineryRecords.slice(0, count)
      }));
    }
  };

  // Ambient Conditions row counter handler
  const updateAmbientConditionRows = (count: number) => {
    const currentCount = formData.ambientConditions.length;
    if (count > currentCount) {
      // Add rows
      const newRows = [];
      for (let i = currentCount + 1; i <= count; i++) {
        newRows.push({
          id: i.toString(),
          regime: "",
          swpTemp0900: "",
          swpTemp1200: "",
          atmTemp0900: "",
          atmTemp1200: "",
          atmRel0900: "",
          atmRel1200: "",
          remarks: ""
        });
      }
      setFormData(prev => ({
        ...prev,
        ambientConditions: [...prev.ambientConditions, ...newRows]
      }));
    } else if (count < currentCount) {
      // Remove rows
      setFormData(prev => ({
        ...prev,
        ambientConditions: prev.ambientConditions.slice(0, count)
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validation logic here
    console.log("Form submitted:", formData);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    // Load drafts logic here
  };

  const handleClear = () => {
    setFormData({
      ship: "0",
      documentNo: "",
      dateOfConductOfTrials: "",
      locationOfConductOfTrials: "",
      ambientConditions: [{
        id: "1", regime: "", swpTemp0900: "", swpTemp1200: "", atmTemp0900: "", 
        atmTemp1200: "", atmRel0900: "", atmRel1200: "", remarks: ""
      }],
      acPlantData: [{
        id: "1", srNo: 1, acPlantNo: "", evaTempIn: "", evaTempOut: "", tevTempIn: "",
        tevTempOut: "", condTempIn: "", condTempOut: "", remarks: ""
      }],
      compartmentRecords: [{
        id: "1", srNo: 1, compartmentName: "", occupancyD: "", occupancyA: "", fedByATU: "",
        fedByACPlant: "", dryBulbD: "", dryBulbA: "", wetBulbD: "", wetBulbA: "",
        rhDesign: "", rhMeasured: "", remarks: ""
      }],
      machineryRecords: [{
        id: "1", srNo: 1, compartmentName: "", occupancyD: "", occupancyA: "", fedByATU: "",
        fedBySupply: "", dryBulbD: "", dryBulbA: "", wetBulbD: "", wetBulbA: "",
        rhDesign: "", rhMeasured: "", remarks: ""
      }],
      authoritySignature: null,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="border border-gray-300">
        <CardHeader className="bg-gray-100">
          <CardTitle className="text-lg font-semibold text-center underline">HVAC PHASE II</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Basic Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship" className="form_label_color">Ship<span className="text-red-500">*</span></Label>
              <Select value={formData.ship} onValueChange={(value) => handleChange("ship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">--Select--</SelectItem>
                  {shipOptions.map((ship) => (
                    <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNo" className="form_label_color">Document No.<span className="text-red-500">*</span></Label>
              <Input
                id="documentNo"
                value={formData.documentNo}
                onChange={(e) => handleChange("documentNo", e.target.value)}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfConductOfTrials" className="form_label_color">Date of Conduct of Trials<span className="text-red-500">*</span></Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfConductOfTrials && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfConductOfTrials || "DD-MM-YYYY"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfConductOfTrials ? new Date(formData.dateOfConductOfTrials.split('-').reverse().join('-')) : undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationOfConductOfTrials" className="form_label_color">Location of Conduct of Trials<span className="text-red-500">*</span></Label>
              <Input
                id="locationOfConductOfTrials"
                value={formData.locationOfConductOfTrials}
                onChange={(e) => handleChange("locationOfConductOfTrials", e.target.value)}
                maxLength={20}
              />
            </div>
          </div>

          {/* Ambient Conditions Table */}
          <div className="space-y-4">
            <div className="head-box">
              <h4 className="text-lg font-semibold">Ambient Conditions</h4>
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={formData.ambientConditions.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  updateAmbientConditionRows(count);
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table className="table-auto border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Regime<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Sea Water Temperature(C)<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Atmosphere Temperature(C)<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Atmospheric Relativity<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Remarks<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center">0900 HRS<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">1200 HRS<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">0900 HRS<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">1200 HRS<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">0900 HRS<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">1200 HRS<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.ambientConditions.map((condition, index) => (
                    <TableRow key={condition.id}>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.regime}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "regime", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.swpTemp0900}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "swpTemp0900", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.swpTemp1200}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "swpTemp1200", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.atmTemp0900}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "atmTemp0900", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.atmTemp1200}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "atmTemp1200", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.atmRel0900}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "atmRel0900", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.atmRel1200}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "atmRel1200", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={condition.remarks}
                          onChange={(e) => handleAmbientConditionChange(condition.id, "remarks", e.target.value)}
                          maxLength={100}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* AC Plant Data Section */}
          <div className="space-y-4">
            <div className="head-box">
              <h4 className="text-lg font-semibold">AC Plant Data (SS-E to assist HITUs in record of these parameters)</h4>
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={formData.acPlantData.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  updateACPlantDataRows(count);
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table className="table-auto border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Sr No.</TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">AC Plant No.<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Evaporator Temp.<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">TEV Temp.<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Condenser Temp.<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Remarks<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center">In<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">Out<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">In<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">Out<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">In<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">Out<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.acPlantData.map((plant, index) => (
                    <TableRow key={plant.id}>
                      <TableCell className="border border-gray-300 text-center">{plant.srNo}</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.acPlantNo}
                          onChange={(e) => handleACPlantDataChange(plant.id, "acPlantNo", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.evaTempIn}
                          onChange={(e) => handleACPlantDataChange(plant.id, "evaTempIn", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.evaTempOut}
                          onChange={(e) => handleACPlantDataChange(plant.id, "evaTempOut", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.tevTempIn}
                          onChange={(e) => handleACPlantDataChange(plant.id, "tevTempIn", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.tevTempOut}
                          onChange={(e) => handleACPlantDataChange(plant.id, "tevTempOut", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.condTempIn}
                          onChange={(e) => handleACPlantDataChange(plant.id, "condTempIn", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.condTempOut}
                          onChange={(e) => handleACPlantDataChange(plant.id, "condTempOut", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={plant.remarks}
                          onChange={(e) => handleACPlantDataChange(plant.id, "remarks", e.target.value)}
                          maxLength={100}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Record of Values in Compartments Section */}
          <div className="space-y-4">
            <div className="head-box">
              <h4 className="text-lg font-semibold">Record of Values in Compartments</h4>
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={formData.compartmentRecords.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  updateCompartmentRecordRows(count);
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table className="table-auto border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Sr No.</TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Compartment Name<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Occupancy<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Fed by ATU/HE<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Fed by AC plant<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={4} className="border border-gray-300 text-center">Temperature<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">RH(%)<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Remarks<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">D<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">A<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Dry Bulb<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Wet Bulb<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Design<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Measured<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center">D<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">A<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">D<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">A<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.compartmentRecords.map((record, index) => (
                    <TableRow key={record.id}>
                      <TableCell className="border border-gray-300 text-center">{record.srNo}</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.compartmentName}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "compartmentName", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.occupancyD}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "occupancyD", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.occupancyA}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "occupancyA", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.fedByATU}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "fedByATU", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.fedByACPlant}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "fedByACPlant", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.dryBulbD}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "dryBulbD", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.dryBulbA}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "dryBulbA", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.wetBulbD}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "wetBulbD", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.wetBulbA}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "wetBulbA", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.rhDesign}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "rhDesign", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.rhMeasured}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "rhMeasured", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.remarks}
                          onChange={(e) => handleCompartmentRecordChange(record.id, "remarks", e.target.value)}
                          maxLength={100}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Record of Values in Machinery/General Compartments Section */}
          <div className="space-y-4">
            <div className="head-box">
              <h4 className="text-lg font-semibold">Record of Values in Machinery/General Compartments</h4>
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={formData.machineryRecords.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  updateMachineryRecordRows(count);
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table className="table-auto border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Sr No.</TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Compartment Name<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Occupancy<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Fed by ATU/HE<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Fed by Supply/Exhaust<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={4} className="border border-gray-300 text-center">Temperature<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Relative Humidity(%)<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={3} className="border border-gray-300 text-center">Remarks<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">D<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">A<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Dry Bulb<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Wet Bulb<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Design<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Measured<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="border border-gray-300 text-center">D<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">A<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">D<span className="text-red-500">*</span></TableHead>
                    <TableHead className="border border-gray-300 text-center">A<span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.machineryRecords.map((record, index) => (
                    <TableRow key={record.id}>
                      <TableCell className="border border-gray-300 text-center">{record.srNo}</TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.compartmentName}
                          onChange={(e) => handleMachineryRecordChange(record.id, "compartmentName", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.occupancyD}
                          onChange={(e) => handleMachineryRecordChange(record.id, "occupancyD", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.occupancyA}
                          onChange={(e) => handleMachineryRecordChange(record.id, "occupancyA", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.fedByATU}
                          onChange={(e) => handleMachineryRecordChange(record.id, "fedByATU", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.fedBySupply}
                          onChange={(e) => handleMachineryRecordChange(record.id, "fedBySupply", e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.dryBulbD}
                          onChange={(e) => handleMachineryRecordChange(record.id, "dryBulbD", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.dryBulbA}
                          onChange={(e) => handleMachineryRecordChange(record.id, "dryBulbA", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.wetBulbD}
                          onChange={(e) => handleMachineryRecordChange(record.id, "wetBulbD", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.wetBulbA}
                          onChange={(e) => handleMachineryRecordChange(record.id, "wetBulbA", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.rhDesign}
                          onChange={(e) => handleMachineryRecordChange(record.id, "rhDesign", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.rhMeasured}
                          onChange={(e) => handleMachineryRecordChange(record.id, "rhMeasured", e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell className="border border-gray-300">
                        <Input
                          value={record.remarks}
                          onChange={(e) => handleMachineryRecordChange(record.id, "remarks", e.target.value)}
                          maxLength={100}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Authority Signature */}
          <div className="space-y-2">
            <Label htmlFor="authoritySignature" className="form_label_color">Authority Signature<span className="text-red-500">*</span></Label>
            <Input
              id="authoritySignature"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <Button type="button" onClick={handleFetchDrafts} className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold">
                FETCH DRAFTS
              </Button>
              <Button type="button" onClick={handleSaveDraft} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
                SAVE DRAFT
              </Button>
              <Button type="button" onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
                CLEAR
              </Button>
              <Button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
                SAVE
              </Button>
            </div>
      </Card>

      {/* Drafts Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Document No</TableHead>
                  <TableHead>Date of Conduct of Trials</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No drafts available</TableCell>
                  </TableRow>
                ) : (
                  drafts.map((draft, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.documentNo}</TableCell>
                      <TableCell>{draft.dateOfConductOfTrials}</TableCell>
                      <TableCell>{draft.createdDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HVACPhase2Form;

