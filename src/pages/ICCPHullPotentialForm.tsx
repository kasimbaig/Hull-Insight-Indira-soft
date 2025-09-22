import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

const ICCPHullPotentialForm = () => {
  const [formData, setFormData] = useState({
    iccp_ins: '',
    date_last_docked: '',
    type_ref_electrode: '',
    bd_paint_applied: '',
    complete_anti_corrosive_paint: ''
  });

  const [part1Rows, setPart1Rows] = useState(1);
  const [part2Rows, setPart2Rows] = useState(1);

  const [part1Data, setPart1Data] = useState([{
    iccp_date: '',
    iccp_time: '',
    iccp_port: '',
    iccp_stbd: '',
    iccp_anode1: '',
    iccp_anode2: '',
    iccp_anode3: '',
    iccp_anode4: '',
    iccp_total_current: '',
    iccp_berthed_alongside: '',
    iccp_sailing_speed: '',
    iccp_remarks: ''
  }]);

  const [part2Data, setPart2Data] = useState([{
    agcl_date: '',
    agcl_time: '',
    agcl_forward_port: '',
    agcl_forward_stbd: '',
    agcl_midship_port: '',
    agcl_midship_stbd: '',
    agcl_aft_port: '',
    agcl_aft_stbd: '',
    agcl_remark: ''
  }]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePart1RowsChange = (newRowCount) => {
    setPart1Rows(newRowCount);
    const currentRows = part1Data.length;
    
    if (newRowCount > currentRows) {
      const newRows = Array(newRowCount - currentRows).fill(null).map(() => ({
        iccp_date: '',
        iccp_time: '',
        iccp_port: '',
        iccp_stbd: '',
        iccp_anode1: '',
        iccp_anode2: '',
        iccp_anode3: '',
        iccp_anode4: '',
        iccp_total_current: '',
        iccp_berthed_alongside: '',
        iccp_sailing_speed: '',
        iccp_remarks: ''
      }));
      setPart1Data([...part1Data, ...newRows]);
    } else if (newRowCount < currentRows) {
      setPart1Data(part1Data.slice(0, newRowCount));
    }
  };

  const handlePart2RowsChange = (newRowCount) => {
    setPart2Rows(newRowCount);
    const currentRows = part2Data.length;
    
    if (newRowCount > currentRows) {
      const newRows = Array(newRowCount - currentRows).fill(null).map(() => ({
        agcl_date: '',
        agcl_time: '',
        agcl_forward_port: '',
        agcl_forward_stbd: '',
        agcl_midship_port: '',
        agcl_midship_stbd: '',
        agcl_aft_port: '',
        agcl_aft_stbd: '',
        agcl_remark: ''
      }));
      setPart2Data([...part2Data, ...newRows]);
    } else if (newRowCount < currentRows) {
      setPart2Data(part2Data.slice(0, newRowCount));
    }
  };

  const handlePart1DataChange = (index, field, value) => {
    const newData = [...part1Data];
    newData[index] = { ...newData[index], [field]: value };
    setPart1Data(newData);
  };

  const handlePart2DataChange = (index, field, value) => {
    const newData = [...part2Data];
    newData[index] = { ...newData[index], [field]: value };
    setPart2Data(newData);
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    console.log('Part 1 Data:', part1Data);
    console.log('Part 2 Data:', part2Data);
  };

  const handleClear = () => {
    setFormData({
      iccp_ins: '',
      date_last_docked: '',
      type_ref_electrode: '',
      bd_paint_applied: '',
      complete_anti_corrosive_paint: ''
    });
    setPart1Data([{
      iccp_date: '',
      iccp_time: '',
      iccp_port: '',
      iccp_stbd: '',
      iccp_anode1: '',
      iccp_anode2: '',
      iccp_anode3: '',
      iccp_anode4: '',
      iccp_total_current: '',
      iccp_berthed_alongside: '',
      iccp_sailing_speed: '',
      iccp_remarks: ''
    }]);
    setPart2Data([{
      agcl_date: '',
      agcl_time: '',
      agcl_forward_port: '',
      agcl_forward_stbd: '',
      agcl_midship_port: '',
      agcl_midship_stbd: '',
      agcl_aft_port: '',
      agcl_aft_stbd: '',
      agcl_remark: ''
    }]);
    setPart1Rows(1);
    setPart2Rows(1);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
  };

  const handleFetchDrafts = () => {
    console.log('Fetching drafts...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Part I Header */}
      <div className="bg-[#c7d9f0] py-4">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          PART-I
        </h1>
        <h2 className="text-center text-2xl font-bold text-gray-800">
          QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH ICCP SYSTEM
        </h2>
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
              value={formData.iccp_ins}
              onChange={(e) => handleInputChange('iccp_ins', e.target.value)}
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
              Date Last Docked <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date_last_docked}
                onChange={(e) => handleInputChange('date_last_docked', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="DD-MM-YYYY"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type of Reference Electrode Used <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.type_ref_electrode}
              onChange={(e) => handleInputChange('type_ref_electrode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Brief Details of Paint Applied During Last Docking <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.bd_paint_applied}
              onChange={(e) => handleInputChange('bd_paint_applied', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Details of Complete Anti-Corrosive Paint Last Renewed <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.complete_anti_corrosive_paint}
              onChange={(e) => handleInputChange('complete_anti_corrosive_paint', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Part I Table */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Enter Total Number of Rows:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={part1Rows}
              onChange={(e) => handlePart1RowsChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-[#1a2746] text-white">
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    Date <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    Time <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium" colSpan="2">
                    <div className="text-center mb-2">Hull potential in mill volts</div>
                    <div className="flex">
                      <div className="flex-1 border-r border-blue-700 pr-2">Port <span className="text-red-300">*</span></div>
                      <div className="flex-1 pl-2">STBD <span className="text-red-300">*</span></div>
                    </div>
                  </th>
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium" colSpan="4">
                    <div className="text-center mb-2">Individual anode current(Amps)</div>
                    <div className="grid grid-cols-4 gap-1">
                      <div>Anode 1 <span className="text-red-300">*</span></div>
                      <div>Anode 2 <span className="text-red-300">*</span></div>
                      <div>Anode 3 <span className="text-red-300">*</span></div>
                      <div>Anode 4 <span className="text-red-300">*</span></div>
                    </div>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    Total current (Amps) <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    If berthed alongside some other ship, then name of the ship <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    If sailing speed in knots <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: part1Rows }, (_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="relative">
                        <input
                          type="date"
                          value={part1Data[index]?.iccp_date || ''}
                          onChange={(e) => handlePart1DataChange(index, 'iccp_date', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="DD-MM-YYYY"
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="relative">
                        <input
                          type="time"
                          value={part1Data[index]?.iccp_time || ''}
                          onChange={(e) => handlePart1DataChange(index, 'iccp_time', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_port || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_port', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_stbd || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_stbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_anode1 || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_anode1', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_anode2 || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_anode2', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_anode3 || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_anode3', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_anode4 || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_anode4', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_total_current || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_total_current', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_berthed_alongside || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_berthed_alongside', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_sailing_speed || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_sailing_speed', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={part1Data[index]?.iccp_remarks || ''}
                        onChange={(e) => handlePart1DataChange(index, 'iccp_remarks', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part II Header */}
        <div className="bg-blue-200 py-4 mb-6 rounded">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            PART-II
          </h1>
          <h2 className="text-center text-xl font-bold text-gray-800">
            HULL POTENTIAL READING AS RECORDED WITH PORTABLE ZINC/ AG/ AGCL REFERENCE ELECTRODE (INS SHAKTI)
          </h2>
        </div>

        {/* Part II Table */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Enter Total Number of Rows:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={part2Rows}
              onChange={(e) => handlePart2RowsChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-[#1a2746] text-white">
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    Date <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">
                    Time <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-blue-700 px-4 py-3 text-sm font-medium" colSpan="6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div>Forward (Frame Station)</div>
                        <div className="flex mt-1">
                          <div className="flex-1 border-r border-blue-700 pr-1">PORT</div>
                          <div className="flex-1 pl-1">STBD <span className="text-red-300">*</span></div>
                        </div>
                      </div>
                      <div>
                        <div>Midship (Frame Station)</div>
                        <div className="flex mt-1">
                          <div className="flex-1 border-r border-blue-700 pr-1">PORT <span className="text-red-300">*</span></div>
                          <div className="flex-1 pl-1">STBD <span className="text-red-300">*</span></div>
                        </div>
                      </div>
                      <div>
                        <div>Aft (Frame Station)</div>
                        <div className="flex mt-1">
                          <div className="flex-1 border-r border-blue-700 pr-1">PORT <span className="text-red-300">*</span></div>
                          <div className="flex-1 pl-1">STBD <span className="text-red-300">*</span></div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="border border-blue-700 px-2 py-3 text-sm font-medium">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: part2Rows }, (_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="relative">
                        <input
                          type="date"
                          value={part2Data[index]?.agcl_date || ''}
                          onChange={(e) => handlePart2DataChange(index, 'agcl_date', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="DD-MM-YYYY"
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="relative">
                        <input
                          type="time"
                          value={part2Data[index]?.agcl_time || ''}
                          onChange={(e) => handlePart2DataChange(index, 'agcl_time', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_forward_port || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_forward_port', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_forward_stbd || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_forward_stbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_midship_port || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_midship_port', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_midship_stbd || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_midship_stbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_aft_port || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_aft_port', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_aft_stbd || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_aft_stbd', e.target.value)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={part2Data[index]?.agcl_remark || ''}
                        onChange={(e) => handlePart2DataChange(index, 'agcl_remark', e.target.value)}
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
        <div className="flex justify-center border-2 p-2 bg-[#f1f7ff] gap-4">
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

export default ICCPHullPotentialForm;
