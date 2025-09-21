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

const EKMMooringCapstanForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    type: "",
    year_manufacture: "",
    observations_electrical: "",
    remarks_electrical: "",
    observations_switches: "",
    remarks_switches: "",
    observations_indicators: "",
    remarks_indicators: "",
    observations_gear_box: "",
    remarks_gear_box: "",
    observations_foundation: "",
    remarks_foundation: "",
    observations_insulation: "",
    remarks_insulation: "",
    observations_greasing: "",
    remarks_greasing: "",
    observations_greasing_point: "",
    remarks_greasing_point: "",
    observations_operational_trails_paying_out: "",
    remarks_operational_trails_paying_out: "",
    observations_operational_trails_heaving_in: "",
    remarks_operational_trails_heaving_in: "",
    observations_drive: "",
    remarks_drive: "",
    observations_capstan: "",
    remarks_capstan: "",
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

  const greasingPointOptions = [
    { value: "SAT", label: "SAT" },
    { value: "PAINTED", label: "PAINTED" },
    { value: "CHOKED", label: "CHOKED" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSpecialCharValidation = (field: string, value: string) => {
    if (field.includes("remarks") || field === "make" || field === "type") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        alert("Special characters are not allowed.");
        return value.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 1000);
      }
    }
    return value;
  };

  const handleYearValidation = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const currentYear = new Date().getFullYear();
    const minYear = 1900;

    if (numericValue) {
      const enteredYear = parseInt(numericValue);
      if (enteredYear > currentYear) {
        alert("Please enter a year in the past.");
        return "";
      } else if (enteredYear < minYear) {
        alert("Please enter a year greater than or equal to " + minYear + ".");
        return "";
      }
    }
    return numericValue;
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
      { id: 1, make: "Sample Make 1", created_date: "2024-01-15" },
      { id: 2, make: "Sample Make 2", created_date: "2024-01-14" },
    ]);
  };

  const handleClear = () => {
    setFormData({
      make: "",
      type: "",
      year_manufacture: "",
      observations_electrical: "",
      remarks_electrical: "",
      observations_switches: "",
      remarks_switches: "",
      observations_indicators: "",
      remarks_indicators: "",
      observations_gear_box: "",
      remarks_gear_box: "",
      observations_foundation: "",
      remarks_foundation: "",
      observations_insulation: "",
      remarks_insulation: "",
      observations_greasing: "",
      remarks_greasing: "",
      observations_greasing_point: "",
      remarks_greasing_point: "",
      observations_operational_trails_paying_out: "",
      remarks_operational_trails_paying_out: "",
      observations_operational_trails_heaving_in: "",
      remarks_operational_trails_heaving_in: "",
      observations_drive: "",
      remarks_drive: "",
      observations_capstan: "",
      remarks_capstan: "",
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
      "make", "type", "year_manufacture",
      "observations_electrical", "remarks_electrical",
      "observations_switches", "remarks_switches",
      "observations_indicators", "remarks_indicators",
      "observations_gear_box", "remarks_gear_box",
      "observations_foundation", "remarks_foundation",
      "observations_insulation", "remarks_insulation",
      "observations_greasing", "remarks_greasing",
      "observations_greasing_point", "remarks_greasing_point",
      "observations_operational_trails_paying_out", "remarks_operational_trails_paying_out",
      "observations_operational_trails_heaving_in", "remarks_operational_trails_heaving_in",
      "observations_drive", "remarks_drive",
      "observations_capstan", "remarks_capstan",
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
    remarksField: string,
    options: any[] = observationOptions
  ) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        {/* <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {subsectionTitle.charAt(0)}
        </span> */}
        <div>
          <div className="text-sm font-medium text-gray-700">{subsectionTitle}</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">MOORING CAPSTAN</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="make" className="text-sm font-medium">
                      1. Make <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="make"
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
                  
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">
                      2. Type <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="type"
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
                  
                  <div>
                    <Label htmlFor="year_manufacture" className="text-sm font-medium">
                      3. Year of Manufacture <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="year_manufacture"
                      value={formData.year_manufacture}
                      onChange={(e) => {
                        const validatedValue = handleYearValidation(e.target.value);
                        handleInputChange("year_manufacture", validatedValue);
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

              {/* Section 4: Control Panel VI Compartment */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">4. Control Panel VI Compartment</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Control Panel VI Compartment",
                    "a) Electrical Hygiene",
                    "observations_electrical",
                    "remarks_electrical"
                  )}
                  
                  {renderObservationSection(
                    "Control Panel VI Compartment",
                    "b) Status of Switches",
                    "observations_switches",
                    "remarks_switches"
                  )}
                  
                  {renderObservationSection(
                    "Control Panel VI Compartment",
                    "c) Status of Indicators",
                    "observations_indicators",
                    "remarks_indicators"
                  )}
                </div>
              </div>

              {/* Section 5: Oil Level */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">5. Oil Level</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Oil Level",
                    "a) Gear Box",
                    "observations_gear_box",
                    "remarks_gear_box"
                  )}
                </div>
              </div>

              {/* Section 6: Conditions of Foundations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">6. Conditions of Foundations</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Conditions of Foundations",
                    "a) Corrosion/ Pitting/ Unpainted",
                    "observations_foundation",
                    "remarks_foundation"
                  )}
                </div>
              </div>

              {/* Section 7: Insulation & SPM of Motor and Cable */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">7. Insulation & SPM of Motor and Cable</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Insulation & SPM of Motor and Cable",
                    "a) To be Undertaken by ETMA",
                    "observations_insulation",
                    "remarks_insulation"
                  )}
                </div>
              </div>

              {/* Section 8: Greasing of Mechanical Parts */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">8. Greasing of Mechanical Parts</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Greasing of Mechanical Parts",
                    "a) Proper Greasing of Mechanical Parts",
                    "observations_greasing",
                    "remarks_greasing"
                  )}
                </div>
              </div>

              {/* Section 9: Greasing Points */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">9. Greasing Points</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Greasing Points",
                    "a) Condition of Greasing Nipple-Clean/ Painted/ Choked",
                    "observations_greasing_point",
                    "remarks_greasing_point",
                    greasingPointOptions
                  )}
                </div>
              </div>

              {/* Section 10: Operational Trails */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">10. Operational Trails</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Operational Trails",
                    "a) (Paying Out) Speed 1 - Speed 6",
                    "observations_operational_trails_paying_out",
                    "remarks_operational_trails_paying_out"
                  )}
                  
                  {renderObservationSection(
                    "Operational Trails",
                    "b) (Heaving in) Speed 1 - Speed 6",
                    "observations_operational_trails_heaving_in",
                    "remarks_operational_trails_heaving_in"
                  )}
                </div>
              </div>

              {/* Section 11: Drive */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">11. Drive</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Drive",
                    "a) Check for Abnormal Sounds/ Excessive Noise During Operation",
                    "observations_drive",
                    "remarks_drive"
                  )}
                </div>
              </div>

              {/* Section 12: Condition of Capstan Drum */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">12. Condition of Capstan Drum</h5>
                
                <div className="space-y-6">
                  {renderObservationSection(
                    "Condition of Capstan Drum",
                    "a) Rusted/ Corroded/ Pitted",
                    "observations_capstan",
                    "remarks_capstan"
                  )}
                </div>
              </div>

              {/* Section 13: Any Other Observation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">13. Any Other Observation</h5>
                
                <div className="space-y-4">
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

              {/* Section 14: Overall Remarks */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h5 className="text-lg font-bold text-gray-900 mb-6">14. Overall Remarks</h5>
                
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
                  <TableHead>Make</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={draft.id}>
                    <TableCell>{index + 1}</TableCell>
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

export default EKMMooringCapstanForm;
