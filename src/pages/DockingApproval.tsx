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
    },
    sectionPlan: {
      transverseSectionalViews: { status: '', remarks: '' }
    },
    fullBreadthPlan: {
      frameStationsMainTransverseBulkheads: { status: '', remarks: '' },
      traceOfFlatBottom: { status: '', remarks: '' },
      allUnderwaterOpenings: { status: '', remarks: '' },
      allKeelBlocksBothVersions: { status: '', remarks: '' }
    },
    generalInformations: {
      checkKeelSideBlocksFouling: { status: '', remarks: '' },
      keelBlocksShapedSideBlocksNumbered: { status: '', remarks: '' },
      bearingAreaCalculations: { status: '', remarks: '' },
      detailedSketchTypicalKeel: { status: '', remarks: '' },
      offsetsAllKeelBlocks: { status: '', remarks: '' },
      offsetsAllShapedSideBlocks: { status: '', remarks: '' },
      listUnderwaterOpenings: { status: '', remarks: '' },
      dispositionKeelBlocks: { status: '', remarks: '' },
      dispositionSideBlocks: { status: '', remarks: '' },
      mainParticularsShipFrameSpacing: { status: '', remarks: '' },
      twoVersionsDockingPlan: { status: '', remarks: '' },
      detailsBreastShore: { status: '', remarks: '' },
      detailsVerticalShore: { status: '', remarks: '' },
      dockingPlanA0SizeSheet: { status: '', remarks: '' }
    },
    mainParticulars: {
      loa: { status: '', remarks: '' },
      lbp: { status: '', remarks: '' },
      breadth: { status: '', remarks: '' },
      draught: { status: '', remarks: '' },
      trim: { status: '', remarks: '' },
      dockingDisplacement: { status: '', remarks: '' },
      dockingDrought: { status: '', remarks: '' },
      frameSpacing: { status: '', remarks: '' },
      keelWidthFlatKeel: { status: '', remarks: '' },
      minimumGMTimeDocking: { status: '', remarks: '' }
    },
    notes: {
      specificDeviation: { status: '', remarks: '' },
      softWoodRequirement: { status: '', remarks: '' },
      documentsReferred: { status: '', remarks: '' },
      additionalDockBlocks: { status: '', remarks: '' },
      dockingProcedure: { status: '', remarks: '' }
    }
  });

  // State for table row counts
  const [rowCounts, setRowCounts] = useState({
    offsetsKeelBlock: 1,
    offsetsShapedSideBlock: 1,
    listUWOpenings: 1,
    dispositionKeelBlocks: 1,
    dispositionSideBlocks: 1,
    detailsBreastShore: 1,
    detailsVerticalShore: 1
  });

  // State for table data
  const [tableData, setTableData] = useState({
    offsetsKeelBlock: [{ keelBlockNo: '', frStnP: '', frStnQ: '', frStnR: '', heightA: '', heightB: '', heightC: '' }],
    offsetsShapedSideBlock: [{ blockDetails: '', distanceFromAFT: '', frLocation: '', distanceFromCenterLine: '' }],
    listUWOpenings: [{ uwOpening: '', longitudinalDistance: '', transverceDistance: '', typeOfOpening: '', dimensions: '', heightFromBaseLine: '' }],
    dispositionKeelBlocks: [{ keelBlockNo: '', distanceFromFPAP: '', frLocation: '', remarks: '' }],
    dispositionSideBlocks: [{ keelBlockNo: '', referencePoint: '', distanceFromReference: '', blockDimension: '' }],
    detailsBreastShore: [{ frNo: '', referencePoint: '', distanceFromReference: '' }],
    detailsVerticalShore: [{ frameStation: '', crossSection: '', height: '' }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for row count changes
  const handleRowCountChange = (tableName, count) => {
    const numCount = parseInt(count) || 1;
    setRowCounts(prev => ({
      ...prev,
      [tableName]: numCount
    }));

    // Update table data to match row count
    setTableData(prev => {
      const currentData = prev[tableName];
      const newData = [];
      
      for (let i = 0; i < numCount; i++) {
        if (currentData[i]) {
          newData.push(currentData[i]);
        } else {
          // Create empty row with appropriate structure
          const emptyRow = {};
          Object.keys(currentData[0] || {}).forEach(key => {
            emptyRow[key] = '';
          });
          newData.push(emptyRow);
        }
      }
      
      return {
        ...prev,
        [tableName]: newData
      };
    });
  };

  // Handler for table data changes
  const handleTableDataChange = (tableName, rowIndex, fieldName, value) => {
    setTableData(prev => ({
      ...prev,
      [tableName]: prev[tableName].map((row, index) => 
        index === rowIndex ? { ...row, [fieldName]: value } : row
      )
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
      },
      sectionPlan: {
        transverseSectionalViews: { status: '', remarks: '' }
      },
      fullBreadthPlan: {
        frameStationsMainTransverseBulkheads: { status: '', remarks: '' },
        traceOfFlatBottom: { status: '', remarks: '' },
        allUnderwaterOpenings: { status: '', remarks: '' },
        allKeelBlocksBothVersions: { status: '', remarks: '' }
      },
      generalInformations: {
        checkKeelSideBlocksFouling: { status: '', remarks: '' },
        keelBlocksShapedSideBlocksNumbered: { status: '', remarks: '' },
        bearingAreaCalculations: { status: '', remarks: '' },
        detailedSketchTypicalKeel: { status: '', remarks: '' },
        offsetsAllKeelBlocks: { status: '', remarks: '' },
        offsetsAllShapedSideBlocks: { status: '', remarks: '' },
        listUnderwaterOpenings: { status: '', remarks: '' },
        dispositionKeelBlocks: { status: '', remarks: '' },
        dispositionSideBlocks: { status: '', remarks: '' },
        mainParticularsShipFrameSpacing: { status: '', remarks: '' },
        twoVersionsDockingPlan: { status: '', remarks: '' },
        detailsBreastShore: { status: '', remarks: '' },
        detailsVerticalShore: { status: '', remarks: '' },
        dockingPlanA0SizeSheet: { status: '', remarks: '' }
      },
      mainParticulars: {
        loa: { status: '', remarks: '' },
        lbp: { status: '', remarks: '' },
        breadth: { status: '', remarks: '' },
        draught: { status: '', remarks: '' },
        trim: { status: '', remarks: '' },
        dockingDisplacement: { status: '', remarks: '' },
        dockingDrought: { status: '', remarks: '' },
        frameSpacing: { status: '', remarks: '' },
        keelWidthFlatKeel: { status: '', remarks: '' },
        minimumGMTimeDocking: { status: '', remarks: '' }
      },
      notes: {
        specificDeviation: { status: '', remarks: '' },
        softWoodRequirement: { status: '', remarks: '' },
        documentsReferred: { status: '', remarks: '' },
        additionalDockBlocks: { status: '', remarks: '' },
        dockingProcedure: { status: '', remarks: '' }
      }
    });
  };

  return (
    <div className="max-w-full bg-gray-100">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <option value="dry-dock-graving-dock">Dry dock/Graving dock</option>
                <option value="acd">ACD</option>
                <option value="slipway">Slipway</option>
                <option value="shiplift">Shiplift</option>
                <option value="fdn1">FDN1</option>
                <option value="fdn2">FDN2</option>
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
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl font-semibold underline">CHECKOFF LIST FOR INS</h2>
            
            {/* Vessel Selection */}
            <select
              name="vessel"
              className="px-3 py-2 border border-gray-300 rounded"
              required
            >
              <option value="">--Select Vessel--</option>
              <option value="43">SHIVALIK</option>
              <option value="84">JAMUNA</option>
              <option value="23">BANGARAM</option>
              <option value="56">TARANGINI</option>
              <option value="99">SARYU</option>
              <option value="31">KUMBHIR</option>
              <option value="87">T-83</option>
              <option value="27">AIRAVAT</option>
              <option value="48">KHANJAR</option>
              <option value="57">SHUDERSHINI</option>
              <option value="59">TRISHUL</option>
              <option value="62">TEG</option>
              <option value="55">RANVIJAY</option>
              <option value="47">KIRPAN</option>
              <option value="35">DELHI</option>
              <option value="83">SURVEKSHAK</option>
              <option value="65">JYOTI</option>
              <option value="94">SUJATA</option>
              <option value="76">KABRA</option>
              <option value="68">CANKARSO</option>
              <option value="88">T-84</option>
              <option value="18">VIBHUTI</option>
              <option value="17">NISHANK</option>
              <option value="25">MAGAR</option>
              <option value="42">BEAS</option>
              <option value="90">SUVERNA</option>
              <option value="45">SAHYADRI</option>
              <option value="16">PRALAYA</option>
              <option value="74">CHERIYAM</option>
              <option value="44">SATPURA</option>
              <option value="20">JALASHWA</option>
              <option value="63">TARKASH</option>
              <option value="52">KARMUK</option>
              <option value="82">SUTLEJ</option>
              <option value="96">SUMEDHA</option>
              <option value="15">PRABAL</option>
              <option value="75">CORA DIVH</option>
              <option value="21">BATTIMALV</option>
              <option value="38">CHENNAI</option>
              <option value="97">SUMITRA</option>
              <option value="86">T-82</option>
              <option value="46">KUTHAR</option>
              <option value="69">KONDUL</option>
              <option value="89">SUBHDRA</option>
              <option value="80">DARSHAK</option>
              <option value="24">BITRA</option>
              <option value="73">CHETLAT</option>
              <option value="81">NIREEKSHAK</option>
              <option value="71">KARUVA</option>
              <option value="67">DEEPAK</option>
              <option value="123">SHAKTI</option>
              <option value="36">KOLKATA</option>
              <option value="85">INVETIGATOR</option>
              <option value="93">SHARDA</option>
              <option value="64">SHAKTI</option>
              <option value="33">MUMBAI</option>
              <option value="39">GOMTI</option>
              <option value="41">BETWA</option>
              <option value="13">NASHAK</option>
              <option value="70">KOSWARI</option>
              <option value="30">CHEETAH</option>
              <option value="58">TALWAR</option>
              <option value="28">KESARI</option>
              <option value="66">ADITYA</option>
              <option value="22">BARATANG</option>
              <option value="49">KORA</option>
              <option value="51">KULISH</option>
              <option value="53">RANA</option>
              <option value="77">KALPENI</option>
              <option value="122">SHAKTI</option>
              <option value="12">VIPUL</option>
              <option value="60">TABAR</option>
              <option value="61">TRINKAND</option>
              <option value="37">KOCHI</option>
              <option value="91">SUKANYA</option>
              <option value="92">SAVITRI</option>
              <option value="29">GULDAR</option>
              <option value="40">BRAHMAPUTRA</option>
              <option value="26">GHARIAL</option>
              <option value="54">RANVIR</option>
              <option value="79">NIRUPAK</option>
              <option value="19">VINASH</option>
              <option value="50">KIRCH</option>
              <option value="78">SANDHAYAK</option>
              <option value="14">VIDYUT</option>
              <option value="95">TIR</option>
              <option value="32">GAJ</option>
              <option value="72">CAR NICOBAR</option>
              <option value="98">SUNAYNA</option>
              <option value="34">MYSORE</option>
            </select>
          </div>
        </div>
        
       
        
        <form onSubmit={handleSubmit} className="p-6">
        

          {/* Main Checkoff Table */}
          <div className="mb-8">
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#0072a6]">
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold sticky top-0 bg-[#0072a6]">Sr No.</th>
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold sticky top-0 bg-[#0072a6]">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold sticky top-0 bg-[#0072a6]">Status (Yes/ No/ NA)</th>
                    <th className="border border-gray-300 px-4 py-2 text-white font-semibold sticky top-0 bg-[#0072a6]">Remarks (Mandatory if status is No/ NA )</th>
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
                  
                  {/* Section Plan */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">2</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Section Plan <span className="text-red-500">*</span></td>
                    {/* <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Status (Yes/ No/ NA)</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Remarks (Mandatory if status is No/ NA)</td> */}
                  </tr>
                  
                  {/* Sub-item under Section Plan */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      a) Transverse Sectional Views in Way of Each Shaped Side Blocks in the Vicinity of UW Projection / Appendages Along with Dimensions and Clearances <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.sectionPlan.transverseSectionalViews.status}
                        onChange={(e) => handleStatusChange('sectionPlan.transverseSectionalViews', e.target.value)}
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
                        value={formData.sectionPlan.transverseSectionalViews.remarks}
                        onChange={(e) => handleRemarksChange('sectionPlan.transverseSectionalViews', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Full Breadth Plan */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">3</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Full Breadth Plan <span className="text-red-500">*</span></td>
                    {/* <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Status (Yes/ No/ NA)</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Remarks (Mandatory if status is No/ NA)</td> */}
                  </tr>
                  
                  {/* Sub-items under Full Breadth Plan */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      a) Frame Stations & Main Transverse Bulkheads <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.fullBreadthPlan.frameStationsMainTransverseBulkheads.status}
                        onChange={(e) => handleStatusChange('fullBreadthPlan.frameStationsMainTransverseBulkheads', e.target.value)}
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
                        value={formData.fullBreadthPlan.frameStationsMainTransverseBulkheads.remarks}
                        onChange={(e) => handleRemarksChange('fullBreadthPlan.frameStationsMainTransverseBulkheads', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      b) Trace of Flat Bottom <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.fullBreadthPlan.traceOfFlatBottom.status}
                        onChange={(e) => handleStatusChange('fullBreadthPlan.traceOfFlatBottom', e.target.value)}
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
                        value={formData.fullBreadthPlan.traceOfFlatBottom.remarks}
                        onChange={(e) => handleRemarksChange('fullBreadthPlan.traceOfFlatBottom', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      c) All Underwater Openings and Appendages Indicating Offset Values w.r.t. Nearest Frame and Center line <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.fullBreadthPlan.allUnderwaterOpenings.status}
                        onChange={(e) => handleStatusChange('fullBreadthPlan.allUnderwaterOpenings', e.target.value)}
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
                        value={formData.fullBreadthPlan.allUnderwaterOpenings.remarks}
                        onChange={(e) => handleRemarksChange('fullBreadthPlan.allUnderwaterOpenings', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      d) All Keel Blocks of Both Versions <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.fullBreadthPlan.allKeelBlocksBothVersions.status}
                        onChange={(e) => handleStatusChange('fullBreadthPlan.allKeelBlocksBothVersions', e.target.value)}
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
                        value={formData.fullBreadthPlan.allKeelBlocksBothVersions.remarks}
                        onChange={(e) => handleRemarksChange('fullBreadthPlan.allKeelBlocksBothVersions', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      e) All Side Blocks of Both Versions <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      f) All Breast Shore <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      g) All Vertical Shore <span className="text-red-500">*</span>
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
                  
                  {/* General Information */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">4</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">General Information's <span className="text-red-500">*</span></td>
                    {/* <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Status (Yes/ No/ NA)</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Remarks (Mandatory if status is No/ NA)</td> */}
                  </tr>
                  
                  {/* Sub-items under General Information */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      a) Check Whether the Keel / Side Blocks Fouling with Under water Opening / Appendages <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.generalInformations.checkKeelSideBlocksFouling.status}
                        onChange={(e) => handleStatusChange('generalInformations.checkKeelSideBlocksFouling', e.target.value)}
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
                        value={formData.generalInformations.checkKeelSideBlocksFouling.remarks}
                        onChange={(e) => handleRemarksChange('generalInformations.checkKeelSideBlocksFouling', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      b) Keel Blocks, Shaped Side Blocks and Shores (Breast & Vertical) to be Numbered <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      c) Bearing Area Calculations <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      d) Detailed Sketch of Typical Keel and Side Blocks <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      e) Offsets of All Keel Blocks (if applicable) <span className="text-red-500">*</span>
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
                      f) Offsets of All Shaped Side Blocks <span className="text-red-500">*</span>
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
                      g) List of Underwater Openings <span className="text-red-500">*</span>
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
                      h) Disposition of Keel Blocks <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.extentOfSKEG.status}
                        onChange={(e) => handleStatusChange('profilePlan.extentOfSKEG', e.target.value)}
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
                        onChange={(e) => handleRemarksChange('profilePlan.extentOfSKEG', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      i) Disposition of Side Block <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.generalInformations.dispositionSideBlocks.status}
                        onChange={(e) => handleStatusChange('generalInformations.dispositionSideBlocks', e.target.value)}
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
                        value={formData.generalInformations.dispositionSideBlocks.remarks}
                        onChange={(e) => handleRemarksChange('generalInformations.dispositionSideBlocks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      j) Main Particulars of the Ship and Frame Spacing <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.generalInformations.mainParticularsShipFrameSpacing.status}
                        onChange={(e) => handleStatusChange('generalInformations.mainParticularsShipFrameSpacing', e.target.value)}
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
                        value={formData.generalInformations.mainParticularsShipFrameSpacing.remarks}
                        onChange={(e) => handleRemarksChange('generalInformations.mainParticularsShipFrameSpacing', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      k) Two Versions of Docking Plan <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.generalInformations.twoVersionsDockingPlan.status}
                        onChange={(e) => handleStatusChange('generalInformations.twoVersionsDockingPlan', e.target.value)}
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
                        value={formData.generalInformations.twoVersionsDockingPlan.remarks}
                        onChange={(e) => handleRemarksChange('generalInformations.twoVersionsDockingPlan', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      l) Details of Breast Shore <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      m) Details of Vertical Shore <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      n) Docking Plan to be Prepared in a Minimum of A-0 Size Sheet and to Scale <span className="text-red-500">*</span>
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
                  
                  {/* Main Particulars */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">5</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Main Particulars <span className="text-red-500">*</span></td>
                    {/* <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Status (Yes/ No/ NA)</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Remarks (Mandatory if status is No/ NA)</td> */}
                  </tr>
                  
                  {/* Sub-items under Main Particulars */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      a) LOA <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.mainParticulars.loa.status}
                        onChange={(e) => handleStatusChange('mainParticulars.loa', e.target.value)}
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
                        value={formData.mainParticulars.loa.remarks}
                        onChange={(e) => handleRemarksChange('mainParticulars.loa', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      b) LBP <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      c) Breadth <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      d) Draught <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      e) Trim <span className="text-red-500">*</span>
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
                      f) Docking Displacement <span className="text-red-500">*</span>
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
                      g) Docking Drought <span className="text-red-500">*</span>
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
                      h) Frame Spacing <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.profilePlan.extentOfSKEG.status}
                        onChange={(e) => handleStatusChange('profilePlan.extentOfSKEG', e.target.value)}
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
                        onChange={(e) => handleRemarksChange('profilePlan.extentOfSKEG', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      i) Keel Width (Flat Keel) <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.mainParticulars.keelWidthFlatKeel.status}
                        onChange={(e) => handleStatusChange('mainParticulars.keelWidthFlatKeel', e.target.value)}
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
                        value={formData.mainParticulars.keelWidthFlatKeel.remarks}
                        onChange={(e) => handleRemarksChange('mainParticulars.keelWidthFlatKeel', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      j) Minimum GM at the Time of Docking <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.mainParticulars.minimumGMTimeDocking.status}
                        onChange={(e) => handleStatusChange('mainParticulars.minimumGMTimeDocking', e.target.value)}
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
                        value={formData.mainParticulars.minimumGMTimeDocking.remarks}
                        onChange={(e) => handleRemarksChange('mainParticulars.minimumGMTimeDocking', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  {/* Notes */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center bg-gray-100 font-semibold">6</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">Notes <span className="text-red-500">*</span></td>
                    {/* <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Status (Yes/ No/ NA)</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-center">Remarks (Mandatory if status is No/ NA)</td> */}
                  </tr>
                  
                  {/* Sub-items under Notes */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      a) Specific Deviation (if any) <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      b) Requirement to Ensure Soft Wood/ Capping Partially/ Fully <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      c) Documents Referred <span className="text-red-500">*</span>
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
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      d) Requirement to Position Additional Dock Blocks Post Docking <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.notes.additionalDockBlocks.status}
                        onChange={(e) => handleStatusChange('notes.additionalDockBlocks', e.target.value)}
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
                        value={formData.notes.additionalDockBlocks.remarks}
                        onChange={(e) => handleRemarksChange('notes.additionalDockBlocks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 pl-8">
                      e) Method / Procedure of Docking <span className="text-red-500">*</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={formData.notes.dockingProcedure.status}
                        onChange={(e) => handleStatusChange('notes.dockingProcedure', e.target.value)}
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
                        value={formData.notes.dockingProcedure.remarks}
                        onChange={(e) => handleRemarksChange('notes.dockingProcedure', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Enter remarks if status is No/NA"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* OFFSETS KEEL BLOCK Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">OFFSETS KEEL BLOCK</h3>
              </div>
              
              <div className="p-6">
                {/* Dropdown Selection */}
                <div className="mb-4">
                  <select className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">--Select--</option>
                    <option value="version1">Version1</option>
                    <option value="version2">Version2</option>
                    <option value="version3">Version3</option>
                  </select>
                </div>

                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.offsetsKeelBlock}
                      onChange={(e) => handleRowCountChange('offsetsKeelBlock', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.offsetsKeelBlock > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Keel Block No. <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold" colSpan="3">FR.STN No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold" colSpan="3">Height From Dock Floor (in mm)</th>
                      </tr>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold"></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold"></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">P <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Q <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">R <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">A <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">B <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">C <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.offsetsKeelBlock.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Keel Block No."
                              value={row.keelBlockNo}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'keelBlockNo', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="P"
                              value={row.frStnP}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'frStnP', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Q"
                              value={row.frStnQ}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'frStnQ', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="R"
                              value={row.frStnR}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'frStnR', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="A"
                              value={row.heightA}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'heightA', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="B"
                              value={row.heightB}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'heightB', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="C"
                              value={row.heightC}
                              onChange={(e) => handleTableDataChange('offsetsKeelBlock', index, 'heightC', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* OFFSETS OF SHAPED SIDE BLOCK Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">OFFSETS OF SHAPED SIDE BLOCK</h3>
              </div>
              
              <div className="p-6">
                {/* Dropdown Selection */}
                <div className="mb-4">
                  <select className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">--Select--</option>
                    <option value="version1">Version1</option>
                    <option value="version2">Version2</option>
                    <option value="version3">Version3</option>
                  </select>
                </div>

                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.offsetsShapedSideBlock}
                      onChange={(e) => handleRowCountChange('offsetsShapedSideBlock', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.offsetsShapedSideBlock > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Block Details <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Distance From AFT (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">FR.Location <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Distance From Center Line (in mm) <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.offsetsShapedSideBlock.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Block Details"
                              value={row.blockDetails}
                              onChange={(e) => handleTableDataChange('offsetsShapedSideBlock', index, 'blockDetails', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Distance From AFT"
                              value={row.distanceFromAFT}
                              onChange={(e) => handleTableDataChange('offsetsShapedSideBlock', index, 'distanceFromAFT', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter FR.Location"
                              value={row.frLocation}
                              onChange={(e) => handleTableDataChange('offsetsShapedSideBlock', index, 'frLocation', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Distance From Center Line"
                              value={row.distanceFromCenterLine}
                              onChange={(e) => handleTableDataChange('offsetsShapedSideBlock', index, 'distanceFromCenterLine', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* LIST OF U/W OPENINGS AND APPENDAGESINS Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">LIST OF U/W OPENINGS AND APPENDAGESINS</h3>
              </div>
              
              <div className="p-6">
                {/* Dropdown Selection */}
                <div className="mb-4">
                  <select className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">--Select--</option>
                    <option value="version1">Version1</option>
                    <option value="version2">Version2</option>
                    <option value="version3">Version3</option>
                  </select>
                </div>

                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.listUWOpenings}
                      onChange={(e) => handleRowCountChange('listUWOpenings', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.listUWOpenings > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">U/W Opening Appendages (P/S/CL) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Longitudinal Distance from Nearest FR. <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Transverce Distance from CL (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Type of Opening (Circular/Ractangular) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Dimensions(Dia/LXB)(Unit) (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Height From Base Line (in mm) <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.listUWOpenings.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter U/W Opening Appendages"
                              value={row.uwOpening}
                              onChange={(e) => handleTableDataChange('listUWOpenings', index, 'uwOpening', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Longitudinal Distance"
                              value={row.longitudinalDistance}
                              onChange={(e) => handleTableDataChange('listUWOpenings', index, 'longitudinalDistance', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Transverce Distance"
                              value={row.transverceDistance}
                              onChange={(e) => handleTableDataChange('listUWOpenings', index, 'transverceDistance', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Type of Opening"
                              value={row.typeOfOpening}
                              onChange={(e) => handleTableDataChange('listUWOpenings', index, 'typeOfOpening', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Dimensions"
                              value={row.dimensions}
                              onChange={(e) => handleTableDataChange('listUWOpenings', index, 'dimensions', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Height From Base Line"
                              value={row.heightFromBaseLine}
                              onChange={(e) => handleTableDataChange('listUWOpenings', index, 'heightFromBaseLine', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* DISPOSITION OF KEEL BLOCKS Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">DISPOSITION OF KEEL BLOCKS</h3>
              </div>
              
              <div className="p-6">
                {/* Dropdown Selection */}
                <div className="mb-4">
                  <select className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">--Select--</option>
                    <option value="version1">Version1</option>
                    <option value="version2">Version2</option>
                    <option value="version3">Version3</option>
                  </select>
                </div>

                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.dispositionKeelBlocks}
                      onChange={(e) => handleRowCountChange('dispositionKeelBlocks', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.dispositionKeelBlocks > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Keel Block No. <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Distance from FP/AP (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">FR. Location <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Remarks <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.dispositionKeelBlocks.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Keel Block No."
                              value={row.keelBlockNo}
                              onChange={(e) => handleTableDataChange('dispositionKeelBlocks', index, 'keelBlockNo', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Distance from FP/AP"
                              value={row.distanceFromFPAP}
                              onChange={(e) => handleTableDataChange('dispositionKeelBlocks', index, 'distanceFromFPAP', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter FR. Location"
                              value={row.frLocation}
                              onChange={(e) => handleTableDataChange('dispositionKeelBlocks', index, 'frLocation', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Remarks"
                              value={row.remarks}
                              onChange={(e) => handleTableDataChange('dispositionKeelBlocks', index, 'remarks', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* DISPOSITION OF SIDE BLOCKS Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">DISPOSITION OF SIDE BLOCKS</h3>
              </div>
              
              <div className="p-6">
                {/* Dropdown Selection */}
                <div className="mb-4">
                  <select className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">--Select--</option>
                    <option value="version1">Version1</option>
                    <option value="version2">Version2</option>
                    <option value="version3">Version3</option>
                  </select>
                </div>

                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.dispositionSideBlocks}
                      onChange={(e) => handleRowCountChange('dispositionSideBlocks', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.dispositionSideBlocks > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Keel Block No. <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Reference Point Longitudinal From FP/AP (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Distance From Reference Point (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Block Dimension at Top Surface L X B (in mm) <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.dispositionSideBlocks.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Keel Block No."
                              value={row.keelBlockNo}
                              onChange={(e) => handleTableDataChange('dispositionSideBlocks', index, 'keelBlockNo', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Reference Point Longitudinal"
                              value={row.referencePoint}
                              onChange={(e) => handleTableDataChange('dispositionSideBlocks', index, 'referencePoint', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Distance From Reference Point"
                              value={row.distanceFromReference}
                              onChange={(e) => handleTableDataChange('dispositionSideBlocks', index, 'distanceFromReference', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Block Dimension at Top Surface"
                              value={row.blockDimension}
                              onChange={(e) => handleTableDataChange('dispositionSideBlocks', index, 'blockDimension', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS OF BREAST SHORE Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">DETAILS OF BREAST SHORE</h3>
              </div>
              
              <div className="p-6">
                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.detailsBreastShore}
                      onChange={(e) => handleRowCountChange('detailsBreastShore', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.detailsBreastShore > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">FR. No. <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Reference Point Longitudinal From FP/AP (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">DISTANCE FROM REFERENCE POINT (in mm) <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.detailsBreastShore.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter FR. No."
                              value={row.frNo}
                              onChange={(e) => handleTableDataChange('detailsBreastShore', index, 'frNo', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Reference Point Longitudinal"
                              value={row.referencePoint}
                              onChange={(e) => handleTableDataChange('detailsBreastShore', index, 'referencePoint', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Distance From Reference Point"
                              value={row.distanceFromReference}
                              onChange={(e) => handleTableDataChange('detailsBreastShore', index, 'distanceFromReference', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS OF VERTICAL SHORE Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">DETAILS OF VERTICAL SHORE</h3>
              </div>
              
              <div className="p-6">
                {/* Row Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">Enter Total Number of Rows.</label>
                    <input
                      type="number"
                      min="1"
                      value={rowCounts.detailsVerticalShore}
                      onChange={(e) => handleRowCountChange('detailsVerticalShore', e.target.value)}
                      className="w-20 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Data Entry Table */}
                <div className={`overflow-x-auto ${rowCounts.detailsVerticalShore > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-[#0072a6]">
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Sr No.</th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Frame Station <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Cross Section (B X W) (in mm) <span className="text-red-500">*</span></th>
                        <th className="border border-gray-300 px-4 py-2 text-white font-semibold">Height <span className="text-red-500">*</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.detailsVerticalShore.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Frame Station"
                              value={row.frameStation}
                              onChange={(e) => handleTableDataChange('detailsVerticalShore', index, 'frameStation', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Cross Section (B X W)"
                              value={row.crossSection}
                              onChange={(e) => handleTableDataChange('detailsVerticalShore', index, 'crossSection', e.target.value)}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Enter Height"
                              value={row.height}
                              onChange={(e) => handleTableDataChange('detailsVerticalShore', index, 'height', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#c7d9f0] text-black px-6 py-4">
                <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">SIGNATURES</h3>
              </div>
              
              <div className="p-6">
                {/* Prepared By Section - Single row with labels above */}
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Prepared By <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">(Deputy Manager) <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter deputy manager name"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Date of Signature <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="DD-MM-YYYY"
                        />
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Upload Signature <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="prepared-signature"
                        />
                        <label
                          htmlFor="prepared-signature"
                          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                          Choose File
                        </label>
                        <span className="text-gray-500 text-sm">No file chosen</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checked By Section - Single row with labels above */}
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Checked By <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">(Manager) <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter manager name"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Date of Signature <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="DD-MM-YYYY"
                        />
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Upload Signature <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="checked-signature"
                        />
                        <label
                          htmlFor="checked-signature"
                          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                          Choose File
                        </label>
                        <span className="text-gray-500 text-sm">No file chosen</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified By Section - Single row with labels above */}
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Verified By <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">(Command Headquarters) <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter command headquarters name"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">or</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Alternative verifier"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Date of Signature <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="DD-MM-YYYY"
                        />
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-gray-700 font-bold block mb-2">Upload Signature <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="verified-signature"
                        />
                        <label
                          htmlFor="verified-signature"
                          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                          Choose File
                        </label>
                        <span className="text-gray-500 text-sm">No file chosen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
