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

const EKMEmergencyTowingArrangementsForm = () => {
  const [formData, setFormData] = useState({
    observations_size_mm: "",
    remarks_size_mm: "",
    observations_length_meter: "",
    remarks_length_meter: "",
    observations_breaking_load: "",
    remarks_breaking_load: "",
    observations_mass_kg: "",
    remarks_mass_kg: "",
    observations_diameter_mm: "",
    remarks_diameter_mm: "",
    observations_length_meter_steel: "",
    remarks_length_meter_steel: "",
    observations_breaking_load_steel: "",
    remarks_breaking_load_steel: "",
    observations_mass_kg_steel: "",
    remarks_mass_kg_steel: "",
    observations_throwing_hook_manual: "",
    remarks_throwing_hook_manual: "",
    observations_throwing_hook_pneumatic: "",
    remarks_throwing_hook_pneumatic: "",
    observations_mooring_bollards: "",
    remarks_mooring_bollards: "",
    observations_fairleads: "",
    remarks_fairleads: "",
    observations_warping_heads: "",
    remarks_warping_heads: "",
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
    if (!formData.observations_size_mm || !formData.remarks_size_mm) {
      alert("Please fill in Towing Chain Size in mm 40 before saving draft.");
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
      observations_size_mm: "",
      remarks_size_mm: "",
      observations_length_meter: "",
      remarks_length_meter: "",
      observations_breaking_load: "",
      remarks_breaking_load: "",
      observations_mass_kg: "",
      remarks_mass_kg: "",
      observations_diameter_mm: "",
      remarks_diameter_mm: "",
      observations_length_meter_steel: "",
      remarks_length_meter_steel: "",
      observations_breaking_load_steel: "",
      remarks_breaking_load_steel: "",
      observations_mass_kg_steel: "",
      remarks_mass_kg_steel: "",
      observations_throwing_hook_manual: "",
      remarks_throwing_hook_manual: "",
      observations_throwing_hook_pneumatic: "",
      remarks_throwing_hook_pneumatic: "",
      observations_mooring_bollards: "",
      remarks_mooring_bollards: "",
      observations_fairleads: "",
      remarks_fairleads: "",
      observations_warping_heads: "",
      remarks_warping_heads: "",
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Required field validations
    const requiredFields = [
      "observations_size_mm", "remarks_size_mm", "observations_length_meter", "remarks_length_meter",
      "observations_breaking_load", "remarks_breaking_load", "observations_mass_kg", "remarks_mass_kg",
      "observations_diameter_mm", "remarks_diameter_mm", "observations_length_meter_steel", "remarks_length_meter_steel",
      "observations_breaking_load_steel", "remarks_breaking_load_steel", "observations_mass_kg_steel", "remarks_mass_kg_steel",
      "observations_throwing_hook_manual", "remarks_throwing_hook_manual", "observations_throwing_hook_pneumatic", "remarks_throwing_hook_pneumatic",
      "observations_mooring_bollards", "remarks_mooring_bollards", "observations_fairleads", "remarks_fairleads",
      "observations_warping_heads", "remarks_warping_heads"
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
    remarksField: string,
    specificationValue?: string
  ) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        {/* <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {subsectionTitle.charAt(0)}
        </span> */}
        <div>
          <div className="text-sm font-medium text-gray-700">{subsectionTitle}</div>
          {specificationValue && (
            <div className="text-sm text-gray-600 font-semibold">{specificationValue}</div>
          )}
        </div>
      </div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">EMERGENCY TOWING ARRANGEMENTS</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Towing Chain */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">1. Towing Chain</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Towing Chain",
                    "a) Size in mm",
                    "observations_size_mm",
                    "remarks_size_mm",
                    "40"
                  )}
                  
                  {renderObservationSection(
                    "Towing Chain",
                    "b) Length in Meter",
                    "observations_length_meter",
                    "remarks_length_meter",
                    "1.67"
                  )}
                  
                  {renderObservationSection(
                    "Towing Chain",
                    "c) Breaking Load MN (tf)",
                    "observations_breaking_load",
                    "remarks_breaking_load",
                    "0.47 (48)"
                  )}
                  
                  {renderObservationSection(
                    "Towing Chain",
                    "d) Mass, KG",
                    "observations_mass_kg",
                    "remarks_mass_kg",
                    "50"
                  )}
                </div>
              </div>

              {/* Section 2: Steel Tow Line */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">2. Steel Tow Line</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Steel Tow Line",
                    "a) Diameter in mm",
                    "observations_diameter_mm",
                    "remarks_diameter_mm",
                    "38"
                  )}
                  
                  {renderObservationSection(
                    "Steel Tow Line",
                    "b) Length in Meter",
                    "observations_length_meter_steel",
                    "remarks_length_meter_steel",
                    "21"
                  )}
                  
                  {renderObservationSection(
                    "Steel Tow Line",
                    "c) Breaking Load MN (tf)",
                    "observations_breaking_load_steel",
                    "remarks_breaking_load_steel",
                    "0.55 (56,1)"
                  )}
                  
                  {renderObservationSection(
                    "Steel Tow Line",
                    "d) Mass, KG",
                    "observations_mass_kg_steel",
                    "remarks_mass_kg_steel",
                    "115"
                  )}
                </div>
              </div>

              {/* Section 3: Check Release Mechanism */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">
                  3. Check Release Mechanism of Towing Hook Under Load of 3 TF (Thrice)
                </h5>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-3">a) Throwing Hook Release Mechanism</div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-2">I. Manual Drive</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="observations_throwing_hook_manual" className="text-sm font-medium">
                              Observations: <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.observations_throwing_hook_manual}
                              onValueChange={(value) => handleInputChange("observations_throwing_hook_manual", value)}
                            >
                              <SelectTrigger className={errors.observations_throwing_hook_manual ? "border-red-500" : ""}>
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
                            {errors.observations_throwing_hook_manual && (
                              <p className="text-red-500 text-xs mt-1">{errors.observations_throwing_hook_manual}</p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="remarks_throwing_hook_manual" className="text-sm font-medium">
                              Remarks: <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="remarks_throwing_hook_manual"
                              value={formData.remarks_throwing_hook_manual}
                              onChange={(e) => {
                                const validatedValue = handleSpecialCharValidation("remarks_throwing_hook_manual", e.target.value);
                                handleInputChange("remarks_throwing_hook_manual", validatedValue);
                              }}
                              className={errors.remarks_throwing_hook_manual ? "border-red-500" : ""}
                              rows={2}
                              maxLength={1000}
                            />
                            {errors.remarks_throwing_hook_manual && (
                              <p className="text-red-500 text-xs mt-1">{errors.remarks_throwing_hook_manual}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-2">II. Pneumatic Machine</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="observations_throwing_hook_pneumatic" className="text-sm font-medium">
                              Observations: <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.observations_throwing_hook_pneumatic}
                              onValueChange={(value) => handleInputChange("observations_throwing_hook_pneumatic", value)}
                            >
                              <SelectTrigger className={errors.observations_throwing_hook_pneumatic ? "border-red-500" : ""}>
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
                            {errors.observations_throwing_hook_pneumatic && (
                              <p className="text-red-500 text-xs mt-1">{errors.observations_throwing_hook_pneumatic}</p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="remarks_throwing_hook_pneumatic" className="text-sm font-medium">
                              Remarks: <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="remarks_throwing_hook_pneumatic"
                              value={formData.remarks_throwing_hook_pneumatic}
                              onChange={(e) => {
                                const validatedValue = handleSpecialCharValidation("remarks_throwing_hook_pneumatic", e.target.value);
                                handleInputChange("remarks_throwing_hook_pneumatic", validatedValue);
                              }}
                              className={errors.remarks_throwing_hook_pneumatic ? "border-red-500" : ""}
                              rows={2}
                              maxLength={1000}
                            />
                            {errors.remarks_throwing_hook_pneumatic && (
                              <p className="text-red-500 text-xs mt-1">{errors.remarks_throwing_hook_pneumatic}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Raising, Lowering And Turning of Reel */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">4. Raising, Lowering And Turning of Reel</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Raising, Lowering And Turning of Reel",
                    "a) Lifting and Lowering of Mooring Retractable Bollards (4 Pairs)",
                    "observations_mooring_bollards",
                    "remarks_mooring_bollards"
                  )}
                  
                  {renderObservationSection(
                    "Raising, Lowering And Turning of Reel",
                    "b) Lifting and Lowering of (Fairleads) (8 PC)",
                    "observations_fairleads",
                    "remarks_fairleads"
                  )}
                  
                  {renderObservationSection(
                    "Raising, Lowering And Turning of Reel",
                    "c) Lifting and Lowering of Warping Heads of Anchor and Warping Capstans",
                    "observations_warping_heads",
                    "remarks_warping_heads"
                  )}
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

export default EKMEmergencyTowingArrangementsForm;
