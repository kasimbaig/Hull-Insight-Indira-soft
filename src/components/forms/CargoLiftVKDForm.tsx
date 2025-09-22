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
    // Section 1: Ship
    ship: "",
    
    // Section 2: Date of Inspection/Trials
    date_of_inspection: "",
    
    // Section 3: Make & Model
    make: "",
    
    // Section 4: Type
    type: "",
    
    // Section 5: Year of Manufacture
    year_manufacture: "",
    
    // Section 6: Ref Documents
    documents: "",
    
    // Section 7: Maintenance Routines
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
    inspection_log_after_sailing_observations: "",
    inspection_log_after_sailing_remarks: "",
    
    // Inspection Log Gallery Lifts
    gallery_lifts_3months_observations: "",
    gallery_lifts_3months_remarks: "",
    gallery_lifts_after_sailing_observations: "",
    gallery_lifts_after_sailing_remarks: "",
    
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
    cabin_counter_weight_tracks_observations: "",
    cabin_counter_weight_tracks_remarks: "",
    wire_ropes_greasing_observations: "",
    wire_ropes_greasing_remarks: "",
    ss_confirm_greasing_observations: "",
    ss_confirm_greasing_remarks: "",
    
    // Section 11: Oil
    oil_type_observations: "",
    oil_type_remarks: "",
    oil_level_observations: "",
    oil_level_remarks: "",
    oil_change_date: "",
    oil_change_remarks: "",
    oil_analysis_date: "",
    oil_analysis_remarks: "",
    oil_analysis_certificate_observations: "",
    oil_analysis_certificate_remarks: "",
    oil_leakages_observations: "",
    oil_leakages_remarks: "",
    
    // Section 12: Visual Conditions
    lift_shaft_structure_observations: "",
    lift_shaft_structure_remarks: "",
    cabin_structure_observations: "",
    cabin_structure_remarks: "",
    counter_weight_areas_observations: "",
    counter_weight_areas_remarks: "",
    cabin_door_operation_observations: "",
    cabin_door_operation_remarks: "",
    machinery_foundations_observations: "",
    machinery_foundations_remarks: "",
    structure_mechanism_defects_observations: "",
    structure_mechanism_defects_remarks: "",
    dirt_oil_moisture_observations: "",
    dirt_oil_moisture_remarks: "",
    dust_debris_observations: "",
    dust_debris_remarks: "",
    brake_mechanism_inspection_observations: "",
    brake_mechanism_inspection_remarks: "",
    traction_sheave_wear_observations: "",
    traction_sheave_wear_remarks: "",
    equipment_fastening_observations: "",
    equipment_fastening_remarks: "",
    circuit_breaker_control_observations: "",
    circuit_breaker_control_remarks: "",
    
    // Section 13: Wire Ropes
    wire_ropes_visual_observations: "",
    wire_ropes_visual_remarks: "",
    wire_ropes_last_changed_date: "",
    wire_ropes_last_changed_remarks: "",
    wire_ropes_serviceability_check_date: "",
    wire_ropes_serviceability_check_remarks: "",
    securing_ropes_end_observations: "",
    securing_ropes_end_remarks: "",
    
    // Section 14: Electrical Checks
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
    
    // Section 15: Electric Checks by ETMA
    completed_observations: "",
    completed_remarks: "",
    report_availability_observations: "",
    report_availability_remarks: "",
    
    // Section 16: Limit Switches
    limit_switches_operational_observations: "",
    limit_switches_operational_remarks: "",
    visual_checks_limit_switches_observations: "",
    visual_checks_limit_switches_remarks: "",
    
    // Section 17: Load Testing
    last_load_testing_date: "",
    last_load_testing_remarks: "",
    check_certificates_observations: "",
    check_certificates_remarks: "",
    no_oil_leakages_load_testing_observations: "",
    no_oil_leakages_load_testing_remarks: "",
    
    // Section 18: Operational / Functional Checks
    lifting_speeds_observations: "",
    lifting_speeds_remarks: "",
    lowering_speeds_observations: "",
    lowering_speeds_remarks: "",
    limits_switches_operation_observations: "",
    limits_switches_operation_remarks: "",
    accurate_stopping_observations: "",
    accurate_stopping_remarks: "",
    power_failure_observations: "",
    power_failure_remarks: "",
    free_movement_pulleys_observations: "",
    free_movement_pulleys_remarks: "",
    jerky_movement_observations: "",
    jerky_movement_remarks: "",
    oil_leakage_operational_observations: "",
    oil_leakage_operational_remarks: "",
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
    
    // Section 19: Other Observation
    other_observation_remarks: "",
    
    // Section 20: Overall Remarks
    overall_remarks: "",
    
    // Section 21: Authority Signature
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
      oil_analysis_certificate_observations: "",
      oil_analysis_certificate_remarks: "",
      oil_leakages_observations: "",
      oil_leakages_remarks: "",
      
      // Section 12: Visual Conditions
      lift_shaft_structure_observations: "",
      lift_shaft_structure_remarks: "",
      cabin_structure_observations: "",
      cabin_structure_remarks: "",
      counter_weight_areas_observations: "",
      counter_weight_areas_remarks: "",
      cabin_door_operation_observations: "",
      cabin_door_operation_remarks: "",
      machinery_foundations_observations: "",
      machinery_foundations_remarks: "",
      structure_mechanism_defects_observations: "",
      structure_mechanism_defects_remarks: "",
      dirt_oil_moisture_observations: "",
      dirt_oil_moisture_remarks: "",
      dust_debris_observations: "",
      dust_debris_remarks: "",
      brake_mechanism_inspection_observations: "",
      brake_mechanism_inspection_remarks: "",
      traction_sheave_wear_observations: "",
      traction_sheave_wear_remarks: "",
      
      // Additional fields for other sections
      equipment_fastening_observations: "",
      equipment_fastening_remarks: "",
      circuit_breaker_control_observations: "",
      circuit_breaker_control_remarks: "",
      wire_ropes_visual_observations: "",
      wire_ropes_visual_remarks: "",
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
      report_availability_observations: "",
      report_availability_remarks: "",
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
      other_observation_remarks: "",
      overall_remarks: "",
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
                type="text"
                value={formData.date_of_inspection}
                onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                placeholder="DD-MM-YYYY"
                maxLength={10}
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
                        type="text"
                        value={formData.structure_last_survey_date}
                        onChange={(e) => handleInputChange("structure_last_survey_date", e.target.value)}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
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
                        type="text"
                        value={formData.structure_pending_observations_date}
                        onChange={(e) => handleInputChange("structure_pending_observations_date", e.target.value)}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
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

                  <div className="space-y-2">
                    <div className="text-sm font-medium">d) After Sailing - When Ship Experienced &gt; 15 Degree Heel &amp; &gt; 5 Degree Trim:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.inspection_log_after_sailing_observations} onValueChange={(value) => handleInputChange("inspection_log_after_sailing_observations", value)}>
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
                          value={formData.inspection_log_after_sailing_remarks}
                          onChange={(e) => handleInputChange("inspection_log_after_sailing_remarks", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700">Inspection Log / Record Gallery Lifts:</div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">a) Once in 3 Months:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.gallery_lifts_3months_observations} onValueChange={(value) => handleInputChange("gallery_lifts_3months_observations", value)}>
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
                          value={formData.gallery_lifts_3months_remarks}
                          onChange={(e) => handleInputChange("gallery_lifts_3months_remarks", e.target.value)}
                          rows={2}
                          maxLength={1000}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">b) After Sailing - When Ship Experienced &gt; 15 Degree Hell &amp; &gt; 5 Degree Trim:</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.gallery_lifts_after_sailing_observations} onValueChange={(value) => handleInputChange("gallery_lifts_after_sailing_observations", value)}>
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
                          value={formData.gallery_lifts_after_sailing_remarks}
                          onChange={(e) => handleInputChange("gallery_lifts_after_sailing_remarks", e.target.value)}
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

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Cabin and Counter Weight Tracks:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.cabin_counter_weight_tracks_observations} onValueChange={(value) => handleInputChange("cabin_counter_weight_tracks_observations", value)}>
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
                        value={formData.cabin_counter_weight_tracks_remarks}
                        onChange={(e) => handleInputChange("cabin_counter_weight_tracks_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Wire Ropes (Cargo & Over Speed Governor Ropes):</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.wire_ropes_greasing_observations} onValueChange={(value) => handleInputChange("wire_ropes_greasing_observations", value)}>
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
                        value={formData.wire_ropes_greasing_remarks}
                        onChange={(e) => handleInputChange("wire_ropes_greasing_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) SS to Confirm (Greasing Routines of All Threaded and Wearing Surfaces Undertaken i.a.w MAINTOPs and OEM manuals):</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.ss_confirm_greasing_observations} onValueChange={(value) => handleInputChange("ss_confirm_greasing_observations", value)}>
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
                        value={formData.ss_confirm_greasing_remarks}
                        onChange={(e) => handleInputChange("ss_confirm_greasing_remarks", e.target.value)}
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
                  <div className="text-sm font-medium">a) Type of Oil Used (approved / OEM defined):</div>
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
                  <div className="text-sm font-medium">b) Oil Level in Gear Box:</div>
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
                  <div className="text-sm font-medium">e) Oil Analysis Certificate / Results:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                        <Select value={formData.oil_analysis_certificate_observations} onValueChange={(value) => handleInputChange("oil_analysis_certificate_observations", value)}>
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
                          value={formData.oil_analysis_certificate_remarks}
                          onChange={(e) => handleInputChange("oil_analysis_certificate_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f)  Oil Leakages from Gear Box:</div>
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

            {/* Section 12: Visual Conditions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-base font-medium">Visual Conditions</Label>
              </div>
              <div className="ml-4 space-y-4">
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Lift Shaft Structure &amp; Preservation:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.lift_shaft_structure_observations} onValueChange={(value) => handleInputChange("lift_shaft_structure_observations", value)}>
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
                        value={formData.lift_shaft_structure_remarks}
                        onChange={(e) => handleInputChange("lift_shaft_structure_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Cabin Structure &amp; Preservation:</div>
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

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Counter Weight areas, Guides and Fastening to Shaft Structure:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.counter_weight_areas_observations} onValueChange={(value) => handleInputChange("counter_weight_areas_observations", value)}>
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
                        value={formData.counter_weight_areas_remarks}
                        onChange={(e) => handleInputChange("counter_weight_areas_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Cabin Door and Door Operation - All Levels:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.cabin_door_operation_observations} onValueChange={(value) => handleInputChange("cabin_door_operation_observations", value)}>
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
                        value={formData.cabin_door_operation_remarks}
                        onChange={(e) => handleInputChange("cabin_door_operation_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Conditions of Operating Machinery Foundations and Preservation:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.machinery_foundations_observations} onValueChange={(value) => handleInputChange("machinery_foundations_observations", value)}>
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
                        value={formData.machinery_foundations_remarks}
                        onChange={(e) => handleInputChange("machinery_foundations_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Check all Structure and Mechanism for Defects/Deformation/Damage:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.structure_mechanism_defects_observations} onValueChange={(value) => handleInputChange("structure_mechanism_defects_observations", value)}>
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
                        value={formData.structure_mechanism_defects_remarks}
                        onChange={(e) => handleInputChange("structure_mechanism_defects_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Dirt/ Oil Moisture on Exposed Parts:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.dirt_oil_moisture_observations} onValueChange={(value) => handleInputChange("dirt_oil_moisture_observations", value)}>
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
                        value={formData.dirt_oil_moisture_remarks}
                        onChange={(e) => handleInputChange("dirt_oil_moisture_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Dust / Debris on Cabin Roof &amp; Lift Pits:</div>
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

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Inspections of Brake Mechanism:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.brake_mechanism_inspection_observations} onValueChange={(value) => handleInputChange("brake_mechanism_inspection_observations", value)}>
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
                        value={formData.brake_mechanism_inspection_remarks}
                        onChange={(e) => handleInputChange("brake_mechanism_inspection_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">j) Wear &amp; Tear of Traction Sheave Grooves:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.traction_sheave_wear_observations} onValueChange={(value) => handleInputChange("traction_sheave_wear_observations", value)}>
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
                        value={formData.traction_sheave_wear_remarks}
                        onChange={(e) => handleInputChange("traction_sheave_wear_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">k) Equipment Fastening - Equaliser Suspension, Over Speed Governor Angle Blocks:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.equipment_fastening_observations} onValueChange={(value) => handleInputChange("equipment_fastening_observations", value)}>
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
                        value={formData.equipment_fastening_remarks}
                        onChange={(e) => handleInputChange("equipment_fastening_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">l) Circuit Breaker of Control Unit and Condition / Hygiene of Control Panel and Junctions Box:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.circuit_breaker_control_observations} onValueChange={(value) => handleInputChange("circuit_breaker_control_observations", value)}>
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
                        value={formData.circuit_breaker_control_remarks}
                        onChange={(e) => handleInputChange("circuit_breaker_control_remarks", e.target.value)}
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
                  <div className="text-sm font-medium">a) Visual Conditions of Ropes &amp; End Fitting:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.wire_ropes_visual_observations} onValueChange={(value) => handleInputChange("wire_ropes_visual_observations", value)}>
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
                        value={formData.wire_ropes_visual_remarks}
                        onChange={(e) => handleInputChange("wire_ropes_visual_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Date Last Changed / Replaced:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="text"
                        value={formData.wire_ropes_last_changed_date}
                        onChange={(e) => handleInputChange("wire_ropes_last_changed_date", e.target.value)}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.wire_ropes_last_changed_remarks}
                        onChange={(e) => handleInputChange("wire_ropes_last_changed_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Date of Last Serviceability Check:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="text"
                        value={formData.wire_ropes_serviceability_check_date}
                        onChange={(e) => handleInputChange("wire_ropes_serviceability_check_date", e.target.value)}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.wire_ropes_serviceability_check_remarks}
                        onChange={(e) => handleInputChange("wire_ropes_serviceability_check_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Securing of Ropes End:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.securing_ropes_end_observations} onValueChange={(value) => handleInputChange("securing_ropes_end_observations", value)}>
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
                        value={formData.securing_ropes_end_remarks}
                        onChange={(e) => handleInputChange("securing_ropes_end_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 14: Electrical Checks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-base font-medium">Electrical Checks (In addition to standard checks by ETMA)</Label>
              </div>
              <div className="ml-4 space-y-4">
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Insulation Measurement (by ETMA/SS) - not less than 1.0 m-ohm:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.insulation_measurement_observations} onValueChange={(value) => handleInputChange("insulation_measurement_observations", value)}>
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
                        value={formData.insulation_measurement_remarks}
                        onChange={(e) => handleInputChange("insulation_measurement_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) SPM Checks of Motor:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.spm_checks_motor_observations} onValueChange={(value) => handleInputChange("spm_checks_motor_observations", value)}>
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
                        value={formData.spm_checks_motor_remarks}
                        onChange={(e) => handleInputChange("spm_checks_motor_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Tightness of Electrical Cable Fasteners:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.cable_fasteners_observations} onValueChange={(value) => handleInputChange("cable_fasteners_observations", value)}>
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
                        value={formData.cable_fasteners_remarks}
                        onChange={(e) => handleInputChange("cable_fasteners_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Grounding / Bonding Connections:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.grounding_bonding_observations} onValueChange={(value) => handleInputChange("grounding_bonding_observations", value)}>
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
                        value={formData.grounding_bonding_remarks}
                        onChange={(e) => handleInputChange("grounding_bonding_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Condition of JB / Control panel:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.condition_jb_control_panel_observations} onValueChange={(value) => handleInputChange("condition_jb_control_panel_observations", value)}>
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
                        value={formData.condition_jb_control_panel_remarks}
                        onChange={(e) => handleInputChange("condition_jb_control_panel_remarks", e.target.value)}
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
                  <div className="text-sm font-medium">a) Completed:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.completed_observations} onValueChange={(value) => handleInputChange("completed_observations", value)}>
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
                        value={formData.completed_remarks}
                        onChange={(e) => handleInputChange("completed_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Availability of Report:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.report_availability_observations} onValueChange={(value) => handleInputChange("report_availability_observations", value)}>
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
                        value={formData.report_availability_remarks}
                        onChange={(e) => handleInputChange("report_availability_remarks", e.target.value)}
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
                  <div className="text-sm font-medium">a) SS to Confirm Operational Availability of All Limit Switches:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.limit_switches_operational_observations} onValueChange={(value) => handleInputChange("limit_switches_operational_observations", value)}>
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
                        value={formData.limit_switches_operational_remarks}
                        onChange={(e) => handleInputChange("limit_switches_operational_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Visual Checks of Limit Switches at All Deck Levels:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.visual_checks_limit_switches_observations} onValueChange={(value) => handleInputChange("visual_checks_limit_switches_observations", value)}>
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
                        value={formData.visual_checks_limit_switches_remarks}
                        onChange={(e) => handleInputChange("visual_checks_limit_switches_remarks", e.target.value)}
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
                  <div className="text-sm font-medium">a) Date of Last Load Testing:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date:<strong className="text-red-500">*</strong></Label>
                      <Input
                        type="text"
                        value={formData.last_load_testing_date}
                        onChange={(e) => handleInputChange("last_load_testing_date", e.target.value)}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        value={formData.last_load_testing_remarks}
                        onChange={(e) => handleInputChange("last_load_testing_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Check Certificates - Static, Running, and Safe Working Loads:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.check_certificates_observations} onValueChange={(value) => handleInputChange("check_certificates_observations", value)}>
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
                        value={formData.check_certificates_remarks}
                        onChange={(e) => handleInputChange("check_certificates_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) SS to Confirm no Oil Leakages During Load Testing:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.no_oil_leakages_load_testing_observations} onValueChange={(value) => handleInputChange("no_oil_leakages_load_testing_observations", value)}>
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
                        value={formData.no_oil_leakages_load_testing_remarks}
                        onChange={(e) => handleInputChange("no_oil_leakages_load_testing_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 18: Operational / Functional Checks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">18</span>
                <Label className="text-base font-medium">Operational / Functional Checks (Trails in 'Manual' and 'Auto' modes of operation)</Label>
              </div>
              <div className="ml-4 space-y-4">
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">a) Lifting Speeds - 0.5 m/s:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.lifting_speeds_observations} onValueChange={(value) => handleInputChange("lifting_speeds_observations", value)}>
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
                        value={formData.lifting_speeds_remarks}
                        onChange={(e) => handleInputChange("lifting_speeds_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">b) Lowering Speeds - 0.5 m/s:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.lowering_speeds_observations} onValueChange={(value) => handleInputChange("lowering_speeds_observations", value)}>
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
                        value={formData.lowering_speeds_remarks}
                        onChange={(e) => handleInputChange("lowering_speeds_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">c) Operation of Limits Switches and Automatic Response of Lift Mechanism:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.limits_switches_operation_observations} onValueChange={(value) => handleInputChange("limits_switches_operation_observations", value)}>
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
                        value={formData.limits_switches_operation_remarks}
                        onChange={(e) => handleInputChange("limits_switches_operation_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">d) Accurate Stopping of Lift at All Locations Levelling of Lift at All Deck Stops (accuracy of ± 50 mm i.a.w OEM manual):</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.accurate_stopping_observations} onValueChange={(value) => handleInputChange("accurate_stopping_observations", value)}>
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
                        value={formData.accurate_stopping_remarks}
                        onChange={(e) => handleInputChange("accurate_stopping_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">e) Simulate Power Failure During Lift Operation and Check Response of Brakes During Hoisting and Lowering Operation:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.power_failure_observations} onValueChange={(value) => handleInputChange("power_failure_observations", value)}>
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
                        value={formData.power_failure_remarks}
                        onChange={(e) => handleInputChange("power_failure_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">f) Free Movement of All Pulleys:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.free_movement_pulleys_observations} onValueChange={(value) => handleInputChange("free_movement_pulleys_observations", value)}>
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
                        value={formData.free_movement_pulleys_remarks}
                        onChange={(e) => handleInputChange("free_movement_pulleys_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">g) Hindered / Jerky Movement During Operation (if any):</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.jerky_movement_observations} onValueChange={(value) => handleInputChange("jerky_movement_observations", value)}>
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
                        value={formData.jerky_movement_remarks}
                        onChange={(e) => handleInputChange("jerky_movement_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">h) Oil Leakages From Gear Box During Operational Trials:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.oil_leakage_operational_observations} onValueChange={(value) => handleInputChange("oil_leakage_operational_observations", value)}>
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
                        value={formData.oil_leakage_operational_remarks}
                        onChange={(e) => handleInputChange("oil_leakage_operational_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">i) Check for Excessive Vibrations in Operating Mechanism, Structure, Pulleys, Counter Weight and Cabin Movement:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.excessive_vibrations_observations} onValueChange={(value) => handleInputChange("excessive_vibrations_observations", value)}>
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
                        value={formData.excessive_vibrations_remarks}
                        onChange={(e) => handleInputChange("excessive_vibrations_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">j) Electro-Magnetic Brake Operation:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.electro_magnetic_brake_observations} onValueChange={(value) => handleInputChange("electro_magnetic_brake_observations", value)}>
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
                        value={formData.electro_magnetic_brake_remarks}
                        onChange={(e) => handleInputChange("electro_magnetic_brake_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">k) Manual Brake Operation:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.manual_brake_observations} onValueChange={(value) => handleInputChange("manual_brake_observations", value)}>
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
                        value={formData.manual_brake_remarks}
                        onChange={(e) => handleInputChange("manual_brake_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">l) Lift Door 'Auto Catch' Mechanism:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.auto_catch_mechanism_observations} onValueChange={(value) => handleInputChange("auto_catch_mechanism_observations", value)}>
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
                        value={formData.auto_catch_mechanism_remarks}
                        onChange={(e) => handleInputChange("auto_catch_mechanism_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">m) Operational of Indicator Lamps in Control Panel:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.indicator_lamps_observations} onValueChange={(value) => handleInputChange("indicator_lamps_observations", value)}>
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
                        value={formData.indicator_lamps_remarks}
                        onChange={(e) => handleInputChange("indicator_lamps_remarks", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">n) Safety Check - Operational of Alarms and Lights:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Observations:<strong className="text-red-500">*</strong></Label>
                      <Select value={formData.safety_check_observations} onValueChange={(value) => handleInputChange("safety_check_observations", value)}>
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
                        value={formData.safety_check_remarks}
                        onChange={(e) => handleInputChange("safety_check_remarks", e.target.value)}
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
              <div>
                <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                <Textarea
                  value={formData.other_observation_remarks}
                  onChange={(e) => handleInputChange("other_observation_remarks", e.target.value)}
                  rows={3}
                  maxLength={1000}
                  required
                />
              </div>
            </div>

            {/* Section 20: Overall Remarks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">20</span>
                <Label className="text-base font-medium">Overall Remarks</Label>
              </div>
              <div>
                <Label className="text-sm font-medium">Remarks:<strong className="text-red-500">*</strong></Label>
                <Textarea
                  value={formData.overall_remarks}
                  onChange={(e) => handleInputChange("overall_remarks", e.target.value)}
                  rows={3}
                  maxLength={1000}
                  required
                />
              </div>
            </div>

            {/* Section 21: Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">21</span>
                <Label className="text-base font-medium">Authority Signature<strong className="text-red-500">*</strong></Label>
              </div>
              <div>
                <Label className="text-sm font-medium">Upload File:<strong className="text-red-500">*</strong></Label>
                <Input
                  type="file"
                  onChange={(e) => handleInputChange("authority_signature", e.target.files?.[0] || null)}
                  required
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
