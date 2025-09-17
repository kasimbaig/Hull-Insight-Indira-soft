import React, { useState } from 'react';

const DockingApproval = () => {
  const [formData, setFormData] = useState({
    docks: '',
    letterNo: '',
    profilePlan: {
      decks: { status: '', remarks: '' },
      frameStations: { status: '', remarks: '' },
      mainTransverseBulkheads: { status: '', remarks: '' },
      extentOfSKEG: { status: '', remarks: '' },
      positionOfTanks: { status: '', remarks: '' },
      designWaterLine: { status: '', remarks: '' },
      propellerWithClearance: { status: '', remarks: '' },
      shaftWithdrawalLines: { status: '', remarks: '' },
      rudderWithClearance: { status: '', remarks: '' },
      rudderWithdrawalLines: { status: '', remarks: '' },
      allUWProjections: { status: '', remarks: '' },
      keelBlocksBothVersions: { status: '', remarks: '' },
      breastShores: { status: '', remarks: '' },
      verticalShores: { status: '', remarks: '' },
      detailsOfTrim: { status: '', remarks: '' }
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (section, value) => {
    if (section.includes('.')) {
      // Handle nested profilePlan sections
      const [parent, child] = section.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: {
            ...prev[parent][child],
            status: value
          }
        }
      }));
    } else {
      // Handle direct sections
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          status: value
        }
      }));
    }
  };

  const handleRemarksChange = (section, value) => {
    if (section.includes('.')) {
      // Handle nested profilePlan sections
      const [parent, child] = section.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: {
            ...prev[parent][child],
            remarks: value
          }
        }
      }));
    } else {
      // Handle direct sections
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          remarks: value
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Docking Approval form submitted successfully!');
  };

  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
    alert('Draft saved successfully!');
  };

  const handleClear = () => {
    setFormData({
      docks: '',
      letterNo: '',
      profilePlan: {
        decks: { status: '', remarks: '' },
        frameStations: { status: '', remarks: '' },
        mainTransverseBulkheads: { status: '', remarks: '' },
        extentOfSKEG: { status: '', remarks: '' },
        positionOfTanks: { status: '', remarks: '' },
        designWaterLine: { status: '', remarks: '' },
        propellerWithClearance: { status: '', remarks: '' },
        shaftWithdrawalLines: { status: '', remarks: '' },
        rudderWithClearance: { status: '', remarks: '' },
        rudderWithdrawalLines: { status: '', remarks: '' },
        allUWProjections: { status: '', remarks: '' },
        keelBlocksBothVersions: { status: '', remarks: '' },
        breastShores: { status: '', remarks: '' },
        verticalShores: { status: '', remarks: '' },
        detailsOfTrim: { status: '', remarks: '' }
      }
    });
  };

  return (
    <div className="max-w-full bg-gray-100">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#c7d9f0] text-black text-center px-6 py-4">
          <h2 className="text-3xl font-semibold">CHECKOFF LIST FOR INS</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-semibold">
                Docks <span className="text-red-500">*</span>
              </label>
              <select
                name="docks"
                value={formData.docks}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">--Select--</option>
                <option value="dock1">Dock 1</option>
                <option value="dock2">Dock 2</option>
                <option value="dock3">Dock 3</option>
                <option value="dock4">Dock 4</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-semibold">
                Letter No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="letterNo"
                value={formData.letterNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Main Checkoff Table */}
          <div className="mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-[#0072a6]">
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Status (Yes/ No/ NA)</th>
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Remarks (Mandatory if status is No/ NA )</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Profile Plan Row */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">1</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Profile Plan</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                  
                  {/* Sub-items under Profile Plan */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      a) Decks <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.decks.status}
                        onChange={(e) => handleStatusChange('profilePlan.decks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.decks.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.decks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      b) Frame Stations <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.frameStations.status}
                        onChange={(e) => handleStatusChange('profilePlan.frameStations', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.frameStations.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.frameStations', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      c) Main Transverse Bulkheads <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.mainTransverseBulkheads.status}
                        onChange={(e) => handleStatusChange('profilePlan.mainTransverseBulkheads', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.mainTransverseBulkheads.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.mainTransverseBulkheads', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      d) Extent of SKEG <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.extentOfSKEG.status}
                        onChange={(e) => handleStatusChange('extentOfSKEG', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.extentOfSKEG.remarks}
                        onChange={(e) => handleRemarksChange('extentOfSKEG', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Position of Tanks */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      e) Position of Tanks <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.positionOfTanks.status}
                        onChange={(e) => handleStatusChange('profilePlan.positionOfTanks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.positionOfTanks.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.positionOfTanks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Design Water Line */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      f) Design Water Line <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.designWaterLine.status}
                        onChange={(e) => handleStatusChange('profilePlan.designWaterLine', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.designWaterLine.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.designWaterLine', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Propeller with Clearance from Dock Floor */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      g) Propeller with Clearance from Dock Floor <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.propellerWithClearance.status}
                        onChange={(e) => handleStatusChange('profilePlan.propellerWithClearance', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.propellerWithClearance.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.propellerWithClearance', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Shaft Withdrawal lines with Clearance w.r.t. Dock Floor */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      h) Shaft Withdrawal lines with Clearance w.r.t. Dock Floor <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.shaftWithdrawalLines.status}
                        onChange={(e) => handleStatusChange('profilePlan.shaftWithdrawalLines', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.shaftWithdrawalLines.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.shaftWithdrawalLines', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Rudder with Clearance from Dock Floor */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      i) Rudder with Clearance from Dock Floor <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.rudderWithClearance.status}
                        onChange={(e) => handleStatusChange('profilePlan.rudderWithClearance', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.rudderWithClearance.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.rudderWithClearance', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Rudder Withdrawal lines with Clearance w.r.t. Dock Floor */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      j) Rudder Withdrawal lines with Clearance w.r.t. Dock Floor <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.rudderWithdrawalLines.status}
                        onChange={(e) => handleStatusChange('profilePlan.rudderWithdrawalLines', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.rudderWithdrawalLines.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.rudderWithdrawalLines', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* All UW Projections/ Appendages with Dimensions */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      k) All UW Projections/ Appendages with Dimensions <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.allUWProjections.status}
                        onChange={(e) => handleStatusChange('profilePlan.allUWProjections', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.allUWProjections.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.allUWProjections', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Keel Blocks of Both Versions */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      l) Keel Blocks of Both Versions <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.keelBlocksBothVersions.status}
                        onChange={(e) => handleStatusChange('profilePlan.keelBlocksBothVersions', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.keelBlocksBothVersions.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.keelBlocksBothVersions', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Breast Shores */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      m) Breast Shores <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.breastShores.status}
                        onChange={(e) => handleStatusChange('profilePlan.breastShores', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.breastShores.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.breastShores', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Vertical Shores */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      n) Vertical Shores <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.verticalShores.status}
                        onChange={(e) => handleStatusChange('profilePlan.verticalShores', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.verticalShores.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.verticalShores', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Details of Trim (if any) */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      o) Details of Trim (if any) <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.detailsOfTrim.status}
                        onChange={(e) => handleStatusChange('profilePlan.detailsOfTrim', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="NA">NA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={formData.profilePlan.detailsOfTrim.remarks}
                        onChange={(e) => handleRemarksChange('profilePlan.detailsOfTrim', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-blue-400 text-white font-bold rounded hover:bg-blue-700 transition-colors"
              onClick={() => {
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
              onClick={handleClear}
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

export default DockingApproval;
