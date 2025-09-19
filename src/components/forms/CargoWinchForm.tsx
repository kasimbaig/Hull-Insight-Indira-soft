import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, FileText, Trash2, Edit } from "lucide-react";

const CargoWinchForm: React.FC = () => {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    type_of_winch: "",
    manufacture_oem: "",
    year_manufacture: "",
    control_panel_observations: "",
    control_panel_remarks: "",
    swr_observations: "",
    swr_remarks: "",
    load_testing_observations: "",
    load_testing_remarks: "",
    foundations_observations: "",
    foundations_remarks: "",
    mechanical_parts_observations: "",
    mechanical_parts_remarks: "",
    operational_trials_observations: "",
    operational_trials_remarks: "",
    other_observations_observations: "",
    other_observations_remarks: "",
    electrical_parameters_observations: "",
    electrical_parameters_remarks: "",
    overall_remarks: "",
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
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only JPG, JPEG, or PNG files.");
        return;
      }
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB.");
        return;
      }
    }
    handleInputChange('authority_signature', file);
  };

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      data: formData,
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('cargoWinchDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('cargoWinchDrafts', JSON.stringify(updatedDrafts));
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const savedDrafts = JSON.parse(localStorage.getItem('cargoWinchDrafts') || '[]');
    setDrafts(savedDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draftId: string) => {
    const draft = drafts.find(d => d.id === draftId);
    if (draft) {
      setFormData(draft.data);
      setIsDraftModalOpen(false);
      alert('Draft loaded successfully!');
    }
  };

  const handleDeleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(d => d.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('cargoWinchDrafts', JSON.stringify(updatedDrafts));
    alert('Draft deleted successfully!');
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      date_of_inspection: "",
      type_of_winch: "",
      manufacture_oem: "",
      year_manufacture: "",
      control_panel_observations: "",
      control_panel_remarks: "",
      swr_observations: "",
      swr_remarks: "",
      load_testing_observations: "",
      load_testing_remarks: "",
      foundations_observations: "",
      foundations_remarks: "",
      mechanical_parts_observations: "",
      mechanical_parts_remarks: "",
      operational_trials_observations: "",
      operational_trials_remarks: "",
      other_observations_observations: "",
      other_observations_remarks: "",
      electrical_parameters_observations: "",
      electrical_parameters_remarks: "",
      overall_remarks: "",
      authority_signature: null,
    });
  };

  const ships = [
    "SHIVALIK", "JAMUNA", "BANGARAM", "TARANGINI", "SARYU", "KUMBHIR", "T-83",
    "AIRAVAT", "KHANJAR", "SHUDERSHINI", "TRISHUL", "TEG", "RANVIJAY", "KIRPAN",
    "DELHI", "SURVEKSHAK", "JYOTI", "SUJATA", "KABRA", "CANKARSO", "T-84",
    "VIBHUTI", "NISHANK", "MAGAR", "BEAS", "SUVERNA", "SAHYADRI", "PRALAYA",
    "CHERIYAM", "SATPURA", "JALASHWA", "TARKASH", "KARMUK", "SUTLEJ", "SUMEDHA",
    "PRABAL", "CORA DIVH", "BATTIMALV", "CHENNAI", "SUMITRA", "T-82", "KUTHAR",
    "KONDUL", "SUBHDRA", "DARSHAK", "BITRA", "CHETLAT", "NIREEKSHAK", "KARUVA",
    "DEEPAK", "SHAKTI", "KOLKATA", "INVETIGATOR", "SHARDA", "MUMBAI", "GOMTI",
    "BETWA", "NASHAK", "KOSWARI", "CHEETAH", "TALWAR", "KESARI", "ADITYA",
    "BARATANG", "KORA", "KULISH", "RANA", "KALPENI", "VIPUL", "TABAR", "TRINKAND",
    "KOCHI", "SUKANYA", "SAVITRI", "GULDAR", "BRAHMAPUTRA", "GHARIAL", "RANVIR",
    "NIRUPAK", "VINASH", "KIRCH", "SANDHAYAK", "VIDYUT", "TIR", "GAJ", "CAR NICOBAR",
    "SUNAYNA", "MYSORE"
  ];

  const observationOptions = [
    { value: "0", label: "--Select--" },
    { value: "SAT", label: "SAT" },
    { value: "UNSAT", label: "UNSAT" },
    { value: "SATWITHOBSERVATION", label: "SAT WITH OBSERVATION" }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">CARGO WINCH</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <Label htmlFor="ship" className="text-base font-medium">Ship <span className="text-red-500">*</span></Label>
              </div>
              <Select value={formData.ship} onValueChange={(value) => handleInputChange('ship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  {ships.map((ship) => (
                    <SelectItem key={ship} value={ship}>
                      {ship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section 2: Date of Inspection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <Label htmlFor="date_of_inspection" className="text-base font-medium">Date of Inspection/Trials <span className="text-red-500">*</span></Label>
              </div>
              <Input
                id="date_of_inspection"
                type="date"
                value={formData.date_of_inspection}
                onChange={(e) => handleInputChange('date_of_inspection', e.target.value)}
                required
              />
            </div>

            {/* Section 3: Type of Winch */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <Label htmlFor="type_of_winch" className="text-base font-medium">Type of Winch <span className="text-red-500">*</span></Label>
              </div>
              <Input
                id="type_of_winch"
                value={formData.type_of_winch}
                onChange={(e) => handleInputChange('type_of_winch', e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Section 4: Manufacturer/OEM */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <Label htmlFor="manufacture_oem" className="text-base font-medium">Manufacture/OEM <span className="text-red-500">*</span></Label>
              </div>
              <Input
                id="manufacture_oem"
                value={formData.manufacture_oem}
                onChange={(e) => handleInputChange('manufacture_oem', e.target.value)}
                maxLength={50}
                required
              />
            </div>

            {/* Section 5: Year of Manufacture */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                <Label htmlFor="year_manufacture" className="text-base font-medium">Year of Manufacture <span className="text-red-500">*</span></Label>
              </div>
              <Input
                id="year_manufacture"
                type="number"
                value={formData.year_manufacture}
                onChange={(e) => handleInputChange('year_manufacture', e.target.value)}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            {/* Section 6: Condition of Control Panel */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-base font-medium">Condition of Control Panel</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.control_panel_observations} onValueChange={(value) => handleInputChange('control_panel_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.control_panel_remarks}
                    onChange={(e) => handleInputChange('control_panel_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 7: Condition of SWR */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-base font-medium">Condition of SWR</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.swr_observations} onValueChange={(value) => handleInputChange('swr_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.swr_remarks}
                    onChange={(e) => handleInputChange('swr_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 8: Load Testing */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-base font-medium">Load Testing</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.load_testing_observations} onValueChange={(value) => handleInputChange('load_testing_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.load_testing_remarks}
                    onChange={(e) => handleInputChange('load_testing_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 9: Condition of Foundations */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-base font-medium">Condition of Foundations</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.foundations_observations} onValueChange={(value) => handleInputChange('foundations_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.foundations_remarks}
                    onChange={(e) => handleInputChange('foundations_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 10: Greasing of Mechanical Parts */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-base font-medium">Greasing of Mechanical Parts</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.mechanical_parts_observations} onValueChange={(value) => handleInputChange('mechanical_parts_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.mechanical_parts_remarks}
                    onChange={(e) => handleInputChange('mechanical_parts_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 11: Operational Trials */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-base font-medium">Operational Trials</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.operational_trials_observations} onValueChange={(value) => handleInputChange('operational_trials_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.operational_trials_remarks}
                    onChange={(e) => handleInputChange('operational_trials_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 12: Other Observations */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-base font-medium">Other Observation</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.other_observations_observations} onValueChange={(value) => handleInputChange('other_observations_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.other_observations_remarks}
                    onChange={(e) => handleInputChange('other_observations_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 13: Electrical Parameters */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-base font-medium">Electrical Parameters i.a.w Maintops</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select value={formData.electrical_parameters_observations} onValueChange={(value) => handleInputChange('electrical_parameters_observations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {observationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.electrical_parameters_remarks}
                    onChange={(e) => handleInputChange('electrical_parameters_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 14: Overall Remarks */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-base font-medium">Overall Remarks</Label>
              </div>
              <div>
                <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.overall_remarks}
                  onChange={(e) => handleInputChange('overall_remarks', e.target.value)}
                  rows={2}
                  maxLength={1000}
                  required
                />
              </div>
            </div>

            {/* Section 15: Authority Signature */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-base font-medium">Authority Signature <span className="text-red-500">*</span></Label>
              </div>
              <div className="max-w-md">
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Accepted formats: JPG, JPEG, PNG (Max size: 2MB)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button
                type="button"
                onClick={handleFetchDrafts}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
              >
                {/* <FileText className="h-4 w-4 mr-2" /> */}
                FETCH DRAFTS
              </Button>
              <Button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                {/* <Save className="h-4 w-4 mr-2" /> */}
                SAVE DRAFT
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                CLEAR
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                SAVE
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Saved Drafts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500">No drafts found.</p>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Draft saved on: {draft.timestamp}</p>
                      <p className="text-sm text-gray-600">Ship: {draft.data.ship || 'Not specified'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditDraft(draft.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Load
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CargoWinchForm;
