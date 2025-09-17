import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AptTrialProtocolForm = () => {
  const [formData, setFormData] = useState({
    ship: "",
    dateOfInspection: "",
    authorityInspection: "",
    inspectionDate: "",
    aptCycle: "",
    totalCompartments: "",
    aptProvedWithoutBlanking: "",
    aptProvedWithBlanking: "",
    balanceCompartments: "",
    shipStaffName: "",
    shipRankName: "",
    shipDesignationName: "",
    hituName: "",
    hituRankName: "",
    hituDesignationName: "",
    authoritySignature: null as File | null,
    authoritySignatureHitu: null as File | null,
  });

  const [tableData, setTableData] = useState({
    clusterData: [{ compartment: "", cluster: "", locationStart: "", locationEnd: "", lastAptCorrection: "", remarks: "" }],
    compartmentData: [{ name: "", deckNo: "", frStnStart: "", frStnEnd: "" }],
    borderingData: [{ compartment: "", frStnStart: "", frStnEnd: "", aptDate: "" }],
    repsData: [{ rank: "", name: "", designation: "" }],
    visualData: [{ compartment: "", observations: "" }],
    approvedData: [{ compartment: "", location: "", frStnStart: "", frStnEnd: "", authorityBlanking: "" }],
    aptDetailsData: [{ compartment: "", designPressure: "", achievedPressure: "", designDrop: "", actualDrop: "", remarks: "" }],
    otherData: [{ compartment: "", observations: "", remarks: "" }],
    overallData: [{ compartment: "", recommendation: "", remarks: "" }],
  });

  const [rowCounts, setRowCounts] = useState({
    cluster: 1,
    compartment: 1,
    bordering: 1,
    reps: 1,
    visual: 1,
    approved: 1,
    aptDetails: 1,
    other: 1,
    overall: 1,
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

  const handleTableDataChange = (tableType: string, index: number, field: string, value: string) => {
    setTableData(prev => ({
      ...prev,
      [tableType]: prev[tableType].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleRowCountChange = (tableType: string, count: number) => {
    const newCount = Math.max(1, count);
    setRowCounts(prev => ({ ...prev, [tableType]: newCount }));
    
    // Update table data array length
    const currentData = tableData[tableType as keyof typeof tableData];
    const newData = [...currentData];
    
    while (newData.length < newCount) {
      newData.push({} as any);
    }
    while (newData.length > newCount) {
      newData.pop();
    }
    
    setTableData(prev => ({
      ...prev,
      [tableType]: newData
    }));
  };

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSaveDraft = () => {
    const draftData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formData: { ...formData },
      tableData: { ...tableData },
      rowCounts: { ...rowCounts }
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('aptTrialProtocolDrafts') || '[]');
    const updatedDrafts = [...existingDrafts, draftData];
    localStorage.setItem('aptTrialProtocolDrafts', JSON.stringify(updatedDrafts));
    
    alert('Draft saved successfully!');
  };

  const handleFetchDrafts = () => {
    const existingDrafts = JSON.parse(localStorage.getItem('aptTrialProtocolDrafts') || '[]');
    setDrafts(existingDrafts);
    setIsDraftModalOpen(true);
  };

  const handleEditDraft = (draft: any) => {
    setFormData(draft.formData);
    setTableData(draft.tableData);
    setRowCounts(draft.rowCounts);
    setHidDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('aptTrialProtocolDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('aptTrialProtocolDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      dateOfInspection: "",
      authorityInspection: "",
      inspectionDate: "",
      aptCycle: "",
      totalCompartments: "",
      aptProvedWithoutBlanking: "",
      aptProvedWithBlanking: "",
      balanceCompartments: "",
      shipStaffName: "",
      shipRankName: "",
      shipDesignationName: "",
      hituName: "",
      hituRankName: "",
      hituDesignationName: "",
      authoritySignature: null,
      authoritySignatureHitu: null,
    });
    
    setTableData({
      clusterData: [{ compartment: "", cluster: "", locationStart: "", locationEnd: "", lastAptCorrection: "", remarks: "" }],
      compartmentData: [{ name: "", deckNo: "", frStnStart: "", frStnEnd: "" }],
      borderingData: [{ compartment: "", frStnStart: "", frStnEnd: "", aptDate: "" }],
      repsData: [{ rank: "", name: "", designation: "" }],
      visualData: [{ compartment: "", observations: "" }],
      approvedData: [{ compartment: "", location: "", frStnStart: "", frStnEnd: "", authorityBlanking: "" }],
      aptDetailsData: [{ compartment: "", designPressure: "", achievedPressure: "", designDrop: "", actualDrop: "", remarks: "" }],
      otherData: [{ compartment: "", observations: "", remarks: "" }],
      overallData: [{ compartment: "", recommendation: "", remarks: "" }],
    });
    
    setRowCounts({
      cluster: 1,
      compartment: 1,
      bordering: 1,
      reps: 1,
      visual: 1,
      approved: 1,
      aptDetails: 1,
      other: 1,
      overall: 1,
    });
    
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = [
      'ship', 'dateOfInspection', 'authorityInspection', 'inspectionDate', 'aptCycle',
      'totalCompartments', 'aptProvedWithoutBlanking', 'aptProvedWithBlanking', 'balanceCompartments',
      'shipStaffName', 'shipRankName', 'shipDesignationName', 'hituName', 'hituRankName', 'hituDesignationName'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    if (!formData.authoritySignature || !formData.authoritySignatureHitu) {
      alert('Please upload both authority signatures');
      return;
    }
    
    console.log("APT Trial Protocol Form submitted:", { formData, tableData, rowCounts });
    alert('Form submitted successfully!');
  };

  const renderTable = (tableType: string, headers: any[], fields: string[]) => {
    const data = tableData[tableType as keyof typeof tableData];
    const count = rowCounts[tableType as keyof typeof rowCounts];
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label className="font-semibold">Enter Total Number of Rows:</Label>
          <Input
            type="number"
            value={count}
            onChange={(e) => handleRowCountChange(tableType, parseInt(e.target.value) || 1)}
            min="1"
            max="20"
            className="w-20"
          />
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr No.</TableHead>
                {headers.map((header, index) => {
                  if (typeof header === 'object' && header.colspan) {
                    return (
                      <TableHead key={index} colSpan={header.colspan} className="text-center">
                        {header.text}
                      </TableHead>
                    );
                  }
                  return (
                    <TableHead key={index}>
                      {header}
                    </TableHead>
                  );
                })}
              </TableRow>
              {/* Sub-header row for grouped columns */}
              {tableType === 'clusterData' && (
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Start*</TableHead>
                  <TableHead>End*</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              )}
              {tableType === 'compartmentData' && (
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Start*</TableHead>
                  <TableHead>End*</TableHead>
                </TableRow>
              )}
              {tableType === 'borderingData' && (
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Start*</TableHead>
                  <TableHead>End*</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              )}
              {tableType === 'approvedData' && (
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Start*</TableHead>
                  <TableHead>End*</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              )}
              {tableType === 'aptDetailsData' && (
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>(mm of water column)</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              )}
            </TableHeader>
            <TableBody>
              {Array.from({ length: count }, (_, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  {fields.map((field, fieldIndex) => (
                    <TableCell key={fieldIndex}>
                      <Input
                        value={data[index]?.[field] || ""}
                        onChange={(e) => handleTableDataChange(tableType, index, field, e.target.value)}
                        maxLength={field.includes("remarks") ? 100 : 20}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-blue-600 mb-2">APT TRIAL PROTOCOL</h4>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">INSPECTION AND TRIALS</h2>
            </div>
          <form onSubmit={handleSubmit} className="space-y-8">
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

            {/* Section 3: Authority for Inspection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-lg font-semibold">Authority For Inspection <span className="text-red-500">*</span></Label>
              </div>
              <Input
                value={formData.authorityInspection}
                onChange={(e) => handleInputChange("authorityInspection", e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {/* Section 4: Inspection Date */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                <Label className="text-lg font-semibold">Inspection Date <span className="text-red-500">*</span></Label>
              </div>
              <Input
                type="date"
                value={formData.inspectionDate}
                onChange={(e) => handleInputChange("inspectionDate", e.target.value)}
                required
              />
            </div>

            {/* Section 5: APT Cycle */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                <Label className="text-lg font-semibold">APT Cycle <span className="text-red-500">*</span></Label>
              </div>
              <Input
                value={formData.aptCycle}
                onChange={(e) => handleInputChange("aptCycle", e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {/* Section 6: Cluster No./ Fr Stn offered for APT */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                <Label className="text-lg font-semibold">Cluster No./ Fr Stn offered for APT</Label>
              </div>
              {renderTable("clusterData", 
                ["Compartment*", "Cluster No.*", {text: "Location / Frame Station", colspan: 2}, "Last APT Correction*", "Remarks*"],
                ["compartment", "cluster", "locationStart", "locationEnd", "lastAptCorrection", "remarks"]
              )}
            </div>

            {/* Section 7: List of Compartments Within Cluster */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                <Label className="text-lg font-semibold">List of Compartments Within Cluster</Label>
              </div>
              {renderTable("compartmentData",
                ["Name*", "Deck No.*", {text: "Frame Station", colspan: 2}],
                ["name", "deckNo", "frStnStart", "frStnEnd"]
              )}
            </div>

            {/* Section 8: Bordering Compartments/ Clusters */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                <Label className="text-lg font-semibold">Bordering Compartments/ Clusters</Label>
              </div>
              {renderTable("borderingData",
                ["Compartments / Cluster / BulkHead*", {text: "Frame Station", colspan: 2}, "APT/AHT Last Correction Date*"],
                ["compartment", "frStnStart", "frStnEnd", "aptDate"]
              )}
            </div>

            {/* Section 9: Reps Present */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                <Label className="text-lg font-semibold">Reps Present</Label>
              </div>
              {renderTable("repsData",
                ["Rank*", "Name*", "Designation*"],
                ["rank", "name", "designation"]
              )}
            </div>

            {/* Section 10: Observation During Visual Inspection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">10</span>
                <Label className="text-lg font-semibold">Observation During Visual Inspection of Cluster Boundaries</Label>
              </div>
              {renderTable("visualData",
                ["WT Compartment / Cluster*", "Observations*"],
                ["compartment", "observations"]
              )}
            </div>

            {/* Section 11: Approved/ Original / Additional Blanking List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">11</span>
                <Label className="text-lg font-semibold">Approved/ Original / Additional Blanking List</Label>
              </div>
              {renderTable("approvedData",
                ["Compartments / Cluster*", "Location*", {text: "Frame Station*", colspan: 2}, "Authority of Blanking*"],
                ["compartment", "location", "frStnStart", "frStnEnd", "authorityBlanking"]
              )}
            </div>

            {/* Section 12: Details of APT */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">12</span>
                <Label className="text-lg font-semibold">Details of APT</Label>
              </div>
              {renderTable("aptDetailsData",
                ["Compartment / Cluster*", "Design Pressure*", "Achieved Pressure*", "Design Drop*", "Actual Drop*", "Remarks"],
                ["compartment", "designPressure", "achievedPressure", "designDrop", "actualDrop", "remarks"]
              )}
            </div>

            {/* Section 13: Other Observations */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">13</span>
                <Label className="text-lg font-semibold">Other Observations</Label>
              </div>
              {renderTable("otherData",
                ["Compartment / Cluster*", "Observations*", "Remarks*"],
                ["compartment", "observations", "remarks"]
              )}
            </div>

            {/* Section 14: Overall Remarks and Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">14</span>
                <Label className="text-lg font-semibold">Overall Remarks and Recommendations</Label>
              </div>
              {renderTable("overallData",
                ["Compartment / Cluster*", "Recommendations*", "Remarks*"],
                ["compartment", "recommendation", "remarks"]
              )}
            </div>

            {/* Section 15: Present Status of APT */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">15</span>
                <Label className="text-lg font-semibold">Present Status of APT of WT Compartments/ Clusters During Present Cycle</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">(a) Total Compartments Cluster <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    value={formData.totalCompartments}
                    onChange={(e) => handleInputChange("totalCompartments", e.target.value)}
                    placeholder="Enter a number only"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">(b) APT Proved Without Blanking <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    value={formData.aptProvedWithoutBlanking}
                    onChange={(e) => handleInputChange("aptProvedWithoutBlanking", e.target.value)}
                    placeholder="Enter a number only"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">(c) APT Proved With Blanking <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    value={formData.aptProvedWithBlanking}
                    onChange={(e) => handleInputChange("aptProvedWithBlanking", e.target.value)}
                    placeholder="Enter a number only"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">(d) Balance Compartment / Clusters <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    value={formData.balanceCompartments}
                    onChange={(e) => handleInputChange("balanceCompartments", e.target.value)}
                    placeholder="Enter a number only"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 16: Signatures */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">16</span>
                <Label className="text-lg font-semibold">Signatures</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ship Staff */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">(Ship Staff)</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Name <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.shipStaffName}
                        onChange={(e) => handleInputChange("shipStaffName", e.target.value)}
                        maxLength={20}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Rank <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.shipRankName}
                        onChange={(e) => handleInputChange("shipRankName", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Designation <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.shipDesignationName}
                        onChange={(e) => handleInputChange("shipDesignationName", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Signature of Authority <span className="text-red-500">*</span></Label>
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("authoritySignature", e)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* HITU */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">(Hull Inspector) HITU</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Name <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.hituName}
                        onChange={(e) => handleInputChange("hituName", e.target.value)}
                        maxLength={20}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Rank <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.hituRankName}
                        onChange={(e) => handleInputChange("hituRankName", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Designation <span className="text-red-500">*</span></Label>
                      <Input
                        value={formData.hituDesignationName}
                        onChange={(e) => handleInputChange("hituDesignationName", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Signature of Authority <span className="text-red-500">*</span></Label>
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("authoritySignatureHitu", e)}
                        required
                      />
                    </div>
                  </div>
                </div>
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
                    <TableHead>Ship</TableHead>
                    <TableHead>APT Cycle</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={draft.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.formData.ship || "No Ship Data"}</TableCell>
                      <TableCell>{draft.formData.aptCycle || "No APT Cycle Data"}</TableCell>
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

export default AptTrialProtocolForm;
