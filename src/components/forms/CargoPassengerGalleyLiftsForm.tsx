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
    // Basic Information (Sections 1-6)
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
    observations_greasing_points: "",
    remarks_greasing_points: "",
    observations_grease_layer_friction: "",
    remarks_grease_layer_friction: "",
    observations_bearings: "",
    remarks_bearings: "",
    observations_lift_guides: "",
    remarks_lift_guides: "",
    observations_chain_holders: "",
    remarks_chain_holders: "",
    observations_rollers_pulleys: "",
    remarks_rollers_pulleys: "",
    observations_cabin_counter_weight_tracks: "",
    remarks_cabin_counter_weight_tracks: "",
    observations_wire_ropes_cargo: "",
    remarks_wire_ropes_cargo: "",
    observations_ss_confirm_greasing: "",
    remarks_ss_confirm_greasing: "",
    
    // Section 9: Oil
    remarks_oil_type_approved: "",
    observations_oil_level_gear_box: "",
    remarks_oil_level_gear_box: "",
    date_oil_change: "",
    remarks_oil_change: "",
    date_last_oil_analysis: "",
    remarks_last_oil_analysis: "",
    observations_oil_analysis_certificate: "",
    remarks_oil_analysis_certificate: "",
    observations_oil_leakages_gear_box: "",
    remarks_oil_leakages_gear_box: "",
    
    // Section 10: Visual Condition
    observations_lift_shaft_structure_preservation: "",
    remarks_lift_shaft_structure_preservation: "",
    observations_cabin_structure_preservation: "",
    remarks_cabin_structure_preservation: "",
    observations_counter_weight_areas_guides: "",
    remarks_counter_weight_areas_guides: "",
    observations_cabin_door_operation: "",
    remarks_cabin_door_operation: "",
    observations_operating_machinery_foundations: "",
    remarks_operating_machinery_foundations: "",
    observations_structure_mechanism_defects: "",
    remarks_structure_mechanism_defects: "",
    observations_dirt_oil_moisture_exposed: "",
    remarks_dirt_oil_moisture_exposed: "",
    observations_dust_debris_cabin_roof: "",
    remarks_dust_debris_cabin_roof: "",
    observations_inspection_brake_mechanism: "",
    remarks_inspection_brake_mechanism: "",
    observations_wear_tear_traction_sheave: "",
    remarks_wear_tear_traction_sheave: "",
    observations_equipment_fastening_equaliser: "",
    remarks_equipment_fastening_equaliser: "",
    observations_circuit_breaker_control_unit: "",
    remarks_circuit_breaker_control_unit: "",
    
    // Section 11: Wire Ropes
    observations_visual_condition_ropes: "",
    remarks_visual_condition_ropes: "",
    date_last_changed_replaced: "",
    remarks_last_changed_replaced: "",
    date_last_serviceability_check: "",
    remarks_last_serviceability_check: "",
    observations_securing_ropes_ends: "",
    remarks_securing_ropes_ends: "",
    
    // Section 12: Electric Checks
    observations_insulation_measurement_etma: "",
    remarks_insulation_measurement_etma: "",
    observations_spm_checks_motors: "",
    remarks_spm_checks_motors: "",
    observations_tightness_electrical_cable: "",
    remarks_tightness_electrical_cable: "",
    observations_grounding_bonding_connections: "",
    remarks_grounding_bonding_connections: "",
    observations_condition_jb_control_panel: "",
    remarks_condition_jb_control_panel: "",
    
    // Section 13: Electric Checks by ETMA
    observations_completed: "",
    remarks_completed: "",
    observations_availability_report: "",
    remarks_availability_report: "",
    
    // Section 14: Limit Switches
    observations_ss_confirm_operational_availability: "",
    remarks_ss_confirm_operational_availability: "",
    observations_visual_check_limit_switches: "",
    remarks_visual_check_limit_switches: "",
    
    // Section 15: Load Testing
    date_last_load_testing: "",
    remarks_last_load_testing: "",
    observations_check_certificates_static: "",
    remarks_check_certificates_static: "",
    
    // Section 16: Operational / Functional Check
    observations_lifting_speeds: "",
    remarks_lifting_speeds: "",
    observations_lowering_speeds: "",
    remarks_lowering_speeds: "",
    observations_operation_limit_switches: "",
    remarks_operation_limit_switches: "",
    observations_accurate_stopping_lift: "",
    remarks_accurate_stopping_lift: "",
    observations_simulate_power_failing: "",
    remarks_simulate_power_failing: "",
    observations_free_movement_pulleys: "",
    remarks_free_movement_pulleys: "",
    observations_hindered_jerky_movement: "",
    remarks_hindered_jerky_movement: "",
    observations_oil_leakages_gear_box_operational: "",
    remarks_oil_leakages_gear_box_operational: "",
    observations_excessive_vibrations_operating: "",
    remarks_excessive_vibrations_operating: "",
    observations_electro_magnetic_brake_operation: "",
    remarks_electro_magnetic_brake_operation: "",
    observations_manual_brake_operation: "",
    remarks_manual_brake_operation: "",
    observations_lift_door_auto_catch: "",
    remarks_lift_door_auto_catch: "",
    observations_operation_indicator_lamps: "",
    remarks_operation_indicator_lamps: "",
    observations_safety_check_operation_alarms: "",
    remarks_safety_check_operation_alarms: "",
    
    // Section 17: Other Observation
    observations_other_observation: "",
    remarks_other_observation: "",
    
    // Section 18: Overall Remarks
    remarks_overall: "",
    
    // Section 23: Authority Signature
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
      observations_greasing_points: "",
      remarks_greasing_points: "",
      observations_grease_layer_friction: "",
      remarks_grease_layer_friction: "",
      observations_bearings: "",
      remarks_bearings: "",
      observations_lift_guides: "",
      remarks_lift_guides: "",
      observations_chain_holders: "",
      remarks_chain_holders: "",
      observations_rollers_pulleys: "",
      remarks_rollers_pulleys: "",
      observations_cabin_counter_weight_tracks: "",
      remarks_cabin_counter_weight_tracks: "",
      observations_wire_ropes_cargo: "",
      remarks_wire_ropes_cargo: "",
      observations_ss_confirm_greasing: "",
      remarks_ss_confirm_greasing: "",
      remarks_oil_type_approved: "",
      observations_oil_level_gear_box: "",
      remarks_oil_level_gear_box: "",
      date_oil_change: "",
      remarks_oil_change: "",
      date_last_oil_analysis: "",
      remarks_last_oil_analysis: "",
      observations_oil_analysis_certificate: "",
      remarks_oil_analysis_certificate: "",
      observations_oil_leakages_gear_box: "",
      remarks_oil_leakages_gear_box: "",
      observations_lift_shaft_structure_preservation: "",
      remarks_lift_shaft_structure_preservation: "",
      observations_cabin_structure_preservation: "",
      remarks_cabin_structure_preservation: "",
      observations_counter_weight_areas_guides: "",
      remarks_counter_weight_areas_guides: "",
      observations_cabin_door_operation: "",
      remarks_cabin_door_operation: "",
      observations_operating_machinery_foundations: "",
      remarks_operating_machinery_foundations: "",
      observations_structure_mechanism_defects: "",
      remarks_structure_mechanism_defects: "",
      observations_dirt_oil_moisture_exposed: "",
      remarks_dirt_oil_moisture_exposed: "",
      observations_dust_debris_cabin_roof: "",
      remarks_dust_debris_cabin_roof: "",
      observations_inspection_brake_mechanism: "",
      remarks_inspection_brake_mechanism: "",
      observations_wear_tear_traction_sheave: "",
      remarks_wear_tear_traction_sheave: "",
      observations_equipment_fastening_equaliser: "",
      remarks_equipment_fastening_equaliser: "",
      observations_circuit_breaker_control_unit: "",
      remarks_circuit_breaker_control_unit: "",
      observations_visual_condition_ropes: "",
      remarks_visual_condition_ropes: "",
      date_last_changed_replaced: "",
      remarks_last_changed_replaced: "",
      date_last_serviceability_check: "",
      remarks_last_serviceability_check: "",
      observations_securing_ropes_ends: "",
      remarks_securing_ropes_ends: "",
      observations_insulation_measurement_etma: "",
      remarks_insulation_measurement_etma: "",
      observations_spm_checks_motors: "",
      remarks_spm_checks_motors: "",
      observations_tightness_electrical_cable: "",
      remarks_tightness_electrical_cable: "",
      observations_grounding_bonding_connections: "",
      remarks_grounding_bonding_connections: "",
      observations_condition_jb_control_panel: "",
      remarks_condition_jb_control_panel: "",
      observations_completed: "",
      remarks_completed: "",
      observations_availability_report: "",
      remarks_availability_report: "",
      observations_ss_confirm_operational_availability: "",
      remarks_ss_confirm_operational_availability: "",
      observations_visual_check_limit_switches: "",
      remarks_visual_check_limit_switches: "",
      date_last_load_testing: "",
      remarks_last_load_testing: "",
      observations_check_certificates_static: "",
      remarks_check_certificates_static: "",
      observations_lifting_speeds: "",
      remarks_lifting_speeds: "",
      observations_lowering_speeds: "",
      remarks_lowering_speeds: "",
      observations_operation_limit_switches: "",
      remarks_operation_limit_switches: "",
      observations_accurate_stopping_lift: "",
      remarks_accurate_stopping_lift: "",
      observations_simulate_power_failing: "",
      remarks_simulate_power_failing: "",
      observations_free_movement_pulleys: "",
      remarks_free_movement_pulleys: "",
      observations_hindered_jerky_movement: "",
      remarks_hindered_jerky_movement: "",
      observations_oil_leakages_gear_box_operational: "",
      remarks_oil_leakages_gear_box_operational: "",
      observations_excessive_vibrations_operating: "",
      remarks_excessive_vibrations_operating: "",
      observations_electro_magnetic_brake_operation: "",
      remarks_electro_magnetic_brake_operation: "",
      observations_manual_brake_operation: "",
      remarks_manual_brake_operation: "",
      observations_lift_door_auto_catch: "",
      remarks_lift_door_auto_catch: "",
      observations_operation_indicator_lamps: "",
      remarks_operation_indicator_lamps: "",
      observations_safety_check_operation_alarms: "",
      remarks_safety_check_operation_alarms: "",
      observations_other_observation: "",
      remarks_other_observation: "",
      remarks_overall: "",
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
                          {/* <TableHead>Action</TableHead> */}
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

            {/* Section 7: Maintenance Record/ Inspection Log */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
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
                  <div className="text-sm font-medium">ii) Prior Sailing</div>
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

                <div className="text-sm font-medium text-gray-700">b) Inspection Log/ Record for Cargo and Passenger Remote</div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Daily Inspection</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_daily_inspection} onValueChange={(value) => handleInputChange("observations_daily_inspection", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <div className="text-sm font-medium">ii) Once in 10 Days, If Lift not Operated for 10 or More Days.</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_once_ten_days} onValueChange={(value) => handleInputChange("observations_once_ten_days", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select value={formData.observations_once_3months} onValueChange={(value) => handleInputChange("observations_once_3months", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <div className="text-sm font-medium">iv) After Sailing - (When Ship Experienced &gt; 15° heel &amp; &gt; 5° trim )</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_after_sailing} onValueChange={(value) => handleInputChange("observations_after_sailing", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <div className="text-sm font-medium">i) Once in 3 Months</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_inspection_3months} onValueChange={(value) => handleInputChange("observations_inspection_3months", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <div className="text-sm font-medium">ii) After Sailing - (When Ship Experienced &gt; 15° heel &amp; &gt; 5° trim )</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_sailing} onValueChange={(value) => handleInputChange("observations_sailing", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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

            {/* Section 8: Greasing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-base font-medium">Greasing (Thin Layer of Grease on All Unpainted Mental Surfaces)</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Condition of Greasing Points</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_greasing_points} onValueChange={(value) => handleInputChange("observations_greasing_points", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_greasing_points}
                        onChange={(e) => handleInputChange("remarks_greasing_points", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Grease Layer on Friction Parts</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_grease_layer_friction} onValueChange={(value) => handleInputChange("observations_grease_layer_friction", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_grease_layer_friction}
                        onChange={(e) => handleInputChange("remarks_grease_layer_friction", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Bearings</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_bearings} onValueChange={(value) => handleInputChange("observations_bearings", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_bearings}
                        onChange={(e) => handleInputChange("remarks_bearings", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Lift Guides</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_lift_guides} onValueChange={(value) => handleInputChange("observations_lift_guides", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <div className="text-sm font-medium">e) Chain &amp; Holders</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_chain_holders} onValueChange={(value) => handleInputChange("observations_chain_holders", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_chain_holders}
                        onChange={(e) => handleInputChange("remarks_chain_holders", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Rollers &amp; Pulleys</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_rollers_pulleys} onValueChange={(value) => handleInputChange("observations_rollers_pulleys", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_rollers_pulleys}
                        onChange={(e) => handleInputChange("remarks_rollers_pulleys", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Cabin &amp; Counter Weight Tracks</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_cabin_counter_weight_tracks} onValueChange={(value) => handleInputChange("observations_cabin_counter_weight_tracks", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin_counter_weight_tracks}
                        onChange={(e) => handleInputChange("remarks_cabin_counter_weight_tracks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Wire Ropes (Cargo &amp; Over-Speed Governor Ropes)</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_wire_ropes_cargo} onValueChange={(value) => handleInputChange("observations_wire_ropes_cargo", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_wire_ropes_cargo}
                        onChange={(e) => handleInputChange("remarks_wire_ropes_cargo", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) SS to Confirm (Greasing between Gearing of Reduction Gear, Sprokets and Other Xnaccessible and OEM Manual)</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_ss_confirm_greasing} onValueChange={(value) => handleInputChange("observations_ss_confirm_greasing", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_ss_confirm_greasing}
                        onChange={(e) => handleInputChange("remarks_ss_confirm_greasing", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: Oil */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-base font-medium">Oil</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Type of Oil Used - (approved / OEM defined)</div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_type_approved}
                        onChange={(e) => handleInputChange("remarks_oil_type_approved", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Oil Level in Gear Box</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_oil_level_gear_box} onValueChange={(value) => handleInputChange("observations_oil_level_gear_box", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_level_gear_box}
                        onChange={(e) => handleInputChange("remarks_oil_level_gear_box", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Date of Oil Change</div>
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
                  <div className="text-sm font-medium">d) Date of Last Oil Analysis (Annual Requirement i.a.w OEM Manual)</div>
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
                  <div className="text-sm font-medium">e) Oil Analysis Certificate Result</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_oil_analysis_certificate} onValueChange={(value) => handleInputChange("observations_oil_analysis_certificate", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_analysis_certificate}
                        onChange={(e) => handleInputChange("remarks_oil_analysis_certificate", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Oil Leakages from Gear Box</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select value={formData.observations_oil_leakages_gear_box} onValueChange={(value) => handleInputChange("observations_oil_leakages_gear_box", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_oil_leakages_gear_box}
                        onChange={(e) => handleInputChange("remarks_oil_leakages_gear_box", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10: Visual Condition */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-base font-medium">Visual Condition</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Lift Shaft Structure &amp; Preservation</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_lift_shaft_structure_preservation}
                        onValueChange={(value) => handleInputChange("observations_lift_shaft_structure_preservation", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_lift_shaft_structure_preservation}
                        onChange={(e) => handleInputChange("remarks_lift_shaft_structure_preservation", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Cabin Structure &amp; Preservation</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_cabin_structure_preservation}
                        onValueChange={(value) => handleInputChange("observations_cabin_structure_preservation", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin_structure_preservation}
                        onChange={(e) => handleInputChange("remarks_cabin_structure_preservation", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Counter-weight Areas, Guides and Fastenings to Shaft Structure</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_counter_weight_areas_guides}
                        onValueChange={(value) => handleInputChange("observations_counter_weight_areas_guides", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_counter_weight_areas_guides}
                        onChange={(e) => handleInputChange("remarks_counter_weight_areas_guides", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Cabin Door and Door Operation - All Levels</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_cabin_door_operation}
                        onValueChange={(value) => handleInputChange("observations_cabin_door_operation", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_cabin_door_operation}
                        onChange={(e) => handleInputChange("remarks_cabin_door_operation", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Condition of Operating Machinery Foundations and Preservation</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_operating_machinery_foundations}
                        onValueChange={(value) => handleInputChange("observations_operating_machinery_foundations", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_operating_machinery_foundations}
                        onChange={(e) => handleInputChange("remarks_operating_machinery_foundations", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Check All Structure and Mechanism for Defects/ Deformation/ Damage</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_structure_mechanism_defects}
                        onValueChange={(value) => handleInputChange("observations_structure_mechanism_defects", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_structure_mechanism_defects}
                        onChange={(e) => handleInputChange("remarks_structure_mechanism_defects", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Dirt/ Oil Moisture on Exposed Parts</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_dirt_oil_moisture_exposed}
                        onValueChange={(value) => handleInputChange("observations_dirt_oil_moisture_exposed", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_dirt_oil_moisture_exposed}
                        onChange={(e) => handleInputChange("remarks_dirt_oil_moisture_exposed", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Dust/ Debris on Cabin Roof &amp; Lift-Pits</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_dust_debris_cabin_roof}
                        onValueChange={(value) => handleInputChange("observations_dust_debris_cabin_roof", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_dust_debris_cabin_roof}
                        onChange={(e) => handleInputChange("remarks_dust_debris_cabin_roof", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Inspection of Brake Mechanism</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_inspection_brake_mechanism}
                        onValueChange={(value) => handleInputChange("observations_inspection_brake_mechanism", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_inspection_brake_mechanism}
                        onChange={(e) => handleInputChange("remarks_inspection_brake_mechanism", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">j) Wear &amp; Tear of Traction-Sheave Grooves.</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_wear_tear_traction_sheave}
                        onValueChange={(value) => handleInputChange("observations_wear_tear_traction_sheave", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_wear_tear_traction_sheave}
                        onChange={(e) => handleInputChange("remarks_wear_tear_traction_sheave", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">k) Equipment Fastening - Equaliser, Suspension, Over-Speed Governor, Angel Blocks</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_equipment_fastening_equaliser}
                        onValueChange={(value) => handleInputChange("observations_equipment_fastening_equaliser", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_equipment_fastening_equaliser}
                        onChange={(e) => handleInputChange("remarks_equipment_fastening_equaliser", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">l) Circuit Breaker of Control Unit and Condition/ Hygiene of Control Panel and Junction Box</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_circuit_breaker_control_unit}
                        onValueChange={(value) => handleInputChange("observations_circuit_breaker_control_unit", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_circuit_breaker_control_unit}
                        onChange={(e) => handleInputChange("remarks_circuit_breaker_control_unit", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11: Wire Ropes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-base font-medium">Wire Ropes</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Visual Condition - Ropes &amp; End Fitting</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_visual_condition_ropes}
                        onValueChange={(value) => handleInputChange("observations_visual_condition_ropes", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_visual_condition_ropes}
                        onChange={(e) => handleInputChange("remarks_visual_condition_ropes", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Date of Last Changed / Replaced (to be replaced every 5 years)</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_last_changed_replaced}
                        onChange={(e) => handleInputChange("date_last_changed_replaced", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_last_changed_replaced}
                        onChange={(e) => handleInputChange("remarks_last_changed_replaced", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Date of Last Serviceability Check</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                      <Input
                        type="date"
                        value={formData.date_last_serviceability_check}
                        onChange={(e) => handleInputChange("date_last_serviceability_check", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_last_serviceability_check}
                        onChange={(e) => handleInputChange("remarks_last_serviceability_check", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Securing of Ropes Ends</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_securing_ropes_ends}
                        onValueChange={(value) => handleInputChange("observations_securing_ropes_ends", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_securing_ropes_ends}
                        onChange={(e) => handleInputChange("remarks_securing_ropes_ends", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 12: Electric Checks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-base font-medium">Electric Checks</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Insulation Measurement by ETMA/SS not less than 1.0 M-ohm</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_insulation_measurement_etma}
                        onValueChange={(value) => handleInputChange("observations_insulation_measurement_etma", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_insulation_measurement_etma}
                        onChange={(e) => handleInputChange("remarks_insulation_measurement_etma", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) SPM Checks for Motors</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_spm_checks_motors}
                        onValueChange={(value) => handleInputChange("observations_spm_checks_motors", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_spm_checks_motors}
                        onChange={(e) => handleInputChange("remarks_spm_checks_motors", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Tightness of Electrical Cable Fasteners</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_tightness_electrical_cable}
                        onValueChange={(value) => handleInputChange("observations_tightness_electrical_cable", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_tightness_electrical_cable}
                        onChange={(e) => handleInputChange("remarks_tightness_electrical_cable", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Grounding/ Bonding Connections</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_grounding_bonding_connections}
                        onValueChange={(value) => handleInputChange("observations_grounding_bonding_connections", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_grounding_bonding_connections}
                        onChange={(e) => handleInputChange("remarks_grounding_bonding_connections", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Condition of JB, Control Panel</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.observations_condition_jb_control_panel}
                        onValueChange={(value) => handleInputChange("observations_condition_jb_control_panel", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarks_condition_jb_control_panel}
                        onChange={(e) => handleInputChange("remarks_condition_jb_control_panel", e.target.value)}
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
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">13</span>
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
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">14</span>
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
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">15</span>
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
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">16</span>
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
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">17</span>
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
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">18</span>
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

          

            {/* Section 23: Final Inspection Report */}
            {/* <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">19</span>
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
            </div> */}

            {/* Section 24: Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">19</span>
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
                {/* <FileText className="h-4 w-4 mr-2" /> */}
                FETCH DRAFTS
              </Button>
              <Button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
              >
                {/* <Save className="h-4 w-4 mr-2" /> */}
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
