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
    lightLoad50Power: [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ],
    lightLoad85Power: [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ],
    lightLoad100Power: [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ],
    lightLoadRemarks: '',
    fullLoad50Power: [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ],
    fullLoad85Power: [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ],
    fullLoad100Power: [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ],
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
      lightLoad50Power: [
        { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
      ],
      lightLoad85Power: [
        { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
      ],
      lightLoad100Power: [
        { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
      ],
      lightLoadRemarks: '',
      fullLoad50Power: [
        { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
      ],
      fullLoad85Power: [
        { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
      ],
      fullLoad100Power: [
        { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
        { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
      ],
      fullLoadRemarks: '',
    });
    setErrors({});
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
    
    // Initialize with 4 fixed rows if empty
    const fixedRows = powerData.length === 0 ? [
      { id: '1', srNo: '(i)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '2', srNo: '(ii)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '3', srNo: '(iii)', run: 'Up', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' },
      { id: '4', srNo: '(iv)', run: 'Down', engineSpeedRPM: '', speedByGPS: '', coolantTemp: '', loPressure: '' }
    ] : powerData;
    
    return (
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-gray-800">{title}</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="text-white" style={{ backgroundColor: '#131c2f' }}>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Sr No.</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Run<strong className="text-red-500">*</strong></th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Engine Speed RPM<strong className="text-red-500">*</strong></th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Coolant Temp (°C)<strong className="text-red-500">*</strong></th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">LO Pressure (bar)<strong className="text-red-500">*</strong></th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium">Speed by GPS (Knot)<strong className="text-red-500">*</strong></th>
              </tr>
            </thead>
            <tbody>
              {fixedRows.map((row, index) => (
                <tr key={row.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <span className="text-gray-800 font-medium">{row.srNo}</span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <span className="text-gray-800 font-medium">{row.run}<strong className="text-red-500">*</strong></span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.engineSpeedRPM}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'engineSpeedRPM', e.target.value)}
                      placeholder=""
                      className="border-none border-b border-gray-300 rounded-none bg-transparent px-0 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.speedByGPS}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'speedByGPS', e.target.value)}
                      placeholder=""
                      className="border-none border-b border-gray-300 rounded-none bg-transparent px-0 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.coolantTemp}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'coolantTemp', e.target.value)}
                      placeholder=""
                      className="border-none border-b border-gray-300 rounded-none bg-transparent px-0 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Input
                      value={row.loPressure}
                      onChange={(e) => updatePowerRegimeRow(powerType, powerLevel, row.id, 'loPressure', e.target.value)}
                      placeholder=""
                      className="border-none border-b border-gray-300 rounded-none bg-transparent px-0 w-full"
                    />
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 underline">RHIB - SHIP BORNE BOAT - SEA TRIALS</h2>
            </div>
           
          </div>
      </div>


        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with navy blue accent */}
         
          {/* Content */}
          <div className="p-4 md:p-6">
            <div className="table-responsive overflow-x-auto">
              <table className="table table-striped table-bordered w-full">
                <tbody>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="place" className="block text-gray-800 font-bold mb-2">
                        Place: <strong className="text-red-500">*</strong>
                      </label>
                      <Input
                        id="place"
                        value={formData.place}
                        onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                        placeholder=""
                        maxLength={20}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
                    </td>
                    <td className="p-4">
                      <label htmlFor="date1" className="block text-gray-800 font-bold mb-2">
                        Date: <strong className="text-red-500">*</strong>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300 focus:border-blue-500">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, 'dd/MM/yyyy') : 'DD-MM-YYYY'}
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
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="wind" className="block text-gray-800 font-bold mb-2">
                        Wind: <strong className="text-red-500">*</strong>
                      </label>
                      <Input
                        id="wind"
                        value={formData.wind}
                        onChange={(e) => setFormData(prev => ({ ...prev, wind: e.target.value }))}
                        placeholder=""
                        maxLength={20}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.wind && <p className="text-red-500 text-sm mt-1">{errors.wind}</p>}
                    </td>
                    <td className="p-4">
                      <label htmlFor="sea_state" className="block text-gray-800 font-bold mb-2">
                        Sea State: <strong className="text-red-500">*</strong>
                      </label>
                      <Input
                        id="sea_state"
                        value={formData.seaState}
                        onChange={(e) => setFormData(prev => ({ ...prev, seaState: e.target.value }))}
                        placeholder=""
                        maxLength={20}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.seaState && <p className="text-red-500 text-sm mt-1">{errors.seaState}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label htmlFor="boat_type" className="block text-gray-800 font-bold mb-2">
                        Boat Type: <strong className="text-red-500">*</strong>
                      </label>
                      <Input
                        id="boat_type"
                        value={formData.boatType}
                        onChange={(e) => setFormData(prev => ({ ...prev, boatType: e.target.value }))}
                        placeholder=""
                        maxLength={20}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.boatType && <p className="text-red-500 text-sm mt-1">{errors.boatType}</p>}
                    </td>
                    <td className="p-4">
                      <label htmlFor="boat_regn_no" className="block text-gray-800 font-bold mb-2">
                        Boat Regn No: <strong className="text-red-500">*</strong>
                      </label>
                      <Input
                        id="boat_regn_no"
                        value={formData.boatRegnNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, boatRegnNo: e.target.value }))}
                        placeholder=""
                        maxLength={20}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.boatRegnNo && <p className="text-red-500 text-sm mt-1">{errors.boatRegnNo}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-4">
                      <strong className="text-gray-800">Distance:</strong> 1 Nm (Nautical mile) for each run.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <label className="block text-gray-800 font-bold mb-2">Representatives:</label>
                    </td>
                    <td className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-800 font-bold mb-2">
                            (a) Ship: <strong className="text-red-500">*</strong>
                          </label>
                          <Input
                            id="ship"
                            value={formData.shipRepresentative}
                            onChange={(e) => setFormData(prev => ({ ...prev, shipRepresentative: e.target.value }))}
                            placeholder=""
                            maxLength={20}
                            className="border-gray-300 focus:border-blue-500"
                          />
                          {errors.shipRepresentative && <p className="text-red-500 text-sm mt-1">{errors.shipRepresentative}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-800 font-bold mb-2">
                            (b) Trial Teams: <strong className="text-red-500">*</strong>
                          </label>
                          <Input
                            id="trial_teams"
                            value={formData.trialTeamsRepresentative}
                            onChange={(e) => setFormData(prev => ({ ...prev, trialTeamsRepresentative: e.target.value }))}
                            placeholder=""
                            maxLength={50}
                            className="border-gray-300 focus:border-blue-500"
                          />
                          {errors.trialTeamsRepresentative && <p className="text-red-500 text-sm mt-1">{errors.trialTeamsRepresentative}</p>}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Light Load Condition Power Regimes */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with navy blue accent */}
          <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-gray-800 font-bold mr-2">1.</span>
              Light Load Condition Power Regimes are as Follows: -
            </h3>
          </div>
          
          {/* Content */}
          <div className="p-4 md:p-6">
            {renderPowerRegimeTable('lightLoad', '50', 'a. 50% Power')}
            {renderPowerRegimeTable('lightLoad', '85', 'b. 85% Power')}
            {renderPowerRegimeTable('lightLoad', '100', 'c. 100% Power (Max ERPM Achieved)')}
            
            <div className="mt-6">
              <label className="block text-gray-800 font-medium mb-2">
                <strong>Remarks: <strong className="text-red-500">*</strong></strong>
              </label>
              <Textarea
                value={formData.lightLoadRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, lightLoadRemarks: e.target.value }))}
                placeholder="Enter remarks for light load condition"
                rows={3}
                className="w-full border border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Full Load Condition Power Regimes */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with navy blue accent */}
          <div className="bg-blue-100 border-l-4 border-blue-500 px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-gray-800 font-bold mr-2">2.</span>
              Full Load Condition Power regimes are as follows: -
            </h3>
          </div>
          
          {/* Content */}
          <div className="p-4 md:p-6">
            {renderPowerRegimeTable('fullLoad', '50', 'a. 50% Power')}
            {renderPowerRegimeTable('fullLoad', '85', 'b. 85% Power')}
            {renderPowerRegimeTable('fullLoad', '100', 'c. 100% Power (Max ERPM Achieved)')}
            
            <div className="mt-6">
              <label className="block text-gray-800 font-medium mb-2">
                <strong>Remarks: <strong className="text-red-500">*</strong></strong>
              </label>
              <Textarea
                value={formData.fullLoadRemarks}
                onChange={(e) => setFormData(prev => ({ ...prev, fullLoadRemarks: e.target.value }))}
                placeholder="Enter remarks for full load condition"
                rows={3}
                className="w-full border border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 md:px-6 py-4">
          <Button 
            type="button" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base" 
            onClick={() => setIsDraftModalOpen(true)}
          >
            Fetch Drafts
          </Button>
          
          <Button 
            type="button" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base" 
            onClick={saveDraft}
          >
            SAVE DRAFT
          </Button>
          
          <Button 
            type="button" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base" 
            onClick={resetForm}
          >
            Clear
          </Button>
          
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base"
          >
            Save
          </Button>
        </div>

        {/* Drafts Modal */}
        <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">Saved Drafts</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {drafts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No drafts saved yet</p>
                ) : (
                  drafts.map((draft) => (
                    <div key={draft.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{draft.title}</h3>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            {new Date(draft.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setFormData(draft);
                              setIsDraftModalOpen(false);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs md:text-sm"
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
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs md:text-sm"
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
    </div>
  );
};

export default RHIPShipBorneBoatSeaTrialsForm;
