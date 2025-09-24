import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const IN379DockingReportSection2Report = () => {
  const [tableData, setTableData] = useState([
    // Sample data based on the HTML table structure
    {
      id: 1,
      bootTopping: 'Anti-fouling paint application',
      primer: 'Epoxy primer coating'
    },
    {
      id: 2,
      bootTopping: 'Hull cleaning and preparation',
      primer: 'Zinc phosphate primer'
    },
    {
      id: 3,
      bootTopping: 'Surface treatment',
      primer: 'Polyurethane primer'
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading IN 379 Docking Report Section 2 data for ID:', rowData.id);
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
      field: 'bootTopping',
      header: 'Boot Topping',
      style: { width: '200px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {rowData.bootTopping}
        </span>
      )
    },
    {
      field: 'primer',
      header: 'Primer',
      style: { width: '250px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {rowData.primer}
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
              <h5 className="text-2xl font-semibold">DOCKING REPORT SECTION - II</h5>
            </div>
            
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                title="DOCKING REPORT SECTION - II"
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

export default IN379DockingReportSection2Report;
