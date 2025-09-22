import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import ReusableTable from './ReusableTable';

const ShipWeightManagement = () => {
  const toast = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    swm_type: '',
    command: '',
    class_of_ship: '',
    ship: '',
    ship_status: '',
    refit_status: '',
    refit_date: null
  });

  // Dynamic data
  const [classOfShipOptions, setClassOfShipOptions] = useState([]);
  const [shipOptions, setShipOptions] = useState([]);
  const [totalRows1, setTotalRows1] = useState(1);
  const [totalRows2, setTotalRows2] = useState(1);
  
  // Table data
  const [opsTableData, setOpsTableData] = useState([{
    id: 1,
    lightship: '',
    ref_loading: '',
    disp_booklet: '',
    disp_audit: '',
    net_diff: '',
    corrected_disp: '',
    net_incr: '',
    increase: '',
    net_weight: '',
    net_kg: ''
  }]);

  const [refitTableData, setRefitTableData] = useState([{
    id: 1,
    lightship: '',
    weight_change: '',
    net_weight: '',
    net_kg: ''
  }]);

  // Dropdown options
  const swmTypeOptions = [
    { label: '--Select--', value: '' },
    { label: 'HITU', value: 'HITU' },
    { label: 'NHQ', value: 'NHQ' },
    { label: 'USER', value: 'USER' }
  ];

  const commandOptions = [
    { label: '--Select--', value: '' },
    { label: 'WNC', value: 'WNC' },
    { label: 'NHQ', value: 'NHQ' },
    { label: 'ANC', value: 'ANC' },
    { label: 'SNC', value: 'SNC' },
    { label: 'ENC', value: 'ENC' }
  ];

  const shipStatusOptions = [
    { label: '--Select--', value: '' },
    { label: 'OPS', value: 'OPS' },
    { label: 'REFIT', value: 'REFIT' }
  ];

  const refitStatusOptions = [
    { label: '--Select--', value: '' },
    { label: 'SR', value: 'SR' },
    { label: 'NR', value: 'NR' },
    { label: 'MR', value: 'MR' }
  ];

  // Class of Ship data mapping
  const classOfShipMapping = {
    'WNC': [
      { label: '1241 PE', value: '1241 PE' },
      { label: '1241 RE', value: '1241 RE' },
      { label: 'FAC', value: 'FAC' },
      { label: 'P-15', value: 'P-15' },
      { label: 'P-15A', value: 'P-15A' },
      { label: 'P-16', value: 'P-16' },
      { label: 'P-16A', value: 'P-16A' },
      { label: 'TALWAR', value: 'TALWAR' },
      { label: 'TANKER', value: 'TANKER' },
      { label: 'WJFAC', value: 'WJFAC' },
      { label: 'XFAC', value: 'XFAC' },
      { label: 'OPV', value: 'OPV' }
    ],
    'NHQ': [
      { label: 'ALS', value: 'ALS' },
      { label: 'FAC', value: 'FAC' },
      { label: 'LST_L-III', value: 'LST_L-III' },
      { label: 'OGT', value: 'OGT' },
      { label: 'P-15', value: 'P-15' },
      { label: 'P-17', value: 'P-17' },
      { label: 'P-25', value: 'P-25' },
      { label: 'P-25A', value: 'P-25A' },
      { label: 'SNF', value: 'SNF' },
      { label: 'TANKER', value: 'TANKER' },
      { label: 'WJFAC', value: 'WJFAC' },
      { label: 'SURVEY', value: 'SURVEY' },
      { label: 'OPV', value: 'OPV' },
      { label: 'NOPV', value: 'NOPV' }
    ],
    'ANC': [
      { label: 'LST_L-III', value: 'LST_L-III' },
      { label: 'STS', value: 'STS' },
      { label: 'WJFAC', value: 'WJFAC' },
      { label: 'SURVEY', value: 'SURVEY' },
      { label: 'OPV', value: 'OPV' },
      { label: 'CTS', value: 'CTS' },
      { label: 'NOPV', value: 'NOPV' }
    ],
    'SNC': [
      { label: 'LST_L-III', value: 'LST_L-III' },
      { label: 'LST-M', value: 'LST-M' },
      { label: 'P-25A', value: 'P-25A' },
      { label: 'WJFAC', value: 'WJFAC' },
      { label: 'NOPV', value: 'NOPV' }
    ],
    'ENC': [
      { label: '1241 PE', value: '1241 PE' },
      { label: '1241 RE', value: '1241 RE' },
      { label: 'FAC', value: 'FAC' },
      { label: 'P-15', value: 'P-15' },
      { label: 'P-15A', value: 'P-15A' },
      { label: 'P-16', value: 'P-16' },
      { label: 'P-16A', value: 'P-16A' },
      { label: 'TALWAR', value: 'TALWAR' },
      { label: 'TANKER', value: 'TANKER' },
      { label: 'WJFAC', value: 'WJFAC' },
      { label: 'XFAC', value: 'XFAC' },
      { label: 'OPV', value: 'OPV' }
    ]
  };

  // Ship data mapping
  const shipMapping = {
    '1241 PE': [{ label: 'VIPUL', value: 'VIPUL' }],
    'FAC': [
      { label: 'NASHAK', value: 'NASHAK' },
      { label: 'VIDYUT', value: 'VIDYUT' },
      { label: 'PRABAL', value: 'PRABAL' },
      { label: 'PRALAYA', value: 'PRALAYA' },
      { label: 'NISHANK', value: 'NISHANK' },
      { label: 'VIBHUTI', value: 'VIBHUTI' },
      { label: 'VINASH', value: 'VINASH' }
    ],
    'LST_L-III': [{ label: 'JALASHWA', value: 'JALASHWA' }],
    'ALS': [
      { label: 'BATTIMALV', value: 'BATTIMALV' },
      { label: 'BARATANG', value: 'BARATANG' },
      { label: 'BANGARAM', value: 'BANGARAM' },
      { label: 'BITRA', value: 'BITRA' }
    ],
    'LST-M': [{ label: 'MAGAR', value: 'MAGAR' }],
    'OGT': [{ label: 'GHARIAL', value: 'GHARIAL' }, { label: 'AIRAVAT', value: 'AIRAVAT' }],
    'SNF': [{ label: 'KESARI', value: 'KESARI' }],
    'STS': [{ label: 'GAJ', value: 'GAJ' }],
    'P-15': [{ label: 'MUMBAI', value: 'MUMBAI' }],
    'P-17': [{ label: 'MYSORE', value: 'MYSORE' }, { label: 'DELHI', value: 'DELHI' }],
    'P-25': [{ label: 'KOLKATA', value: 'KOLKATA' }, { label: 'KOCHI', value: 'KOCHI' }, { label: 'CHENNAI', value: 'CHENNAI' }],
    'P-25A': [{ label: 'GOMTI', value: 'GOMTI' }],
    'P-16': [{ label: 'BRAHMAPUTRA', value: 'BRAHMAPUTRA' }, { label: 'BETWA', value: 'BETWA' }, { label: 'BEAS', value: 'BEAS' }],
    'P-16A': [{ label: 'SHIVALIK', value: 'SHIVALIK' }, { label: 'SATPURA', value: 'SATPURA' }, { label: 'SAHYADRI', value: 'SAHYADRI' }],
    'TALWAR': [
      { label: 'KUTHAR', value: 'KUTHAR' },
      { label: 'KIRPAN', value: 'KIRPAN' },
      { label: 'KHANJAR', value: 'KHANJAR' },
      { label: 'KORA', value: 'KORA' },
      { label: 'KIRCH', value: 'KIRCH' },
      { label: 'KULISH', value: 'KULISH' },
      { label: 'KARMUK', value: 'KARMUK' },
      { label: 'RANA', value: 'RANA' },
      { label: 'RANVIR', value: 'RANVIR' },
      { label: 'RANVIJAY', value: 'RANVIJAY' },
      { label: 'TARANGINI', value: 'TARANGINI' },
      { label: 'SHUDERSHINI', value: 'SHUDERSHINI' },
      { label: 'TALWAR', value: 'TALWAR' },
      { label: 'TRISHUL', value: 'TRISHUL' },
      { label: 'TABAR', value: 'TABAR' },
      { label: 'TRINKAND', value: 'TRINKAND' },
      { label: 'TEG', value: 'TEG' },
      { label: 'TARKASH', value: 'TARKASH' }
    ],
    'TANKER': [{ label: 'SHAKTI', value: 'SHAKTI' }, { label: 'JYOTI', value: 'JYOTI' }],
    'WJFAC': [{ label: 'ADITYA', value: 'ADITYA' }, { label: 'DEEPAK', value: 'DEEPAK' }],
    'XFAC': [
      { label: 'CANKARSO', value: 'CANKARSO' },
      { label: 'KONDUL', value: 'KONDUL' },
      { label: 'KOSWARI', value: 'KOSWARI' },
      { label: 'KARUVA', value: 'KARUVA' }
    ],
    'OPV': [
      { label: 'CAR NICOBAR', value: 'CAR NICOBAR' },
      { label: 'CHETLAT', value: 'CHETLAT' },
      { label: 'CHERIYAM', value: 'CHERIYAM' },
      { label: 'CORA DIVH', value: 'CORA DIVH' },
      { label: 'KABRA', value: 'KABRA' },
      { label: 'KALPENI', value: 'KALPENI' }
    ],
    'NOPV': [
      { label: 'SANDHAYAK', value: 'SANDHAYAK' },
      { label: 'NIRUPAK', value: 'NIRUPAK' },
      { label: 'DARSHAK', value: 'DARSHAK' },
      { label: 'NIREEKSHAK', value: 'NIREEKSHAK' },
      { label: 'SUTLEJ', value: 'SUTLEJ' },
      { label: 'SURVEKSHAK', value: 'SURVEKSHAK' },
      { label: 'JAMUNA', value: 'JAMUNA' },
      { label: 'INVETIGATOR', value: 'INVETIGATOR' }
    ],
    'CTS': [
      { label: 'T-82', value: 'T-82' },
      { label: 'T-83', value: 'T-83' },
      { label: 'T-84', value: 'T-84' }
    ],
    'SURVEY': [
      { label: 'SUBHDRA', value: 'SUBHDRA' },
      { label: 'SUVERNA', value: 'SUVERNA' },
      { label: 'SUKANYA', value: 'SUKANYA' },
      { label: 'SAVITRI', value: 'SAVITRI' },
      { label: 'SHARDA', value: 'SHARDA' },
      { label: 'SUJATA', value: 'SUJATA' },
      { label: 'TIR', value: 'TIR' },
      { label: 'SUMEDHA', value: 'SUMEDHA' },
      { label: 'SUMITRA', value: 'SUMITRA' },
      { label: 'SUNAYNA', value: 'SUNAYNA' },
      { label: 'SARYU', value: 'SARYU' }
    ]
  };

  // Handle command change
  const handleCommandChange = (e) => {
    const command = e.value;
    setFormData(prev => ({ ...prev, command, class_of_ship: '', ship: '' }));
    
    if (command && classOfShipMapping[command]) {
      setClassOfShipOptions(classOfShipMapping[command]);
    } else {
      setClassOfShipOptions([]);
    }
    setShipOptions([]);
  };

  // Handle class of ship change
  const handleClassOfShipChange = (e) => {
    const classOfShip = e.value;
    setFormData(prev => ({ ...prev, class_of_ship: classOfShip, ship: '' }));
    
    if (classOfShip && shipMapping[classOfShip]) {
      setShipOptions(shipMapping[classOfShip]);
    } else {
      setShipOptions([]);
    }
  };

  // Handle ship status change
  const handleShipStatusChange = (e) => {
    setFormData(prev => ({ ...prev, ship_status: e.value }));
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle OPS table row changes
  const handleOpsTableChange = (rowIndex, field, value) => {
    setOpsTableData(prev => 
      prev.map((row, index) => 
        index === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  // Handle REFIT table row changes
  const handleRefitTableChange = (rowIndex, field, value) => {
    setRefitTableData(prev => 
      prev.map((row, index) => 
        index === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  // Update OPS table rows
  const updateOpsTableRows = (count) => {
    const newRows = [];
    for (let i = 1; i <= count; i++) {
      newRows.push({
        id: i,
        lightship: '',
        ref_loading: '',
        disp_booklet: '',
        disp_audit: '',
        net_diff: '',
        corrected_disp: '',
        net_incr: '',
        increase: '',
        net_weight: '',
        net_kg: ''
      });
    }
    setOpsTableData(newRows);
  };

  // Update REFIT table rows
  const updateRefitTableRows = (count) => {
    const newRows = [];
    for (let i = 1; i <= count; i++) {
      newRows.push({
        id: i,
        lightship: '',
        weight_change: '',
        net_weight: '',
        net_kg: ''
      });
    }
    setRefitTableData(newRows);
  };

  // Validation
  const validateForm = () => {
    if (!formData.swm_type) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Ship Weight Management Type' });
      return false;
    }
    if (!formData.command) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Command' });
      return false;
    }
    if (!formData.class_of_ship) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Class of Ship' });
      return false;
    }
    if (!formData.ship) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Ship' });
      return false;
    }
    if (!formData.ship_status) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Ship Status' });
      return false;
    }

    if (formData.ship_status === 'REFIT') {
      if (!formData.refit_status) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Refit Status' });
        return false;
      }
      if (!formData.refit_date) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Select Refit Date' });
        return false;
      }
    }

    return true;
  };

  // Handle save
  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form Data:', formData);
      console.log('OPS Table Data:', opsTableData);
      console.log('REFIT Table Data:', refitTableData);
      
      toast.current.show({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Ship Weight Management data saved successfully!' 
      });
    }
  };

  // Handle clear
  const handleClear = () => {
    setFormData({
      swm_type: '',
      command: '',
      class_of_ship: '',
      ship: '',
      ship_status: '',
      refit_status: '',
      refit_date: null
    });
    setClassOfShipOptions([]);
    setShipOptions([]);
    setTotalRows1(1);
    setTotalRows2(1);
    setOpsTableData([{
      id: 1,
      lightship: '',
      ref_loading: '',
      disp_booklet: '',
      disp_audit: '',
      net_diff: '',
      corrected_disp: '',
      net_incr: '',
      increase: '',
      net_weight: '',
      net_kg: ''
    }]);
    setRefitTableData([{
      id: 1,
      lightship: '',
      weight_change: '',
      net_weight: '',
      net_kg: ''
    }]);
  };

  // OPS table cell editor
  const opsCellEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        className="p-inputtext-sm"
        maxLength={50}
      />
    );
  };

  // REFIT table cell editor
  const refitCellEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        className="p-inputtext-sm"
        maxLength={50}
      />
    );
  };

  return (
    <div className="max-w-full p-6 ">
      <Toast ref={toast} />
      
      {/* Steps Section */}
      <div className="bg-[#dedfed] border border-gray-300 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-800 border-b-2 border-gray-400 pb-2 mb-2">Steps</h4>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li><span className="font-bold">Step 1:</span> Select Ship status, It will Show the Table and Dropdown according to the value.</li>
          <li><span className="font-bold">Step 2:</span> By Selecting OPS, It will Show the Table,Select year and Fill the Inputs in Table and save through The save Button.</li>
          <li><span className="font-bold">Step 3:</span> By Selecting REFIT, It will Show the Refit Dropdown and Table,Select Refit, year, Refit date and Fill the Inputs in Table and save through The save Button.</li>
        </ul>
      </div>

      {/* Main Form */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="bg-blue-200 px-6 py-4 border-b border-gray-300">
          <div className="flex items-center justify-center gap-4">
            <h5 className="text-2xl font-bold text-gray-800 ">SHIP WEIGHT MANAGEMENT</h5>
            <Dropdown
              value={formData.swm_type}
              options={swmTypeOptions}
              onChange={(e) => handleInputChange('swm_type', e.value)}
              placeholder="--Select--"
              className="w-40 border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Command */}
            <div className="space-y-2">
              <label htmlFor="command" className="block text-sm font-bold text-gray-700">
                Command <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="command"
                value={formData.command}
                options={commandOptions}
                onChange={handleCommandChange}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            {/* Class of Ship */}
            <div className="space-y-2">
              <label htmlFor="class_of_ship" className="block text-sm font-bold text-gray-700">
                CLASS OF SHIP <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="class_of_ship"
                value={formData.class_of_ship}
                options={classOfShipOptions}
                onChange={handleClassOfShipChange}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            {/* Ship */}
            <div className="space-y-2">
              <label htmlFor="ship" className="block text-sm font-bold text-gray-700">
                SHIP <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="ship"
                value={formData.ship}
                options={shipOptions}
                onChange={(e) => handleInputChange('ship', e.value)}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            {/* Ship Status */}
            <div className="space-y-2">
              <label htmlFor="ship_status" className="block text-sm font-bold text-gray-700">
                Ship Status <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="ship_status"
                value={formData.ship_status}
                options={shipStatusOptions}
                onChange={handleShipStatusChange}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            {/* Refit Status - Only show when REFIT is selected */}
            {formData.ship_status === 'REFIT' && (
              <div className="space-y-2">
                <label htmlFor="refit_status" className="block text-sm font-bold text-gray-700">
                  Refit <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  id="refit_status"
                  value={formData.refit_status}
                  options={refitStatusOptions}
                  onChange={(e) => handleInputChange('refit_status', e.value)}
                  placeholder="--Select--"
                  className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                />
              </div>
            )}

            {/* Refit Date - Only show when REFIT is selected */}
            {formData.ship_status === 'REFIT' && (
              <div className="space-y-2">
                <label htmlFor="refit_date" className="block text-sm font-bold text-gray-700">
                  Refit Commencement Date <span className="text-red-500">*</span>
                </label>
                <Calendar
                  id="refit_date"
                  value={formData.refit_date}
                  onChange={(e) => handleInputChange('refit_date', e.value)}
                  dateFormat="dd-mm-yy"
                  placeholder="DD-MM-YYYY"
                  className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  showIcon
                />
              </div>
            )}

            {/* OPS Table - Only show when OPS is selected */}
            {formData.ship_status === 'OPS' && (
              <div className="col-span-2 mt-6" id="ops_table">
                <div className="mb-4 flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Enter Total Number of Rows:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={totalRows1}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 1;
                      const validCount = Math.max(1, Math.min(99, count));
                      setTotalRows1(validCount);
                      updateOpsTableRows(validCount);
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className={`overflow-x-auto ${totalRows1 > 5 ? 'overflow-y-auto max-h-96' : ''}`}>
                  <ReusableTable
                    data={opsTableData}
                    columns={[
                    {
                      field: 'id',
                      header: 'Ser',
                      sortable: false,
                      style: { width: '80px' },
                      body: (rowData) => (
                        <div className="text-center font-medium">
                          {rowData.id}
                        </div>
                      )
                    },
                    {
                      field: 'lightship',
                      header: 'Lightship Disp (A)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.lightship}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'lightship', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'ref_loading',
                      header: 'Reference Loading condition During Audit (B)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.ref_loading}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'ref_loading', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'disp_booklet',
                      header: 'Disp in Reference Condition as per Booklet (C)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.disp_booklet}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'disp_booklet', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'disp_audit',
                      header: 'Disp as read from drafts during Audit (D)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.disp_audit}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'disp_audit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'net_diff',
                      header: 'Net Difference in variable loads (E)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.net_diff}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'net_diff', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'corrected_disp',
                      header: 'Corrected Disp (F)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.corrected_disp}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'corrected_disp', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'net_incr',
                      header: 'Net Increase in Disp (G)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.net_incr}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'net_incr', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'increase',
                      header: '% Increase (H)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.increase}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'increase', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'net_weight',
                      header: 'Net Weight Addition',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.net_weight}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'net_weight', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'net_kg',
                      header: 'Net KG of Weight Addition',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.net_kg}
                          onChange={(e) => handleOpsTableChange(rowData.id - 1, 'net_kg', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    }
                  ]}
                    pagination={false}
                    globalFilter={false}
                    exportable={false}
                    className="p-datatable-sm"
                  />
                </div>
              </div>
            )}

            {/* REFIT Table - Only show when REFIT is selected */}
            {formData.ship_status === 'REFIT' && (
              <div className="col-span-2 mt-6" id="refit_table">
                <div className="mb-4 flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Enter Total Number of Rows:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={totalRows2}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 1;
                      const validCount = Math.max(1, Math.min(99, count));
                      setTotalRows2(validCount);
                      updateRefitTableRows(validCount);
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className={`overflow-x-auto ${totalRows2 > 5 ? 'overflow-y-auto max-h-96' : ''}`}>
                  <ReusableTable
                    data={refitTableData}
                    columns={[
                    {
                      field: 'id',
                      header: 'Ser',
                      sortable: false,
                      style: { width: '80px' },
                      body: (rowData) => (
                        <div className="text-center font-medium">
                          {rowData.id}
                        </div>
                      )
                    },
                    {
                      field: 'lightship',
                      header: 'Lightship Disp(A)',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.lightship}
                          onChange={(e) => handleRefitTableChange(rowData.id - 1, 'lightship', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'weight_change',
                      header: 'Weight change prior refit',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.weight_change}
                          onChange={(e) => handleRefitTableChange(rowData.id - 1, 'weight_change', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'net_weight',
                      header: 'Net weight change during refit',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.net_weight}
                          onChange={(e) => handleRefitTableChange(rowData.id - 1, 'net_weight', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    },
                    {
                      field: 'net_kg',
                      header: 'Net KG',
                      sortable: false,
                      body: (rowData) => (
                        <InputText
                          value={rowData.net_kg}
                          onChange={(e) => handleRefitTableChange(rowData.id - 1, 'net_kg', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={50}
                        />
                      )
                    }
                  ]}
                    pagination={false}
                    globalFilter={false}
                    exportable={false}
                    className="p-datatable-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-300 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              className="px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              onClick={handleClear}
            >
              CLEAR
            </button>
            <button 
              type="button" 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipWeightManagement;
