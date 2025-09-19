import React, { useState, useEffect } from 'react';
import { get } from '../lib/api';

const ParticularsUnderwaterHullSurveyByYard = () => {
  // State for refit data
  const [refits, setRefits] = useState([]);
  const [loadingRefits, setLoadingRefits] = useState(false);
  const [refitError, setRefitError] = useState(null);

  // Form data for Part I
  const [formData, setFormData] = useState({
    nameOfShip: '0',
    typeOfRefit: '0',
    refitStartedOn: '',
    refitCompletionOn: '',
    refittingYard: '0',
    place: '',
    supervisor: '',
    officerInCharge: '',
    dockingParticulars: '',
    totalUnderwaterAreaOfShip: '',
    includingBootTopArea: '',
    totalBootTopAreaOfShip: '',
    surveyParticular: '',
    typeOfSurveyCarriedOut: '0',
    dateOfSurveyFrom: '',
    dateOfSurveyTo: '',
    areaSurveyed: '',
    areaGradedSuspect: '',
    areaGradedDefectiveSuspectAndRenewed: '',
    areaGradedSuspectDefectiveAndTemporaryRepair: '',
    totalUnderwaterAreaRenewed: '',
    totalTonnageOfUnderwaterHullRenewal: '',
    generalObservationOnConditionOfHullMaterialState: '0',
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

  // Part II form data for underwater hull survey record
  const [part2TotalRows, setPart2TotalRows] = useState(1);
  const [part2TableData, setPart2TableData] = useState([
    {
      id: 1,
      strakeDeckNo: '',
      frameStationFrom: '',
      frameStationTo: '',
      originalThickness: '',
      extentOfCorrosion: '',
      extentOfPitting: '',
      averageResidualThicknessOutsidePittedArea: '',
      averageResidualThicknessOfPittedArea: '',
      meanThickness: '',
      reductionInThickness: '',
      grading: '',
      actionTaken: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { formData, tableData });
  };

  // Part II handlers
  const handlePart2RowCountChange = (e) => {
    const newRowCount = parseInt(e.target.value) || 1;
    setPart2TotalRows(newRowCount);
    
    // Update table data array
    const newData = [];
    for (let i = 0; i < newRowCount; i++) {
      newData.push({
        id: i + 1,
        strakeDeckNo: part2TableData[i]?.strakeDeckNo || '',
        frameStationFrom: part2TableData[i]?.frameStationFrom || '',
        frameStationTo: part2TableData[i]?.frameStationTo || '',
        originalThickness: part2TableData[i]?.originalThickness || '',
        extentOfCorrosion: part2TableData[i]?.extentOfCorrosion || '',
        extentOfPitting: part2TableData[i]?.extentOfPitting || '',
        averageResidualThicknessOutsidePittedArea: part2TableData[i]?.averageResidualThicknessOutsidePittedArea || '',
        averageResidualThicknessOfPittedArea: part2TableData[i]?.averageResidualThicknessOfPittedArea || '',
        meanThickness: part2TableData[i]?.meanThickness || '',
        reductionInThickness: part2TableData[i]?.reductionInThickness || '',
        grading: part2TableData[i]?.grading || '',
        actionTaken: part2TableData[i]?.actionTaken || ''
      });
    }
    setPart2TableData(newData);
  };

  const handlePart2TableInputChange = (rowIndex, field, value) => {
    const newData = [...part2TableData];
    newData[rowIndex][field] = value;
    setPart2TableData(newData);
  };

  const handlePart2ClearTable = () => {
    const clearedData = part2TableData.map(row => ({
      ...row,
      strakeDeckNo: '',
      frameStationFrom: '',
      frameStationTo: '',
      originalThickness: '',
      extentOfCorrosion: '',
      extentOfPitting: '',
      averageResidualThicknessOutsidePittedArea: '',
      averageResidualThicknessOfPittedArea: '',
      meanThickness: '',
      reductionInThickness: '',
      grading: '',
      actionTaken: ''
    }));
    setPart2TableData(clearedData);
  };

  const handlePart2FetchDrafts = () => {
    console.log('Fetching Part II drafts...');
    // Add fetch drafts functionality here
  };

  const handlePart2SaveDraft = () => {
    console.log('Saving Part II draft:', { formData, part2TableData });
    // Add save draft functionality here
  };

  // Fetch refits data on component mount
  useEffect(() => {
    const fetchRefits = async () => {
      setLoadingRefits(true);
      setRefitError(null);
      try {
        const response = await get('master/refits/');
        // Ensure response is an array, handle different response structures
        if (Array.isArray(response)) {
          setRefits(response);
        } else if (response && Array.isArray(response.data)) {
          setRefits(response.data);
        } else if (response && Array.isArray(response.results)) {
          setRefits(response.results);
        } else {
          console.warn('Unexpected refits response structure:', response);
          setRefits([]);
          setRefitError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching refits:', error);
        setRefitError('Failed to load refits data');
        setRefits([]); // Ensure refits is always an array
      } finally {
        setLoadingRefits(false);
      }
    };

    fetchRefits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
            <h5 className="text-2xl font-semibold mb-2">PART I</h5>
            <h5 className="text-3xl font-bold underline">PARTICULARS OF UNDERWATER HULL SURVEY BY YARD</h5>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              {/* Name of Ship */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name of Ship <span className="text-red-500">*</span>
                </label>
                <select
                  name="nameOfShip"
                  value={formData.nameOfShip}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
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

              {/* Type of Refit */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type of Refit <span className="text-red-500">*</span>
                </label>
                <select
                  name="typeOfRefit"
                  value={formData.typeOfRefit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loadingRefits}
                >
                  <option value="0">--Select--</option>
                  {loadingRefits ? (
                    <option value="">Loading refits...</option>
                  ) : refitError ? (
                    <option value="">Error loading refits</option>
                  ) : Array.isArray(refits) && refits.length > 0 ? (
                    refits.map((refit) => (
                      <option key={refit.id} value={refit.id}>
                        {refit.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No refits available</option>
                  )}
                </select>
                {refitError && (
                  <p className="text-red-500 text-xs mt-1">{refitError}</p>
                )}
              </div>

              {/* Refit Started on */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Refit Started on <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="refitStartedOn"
                    value={formData.refitStartedOn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute right-3 top-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Refit Completion on */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Refit Completion on <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="refitCompletionOn"
                    value={formData.refitCompletionOn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute right-3 top-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Refitting Yard */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Refitting Yard <span className="text-red-500">*</span>
                </label>
                <select
                  name="refittingYard"
                  value={formData.refittingYard}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  <option value="ND MUMBAI">ND MUMBAI</option>
                  <option value="NSRY KOCHI">NSRY KOCHI</option>
                  <option value="ND VISAKHAPATNAM">ND VISAKHAPATNAM</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Place */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Supervisor */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Supervisor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Officer in Charge */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Officer in Charge <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="officerInCharge"
                  value={formData.officerInCharge}
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
                  name="dockingParticulars"
                  value={formData.dockingParticulars}
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
                            <div className="absolute right-2 top-1">
                              <input type="checkbox" className="w-3 h-3" />
                            </div>
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
                            <div className="absolute right-2 top-1">
                              <input type="checkbox" className="w-3 h-3" />
                            </div>
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
                  type="text"
                  name="totalUnderwaterAreaOfShip"
                  value={formData.totalUnderwaterAreaOfShip}
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
                  type="text"
                  name="includingBootTopArea"
                  value={formData.includingBootTopArea}
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
                  type="text"
                  name="totalBootTopAreaOfShip"
                  value={formData.totalBootTopAreaOfShip}
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
                  name="surveyParticular"
                  value={formData.surveyParticular}
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
                  name="typeOfSurveyCarriedOut"
                  value={formData.typeOfSurveyCarriedOut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  <option value="Visual_Inspection">Visual Inspection</option>
                  <option value="Ultrasonic_Testing">Ultrasonic Testing</option>
                  <option value="Magnetic_Particle_Testing">Magnetic Particle Testing</option>
                  <option value="Dye_Penetrant_Testing">Dye Penetrant Testing</option>
                  <option value="Radiographic_Testing">Radiographic Testing</option>
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
                    name="dateOfSurveyFrom"
                    value={formData.dateOfSurveyFrom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute right-3 top-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
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
                    name="dateOfSurveyTo"
                    value={formData.dateOfSurveyTo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute right-3 top-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Area Surveyed */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area Surveyed (Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="areaSurveyed"
                  value={formData.areaSurveyed}
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
                  type="text"
                  name="areaGradedSuspect"
                  value={formData.areaGradedSuspect}
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
                  type="text"
                  name="areaGradedDefectiveSuspectAndRenewed"
                  value={formData.areaGradedDefectiveSuspectAndRenewed}
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
                  type="text"
                  name="areaGradedSuspectDefectiveAndTemporaryRepair"
                  value={formData.areaGradedSuspectDefectiveAndTemporaryRepair}
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
                  type="text"
                  name="totalUnderwaterAreaRenewed"
                  value={formData.totalUnderwaterAreaRenewed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Total Tonnage of Underwater Hull Renewal */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Tonnage of Underwater Hull Renewal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="totalTonnageOfUnderwaterHullRenewal"
                  value={formData.totalTonnageOfUnderwaterHullRenewal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
              {/* General Observation on Condition of Hull Material State */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  General Observation on the Condition of Hull Material State Constructor Overseer <span className="text-red-500">*</span>
                </label>
                <select
                  name="generalObservationOnConditionOfHullMaterialState"
                  value={formData.generalObservationOnConditionOfHullMaterialState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

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
                  <div className="absolute right-3 top-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Part II Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
            <h5 className="text-2xl font-semibold mb-2 underline">PART II</h5>
            <h5 className="text-3xl font-bold underline">RECORD OF UNDERWATER HULL SURVEY</h5>
          </div>

          <div className="p-6">
            {/* Row Count Input */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Enter Total Number of Rows.
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={part2TotalRows}
                  onChange={handlePart2RowCountChange}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Sr No.
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Strake/Deck No. etc. <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center" colSpan="2">
                      Frame Station
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Original Thickness (mm) <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Extent of Corrosion <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Extent of Pitting <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Average Residual Thickness Outside Pitted Area (T1) (mm)
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Average Residual Thickness of Pitted Area (T2) (mm)
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Mean Thickness (mm) <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      % Reduction in Thickness <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Grading <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Action Taken <span className="text-red-500">*</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Sr No. */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Strake/Deck No. */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      From <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      To <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Original Thickness */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Extent of Corrosion */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Extent of Pitting */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Average Residual Thickness Outside Pitted Area */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Average Residual Thickness of Pitted Area */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Mean Thickness */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for % Reduction */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Grading */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Action Taken */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {part2TableData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-300 text-sm text-center font-medium bg-gray-50 text-gray-600">
                        {row.id}
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.strakeDeckNo}
                          onChange={(e) => handlePart2TableInputChange(index, 'strakeDeckNo', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Enter strake/deck no."
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.frameStationFrom}
                          onChange={(e) => handlePart2TableInputChange(index, 'frameStationFrom', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="From"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.frameStationTo}
                          onChange={(e) => handlePart2TableInputChange(index, 'frameStationTo', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="To"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.originalThickness}
                          onChange={(e) => handlePart2TableInputChange(index, 'originalThickness', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Thickness"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.extentOfCorrosion}
                          onChange={(e) => handlePart2TableInputChange(index, 'extentOfCorrosion', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Corrosion extent"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.extentOfPitting}
                          onChange={(e) => handlePart2TableInputChange(index, 'extentOfPitting', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Pitting extent"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.averageResidualThicknessOutsidePittedArea}
                          onChange={(e) => handlePart2TableInputChange(index, 'averageResidualThicknessOutsidePittedArea', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="T1 thickness"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.averageResidualThicknessOfPittedArea}
                          onChange={(e) => handlePart2TableInputChange(index, 'averageResidualThicknessOfPittedArea', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="T2 thickness"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.meanThickness}
                          onChange={(e) => handlePart2TableInputChange(index, 'meanThickness', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Mean thickness"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.reductionInThickness}
                          onChange={(e) => handlePart2TableInputChange(index, 'reductionInThickness', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="% Reduction"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.grading}
                          onChange={(e) => handlePart2TableInputChange(index, 'grading', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Grading"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.actionTaken}
                          onChange={(e) => handlePart2TableInputChange(index, 'actionTaken', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Action taken"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePart2FetchDrafts}
                className="px-6 py-2 bg-[#0072a6] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                FETCH DRAFTS
              </button>
              <button
                type="button"
                onClick={handlePart2SaveDraft}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                SAVE DRAFT
              </button>
              <button
                type="button"
                onClick={handlePart2ClearTable}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={() => console.log('Save Part II:', { formData, part2TableData })}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularsUnderwaterHullSurveyByYard;
