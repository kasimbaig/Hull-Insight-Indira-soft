import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';

const In305Form = () => {
  const [formData, setFormData] = useState({
    // Section 1: Chain Cable data
    chainData: [{
      chain_cable_fitting: '',
      quntity_fathomas: '',
      supplied: '',
      last_tested: '',
      re_testing_date: '',
      half_yearly_survey: '',
      anneling: ''
    }],
    
    // Section 2: Wire and Equipment data
    steel_wire_circumference_inches: '',
    steel_wire_length_fathomas: '',
    steel_wire_when_supplied: '',
    steel_wire_examined: '',
    steel_wire_oiled: '',
    steel_wire_tested: '',
    steel_wire_condition: '',
    
    slips_circumference_inches: '',
    slips_length_fathomas: '',
    slips_when_supplied: '',
    slips_examined: '',
    slips_oiled: '',
    slips_tested: '',
    slips_condition: '',
    
    // ... more fields for the other equipment types
    
    // Section 3: Screws and Eye plates
    screw_rigging_no: '',
    screw_rigging_supplied: '',
    screw_rigging_greased: '',
    screw_rigging_examined: '',
    screw_rigging_condition: '',
    
    // ... more fields for screws and eye plates
    
    // Section 4: Additional rows
    additionalData: [{
      clean_and_lubricated: '',
      sounded: '',
      length_transposed: '',
      defects_found: '',
      action_taken: '',
      remarks: ''
    }],
    
    // Final section fields
    persuant_order_form: '',
    board_indian_naval_ship: '',
    foreman_dockyard_at: '',
    in_ship: '',
    at: '',
    used_when: '',
    executive_officer: '',
    in_dockyard: '',
    constructor_officer_incharge: '',
    captain_ins: '',
    senior_officer_of_ins: '',
    ins: '',
    ins_at: '',
    observer_senior_officer_of_ins: '',
    commander_in_chief: '',
    captain_superitendent_of_dockyard: '',
    
    // File upload
    sign_surveying_officer: null
  });

  const [totalRows1, setTotalRows1] = useState(1);
  const [totalRows4, setTotalRows4] = useState(1);

  // Handle input changes
  const handleInputChange = (e, section, index) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (section && index !== undefined) {
      // For array-based sections
      const updatedSection = [...formData[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [name]: value
      };
      
      setFormData(prev => ({
        ...prev,
        [section]: updatedSection
      }));
    } else {
      // For regular fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle date changes
  const handleDateChange = (date, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  // Format date to DD-MM-YYYY for display
  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Add rows to sections
  const addRows = (section, count) => {
    const newRows = Array.from({ length: count }, () => {
      if (section === 'chainData') {
        return {
          chain_cable_fitting: '',
          quntity_fathomas: '',
          supplied: '',
          last_tested: '',
          re_testing_date: '',
          half_yearly_survey: '',
          anneling: ''
        };
      } else {
        return {
          clean_and_lubricated: '',
          sounded: '',
          length_transposed: '',
          defects_found: '',
          action_taken: '',
          remarks: ''
        };
      }
    });
    
    setFormData(prev => ({
      ...prev,
      [section]: newRows
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit form data
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  // Handle save draft
  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
    // Add your save draft logic here
  };

  // Render the form sections
  return (
    <div className="max-w-full bg-gray-100">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#c7d9f0] text-black text-center px-6 py-4">
            <h2 className="text-3xl font-semibold">IN 305</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Section 1: Chain Cable Table */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Enter Total Number of Rows. </h3>
                <input
                  type="number"
                  min="1"
                  value={totalRows1}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 1;
                    setTotalRows1(count);
                    addRows('chainData', count);
                  }}
                  className="border border-gray-300 rounded px-3 py-1 w-20"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#0072a6]">
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Chain Cable and Gera Para vane Towing Chains and Fitting</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Quntity in Fathomas</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">When and Where Supplied</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Dockyard Where last retested or examined</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Re-testing of Dock yard examination</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Half/Yearly/Survey</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Anneling</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.chainData.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="chain_cable_fitting"
                            value={row.chain_cable_fitting}
                            onChange={(e) => handleInputChange(e, 'chainData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="quntity_fathomas"
                            value={row.quntity_fathomas}
                            onChange={(e) => handleInputChange(e, 'chainData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="supplied"
                            value={row.supplied}
                            onChange={(e) => handleInputChange(e, 'chainData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="last_tested"
                            value={row.last_tested}
                            onChange={(e) => handleInputChange(e, 'chainData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Calendar
                            value={row.re_testing_date}
                            onChange={(e) => {
                              const updatedChainData = [...formData.chainData];
                              updatedChainData[index].re_testing_date = e.value;
                              setFormData(prev => ({...prev, chainData: updatedChainData}));
                            }}
                            dateFormat="dd-mm-yy"
                            className="w-full"
                            placeholder="DD-MM-YYYY"
                            showIcon
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Calendar
                            value={row.half_yearly_survey}
                            onChange={(e) => {
                              const updatedChainData = [...formData.chainData];
                              updatedChainData[index].half_yearly_survey = e.value;
                              setFormData(prev => ({...prev, chainData: updatedChainData}));
                            }}
                            dateFormat="dd-mm-yy"
                            className="w-full"
                            placeholder="DD-MM-YYYY"
                            showIcon
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Calendar
                            value={row.anneling}
                            onChange={(e) => {
                              const updatedChainData = [...formData.chainData];
                              updatedChainData[index].anneling = e.value;
                              setFormData(prev => ({...prev, chainData: updatedChainData}));
                            }}
                            dateFormat="dd-mm-yy"
                            className="w-full"
                            placeholder="DD-MM-YYYY"
                            showIcon
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Equipment Table */}
            <div className="mb-8">
              <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-300 rounded-lg" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#0072a6 #f1f1f1'
              }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                  }
                  div::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background: #0072a6;
                    border-radius: 4px;
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background: #005a8a;
                  }
                `}</style>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#0072a6]">
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Circumference Inches</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Length Fathomas</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">When and Where Supplied</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Examined</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Oiled</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Tested</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { srNo: 1, description: "Steel wire Hawsers" },
                      { srNo: 2, description: "Slips" },
                      { srNo: 3, description: "Shackles" },
                      { srNo: 4, description: "Carpenter's stoppers" },
                      { srNo: 5, description: "Towing pendant" },
                      { srNo: 6, description: "Towing Slips" },
                      { srNo: 7, description: "Derrick purchases" },
                      { srNo: 8, description: "Guard wires and Chairs" },
                      { srNo: 9, description: "Derrick Topping Lifts" }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">{item.srNo}</td>
                        <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">{item.description}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Calendar
                              dateFormat="dd-mm-yy"
                              className="flex-1"
                              placeholder="DD-MM-YYYY"
                              showIcon
                            />
                            {/* <input
                              type="checkbox"
                              className="w-4 h-4"
                            /> */}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Calendar
                              dateFormat="dd-mm-yy"
                              className="flex-1"
                              placeholder="DD-MM-YYYY"
                              showIcon
                            />
                            {/* <input
                              type="checkbox"
                              className="w-4 h-4"
                            /> */}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Calendar
                              dateFormat="dd-mm-yy"
                              className="flex-1"
                              placeholder="DD-MM-YYYY"
                              showIcon
                            />
                            {/* <input
                              type="checkbox"
                              className="w-4 h-4"
                            /> */}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Screws and Eye plates Table */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#0072a6]">
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Screws and Eye plates</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">No</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">When and Where Supplied</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Date when screws were worked and greased</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Date when Eyeplates were examined in accordance with I.N.B 1961,1962</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { srNo: 1, description: "Screw Rigging" },
                      { srNo: 2, description: "Screws Anchors Securing" },
                      { srNo: 3, description: "Screws Davit Guygs" },
                      { srNo: 4, description: "Screws and Slips for Guard Wires" },
                      { srNo: 5, description: "Eyeplates for use with anchors and chain cables" },
                      { srNo: 6, description: "Eyeplates on which Safety of life depends" }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">{item.srNo}</td>
                        <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                          {item.description}
                          {(item.description === "Screws Anchors Securing" || 
                            item.description === "Screws and Slips for Guard Wires" || 
                            item.description === "Eyeplates for use with anchors and chain cables" ||
                            item.description === "Eyeplates on which Safety of life depends") && (
                            <div className="mt-2">
                              <input
                                type="text"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Additional details"
                              />
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Calendar
                              dateFormat="dd-mm-yy"
                              className="flex-1"
                              placeholder="DD-MM-YYYY"
                              showIcon
                            />
                            {/* <input
                              type="checkbox"
                              className="w-4 h-4"
                            /> */}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Calendar
                              dateFormat="dd-mm-yy"
                              className="flex-1"
                              placeholder="DD-MM-YYYY"
                              showIcon
                            />
                            {/* <input
                              type="checkbox"
                              className="w-4 h-4"
                            /> */}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder=""
                          />
                        </td>
                      </tr>
                    ))}
                    {/* Signature of the Surveying Officers Row */}
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">7</td>
                      <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Signature of the Surveying Officers</td>
                      <td className="border border-gray-300 px-4 py-2" colSpan="2">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {/* Blank cell for "Date when screws were worked and greased" */}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {/* Blank cell for "Date when Eyeplates were examined in accordance with I.N.B 1961,1962" */}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {/* Blank cell for "Condition" */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          
            
            {/* Section 4: Additional Rows Table */}
         

            {/* Final Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-group">
                <label className="block text-gray-700 mb-2">
                  Persuant to an Order from <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="persuant_order_form"
                  value={formData.persuant_order_form}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  maxLength="50"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-gray-700 mb-2">
                  on board Indian Naval Ship <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="board_indian_naval_ship"
                  value={formData.board_indian_naval_ship}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  maxLength="50"
                />
              </div>
              
              {/* More fields would follow the same pattern */}
            </div>
               <div className="mb-8">
              <div className="flex gap-2 items-center mb-4">
                <h3 className="text-lg font-semibold">Enter Total Number of Rows.</h3>
                <input
                  type="number"
                  min="1"
                  value={totalRows4}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 1;
                    setTotalRows4(count);
                    addRows('additionalData', count);
                  }}
                  className="border border-gray-300 rounded px-3 py-1 w-20"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#0072a6]">
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Whether swivels, shakle bolts, pains etc have been cleaned and lubricated</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Whether links have been sounded</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Which length have been transposed and how</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Defects found</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Action taken to make efficient and whether work was carried out by ships staff or dockyard</th>
                      <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.additionalData.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="clean_and_lubricated"
                            value={row.clean_and_lubricated}
                            onChange={(e) => handleInputChange(e, 'additionalData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="sounded"
                            value={row.sounded}
                            onChange={(e) => handleInputChange(e, 'additionalData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="length_transposed"
                            value={row.length_transposed}
                            onChange={(e) => handleInputChange(e, 'additionalData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="defects_found"
                            value={row.defects_found}
                            onChange={(e) => handleInputChange(e, 'additionalData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="action_taken"
                            value={row.action_taken}
                            onChange={(e) => handleInputChange(e, 'additionalData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name="remarks"
                            value={row.remarks}
                            onChange={(e) => handleInputChange(e, 'additionalData', index)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


                      {/* Officer Information Fields */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Row 1 */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Foreman of Smith of IN Dockyard at <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="foreman_dockyard_at"
                    value={formData.foreman_dockyard_at}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    I.N. Ship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="in_ship"
                    value={formData.in_ship}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    at <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="at"
                    value={formData.at}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    To be used when the Cables, Hawsers, Screws or Wires <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="used_when"
                    value={formData.used_when}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Row 2 */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Executive Officer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="executive_officer"
                    value={formData.executive_officer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    I.N. Dockyard <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="in_dockyard"
                    value={formData.in_dockyard}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Manager, Contructive Dept. or Constructor Officer-in-Charge. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="constructor_officer_incharge"
                    value={formData.constructor_officer_incharge}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Captain Indian Naval Ship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="captain_ins"
                    value={formData.captain_ins}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Row 3 */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Senior Officer of Indian Naval Ships and Vessels at <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="senior_officer_of_ins"
                    value={formData.senior_officer_of_ins}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Indian Naval Ship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ins"
                    value={formData.ins}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    at <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ins_at"
                    value={formData.ins_at}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Senior Officer of Indian Naval Ships and Vessel at <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="observer_senior_officer_of_ins"
                    value={formData.observer_senior_officer_of_ins}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Row 4 */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Commander-in-Chief( or Senior Officer) of Indian Naval Ships and Vessels on the <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="commander_in_chief"
                    value={formData.commander_in_chief}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-semibold">
                    Captain Superintendent of Dockyard <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="captain_superitendent_of_dockyard"
                    value={formData.captain_superitendent_of_dockyard}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    maxLength="50"
                    required
                  />
                </div>
              </div>
            </div>
            {/* File Upload */}
            {/* <div className="mb-8">
              <label className="block text-gray-700 mb-2">
                Signature of the Surveying Officers
              </label>
              <input
                type="file"
                name="sign_surveying_officer"
                onChange={handleInputChange}
                accept=".jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div> */}

            {/* Form Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-blue-400 text-white font-bold rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // Fetch drafts functionality
                  console.log('Fetching drafts...');
                 
                }}
              >
                Fetch Drafts
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors"
                onClick={handleSaveDraft}
              >
                Save Draft
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors"
                onClick={() => {
                  setFormData({
                    // Reset form data to initial state
                    chainData: [{
                      chain_cable_fitting: '',
                      quntity_fathomas: '',
                      supplied: '',
                      last_tested: '',
                      re_testing_date: '',
                      half_yearly_survey: '',
                      anneling: ''
                    }],
                    additionalData: [{
                      clean_and_lubricated: '',
                      sounded: '',
                      length_transposed: '',
                      defects_found: '',
                      action_taken: '',
                      remarks: ''
                    }],
                    // Reset all other fields
                    persuant_order_form: '',
                    board_indian_naval_ship: '',
                    foreman_dockyard_at: '',
                    in_ship: '',
                    at: '',
                    used_when: '',
                    executive_officer: '',
                    in_dockyard: '',
                    constructor_officer_incharge: '',
                    captain_ins: '',
                    senior_officer_of_ins: '',
                    ins: '',
                    ins_at: '',
                    observer_senior_officer_of_ins: '',
                    commander_in_chief: '',
                    captain_superitendent_of_dockyard: '',
                    sign_surveying_officer: null
                  });
                  setTotalRows1(1);
                  setTotalRows4(1);
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default In305Form;
