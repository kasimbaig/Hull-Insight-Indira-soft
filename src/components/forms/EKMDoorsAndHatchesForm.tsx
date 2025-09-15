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

const EKMDoorsAndHatchesForm = () => {
  const [formData, setFormData] = useState({
    observations_upper_lid: "",
    remarks_upper_lid: "",
    observations_chalk_upper: "",
    remarks_chalk_upper: "",
    observations_lower_lid: "",
    remarks_lower_lid: "",
    observations_chalk_lower: "",
    remarks_chalk_lower: "",
    observations_upper_lid_sealing: "",
    remarks_upper_lid_sealing: "",
    observations_upper_lid_chalk: "",
    remarks_upper_lid_chalk: "",
    observations_lower_lid_sealing: "",
    remarks_lower_lid_sealing: "",
    observations_lower_lid_chalk: "",
    remarks_lower_lid_chalk: "",
    observations_upper_lid_sealing_1: "",
    remarks_upper_lid_sealing_1: "",
    observations_upper_lid_chalk_1: "",
    remarks_upper_lid_chalk_1: "",
    observations_lower_lid_sealing_2: "",
    remarks_lower_lid_sealing_2: "",
    observations_lower_lid_chalk_2: "",
    remarks_lower_lid_chalk_2: "",
    observations_fore_end_sealing_1: "",
    remarks_fore_end_sealing_1: "",
    observations_fore_end_chalk_1: "",
    remarks_fore_end_chalk_1: "",
    observations_torpedo_sealing_1: "",
    remarks_torpedo_sealing_1: "",
    observations_torpedo_chalk_1: "",
    remarks_torpedo_chalk_1: "",
    observations_cmpt_sealing_1: "",
    remarks_cmpt_sealing_1: "",
    observations_cmpt_chalk_1: "",
    remarks_cmpt_chalk_1: "",
    observations_cmpt_sealing_2: "",
    remarks_cmpt_sealing_2: "",
    observations_cmpt_chalk_2: "",
    remarks_cmpt_chalk_2: "",
    observations_cmpt_sealing_3: "",
    remarks_cmpt_sealing_3: "",
    observations_cmpt_chalk_3: "",
    remarks_cmpt_chalk_3: "",
    observations_cmpt_sealing_4: "",
    remarks_cmpt_sealing_4: "",
    observations_cmpt_chalk_4: "",
    remarks_cmpt_chalk_4: "",
    observations_cmpt_sealing_5: "",
    remarks_cmpt_sealing_5: "",
    observations_cmpt_chalk_5: "",
    remarks_cmpt_chalk_5: "",
    remarks_any_other_observ: "",
    observations_overall: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState("");

  const observationOptions = [
    { value: "SAT", label: "SAT" },
    { value: "UNSAT", label: "UNSAT" },
    { value: "SATWITHOBSERVATION", label: "SAT WITH OBSERVATION" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSpecialCharValidation = (field: string, value: string) => {
    if (field.includes("remarks")) {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special characters are not allowed.");
        return value.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 1000);
      }
    }
    return value;
  };

  const handleSaveDraft = () => {
    if (!formData.observations_upper_lid || !formData.remarks_upper_lid) {
      alert("Please fill in FWD Escape Hatch Upper Lid Conditions of Rubber Sealing before saving draft.");
      return;
    }
    console.log("Saving draft:", formData);
    alert("Draft saved successfully!");
  };

  const handleFetchDrafts = () => {
    setIsDraftModalOpen(true);
    // Mock draft data
    setDrafts([
      { id: 1, observation: "SAT", created_date: "2024-01-15" },
      { id: 2, observation: "UNSAT", created_date: "2024-01-14" },
    ]);
  };

  const handleClear = () => {
    setFormData({
      observations_upper_lid: "",
      remarks_upper_lid: "",
      observations_chalk_upper: "",
      remarks_chalk_upper: "",
      observations_lower_lid: "",
      remarks_lower_lid: "",
      observations_chalk_lower: "",
      remarks_chalk_lower: "",
      observations_upper_lid_sealing: "",
      remarks_upper_lid_sealing: "",
      observations_upper_lid_chalk: "",
      remarks_upper_lid_chalk: "",
      observations_lower_lid_sealing: "",
      remarks_lower_lid_sealing: "",
      observations_lower_lid_chalk: "",
      remarks_lower_lid_chalk: "",
      observations_upper_lid_sealing_1: "",
      remarks_upper_lid_sealing_1: "",
      observations_upper_lid_chalk_1: "",
      remarks_upper_lid_chalk_1: "",
      observations_lower_lid_sealing_2: "",
      remarks_lower_lid_sealing_2: "",
      observations_lower_lid_chalk_2: "",
      remarks_lower_lid_chalk_2: "",
      observations_fore_end_sealing_1: "",
      remarks_fore_end_sealing_1: "",
      observations_fore_end_chalk_1: "",
      remarks_fore_end_chalk_1: "",
      observations_torpedo_sealing_1: "",
      remarks_torpedo_sealing_1: "",
      observations_torpedo_chalk_1: "",
      remarks_torpedo_chalk_1: "",
      observations_cmpt_sealing_1: "",
      remarks_cmpt_sealing_1: "",
      observations_cmpt_chalk_1: "",
      remarks_cmpt_chalk_1: "",
      observations_cmpt_sealing_2: "",
      remarks_cmpt_sealing_2: "",
      observations_cmpt_chalk_2: "",
      remarks_cmpt_chalk_2: "",
      observations_cmpt_sealing_3: "",
      remarks_cmpt_sealing_3: "",
      observations_cmpt_chalk_3: "",
      remarks_cmpt_chalk_3: "",
      observations_cmpt_sealing_4: "",
      remarks_cmpt_sealing_4: "",
      observations_cmpt_chalk_4: "",
      remarks_cmpt_chalk_4: "",
      observations_cmpt_sealing_5: "",
      remarks_cmpt_sealing_5: "",
      observations_cmpt_chalk_5: "",
      remarks_cmpt_chalk_5: "",
      remarks_any_other_observ: "",
      observations_overall: "",
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Required field validations
    const requiredFields = [
      "observations_upper_lid", "remarks_upper_lid", "observations_chalk_upper", "remarks_chalk_upper",
      "observations_lower_lid", "remarks_lower_lid", "observations_chalk_lower", "remarks_chalk_lower",
      "observations_upper_lid_sealing", "remarks_upper_lid_sealing", "observations_upper_lid_chalk", "remarks_upper_lid_chalk",
      "observations_lower_lid_sealing", "remarks_lower_lid_sealing", "observations_lower_lid_chalk", "remarks_lower_lid_chalk",
      "observations_upper_lid_sealing_1", "remarks_upper_lid_sealing_1", "observations_upper_lid_chalk_1", "remarks_upper_lid_chalk_1",
      "observations_lower_lid_sealing_2", "remarks_lower_lid_sealing_2", "observations_lower_lid_chalk_2", "remarks_lower_lid_chalk_2",
      "observations_fore_end_sealing_1", "remarks_fore_end_sealing_1", "observations_fore_end_chalk_1", "remarks_fore_end_chalk_1",
      "observations_torpedo_sealing_1", "remarks_torpedo_sealing_1", "observations_torpedo_chalk_1", "remarks_torpedo_chalk_1",
      "observations_cmpt_sealing_1", "remarks_cmpt_sealing_1", "observations_cmpt_chalk_1", "remarks_cmpt_chalk_1",
      "observations_cmpt_sealing_2", "remarks_cmpt_sealing_2", "observations_cmpt_chalk_2", "remarks_cmpt_chalk_2",
      "observations_cmpt_sealing_3", "remarks_cmpt_sealing_3", "observations_cmpt_chalk_3", "remarks_cmpt_chalk_3",
      "observations_cmpt_sealing_4", "remarks_cmpt_sealing_4", "observations_cmpt_chalk_4", "remarks_cmpt_chalk_4",
      "observations_cmpt_sealing_5", "remarks_cmpt_sealing_5", "observations_cmpt_chalk_5", "remarks_cmpt_chalk_5",
      "remarks_any_other_observ", "observations_overall"
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        const fieldName = field.replace('observations_', '').replace('remarks_', '').replace(/_/g, ' ').toUpperCase();
        newErrors[field] = `Please ${field.includes('observations') ? 'Select' : 'Enter'} ${fieldName}`;
      }
    });

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
    remarksField: string
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
              {observationOptions.map((option) => (
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">DOORS AND HATCHES</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: FWD Escape Hatch */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <Label className="text-lg font-semibold">FWD Escape Hatch</Label>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-md font-medium mb-3 block">Upper Lid</Label>
                    {renderObservationSection(
                      "FWD Escape Hatch",
                      "a) Conditions of Rubber Sealing",
                      "observations_upper_lid",
                      "remarks_upper_lid"
                    )}
                    {renderObservationSection(
                      "FWD Escape Hatch",
                      "b) Chalk Impression Test",
                      "observations_chalk_upper",
                      "remarks_chalk_upper"
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-md font-medium mb-3 block">Lower Lid</Label>
                    {renderObservationSection(
                      "FWD Escape Hatch",
                      "a) Conditions of Rubber Sealing",
                      "observations_lower_lid",
                      "remarks_lower_lid"
                    )}
                    {renderObservationSection(
                      "FWD Escape Hatch",
                      "b) Chalk Impression Test",
                      "observations_chalk_lower",
                      "remarks_chalk_lower"
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Coning Tower */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <Label className="text-lg font-semibold">Coning Tower</Label>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-md font-medium mb-3 block">Upper Lid</Label>
                    {renderObservationSection(
                      "Coning Tower",
                      "a) Conditions of Rubber Sealing",
                      "observations_upper_lid_sealing",
                      "remarks_upper_lid_sealing"
                    )}
                    {renderObservationSection(
                      "Coning Tower",
                      "b) Chalk Impression Test",
                      "observations_upper_lid_chalk",
                      "remarks_upper_lid_chalk"
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-md font-medium mb-3 block">Lower Lid</Label>
                    {renderObservationSection(
                      "Coning Tower",
                      "a) Conditions of Rubber Sealing",
                      "observations_lower_lid_sealing",
                      "remarks_lower_lid_sealing"
                    )}
                    {renderObservationSection(
                      "Coning Tower",
                      "b) Chalk Impression Test",
                      "observations_lower_lid_chalk",
                      "remarks_lower_lid_chalk"
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Aft Escape Hatch */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                  <Label className="text-lg font-semibold">Aft Escape Hatch</Label>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-md font-medium mb-3 block">Upper Lid</Label>
                    {renderObservationSection(
                      "Aft Escape Hatch",
                      "a) Conditions of Rubber Sealing",
                      "observations_upper_lid_sealing_1",
                      "remarks_upper_lid_sealing_1"
                    )}
                    {renderObservationSection(
                      "Aft Escape Hatch",
                      "b) Chalk Impression Test",
                      "observations_upper_lid_chalk_1",
                      "remarks_upper_lid_chalk_1"
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-md font-medium mb-3 block">Lower Lid</Label>
                    {renderObservationSection(
                      "Aft Escape Hatch",
                      "a) Conditions of Rubber Sealing",
                      "observations_lower_lid_sealing_2",
                      "remarks_lower_lid_sealing_2"
                    )}
                    {renderObservationSection(
                      "Aft Escape Hatch",
                      "b) Chalk Impression Test",
                      "observations_lower_lid_chalk_2",
                      "remarks_lower_lid_chalk_2"
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Fore-End Cofferdam */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                  <Label className="text-lg font-semibold">Fore-End Cofferdam</Label>
                </div>
                
                {renderObservationSection(
                  "Fore-End Cofferdam",
                  "a) Conditions of Rubber Sealing",
                  "observations_fore_end_sealing_1",
                  "remarks_fore_end_sealing_1"
                )}
                {renderObservationSection(
                  "Fore-End Cofferdam",
                  "b) Chalk Impression Test",
                  "observations_fore_end_chalk_1",
                  "remarks_fore_end_chalk_1"
                )}
              </div>

              {/* Section 5: Torpedo DK-II DK */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                  <Label className="text-lg font-semibold">Torpedo DK-II DK</Label>
                </div>
                
                {renderObservationSection(
                  "Torpedo DK-II DK",
                  "a) Conditions of Rubber Sealing",
                  "observations_torpedo_sealing_1",
                  "remarks_torpedo_sealing_1"
                )}
                {renderObservationSection(
                  "Torpedo DK-II DK",
                  "b) Chalk Impression Test",
                  "observations_torpedo_chalk_1",
                  "remarks_torpedo_chalk_1"
                )}
              </div>

              {/* Section 6: CMPT 1-2 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                  <Label className="text-lg font-semibold">CMPT 1-2</Label>
                </div>
                
                {renderObservationSection(
                  "CMPT 1-2",
                  "a) Conditions of Rubber Sealing",
                  "observations_cmpt_sealing_1",
                  "remarks_cmpt_sealing_1"
                )}
                {renderObservationSection(
                  "CMPT 1-2",
                  "b) Chalk Impression Test",
                  "observations_cmpt_chalk_1",
                  "remarks_cmpt_chalk_1"
                )}
              </div>

              {/* Section 7: CMPT 2-3 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                  <Label className="text-lg font-semibold">CMPT 2-3</Label>
                </div>
                
                {renderObservationSection(
                  "CMPT 2-3",
                  "a) Conditions of Rubber Sealing",
                  "observations_cmpt_sealing_2",
                  "remarks_cmpt_sealing_2"
                )}
                {renderObservationSection(
                  "CMPT 2-3",
                  "b) Chalk Impression Test",
                  "observations_cmpt_chalk_2",
                  "remarks_cmpt_chalk_2"
                )}
              </div>

              {/* Section 8: CMPT 3-4 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                  <Label className="text-lg font-semibold">CMPT 3-4</Label>
                </div>
                
                {renderObservationSection(
                  "CMPT 3-4",
                  "a) Conditions of Rubber Sealing",
                  "observations_cmpt_sealing_3",
                  "remarks_cmpt_sealing_3"
                )}
                {renderObservationSection(
                  "CMPT 3-4",
                  "b) Chalk Impression Test",
                  "observations_cmpt_chalk_3",
                  "remarks_cmpt_chalk_3"
                )}
              </div>

              {/* Section 9: CMPT 4-5 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                  <Label className="text-lg font-semibold">CMPT 4-5</Label>
                </div>
                
                {renderObservationSection(
                  "CMPT 4-5",
                  "a) Conditions of Rubber Sealing",
                  "observations_cmpt_sealing_4",
                  "remarks_cmpt_sealing_4"
                )}
                {renderObservationSection(
                  "CMPT 4-5",
                  "b) Chalk Impression Test",
                  "observations_cmpt_chalk_4",
                  "remarks_cmpt_chalk_4"
                )}
              </div>

              {/* Section 10: CMPT 5 - Aft End */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</span>
                  <Label className="text-lg font-semibold">CMPT 5 - Aft End</Label>
                </div>
                
                {renderObservationSection(
                  "CMPT 5 - Aft End",
                  "a) Conditions of Rubber Sealing",
                  "observations_cmpt_sealing_5",
                  "remarks_cmpt_sealing_5"
                )}
                {renderObservationSection(
                  "CMPT 5 - Aft End",
                  "b) Chalk Impression Test",
                  "observations_cmpt_chalk_5",
                  "remarks_cmpt_chalk_5"
                )}
              </div>

              {/* Section 11: Any Other Observation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                  <Label className="text-lg font-semibold">Any Other Observation</Label>
                </div>
                
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

              {/* Section 12: Overall Remarks */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</span>
                  <Label className="text-lg font-semibold">Overall Remarks</Label>
                </div>
                
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
                  <TableHead>Observation</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={draft.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{draft.observation}</TableCell>
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

export default EKMDoorsAndHatchesForm;
