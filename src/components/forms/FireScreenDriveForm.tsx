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

const FireScreenDriveForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    type: "",
    make: "",
    year_manufacture: "",
    main_top_no: "",
    refitting_authority_observations: "",
    refitting_authority_remarks: "",
    date_of_last_survey: "",
    structure_remarks: "",
    date_list_of_pending_observation: "",
    list_of_pending_remarks: "",
    conditions_of_deck_plate_observations: "",
    conditions_of_deck_plate_remarks: "",
    conditions_of_brake_brake_observations: "",
    conditions_of_brake_brake_remarks: "",
    availability_and_condition_observations: "",
    availability_and_condition_remarks: "",
    conditions_of_greasing_points_observations: "",
    conditions_of_greasing_points_remarks: "",
    ss_to_confirm_grease_observations: "",
    ss_to_confirm_grease_remarks: "",
    greasing_of_all_movable_parts_observations: "",
    greasing_of_all_movable_parts_remarks: "",
    oil_confirm_date: "",
    oil_confirm_remarks: "",
    oil_being_used_in_gear_box_observations: "",
    oil_being_used_in_gear_box_remarks: "",
    oil_level_in_gear_box_observations: "",
    oil_level_in_gear_box_remarks: "",
    insulation_checks_observations: "",
    insulation_checks_remarks: "",
    spm_checks_of_motor_observations: "",
    spm_checks_of_motor_remarks: "",
    conditions_of_cable_observations: "",
    conditions_of_cable_remarks: "",
    conditions_of_earthing_observations: "",
    conditions_of_earthing_remarks: "",
    tightness_of_electrical_observations: "",
    tightness_of_electrical_remarks: "",
    observations_jb: "",
    remarks_jb: "",
    observations_completed: "",
    remarks_completed: "",
    availability_of_report_observations: "",
    availability_of_report_remarks: "",
    trials_in_01_speed_observations: "",
    trials_in_01_speed_remarks: "",
    drive_in_gearbox_observations: "",
    drive_in_gearbox_remarks: "",
    oil_leackage_observations: "",
    oil_leackage_remarks: "",
    functioning_of_limit_observations: "",
    functioning_of_limit_remarks: "",
    functioning_of_emm_observations: "",
    functioning_of_emm_remarks: "",
    other_remarks: "",
    overall_remarks: "",
  });

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

  const handleYearValidation = (value: string) => {
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    
    if (value) {
      const enteredYear = parseInt(value);
      if (enteredYear > currentYear) {
        alert("Please enter a year in the past.");
        return "";
      } else if (enteredYear < minYear) {
        alert("Please enter a year greater than or equal to " + minYear + ".");
        return "";
      }
    }
    return value.replace(/[^0-9]/g, '');
  };

  const handleRemarksValidation = (value: string) => {
    const validatedValue = handleSpecialCharValidation(value);
    if (validatedValue.length > 1000) {
      alert("Remarks cannot exceed 1000 characters.");
      return validatedValue.substring(0, 1000);
    }
    return validatedValue;
  };

  const handleSaveDraft = () => {
    if (!formData.type || !formData.make || !formData.year_manufacture || !formData.main_top_no) {
      alert("Please fill in Type, Make & Model, Year of Manufacture, and Main Top No. before saving draft.");
      return;
    }
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    setDrafts([
      { id: 1, type: "Sample Type 1", created_date: "2024-01-15" },
      { id: 2, type: "Sample Type 2", created_date: "2024-01-14" },
    ]);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      type: "",
      make: "",
      year_manufacture: "",
      main_top_no: "",
      refitting_authority_observations: "",
      refitting_authority_remarks: "",
      date_of_last_survey: "",
      structure_remarks: "",
      date_list_of_pending_observation: "",
      list_of_pending_remarks: "",
      conditions_of_deck_plate_observations: "",
      conditions_of_deck_plate_remarks: "",
      conditions_of_brake_brake_observations: "",
      conditions_of_brake_brake_remarks: "",
      availability_and_condition_observations: "",
      availability_and_condition_remarks: "",
      conditions_of_greasing_points_observations: "",
      conditions_of_greasing_points_remarks: "",
      ss_to_confirm_grease_observations: "",
      ss_to_confirm_grease_remarks: "",
      greasing_of_all_movable_parts_observations: "",
      greasing_of_all_movable_parts_remarks: "",
      oil_confirm_date: "",
      oil_confirm_remarks: "",
      oil_being_used_in_gear_box_observations: "",
      oil_being_used_in_gear_box_remarks: "",
      oil_level_in_gear_box_observations: "",
      oil_level_in_gear_box_remarks: "",
      insulation_checks_observations: "",
      insulation_checks_remarks: "",
      spm_checks_of_motor_observations: "",
      spm_checks_of_motor_remarks: "",
      conditions_of_cable_observations: "",
      conditions_of_cable_remarks: "",
      conditions_of_earthing_observations: "",
      conditions_of_earthing_remarks: "",
      tightness_of_electrical_observations: "",
      tightness_of_electrical_remarks: "",
      observations_jb: "",
      remarks_jb: "",
      observations_completed: "",
      remarks_completed: "",
      availability_of_report_observations: "",
      availability_of_report_remarks: "",
      trials_in_01_speed_observations: "",
      trials_in_01_speed_remarks: "",
      drive_in_gearbox_observations: "",
      drive_in_gearbox_remarks: "",
      oil_leackage_observations: "",
      oil_leackage_remarks: "",
      functioning_of_limit_observations: "",
      functioning_of_limit_remarks: "",
      functioning_of_emm_observations: "",
      functioning_of_emm_remarks: "",
      other_remarks: "",
      overall_remarks: "",
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.ship || formData.ship === "0") {
      newErrors.ship = "Please Select Ship";
    }
    if (!formData.date_of_inspection) {
      newErrors.date_of_inspection = "Please Select Date of Inspection";
    }
    if (!formData.type) {
      newErrors.type = "Please Enter Type";
    }
    if (!formData.make) {
      newErrors.make = "Please Enter Make & Model";
    }
    if (!formData.year_manufacture) {
      newErrors.year_manufacture = "Please Enter Year of Manufacture";
    }
    if (!formData.main_top_no) {
      newErrors.main_top_no = "Please Enter Main Top No.";
    }

    // Additional validations for all required fields...
    if (!formData.refitting_authority_observations || formData.refitting_authority_observations === "0") {
      newErrors.refitting_authority_observations = "Please Select Maintenance routines observations";
    }
    if (!formData.refitting_authority_remarks) {
      newErrors.refitting_authority_remarks = "Please Enter Maintenance routines remarks";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const renderObservationSection = (
    title: string,
    observationField: string,
    remarksField: string,
    sectionNumber: number
  ) => (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
          {sectionNumber}
        </span>
        <h5 className="text-lg font-bold text-gray-900">{title}</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label className="text-sm font-medium">
            Observations <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData[observationField as keyof typeof formData]}
            onValueChange={(value) => handleInputChange(observationField, value)}
          >
            <SelectTrigger className={errors[observationField] ? "border-red-500" : ""}>
              <SelectValue placeholder="--Select--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">--Select--</SelectItem>
              <SelectItem value="SAT">SAT</SelectItem>
              <SelectItem value="UNSAT">UNSAT</SelectItem>
              <SelectItem value="SATWITHOBSERVATION">SAT WITH OBSERVATION</SelectItem>
            </SelectContent>
          </Select>
          {errors[observationField] && (
            <p className="text-red-500 text-xs mt-1">{errors[observationField]}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label className="text-sm font-medium">
            Remarks <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={formData[remarksField as keyof typeof formData]}
            onChange={(e) => {
              const validatedValue = handleRemarksValidation(e.target.value);
              handleInputChange(remarksField, validatedValue);
            }}
            className={errors[remarksField] ? "border-red-500" : ""}
            rows={2}
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
              <h2 className="text-2xl font-bold text-blue-600 underline">FIRE SCREEN DRIVE</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Ship */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Ship</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        {shipOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Date of Inspection/Trials</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      type="date"
                      value={formData.date_of_inspection}
                      onChange={(e) => handleInputChange("date_of_inspection", e.target.value)}
                      className={errors.date_of_inspection ? "border-red-500" : ""}
                    />
                    {errors.date_of_inspection && (
                      <p className="text-red-500 text-xs mt-1">{errors.date_of_inspection}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Type */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Type</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      value={formData.type}
                      onChange={(e) => {
                        const validatedValue = handleSpecialCharValidation(e.target.value);
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

              {/* Section 4: Make & Model */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Make & Model</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      value={formData.make}
                      onChange={(e) => {
                        const validatedValue = handleSpecialCharValidation(e.target.value);
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

              {/* Section 5: Year of Manufacture */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Year of Manufacture</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      value={formData.year_manufacture}
                      onChange={(e) => {
                        const validatedValue = handleYearValidation(e.target.value);
                        handleInputChange("year_manufacture", validatedValue);
                      }}
                      className={errors.year_manufacture ? "border-red-500" : ""}
                      maxLength={4}
                    />
                    {errors.year_manufacture && (
                      <p className="text-red-500 text-xs mt-1">{errors.year_manufacture}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 6: Main Top No. */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Main Top No.</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      value={formData.main_top_no}
                      onChange={(e) => {
                        const validatedValue = handleSpecialCharValidation(e.target.value);
                        handleInputChange("main_top_no", validatedValue);
                      }}
                      className={errors.main_top_no ? "border-red-500" : ""}
                      maxLength={50}
                    />
                    {errors.main_top_no && (
                      <p className="text-red-500 text-xs mt-1">{errors.main_top_no}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 7: Maintenance Routines */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Maintenance Routines i.a.w Maintop & OEM Manual</h5>
                </div>
                <p className="text-sm text-gray-600 mb-4">Completion to be Confirm by SS and Refitting Authority</p>
                {renderObservationSection(
                  "Observations",
                  "refitting_authority_observations",
                  "refitting_authority_remarks",
                  7
                )}
              </div>

              {/* Section 8: Structure */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Structure</h5>
                </div>
                
                {/* 8a: Date of Last Structural Survey */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) Date of Last Structural Survey of Surrounding Structure and Equipment Foundations
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium">
                        Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        value={formData.date_of_last_survey}
                        onChange={(e) => handleInputChange("date_of_last_survey", e.target.value)}
                        className={errors.date_of_last_survey ? "border-red-500" : ""}
                      />
                      {errors.date_of_last_survey && (
                        <p className="text-red-500 text-xs mt-1">{errors.date_of_last_survey}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">
                        Remarks <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={formData.structure_remarks}
                        onChange={(e) => {
                          const validatedValue = handleRemarksValidation(e.target.value);
                          handleInputChange("structure_remarks", validatedValue);
                        }}
                        className={errors.structure_remarks ? "border-red-500" : ""}
                        rows={2}
                      />
                      {errors.structure_remarks && (
                        <p className="text-red-500 text-xs mt-1">{errors.structure_remarks}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 8b: List of Pending Observations */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) List of Pending Observations for Liquidation (if any)
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium">
                        Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        value={formData.date_list_of_pending_observation}
                        onChange={(e) => handleInputChange("date_list_of_pending_observation", e.target.value)}
                        className={errors.date_list_of_pending_observation ? "border-red-500" : ""}
                      />
                      {errors.date_list_of_pending_observation && (
                        <p className="text-red-500 text-xs mt-1">{errors.date_list_of_pending_observation}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">
                        Remarks <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={formData.list_of_pending_remarks}
                        onChange={(e) => {
                          const validatedValue = handleRemarksValidation(e.target.value);
                          handleInputChange("list_of_pending_remarks", validatedValue);
                        }}
                        className={errors.list_of_pending_remarks ? "border-red-500" : ""}
                        rows={2}
                      />
                      {errors.list_of_pending_remarks && (
                        <p className="text-red-500 text-xs mt-1">{errors.list_of_pending_remarks}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 9: Visual Inspection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    9
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Visual Inspection</h5>
                </div>
                
                {/* 9a: Conditions of Deck Plate */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) Conditions of Deck Plate Surrounding Structure and Fire Curtain
                  </h6>
                  {renderObservationSection(
                    "",
                    "conditions_of_deck_plate_observations",
                    "conditions_of_deck_plate_remarks",
                    9
                  )}
                </div>

                {/* 9b: Conditions of Brake */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) Conditions of Brake / Brake Band (wear & tear, deep scoring marks, etc)
                  </h6>
                  {renderObservationSection(
                    "",
                    "conditions_of_brake_brake_observations",
                    "conditions_of_brake_brake_remarks",
                    9
                  )}
                </div>

                {/* 9c: Availability and Conditions of Limit Switch */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    c) Availability and Conditions of Limit Switch
                  </h6>
                  {renderObservationSection(
                    "",
                    "availability_and_condition_observations",
                    "availability_and_condition_remarks",
                    9
                  )}
                </div>
              </div>

              {/* Section 10: Greasing */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    10
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Greasing</h5>
                </div>
                
                {/* 10a: Conditions of Greasing Points */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) Conditions of Greasing Points
                  </h6>
                  {renderObservationSection(
                    "",
                    "conditions_of_greasing_points_observations",
                    "conditions_of_greasing_points_remarks",
                    10
                  )}
                </div>

                {/* 10b: SS to Confirm Grease */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) SS to Confirm Grease Used i.a.w.OEM Manual
                  </h6>
                  {renderObservationSection(
                    "",
                    "ss_to_confirm_grease_observations",
                    "ss_to_confirm_grease_remarks",
                    10
                  )}
                </div>

                {/* 10c: Greasing of All Movable Parts */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    c) Greasing of All Movable Parts
                  </h6>
                  {renderObservationSection(
                    "",
                    "greasing_of_all_movable_parts_observations",
                    "greasing_of_all_movable_parts_remarks",
                    10
                  )}
                </div>
              </div>

              {/* Section 11: Oil */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    11
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Oil</h5>
                </div>
                
                {/* 11a: SS to Confirm Last date of oil change */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) SS to Confirm Last date of oil change (annual)
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium">
                        Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        value={formData.oil_confirm_date}
                        onChange={(e) => handleInputChange("oil_confirm_date", e.target.value)}
                        className={errors.oil_confirm_date ? "border-red-500" : ""}
                      />
                      {errors.oil_confirm_date && (
                        <p className="text-red-500 text-xs mt-1">{errors.oil_confirm_date}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">
                        Remarks <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={formData.oil_confirm_remarks}
                        onChange={(e) => {
                          const validatedValue = handleRemarksValidation(e.target.value);
                          handleInputChange("oil_confirm_remarks", validatedValue);
                        }}
                        className={errors.oil_confirm_remarks ? "border-red-500" : ""}
                        rows={2}
                      />
                      {errors.oil_confirm_remarks && (
                        <p className="text-red-500 text-xs mt-1">{errors.oil_confirm_remarks}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 11b: Oil Being Used in Gear Box */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) Oil Being Used in Gear Box 80W 19 (Reduction gear box)
                  </h6>
                  {renderObservationSection(
                    "",
                    "oil_being_used_in_gear_box_observations",
                    "oil_being_used_in_gear_box_remarks",
                    11
                  )}
                </div>

                {/* 11c: Oil Level in Gear Box */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    c) Oil Level in Gear Box
                  </h6>
                  {renderObservationSection(
                    "",
                    "oil_level_in_gear_box_observations",
                    "oil_level_in_gear_box_remarks",
                    11
                  )}
                </div>
              </div>

              {/* Section 12: Electrical Checks */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    12
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Electrical Checks</h5>
                </div>
                
                {/* 12a: Check by ETMA/SS */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) Check by ETMA/SS
                  </h6>
                  
                  {/* 12ai: Insulation Checks */}
                  <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">
                      i) Insulation Checks
                    </h6>
                    {renderObservationSection(
                      "",
                      "insulation_checks_observations",
                      "insulation_checks_remarks",
                      12
                    )}
                  </div>

                  {/* 12aii: SPM Checks of Motor */}
                  <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">
                      ii) SPM Checks of Motor
                    </h6>
                    {renderObservationSection(
                      "",
                      "spm_checks_of_motor_observations",
                      "spm_checks_of_motor_remarks",
                      12
                    )}
                  </div>

                  {/* 12aiii: Conditions of Cable Connections */}
                  <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">
                      iii) Conditions of Cable Connections
                    </h6>
                    {renderObservationSection(
                      "",
                      "conditions_of_cable_observations",
                      "conditions_of_cable_remarks",
                      12
                    )}
                  </div>

                  {/* 12aiv: Conditions of Earthing Connections */}
                  <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-700 mb-3">
                      iv) Conditions of Earthing Connections
                    </h6>
                    {renderObservationSection(
                      "",
                      "conditions_of_earthing_observations",
                      "conditions_of_earthing_remarks",
                      12
                    )}
                  </div>
                </div>

                {/* 12b: Tightness of Electrical Cable Fasteners */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) Tightness of Electrical Cable Fasteners
                  </h6>
                  {renderObservationSection(
                    "",
                    "tightness_of_electrical_observations",
                    "tightness_of_electrical_remarks",
                    12
                  )}
                </div>

                {/* 12c: Condition of JB / Control Panel */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    c) Condition of JB / Control Panel
                  </h6>
                  {renderObservationSection(
                    "",
                    "observations_jb",
                    "remarks_jb",
                    12
                  )}
                </div>
              </div>

              {/* Section 13: Electric Checks by ETMA */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    13
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Electric Checks by ETMA</h5>
                </div>
                
                {/* 13a: Completed */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) Completed
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium">
                        Observations <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.observations_completed}
                        onValueChange={(value) => handleInputChange("observations_completed", value)}
                      >
                        <SelectTrigger className={errors.observations_completed ? "border-red-500" : ""}>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.observations_completed && (
                        <p className="text-red-500 text-xs mt-1">{errors.observations_completed}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">
                        Remarks <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={formData.remarks_completed}
                        onChange={(e) => {
                          const validatedValue = handleRemarksValidation(e.target.value);
                          handleInputChange("remarks_completed", validatedValue);
                        }}
                        className={errors.remarks_completed ? "border-red-500" : ""}
                        rows={2}
                      />
                      {errors.remarks_completed && (
                        <p className="text-red-500 text-xs mt-1">{errors.remarks_completed}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 13b: Availability of Report */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) Availability of Report
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium">
                        Observations <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.availability_of_report_observations}
                        onValueChange={(value) => handleInputChange("availability_of_report_observations", value)}
                      >
                        <SelectTrigger className={errors.availability_of_report_observations ? "border-red-500" : ""}>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">--Select--</SelectItem>
                          <SelectItem value="YES">YES</SelectItem>
                          <SelectItem value="NO">NO</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.availability_of_report_observations && (
                        <p className="text-red-500 text-xs mt-1">{errors.availability_of_report_observations}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">
                        Remarks <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={formData.availability_of_report_remarks}
                        onChange={(e) => {
                          const validatedValue = handleRemarksValidation(e.target.value);
                          handleInputChange("availability_of_report_remarks", validatedValue);
                        }}
                        className={errors.availability_of_report_remarks ? "border-red-500" : ""}
                        rows={2}
                      />
                      {errors.availability_of_report_remarks && (
                        <p className="text-red-500 text-xs mt-1">{errors.availability_of_report_remarks}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 14: Operational Trials */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    14
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Operational Trials</h5>
                </div>
                
                {/* 14a: Trials in 01 speed */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    a) Trials in 01 speed
                  </h6>
                  {renderObservationSection(
                    "",
                    "trials_in_01_speed_observations",
                    "trials_in_01_speed_remarks",
                    14
                  )}
                </div>

                {/* 14b: Drive / Gear Box Noise and Vibrations */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    b) Drive / Gear Box Noise and Vibrations
                  </h6>
                  {renderObservationSection(
                    "",
                    "drive_in_gearbox_observations",
                    "drive_in_gearbox_remarks",
                    14
                  )}
                </div>

                {/* 14c: Oil Leakage From Gear Box */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    c) Oil Leakage From Gear Box
                  </h6>
                  {renderObservationSection(
                    "",
                    "oil_leackage_observations",
                    "oil_leackage_remarks",
                    14
                  )}
                </div>

                {/* 14d: Functioning of Limit Switches */}
                <div className="mb-6">
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    d) Functioning of Limit Switches
                  </h6>
                  {renderObservationSection(
                    "",
                    "functioning_of_limit_observations",
                    "functioning_of_limit_remarks",
                    14
                  )}
                </div>

                {/* 14e: Functioning of EMM Brake Mechanism */}
                <div>
                  <h6 className="text-md font-semibold text-gray-800 mb-4">
                    e) Functioning of EMM Brake Mechanism
                  </h6>
                  {renderObservationSection(
                    "",
                    "functioning_of_emm_observations",
                    "functioning_of_emm_remarks",
                    14
                  )}
                </div>
              </div>

              {/* Section 15: Other Observation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    15
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Other Observation</h5>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label className="text-sm font-medium">
                      Remarks <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={formData.other_remarks}
                      onChange={(e) => {
                        const validatedValue = handleRemarksValidation(e.target.value);
                        handleInputChange("other_remarks", validatedValue);
                      }}
                      className={errors.other_remarks ? "border-red-500" : ""}
                      rows={2}
                    />
                    {errors.other_remarks && (
                      <p className="text-red-500 text-xs mt-1">{errors.other_remarks}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 16: Overall Remarks */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    16
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Overall Remarks</h5>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label className="text-sm font-medium">
                      Remarks <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={formData.overall_remarks}
                      onChange={(e) => {
                        const validatedValue = handleRemarksValidation(e.target.value);
                        handleInputChange("overall_remarks", validatedValue);
                      }}
                      className={errors.overall_remarks ? "border-red-500" : ""}
                      rows={2}
                    />
                    {errors.overall_remarks && (
                      <p className="text-red-500 text-xs mt-1">{errors.overall_remarks}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 17: Authority Signature */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    17
                  </span>
                  <h5 className="text-lg font-bold text-gray-900">Authority Signature</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="mb-2"
                    />
                    <Label className="text-sm font-medium">Signature File</Label>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={draft.id}>
                    <TableCell>{index + 1}</TableCell>
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

export default FireScreenDriveForm;
