import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, FileText, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface SewageTreatmentPlantData {
  ship: string;
  dateOfInspection: Date | null;
  make: string;
  // Remote Indicator Panel (DCHQ)
  observationsElectrical: string;
  remarksElectrical: string;
  observationsSwitches: string;
  remarksSwitches: string;
  observationsIndicators: string;
  remarksIndicators: string;
  // Local Control Panel
  observationsLocalControl: string;
  remarksLocalControl: string;
  observationsFuncSwitches: string;
  remarksFuncSwitches: string;
  observationsFuncIndicators: string;
  remarksFuncIndicators: string;
  // Level Sensors Collection Tank
  observationsLevelSensors: string;
  remarksLevelSensors: string;
  // Calibration of Fixed H2S Sensors
  dateLastCalibration: Date | null;
  lastCalibrationDueDate: Date | null;
  remarksCalibration: string;
  // Calibration of Portable H2S Sensors
  datePortableCalibration: Date | null;
  portableCalibrationDueDate: Date | null;
  remarksPortableCalibration: string;
  // Auto Mode
  observationsAutomode: string;
  remarksAutomode: string;
  // Log Book
  observationLogbook: string;
  remarksLogbook: string;
  // Check For Motor Insulation Readings
  observationsInsulation: string;
  remarksInsulation: string;
  // Natural Ventilation Arrangement for Tanks
  observationsNaturalVentilation: string;
  remarksNaturalVentilation: string;
  // Forced Ventilation of the Tanks
  observationsForcedVentilation: string;
  remarksForcedVentilation: string;
  // Check for Forced Exhaust Ventilation
  observationsForcedExhaust: string;
  remarksForcedExhaust: string;
  // Conditions of Foundations
  observationsFoundation: string;
  remarksFoundation: string;
  // Pressure Test Certificate of Tanks
  lastPressureDate: Date | null;
  lastPressureDueDate: Date | null;
  remarksLastPressure: string;
  // Bio-Oxygen Demand, BOD
  observationsBod: string;
  remarksBod: string;
  // Total Suspended Solids
  observationsSuspendSolid: string;
  remarksSuspendSolid: string;
  // Faecal Coliform Count
  observationsColiform: string;
  remarksColiform: string;
  // Check for Effluent Certificate
  lastEffluentDate: Date | null;
  lastEffluentDueDate: Date | null;
  remarksEffluent: string;
  // Any Other Observation
  remarksAnyOther: string;
  // Overall Remarks
  observationsOverall: string;
  remarksOverall: string;
  // Authority Signature
  authoritySignature: File | null;
}

const SewageTreatmentPlantForm: React.FC = () => {
  const [formData, setFormData] = useState<SewageTreatmentPlantData>({
    ship: '',
    dateOfInspection: null,
    make: '',
    observationsElectrical: '',
    remarksElectrical: '',
    observationsSwitches: '',
    remarksSwitches: '',
    observationsIndicators: '',
    remarksIndicators: '',
    observationsLocalControl: '',
    remarksLocalControl: '',
    observationsFuncSwitches: '',
    remarksFuncSwitches: '',
    observationsFuncIndicators: '',
    remarksFuncIndicators: '',
    observationsLevelSensors: '',
    remarksLevelSensors: '',
    dateLastCalibration: null,
    lastCalibrationDueDate: null,
    remarksCalibration: '',
    datePortableCalibration: null,
    portableCalibrationDueDate: null,
    remarksPortableCalibration: '',
    observationsAutomode: '',
    remarksAutomode: '',
    observationLogbook: '',
    remarksLogbook: '',
    observationsInsulation: '',
    remarksInsulation: '',
    observationsNaturalVentilation: '',
    remarksNaturalVentilation: '',
    observationsForcedVentilation: '',
    remarksForcedVentilation: '',
    observationsForcedExhaust: '',
    remarksForcedExhaust: '',
    observationsFoundation: '',
    remarksFoundation: '',
    lastPressureDate: null,
    lastPressureDueDate: null,
    remarksLastPressure: '',
    observationsBod: '',
    remarksBod: '',
    observationsSuspendSolid: '',
    remarksSuspendSolid: '',
    observationsColiform: '',
    remarksColiform: '',
    lastEffluentDate: null,
    lastEffluentDueDate: null,
    remarksEffluent: '',
    remarksAnyOther: '',
    observationsOverall: '',
    remarksOverall: '',
    authoritySignature: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  const observations = ['SAT', 'UNSAT', 'SAT WITH OBSERVATION'];
  const opsObservations = ['OPS', 'NON-OPS'];
  const availableObservations = ['AVAILABLE', 'NON-AVAILABLE'];

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    const savedDrafts = localStorage.getItem('sewageTreatmentPlant_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  };

  const saveDraft = () => {
    const draftData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      title: `Draft - ${formData.make || 'Untitled'}`
    };
    
    const updatedDrafts = [...drafts, draftData];
    setDrafts(updatedDrafts);
    localStorage.setItem('sewageTreatmentPlant_drafts', JSON.stringify(updatedDrafts));
    setIsDraftModalOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ship) newErrors.ship = 'Ship is required';
    if (!formData.dateOfInspection) newErrors.dateOfInspection = 'Date of Inspection is required';
    if (!formData.make) newErrors.make = 'Make is required';

    // Validate all observation sections
    const sections = [
      { obs: 'observationsElectrical', rem: 'remarksElectrical', name: 'Remote Indicator Panel Electrical Hygiene' },
      { obs: 'observationsSwitches', rem: 'remarksSwitches', name: 'Remote Indicator Panel Functioning of Switches' },
      { obs: 'observationsIndicators', rem: 'remarksIndicators', name: 'Remote Indicator Panel Functioning of Indicators' },
      { obs: 'observationsLocalControl', rem: 'remarksLocalControl', name: 'Local Control Panel Electrical Hygiene' },
      { obs: 'observationsFuncSwitches', rem: 'remarksFuncSwitches', name: 'Local Control Panel Functioning of Switches' },
      { obs: 'observationsFuncIndicators', rem: 'remarksFuncIndicators', name: 'Local Control Panel Functioning of Indicators' },
      { obs: 'observationsLevelSensors', rem: 'remarksLevelSensors', name: 'Level Sensors Collection Tank Functioning of Sensors' },
      { obs: 'observationsAutomode', rem: 'remarksAutomode', name: 'Auto Mode' },
      { obs: 'observationLogbook', rem: 'remarksLogbook', name: 'Log Book Number of Running Hours' },
      { obs: 'observationsInsulation', rem: 'remarksInsulation', name: 'Check For Motor Insulation Readings' },
      { obs: 'observationsNaturalVentilation', rem: 'remarksNaturalVentilation', name: 'Natural Ventilation Arrangement for Tanks' },
      { obs: 'observationsForcedVentilation', rem: 'remarksForcedVentilation', name: 'Forced Ventilation of the Tanks' },
      { obs: 'observationsForcedExhaust', rem: 'remarksForcedExhaust', name: 'Check for Forced Exhaust Ventilation' },
      { obs: 'observationsFoundation', rem: 'remarksFoundation', name: 'Conditions of Foundations' },
      { obs: 'observationsBod', rem: 'remarksBod', name: 'Bio-Oxygen Demand, BOD' },
      { obs: 'observationsSuspendSolid', rem: 'remarksSuspendSolid', name: 'Total Suspended Solids' },
      { obs: 'observationsColiform', rem: 'remarksColiform', name: 'Faecal Coliform Count' },
      { obs: 'observationsOverall', rem: 'remarksOverall', name: 'Overall Remarks' },
    ];

    sections.forEach(section => {
      if (!formData[section.obs as keyof SewageTreatmentPlantData]) {
        newErrors[section.obs] = `${section.name} observations are required`;
      }
      if (!formData[section.rem as keyof SewageTreatmentPlantData]) {
        newErrors[section.rem] = `${section.name} remarks are required`;
      }
    });

    // Validate dates
    if (!formData.dateLastCalibration) newErrors.dateLastCalibration = 'Date of Calibration is required';
    if (!formData.lastCalibrationDueDate) newErrors.lastCalibrationDueDate = 'Next Due Date is required';
    if (!formData.remarksCalibration) newErrors.remarksCalibration = 'Calibration remarks are required';

    if (!formData.datePortableCalibration) newErrors.datePortableCalibration = 'Portable Calibrated Date is required';
    if (!formData.portableCalibrationDueDate) newErrors.portableCalibrationDueDate = 'Portable Next Due Date is required';
    if (!formData.remarksPortableCalibration) newErrors.remarksPortableCalibration = 'Portable calibration remarks are required';

    if (!formData.lastPressureDate) newErrors.lastPressureDate = 'Last Pressure Test Date is required';
    if (!formData.lastPressureDueDate) newErrors.lastPressureDueDate = 'Next Due Date is required';
    if (!formData.remarksLastPressure) newErrors.remarksLastPressure = 'Pressure test remarks are required';

    if (!formData.lastEffluentDate) newErrors.lastEffluentDate = 'Last Effluent Test Date is required';
    if (!formData.lastEffluentDueDate) newErrors.lastEffluentDueDate = 'Next Due Date is required';
    if (!formData.remarksEffluent) newErrors.remarksEffluent = 'Effluent certificate remarks are required';

    if (!formData.remarksAnyOther) newErrors.remarksAnyOther = 'Any Other Observation remarks are required';

    if (!formData.authoritySignature) newErrors.authoritySignature = 'Authority Signature is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      ship: '',
      dateOfInspection: null,
      make: '',
      observationsElectrical: '',
      remarksElectrical: '',
      observationsSwitches: '',
      remarksSwitches: '',
      observationsIndicators: '',
      remarksIndicators: '',
      observationsLocalControl: '',
      remarksLocalControl: '',
      observationsFuncSwitches: '',
      remarksFuncSwitches: '',
      observationsFuncIndicators: '',
      remarksFuncIndicators: '',
      observationsLevelSensors: '',
      remarksLevelSensors: '',
      dateLastCalibration: null,
      lastCalibrationDueDate: null,
      remarksCalibration: '',
      datePortableCalibration: null,
      portableCalibrationDueDate: null,
      remarksPortableCalibration: '',
      observationsAutomode: '',
      remarksAutomode: '',
      observationLogbook: '',
      remarksLogbook: '',
      observationsInsulation: '',
      remarksInsulation: '',
      observationsNaturalVentilation: '',
      remarksNaturalVentilation: '',
      observationsForcedVentilation: '',
      remarksForcedVentilation: '',
      observationsForcedExhaust: '',
      remarksForcedExhaust: '',
      observationsFoundation: '',
      remarksFoundation: '',
      lastPressureDate: null,
      lastPressureDueDate: null,
      remarksLastPressure: '',
      observationsBod: '',
      remarksBod: '',
      observationsSuspendSolid: '',
      remarksSuspendSolid: '',
      observationsColiform: '',
      remarksColiform: '',
      lastEffluentDate: null,
      lastEffluentDueDate: null,
      remarksEffluent: '',
      remarksAnyOther: '',
      observationsOverall: '',
      remarksOverall: '',
      authoritySignature: null,
    });
    setErrors({});
  };

  const ObservationSection: React.FC<{ 
    title: string; 
    observations: string;
    remarks: string;
    onObservationsChange: (value: string) => void;
    onRemarksChange: (value: string) => void;
    required?: boolean;
    observationsOptions?: string[];
  }> = ({ title, observations, remarks, onObservationsChange, onRemarksChange, required = true, observationsOptions = [] }) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Observations {required && '*'}</Label>
          <Select value={observations} onValueChange={onObservationsChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select observation" />
            </SelectTrigger>
            <SelectContent>
              {(observationsOptions || []).map(obs => (
                <SelectItem key={obs} value={obs}>{obs}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Remarks {required && '*'}</Label>
          <Textarea
            value={remarks}
            onChange={(e) => onRemarksChange(e.target.value)}
            placeholder="Enter remarks"
            rows={2}
          />
        </div>
      </div>
    </div>
  );

  const DateSection: React.FC<{
    title: string;
    lastDate: Date | null;
    dueDate: Date | null;
    remarks: string;
    onLastDateChange: (date: Date | null) => void;
    onDueDateChange: (date: Date | null) => void;
    onRemarksChange: (value: string) => void;
  }> = ({ title, lastDate, dueDate, remarks, onLastDateChange, onDueDateChange, onRemarksChange }) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Last Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {lastDate ? format(lastDate, 'dd-MM-yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={lastDate || undefined}
                onSelect={onLastDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Next Due Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, 'dd-MM-yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate || undefined}
                onSelect={onDueDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Remarks *</Label>
          <Textarea
            value={remarks}
            onChange={(e) => onRemarksChange(e.target.value)}
            placeholder="Enter remarks"
            rows={2}
          />
        </div>
      </div>
    </div>
  );

  const MeasuredValueSection: React.FC<{
    title: string;
    measuredValue: string;
    remarks: string;
    onMeasuredValueChange: (value: string) => void;
    onRemarksChange: (value: string) => void;
    maxValue?: string;
  }> = ({ title, measuredValue, remarks, onMeasuredValueChange, onRemarksChange, maxValue }) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      {maxValue && <p className="text-sm text-gray-600">Max: {maxValue}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Measured Values *</Label>
          <Input
            value={measuredValue}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              onMeasuredValueChange(value);
            }}
            placeholder="Enter measured value"
            maxLength={5}
          />
        </div>
        <div>
          <Label>Remarks *</Label>
          <Textarea
            value={remarks}
            onChange={(e) => onRemarksChange(e.target.value)}
            placeholder="Enter remarks"
            rows={2}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEWAGE TREATMENT PLANT</h1>
        <p className="text-gray-600">Form for Sewage Treatment Plant inspection and trials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">1. Ship</h4>
              <div>
                <Label htmlFor="ship">Ship *</Label>
                <Select value={formData.ship} onValueChange={(value) => setFormData(prev => ({ ...prev, ship: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="43">SHIVALIK</SelectItem>
                    <SelectItem value="84">JAMUNA</SelectItem>
                    <SelectItem value="23">BANGARAM</SelectItem>
                    <SelectItem value="56">TARANGINI</SelectItem>
                    <SelectItem value="99">SARYU</SelectItem>
                    <SelectItem value="31">KUMBHIR</SelectItem>
                    <SelectItem value="87">T-83</SelectItem>
                    <SelectItem value="27">AIRAVAT</SelectItem>
                    <SelectItem value="48">KHANJAR</SelectItem>
                    <SelectItem value="57">SHUDERSHINI</SelectItem>
                    <SelectItem value="59">TRISHUL</SelectItem>
                    <SelectItem value="62">TEG</SelectItem>
                    <SelectItem value="55">RANVIJAY</SelectItem>
                    <SelectItem value="47">KIRPAN</SelectItem>
                    <SelectItem value="35">DELHI</SelectItem>
                    <SelectItem value="83">SURVEKSHAK</SelectItem>
                    <SelectItem value="65">JYOTI</SelectItem>
                    <SelectItem value="94">SUJATA</SelectItem>
                    <SelectItem value="76">KABRA</SelectItem>
                    <SelectItem value="68">CANKARSO</SelectItem>
                    <SelectItem value="88">T-84</SelectItem>
                    <SelectItem value="18">VIBHUTI</SelectItem>
                    <SelectItem value="17">NISHANK</SelectItem>
                    <SelectItem value="25">MAGAR</SelectItem>
                    <SelectItem value="42">BEAS</SelectItem>
                    <SelectItem value="90">SUVERNA</SelectItem>
                    <SelectItem value="45">SAHYADRI</SelectItem>
                    <SelectItem value="16">PRALAYA</SelectItem>
                    <SelectItem value="74">CHERIYAM</SelectItem>
                    <SelectItem value="44">SATPURA</SelectItem>
                    <SelectItem value="20">JALASHWA</SelectItem>
                    <SelectItem value="63">TARKASH</SelectItem>
                    <SelectItem value="52">KARMUK</SelectItem>
                    <SelectItem value="82">SUTLEJ</SelectItem>
                    <SelectItem value="96">SUMEDHA</SelectItem>
                    <SelectItem value="15">PRABAL</SelectItem>
                    <SelectItem value="75">CORA DIVH</SelectItem>
                    <SelectItem value="21">BATTIMALV</SelectItem>
                    <SelectItem value="38">CHENNAI</SelectItem>
                    <SelectItem value="97">SUMITRA</SelectItem>
                    <SelectItem value="86">T-82</SelectItem>
                    <SelectItem value="46">KUTHAR</SelectItem>
                    <SelectItem value="69">KONDUL</SelectItem>
                    <SelectItem value="89">SUBHDRA</SelectItem>
                    <SelectItem value="80">DARSHAK</SelectItem>
                    <SelectItem value="24">BITRA</SelectItem>
                    <SelectItem value="73">CHETLAT</SelectItem>
                    <SelectItem value="81">NIREEKSHAK</SelectItem>
                    <SelectItem value="71">KARUVA</SelectItem>
                    <SelectItem value="67">DEEPAK</SelectItem>
                    <SelectItem value="123">SHAKTI</SelectItem>
                    <SelectItem value="36">KOLKATA</SelectItem>
                    <SelectItem value="85">INVETIGATOR</SelectItem>
                    <SelectItem value="93">SHARDA</SelectItem>
                    <SelectItem value="64">SHAKTI</SelectItem>
                    <SelectItem value="33">MUMBAI</SelectItem>
                    <SelectItem value="39">GOMTI</SelectItem>
                    <SelectItem value="41">BETWA</SelectItem>
                    <SelectItem value="13">NASHAK</SelectItem>
                    <SelectItem value="70">KOSWARI</SelectItem>
                    <SelectItem value="30">CHEETAH</SelectItem>
                    <SelectItem value="58">TALWAR</SelectItem>
                    <SelectItem value="28">KESARI</SelectItem>
                    <SelectItem value="66">ADITYA</SelectItem>
                    <SelectItem value="22">BARATANG</SelectItem>
                    <SelectItem value="49">KORA</SelectItem>
                    <SelectItem value="51">KULISH</SelectItem>
                    <SelectItem value="53">RANA</SelectItem>
                    <SelectItem value="77">KALPENI</SelectItem>
                    <SelectItem value="122">SHAKTI</SelectItem>
                    <SelectItem value="12">VIPUL</SelectItem>
                    <SelectItem value="60">TABAR</SelectItem>
                    <SelectItem value="61">TRINKAND</SelectItem>
                    <SelectItem value="37">KOCHI</SelectItem>
                    <SelectItem value="91">SUKANYA</SelectItem>
                    <SelectItem value="92">SAVITRI</SelectItem>
                    <SelectItem value="29">GULDAR</SelectItem>
                    <SelectItem value="40">BRAHMAPUTRA</SelectItem>
                    <SelectItem value="26">GHARIAL</SelectItem>
                    <SelectItem value="54">RANVIR</SelectItem>
                    <SelectItem value="79">NIRUPAK</SelectItem>
                    <SelectItem value="19">VINASH</SelectItem>
                    <SelectItem value="50">KIRCH</SelectItem>
                    <SelectItem value="78">SANDHAYAK</SelectItem>
                    <SelectItem value="14">VIDYUT</SelectItem>
                    <SelectItem value="95">TIR</SelectItem>
                    <SelectItem value="32">GAJ</SelectItem>
                    <SelectItem value="72">CAR NICOBAR</SelectItem>
                    <SelectItem value="98">SUNAYNA</SelectItem>
                    <SelectItem value="34">MYSORE</SelectItem>
                  </SelectContent>
                </Select>
                {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">2. Date of Inspection/Trials</h4>
              <div>
                <Label>Date of Inspection/Trials *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfInspection ? format(formData.dateOfInspection, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfInspection || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateOfInspection: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfInspection && <p className="text-red-500 text-sm mt-1">{errors.dateOfInspection}</p>}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">3. Make</h4>
              <div>
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                    setFormData(prev => ({ ...prev, make: value }));
                  }}
                  placeholder="Enter make"
                  maxLength={20}
                />
                {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remote Indicator Panel (DCHQ) */}
        <Card>
          <CardHeader>
            <CardTitle>4. Remote Indicator Panel (DCHQ)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900">a) Electrical Hygiene-Carbon Deposit on Connectors, Pitted Lugs. Check Tightness of Electrical Cable Connections and Fasteners</h4>
              <ObservationSection
                title=""
                observations={formData.observationsElectrical}
                remarks={formData.remarksElectrical}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsElectrical: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksElectrical: value }))}
                observationsOptions={observations}
              />
              {errors.observationsElectrical && <p className="text-red-500 text-sm mt-1">{errors.observationsElectrical}</p>}
              {errors.remarksElectrical && <p className="text-red-500 text-sm mt-1">{errors.remarksElectrical}</p>}
            </div>

            <div>
              <h4 className="font-medium text-gray-900">b) Functioning of Switches</h4>
              <ObservationSection
                title=""
                observations={formData.observationsSwitches}
                remarks={formData.remarksSwitches}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsSwitches: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksSwitches: value }))}
                observationsOptions={opsObservations}
              />
            </div>

            <div>
              <h4 className="font-medium text-gray-900">c) Functioning of Indicators</h4>
              <ObservationSection
                title=""
                observations={formData.observationsIndicators}
                remarks={formData.remarksIndicators}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsIndicators: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksIndicators: value }))}
                observationsOptions={opsObservations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Local Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle>5. Local Control Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900">a) Electrical Hygiene-Carbon Deposit on Connectors, Pitted Lugs. Check Tightness of Electrical Cable Connections and Fasteners</h4>
              <ObservationSection
                title=""
                observations={formData.observationsLocalControl}
                remarks={formData.remarksLocalControl}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsLocalControl: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksLocalControl: value }))}
                observationsOptions={observations}
              />
            </div>

            <div>
              <h4 className="font-medium text-gray-900">b) Functioning of Switches</h4>
              <ObservationSection
                title=""
                observations={formData.observationsFuncSwitches}
                remarks={formData.remarksFuncSwitches}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsFuncSwitches: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksFuncSwitches: value }))}
                observationsOptions={opsObservations}
              />
            </div>

            <div>
              <h4 className="font-medium text-gray-900">c) Functioning of Indicators</h4>
              <ObservationSection
                title=""
                observations={formData.observationsFuncIndicators}
                remarks={formData.remarksFuncIndicators}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsFuncIndicators: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksFuncIndicators: value }))}
                observationsOptions={opsObservations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Level Sensors Collection Tank */}
        <Card>
          <CardHeader>
            <CardTitle>6. Level Sensors Collection Tank</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) Functioning of Sensors</h4>
              <ObservationSection
                title=""
                observations={formData.observationsLevelSensors}
                remarks={formData.remarksLevelSensors}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsLevelSensors: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksLevelSensors: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Calibration of Fixed H2S Sensors */}
        <Card>
          <CardHeader>
            <CardTitle>7. Calibration of Fixed H2S Sensors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Date of Calibration *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateLastCalibration ? format(formData.dateLastCalibration, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateLastCalibration || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dateLastCalibration: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateLastCalibration && <p className="text-red-500 text-sm mt-1">{errors.dateLastCalibration}</p>}
              </div>
              <div>
                <Label>Next Due Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastCalibrationDueDate ? format(formData.lastCalibrationDueDate, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastCalibrationDueDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastCalibrationDueDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.lastCalibrationDueDate && <p className="text-red-500 text-sm mt-1">{errors.lastCalibrationDueDate}</p>}
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.remarksCalibration}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarksCalibration: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
                {errors.remarksCalibration && <p className="text-red-500 text-sm mt-1">{errors.remarksCalibration}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calibration of Portable H2S Sensors */}
        <Card>
          <CardHeader>
            <CardTitle>8. Calibration of Portable H2S Sensors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Date of Calibration *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.datePortableCalibration ? format(formData.datePortableCalibration, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.datePortableCalibration || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, datePortableCalibration: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.datePortableCalibration && <p className="text-red-500 text-sm mt-1">{errors.datePortableCalibration}</p>}
              </div>
              <div>
                <Label>Next Due Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.portableCalibrationDueDate ? format(formData.portableCalibrationDueDate, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.portableCalibrationDueDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, portableCalibrationDueDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.portableCalibrationDueDate && <p className="text-red-500 text-sm mt-1">{errors.portableCalibrationDueDate}</p>}
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.remarksPortableCalibration}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarksPortableCalibration: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
                {errors.remarksPortableCalibration && <p className="text-red-500 text-sm mt-1">{errors.remarksPortableCalibration}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto Mode */}
        <Card>
          <CardHeader>
            <CardTitle>9. Auto Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              observations={formData.observationsAutomode}
              remarks={formData.remarksAutomode}
              onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsAutomode: value }))}
              onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksAutomode: value }))}
                observationsOptions={opsObservations}
            />
          </CardContent>
        </Card>

        {/* Log Book */}
        <Card>
          <CardHeader>
            <CardTitle>10. Log Book</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) Number of Running Hours in Current Year</h4>
              <ObservationSection
                title=""
                observations={formData.observationLogbook}
                remarks={formData.remarksLogbook}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationLogbook: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksLogbook: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Check For Motor Insulation Readings */}
        <Card>
          <CardHeader>
            <CardTitle>11. Check For Motor Insulation Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) &gt; 2 M Ohms</h4>
              <ObservationSection
                title=""
                observations={formData.observationsInsulation}
                remarks={formData.remarksInsulation}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsInsulation: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksInsulation: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Ventilation Arrangement */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Ventilation Arrangement</h3>
        </div>

        {/* Natural Ventilation Arrangement for Tanks */}
        <Card>
          <CardHeader>
            <CardTitle>12. Natural Ventilation Arrangement for Tanks</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              observations={formData.observationsNaturalVentilation}
              remarks={formData.remarksNaturalVentilation}
              onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsNaturalVentilation: value }))}
              onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksNaturalVentilation: value }))}
                observationsOptions={availableObservations}
            />
          </CardContent>
        </Card>

        {/* Forced Ventilation of the Tanks */}
        <Card>
          <CardHeader>
            <CardTitle>13. Forced Ventilation of the Tanks</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              observations={formData.observationsForcedVentilation}
              remarks={formData.remarksForcedVentilation}
              onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsForcedVentilation: value }))}
              onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksForcedVentilation: value }))}
                observationsOptions={availableObservations}
            />
          </CardContent>
        </Card>

        {/* Check for Forced Exhaust Ventilation */}
        <Card>
          <CardHeader>
            <CardTitle>14. Check for Forced Exhaust Ventilation</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) Ventilation Trunking to Reach Upto 150 mm Above Deck</h4>
              <ObservationSection
                title=""
                observations={formData.observationsForcedExhaust}
                remarks={formData.remarksForcedExhaust}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsForcedExhaust: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksForcedExhaust: value }))}
                observationsOptions={availableObservations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Structural Assessment */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Structural Assessment</h3>
        </div>

        {/* Conditions of Foundations */}
        <Card>
          <CardHeader>
            <CardTitle>15. Conditions of Foundations</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) Corrosion/ Pitting/ Unpainted/ Nil</h4>
              <ObservationSection
                title=""
                observations={formData.observationsFoundation}
                remarks={formData.remarksFoundation}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsFoundation: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksFoundation: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pressure Test Certificate of Tanks */}
        <Card>
          <CardHeader>
            <CardTitle>16. Pressure Test Certificate of Tanks (Last Date)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Last Test Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastPressureDate ? format(formData.lastPressureDate, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastPressureDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastPressureDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.lastPressureDate && <p className="text-red-500 text-sm mt-1">{errors.lastPressureDate}</p>}
              </div>
              <div>
                <Label>Next Due Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastPressureDueDate ? format(formData.lastPressureDueDate, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastPressureDueDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastPressureDueDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.lastPressureDueDate && <p className="text-red-500 text-sm mt-1">{errors.lastPressureDueDate}</p>}
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.remarksLastPressure}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarksLastPressure: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
                {errors.remarksLastPressure && <p className="text-red-500 text-sm mt-1">{errors.remarksLastPressure}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Effluent Discharge Test */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Effluent Discharge Test</h3>
        </div>

        {/* Bio-Oxygen Demand, BOD */}
        <Card>
          <CardHeader>
            <CardTitle>17. Bio-Oxygen Demand, BOD (mg/l)</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) 50 mg/l</h4>
              <ObservationSection
                title=""
                observations={formData.observationsBod}
                remarks={formData.remarksBod}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsBod: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksBod: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Total Suspended Solids */}
        <Card>
          <CardHeader>
            <CardTitle>18. Total Suspended Solids (mg/l)</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) 100 mg/l</h4>
              <ObservationSection
                title=""
                observations={formData.observationsSuspendSolid}
                remarks={formData.remarksSuspendSolid}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsSuspendSolid: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksSuspendSolid: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Faecal Coliform Count */}
        <Card>
          <CardHeader>
            <CardTitle>19. Faecal Coliform Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-medium text-gray-900">a) 250 Faecal Coliform Counts / 100 ml</h4>
              <ObservationSection
                title=""
                observations={formData.observationsColiform}
                remarks={formData.remarksColiform}
                onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsColiform: value }))}
                onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksColiform: value }))}
                observationsOptions={observations}
              />
            </div>
          </CardContent>
        </Card>

        {/* Check for Effluent Certificate */}
        <Card>
          <CardHeader>
            <CardTitle>20. Check for Effluent Certificate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Last Effluent Test Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastEffluentDate ? format(formData.lastEffluentDate, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastEffluentDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastEffluentDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.lastEffluentDate && <p className="text-red-500 text-sm mt-1">{errors.lastEffluentDate}</p>}
              </div>
              <div>
                <Label>Next Due Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastEffluentDueDate ? format(formData.lastEffluentDueDate, 'dd-MM-yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastEffluentDueDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, lastEffluentDueDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.lastEffluentDueDate && <p className="text-red-500 text-sm mt-1">{errors.lastEffluentDueDate}</p>}
              </div>
              <div>
                <Label>Remarks *</Label>
                <Textarea
                  value={formData.remarksEffluent}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarksEffluent: e.target.value }))}
                  placeholder="Enter remarks"
                  rows={2}
                />
                {errors.remarksEffluent && <p className="text-red-500 text-sm mt-1">{errors.remarksEffluent}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Any Other Observation */}
        <Card>
          <CardHeader>
            <CardTitle>21. Any Other Observation</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Remarks *</Label>
              <Textarea
                value={formData.remarksAnyOther}
                onChange={(e) => setFormData(prev => ({ ...prev, remarksAnyOther: e.target.value }))}
                placeholder="Enter any other observations"
                rows={3}
              />
              {errors.remarksAnyOther && <p className="text-red-500 text-sm mt-1">{errors.remarksAnyOther}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Overall Remarks */}
        <Card>
          <CardHeader>
            <CardTitle>22. Overall Remarks</CardTitle>
          </CardHeader>
          <CardContent>
            <ObservationSection
              title=""
              observations={formData.observationsOverall}
              remarks={formData.remarksOverall}
              onObservationsChange={(value) => setFormData(prev => ({ ...prev, observationsOverall: value }))}
              onRemarksChange={(value) => setFormData(prev => ({ ...prev, remarksOverall: value }))}
                observationsOptions={observations}
            />
          </CardContent>
        </Card>

        {/* Authority Signature */}
        <Card>
          <CardHeader>
            <CardTitle>23. Authority Signature</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="authority_signature">Authority Signature *</Label>
              <div className="mt-2">
                <Input
                  id="authority_signature"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFormData(prev => ({ ...prev, authoritySignature: file || null }));
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.authoritySignature && <p className="text-red-500 text-sm mt-1">{errors.authoritySignature}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Form
          </Button>
          
          <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Save Draft</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Do you want to save this form as a draft?</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDraftModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveDraft}>
                    Save Draft
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button type="button" variant="outline" onClick={resetForm}>
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SewageTreatmentPlantForm;
