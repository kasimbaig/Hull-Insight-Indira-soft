import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const DeckCrane40MForm: React.FC = () => {
  const [formData, setFormData] = useState({
    ship: "",
    date_of_inspection: "",
    make_model: "",
    type: "",
    year_of_manufacture: "",
    ref_documents: "",
    maintenance_observations: "",
    maintenance_remarks: "",
    lifting_capacity_observations: "",
    lifting_capacity_remarks: "",
    load_testing_observations: "",
    load_testing_remarks: "",
    structure_observations: "",
    structure_remarks: "",
    wire_ropes_observations: "",
    wire_ropes_remarks: "",
    oil_observations: "",
    oil_remarks: "",
    greasing_observations: "",
    greasing_remarks: "",
    oil_grease_levels_observations: "",
    oil_grease_levels_remarks: "",
    electrical_checks_observations: "",
    electrical_checks_remarks: "",
    electrical_checks_etma_observations: "",
    electrical_checks_etma_remarks: "",
    visual_inspection_observations: "",
    visual_inspection_remarks: "",
    operation_checks_observations: "",
    operation_checks_remarks: "",
    other_observations_remarks: "",
    overall_remarks_textarea: "",
    authority_signature: null as File | null,
  });

  const shipOptions = [
    { value: "0", label: "--Select--" },
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

  const observationOptions = [
    { value: "0", label: "--Select--" },
    { value: "SAT", label: "SAT" },
    { value: "UNSAT", label: "UNSAT" },
    { value: "SATWITHOBSERVATION", label: "SAT WITH OBSERVATION" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      authority_signature: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const validateYear = (year: string) => {
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const yearNum = parseInt(year);
    
    if (yearNum > currentYear) {
      alert("Please enter a year in the past.");
      return false;
    }
    if (yearNum < minYear) {
      alert(`Please enter a year greater than or equal to ${minYear}.`);
      return false;
    }
    return true;
  };

  const validateFile = (file: File | null) => {
    if (!file) {
      alert("Please Upload Authority Signature");
      return false;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert("Invalid file type. Please upload JPG, JPEG, or PNG files only.");
      return false;
    }

    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxFileSize) {
      alert("File size exceeds 2MB. Please upload a smaller file.");
      return false;
    }

    return true;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <u>DECK CRANE 40M</u>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Ship */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <Label className="text-base font-medium">Ship</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ship" className="text-sm font-medium">Ship: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.ship}
                    onValueChange={(value) => handleInputChange('ship', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 2: Date of Inspection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <Label className="text-base font-medium">Date of Inspection/Trials</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_of_inspection" className="text-sm font-medium">Date of Inspection: <span className="text-red-500">*</span></Label>
                  <Input
                    id="date_of_inspection"
                    type="date"
                    value={formData.date_of_inspection}
                    onChange={(e) => handleInputChange('date_of_inspection', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Make & Model */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-base font-medium">Make & Model</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make_model" className="text-sm font-medium">Make & Model: <span className="text-red-500">*</span></Label>
                  <Input
                    id="make_model"
                    value={formData.make_model}
                    onChange={(e) => handleInputChange('make_model', e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Type */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <Label className="text-base font-medium">Type</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">Type: <span className="text-red-500">*</span></Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Year of Manufacture */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                <Label className="text-base font-medium">Year of Manufacture</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year_of_manufacture" className="text-sm font-medium">Year of Manufacture: <span className="text-red-500">*</span></Label>
                  <Input
                    id="year_of_manufacture"
                    type="number"
                    value={formData.year_of_manufacture}
                    onChange={(e) => handleInputChange('year_of_manufacture', e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value && !validateYear(e.target.value)) {
                        e.target.value = '';
                        setFormData(prev => ({ ...prev, year_of_manufacture: '' }));
                      }
                    }}
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Ref Documents */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-base font-medium">Ref Documents</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ref_documents" className="text-sm font-medium">Ref Documents: <span className="text-red-500">*</span></Label>
                  <Input
                    id="ref_documents"
                    value={formData.ref_documents}
                    onChange={(e) => handleInputChange('ref_documents', e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 7: Maintenance Routines */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-base font-medium">Maintenance Routines i.a.w Maintop & OEM Manual</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.maintenance_observations}
                    onValueChange={(value) => handleInputChange('maintenance_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.maintenance_remarks}
                    onChange={(e) => handleInputChange('maintenance_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 8: Lifting Capacity */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-base font-medium">Lifting Capacity</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.lifting_capacity_observations}
                    onValueChange={(value) => handleInputChange('lifting_capacity_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.lifting_capacity_remarks}
                    onChange={(e) => handleInputChange('lifting_capacity_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 9: Load Testing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-base font-medium">Load Testing i.a.w INBR 1552</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.load_testing_observations}
                    onValueChange={(value) => handleInputChange('load_testing_observations', value)}
                  >
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
                <div className="space-y-2">
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

            {/* Section 10: Structure */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-base font-medium">Structure</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.structure_observations}
                    onValueChange={(value) => handleInputChange('structure_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.structure_remarks}
                    onChange={(e) => handleInputChange('structure_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 11: Wire Ropes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-base font-medium">Wire Ropes</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.wire_ropes_observations}
                    onValueChange={(value) => handleInputChange('wire_ropes_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.wire_ropes_remarks}
                    onChange={(e) => handleInputChange('wire_ropes_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 12: Oil */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-base font-medium">Oil</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.oil_observations}
                    onValueChange={(value) => handleInputChange('oil_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.oil_remarks}
                    onChange={(e) => handleInputChange('oil_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 13: Greasing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-base font-medium">Greasing</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.greasing_observations}
                    onValueChange={(value) => handleInputChange('greasing_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.greasing_remarks}
                    onChange={(e) => handleInputChange('greasing_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 14: Oil/Grease Levels */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-base font-medium">Oil/Grease Levels</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.oil_grease_levels_observations}
                    onValueChange={(value) => handleInputChange('oil_grease_levels_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.oil_grease_levels_remarks}
                    onChange={(e) => handleInputChange('oil_grease_levels_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 15: Electrical Checks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-base font-medium">Electrical Checks</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.electrical_checks_observations}
                    onValueChange={(value) => handleInputChange('electrical_checks_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.electrical_checks_remarks}
                    onChange={(e) => handleInputChange('electrical_checks_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 16: Electrical Checks by ETMA */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">16</span>
                <Label className="text-base font-medium">Electrical Checks By ETMA</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.electrical_checks_etma_observations}
                    onValueChange={(value) => handleInputChange('electrical_checks_etma_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.electrical_checks_etma_remarks}
                    onChange={(e) => handleInputChange('electrical_checks_etma_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 17: Visual Inspection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">17</span>
                <Label className="text-base font-medium">Visual Inspection</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.visual_inspection_observations}
                    onValueChange={(value) => handleInputChange('visual_inspection_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.visual_inspection_remarks}
                    onChange={(e) => handleInputChange('visual_inspection_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 18: Operation Checks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">18</span>
                <Label className="text-base font-medium">Operation Checks</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Observations: <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.operation_checks_observations}
                    onValueChange={(value) => handleInputChange('operation_checks_observations', value)}
                  >
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.operation_checks_remarks}
                    onChange={(e) => handleInputChange('operation_checks_remarks', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 19: Other Observations */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">19</span>
                <Label className="text-base font-medium">Other Observations</Label>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
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

            {/* Section 20: Overall Remarks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">20</span>
                <Label className="text-base font-medium">Overall Remarks</Label>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Remarks: <span className="text-red-500">*</span></Label>
                  <Textarea
                    value={formData.overall_remarks_textarea}
                    onChange={(e) => handleInputChange('overall_remarks_textarea', e.target.value)}
                    rows={2}
                    maxLength={1000}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 21: Authority Signature */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">21</span>
                <Label className="text-base font-medium">Authority Signature</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authority_signature" className="text-sm font-medium">Authority Signature: <span className="text-red-500">*</span></Label>
                  <Input
                    id="authority_signature"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-xs text-gray-500">Accepted formats: JPG, JPEG, PNG (Max 2MB)</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={() => window.location.reload()}>
                Clear
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeckCrane40MForm;
