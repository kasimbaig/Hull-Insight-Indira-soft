import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

const HullPotentialDataForm = () => {
  const [formData, setFormData] = useState({
    shipName: '',
    shipLastUndocked: '',
    briefDetails: '',
    antiCorrosivePaintRenewed: '',
    referenceElectrodeUsed: '',
    referenceElectrode: ''
  });

  const [sacrificialAnodesRows, setSacrificialAnodesRows] = useState(1);
  const [hullPotentialRows, setHullPotentialRows] = useState(1);

  const [sacrificialAnodesData, setSacrificialAnodesData] = useState([{
    name: '',
    from: '',
    to: '',
    remarks: ''
  }]);

  const [hullPotentialData, setHullPotentialData] = useState([{
    date: '',
    time: '',
    forwardPort: '',
    forwardStbd: '',
    midshipPort: '',
    midshipStbd: '',
    aftPort: '',
    aftStbd: '',
    shipBerthed: '',
    remarks: ''
  }]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSacrificialAnodesRowsChange = (newRowCount) => {
    setSacrificialAnodesRows(newRowCount);
    const currentRows = sacrificialAnodesData.length;
    
    if (newRowCount > currentRows) {
      const newRows = Array(newRowCount - currentRows).fill(null).map(() => ({
        name: '',
        from: '',
        to: '',
        remarks: ''
      }));
      setSacrificialAnodesData([...sacrificialAnodesData, ...newRows]);
    } else if (newRowCount < currentRows) {
      setSacrificialAnodesData(sacrificialAnodesData.slice(0, newRowCount));
    }
  };

  const handleHullPotentialRowsChange = (newRowCount) => {
    setHullPotentialRows(newRowCount);
    const currentRows = hullPotentialData.length;
    
    if (newRowCount > currentRows) {
      const newRows = Array(newRowCount - currentRows).fill(null).map(() => ({
        date: '',
        time: '',
        forwardPort: '',
        forwardStbd: '',
        midshipPort: '',
        midshipStbd: '',
        aftPort: '',
        aftStbd: '',
        shipBerthed: '',
        remarks: ''
      }));
      setHullPotentialData([...hullPotentialData, ...newRows]);
    } else if (newRowCount < currentRows) {
      setHullPotentialData(hullPotentialData.slice(0, newRowCount));
    }
  };

  const handleSacrificialAnodesDataChange = (index, field, value) => {
    const newData = [...sacrificialAnodesData];
    newData[index] = { ...newData[index], [field]: value };
    setSacrificialAnodesData(newData);
  };

  const handleHullPotentialDataChange = (index, field, value) => {
    const newData = [...hullPotentialData];
    newData[index] = { ...newData[index], [field]: value };
    setHullPotentialData(newData);
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    console.log('Sacrificial Anodes Data:', sacrificialAnodesData);
    console.log('Hull Potential Data:', hullPotentialData);
  };

  const handleClear = () => {
    setFormData({
      shipName: '',
      shipLastUndocked: '',
      briefDetails: '',
      antiCorrosivePaintRenewed: '',
      referenceElectrodeUsed: '',
      referenceElectrode: ''
    });
    setSacrificialAnodesData([{ name: '', from: '', to: '', remarks: '' }]);
    setHullPotentialData([{
      date: '',
      time: '',
      forwardPort: '',
      forwardStbd: '',
      midshipPort: '',
      midshipStbd: '',
      aftPort: '',
      aftStbd: '',
      shipBerthed: '',
      remarks: ''
    }]);
    setSacrificialAnodesRows(1);
    setHullPotentialRows(1);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
  };

  const handleFetchDrafts = () => {
    console.log('Fetching drafts...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#bfdbfe] py-4">
        <h1 className="text-center text-2xl font-semibold  text-gray-800">
          QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH SACRIFICIAL ANODES
        </h1>
      </div>

      {/* Form Container */}
      <div className="max-w-full mx-auto p-6 bg-white mt-4 rounded-lg shadow-sm">
        {/* Top Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ship Name <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.shipName}
              onChange={(e) => handleInputChange('shipName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">--Select--</option>
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ship Last Undocked <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.shipLastUndocked}
                onChange={(e) => handleInputChange('shipLastUndocked', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Brief Details of Paint Applied During Last Calibrated Docking <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.briefDetails}
              onChange={(e) => handleInputChange('briefDetails', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Complete Anti-Corrosive Paint Last Renewed <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.antiCorrosivePaintRenewed}
                onChange={(e) => handleInputChange('antiCorrosivePaintRenewed', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reference Electrode Used <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.referenceElectrodeUsed}
              onChange={(e) => handleInputChange('referenceElectrodeUsed', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reference Electrode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.referenceElectrode}
              onChange={(e) => handleInputChange('referenceElectrode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Sacrificial Anodes Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 bg-gray-200 p-2 rounded">
            SACRIFICIAL ANODES REPLACED DURING LAST DOCKING
          </h2>
          
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Enter Total Number of Rows:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={sacrificialAnodesRows}
              onChange={(e) => handleSacrificialAnodesRowsChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#0072a6] text-white">
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium w-20">Sr No.</th>
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium">
                    Name <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium">
                    <div className="text-center">Location/Frame Station</div>
                    <div className="flex">
                      <div className="flex-1 border-r border-blue-700 pr-2">From <span className="text-red-300">*</span></div>
                      <div className="flex-1 pl-2">To <span className="text-red-300">*</span></div>
                    </div>
                  </th>
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium">
                    Remarks <span className="text-red-300">*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: sacrificialAnodesRows }, (_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium bg-gray-50">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={sacrificialAnodesData[index]?.name || ''}
                        onChange={(e) => handleSacrificialAnodesDataChange(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 p-0">
                      <div className="flex">
                        <div className="flex-1 p-2 border-r border-gray-300">
                          <input
                            type="text"
                            value={sacrificialAnodesData[index]?.from || ''}
                            onChange={(e) => handleSacrificialAnodesDataChange(index, 'from', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div className="flex-1 p-2">
                          <input
                            type="text"
                            value={sacrificialAnodesData[index]?.to || ''}
                            onChange={(e) => handleSacrificialAnodesDataChange(index, 'to', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={sacrificialAnodesData[index]?.remarks || ''}
                        onChange={(e) => handleSacrificialAnodesDataChange(index, 'remarks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hull Potential Section */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Enter Total Number of Rows:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={hullPotentialRows}
              onChange={(e) => handleHullPotentialRowsChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-[#0072a6] text-white">
                  <th className="border border-blue-700 px-2 py-3 text-xs font-medium">
                    Date <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-xs font-medium">Time</th>
                  <th className="border border-blue-700 px-4 py-3 text-xs font-medium" colSpan="6">
                    <div className="text-center mb-2">Hull potential in mill volts</div>
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      <div className="text-center">
                        <div>Forward (Frame Station)</div>
                        <div className="flex mt-1">
                          <div className="flex-1 border-r border-blue-700 pr-1">PORT <span className="text-red-300">*</span></div>
                          <div className="flex-1 pl-1">STBD <span className="text-red-300">*</span></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div>Midship (Frame Station)</div>
                        <div className="flex mt-1">
                          <div className="flex-1 border-r border-blue-700 pr-1">PORT <span className="text-red-300">*</span></div>
                          <div className="flex-1 pl-1">STBD <span className="text-red-300">*</span></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div>Aft (Frame Station)</div>
                        <div className="flex mt-1">
                          <div className="flex-1 border-r border-blue-700 pr-1">PORT <span className="text-red-300">*</span></div>
                          <div className="flex-1 pl-1">STBD <span className="text-red-300">*</span></div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-xs font-medium">
                    Ship berthed/ sailing. (If berthed alongside some other ship, then name of the ship) <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-xs font-medium">
                    Remarks <span className="text-red-300">*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: hullPotentialRows }, (_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="relative">
                        <input
                          type="date"
                          value={hullPotentialData[index]?.date || ''}
                          onChange={(e) => handleHullPotentialDataChange(index, 'date', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="DD-MM-YYYY"
                        />
                        <Calendar className="absolute right-2 top-2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="relative">
                        <input
                          type="time"
                          value={hullPotentialData[index]?.time || ''}
                          onChange={(e) => handleHullPotentialDataChange(index, 'time', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                        <Clock className="absolute right-2 top-2 h-3 w-3 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.forwardPort || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'forwardPort', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.forwardStbd || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'forwardStbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.midshipPort || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'midshipPort', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.midshipStbd || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'midshipStbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.aftPort || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'aftPort', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.aftStbd || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'aftStbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.shipBerthed || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'shipBerthed', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={hullPotentialData[index]?.remarks || ''}
                        onChange={(e) => handleHullPotentialDataChange(index, 'remarks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleFetchDrafts}
            className="px-6 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors duration-200"
          >
            FETCH DRAFTS
          </button>
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            SAVE DRAFT
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            CLEAR
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default HullPotentialDataForm;
