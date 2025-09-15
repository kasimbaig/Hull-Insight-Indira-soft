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

const AccommodationLadderForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make: "",
    year_manufacture: "",
    date_last_load_test: "",
    last_load_test_due_date: "",
    remarks_load_test: "",
    date_last_testing_wire_rope: "",
    last_testing_wire_rope_due_date: "",
    remarks_load_test_wire_rope: "",
    date_last_visual_survey: "",
    last_visual_survey_due_date: "",
    remarks_last_visual_survey: "",
    date_fitment: "",
    replacement_due_date: "",
    remarks_wire_rope: "",
    observations_electrical: "",
    remarks_electrical: "",
    observations_switches: "",
    remarks_switches: "",
    observations_indicators: "",
    remarks_indicators: "",
    observations_guardrails: "",
    remarks_guardrails: "",
    observations_structure: "",
    remarks_structure: "",
    observations_greasing: "",
    remarks_greasing: "",
    observations_pulley: "",
    remarks_pulley: "",
    remarks_any_other_observ: "",
    observations_remarks: "",
    authority_signature: null as File | null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  const handleSaveDraft = () => {
    if (!formData.make || !formData.ship) {
      alert("Please fill in Ship and Make before saving draft.");
      return;
    }
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    // Mock draft data
    setDrafts([
      { id: 1, ship: "Sample Ship", make: "Sample Make", created_date: "2024-01-15" },
      { id: 2, ship: "Another Ship", make: "Another Make", created_date: "2024-01-14" },
    ]);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      make: "",
      year_manufacture: "",
      date_last_load_test: "",
      last_load_test_due_date: "",
      remarks_load_test: "",
      date_last_testing_wire_rope: "",
      last_testing_wire_rope_due_date: "",
      remarks_load_test_wire_rope: "",
      date_last_visual_survey: "",
      last_visual_survey_due_date: "",
      remarks_last_visual_survey: "",
      date_fitment: "",
      replacement_due_date: "",
      remarks_wire_rope: "",
      observations_electrical: "",
      remarks_electrical: "",
      observations_switches: "",
      remarks_switches: "",
      observations_indicators: "",
      remarks_indicators: "",
      observations_guardrails: "",
      remarks_guardrails: "",
      observations_structure: "",
      remarks_structure: "",
      observations_greasing: "",
      remarks_greasing: "",
      observations_pulley: "",
      remarks_pulley: "",
      remarks_any_other_observ: "",
      observations_remarks: "",
      authority_signature: null,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">ACCOMMODATION LADDER</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

        <ul className="space-y-6">
          {/* Section 1: Ship */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
              <Label htmlFor="ship" className="text-lg font-semibold">Ship</Label>
            </div>
            <div className="section-content">
              <div className="w-full max-w-xs">
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
          </li>

          {/* Section 2: Date of Inspection */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
              <Label htmlFor="date_of_inspection" className="text-lg font-semibold">
                Date of Inspection/Trials<span className="text-red-500 ml-1">*</span>
              </Label>
            </div>
            <div className="section-content">
              <Input
                type="date"
                id="date_of_inspection"
                value={formData.date_of_inspection}
                onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                className="w-full max-w-xs"
                required
              />
            </div>
          </li>

          {/* Section 3: Make */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
              <Label htmlFor="make" className="text-lg font-semibold">
                Make<span className="text-red-500 ml-1">*</span>
              </Label>
            </div>
            <div className="section-content">
              <Input
                type="text"
                id="make"
                value={formData.make}
                onChange={(e) => handleInputChange("make", e.target.value)}
                className="w-full max-w-xs"
                maxLength={20}
                required
              />
            </div>
          </li>

          {/* Section 4: Year of Manufacture */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
              <Label htmlFor="year_manufacture" className="text-lg font-semibold">
                Year of Manufacture<span className="text-red-500 ml-1">*</span>
              </Label>
            </div>
            <div className="section-content">
              <Input
                type="number"
                id="year_manufacture"
                value={formData.year_manufacture}
                onChange={(e) => handleInputChange("year_manufacture", e.target.value)}
                className="w-full max-w-xs"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </li>

          {/* Section 5: Load Testing */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
              <Label className="text-lg font-semibold">Load Testing</Label>
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date of Last Load Test:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="date_last_load_test"
                    value={formData.date_last_load_test}
                    onChange={(e) => handleInputChange("date_last_load_test", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Next Due Date:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="last_load_test_due_date"
                    value={formData.last_load_test_due_date}
                    onChange={(e) => handleInputChange("last_load_test_due_date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_load_test"
                    value={formData.remarks_load_test}
                    onChange={(e) => handleInputChange("remarks_load_test", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 6: Load Testing of Wire Rope */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
              <Label className="text-lg font-semibold">Load Testing of Wire Rope</Label>
            </div>
            <div className="section-header-inner text-sm text-gray-600 mb-4">
              a) Period of Test not to Exceed 27 Month.
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date of Last Load Test:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="date_last_testing_wire_rope"
                    value={formData.date_last_testing_wire_rope}
                    onChange={(e) => handleInputChange("date_last_testing_wire_rope", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Next Due Date:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="last_testing_wire_rope_due_date"
                    value={formData.last_testing_wire_rope_due_date}
                    onChange={(e) => handleInputChange("last_testing_wire_rope_due_date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_load_test_wire_rope"
                    value={formData.remarks_load_test_wire_rope}
                    onChange={(e) => handleInputChange("remarks_load_test_wire_rope", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 7: Serviceability Checks */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
              <Label className="text-lg font-semibold">Serviceability Checks/ Visual Survey of Rope</Label>
            </div>
            <div className="section-header-inner text-sm text-gray-600 mb-4">
              a) Date of Last Visual Survey. To be Examined by Refitting Agencies at Intermediate
              Intervals not Exceeding 2 Years. Check Wire Rope for Signs of
              Excessive Wear, Corrosion or Other Defects.
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Last Visual Survey:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="date_last_visual_survey"
                    value={formData.date_last_visual_survey}
                    onChange={(e) => handleInputChange("date_last_visual_survey", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Next Due Date:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="last_visual_survey_due_date"
                    value={formData.last_visual_survey_due_date}
                    onChange={(e) => handleInputChange("last_visual_survey_due_date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_last_visual_survey"
                    value={formData.remarks_last_visual_survey}
                    onChange={(e) => handleInputChange("remarks_last_visual_survey", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 8: Wire Rope */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
              <Label className="text-lg font-semibold">Wire Rope</Label>
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date of Fitment:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="date_fitment"
                    value={formData.date_fitment}
                    onChange={(e) => handleInputChange("date_fitment", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Replacement Due Date:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="replacement_due_date"
                    value={formData.replacement_due_date}
                    onChange={(e) => handleInputChange("replacement_due_date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_wire_rope"
                    value={formData.remarks_wire_rope}
                    onChange={(e) => handleInputChange("remarks_wire_rope", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 9: Condition of JB/ Control */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
              <Label className="text-lg font-semibold">Condition of JB/ Control</Label>
            </div>
            
            {/* 9a) Electrical Hygiene */}
            <div className="mb-6">
              <div className="section-header-inner text-sm text-gray-600 mb-4">
                a) Electrical Hygiene, Condition of Connectors Lugs. Check Tightness of Electrical Cable
                Connections and Fasteners
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_electrical} onValueChange={(value) => handleInputChange("observations_electrical", value)}>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_electrical"
                    value={formData.remarks_electrical}
                    onChange={(e) => handleInputChange("remarks_electrical", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 9b) Functioning of Switches */}
            <div className="mb-6">
              <div className="section-header-inner text-sm text-gray-600 mb-4">
                b) Functioning of Switches
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_switches} onValueChange={(value) => handleInputChange("observations_switches", value)}>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_switches"
                    value={formData.remarks_switches}
                    onChange={(e) => handleInputChange("remarks_switches", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 9c) Functioning of Indicators */}
            <div>
              <div className="section-header-inner text-sm text-gray-600 mb-4">
                c) Functioning of Indicators
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_indicators} onValueChange={(value) => handleInputChange("observations_indicators", value)}>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_indicators"
                    value={formData.remarks_indicators}
                    onChange={(e) => handleInputChange("remarks_indicators", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 10: Condition of Guardrails */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">10</span>
              <Label className="text-lg font-semibold">Condition of Guardrails</Label>
            </div>
            <div className="section-header-inner text-sm text-gray-600 mb-4">
              a) Check for Damage/ Cracks, Deformation & Corrosion
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_guardrails} onValueChange={(value) => handleInputChange("observations_guardrails", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">--Select--</SelectItem>
                      <SelectItem value="SAT">SAT</SelectItem>
                      <SelectItem value="BROKEN">BROKEN</SelectItem>
                      <SelectItem value="DISLODGED">DISLODGED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_guardrails"
                    value={formData.remarks_guardrails}
                    onChange={(e) => handleInputChange("remarks_guardrails", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 11: Structure */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">11</span>
              <Label className="text-lg font-semibold">Structure</Label>
            </div>
            <div className="section-header-inner text-sm text-gray-600 mb-4">
              a) Check for Damage/ Cracks, Deformation & Corrosion, Specially Upper and Lower Platform
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_structure} onValueChange={(value) => handleInputChange("observations_structure", value)}>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_structure"
                    value={formData.remarks_structure}
                    onChange={(e) => handleInputChange("remarks_structure", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 12: Greasing of Mechanical Parts */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">12</span>
              <Label className="text-lg font-semibold">Greasing of Mechanical Parts</Label>
            </div>
            <div className="section-header-inner text-sm text-gray-600 mb-4">
              a) Proper of Greasing on Mechanical Parts
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_greasing} onValueChange={(value) => handleInputChange("observations_greasing", value)}>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_greasing"
                    value={formData.remarks_greasing}
                    onChange={(e) => handleInputChange("remarks_greasing", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 13: Condition of Pulley */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">13</span>
              <Label className="text-lg font-semibold">Condition of Pulley</Label>
            </div>
            <div className="section-header-inner text-sm text-gray-600 mb-4">
              a) Rust/ Corrosion
            </div>
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Observations:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formData.observations_pulley} onValueChange={(value) => handleInputChange("observations_pulley", value)}>
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
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Remarks:<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="remarks_pulley"
                    value={formData.remarks_pulley}
                    onChange={(e) => handleInputChange("remarks_pulley", e.target.value)}
                    rows={2}
                    required
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Section 14: Any Other Observation */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">14</span>
              <Label className="text-lg font-semibold">Any Other Observation</Label>
            </div>
            <div className="section-content">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Remarks:<span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="remarks_any_other_observ"
                  value={formData.remarks_any_other_observ}
                  onChange={(e) => handleInputChange("remarks_any_other_observ", e.target.value)}
                  rows={2}
                  required
                />
              </div>
            </div>
          </li>

          {/* Section 15: Overall Remarks */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">15</span>
              <Label className="text-lg font-semibold">Overall Remarks</Label>
            </div>
            <div className="section-content">
              <div className="w-full max-w-xs">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Observations:<span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={formData.observations_remarks} onValueChange={(value) => handleInputChange("observations_remarks", value)}>
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
          </li>

          {/* Section 16: Authority Signature */}
          <li className="section-box border border-gray-200 rounded-lg p-6">
            <div className="section-header flex items-center mb-4">
              <span className="label-number bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">16</span>
              <Label className="text-lg font-semibold">
                Authority Signature<span className="text-red-500 ml-1">*</span>
              </Label>
            </div>
            <div className="section-content">
              <div className="w-full max-w-xs">
                <Input
                  type="file"
                  id="authority_signature"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleInputChange("authority_signature", e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>
          </li>
        </ul>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={handleFetchDrafts}>
                  Fetch Drafts
                </Button>
                <Button type="button" variant="outline" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button type="button" variant="outline" onClick={handleClear}>
                  Clear
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Ship</TableHead>
                  <TableHead>Make</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={draft.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{draft.ship}</TableCell>
                    <TableCell>{draft.make}</TableCell>
                    <TableCell>{draft.created_date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccommodationLadderForm;
