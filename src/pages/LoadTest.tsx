import React, { useState } from 'react';
import ReusableTable from './ReusableTable';

const LoadTest = () => {
  const [formData, setFormData] = useState({
    equipment_name: '',
    ship_name: '0',
    patt_no: '',
    location: '',
    mfg_date: '',
    installation_date: '',
    eqpt_status: '0',
    test_load: '',
    load_tested_date: '',
    load_tested_due_date: '',
    total_row: 1,
    repairs_undertaken1: ''
  });

  const [repairsRows, setRepairsRows] = useState([{ id: 1, value: '' }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRepairsChange = (index, value) => {
    const newRows = [...repairsRows];
    newRows[index].value = value;
    setRepairsRows(newRows);
  };

  const handleTotalRowsChange = (value) => {
    const totalRows = parseInt(value) || 1;
    setFormData(prev => ({ ...prev, total_row: totalRows }));
    
    // Create new rows array
    const newRows = [];
    for (let i = 1; i <= totalRows; i++) {
      newRows.push({ 
        id: i, 
        value: repairsRows[i - 1]?.value || '' 
      });
    }
    setRepairsRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, repairsRows);
  };

  const handleReset = () => {
    setFormData({
      equipment_name: '',
      ship_name: '0',
      patt_no: '',
      location: '',
      mfg_date: '',
      installation_date: '',
      eqpt_status: '0',
      test_load: '',
      load_tested_date: '',
      load_tested_due_date: '',
      total_row: 1,
      repairs_undertaken1: ''
    });
    setRepairsRows([{ id: 1, value: '' }]);
  };

  const shipOptions = [
    { value: '43', label: 'SHIVALIK' },
    { value: '84', label: 'JAMUNA' },
    { value: '23', label: 'BANGARAM' },
    { value: '56', label: 'TARANGINI' },
    { value: '99', label: 'SARYU' },
    { value: '31', label: 'KUMBHIR' },
    { value: '87', label: 'T-83' },
    { value: '27', label: 'AIRAVAT' },
    { value: '48', label: 'KHANJAR' },
    { value: '57', label: 'SHUDERSHINI' },
    { value: '59', label: 'TRISHUL' },
    { value: '62', label: 'TEG' },
    { value: '55', label: 'RANVIJAY' },
    { value: '47', label: 'KIRPAN' },
    { value: '35', label: 'DELHI' },
    { value: '83', label: 'SURVEKSHAK' },
    { value: '65', label: 'JYOTI' },
    { value: '94', label: 'SUJATA' },
    { value: '76', label: 'KABRA' },
    { value: '68', label: 'CANKARSO' },
    { value: '88', label: 'T-84' },
    { value: '18', label: 'VIBHUTI' },
    { value: '17', label: 'NISHANK' },
    { value: '25', label: 'MAGAR' },
    { value: '42', label: 'BEAS' },
    { value: '90', label: 'SUVERNA' },
    { value: '45', label: 'SAHYADRI' },
    { value: '16', label: 'PRALAYA' },
    { value: '74', label: 'CHERIYAM' },
    { value: '44', label: 'SATPURA' },
    { value: '20', label: 'JALASHWA' },
    { value: '63', label: 'TARKASH' },
    { value: '52', label: 'KARMUK' },
    { value: '82', label: 'SUTLEJ' },
    { value: '96', label: 'SUMEDHA' },
    { value: '15', label: 'PRABAL' },
    { value: '75', label: 'CORA DIVH' },
    { value: '21', label: 'BATTIMALV' },
    { value: '38', label: 'CHENNAI' },
    { value: '97', label: 'SUMITRA' },
    { value: '86', label: 'T-82' },
    { value: '46', label: 'KUTHAR' },
    { value: '69', label: 'KONDUL' },
    { value: '89', label: 'SUBHDRA' },
    { value: '80', label: 'DARSHAK' },
    { value: '24', label: 'BITRA' },
    { value: '73', label: 'CHETLAT' },
    { value: '81', label: 'NIREEKSHAK' },
    { value: '71', label: 'KARUVA' },
    { value: '67', label: 'DEEPAK' },
    { value: '123', label: 'SHAKTI' },
    { value: '36', label: 'KOLKATA' },
    { value: '85', label: 'INVETIGATOR' },
    { value: '93', label: 'SHARDA' },
    { value: '64', label: 'SHAKTI' },
    { value: '33', label: 'MUMBAI' },
    { value: '39', label: 'GOMTI' },
    { value: '41', label: 'BETWA' },
    { value: '13', label: 'NASHAK' },
    { value: '70', label: 'KOSWARI' },
    { value: '30', label: 'CHEETAH' },
    { value: '58', label: 'TALWAR' },
    { value: '28', label: 'KESARI' },
    { value: '66', label: 'ADITYA' },
    { value: '22', label: 'BARATANG' },
    { value: '49', label: 'KORA' },
    { value: '51', label: 'KULISH' },
    { value: '53', label: 'RANA' },
    { value: '77', label: 'KALPENI' },
    { value: '122', label: 'SHAKTI' },
    { value: '12', label: 'VIPUL' },
    { value: '60', label: 'TABAR' },
    { value: '61', label: 'TRINKAND' },
    { value: '37', label: 'KOCHI' },
    { value: '91', label: 'SUKANYA' },
    { value: '92', label: 'SAVITRI' },
    { value: '29', label: 'GULDAR' },
    { value: '40', label: 'BRAHMAPUTRA' },
    { value: '26', label: 'GHARIAL' },
    { value: '54', label: 'RANVIR' },
    { value: '79', label: 'NIRUPAK' },
    { value: '19', label: 'VINASH' },
    { value: '50', label: 'KIRCH' },
    { value: '78', label: 'SANDHAYAK' },
    { value: '14', label: 'VIDYUT' },
    { value: '95', label: 'TIR' },
    { value: '32', label: 'GAJ' },
    { value: '72', label: 'CAR NICOBAR' },
    { value: '98', label: 'SUNAYNA' },
    { value: '34', label: 'MYSORE' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full px-1 py-2">
        <div className="w-full">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="bg-[#c7d9f0] text-black px-6 py-4 rounded-t-lg">
              <h5 className="text-xl font-semibold text-center">FORMAT FOR LIST OF EQUIPMENTS/ ITEMS LOAD TESTED I.A.W INBR 1552</h5>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Equipment Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Equipment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="equipment_name"
                    value={formData.equipment_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter equipment name"
                    maxLength="20"
                    required
                  />
                </div>

                {/* Ship Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ship Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="ship_name"
                    value={formData.ship_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    {shipOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patt No */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Patt No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patt_no"
                    value={formData.patt_no}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pattern number"
                    maxLength="20"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                    maxLength="20"
                    required
                  />
                </div>

                {/* MFG Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    MFG Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="mfg_date"
                      value={formData.mfg_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Installation Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Installation Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="installation_date"
                      value={formData.installation_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
              
                  </div>
                </div>

                {/* Eqpt Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Eqpt Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="eqpt_status"
                    value={formData.eqpt_status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="OPS">OPS</option>
                    <option value="NON-OPS">NON-OPS</option>
                  </select>
                </div>

                {/* Test Load */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Test Load <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="test_load"
                    value={formData.test_load}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter test load value"
                    maxLength="20"
                    required
                  />
                </div>

                {/* Load Tested on Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Load Tested on Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="load_tested_date"
                      value={formData.load_tested_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />

                  </div>
                </div>

                {/* Load Tested on Due Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Load Tested on Due Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="load_tested_due_date"
                      value={formData.load_tested_due_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />

                  </div>
                </div>
              </div>

              {/* REPAIRS UNDERTAKEN Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    REPAIRS UNDERTAKEN <span className="text-red-500">*</span>
                  </h4>
                </div>
                
                {/* Reusable Table for Repairs */}
                <div className="max-h-96 overflow-y-auto">
                  <ReusableTable
                    data={repairsRows.map((row, index) => ({
                      id: row.id,
                      sr_no: row.id,
                      repairs_undertaken: row.value
                    }))}
                    columns={[
                      {
                        field: 'sr_no',
                        header: 'Sr No.',
                        sortable: false,
                        style: { width: '100px' },
                        body: (rowData) => (
                          <div className="text-center font-medium">
                            {rowData.sr_no}
                          </div>
                        )
                      },
                      {
                        field: 'repairs_undertaken',
                        header: (
                          <div className="flex items-center space-x-2">
                            <span>Enter Total Number of Rows:</span>
                            <input
                              type="number"
                              name="total_row"
                              value={formData.total_row}
                              onChange={(e) => handleTotalRowsChange(e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black"
                              min="1"
                              max="99"
                            />
                          </div>
                        ),
                        sortable: false,
                        body: (rowData) => (
                          <input
                            type="text"
                            value={rowData.repairs_undertaken}
                            onChange={(e) => handleRepairsChange(rowData.id - 1, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter repairs undertaken"
                            maxLength="100"
                            required
                          />
                        )
                      }
                    ]}
                    pagination={false}
                    globalFilter={false}
                    exportable={false}
                    className="p-datatable-sm"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadTest;
