import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, FileText, Trash2, Edit } from "lucide-react";

const CargoLiftVKDForm: React.FC = () => {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Basic Information (Sections 1-7)
    ship: "",
    date_of_inspection: "",
    make: "",
    type: "",
    year_manufacture: "",
    documents: "",
    maintenance_observations: "",
    maintenance_remarks: "",
    
    // Section 8: Structure
    structure_last_survey_date: "",
    structure_last_survey_remarks: "",
    structure_pending_observations_date: "",
    structure_pending_observations_remarks: "",
    
    // Section 9: Maintenance Records / Inspection Log
    // Electrical Insulation
    electrical_insulation_weekly_observations: "",
    electrical_insulation_weekly_remarks: "",
    electrical_insulation_prior_sailing_observations: "",
    electrical_insulation_prior_sailing_remarks: "",
    
    // Inspection Log for Cargo and Passenger Lifts
    inspection_log_daily_observations: "",
    inspection_log_daily_remarks: "",
    inspection_log_10days_observations: "",
    inspection_log_10days_remarks: "",
    inspection_log_3months_observations: "",
    inspection_log_3months_remarks: "",
    
    // Section 10: Greasing
    greasing_points_condition_observations: "",
    greasing_points_condition_remarks: "",
    grease_layer_friction_parts_observations: "",
    grease_layer_friction_parts_remarks: "",
    bearings_observations: "",
    bearings_remarks: "",
    lift_guides_observations: "",
    lift_guides_remarks: "",
    chain_holders_observations: "",
    chain_holders_remarks: "",
    rollers_pulleys_observations: "",
    rollers_pulleys_remarks: "",
    
    // Section 11: Oil System
    oil_type_observations: "",
    oil_type_remarks: "",
    oil_level_observations: "",
    oil_level_remarks: "",
    oil_change_date: "",
    oil_change_remarks: "",
    oil_analysis_date: "",
    oil_analysis_remarks: "",
    oil_analysis_observations: "",
    oil_analysis_observations_remarks: "",
    oil_leakages_observations: "",
    oil_leakages_remarks: "",
    
    // Section 12: Lift Shaft
    lift_shaft_observations: "",
    lift_shaft_remarks: "",
    
    // Section 13: Cabin Structure
    cabin_structure_observations: "",
    cabin_structure_remarks: "",
    
    // Section 14: Counter Weight
    counter_weight_observations: "",
    counter_weight_remarks: "",
    
    // Section 15: Cabin Door
    cabin_door_observations: "",
    cabin_door_remarks: "",
    
    // Section 16: Machinery Foundation
    machinery_foundation_observations: "",
    machinery_foundation_remarks: "",
    
    // Section 17: Structure Mechanism
    structure_mechanism_observations: "",
    structure_mechanism_remarks: "",
    
    // Section 18: Dirt/Oil
    dirt_oil_observations: "",
    dirt_oil_remarks: "",
    
    // Section 19: Dust/Debris
    dust_debris_observations: "",
    dust_debris_remarks: "",
    
    // Section 20: Brake Mechanism
    brake_mechanism_observations: "",
    brake_mechanism_remarks: "",
    
    // Section 21: Traction Sheave
    traction_sheave_observations: "",
    traction_sheave_remarks: "",
    
    // Additional fields for other sections
    equipment_fastening_observations: "",
    equipment_fastening_remarks: "",
    circuit_breaker_observations: "",
    circuit_breaker_remarks: "",
    wire_ropes_observations: "",
    wire_ropes_remarks: "",
    wire_ropes_last_changed_date: "",
    wire_ropes_last_changed_remarks: "",
    wire_ropes_serviceability_check_date: "",
    wire_ropes_serviceability_check_remarks: "",
    securing_ropes_end_observations: "",
    securing_ropes_end_remarks: "",
    insulation_measurement_observations: "",
    insulation_measurement_remarks: "",
    spm_checks_motor_observations: "",
    spm_checks_motor_remarks: "",
    cable_fasteners_observations: "",
    cable_fasteners_remarks: "",
    grounding_bonding_observations: "",
    grounding_bonding_remarks: "",
    condition_jb_control_panel_observations: "",
    condition_jb_control_panel_remarks: "",
    completed_observations: "",
    completed_remarks: "",
    report_observations: "",
    report_remarks: "",
    limit_switches_operational_observations: "",
    limit_switches_operational_remarks: "",
    visual_checks_limit_switches_observations: "",
    visual_checks_limit_switches_remarks: "",
    last_load_testing_date: "",
    last_load_testing_remarks: "",
    check_certificates_observations: "",
    check_certificates_remarks: "",
    no_oil_leakages_observations: "",
    no_oil_leakages_remarks: "",
    lifting_speed_observations: "",
    lifting_speed_remarks: "",
    lowering_speed_observations: "",
    lowering_speed_remarks: "",
    limits_switches_observations: "",
    limits_switches_remarks: "",
    accurate_stopping_observations: "",
    accurate_stopping_remarks: "",
    power_failure_observations: "",
    power_failure_remarks: "",
    free_movement_observations: "",
    free_movement_remarks: "",
    jerky_movement_observations: "",
    jerky_movement_remarks: "",
    oil_leakage_observations: "",
    oil_leakage_remarks: "",
    excessive_vibrations_observations: "",
    excessive_vibrations_remarks: "",
    electro_magnetic_brake_observations: "",
    electro_magnetic_brake_remarks: "",
    manual_brake_observations: "",
    manual_brake_remarks: "",
    auto_catch_mechanism_observations: "",
    auto_catch_mechanism_remarks: "",
    indicator_lamps_observations: "",
    indicator_lamps_remarks: "",
    safety_check_observations: "",
    safety_check_remarks: "",
    remarks_other_observ: "",
    remarks_overall: "",
    authority_signature: null as File | null,
  });

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("authority_signature", file);
  };

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      data: formData
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('cargoLiftVKD_drafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('cargoLiftVKD_drafts', JSON.stringify(existingDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const savedDrafts = JSON.parse(localStorage.getItem('cargoLiftVKD_drafts') || '[]');
    setDrafts(savedDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.data);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('cargoLiftVKD_drafts', JSON.stringify(updatedDrafts));
  };

  const handleClear = () => {
    setFormData({
      // Basic Information (Sections 1-7)
      ship: "",
      date_of_inspection: "",
      make: "",
      type: "",
      year_manufacture: "",
      documents: "",
      maintenance_observations: "",
      maintenance_remarks: "",
      
      // Section 8: Structure
      structure_last_survey_date: "",
      structure_last_survey_remarks: "",
      structure_pending_observations_date: "",
      structure_pending_observations_remarks: "",
      
      // Section 9: Maintenance Records / Inspection Log
      electrical_insulation_weekly_observations: "",
      electrical_insulation_weekly_remarks: "",
      electrical_insulation_prior_sailing_observations: "",
      electrical_insulation_prior_sailing_remarks: "",
      inspection_log_daily_observations: "",
      inspection_log_daily_remarks: "",
      inspection_log_10days_observations: "",
      inspection_log_10days_remarks: "",
      inspection_log_3months_observations: "",
      inspection_log_3months_remarks: "",
      
      // Section 10: Greasing
      greasing_points_condition_observations: "",
      greasing_points_condition_remarks: "",
      grease_layer_friction_parts_observations: "",
      grease_layer_friction_parts_remarks: "",
      bearings_observations: "",
      bearings_remarks: "",
      lift_guides_observations: "",
      lift_guides_remarks: "",
      chain_holders_observations: "",
      chain_holders_remarks: "",
      rollers_pulleys_observations: "",
      rollers_pulleys_remarks: "",
      
      // Section 11: Oil System
      oil_type_observations: "",
      oil_type_remarks: "",
      oil_level_observations: "",
      oil_level_remarks: "",
      oil_change_date: "",
      oil_change_remarks: "",
      oil_analysis_date: "",
      oil_analysis_remarks: "",
      oil_analysis_observations: "",
      oil_analysis_observations_remarks: "",
      oil_leakages_observations: "",
      oil_leakages_remarks: "",
      
      // Section 12: Lift Shaft
      lift_shaft_observations: "",
      lift_shaft_remarks: "",
      
      // Section 13: Cabin Structure
      cabin_structure_observations: "",
      cabin_structure_remarks: "",
      
      // Section 14: Counter Weight
      counter_weight_observations: "",
      counter_weight_remarks: "",
      
      // Section 15: Cabin Door
      cabin_door_observations: "",
      cabin_door_remarks: "",
      
      // Section 16: Machinery Foundation
      machinery_foundation_observations: "",
      machinery_foundation_remarks: "",
      
      // Section 17: Structure Mechanism
      structure_mechanism_observations: "",
      structure_mechanism_remarks: "",
      
      // Section 18: Dirt/Oil
      dirt_oil_observations: "",
      dirt_oil_remarks: "",
      
      // Section 19: Dust/Debris
      dust_debris_observations: "",
      dust_debris_remarks: "",
      
      // Section 20: Brake Mechanism
      brake_mechanism_observations: "",
      brake_mechanism_remarks: "",
      
      // Section 21: Traction Sheave
      traction_sheave_observations: "",
      traction_sheave_remarks: "",
      
      // Additional fields for other sections
      equipment_fastening_observations: "",
      equipment_fastening_remarks: "",
      circuit_breaker_observations: "",
      circuit_breaker_remarks: "",
      wire_ropes_observations: "",
      wire_ropes_remarks: "",
      wire_ropes_last_changed_date: "",
      wire_ropes_last_changed_remarks: "",
      wire_ropes_serviceability_check_date: "",
      wire_ropes_serviceability_check_remarks: "",
      securing_ropes_end_observations: "",
      securing_ropes_end_remarks: "",
      insulation_measurement_observations: "",
      insulation_measurement_remarks: "",
      spm_checks_motor_observations: "",
      spm_checks_motor_remarks: "",
      cable_fasteners_observations: "",
      cable_fasteners_remarks: "",
      grounding_bonding_observations: "",
      grounding_bonding_remarks: "",
      condition_jb_control_panel_observations: "",
      condition_jb_control_panel_remarks: "",
      completed_observations: "",
      completed_remarks: "",
      report_observations: "",
      report_remarks: "",
      limit_switches_operational_observations: "",
      limit_switches_operational_remarks: "",
      visual_checks_limit_switches_observations: "",
      visual_checks_limit_switches_remarks: "",
      last_load_testing_date: "",
      last_load_testing_remarks: "",
      check_certificates_observations: "",
      check_certificates_remarks: "",
      no_oil_leakages_observations: "",
      no_oil_leakages_remarks: "",
      lifting_speed_observations: "",
      lifting_speed_remarks: "",
      lowering_speed_observations: "",
      lowering_speed_remarks: "",
      limits_switches_observations: "",
      limits_switches_remarks: "",
      accurate_stopping_observations: "",
      accurate_stopping_remarks: "",
      power_failure_observations: "",
      power_failure_remarks: "",
      free_movement_observations: "",
      free_movement_remarks: "",
      jerky_movement_observations: "",
      jerky_movement_remarks: "",
      oil_leakage_observations: "",
      oil_leakage_remarks: "",
      excessive_vibrations_observations: "",
      excessive_vibrations_remarks: "",
      electro_magnetic_brake_observations: "",
      electro_magnetic_brake_remarks: "",
      manual_brake_observations: "",
      manual_brake_remarks: "",
      auto_catch_mechanism_observations: "",
      auto_catch_mechanism_remarks: "",
      indicator_lamps_observations: "",
      indicator_lamps_remarks: "",
      safety_check_observations: "",
      safety_check_remarks: "",
      remarks_other_observ: "",
      remarks_overall: "",
      authority_signature: null as File | null,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">CARGO LIFT (VKD)</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <Label className="text-base font-medium">Ship</Label>
              </div>
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

            {/* Section 2: Date of Inspection/Trials */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <Label className="text-base font-medium">Date of Inspection/Trials<strong className="text-red-500">*</strong></Label>
              </div>
              <Input
                type="date"
                value={formData.date_of_inspection}
                onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                required
              />
            </div>

            {/* Section 3: Make & Model */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-base font-medium">Make & Model<strong className="text-red-500">*</strong></Label>
              </div>
              <Input
                type="text"
                value={formData.make}
                onChange={(e) => handleInputChange("make", e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Section 4: Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <Label className="text-base font-medium">Type<strong className="text-red-500">*</strong></Label>
              </div>
              <Input
                type="text"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Section 5: Year of Manufacture */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                <Label className="text-base font-medium">Year of Manufacture<strong className="text-red-500">*</strong></Label>
              </div>
              <Input
                type="number"
                value={formData.year_manufacture}
                onChange={(e) => handleInputChange("year_manufacture", e.target.value)}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            {/* Section 6: Ref Documents */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-base font-medium">Ref Documents<strong className="text-red-500">*</strong></Label>
              </div>
              <Input
                type="text"
                value={formData.documents}
                onChange={(e) => handleInputChange("documents", e.target.value)}
                maxLength={50}
                required
              />
            </div>

            {/* Section 7: Maintenance Routines */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-base font-medium">Maintenance Routines i.a.w Maintop & OEM Manual</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.maintenance_observations} onValueChange={(value) => handleInputChange("maintenance_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.maintenance_remarks}
                    onChange={(e) => handleInputChange("maintenance_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 8: Structure */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-base font-medium">Structure</Label>
              </div>
              <div className="ml-4 space-y-4">
                <div className="text-sm font-medium text-gray-700">SS to Confirm</div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Date of Last Structural Survey of Cabin and Lift Shaft Structure:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="date"
                        value={formData.structure_last_survey_date}
                        onChange={(e) => handleInputChange("structure_last_survey_date", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.structure_last_survey_remarks}
                        onChange={(e) => handleInputChange("structure_last_survey_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) List of Pending Observations for Liquidation (if any):</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="date"
                        value={formData.structure_pending_observations_date}
                        onChange={(e) => handleInputChange("structure_pending_observations_date", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.structure_pending_observations_remarks}
                        onChange={(e) => handleInputChange("structure_pending_observations_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: Maintenance Records / Inspection Log */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-base font-medium">Maintenance Records / Inspection Log (Maintenance Records / Log i.a.w OEM Manuals)</Label>
              </div>
              <div className="ml-4 space-y-4">
                
                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700">Measurement of Electrical Insulation (not less than 1 m-ohm):</div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">a) Weekly:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.electrical_insulation_weekly_observations} onValueChange={(value) => handleInputChange("electrical_insulation_weekly_observations", value)}>
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
                        <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                        <Textarea
                          value={formData.electrical_insulation_weekly_remarks}
                          onChange={(e) => handleInputChange("electrical_insulation_weekly_remarks", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">b) Prior Sailing:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.electrical_insulation_prior_sailing_observations} onValueChange={(value) => handleInputChange("electrical_insulation_prior_sailing_observations", value)}>
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
                        <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                        <Textarea
                          value={formData.electrical_insulation_prior_sailing_remarks}
                          onChange={(e) => handleInputChange("electrical_insulation_prior_sailing_remarks", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700">Inspection Log / Record for Cargo and Passenger Lifts:</div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">a) Daily Inspection:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.inspection_log_daily_observations} onValueChange={(value) => handleInputChange("inspection_log_daily_observations", value)}>
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
                        <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                        <Textarea
                          value={formData.inspection_log_daily_remarks}
                          onChange={(e) => handleInputChange("inspection_log_daily_remarks", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">b) Once in 10 Days, If Lift Not Operated for 10 or More Days:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.inspection_log_10days_observations} onValueChange={(value) => handleInputChange("inspection_log_10days_observations", value)}>
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
                        <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                        <Textarea
                          value={formData.inspection_log_10days_remarks}
                          onChange={(e) => handleInputChange("inspection_log_10days_remarks", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">c) Once in 3 Months:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.inspection_log_3months_observations} onValueChange={(value) => handleInputChange("inspection_log_3months_observations", value)}>
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
                        <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                        <Textarea
                          value={formData.inspection_log_3months_remarks}
                          onChange={(e) => handleInputChange("inspection_log_3months_remarks", e.target.value)}
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

            {/* Section 10: Greasing */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-base font-medium">Greasing (Thin Layer of Grease on All Unpainted Metal Surfaces)</Label>
              </div>
              <div className="ml-4 space-y-4">
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Condition of Greasing Points:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.greasing_points_condition_observations} onValueChange={(value) => handleInputChange("greasing_points_condition_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.greasing_points_condition_remarks}
                        onChange={(e) => handleInputChange("greasing_points_condition_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Grease Layer on Friction Parts:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.grease_layer_friction_parts_observations} onValueChange={(value) => handleInputChange("grease_layer_friction_parts_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.grease_layer_friction_parts_remarks}
                        onChange={(e) => handleInputChange("grease_layer_friction_parts_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Bearings:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.bearings_observations} onValueChange={(value) => handleInputChange("bearings_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.bearings_remarks}
                        onChange={(e) => handleInputChange("bearings_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Lift Guides:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.lift_guides_observations} onValueChange={(value) => handleInputChange("lift_guides_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.lift_guides_remarks}
                        onChange={(e) => handleInputChange("lift_guides_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Chain & Holders:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.chain_holders_observations} onValueChange={(value) => handleInputChange("chain_holders_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.chain_holders_remarks}
                        onChange={(e) => handleInputChange("chain_holders_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Rollers / Pulleys:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.rollers_pulleys_observations} onValueChange={(value) => handleInputChange("rollers_pulleys_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.rollers_pulleys_remarks}
                        onChange={(e) => handleInputChange("rollers_pulleys_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11: Oil System */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-base font-medium">Oil System</Label>
              </div>
              <div className="ml-4 space-y-4">
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Type of Oil:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.oil_type_observations} onValueChange={(value) => handleInputChange("oil_type_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.oil_type_remarks}
                        onChange={(e) => handleInputChange("oil_type_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Oil Level:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.oil_level_observations} onValueChange={(value) => handleInputChange("oil_level_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.oil_level_remarks}
                        onChange={(e) => handleInputChange("oil_level_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Date of Last Oil Change:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="date"
                        value={formData.oil_change_date}
                        onChange={(e) => handleInputChange("oil_change_date", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.oil_change_remarks}
                        onChange={(e) => handleInputChange("oil_change_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Date of Last Oil Analysis:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="date"
                        value={formData.oil_analysis_date}
                        onChange={(e) => handleInputChange("oil_analysis_date", e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.oil_analysis_remarks}
                        onChange={(e) => handleInputChange("oil_analysis_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Oil Analysis Results:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.oil_analysis_observations} onValueChange={(value) => handleInputChange("oil_analysis_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.oil_analysis_observations_remarks}
                        onChange={(e) => handleInputChange("oil_analysis_observations_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Oil Leakages:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.oil_leakages_observations} onValueChange={(value) => handleInputChange("oil_leakages_observations", value)}>
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
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.oil_leakages_remarks}
                        onChange={(e) => handleInputChange("oil_leakages_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 12: Lift Shaft */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-base font-medium">Lift Shaft</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.lift_shaft_observations} onValueChange={(value) => handleInputChange("lift_shaft_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.lift_shaft_remarks}
                    onChange={(e) => handleInputChange("lift_shaft_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 13: Cabin Structure */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-base font-medium">Cabin Structure</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.cabin_structure_observations} onValueChange={(value) => handleInputChange("cabin_structure_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.cabin_structure_remarks}
                    onChange={(e) => handleInputChange("cabin_structure_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 14: Counter Weight */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-base font-medium">Counter Weight</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.counter_weight_observations} onValueChange={(value) => handleInputChange("counter_weight_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.counter_weight_remarks}
                    onChange={(e) => handleInputChange("counter_weight_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 15: Cabin Door */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-base font-medium">Cabin Door</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.cabin_door_observations} onValueChange={(value) => handleInputChange("cabin_door_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.cabin_door_remarks}
                    onChange={(e) => handleInputChange("cabin_door_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 16: Machinery Foundation */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">16</span>
                <Label className="text-base font-medium">Machinery Foundation</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.machinery_foundation_observations} onValueChange={(value) => handleInputChange("machinery_foundation_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.machinery_foundation_remarks}
                    onChange={(e) => handleInputChange("machinery_foundation_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 17: Structure Mechanism */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">17</span>
                <Label className="text-base font-medium">Structure Mechanism</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.structure_mechanism_observations} onValueChange={(value) => handleInputChange("structure_mechanism_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.structure_mechanism_remarks}
                    onChange={(e) => handleInputChange("structure_mechanism_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 18: Dirt/Oil */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">18</span>
                <Label className="text-base font-medium">Dirt/Oil</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.dirt_oil_observations} onValueChange={(value) => handleInputChange("dirt_oil_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.dirt_oil_remarks}
                    onChange={(e) => handleInputChange("dirt_oil_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 19: Dust/Debris */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">19</span>
                <Label className="text-base font-medium">Dust/Debris</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.dust_debris_observations} onValueChange={(value) => handleInputChange("dust_debris_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.dust_debris_remarks}
                    onChange={(e) => handleInputChange("dust_debris_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 20: Brake Mechanism */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">20</span>
                <Label className="text-base font-medium">Brake Mechanism</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.brake_mechanism_observations} onValueChange={(value) => handleInputChange("brake_mechanism_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.brake_mechanism_remarks}
                    onChange={(e) => handleInputChange("brake_mechanism_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 21: Traction Sheave */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">21</span>
                <Label className="text-base font-medium">Traction Sheave</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                  <Select value={formData.traction_sheave_observations} onValueChange={(value) => handleInputChange("traction_sheave_observations", value)}>
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
                  <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                  <Textarea
                    value={formData.traction_sheave_remarks}
                    onChange={(e) => handleInputChange("traction_sheave_remarks", e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Note Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">N</span>
                <Label className="text-base font-medium">Note</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Other Observations:</Label>
                  <Textarea
                    value={formData.remarks_other_observ}
                    onChange={(e) => handleInputChange("remarks_other_observ", e.target.value)}
                    rows={3}
                    maxLength={1000}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Overall Remarks:</Label>
                  <Textarea
                    value={formData.remarks_overall}
                    onChange={(e) => handleInputChange("remarks_overall", e.target.value)}
                    rows={3}
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">S</span>
                <Label className="text-base font-medium">Authority Signature</Label>
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
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
            <DialogTitle>Saved Drafts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500">No drafts found</p>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Draft saved on: {draft.timestamp}</p>
                      <p className="text-sm text-gray-600">Ship: {draft.data.ship || 'Not specified'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditDraft(draft)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CargoLiftVKDForm;
