import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AnchorCapstanForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    dateOfInspection: "",
    make: "",
    yearOfManufacture: "",
    observationsLiningBrake: "",
    remarksLiningBrake: "",
    observationsGearbox: "",
    remarksGearbox: "",
    observationsCapstanMotor: "",
    remarksCapstanMotor: "",
    observationsCapstanFoundation: "",
    remarksCapstanFoundation: "",
    observationsSpeed1: "",
    remarksSpeed1: "",
    observationsSpeed2: "",
    remarksSpeed2: "",
    observationsSpeed3: "",
    remarksSpeed3: "",
    observationsOilLevel: "",
    remarksOilLevel: "",
    observationsOc300: "",
    remarksOc300: "",
    dateOfOilChange: "",
    oilChangeDueDate: "",
    remarksOilChange: "",
    observationsGreasing: "",
    remarksGreasing: "",
    remarksAnyOther: "",
    observationsOverall: "",
    observationsEmergencyStop: "",
    remarksEmergencyStop: "",
    observationsOverloadProtection: "",
    remarksOverloadProtection: "",
    observationsCableCondition: "",
    remarksCableCondition: "",
    observationsControlPanel: "",
    remarksControlPanel: "",
    observationsWeatherProtection: "",
    remarksWeatherProtection: "",
    observationsDocumentation: "",
    remarksDocumentation: "",
    observationsLoadTesting: "",
    remarksLoadTesting: "",
    nextMaintenanceDate: "",
    maintenanceType: "",
    remarksMaintenanceSchedule: "",
    overallSystemStatus: "",
    remarksFinalAssessment: "",
    authoritySignature: null as File | null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState<string | null>(null);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, authoritySignature: file }));
  };

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData }
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('anchorCapstanDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('anchorCapstanDrafts', JSON.stringify(updatedDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('anchorCapstanDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('anchorCapstanDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('anchorCapstanDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      dateOfInspection: "",
      make: "",
      yearOfManufacture: "",
      observationsLiningBrake: "",
      remarksLiningBrake: "",
      observationsGearbox: "",
      remarksGearbox: "",
      observationsCapstanMotor: "",
      remarksCapstanMotor: "",
      observationsCapstanFoundation: "",
      remarksCapstanFoundation: "",
      observationsSpeed1: "",
      remarksSpeed1: "",
      observationsSpeed2: "",
      remarksSpeed2: "",
      observationsSpeed3: "",
      remarksSpeed3: "",
      observationsOilLevel: "",
      remarksOilLevel: "",
      observationsOc300: "",
      remarksOc300: "",
      dateOfOilChange: "",
      oilChangeDueDate: "",
      remarksOilChange: "",
      observationsGreasing: "",
      remarksGreasing: "",
      remarksAnyOther: "",
      observationsOverall: "",
      observationsEmergencyStop: "",
      remarksEmergencyStop: "",
      observationsOverloadProtection: "",
      remarksOverloadProtection: "",
      observationsCableCondition: "",
      remarksCableCondition: "",
      observationsControlPanel: "",
      remarksControlPanel: "",
      observationsWeatherProtection: "",
      remarksWeatherProtection: "",
      observationsDocumentation: "",
      remarksDocumentation: "",
      observationsLoadTesting: "",
      remarksLoadTesting: "",
      nextMaintenanceDate: "",
      maintenanceType: "",
      remarksMaintenanceSchedule: "",
      overallSystemStatus: "",
      remarksFinalAssessment: "",
      authoritySignature: null,
    });
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = [
      'ship', 'dateOfInspection', 'make', 'yearOfManufacture', 'observationsLiningBrake', 
      'remarksLiningBrake', 'observationsGearbox', 'remarksGearbox', 'observationsCapstanMotor',
      'remarksCapstanMotor', 'observationsCapstanFoundation', 'remarksCapstanFoundation',
      'observationsSpeed1', 'remarksSpeed1', 'observationsSpeed2', 'remarksSpeed2',
      'observationsSpeed3', 'remarksSpeed3', 'observationsOilLevel', 'remarksOilLevel',
      'observationsOc300', 'remarksOc300', 'dateOfOilChange', 'oilChangeDueDate',
      'remarksOilChange', 'observationsGreasing', 'remarksGreasing', 'remarksAnyOther',
      'observationsOverall'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    if (!formData.authoritySignature) {
      alert('Please upload authority signature');
      return;
    }
    
    console.log("Anchor Capstan Form submitted:", formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">ANCHOR CAPSTAN</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                <Label className="text-lg font-semibold">Ship</Label>
              </div>
              <Select value={formData.ship} onValueChange={(value) => handleInputChange("ship", value)}>
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
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                <Label className="text-lg font-semibold">Date of Inspection/Trials <span className="text-red-500">*</span></Label>
              </div>
              <Input
                type="date"
                value={formData.dateOfInspection}
                onChange={(e) => handleInputChange("dateOfInspection", e.target.value)}
                required
              />
            </div>

            {/* Section 3: Make */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-lg font-semibold">Make <span className="text-red-500">*</span></Label>
              </div>
              <Input
                value={formData.make}
                onChange={(e) => handleInputChange("make", e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Section 4: Year of Manufacture */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                <Label className="text-lg font-semibold">Year of Manufacture <span className="text-red-500">*</span></Label>
              </div>
              <Input
                type="number"
                value={formData.yearOfManufacture}
                onChange={(e) => handleInputChange("yearOfManufacture", e.target.value)}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            {/* Section 5: Conditions of Ferrodo Lining on Brake */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                <Label className="text-lg font-semibold">Conditions of Ferrodo Lining on Brake</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Wear and Tear</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsLiningBrake} onValueChange={(value) => handleInputChange("observationsLiningBrake", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksLiningBrake}
                      onChange={(e) => handleInputChange("remarksLiningBrake", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Condition of Gear Box */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-lg font-semibold">Condition of Gear Box</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Excessive Noise During Operation</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsGearbox} onValueChange={(value) => handleInputChange("observationsGearbox", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksGearbox}
                      onChange={(e) => handleInputChange("remarksGearbox", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Condition of Capstan Motor */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-lg font-semibold">Condition of Capstan Motor</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Insulation Resistance of The Winding &gt; 10 M Ohms Using a Insulator Tester</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsCapstanMotor} onValueChange={(value) => handleInputChange("observationsCapstanMotor", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksCapstanMotor}
                      onChange={(e) => handleInputChange("remarksCapstanMotor", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8: Conditions of Deck Plating Under Capstan Foundation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-lg font-semibold">Conditions of Deck Plating Under Capstan Foundation</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Corrosion/ Pitting/ Unpainted/ Condition of Bonding Straps</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsCapstanFoundation} onValueChange={(value) => handleInputChange("observationsCapstanFoundation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="CORRODED">CORRODED</SelectItem>
                        <SelectItem value="PITTED">PITTED</SelectItem>
                        <SelectItem value="UNPAINTED">UNPAINTED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksCapstanFoundation}
                      onChange={(e) => handleInputChange("remarksCapstanFoundation", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: Operational Trials */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-lg font-semibold">Operational Trials</Label>
              </div>
              <div className="ml-6 space-y-4">
                <div>
                  <Label className="text-base font-medium">a) Speed 1 - 220 rev/min</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsSpeed1} onValueChange={(value) => handleInputChange("observationsSpeed1", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksSpeed1}
                        onChange={(e) => handleInputChange("remarksSpeed1", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">b) Speed 2 - 680 rev/min</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsSpeed2} onValueChange={(value) => handleInputChange("observationsSpeed2", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksSpeed2}
                        onChange={(e) => handleInputChange("remarksSpeed2", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">c) Speed 3 - 1340 rev/min</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                      <Select value={formData.observationsSpeed3} onValueChange={(value) => handleInputChange("observationsSpeed3", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="--Select--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAT">SAT</SelectItem>
                          <SelectItem value="UNSAT">UNSAT</SelectItem>
                          <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                      <Textarea
                        value={formData.remarksSpeed3}
                        onChange={(e) => handleInputChange("remarksSpeed3", e.target.value)}
                        rows={2}
                        maxLength={1000}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10: Oil Level in Gear Box */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-lg font-semibold">Oil Level in Gear Box</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Oil Level Should be Maintained Upto The Centre of The Oil Eye</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsOilLevel} onValueChange={(value) => handleInputChange("observationsOilLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">LOW</SelectItem>
                        <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                        <SelectItem value="HIGH">HIGH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksOilLevel}
                      onChange={(e) => handleInputChange("remarksOilLevel", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 11: Oil Being Used in Gear Box */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-lg font-semibold">Oil Being Used in Gear Box</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) OC 300</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsOc300} onValueChange={(value) => handleInputChange("observationsOc300", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksOc300}
                      onChange={(e) => handleInputChange("remarksOc300", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 12: Changed of Oil Every Six Months */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-lg font-semibold">Changed of Oil Every Six Months</Label>
              </div>
              <div className="ml-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Last Date of Change Oil: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      value={formData.dateOfOilChange}
                      onChange={(e) => handleInputChange("dateOfOilChange", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Due Date: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      value={formData.oilChangeDueDate}
                      onChange={(e) => handleInputChange("oilChangeDueDate", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksOilChange}
                      onChange={(e) => handleInputChange("remarksOilChange", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 13: Greasing Points */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-lg font-semibold">Greasing Points</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Condition of Greasing Nipple-Clean/ Painted/ Choked</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsGreasing} onValueChange={(value) => handleInputChange("observationsGreasing", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="PAINTED">PAINTED</SelectItem>
                        <SelectItem value="CHOKED">CHOKED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksGreasing}
                      onChange={(e) => handleInputChange("remarksGreasing", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 14: Any Other Observation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-lg font-semibold">Any Other Observation</Label>
              </div>
              <div>
                <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                <Textarea
                  value={formData.remarksAnyOther}
                  onChange={(e) => handleInputChange("remarksAnyOther", e.target.value)}
                  rows={2}
                  maxLength={1000}
                  required
                />
              </div>
            </div>

            {/* Section 15: Overall Remarks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-lg font-semibold">Overall Remarks</Label>
              </div>
              <div>
                <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                <Select value={formData.observationsOverall} onValueChange={(value) => handleInputChange("observationsOverall", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Section 16: Additional Operational Checks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">16</span>
                <Label className="text-lg font-semibold">Additional Operational Checks</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Emergency Stop Function</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsEmergencyStop || ""} onValueChange={(value) => handleInputChange("observationsEmergencyStop", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksEmergencyStop || ""}
                      onChange={(e) => handleInputChange("remarksEmergencyStop", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 17: Safety Systems */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">17</span>
                <Label className="text-lg font-semibold">Safety Systems</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Overload Protection</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsOverloadProtection || ""} onValueChange={(value) => handleInputChange("observationsOverloadProtection", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksOverloadProtection || ""}
                      onChange={(e) => handleInputChange("remarksOverloadProtection", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 18: Electrical Connections */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">18</span>
                <Label className="text-lg font-semibold">Electrical Connections</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Cable Condition and Connections</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsCableCondition || ""} onValueChange={(value) => handleInputChange("observationsCableCondition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksCableCondition || ""}
                      onChange={(e) => handleInputChange("remarksCableCondition", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 19: Control Panel */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">19</span>
                <Label className="text-lg font-semibold">Control Panel</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Control Panel Functionality</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsControlPanel || ""} onValueChange={(value) => handleInputChange("observationsControlPanel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksControlPanel || ""}
                      onChange={(e) => handleInputChange("remarksControlPanel", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 20: Environmental Conditions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">20</span>
                <Label className="text-lg font-semibold">Environmental Conditions</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Weather Protection</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsWeatherProtection || ""} onValueChange={(value) => handleInputChange("observationsWeatherProtection", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksWeatherProtection || ""}
                      onChange={(e) => handleInputChange("remarksWeatherProtection", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 21: Documentation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">21</span>
                <Label className="text-lg font-semibold">Documentation</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Manuals and Certificates</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsDocumentation || ""} onValueChange={(value) => handleInputChange("observationsDocumentation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksDocumentation || ""}
                      onChange={(e) => handleInputChange("remarksDocumentation", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 22: Performance Testing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">22</span>
                <Label className="text-lg font-semibold">Performance Testing</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Load Testing Results</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                    <Select value={formData.observationsLoadTesting || ""} onValueChange={(value) => handleInputChange("observationsLoadTesting", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="UNSAT">UNSAT</SelectItem>
                        <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksLoadTesting || ""}
                      onChange={(e) => handleInputChange("remarksLoadTesting", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 23: Maintenance Schedule */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">23</span>
                <Label className="text-lg font-semibold">Maintenance Schedule</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Next Scheduled Maintenance</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Date: <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      value={formData.nextMaintenanceDate || ""}
                      onChange={(e) => handleInputChange("nextMaintenanceDate", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Type: <span className="text-red-500">*</span></Label>
                    <Input
                      value={formData.maintenanceType || ""}
                      onChange={(e) => handleInputChange("maintenanceType", e.target.value)}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksMaintenanceSchedule || ""}
                      onChange={(e) => handleInputChange("remarksMaintenanceSchedule", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 24: Final Assessment */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">24</span>
                <Label className="text-lg font-semibold">Final Assessment</Label>
              </div>
              <div className="ml-6">
                <Label className="text-base font-medium">a) Overall System Status</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Status: <span className="text-red-500">*</span></Label>
                    <Select value={formData.overallSystemStatus || ""} onValueChange={(value) => handleInputChange("overallSystemStatus", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPERATIONAL">OPERATIONAL</SelectItem>
                        <SelectItem value="LIMITED OPERATION">LIMITED OPERATION</SelectItem>
                        <SelectItem value="NON-OPERATIONAL">NON-OPERATIONAL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={formData.remarksFinalAssessment || ""}
                      onChange={(e) => handleInputChange("remarksFinalAssessment", e.target.value)}
                      rows={2}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 25: Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">25</span>
                <Label className="text-lg font-semibold">Authority Signature <span className="text-red-500">*</span></Label>
              </div>
              <div>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, JPEG, PNG (Max 2MB)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button 
                type="button" 
                onClick={handleFetchDrafts}
                className="px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold uppercase"
              >
                FETCH DRAFTS
              </Button>
              <Button 
                type="button" 
                onClick={handleSaveDraft}
                className="px-6 bg-green-500 hover:bg-green-600 text-white font-semibold uppercase"
              >
                SAVE DRAFT
              </Button>
              <Button 
                type="button" 
                onClick={handleClear}
                className="px-6 bg-red-500 hover:bg-red-600 text-white font-semibold uppercase"
              >
                CLEAR
              </Button>
              <Button 
                type="submit" 
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase"
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
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {drafts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No drafts available</p>
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
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.formData.make || "No Make Data"}</TableCell>
                      <TableCell>
                        {new Date(draft.timestamp).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditDraft(draft)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this draft?')) {
                                handleDeleteDraft(draft.id);
                              }
                            }}
                          >
                            Delete
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
  );
};

export default AnchorCapstanForm;
