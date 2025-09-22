import React, { useState, useEffect } from 'react';
import { get, post } from '../lib/api';

const PartIUnderwaterHullSurvey = () => {
  // State for dockyard data
  const [dockyards, setDockyards] = useState([]);
  const [loadingDockyards, setLoadingDockyards] = useState(false);
  const [dockyardError, setDockyardError] = useState(null);

  // State for vessel data
  const [vessels, setVessels] = useState([]);
  const [loadingVessels, setLoadingVessels] = useState(false);
  const [vesselError, setVesselError] = useState(null);

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form data for Part I - Updated to match API model
  const [formData, setFormData] = useState({
    vessel: '',
    type_of_refit: '',
    refitting_yard: '',
    officer_in_charge: '',
    docking_particulars: '',
    total_undewater_area_of_ship: '',
    including_boot_top_area: '',
    total_boot_top_area: '',
    survey_particulars: '',
    type_of_survey: '',
    date_of_survey_from: '',
    date_of_survey_to: '',
    area_of_survey: '',
    area_graded_suspect: '',
    area_graded_defect_suspect_renewed: '',
    area_graded_defect_suspect_temporarily_repaired: '',
    area_graded_defect_suspect_not_renewed: '',
    total_underwater_area_renewed: '',
    total_tonnage_of_underwater_hull_renewed: '',
    condition_of_hull_material_state_constructer_overseer: '',
    date: ''
  });

  // Dynamic table data for docking particulars
  const [totalRows, setTotalRows] = useState(1);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      place: '',
      dockedOn: '',
      undockedOn: '',
      versionOfDocking: ''
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRowCountChange = (e) => {
    const newRowCount = parseInt(e.target.value) || 1;
    setTotalRows(newRowCount);
    
    // Update table data array
    const newData = [];
    for (let i = 0; i < newRowCount; i++) {
      newData.push({
        id: i + 1,
        place: tableData[i]?.place || '',
        dockedOn: tableData[i]?.dockedOn || '',
        undockedOn: tableData[i]?.undockedOn || '',
        versionOfDocking: tableData[i]?.versionOfDocking || ''
      });
    }
    setTableData(newData);
  };

  const handleTableInputChange = (rowIndex, field, value) => {
    const newData = [...tableData];
    newData[rowIndex][field] = value;
    setTableData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Prepare the data for API submission
      const submissionData = {
        vessel: formData.vessel,
        type_of_refit: formData.type_of_refit,
        refitting_yard: formData.refitting_yard,
        officer_in_charge: formData.officer_in_charge,
        docking_particulars: formData.docking_particulars,
        total_undewater_area_of_ship: parseFloat(formData.total_undewater_area_of_ship) || null,
        including_boot_top_area: parseFloat(formData.including_boot_top_area) || null,
        total_boot_top_area: parseFloat(formData.total_boot_top_area) || null,
        survey_particulars: formData.survey_particulars,
        type_of_survey: formData.type_of_survey,
        date_of_survey_from: formData.date_of_survey_from || null,
        date_of_survey_to: formData.date_of_survey_to || null,
        area_of_survey: parseFloat(formData.area_of_survey) || null,
        area_graded_suspect: parseFloat(formData.area_graded_suspect) || null,
        area_graded_defect_suspect_renewed: parseFloat(formData.area_graded_defect_suspect_renewed) || null,
        area_graded_defect_suspect_temporarily_repaired: parseFloat(formData.area_graded_defect_suspect_temporarily_repaired) || null,
        area_graded_defect_suspect_not_renewed: parseFloat(formData.area_graded_defect_suspect_not_renewed) || null,
        total_underwater_area_renewed: parseFloat(formData.total_underwater_area_renewed) || null,
        total_tonnage_of_underwater_hull_renewed: parseFloat(formData.total_tonnage_of_underwater_hull_renewed) || null,
        condition_of_hull_material_state_constructer_overseer: formData.condition_of_hull_material_state_constructer_overseer,
        date: formData.date || null,
        draft_status: 'draft' // Default to draft status
      };

      console.log('Submitting data:', submissionData);
      
      const response = await post('yardmodule/underwater-hull-surveys/', submissionData);
      
      console.log('API Response:', response);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        vessel: '',
        type_of_refit: '',
        refitting_yard: '',
        officer_in_charge: '',
        docking_particulars: '',
        total_undewater_area_of_ship: '',
        including_boot_top_area: '',
        total_boot_top_area: '',
        survey_particulars: '',
        type_of_survey: '',
        date_of_survey_from: '',
        date_of_survey_to: '',
        area_of_survey: '',
        area_graded_suspect: '',
        area_graded_defect_suspect_renewed: '',
        area_graded_defect_suspect_temporarily_repaired: '',
        area_graded_defect_suspect_not_renewed: '',
        total_underwater_area_renewed: '',
        total_tonnage_of_underwater_hull_renewed: '',
        condition_of_hull_material_state_constructer_overseer: '',
        date: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch dockyards and vessels data on component mount
  useEffect(() => {
    const fetchDockyards = async () => {
      setLoadingDockyards(true);
      setDockyardError(null);
      try {
        const response = await get('master/dockyards/');
        // Ensure response is an array, handle different response structures
        if (Array.isArray(response)) {
          setDockyards(response);
        } else if (response && Array.isArray(response.data)) {
          setDockyards(response.data);
        } else if (response && Array.isArray(response.results)) {
          setDockyards(response.results);
        } else {
          console.warn('Unexpected dockyards response structure:', response);
          setDockyards([]);
          setDockyardError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching dockyards:', error);
        setDockyardError('Failed to load dockyards data');
        setDockyards([]); // Ensure dockyards is always an array
      } finally {
        setLoadingDockyards(false);
      }
    };

    const fetchVessels = async () => {
      setLoadingVessels(true);
      setVesselError(null);
      try {
        const response = await get('master/vessels/');
        // Ensure response is an array, handle different response structures
        if (Array.isArray(response)) {
          setVessels(response);
        } else if (response && Array.isArray(response.data)) {
          setVessels(response.data);
        } else if (response && Array.isArray(response.results)) {
          setVessels(response.results);
        } else {
          console.warn('Unexpected vessels response structure:', response);
          setVessels([]);
          setVesselError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching vessels:', error);
        setVesselError('Failed to load vessels data');
        setVessels([]); // Ensure vessels is always an array
      } finally {
        setLoadingVessels(false);
      }
    };

    fetchDockyards();
    fetchVessels();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
        <h5 className="text-2xl font-semibold mb-2">PART I</h5>
        <h5 className="text-3xl font-bold underline">PARTICULARS OF UNDERWATER HULL SURVEY BY YARD</h5>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Name of Ship */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name of Ship <span className="text-red-500">*</span>
            </label>
            <select
              name="vessel"
              value={formData.vessel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loadingVessels}
            >
              <option value="">--Select--</option>
              {loadingVessels ? (
                <option value="">Loading vessels...</option>
              ) : vesselError ? (
                <option value="">Error loading vessels</option>
              ) : Array.isArray(vessels) && vessels.length > 0 ? (
                vessels.map((vessel) => (
                  <option key={vessel.id} value={vessel.id}>
                    {vessel.name}
                  </option>
                ))
              ) : (
                <option value="">No vessels available</option>
              )}
            </select>
            {vesselError && (
              <p className="text-red-500 text-xs mt-1">{vesselError}</p>
            )}
          </div>

          {/* Type of Refit */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type of Refit <span className="text-red-500">*</span>
            </label>
            <select
              name="type_of_refit"
              value={formData.type_of_refit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">--Select--</option>
              <option value="enr">ENR</option>
              <option value="esr">ESR</option>
              <option value="mr-mlu">MR-MLU</option>
              <option value="nr-mlu">NR-MLU</option>
              <option value="srgd">SRGD</option>
            </select>
          </div>

          {/* Refitting Yard */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Refitting Yard <span className="text-red-500">*</span>
            </label>
            <select
              name="refitting_yard"
              value={formData.refitting_yard}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loadingDockyards}
            >
              <option value="">--Select--</option>
              {loadingDockyards ? (
                <option value="">Loading dockyards...</option>
              ) : dockyardError ? (
                <option value="">Error loading dockyards</option>
              ) : Array.isArray(dockyards) && dockyards.length > 0 ? (
                dockyards.map((dockyard) => (
                  <option key={dockyard.id} value={dockyard.id}>
                    {dockyard.name}
                  </option>
                ))
              ) : (
                <option value="">No dockyards available</option>
              )}
            </select>
            {dockyardError && (
              <p className="text-red-500 text-xs mt-1">{dockyardError}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Officer in Charge */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Officer in Charge <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="officer_in_charge"
              value={formData.officer_in_charge}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Docking Particulars */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Docking Particulars <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="docking_particulars"
              value={formData.docking_particulars}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Dynamic Docking Particulars Table */}
        <div className="mb-6">
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Enter Total Number of Rows.
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={totalRows}
                onChange={handleRowCountChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
              />
            </div>
          </div>

          {/* Docking Particulars Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                    Sr No.
                  </th>
                  <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                    Place <span className="text-red-500">*</span>
                  </th>
                  <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                    Docked on <span className="text-red-500">*</span>
                  </th>
                  <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                    Undocked on <span className="text-red-500">*</span>
                  </th>
                  <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                    Version Of Docking
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-300 text-sm text-center font-medium bg-gray-50 text-gray-600">
                      {row.id}
                    </td>
                    <td className="p-3 border border-gray-300 text-sm">
                      <input
                        type="text"
                        value={row.place}
                        onChange={(e) => handleTableInputChange(index, 'place', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Enter place"
                      />
                    </td>
                    <td className="p-3 border border-gray-300 text-sm">
                      <div className="relative">
                        <input
                          type="date"
                          value={row.dockedOn}
                          onChange={(e) => handleTableInputChange(index, 'dockedOn', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </td>
                    <td className="p-3 border border-gray-300 text-sm">
                      <div className="relative">
                        <input
                          type="date"
                          value={row.undockedOn}
                          onChange={(e) => handleTableInputChange(index, 'undockedOn', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </td>
                    <td className="p-3 border border-gray-300 text-sm">
                      <input
                        type="text"
                        value={row.versionOfDocking}
                        onChange={(e) => handleTableInputChange(index, 'versionOfDocking', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Version"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Survey Information Section */}
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Underwater Area of Ship */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Underwater Area of Ship <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="total_undewater_area_of_ship"
              value={formData.total_undewater_area_of_ship}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Including Boot Top Area */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Including Boot Top Area (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="including_boot_top_area"
              value={formData.including_boot_top_area}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Total Boot Top Area of Ship */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Boot Top Area of Ship (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="total_boot_top_area"
              value={formData.total_boot_top_area}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Survey Particular */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Survey Particular <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="survey_particulars"
              value={formData.survey_particulars}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {/* Type of Survey Carried Out */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type of Survey Carried Out <span className="text-red-500">*</span>
            </label>
            <select
              name="type_of_survey"
              value={formData.type_of_survey}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">--Select--</option>
              <option value="live">Live</option>
              <option value="usg">USG</option>
            </select>
          </div>

          {/* Date of Survey From */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Survey From <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="date_of_survey_from"
                value={formData.date_of_survey_from}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Date of Survey To */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Survey To <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="date_of_survey_to"
                value={formData.date_of_survey_to}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Area Surveyed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Area Surveyed (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area_of_survey"
              value={formData.area_of_survey}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Area Graded Suspect */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Area Graded 'Suspect' (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area_graded_suspect"
              value={formData.area_graded_suspect}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Area Graded Defective/Suspect & Renewed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Area Graded 'Defective /Suspect & Renewed' (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area_graded_defect_suspect_renewed"
              value={formData.area_graded_defect_suspect_renewed}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Area Graded Suspect/Defective & Temporary Repair */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Area Graded 'Suspect /Defective & Temporary Repair Carried Out' (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area_graded_defect_suspect_temporarily_repaired"
              value={formData.area_graded_defect_suspect_temporarily_repaired}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Area Graded Defective/Suspect & Not Renewed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Area Graded 'Defective /Suspect & Not Renewed' (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area_graded_defect_suspect_not_renewed"
              value={formData.area_graded_defect_suspect_not_renewed}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Total Underwater Area Renewed */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Underwater Area Renewed (Sq. Mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="total_underwater_area_renewed"
              value={formData.total_underwater_area_renewed}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Total Tonnage of Underwater Hull Renewal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Tonnage of Underwater Hull Renewal <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="total_tonnage_of_underwater_hull_renewed"
              value={formData.total_tonnage_of_underwater_hull_renewed}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Condition of Hull Material State Constructor Overseer */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Condition of Hull Material State Constructor Overseer <span className="text-red-500">*</span>
            </label>
            <select
              name="condition_of_hull_material_state_constructer_overseer"
              value={formData.condition_of_hull_material_state_constructer_overseer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">--Select--</option>
              <option value="mfab">MFAB</option>
              <option value="naval_constructor">Naval Constructor</option>
            </select>
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button and Messages */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Form submitted successfully!
            </div>
          )}
          
          {submitError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#0072a6] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'SUBMIT FORM'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PartIUnderwaterHullSurvey;
