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
  const handleAddAmbientCondition = () => {
    const newId = (formData.ambientConditions.length + 1).toString();
    setFormData(prev => ({
      ...prev,
      ambientConditions: [...prev.ambientConditions, {
        id: newId, regime: "", swpTemp0900: "", swpTemp1200: "", atmTemp0900: "", 
        atmTemp1200: "", atmRel0900: "", atmRel1200: "", remarks: ""
      }]
    }));
  };

  const handleRemoveAmbientCondition = (id: string) => {
    if (formData.ambientConditions.length > 1) {
      setFormData(prev => ({
        ...prev,
        ambientConditions: prev.ambientConditions.filter(item => item.id !== id)
      }));
    }
  };

  const handleAmbientConditionChange = (id: string, field: keyof AmbientCondition, value: string) => {
    setFormData(prev => ({
      ...prev,
      ambientConditions: prev.ambientConditions.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Similar handlers for other dynamic tables would go here...
  // (AC Plant Data, Compartment Records, Machinery Records)

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
            <div className="overflow-x-auto">
              <Table className="table-auto border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Regime<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Sea Water Temperature(C)<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Atmosphere Temperature(C)<span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2} className="border border-gray-300 text-center">Atmospheric Relativity<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Remarks<span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2} className="border border-gray-300 text-center">Action</TableHead>
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
                      <TableCell className="border border-gray-300">
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddAmbientCondition}
                          >
                            Add
                          </Button>
                          {formData.ambientConditions.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveAmbientCondition(condition.id)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
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
        <div className="card-footer flex justify-center space-x-4 p-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleFetchDrafts}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Fetch Drafts
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Save Draft
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
          >
            Save
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

