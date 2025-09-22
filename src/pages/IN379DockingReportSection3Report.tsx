import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const IN379DockingReportSection3Report = () => {
  const [tableData, setTableData] = useState([
    // Sample data based on the HTML table structure
    {
      id: 1,
      workDone: 'Hull maintenance and repair',
      propellerModification: 'Propeller blade adjustment and balancing'
    },
    {
      id: 2,
      workDone: 'Engine overhaul',
      propellerModification: 'Propeller pitch optimization'
    },
    {
      id: 3,
      workDone: 'Navigation system upgrade',
      propellerModification: 'Propeller coating application'
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading IN 379 Docking Report Section 3 data for ID:', rowData.id);
    // Add download functionality here
  };

  // Define columns for ReusableTable
  const columns = [
    {
      field: 'id',
      header: 'Sr No.',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'workDone',
      header: 'Work Done',
      style: { width: '250px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          {rowData.workDone}
        </span>
      )
    },
    {
      field: 'propellerModification',
      header: 'Propeller Modification',
      style: { width: '300px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {rowData.propellerModification}
        </span>
      )
    },
    {
      field: 'actions',
      header: 'Action',
      style: { width: '100px' },
      body: (rowData) => (
        <button
          onClick={() => handleDownload(rowData)}
          className="text-blue-600 hover:text-blue-800 p-1"
          title="Download Data"
        >
          <Download size={16} />
        </button>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="max-w-full mx-auto">
          {/* Report Section */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
              <h5 className="text-2xl font-semibold">DOCKING REPORT SECTION - III</h5>
            </div>
            
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                title="DOCKING REPORT SECTION - III"
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

export default IN379DockingReportSection3Report;
