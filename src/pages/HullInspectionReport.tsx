import React, { useState } from 'react';

const HullInspectionReport = () => {
  const [quarterEnding, setQuarterEnding] = useState('');
  const [totalRows, setTotalRows] = useState(1);
  const [selectedShip, setSelectedShip] = useState('');

  const Input = ({ className = "", ...props }) => (
    <input
      className={`w-full p-2 border border-gray-300 text-sm ${className}`}
      {...props}
    />
  );

  const Select = ({ children, className = "", ...props }) => (
    <select
      className={`w-full p-2 border border-gray-300 text-sm bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );

  const TableHeader = ({ children, className = "", ...props }) => (
    <th 
      className={`bg-[#1a2746] text-white p-2 text-sm font-medium border border-gray-300 text-center ${className}`}
      {...props}
    >
      {children}
    </th>
  );

  const TableCell = ({ children, className = "" }) => (
    <td className={`p-2 border border-gray-300 ${className}`}>
      {children}
    </td>
  );

  return (
    <div className="max-w-full mx-auto bg-white shadow-md">
      {/* Header - Modified to match the image */}
      <div className="bg-[#c7d9f0] py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-semibold text-gray-800 mr-2">
            SHIP STAFF REPORT OF HULL INSPECTION INS -
          </h1>
          <div>
          <Select 
            className="w-40" 
            value={selectedShip}
            onChange={(e) => setSelectedShip(e.target.value)}
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
          </Select>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50">
        {/* Quarter Ending Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Ship-Staff Report of Hull Inspection for the Quarter Ending *
          </label>
          <Input
            type="date"
            value={quarterEnding}
            onChange={(e) => setQuarterEnding(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {/* Row Controls */}
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Enter Total Number of Rows.</label>
            <input
              type="number"
              min="1"
              max="20"
              value={totalRows}
              onChange={(e) => setTotalRows(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 text-sm bg-white"
            />
          </div>
        </div>

        {/* Main Table */}
        <div className={`overflow-x-auto mb-6 ${totalRows > 5 ? 'overflow-y-auto max-h-96' : ''}`}>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr>
                <TableHeader rowSpan={2} className="w-16">S No.</TableHeader>
                <TableHeader rowSpan={2} className="w-48">
                  Location/Compartment *
                </TableHeader>
                <TableHeader colSpan={2} className="w-48">
                  Frame Station
                </TableHeader>
                <TableHeader rowSpan={2} className="w-48">
                  Description of Defects *
                </TableHeader>
                <TableHeader rowSpan={2} className="w-56">
                  Probable reason for occurrence of the defect *
                </TableHeader>
                <TableHeader rowSpan={2} className="w-48">
                  Action taken *
                </TableHeader>
                <TableHeader rowSpan={2} className="w-48">
                  Remarks *
                </TableHeader>
              </tr>
              <tr>
                <TableHeader className="w-24">
                  From *
                </TableHeader>
                <TableHeader className="w-24">
                  To *
                </TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.from({ length: totalRows }, (_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium bg-gray-50">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Enter location/compartment" required />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="From" required />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="To" required />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Description of defects" required />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Probable reason" required />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Action taken" required />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Remarks" required />
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          <button className="bg-cyan-500 text-white px-6 py-2 text-sm font-medium hover:bg-cyan-600 transition-colors">
            FETCH DRAFTS
          </button>
          <button className="bg-green-500 text-white px-6 py-2 text-sm font-medium hover:bg-green-600 transition-colors">
            SAVE DRAFT
          </button>
          <button className="bg-red-500 text-white px-6 py-2 text-sm font-medium hover:bg-red-600 transition-colors">
            CLEAR
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default HullInspectionReport;