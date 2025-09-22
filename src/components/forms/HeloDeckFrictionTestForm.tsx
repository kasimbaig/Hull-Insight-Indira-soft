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

const HeloDeckFrictionTestForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    undertaken_on: "",
    helo_deck_paint: "",
    occasion: "",
    frictional_coefficient: "",
    any_other_observation: "",
    name_id: "",
    rank: "",
    dsg: "",
    signature_upload: null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [hidDraftId, setHidDraftId] = useState("");
  const [errors, setErrors] = useState({});

  // Dynamic table states
  const [paintApplicationRows, setPaintApplicationRows] = useState([{ id: 1, location: "", details: "", dft_readings: "" }]);
  const [rustRows, setRustRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [pittingRows, setPittingRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [paintBlistersRows, setPaintBlistersRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [burnSpotsRows, setBurnSpotsRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [scratchMarksRows, setScratchMarksRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [paintPeelingRows, setPaintPeelingRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [looseAdhesionRows, setLooseAdhesionRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [paintCrackingRows, setPaintCrackingRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [paintChippedRows, setPaintChippedRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [undulationsRows, setUndulationsRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [patchRepairRows, setPatchRepairRows] = useState([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
  const [frictionTestRows, setFrictionTestRows] = useState([{ id: 1, frame_station: "", pscl: "", wet: "", oily: "" }]);
  const [recommendedRows, setRecommendedRows] = useState([{ id: 1, recommended: "" }]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSaveDraft = () => {
    if (!formData.ship || !formData.undertaken_on || !formData.helo_deck_paint || !formData.occasion) {
      alert("Please fill in all required fields before saving draft");
      return;
    }
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    // Mock data for demonstration
    setDrafts([
      { id: 1, ship: "SHIVALIK", occasion: "Annual Inspection", created_date: "2024-01-15" },
      { id: 2, ship: "DELHI", occasion: "Pre-deployment", created_date: "2024-01-10" }
    ]);
  };

  const handleEditDraft = (draftId) => {
    setHidDraftId(draftId);
    setIsDraftModalOpen(false);
    alert(`Editing draft ${draftId}`);
  };

  const handleDeleteDraft = (draftId) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      setDrafts(prev => prev.filter(draft => draft.id !== draftId));
      alert("Draft deleted successfully!");
    }
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      undertaken_on: "",
      helo_deck_paint: "",
      occasion: "",
      frictional_coefficient: "",
      any_other_observation: "",
      name_id: "",
      rank: "",
      dsg: "",
      signature_upload: null,
    });
    setPaintApplicationRows([{ id: 1, location: "", details: "", dft_readings: "" }]);
    setRustRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setPittingRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setPaintBlistersRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setBurnSpotsRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setScratchMarksRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setPaintPeelingRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setLooseAdhesionRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setPaintCrackingRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setPaintChippedRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setUndulationsRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setPatchRepairRows([{ id: 1, affected_area: "", location: "", start: "", end: "" }]);
    setFrictionTestRows([{ id: 1, frame_station: "", pscl: "", wet: "", oily: "" }]);
    setRecommendedRows([{ id: 1, recommended: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ship || !formData.undertaken_on || !formData.helo_deck_paint || !formData.occasion) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Form submitted successfully!");
  };

  const addRow = (setter, getter, template) => {
    const newId = Math.max(...getter.map(row => row.id)) + 1;
    setter([...getter, { ...template, id: newId }]);
  };

  const removeRow = (setter, getter, id) => {
    if (getter.length > 1) {
      setter(getter.filter(row => row.id !== id));
    }
  };

  const updateRow = (setter, getter, id, field, value) => {
    setter(getter.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          HELO DECK FRICTION TEST - INS {formData.ship}
        </h2>

        {/* Ship Selection */}
        <div className="mb-6">
          <Label htmlFor="ship" className="text-lg font-semibold text-gray-700">
            Ship Selection <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.ship} onValueChange={(value) => setFormData(prev => ({ ...prev, ship: value }))}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHIVALIK">SHIVALIK</SelectItem>
              <SelectItem value="JAMUNA">JAMUNA</SelectItem>
              <SelectItem value="BANGARAM">BANGARAM</SelectItem>
              <SelectItem value="TARANGINI">TARANGINI</SelectItem>
              <SelectItem value="SARYU">SARYU</SelectItem>
              <SelectItem value="KUMBHIR">KUMBHIR</SelectItem>
              <SelectItem value="T-83">T-83</SelectItem>
              <SelectItem value="AIRAVAT">AIRAVAT</SelectItem>
              <SelectItem value="KHANJAR">KHANJAR</SelectItem>
              <SelectItem value="SHUDERSHINI">SHUDERSHINI</SelectItem>
              <SelectItem value="TRISHUL">TRISHUL</SelectItem>
              <SelectItem value="TEG">TEG</SelectItem>
              <SelectItem value="RANVIJAY">RANVIJAY</SelectItem>
              <SelectItem value="KIRPAN">KIRPAN</SelectItem>
              <SelectItem value="DELHI">DELHI</SelectItem>
              <SelectItem value="SURVEKSHAK">SURVEKSHAK</SelectItem>
              <SelectItem value="JYOTI">JYOTI</SelectItem>
              <SelectItem value="SUJATA">SUJATA</SelectItem>
              <SelectItem value="KABRA">KABRA</SelectItem>
              <SelectItem value="CANKARSO">CANKARSO</SelectItem>
              <SelectItem value="T-84">T-84</SelectItem>
              <SelectItem value="VIBHUTI">VIBHUTI</SelectItem>
              <SelectItem value="NISHANK">NISHANK</SelectItem>
              <SelectItem value="MAGAR">MAGAR</SelectItem>
              <SelectItem value="BEAS">BEAS</SelectItem>
              <SelectItem value="SUVERNA">SUVERNA</SelectItem>
              <SelectItem value="SAHYADRI">SAHYADRI</SelectItem>
              <SelectItem value="PRALAYA">PRALAYA</SelectItem>
              <SelectItem value="CHERIYAM">CHERIYAM</SelectItem>
              <SelectItem value="SATPURA">SATPURA</SelectItem>
              <SelectItem value="JALASHWA">JALASHWA</SelectItem>
              <SelectItem value="TARKASH">TARKASH</SelectItem>
              <SelectItem value="KARMUK">KARMUK</SelectItem>
              <SelectItem value="SUTLEJ">SUTLEJ</SelectItem>
              <SelectItem value="SUMEDHA">SUMEDHA</SelectItem>
              <SelectItem value="PRABAL">PRABAL</SelectItem>
              <SelectItem value="CORA DIVH">CORA DIVH</SelectItem>
              <SelectItem value="BATTIMALV">BATTIMALV</SelectItem>
              <SelectItem value="CHENNAI">CHENNAI</SelectItem>
              <SelectItem value="SUMITRA">SUMITRA</SelectItem>
              <SelectItem value="T-82">T-82</SelectItem>
              <SelectItem value="KUTHAR">KUTHAR</SelectItem>
              <SelectItem value="KONDUL">KONDUL</SelectItem>
              <SelectItem value="SUBHDRA">SUBHDRA</SelectItem>
              <SelectItem value="DARSHAK">DARSHAK</SelectItem>
              <SelectItem value="BITRA">BITRA</SelectItem>
              <SelectItem value="CHETLAT">CHETLAT</SelectItem>
              <SelectItem value="NIREEKSHAK">NIREEKSHAK</SelectItem>
              <SelectItem value="KARUVA">KARUVA</SelectItem>
              <SelectItem value="DEEPAK">DEEPAK</SelectItem>
              <SelectItem value="SHAKTI">SHAKTI</SelectItem>
              <SelectItem value="KOLKATA">KOLKATA</SelectItem>
              <SelectItem value="INVETIGATOR">INVETIGATOR</SelectItem>
              <SelectItem value="SHARDA">SHARDA</SelectItem>
              <SelectItem value="MUMBAI">MUMBAI</SelectItem>
              <SelectItem value="GOMTI">GOMTI</SelectItem>
              <SelectItem value="BETWA">BETWA</SelectItem>
              <SelectItem value="NASHAK">NASHAK</SelectItem>
              <SelectItem value="KOSWARI">KOSWARI</SelectItem>
              <SelectItem value="CHEETAH">CHEETAH</SelectItem>
              <SelectItem value="TALWAR">TALWAR</SelectItem>
              <SelectItem value="KESARI">KESARI</SelectItem>
              <SelectItem value="ADITYA">ADITYA</SelectItem>
              <SelectItem value="BARATANG">BARATANG</SelectItem>
              <SelectItem value="KORA">KORA</SelectItem>
              <SelectItem value="KULISH">KULISH</SelectItem>
              <SelectItem value="RANA">RANA</SelectItem>
              <SelectItem value="KALPENI">KALPENI</SelectItem>
              <SelectItem value="VIPUL">VIPUL</SelectItem>
              <SelectItem value="TABAR">TABAR</SelectItem>
              <SelectItem value="TRINKAND">TRINKAND</SelectItem>
              <SelectItem value="KOCHI">KOCHI</SelectItem>
              <SelectItem value="SUKANYA">SUKANYA</SelectItem>
              <SelectItem value="SAVITRI">SAVITRI</SelectItem>
              <SelectItem value="GULDAR">GULDAR</SelectItem>
              <SelectItem value="BRAHMAPUTRA">BRAHMAPUTRA</SelectItem>
              <SelectItem value="GHARIAL">GHARIAL</SelectItem>
              <SelectItem value="RANVIR">RANVIR</SelectItem>
              <SelectItem value="NIRUPAK">NIRUPAK</SelectItem>
              <SelectItem value="VINASH">VINASH</SelectItem>
              <SelectItem value="KIRCH">KIRCH</SelectItem>
              <SelectItem value="SANDHAYAK">SANDHAYAK</SelectItem>
              <SelectItem value="VIDYUT">VIDYUT</SelectItem>
              <SelectItem value="TIR">TIR</SelectItem>
              <SelectItem value="GAJ">GAJ</SelectItem>
              <SelectItem value="CAR NICOBAR">CAR NICOBAR</SelectItem>
              <SelectItem value="SUNAYNA">SUNAYNA</SelectItem>
              <SelectItem value="MYSORE">MYSORE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Friction Test Details */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-blue-600 mb-4 bg-blue-50 p-3 rounded">FRICTION TEST DETAILS</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="undertaken_on">Undertaken on <span className="text-red-500">*</span></Label>
              <Input
                type="date"
                id="undertaken_on"
                name="undertaken_on"
                value={formData.undertaken_on}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="helo_deck_paint">Helo Deck Paint Scheme <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                id="helo_deck_paint"
                name="helo_deck_paint"
                value={formData.helo_deck_paint}
                onChange={handleInputChange}
                maxLength={20}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="occasion">Occasion <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                maxLength={50}
                className="mt-1"
              />
            </div>
          </div>

          {/* Details of Paint Application Table */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">Details of paint application:-</h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={paintApplicationRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > paintApplicationRows.length) {
                    // Add rows
                    const newRows = [];
                    for (let i = paintApplicationRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, location: "", details: "", dft_readings: "" });
                    }
                    setPaintApplicationRows(prev => [...prev, ...newRows]);
                  } else if (count < paintApplicationRows.length) {
                    // Remove rows
                    setPaintApplicationRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Details <span className="text-red-500">*</span></TableHead>
                    <TableHead>DFT Readings <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paintApplicationRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPaintApplicationRows, paintApplicationRows, row.id, 'location', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.details}
                          onChange={(e) => updateRow(setPaintApplicationRows, paintApplicationRows, row.id, 'details', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.dft_readings}
                          onChange={(e) => updateRow(setPaintApplicationRows, paintApplicationRows, row.id, 'dft_readings', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Visual Inspection */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-blue-600 mb-4 bg-blue-50 p-3 rounded">Visual Inspection</h4>
          
          {/* Rust Marks */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(a) Rust marks (scattered/ localised) <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={rustRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > rustRows.length) {
                    // Add rows
                    const newRows = [];
                    for (let i = rustRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setRustRows(prev => [...prev, ...newRows]);
                  } else if (count < rustRows.length) {
                    // Remove rows
                    setRustRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rustRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setRustRows, rustRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setRustRows, rustRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setRustRows, rustRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setRustRows, rustRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pitting */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(b) Pitting (scattered/ localized) <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={pittingRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > pittingRows.length) {
                    const newRows = [];
                    for (let i = pittingRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setPittingRows(prev => [...prev, ...newRows]);
                  } else if (count < pittingRows.length) {
                    setPittingRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pittingRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setPittingRows, pittingRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPittingRows, pittingRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setPittingRows, pittingRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setPittingRows, pittingRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Paint Blisters */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(c) Paint blisters <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={paintBlistersRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > paintBlistersRows.length) {
                    const newRows = [];
                    for (let i = paintBlistersRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setPaintBlistersRows(prev => [...prev, ...newRows]);
                  } else if (count < paintBlistersRows.length) {
                    setPaintBlistersRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paintBlistersRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setPaintBlistersRows, paintBlistersRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPaintBlistersRows, paintBlistersRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setPaintBlistersRows, paintBlistersRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setPaintBlistersRows, paintBlistersRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Burn Spots */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(d) Burn spots <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={burnSpotsRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > burnSpotsRows.length) {
                    const newRows = [];
                    for (let i = burnSpotsRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setBurnSpotsRows(prev => [...prev, ...newRows]);
                  } else if (count < burnSpotsRows.length) {
                    setBurnSpotsRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {burnSpotsRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setBurnSpotsRows, burnSpotsRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setBurnSpotsRows, burnSpotsRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setBurnSpotsRows, burnSpotsRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setBurnSpotsRows, burnSpotsRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Scratch Marks/Dents */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(e) Scratch marks/dents <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={scratchMarksRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > scratchMarksRows.length) {
                    const newRows = [];
                    for (let i = scratchMarksRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setScratchMarksRows(prev => [...prev, ...newRows]);
                  } else if (count < scratchMarksRows.length) {
                    setScratchMarksRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scratchMarksRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setScratchMarksRows, scratchMarksRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setScratchMarksRows, scratchMarksRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setScratchMarksRows, scratchMarksRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setScratchMarksRows, scratchMarksRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Paint Peeling-off/Flaking-off */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(f) Paint peeling-off/flaking-off <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={paintPeelingRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > paintPeelingRows.length) {
                    const newRows = [];
                    for (let i = paintPeelingRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setPaintPeelingRows(prev => [...prev, ...newRows]);
                  } else if (count < paintPeelingRows.length) {
                    setPaintPeelingRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paintPeelingRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setPaintPeelingRows, paintPeelingRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPaintPeelingRows, paintPeelingRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setPaintPeelingRows, paintPeelingRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setPaintPeelingRows, paintPeelingRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Loose Adhesion of Paint Film */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(g) Loose adhesion of paint film <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={looseAdhesionRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > looseAdhesionRows.length) {
                    const newRows = [];
                    for (let i = looseAdhesionRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setLooseAdhesionRows(prev => [...prev, ...newRows]);
                  } else if (count < looseAdhesionRows.length) {
                    setLooseAdhesionRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {looseAdhesionRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setLooseAdhesionRows, looseAdhesionRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setLooseAdhesionRows, looseAdhesionRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setLooseAdhesionRows, looseAdhesionRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setLooseAdhesionRows, looseAdhesionRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Paint Cracking */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(h) Paint cracking <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={paintCrackingRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > paintCrackingRows.length) {
                    const newRows = [];
                    for (let i = paintCrackingRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setPaintCrackingRows(prev => [...prev, ...newRows]);
                  } else if (count < paintCrackingRows.length) {
                    setPaintCrackingRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paintCrackingRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setPaintCrackingRows, paintCrackingRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPaintCrackingRows, paintCrackingRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setPaintCrackingRows, paintCrackingRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setPaintCrackingRows, paintCrackingRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Paint Chipped-off */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(j) Paint chipped-off <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={paintChippedRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > paintChippedRows.length) {
                    const newRows = [];
                    for (let i = paintChippedRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setPaintChippedRows(prev => [...prev, ...newRows]);
                  } else if (count < paintChippedRows.length) {
                    setPaintChippedRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paintChippedRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setPaintChippedRows, paintChippedRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPaintChippedRows, paintChippedRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setPaintChippedRows, paintChippedRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setPaintChippedRows, paintChippedRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Undulations */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(k) Undulations <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={undulationsRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > undulationsRows.length) {
                    const newRows = [];
                    for (let i = undulationsRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setUndulationsRows(prev => [...prev, ...newRows]);
                  } else if (count < undulationsRows.length) {
                    setUndulationsRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {undulationsRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setUndulationsRows, undulationsRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setUndulationsRows, undulationsRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setUndulationsRows, undulationsRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setUndulationsRows, undulationsRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Patch Repairs Undertaken by SS */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(l) Patch repairs undertaken by SS <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={patchRepairRows.length}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  if (count > patchRepairRows.length) {
                    const newRows = [];
                    for (let i = patchRepairRows.length + 1; i <= count; i++) {
                      newRows.push({ id: i, affected_area: "", location: "", start: "", end: "" });
                    }
                    setPatchRepairRows(prev => [...prev, ...newRows]);
                  } else if (count < patchRepairRows.length) {
                    setPatchRepairRows(prev => prev.slice(0, count));
                  }
                }}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patchRepairRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <Input
                          value={row.affected_area}
                          onChange={(e) => updateRow(setPatchRepairRows, patchRepairRows, row.id, 'affected_area', e.target.value)}
                          maxLength={5}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.location}
                          onChange={(e) => updateRow(setPatchRepairRows, patchRepairRows, row.id, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.start}
                          onChange={(e) => updateRow(setPatchRepairRows, patchRepairRows, row.id, 'start', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={row.end}
                          onChange={(e) => updateRow(setPatchRepairRows, patchRepairRows, row.id, 'end', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Any Other Observation */}
          <div className="mb-6">
            <Label htmlFor="any_other_observation">(m) Any other observation <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="any_other_observation"
              name="any_other_observation"
              value={formData.any_other_observation}
              onChange={handleInputChange}
              maxLength={50}
              className="mt-1"
            />
          </div>

          {/* Additional Visual Inspection Fields */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(n) Surface Contamination <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={1}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Input maxLength={5} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={20} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={4} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={4} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(o) Paint Adhesion <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={1}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Input maxLength={5} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={20} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={4} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={4} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-3">(p) Surface Roughness <span className="text-red-500">*</span></h5>
            <div className="mb-4">
              <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
              <Input
                type="number"
                min="1"
                value={1}
                className="w-20 mt-1"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>Affected Area <span className="text-red-500">*</span></TableHead>
                    <TableHead>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead>Start <span className="text-red-500">*</span></TableHead>
                    <TableHead>End <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Input maxLength={5} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={20} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={4} />
                    </TableCell>
                    <TableCell>
                      <Input maxLength={4} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Friction Test Readings */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-blue-600 mb-4 bg-blue-50 p-3 rounded">Friction Test Readings</h4>
          
          <div className="mb-6">
            <Label htmlFor="frictional_coefficient">
              Frictional coefficient readings were recorded at <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="frictional_coefficient"
              name="frictional_coefficient"
              value={formData.frictional_coefficient}
              onChange={handleInputChange}
              maxLength={20}
              className="mt-1"
            />
          </div>

          {/* Friction Test Table */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
            <Input
              type="number"
              min="1"
              value={frictionTestRows.length}
              onChange={(e) => {
                const count = parseInt(e.target.value) || 1;
                if (count > frictionTestRows.length) {
                  const newRows = [];
                  for (let i = frictionTestRows.length + 1; i <= count; i++) {
                    newRows.push({ id: i, frame_station: "", pscl: "", wet: "", oily: "" });
                  }
                  setFrictionTestRows(prev => [...prev, ...newRows]);
                } else if (count < frictionTestRows.length) {
                  setFrictionTestRows(prev => prev.slice(0, count));
                }
              }}
              className="w-20 mt-1"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Frame Station <span className="text-red-500">*</span></TableHead>
                  <TableHead>P/S/C/L <span className="text-red-500">*</span></TableHead>
                  <TableHead>Wet <span className="text-red-500">*</span></TableHead>
                  <TableHead>Oily <span className="text-red-500">*</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frictionTestRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Input
                        value={row.frame_station}
                        onChange={(e) => updateRow(setFrictionTestRows, frictionTestRows, row.id, 'frame_station', e.target.value)}
                        maxLength={8}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.pscl}
                        onChange={(e) => updateRow(setFrictionTestRows, frictionTestRows, row.id, 'pscl', e.target.value)}
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.wet}
                        onChange={(e) => updateRow(setFrictionTestRows, frictionTestRows, row.id, 'wet', e.target.value)}
                        maxLength={10}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.oily}
                        onChange={(e) => updateRow(setFrictionTestRows, frictionTestRows, row.id, 'oily', e.target.value)}
                        maxLength={10}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-blue-600 mb-4 bg-blue-50 p-3 rounded">Recommendations</h4>
          <div className="mb-4">
            <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
            <Input
              type="number"
              min="1"
              value={recommendedRows.length}
              onChange={(e) => {
                const count = parseInt(e.target.value) || 1;
                if (count > recommendedRows.length) {
                  const newRows = [];
                  for (let i = recommendedRows.length + 1; i <= count; i++) {
                    newRows.push({ id: i, recommended: "" });
                  }
                  setRecommendedRows(prev => [...prev, ...newRows]);
                } else if (count < recommendedRows.length) {
                  setRecommendedRows(prev => prev.slice(0, count));
                }
              }}
              className="w-20 mt-1"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Recommended <span className="text-red-500">*</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendedRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Input
                        value={row.recommended}
                        onChange={(e) => updateRow(setRecommendedRows, recommendedRows, row.id, 'recommended', e.target.value)}
                        maxLength={100}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Commander Details */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-blue-600 mb-4 bg-blue-50 p-3 rounded">Commander Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name_id">Name <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                id="name_id"
                name="name_id"
                value={formData.name_id}
                onChange={handleInputChange}
                maxLength={20}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rank">Rank <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                maxLength={10}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dsg">Designation <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                id="dsg"
                name="dsg"
                value={formData.dsg}
                onChange={handleInputChange}
                maxLength={10}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="signature_upload">Signature Upload <span className="text-red-500">*</span></Label>
            <Input
              type="file"
              id="signature_upload"
              name="signature_upload"
              accept=".jpg,.jpeg,.png"
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" onClick={handleFetchDrafts} className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold">
            FETCH DRAFTS
          </Button>
          <Button type="button" onClick={handleSaveDraft} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
            SAVE DRAFT
          </Button>
          <Button type="button" onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
            CLEAR
          </Button>
          <Button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
            SAVE
          </Button>
        </div>

        {/* Draft Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Draft Data</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>INS</TableHead>
                    <TableHead>Occasion</TableHead>
                    <TableHead>Created Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.ship}</TableCell>
                      <TableCell>{draft.occasion}</TableCell>
                      <TableCell>{draft.created_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HeloDeckFrictionTestForm;
