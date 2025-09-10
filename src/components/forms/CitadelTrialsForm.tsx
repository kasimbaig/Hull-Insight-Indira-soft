import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CitadelTrialsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    inspection_date: "",
    inspection_type: "",
    ship: "",
    nbc_category: "",
    citadel_cluster: "",
    nbc_filter: "",
    filter_renewal_date: "",
    filter_due_date: "",
    total_rows: 1,
  });

  const [tableData, setTableData] = useState([
    {
      citadel_zone: "",
      pressure_design: "",
      pressure_achieved: "",
      bleed_valve: "",
      manual_local_op: "",
      remote_op: "",
      observations: "",
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTableDataChange = (index: number, field: string, value: string) => {
    setTableData(prev => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [field]: value
      };
      return newData;
    });
  };

  const handleTotalRowsChange = (value: string) => {
    const numRows = parseInt(value) || 1;
    setFormData(prev => ({ ...prev, total_rows: numRows }));
    
    // Adjust table data array
    const newTableData = [];
    for (let i = 0; i < numRows; i++) {
      newTableData[i] = tableData[i] || {
        citadel_zone: "",
        pressure_design: "",
        pressure_achieved: "",
        bleed_valve: "",
        manual_local_op: "",
        remote_op: "",
        observations: "",
      };
    }
    setTableData(newTableData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, tableData });
    alert("Form submitted successfully!");
  };

  const observationOptions = [
    { value: "0", label: "--Select--" },
    { value: "SAT", label: "SAT" },
    { value: "UNSAT", label: "UNSAT" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <u>CITADEL TRAILS</u>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Inspection Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <Label className="text-base font-medium">INSPECTION DETAILS</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(a)</span>
                    <Label htmlFor="inspection_date" className="text-sm font-medium">Date of Inspection: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="inspection_date"
                    type="date"
                    value={formData.inspection_date}
                    onChange={(e) => handleInputChange('inspection_date', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(b)</span>
                    <Label htmlFor="inspection_type" className="text-sm font-medium">Type of Inspection: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="inspection_type"
                    value={formData.inspection_type}
                    onChange={(e) => handleInputChange('inspection_type', e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Equipment Status */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <Label className="text-base font-medium">EQUIPMENT STATUS</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(a)</span>
                    <Label htmlFor="ship" className="text-sm font-medium">Ship (Ops/Refit): <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="ship"
                    value={formData.ship}
                    onChange={(e) => handleInputChange('ship', e.target.value)}
                    maxLength={10}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(b)</span>
                    <Label htmlFor="nbc_category" className="text-sm font-medium">NBC Category A/B/C/D: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="nbc_category"
                    value={formData.nbc_category}
                    onChange={(e) => handleInputChange('nbc_category', e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(c)</span>
                    <Label htmlFor="citadel_cluster" className="text-sm font-medium">Total No. of Citadel Cluster: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="citadel_cluster"
                    value={formData.citadel_cluster}
                    onChange={(e) => handleInputChange('citadel_cluster', e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(d)</span>
                    <Label htmlFor="nbc_filter" className="text-sm font-medium">No. of NBC Filter: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="nbc_filter"
                    value={formData.nbc_filter}
                    onChange={(e) => handleInputChange('nbc_filter', e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(e)</span>
                    <Label htmlFor="filter_renewal_date" className="text-sm font-medium">NBC Filter Renewal Date: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="filter_renewal_date"
                    type="date"
                    value={formData.filter_renewal_date}
                    onChange={(e) => handleInputChange('filter_renewal_date', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">(f)</span>
                    <Label htmlFor="filter_due_date" className="text-sm font-medium">NBC Filter Renewal Due On: <span className="text-red-500">*</span></Label>
                  </div>
                  <Input
                    id="filter_due_date"
                    type="date"
                    value={formData.filter_due_date}
                    onChange={(e) => handleInputChange('filter_due_date', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Trials Status */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <Label className="text-base font-medium">TRIALS STATUS</Label>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium">Enter Total Number of Rows:</Label>
                  <Input
                    type="number"
                    value={formData.total_rows}
                    onChange={(e) => handleTotalRowsChange(e.target.value)}
                    min="1"
                    max="50"
                    className="w-20"
                  />
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead rowSpan={2} className="text-center">Sr No.</TableHead>
                        <TableHead rowSpan={2} className="text-center">Citadel Zone <span className="text-red-500">*</span></TableHead>
                        <TableHead colSpan={2} className="text-center">Pressure in Water Column <span className="text-red-500">*</span></TableHead>
                        <TableHead colSpan={3} className="text-center">OPS / NON OPS <span className="text-red-500">*</span></TableHead>
                        <TableHead rowSpan={2} className="text-center">SAT / UNSAT <span className="text-red-500">*</span></TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-center">Designed as per TD 11356.360085.539 <span className="text-red-500">*</span></TableHead>
                        <TableHead className="text-center">Achieved <span className="text-red-500">*</span></TableHead>
                        <TableHead className="text-center">Bleed valve <span className="text-red-500">*</span></TableHead>
                        <TableHead className="text-center">Manual/Local Operation <span className="text-red-500">*</span></TableHead>
                        <TableHead className="text-center">Remote Operation <span className="text-red-500">*</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell>
                            <Input
                              value={row.citadel_zone}
                              onChange={(e) => handleTableDataChange(index, 'citadel_zone', e.target.value)}
                              maxLength={20}
                              required
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.pressure_design}
                              onChange={(e) => handleTableDataChange(index, 'pressure_design', e.target.value)}
                              maxLength={20}
                              required
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.pressure_achieved}
                              onChange={(e) => handleTableDataChange(index, 'pressure_achieved', e.target.value)}
                              maxLength={20}
                              required
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.bleed_valve}
                              onChange={(e) => handleTableDataChange(index, 'bleed_valve', e.target.value)}
                              maxLength={20}
                              required
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.manual_local_op}
                              onChange={(e) => handleTableDataChange(index, 'manual_local_op', e.target.value)}
                              maxLength={20}
                              required
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={row.remote_op}
                              onChange={(e) => handleTableDataChange(index, 'remote_op', e.target.value)}
                              maxLength={20}
                              required
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={row.observations}
                              onValueChange={(value) => handleTableDataChange(index, 'observations', value)}
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

export default CitadelTrialsForm;
