import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const ICCPReturnsReport = () => {
  const [tableData, setTableData] = useState([
    // Sample data - the HTML shows "No data available in table" but we'll include sample data for demonstration
    {
      id: 1,
      shipLastUndocked: 'INS Vikramaditya',
      briefDetailsOfPaint: 'Anti-fouling paint applied to hull bottom and sides. Primer coat followed by two coats of anti-corrosive paint. Final coat of anti-fouling paint applied.'
    },
    {
      id: 2,
      shipLastUndocked: 'INS Vikrant',
      briefDetailsOfPaint: 'Complete hull painting with epoxy primer, intermediate coat, and top coat. Special attention to underwater hull areas with copper-based anti-fouling paint.'
    },
    {
      id: 3,
      shipLastUndocked: 'INS Arihant',
      briefDetailsOfPaint: 'Hull protection system with zinc-rich primer, epoxy intermediate coat, and polyurethane top coat. Sacrificial anode system installed.'
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading ICCP Returns data for ID:', rowData.id);
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
      field: 'shipLastUndocked',
      header: 'Ship Last Undocked',
      style: { width: '200px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {rowData.shipLastUndocked}
        </span>
      )
    },
    {
      field: 'briefDetailsOfPaint',
      header: 'Brief Details of Paint',
      style: { width: '400px' }
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
              <h5 className="text-2xl font-semibold">QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH SACRIFICIAL ANODES</h5>
            </div>
            
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                title="QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH SACRIFICIAL ANODES"
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

export default ICCPReturnsReport;
