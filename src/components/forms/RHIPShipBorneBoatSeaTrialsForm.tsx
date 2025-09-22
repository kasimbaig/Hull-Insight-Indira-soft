import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface PowerRegimeData {
  id: string;
  srNo: string;
  run: string;
  engineSpeedRPM: string;
  speedByGPS: string;
  coolantTemp: string;
  loPressure: string;
}

interface RHIPShipBorneBoatSeaTrialsData {
  // Basic Information
  place: string;
  date: Date | null;
  wind: string;
  seaState: string;
  boatType: string;
  boatRegnNo: string;
  distance: string;
  
  // Representatives
  shipRepresentative: string;
  trialTeamsRepresentative: string;
  
  // Light Load Condition Power Regimes
  lightLoad50Power: PowerRegimeData[];
  lightLoad85Power: PowerRegimeData[];
  lightLoad100Power: PowerRegimeData[];
  lightLoadRemarks: string;
  
  // Full Load Condition Power Regimes
  fullLoad50Power: PowerRegimeData[];
  fullLoad85Power: PowerRegimeData[];
  fullLoad100Power: PowerRegimeData[];
  fullLoadRemarks: string;
}

const RHIPShipBorneBoatSeaTrialsForm: React.FC = () => {
  const [formData, setFormData] = useState<RHIPShipBorneBoatSeaTrialsData>({
    place: '',
    date: null,
    wind: '',
    seaState: '',
    boatType: '',
    boatRegnNo: '',
    distance: '1 Nm (Nautical mile) for each run.',
    shipRepresentative: '',
    trialTeamsRepresentative: '',
    lightLoad50Power: [],
    lightLoad85Power: [],
    lightLoad100Power: [],
    lightLoadRemarks: '',
    fullLoad50Power: [],
    fullLoad85Power: [],
    fullLoad100Power: [],
    fullLoadRemarks: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    const savedDrafts = localStorage.getItem('rhibSeaTrials_drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  };

  const saveDraft = () => {
    const draftData = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      title: `Draft - ${formData.place || 'Untitled'} - ${formData.boatType || 'No Type'}`
    };
    
    const updatedDrafts = [...drafts, draftData];
    setDrafts(updatedDrafts);
    localStorage.setItem('rhibSeaTrials_drafts', JSON.stringify(updatedDrafts));
    setIsDraftModalOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.place) newErrors.place = 'Place is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.wind) newErrors.wind = 'Wind is required';
    if (!formData.seaState) newErrors.seaState = 'Sea State is required';
    if (!formData.boatType) newErrors.boatType = 'Boat Type is required';
    if (!formData.boatRegnNo) newErrors.boatRegnNo = 'Boat Registration Number is required';
    if (!formData.shipRepresentative) newErrors.shipRepresentative = 'Ship Representative is required';
    if (!formData.trialTeamsRepresentative) newErrors.trialTeamsRepresentative = 'Trial Teams Representative is required';

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

  const resetForm = () => {
    setFormData({
      place: '',
      date: null,
      wind: '',
      seaState: '',
      boatType: '',
      boatRegnNo: '',
      distance: '1 Nm (Nautical mile) for each run.',
      shipRepresentative: '',
      trialTeamsRepresentative: '',
      lightLoad50Power: [],
      lightLoad85Power: [],
      lightLoad100Power: [],
      lightLoadRemarks: '',
      fullLoad50Power: [],
      fullLoad85Power: [],
      fullLoad100Power: [],
      fullLoadRemarks: '',
    });
    setErrors({});
  };

  const addPowerRegimeRow = (powerType: string, powerLevel: string) => {
    const newRow: PowerRegimeData = {
      id: Date.now().toString(),
      srNo: '',
      run: '',
      engineSpeedRPM: '',
      speedByGPS: '',
      coolantTemp: '',
      loPressure: '',
    };

    setFormData(prev => ({
      ...prev,
      [`${powerType}${powerLevel}Power`]: [...prev[`${powerType}${powerLevel}Power` as keyof RHIPShipBorneBoatSeaTrialsData] as PowerRegimeData[], newRow]
    }));
  };

  const removePowerRegimeRow = (powerType: string, powerLevel: string, id: string) => {
    setFormData(prev => ({
      ...prev,
      [`${powerType}${powerLevel}Power`]: (prev[`${powerType}${powerLevel}Power` as keyof RHIPShipBorneBoatSeaTrialsData] as PowerRegimeData[]).filter(row => row.id !== id)
    }));
  };

  const updatePowerRegimeRow = (powerType: string, powerLevel: string, id: string, field: keyof PowerRegimeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${powerType}${powerLevel}Power`]: (prev[`${powerType}${powerLevel}Power` as keyof RHIPShipBorneBoatSeaTrialsData] as PowerRegimeData[]).map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    }));
  };

  const renderPowerRegimeTable = (powerType: string, powerLevel: string, title: string) => {
    const powerData = formData[`${powerType}${powerLevel}Power` as keyof RHIPShipBorneBoatSeaTrialsData] as PowerRegimeData[];
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-gray-800">{title}</h4>
          <Button
            type="button"
            onClick={() => addPowerRegimeRow(powerType, powerLevel)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Add Row
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Sr No.</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Run*</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Engine Speed RPM*</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Parameters</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Speed by GPS (Knot)*</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Coolant Temp (°C)*</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">LO Pressure (bar)*</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {powerData.map((row, index) => (
                <tr key={row.id}>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.srNo}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'srNo', e.target.value)}
                      placeholder={`(${String.fromCharCode(97 + index)})`}
                      className="border-0 p-1 w-16"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.run}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'run', e.target.value)}
                      placeholder="Enter run"
                      className="border-0 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.engineSpeedRPM}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'engineSpeedRPM', e.target.value)}
                      placeholder="Enter RPM"
                      className="border-0 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="text-sm text-gray-600">Parameters</div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.speedByGPS}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'speedByGPS', e.target.value)}
                      placeholder="Enter speed"
                      className="border-0 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.coolantTemp}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'coolantTemp', e.target.value)}
                      placeholder="Enter temp"
                      className="border-0 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.loPressure}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'loPressure', e.target.value)}
                      placeholder="Enter pressure"
                      className="border-0 p-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Button
                      type="button"
                      onClick={() => removePowerRegimeRow(powerType, powerLevel, row.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="place">Place *</Label>
                <Input
                  id="place"
                  value={formData.place}
                  onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                  placeholder="Enter place"
                  maxLength={50}
                />
                {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, date: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <Label htmlFor="wind">Wind *</Label>
                <Input
                  id="wind"
                  value={formData.wind}
                  onChange={(e) => setFormData(prev => ({ ...prev, wind: e.target.value }))}
                  placeholder="Enter wind conditions"
                  maxLength={50}
                />
                {errors.wind && <p className="text-red-500 text-sm mt-1">{errors.wind}</p>}
              </div>

              <div>
                <Label htmlFor="seaState">Sea State *</Label>
                <Input
                  id="seaState"
                  value={formData.seaState}
                  onChange={(e) => setFormData(prev => ({ ...prev, seaState: e.target.value }))}
                  placeholder="Enter sea state"
                  maxLength={50}
                />
                {errors.seaState && <p className="text-red-500 text-sm mt-1">{errors.seaState}</p>}
              </div>

              <div>
                <Label htmlFor="boatType">Boat Type *</Label>
                <Input
                  id="boatType"
                  value={formData.boatType}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatType: e.target.value }))}
                  placeholder="Enter boat type"
                  maxLength={50}
                />
                {errors.boatType && <p className="text-red-500 text-sm mt-1">{errors.boatType}</p>}
              </div>

              <div>
                <Label htmlFor="boatRegnNo">Boat Regn No *</Label>
                <Input
                  id="boatRegnNo"
                  value={formData.boatRegnNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, boatRegnNo: e.target.value }))}
                  placeholder="Enter boat registration number"
                  maxLength={50}
                />
                {errors.boatRegnNo && <p className="text-red-500 text-sm mt-1">{errors.boatRegnNo}</p>}
              </div>

              <div>
                <Label htmlFor="distance">Distance</Label>
                <Input
                  id="distance"
                  value={formData.distance}
                  onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                  placeholder="Enter distance"
                  maxLength={50}
                />
              </div>
            </div>

            {/* Representatives */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Representatives:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipRepresentative">(a) Ship *</Label>
                  <Input
                    id="shipRepresentative"
                    value={formData.shipRepresentative}
                    onChange={(e) => setFormData(prev => ({ ...prev, shipRepresentative: e.target.value }))}
                    placeholder="Enter ship representative"
                    maxLength={50}
                  />
                  {errors.shipRepresentative && <p className="text-red-500 text-sm mt-1">{errors.shipRepresentative}</p>}
                </div>

                <div>
                  <Label htmlFor="trialTeamsRepresentative">(b) Trial Teams *</Label>
                  <Input
                    id="trialTeamsRepresentative"
                    value={formData.trialTeamsRepresentative}
                    onChange={(e) => setFormData(prev => ({ ...prev, trialTeamsRepresentative: e.target.value }))}
                    placeholder="Enter trial teams representative"
                    maxLength={50}
                  />
                  {errors.trialTeamsRepresentative && <p className="text-red-500 text-sm mt-1">{errors.trialTeamsRepresentative}</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Light Load Condition Power Regimes */}
        <Card>
          <CardHeader>
            <CardTitle>1. Light Load Condition Power Regimes are as Follows: -</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderPowerRegimeTable('lightLoad', '50', 'a. 50% Power')}
            {renderPowerRegimeTable('lightLoad', '85', 'b. 85% Power')}
            {renderPowerRegimeTable('lightLoad', '100', 'c. 100% Power (Max ERPM Achieved)')}
            
            <div>
              <Label htmlFor="lightLoadRemarks">Remarks *</Label>
              <Textarea
                id="lightLoadRemarks"
                value={formData.lightLoadRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, lightLoadRemarks: e.target.value }))}
                placeholder="Enter remarks for light load condition"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Full Load Condition Power Regimes */}
        <Card>
          <CardHeader>
            <CardTitle>2. Full Load Condition Power regimes are as follows: -</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderPowerRegimeTable('fullLoad', '50', 'a. 50% Power')}
            {renderPowerRegimeTable('fullLoad', '85', 'b. 85% Power')}
            {renderPowerRegimeTable('fullLoad', '100', 'c. 100% Power (Max ERPM Achieved)')}
            
            <div>
              <Label htmlFor="fullLoadRemarks">Remarks *</Label>
              <Textarea
                id="fullLoadRemarks"
                value={formData.fullLoadRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, fullLoadRemarks: e.target.value }))}
                placeholder="Enter remarks for full load condition"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={() => setIsDraftModalOpen(true)}>
            Fetch Drafts
          </Button>
          
          <Button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" onClick={saveDraft}>
            SAVE DRAFT
          </Button>
          
          <Button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded" onClick={resetForm}>
            Clear
          </Button>
          
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Save
          </Button>
        </div>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Saved Drafts</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {drafts.length === 0 ? (
                  <p className="text-center text-gray-500">No drafts saved yet</p>
                ) : (
                  drafts.map((draft) => (
                    <div key={draft.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{draft.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(draft.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setFormData(draft);
                              setIsDraftModalOpen(false);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              const updatedDrafts = drafts.filter(d => d.id !== draft.id);
                              setDrafts(updatedDrafts);
                              localStorage.setItem('rhibSeaTrials_drafts', JSON.stringify(updatedDrafts));
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};

export default RHIPShipBorneBoatSeaTrialsForm;
