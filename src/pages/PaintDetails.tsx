import React, { useState } from 'react';

const PaintDetails = () => {
  const [dockyard, setDockyard] = useState('');
  const [uwHullRows, setUwHullRows] = useState(1);
  const [awHullRows, setAwHullRows] = useState(1);
  const [bilgesRows, setBilgesRows] = useState(1);
  const [tanksRows, setTanksRows] = useState(1);
  const [compartmentsRows, setCompartmentsRows] = useState(1);
  const [superStructureRows, setSuperStructureRows] = useState(1);
  const [weatherDeckRows, setWeatherDeckRows] = useState(1);
  const [heloDeckRows, setHeloDeckRows] = useState(1);


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
      className={`bg-[#0072a6] text-white p-2 text-sm font-medium border border-gray-300 text-center ${className}`}
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

  const RowControl = ({ label, rows, setRows, minRows = 1 }) => (
    <div className="mb-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">{label}</label>
        <input
          type="number"
          min={minRows}
          max="20"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value) || minRows)}
          className="w-16 px-2 py-1 border border-gray-300 text-sm bg-white"
        />
      </div>
    </div>
  );

  const PaintTable = ({ title, rows, setRows, description, hasSchemaDropdown = false, sectionPrefix = "" }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      
      <RowControl
        label="Enter Total Number of Rows."
        rows={rows}
        setRows={setRows}
      />

      <div className={`overflow-x-auto ${rows > 5 ? 'max-h-96 overflow-y-auto' : ''}`}>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr>
              <TableHeader rowSpan={2} className="w-16">Sr No.</TableHeader>
              <TableHeader rowSpan={2} className="w-48">Description</TableHeader>
              <TableHeader rowSpan={2} className="w-48">Schema<strong className="text-red-500">*</strong></TableHeader>
              <TableHeader rowSpan={2} className="w-48">Location Type<strong className="text-red-500">*</strong></TableHeader>
              <TableHeader rowSpan={2} className="w-48">Tank No./Comp No.<strong className="text-red-500">*</strong></TableHeader>
              <TableHeader colSpan={2} className="w-48">Frame Station<strong className="text-red-500">*</strong></TableHeader>
              <TableHeader rowSpan={2} className="w-48">Port/STBD/Centre<strong className="text-red-500">*</strong></TableHeader>
              <TableHeader rowSpan={2} className="w-48">Remarks<strong className="text-red-500">*</strong></TableHeader>
            </tr>
            <tr>
              <TableHeader className="w-24">From<strong className="text-red-500">*</strong></TableHeader>
              <TableHeader className="w-24">To<strong className="text-red-500">*</strong></TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.from({ length: rows }, (_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <TableCell className="text-center font-medium bg-gray-50">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Input 
                    value={description} 
                    readOnly 
                    className="bg-gray-100"
                  />
                </TableCell>
                <TableCell>
                  {hasSchemaDropdown ? (
                    <Select 
                      name={`${sectionPrefix}_schema${index + 1}`}
                      id={`${sectionPrefix}_schema${index + 1}`}
                      required
                    >
                      <option value="0">--Select--</option>
                      <option value="AC">A/C</option>
                      <option value="AF">A/F</option>
                    </Select>
                  ) : (
                    <Input 
                      placeholder="Enter schema" 
                      name={`${sectionPrefix}_schema${index + 1}`}
                      id={`${sectionPrefix}_schema${index + 1}`}
                      maxLength="20"
                      required 
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Enter location type" 
                    name={`${sectionPrefix}_location_type${index + 1}`}
                    id={`${sectionPrefix}_location_type${index + 1}`}
                    maxLength="20"
                    required 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Enter tank/comp no." 
                    name={`${sectionPrefix}_tank_no${index + 1}`}
                    id={`${sectionPrefix}_tank_no${index + 1}`}
                    maxLength="20"
                    required 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="From" 
                    name={`${sectionPrefix}_from${index + 1}`}
                    id={`${sectionPrefix}_from${index + 1}`}
                    maxLength="4"
                    required 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="To" 
                    name={`${sectionPrefix}_to${index + 1}`}
                    id={`${sectionPrefix}_to${index + 1}`}
                    maxLength="4"
                    required 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Enter port/STBD/centre" 
                    name={`${sectionPrefix}_port${index + 1}`}
                    id={`${sectionPrefix}_port${index + 1}`}
                    maxLength="4"
                    required 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    placeholder="Enter remarks" 
                    name={`${sectionPrefix}_remarks${index + 1}`}
                    id={`${sectionPrefix}_remarks${index + 1}`}
                    maxLength="50"
                    required 
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto bg-white shadow-md">
      {/* Header */}
      <div className="bg-[#c7d9f0] p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-black">PAINT DETAILS</h1>
      </div>

      <div className="p-6 bg-gray-50">
        {/* Dockyard Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Dockyard <span className="text-red-500">*</span>
          </label>
          <Select 
            className="max-w-sm" 
            name="dockyard"
            id="dockyard"
            value={dockyard}
            onChange={(e) => setDockyard(e.target.value)}
            required
          >
            <option value="0">--Select--</option>
            <option value="ND MUMBAI">ND MUMBAI</option>
            <option value="NSRY KOCHI">NSRY KOCHI</option>
            <option value="ND VISAKHAPATNAM">ND VISAKHAPATNAM</option>
          </Select>
        </div>

        {/* U/W Hull Table */}
        <PaintTable
          title="U/W Hull"
          rows={uwHullRows}
          setRows={setUwHullRows}
          description="U/W Hull"
          hasSchemaDropdown={true}
          sectionPrefix="uw"
        />

        {/* A/W Hull Table */}
        <PaintTable
          title="A/W Hull"
          rows={awHullRows}
          setRows={setAwHullRows}
          description="A/W Hull"
          hasSchemaDropdown={false}
          sectionPrefix="aw"
        />

        {/* Bilges Table */}
        <PaintTable
          title="Bilges"
          rows={bilgesRows}
          setRows={setBilgesRows}
          description="Bilges"
          hasSchemaDropdown={false}
          sectionPrefix="bilges"
        />

        {/* Tanks Table */}
        <PaintTable
          title="Tanks"
          rows={tanksRows}
          setRows={setTanksRows}
          description="Tanks"
          hasSchemaDropdown={false}
          sectionPrefix="tank"
        />

        {/* Compartments Table */}
        <PaintTable
          title="Compartments"
          rows={compartmentsRows}
          setRows={setCompartmentsRows}
          description="Compartments"
          hasSchemaDropdown={false}
          sectionPrefix="compart"
        />

        {/* Super Structure Table */}
        <PaintTable
          title="Super Structure"
          rows={superStructureRows}
          setRows={setSuperStructureRows}
          description="Super Structure"
          hasSchemaDropdown={false}
          sectionPrefix="super"
        />

        {/* Weather Deck Table */}
        <PaintTable
          title="Weather Deck"
          rows={weatherDeckRows}
          setRows={setWeatherDeckRows}
          description="Weather Deck"
          hasSchemaDropdown={false}
          sectionPrefix="weather"
        />

        {/* HeloDeck/Flight Deck Table */}
        <PaintTable
          title="HeloDeck/Flight Deck"
          rows={heloDeckRows}
          setRows={setHeloDeckRows}
          description="HeloDeck/Flight Deck"
          hasSchemaDropdown={false}
          sectionPrefix="helo"
        />

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

export default PaintDetails;
