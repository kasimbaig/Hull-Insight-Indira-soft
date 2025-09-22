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

const HeloTraversingSystemForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    type: "",
    make: "",
    year_of_manufacture: "",
    condition: "",
    checking_condition_of_motor_observations: "",
    checking_condition_of_motor_observations_remarks: "",
    checking_apparent_observations: "",
    checking_apparent_remarks: "",
    cable_winds_observations: "",
    cable_winds_remarks: "",
    checking_oil_level_observations: "",
    checking_oil_level_remarks: "",
    general_inspection_observations: "",
    general_inspection_remarks: "",
    speed_of_carriage_observations: "",
    speed_of_carriage_remarks: "",
    indicator_light_test_observations: "",
    indicator_light_test_remarks: "",
    control_desk_observations: "",
    control_desk_remarks: "",
    lubrication_of_hooking_observations: "",
    lubrication_of_hooking_remarks: "",
    replacement_of_oil_observations: "",
    replacement_of_oil_remarks: "",
    last_replacement: "",
    next_due_on: "",
    joystick_operation_observations: "",
    joystick_operation_remarks: "",
    operation_of_arm_observations: "",
    operation_of_arm_remarks: "",
    any_other_remarks: "",
    overall_observations: "",
    authority_signature: "",
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [hidDraftId, setHidDraftId] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name: string, value: string) => {
    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    
    if (["make", "type", "condition"].includes(name) && specialCharRegex.test(value)) {
      return "Special characters are not allowed";
    }
    
    if (name.includes("remarks") && value.length > 1000) {
      return "Remarks cannot exceed 1000 characters";
    }
    
    if (name === "year_of_manufacture") {
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) {
        return `Year must be between 1900 and ${currentYear}`;
      }
    }
    
    return "";
  };

  const handleSaveDraft = () => {
    const mockDraft = {
      id: Date.now().toString(),
      make: formData.make || "Draft",
      created_date: new Date().toISOString(),
      data: formData
    };
    setDrafts(prev => [...prev, mockDraft]);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.data);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    if (confirm("Are you sure you want to delete this draft?")) {
      setDrafts(prev => prev.filter(draft => draft.id !== draftId));
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all fields?")) {
      setFormData({
        ship: "",
        date_of_inspection: "",
        type: "",
        make: "",
        year_of_manufacture: "",
        condition: "",
        checking_condition_of_motor_observations: "",
        checking_condition_of_motor_observations_remarks: "",
        checking_apparent_observations: "",
        checking_apparent_remarks: "",
        cable_winds_observations: "",
        cable_winds_remarks: "",
        checking_oil_level_observations: "",
        checking_oil_level_remarks: "",
        general_inspection_observations: "",
        general_inspection_remarks: "",
        speed_of_carriage_observations: "",
        speed_of_carriage_remarks: "",
        indicator_light_test_observations: "",
        indicator_light_test_remarks: "",
        control_desk_observations: "",
        control_desk_remarks: "",
        lubrication_of_hooking_observations: "",
        lubrication_of_hooking_remarks: "",
        replacement_of_oil_observations: "",
        replacement_of_oil_remarks: "",
        last_replacement: "",
        next_due_on: "",
        joystick_operation_observations: "",
        joystick_operation_remarks: "",
        operation_of_arm_observations: "",
        operation_of_arm_remarks: "",
        any_other_remarks: "",
        overall_observations: "",
        authority_signature: "",
      });
      setHidDraftId("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: any = {};
    
    if (!formData.ship) newErrors.ship = "Ship selection is required";
    if (!formData.date_of_inspection) newErrors.date_of_inspection = "Date of inspection is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.year_of_manufacture) newErrors.year_of_manufacture = "Year of manufacture is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          HELO TRAVERSING SYSTEM
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ship Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
              Ship
            </h4>
            <Select value={formData.ship} onValueChange={(value) => handleInputChange("ship", value)}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="--Select--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHIVALIK">SHIVALIK</SelectItem>
                <SelectItem value="JAMUNA">JAMUNA</SelectItem>
                <SelectItem value="BANGARAM">BANGARAM</SelectItem>
                <SelectItem value="TARANGINI">TARANGINI</SelectItem>
                <SelectItem value="SARYU">SARYU</SelectItem>
              </SelectContent>
            </Select>
            {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
          </div>

          {/* Date of Inspection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
              Date of Inspection/Trials <span className="text-red-500 ml-1">*</span>
            </h4>
            <Input
              type="date"
              value={formData.date_of_inspection}
              onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
              className="w-full md:w-1/3"
              placeholder="DD-MM-YYYY"
            />
            {errors.date_of_inspection && <p className="text-red-500 text-sm mt-1">{errors.date_of_inspection}</p>}
          </div>

          {/* Type */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
              Type <span className="text-red-500 ml-1">*</span>
            </h4>
            <Input
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              maxLength={20}
              className="w-full md:w-1/2"
            />
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          {/* Make */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
              Make <span className="text-red-500 ml-1">*</span>
            </h4>
            <Input
              value={formData.make}
              onChange={(e) => handleInputChange("make", e.target.value)}
              maxLength={20}
              className="w-full md:w-1/2"
            />
            {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
          </div>

          {/* Year of Manufacture */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
              Year of Manufacture <span className="text-red-500 ml-1">*</span>
            </h4>
            <Input
              type="number"
              value={formData.year_of_manufacture}
              onChange={(e) => handleInputChange("year_of_manufacture", e.target.value)}
              min="1900"
              max={new Date().getFullYear()}
              className="w-full md:w-1/3"
            />
            {errors.year_of_manufacture && <p className="text-red-500 text-sm mt-1">{errors.year_of_manufacture}</p>}
          </div>

          {/* Motor Condition */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
              Checking Condition of Motor Reduction Gear Unit (Check lubrication, All Gears are Available, Abnormal/Excessive Noise) <span className="text-red-500 ml-1">*</span>
            </h4>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Filling & Drain Plugs Sealing (Check if Greasing points open/concealed with paint)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.checking_condition_of_motor_observations} onValueChange={(value) => handleInputChange("checking_condition_of_motor_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.checking_condition_of_motor_observations_remarks}
                  onChange={(e) => handleInputChange("checking_condition_of_motor_observations_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Checking Apparent Condition of Capstans */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
              Checking Apparent Condition of Capstans
            </h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">a) Support Frame Attachment to Capstan (Check for rust/corrosion)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.checking_apparent_observations} onValueChange={(value) => handleInputChange("checking_apparent_observations", value)}>
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
                  <div className="md:col-span-2">
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.checking_apparent_remarks}
                      onChange={(e) => handleInputChange("checking_apparent_remarks", e.target.value)}
                      maxLength={1000}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">b) Cable Winds on Diving Drums (check cables are properly wound on capstan)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.cable_winds_observations} onValueChange={(value) => handleInputChange("cable_winds_observations", value)}>
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
                  <div className="md:col-span-2">
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.cable_winds_remarks}
                      onChange={(e) => handleInputChange("cable_winds_remarks", e.target.value)}
                      maxLength={1000}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checking Oil Level */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
              Checking Oil Level in Reduction Gears
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.checking_oil_level_observations} onValueChange={(value) => handleInputChange("checking_oil_level_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.checking_oil_level_remarks}
                  onChange={(e) => handleInputChange("checking_oil_level_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* General Inspection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">7</span>
              General Inspection of Main Carriages, Hooking Arms and Cross Bars
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.general_inspection_observations} onValueChange={(value) => handleInputChange("general_inspection_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.general_inspection_remarks}
                  onChange={(e) => handleInputChange("general_inspection_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Speed of Carriage */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">8</span>
              Speed of Carriage (0.003 to 0.3m/sec)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.speed_of_carriage_observations} onValueChange={(value) => handleInputChange("speed_of_carriage_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.speed_of_carriage_remarks}
                  onChange={(e) => handleInputChange("speed_of_carriage_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Indicator Light Test */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">9</span>
              Indicator Light Test
            </h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">a) Electrical Cabinet(OPS Status)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.indicator_light_test_observations} onValueChange={(value) => handleInputChange("indicator_light_test_observations", value)}>
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
                  <div className="md:col-span-2">
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.indicator_light_test_remarks}
                      onChange={(e) => handleInputChange("indicator_light_test_remarks", e.target.value)}
                      maxLength={1000}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">b) Control Desk(OPS Status)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.control_desk_observations} onValueChange={(value) => handleInputChange("control_desk_observations", value)}>
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
                  <div className="md:col-span-2">
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.control_desk_remarks}
                      onChange={(e) => handleInputChange("control_desk_remarks", e.target.value)}
                      maxLength={1000}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lubrication of Hooking Points */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">10</span>
              Lubrication of Hooking Points (Check for Proper Greasing)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.lubrication_of_hooking_observations} onValueChange={(value) => handleInputChange("lubrication_of_hooking_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.lubrication_of_hooking_remarks}
                  onChange={(e) => handleInputChange("lubrication_of_hooking_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Replacement of Oil in Air Lubricator */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">11</span>
              Replacement of Oil in Air Lubricator (Check Oil level)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.replacement_of_oil_observations} onValueChange={(value) => handleInputChange("replacement_of_oil_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.replacement_of_oil_remarks}
                  onChange={(e) => handleInputChange("replacement_of_oil_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Replacement of Pulling Ropes */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">12</span>
              Replacement of Pulling Ropes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Last Replacement: <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  value={formData.last_replacement}
                  onChange={(e) => handleInputChange("last_replacement", e.target.value)}
                  placeholder="DD-MM-YYYY"
                />
              </div>
              <div>
                <Label>Next Due on: <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  value={formData.next_due_on}
                  onChange={(e) => handleInputChange("next_due_on", e.target.value)}
                  placeholder="DD-MM-YYYY"
                />
              </div>
            </div>
          </div>

          {/* Joy-stick Operation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">13</span>
              Joy-stick Operation(Check operation with joy-stick)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.joystick_operation_observations} onValueChange={(value) => handleInputChange("joystick_operation_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.joystick_operation_remarks}
                  onChange={(e) => handleInputChange("joystick_operation_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Operation of Arm Direction Changer Valve */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">14</span>
              Operation of Arm Direction Changer Valve(Working of the valve)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.operation_of_arm_observations} onValueChange={(value) => handleInputChange("operation_of_arm_observations", value)}>
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
              <div className="md:col-span-2">
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.operation_of_arm_remarks}
                  onChange={(e) => handleInputChange("operation_of_arm_remarks", e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Any Other Observation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">15</span>
              Any Other Observation <span className="text-red-500 ml-1">*</span>
            </h4>
            <Textarea
              value={formData.any_other_remarks}
              onChange={(e) => handleInputChange("any_other_remarks", e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="Remarks:"
            />
          </div>

          {/* Overall Remarks */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">16</span>
              Overall Remarks
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.overall_observations} onValueChange={(value) => handleInputChange("overall_observations", value)}>
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
          </div>

          {/* Authority Signature */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">19</span>
              Authority Signature <span className="text-red-500 ml-1">*</span>
            </h4>
            <Input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleInputChange("authority_signature", e.target.value)}
              className="w-full md:w-1/2"
            />
            <p className="text-sm text-gray-500 mt-1">No file chosen</p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
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
              onClick={handleSaveDraft}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              SAVE DRAFT
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
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </Button>
          </div>
        </form>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Draft Data</DialogTitle>
            </DialogHeader>
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
                    <TableCell colSpan={4} className="text-center">No drafts available</TableCell>
                  </TableRow>
                ) : (
                  drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.make}</TableCell>
                      <TableCell>{new Date(draft.created_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditDraft(draft)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteDraft(draft.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HeloTraversingSystemForm;
