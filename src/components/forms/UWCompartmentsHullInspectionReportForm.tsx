import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { get, post } from '@/lib/api';
import MultiColumnTable from './HullMaintenanceInspectionforShipsForm/MultiColumnTable';
import DeleteDialog from '@/components/ui/delete-dialog';
import { useDeleteDialog } from '@/hooks/use-delete-dialog';

interface Vessel {
  id: number;
  name: string;
  code: string;
  classofvessel: {
    id: number;
    name: string;
    code: string;
  };
  vesseltype: {
    id: number;
    name: string;
    code: string;
  };
  yard: {
    id: number;
    name: string;
    code: string;
  };
  command: {
    id: number;
    name: string;
    code: string;
  };
  year_of_build: number;
  year_of_delivery: number;
}

interface Compartment {
  id: number;
  code: string;
  name: string;
  active: number;
  created_on: string;
  created_ip: string;
  modified_on: string;
  modified_ip: string | null;
  remark: string | null;
  ser: string | null;
  numbers: string | null;
  location: string | null;
  equipment: string | null;
  features: string | null;
  layout: string | null;
  special_requirements: string | null;
  standards: string | null;
  created_by: number;
  modified_by: number | null;
}

interface CompartmentInspectionData {
  tankCompartment: string;
  observation: string;
  recommendation: string;
  remarks: string;
}

interface ObservationData {
  section: string;
  sr_no: number;
  observation?: string;
  remarks?: string;
  compartment_id?: number;
  recommendation?: string;
  name?: string;
  rank?: string;
  designation?: string;
}


interface UWCompartmentsData {
  // Basic Information
  vesselId: string;
  inspectionIns: string;
  dateOfInspection: Date | null;
  authority: string;
  
  // Reusable Table Data
  compartmentInspectionRows: number;
  compartmentInspectionData: CompartmentInspectionData[];
  
  // Dynamic Tables
  
  // Summary Data
  totalNumberOfUWCompartment: string;
  noOfUWCompartmentOffered: string;
  noOfCompartmentInspected: string;
  totalNoOfCompartmentSat: string;
  totalNoOfCompartmentUnsat: string;
  
  totalNoOfTanks: string;
  noOfTanksOffered: string;
  noOfTanksInspected: string;
  totalNoOfTanksSat: string;
  totalNoOfTanksUnsat: string;
  totalNoOfTanksSatStar: string;
  
  // Observations array for API
  observations: ObservationData[];
}

interface FormErrors {
  [key: string]: string;
}

interface DraftData {
  id: string;
  title: string;
  data: UWCompartmentsData;
  timestamp: string;
}

const UWCompartmentsHullInspectionReportForm: React.FC = () => {
  const [formData, setFormData] = useState<UWCompartmentsData>({
    vesselId: '',
    inspectionIns: '',
    dateOfInspection: null,
    authority: '',
    compartmentInspectionRows: 0,
    compartmentInspectionData: [],
    totalNumberOfUWCompartment: '',
    noOfUWCompartmentOffered: '',
    noOfCompartmentInspected: '',
    totalNoOfCompartmentSat: '',
    totalNoOfCompartmentUnsat: '',
    totalNoOfTanks: '',
    noOfTanksOffered: '',
    noOfTanksInspected: '',
    totalNoOfTanksSat: '',
    totalNoOfTanksUnsat: '',
    totalNoOfTanksSatStar: '',
    observations: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  
  // Vessel API state
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loadingVessels, setLoadingVessels] = useState(false);
  const [vesselError, setVesselError] = useState<string | null>(null);
  
  const [compartments, setCompartments] = useState<Compartment[]>([]);
  const [loadingCompartments, setLoadingCompartments] = useState(false);
  const [compartmentError, setCompartmentError] = useState<string | null>(null);
  
  // Draft and API states
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);
  const [apiDrafts, setApiDrafts] = useState<any[]>([]);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // Delete dialog hook
  const deleteDialog = useDeleteDialog({
    onConfirm: async (itemId) => {
      if (itemId) {
        await handleDelete(itemId as number);
      }
    },
    title: "Delete Record",
    description: "Are you sure you want to delete this record? This action cannot be undone.",
    confirmText: "Delete Record",
    cancelText: "Cancel"
  });
  const [inspectionDate, setInspectionDate] = useState<Date | undefined>();

  // Fetch vessels from API
  useEffect(() => {
    const fetchVessels = async () => {
      setLoadingVessels(true);
      setVesselError(null);
      try {
        const response = await get('master/vessels/');
        // Handle the API response structure
        if (response && response.data && Array.isArray(response.data)) {
          setVessels(response.data);
        } else if (Array.isArray(response)) {
          setVessels(response);
        } else {
          console.warn('Unexpected vessels response structure:', response);
          setVessels([]);
          setVesselError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching vessels:', error);
        setVesselError('Failed to load vessels data');
        setVessels([]);
      } finally {
        setLoadingVessels(false);
      }
    };

    fetchVessels();
  }, []);

  // Fetch compartments from API
  useEffect(() => {
    const fetchCompartments = async () => {
      setLoadingCompartments(true);
      setCompartmentError(null);
      try {
        const response = await get('master/compartments/');
        console.log('Compartments API response:', response);
        
        if (response && response.data && Array.isArray(response.data)) {
          setCompartments(response.data);
        } else if (Array.isArray(response)) {
          setCompartments(response);
        } else {
          console.warn('Unexpected compartments response structure:', response);
          setCompartments([]);
          setCompartmentError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching compartments:', error);
        setCompartmentError('Failed to load compartments data');
        setCompartments([]);
      } finally {
        setLoadingCompartments(false);
      }
    };

    fetchCompartments();
  }, []);

  const handleVesselChange = (vesselId: string) => {
    handleInputChange('vesselId', vesselId);
  };

  // Get compartment options for dropdown
  const getCompartmentOptions = () => {
    return compartments.map(compartment => ({
      value: compartment.id.toString(),
      label: `${compartment.name} (${compartment.code})`
    }));
  };

  const handleInputChange = (field: keyof UWCompartmentsData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If this is a row count field, adjust the corresponding data array
      if (field === 'compartmentInspectionRows') {
        const newRowCount = value as number;
        const currentData = prev.compartmentInspectionData || [];
        
        if (newRowCount > currentData.length) {
          // Add new empty rows
          const newRows = Array.from({ length: newRowCount - currentData.length }, () => ({
            tankCompartment: '',
            observation: '',
            recommendation: '',
            remarks: ''
          }));
          newData.compartmentInspectionData = [...currentData, ...newRows];
        } else if (newRowCount < currentData.length) {
          // Remove excess rows
          newData.compartmentInspectionData = currentData.slice(0, newRowCount);
        }
      }
      
      return newData;
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // API handlers for buttons and popup
  const handleFetchDrafts = async () => {
    setIsLoadingDrafts(true);
    try {
      const response = await get('hitumodule/uw-compartments-hull-inspection-reports/');
      
      // Handle the API response structure
      if (response && response.data && Array.isArray(response.data)) {
        setApiDrafts(response.data);
      } else if (Array.isArray(response)) {
        setApiDrafts(response);
      } else {
        console.warn('Unexpected drafts response structure:', response);
        setApiDrafts([]);
      }
      
      setIsDraftModalOpen(true);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      alert('Error fetching drafts. Please try again.');
    } finally {
      setIsLoadingDrafts(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      // Prepare observations array from compartment inspection data
      const observations: ObservationData[] = [];
      
      
      // Add compartment observations
      formData.compartmentInspectionData.forEach((compartment, index) => {
        if (compartment.tankCompartment || compartment.observation) {
          observations.push({
            section: 'UW_COMPARTMENTS',
            sr_no: index + 1,
            compartment_id: index + 1,
            observation: compartment.observation,
            remarks: compartment.remarks,
            recommendation: compartment.recommendation
          });
        }
      });

      const payload = {
        vessel_id: parseInt(formData.vesselId),
        dt_inspection: inspectionDate ? format(inspectionDate, 'yyyy-MM-dd') : '',
        total_uw_compartments: parseInt(formData.totalNumberOfUWCompartment) || 0,
        no_of_uw_compartments_offered: parseInt(formData.noOfUWCompartmentOffered) || 0,
        no_of_uw_compartments_inspected: parseInt(formData.noOfCompartmentInspected) || 0,
        toal_compartment_sat: parseInt(formData.totalNoOfCompartmentSat) || 0,
        total_compartment_unsat: parseInt(formData.totalNoOfCompartmentUnsat) || 0,
        total_tanks: parseInt(formData.totalNoOfTanks) || 0,
        no_of_tanks_offered: parseInt(formData.noOfTanksOffered) || 0,
        no_of_tanks_inspected: parseInt(formData.noOfTanksInspected) || 0,
        total_tanks_sat: parseInt(formData.totalNoOfTanksSat) || 0,
        total_tanks_unsat: parseInt(formData.totalNoOfTanksUnsat) || 0,
        total_tanks_sat_unmapped: parseInt(formData.totalNoOfTanksSatStar) || 0,
        draft_status: 'draft',
        observations: observations
      };

      const response = await post('hitumodule/uw-compartments-hull-inspection-reports/', payload);
      if (response.success) {
        alert('Draft saved successfully!');
      } else {
        alert('Error saving draft: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleClear = () => {
    setFormData({
      vesselId: '',
      inspectionIns: '',
      dateOfInspection: null,
      authority: '',
      compartmentInspectionRows: 0,
      compartmentInspectionData: [],
      totalNumberOfUWCompartment: '',
      noOfUWCompartmentOffered: '',
      noOfCompartmentInspected: '',
      totalNoOfCompartmentSat: '',
      totalNoOfCompartmentUnsat: '',
      totalNoOfTanks: '',
      noOfTanksOffered: '',
      noOfTanksInspected: '',
      totalNoOfTanksSat: '',
      totalNoOfTanksUnsat: '',
      totalNoOfTanksSatStar: '',
      observations: []
    });
    setInspectionDate(undefined);
    setEditingRecord(null);
    setErrors({});
  };

  const handleEdit = (record: any) => {
    console.log('=== HANDLE EDIT DEBUG ===');
    console.log('handleEdit called with record:', record);
    console.log('record.observations:', record.observations);
    
    setEditingRecord(record);
    
    // Process observations data to extract compartment inspection data
    let compartmentInspectionData: CompartmentInspectionData[] = [];
    let compartmentInspectionRows = 0;
    
    if (record.observations && Array.isArray(record.observations)) {
      // Filter observations for UW_COMPARTMENTS section (excluding inspector data)
      const uwCompartmentsObs = record.observations.filter((obs: any) => 
        obs.section === 'UW_COMPARTMENTS' && !(obs.name || obs.rank || obs.designation)
      );
      
      if (uwCompartmentsObs.length > 0) {
        compartmentInspectionData = uwCompartmentsObs.map((obs: any) => ({
          tankCompartment: obs.compartment?.id?.toString() || '',
          observation: obs.observation || '',
          recommendation: obs.recommendation || '',
          remarks: obs.remarks || ''
        }));
        compartmentInspectionRows = uwCompartmentsObs.length;
      }
      
      // Filter observations for inspector data (UW_COMPARTMENTS section with specific pattern)
      // We need to identify which observations are inspector data vs compartment data
      // For now, we'll look for observations that have name/rank/designation fields
    }
    
    console.log('Processed compartment inspection data:', compartmentInspectionData);
    console.log('Compartment inspection rows:', compartmentInspectionRows);
    
    setFormData({
      vesselId: record.vessel?.id?.toString() || '',
      inspectionIns: record.inspection_ins || '',
      dateOfInspection: record.dt_inspection ? new Date(record.dt_inspection) : null,
      authority: record.authority || '',
      compartmentInspectionRows: compartmentInspectionRows,
      compartmentInspectionData: compartmentInspectionData,
      totalNumberOfUWCompartment: record.total_uw_compartments?.toString() || '',
      noOfUWCompartmentOffered: record.no_of_uw_compartments_offered?.toString() || '',
      noOfCompartmentInspected: record.no_of_uw_compartments_inspected?.toString() || '',
      totalNoOfCompartmentSat: record.toal_compartment_sat?.toString() || '',
      totalNoOfCompartmentUnsat: record.total_compartment_unsat?.toString() || '',
      totalNoOfTanks: record.total_tanks?.toString() || '',
      noOfTanksOffered: record.no_of_tanks_offered?.toString() || '',
      noOfTanksInspected: record.no_of_tanks_inspected?.toString() || '',
      totalNoOfTanksSat: record.total_tanks_sat?.toString() || '',
      totalNoOfTanksUnsat: record.total_tanks_unsat?.toString() || '',
      totalNoOfTanksSatStar: record.total_tanks_sat_unmapped?.toString() || '',
      observations: record.observations || []
    });
    
    if (record.dt_inspection) {
      setInspectionDate(new Date(record.dt_inspection));
    }
    
    setIsDraftModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      // Make API call to delete - same pattern as final form
      const payload = { id: id, delete: true };
      await post('hitumodule/uw-compartments-hull-inspection-reports/', payload);
      
      // Remove from local state
      setApiDrafts(prev => prev.filter(draft => draft.id !== id));
      
      // If we're editing this record, clear the form
      if (editingRecord && editingRecord.id === id) {
        setEditingRecord(null);
        handleClear();
      }
      
      // alert('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record:', error);
      // alert('Error deleting record. Please try again.');
      throw error; // Re-throw to let the dialog handle the error state
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

    return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called, editingRecord:', editingRecord);
    
    try {
      // Prepare observations array from compartment inspection data
      const observations: ObservationData[] = [];
      
      
      // Add compartment observations
      formData.compartmentInspectionData.forEach((compartment, index) => {
        if (compartment.tankCompartment || compartment.observation) {
          observations.push({
            section: 'UW_COMPARTMENTS',
            sr_no: index + 1,
            compartment_id: index + 1,
            observation: compartment.observation,
            remarks: compartment.remarks,
            recommendation: compartment.recommendation
          });
        }
      });

      const payload = {
        vessel_id: parseInt(formData.vesselId),
        dt_inspection: inspectionDate ? format(inspectionDate, 'yyyy-MM-dd') : '',
        total_uw_compartments: parseInt(formData.totalNumberOfUWCompartment) || 0,
        no_of_uw_compartments_offered: parseInt(formData.noOfUWCompartmentOffered) || 0,
        no_of_uw_compartments_inspected: parseInt(formData.noOfCompartmentInspected) || 0,
        toal_compartment_sat: parseInt(formData.totalNoOfCompartmentSat) || 0,
        total_compartment_unsat: parseInt(formData.totalNoOfCompartmentUnsat) || 0,
        total_tanks: parseInt(formData.totalNoOfTanks) || 0,
        no_of_tanks_offered: parseInt(formData.noOfTanksOffered) || 0,
        no_of_tanks_inspected: parseInt(formData.noOfTanksInspected) || 0,
        total_tanks_sat: parseInt(formData.totalNoOfTanksSat) || 0,
        total_tanks_unsat: parseInt(formData.totalNoOfTanksUnsat) || 0,
        total_tanks_sat_unmapped: parseInt(formData.totalNoOfTanksSatStar) || 0,
        draft_status: 'save',
        observations: observations
      };

      let response;
      
      if (editingRecord) {
        // Update existing record
        const updatePayload = {
          ...payload,
          id: editingRecord.id
        };
        console.log('Making UPDATE call with payload:', updatePayload);
        response = await post('hitumodule/uw-compartments-hull-inspection-reports/', updatePayload);
        console.log('Update API response:', response);
        alert('Record updated successfully!');
      } else {
        // Create new record
        console.log('Making CREATE call with payload:', payload);
        response = await post('hitumodule/uw-compartments-hull-inspection-reports/', payload);
        console.log('Create API response:', response);
        alert('Record saved successfully!');
      }

      // Clear form after successful submission
      handleClear();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="max-w-full min-h-screen">
      
        <div className="bg-white shadow-lg rounded-lg">
          {/* Header Section */}
          <div className="bg-[#c7d9f0] text-black px-6 py-4">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-3xl font-semibold underline">U/W COMPARTMENTS INSPECTION REPORT - INS</h2>
              
              {/* Vessel Selection */}
                <Select
                value={formData.vesselId} 
                onValueChange={handleVesselChange}
                disabled={loadingVessels}
                >
                <SelectTrigger className="px-3 py-2 border border-gray-300 rounded w-auto">
                  <SelectValue placeholder={loadingVessels ? "Loading vessels..." : "--Select Vessel--"} />
                  </SelectTrigger>
                  <SelectContent>
                  {vesselError ? (
                    <SelectItem value="" disabled>
                      Error loading vessels
                      </SelectItem>
                  ) : (
                    vessels.map((vessel) => (
                      <SelectItem key={vessel.id} value={vessel.id.toString()}>
                        {vessel.name}
                      </SelectItem>
                    ))
                  )}
                  </SelectContent>
                </Select>
              </div>
            </div>

          {/* Header Information Section */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center bg-white p-3 border-b border-gray-300">
              <div className="w-48 text-sm font-medium text-gray-700">
                Date of Inspection<span className="text-red-500">*</span>
              </div>
              <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={`w-full justify-start text-left font-normal border border-gray-300 rounded px-3 py-2 hover:bg-white hover:text-gray-900 hover:border-gray-300 ${
                            !inspectionDate && "text-muted-foreground"
                          }`}
                        >
                        
                          {inspectionDate ? format(inspectionDate, "dd-MM-yyyy") : "DD-MM-YYYY"}
                        </button>
                      </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={inspectionDate || undefined}
                          onSelect={(date) => {
                            setInspectionDate(date);
                            handleInputChange('dateOfInspection', date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

          {/* Compartment Inspection Section */}
          <div className="bg-white border-b border-gray-200 p-6">
            <MultiColumnTable
              formData={formData}
              onInputChange={handleInputChange}
              onDataChange={(field, index, dataField, value) => {
                const updatedData = [...formData[field as keyof typeof formData] as any[]];
                updatedData[index] = {
                  ...updatedData[index],
                  [dataField]: value
                };
                setFormData(prev => ({ ...prev, [field]: updatedData }));
              }}
              rowsField="compartmentInspectionRows"
              dataField="compartmentInspectionData"
              columns={[
                { 
                  field: 'tankCompartment', 
                  label: 'Tanks/Compartment*', 
                  placeholder: 'Select compartment', 
                  required: true,
                  type: 'dropdown',
                  options: getCompartmentOptions()
                },
                { field: 'observation', label: 'Observation*', placeholder: 'Enter observation', required: true },
                { field: 'recommendation', label: 'Recommendation*', placeholder: 'Enter recommendation', required: true },
                { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
              ]}
            />
          </div>

          {/* Summary of Inspection Section */}
          <div className="bg-white border-b border-gray-200 pt-2 pb-6 px-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-black underline decoration-purple-500 decoration-2 underline-offset-2">
                SUMMARY OF INSPECTION OF U/W COMPARTMENTS AND TANKS
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Internal U/W Compartments Section */}
              <div className="">
                  <h4 className="text-lg font-bold text-black mb-4">INTERNAL U/W COMPARTMENTS</h4>
                
                <div className="space-y-0 border  rounded-lg p-0">
                  <div className="flex items-center justify-between p-3 border-b border-gray-200" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total Number of U/W Compartments<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNumberOfUWCompartment}
                       onChange={(e) => handleInputChange('totalNumberOfUWCompartment', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                       
                        />
                      </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">No. of U/W Compartments offered<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.noOfUWCompartmentOffered}
                       onChange={(e) => handleInputChange('noOfUWCompartmentOffered', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                       
                        />
                      </div>
                  
                  <div className="flex items-center justify-between p-3 border-b border-gray-200" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">No. of Compartments inspected<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.noOfCompartmentInspected}
                       onChange={(e) => handleInputChange('noOfCompartmentInspected', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                       
                        />
                      </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total number of Compartments-SAT/ SAT<span className="text-red-500">**</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNoOfCompartmentSat}
                       onChange={(e) => handleInputChange('totalNoOfCompartmentSat', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                      
                        />
                      </div>
                  
                  <div className="flex items-center justify-between p-3" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total number of Compartments-UNSAT<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNoOfCompartmentUnsat}
                       onChange={(e) => handleInputChange('totalNoOfCompartmentUnsat', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                      
                        />
                      </div>
                    </div>
                  </div>

              {/* Tanks Section */}
              <div className="">
                <h4 className="text-lg font-bold text-black mb-4">TANKS</h4>
                
                <div className="space-y-0 border p-0 rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b border-gray-200" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(a)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total Number of tanks<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNoOfTanks}
                       onChange={(e) => handleInputChange('totalNoOfTanks', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                      
                        />
                      </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(b)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">No. of tanks offered<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.noOfTanksOffered}
                       onChange={(e) => handleInputChange('noOfTanksOffered', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                       
                        />
                      </div>
                  
                  <div className="flex items-center justify-between p-3 border-b border-gray-200" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(c)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">No. of tanks inspected<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.noOfTanksInspected}
                       onChange={(e) => handleInputChange('noOfTanksInspected', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                      
                        />
                      </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(d)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total number of tanks-SAT/ SAT<span className="text-red-500">**</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNoOfTanksSat}
                       onChange={(e) => handleInputChange('totalNoOfTanksSat', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                      
                        />
                      </div>
                  
                  <div className="flex items-center justify-between p-3 border-b border-gray-200" style={{ backgroundColor: '#f2f2f2' }}>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(e)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total number of tanks-UNSAT<span className="text-red-500">*</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNoOfTanksUnsat}
                       onChange={(e) => handleInputChange('totalNoOfTanksUnsat', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                       
                        />
                      </div>
                  
                  <div className="flex items-center justify-between bg-white p-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">(f)</span>
                      <div className="mx-3 h-4 w-px bg-gray-400"></div>
                      <span className="text-sm font-medium text-gray-700">Total number of tanks-SAT<span className="text-red-500">**</span></span>
                    </div>
                        <Input
                       type="text"
                          value={formData.totalNoOfTanksSatStar}
                       onChange={(e) => handleInputChange('totalNoOfTanksSatStar', e.target.value)}
                       className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                       
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


        {/* Form Action Buttons */}
        <div className="bg-white border border-t-0 p-6 mt-0">
          <div className="flex justify-center space-x-4">
            <button
                  type="button"
              className="px-6 py-2 bg-blue-400 text-white font-bold rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleFetchDrafts}
              disabled={isLoadingDrafts}
            >
              {isLoadingDrafts ? 'Loading...' : 'Fetch Drafts'}
            </button>
            <button
                  type="button"
              className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSaveDraft}
              disabled={isSavingDraft || editingRecord}
            >
              {isSavingDraft ? 'Saving...' : 'Save Draft'}
            </button>
            <button
                  type="button"
              className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors"
              onClick={handleClear}
                >
                  Clear
            </button>
            <button
                  type="submit"
              className="px-6 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
            >
              {editingRecord ? 'Update' : 'Save'}
            </button>
        </div>
      </div>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl shadow-xl border-0 bg-white p-0 rounded-1xl">
          <DialogHeader className="bg-gradient-to-r from-[#1a2746] to-[#223366] p-4 text-white">
            <DialogTitle className="text-lg font-semibold">Draft Data</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 p-4">
            {apiDrafts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No drafts found.</p>
            ) : (
            <Table>
              <TableHeader>
                  <TableRow className="bg-[#1a2746] text-white">
                    <TableHead className="text-white font-bold">Sr No.</TableHead>
                    <TableHead className="text-white font-bold">INS</TableHead>
                    {/* <TableHead className="text-white font-bold">Address</TableHead> */}
                    <TableHead className="text-white font-bold">Created Date</TableHead>
                    <TableHead className="text-white font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {apiDrafts.map((draft, index) => (
                    <TableRow key={draft.id} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                    <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.vessel?.name || 'N/A'}</TableCell>
                      {/* <TableCell>{draft.auth_inspection || 'No Date Provided'}</TableCell> */}
                      <TableCell>{new Date(draft.created_on).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(draft)}
                          >
                            Edit
                        </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteDialog.openDialog({ 
                              id: draft.id, 
                              name: `Record ${draft.id}` 
                            })}
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
          <div className="flex justify-end gap-3 p-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsDraftModalOpen(false)}
              className="rounded-lg"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.closeDialog}
        onConfirm={deleteDialog.handleConfirm}
        title={deleteDialog.title}
        description={deleteDialog.description}
        itemName={deleteDialog.itemToDelete?.name}
        isLoading={deleteDialog.isLoading}
        confirmText={deleteDialog.confirmText}
        cancelText={deleteDialog.cancelText}
      />
    </div>
    </div>
  );
};

export default UWCompartmentsHullInspectionReportForm;
