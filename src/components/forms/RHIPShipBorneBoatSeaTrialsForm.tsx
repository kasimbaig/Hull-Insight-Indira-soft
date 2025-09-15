import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';

interface RHIPShipBorneBoatSeaTrialsData {
  // Basic Information
  ship: string;
  dateOfTrials: Date | null;
  place: string;
  boatType: string;
  boatRegnNo: string;
  trialTeams: string;
  
  // Sea Trials Information
  seaState: string;
  windSpeed: string;
  visibility: string;
  temperature: string;
  humidity: string;
  
  // Performance Tests
  maxSpeed: string;
  cruisingSpeed: string;
  fuelConsumption: string;
  range: string;
  endurance: string;
  
  // Maneuvering Tests
  turningCircle: string;
  stoppingDistance: string;
  acceleration: string;
  deceleration: string;
  
  // Safety Equipment
  lifeJackets: string;
  lifeRaft: string;
  distressSignals: string;
  firstAidKit: string;
  fireExtinguisher: string;
  
  // Navigation Equipment
  compass: string;
  gps: string;
  radar: string;
  depthSound: string;
  radio: string;
  
  // Engine Performance
  engineStart: string;
  engineIdle: string;
  engineFullPower: string;
  engineTemperature: string;
  oilPressure: string;
  
  // Hull and Structure
  hullCondition: string;
  deckCondition: string;
  fittingsCondition: string;
  corrosionLevel: string;
  
  // Observations and Remarks
  generalObservations: string;
  recommendations: string;
  overallAssessment: string;
}

const RHIPShipBorneBoatSeaTrialsForm: React.FC = () => {
  const [formData, setFormData] = useState<RHIPShipBorneBoatSeaTrialsData>({
    ship: '',
    dateOfTrials: null,
    place: '',
    boatType: '',
    boatRegnNo: '',
    trialTeams: '',
    seaState: '',
    windSpeed: '',
    visibility: '',
    temperature: '',
    humidity: '',
    maxSpeed: '',
    cruisingSpeed: '',
    fuelConsumption: '',
    range: '',
    endurance: '',
    turningCircle: '',
    stoppingDistance: '',
    acceleration: '',
    deceleration: '',
    lifeJackets: '',
    lifeRaft: '',
    distressSignals: '',
    firstAidKit: '',
    fireExtinguisher: '',
    compass: '',
    gps: '',
    radar: '',
    depthSound: '',
    radio: '',
    engineStart: '',
    engineIdle: '',
    engineFullPower: '',
    engineTemperature: '',
    oilPressure: '',
    hullCondition: '',
    deckCondition: '',
    fittingsCondition: '',
    corrosionLevel: '',
    generalObservations: '',
    recommendations: '',
    overallAssessment: ''
  });

  const [errors, setErrors] = useState<Partial<RHIPShipBorneBoatSeaTrialsData>>({});

  const handleInputChange = (field: keyof RHIPShipBorneBoatSeaTrialsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateChange = (field: keyof RHIPShipBorneBoatSeaTrialsData, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date || null }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RHIPShipBorneBoatSeaTrialsData> = {};

    if (!formData.ship) newErrors.ship = 'Ship selection is required';
    if (!formData.dateOfTrials) newErrors.dateOfTrials = 'Date of trials is required';
    if (!formData.place) newErrors.place = 'Place is required';
    if (!formData.boatType) newErrors.boatType = 'Boat type is required';
    if (!formData.boatRegnNo) newErrors.boatRegnNo = 'Boat registration number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('RHIB Ship Borne Boat Sea Trials form submitted successfully!');
    }
  };

  const ships = [
    'SHIVALIK', 'JAMUNA', 'BANGARAM', 'TARANGINI', 'SARYU', 'MYSORE'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RHIB - SHIP BORNE BOAT - SEA TRIALS</h1>
        <p className="text-gray-600">Form for RHIB Ship Borne Boat Sea Trials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>1. Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ship">Ship <span className="text-red-500">*</span></Label>
                <Select value={formData.ship} onValueChange={(value) => handleInputChange('ship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Ship--" />
                  </SelectTrigger>
                  <SelectContent>
                    {ships.map((ship) => (
                      <SelectItem key={ship} value={ship}>
                        {ship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ship && <p className="text-red-500 text-sm mt-1">{errors.ship}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfTrials">Date of Sea Trials <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfTrials ? format(formData.dateOfTrials, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfTrials || undefined}
                      onSelect={(date) => handleDateChange('dateOfTrials', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfTrials && <p className="text-red-500 text-sm mt-1">{errors.dateOfTrials}</p>}
              </div>

              <div>
                <Label htmlFor="place">Place <span className="text-red-500">*</span></Label>
                <Input
                  id="place"
                  value={formData.place}
                  onChange={(e) => handleInputChange('place', e.target.value)}
                  placeholder="Enter place"
                  maxLength={50}
                />
                {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
              </div>

              <div>
                <Label htmlFor="boatType">Boat Type <span className="text-red-500">*</span></Label>
                <Input
                  id="boatType"
                  value={formData.boatType}
                  onChange={(e) => handleInputChange('boatType', e.target.value)}
                  placeholder="Enter boat type"
                  maxLength={30}
                />
                {errors.boatType && <p className="text-red-500 text-sm mt-1">{errors.boatType}</p>}
              </div>

              <div>
                <Label htmlFor="boatRegnNo">Boat Registration No. <span className="text-red-500">*</span></Label>
                <Input
                  id="boatRegnNo"
                  value={formData.boatRegnNo}
                  onChange={(e) => handleInputChange('boatRegnNo', e.target.value)}
                  placeholder="Enter boat registration number"
                  maxLength={20}
                />
                {errors.boatRegnNo && <p className="text-red-500 text-sm mt-1">{errors.boatRegnNo}</p>}
              </div>

              <div>
                <Label htmlFor="trialTeams">Trial Teams</Label>
                <Input
                  id="trialTeams"
                  value={formData.trialTeams}
                  onChange={(e) => handleInputChange('trialTeams', e.target.value)}
                  placeholder="Enter trial teams"
                  maxLength={100}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sea Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>2. Sea Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="seaState">Sea State</Label>
                <Select value={formData.seaState} onValueChange={(value) => handleInputChange('seaState', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Sea State--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 - Calm</SelectItem>
                    <SelectItem value="1">1 - Smooth</SelectItem>
                    <SelectItem value="2">2 - Slight</SelectItem>
                    <SelectItem value="3">3 - Moderate</SelectItem>
                    <SelectItem value="4">4 - Rough</SelectItem>
                    <SelectItem value="5">5 - Very Rough</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="windSpeed">Wind Speed (knots)</Label>
                <Input
                  id="windSpeed"
                  value={formData.windSpeed}
                  onChange={(e) => handleInputChange('windSpeed', e.target.value)}
                  placeholder="Enter wind speed"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="visibility">Visibility (nm)</Label>
                <Input
                  id="visibility"
                  value={formData.visibility}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  placeholder="Enter visibility"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  placeholder="Enter temperature"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', e.target.value)}
                  placeholder="Enter humidity"
                  type="number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Tests */}
        <Card>
          <CardHeader>
            <CardTitle>3. Performance Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxSpeed">Maximum Speed (knots)</Label>
                <Input
                  id="maxSpeed"
                  value={formData.maxSpeed}
                  onChange={(e) => handleInputChange('maxSpeed', e.target.value)}
                  placeholder="Enter maximum speed"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="cruisingSpeed">Cruising Speed (knots)</Label>
                <Input
                  id="cruisingSpeed"
                  value={formData.cruisingSpeed}
                  onChange={(e) => handleInputChange('cruisingSpeed', e.target.value)}
                  placeholder="Enter cruising speed"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="fuelConsumption">Fuel Consumption (L/hr)</Label>
                <Input
                  id="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={(e) => handleInputChange('fuelConsumption', e.target.value)}
                  placeholder="Enter fuel consumption"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="range">Range (nm)</Label>
                <Input
                  id="range"
                  value={formData.range}
                  onChange={(e) => handleInputChange('range', e.target.value)}
                  placeholder="Enter range"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="endurance">Endurance (hours)</Label>
                <Input
                  id="endurance"
                  value={formData.endurance}
                  onChange={(e) => handleInputChange('endurance', e.target.value)}
                  placeholder="Enter endurance"
                  type="number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maneuvering Tests */}
        <Card>
          <CardHeader>
            <CardTitle>4. Maneuvering Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="turningCircle">Turning Circle (meters)</Label>
                <Input
                  id="turningCircle"
                  value={formData.turningCircle}
                  onChange={(e) => handleInputChange('turningCircle', e.target.value)}
                  placeholder="Enter turning circle"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="stoppingDistance">Stopping Distance (meters)</Label>
                <Input
                  id="stoppingDistance"
                  value={formData.stoppingDistance}
                  onChange={(e) => handleInputChange('stoppingDistance', e.target.value)}
                  placeholder="Enter stopping distance"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="acceleration">Acceleration (0-20 knots in seconds)</Label>
                <Input
                  id="acceleration"
                  value={formData.acceleration}
                  onChange={(e) => handleInputChange('acceleration', e.target.value)}
                  placeholder="Enter acceleration time"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="deceleration">Deceleration (20-0 knots in seconds)</Label>
                <Input
                  id="deceleration"
                  value={formData.deceleration}
                  onChange={(e) => handleInputChange('deceleration', e.target.value)}
                  placeholder="Enter deceleration time"
                  type="number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Equipment */}
        <Card>
          <CardHeader>
            <CardTitle>5. Safety Equipment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lifeJackets">Life Jackets</Label>
                <Select value={formData.lifeJackets} onValueChange={(value) => handleInputChange('lifeJackets', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="lifeRaft">Life Raft</Label>
                <Select value={formData.lifeRaft} onValueChange={(value) => handleInputChange('lifeRaft', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="distressSignals">Distress Signals</Label>
                <Select value={formData.distressSignals} onValueChange={(value) => handleInputChange('distressSignals', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="firstAidKit">First Aid Kit</Label>
                <Select value={formData.firstAidKit} onValueChange={(value) => handleInputChange('firstAidKit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fireExtinguisher">Fire Extinguisher</Label>
                <Select value={formData.fireExtinguisher} onValueChange={(value) => handleInputChange('fireExtinguisher', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Equipment */}
        <Card>
          <CardHeader>
            <CardTitle>6. Navigation Equipment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="compass">Compass</Label>
                <Select value={formData.compass} onValueChange={(value) => handleInputChange('compass', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gps">GPS</Label>
                <Select value={formData.gps} onValueChange={(value) => handleInputChange('gps', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="radar">Radar</Label>
                <Select value={formData.radar} onValueChange={(value) => handleInputChange('radar', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="depthSound">Depth Sounder</Label>
                <Select value={formData.depthSound} onValueChange={(value) => handleInputChange('depthSound', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="radio">Radio</Label>
                <Select value={formData.radio} onValueChange={(value) => handleInputChange('radio', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engine Performance */}
        <Card>
          <CardHeader>
            <CardTitle>7. Engine Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="engineStart">Engine Start</Label>
                <Select value={formData.engineStart} onValueChange={(value) => handleInputChange('engineStart', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="engineIdle">Engine Idle</Label>
                <Select value={formData.engineIdle} onValueChange={(value) => handleInputChange('engineIdle', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="engineFullPower">Engine Full Power</Label>
                <Select value={formData.engineFullPower} onValueChange={(value) => handleInputChange('engineFullPower', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="engineTemperature">Engine Temperature</Label>
                <Input
                  id="engineTemperature"
                  value={formData.engineTemperature}
                  onChange={(e) => handleInputChange('engineTemperature', e.target.value)}
                  placeholder="Enter temperature"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="oilPressure">Oil Pressure</Label>
                <Input
                  id="oilPressure"
                  value={formData.oilPressure}
                  onChange={(e) => handleInputChange('oilPressure', e.target.value)}
                  placeholder="Enter oil pressure"
                  type="number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hull and Structure */}
        <Card>
          <CardHeader>
            <CardTitle>8. Hull and Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hullCondition">Hull Condition</Label>
                <Select value={formData.hullCondition} onValueChange={(value) => handleInputChange('hullCondition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deckCondition">Deck Condition</Label>
                <Select value={formData.deckCondition} onValueChange={(value) => handleInputChange('deckCondition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fittingsCondition">Fittings Condition</Label>
                <Select value={formData.fittingsCondition} onValueChange={(value) => handleInputChange('fittingsCondition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="UNSAT">UNSAT</SelectItem>
                    <SelectItem value="SAT WITH OBSERVATION">SAT WITH OBSERVATION</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="corrosionLevel">Corrosion Level</Label>
                <Select value={formData.corrosionLevel} onValueChange={(value) => handleInputChange('corrosionLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="--Select Level--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MINIMAL">MINIMAL</SelectItem>
                    <SelectItem value="MODERATE">MODERATE</SelectItem>
                    <SelectItem value="SEVERE">SEVERE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observations and Remarks */}
        <Card>
          <CardHeader>
            <CardTitle>9. Observations and Remarks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="generalObservations">General Observations</Label>
              <Textarea
                id="generalObservations"
                value={formData.generalObservations}
                onChange={(e) => handleInputChange('generalObservations', e.target.value)}
                placeholder="Enter general observations"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea
                id="recommendations"
                value={formData.recommendations}
                onChange={(e) => handleInputChange('recommendations', e.target.value)}
                placeholder="Enter recommendations"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="overallAssessment">Overall Assessment</Label>
              <Select value={formData.overallAssessment} onValueChange={(value) => handleInputChange('overallAssessment', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="--Select Overall Assessment--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SATISFACTORY">SATISFACTORY</SelectItem>
                  <SelectItem value="UNSATISFACTORY">UNSATISFACTORY</SelectItem>
                  <SelectItem value="SATISFACTORY WITH OBSERVATIONS">SATISFACTORY WITH OBSERVATIONS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RHIPShipBorneBoatSeaTrialsForm;
