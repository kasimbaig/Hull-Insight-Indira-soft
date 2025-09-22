import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BoatDavitForm: React.FC = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make: "",
    type: "",
    year_manufacture: "",
    date_last_load_test: "",
    last_load_test_due_date: "",
    remarks_last_load_test: "",
    date_last_testing_wire_rope: "",
    last_testing_wire_rope_due_date: "",
    remarks_last_testing_wire_rope: "",
    date_last_visual_survey: "",
    last_visual_survey_due_date: "",
    remarks_last_visual_survey: "",
    date_fitment: "",
    replacement_due_date: "",
    remarks_fitment: "",
    observations_jb: "",
    remarks_jb: "",
    observations_switches: "",
    remarks_switches: "",
    observations_indicator: "",
    remarks_indicator: "",
    observations_oil_level: "",
    remarks_oil_level: "",
    observations_oc300: "",
    remarks_oc300: "",
    observations_foundations: "",
    remarks_foundations: "",
    observations_grease_mechanical: "",
    remarks_grease_mechanical: "",
    observations_greasing_points: "",
    remarks_greasing_points: "",
    observations_hoisting_speed: "",
    remarks_hoisting_speed: "",
    observations_power_lowering: "",
    remarks_power_lowering: "",
    observations_gravity: "",
    remarks_gravity: "",
    observations_slowing: "",
    remarks_slowing: "",
    observations_drive: "",
    remarks_drive: "",
    observations_limit_switch: "",
    remarks_limit_switch: "",
    observations_conditions: "",
    remarks_conditions: "",
    observations_pulley: "",
    remarks_pulley: "",
    observations_motor: "",
    remarks_motor: "",
    remarks_any_other: "",
    observations_overall: "",
    remarks_overall: "",
    authority_signature: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      authority_signature: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const ships = [
    "SHIVALIK", "JAMUNA", "BANGARAM", "TARANGINI", "SARYU", "KUMBHIR", "T-83", "AIRAVAT",
    "KHANJAR", "SHUDERSHINI", "TRISHUL", "TEG", "RANVIJAY", "KIRPAN", "DELHI", "SURVEKSHAK",
    "JYOTI", "SUJATA", "KABRA", "CANKARSO", "T-84", "VIBHUTI", "NISHANK", "MAGAR", "BEAS",
    "SUVERNA", "SAHYADRI", "PRALAYA", "CHERIYAM", "SATPURA", "JALASHWA", "TARKASH", "KARMUK",
    "SUTLEJ", "SUMEDHA", "PRABAL", "CORA DIVH", "BATTIMALV", "CHENNAI", "SUMITRA", "T-82",
    "KUTHAR", "KONDUL", "SUBHDRA", "DARSHAK", "BITRA", "CHETLAT", "NIREEKSHAK", "KARUVA",
    "DEEPAK", "SHAKTI", "KOLKATA", "INVETIGATOR", "SHARDA", "MUMBAI", "GOMTI", "BETWA",
    "NASHAK", "KOSWARI", "CHEETAH", "TALWAR", "KESARI", "ADITYA", "BARATANG", "KORA",
    "KULISH", "RANA", "KALPENI", "VIPUL", "TABAR", "TRINKAND", "KOCHI", "SUKANYA", "SAVITRI",
    "GULDAR", "BRAHMAPUTRA", "GHARIAL", "RANVIR", "NIRUPAK", "VINASH", "KIRCH", "SANDHAYAK",
    "VIDYUT", "TIR", "GAJ", "CAR NICOBAR", "SUNAYNA", "MYSORE"
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">BOAT DAVIT</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">1. Ship</Label>
              <Select value={formData.ship} onValueChange={(value) => handleSelectChange("ship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  {ships.map((ship) => (
                    <SelectItem key={ship} value={ship}>
                      {ship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section 2: Date of Inspection/Trials */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">
                2. Date of Inspection/Trials <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="date_of_inspection"
                value={formData.date_of_inspection}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Section 3: Make */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">
                3. Make <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                maxLength={20}
                required
              />
            </div>

            {/* Section 4: Type */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">
                4. Type <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                maxLength={20}
                required
              />
            </div>

            {/* Section 5: Year of Manufacture */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">
                5. Year of Manufacture <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="year_manufacture"
                value={formData.year_manufacture}
                onChange={handleInputChange}
                min="1900"
                max="2025"
                required
              />
            </div>

            {/* Section 6: Load Testing of Davit */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">6. Load Testing of Davit</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Period of Test not to Exceed 27 Month.</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Date of Last Load Test: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="date_last_load_test"
                      value={formData.date_last_load_test}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Next Due Date: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="last_load_test_due_date"
                      value={formData.last_load_test_due_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_last_load_test"
                      value={formData.remarks_last_load_test}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Load Testing Wire Rope */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">7. Load Testing Wire Rope</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Period of Test not to Exceed 27 Month.</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Date of Last Load Test: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="date_last_testing_wire_rope"
                      value={formData.date_last_testing_wire_rope}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Next Due Date: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="last_testing_wire_rope_due_date"
                      value={formData.last_testing_wire_rope_due_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_last_testing_wire_rope"
                      value={formData.remarks_last_testing_wire_rope}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8: Serviceability Checks/ Visual Survey of Rope */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">8. Serviceability Checks/ Visual Survey of Rope</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">
                  a) Date of Last Visual Survey. To be Examined by Refitting Agencies at Intermediate
                  Intervals not Exceeding 2 years. Check Wire Rope for Sign of Excessive Wear, Corrosion or Other Defects.
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Date Last Visual Survey <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="date_last_visual_survey"
                      value={formData.date_last_visual_survey}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Next Due Date: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="last_visual_survey_due_date"
                      value={formData.last_visual_survey_due_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_last_visual_survey"
                      value={formData.remarks_last_visual_survey}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: Wire Rope */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">9. Wire Rope</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Date of Fitment. To be Changed Every Five Years,</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Date of Fitment: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="date_fitment"
                      value={formData.date_fitment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Replacement Due Date: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="replacement_due_date"
                      value={formData.replacement_due_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_fitment"
                      value={formData.remarks_fitment}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10: Condition of JB/ Control */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">10. Condition of JB/ Control</Label>
              
              <div className="ml-4 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Electrical Hygiene, Condition of Connectors Lugs. Check Tightness of Electrical Cable Connections and Fasteners</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_jb} onValueChange={(value) => handleSelectChange("observations_jb", value)}>
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
                        name="remarks_jb"
                        value={formData.remarks_jb}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Status of Switches</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_switches} onValueChange={(value) => handleSelectChange("observations_switches", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPS">OPS</SelectItem>
                          <SelectItem value="NON-OPS">NON-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Remarks: <span className="text-red-500">*</span></Label>
                      <Textarea
                        name="remarks_switches"
                        value={formData.remarks_switches}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) Status of Indicators</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_indicator} onValueChange={(value) => handleSelectChange("observations_indicator", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPS">OPS</SelectItem>
                          <SelectItem value="NON-OPS">NON-OPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Remarks: <span className="text-red-500">*</span></Label>
                      <Textarea
                        name="remarks_indicator"
                        value={formData.remarks_indicator}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11: Oil Level in Gear Box */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">11. Oil Level in Gear Box</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Check Oil Level</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_oil_level} onValueChange={(value) => handleSelectChange("observations_oil_level", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">LOW</SelectItem>
                        <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                        <SelectItem value="HIGH">HIGH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_oil_level"
                      value={formData.remarks_oil_level}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 12: Oil in Gear Box */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">12. Oil in Gear Box</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) OC 300</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_oc300} onValueChange={(value) => handleSelectChange("observations_oc300", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_oc300"
                      value={formData.remarks_oc300}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 13: Conditions of Foundations */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">13. Conditions of Foundations</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Corrosion/ Pitting/ Unpainted/ Condition of Bond Strap</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_foundations} onValueChange={(value) => handleSelectChange("observations_foundations", value)}>
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
                      name="remarks_foundations"
                      value={formData.remarks_foundations}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 14: Greasing of Mechanical Parts */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">14. Greasing of Mechanical Parts</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Check Application of Grease on Mechanical/ Moving Parts</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_grease_mechanical} onValueChange={(value) => handleSelectChange("observations_grease_mechanical", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="ABNORMAL NOISE">ABNORMAL NOISE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_grease_mechanical"
                      value={formData.remarks_grease_mechanical}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 15: Greasing Points */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">15. Greasing Points</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Condition of Greasing Points, Nipples-Clean/ Painted/ Choked</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_greasing_points} onValueChange={(value) => handleSelectChange("observations_greasing_points", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="PAINTED">PAINTED</SelectItem>
                        <SelectItem value="CHOKED">CHOKED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_greasing_points"
                      value={formData.remarks_greasing_points}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 16: Operational Trials at SWL */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">16. Operational Trials at SWL</Label>
              
              <div className="ml-4 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Hoisting Speed - 0-15 m/min</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_hoisting_speed} onValueChange={(value) => handleSelectChange("observations_hoisting_speed", value)}>
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
                        name="remarks_hoisting_speed"
                        value={formData.remarks_hoisting_speed}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Power Lowering Speed - 0-15 m/min</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_power_lowering} onValueChange={(value) => handleSelectChange("observations_power_lowering", value)}>
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
                        name="remarks_power_lowering"
                        value={formData.remarks_power_lowering}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) Gravity Lowering Speed - 18-36 m/min</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_gravity} onValueChange={(value) => handleSelectChange("observations_gravity", value)}>
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
                        name="remarks_gravity"
                        value={formData.remarks_gravity}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">d) Slowing Speed - 1 RPM</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label>Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_slowing} onValueChange={(value) => handleSelectChange("observations_slowing", value)}>
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
                        name="remarks_slowing"
                        value={formData.remarks_slowing}
                        onChange={handleInputChange}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 17: Drive */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">17. Drive</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Check for Excessive Noise During Operation</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_drive} onValueChange={(value) => handleSelectChange("observations_drive", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="ABNORMAL SOUND">ABNORMAL SOUND OR EXCESSIVE NOISE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_drive"
                      value={formData.remarks_drive}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 18: Limit Switch */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">18. Limit Switch</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Functioning of Limit Switches</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_limit_switch} onValueChange={(value) => handleSelectChange("observations_limit_switch", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPS">OPS</SelectItem>
                        <SelectItem value="NON-OPS">NON-OPS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      name="remarks_limit_switch"
                      value={formData.remarks_limit_switch}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 19: Condition of Davit Arm */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">19. Condition of Davit Arm</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Rust/ Corrosion</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_conditions} onValueChange={(value) => handleSelectChange("observations_conditions", value)}>
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
                      name="remarks_conditions"
                      value={formData.remarks_conditions}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 20: Condition of Pulley */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">20. Condition of Pulley</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) Rust/ Corrosion</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_pulley} onValueChange={(value) => handleSelectChange("observations_pulley", value)}>
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
                      name="remarks_pulley"
                      value={formData.remarks_pulley}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 21: Insulation Motor */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">21. Insulation Motor</Label>
              <div className="ml-4 space-y-2">
                <Label className="text-base font-medium">a) &gt; 2 M-Ohms</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observations_motor} onValueChange={(value) => handleSelectChange("observations_motor", value)}>
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
                      name="remarks_motor"
                      value={formData.remarks_motor}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 22: Any Other Observation */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">22. Any Other Observation</Label>
              <div>
                <Label>Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  name="remarks_any_other"
                  value={formData.remarks_any_other}
                  onChange={handleInputChange}
                  rows={2}
                  required
                />
              </div>
            </div>

            {/* Section 23: Overall Remarks */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">23. Overall Remarks</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_overall} onValueChange={(value) => handleSelectChange("observations_overall", value)}>
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
                    name="remarks_overall"
                    value={formData.remarks_overall}
                    onChange={handleInputChange}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 24: Authority Signature */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                24. Authority Signature <span className="text-red-500">*</span>
              </Label>
              <div>
                <Input
                  type="file"
                  name="authority_signature"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, JPEG, PNG (Max 2MB)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button
                type="button"
                onClick={() => alert('Fetch Drafts functionality not implemented yet')}
                className="px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold uppercase"
              >
                FETCH DRAFTS
              </Button>
              <Button
                type="button"
                onClick={() => alert('Save Draft functionality not implemented yet')}
                className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
              >
                SAVE DRAFT
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setFormData({
                    ship: "",
                    dateOfInspection: "",
                    make: "",
                    yearOfManufacture: "",
                    observationsBoatDavit: "",
                    remarksBoatDavit: "",
                    observationsWinchMotor: "",
                    remarksWinchMotor: "",
                    observationsWireRope: "",
                    remarksWireRope: "",
                    observationsHydraulicSystem: "",
                    remarksHydraulicSystem: "",
                    observationsOperationalTrials: "",
                    remarksOperationalTrials: "",
                    observationsOilLevel: "",
                    remarksOilLevel: "",
                    observationsOilChange: "",
                    remarksOilChange: "",
                    observationsGreasing: "",
                    remarksGreasing: "",
                    remarksAnyOther: "",
                    observationsOverall: "",
                    authoritySignature: null,
                  });
                }}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatDavitForm;
