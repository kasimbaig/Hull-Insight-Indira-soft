import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const ShipWeightManagementReport = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      command: 'WNC',
      classOfShip: 'FAC',
      ship: 'SHAKTI',
      shipStatus: 'OPS'
    },
    {
      id: 2,
      command: 'SNC',
      classOfShip: 'STS',
      ship: 'SHUDERSHINI',
      shipStatus: 'OPS'
    },
    {
      id: 3,
      command: 'SNC',
      classOfShip: 'WJFAC',
      ship: 'CANKARSO',
      shipStatus: 'REFIT'
    },
    {
      id: 4,
      command: 'WNC',
      classOfShip: 'FAC',
      ship: 'BARATANG',
      shipStatus: 'REFIT'
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading Ship Weight Management data for ID:', rowData.id);
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
      field: 'command',
      header: 'Command',
      style: { width: '100px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {rowData.command}
        </span>
      )
    },
    {
      field: 'classOfShip',
      header: 'Class of Ship',
      style: { width: '120px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {rowData.classOfShip}
        </span>
      )
    },
    {
      field: 'ship',
      header: 'Ship',
      style: { width: '150px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {rowData.ship}
        </span>
      )
    },
    {
      field: 'shipStatus',
      header: 'Ship Status',
      style: { width: '120px' },
      body: (rowData) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          rowData.shipStatus === 'OPS' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {rowData.shipStatus}
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
              <h5 className="text-2xl font-semibold">SHIP WEIGHT MANAGEMENT</h5>
            </div>
            
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                title="SHIP WEIGHT MANAGEMENT"
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

export default ShipWeightManagementReport;
