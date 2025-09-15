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
import { Edit, Trash2, Plus, Minus } from "lucide-react";

const FinalUnderwaterHullInspectionForm = () => {
  const [formData, setFormData] = useState({
    final_inspection: "",
    dt_inspection: "",
    auth_inspection: "",
    ship_not_cleared_for_undocking: "",
    reoffer_inspection: "",
    refit_authority: "",
    name_ship_staff: "",
    rank_ship_staff: "",
    dsg_ship_staff: "",
    name_refitting_auth: "",
    rank_refitting_auth: "",
    dsg_refitting_auth: "",
    name_hitu_inspector: "",
    rank_hitu_inspector: "",
    dsg_hitu_inspector: "",
  });

  const [inspectors, setInspectors] = useState([
    { name: "", rank: "", designation: "" }
  ]);

  const [doiData, setDoiData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [ssIntData, setSsIntData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [ssConfirmData, setSsConfirmData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [fitmentData, setFitmentData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [sstData, setSstData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [freshDefects, setFreshDefects] = useState([""]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const shipOptions = [
    { value: "43", label: "SHIVALIK" },
    { value: "84", label: "JAMUNA" },
    { value: "23", label: "BANGARAM" },
    { value: "56", label: "TARANGINI" },
    { value: "99", label: "SARYU" },
    { value: "31", label: "KUMBHIR" },
    { value: "87", label: "T-83" },
    { value: "27", label: "AIRAVAT" },
    { value: "48", label: "KHANJAR" },
    { value: "57", label: "SHUDERSHINI" },
    { value: "59", label: "TRISHUL" },
    { value: "62", label: "TEG" },
    { value: "55", label: "RANVIJAY" },
    { value: "47", label: "KIRPAN" },
    { value: "35", label: "DELHI" },
    { value: "83", label: "SURVEKSHAK" },
    { value: "65", label: "JYOTI" },
    { value: "94", label: "SUJATA" },
    { value: "76", label: "KABRA" },
    { value: "68", label: "CANKARSO" },
    { value: "88", label: "T-84" },
    { value: "18", label: "VIBHUTI" },
    { value: "17", label: "NISHANK" },
    { value: "25", label: "MAGAR" },
    { value: "42", label: "BEAS" },
    { value: "90", label: "SUVERNA" },
    { value: "45", label: "SAHYADRI" },
    { value: "16", label: "PRALAYA" },
    { value: "74", label: "CHERIYAM" },
    { value: "44", label: "SATPURA" },
    { value: "20", label: "JALASHWA" },
    { value: "63", label: "TARKASH" },
    { value: "52", label: "KARMUK" },
    { value: "82", label: "SUTLEJ" },
    { value: "96", label: "SUMEDHA" },
    { value: "15", label: "PRABAL" },
    { value: "75", label: "CORA DIVH" },
    { value: "21", label: "BATTIMALV" },
    { value: "38", label: "CHENNAI" },
    { value: "97", label: "SUMITRA" },
    { value: "86", label: "T-82" },
    { value: "46", label: "KUTHAR" },
    { value: "69", label: "KONDUL" },
    { value: "89", label: "SUBHDRA" },
    { value: "80", label: "DARSHAK" },
    { value: "24", label: "BITRA" },
    { value: "73", label: "CHETLAT" },
    { value: "81", label: "NIREEKSHAK" },
    { value: "71", label: "KARUVA" },
    { value: "67", label: "DEEPAK" },
    { value: "123", label: "SHAKTI" },
    { value: "36", label: "KOLKATA" },
    { value: "85", label: "INVETIGATOR" },
    { value: "93", label: "SHARDA" },
    { value: "64", label: "SHAKTI" },
    { value: "33", label: "MUMBAI" },
    { value: "39", label: "GOMTI" },
    { value: "41", label: "BETWA" },
    { value: "13", label: "NASHAK" },
    { value: "70", label: "KOSWARI" },
    { value: "30", label: "CHEETAH" },
    { value: "58", label: "TALWAR" },
    { value: "28", label: "KESARI" },
    { value: "66", label: "ADITYA" },
    { value: "22", label: "BARATANG" },
    { value: "49", label: "KORA" },
    { value: "51", label: "KULISH" },
    { value: "53", label: "RANA" },
    { value: "77", label: "KALPENI" },
    { value: "122", label: "SHAKTI" },
    { value: "12", label: "VIPUL" },
    { value: "60", label: "TABAR" },
    { value: "61", label: "TRINKAND" },
    { value: "37", label: "KOCHI" },
    { value: "91", label: "SUKANYA" },
    { value: "92", label: "SAVITRI" },
    { value: "29", label: "GULDAR" },
    { value: "40", label: "BRAHMAPUTRA" },
    { value: "26", label: "GHARIAL" },
    { value: "54", label: "RANVIR" },
    { value: "79", label: "NIRUPAK" },
    { value: "19", label: "VINASH" },
    { value: "50", label: "KIRCH" },
    { value: "78", label: "SANDHAYAK" },
    { value: "14", label: "VIDYUT" },
    { value: "95", label: "TIR" },
    { value: "32", label: "GAJ" },
    { value: "72", label: "CAR NICOBAR" },
    { value: "98", label: "SUNAYNA" },
    { value: "34", label: "MYSORE" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSpecialCharValidation = (value: string) => {
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      alert("Special characters are not allowed.");
      return value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
    return value;
  };

  const handleNumberValidation = (value: string) => {
    if (/[^0-9]/.test(value)) {
      alert("Only numbers are allowed.");
      return value.replace(/[^0-9]/g, '');
    }
    return value;
  };

  const addInspector = () => {
    setInspectors([...inspectors, { name: "", rank: "", designation: "" }]);
  };

  const removeInspector = (index: number) => {
    if (inspectors.length > 1) {
      setInspectors(inspectors.filter((_, i) => i !== index));
    }
  };

  const updateInspector = (index: number, field: string, value: string) => {
    const updatedInspectors = inspectors.map((inspector, i) => 
      i === index ? { ...inspector, [field]: handleSpecialCharValidation(value) } : inspector
    );
    setInspectors(updatedInspectors);
  };

  const addDoiRow = () => {
    setDoiData([...doiData, { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
  };

  const removeDoiRow = (index: number) => {
    if (doiData.length > 1) {
      setDoiData(doiData.filter((_, i) => i !== index));
    }
  };

  const updateDoiRow = (index: number, field: string, value: string) => {
    const updatedData = doiData.map((row, i) => 
      i === index ? { 
        ...row, 
        [field]: field.includes('frame_station') ? handleNumberValidation(value) : handleSpecialCharValidation(value)
      } : row
    );
    setDoiData(updatedData);
  };

  const addSsIntRow = () => {
    setSsIntData([...ssIntData, { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
  };

  const removeSsIntRow = (index: number) => {
    if (ssIntData.length > 1) {
      setSsIntData(ssIntData.filter((_, i) => i !== index));
    }
  };

  const updateSsIntRow = (index: number, field: string, value: string) => {
    const updatedData = ssIntData.map((row, i) => 
      i === index ? { 
        ...row, 
        [field]: field.includes('frame_station') ? handleNumberValidation(value) : handleSpecialCharValidation(value)
      } : row
    );
    setSsIntData(updatedData);
  };

  const addSsConfirmRow = () => {
    setSsConfirmData([...ssConfirmData, { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
  };

  const removeSsConfirmRow = (index: number) => {
    if (ssConfirmData.length > 1) {
      setSsConfirmData(ssConfirmData.filter((_, i) => i !== index));
    }
  };

  const updateSsConfirmRow = (index: number, field: string, value: string) => {
    const updatedData = ssConfirmData.map((row, i) => 
      i === index ? { 
        ...row, 
        [field]: field.includes('frame_station') ? handleNumberValidation(value) : handleSpecialCharValidation(value)
      } : row
    );
    setSsConfirmData(updatedData);
  };

  const addFitmentRow = () => {
    setFitmentData([...fitmentData, { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
  };

  const removeFitmentRow = (index: number) => {
    if (fitmentData.length > 1) {
      setFitmentData(fitmentData.filter((_, i) => i !== index));
    }
  };

  const updateFitmentRow = (index: number, field: string, value: string) => {
    const updatedData = fitmentData.map((row, i) => 
      i === index ? { 
        ...row, 
        [field]: field.includes('frame_station') ? handleNumberValidation(value) : handleSpecialCharValidation(value)
      } : row
    );
    setFitmentData(updatedData);
  };

  const addSstRow = () => {
    setSstData([...sstData, { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
  };

  const removeSstRow = (index: number) => {
    if (sstData.length > 1) {
      setSstData(sstData.filter((_, i) => i !== index));
    }
  };

  const updateSstRow = (index: number, field: string, value: string) => {
    const updatedData = sstData.map((row, i) => 
      i === index ? { 
        ...row, 
        [field]: field.includes('frame_station') ? handleNumberValidation(value) : handleSpecialCharValidation(value)
      } : row
    );
    setSstData(updatedData);
  };

  const addFreshDefect = () => {
    setFreshDefects([...freshDefects, ""]);
  };

  const removeFreshDefect = (index: number) => {
    if (freshDefects.length > 1) {
      setFreshDefects(freshDefects.filter((_, i) => i !== index));
    }
  };

  const updateFreshDefect = (index: number, value: string) => {
    const updatedDefects = freshDefects.map((defect, i) => 
      i === index ? handleSpecialCharValidation(value) : defect
    );
    setFreshDefects(updatedDefects);
  };

  const handleSaveDraft = () => {
    if (!formData.final_inspection || !formData.dt_inspection || !formData.auth_inspection) {
      alert("Please fill in INS, Date of Inspection, and Authority for Inspection before saving draft.");
      return;
    }
    console.log("Saving draft:", { formData, inspectors, doiData, ssIntData, ssConfirmData, fitmentData, sstData, freshDefects });
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    // Mock draft data
    setDrafts([
      { id: 1, ins: "SHIVALIK", address: "Sample Address 1", created_date: "2024-01-15" },
      { id: 2, ins: "JAMUNA", address: "Sample Address 2", created_date: "2024-01-14" },
    ]);
  };

  const handleClear = () => {
    setFormData({
      final_inspection: "",
      dt_inspection: "",
      auth_inspection: "",
      ship_not_cleared_for_undocking: "",
      reoffer_inspection: "",
      refit_authority: "",
      name_ship_staff: "",
      rank_ship_staff: "",
      dsg_ship_staff: "",
      name_refitting_auth: "",
      rank_refitting_auth: "",
      dsg_refitting_auth: "",
      name_hitu_inspector: "",
      rank_hitu_inspector: "",
      dsg_hitu_inspector: "",
    });
    setInspectors([{ name: "", rank: "", designation: "" }]);
    setDoiData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setSsIntData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setSsConfirmData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setFitmentData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setSstData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setFreshDefects([""]);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.final_inspection) {
      newErrors.final_inspection = "Please Select Final Underwater Hull Inspection - INS";
    }
    if (!formData.dt_inspection) {
      newErrors.dt_inspection = "Please Select the Date of Inspection";
    }
    if (!formData.auth_inspection) {
      newErrors.auth_inspection = "Please Enter Authority for Inspection";
    }

    // Inspectors validation
    inspectors.forEach((inspector, index) => {
      if (!inspector.name) {
        newErrors[`inspector_name_${index}`] = `Please Enter HITU's Inspectors Name ${index + 1}`;
      }
      if (!inspector.rank) {
        newErrors[`inspector_rank_${index}`] = `Please Enter HITU's Inspectors Rank ${index + 1}`;
      }
      if (!inspector.designation) {
        newErrors[`inspector_designation_${index}`] = `Please Enter HITU's Inspectors Designation ${index + 1}`;
      }
    });

    // DOI validation
    doiData.forEach((row, index) => {
      if (!row.location) {
        newErrors[`doi_location_${index}`] = `Please Enter Defect Location ${index + 1}`;
      }
      if (!row.frame_station_from) {
        newErrors[`doi_frame_station_from_${index}`] = `Please Enter Frame Station From ${index + 1}`;
      }
      if (!row.frame_station_to) {
        newErrors[`doi_frame_station_to_${index}`] = `Please Enter Frame Station To ${index + 1}`;
      }
      if (!row.observation) {
        newErrors[`doi_observation_${index}`] = `Please Enter Observation ${index + 1}`;
      }
      if (!row.remarks) {
        newErrors[`doi_remarks_${index}`] = `Please Enter Final Remarks ${index + 1}`;
      }
    });

    // Additional validations for other sections...
    if (!formData.refit_authority) {
      newErrors.refit_authority = "Please Enter Refit authority to confirm no doublers existing on the U/W hull";
    }

    freshDefects.forEach((defect, index) => {
      if (!defect) {
        newErrors[`fresh_defect_${index}`] = `Please Enter Fresh defects / observations ${index + 1}`;
      }
    });

    if (!formData.ship_not_cleared_for_undocking) {
      newErrors.ship_not_cleared_for_undocking = "Please Select Ship not cleared for Undocking";
    }

    if (formData.ship_not_cleared_for_undocking === "NO" && !formData.reoffer_inspection) {
      newErrors.reoffer_inspection = "Please Select Date Re-offer for inspection on";
    }

    // Signature validations
    if (!formData.name_ship_staff) {
      newErrors.name_ship_staff = "Please Enter Name Ship Staff";
    }
    if (!formData.rank_ship_staff) {
      newErrors.rank_ship_staff = "Please Enter Rank Ship Staff";
    }
    if (!formData.dsg_ship_staff) {
      newErrors.dsg_ship_staff = "Please Enter Designation Ship Staff";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", { formData, inspectors, doiData, ssIntData, ssConfirmData, fitmentData, sstData, freshDefects });
      alert("Form submitted successfully!");
    }
  };

  const renderDynamicTable = (
    data: any[],
    headers: string[],
    onAdd: () => void,
    onRemove: (index: number) => void,
    onUpdate: (index: number, field: string, value: string) => void,
    fields: string[]
  ) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows: {data.length}</span>
        <div className="flex space-x-2">
          <Button type="button" size="sm" variant="outline" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr No.</TableHead>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {fields.map((field) => (
                  <TableCell key={field}>
                    <Input
                      value={row[field]}
                      onChange={(e) => onUpdate(index, field, e.target.value)}
                      className={errors[`${field}_${index}`] ? "border-red-500" : ""}
                      maxLength={field.includes('frame_station') ? 4 : field.includes('observation') || field.includes('remarks') ? 50 : 20}
                    />
                    {errors[`${field}_${index}`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`${field}_${index}`]}</p>
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onRemove(index)}
                    disabled={data.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">FINAL UNDERWATER HULL INSPECTION</h4>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-lg font-medium">INS</span>
                <Select
                  value={formData.final_inspection}
                  onValueChange={(value) => handleInputChange("final_inspection", value)}
                >
                  <SelectTrigger className={errors.final_inspection ? "border-red-500 w-64" : "w-64"}>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">--Select--</SelectItem>
                    {shipOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.final_inspection && (
                  <p className="text-red-500 text-xs">{errors.final_inspection}</p>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dt_inspection" className="text-sm font-medium">
                      Date of Inspection <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dt_inspection"
                      type="date"
                      value={formData.dt_inspection}
                      onChange={(e) => handleInputChange("dt_inspection", e.target.value)}
                      className={errors.dt_inspection ? "border-red-500" : ""}
                    />
                    {errors.dt_inspection && (
                      <p className="text-red-500 text-xs mt-1">{errors.dt_inspection}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="auth_inspection" className="text-sm font-medium">
                      Authority for Inspection <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="auth_inspection"
                      value={formData.auth_inspection}
                      onChange={(e) => {
                        const validatedValue = handleSpecialCharValidation(e.target.value);
                        handleInputChange("auth_inspection", validatedValue);
                      }}
                      className={errors.auth_inspection ? "border-red-500" : ""}
                      maxLength={40}
                    />
                    {errors.auth_inspection && (
                      <p className="text-red-500 text-xs mt-1">{errors.auth_inspection}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* HITU's Inspectors */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">HITU's Inspectors</h5>
                {renderDynamicTable(
                  inspectors,
                  ["Name", "Rank", "Designation"],
                  addInspector,
                  removeInspector,
                  updateInspector,
                  ["name", "rank", "designation"]
                )}
              </div>

              {/* DEFECTS/OBSERVATIONS */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">DEFECTS/OBSERVATIONS</h5>
                
                {/* (a) Confirmation on observations / defects */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (a) Confirmation on observations / defects of intermediate U/W hull inspection - List attached
                  </h6>
                  {renderDynamicTable(
                    doiData,
                    ["Location", "Frame Station From", "Frame Station To", "Observation", "Final Remarks"],
                    addDoiRow,
                    removeDoiRow,
                    updateDoiRow,
                    ["location", "frame_station_from", "frame_station_to", "observation", "remarks"]
                  )}
                </div>

                {/* (b) SS to confirm all internal U/W compartments */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (b) SS to confirm all internal U/W compartments defects have been liquidated
                  </h6>
                  {renderDynamicTable(
                    ssIntData,
                    ["Location", "Frame Station From", "Frame Station To", "Observation", "Final Remarks"],
                    addSsIntRow,
                    removeSsIntRow,
                    updateSsIntRow,
                    ["location", "frame_station_from", "frame_station_to", "observation", "remarks"]
                  )}
                </div>

                {/* (c) SS to confirm */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (c) SS to confirm
                  </h6>
                  {renderDynamicTable(
                    ssConfirmData,
                    ["Location", "Frame Station From", "Frame Station To", "Observation", "Final Remarks"],
                    addSsConfirmRow,
                    removeSsConfirmRow,
                    updateSsConfirmRow,
                    ["location", "frame_station_from", "frame_station_to", "observation", "remarks"]
                  )}
                </div>

                {/* (i) Fitment of all U/W and overboard discharge valves */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (i) Fitment of all U/W and overboard discharge valves
                  </h6>
                  {renderDynamicTable(
                    fitmentData,
                    ["Location", "Frame Station From", "Frame Station To", "Observation", "Final Remarks"],
                    addFitmentRow,
                    removeFitmentRow,
                    updateFitmentRow,
                    ["location", "frame_station_from", "frame_station_to", "observation", "remarks"]
                  )}
                </div>

                {/* (ii) Ship is in the same trim condition */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (ii) Ship is in the same trim condition as at the time of docking
                  </h6>
                  {renderDynamicTable(
                    sstData,
                    ["Location", "Frame Station From", "Frame Station To", "Observation", "Final Remarks"],
                    addSstRow,
                    removeSstRow,
                    updateSstRow,
                    ["location", "frame_station_from", "frame_station_to", "observation", "remarks"]
                  )}
                </div>

                {/* (d) Refit authority */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (d) Refit authority to confirm no doublers existing on the U/W hull <span className="text-red-500">*</span>
                  </h6>
                  <Input
                    value={formData.refit_authority}
                    onChange={(e) => {
                      const validatedValue = handleSpecialCharValidation(e.target.value);
                      handleInputChange("refit_authority", validatedValue);
                    }}
                    className={errors.refit_authority ? "border-red-500" : ""}
                    maxLength={50}
                  />
                  {errors.refit_authority && (
                    <p className="text-red-500 text-xs mt-1">{errors.refit_authority}</p>
                  )}
                </div>

                {/* (e) Fresh defects / observations */}
                <div className="space-y-4 mb-8">
                  <h6 className="text-md font-semibold text-gray-800">
                    (e) Fresh defects / observations <span className="text-red-500">*</span>
                  </h6>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Enter Total Number of Rows: {freshDefects.length}</span>
                      <Button type="button" size="sm" variant="outline" onClick={addFreshDefect}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {freshDefects.map((defect, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="w-8 text-sm font-medium">{index + 1}</span>
                          <Input
                            value={defect}
                            onChange={(e) => updateFreshDefect(index, e.target.value)}
                            className={errors[`fresh_defect_${index}`] ? "border-red-500" : ""}
                            maxLength={50}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removeFreshDefect(index)}
                            disabled={freshDefects.length === 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ship Status */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">Ship Status</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ship_not_cleared_for_undocking" className="text-sm font-medium">
                      Ship not cleared for Undocking <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.ship_not_cleared_for_undocking}
                      onValueChange={(value) => handleInputChange("ship_not_cleared_for_undocking", value)}
                    >
                      <SelectTrigger className={errors.ship_not_cleared_for_undocking ? "border-red-500" : ""}>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">--Select--</SelectItem>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.ship_not_cleared_for_undocking && (
                      <p className="text-red-500 text-xs mt-1">{errors.ship_not_cleared_for_undocking}</p>
                    )}
                  </div>
                  
                  {formData.ship_not_cleared_for_undocking === "NO" && (
                    <div>
                      <Label htmlFor="reoffer_inspection" className="text-sm font-medium">
                        Re-offer inspection on <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="reoffer_inspection"
                        type="date"
                        value={formData.reoffer_inspection}
                        onChange={(e) => handleInputChange("reoffer_inspection", e.target.value)}
                        className={errors.reoffer_inspection ? "border-red-500" : ""}
                      />
                      {errors.reoffer_inspection && (
                        <p className="text-red-500 text-xs mt-1">{errors.reoffer_inspection}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Signatures */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">Signatures</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Label htmlFor="sign_ship_staff" className="text-sm font-medium">
                      Signature of Ship Staff <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sign_ship_staff"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="mt-2"
                    />
                    <div className="mt-4 space-y-2">
                      <Input
                        placeholder="Name"
                        value={formData.name_ship_staff}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("name_ship_staff", validatedValue);
                        }}
                        className={errors.name_ship_staff ? "border-red-500" : ""}
                        maxLength={20}
                      />
                      <Input
                        placeholder="Rank"
                        value={formData.rank_ship_staff}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("rank_ship_staff", validatedValue);
                        }}
                        className={errors.rank_ship_staff ? "border-red-500" : ""}
                        maxLength={10}
                      />
                      <Input
                        placeholder="Designation"
                        value={formData.dsg_ship_staff}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("dsg_ship_staff", validatedValue);
                        }}
                        className={errors.dsg_ship_staff ? "border-red-500" : ""}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Label htmlFor="sign_refitting_auth" className="text-sm font-medium">
                      Signature of Refitting Authority <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sign_refitting_auth"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="mt-2"
                    />
                    <div className="mt-4 space-y-2">
                      <Input
                        placeholder="Name"
                        value={formData.name_refitting_auth}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("name_refitting_auth", validatedValue);
                        }}
                        className={errors.name_refitting_auth ? "border-red-500" : ""}
                        maxLength={20}
                      />
                      <Input
                        placeholder="Rank"
                        value={formData.rank_refitting_auth}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("rank_refitting_auth", validatedValue);
                        }}
                        className={errors.rank_refitting_auth ? "border-red-500" : ""}
                        maxLength={10}
                      />
                      <Input
                        placeholder="Designation"
                        value={formData.dsg_refitting_auth}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("dsg_refitting_auth", validatedValue);
                        }}
                        className={errors.dsg_refitting_auth ? "border-red-500" : ""}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Label htmlFor="sign_hitu_inspector" className="text-sm font-medium">
                      Signature of HITU Inspector <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sign_hitu_inspector"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="mt-2"
                    />
                    <div className="mt-4 space-y-2">
                      <Input
                        placeholder="Name"
                        value={formData.name_hitu_inspector}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("name_hitu_inspector", validatedValue);
                        }}
                        className={errors.name_hitu_inspector ? "border-red-500" : ""}
                        maxLength={20}
                      />
                      <Input
                        placeholder="Rank"
                        value={formData.rank_hitu_inspector}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("rank_hitu_inspector", validatedValue);
                        }}
                        className={errors.rank_hitu_inspector ? "border-red-500" : ""}
                        maxLength={10}
                      />
                      <Input
                        placeholder="Designation"
                        value={formData.dsg_hitu_inspector}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation(e.target.value);
                          handleInputChange("dsg_hitu_inspector", validatedValue);
                        }}
                        className={errors.dsg_hitu_inspector ? "border-red-500" : ""}
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>
              </div>

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
                  <TableHead>INS</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={draft.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{draft.ins}</TableCell>
                    <TableCell>{draft.address}</TableCell>
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

export default FinalUnderwaterHullInspectionForm;
