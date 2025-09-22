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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { CalendarIcon, Edit, Trash2, Save, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const EKMAnchorCapstanForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make: "",
    type: "",
    year_manufacture: "",
    observations_electrical_hygiene: "",
    remarks_electrical_hygiene: "",
    observations_status_switches: "",
    remarks_status_switches: "",
    observations_status_indicators: "",
    remarks_status_indicators: "",
    observations_gearbox_oil: "",
    remarks_gearbox_oil: "",
    observations_foundation_corrosion: "",
    remarks_foundation_corrosion: "",
    observations_brake_band: "",
    remarks_brake_band: "",
    observations_insulation_spm: "",
    remarks_insulation_spm: "",
    observations_greasing_mechanical: "",
    remarks_greasing_mechanical: "",
    observations_greasing_points: "",
    remarks_greasing_points: "",
    observations_engage: "",
    remarks_engage: "",
    observations_disengage: "",
    remarks_disengage: "",
    observations_indicators: "",
    remarks_indicators: "",
    observations_engage_band_brake: "",
    remarks_engage_band_brake: "",
    observations_disengage_band_brake: "",
    remarks_disengage_band_brake: "",
    observations_indicators_band_brake: "",
    remarks_indicators_band_brake: "",
    observations_torpedo_deck: "",
    remarks_torpedo_deck: "",
    observations_casing: "",
    remarks_casing: "",
    observations_indicators1: "",
    remarks_indicators1: "",
    observations_anchor_pulling: "",
    remarks_anchor_pulling: "",
    observations_paying_out: "",
    remarks_paying_out: "",
    observations_heaving_in: "",
    remarks_heaving_in: "",
    observations_drive_check: "",
    remarks_drive_check: "",
    observations_speed1_torpedo: "",
    remarks_speed1_torpedo: "",
    observations_speed2_casing: "",
    remarks_speed2_casing: "",
    observations_speed1_torpedo_free: "",
    remarks_speed1_torpedo_free: "",
    observations_speed2_casing_free: "",
    remarks_speed2_casing_free: "",
    observations_drive_free_movement: "",
    remarks_drive_free_movement: "",
    observations_drive_fore_end: "",
    remarks_drive_fore_end: "",
    observations_capstan_drums: "",
    remarks_capstan_drums: "",
    remarks_any_other_observ: "",
    observations_overall: "",
    authority_signature: null as File | null,
  });

  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const ships = [
    "SHIVALIK", "JAMUNA", "BANGARAM", "TARANGINI", "SARYU", "KUMBHIR", "T-83", "AIRAVAT",
    "KHANJAR", "SHUDERSHINI", "TRISHUL", "TEG", "RANVIJAY", "KIRPAN", "DELHI", "SURVEKSHAK",
    "JYOTI", "SUJATA", "KABRA", "CANKARSO", "T-84", "VIBHUTI", "NISHANK", "MAGAR", "BEAS",
    "SUVERNA", "SAHYADRI", "PRALAYA", "CHERIYAM", "SATPURA", "JALASHWA", "TARKASH", "KARMUK",
    "SUTLEJ", "SUMEDHA", "PRABAL", "CORA DIVH", "BATTIMALV", "CHENNAI", "SUMITRA", "T-82",
    "KUTHAR", "KONDUL", "SUBHDRA", "DARSHAK", "BITRA", "CHETLAT", "NIREEKSHAK", "KARUVA",
    "DEEPAK", "SHAKTI", "KOLKATA", "INVETIGATOR", "SHARDA", "MUMBAI", "GOMTI", "BETWA",
    "NASHAK", "KOSWARI", "CHEETAH", "TALWAR", "KESARI", "ADITYA", "BARATANG", "KORA",
    "KULISH", "RANA", "KALPENI", "VIPUL", "TABAR", "TRINKAND", "KOCHI", "SUKANYA",
    "SAVITRI", "GULDAR", "BRAHMAPUTRA", "GHARIAL", "RANVIR", "NIRUPAK", "VINASH", "KIRCH",
    "SANDHAYAK", "VIDYUT", "TIR", "GAJ", "CAR NICOBAR", "SUNAYNA", "MYSORE"
  ];

  const observationOptions = [
    { value: "SAT", label: "SAT" },
    { value: "UNSAT", label: "UNSAT" },
    { value: "SATWITHOBSERVATION", label: "SAT WITH OBSERVATION" },
  ];

  const greasingOptions = [
    { value: "SAT", label: "SAT" },
    { value: "PAINTED", label: "PAINTED" },
    { value: "CHOKED", label: "CHOKED" },
  ];

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateField = (field: string, value: string) => {
    if (field.includes("remarks") && value.length > 1000) {
      return "Remarks cannot exceed 1000 characters";
    }
    if (field === "year_manufacture") {
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (year > currentYear) {
        return "Please enter a year in the past";
      }
      if (year < 1900) {
        return "Please enter a year greater than or equal to 1900";
      }
    }
    return "";
  };

  const handleSpecialCharValidation = (field: string, value: string) => {
    if (field.includes("make") || field.includes("type")) {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special Characters Are Not Allowed");
        return value.replace(/[^a-zA-Z0-9\s]/g, '');
      }
    }
    if (field.includes("remarks")) {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special characters are not allowed.");
        return value.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 1000);
      }
    }
    return value;
  };

  const handleSaveDraft = () => {
    if (!formData.make || !formData.type || !formData.year_manufacture) {
      alert("Please fill in Make, Type, and Year of Manufacture before saving draft.");
      return;
    }
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    // Mock draft data
    setDrafts([
      { id: 1, make: "Sample Make", type: "Sample Type", created_date: "2024-01-15" },
      { id: 2, make: "Another Make", type: "Another Type", created_date: "2024-01-14" },
    ]);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      make: "",
      type: "",
      year_manufacture: "",
      observations_electrical_hygiene: "",
      remarks_electrical_hygiene: "",
      observations_status_switches: "",
      remarks_status_switches: "",
      observations_status_indicators: "",
      remarks_status_indicators: "",
      observations_gearbox_oil: "",
      remarks_gearbox_oil: "",
      observations_foundation_corrosion: "",
      remarks_foundation_corrosion: "",
      observations_brake_band: "",
      remarks_brake_band: "",
      observations_insulation_spm: "",
      remarks_insulation_spm: "",
      observations_greasing_mechanical: "",
      remarks_greasing_mechanical: "",
      observations_greasing_points: "",
      remarks_greasing_points: "",
      observations_engage: "",
      remarks_engage: "",
      observations_disengage: "",
      remarks_disengage: "",
      observations_indicators: "",
      remarks_indicators: "",
      observations_engage_band_brake: "",
      remarks_engage_band_brake: "",
      observations_disengage_band_brake: "",
      remarks_disengage_band_brake: "",
      observations_indicators_band_brake: "",
      remarks_indicators_band_brake: "",
      observations_torpedo_deck: "",
      remarks_torpedo_deck: "",
      observations_casing: "",
      remarks_casing: "",
      observations_indicators1: "",
      remarks_indicators1: "",
      observations_anchor_pulling: "",
      remarks_anchor_pulling: "",
      observations_paying_out: "",
      remarks_paying_out: "",
      observations_heaving_in: "",
      remarks_heaving_in: "",
      observations_drive_check: "",
      remarks_drive_check: "",
      observations_speed1_torpedo: "",
      remarks_speed1_torpedo: "",
      observations_speed2_casing: "",
      remarks_speed2_casing: "",
      observations_speed1_torpedo_free: "",
      remarks_speed1_torpedo_free: "",
      observations_speed2_casing_free: "",
      remarks_speed2_casing_free: "",
      observations_drive_free_movement: "",
      remarks_drive_free_movement: "",
      observations_drive_fore_end: "",
      remarks_drive_fore_end: "",
      observations_capstan_drums: "",
      remarks_capstan_drums: "",
      remarks_any_other_observ: "",
      observations_overall: "",
      authority_signature: null,
    });
    setDate(undefined);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (!formData.ship) newErrors.ship = "Please Select Ship";
    if (!date) newErrors.date_of_inspection = "Please Select Date of Inspection";
    if (!formData.make) newErrors.make = "Please Enter Make";
    if (!formData.type) newErrors.type = "Please Enter Type";
    if (!formData.year_manufacture) newErrors.year_manufacture = "Please Enter Year of Manufacture";

    // Observation and remarks validations
    const observationFields = [
      "observations_electrical_hygiene", "observations_status_switches", "observations_status_indicators",
      "observations_gearbox_oil", "observations_foundation_corrosion", "observations_brake_band",
      "observations_insulation_spm", "observations_greasing_mechanical", "observations_greasing_points",
      "observations_engage", "observations_disengage", "observations_indicators",
      "observations_engage_band_brake", "observations_disengage_band_brake", "observations_indicators_band_brake",
      "observations_torpedo_deck", "observations_casing", "observations_indicators1",
      "observations_anchor_pulling", "observations_paying_out", "observations_heaving_in",
      "observations_drive_check", "observations_speed1_torpedo", "observations_speed2_casing",
      "observations_speed1_torpedo_free", "observations_speed2_casing_free", "observations_drive_free_movement",
      "observations_drive_fore_end", "observations_capstan_drums", "observations_overall"
    ];

    observationFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `Please Select ${field.replace('observations_', '').replace(/_/g, ' ').toUpperCase()}`;
      }
    });

    const remarksFields = [
      "remarks_electrical_hygiene", "remarks_status_switches", "remarks_status_indicators",
      "remarks_gearbox_oil", "remarks_foundation_corrosion", "remarks_brake_band",
      "remarks_insulation_spm", "remarks_greasing_mechanical", "remarks_greasing_points",
      "remarks_engage", "remarks_disengage", "remarks_indicators",
      "remarks_engage_band_brake", "remarks_disengage_band_brake", "remarks_indicators_band_brake",
      "remarks_torpedo_deck", "remarks_casing", "remarks_indicators1",
      "remarks_anchor_pulling", "remarks_paying_out", "remarks_heaving_in",
      "remarks_drive_check", "remarks_speed1_torpedo", "remarks_speed2_casing",
      "remarks_speed1_torpedo_free", "remarks_speed2_casing_free", "remarks_drive_free_movement",
      "remarks_drive_fore_end", "remarks_capstan_drums", "remarks_any_other_observ"
    ];

    remarksFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `Please Enter ${field.replace('remarks_', '').replace(/_/g, ' ').toUpperCase()}`;
      }
    });

    // File validation
    if (!formData.authority_signature) {
      newErrors.authority_signature = "Please Upload Authority Signature";
    } else {
      const file = formData.authority_signature;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        newErrors.authority_signature = "Invalid file type. Please upload JPG, JPEG, or PNG files only.";
      }
      if (file.size > 2 * 1024 * 1024) {
        newErrors.authority_signature = "File size exceeds 2MB. Please upload a smaller file.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const renderObservationSection = (
    sectionTitle: string,
    subsectionTitle: string,
    observationField: string,
    remarksField: string,
    options = observationOptions
  ) => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">{subsectionTitle}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor={observationField} className="text-sm font-medium">
            Observations: <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData[observationField as keyof typeof formData] as string}
            onValueChange={(value) => handleInputChange(observationField, value)}
          >
            <SelectTrigger className={errors[observationField] ? "border-red-500" : ""}>
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">--Select--</SelectItem>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[observationField] && (
            <p className="text-red-500 text-xs mt-1">{errors[observationField]}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor={remarksField} className="text-sm font-medium">
            Remarks: <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id={remarksField}
            value={formData[remarksField as keyof typeof formData] as string}
            onChange={(e) => {
              const validatedValue = handleSpecialCharValidation(remarksField, e.target.value);
              handleInputChange(remarksField, validatedValue);
            }}
            className={errors[remarksField] ? "border-red-500" : ""}
            rows={2}
            maxLength={1000}
          />
          {errors[remarksField] && (
            <p className="text-red-500 text-xs mt-1">{errors[remarksField]}</p>
          )}
        </div>
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
              <h4 className="text-xl font-bold text-blue-600 mb-2">EKM CLASS</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ANCHOR CAPSTAN</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Ship Selection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <Label className="text-lg font-semibold">Ship</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Select
                      value={formData.ship}
                      onValueChange={(value) => handleInputChange("ship", value)}
                    >
                      <SelectTrigger className={errors.ship ? "border-red-500" : ""}>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">--Select--</SelectItem>
                        {ships.map((ship) => (
                          <SelectItem key={ship} value={ship}>
                            {ship}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ship && (
                      <p className="text-red-500 text-xs mt-1">{errors.ship}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Date of Inspection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <Label className="text-lg font-semibold">
                    Date of Inspection/Trials <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            errors.date_of_inspection && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd-MM-yyyy") : "DD-MM-YYYY"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date_of_inspection && (
                      <p className="text-red-500 text-xs mt-1">{errors.date_of_inspection}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Make */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  <Label className="text-lg font-semibold">
                    Make <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      value={formData.make}
                      onChange={(e) => {
                        const validatedValue = handleSpecialCharValidation("make", e.target.value);
                        handleInputChange("make", validatedValue);
                      }}
                      className={errors.make ? "border-red-500" : ""}
                      maxLength={20}
                    />
                    {errors.make && (
                      <p className="text-red-500 text-xs mt-1">{errors.make}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Type */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  <Label className="text-lg font-semibold">
                    Type <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      value={formData.type}
                      onChange={(e) => {
                        const validatedValue = handleSpecialCharValidation("type", e.target.value);
                        handleInputChange("type", validatedValue);
                      }}
                      className={errors.type ? "border-red-500" : ""}
                      maxLength={20}
                    />
                    {errors.type && (
                      <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 5: Year of Manufacture */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  <Label className="text-lg font-semibold">
                    Year of Manufacture <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      value={formData.year_manufacture}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        const error = validateField("year_manufacture", value);
                        if (error) {
                          setErrors(prev => ({ ...prev, year_manufacture: error }));
                        } else {
                          setErrors(prev => ({ ...prev, year_manufacture: "" }));
                        }
                        handleInputChange("year_manufacture", value);
                      }}
                      className={errors.year_manufacture ? "border-red-500" : ""}
                      maxLength={4}
                      placeholder="YYYY"
                    />
                    {errors.year_manufacture && (
                      <p className="text-red-500 text-xs mt-1">{errors.year_manufacture}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 6: Control Panel */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                  <Label className="text-lg font-semibold">Control Panel (Torpedo Deck)</Label>
                </div>
                
                {renderObservationSection(
                  "Control Panel",
                  "a) Electrical Hygiene",
                  "observations_electrical_hygiene",
                  "remarks_electrical_hygiene"
                )}
                
                {renderObservationSection(
                  "Control Panel",
                  "b) Status of Switches",
                  "observations_status_switches",
                  "remarks_status_switches"
                )}
                
                {renderObservationSection(
                  "Control Panel",
                  "c) Status of Indicators",
                  "observations_status_indicators",
                  "remarks_status_indicators"
                )}
              </div>

              {/* Section 7: Oil Level */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                  <Label className="text-lg font-semibold">Oil Level</Label>
                </div>
                
                {renderObservationSection(
                  "Oil Level",
                  "a) Gear Box",
                  "observations_gearbox_oil",
                  "remarks_gearbox_oil"
                )}
              </div>

              {/* Section 8: Conditions of Foundations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                  <Label className="text-lg font-semibold">Conditions of Foundations</Label>
                </div>
                
                {renderObservationSection(
                  "Conditions of Foundations",
                  "a) Corrosion/ Pitting/ Unpainted",
                  "observations_foundation_corrosion",
                  "remarks_foundation_corrosion"
                )}
              </div>

              {/* Section 9: Conditions of Brake Band */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                  <Label className="text-lg font-semibold">Conditions of Brake Band</Label>
                </div>
                
                {renderObservationSection(
                  "Conditions of Brake Band",
                  "a) Wear & Tear, Deep Scoring Marks",
                  "observations_brake_band",
                  "remarks_brake_band"
                )}
              </div>

              {/* Section 10: Insulation & SPM of Motor and Cable */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</span>
                  <Label className="text-lg font-semibold">Insulation & SPM of Motor and Cable</Label>
                </div>
                
                {renderObservationSection(
                  "Insulation & SPM",
                  "a) To be undertaken by ETMA",
                  "observations_insulation_spm",
                  "remarks_insulation_spm"
                )}
              </div>

              {/* Section 11: Greasing of Mechanical Parts */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                  <Label className="text-lg font-semibold">Greasing of Mechanical Parts</Label>
                </div>
                
                {renderObservationSection(
                  "Greasing of Mechanical Parts",
                  "a) Proper Greasing of Mechanical Parts",
                  "observations_greasing_mechanical",
                  "remarks_greasing_mechanical"
                )}
              </div>

              {/* Section 12: Greasing Points */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</span>
                  <Label className="text-lg font-semibold">Greasing Points</Label>
                </div>
                
                {renderObservationSection(
                  "Greasing Points",
                  "a) Condition of Greasing Nipple-Clean/ Painted/ Choked",
                  "observations_greasing_points",
                  "remarks_greasing_points",
                  greasingOptions
                )}
              </div>

              {/* Section 13: Operation of Clutch Coupling */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</span>
                  <Label className="text-lg font-semibold">Operation of Clutch Coupling</Label>
                </div>
                
                {renderObservationSection(
                  "Operation of Clutch Coupling",
                  "a) Engage",
                  "observations_engage",
                  "remarks_engage"
                )}
                
                {renderObservationSection(
                  "Operation of Clutch Coupling",
                  "b) Disengage",
                  "observations_disengage",
                  "remarks_disengage"
                )}
                
                {renderObservationSection(
                  "Operation of Clutch Coupling",
                  "c) Indicators",
                  "observations_indicators",
                  "remarks_indicators"
                )}
              </div>

              {/* Section 14: Operation of Band Brake */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">14</span>
                  <Label className="text-lg font-semibold">Operation of Band Brake</Label>
                </div>
                
                {renderObservationSection(
                  "Operation of Band Brake",
                  "a) Engage",
                  "observations_engage_band_brake",
                  "remarks_engage_band_brake"
                )}
                
                {renderObservationSection(
                  "Operation of Band Brake",
                  "b) Disengage",
                  "observations_disengage_band_brake",
                  "remarks_disengage_band_brake"
                )}
                
                {renderObservationSection(
                  "Operation of Band Brake",
                  "c) Indicators",
                  "observations_indicators_band_brake",
                  "remarks_indicators_band_brake"
                )}
              </div>

              {/* Section 15: Operation of Anchor Chain Screw Stopper */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">15</span>
                  <Label className="text-lg font-semibold">Operation of Anchor Chain Screw Stopper (Brake Band ON)</Label>
                </div>
                
                {renderObservationSection(
                  "Operation of Anchor Chain Screw Stopper",
                  "a) Torpedo Deck",
                  "observations_torpedo_deck",
                  "remarks_torpedo_deck"
                )}
                
                {renderObservationSection(
                  "Operation of Anchor Chain Screw Stopper",
                  "b) Casing",
                  "observations_casing",
                  "remarks_casing"
                )}
                
                {renderObservationSection(
                  "Operation of Anchor Chain Screw Stopper",
                  "c) Indicators (Indicator Readings on Match with Actual Position of Screw Stopper.)",
                  "observations_indicators1",
                  "remarks_indicators1"
                )}
              </div>

              {/* Section 16: Anchor Pulling */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">16</span>
                  <Label className="text-lg font-semibold">Anchor Pulling in Hawse and Chain Holding on Screw Stopper (when Band Brake OFF)</Label>
                </div>
                
                {renderObservationSection(
                  "Anchor Pulling",
                  "",
                  "observations_anchor_pulling",
                  "remarks_anchor_pulling"
                )}
              </div>

              {/* Section 17: Operational Trails */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">17</span>
                  <Label className="text-lg font-semibold">Operational Trails</Label>
                </div>
                
                {renderObservationSection(
                  "Operational Trails",
                  "a) (Paying Out) Speed 1 - Speed 6",
                  "observations_paying_out",
                  "remarks_paying_out"
                )}
                
                {renderObservationSection(
                  "Operational Trails",
                  "b) (Heaving in) Speed 1 - Speed 6",
                  "observations_heaving_in",
                  "remarks_heaving_in"
                )}
              </div>

              {/* Section 18: Drive */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">18</span>
                  <Label className="text-lg font-semibold">Drive</Label>
                </div>
                
                {renderObservationSection(
                  "Drive",
                  "a) Check for Abnormal Sounds/Excessive Noise During Operation",
                  "observations_drive_check",
                  "remarks_drive_check"
                )}
              </div>

              {/* Section 19: Check Zero Position of Counters */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">19</span>
                  <Label className="text-lg font-semibold">Check Zero Position of Counters of Anchor Chain Easing</Label>
                </div>
                
                {renderObservationSection(
                  "Check Zero Position of Counters",
                  "a) Torpedo Deck",
                  "observations_speed1_torpedo",
                  "remarks_speed1_torpedo"
                )}
                
                {renderObservationSection(
                  "Check Zero Position of Counters",
                  "b) Casing",
                  "observations_speed2_casing",
                  "remarks_speed2_casing"
                )}
              </div>

              {/* Section 20: Check for Free Indicators */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">20</span>
                  <Label className="text-lg font-semibold">Check for Free Indicators of Counter Anchor Chain Easing Out</Label>
                </div>
                
                {renderObservationSection(
                  "Check for Free Indicators",
                  "a) Torpedo Deck",
                  "observations_speed1_torpedo_free",
                  "remarks_speed1_torpedo_free"
                )}
                
                {renderObservationSection(
                  "Check for Free Indicators",
                  "b) Casing",
                  "observations_speed2_casing_free",
                  "remarks_speed2_casing_free"
                )}
              </div>

              {/* Section 21: Check for Free Movement */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">21</span>
                  <Label className="text-lg font-semibold">Check for Free Movement of Chain Upon Guide Rollers, Sprockets, and Screw Stopper</Label>
                </div>
                
                {renderObservationSection(
                  "Check for Free Movement",
                  "",
                  "observations_drive_free_movement",
                  "remarks_drive_free_movement"
                )}
              </div>

              {/* Section 22: Checking of Anchor Chain Bitter end */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">22</span>
                  <Label className="text-lg font-semibold">Checking of Anchor Chain Bitter end Paying out by Drive from Fore-End Under the Pressure of P = 2950kgf</Label>
                </div>
                
                {renderObservationSection(
                  "Checking of Anchor Chain Bitter end",
                  "a) (Operate from Fore-end)",
                  "observations_drive_fore_end",
                  "remarks_drive_fore_end"
                )}
              </div>

              {/* Section 23: Condition of Capstan Drum */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">23</span>
                  <Label className="text-lg font-semibold">Condition of Capstan Drum</Label>
                </div>
                
                {renderObservationSection(
                  "Condition of Capstan Drum",
                  "a) Rusted/ Corroded/ Pitted",
                  "observations_capstan_drums",
                  "remarks_capstan_drums"
                )}
              </div>

              {/* Section 24: Any Other Observation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">24</span>
                  <Label className="text-lg font-semibold">Any Other Observation</Label>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="remarks_any_other_observ" className="text-sm font-medium">
                        Remarks: <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="remarks_any_other_observ"
                        value={formData.remarks_any_other_observ}
                        onChange={(e) => {
                          const validatedValue = handleSpecialCharValidation("remarks_any_other_observ", e.target.value);
                          handleInputChange("remarks_any_other_observ", validatedValue);
                        }}
                        className={errors.remarks_any_other_observ ? "border-red-500" : ""}
                        rows={2}
                        maxLength={1000}
                      />
                      {errors.remarks_any_other_observ && (
                        <p className="text-red-500 text-xs mt-1">{errors.remarks_any_other_observ}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 25: Overall Remarks */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">25</span>
                  <Label className="text-lg font-semibold">Overall Remarks</Label>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="observations_overall" className="text-sm font-medium">
                        Observations: <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.observations_overall}
                        onValueChange={(value) => handleInputChange("observations_overall", value)}
                      >
                        <SelectTrigger className={errors.observations_overall ? "border-red-500" : ""}>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          {observationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.observations_overall && (
                        <p className="text-red-500 text-xs mt-1">{errors.observations_overall}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 26: Authority Signature */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">26</span>
                  <Label className="text-lg font-semibold">
                    Authority Signature <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleInputChange("authority_signature", file);
                      }}
                      className={errors.authority_signature ? "border-red-500" : ""}
                    />
                    {errors.authority_signature && (
                      <p className="text-red-500 text-xs mt-1">{errors.authority_signature}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, JPEG, PNG (Max 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
                  <TableHead>Make</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={draft.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{draft.make}</TableCell>
                    <TableCell>{draft.type}</TableCell>
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

export default EKMAnchorCapstanForm;
