import React, { useState } from 'react';
import ReusableTable from './ReusableTable';

const RenderPart2 = () => {
  const [formData, setFormData] = useState({
    ship: 'INS SHAKTI',
    initiated_by: '',
    render2_apt_status: '0',
    dart_no: 'H1338',
    cluster_name: '0',
    render2_compartment: '0',
    render2_date_of_initiation: '',
    render2_date_of_examination: '',
    render2_period: '',
    render2_defect_discovered: '',
    render2_action_taken: ''
  });

  const [showDartNo, setShowDartNo] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Show/hide Dart No based on APT Status
    if (name === 'render2_apt_status') {
      setShowDartNo(value === 'UNSAT');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      ship: 'INS SHAKTI',
      initiated_by: '',
      render2_apt_status: '0',
      dart_no: 'H1338',
      cluster_name: '0',
      render2_compartment: '0',
      render2_date_of_initiation: '',
      render2_date_of_examination: '',
      render2_period: '',
      render2_defect_discovered: '',
      render2_action_taken: ''
    });
    setShowDartNo(false);
  };

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      sr_no: 1,
      ship: 'SHAKTI',
      cluster_name: 'CLUSTER I',
      apt_status: 'UNSAT',
      period: 'Half Yearly (July)',
      defect_discovered: '',
      action_taken: '',
      date_of_initiation: '01/05/2025',
      date_of_examination: '01/05/2025'
    },
    {
      id: 2,
      sr_no: 2,
      ship: 'SHAKTI',
      cluster_name: 'CLUSTER I',
      apt_status: 'INPROGRESS',
      period: 'Half Yearly (July)',
      defect_discovered: '',
      action_taken: '',
      date_of_initiation: '04/06/2025',
      date_of_examination: '06/06/2025'
    },
    {
      id: 3,
      sr_no: 3,
      ship: 'SHAKTI',
      cluster_name: 'CLUSTER I',
      apt_status: 'UNSAT',
      period: 'Half Yearly (December)',
      defect_discovered: '',
      action_taken: '',
      date_of_initiation: '03/06/2025',
      date_of_examination: '09/06/2025'
    },
    {
      id: 4,
      sr_no: 4,
      ship: 'SHAKTI',
      cluster_name: 'CLUSTER II',
      apt_status: 'SAT',
      period: 'Half Yearly (July)',
      defect_discovered: 'eee',
      action_taken: '444',
      date_of_initiation: '03/06/2025',
      date_of_examination: '06/06/2025'
    }
  ];

  const columns = [
    {
      field: 'sr_no',
      header: 'Sr No.',
      sortable: true,
      style: { width: '80px' }
    },
    {
      field: 'ship',
      header: 'Ship',
      sortable: true,
      style: { width: '120px' }
    },
    {
      field: 'cluster_name',
      header: 'Cluster Name',
      sortable: true,
      style: { width: '150px' }
    },
    {
      field: 'apt_status',
      header: 'APT Status',
      sortable: true,
      style: { width: '120px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          rowData.apt_status === 'SAT' ? 'bg-green-100 text-green-800' :
          rowData.apt_status === 'UNSAT' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {rowData.apt_status}
        </span>
      )
    },
    {
      field: 'period',
      header: 'Period',
      sortable: true,
      style: { width: '200px' }
    },
    {
      field: 'defect_discovered',
      header: 'Defect Discovered',
      sortable: true,
      style: { width: '150px' }
    },
    {
      field: 'action_taken',
      header: 'Action Taken',
      sortable: true,
      style: { width: '150px' }
    },
    {
      field: 'date_of_initiation',
      header: 'Date of Initiation',
      sortable: true,
      style: { width: '150px' }
    },
    {
      field: 'date_of_examination',
      header: 'Date of Examination',
      sortable: true,
      style: { width: '150px' }
    },
    {
      field: 'actions',
      header: 'Action',
      style: { width: '100px' },
      body: (rowData) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Edit Data"
            onClick={() => console.log('Edit', rowData.id)}
          >
            <i className="pi pi-pencil text-sm"></i>
          </button>
          <button
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete Data"
            onClick={() => console.log('Delete', rowData.id)}
          >
            <i className="pi pi-trash text-sm"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="max-w-full mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
              <h5 className="text-2xl font-semibold">IN-378 RENDER PART-II</h5>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Ship */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ship
                  </label>
                  <div className="flex items-center space-x-2">
                    <i className="pi pi-ship text-blue-600"></i>
                    <span className="text-gray-900 font-medium">{formData.ship}</span>
                  </div>
                  <input type="hidden" name="ship" value={formData.ship} />
                </div>

                {/* Initiated By */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Initiated By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="initiated_by"
                    value={formData.initiated_by}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter name"
                    maxLength="20"
                    required
                  />
                </div>

                {/* APT Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    APT Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="render2_apt_status"
                    value={formData.render2_apt_status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="SAT">SAT</option>
                    <option value="UNSAT">UNSAT</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                  </select>
                </div>

                {/* Dart No - Conditional */}
                {showDartNo && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Dart No
                    </label>
                    <div className="flex items-center space-x-2">
                      <i className="pi pi-circle text-blue-600"></i>
                      <span className="text-gray-900 font-medium">{formData.dart_no}</span>
                    </div>
                    <input type="hidden" name="dart_no" value={formData.dart_no} />
                  </div>
                )}

                {/* Cluster Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Cluster Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="cluster_name"
                    value={formData.cluster_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="432">CLUSTER I</option>
                    <option value="433">CLUSTER II</option>
                    <option value="434">CLUSTER III</option>
                    <option value="435">CLUSTER IV</option>
                    <option value="436">CLUSTER V</option>
                    <option value="437">CLUSTER VI</option>
                    <option value="438">CLUSTER VII</option>
                    <option value="439">CLUSTER VIII</option>
                  </select>
                </div>

                {/* Compartment */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Compartment <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="render2_compartment"
                    value={formData.render2_compartment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="432">ASP</option>
                    <option value="433">Technical Engg. Store</option>
                    <option value="434">Techinical Space</option>
                    <option value="435">MER and Double bottom service tank</option>
                    <option value="436">DGR & Auxillary Machinery room</option>
                    <option value="437">Pipe tunnel</option>
                    <option value="438">Bow Thruster compartment</option>
                    <option value="439">ATDS Sonar compartment, Cable locker & Fore peak tank</option>
                  </select>
                </div>

                {/* Date of Initiation */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Initiation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="render2_date_of_initiation"
                      value={formData.render2_date_of_initiation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Date of Examination */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Examination <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="render2_date_of_examination"
                      value={formData.render2_date_of_examination}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Period */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Period <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="render2_period"
                        value="Half Yearly (July)"
                        checked={formData.render2_period === 'Half Yearly (July)'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Half Yearly (July)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="render2_period"
                        value="Half Yearly (December)"
                        checked={formData.render2_period === 'Half Yearly (December)'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Half Yearly (December)</span>
                    </label>
                  </div>
                </div>

                {/* Defect Discovered */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Defect Discovered
                  </label>
                  <textarea
                    name="render2_defect_discovered"
                    value={formData.render2_defect_discovered}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    placeholder="Describe defects found"
                    maxLength="50"
                  />
                </div>

                {/* Action Taken */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Action Taken
                  </label>
                  <textarea
                    name="render2_action_taken"
                    value={formData.render2_action_taken}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    placeholder="Describe actions taken"
                    maxLength="50"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <i className="pi pi-refresh mr-2"></i>
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <i className="pi pi-save mr-2"></i>
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* Data Table Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="bg-[#1a2746] text-white px-6 py-4 rounded-t-lg">
              <h5 className="text-xl font-semibold">REPORT RENDER PART-II</h5>
            </div>
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                pagination={true}
                rows={10}
                globalFilter={true}
                exportable={true}
                className="p-datatable-sm"
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default RenderPart2;
