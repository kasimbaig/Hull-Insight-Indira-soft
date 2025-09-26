import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { get, post, put, del } from '@/lib/api';

// API Types
interface Vessel {
  id: number;
  name: string;
  code: string;
  active: number;
  created_on: string;
  created_ip: string;
  modified_on: string;
  modified_ip: string | null;
  year_of_build: number;
  year_of_delivery: number;
  created_by: number;
  modified_by: number | null;
  classofvessel: {
    id: number;
    code: string;
    name: string;
  };
  vesseltype: {
    id: number;
    code: string;
    name: string;
  };
  yard: {
    id: number;
    code: string;
    name: string;
  };
  command: {
    id: number;
    code: string;
    name: string;
  };
}

interface IntermediateUnderwaterHullInspectionReportFormData {
  intermediate_inspection: string;
  dt_inspection: string;
  auth_inspection: string;
  type_of_survey: string;
  pressure_testing_of_tanks: string;
  pressure_testing_of_sea_tubes: string;
  ndt_undertaken: string;
  sign_ship_staff: File | null;
  sign_refitting_auth: File | null;
  sign_hitu_inspector: File | null;
  name_ship_staff: string;
  rank_ship_staff: string;
  dsg_ship_staff: string;
  name_refitting_auth: string;
  rank_refitting_auth: string;
  dsg_refitting_auth: string;
  name_hitu_inspector: string;
  rank_hitu_inspector: string;
  dsg_hitu_inspector: string;
  inspectors: Inspector[];
  surveyAndRepairs: SurveyAndRepair[];
  defectRectification: DefectRectification[];
  newObservations: NewObservation[];
}

interface Inspector {
  id: number;
  name: string;
  rank: string;
  designation: string;
}

interface SurveyAndRepair {
  id: number;
  type: string;
  input: string;
}

interface DefectRectification {
  id: number;
  location: string;
  frameStationFrom: string;
  frameStationTo: string;
  observation: string;
  remarks: string;
}

interface NewObservation {
  id: number;
  location: string;
  frameStationFrom: string;
  frameStationTo: string;
  observation: string;
  remarks: string;
}

interface Observation {
  id?: number;
  section: string;
  sr_no: number;
  observation: string;
  remarks: string;
}

interface IntermediateUnderwaterHullInspectionReportData {
  id?: number;
  vessel_id?: number;
  vessel?: Vessel;
  dt_inspection?: string;
  type_of_survey?: string;
  pt_of_tanks?: string;
  pt_of_sea_tubes?: string;
  ndt_undertaken?: string;
  draft_status?: 'draft' | 'approved';
  dynamic_fields?: Record<string, any>;
  observations?: Observation[];
  created_by?: number;
  modified_by?: number | null;
  created_on?: string;
  modified_on?: string;
  created_ip?: string;
  modified_ip?: string | null;
}

const IntermediateUnderwaterHullInspectionReportForm: React.FC = () => {
  const [formData, setFormData] = useState<IntermediateUnderwaterHullInspectionReportFormData>({
    intermediate_inspection: '',
    dt_inspection: '',
    auth_inspection: '',
    type_of_survey: '',
    pressure_testing_of_tanks: '',
    pressure_testing_of_sea_tubes: '',
    ndt_undertaken: '',
    sign_ship_staff: null,
    sign_refitting_auth: null,
    sign_hitu_inspector: null,
    name_ship_staff: '',
    rank_ship_staff: '',
    dsg_ship_staff: '',
    name_refitting_auth: '',
    rank_refitting_auth: '',
    dsg_refitting_auth: '',
    name_hitu_inspector: '',
    rank_hitu_inspector: '',
    dsg_hitu_inspector: '',
    inspectors: [{ id: 1, name: '', rank: '', designation: '' }],
    surveyAndRepairs: [{ id: 1, type: '', input: '' }],
    defectRectification: [{ id: 1, location: '', frameStationFrom: '', frameStationTo: '', observation: '', remarks: '' }],
    newObservations: [{ id: 1, location: '', frameStationFrom: '', frameStationTo: '', observation: '', remarks: '' }]
  });

  const [inspectorCount, setInspectorCount] = useState(1);
  const [surveyRepairCount, setSurveyRepairCount] = useState(1);
  const [defectRectificationCount, setDefectRectificationCount] = useState(1);
  const [newObservationCount, setNewObservationCount] = useState(1);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<IntermediateUnderwaterHullInspectionReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [vessels, setVessels] = useState<Vessel[]>([]);

  // Load vessels on component mount
  useEffect(() => {
    const loadVessels = async () => {
      try {
        setLoading(true);
        const response = await get('master/vessels');
        
        // Handle different response structures
        let vesselsData: Vessel[] = [];
        if (response.data && Array.isArray(response.data)) {
          vesselsData = response.data;
        } else if (Array.isArray(response)) {
          vesselsData = response;
        } else if (response.results && Array.isArray(response.results)) {
          vesselsData = response.results;
        } else {
          vesselsData = [];
        }

        setVessels(vesselsData);
      } catch (err) {
        console.error('Failed to load vessels:', err);
        setError('Failed to load vessels: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadVessels();
  }, []);

  // API Helper Functions
  const convertFormDataToApiFormat = (formData: IntermediateUnderwaterHullInspectionReportFormData): IntermediateUnderwaterHullInspectionReportData => {
    // Convert inspectors to observations
    const inspectorObservations: Observation[] = formData.inspectors.map((inspector, index) => ({
      section: 'HITU_INSPECTORS',
      sr_no: index + 1,
      observation: `${inspector.name} - ${inspector.rank}`,
      remarks: inspector.designation
    }));

    // Convert survey and repairs to observations
    const surveyRepairObservations: Observation[] = formData.surveyAndRepairs.map((surveyRepair, index) => ({
      section: 'HULL_SURVEY_REPAIRS',
      sr_no: index + 1,
      observation: surveyRepair.type,
      remarks: surveyRepair.input
    }));

    // Convert defect rectification to observations
    const defectRectificationObservations: Observation[] = formData.defectRectification.map((defect, index) => ({
      section: 'DEFECT_RECTIFICATION',
      sr_no: index + 1,
      observation: `${defect.location} (Frame ${defect.frameStationFrom}-${defect.frameStationTo}): ${defect.observation}`,
      remarks: defect.remarks
    }));

    // Convert new observations to observations
    const newObservationObservations: Observation[] = formData.newObservations.map((observation, index) => ({
      section: 'NEW_OBSERVATIONS',
      sr_no: index + 1,
      observation: `${observation.location} (Frame ${observation.frameStationFrom}-${observation.frameStationTo}): ${observation.observation}`,
      remarks: observation.remarks
    }));

    // Combine all observations
    const allObservations = [
      ...inspectorObservations,
      ...surveyRepairObservations,
      ...defectRectificationObservations,
      ...newObservationObservations
    ];

    const result = {
      vessel_id: formData.intermediate_inspection ? parseInt(formData.intermediate_inspection) : undefined,
      dt_inspection: formData.dt_inspection ? formData.dt_inspection.split('T')[0] : undefined, // Format as YYYY-MM-DD
      type_of_survey: formData.type_of_survey || undefined,
      pt_of_tanks: formData.pressure_testing_of_tanks || undefined,
      pt_of_sea_tubes: formData.pressure_testing_of_sea_tubes || undefined,
      ndt_undertaken: formData.ndt_undertaken || undefined,
      dynamic_fields: {
        auth_inspection: formData.auth_inspection,
        name_ship_staff: formData.name_ship_staff,
        rank_ship_staff: formData.rank_ship_staff,
        dsg_ship_staff: formData.dsg_ship_staff,
        name_refitting_auth: formData.name_refitting_auth,
        rank_refitting_auth: formData.rank_refitting_auth,
        dsg_refitting_auth: formData.dsg_refitting_auth,
        name_hitu_inspector: formData.name_hitu_inspector,
        rank_hitu_inspector: formData.rank_hitu_inspector,
        dsg_hitu_inspector: formData.dsg_hitu_inspector,
        sign_ship_staff: formData.sign_ship_staff?.name || null,
        sign_refitting_auth: formData.sign_refitting_auth?.name || null,
        sign_hitu_inspector: formData.sign_hitu_inspector?.name || null
      },
      observations: allObservations
      // draft_status will be set by the calling function
    };
    
    return result;
  };

  const convertApiDataToFormFormat = (apiData: IntermediateUnderwaterHullInspectionReportData): Partial<IntermediateUnderwaterHullInspectionReportFormData> => {
    const dynamicFields = apiData.dynamic_fields || {};
    
    // Extract inspectors from observations
    const inspectorObservations = apiData.observations?.filter(obs => obs.section === 'HITU_INSPECTORS') || [];
    const inspectors: Inspector[] = inspectorObservations.map((obs, index) => ({
      id: index + 1,
      name: obs.observation.split(' - ')[0] || '',
      rank: obs.observation.split(' - ')[1] || '',
      designation: obs.remarks || ''
    }));

    // Extract survey and repairs from observations
    const surveyRepairObservations = apiData.observations?.filter(obs => obs.section === 'HULL_SURVEY_REPAIRS') || [];
    const surveyAndRepairs: SurveyAndRepair[] = surveyRepairObservations.map((obs, index) => ({
      id: index + 1,
      type: obs.observation || '',
      input: obs.remarks || ''
    }));

    // Extract defect rectification from observations
    const defectObservations = apiData.observations?.filter(obs => obs.section === 'DEFECT_RECTIFICATION') || [];
    const defectRectification: DefectRectification[] = defectObservations.map((obs, index) => {
      const match = obs.observation.match(/^(.+?) \(Frame (.+?)-(.+?)\): (.+)$/);
      return {
        id: index + 1,
        location: match ? match[1] : '',
        frameStationFrom: match ? match[2] : '',
        frameStationTo: match ? match[3] : '',
        observation: match ? match[4] : obs.observation,
        remarks: obs.remarks || ''
      };
    });

    // Extract new observations from observations
    const newObservations = apiData.observations?.filter(obs => obs.section === 'NEW_OBSERVATIONS') || [];
    const newObservationsFormatted: NewObservation[] = newObservations.map((obs, index) => {
      const match = obs.observation.match(/^(.+?) \(Frame (.+?)-(.+?)\): (.+)$/);
      return {
        id: index + 1,
        location: match ? match[1] : '',
        frameStationFrom: match ? match[2] : '',
        frameStationTo: match ? match[3] : '',
        observation: match ? match[4] : obs.observation,
        remarks: obs.remarks || ''
      };
    });

    return {
      intermediate_inspection: apiData.vessel?.id ? apiData.vessel.id.toString() : (apiData.vessel_id ? apiData.vessel_id.toString() : ''),
      dt_inspection: apiData.dt_inspection || '',
      auth_inspection: dynamicFields.auth_inspection || '',
      type_of_survey: apiData.type_of_survey || '',
      pressure_testing_of_tanks: apiData.pt_of_tanks || '',
      pressure_testing_of_sea_tubes: apiData.pt_of_sea_tubes || '',
      ndt_undertaken: apiData.ndt_undertaken || '',
      name_ship_staff: dynamicFields.name_ship_staff || '',
      rank_ship_staff: dynamicFields.rank_ship_staff || '',
      dsg_ship_staff: dynamicFields.dsg_ship_staff || '',
      name_refitting_auth: dynamicFields.name_refitting_auth || '',
      rank_refitting_auth: dynamicFields.rank_refitting_auth || '',
      dsg_refitting_auth: dynamicFields.dsg_refitting_auth || '',
      name_hitu_inspector: dynamicFields.name_hitu_inspector || '',
      rank_hitu_inspector: dynamicFields.rank_hitu_inspector || '',
      dsg_hitu_inspector: dynamicFields.dsg_hitu_inspector || '',
      sign_ship_staff: null, // File objects can't be restored from API
      sign_refitting_auth: null,
      sign_hitu_inspector: null,
      inspectors: inspectors.length > 0 ? inspectors : [{ id: 1, name: '', rank: '', designation: '' }],
      surveyAndRepairs: surveyAndRepairs.length > 0 ? surveyAndRepairs : [{ id: 1, type: '', input: '' }],
      defectRectification: defectRectification.length > 0 ? defectRectification : [{ id: 1, location: '', frameStationFrom: '', frameStationTo: '', observation: '', remarks: '' }],
      newObservations: newObservationsFormatted.length > 0 ? newObservationsFormatted : [{ id: 1, location: '', frameStationFrom: '', frameStationTo: '', observation: '', remarks: '' }]
    };
  };

  const ships = [
    'SHIVALIK', 'JAMUNA', 'BANGARAM', 'TARANGINI', 'SARYU', 'KUMBHIR', 'T-83', 'AIRAVAT',
    'KHANJAR', 'SHUDERSHINI', 'TRISHUL', 'TEG', 'RANVIJAY', 'KIRPAN', 'DELHI', 'SURVEKSHAK',
    'JYOTI', 'SUJATA', 'KABRA', 'CANKARSO', 'T-84', 'VIBHUTI', 'NISHANK', 'MAGAR', 'BEAS',
    'SUVERNA', 'SAHYADRI', 'PRALAYA', 'CHERIYAM', 'SATPURA', 'JALASHWA', 'TARKASH', 'KARMUK',
    'SUTLEJ', 'SUMEDHA', 'PRABAL', 'CORA DIVH', 'BATTIMALV', 'CHENNAI', 'SUMITRA', 'T-82',
    'KUTHAR', 'KONDUL', 'SUBHDRA', 'DARSHAK', 'BITRA', 'CHETLAT', 'NIREEKSHAK', 'KARUVA',
    'DEEPAK', 'SHAKTI', 'KOLKATA', 'INVETIGATOR', 'SHARDA', 'MUMBAI', 'GOMTI', 'BETWA',
    'NASHAK', 'KOSWARI', 'CHEETAH', 'TALWAR', 'KESARI', 'ADITYA', 'BARATANG', 'KORA',
    'KULISH', 'RANA', 'KALPENI', 'VIPUL', 'TABAR', 'TRINKAND', 'KOCHI', 'SUKANYA',
    'SAVITRI', 'GULDAR', 'BRAHMAPUTRA', 'GHARIAL', 'RANVIR', 'NIRUPAK', 'VINASH', 'KIRCH',
    'SANDHAYAK', 'VIDYUT', 'TIR', 'GAJ', 'CAR NICOBAR', 'SUNAYNA', 'MYSORE'
  ];

  const surveyAndRepairTypes = [
    'Doubler / Cold repair',
    'Plate renewal Undertaken at',
    'Misalignment of rudders',
    'Hull repair in progress at'
  ];

  const handleInputChange = (field: keyof IntermediateUnderwaterHullInspectionReportFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInspectorChange = (index: number, field: keyof Inspector, value: string) => {
    const updatedInspectors = [...formData.inspectors];
    updatedInspectors[index] = { ...updatedInspectors[index], [field]: value };
    setFormData(prev => ({ ...prev, inspectors: updatedInspectors }));
  };

  const handleSurveyRepairChange = (index: number, field: keyof SurveyAndRepair, value: string) => {
    const updatedSurveyRepairs = [...formData.surveyAndRepairs];
    updatedSurveyRepairs[index] = { ...updatedSurveyRepairs[index], [field]: value };
    setFormData(prev => ({ ...prev, surveyAndRepairs: updatedSurveyRepairs }));
  };

  const handleDefectRectificationChange = (index: number, field: keyof DefectRectification, value: string) => {
    const updatedDefectRectification = [...formData.defectRectification];
    updatedDefectRectification[index] = { ...updatedDefectRectification[index], [field]: value };
    setFormData(prev => ({ ...prev, defectRectification: updatedDefectRectification }));
  };

  const handleNewObservationChange = (index: number, field: keyof NewObservation, value: string) => {
    const updatedNewObservations = [...formData.newObservations];
    updatedNewObservations[index] = { ...updatedNewObservations[index], [field]: value };
    setFormData(prev => ({ ...prev, newObservations: updatedNewObservations }));
  };

  const addInspectorRow = () => {
    const newInspector: Inspector = {
      id: inspectorCount + 1,
      name: '',
      rank: '',
      designation: ''
    };
    setFormData(prev => ({
      ...prev,
      inspectors: [...prev.inspectors, newInspector]
    }));
    setInspectorCount(prev => prev + 1);
  };

  const addSurveyRepairRow = () => {
    const newSurveyRepair: SurveyAndRepair = {
      id: surveyRepairCount + 1,
      type: '',
      input: ''
    };
    setFormData(prev => ({
      ...prev,
      surveyAndRepairs: [...prev.surveyAndRepairs, newSurveyRepair]
    }));
    setSurveyRepairCount(prev => prev + 1);
  };

  const addDefectRectificationRow = () => {
    const newDefectRectification: DefectRectification = {
      id: defectRectificationCount + 1,
      location: '',
      frameStationFrom: '',
      frameStationTo: '',
      observation: '',
      remarks: ''
    };
    setFormData(prev => ({
      ...prev,
      defectRectification: [...prev.defectRectification, newDefectRectification]
    }));
    setDefectRectificationCount(prev => prev + 1);
  };

  const addNewObservationRow = () => {
    const newNewObservation: NewObservation = {
      id: newObservationCount + 1,
      location: '',
      frameStationFrom: '',
      frameStationTo: '',
      observation: '',
      remarks: ''
    };
    setFormData(prev => ({
      ...prev,
      newObservations: [...prev.newObservations, newNewObservation]
    }));
    setNewObservationCount(prev => prev + 1);
  };

  const removeInspectorRow = (index: number) => {
    if (formData.inspectors.length > 1) {
      const updatedInspectors = formData.inspectors.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, inspectors: updatedInspectors }));
    }
  };

  const removeSurveyRepairRow = (index: number) => {
    if (formData.surveyAndRepairs.length > 1) {
      const updatedSurveyRepairs = formData.surveyAndRepairs.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, surveyAndRepairs: updatedSurveyRepairs }));
    }
  };

  const removeDefectRectificationRow = (index: number) => {
    if (formData.defectRectification.length > 1) {
      const updatedDefectRectification = formData.defectRectification.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, defectRectification: updatedDefectRectification }));
    }
  };

  const removeNewObservationRow = (index: number) => {
    if (formData.newObservations.length > 1) {
      const updatedNewObservations = formData.newObservations.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, newObservations: updatedNewObservations }));
    }
  };

  const handleFileChange = (field: 'sign_ship_staff' | 'sign_refitting_auth' | 'sign_hitu_inspector', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateForm = () => {
    if (!formData.intermediate_inspection) {
      alert('Please Select Intermediate Underwater Hull Inspection - INS');
      return false;
    }

    if (!formData.dt_inspection) {
      alert('Please Select Date of Inspection');
      return false;
    }

    if (!formData.auth_inspection) {
      alert('Please Enter Authority for Inspection');
      return false;
    }

    for (let i = 0; i < formData.inspectors.length; i++) {
      const inspector = formData.inspectors[i];
      if (!inspector.name) {
        alert(`Please Enter HITU's Inspector Name ${i + 1}`);
        return false;
      }
      if (!inspector.rank) {
        alert(`Please Enter HITU's Inspector Rank ${i + 1}`);
        return false;
      }
      if (!inspector.designation) {
        alert(`Please Enter HITU's Inspector Designation ${i + 1}`);
        return false;
      }
    }

    if (!formData.type_of_survey) {
      alert('Please Enter Type of Survey');
      return false;
    }

    for (let i = 0; i < formData.surveyAndRepairs.length; i++) {
      const surveyRepair = formData.surveyAndRepairs[i];
      if (!surveyRepair.type) {
        alert(`Please Select Hull Survey/Repair ${i + 1}`);
        return false;
      }
      if (!surveyRepair.input) {
        alert(`Please Enter Hull Survey/Repair ${i + 1}`);
        return false;
      }
    }

    if (!formData.pressure_testing_of_tanks) {
      alert('Please Enter Pressure testing of tanks in way of hot work');
      return false;
    }

    if (!formData.pressure_testing_of_sea_tubes) {
      alert('Please Enter Pressure testing of sea tubes in way of hot work');
      return false;
    }

    if (!formData.ndt_undertaken) {
      alert('Please Enter NDT Undertaken in way of hot work locations');
      return false;
    }

    for (let i = 0; i < formData.defectRectification.length; i++) {
      const defectRectification = formData.defectRectification[i];
      if (!defectRectification.location) {
        alert(`Please Enter Defect Rectfication Location ${i + 1}`);
        return false;
      }
      if (!defectRectification.frameStationFrom) {
        alert(`Please Enter Defect Rectfication Frame Station From ${i + 1}`);
        return false;
      }
      if (!defectRectification.frameStationTo) {
        alert(`Please Enter Defect Rectfication Frame Station To ${i + 1}`);
        return false;
      }
      if (!defectRectification.observation) {
        alert(`Please Enter Defect Rectfication Observation ${i + 1}`);
        return false;
      }
      if (!defectRectification.remarks) {
        alert(`Please Enter Defect Rectfication Remarks ${i + 1}`);
        return false;
      }
    }

    for (let i = 0; i < formData.newObservations.length; i++) {
      const newObservation = formData.newObservations[i];
      if (!newObservation.location) {
        alert(`Please Enter New Observations Location ${i + 1}`);
        return false;
      }
      if (!newObservation.frameStationFrom) {
        alert(`Please Enter New Observations Frame Station From ${i + 1}`);
        return false;
      }
      if (!newObservation.frameStationTo) {
        alert(`Please Enter New Observations Frame Station To ${i + 1}`);
        return false;
      }
      if (!newObservation.observation) {
        alert(`Please Enter New Observation ${i + 1}`);
        return false;
      }
      if (!newObservation.remarks) {
        alert(`Please Enter New Observations Remarks ${i + 1}`);
        return false;
      }
    }

    if (!formData.sign_ship_staff) {
      alert('Please Upload Signature of Ship Staff');
      return false;
    }

    if (!formData.name_ship_staff) {
      alert('Please Enter Name of Ship Staff');
      return false;
    }

    if (!formData.rank_ship_staff) {
      alert('Please Enter Rank of Ship Staff');
      return false;
    }

    if (!formData.dsg_ship_staff) {
      alert('Please Enter Designation of Ship Staff');
      return false;
    }

    if (!formData.sign_refitting_auth) {
      alert('Please Upload Signature of Refitting Authority');
      return false;
    }

    if (!formData.name_refitting_auth) {
      alert('Please Enter Name of Refitting Authority');
      return false;
    }

    if (!formData.rank_refitting_auth) {
      alert('Please Enter Rank of Refitting Authority');
      return false;
    }

    if (!formData.dsg_refitting_auth) {
      alert('Please Enter Designation of Refitting Authority');
      return false;
    }

    if (!formData.sign_hitu_inspector) {
      alert('Please Upload Signature of HITU Inspector');
      return false;
    }

    if (!formData.name_hitu_inspector) {
      alert('Please Enter Name of HITU Inspector');
      return false;
    }

    if (!formData.rank_hitu_inspector) {
      alert('Please Enter Rank of HITU Inspector');
      return false;
    }

    if (!formData.dsg_hitu_inspector) {
      alert('Please Enter Designation of HITU Inspector');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    console.log('Save button clicked - handleSubmit called');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    console.log('Form validation passed');

    try {
      setLoading(true);
      setError(null);

      // Convert form data to API format
      const apiData = convertFormDataToApiFormat(formData);
      // Remove draft_status for final submission
      delete apiData.draft_status;
      
      console.log('About to submit form with data:', apiData);
      const response = await post('/hitumodule/intermediate-underwater-hull-inspection-reports/', apiData);
      console.log('Form submitted successfully:', response);
      alert('Form submitted successfully!');
      handleClearForm();
    } catch (err) {
      setError('Failed to submit form');
      console.error('Error submitting form:', err);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert form data to API format
      const apiData = convertFormDataToApiFormat(formData);
      // Ensure draft_status is set to 'draft'
      apiData.draft_status = 'draft';
      
      let result;
      if (currentDraftId) {
        // Update existing draft
        const response = await put(`/hitumodule/intermediate-underwater-hull-inspection-reports/${currentDraftId}/`, apiData);
        result = response.data || response;
        alert('Draft updated successfully!');
      } else {
        // Create new draft
        const response = await post('/hitumodule/intermediate-underwater-hull-inspection-reports/', apiData);
        result = response.data || response;
        alert('Draft saved successfully!');
      }
    } catch (err) {
      setError('Failed to save draft');
      console.error('Error saving draft:', err);
      alert('Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchDrafts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await get('/hitumodule/intermediate-underwater-hull-inspection-reports/?draft_status=draft');
      
      // Handle different response structures
      let draftsData: IntermediateUnderwaterHullInspectionReportData[];
      if (response.data && Array.isArray(response.data)) {
        draftsData = response.data;
      } else if (Array.isArray(response)) {
        draftsData = response;
      } else {
        draftsData = [];
      }
      
      setDrafts(draftsData);
      setIsDraftModalOpen(true);
    } catch (err) {
      setError('Failed to fetch drafts');
      console.error('Error fetching drafts:', err);
      alert('Failed to fetch drafts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDraft = (draft: IntermediateUnderwaterHullInspectionReportData) => {
    // Convert API data to form format
    const formDataFromDraft = convertApiDataToFormFormat(draft);
    
    setFormData(prev => ({
      ...prev,
      ...formDataFromDraft
    }));
    
    // Update row counts
    setInspectorCount(formDataFromDraft.inspectors?.length || 1);
    setSurveyRepairCount(formDataFromDraft.surveyAndRepairs?.length || 1);
    setDefectRectificationCount(formDataFromDraft.defectRectification?.length || 1);
    setNewObservationCount(formDataFromDraft.newObservations?.length || 1);
    
    setCurrentDraftId(draft.id?.toString() || null);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await del(`/hitumodule/intermediate-underwater-hull-inspection-reports/${draftId}/`);
      
      // Refresh the drafts list
      const response = await get('/hitumodule/intermediate-underwater-hull-inspection-reports/?draft_status=draft');
      
      // Handle different response structures
      let draftsData: IntermediateUnderwaterHullInspectionReportData[];
      if (response.data && Array.isArray(response.data)) {
        draftsData = response.data;
      } else if (Array.isArray(response)) {
        draftsData = response;
      } else {
        draftsData = [];
      }
      
      setDrafts(draftsData);
      alert('Draft deleted successfully!');
    } catch (err) {
      setError('Failed to delete draft');
      console.error('Error deleting draft:', err);
      alert('Failed to delete draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      intermediate_inspection: '',
      dt_inspection: '',
      auth_inspection: '',
      type_of_survey: '',
      pressure_testing_of_tanks: '',
      pressure_testing_of_sea_tubes: '',
      ndt_undertaken: '',
      sign_ship_staff: null,
      sign_refitting_auth: null,
      sign_hitu_inspector: null,
      name_ship_staff: '',
      rank_ship_staff: '',
      dsg_ship_staff: '',
      name_refitting_auth: '',
      rank_refitting_auth: '',
      dsg_refitting_auth: '',
      name_hitu_inspector: '',
      rank_hitu_inspector: '',
      dsg_hitu_inspector: '',
      inspectors: [{ id: 1, name: '', rank: '', designation: '' }],
      surveyAndRepairs: [{ id: 1, type: '', input: '' }],
      defectRectification: [{ id: 1, location: '', frameStationFrom: '', frameStationTo: '', observation: '', remarks: '' }],
      newObservations: [{ id: 1, location: '', frameStationFrom: '', frameStationTo: '', observation: '', remarks: '' }]
    });
    setInspectorCount(1);
    setSurveyRepairCount(1);
    setDefectRectificationCount(1);
    setNewObservationCount(1);
    setCurrentDraftId(null);
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            INTERMEDIATE UNDERWATER HULL INSPECTION - INS{' '}
            <Select value={formData.intermediate_inspection} onValueChange={(value) => handleInputChange('intermediate_inspection', value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={loading ? 'Loading vessels...' : '--Select--'} />
              </SelectTrigger>
              <SelectContent>
                {vessels.map((vessel) => (
                  <SelectItem key={vessel.id} value={vessel.id.toString()}>
                    {vessel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dt_inspection">
                  Date of Inspection <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dt_inspection ? format(new Date(formData.dt_inspection), 'dd-MM-yyyy') : 'DD-MM-YYYY'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dt_inspection ? new Date(formData.dt_inspection) : undefined}
                      onSelect={(date) => handleInputChange('dt_inspection', date ? date.toISOString() : '')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth_inspection">
                  Authority for Inspection <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="auth_inspection"
                  value={formData.auth_inspection}
                  onChange={(e) => handleInputChange('auth_inspection', e.target.value)}
                  maxLength={40}
                />
              </div>
            </div>

            {/* HITU's Inspectors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">HITU's Inspectors</h3>
              <div className="flex justify-between items-center">
                <Label>Enter Total Number of Rows</Label>
                <Input
                  type="number"
                  value={inspectorCount}
                  onChange={(e) => setInspectorCount(parseInt(e.target.value) || 1)}
                  className="w-20"
                  min="1"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No</TableHead>
                    <TableHead>Name <span className="text-red-500">*</span></TableHead>
                    <TableHead>Rank <span className="text-red-500">*</span></TableHead>
                    <TableHead>Designation <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.inspectors.map((inspector, index) => (
                    <TableRow key={inspector.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={inspector.name}
                          onChange={(e) => handleInspectorChange(index, 'name', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={inspector.rank}
                          onChange={(e) => handleInspectorChange(index, 'rank', e.target.value)}
                          maxLength={10}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={inspector.designation}
                          onChange={(e) => handleInspectorChange(index, 'designation', e.target.value)}
                          maxLength={10}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Hull Survey & Repairs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">HULL SURVEY & REPAIRS</h3>
              <div className="space-y-2">
                <Label htmlFor="type_of_survey">
                  Type of Survey <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="type_of_survey"
                  value={formData.type_of_survey}
                  onChange={(e) => handleInputChange('type_of_survey', e.target.value)}
                  maxLength={10}
                />
              </div>
              <div className="flex justify-between items-center">
                <Label>Enter Total Number of Rows</Label>
                <Input
                  type="number"
                  value={surveyRepairCount}
                  onChange={(e) => setSurveyRepairCount(parseInt(e.target.value) || 1)}
                  className="w-20"
                  min="1"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Input</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.surveyAndRepairs.map((surveyRepair, index) => (
                    <TableRow key={surveyRepair.id}>
                      <TableCell className="text-center">({String.fromCharCode(97 + index)})</TableCell>
                      <TableCell>
                        <Select value={surveyRepair.type} onValueChange={(value) => handleSurveyRepairChange(index, 'type', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="--Select--" />
                          </SelectTrigger>
                          <SelectContent>
                            {surveyAndRepairTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={surveyRepair.input}
                          onChange={(e) => handleSurveyRepairChange(index, 'input', e.target.value)}
                          maxLength={100}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Tests Undertaken */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">TESTS UNDERTAKEN TO PROVE THE EFFICACY OF HULL REPAIRS</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>(a) Pressure testing of tanks in way of hot work <span className="text-red-500">*</span></TableCell>
                    <TableCell>
                      <Input
                        value={formData.pressure_testing_of_tanks}
                        onChange={(e) => handleInputChange('pressure_testing_of_tanks', e.target.value)}
                        maxLength={10}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>(b) Pressure testing of sea tubes in way of hot work <span className="text-red-500">*</span></TableCell>
                    <TableCell>
                      <Input
                        value={formData.pressure_testing_of_sea_tubes}
                        onChange={(e) => handleInputChange('pressure_testing_of_sea_tubes', e.target.value)}
                        maxLength={10}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>(c) NDT Undertaken in way of hot work locations <span className="text-red-500">*</span></TableCell>
                    <TableCell>
                      <Input
                        value={formData.ndt_undertaken}
                        onChange={(e) => handleInputChange('ndt_undertaken', e.target.value)}
                        maxLength={10}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Defect Rectification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">DEFECT RECTFICATION / PRESERVATION OF INTERNAL U/W COMPARTMENTS / TANKS</h3>
              <div className="flex justify-between items-center">
                <Label>Enter Total Number of Rows</Label>
                <Input
                  type="number"
                  value={defectRectificationCount}
                  onChange={(e) => setDefectRectificationCount(parseInt(e.target.value) || 1)}
                  className="w-20"
                  min="1"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2}>Sr No</TableHead>
                    <TableHead rowSpan={2}>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2}>Frame Station <span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2}>Observation <span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2}>Remarks <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead>From <span className="text-red-500">*</span></TableHead>
                    <TableHead>To <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.defectRectification.map((defectRectification, index) => (
                    <TableRow key={defectRectification.id}>
                      <TableCell className="text-center">({String.fromCharCode(97 + index)})</TableCell>
                      <TableCell>
                        <Input
                          value={defectRectification.location}
                          onChange={(e) => handleDefectRectificationChange(index, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={defectRectification.frameStationFrom}
                          onChange={(e) => handleDefectRectificationChange(index, 'frameStationFrom', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={defectRectification.frameStationTo}
                          onChange={(e) => handleDefectRectificationChange(index, 'frameStationTo', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={defectRectification.observation}
                          onChange={(e) => handleDefectRectificationChange(index, 'observation', e.target.value)}
                          maxLength={50}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={defectRectification.remarks}
                          onChange={(e) => handleDefectRectificationChange(index, 'remarks', e.target.value)}
                          maxLength={50}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* New Observations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">New Observations</h3>
              <div className="flex justify-between items-center">
                <Label>Enter Total Number of Rows</Label>
                <Input
                  type="number"
                  value={newObservationCount}
                  onChange={(e) => setNewObservationCount(parseInt(e.target.value) || 1)}
                  className="w-20"
                  min="1"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2}>Sr No</TableHead>
                    <TableHead rowSpan={2}>Location <span className="text-red-500">*</span></TableHead>
                    <TableHead colSpan={2}>Frame Station <span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2}>Observation <span className="text-red-500">*</span></TableHead>
                    <TableHead rowSpan={2}>Remarks <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead>From <span className="text-red-500">*</span></TableHead>
                    <TableHead>To <span className="text-red-500">*</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.newObservations.map((newObservation, index) => (
                    <TableRow key={newObservation.id}>
                      <TableCell className="text-center">({String.fromCharCode(97 + index)})</TableCell>
                      <TableCell>
                        <Input
                          value={newObservation.location}
                          onChange={(e) => handleNewObservationChange(index, 'location', e.target.value)}
                          maxLength={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={newObservation.frameStationFrom}
                          onChange={(e) => handleNewObservationChange(index, 'frameStationFrom', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={newObservation.frameStationTo}
                          onChange={(e) => handleNewObservationChange(index, 'frameStationTo', e.target.value)}
                          maxLength={4}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={newObservation.observation}
                          onChange={(e) => handleNewObservationChange(index, 'observation', e.target.value)}
                          maxLength={50}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={newObservation.remarks}
                          onChange={(e) => handleNewObservationChange(index, 'remarks', e.target.value)}
                          maxLength={50}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sign_ship_staff">
                    Signature of Ship Staff <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sign_ship_staff"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('sign_ship_staff', e.target.files?.[0] || null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_ship_staff">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name_ship_staff"
                    value={formData.name_ship_staff}
                    onChange={(e) => handleInputChange('name_ship_staff', e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rank_ship_staff">Rank <span className="text-red-500">*</span></Label>
                  <Input
                    id="rank_ship_staff"
                    value={formData.rank_ship_staff}
                    onChange={(e) => handleInputChange('rank_ship_staff', e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dsg_ship_staff">Designation <span className="text-red-500">*</span></Label>
                  <Input
                    id="dsg_ship_staff"
                    value={formData.dsg_ship_staff}
                    onChange={(e) => handleInputChange('dsg_ship_staff', e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sign_refitting_auth">
                    Signature of Refitting Authority <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sign_refitting_auth"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('sign_refitting_auth', e.target.files?.[0] || null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_refitting_auth">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name_refitting_auth"
                    value={formData.name_refitting_auth}
                    onChange={(e) => handleInputChange('name_refitting_auth', e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rank_refitting_auth">Rank <span className="text-red-500">*</span></Label>
                  <Input
                    id="rank_refitting_auth"
                    value={formData.rank_refitting_auth}
                    onChange={(e) => handleInputChange('rank_refitting_auth', e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dsg_refitting_auth">Designation <span className="text-red-500">*</span></Label>
                  <Input
                    id="dsg_refitting_auth"
                    value={formData.dsg_refitting_auth}
                    onChange={(e) => handleInputChange('dsg_refitting_auth', e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sign_hitu_inspector">
                    Signature of HITU Inspector <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sign_hitu_inspector"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('sign_hitu_inspector', e.target.files?.[0] || null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_hitu_inspector">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name_hitu_inspector"
                    value={formData.name_hitu_inspector}
                    onChange={(e) => handleInputChange('name_hitu_inspector', e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rank_hitu_inspector">Rank <span className="text-red-500">*</span></Label>
                  <Input
                    id="rank_hitu_inspector"
                    value={formData.rank_hitu_inspector}
                    onChange={(e) => handleInputChange('rank_hitu_inspector', e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dsg_hitu_inspector">Designation <span className="text-red-500">*</span></Label>
                  <Input
                    id="dsg_hitu_inspector"
                    value={formData.dsg_hitu_inspector}
                    onChange={(e) => handleInputChange('dsg_hitu_inspector', e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-center space-x-4">
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={handleFetchDrafts} disabled={loading}>
                {loading ? 'LOADING...' : 'FETCH DRAFTS'}
              </Button>
              <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={handleSaveDraft} disabled={loading}>
                {loading ? 'SAVING...' : currentDraftId ? 'SAVE DRAFT' : 'SAVE DRAFT'}
              </Button>
              <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded" onClick={handleClearForm}>
                Clear
              </Button>
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={handleSubmit}>
                {loading ? 'SAVING...' : 'SAVE'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Draft Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Draft Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {drafts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr No.</TableHead>
                    <TableHead>INS</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.vessel?.name || 'No Ship Selected'}</TableCell>
                      <TableCell>{new Date(draft.created_on || '').toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleLoadDraft(draft)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDraft(draft.id?.toString() || '')}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500">No drafts available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntermediateUnderwaterHullInspectionReportForm;
