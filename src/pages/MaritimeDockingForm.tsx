import React, { useState } from 'react';

const MaritimeDockingForm = () => {
  const [formData, setFormData] = useState({
    planned_short: '',
    emergency: '',
    docking_plan: '',
    state_reason: '',
    day_not_underway: '',
    day_waterborne: '',
    percentage_of_inactivity: ''
  });

  const [listRows, setListRows] = useState(1);
  const [trimRows, setTrimRows] = useState(1);
  const [ballastRows, setBallastRows] = useState(1);
  const [keelBlockRows, setKeelBlockRows] = useState(1);
  const [dockRows, setDockRows] = useState(1);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateInactivityPercentage = () => {
    const notUnderway = parseFloat(formData.day_not_underway);
    const waterborne = parseFloat(formData.day_waterborne);
    
    if (!isNaN(notUnderway) && !isNaN(waterborne) && waterborne !== 0) {
      const percentage = (notUnderway * 100) / waterborne;
      setFormData(prev => ({
        ...prev,
        percentage_of_inactivity: percentage.toFixed(2)
      }));
    }
  };

  const TableHeader = ({ children, className = "" }) => (
    <th className={`bg-[#0072a6] text-white p-2 text-sm font-medium border border-gray-300 ${className}`}>
      {children}
    </th>
  );

  const TableCell = ({ children, className = "" }) => (
    <td className={`p-1 border border-gray-300 ${className}`}>
      {children}
    </td>
  );

  const Input = ({ className = "", ...props }) => (
    <input
      className={`w-full p-1 border border-gray-300 text-sm ${className}`}
      {...props}
    />
  );

  const Select = ({ children, className = "", ...props }) => (
    <select
      className={`w-full p-1 border border-gray-300 text-sm bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );

  const RowControls = ({ current, setRows }) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm">Enter Total Number of Rows:</span>
      <input
        type="number"
        min="1"
        max="20"
        value={current}
        onChange={(e) => setRows(parseInt(e.target.value) || 1)}
        className="w-16 px-2 py-1 border border-gray-300 text-sm bg-white"
      />
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-4 bg-gray-50">
      <div className="bg-white shadow-lg">
        {/* Header */}
        <div className="bg-[#c7d9f0] p-3 text-center text-lg font-bold text-black border-b">
          IN 379 - DOCKING REPORT SECTION -1
        </div>

        <div className="bg-gray-200 p-3 text-center text-sm font-medium border-b">
          SECTION - I - GENERAL
        </div>

        <div className="p-4">
          {/* Reason for Docking Section */}
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-3 bg-gray-100 p-2">
              REASON FOR DOCKING AND DOCKING PARTICULARS
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs mb-1">
                  Planned short/Normal Refit/Major Refit <span className="text-red-500">*</span>
                </label>
                <Input 
                  value={formData.planned_short}
                  onChange={(e) => handleInputChange('planned_short', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">
                  Emergency (giving details) <span className="text-red-500">*</span>
                </label>
                <Input 
                  value={formData.emergency}
                  onChange={(e) => handleInputChange('emergency', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">
                  Docking Plan/Drawing Reference <span className="text-red-500">*</span>
                </label>
                <Input 
                  value={formData.docking_plan}
                  onChange={(e) => handleInputChange('docking_plan', e.target.value)}
                />
              </div>
            </div>

             {/* Details of Dock Table */}
             <div className="mb-6">
               <RowControls 
                 current={dockRows}
                 setRows={setDockRows}
               />
              
              <table className="w-full border border-gray-300 text-xs">
                <thead>
                  <tr>
                    <TableHeader>Sr No.</TableHeader>
                    <TableHeader>Place of Dock</TableHeader>
                    <TableHeader>Date of Docking</TableHeader>
                    <TableHeader>Date of Undocking</TableHeader>
                    <TableHeader>No of days</TableHeader>
                    <TableHeader>Version</TableHeader>
                    <TableHeader>Draught Fwd</TableHeader>
                    <TableHeader>Draught Aft</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: dockRows }, (_, i) => (
                    <tr key={i}>
                      <TableCell className="text-center w-12">{i + 1}</TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell>
                        <Input type="date" />
                      </TableCell>
                      <TableCell>
                        <Input type="date" />
                      </TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell>
                        <Select>
                          <option value="">--Select--</option>
                          <option value="version1">VERSION 1</option>
                          <option value="version2">VERSION 2</option>
                        </Select>
                      </TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {/* Details of List Table */}
             <div className="mb-6">
               <h3 className="text-sm font-bold mb-3 bg-gray-100 p-2">Details of List</h3>
               <RowControls 
                 current={listRows}
                 setRows={setListRows}
               />
              
              <table className="w-full border border-gray-300 text-xs">
                <thead>
                  <tr>
                    <TableHeader>Sr No.</TableHeader>
                    <TableHeader>List before docking</TableHeader>
                    <TableHeader>List on chocks</TableHeader>
                    <TableHeader>List after undocking</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: listRows }, (_, i) => (
                    <tr key={i}>
                      <TableCell className="text-center w-12">{i + 1}</TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {/* Details of Trim Table */}
             <div className="mb-6">
               <h3 className="text-sm font-bold mb-3 bg-gray-100 p-2">Details of Trim</h3>
               <RowControls 
                 current={trimRows}
                 setRows={setTrimRows}
               />
              
              <table className="w-full border border-gray-300 text-xs">
                <thead>
                  <tr>
                    <TableHeader>Sr No</TableHeader>
                    <TableHeader>Trim at Docking (Ford)</TableHeader>
                    <TableHeader>Trim at Docking (Aft)</TableHeader>
                    <TableHeader>Trim at Undocking (Ford)</TableHeader>
                    <TableHeader>Trim at Undocking (Aft)</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: trimRows }, (_, i) => (
                    <tr key={i}>
                      <TableCell className="text-center w-12">{i + 1}</TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {/* Ballast Correction Table */}
             <div className="mb-6">
               <label className="text-sm mb-3 block">Details of ballast/ corrective weights, if any:-</label>
               <RowControls 
                 current={ballastRows}
                 setRows={setBallastRows}
               />
              
              <table className="w-full border border-gray-300 text-xs">
                <thead>
                  <tr>
                    <TableHeader>Sr No.</TableHeader>
                    <TableHeader>Weight</TableHeader>
                    <TableHeader>Location</TableHeader>
                    <TableHeader>Remarks</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: ballastRows }, (_, i) => (
                    <tr key={i}>
                      <TableCell className="text-center w-12">{i + 1}</TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                      <TableCell><Input /></TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* Keel Blocks Section */}
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-3 bg-gray-100 p-2">KEEL BLOCKS</h2>
            <label className="text-sm mb-3 block">
              Details of dock blocks completely/ partially removed post docking for carrying out repairs/painting:-
            </label>

             <RowControls 
               current={keelBlockRows}
               setRows={setKeelBlockRows}
             />
            
            <table className="w-full border border-gray-300 text-xs mb-4">
              <thead>
                <tr>
                  <TableHeader>Sr No.</TableHeader>
                  <TableHeader>Dock Block No.</TableHeader>
                  <TableHeader>Location/Frame</TableHeader>
                  <TableHeader>Remarks</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: keelBlockRows }, (_, i) => (
                  <tr key={i}>
                    <TableCell className="text-center w-12">{i + 1}</TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input /></TableCell>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mb-4">
              <label className="block text-sm mb-2">
                Have blocks been removed for coating flat keel overall? If not, state reason <span className="text-red-500">*</span>
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 text-sm h-20"
                value={formData.state_reason}
                onChange={(e) => handleInputChange('state_reason', e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-3 bg-gray-100 p-2">REMARKS:</h2>
            
            <div className="mb-4">
              <div className="text-sm text-center mb-2">(Day not underway * 100) / Day waterborne</div>
              <div className="flex items-center gap-4">
                <label className="text-sm">
                  Percentage of Inactivity <span className="text-red-500">*</span> =
                </label>
                <div className="flex items-center gap-2">
                  <Input 
                    className="w-32"
                    value={formData.day_not_underway}
                    onChange={(e) => {
                      handleInputChange('day_not_underway', e.target.value);
                      calculateInactivityPercentage();
                    }}
                  />
                  <span className="text-sm">/</span>
                  <Input 
                    className="w-32"
                    value={formData.day_waterborne}
                    onChange={(e) => {
                      handleInputChange('day_waterborne', e.target.value);
                      calculateInactivityPercentage();
                    }}
                  />
                  <span className="text-sm">* 100 =</span>
                  <Input 
                    className="w-32" 
                    value={formData.percentage_of_inactivity}
                    readOnly 
                  />
                </div>
              </div>
            </div>
          </div>

           {/* Special Reports Section */}
           <div className="mb-6">
             <h2 className="text-sm font-bold mb-3 bg-gray-100 p-2">SPECIAL REPORTS/GENERAL REMARKS</h2>
             
             <div className="grid grid-cols-2 gap-8">
               <div className="text-center border-r border-gray-300 pr-8">
                 <div className="relative mb-2">
                   <input 
                     type="file" 
                     accept=".jpg,.jpeg,.png"
                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
                   />
                 </div>
                 <div className="text-sm text-gray-600">Commanding Officer/ Shipyard In-charge <span className="text-red-500">*</span></div>
               </div>
               
               <div className="text-center pl-8">
                 <div className="relative mb-2">
                   <input 
                     type="file" 
                     accept=".jpg,.jpeg,.png"
                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
                   />
                 </div>
                 <div className="text-sm text-gray-600">Docking Officer/Docking Overseer <span className="text-red-500">*</span></div>
               </div>
             </div>
           </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-2 pt-4 border-t">
            <button className="bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:bg-blue-600">
              FETCH DRAFTS
            </button>
            <button className="bg-green-500 text-white px-4 py-2 text-sm font-medium hover:bg-green-600">
              SAVE DRAFT
            </button>
            <button className="bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600">
              CLEAR
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaritimeDockingForm;
