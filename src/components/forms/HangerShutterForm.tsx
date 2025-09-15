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

const HangerShutterForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make: "",
    condition_of_shutter_observations: "",
    condition_of_shutter_remarks: "",
    condition_of_slates_observations: "",
    condition_of_slates_remarks: "",
    condition_of_top_hood_observations: "",
    condition_of_top_hood_remarks: "",
    condition_of_bottom_bar_weather_strips_observations: "",
    condition_of_bottom_bar_weather_strips_remarks: "",
    condition_of_canvas_observations: "",
    condition_of_canvas_remarks: "",
    top_and_bottom_limit_observations: "",
    top_and_bottom_limit_remarks: "",
    condition_of_gear_box_seal_observations: "",
    condition_of_gear_box_seal_remarks: "",
    operational_trails_observations: "",
    operational_trails_remarks: "",
    electrical_observation: "",
    electrical_remarks: "",
    any_other_observation_remarks: "",
    overall_remarks_observations: "",
    authority_signature: "",
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSaveDraft = () => {
    if (!formData.make.trim()) {
      alert("Please Enter Make");
      return;
    }
    if (!formData.condition_of_shutter_observations) {
      alert("Please Select Condition of Shutter Observations");
      return;
    }
    if (!formData.condition_of_shutter_remarks.trim()) {
      alert("Please Enter Condition of Shutter Remarks");
      return;
    }

    const draftData = {
      id: hidDraftId || Date.now().toString(),
      formData,
      createdAt: new Date().toISOString(),
    };

    const existingDrafts = JSON.parse(localStorage.getItem("hangerShutterDrafts") || "[]");
    if (hidDraftId) {
      const updatedDrafts = existingDrafts.map((draft: any) =>
        draft.id === hidDraftId ? draftData : draft
      );
      localStorage.setItem("hangerShutterDrafts", JSON.stringify(updatedDrafts));
    } else {
      localStorage.setItem("hangerShutterDrafts", JSON.stringify([...existingDrafts, draftData]));
    }

    alert("Draft saved successfully!");
    setHidDraftId("");
  };

  const handleFetchDrafts = () => {
    const savedDrafts = JSON.parse(localStorage.getItem("hangerShutterDrafts") || "[]");
    setDrafts(savedDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem("hangerShutterDrafts") || "[]");
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem("hangerShutterDrafts", JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
    alert("Draft deleted successfully!");
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      make: "",
      condition_of_shutter_observations: "",
      condition_of_shutter_remarks: "",
      condition_of_slates_observations: "",
      condition_of_slates_remarks: "",
      condition_of_top_hood_observations: "",
      condition_of_top_hood_remarks: "",
      condition_of_bottom_bar_weather_strips_observations: "",
      condition_of_bottom_bar_weather_strips_remarks: "",
      condition_of_canvas_observations: "",
      condition_of_canvas_remarks: "",
      top_and_bottom_limit_observations: "",
      top_and_bottom_limit_remarks: "",
      condition_of_gear_box_seal_observations: "",
      condition_of_gear_box_seal_remarks: "",
      operational_trails_observations: "",
      operational_trails_remarks: "",
      electrical_observation: "",
      electrical_remarks: "",
      any_other_observation_remarks: "",
      overall_remarks_observations: "",
      authority_signature: "",
    });
    setHidDraftId("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ship) {
      alert("Please Select Ship");
      return;
    }
    if (!formData.date_of_inspection) {
      alert("Please Select Date of Inspection");
      return;
    }
    if (!formData.make.trim()) {
      alert("Please Enter Make");
      return;
    }
    if (!formData.condition_of_shutter_observations) {
      alert("Please Select Condition of Shutter Observations");
      return;
    }
    if (!formData.condition_of_shutter_remarks.trim()) {
      alert("Please Enter Condition of Shutter Remarks");
      return;
    }
    if (!formData.condition_of_slates_observations) {
      alert("Please Select Condition of Slates and Guide, End Locks, Wind Locks, Hood and Bottom Bar Observations");
      return;
    }
    if (!formData.condition_of_slates_remarks.trim()) {
      alert("Please Enter Condition of Slates and Guide, End Locks, Wind Locks, Hood and Bottom Bar Remarks");
      return;
    }
    if (!formData.condition_of_top_hood_observations) {
      alert("Please Select Condition of Top Hood Observations");
      return;
    }
    if (!formData.condition_of_top_hood_remarks.trim()) {
      alert("Please Enter Condition of Top Hood Remarks");
      return;
    }
    if (!formData.condition_of_bottom_bar_weather_strips_observations) {
      alert("Please Select Condition of Bottom Bar Weather Strips Observations");
      return;
    }
    if (!formData.condition_of_bottom_bar_weather_strips_remarks.trim()) {
      alert("Please Enter Condition of Bottom Bar Weather Strips Remarks");
      return;
    }
    if (!formData.condition_of_canvas_observations) {
      alert("Please Select Condition of Canvas Reinforced Neo-prene Strips Observations");
      return;
    }
    if (!formData.condition_of_canvas_remarks.trim()) {
      alert("Please Enter Condition of Canvas Reinforced Neo-prene Strips Remarks");
      return;
    }
    if (!formData.top_and_bottom_limit_observations) {
      alert("Please Select Top and Bottom Limit Switches Observations");
      return;
    }
    if (!formData.top_and_bottom_limit_remarks.trim()) {
      alert("Please Enter Top and Bottom Limit Switches Remarks");
      return;
    }
    if (!formData.condition_of_gear_box_seal_observations) {
      alert("Please Select Condition of Gear Box Seal Observations");
      return;
    }
    if (!formData.condition_of_gear_box_seal_remarks.trim()) {
      alert("Please Enter Condition of Gear Box Seal Remarks");
      return;
    }
    if (!formData.operational_trails_observations) {
      alert("Please Select Operational Trails Manual Observations");
      return;
    }
    if (!formData.operational_trails_remarks.trim()) {
      alert("Please Enter Operational Trails Manual Remarks");
      return;
    }
    if (!formData.electrical_observation) {
      alert("Please Select Operational Trails Electrical Observations");
      return;
    }
    if (!formData.electrical_remarks.trim()) {
      alert("Please Enter Operational Trails Electrical Remarks");
      return;
    }
    if (!formData.any_other_observation_remarks.trim()) {
      alert("Please Enter Any Other Observation Remarks");
      return;
    }
    if (!formData.overall_remarks_observations) {
      alert("Please Select Overall Remarks Observations");
      return;
    }
    if (!formData.authority_signature) {
      alert("Please Upload Authority Signature");
      return;
    }

    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
  };

  const validateInput = (value: string, field: string) => {
    if (field === "make") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special Characters Are Not Allowed");
        return value.replace(/[^a-zA-Z0-9\s]/g, '');
      }
    }
    if (field.includes("remarks")) {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special characters are not allowed.");
      }
      const cleanedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
      if (cleanedValue.length > 1000) {
        alert("Remarks cannot exceed 1000 characters.");
        return cleanedValue.substring(0, 1000);
      }
      return cleanedValue;
    }
    return value;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="form-header mb-6">
          <h2 className="text-2xl font-bold text-center mb-4">HANGER SHUTTER</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Ship Selection */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
              <Label className="text-lg font-semibold">Ship</Label>
            </div>
            <div className="section-content">
              <Select value={formData.ship} onValueChange={(value) => handleInputChange("ship", value)}>
                <SelectTrigger className="w-full">
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

          {/* Section 2: Date of Inspection */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
              <Label className="text-lg font-semibold">Date of Inspection/Trials<span className="text-red-500">*</span></Label>
            </div>
            <div className="section-content">
              <Input
                type="date"
                value={formData.date_of_inspection}
                onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Section 3: Make */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
              <Label className="text-lg font-semibold">Make<span className="text-red-500">*</span></Label>
            </div>
            <div className="section-content">
              <Input
                type="text"
                value={formData.make}
                onChange={(e) => {
                  const validatedValue = validateInput(e.target.value, "make");
                  handleInputChange("make", validatedValue);
                }}
                maxLength={20}
                className="w-full"
              />
            </div>
          </div>

          {/* Section 4: Condition of Shutter */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
              <Label className="text-lg font-semibold">Condition of Shutter</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Corrosion, Damage, Broken Slates</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_shutter_observations} onValueChange={(value) => handleInputChange("condition_of_shutter_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_shutter_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "condition_of_shutter_remarks");
                      handleInputChange("condition_of_shutter_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Condition of Slates and Guide, End Locks, Wind Locks, Hood and Bottom Bar */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
              <Label className="text-lg font-semibold">Condition of Slates and Guide, End Locks, Wind Locks, Hood and Bottom Bar</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Bents, Kinks, Damage</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_slates_observations} onValueChange={(value) => handleInputChange("condition_of_slates_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_slates_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "condition_of_slates_remarks");
                      handleInputChange("condition_of_slates_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Condition of Top Hood */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
              <Label className="text-lg font-semibold">Condition of Top Hood</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Damage, Corrosion</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_top_hood_observations} onValueChange={(value) => handleInputChange("condition_of_top_hood_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_top_hood_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "condition_of_top_hood_remarks");
                      handleInputChange("condition_of_top_hood_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Condition of Bottom Bar Weather Strips */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
              <Label className="text-lg font-semibold">Condition of Bottom Bar Weather Strips</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Weather and Tear/ Damage</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_bottom_bar_weather_strips_observations} onValueChange={(value) => handleInputChange("condition_of_bottom_bar_weather_strips_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_bottom_bar_weather_strips_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "condition_of_bottom_bar_weather_strips_remarks");
                      handleInputChange("condition_of_bottom_bar_weather_strips_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Condition of Canvas Reinforced Neo-prene Strips */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
              <Label className="text-lg font-semibold">Condition of Canvas Reinforced Neo-prene Strips</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Weather and Tear/ Damage</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_canvas_observations} onValueChange={(value) => handleInputChange("condition_of_canvas_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_canvas_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "condition_of_canvas_remarks");
                      handleInputChange("condition_of_canvas_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 9: Top and Bottom Limit Switches */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
              <Label className="text-lg font-semibold">Top and Bottom Limit Switches</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Check Operation</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.top_and_bottom_limit_observations} onValueChange={(value) => handleInputChange("top_and_bottom_limit_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="OPS">OPS</SelectItem>
                      <SelectItem value="NON-OPS">NON-OPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.top_and_bottom_limit_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "top_and_bottom_limit_remarks");
                      handleInputChange("top_and_bottom_limit_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Condition of Gear Box Seal */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">10</span>
              <Label className="text-lg font-semibold">Condition of Gear Box Seal</Label>
            </div>
            <div className="section-content">
              <div className="mb-2">
                <Label className="text-sm text-gray-600">a) Weather and Tear/ Damage</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.condition_of_gear_box_seal_observations} onValueChange={(value) => handleInputChange("condition_of_gear_box_seal_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.condition_of_gear_box_seal_remarks}
                    onChange={(e) => {
                      const validatedValue = validateInput(e.target.value, "condition_of_gear_box_seal_remarks");
                      handleInputChange("condition_of_gear_box_seal_remarks", validatedValue);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 11: Operational Trails */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">11</span>
              <Label className="text-lg font-semibold">Operational Trails</Label>
            </div>
            <div className="section-content">
              <div className="mb-4">
                <Label className="text-sm text-gray-600">a) Manual</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.operational_trails_observations} onValueChange={(value) => handleInputChange("operational_trails_observations", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">--Select--</SelectItem>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.operational_trails_remarks}
                      onChange={(e) => {
                        const validatedValue = validateInput(e.target.value, "operational_trails_remarks");
                        handleInputChange("operational_trails_remarks", validatedValue);
                      }}
                      rows={2}
                      maxLength={1000}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">b) Electrical</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                    <Select value={formData.electrical_observation} onValueChange={(value) => handleInputChange("electrical_observation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">--Select--</SelectItem>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.electrical_remarks}
                      onChange={(e) => {
                        const validatedValue = validateInput(e.target.value, "electrical_remarks");
                        handleInputChange("electrical_remarks", validatedValue);
                      }}
                      rows={2}
                      maxLength={1000}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 12: Any Other Observation */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">12</span>
              <Label className="text-lg font-semibold">Any Other Observation</Label>
            </div>
            <div className="section-content">
              <div>
                <Label className="text-sm font-medium">Remarks:<span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.any_other_observation_remarks}
                  onChange={(e) => {
                    const validatedValue = validateInput(e.target.value, "any_other_observation_remarks");
                    handleInputChange("any_other_observation_remarks", validatedValue);
                  }}
                  rows={2}
                  maxLength={1000}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 13: Overall Remarks */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">13</span>
              <Label className="text-lg font-semibold">Overall Remarks</Label>
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations:<span className="text-red-500">*</span></Label>
                  <Select value={formData.overall_remarks_observations} onValueChange={(value) => handleInputChange("overall_remarks_observations", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="UNSAT">UNSAT</SelectItem>
                      <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 14: Authority Signature */}
          <div className="section-box p-4 border rounded-lg">
            <div className="section-header mb-4">
              <span className="label-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">14</span>
              <Label className="text-lg font-semibold">Authority Signature<span className="text-red-500">*</span></Label>
            </div>
            <div className="section-content">
              <div className="text-center">
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("authority_signature", e.target.files?.[0] || null)}
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
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

        {/* Draft Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Draft Data</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
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
                    {drafts.map((draft: any, index: number) => (
                      <TableRow key={draft.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{draft.formData.make || "No Inspection Data"}</TableCell>
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
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HangerShutterForm;
