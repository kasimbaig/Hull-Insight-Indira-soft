import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const ShipStaffReportHullInspection = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      srNo: 1,
      ins: 'SHIVALIK',
      quarterEnding: 'Q1 2024'
    },
    {
      id: 2,
      srNo: 2,
      ins: 'JAMUNA',
      quarterEnding: 'Q2 2024'
    },
    {
      id: 3,
      srNo: 3,
      ins: 'SARYU',
      quarterEnding: 'Q3 2024'
    },
    {
      id: 4,
      srNo: 4,
      ins: 'SHIVALIK',
      quarterEnding: 'Q4 2024'
    },
    {
      id: 5,
      srNo: 5,
      ins: 'JAMUNA',
      quarterEnding: 'Q1 2025'
    },
    {
      id: 6,
      srNo: 6,
      ins: 'SARYU',
      quarterEnding: 'Q2 2025'
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading Ship Staff Report of Hull Inspection data for ID:', rowData.id);
    // Add download functionality here
  };

  // Define columns for ReusableTable
  const columns = [
    {
      field: 'srNo',
      header: 'Sr No.',
      style: { width: '100px' },
      align: 'center'
    },
    {
      field: 'ins',
      header: 'INS',
      style: { width: '150px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {rowData.ins}
        </span>
      )
    },
    {
      field: 'quarterEnding',
      header: 'Quarter Ending',
      style: { width: '200px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {rowData.quarterEnding}
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
          <div className="bg-[#1a2746] text-white px-6 py-4 rounded-t-lg">
            <h5 className="text-xl font-semibold">SHIP STAFF REPORT OF HULL INSPECTION</h5>
          </div>
          
          <div className="p-6">
            <ReusableTable
              data={tableData}
              columns={columns}
              title="SHIP STAFF REPORT OF HULL INSPECTION"
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

export default ShipStaffReportHullInspection;
