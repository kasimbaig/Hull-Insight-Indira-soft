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
import { Edit, Trash2, FileText, Save } from "lucide-react";

const GalleyLiftsForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make: "",
    type: "",
    year_manufacture: "",
    documents: "",
    maintenance_observations: "",
    maintenance_remarks: "",
    last_survey_date: "",
    last_survey_remarks: "",
    pending_observations_date: "",
    pending_observations_remarks: "",
    weekly_insulation_observations: "",
    weekly_insulation_remarks: "",
    prior_sailing_observations: "",
    prior_sailing_remarks: "",
    daily_lift_inspection_observations: "",
    daily_lift_inspection_remarks: "",
    lift_inactive_10days_observations: "",
    lift_inactive_10days_remarks: "",
    quarterly_lift_inspection_observations: "",
    quarterly_lift_inspection_remarks: "",
    after_sailing_observations: "",
    after_sailing_remarks: "",
    quarterly_lift_inspection_observations1: "",
    quarterly_lift_inspection_remarks1: "",
    after_sailing_observations1: "",
    after_sailing_remarks1: "",
    condition_greasing_points: "",
    remarks_greasing_points: "",
    condition_grease_layer: "",
    remarks_grease_layer: "",
    condition_bearings: "",
    remarks_bearings: "",
    condition_lift_guides: "",
    remarks_lift_guides: "",
    condition_chain_holders: "",
    remarks_chain_holders: "",
    condition_rollers_pulleys: "",
    remarks_rollers_pulleys: "",
    condition_tracks: "",
    remarks_tracks: "",
    condition_wire_ropes: "",
    remarks_wire_ropes: "",
    condition_greasing_routine: "",
    remarks_greasing_routine: "",
    observations_type_of_oil: "",
    remarks_type_of_oil: "",
    observations_oil_level: "",
    remarks_oil_level: "",
    date_oil_change: "",
    remarks_oil_change: "",
    date_last_oil_analysis: "",
    remarks_last_oil_analysis: "",
    observations_oil_analysis: "",
    remarks_oil_analysis: "",
    observations_oil_leakages: "",
    remarks_oil_leakages: "",
    observations_lift_shaft: "",
    remarks_lift_shaft: "",
    observations_cabin_structure: "",
    remarks_cabin_structure: "",
    observations_counter_weight: "",
    remarks_counter_weight: "",
    observations_cabin_door: "",
    remarks_cabin_door: "",
    observations_machinery_foundation: "",
    remarks_machinery_foundation: "",
    observations_structure_mechanism: "",
    remarks_structure_mechanism: "",
    observations_dirt_oil: "",
    remarks_dirt_oil: "",
    observations_dust_debris: "",
    remarks_dust_debris: "",
    observations_brake_mechanism: "",
    remarks_brake_mechanism: "",
    observations_traction_sheave: "",
    remarks_traction_sheave: "",
    observations_equipment_fastening: "",
    remarks_equipment_fastening: "",
    observations_circuit_breaker: "",
    remarks_circuit_breaker: "",
    observations_wire_ropes: "",
    remarks_wire_ropes1: "",
    date_last_changed_replaced: "",
    remarks_last_changed: "",
    date_last_serviceability_check: "",
    remarks_serviceability_check: "",
    observations_securing_ropes_end: "",
    remarks_securing_ropes_end: "",
    observations_insulation_measurement: "",
    remarks_insulation_measurement: "",
    observations_spm_checks_motor: "",
    remarks_spm_checks_motor: "",
    observations_cable_fasteners: "",
    remarks_cable_fasteners: "",
    observations_grounding_bonding: "",
    remarks_grounding_bonding: "",
    observations_condition_jb_control_panel: "",
    remarks_condition_jb_control_panel: "",
    observations_completed: "",
    remarks_completed: "",
    observations_report: "",
    remarks_report: "",
    observations_limit_switches_operational: "",
    remarks_limit_switches_operational: "",
    observations_visual_checks_limit_switches: "",
    remarks_visual_checks_limit_switches: "",
    date_of_last_load_testing: "",
    remarks_last_load_testing: "",
    observations_check_certificates: "",
    remarks_check_certificates: "",
    observations_no_oil_leakages: "",
    remarks_no_oil_leakages: "",
    observations_lifting_speed: "",
    remarks_lifting_speed: "",
    observations_lowering_speed: "",
    remarks_lowering_speed: "",
    observations_limits_switches: "",
    remarks_limits_switches: "",
    observations_accurate_stopping: "",
    remarks_accurate_stopping: "",
    observations_power_failure: "",
    remarks_power_failure: "",
    observations_free_movement: "",
    remarks_free_movement: "",
    observations_jerky_movement: "",
    remarks_jerky_movement: "",
    observations_oil_leakage: "",
    remarks_oil_leakage: "",
    observations_excessive_vibrations: "",
    remarks_excessive_vibrations: "",
    observations_electro_magnetic_brake: "",
    remarks_electro_magnetic_brake: "",
    observations_manual_brake: "",
    remarks_manual_brake: "",
    observations_auto_catch_mechanism: "",
    remarks_auto_catch_mechanism: "",
    observations_indicator_lamps: "",
    remarks_indicator_lamps: "",
    observations_safety_check: "",
    remarks_safety_check: "",
    remarks_other_observ: "",
    remarks_overall: "",
    authority_signature: "",
    note: "",
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    if (!formData.make || !formData.type || !formData.year_manufacture || !formData.documents) {
      alert("Please fill in Make & Model, Type, Year of Manufacture, and Ref Documents before saving draft.");
      return;
    }
    
    const draftData = {
      ...formData,
      id: hidDraftId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem("galley_lifts_drafts") || "[]");
    if (hidDraftId) {
      const updatedDrafts = existingDrafts.map((draft: any) => 
        draft.id === hidDraftId ? draftData : draft
      );
      localStorage.setItem("galley_lifts_drafts", JSON.stringify(updatedDrafts));
    } else {
      existingDrafts.push(draftData);
      localStorage.setItem("galley_lifts_drafts", JSON.stringify(existingDrafts));
    }
    
    alert("Draft saved successfully!");
    setHidDraftId("");
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem("galley_lifts_drafts") || "[]");
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem("galley_lifts_drafts") || "[]");
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem("galley_lifts_drafts", JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
    alert("Draft deleted successfully!");
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      make: "",
      type: "",
      year_manufacture: "",
      documents: "",
      maintenance_observations: "",
      maintenance_remarks: "",
      last_survey_date: "",
      last_survey_remarks: "",
      pending_observations_date: "",
      pending_observations_remarks: "",
      weekly_insulation_observations: "",
      weekly_insulation_remarks: "",
      prior_sailing_observations: "",
      prior_sailing_remarks: "",
      daily_lift_inspection_observations: "",
      daily_lift_inspection_remarks: "",
      lift_inactive_10days_observations: "",
      lift_inactive_10days_remarks: "",
      quarterly_lift_inspection_observations: "",
      quarterly_lift_inspection_remarks: "",
      after_sailing_observations: "",
      after_sailing_remarks: "",
      quarterly_lift_inspection_observations1: "",
      quarterly_lift_inspection_remarks1: "",
      after_sailing_observations1: "",
      after_sailing_remarks1: "",
      condition_greasing_points: "",
      remarks_greasing_points: "",
      condition_grease_layer: "",
      remarks_grease_layer: "",
      condition_bearings: "",
      remarks_bearings: "",
      condition_lift_guides: "",
      remarks_lift_guides: "",
      condition_chain_holders: "",
      remarks_chain_holders: "",
      condition_rollers_pulleys: "",
      remarks_rollers_pulleys: "",
      condition_tracks: "",
      remarks_tracks: "",
      condition_wire_ropes: "",
      remarks_wire_ropes: "",
      condition_greasing_routine: "",
      remarks_greasing_routine: "",
      observations_type_of_oil: "",
      remarks_type_of_oil: "",
      observations_oil_level: "",
      remarks_oil_level: "",
      date_oil_change: "",
      remarks_oil_change: "",
      date_last_oil_analysis: "",
      remarks_last_oil_analysis: "",
      observations_oil_analysis: "",
      remarks_oil_analysis: "",
      observations_oil_leakages: "",
      remarks_oil_leakages: "",
      observations_lift_shaft: "",
      remarks_lift_shaft: "",
      observations_cabin_structure: "",
      remarks_cabin_structure: "",
      observations_counter_weight: "",
      remarks_counter_weight: "",
      observations_cabin_door: "",
      remarks_cabin_door: "",
      observations_machinery_foundation: "",
      remarks_machinery_foundation: "",
      observations_structure_mechanism: "",
      remarks_structure_mechanism: "",
      observations_dirt_oil: "",
      remarks_dirt_oil: "",
      observations_dust_debris: "",
      remarks_dust_debris: "",
      observations_brake_mechanism: "",
      remarks_brake_mechanism: "",
      observations_traction_sheave: "",
      remarks_traction_sheave: "",
      observations_equipment_fastening: "",
      remarks_equipment_fastening: "",
      observations_circuit_breaker: "",
      remarks_circuit_breaker: "",
      observations_wire_ropes: "",
      remarks_wire_ropes1: "",
      date_last_changed_replaced: "",
      remarks_last_changed: "",
      date_last_serviceability_check: "",
      remarks_serviceability_check: "",
      observations_securing_ropes_end: "",
      remarks_securing_ropes_end: "",
      observations_insulation_measurement: "",
      remarks_insulation_measurement: "",
      observations_spm_checks_motor: "",
      remarks_spm_checks_motor: "",
      observations_cable_fasteners: "",
      remarks_cable_fasteners: "",
      observations_grounding_bonding: "",
      remarks_grounding_bonding: "",
      observations_condition_jb_control_panel: "",
      remarks_condition_jb_control_panel: "",
      observations_completed: "",
      remarks_completed: "",
      observations_report: "",
      remarks_report: "",
      observations_limit_switches_operational: "",
      remarks_limit_switches_operational: "",
      observations_visual_checks_limit_switches: "",
      remarks_visual_checks_limit_switches: "",
      date_of_last_load_testing: "",
      remarks_last_load_testing: "",
      observations_check_certificates: "",
      remarks_check_certificates: "",
      observations_no_oil_leakages: "",
      remarks_no_oil_leakages: "",
      observations_lifting_speed: "",
      remarks_lifting_speed: "",
      observations_lowering_speed: "",
      remarks_lowering_speed: "",
      observations_limits_switches: "",
      remarks_limits_switches: "",
      observations_accurate_stopping: "",
      remarks_accurate_stopping: "",
      observations_power_failure: "",
      remarks_power_failure: "",
      observations_free_movement: "",
      remarks_free_movement: "",
      observations_jerky_movement: "",
      remarks_jerky_movement: "",
      observations_oil_leakage: "",
      remarks_oil_leakage: "",
      observations_excessive_vibrations: "",
      remarks_excessive_vibrations: "",
      observations_electro_magnetic_brake: "",
      remarks_electro_magnetic_brake: "",
      observations_manual_brake: "",
      remarks_manual_brake: "",
      observations_auto_catch_mechanism: "",
      remarks_auto_catch_mechanism: "",
      observations_indicator_lamps: "",
      remarks_indicator_lamps: "",
      observations_safety_check: "",
      remarks_safety_check: "",
      remarks_other_observ: "",
      remarks_overall: "",
      authority_signature: "",
      note: "",
    });
    setHidDraftId("");
  };

  const handleSubmit = () => {
    // Validation logic would go here
    alert("Form submitted successfully!");
  };

  const validateYear = (year: string) => {
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    return yearNum >= 1900 && yearNum <= currentYear;
  };

  const validateSpecialChars = (value: string) => {
    return /^[a-zA-Z0-9\s]*$/.test(value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            <u>GALLEY LIFTS</u>
          </h2>
        </div>

        <div className="space-y-6">
          {/* Section 1: Ship */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
              <Label className="text-lg font-semibold">Ship</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
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
          </div>

          {/* Section 2: Date of Inspection */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
              <Label className="text-lg font-semibold">Date of Inspection/Trials<span className="text-red-500">*</span></Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="date"
                  value={formData.date_of_inspection}
                  onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Make & Model */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
              <Label className="text-lg font-semibold">Make & Model<span className="text-red-500">*</span></Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  value={formData.make}
                  onChange={(e) => {
                    if (validateSpecialChars(e.target.value)) {
                      handleInputChange("make", e.target.value);
                    } else {
                      alert("Special characters are not allowed");
                    }
                  }}
                  maxLength={20}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Type */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
              <Label className="text-lg font-semibold">Type<span className="text-red-500">*</span></Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  value={formData.type}
                  onChange={(e) => {
                    if (validateSpecialChars(e.target.value)) {
                      handleInputChange("type", e.target.value);
                    } else {
                      alert("Special characters are not allowed");
                    }
                  }}
                  maxLength={20}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Year of Manufacture */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
              <Label className="text-lg font-semibold">Year of Manufacture<span className="text-red-500">*</span></Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  value={formData.year_manufacture}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value && !validateYear(value)) {
                      alert("Please enter a year between 1900 and current year");
                      return;
                    }
                    handleInputChange("year_manufacture", value);
                  }}
                  maxLength={4}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Ref Documents */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
              <Label className="text-lg font-semibold">Ref Documents<span className="text-red-500">*</span></Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  value={formData.documents}
                  onChange={(e) => {
                    if (validateSpecialChars(e.target.value)) {
                      handleInputChange("documents", e.target.value);
                    } else {
                      alert("Special characters are not allowed");
                    }
                  }}
                  maxLength={50}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 7: Maintenance Routines */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
              <Label className="text-lg font-semibold">Maintenance Routines i.a.w Maintop & OEM Manual</Label>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">a) Completion of All Routines to be Confirm by SS and Refitting Authority</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
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
                <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.maintenance_remarks}
                  onChange={(e) => {
                    if (validateSpecialChars(e.target.value)) {
                      if (e.target.value.length <= 1000) {
                        handleInputChange("maintenance_remarks", e.target.value);
                      } else {
                        alert("Remarks cannot exceed 1000 characters.");
                      }
                    } else {
                      alert("Special characters are not allowed");
                    }
                  }}
                  rows={2}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 8: Structure */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
              <Label className="text-lg font-semibold">Structure</Label>
            </div>
            
            {/* 8.1 Last Survey Date */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">8.1 Last Survey Date</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input
                    type="date"
                    value={formData.last_survey_date}
                    onChange={(e) => handleInputChange("last_survey_date", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.last_survey_remarks}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("last_survey_remarks", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 8.2 Pending Observations */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">8.2 Pending Observations</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input
                    type="date"
                    value={formData.pending_observations_date}
                    onChange={(e) => handleInputChange("pending_observations_date", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.pending_observations_remarks}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("pending_observations_remarks", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 9: Maintenance Record/Inspection Log */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
              <Label className="text-lg font-semibold">Maintenance Record/Inspection Log</Label>
            </div>
            
            {/* 9.1 Electrical Insulation */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">9.1 Electrical Insulation</p>
              
              {/* Weekly */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Weekly</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.weekly_insulation_observations} onValueChange={(value) => handleInputChange("weekly_insulation_observations", value)}>
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
                      value={formData.weekly_insulation_remarks}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("weekly_insulation_remarks", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Prior Sailing */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Prior Sailing</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.prior_sailing_observations} onValueChange={(value) => handleInputChange("prior_sailing_observations", value)}>
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
                      value={formData.prior_sailing_remarks}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("prior_sailing_remarks", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 9.2 Inspection Log */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">9.2 Inspection Log</p>
              
              {/* Daily */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Daily</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.daily_lift_inspection_observations} onValueChange={(value) => handleInputChange("daily_lift_inspection_observations", value)}>
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
                      value={formData.daily_lift_inspection_remarks}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("daily_lift_inspection_remarks", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* 10 Days Inactive */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">10 Days Inactive</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.lift_inactive_10days_observations} onValueChange={(value) => handleInputChange("lift_inactive_10days_observations", value)}>
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
                      value={formData.lift_inactive_10days_remarks}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("lift_inactive_10days_remarks", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* 3 Months */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">3 Months</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.quarterly_lift_inspection_observations} onValueChange={(value) => handleInputChange("quarterly_lift_inspection_observations", value)}>
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
                      value={formData.quarterly_lift_inspection_remarks}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("quarterly_lift_inspection_remarks", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* After Sailing */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">After Sailing</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.after_sailing_observations} onValueChange={(value) => handleInputChange("after_sailing_observations", value)}>
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
                      value={formData.after_sailing_remarks}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("after_sailing_remarks", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 9.3 Galley Lifts */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">9.3 Galley Lifts</p>
              
              {/* 3 Months */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">3 Months</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.quarterly_lift_inspection_observations1} onValueChange={(value) => handleInputChange("quarterly_lift_inspection_observations1", value)}>
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
                      value={formData.quarterly_lift_inspection_remarks1}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("quarterly_lift_inspection_remarks1", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* After Sailing */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">After Sailing</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.after_sailing_observations1} onValueChange={(value) => handleInputChange("after_sailing_observations1", value)}>
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
                      value={formData.after_sailing_remarks1}
                      onChange={(e) => {
                        if (validateSpecialChars(e.target.value)) {
                          if (e.target.value.length <= 1000) {
                            handleInputChange("after_sailing_remarks1", e.target.value);
                          } else {
                            alert("Remarks cannot exceed 1000 characters.");
                          }
                        } else {
                          alert("Special characters are not allowed");
                        }
                      }}
                      rows={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Greasing */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">10</span>
              <Label className="text-lg font-semibold">Greasing</Label>
            </div>
            
            {/* 10.1 Greasing Points */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.1 Greasing Points</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_greasing_points} onValueChange={(value) => handleInputChange("condition_greasing_points", value)}>
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
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_greasing_points", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.2 Grease Layer Thickness */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.2 Grease Layer Thickness</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_grease_layer} onValueChange={(value) => handleInputChange("condition_grease_layer", value)}>
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
                    value={formData.remarks_grease_layer}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_grease_layer", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.3 Bearings */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.3 Bearings</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_bearings} onValueChange={(value) => handleInputChange("condition_bearings", value)}>
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
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_bearings", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.4 Lift Guides */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.4 Lift Guides</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_lift_guides} onValueChange={(value) => handleInputChange("condition_lift_guides", value)}>
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
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_lift_guides", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.5 Chain Holders */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.5 Chain Holders</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_chain_holders} onValueChange={(value) => handleInputChange("condition_chain_holders", value)}>
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
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_chain_holders", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.6 Rollers & Pulleys */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.6 Rollers & Pulleys</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_rollers_pulleys} onValueChange={(value) => handleInputChange("condition_rollers_pulleys", value)}>
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
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_rollers_pulleys", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.7 Tracks */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.7 Tracks</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_tracks} onValueChange={(value) => handleInputChange("condition_tracks", value)}>
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
                    value={formData.remarks_tracks}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_tracks", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.8 Wire Ropes */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.8 Wire Ropes</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_wire_ropes} onValueChange={(value) => handleInputChange("condition_wire_ropes", value)}>
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
                    value={formData.remarks_wire_ropes}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_wire_ropes", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 10.9 Greasing Routine */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">10.9 Greasing Routine</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Condition:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_greasing_routine} onValueChange={(value) => handleInputChange("condition_greasing_routine", value)}>
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
                    value={formData.remarks_greasing_routine}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_greasing_routine", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 11: Oil */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">11</span>
              <Label className="text-lg font-semibold">Oil</Label>
            </div>
            
            {/* 11.1 Type of Oil */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">11.1 Type of Oil</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_type_of_oil} onValueChange={(value) => handleInputChange("observations_type_of_oil", value)}>
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
                    value={formData.remarks_type_of_oil}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_type_of_oil", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 11.2 Oil Level */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">11.2 Oil Level</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_oil_level} onValueChange={(value) => handleInputChange("observations_oil_level", value)}>
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
                    value={formData.remarks_oil_level}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_oil_level", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 11.3 Date of Last Oil Change */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">11.3 Date of Last Oil Change</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input
                    type="date"
                    value={formData.date_oil_change}
                    onChange={(e) => handleInputChange("date_oil_change", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.remarks_oil_change}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_oil_change", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 11.4 Date of Last Oil Analysis */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">11.4 Date of Last Oil Analysis</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input
                    type="date"
                    value={formData.date_last_oil_analysis}
                    onChange={(e) => handleInputChange("date_last_oil_analysis", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.remarks_last_oil_analysis}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_last_oil_analysis", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 11.5 Oil Analysis Results */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">11.5 Oil Analysis Results</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_oil_analysis} onValueChange={(value) => handleInputChange("observations_oil_analysis", value)}>
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
                    value={formData.remarks_oil_analysis}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_oil_analysis", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 11.6 Oil Leakages */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">11.6 Oil Leakages</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_oil_leakages} onValueChange={(value) => handleInputChange("observations_oil_leakages", value)}>
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
                    value={formData.remarks_oil_leakages}
                    onChange={(e) => {
                      if (validateSpecialChars(e.target.value)) {
                        if (e.target.value.length <= 1000) {
                          handleInputChange("remarks_oil_leakages", e.target.value);
                        } else {
                          alert("Remarks cannot exceed 1000 characters.");
                        }
                      } else {
                        alert("Special characters are not allowed");
                      }
                    }}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 12: Visual Condition */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">12</span>
              <Label className="text-lg font-semibold">Visual Condition</Label>
            </div>
            
            {/* 12.1 Lift Shaft */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.1 Lift Shaft</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_lift_shaft} onValueChange={(value) => handleInputChange("observations_lift_shaft", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_lift_shaft} onChange={(e) => handleInputChange("remarks_lift_shaft", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.2 Cabin Structure */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.2 Cabin Structure</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_cabin_structure} onValueChange={(value) => handleInputChange("observations_cabin_structure", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_cabin_structure} onChange={(e) => handleInputChange("remarks_cabin_structure", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.3 Counter Weight */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.3 Counter Weight</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_counter_weight} onValueChange={(value) => handleInputChange("observations_counter_weight", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_counter_weight} onChange={(e) => handleInputChange("remarks_counter_weight", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.4 Cabin Door */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.4 Cabin Door</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_cabin_door} onValueChange={(value) => handleInputChange("observations_cabin_door", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_cabin_door} onChange={(e) => handleInputChange("remarks_cabin_door", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.5 Machinery Foundation */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.5 Machinery Foundation</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_machinery_foundation} onValueChange={(value) => handleInputChange("observations_machinery_foundation", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_machinery_foundation} onChange={(e) => handleInputChange("remarks_machinery_foundation", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.6 Structure & Mechanism */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.6 Structure & Mechanism</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_structure_mechanism} onValueChange={(value) => handleInputChange("observations_structure_mechanism", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_structure_mechanism} onChange={(e) => handleInputChange("remarks_structure_mechanism", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.7 Dirt & Oil */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.7 Dirt & Oil</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_dirt_oil} onValueChange={(value) => handleInputChange("observations_dirt_oil", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_dirt_oil} onChange={(e) => handleInputChange("remarks_dirt_oil", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.8 Dust & Debris */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.8 Dust & Debris</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_dust_debris} onValueChange={(value) => handleInputChange("observations_dust_debris", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_dust_debris} onChange={(e) => handleInputChange("remarks_dust_debris", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.9 Brake Mechanism */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.9 Brake Mechanism</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_brake_mechanism} onValueChange={(value) => handleInputChange("observations_brake_mechanism", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_brake_mechanism} onChange={(e) => handleInputChange("remarks_brake_mechanism", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.10 Traction Sheave */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.10 Traction Sheave</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_traction_sheave} onValueChange={(value) => handleInputChange("observations_traction_sheave", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_traction_sheave} onChange={(e) => handleInputChange("remarks_traction_sheave", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.11 Equipment Fastening */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.11 Equipment Fastening</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_equipment_fastening} onValueChange={(value) => handleInputChange("observations_equipment_fastening", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_equipment_fastening} onChange={(e) => handleInputChange("remarks_equipment_fastening", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 12.12 Circuit Breaker */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">12.12 Circuit Breaker</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_circuit_breaker} onValueChange={(value) => handleInputChange("observations_circuit_breaker", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_circuit_breaker} onChange={(e) => handleInputChange("remarks_circuit_breaker", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 13: Wire Ropes */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">13</span>
              <Label className="text-lg font-semibold">Wire Ropes</Label>
            </div>
            
            {/* 13.1 Visual Inspection */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">13.1 Visual Inspection</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_wire_ropes} onValueChange={(value) => handleInputChange("observations_wire_ropes", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_wire_ropes1} onChange={(e) => handleInputChange("remarks_wire_ropes1", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 13.2 Date of Last Change/Replacement */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">13.2 Date of Last Change/Replacement</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input type="date" value={formData.date_last_changed_replaced} onChange={(e) => handleInputChange("date_last_changed_replaced", e.target.value)} className="w-full" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea value={formData.remarks_last_changed} onChange={(e) => handleInputChange("remarks_last_changed", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 13.3 Date of Last Serviceability Check */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">13.3 Date of Last Serviceability Check</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input type="date" value={formData.date_last_serviceability_check} onChange={(e) => handleInputChange("date_last_serviceability_check", e.target.value)} className="w-full" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea value={formData.remarks_serviceability_check} onChange={(e) => handleInputChange("remarks_serviceability_check", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 13.4 Securing of Ropes End */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">13.4 Securing of Ropes End</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_securing_ropes_end} onValueChange={(value) => handleInputChange("observations_securing_ropes_end", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_securing_ropes_end} onChange={(e) => handleInputChange("remarks_securing_ropes_end", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 14: Electric Checks */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">14</span>
              <Label className="text-lg font-semibold">Electric Checks</Label>
            </div>
            
            {/* 14.1 Insulation Measurement */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">14.1 Insulation Measurement</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_insulation_measurement} onValueChange={(value) => handleInputChange("observations_insulation_measurement", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_insulation_measurement} onChange={(e) => handleInputChange("remarks_insulation_measurement", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 14.2 SPM Checks Motor */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">14.2 SPM Checks Motor</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_spm_checks_motor} onValueChange={(value) => handleInputChange("observations_spm_checks_motor", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_spm_checks_motor} onChange={(e) => handleInputChange("remarks_spm_checks_motor", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 14.3 Cable Fasteners */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">14.3 Cable Fasteners</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_cable_fasteners} onValueChange={(value) => handleInputChange("observations_cable_fasteners", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_cable_fasteners} onChange={(e) => handleInputChange("remarks_cable_fasteners", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 14.4 Grounding & Bonding */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">14.4 Grounding & Bonding</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_grounding_bonding} onValueChange={(value) => handleInputChange("observations_grounding_bonding", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_grounding_bonding} onChange={(e) => handleInputChange("remarks_grounding_bonding", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 14.5 Condition of JB & Control Panel */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">14.5 Condition of JB & Control Panel</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_condition_jb_control_panel} onValueChange={(value) => handleInputChange("observations_condition_jb_control_panel", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_condition_jb_control_panel} onChange={(e) => handleInputChange("remarks_condition_jb_control_panel", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 15: Electric Checks by ETMA */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">15</span>
              <Label className="text-lg font-semibold">Electric Checks by ETMA</Label>
            </div>
            
            {/* 15.1 Tests Completed */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">15.1 Tests Completed</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_completed} onValueChange={(value) => handleInputChange("observations_completed", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_completed} onChange={(e) => handleInputChange("remarks_completed", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 15.2 Report Availability */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">15.2 Report Availability</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_report} onValueChange={(value) => handleInputChange("observations_report", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_report} onChange={(e) => handleInputChange("remarks_report", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 16: Limit Switches */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">16</span>
              <Label className="text-lg font-semibold">Limit Switches</Label>
            </div>
            
            {/* 16.1 Safety Switches */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">16.1 Safety Switches</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_limit_switches_operational} onValueChange={(value) => handleInputChange("observations_limit_switches_operational", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_limit_switches_operational} onChange={(e) => handleInputChange("remarks_limit_switches_operational", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 16.2 Limit Switches Operation */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">16.2 Limit Switches Operation</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_visual_checks_limit_switches} onValueChange={(value) => handleInputChange("observations_visual_checks_limit_switches", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_visual_checks_limit_switches} onChange={(e) => handleInputChange("remarks_visual_checks_limit_switches", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 17: Load Testing */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">17</span>
              <Label className="text-lg font-semibold">Load Testing</Label>
            </div>
            
            {/* 17.1 Date of Last Load Testing */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">17.1 Date of Last Load Testing</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date:<span className="text-red-500">*</span></Label>
                  <Input type="date" value={formData.date_of_last_load_testing} onChange={(e) => handleInputChange("date_of_last_load_testing", e.target.value)} className="w-full" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea value={formData.remarks_last_load_testing} onChange={(e) => handleInputChange("remarks_last_load_testing", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 17.2 Check Certificates */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">17.2 Check Certificates</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_check_certificates} onValueChange={(value) => handleInputChange("observations_check_certificates", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_check_certificates} onChange={(e) => handleInputChange("remarks_check_certificates", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 18: Operational/Functional Check */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">18</span>
              <Label className="text-lg font-semibold">Operational/Functional Check</Label>
            </div>
            
            {/* 18.1 No Oil Leakages */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.1 No Oil Leakages</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_no_oil_leakages} onValueChange={(value) => handleInputChange("observations_no_oil_leakages", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_no_oil_leakages} onChange={(e) => handleInputChange("remarks_no_oil_leakages", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.2 Lifting Speed */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.2 Lifting Speed</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_lifting_speed} onValueChange={(value) => handleInputChange("observations_lifting_speed", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_lifting_speed} onChange={(e) => handleInputChange("remarks_lifting_speed", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.3 Lowering Speed */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.3 Lowering Speed</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_lowering_speed} onValueChange={(value) => handleInputChange("observations_lowering_speed", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_lowering_speed} onChange={(e) => handleInputChange("remarks_lowering_speed", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.4 Operation Within Limits */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.4 Operation Within Limits</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_limits_switches} onValueChange={(value) => handleInputChange("observations_limits_switches", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_limits_switches} onChange={(e) => handleInputChange("remarks_limits_switches", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.5 Accurate Stopping */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.5 Accurate Stopping</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_accurate_stopping} onValueChange={(value) => handleInputChange("observations_accurate_stopping", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_accurate_stopping} onChange={(e) => handleInputChange("remarks_accurate_stopping", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.6 Power Failure Simulation */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.6 Power Failure Simulation</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_power_failure} onValueChange={(value) => handleInputChange("observations_power_failure", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_power_failure} onChange={(e) => handleInputChange("remarks_power_failure", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.7 Free Movement */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.7 Free Movement</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_free_movement} onValueChange={(value) => handleInputChange("observations_free_movement", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_free_movement} onChange={(e) => handleInputChange("remarks_free_movement", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.8 Jerky Movement */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.8 Jerky Movement</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_jerky_movement} onValueChange={(value) => handleInputChange("observations_jerky_movement", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_jerky_movement} onChange={(e) => handleInputChange("remarks_jerky_movement", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.9 Oil Leakage */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.9 Oil Leakage</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_oil_leakage} onValueChange={(value) => handleInputChange("observations_oil_leakage", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_oil_leakage} onChange={(e) => handleInputChange("remarks_oil_leakage", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.10 Excessive Vibrations */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.10 Excessive Vibrations</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_excessive_vibrations} onValueChange={(value) => handleInputChange("observations_excessive_vibrations", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_excessive_vibrations} onChange={(e) => handleInputChange("remarks_excessive_vibrations", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.11 Electro Magnetic Brake */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.11 Electro Magnetic Brake</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_electro_magnetic_brake} onValueChange={(value) => handleInputChange("observations_electro_magnetic_brake", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_electro_magnetic_brake} onChange={(e) => handleInputChange("remarks_electro_magnetic_brake", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.12 Manual Brake */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.12 Manual Brake</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_manual_brake} onValueChange={(value) => handleInputChange("observations_manual_brake", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_manual_brake} onChange={(e) => handleInputChange("remarks_manual_brake", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.13 Auto Catch Mechanism */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.13 Auto Catch Mechanism</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_auto_catch_mechanism} onValueChange={(value) => handleInputChange("observations_auto_catch_mechanism", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_auto_catch_mechanism} onChange={(e) => handleInputChange("remarks_auto_catch_mechanism", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.14 Indicator Lamps */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.14 Indicator Lamps</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_indicator_lamps} onValueChange={(value) => handleInputChange("observations_indicator_lamps", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_indicator_lamps} onChange={(e) => handleInputChange("remarks_indicator_lamps", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>

            {/* 18.15 Safety Check */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">18.15 Safety Check</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.observations_safety_check} onValueChange={(value) => handleInputChange("observations_safety_check", value)}>
                    <SelectTrigger><SelectValue placeholder="--Select--" /></SelectTrigger>
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
                  <Textarea value={formData.remarks_safety_check} onChange={(e) => handleInputChange("remarks_safety_check", e.target.value)} rows={2} className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 19: Other Observation */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">19</span>
              <Label className="text-lg font-semibold">Other Observation</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                <Textarea value={formData.remarks_other_observ} onChange={(e) => handleInputChange("remarks_other_observ", e.target.value)} rows={4} className="w-full" />
              </div>
            </div>
          </div>

          {/* Section 20: Overall Remarks */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">20</span>
              <Label className="text-lg font-semibold">Overall Remarks</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                <Textarea value={formData.remarks_overall} onChange={(e) => handleInputChange("remarks_overall", e.target.value)} rows={4} className="w-full" />
              </div>
            </div>
          </div>

          {/* Continue with remaining sections... */}
          {/* For brevity, I'll include a few more key sections and then the form actions */}

          {/* Section 21: Authority Signature */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">21</span>
              <Label className="text-lg font-semibold">Authority Signature<span className="text-red-500">*</span></Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        alert("File size exceeds 2MB. Please upload a smaller file.");
                        return;
                      }
                      handleInputChange("authority_signature", file.name);
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">N</span>
              <Label className="text-lg font-semibold">Note<span className="text-red-500">*</span></Label>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Note:</strong> This inspection report is prepared based on the visual inspection and operational trials conducted. 
                All observations and recommendations are subject to further verification by the concerned authorities. 
                Any discrepancies or additional findings should be reported immediately to the maintenance team.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium">Additional Notes:<span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.note}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      handleInputChange("note", e.target.value);
                    }
                  }}
                  placeholder="Enter any additional notes or observations..."
                  className="w-full"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.note.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              type="button"
              onClick={handleFetchDrafts}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
            >
              <FileText className="h-4 w-4 mr-2" />
              FETCH DRAFTS
            </Button>
            <Button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              SAVE DRAFT
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              CLEAR
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              SAVE
            </Button>
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
                    <TableHead>Make & Model</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Data is not available
                      </TableCell>
                    </TableRow>
                  ) : (
                    drafts.map((draft: any, index: number) => (
                      <TableRow key={draft.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{draft.make || "No Inspection Data"}</TableCell>
                        <TableCell>{new Date(draft.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditDraft(draft)}
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
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleyLiftsForm;
