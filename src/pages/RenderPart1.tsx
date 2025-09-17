import React, { useState } from 'react';
import ReusableTable from './ReusableTable';

const RenderPart1 = () => {
  const [formData, setFormData] = useState({
    ship: 'INS SHAKTI',
    initiated_by: '',
    render1_status: '0',
    dart_no: 'H1338',
    render1_period: '',
    type_of_door: '0',
    render1_compartment: '0',
    render1_date_of_initiation: '',
    type_of_test_undertaken: '',
    render1_date_of_chalk_test: '',
    render1_defect_discovered: '',
    render1_action_taken: ''
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

    // Show/hide Dart No based on Status
    if (name === 'render1_status') {
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
      render1_status: '0',
      dart_no: 'H1338',
      render1_period: '',
      type_of_door: '0',
      render1_compartment: '0',
      render1_date_of_initiation: '',
      type_of_test_undertaken: '',
      render1_date_of_chalk_test: '',
      render1_defect_discovered: '',
      render1_action_taken: ''
    });
    setShowDartNo(false);
  };

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      sr_no: 1,
      ship: 'SHAKTI',
      dart_no: 'H1327',
      period: 'Half Yearly (July)',
      type_of_door: 'DOOR',
      compartment: '70-72(P)',
      date_of_initiation: '07/11/2015',
      status: 'SAT',
      date_of_chalk_test: '07/11/2015',
      type_of_test: 'dfgdfg',
      action_taken: '',
      defect_discovered: ''
    },
    {
      id: 2,
      sr_no: 2,
      ship: 'SHAKTI',
      dart_no: 'H1328',
      period: 'Half Yearly (December)',
      type_of_door: 'HATCH',
      compartment: '20-21(S)',
      date_of_initiation: '15/12/2015',
      status: 'UNSAT',
      date_of_chalk_test: '15/12/2015',
      type_of_test: 'test type 2',
      action_taken: 'Action taken',
      defect_discovered: 'Defect found'
    },
    {
      id: 3,
      sr_no: 3,
      ship: 'SHAKTI',
      dart_no: 'H1329',
      period: 'Half Yearly (July)',
      type_of_door: 'DOOR',
      compartment: '32-33(S)',
      date_of_initiation: '10/07/2016',
      status: 'SAT',
      date_of_chalk_test: '10/07/2016',
      type_of_test: 'test type 3',
      action_taken: '',
      defect_discovered: ''
    },
    {
      id: 4,
      sr_no: 4,
      ship: 'SHAKTI',
      dart_no: 'H1330',
      period: 'Half Yearly (December)',
      type_of_door: 'HATCH',
      compartment: '61-62(S)',
      date_of_initiation: '20/12/2016',
      status: 'UNSAT',
      date_of_chalk_test: '20/12/2016',
      type_of_test: 'test type 4',
      action_taken: 'Repair completed',
      defect_discovered: 'Minor corrosion'
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
      field: 'dart_no',
      header: 'Dart No.',
      sortable: true,
      style: { width: '120px' }
    },
    {
      field: 'ship',
      header: 'Ship',
      sortable: true,
      style: { width: '120px' }
    },
    {
      field: 'period',
      header: 'Period',
      sortable: true,
      style: { width: '200px' }
    },
    {
      field: 'type_of_door',
      header: 'Type of Door',
      sortable: true,
      style: { width: '120px' }
    },
    {
      field: 'compartment',
      header: 'Compartment',
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
      field: 'status',
      header: 'Status',
      sortable: true,
      style: { width: '120px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          rowData.status === 'SAT' ? 'bg-green-100 text-green-800' :
          rowData.status === 'UNSAT' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {rowData.status}
        </span>
      )
    },
    {
      field: 'date_of_chalk_test',
      header: 'Date of Chalk Test',
      sortable: true,
      style: { width: '150px' }
    },
    {
      field: 'type_of_test',
      header: 'Type of Test',
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
      field: 'defect_discovered',
      header: 'Defect Discovered',
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
              <h5 className="text-2xl font-semibold">IN-378 RENDER PART-I</h5>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="render1_status"
                    value={formData.render1_status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="SAT">SAT</option>
                    <option value="UNSAT">UNSAT</option>
                  </select>
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
                        name="render1_period"
                        value="Half Yearly (July)"
                        checked={formData.render1_period === 'Half Yearly (July)'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Half Yearly (July)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="render1_period"
                        value="Half Yearly (December)"
                        checked={formData.render1_period === 'Half Yearly (December)'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Half Yearly (December)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Type of Door */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type of Door <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type_of_door"
                    value={formData.type_of_door}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="DOOR">DOOR</option>
                    <option value="HATCH">HATCH</option>
                  </select>
                </div>

                {/* Compartment */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Compartment <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="render1_compartment"
                    value={formData.render1_compartment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="0">--Select--</option>
                    <option value="7013">70-72(P)</option>
                    <option value="7326">20-21(S)</option>
                    <option value="7327">32-33(S)</option>
                    <option value="7328">61-62(S)</option>
                    <option value="7329">61-62(P)</option>
                    <option value="7330">63-64(S)</option>
                    <option value="7331">3-4(P)</option>
                    <option value="7332">3-4(S)</option>
                    <option value="7333">16-18(S)</option>
                    <option value="7334">18-20(P)</option>
                    <option value="7335">48-49(S)</option>
                    <option value="7336">48-49(P)</option>
                    <option value="7337">48-50(S)</option>
                    <option value="7338">49-51(P)</option>
                    <option value="7339">52-54(S)</option>
                    <option value="7340">52-54(P)</option>
                    <option value="7341">60-62(S)</option>
                    <option value="7342">60-62(P)</option>
                    <option value="7343">62-64(S)</option>
                    <option value="7344">62-64(P)</option>
                    <option value="7345">68-70(S)</option>
                    <option value="7346">68-70(P)</option>
                    <option value="7347">84-85(S)</option>
                    <option value="7348">99-100(P)</option>
                    <option value="7349">163-164(S)</option>
                    <option value="7350">177-179(S)</option>
                    <option value="7351">177-179(P)</option>
                    <option value="7352">178-179(S)</option>
                    <option value="7353">180-181(P)</option>
                    <option value="7354">180-182(S)</option>
                    <option value="7355">210-212(S)</option>
                    <option value="7356">210-212(P)</option>
                    <option value="7357">18-20(S)</option>
                    <option value="7358">50-52(S)</option>
                    <option value="7359">65-67(S)</option>
                    <option value="7360">65-67(P)</option>
                    <option value="7361">74-76(P)</option>
                    <option value="7362">84-85(P)</option>
                    <option value="7363">87-88(S)</option>
                    <option value="7364">87-88(P)</option>
                    <option value="7365">138-139(S)</option>
                    <option value="7366">138-139(P)</option>
                    <option value="7367">138-149(S)</option>
                    <option value="7368">148-149(S)</option>
                    <option value="7369">148-149(P)</option>
                    <option value="7370">209-210(S)</option>
                    <option value="7371">209-210(P)</option>
                    <option value="7372">214-216(P)</option>
                    <option value="7373">31-32(P)</option>
                    <option value="7374">31-32(S)</option>
                    <option value="7375">38-40(S)</option>
                    <option value="7376">49-51(S)</option>
                    <option value="7377">54-56(P)</option>
                    <option value="7378">57-60(S)</option>
                    <option value="7379">58-60(P)</option>
                    <option value="7380">60-61(P)</option>
                    <option value="7381">64-66(S)</option>
                    <option value="7382">68-69(P)</option>
                    <option value="7383">138-139(S)</option>
                    <option value="7384">138-139(S)</option>
                    <option value="7385">37-39(S)</option>
                    <option value="7386">37-39(P)</option>
                    <option value="7387">44-46(S)</option>
                    <option value="7388">44-46(P)</option>
                    <option value="7389">68-69(S)</option>
                    <option value="7390">138-139(S)</option>
                    <option value="7391">38-39(S)</option>
                    <option value="7392">56-58(P)</option>
                    <option value="7393">53-54(P)</option>
                    <option value="7394">53-54(S)</option>
                    <option value="7395">72-73(S)</option>
                    <option value="7396">56-57(S)</option>
                    <option value="7397">56-57(P)</option>
                    <option value="7398">59-60(S)</option>
                    <option value="7399">70-72(S)</option>
                    <option value="7400">15-16(P)</option>
                    <option value="7401">2-4(P)</option>
                    <option value="7402">2-4(S)</option>
                    <option value="7403">17-18(P)</option>
                    <option value="7404">26-28(S)</option>
                    <option value="7405">39-40(S)</option>
                    <option value="7406">206-210(P)</option>
                    <option value="7407">224-226(P)</option>
                    <option value="7408">98-99(S)</option>
                    <option value="7409">137-138(S)</option>
                    <option value="7410">184-185(S)</option>
                    <option value="7411">228-230(P)</option>
                  </select>
                </div>

                {/* Date of Initiation */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Initiation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="render1_date_of_initiation"
                      value={formData.render1_date_of_initiation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="DD-MM-YYYY"
                      maxLength="10"
                      required
                    />
                    <i className="pi pi-calendar absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                {/* Type of Test Undertaken */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type of Test Undertaken(Date of Chalk Test/ULD/Air Hose Test) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="type_of_test_undertaken"
                    value={formData.type_of_test_undertaken}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Test type"
                    maxLength="50"
                    required
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Date of Chalk Test/ULD/Air Hose Test */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Chalk Test/ULD/Air Hose Test <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="render1_date_of_chalk_test"
                      value={formData.render1_date_of_chalk_test}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="DD-MM-YYYY"
                      maxLength="10"
                      required
                    />
                    <i className="pi pi-calendar absolute right-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                {/* Action Taken */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Action Taken
                  </label>
                  <textarea
                    name="render1_action_taken"
                    value={formData.render1_action_taken}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    placeholder="Describe actions taken"
                    maxLength="50"
                  />
                </div>

                {/* Defect Discovered */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Defect Discovered
                  </label>
                  <textarea
                    name="render1_defect_discovered"
                    value={formData.render1_defect_discovered}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    placeholder="Describe defects found"
                    maxLength="50"
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
                  CLEAR
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>

          {/* Data Table Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="bg-[#0072a6] text-white px-6 py-4 rounded-t-lg">
              <h5 className="text-xl font-semibold">REPORT RENDER PART-I</h5>
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

export default RenderPart1;