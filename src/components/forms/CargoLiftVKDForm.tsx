import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CargoLiftVKDForm: React.FC = () => {
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

            {/* Continue with more sections... */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline">
                Clear
              </Button>
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoLiftVKDForm;
