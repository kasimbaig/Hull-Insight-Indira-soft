import React, { useState } from 'react';
import ReusableTable from './ReusableTable';

const BoatHistorySheet = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    bhs_reg_no: '0',
    bhs_year_of_rendering: '',
    bhs_ber_aber: '',
    bhs_occ_of_rendering: '',
    bhs_cond_of_hull: '',
    bhs_cond_of_davit_lifting: '',
    bhs_cond_of_fittings: '',
    bhs_survey_ber_report: null,
    
    // Condition of Engine
    bhs_center1: '0',
    bhs_stbd1: '0',
    bhs_port1: '0',
    bhs_auxilliaries: '0',
    
    // Engine Hours
    bhs_center2: '',
    bhs_stbd2: '',
    bhs_port2: '',
    
    // Major Repairs
    bhs_major_repairs: '',
    bhs_center3: '',
    bhs_stbd3: '',
    bhs_port3: '',
    bhs_hull_year: '',
    bhs_details_of_collar: '',
    bhs_engine_year: '',
    bhs_remarks: '',
    bhs_ic_year: '',
  });

  // Auto-populated fields (read-only)
  const [autoFields, setAutoFields] = useState({
    bhs_type_of_boat: '',
    bhs_engine_oem: '',
    bhs_boat_builder: '',
    bhs_built_year: '',
    bhs_date_of_supply: '',
    bhs_unit: '',
    bhs_date_reappropriation: '',
    bhs_sn_port: '',
    bhs_sn_stbd: '',
    bhs_sn_center: '',
  });

  // Sample data for the table
  const [tableData, setTableData] = useState([
    {
      id: 1,
      sr_no: 1,
      reg_no: '6.7 RIM-2025-div',
      year_rendering: 2017,
      ber_aber: 'BER',
      occ_rendering: 'Annually',
      cond_hull: 'abc',
      cond_davit: 'abc',
      cond_fittings: 'abc',
      center1: 'SAT',
      stbd1: 'UNSAT',
      port1: 'SAT',
      auxilliaries: 'UNSAT',
      center2: 5645,
      stbd2: 45645,
      port2: 456,
      center3: 456,
      stbd3: 65,
      port3: 456,
      major_repairs: 'abc',
      hull_year: 1,
      details_collar: 1,
      engine_year: 11,
      remarks: 1,
    },
    {
      id: 2,
      sr_no: 2,
      reg_no: 'dfgdg-2021-dgdgdfg',
      year_rendering: 2020,
      ber_aber: 'ABER',
      occ_rendering: 'Initially',
      cond_hull: 'dfg',
      cond_davit: 'dfg',
      cond_fittings: 'dfg',
      center1: 'SAT',
      stbd1: 'SAT',
      port1: 'UNSAT',
      auxilliaries: 'UNSAT',
      center2: 345,
      stbd2: 35,
      port2: 456,
      center3: 2653,
      stbd3: 543,
      port3: 345,
      major_repairs: '3',
      hull_year: 6453634,
      details_collar: 5363,
      engine_year: 653,
      remarks: 63,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      console.log('Form submitted:', formData);
      // Add your submission logic here
    }
  };

  const clearForm = () => {
    setFormData({
      bhs_reg_no: '0',
      bhs_year_of_rendering: '',
      bhs_ber_aber: '',
      bhs_occ_of_rendering: '',
      bhs_cond_of_hull: '',
      bhs_cond_of_davit_lifting: '',
      bhs_cond_of_fittings: '',
      bhs_survey_ber_report: null,
      bhs_center1: '0',
      bhs_stbd1: '0',
      bhs_port1: '0',
      bhs_auxilliaries: '0',
      bhs_center2: '',
      bhs_stbd2: '',
      bhs_port2: '',
      bhs_major_repairs: '',
      bhs_center3: '',
      bhs_stbd3: '',
      bhs_port3: '',
      bhs_hull_year: '',
      bhs_details_of_collar: '',
      bhs_engine_year: '',
      bhs_remarks: '',
      bhs_ic_year: '',
    });
  };

  const isValid = () => {
    if (formData.bhs_reg_no === '0') {
      alert('Please Select Registration No.');
      return false;
    }
    if (!formData.bhs_year_of_rendering) {
      alert('Please Enter Year of Rendering');
      return false;
    }
    if (!formData.bhs_ber_aber) {
      alert('Please Select BER/ABER');
      return false;
    }
    if (!formData.bhs_occ_of_rendering) {
      alert('Please Select Occasion of Rendering');
      return false;
    }
    if (!formData.bhs_cond_of_hull) {
      alert('Please Enter Condition of Hull');
      return false;
    }
    if (!formData.bhs_cond_of_davit_lifting) {
      alert('Please Enter Condition of Davit Lifting arrangement fitted on Boat');
      return false;
    }
    if (!formData.bhs_cond_of_fittings) {
      alert('Please Enter Condition of Fittings');
      return false;
    }
    if (!formData.bhs_survey_ber_report) {
      alert('Please Upload Survey/ BER Report');
      return false;
    }
    if (formData.bhs_center1 === '0') {
      alert('Please Select Condition of Engine Center');
      return false;
    }
    if (formData.bhs_stbd1 === '0') {
      alert('Please Select Condition of Engine STBD');
      return false;
    }
    if (formData.bhs_port1 === '0') {
      alert('Please Select Condition of Engine PORT');
      return false;
    }
    if (formData.bhs_auxilliaries === '0') {
      alert('Please Select Condition of Engine Auxilliaries');
      return false;
    }
    if (!formData.bhs_center2) {
      alert('Please Enter Center');
      return false;
    }
    if (!formData.bhs_stbd2) {
      alert('Please Enter STBD');
      return false;
    }
    if (!formData.bhs_port2) {
      alert('Please Enter PORT');
      return false;
    }
    if (!formData.bhs_major_repairs) {
      alert('Please Enter Major Repairs undertaken Since Last Return on Hull');
      return false;
    }
    if (!formData.bhs_center3) {
      alert('Please Enter Center');
      return false;
    }
    if (!formData.bhs_stbd3) {
      alert('Please Enter STBD');
      return false;
    }
    if (!formData.bhs_port3) {
      alert('Please Enter PORT');
      return false;
    }
    if (!formData.bhs_hull_year) {
      alert('Please Enter Assessed Remaining life of Hull - Year');
      return false;
    }
    if (!formData.bhs_details_of_collar) {
      alert('Please Enter Details of Collar Changed if any');
      return false;
    }
    if (!formData.bhs_engine_year) {
      alert('Please Enter Assessed Remaining life of Engine - Year');
      return false;
    }
    if (!formData.bhs_remarks) {
      alert('Please Enter Remarks of Assessment Board (Unit)');
      return false;
    }
    if (!formData.bhs_ic_year) {
      alert('Please Enter Assessed Remaining life of Inflatable Collar - Year');
      return false;
    }
    return true;
  };

  // Action handlers
  const handleEdit = (id) => {
    console.log('Edit action for ID:', id);
    // Add edit functionality here
  };

  const handleDelete = (id) => {
    console.log('Delete action for ID:', id);
    // Add delete functionality here
  };

  const columns = [
    { field: 'sr_no', header: 'Sr No.', sortable: true, style: { width: '80px' } },
    { field: 'reg_no', header: 'Registration No.', sortable: true, style: { width: '150px' } },
    { field: 'year_rendering', header: 'Year of Rendering', sortable: true, style: { width: '120px' } },
    { field: 'ber_aber', header: 'BER/ ABER', sortable: true, style: { width: '100px' } },
    { field: 'occ_rendering', header: 'Occ of Rendering', sortable: true, style: { width: '120px' } },
    { field: 'cond_hull', header: 'Condition of Hull', sortable: true, style: { width: '120px' } },
    { field: 'cond_davit', header: 'Condition of Davit Lifting', sortable: true, style: { width: '150px' } },
    { field: 'cond_fittings', header: 'Condition of Fittings', sortable: true, style: { width: '120px' } },
    { field: 'center1', header: 'Center 1', sortable: true, style: { width: '80px' } },
    { field: 'stbd1', header: 'STBD 1', sortable: true, style: { width: '80px' } },
    { field: 'port1', header: 'PORT 1', sortable: true, style: { width: '80px' } },
    { field: 'auxilliaries', header: 'Auxilliaries', sortable: true, style: { width: '100px' } },
    { field: 'center2', header: 'Center 2', sortable: true, style: { width: '80px' } },
    { field: 'stbd2', header: 'STBD 2', sortable: true, style: { width: '80px' } },
    { field: 'port2', header: 'PORT 2', sortable: true, style: { width: '80px' } },
    { field: 'center3', header: 'Center 3', sortable: true, style: { width: '80px' } },
    { field: 'stbd3', header: 'STBD 3', sortable: true, style: { width: '80px' } },
    { field: 'port3', header: 'PORT 3', sortable: true, style: { width: '80px' } },
    { field: 'major_repairs', header: 'Major Repairs', sortable: true, style: { width: '120px' } },
    { field: 'hull_year', header: 'Hull Year', sortable: true, style: { width: '100px' } },
    { field: 'details_collar', header: 'Details of Collar', sortable: true, style: { width: '120px' } },
    { field: 'engine_year', header: 'Engine Year', sortable: true, style: { width: '100px' } },
    { field: 'remarks', header: 'Remarks', sortable: true, style: { width: '100px' } },
    { 
      field: 'actions', 
      header: 'Action', 
      sortable: false, 
      style: { width: '120px' },
      body: (rowData) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(rowData.id)}
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(rowData.id)}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
            title="Delete"
          >
            Delete
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container-fluid py-8">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
            <div className="bg-[#dedfed] border border-blue-400 rounded-lg p-4">
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-black">Steps</h4>
              </div>
              <ul className="list-disc list-inside text-black space-y-1">
                <li><span className="font-semibold">Step 1:</span> Click on Registration No. select any one registration number the further details will be auto fetch.</li>
                <li><span className="font-semibold">Step 2:</span> Fill the other Input and save through The save Button.</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-lg">
                <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
                  <h5 className="text-2xl font-semibold">BOAT HISTORY SHEET</h5>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                    {/* Registration No */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration No. <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="bhs_reg_no"
                        value={formData.bhs_reg_no}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0">--Select--</option>
                        <option value="6.7 RIM-2025-div">6.7 RIM-2025-div</option>
                        <option value="dfgdg-2021-dgdgdfg">dfgdg-2021-dgdgdfg</option>
                        <option value="6.7 RIM-2021-gffghfh">6.7 RIM-2021-gffghfh</option>
                        <option value="dfgdg-2022-234">dfgdg-2022-234</option>
                        <option value="6.7 RIM-2021-werw">6.7 RIM-2021-werw</option>
                        <option value="dfgdg-2021-fghfg">dfgdg-2021-fghfg</option>
                        <option value="dfgdg-3534-4534">dfgdg-3534-4534</option>
                        <option value="dfgdg-2021-erter">dfgdg-2021-erter</option>
                      </select>
                    </div>

                    {/* Type of Boat (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type of Boat</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_type_of_boat || '--'}
                      </div>
                    </div>

                    {/* Engine OEM (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Engine OEM (Make of Engine)</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_engine_oem || '--'}
                      </div>
                    </div>

                    {/* Boat Builder (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Boat Builder (OEM)</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_boat_builder || '--'}
                      </div>
                    </div>

                    {/* Built Year (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Built Year</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_built_year || '--'}
                      </div>
                    </div>

                    {/* Original Date of Supply (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Date of Supply</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_date_of_supply || '--'}
                      </div>
                    </div>

                    {/* Unit (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_unit || '--'}
                      </div>
                    </div>

                    {/* Date of Re-Appropriation (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Re-Appropriation</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_date_reappropriation || '--'}
                      </div>
                    </div>

                    {/* Serial No. (PORT) (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Serial No. (PORT)</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_sn_port || '--'}
                      </div>
                    </div>

                    {/* Serial No. (STBD) (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Serial No. (STBD)</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_sn_stbd || '--'}
                      </div>
                    </div>

                    {/* Serial No. (CENTER) (Auto-populated) */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Serial No. (CENTER)</label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        {autoFields.bhs_sn_center || '--'}
                      </div>
                    </div>

                    {/* Year of Rendering */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Rendering <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bhs_year_of_rendering"
                        value={formData.bhs_year_of_rendering}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="YYYY"
                      />
                    </div>

                    {/* BER/ABER */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        BER/ABER <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="bhs_ber_aber"
                            value="BER"
                            checked={formData.bhs_ber_aber === 'BER'}
                            onChange={handleRadioChange}
                            className="mr-2"
                          />
                          BER
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="bhs_ber_aber"
                            value="ABER"
                            checked={formData.bhs_ber_aber === 'ABER'}
                            onChange={handleRadioChange}
                            className="mr-2"
                          />
                          ABER
                        </label>
                      </div>
                    </div>

                    {/* Occasion of Rendering */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Occasion of Rendering <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="bhs_occ_of_rendering"
                            value="Annually"
                            checked={formData.bhs_occ_of_rendering === 'Annually'}
                            onChange={handleRadioChange}
                            className="mr-2"
                          />
                          Annually
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="bhs_occ_of_rendering"
                            value="Initially"
                            checked={formData.bhs_occ_of_rendering === 'Initially'}
                            onChange={handleRadioChange}
                            className="mr-2"
                          />
                          Initially
                        </label>
                      </div>
                    </div>

                    {/* Condition of Hull */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Condition of Hull <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bhs_cond_of_hull"
                        value={formData.bhs_cond_of_hull}
                        onChange={handleInputChange}
                        maxLength="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Condition of Davit Lifting */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Condition of Davit Lifting arrangement fitted on Boat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bhs_cond_of_davit_lifting"
                        value={formData.bhs_cond_of_davit_lifting}
                        onChange={handleInputChange}
                        maxLength="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Condition of Fittings */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Condition of Fittings <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bhs_cond_of_fittings"
                        value={formData.bhs_cond_of_fittings}
                        onChange={handleInputChange}
                        maxLength="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Upload Survey/BER Report */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Survey/ BER Report <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="bhs_survey_ber_report"
                        onChange={handleInputChange}
                        accept=".jpg,.jpeg,.png"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Condition of Engine Section */}
                  <div className="mb-6">
                    <div className="bg-[#c7d9f0] text-black text-center px-4 py-2 rounded-lg mb-4">
                      <h5 className="text-2xl font-semibold">CONDITION OF ENGINE</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Center <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="bhs_center1"
                          value={formData.bhs_center1}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="0">--Select--</option>
                          <option value="SAT">SAT</option>
                          <option value="UNSAT">UNSAT</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          STBD <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="bhs_stbd1"
                          value={formData.bhs_stbd1}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="0">--Select--</option>
                          <option value="SAT">SAT</option>
                          <option value="UNSAT">UNSAT</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PORT <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="bhs_port1"
                          value={formData.bhs_port1}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="0">--Select--</option>
                          <option value="SAT">SAT</option>
                          <option value="UNSAT">UNSAT</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Auxiliaries <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="bhs_auxilliaries"
                          value={formData.bhs_auxilliaries}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="0">--Select--</option>
                          <option value="SAT">SAT</option>
                          <option value="UNSAT">UNSAT</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Total No. of Engine Hours Section */}
                  <div className="mb-6">
                    <div className="bg-[#c7d9f0] text-black text-center px-4 py-2 rounded-lg mb-4">
                      <h5 className="text-2xl font-semibold">TOTAL NO. OF ENGINE HOURS RUN SINCE LAST RETURN</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Center <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_center2"
                          value={formData.bhs_center2}
                          onChange={handleInputChange}
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          STBD <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_stbd2"
                          value={formData.bhs_stbd2}
                          onChange={handleInputChange}
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PORT <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_port2"
                          value={formData.bhs_port2}
                          onChange={handleInputChange}
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Major Routines Section */}
                  <div className="mb-6">
                    <div className="bg-[#c7d9f0] text-black text-center px-4 py-2 rounded-lg mb-4">
                      <h5 className="text-2xl font-semibold">MAJOR ROUTINES UNDERTAKEN SINCE LAST RETURN, ON ENGINE</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Major Repairs undertaken Since Last Return on Hull <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_major_repairs"
                          value={formData.bhs_major_repairs}
                          onChange={handleInputChange}
                          maxLength="20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Center <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_center3"
                          value={formData.bhs_center3}
                          onChange={handleInputChange}
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          STBD <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_stbd3"
                          value={formData.bhs_stbd3}
                          onChange={handleInputChange}
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PORT <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_port3"
                          value={formData.bhs_port3}
                          onChange={handleInputChange}
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assessed Remaining life of Hull - Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_hull_year"
                          value={formData.bhs_hull_year}
                          onChange={handleInputChange}
                          maxLength="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Details of Collar Changed if any <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_details_of_collar"
                          value={formData.bhs_details_of_collar}
                          onChange={handleInputChange}
                          maxLength="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assessed Remaining life of Engine - Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_engine_year"
                          value={formData.bhs_engine_year}
                          onChange={handleInputChange}
                          maxLength="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Remarks of Assessment Board (Unit) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="bhs_remarks"
                          value={formData.bhs_remarks}
                          onChange={handleInputChange}
                          maxLength="50"
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assessed Remaining life of Inflatable Collar - Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="bhs_ic_year"
                          value={formData.bhs_ic_year}
                          onChange={handleInputChange}
                          maxLength="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f1f7ff] px-6 py-4 rounded-b-lg flex justify-center space-x-3">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="row mt-6">
          <div className="col-lg-12">
            <ReusableTable
              data={tableData}
              columns={columns}
              title="BOAT HISTORY SHEET DATA"
              showPagination={true}
              showSearch={true}
              pageSize={10}
              className="shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoatHistorySheet;
