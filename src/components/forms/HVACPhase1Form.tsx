import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ACCompartment {
  id: string;
  srNo: string;
  servedByAC: string;
  compartmentName: string;
  noOfDucts: string;
  airFlow: string;
  ductArea: string;
  flowRateAtDucts: string;
  ertArea: string;
  totalAirFlowMeasured: string;
  remark: string;
}

interface MachineryCompartment {
  id: string;
  srNo: string;
  compartmentName: string;
  servedByBlower: string;
  noOfDucts: string;
  airFlow: string;
  ductArea: string;
  airFlowRate: string;
  totalAirFlowDesign: string;
  totalAirFlowMeasured: string;
  remark: string;
}

interface HVACPhase1FormData {
  ship: string;
  documentNo: string;
  dateOfConductOfTrials: string;
  locationOfConductOfTrials: string;
  acCompartments: ACCompartment[];
  machineryCompartments: MachineryCompartment[];
  authoritySignature: File | null;
}

const HVACPhase1Form = () => {
  const [formData, setFormData] = useState<HVACPhase1FormData>({
    ship: "",
    documentNo: "",
    dateOfConductOfTrials: "",
    locationOfConductOfTrials: "",
    acCompartments: [
      {
        id: "1",
        srNo: "1",
        servedByAC: "",
        compartmentName: "",
        noOfDucts: "",
        airFlow: "",
        ductArea: "",
        flowRateAtDucts: "",
        ertArea: "",
        totalAirFlowMeasured: "",
        remark: "",
      },
    ],
    machineryCompartments: [
      {
        id: "1",
        srNo: "1",
        compartmentName: "",
        servedByBlower: "",
        noOfDucts: "",
        airFlow: "",
        ductArea: "",
        airFlowRate: "",
        totalAirFlowDesign: "",
        totalAirFlowMeasured: "",
        remark: "",
      },
    ],
    authoritySignature: null,
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

  const handleInputChange = (field: keyof HVACPhase1FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleACCompartmentChange = (id: string, field: keyof ACCompartment, value: string) => {
    setFormData(prev => ({
      ...prev,
      acCompartments: prev.acCompartments.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    }));
  };

  const handleMachineryCompartmentChange = (id: string, field: keyof MachineryCompartment, value: string) => {
    setFormData(prev => ({
      ...prev,
      machineryCompartments: prev.machineryCompartments.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    }));
  };

  const addACCompartment = () => {
    const newId = (formData.acCompartments.length + 1).toString();
    const newCompartment: ACCompartment = {
      id: newId,
      srNo: newId,
      servedByAC: "",
      compartmentName: "",
      noOfDucts: "",
      airFlow: "",
      ductArea: "",
      flowRateAtDucts: "",
      ertArea: "",
      totalAirFlowMeasured: "",
      remark: "",
    };
    setFormData(prev => ({
      ...prev,
      acCompartments: [...prev.acCompartments, newCompartment]
    }));
  };

  const removeACCompartment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      acCompartments: prev.acCompartments.filter(comp => comp.id !== id)
    }));
  };

  const addMachineryCompartment = () => {
    const newId = (formData.machineryCompartments.length + 1).toString();
    const newCompartment: MachineryCompartment = {
      id: newId,
      srNo: newId,
      compartmentName: "",
      servedByBlower: "",
      noOfDucts: "",
      airFlow: "",
      ductArea: "",
      airFlowRate: "",
      totalAirFlowDesign: "",
      totalAirFlowMeasured: "",
      remark: "",
    };
    setFormData(prev => ({
      ...prev,
      machineryCompartments: [...prev.machineryCompartments, newCompartment]
    }));
  };

  const removeMachineryCompartment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      machineryCompartments: prev.machineryCompartments.filter(comp => comp.id !== id)
    }));
  };

  const handleSaveDraft = () => {
    // Implement draft saving logic
    console.log("Saving draft:", formData);
  };

  const handleFetchDrafts = () => {
    // Implement draft fetching logic
    setIsDraftModalOpen(true);
  };

  const handleClear = () => {
    setFormData({
      ship: "",
      documentNo: "",
      dateOfConductOfTrials: "",
      locationOfConductOfTrials: "",
      acCompartments: [
        {
          id: "1",
          srNo: "1",
          servedByAC: "",
          compartmentName: "",
          noOfDucts: "",
          airFlow: "",
          ductArea: "",
          flowRateAtDucts: "",
          ertArea: "",
          totalAirFlowMeasured: "",
          remark: "",
        },
      ],
      machineryCompartments: [
        {
          id: "1",
          srNo: "1",
          compartmentName: "",
          servedByBlower: "",
          noOfDucts: "",
          airFlow: "",
          ductArea: "",
          airFlowRate: "",
          totalAirFlowDesign: "",
          totalAirFlowMeasured: "",
          remark: "",
        },
      ],
      authoritySignature: null,
    });
    setHidDraftId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic
    console.log("Submitting form:", formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="border border-gray-300">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-2xl font-bold text-center text-blue-800">
              HVAC PHASE I
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ship" className="text-sm font-semibold">
                    Ship <span className="text-red-500">*</span>
                  </Label>
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

                <div className="space-y-2">
                  <Label htmlFor="documentNo" className="text-sm font-semibold">
                    Document No. <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="documentNo"
                    value={formData.documentNo}
                    onChange={(e) => handleInputChange("documentNo", e.target.value)}
                    maxLength={20}
                    placeholder="Enter document number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfConductOfTrials" className="text-sm font-semibold">
                    Date of Conduct of Trials <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfConductOfTrials"
                    type="date"
                    value={formData.dateOfConductOfTrials}
                    onChange={(e) => handleInputChange("dateOfConductOfTrials", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationOfConductOfTrials" className="text-sm font-semibold">
                    Location of Conduct of Trials <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="locationOfConductOfTrials"
                    value={formData.locationOfConductOfTrials}
                    onChange={(e) => handleInputChange("locationOfConductOfTrials", e.target.value)}
                    maxLength={20}
                    placeholder="Enter location"
                  />
                </div>
              </div>

              {/* AC Compartments Section */}
              <Card className="border border-gray-300">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="text-lg font-semibold text-center">
                    AIR FLOW MEASUREMENTS OF AC COMPARTMENTS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Enter Total Number of Rows:</span>
                      <Input
                        type="number"
                        value={formData.acCompartments.length}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 1;
                          if (count > formData.acCompartments.length) {
                            for (let i = formData.acCompartments.length; i < count; i++) {
                              addACCompartment();
                            }
                          } else if (count < formData.acCompartments.length) {
                            setFormData(prev => ({
                              ...prev,
                              acCompartments: prev.acCompartments.slice(0, count)
                            }));
                          }
                        }}
                        className="w-20"
                        min="1"
                      />
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead rowSpan={2} className="text-center">Sr No.</TableHead>
                            <TableHead rowSpan={2} className="text-center">Served by AC <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Compartment Name <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">No. of Ducts <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Air Flow(m/s) <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Duct Area <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Flow Rate at Ducts <span className="text-red-500">*</span></TableHead>
                            <TableHead colSpan={2} className="text-center">Total Air Flow in each Compartment <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Remarks <span className="text-red-500">*</span></TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-center">ERT/Benchmark Area <span className="text-red-500">*</span></TableHead>
                            <TableHead className="text-center">Measured <span className="text-red-500">*</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.acCompartments.map((compartment, index) => (
                            <TableRow key={compartment.id}>
                              <TableCell className="text-center">{index + 1}</TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.servedByAC}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "servedByAC", e.target.value)}
                                  maxLength={20}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.compartmentName}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "compartmentName", e.target.value)}
                                  maxLength={20}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.noOfDucts}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "noOfDucts", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.airFlow}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "airFlow", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.ductArea}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "ductArea", e.target.value)}
                                  maxLength={10}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.flowRateAtDucts}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "flowRateAtDucts", e.target.value)}
                                  maxLength={10}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.ertArea}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "ertArea", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.totalAirFlowMeasured}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "totalAirFlowMeasured", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.remark}
                                  onChange={(e) => handleACCompartmentChange(compartment.id, "remark", e.target.value)}
                                  maxLength={100}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Machinery Compartments Section */}
              <Card className="border border-gray-300">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="text-lg font-semibold text-center">
                    AIR FLOW MEASUREMENTS OF MACHINERY COMPARTMENTS/GENERAL COMPARTMENTS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Enter Total Number of Rows:</span>
                      <Input
                        type="number"
                        value={formData.machineryCompartments.length}
                        onChange={(e) => {
                          const count = parseInt(e.target.value) || 1;
                          if (count > formData.machineryCompartments.length) {
                            for (let i = formData.machineryCompartments.length; i < count; i++) {
                              addMachineryCompartment();
                            }
                          } else if (count < formData.machineryCompartments.length) {
                            setFormData(prev => ({
                              ...prev,
                              machineryCompartments: prev.machineryCompartments.slice(0, count)
                            }));
                          }
                        }}
                        className="w-20"
                        min="1"
                      />
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead rowSpan={2} className="text-center">Sr No.</TableHead>
                            <TableHead rowSpan={2} className="text-center">Compartment Name <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Served by Blower <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">No. of Ducts <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Air Flow(m/s) <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Duct Area <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Air Flow Rate <span className="text-red-500">*</span></TableHead>
                            <TableHead colSpan={2} className="text-center">Total Air Flow in each Compartment <span className="text-red-500">*</span></TableHead>
                            <TableHead rowSpan={2} className="text-center">Remarks <span className="text-red-500">*</span></TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-center">Design <span className="text-red-500">*</span></TableHead>
                            <TableHead className="text-center">Measured <span className="text-red-500">*</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {formData.machineryCompartments.map((compartment, index) => (
                            <TableRow key={compartment.id}>
                              <TableCell className="text-center">{index + 1}</TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.compartmentName}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "compartmentName", e.target.value)}
                                  maxLength={20}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.servedByBlower}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "servedByBlower", e.target.value)}
                                  maxLength={20}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.noOfDucts}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "noOfDucts", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.airFlow}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "airFlow", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.ductArea}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "ductArea", e.target.value)}
                                  maxLength={10}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.airFlowRate}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "airFlowRate", e.target.value)}
                                  maxLength={10}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.totalAirFlowDesign}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "totalAirFlowDesign", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.totalAirFlowMeasured}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "totalAirFlowMeasured", e.target.value)}
                                  maxLength={5}
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={compartment.remark}
                                  onChange={(e) => handleMachineryCompartmentChange(compartment.id, "remark", e.target.value)}
                                  maxLength={100}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Authority Signature */}
              <Card className="border border-gray-300">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="text-lg font-semibold text-center">
                    Authority Signature
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <Label htmlFor="authoritySignature" className="text-sm font-semibold">
                      Authority Signature <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="authoritySignature"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleInputChange("authoritySignature", e.target.files?.[0] || null)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center items-center pt-6 space-x-4">
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
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="bg-red-500 text-white hover:bg-red-600"
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
          </CardContent>
        </Card>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No.</TableHead>
                  <TableHead>Document No</TableHead>
                  <TableHead>Date of Conduct of trials</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{draft.documentNo}</TableCell>
                    <TableCell>{draft.dateOfConductOfTrials}</TableCell>
                    <TableCell>{draft.createdDate}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="mr-2">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
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

export default HVACPhase1Form;
