import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, FileText, Trash2, Edit } from "lucide-react";

const CargoPassengerGalleyLiftsForm: React.FC = () => {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string>("");

  const [formData, setFormData] = useState({
    // Basic Information (Sections 1-5)
    ship: "",
    date_of_inspection: "",
    make: "",
    type: "",
    year_manufacture: "",
    documents: "",
    maintenance: "",
    
    // Section 6: Structure
    date_last_structural_survey: "",
    remarks_last_structural_survey: "",
    
    // Section 7: Maintenance Record/ Inspection Log
    // Electrical Insulation
    observations_weekly: "",
    remarks_weekly: "",
    observations_prior_sailing: "",
    remarks_prior_sailing: "",
    
    // Inspection Log for Cargo and Passenger Remote
    observations_daily_inspection: "",
    remarks_daily_inspection: "",
    observations_once_ten_days: "",
    remarks_once_ten_days: "",
    observations_once_3months: "",
    remarks_once_3months: "",
    observations_after_sailing: "",
    remarks_after_sailing: "",
    
    // Inspection Log/ Record - Galley Lifts
    observations_inspection_3months: "",
    remarks_inspection_3months: "",
    observations_sailing: "",
    remarks_sailing: "",
    
    // Section 8: Greasing
    observations_greasing: "",
    remarks_greasing: "",
    observations_grease_layer: "",
    remarks_grease_layer: "",
    observations_bearing: "",
    remarks_bearing: "",
    observations_lift_guides: "",
    remarks_lift_guides: "",
    observations_chain_holder: "",
    remarks_chain_holder: "",
    observations_rollers: "",
    remarks_rollers: "",
    observations_cabin: "",
    remarks_cabin: "",
    observations_wire_rope: "",
    remarks_wire_rope: "",
    observations_ss: "",
    remarks_ss: "",
    
    // Section 9: Oil
    remarks_oil_type: "",
    observations_oil_level: "",
    remarks_oil_level: "",
    date_oil_change: "",
    remarks_oil_change: "",
    date_last_oil_analysis: "",
    remarks_last_oil_analysis: "",
    observations_oil_analysis: "",
    remarks_oil_analysis: "",
    observations_oil_leakage: "",
    remarks_oil_leakage: "",
    
    // Section 10: Visual Condition
    observations_lift_shaft: "",
    remarks_lift_shaft: "",
    observations_cabin_structure: "",
    remarks_cabin_structure: "",
    observations_counter: "",
    remarks_counter: "",
    observations_cabin_door: "",
    remarks_cabin_door: "",
    observations_operating_machine: "",
    remarks_operating_machine: "",
    observations_structure: "",
    remarks_structure: "",
    observations_exposed_part: "",
    remarks_exposed_part: "",
    observations_cabin_roof: "",
    remarks_cabin_roof: "",
    observations_brake: "",
    remarks_brake: "",
    observations_wear_tear: "",
    remarks_wear_tear: "",
    observations_equip_fastening: "",
    remarks_equip_fastening: "",
    observations_circuit_breaker: "",
    remarks_circuit_breaker: "",
    
    // Section 11: Wire Ropes
    observations_visual: "",
    remarks_visual: "",
    date_last_changed: "",
    remarks_last_changed: "",
    date_last_service: "",
    remarks_last_service: "",
    observations_ropes: "",
    remarks_ropes: "",
    
    // Section 12: Electric Checks
    observations_insulation: "",
    remarks_insulation: "",
    observations_spm: "",
    remarks_spm: "",
    observations_electrical: "",
    remarks_electrical: "",
    observations_grounding: "",
    remarks_grounding: "",
    observations_jb: "",
    remarks_jb: "",
    
    // Section 13: Electric Checks by ETMA
    observations_completed: "",
    remarks_completed: "",
    observations_report: "",
    remarks_report: "",
    
    // Section 14: Limit Switches
    observations_ss1: "",
    remarks_ss2: "",
    observations_limit_switches: "",
    remarks_limit_switches: "",
    
    // Section 15: Load Testing
    date_last_load_testing: "",
    remarks_last_load_testing: "",
    observations_check_certi: "",
    remarks_check_certi: "",
    
    // Section 16: Operational / Functional Check
    observations_lifting_speed: "",
    remarks_lifting_speed: "",
    observations_lowering_speed: "",
    remarks_lowering_speed: "",
    observations_operation_limit: "",
    remarks_operation_limit: "",
    observations_accurate: "",
    remarks_accurate: "",
    observations_simulate: "",
    remarks_simulate: "",
    observations_free_movement: "",
    remarks_free_movement: "",
    observations_hindered: "",
    remarks_hindered: "",
    observations_oil_leakeges: "",
    remarks_oil_leakeges: "",
    observations_excessive: "",
    remarks_excessive: "",
    observations_electro_magnet: "",
    remarks_electro_magnet: "",
    observations_manual_brake: "",
    remarks_manual_brake: "",
    observations_auto_catch: "",
    remarks_auto_catch: "",
    observations_operation_indicator: "",
    remarks_operation_indicator: "",
    observations_safety_check: "",
    remarks_safety_check: "",
    
    // Section 17: Other Observation
    observations_other_observ: "",
    remarks_other_observ: "",
    
    // Section 18: Overall Remarks
    remarks_overall: "",
    
    // Section 21: Safety and Compliance Check
    observations_emergency_procedures: "",
    remarks_emergency_procedures: "",
    observations_safety_equipment: "",
    remarks_safety_equipment: "",
    
    // Section 22: Additional Inspection Points
    observations_safety_systems: "",
    remarks_safety_systems: "",
    observations_emergency_procedures_22: "",
    remarks_emergency_procedures_22: "",
    
    // Section 23: Final Inspection Report
    inspection_status: "",
    remarks_inspection_status: "",
    recommendations: "",
    
    // Section 24: Authority Signature
    authority_signature: null as File | null,
  });

  const [pendingObservations, setPendingObservations] = useState([
    { equipment: "", observation: "", remarks: "" }
  ]);

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePendingObservationChange = (index: number, field: string, value: string) => {
    const updated = [...pendingObservations];
    updated[index] = { ...updated[index], [field]: value };
    setPendingObservations(updated);
  };

  const addPendingObservation = () => {
    setPendingObservations([...pendingObservations, { equipment: "", observation: "", remarks: "" }]);
  };

  const removePendingObservation = (index: number) => {
    if (pendingObservations.length > 1) {
      setPendingObservations(pendingObservations.filter((_, i) => i !== index));
    }
  };

  // Draft functionality
  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      pendingObservations,
      timestamp: new Date().toISOString(),
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('cargoPassengerGalleyLiftsDrafts') || '[]');
    const newDraft = {
      id: Date.now().toString(),
      data: draftData,
      createdAt: new Date().toISOString(),
    };
    
    existingDrafts.push(newDraft);
    localStorage.setItem('cargoPassengerGalleyLiftsDrafts', JSON.stringify(existingDrafts));
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('cargoPassengerGalleyLiftsDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draftId: string) => {
    const draft = drafts.find(d => d.id === draftId);
    if (draft) {
      setFormData(draft.data);
      setPendingObservations(draft.data.pendingObservations || [{ equipment: "", observation: "", remarks: "" }]);
      setHidDraftId(draftId);
      setIsDraftModalOpen(false);
    }
  };

  const handleDeleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(d => d.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('cargoPassengerGalleyLiftsDrafts', JSON.stringify(updatedDrafts));
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      make: "",
      type: "",
      year_manufacture: "",
      documents: "",
      maintenance: "",
      date_last_structural_survey: "",
      remarks_last_structural_survey: "",
      observations_weekly: "",
      remarks_weekly: "",
      observations_prior_sailing: "",
      remarks_prior_sailing: "",
      observations_daily_inspection: "",
      remarks_daily_inspection: "",
      observations_once_ten_days: "",
      remarks_once_ten_days: "",
      observations_once_3months: "",
      remarks_once_3months: "",
      observations_after_sailing: "",
      remarks_after_sailing: "",
      observations_inspection_3months: "",
      remarks_inspection_3months: "",
      observations_sailing: "",
      remarks_sailing: "",
      observations_greasing: "",
      remarks_greasing: "",
      observations_grease_layer: "",
      remarks_grease_layer: "",
      observations_bearing: "",
      remarks_bearing: "",
      observations_lift_guides: "",
      remarks_lift_guides: "",
      observations_chain_holder: "",
      remarks_chain_holder: "",
      observations_rollers: "",
      remarks_rollers: "",
      observations_cabin: "",
      remarks_cabin: "",
      observations_wire_rope: "",
      remarks_wire_rope: "",
      observations_ss: "",
      remarks_ss: "",
      remarks_oil_type: "",
      observations_oil_level: "",
      remarks_oil_level: "",
      date_oil_change: "",
      remarks_oil_change: "",
      date_last_oil_analysis: "",
      remarks_last_oil_analysis: "",
      observations_oil_analysis: "",
      remarks_oil_analysis: "",
      observations_oil_leakage: "",
      remarks_oil_leakage: "",
      observations_lift_shaft: "",
      remarks_lift_shaft: "",
      observations_cabin_structure: "",
      remarks_cabin_structure: "",
      observations_counter: "",
      remarks_counter: "",
      observations_cabin_door: "",
      remarks_cabin_door: "",
      observations_operating_machine: "",
      remarks_operating_machine: "",
      observations_structure: "",
      remarks_structure: "",
      observations_exposed_part: "",
      remarks_exposed_part: "",
      observations_cabin_roof: "",
      remarks_cabin_roof: "",
      observations_brake: "",
      remarks_brake: "",
      observations_wear_tear: "",
      remarks_wear_tear: "",
      observations_equip_fastening: "",
      remarks_equip_fastening: "",
      observations_circuit_breaker: "",
      remarks_circuit_breaker: "",
      observations_visual: "",
      remarks_visual: "",
      date_last_changed: "",
      remarks_last_changed: "",
      date_last_service: "",
      remarks_last_service: "",
      observations_ropes: "",
      remarks_ropes: "",
      observations_insulation: "",
      remarks_insulation: "",
      observations_spm: "",
      remarks_spm: "",
      observations_electrical: "",
      remarks_electrical: "",
      observations_grounding: "",
      remarks_grounding: "",
      observations_jb: "",
      remarks_jb: "",
      observations_completed: "",
      remarks_completed: "",
      observations_report: "",
      remarks_report: "",
      observations_ss1: "",
      remarks_ss2: "",
      observations_limit_switches: "",
      remarks_limit_switches: "",
      date_last_load_testing: "",
      remarks_last_load_testing: "",
      observations_check_certi: "",
      remarks_check_certi: "",
      observations_lifting_speed: "",
      remarks_lifting_speed: "",
      observations_lowering_speed: "",
      remarks_lowering_speed: "",
      observations_operation_limit: "",
      remarks_operation_limit: "",
      observations_accurate: "",
      remarks_accurate: "",
      observations_simulate: "",
      remarks_simulate: "",
      observations_free_movement: "",
      remarks_free_movement: "",
      observations_hindered: "",
      remarks_hindered: "",
      observations_oil_leakeges: "",
      remarks_oil_leakeges: "",
      observations_excessive: "",
      remarks_excessive: "",
      observations_electro_magnet: "",
      remarks_electro_magnet: "",
      observations_manual_brake: "",
      remarks_manual_brake: "",
      observations_auto_catch: "",
      remarks_auto_catch: "",
      observations_operation_indicator: "",
      remarks_operation_indicator: "",
      observations_safety_check: "",
      remarks_safety_check: "",
      observations_other_observ: "",
      remarks_other_observ: "",
      remarks_overall: "",
    observations_emergency_procedures: "",
    remarks_emergency_procedures: "",
    observations_safety_equipment: "",
    remarks_safety_equipment: "",
    observations_safety_systems: "",
    remarks_safety_systems: "",
    observations_emergency_procedures_22: "",
    remarks_emergency_procedures_22: "",
    inspection_status: "",
    remarks_inspection_status: "",
    recommendations: "",
    authority_signature: null,
    });
    setPendingObservations([{ equipment: "", observation: "", remarks: "" }]);
    setHidDraftId("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, pendingObservations });
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">CARGO PASSENGER AND GALLEY LIFTS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <Label className="text-base font-medium">Ship <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Select value={formData.ship} onValueChange={(value) => handleInputChange("ship", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">--Select--</SelectItem>
                    <SelectItem value="43">SHIVALIK</SelectItem>
                    <SelectItem value="84">JAMUNA</SelectItem>
                    <SelectItem value="23">BANGARAM</SelectItem>
                    <SelectItem value="56">TARANGINI</SelectItem>
                    <SelectItem value="99">SARYU</SelectItem>
                    <SelectItem value="31">KUMBHIR</SelectItem>
                    <SelectItem value="87">T-83</SelectItem>
                    <SelectItem value="27">AIRAVAT</SelectItem>
                    <SelectItem value="48">KHANJAR</SelectItem>
                    <SelectItem value="57">SHUDERSHINI</SelectItem>
                    <SelectItem value="59">TRISHUL</SelectItem>
                    <SelectItem value="62">TEG</SelectItem>
                    <SelectItem value="55">RANVIJAY</SelectItem>
                    <SelectItem value="47">KIRPAN</SelectItem>
                    <SelectItem value="35">DELHI</SelectItem>
                    <SelectItem value="83">SURVEKSHAK</SelectItem>
                    <SelectItem value="65">JYOTI</SelectItem>
                    <SelectItem value="94">SUJATA</SelectItem>
                    <SelectItem value="76">KABRA</SelectItem>
                    <SelectItem value="68">CANKARSO</SelectItem>
                    <SelectItem value="88">T-84</SelectItem>
                    <SelectItem value="18">VIBHUTI</SelectItem>
                    <SelectItem value="17">NISHANK</SelectItem>
                    <SelectItem value="25">MAGAR</SelectItem>
                    <SelectItem value="42">BEAS</SelectItem>
                    <SelectItem value="90">SUVERNA</SelectItem>
                    <SelectItem value="45">SAHYADRI</SelectItem>
                    <SelectItem value="16">PRALAYA</SelectItem>
                    <SelectItem value="74">CHERIYAM</SelectItem>
                    <SelectItem value="44">SATPURA</SelectItem>
                    <SelectItem value="20">JALASHWA</SelectItem>
                    <SelectItem value="63">TARKASH</SelectItem>
                    <SelectItem value="52">KARMUK</SelectItem>
                    <SelectItem value="82">SUTLEJ</SelectItem>
                    <SelectItem value="96">SUMEDHA</SelectItem>
                    <SelectItem value="15">PRABAL</SelectItem>
                    <SelectItem value="75">CORA DIVH</SelectItem>
                    <SelectItem value="21">BATTIMALV</SelectItem>
                    <SelectItem value="38">CHENNAI</SelectItem>
                    <SelectItem value="97">SUMITRA</SelectItem>
                    <SelectItem value="86">T-82</SelectItem>
                    <SelectItem value="46">KUTHAR</SelectItem>
                    <SelectItem value="69">KONDUL</SelectItem>
                    <SelectItem value="89">SUBHDRA</SelectItem>
                    <SelectItem value="80">DARSHAK</SelectItem>
                    <SelectItem value="24">BITRA</SelectItem>
                    <SelectItem value="73">CHETLAT</SelectItem>
                    <SelectItem value="81">NIREEKSHAK</SelectItem>
                    <SelectItem value="71">KARUVA</SelectItem>
                    <SelectItem value="67">DEEPAK</SelectItem>
                    <SelectItem value="123">SHAKTI</SelectItem>
                    <SelectItem value="36">KOLKATA</SelectItem>
                    <SelectItem value="85">INVETIGATOR</SelectItem>
                    <SelectItem value="93">SHARDA</SelectItem>
                    <SelectItem value="64">SHAKTI</SelectItem>
                    <SelectItem value="33">MUMBAI</SelectItem>
                    <SelectItem value="39">GOMTI</SelectItem>
                    <SelectItem value="41">BETWA</SelectItem>
                    <SelectItem value="13">NASHAK</SelectItem>
                    <SelectItem value="70">KOSWARI</SelectItem>
                    <SelectItem value="30">CHEETAH</SelectItem>
                    <SelectItem value="58">TALWAR</SelectItem>
                    <SelectItem value="28">KESARI</SelectItem>
                    <SelectItem value="66">ADITYA</SelectItem>
                    <SelectItem value="22">BARATANG</SelectItem>
                    <SelectItem value="49">KORA</SelectItem>
                    <SelectItem value="51">KULISH</SelectItem>
                    <SelectItem value="53">RANA</SelectItem>
                    <SelectItem value="77">KALPENI</SelectItem>
                    <SelectItem value="122">SHAKTI</SelectItem>
                    <SelectItem value="12">VIPUL</SelectItem>
                    <SelectItem value="60">TABAR</SelectItem>
                    <SelectItem value="61">TRINKAND</SelectItem>
                    <SelectItem value="37">KOCHI</SelectItem>
                    <SelectItem value="91">SUKANYA</SelectItem>
                    <SelectItem value="92">SAVITRI</SelectItem>
                    <SelectItem value="29">GULDAR</SelectItem>
                    <SelectItem value="40">BRAHMAPUTRA</SelectItem>
                    <SelectItem value="26">GHARIAL</SelectItem>
                    <SelectItem value="54">RANVIR</SelectItem>
                    <SelectItem value="79">NIRUPAK</SelectItem>
                    <SelectItem value="19">VINASH</SelectItem>
                    <SelectItem value="50">KIRCH</SelectItem>
                    <SelectItem value="78">SANDHAYAK</SelectItem>
                    <SelectItem value="14">VIDYUT</SelectItem>
                    <SelectItem value="95">TIR</SelectItem>
                    <SelectItem value="32">GAJ</SelectItem>
                    <SelectItem value="72">CAR NICOBAR</SelectItem>
                    <SelectItem value="98">SUNAYNA</SelectItem>
                    <SelectItem value="34">MYSORE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Section 2: Date of Inspection/Trials */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <Label className="text-base font-medium">Date of Inspection/Trials <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="date_of_inspection"
                  type="date"
                  value={formData.date_of_inspection}
                  onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Section 3: Make & Model */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-base font-medium">Make & Model <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  maxLength={20}
                  required
                />
              </div>
            </div>

            {/* Section 4: Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <Label className="text-base font-medium">Type <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  maxLength={20}
                  required
                />
              </div>
            </div>

            {/* Section 5: Year of Manufacture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                <Label className="text-base font-medium">Year of Manufacture <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="year_manufacture"
                  type="number"
                  value={formData.year_manufacture}
                  onChange={(e) => handleInputChange("year_manufacture", e.target.value)}
                  min="1900"
                  max="2099"
                  required
                />
              </div>
            </div>

            {/* Section 6: Ref Documents */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-base font-medium">Ref Documents <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="documents"
                  value={formData.documents}
                  onChange={(e) => handleInputChange("documents", e.target.value)}
                  maxLength={50}
                  required
                />
              </div>
            </div>

            {/* Section 7: Maintenance Routines */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-base font-medium">Maintenance Routines i.a.w Maintop & OEM Manual <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="maintenance"
                  value={formData.maintenance}
                  onChange={(e) => handleInputChange("maintenance", e.target.value)}
                  maxLength={50}
                  required
                />
              </div>
            </div>

            {/* Section 8: Structure */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-base font-medium">Structure</Label>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Date of Last Structural Survey of Cabin and Lift Shaft Structure</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="date_last_structural_survey">Date: <span className="text-red-500">*</span></Label>
                      <Input
                        id="date_last_structural_survey"
                        type="date"
                        value={formData.date_last_structural_survey}
                        onChange={(e) => handleInputChange("date_last_structural_survey", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="remarks_last_structural_survey">Remarks: <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="remarks_last_structural_survey"
                        value={formData.remarks_last_structural_survey}
                        onChange={(e) => handleInputChange("remarks_last_structural_survey", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) List of Pending Observations for Liquidation (if any)</Label>
                  <div className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sr No.</TableHead>
                          <TableHead>Equipment <span className="text-red-500">*</span></TableHead>
                          <TableHead>Observation <span className="text-red-500">*</span></TableHead>
                          <TableHead>Remarks <span className="text-red-500">*</span></TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingObservations.map((observation, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Input
                                value={observation.equipment}
                                onChange={(e) => handlePendingObservationChange(index, "equipment", e.target.value)}
                                maxLength={20}
                                required
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={observation.observation}
                                onChange={(e) => handlePendingObservationChange(index, "observation", e.target.value)}
                                maxLength={50}
                                required
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={observation.remarks}
                                onChange={(e) => handlePendingObservationChange(index, "remarks", e.target.value)}
                                maxLength={50}
                                required
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removePendingObservation(index)}
                                disabled={pendingObservations.length === 1}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addPendingObservation}
                      className="mt-2"
                    >
                      Add Row
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: Maintenance Record/ Inspection Log */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-base font-medium">Maintenance Record/ Inspection Log (maintenance record/log i.a.w OEM Manual)</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="text-sm font-medium text-gray-700">a) Measurement of Electrical Insulation (not less than 1M ohm)</div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Weekly</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_weekly}
                        onChange={(e) => handleInputChange("observations_weekly", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_weekly}
                        onChange={(e) => handleInputChange("remarks_weekly", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">ii) Prior to Sailing</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_prior_sailing}
                        onChange={(e) => handleInputChange("observations_prior_sailing", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_prior_sailing}
                        onChange={(e) => handleInputChange("remarks_prior_sailing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-700">b) Inspection Log for Cargo and Passenger Remote</div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Daily Inspection</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_daily_inspection}
                        onChange={(e) => handleInputChange("observations_daily_inspection", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_daily_inspection}
                        onChange={(e) => handleInputChange("remarks_daily_inspection", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">ii) Once in 10 Days (Inactive)</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_once_ten_days}
                        onChange={(e) => handleInputChange("observations_once_ten_days", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_once_ten_days}
                        onChange={(e) => handleInputChange("remarks_once_ten_days", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">iii) Once in 3 Months</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_once_3months}
                        onChange={(e) => handleInputChange("observations_once_3months", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_once_3months}
                        onChange={(e) => handleInputChange("remarks_once_3months", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">iv) After Sailing</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_after_sailing}
                        onChange={(e) => handleInputChange("observations_after_sailing", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_after_sailing}
                        onChange={(e) => handleInputChange("remarks_after_sailing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-700">c) Inspection Log/ Record - Galley Lifts</div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">i) 3 Months</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_inspection_3months}
                        onChange={(e) => handleInputChange("observations_inspection_3months", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_inspection_3months}
                        onChange={(e) => handleInputChange("remarks_inspection_3months", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">ii) After Sailing</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_sailing}
                        onChange={(e) => handleInputChange("observations_sailing", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_sailing}
                        onChange={(e) => handleInputChange("remarks_sailing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10: Greasing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-base font-medium">Greasing</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Greasing of all moving parts</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_greasing}
                        onChange={(e) => handleInputChange("observations_greasing", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_greasing}
                        onChange={(e) => handleInputChange("remarks_greasing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Grease layer thickness</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_grease_layer}
                        onChange={(e) => handleInputChange("observations_grease_layer", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_grease_layer}
                        onChange={(e) => handleInputChange("remarks_grease_layer", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Bearing condition</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_bearing}
                        onChange={(e) => handleInputChange("observations_bearing", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_bearing}
                        onChange={(e) => handleInputChange("remarks_bearing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Lift guides</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_lift_guides}
                        onChange={(e) => handleInputChange("observations_lift_guides", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_lift_guides}
                        onChange={(e) => handleInputChange("remarks_lift_guides", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Chain holder</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_chain_holder}
                        onChange={(e) => handleInputChange("observations_chain_holder", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_chain_holder}
                        onChange={(e) => handleInputChange("remarks_chain_holder", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Rollers</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_rollers}
                        onChange={(e) => handleInputChange("observations_rollers", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_rollers}
                        onChange={(e) => handleInputChange("remarks_rollers", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Cabin</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_cabin}
                        onChange={(e) => handleInputChange("observations_cabin", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin}
                        onChange={(e) => handleInputChange("remarks_cabin", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Wire rope</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_wire_rope}
                        onChange={(e) => handleInputChange("observations_wire_rope", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_wire_rope}
                        onChange={(e) => handleInputChange("remarks_wire_rope", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Safety systems</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_ss}
                        onChange={(e) => handleInputChange("observations_ss", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_ss}
                        onChange={(e) => handleInputChange("remarks_ss", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11: Oil */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-base font-medium">Oil</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Oil type and grade</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_type}
                        onChange={(e) => handleInputChange("remarks_oil_type", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Oil level</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_oil_level}
                        onChange={(e) => handleInputChange("observations_oil_level", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_level}
                        onChange={(e) => handleInputChange("remarks_oil_level", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Date of last oil change</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_oil_change}
                        onChange={(e) => handleInputChange("date_oil_change", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_change}
                        onChange={(e) => handleInputChange("remarks_oil_change", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Date of last oil analysis</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_last_oil_analysis}
                        onChange={(e) => handleInputChange("date_last_oil_analysis", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_last_oil_analysis}
                        onChange={(e) => handleInputChange("remarks_last_oil_analysis", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Oil analysis results</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_oil_analysis}
                        onChange={(e) => handleInputChange("observations_oil_analysis", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_analysis}
                        onChange={(e) => handleInputChange("remarks_oil_analysis", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Oil leakage</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_oil_leakage}
                        onChange={(e) => handleInputChange("observations_oil_leakage", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_leakage}
                        onChange={(e) => handleInputChange("remarks_oil_leakage", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 12: Visual Condition */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-base font-medium">Visual Condition</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Lift shaft</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_lift_shaft}
                        onChange={(e) => handleInputChange("observations_lift_shaft", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_lift_shaft}
                        onChange={(e) => handleInputChange("remarks_lift_shaft", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Cabin structure</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_cabin_structure}
                        onChange={(e) => handleInputChange("observations_cabin_structure", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin_structure}
                        onChange={(e) => handleInputChange("remarks_cabin_structure", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Counter weight</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_counter}
                        onChange={(e) => handleInputChange("observations_counter", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_counter}
                        onChange={(e) => handleInputChange("remarks_counter", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Cabin door</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_cabin_door}
                        onChange={(e) => handleInputChange("observations_cabin_door", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin_door}
                        onChange={(e) => handleInputChange("remarks_cabin_door", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Operating machine</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_operating_machine}
                        onChange={(e) => handleInputChange("observations_operating_machine", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_operating_machine}
                        onChange={(e) => handleInputChange("remarks_operating_machine", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Structure</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_structure}
                        onChange={(e) => handleInputChange("observations_structure", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_structure}
                        onChange={(e) => handleInputChange("remarks_structure", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Exposed parts</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_exposed_part}
                        onChange={(e) => handleInputChange("observations_exposed_part", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_exposed_part}
                        onChange={(e) => handleInputChange("remarks_exposed_part", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Cabin roof</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_cabin_roof}
                        onChange={(e) => handleInputChange("observations_cabin_roof", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin_roof}
                        onChange={(e) => handleInputChange("remarks_cabin_roof", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Brake</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_brake}
                        onChange={(e) => handleInputChange("observations_brake", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_brake}
                        onChange={(e) => handleInputChange("remarks_brake", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">j) Wear and tear</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_wear_tear}
                        onChange={(e) => handleInputChange("observations_wear_tear", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_wear_tear}
                        onChange={(e) => handleInputChange("remarks_wear_tear", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">k) Equipment fastening</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_equip_fastening}
                        onChange={(e) => handleInputChange("observations_equip_fastening", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_equip_fastening}
                        onChange={(e) => handleInputChange("remarks_equip_fastening", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">l) Circuit breaker</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_circuit_breaker}
                        onChange={(e) => handleInputChange("observations_circuit_breaker", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_circuit_breaker}
                        onChange={(e) => handleInputChange("remarks_circuit_breaker", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 13: Wire Ropes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-base font-medium">Wire Ropes</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Visual inspection</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_visual}
                        onChange={(e) => handleInputChange("observations_visual", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_visual}
                        onChange={(e) => handleInputChange("remarks_visual", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Date of last change</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_last_changed}
                        onChange={(e) => handleInputChange("date_last_changed", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_last_changed}
                        onChange={(e) => handleInputChange("remarks_last_changed", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Date of last service</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_last_service}
                        onChange={(e) => handleInputChange("date_last_service", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_last_service}
                        onChange={(e) => handleInputChange("remarks_last_service", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Ropes condition</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_ropes}
                        onChange={(e) => handleInputChange("observations_ropes", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_ropes}
                        onChange={(e) => handleInputChange("remarks_ropes", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 14: Electric Checks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-base font-medium">Electric Checks</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Insulation resistance</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_insulation}
                        onChange={(e) => handleInputChange("observations_insulation", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_insulation}
                        onChange={(e) => handleInputChange("remarks_insulation", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) SPM condition</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_spm}
                        onChange={(e) => handleInputChange("observations_spm", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_spm}
                        onChange={(e) => handleInputChange("remarks_spm", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Electrical connections</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_electrical}
                        onChange={(e) => handleInputChange("observations_electrical", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_electrical}
                        onChange={(e) => handleInputChange("remarks_electrical", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Grounding</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_grounding}
                        onChange={(e) => handleInputChange("observations_grounding", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_grounding}
                        onChange={(e) => handleInputChange("remarks_grounding", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Junction box</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_jb}
                        onChange={(e) => handleInputChange("observations_jb", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_jb}
                        onChange={(e) => handleInputChange("remarks_jb", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 15: Electric Checks by ETMA */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-base font-medium">Electric Checks by ETMA</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Tests completed</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_completed}
                        onChange={(e) => handleInputChange("observations_completed", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_completed}
                        onChange={(e) => handleInputChange("remarks_completed", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Report availability</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_report}
                        onChange={(e) => handleInputChange("observations_report", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_report}
                        onChange={(e) => handleInputChange("remarks_report", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 16: Limit Switches */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">16</span>
                <Label className="text-base font-medium">Limit Switches</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Safety switches</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_ss1}
                        onChange={(e) => handleInputChange("observations_ss1", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_ss2}
                        onChange={(e) => handleInputChange("remarks_ss2", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Limit switches operation</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_limit_switches}
                        onChange={(e) => handleInputChange("observations_limit_switches", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_limit_switches}
                        onChange={(e) => handleInputChange("remarks_limit_switches", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 17: Load Testing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">17</span>
                <Label className="text-base font-medium">Load Testing</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Date of last load testing</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_last_load_testing}
                        onChange={(e) => handleInputChange("date_last_load_testing", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_last_load_testing}
                        onChange={(e) => handleInputChange("remarks_last_load_testing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Certificate check</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_check_certi}
                        onChange={(e) => handleInputChange("observations_check_certi", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_check_certi}
                        onChange={(e) => handleInputChange("remarks_check_certi", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 18: Operational / Functional Check */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">18</span>
                <Label className="text-base font-medium">Operational / Functional Check</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Lifting speed</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_lifting_speed}
                        onChange={(e) => handleInputChange("observations_lifting_speed", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_lifting_speed}
                        onChange={(e) => handleInputChange("remarks_lifting_speed", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Lowering speed</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_lowering_speed}
                        onChange={(e) => handleInputChange("observations_lowering_speed", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_lowering_speed}
                        onChange={(e) => handleInputChange("remarks_lowering_speed", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Operation within limits</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_operation_limit}
                        onChange={(e) => handleInputChange("observations_operation_limit", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_operation_limit}
                        onChange={(e) => handleInputChange("remarks_operation_limit", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Accurate positioning</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_accurate}
                        onChange={(e) => handleInputChange("observations_accurate", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_accurate}
                        onChange={(e) => handleInputChange("remarks_accurate", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Simulate emergency</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_simulate}
                        onChange={(e) => handleInputChange("observations_simulate", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_simulate}
                        onChange={(e) => handleInputChange("remarks_simulate", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Free movement</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_free_movement}
                        onChange={(e) => handleInputChange("observations_free_movement", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_free_movement}
                        onChange={(e) => handleInputChange("remarks_free_movement", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Movement hindered</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_hindered}
                        onChange={(e) => handleInputChange("observations_hindered", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_hindered}
                        onChange={(e) => handleInputChange("remarks_hindered", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Oil leakages</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_oil_leakeges}
                        onChange={(e) => handleInputChange("observations_oil_leakeges", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_leakeges}
                        onChange={(e) => handleInputChange("remarks_oil_leakeges", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Excessive noise</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_excessive}
                        onChange={(e) => handleInputChange("observations_excessive", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_excessive}
                        onChange={(e) => handleInputChange("remarks_excessive", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">j) Electro magnet</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_electro_magnet}
                        onChange={(e) => handleInputChange("observations_electro_magnet", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_electro_magnet}
                        onChange={(e) => handleInputChange("remarks_electro_magnet", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">k) Manual brake</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_manual_brake}
                        onChange={(e) => handleInputChange("observations_manual_brake", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_manual_brake}
                        onChange={(e) => handleInputChange("remarks_manual_brake", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">l) Auto catch</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_auto_catch}
                        onChange={(e) => handleInputChange("observations_auto_catch", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_auto_catch}
                        onChange={(e) => handleInputChange("remarks_auto_catch", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">m) Operation indicator</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_operation_indicator}
                        onChange={(e) => handleInputChange("observations_operation_indicator", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_operation_indicator}
                        onChange={(e) => handleInputChange("remarks_operation_indicator", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">n) Safety check</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_safety_check}
                        onChange={(e) => handleInputChange("observations_safety_check", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_safety_check}
                        onChange={(e) => handleInputChange("remarks_safety_check", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 19: Other Observation */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">19</span>
                <Label className="text-base font-medium">Other Observation</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Additional observations</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.observations_other_observ}
                        onChange={(e) => handleInputChange("observations_other_observ", e.target.value)}
                        placeholder="Enter numeric only"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_other_observ}
                        onChange={(e) => handleInputChange("remarks_other_observ", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 20: Overall Remarks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">20</span>
                <Label className="text-base font-medium">Overall Remarks</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">General remarks</div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_overall}
                        onChange={(e) => handleInputChange("remarks_overall", e.target.value)}
                        rows={4}
                        maxLength={2000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 21: Safety and Compliance Check */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">21</span>
                <Label className="text-base font-medium">Safety and Compliance Check</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Emergency Procedures:</Label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                        <Select value={formData.observations_emergency_procedures || ""} onValueChange={(value) => handleInputChange("observations_emergency_procedures", value)}>
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
                        <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={formData.remarks_emergency_procedures || ""}
                          onChange={(e) => handleInputChange("remarks_emergency_procedures", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Safety Equipment:</Label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                        <Select value={formData.observations_safety_equipment || ""} onValueChange={(value) => handleInputChange("observations_safety_equipment", value)}>
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
                        <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={formData.remarks_safety_equipment || ""}
                          onChange={(e) => handleInputChange("remarks_safety_equipment", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 22: Additional Inspection Points */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">22</span>
                <Label className="text-base font-medium">Additional Inspection Points</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Safety Systems Check:</Label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                        <Select value={formData.observations_safety_systems || ""} onValueChange={(value) => handleInputChange("observations_safety_systems", value)}>
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
                        <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={formData.remarks_safety_systems || ""}
                          onChange={(e) => handleInputChange("remarks_safety_systems", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Emergency Procedures:</Label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                        <Select value={formData.observations_emergency_procedures || ""} onValueChange={(value) => handleInputChange("observations_emergency_procedures", value)}>
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
                        <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={formData.remarks_emergency_procedures || ""}
                          onChange={(e) => handleInputChange("remarks_emergency_procedures", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 23: Final Inspection Report */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">23</span>
                <Label className="text-base font-medium">Final Inspection Report</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Inspection Completion Status:</Label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <Label className="text-sm font-medium">Status: <span className="text-red-500">*</span></Label>
                        <Select value={formData.inspection_status || ""} onValueChange={(value) => handleInputChange("inspection_status", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                            <SelectItem value="PARTIAL">PARTIAL</SelectItem>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={formData.remarks_inspection_status || ""}
                          onChange={(e) => handleInputChange("remarks_inspection_status", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Recommendations:</Label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <Label className="text-sm font-medium">Recommendations: <span className="text-red-500">*</span></Label>
                        <Textarea
                          value={formData.recommendations || ""}
                          onChange={(e) => handleInputChange("recommendations", e.target.value)}
                          rows={3}
                          maxLength={1500}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 24: Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">24</span>
                <Label className="text-base font-medium">Authority Signature <span className="text-red-500">*</span></Label>
              </div>
              <div className="ml-4">
                <Input
                  id="authority_signature"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleInputChange("authority_signature", e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> If lifts are going to be operated after long period of inactivity 
                (after completion of trials), maintenance to be undertaken i.a.w Section 8 of OEM manual 
                and in-house trials to be undertaken prior commencing operations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button
                type="button"
                onClick={handleFetchDrafts}
                className="px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold uppercase"
              >
                <FileText className="h-4 w-4 mr-2" />
                FETCH DRAFTS
              </Button>
              <Button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
              >
                <Save className="h-4 w-4 mr-2" />
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
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500">No drafts available</p>
            ) : (
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
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.data.make || "No Inspection Data"}</TableCell>
                      <TableCell>{new Date(draft.createdAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditDraft(draft.id)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteDraft(draft.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CargoPassengerGalleyLiftsForm;
