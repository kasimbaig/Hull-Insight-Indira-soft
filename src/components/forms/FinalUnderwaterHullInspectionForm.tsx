import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import ObservationsTable from './HullMaintenanceInspectionforShipsForm/ObservationsTable';
import ComplexTable from './HullMaintenanceInspectionforShipsForm/ComplexTable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get, post } from "@/lib/api";
import DeleteDialog from "@/components/ui/delete-dialog";
import { useDeleteDialog } from "@/hooks/use-delete-dialog";

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

const FinalUnderwaterHullInspectionForm = () => {
  const [formData, setFormData] = useState({
    final_inspection: "",
    dt_inspection: "",
    auth_inspection: "",
    report_no: "",
    ship_not_cleared_for_undocking: "",
    reoffer_inspection: "",
    final_observation: "",
    refit_authority: "",
    name_ship_staff: "",
    rank_ship_staff: "",
    dsg_ship_staff: "",
    name_refitting_auth: "",
    rank_refitting_auth: "",
    dsg_refitting_auth: "",
    name_hitu_inspector: "",
    rank_hitu_inspector: "",
    dsg_hitu_inspector: "",
    
    // Defects/Observations - Section (a)
    defectsObservationsARows: 0,
    defectsObservationsAData: [],
    
    // Defects/Observations - Section (b)
    defectsObservationsBRows: 0,
    defectsObservationsBData: [],
    
    // Defects/Observations - Section (c)
    defectsObservationsCRows: 0,
    defectsObservationsCData: [],
    
    // Defects/Observations - Section (i)
    defectsObservationsIRows: 0,
    defectsObservationsIData: [],
    
    // Defects/Observations - Section (ii)
    defectsObservationsIIRows: 0,
    defectsObservationsIIData: [],
    
    // Defects/Observations - Section (d) - Text input
    refitAuthorityConfirmation: "",
    
    // Defects/Observations - Section (e)
    defectsObservationsERows: 0,
    defectsObservationsEData: [],
  });

  const [inspectors, setInspectors] = useState([
    { name: "", rank: "", designation: "" }
  ]);

  // Vessel API state
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loadingVessels, setLoadingVessels] = useState(false);
  const [vesselError, setVesselError] = useState<string | null>(null);

  // Station API state
  const [stations, setStations] = useState<any[]>([]);
  const [loadingStations, setLoadingStations] = useState(false);
  const [stationError, setStationError] = useState<string | null>(null);

  const [doiData, setDoiData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [ssIntData, setSsIntData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [ssConfirmData, setSsConfirmData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [fitmentData, setFitmentData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [sstData, setSstData] = useState([
    { location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }
  ]);

  const [freshDefects, setFreshDefects] = useState([""]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [hidDraftId, setHidDraftId] = useState("");
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
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

  // Fetch stations from API
  useEffect(() => {
    const fetchStations = async () => {
      setLoadingStations(true);
      setStationError(null);
      try {
        const response = await get('master/stations/');
        // Handle the API response structure
        if (response && response.data && Array.isArray(response.data)) {
          setStations(response.data);
        } else if (response && response.results && Array.isArray(response.results)) {
          setStations(response.results);
        } else if (Array.isArray(response)) {
          setStations(response);
        } else {
          console.warn('Unexpected stations response structure:', response);
          setStations([]);
          setStationError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
        setStationError('Failed to load stations data');
        setStations([]);
      } finally {
        setLoadingStations(false);
      }
    };

    fetchStations();
  }, []);

  const handleVesselChange = (vesselId: string) => {
    const selectedVessel = vessels.find(vessel => vessel.id.toString() === vesselId);
    handleInputChange("final_inspection", vesselId);
    // You can also store vessel name if needed
    // handleInputChange("vesselName", selectedVessel?.name || '');
  };

  // Transform stations data for dropdowns
  const getStationOptions = () => {
    if (loadingStations) {
      return [{ value: '', label: 'Loading stations...' }];
    }
    if (stationError) {
      return [{ value: '', label: 'Error loading stations' }];
    }
    return stations.map(station => ({
      value: station.id.toString(),
      label: `${station.name} (${station.command_name})`
    }));
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If this is a row count field, adjust the corresponding data array
      const rowCountFields = [
        'defectsObservationsARows', 'defectsObservationsBRows', 'defectsObservationsCRows',
        'defectsObservationsIRows', 'defectsObservationsIIRows', 'defectsObservationsERows'
      ];
      
      if (rowCountFields.includes(field)) {
        const newRowCount = parseInt(value) || 0;
        const dataField = field.replace('Rows', 'Data');
        const currentData = Array.isArray(prev[dataField as keyof typeof prev]) ? prev[dataField as keyof typeof prev] as any[] : [];
        
        if (field === 'defectsObservationsERows') {
          // Section (e) uses simple observation field
          if (newRowCount > currentData.length) {
            const newRows = Array.from({ length: newRowCount - currentData.length }, () => ({
              observation: ''
            }));
            (newData as any)[dataField] = [...currentData, ...newRows];
          } else if (newRowCount < currentData.length) {
            (newData as any)[dataField] = currentData.slice(0, newRowCount);
          }
        } else {
          // Other sections use full table structure
          if (newRowCount > currentData.length) {
            const newRows = Array.from({ length: newRowCount - currentData.length }, () => ({
              location: '',
              frameStationFrom: '',
              frameStationTo: '',
              observation: '',
              finalRemarks: ''
            }));
            (newData as any)[dataField] = [...currentData, ...newRows];
          } else if (newRowCount < currentData.length) {
            (newData as any)[dataField] = currentData.slice(0, newRowCount);
          }
        }
      }
      
      return newData;
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleDataChange = (field: string, index: number, dataField: 'location' | 'frameStationFrom' | 'frameStationTo' | 'observation' | 'finalRemarks', value: string) => {
    setFormData(prev => {
      const fieldData = prev[field as keyof typeof prev];
      if (Array.isArray(fieldData)) {
        return {
          ...prev,
          [field]: fieldData.map((item: any, i: number) => 
            i === index ? { ...item, [dataField]: value } : item
          )
        };
      }
      return prev;
    });
  };


  const handleSaveDraft = async () => {
    if (!formData.final_inspection || !formData.dt_inspection || !formData.auth_inspection) {
      // alert("Please fill in INS, Date of Inspection, and Authority for Inspection before saving draft.");
      return;
    }
    
    setIsSavingDraft(true);
    try {
      // Prepare observations array from dynamic table data
      const observations = [];
      
      // Add DOI observations
      doiData.forEach((item, index) => {
        if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
          observations.push({
            section: "DOI",
            sr_no: index + 1,
            compartment_id: 1, // Default compartment ID
            location: item.location || "",
            frame_station_from_id: parseInt(item.frame_station_from) || 0,
            frame_station_to_id: parseInt(item.frame_station_to) || 0,
            observation: item.observation || "",
            remarks: item.remarks || ""
          });
        }
      });

      // Add SS INT observations
      ssIntData.forEach((item, index) => {
        if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
          observations.push({
            section: "SS_INT",
            sr_no: index + 1,
            compartment_id: 2,
            location: item.location || "",
            frame_station_from_id: parseInt(item.frame_station_from) || 0,
            frame_station_to_id: parseInt(item.frame_station_to) || 0,
            observation: item.observation || "",
            remarks: item.remarks || ""
          });
        }
      });

      // Add SS CONFIRM observations
      ssConfirmData.forEach((item, index) => {
        if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
          observations.push({
            section: "SS_CONFIRM",
            sr_no: index + 1,
            compartment_id: 3,
            location: item.location || "",
            frame_station_from_id: parseInt(item.frame_station_from) || 0,
            frame_station_to_id: parseInt(item.frame_station_to) || 0,
            observation: item.observation || "",
            remarks: item.remarks || ""
          });
        }
      });

      // Add FITMENT observations
      fitmentData.forEach((item, index) => {
        if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
          observations.push({
            section: "FITMENT",
            sr_no: index + 1,
            compartment_id: 4,
            location: item.location || "",
            frame_station_from_id: parseInt(item.frame_station_from) || 0,
            frame_station_to_id: parseInt(item.frame_station_to) || 0,
            observation: item.observation || "",
            remarks: item.remarks || ""
          });
        }
      });

      // Add SST observations
      sstData.forEach((item, index) => {
        if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
          observations.push({
            section: "SST",
            sr_no: index + 1,
            compartment_id: 5,
            location: item.location || "",
            frame_station_from_id: parseInt(item.frame_station_from) || 0,
            frame_station_to_id: parseInt(item.frame_station_to) || 0,
            observation: item.observation || "",
            remarks: item.remarks || ""
          });
        }
      });

      // Add Fresh Defects observations
      freshDefects.forEach((defect, index) => {
        if (defect.trim()) {
          observations.push({
            section: "FRESH_DEFECTS",
            sr_no: index + 1,
            compartment_id: 6,
            location: "",
            frame_station_from_id: 0,
            frame_station_to_id: 0,
            observation: defect,
            remarks: ""
          });
        }
      });

      // Add REFIT_AUTHORITY_CONFIRMATION to observations
      if (formData.refitAuthorityConfirmation && formData.refitAuthorityConfirmation.trim()) {
        observations.push({
          section: "REFIT_AUTHORITY_CONFIRMATION",
          remarks: formData.refitAuthorityConfirmation
        });
      }

      // Prepare the API payload
      const payload = {
        vessel_id: parseInt(formData.final_inspection) || 0,
        dt_inspection: convertDateForAPI(formData.dt_inspection),
        report_no: formData.report_no || `FUHIR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        ship_not_cleaerd_for_undocking: formData.ship_not_cleared_for_undocking === "YES",
        final_observation: formData.final_observation || "",
        reoffer_date: formData.reoffer_inspection || "",
        draft_status: "draft",
        observations: observations
      };

      // Make API call
      const response = await post('hitumodule/final-underwater-hull-inspection-reports/', payload);
      
      // Also save to localStorage for local draft management
      const draftData = {
        id: Date.now().toString(),
        title: `Draft - ${formData.final_inspection || 'Untitled'} - ${new Date().toLocaleDateString()}`,
        data: formData,
        createdAt: new Date().toISOString(),
        apiResponse: response
      };

      const existingDrafts = JSON.parse(localStorage.getItem('finalUnderwaterHullInspectionDrafts') || '[]');
      const updatedDrafts = [...existingDrafts, draftData];
      localStorage.setItem('finalUnderwaterHullInspectionDrafts', JSON.stringify(updatedDrafts));
      setDrafts(updatedDrafts);
      
      // alert('Draft saved successfully to server and locally!');
      
    } catch (error) {
      console.error('Error saving draft:', error);
      // alert('Error saving draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleFetchDrafts = async () => {
    setIsLoadingDrafts(true);
    try {
      const response = await get('hitumodule/final-underwater-hull-inspection-reports/');
      
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
      // alert('Error fetching drafts. Please try again.');
    } finally {
      setIsLoadingDrafts(false);
    }
  };

  const handleEdit = (record: any) => {
    console.log('=== HANDLE EDIT DEBUG ===');
    console.log('handleEdit called with record:', record);
    console.log('record.id:', record.id);
    console.log('record.pk:', record.pk);
    console.log('record.ID:', record.ID);
    console.log('All record keys:', Object.keys(record));
    setEditingRecord(record);
    
    // Convert API date format from "2025-09-17" to "dd-MM-yyyy"
    const convertDateFormat = (apiDate: string) => {
      if (!apiDate) return '';
      const date = new Date(apiDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // Convert API record data to form data format
    const formDataFromApi = {
      final_inspection: record.vessel?.id?.toString() || '',
      dt_inspection: convertDateFormat(record.dt_inspection),
      auth_inspection: record.auth_inspection || '',
      report_no: record.report_no || '',
      ship_not_cleared_for_undocking: record.ship_not_cleaerd_for_undocking ? 'YES' : 'NO',
      reoffer_inspection: record.reoffer_date || '',
      final_observation: record.final_observation || '',
      refit_authority: record.refit_authority_confirmation || '',
      name_ship_staff: record.name_ship_staff || '',
      rank_ship_staff: record.rank_ship_staff || '',
      dsg_ship_staff: record.dsg_ship_staff || '',
      name_refitting_auth: record.name_refitting_auth || '',
      rank_refitting_auth: record.rank_refitting_auth || '',
      dsg_refitting_auth: record.dsg_refitting_auth || '',
      name_hitu_inspector: record.name_hitu_inspector || '',
      rank_hitu_inspector: record.rank_hitu_inspector || '',
      dsg_hitu_inspector: record.dsg_hitu_inspector || '',
      
      // Defects/Observations - Section (a)
      defectsObservationsARows: 0,
      defectsObservationsAData: [],
      
      // Defects/Observations - Section (b)
      defectsObservationsBRows: 0,
      defectsObservationsBData: [],
      
      // Defects/Observations - Section (c)
      defectsObservationsCRows: 0,
      defectsObservationsCData: [],
      
      // Defects/Observations - Section (i)
      defectsObservationsIRows: 0,
      defectsObservationsIData: [],
      
      // Defects/Observations - Section (ii)
      defectsObservationsIIRows: 0,
      defectsObservationsIIData: [],
      
      // Defects/Observations - Section (d) - Text input
      refitAuthorityConfirmation: "",
      
      // Defects/Observations - Section (e)
      defectsObservationsERows: 0,
      defectsObservationsEData: [],
    };

    // Set inspectors data
    const inspectorsData = [
      {
        name: record.name_hitu_inspector || '',
        rank: record.rank_hitu_inspector || '',
        designation: record.dsg_hitu_inspector || ''
      }
    ];
    setInspectors(inspectorsData);
    
    // Process observations data
    console.log('Record observations:', record.observations);
    if (record.observations && Array.isArray(record.observations)) {
      const doiObs = record.observations.filter((obs: any) => obs.section === 'DOI');
      const ssIntObs = record.observations.filter((obs: any) => obs.section === 'SS_INT');
      const ssConfirmObs = record.observations.filter((obs: any) => obs.section === 'SS_CONFIRM');
      const fitmentObs = record.observations.filter((obs: any) => obs.section === 'FITMENT');
      const sstObs = record.observations.filter((obs: any) => obs.section === 'SST');
      const freshDefectsObs = record.observations.filter((obs: any) => obs.section === 'FRESH_DEFECTS');
      
      // Handle DEFECTS_OBS sections
      const defectsObsA = record.observations.filter((obs: any) => obs.section === 'DEFECTS_OBS_A');
      const defectsObsB = record.observations.filter((obs: any) => obs.section === 'DEFECTS_OBS_B');
      const defectsObsC = record.observations.filter((obs: any) => obs.section === 'DEFECTS_OBS_C');
      const defectsObsI = record.observations.filter((obs: any) => obs.section === 'DEFECTS_OBS_I');
      const defectsObsII = record.observations.filter((obs: any) => obs.section === 'DEFECTS_OBS_II');
      
      // Handle REFIT_AUTHORITY_CONFIRMATION
      const refitAuthorityObs = record.observations.filter((obs: any) => obs.section === 'REFIT_AUTHORITY_CONFIRMATION');

      setDoiData(doiObs.length > 0 ? doiObs.map((obs: any) => ({
        location: obs.location || '',
        frame_station_from: obs.frame_station_from_id?.toString() || '',
        frame_station_to: obs.frame_station_to_id?.toString() || '',
        observation: obs.observation || '',
        remarks: obs.remarks || ''
      })) : [{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);

      setSsIntData(ssIntObs.length > 0 ? ssIntObs.map((obs: any) => ({
        location: obs.location || '',
        frame_station_from: obs.frame_station_from_id?.toString() || '',
        frame_station_to: obs.frame_station_to_id?.toString() || '',
        observation: obs.observation || '',
        remarks: obs.remarks || ''
      })) : [{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);

      setSsConfirmData(ssConfirmObs.length > 0 ? ssConfirmObs.map((obs: any) => ({
        location: obs.location || '',
        frame_station_from: obs.frame_station_from_id?.toString() || '',
        frame_station_to: obs.frame_station_to_id?.toString() || '',
        observation: obs.observation || '',
        remarks: obs.remarks || ''
      })) : [{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);

      setFitmentData(fitmentObs.length > 0 ? fitmentObs.map((obs: any) => ({
        location: obs.location || '',
        frame_station_from: obs.frame_station_from_id?.toString() || '',
        frame_station_to: obs.frame_station_to_id?.toString() || '',
        observation: obs.observation || '',
        remarks: obs.remarks || ''
      })) : [{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);

      setSstData(sstObs.length > 0 ? sstObs.map((obs: any) => ({
        location: obs.location || '',
        frame_station_from: obs.frame_station_from_id?.toString() || '',
        frame_station_to: obs.frame_station_to_id?.toString() || '',
        observation: obs.observation || '',
        remarks: obs.remarks || ''
      })) : [{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);

      setFreshDefects(freshDefectsObs.length > 0 ? freshDefectsObs.map((obs: any) => obs.observation) : [""]);
      
      // Process DEFECTS_OBS sections
      const processDefectsObs = (observations: any[]) => {
        return observations.map((obs: any) => ({
          location: obs.location || '',
          frameStationFrom: obs.frame_station_from?.id?.toString() || '',
          frameStationTo: obs.frame_station_to?.id?.toString() || '',
          observation: obs.observation || '',
          finalRemarks: obs.remarks || ''
        }));
      };
      
      // Update form data with DEFECTS_OBS sections
      const updatedFormData = {
        ...formDataFromApi,
        defectsObservationsARows: defectsObsA.length,
        defectsObservationsAData: processDefectsObs(defectsObsA),
        defectsObservationsBRows: defectsObsB.length,
        defectsObservationsBData: processDefectsObs(defectsObsB),
        defectsObservationsCRows: defectsObsC.length,
        defectsObservationsCData: processDefectsObs(defectsObsC),
        defectsObservationsIRows: defectsObsI.length,
        defectsObservationsIData: processDefectsObs(defectsObsI),
        defectsObservationsIIRows: defectsObsII.length,
        defectsObservationsIIData: processDefectsObs(defectsObsII),
        refitAuthorityConfirmation: refitAuthorityObs.length > 0 ? refitAuthorityObs[0].remarks || '' : ''
      };
      
      setFormData(updatedFormData);
      
    } else {
      // No observations data, set default empty values
      console.log('No observations data found, setting default values');
      setDoiData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
      setSsIntData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
      setSsConfirmData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
      setFitmentData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
      setSstData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
      setFreshDefects([""]);
    }
    
    setIsDraftModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      // Make API call to delete - same pattern as preliminary form
      const payload = { id: id, delete: true };
      await post('hitumodule/final-underwater-hull-inspection-reports/', payload);
      
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

  const handleClear = () => {
    setEditingRecord(null);
    setFormData({
      final_inspection: "",
      dt_inspection: "",
      auth_inspection: "",
      report_no: "",
      ship_not_cleared_for_undocking: "",
      reoffer_inspection: "",
      final_observation: "",
      refit_authority: "",
      name_ship_staff: "",
      rank_ship_staff: "",
      dsg_ship_staff: "",
      name_refitting_auth: "",
      rank_refitting_auth: "",
      dsg_refitting_auth: "",
      name_hitu_inspector: "",
      rank_hitu_inspector: "",
      dsg_hitu_inspector: "",
      
      // Defects/Observations - Section (a)
      defectsObservationsARows: 0,
      defectsObservationsAData: [],
      
      // Defects/Observations - Section (b)
      defectsObservationsBRows: 0,
      defectsObservationsBData: [],
      
      // Defects/Observations - Section (c)
      defectsObservationsCRows: 0,
      defectsObservationsCData: [],
      
      // Defects/Observations - Section (i)
      defectsObservationsIRows: 0,
      defectsObservationsIData: [],
      
      // Defects/Observations - Section (ii)
      defectsObservationsIIRows: 0,
      defectsObservationsIIData: [],
      
      // Defects/Observations - Section (d) - Text input
      refitAuthorityConfirmation: "",
      
      // Defects/Observations - Section (e)
      defectsObservationsERows: 0,
      defectsObservationsEData: [],
    });
    setInspectors([{ name: "", rank: "", designation: "" }]);
    setDoiData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setSsIntData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setSsConfirmData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setFitmentData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setSstData([{ location: "", frame_station_from: "", frame_station_to: "", observation: "", remarks: "" }]);
    setFreshDefects([""]);
    setErrors({});
  };

  // Convert date from DD-MM-YYYY to YYYY-MM-DD format
  const convertDateForAPI = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateString;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called, editingRecord:', editingRecord);
    
    // Skip all validation - make all fields non-mandatory
    console.log('Skipping validation, proceeding with API call');
    
    try {
        // Prepare observations array from dynamic table data
        const observations = [];
        
        // Add DOI observations
        doiData.forEach((item, index) => {
          if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
            observations.push({
              section: "DOI",
              sr_no: index + 1,
              compartment_id: 1,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frame_station_from) || 0,
              frame_station_to_id: parseInt(item.frame_station_to) || 0,
              observation: item.observation || "",
              remarks: item.remarks || ""
            });
          }
        });

        // Add SS INT observations
        ssIntData.forEach((item, index) => {
          if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
            observations.push({
              section: "SS_INT",
              sr_no: index + 1,
              compartment_id: 2,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frame_station_from) || 0,
              frame_station_to_id: parseInt(item.frame_station_to) || 0,
              observation: item.observation || "",
              remarks: item.remarks || ""
            });
          }
        });

        // Add SS CONFIRM observations
        ssConfirmData.forEach((item, index) => {
          if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
            observations.push({
              section: "SS_CONFIRM",
              sr_no: index + 1,
              compartment_id: 3,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frame_station_from) || 0,
              frame_station_to_id: parseInt(item.frame_station_to) || 0,
              observation: item.observation || "",
              remarks: item.remarks || ""
            });
          }
        });

        // Add FITMENT observations
        fitmentData.forEach((item, index) => {
          if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
            observations.push({
              section: "FITMENT",
              sr_no: index + 1,
              compartment_id: 4,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frame_station_from) || 0,
              frame_station_to_id: parseInt(item.frame_station_to) || 0,
              observation: item.observation || "",
              remarks: item.remarks || ""
            });
          }
        });

        // Add SST observations
        sstData.forEach((item, index) => {
          if (item.location || item.frame_station_from || item.frame_station_to || item.observation || item.remarks) {
            observations.push({
              section: "SST",
              sr_no: index + 1,
              compartment_id: 5,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frame_station_from) || 0,
              frame_station_to_id: parseInt(item.frame_station_to) || 0,
              observation: item.observation || "",
              remarks: item.remarks || ""
            });
          }
        });

        // Add Fresh Defects observations
        freshDefects.forEach((defect, index) => {
          if (defect.trim()) {
            observations.push({
              section: "FRESH_DEFECTS",
              sr_no: index + 1,
              compartment_id: 6,
              location: "",
              frame_station_from_id: 0,
              frame_station_to_id: 0,
              observation: defect,
              remarks: ""
            });
          }
        });

        // Add DEFECTS/OBSERVATIONS Section (a) - Confirmation on observations / defects of intermediate U/W hull inspection
        formData.defectsObservationsAData.forEach((item, index) => {
          if (item.location || item.frameStationFrom || item.frameStationTo || item.observation || item.finalRemarks) {
            observations.push({
              section: "DEFECTS_OBS_A",
              sr_no: index + 1,
              compartment_id: 7,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frameStationFrom) || 0,
              frame_station_to_id: parseInt(item.frameStationTo) || 0,
              observation: item.observation || "",
              remarks: item.finalRemarks || ""
            });
          }
        });

        // Add DEFECTS/OBSERVATIONS Section (b)
        formData.defectsObservationsBData.forEach((item, index) => {
          if (item.location || item.frameStationFrom || item.frameStationTo || item.observation || item.finalRemarks) {
            observations.push({
              section: "DEFECTS_OBS_B",
              sr_no: index + 1,
              compartment_id: 8,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frameStationFrom) || 0,
              frame_station_to_id: parseInt(item.frameStationTo) || 0,
              observation: item.observation || "",
              remarks: item.finalRemarks || ""
            });
          }
        });

        // Add DEFECTS/OBSERVATIONS Section (c)
        formData.defectsObservationsCData.forEach((item, index) => {
          if (item.location || item.frameStationFrom || item.frameStationTo || item.observation || item.finalRemarks) {
            observations.push({
              section: "DEFECTS_OBS_C",
              sr_no: index + 1,
              compartment_id: 9,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frameStationFrom) || 0,
              frame_station_to_id: parseInt(item.frameStationTo) || 0,
              observation: item.observation || "",
              remarks: item.finalRemarks || ""
            });
          }
        });

        // Add DEFECTS/OBSERVATIONS Section (i)
        formData.defectsObservationsIData.forEach((item, index) => {
          if (item.location || item.frameStationFrom || item.frameStationTo || item.observation || item.finalRemarks) {
            observations.push({
              section: "DEFECTS_OBS_I",
              sr_no: index + 1,
              compartment_id: 10,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frameStationFrom) || 0,
              frame_station_to_id: parseInt(item.frameStationTo) || 0,
              observation: item.observation || "",
              remarks: item.finalRemarks || ""
            });
          }
        });

        // Add DEFECTS/OBSERVATIONS Section (ii)
        formData.defectsObservationsIIData.forEach((item, index) => {
          if (item.location || item.frameStationFrom || item.frameStationTo || item.observation || item.finalRemarks) {
            observations.push({
              section: "DEFECTS_OBS_II",
              sr_no: index + 1,
              compartment_id: 11,
              location: item.location || "",
              frame_station_from_id: parseInt(item.frameStationFrom) || 0,
              frame_station_to_id: parseInt(item.frameStationTo) || 0,
              observation: item.observation || "",
              remarks: item.finalRemarks || ""
            });
          }
        });

        // Add DEFECTS/OBSERVATIONS Section (e) - Fresh defects / observations
        formData.defectsObservationsEData.forEach((item, index) => {
          if (item.observation) {
            observations.push({
              section: "DEFECTS_OBS_E",
              sr_no: index + 1,
              compartment_id: 12,
              observation: item.observation || ""
            });
          }
        });

        // Add REFIT_AUTHORITY_CONFIRMATION to observations
        if (formData.refitAuthorityConfirmation && formData.refitAuthorityConfirmation.trim()) {
          observations.push({
            section: "REFIT_AUTHORITY_CONFIRMATION",
            remarks: formData.refitAuthorityConfirmation
          });
        }

        // Prepare the API payload
        const payload = {
          vessel_id: parseInt(formData.final_inspection) || 0,
          dt_inspection: convertDateForAPI(formData.dt_inspection),
          report_no: formData.report_no || `FUHIR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
          ship_not_cleaerd_for_undocking: formData.ship_not_cleared_for_undocking === "YES",
          final_observation: formData.final_observation || "",
          reoffer_date: formData.reoffer_inspection || "",
          draft_status: editingRecord ? "save" : "draft",
          observations: observations
        };

        let response;
        console.log('About to make API call, editingRecord:', editingRecord);
        console.log('Payload:', payload);
        
        if (editingRecord) {
          // Update existing record - only send changed fields with ID
          console.log('=== UPDATE DEBUG INFO ===');
          console.log('editingRecord:', editingRecord);
          console.log('editingRecord.id:', editingRecord.id);
          console.log('editingRecord.id type:', typeof editingRecord.id);
          console.log('editingRecord.id value:', editingRecord.id);
          
          // Ensure ID is always included
          const recordId = editingRecord.id || editingRecord.pk || editingRecord.ID;
          console.log('Final recordId to use:', recordId);
          
          // Create base payload with ID - always include ID
          const updatePayload: any = {
            id: recordId
          };
          
          console.log('Base payload with ID:', updatePayload);
          
          // Only add fields that have changed or are essential
          if (formData.final_inspection !== editingRecord.vessel?.id?.toString()) {
            updatePayload.vessel_id = parseInt(formData.final_inspection) || 0;
          }
          
          if (formData.dt_inspection !== editingRecord.dt_inspection) {
            updatePayload.dt_inspection = convertDateForAPI(formData.dt_inspection);
          }
          
          if (formData.auth_inspection !== editingRecord.auth_inspection) {
            updatePayload.auth_inspection = formData.auth_inspection || "";
          }
          
          if (formData.report_no !== editingRecord.report_no) {
            updatePayload.report_no = formData.report_no || `FUHIR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
          }
          
          if (formData.ship_not_cleared_for_undocking !== (editingRecord.ship_not_cleaerd_for_undocking ? 'YES' : 'NO')) {
            updatePayload.ship_not_cleaerd_for_undocking = formData.ship_not_cleared_for_undocking === "YES";
          }
          
          if (formData.reoffer_inspection !== editingRecord.reoffer_date) {
            updatePayload.reoffer_date = formData.reoffer_inspection || "";
          }
          
          if (formData.final_observation !== editingRecord.final_observation) {
            updatePayload.final_observation = formData.final_observation || "";
          }
          
          
          // Always include observations if they exist
          if (observations.length > 0) {
            updatePayload.observations = observations;
          }
          
          // Always set draft_status for updates
          updatePayload.draft_status = "save";
          
          console.log('=== FINAL PAYLOAD DEBUG ===');
          console.log('Final updatePayload:', updatePayload);
          console.log('Final payload ID:', updatePayload.id);
          console.log('Final payload keys:', Object.keys(updatePayload));
          console.log('Making UPDATE call with payload:', updatePayload);
          response = await post('hitumodule/final-underwater-hull-inspection-reports/', updatePayload);
          console.log('Update API response:', response);
          // alert('Record updated successfully!');
        } else {
          // Create new record
          console.log('Making CREATE call with payload:', payload);
          response = await post('hitumodule/final-underwater-hull-inspection-reports/', payload);
          console.log('Create API response:', response);
          // alert('Record saved successfully!');
        }

        // Clear form after successful submission
        handleClear();
        
      } catch (error) {
        console.error('Error submitting form:', error);
        // alert('Error submitting form. Please try again.');
    }
  };


  return (
    <div className="max-w-full min-h-screen">
      <div className=" mx-auto">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-8">
            {/* Form Header */}
            <div className="bg-[#c7d9f0] text-black px-6 py-4">
              <div className="flex items-center justify-center gap-4">
                <h2 className="text-3xl font-semibold underline">FINAL UNDERWATER HULL INSPECTION - INS</h2>
                
                {/* Vessel Selection */}
                <Select
                  value={formData.final_inspection}
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
              {/* Date of Inspection */}
              <div className="flex items-center bg-white p-3 border-b border-gray-300">
                <div className="w-48 text-sm font-medium text-gray-700">
                  Date of Inspection<span className="text-red-500">*</span>
                </div>
                <div className="flex-1">
                    <Input
                    type="text"
                      value={formData.dt_inspection}
                      onChange={(e) => handleInputChange("dt_inspection", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    placeholder="DD-MM-YYYY"
                    required
                    />
                </div>
                  </div>
                  
              {/* Authority for Inspection */}
              <div className="flex items-center bg-[#f2f2f2] p-3">
                <div className="w-48 text-sm font-medium text-gray-700">
                  Authority for Inspection<span className="text-red-500">*</span>
                </div>
                <div className="flex-1">
                    <Input
                    type="text"
                      value={formData.auth_inspection}
                    onChange={(e) => handleInputChange("auth_inspection", e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    placeholder="Enter authority"
                    required
                  />
                  </div>
                </div>
              </div>

            <form onSubmit={handleSubmit} className="space-y-8">
            

              {/* DEFECTS/OBSERVATIONS Section */}
              <div className="bg-white border-b border-gray-200">
                <div className="bg-[#c7d9f0] text-black px-6 py-4">
                  <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">DEFECTS/OBSERVATIONS</h3>
              </div>

                <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
                  <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                    <tbody>
                      {/* Section (a) */}
                      <tr className="bg-[#f2f2f2]">
                        <td className="border-l border-r border-t border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(a) Confirmation on observations / defects of intermediate U/W hull inspection - List attached<span className="text-red-500">*</span></span>
                        </td>
                        <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                          <ComplexTable
                            formData={formData}
                            onInputChange={handleInputChange}
                            onDataChange={handleDataChange}
                            rowsField="defectsObservationsARows"
                            dataField="defectsObservationsAData"
                            columns={[
                              { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                              { 
                                label: 'Frame Station', 
                                subColumns: [
                                  { field: 'frameStationFrom', label: 'From*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() },
                                  { field: 'frameStationTo', label: 'To*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() }
                                ]
                              },
                              { field: 'observation', label: 'Observation*', placeholder: 'Enter observation', required: true },
                              { field: 'finalRemarks', label: 'Final Remarks*', placeholder: 'Enter final remarks', required: true }
                            ]}
                          />
                        </td>
                      </tr>
                      
                      {/* Section (b) */}
                      <tr className="bg-white">
                        <td className="border-l border-r border-b border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(b) SS to confirm all internal U/W compartments defects have been liquidated<span className="text-red-500">*</span></span>
                        </td>
                        <td className="border-r border-b border-gray-300 px-4 py-3" colSpan={2}>
                          <ComplexTable
                            formData={formData}
                            onInputChange={handleInputChange}
                            onDataChange={handleDataChange}
                            rowsField="defectsObservationsBRows"
                            dataField="defectsObservationsBData"
                            columns={[
                              { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                              { 
                                label: 'Frame Station', 
                                subColumns: [
                                  { field: 'frameStationFrom', label: 'From*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() },
                                  { field: 'frameStationTo', label: 'To*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() }
                                ]
                              },
                              { field: 'observation', label: 'Observation*', placeholder: 'Enter observation', required: true },
                              { field: 'finalRemarks', label: 'Final Remarks*', placeholder: 'Enter final remarks', required: true }
                            ]}
                          />
                        </td>
                      </tr>

                      {/* Section (c) */}
                      <tr className="bg-[#f2f2f2]">
                        <td className="border-l border-r border-b border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(c) SS to confirm<span className="text-red-500">*</span></span>
                        </td>
                        <td className="border-r border-b border-gray-300 px-4 py-3" colSpan={2}>
                          <ComplexTable
                            formData={formData}
                            onInputChange={handleInputChange}
                            onDataChange={handleDataChange}
                            rowsField="defectsObservationsCRows"
                            dataField="defectsObservationsCData"
                            columns={[
                              { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                              { 
                                label: 'Frame Station', 
                                subColumns: [
                                  { field: 'frameStationFrom', label: 'From*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() },
                                  { field: 'frameStationTo', label: 'To*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() }
                                ]
                              },
                              { field: 'observation', label: 'Observation*', placeholder: 'Enter observation', required: true },
                              { field: 'finalRemarks', label: 'Final Remarks*', placeholder: 'Enter final remarks', required: true }
                            ]}
                          />
                        </td>
                      </tr>

                      {/* Section (i) */}
                      <tr className="bg-white">
                        <td className="border-l border-r border-b border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(i) Fitment of all U/W and overboard discharge valves<span className="text-red-500">*</span></span>
                        </td>
                        <td className="border-r border-b border-gray-300 px-4 py-3" colSpan={2}>
                          <ComplexTable
                            formData={formData}
                            onInputChange={handleInputChange}
                            onDataChange={handleDataChange}
                            rowsField="defectsObservationsIRows"
                            dataField="defectsObservationsIData"
                            columns={[
                              { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                              { 
                                label: 'Frame Station', 
                                subColumns: [
                                  { field: 'frameStationFrom', label: 'From*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() },
                                  { field: 'frameStationTo', label: 'To*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() }
                                ]
                              },
                              { field: 'observation', label: 'Observation*', placeholder: 'Enter observation', required: true },
                              { field: 'finalRemarks', label: 'Final Remarks*', placeholder: 'Enter final remarks', required: true }
                            ]}
                          />
                        </td>
                      </tr>

                      {/* Section (ii) */}
                      <tr className="bg-[#f2f2f2]">
                        <td className="border-l border-r border-b border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(ii) Ship is in the same trim condition as at the time of docking<span className="text-red-500">*</span></span>
                        </td>
                        <td className="border-r border-b border-gray-300 px-4 py-3" colSpan={2}>
                          <ComplexTable
                            formData={formData}
                            onInputChange={handleInputChange}
                            onDataChange={handleDataChange}
                            rowsField="defectsObservationsIIRows"
                            dataField="defectsObservationsIIData"
                            columns={[
                              { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                              { 
                                label: 'Frame Station', 
                                subColumns: [
                                  { field: 'frameStationFrom', label: 'From*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() },
                                  { field: 'frameStationTo', label: 'To*', placeholder: 'Select Station', required: true, type: 'dropdown', options: getStationOptions() }
                                ]
                              },
                              { field: 'observation', label: 'Observation*', placeholder: 'Enter observation', required: true },
                              { field: 'finalRemarks', label: 'Final Remarks*', placeholder: 'Enter final remarks', required: true }
                            ]}
                          />
                        </td>
                      </tr>

                      {/* Section (d) - Text Input */}
                      <tr className="bg-white">
                        <td className="border-l border-r border-b border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(d) Refit authority to confirm no doublers existing on the U/W hull</span>
                        </td>
                        <td className="border-r border-b border-gray-300 px-4 py-3" colSpan={2}>
                          <Input
                            type="text"
                            value={formData.refitAuthorityConfirmation}
                            onChange={(e) => handleInputChange('refitAuthorityConfirmation', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Enter remarks"
                            required
                          />
                        </td>
                      </tr>

                      {/* Section (e) */}
                      <tr className="bg-[#f2f2f2]">
                        <td className="border-l border-r border-b border-gray-300 px-4 py-3 bg-gray-50 w-1/3">
                          <span className="text-sm font-medium text-gray-700">(e) Fresh defects / observations<span className="text-red-500">*</span></span>
                        </td>
                        <td className="border-r border-b border-gray-300 px-4 py-3" colSpan={2}>
                          <ObservationsTable
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
                            rowsField="defectsObservationsERows"
                            dataField="defectsObservationsEData"
                            placeholder="Enter observation"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ship Status and Signatures */}
              <div className="border border-gray-200 rounded-lg p-6">
                {/* Ship Status */}
                <div className="mb-8">
                  <div>
                    <Label htmlFor="ship_not_cleared_for_undocking" className="text-sm font-bold text-gray-900">
                      Ship not cleared for Undocking<span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.ship_not_cleared_for_undocking}
                      onValueChange={(value) => handleInputChange("ship_not_cleared_for_undocking", value)}
                    >
                      <SelectTrigger className={`mt-2 w-60 border border-black ${errors.ship_not_cleared_for_undocking ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">--Select--</SelectItem>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.ship_not_cleared_for_undocking && (
                      <p className="text-red-500 text-xs mt-1">{errors.ship_not_cleared_for_undocking}</p>
                    )}
                  </div>
                  
                    <div className="mt-4">
                      <Label htmlFor="reoffer_inspection" className="text-sm font-bold text-gray-900">
                        Re-offer inspection on<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="reoffer_inspection"
                        type="date"
                        value={formData.reoffer_inspection}
                        onChange={(e) => handleInputChange("reoffer_inspection", e.target.value)}
                        className={`mt-2 w-auto ${errors.reoffer_inspection ? "border-red-500" : ""}`}
                      />
                      {errors.reoffer_inspection && (
                        <p className="text-red-500 text-xs mt-1">{errors.reoffer_inspection}</p>
                      )}
                    </div>
                  {/* {formData.ship_not_cleared_for_undocking === "NO" && (
                  )} */}
              </div>

              {/* Signatures */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="relative">
                    <Input
                      id="sign_ship_staff"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                        className="block w-full text-sm text-gray-500 border border-black file:mr-4 file:py-0 file:px-4 file:rounded-md file:border file:border-black file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                    </div>
                    <Label htmlFor="sign_ship_staff" className="text-sm font-bold text-gray-900 mt-2 block">
                      Signature of Ship Staff<span className="text-red-500">*</span>
                    </Label>
                  </div>
                  
                  <div>
                    <div className="relative">
                    <Input
                      id="sign_refitting_auth"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                        className="block w-full text-sm text-gray-500 border border-black file:mr-4 file:py-0 file:px-4 file:rounded-md file:border file:border-black file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                    </div>
                    <Label htmlFor="sign_refitting_auth" className="text-sm font-bold text-gray-900 mt-2 block">
                      Signature of Refitting Authority<span className="text-red-500">*</span>
                    </Label>
                  </div>
                  
                  <div>
                    <div className="relative">
                    <Input
                      id="sign_hitu_inspector"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                        className="block w-full text-sm text-gray-500 border border-black file:mr-4 file:py-0 file:px-4 file:rounded-md file:border file:border-black file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                    </div>
                    <Label htmlFor="sign_hitu_inspector" className="text-sm font-bold text-gray-900 mt-2 block">
                      Signature of HITU Inspector<span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="bg-white p-6 mt-8">
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
                    onClick={() => console.log('Update/Save button clicked, editingRecord:', editingRecord)}
                >
                    {editingRecord ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
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
                    <TableHead className="text-white font-bold">Address</TableHead>
                    <TableHead className="text-white font-bold">Created Date</TableHead>
                    <TableHead className="text-white font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {apiDrafts.map((draft, index) => (
                    <TableRow key={draft.id} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                    <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.vessel?.name || 'N/A'}</TableCell>
                      <TableCell>{draft.auth_inspection || 'No Date Provided'}</TableCell>
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
  );
};

export default FinalUnderwaterHullInspectionForm;
