import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

const HangerDoorForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make: "",
    condition_of_hanger_door_observations: "",
    condition_of_hanger_door_observations_remarks: "",
    condition_of_guide_observations: "",
    condition_of_guide_observations_remarks: "",
    condition_of_bottom_observations: "",
    condition_of_bottom_observations_remarks: "",
    condition_of_canvas_reinforced_observations: "",
    condition_of_canvas_reinforced_observations_remarks: "",
    check_compressor_motor_observations_motor: "",
    check_compressor_motor_observations_remarks: "",
    spm_check_of_motor_observations: "",
    spm_check_of_motor_observations_remarks: "",
    top_and_bottom_limit_switches_observations: "",
    top_and_bottom_limit_switches_observations_remarks: "",
    manual_locking_hooks_observations: "",
    manual_locking_hooks_observations_remarks: "",
    condition_of_gear_box_seal_observations: "",
    condition_of_gear_box_seal_observations_remarks: "",
    greasing_of_door_hings_observations: "",
    greasing_of_door_hings_observations_remarks: "",
    operational_trails_observations: "",
    operational_trails_observations_remarks: "",
    manual_observations: "",
    manual_observations_remarks: "",
    any_other_observation_remarks: "",
    overall_remarks_observations: "",
    authority_signature: null as File | null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const handleInputChange = (name: string, value: string) => {
    // Special character validation for text fields
    if (["make"].includes(name)) {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special Characters Are Not Allowed");
        return;
      }
    }

    // Character limit and validation for remarks fields
    if (name.includes("remarks")) {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special characters are not allowed.");
        return;
      }
      if (value.length > 1000) {
        alert("Remarks cannot exceed 1000 characters.");
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload JPG, JPEG, or PNG files only.");
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        alert("File size exceeds 2MB. Please upload a smaller file.");
        e.target.value = "";
        return;
      }

      setFormData(prev => ({ ...prev, authority_signature: file }));
    }
  };

  const validateForm = () => {
    if (!formData.ship) {
      alert("Please Select Ship");
      return false;
    }

    if (!formData.date_of_inspection) {
      alert("Please Select Date of Inspection");
      return false;
    }

    if (!formData.make.trim()) {
      alert("Please Enter Make");
      return false;
    }

    // Validate all observation fields
    const observationFields = [
      { field: "condition_of_hanger_door_observations", name: "Condition of Hanger Door Observations" },
      { field: "condition_of_guide_observations", name: "Condition of Guide, End Locks, Wind Locks Observations" },
      { field: "condition_of_bottom_observations", name: "Condition of Bottom Bar Weather Strips Observations" },
      { field: "condition_of_canvas_reinforced_observations", name: "Condition of Canvas Reinforced Neo-prene Strips Observations" },
      { field: "check_compressor_motor_observations_motor", name: "Check Compressor Motor Insulation Readings Observations" },
      { field: "spm_check_of_motor_observations", name: "SPM Check of Motor Observations" },
      { field: "top_and_bottom_limit_switches_observations", name: "Top and Bottom Limit Switches Observations" },
      { field: "manual_locking_hooks_observations", name: "Manual Locking Hooks Observations" },
      { field: "condition_of_gear_box_seal_observations", name: "Condition of Gear Box Seal Observations" },
      { field: "greasing_of_door_hings_observations", name: "Greasing of Door Hings/ Grease Nipple Observations" },
      { field: "operational_trails_observations", name: "Operational Trails Hydraulically Observations" },
      { field: "manual_observations", name: "Operational Trails Manual Observations" },
      { field: "overall_remarks_observations", name: "Overall Remarks Observations" },
    ];

    for (const { field, name } of observationFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please Select ${name}`);
        return false;
      }
    }

    // Validate all remarks fields
    const remarksFields = [
      { field: "condition_of_hanger_door_observations_remarks", name: "Condition of Hanger Door Remarks" },
      { field: "condition_of_guide_observations_remarks", name: "Condition of Guide, End Locks, Wind Locks Remarks" },
      { field: "condition_of_bottom_observations_remarks", name: "Condition of Bottom Bar Weather Strips Remarks" },
      { field: "condition_of_canvas_reinforced_observations_remarks", name: "Condition of Canvas Reinforced Neo-prene Strips Remarks" },
      { field: "check_compressor_motor_observations_remarks", name: "Check Compressor Motor Insulation Readings Remarks" },
      { field: "spm_check_of_motor_observations_remarks", name: "SPM Check of Motor Remarks" },
      { field: "top_and_bottom_limit_switches_observations_remarks", name: "Top and Bottom Limit Switches Remarks" },
      { field: "manual_locking_hooks_observations_remarks", name: "Manual Locking Hooks Remarks" },
      { field: "condition_of_gear_box_seal_observations_remarks", name: "Condition of Gear Box Seal Remarks" },
      { field: "greasing_of_door_hings_observations_remarks", name: "Greasing of Door Hings/ Grease Nipple Remarks" },
      { field: "operational_trails_observations_remarks", name: "Operational Trails Hydraulically Remarks" },
      { field: "manual_observations_remarks", name: "Operational Trails Manual Remarks" },
      { field: "any_other_observation_remarks", name: "Any Other Observation Remarks" },
    ];

    for (const { field, name } of remarksFields) {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        alert(`Please Enter ${name}`);
        return false;
      }
    }

    if (!formData.authority_signature) {
      alert("Please Upload Authority Signature");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const handleSaveDraft = () => {
    if (!formData.make.trim()) {
      alert("Please Enter Make before saving as draft");
      return;
    }
    
    console.log("Draft saved:", formData);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    // Mock draft data
    const mockDrafts = [
      { id: 1, make: "Sample Make 1", created_date: "2024-01-15 10:30:00" },
      { id: 2, make: "Sample Make 2", created_date: "2024-01-16 14:45:00" },
    ];
    setDrafts(mockDrafts);
    setIsDraftModalOpen(true);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      make: "",
      condition_of_hanger_door_observations: "",
      condition_of_hanger_door_observations_remarks: "",
      condition_of_guide_observations: "",
      condition_of_guide_observations_remarks: "",
      condition_of_bottom_observations: "",
      condition_of_bottom_observations_remarks: "",
      condition_of_canvas_reinforced_observations: "",
      condition_of_canvas_reinforced_observations_remarks: "",
      check_compressor_motor_observations_motor: "",
      check_compressor_motor_observations_remarks: "",
      spm_check_of_motor_observations: "",
      spm_check_of_motor_observations_remarks: "",
      top_and_bottom_limit_switches_observations: "",
      top_and_bottom_limit_switches_observations_remarks: "",
      manual_locking_hooks_observations: "",
      manual_locking_hooks_observations_remarks: "",
      condition_of_gear_box_seal_observations: "",
      condition_of_gear_box_seal_observations_remarks: "",
      greasing_of_door_hings_observations: "",
      greasing_of_door_hings_observations_remarks: "",
      operational_trails_observations: "",
      operational_trails_observations_remarks: "",
      manual_observations: "",
      manual_observations_remarks: "",
      any_other_observation_remarks: "",
      overall_remarks_observations: "",
      authority_signature: null,
    });
  };

  const shipOptions = [
    "SHIVALIK", "JAMUNA", "BANGARAM", "TARANGINI", "SARYU", "KUMBHIR", "T-83", 
    "AIRAVAT", "KHANJAR", "SHUDERSHINI", "TRISHUL", "TEG", "RANVIJAY", "KIRPAN", 
    "DELHI", "SURVEKSHAK", "JYOTI", "SUJATA", "KABRA", "CANKARSO", "T-84", "VIBHUTI"
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">HULL INSIGHT</h4>
            <h2 className="text-2xl font-bold text-gray-900">HANGER DOOR</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Section 1: Ship */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">1</span>
                <Label className="text-lg font-semibold">Ship</Label>
              </div>
              <Select value={formData.ship} onValueChange={(value) => handleInputChange("ship", value)}>
                <SelectTrigger className="w-full md:w-1/3">
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  {shipOptions.map((ship, index) => (
                    <SelectItem key={index} value={ship}>{ship}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section 2: Date of Inspection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">2</span>
                <Label className="text-lg font-semibold">Date of Inspection/Trials <span className="text-red-500">*</span></Label>
              </div>
              <Input
                type="date"
                value={formData.date_of_inspection}
                onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                className="w-full md:w-1/3"
                required
              />
            </div>

            {/* Section 3: Make */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">3</span>
                <Label className="text-lg font-semibold">Make <span className="text-red-500">*</span></Label>
              </div>
              <Input
                value={formData.make}
                onChange={(e) => handleInputChange("make", e.target.value)}
                maxLength={20}
                className="w-full md:w-1/2"
                required
              />
            </div>

            {/* Section 4: Condition of Hanger Door */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">4</span>
                <div>
                  <Label className="text-lg font-semibold">Condition of Hanger Door</Label>
                  <p className="text-sm text-gray-600">a) Corrosion, Dents etc.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_hanger_door_observations} onValueChange={(value) => handleInputChange("condition_of_hanger_door_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_hanger_door_observations_remarks}
                    onChange={(e) => handleInputChange("condition_of_hanger_door_observations_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Continue with remaining sections - abbreviated for brevity */}
            {[
              { num: 5, title: "Condition of Guide, End Locks, Wind Locks", subtitle: "a) Bents, Kinks, Damage", obs: "condition_of_guide_observations", remarks: "condition_of_guide_observations_remarks" },
              { num: 6, title: "Condition of Bottom Bar Weather Strips", subtitle: "a) Weather and Tear/ Damage", obs: "condition_of_bottom_observations", remarks: "condition_of_bottom_observations_remarks" },
              { num: 7, title: "Condition of Canvas Reinforced Neo-prene Strips", subtitle: "a) Weather and Tear/ Damage", obs: "condition_of_canvas_reinforced_observations", remarks: "condition_of_canvas_reinforced_observations_remarks" },
            ].map((section) => (
              <div key={section.num} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">{section.num}</span>
                  <div>
                    <Label className="text-lg font-semibold">{section.title}</Label>
                    <p className="text-sm text-gray-600">{section.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData[section.obs as keyof typeof formData] as string} onValueChange={(value) => handleInputChange(section.obs, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData[section.remarks as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(section.remarks, e.target.value)}
                      rows={2}
                      maxLength={1000}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Section 8: Check Compressor Motor */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">8</span>
                <div>
                  <Label className="text-lg font-semibold">Check Compressor Motor Insulation Readings</Label>
                  <p className="text-sm text-gray-600">a) Insulation &gt; 2 M-ohm</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.check_compressor_motor_observations_motor} onValueChange={(value) => handleInputChange("check_compressor_motor_observations_motor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OPS">OPS</SelectItem>
                      <SelectItem value="NONOPS">NON-OPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.check_compressor_motor_observations_remarks}
                    onChange={(e) => handleInputChange("check_compressor_motor_observations_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Section 9: SPM Check */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">9</span>
                <div>
                  <Label className="text-lg font-semibold">SPM Check of Motor (For Motor Vibration)</Label>
                  <p className="text-sm text-gray-600">a) 0-20 dbm</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.spm_check_of_motor_observations} onValueChange={(value) => handleInputChange("spm_check_of_motor_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GREEN">GREEN (0-20)</SelectItem>
                      <SelectItem value="YELLOW">YELLOW (20-35)</SelectItem>
                      <SelectItem value="RED">RED (&gt; 35)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.spm_check_of_motor_observations_remarks}
                    onChange={(e) => handleInputChange("spm_check_of_motor_observations_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Remaining sections abbreviated for brevity - similar pattern */}
            {[
              { num: 10, title: "Top and Bottom Limit Switches", subtitle: "a) Check Operation", obs: "top_and_bottom_limit_switches_observations", remarks: "top_and_bottom_limit_switches_observations_remarks", options: ["OPS", "NON-OPS"] },
              { num: 11, title: "Manual Locking Hooks", subtitle: "a) Check the Alignment and Locking", obs: "manual_locking_hooks_observations", remarks: "manual_locking_hooks_observations_remarks", options: ["SAT", "UNSAT", "SAT WITH OBSERVATION"] },
              { num: 12, title: "Condition of Gear Box Seal", subtitle: "a) Weather and Tear/ Damage", obs: "condition_of_gear_box_seal_observations", remarks: "condition_of_gear_box_seal_observations_remarks", options: ["SAT", "UNSAT", "SAT WITH OBSERVATION"] },
              { num: 13, title: "Greasing of Door Hings/ Grease Nipple", subtitle: "", obs: "greasing_of_door_hings_observations", remarks: "greasing_of_door_hings_observations_remarks", options: ["SAT", "UNSAT", "SAT WITH OBSERVATION"] },
            ].map((section) => (
              <div key={section.num} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">{section.num}</span>
                  <div>
                    <Label className="text-lg font-semibold">{section.title}</Label>
                    {section.subtitle && <p className="text-sm text-gray-600">{section.subtitle}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData[section.obs as keyof typeof formData] as string} onValueChange={(value) => handleInputChange(section.obs, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        {section.options.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData[section.remarks as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(section.remarks, e.target.value)}
                      rows={2}
                      maxLength={1000}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Section 14: Operational Trails */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">14</span>
                <Label className="text-lg font-semibold">Operational Trails</Label>
              </div>
              
              <div className="mb-6">
                <Label className="text-md font-medium mb-2 block">a) Hydraulically</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.operational_trails_observations} onValueChange={(value) => handleInputChange("operational_trails_observations", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.operational_trails_observations_remarks}
                      onChange={(e) => handleInputChange("operational_trails_observations_remarks", e.target.value)}
                      rows={2}
                      maxLength={1000}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-md font-medium mb-2 block">b) Manual</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.manual_observations} onValueChange={(value) => handleInputChange("manual_observations", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.manual_observations_remarks}
                      onChange={(e) => handleInputChange("manual_observations_remarks", e.target.value)}
                      rows={2}
                      maxLength={1000}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 15: Any Other Observation */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">15</span>
                <Label className="text-lg font-semibold">Any Other Observation</Label>
              </div>
              <div>
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.any_other_observation_remarks}
                  onChange={(e) => handleInputChange("any_other_observation_remarks", e.target.value)}
                  rows={2}
                  maxLength={1000}
                />
              </div>
            </div>

            {/* Section 16: Overall Remarks */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">16</span>
                <Label className="text-lg font-semibold">Overall Remarks</Label>
              </div>
              <div className="w-full md:w-1/3">
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.overall_remarks_observations} onValueChange={(value) => handleInputChange("overall_remarks_observations", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Section 17: Authority Signature */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">17</span>
                <Label className="text-lg font-semibold">Authority Signature <span className="text-red-500">*</span></Label>
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={handleFetchDrafts}>
                Fetch Drafts
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                SAVE DRAFT
              </Button>
              <Button type="button" variant="destructive" onClick={handleClear}>
                Clear
              </Button>
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Make</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No drafts available
                    </TableCell>
                  </TableRow>
                ) : (
                  drafts.map((draft: any, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.make}</TableCell>
                      <TableCell>{draft.created_date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

export default HangerDoorForm;
