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
  const [drafts, setDrafts] = useState<any[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const handleSaveDraft = () => {
    if (validateForm()) {
      const draftData = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('intermediateUnderwaterHullInspectionDraft', JSON.stringify(draftData));
      alert('Draft saved successfully!');
    }
  };

  const handleFetchDrafts = () => {
    const savedDrafts = localStorage.getItem('intermediateUnderwaterHullInspectionDraft');
    if (savedDrafts) {
      const draft = JSON.parse(savedDrafts);
      setDrafts([draft]);
    }
    setIsDraftModalOpen(true);
  };

  const handleLoadDraft = (draft: any) => {
    setFormData(draft);
    setIsDraftModalOpen(false);
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
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            INTERMEDIATE UNDERWATER HULL INSPECTION - INS{' '}
            <Select value={formData.intermediate_inspection} onValueChange={(value) => handleInputChange('intermediate_inspection', value)}>
              <SelectTrigger className="w-48">
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
                    <TableHead>Action</TableHead>
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
                      <TableCell>
                        {formData.inspectors.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeInspectorRow(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" onClick={addInspectorRow} variant="outline">
                Add Inspector Row
              </Button>
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
                    <TableHead>Action</TableHead>
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
                      <TableCell>
                        {formData.surveyAndRepairs.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSurveyRepairRow(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" onClick={addSurveyRepairRow} variant="outline">
                Add Survey/Repair Row
              </Button>
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
                    <TableHead rowSpan={2}>Action</TableHead>
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
                      <TableCell>
                        {formData.defectRectification.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeDefectRectificationRow(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" onClick={addDefectRectificationRow} variant="outline">
                Add Defect Rectification Row
              </Button>
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
                    <TableHead rowSpan={2}>Action</TableHead>
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
                      <TableCell>
                        {formData.newObservations.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeNewObservationRow(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" onClick={addNewObservationRow} variant="outline">
                Add New Observation Row
              </Button>
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
              <Button type="button" variant="outline" onClick={handleFetchDrafts}>
                Fetch Drafts
              </Button>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                SAVE DRAFT
              </Button>
              <Button type="button" variant="destructive" onClick={handleClearForm}>
                Clear
              </Button>
              <Button type="submit" variant="default">
                Save
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
                      <TableCell>{draft.intermediate_inspection}</TableCell>
                      <TableCell>{new Date(draft.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLoadDraft(draft)}
                        >
                          Load
                        </Button>
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
