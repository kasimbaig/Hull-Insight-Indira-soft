import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const LoadTestReport = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      equipmentName: 'dfsdf',
      shipName: 'BANGARAM',
      pattNo: 'sdfsd',
      location: 'sdfsdf',
      mfgDate: '03/05/2025',
      installationDate: '16/05/2025',
      eqptStatus: 'OPS',
      testLoad: 'sdfsf',
      loadTestedDate: '19/05/2025',
      loadTestedDueDate: '22/05/2025'
    },
    {
      id: 2,
      equipmentName: 'sada',
      shipName: 'BANGARAM',
      pattNo: 'asd',
      location: 'sad',
      mfgDate: '20/05/2025',
      installationDate: '15/05/2025',
      eqptStatus: 'NON-OPS',
      testLoad: 'asda',
      loadTestedDate: '20/05/2025',
      loadTestedDueDate: '21/05/2025'
    },
    {
      id: 3,
      equipmentName: 'kkk',
      shipName: 'BANGARAM',
      pattNo: 'asd',
      location: 'asd',
      mfgDate: '20/05/2025',
      installationDate: '16/05/2025',
      eqptStatus: 'NON-OPS',
      testLoad: 'hg',
      loadTestedDate: '20/05/2025',
      loadTestedDueDate: '15/05/2025'
    },
    {
      id: 4,
      equipmentName: 'dfdfg',
      shipName: 'JAMUNA',
      pattNo: 'sdfsdf',
      location: 'sdfsf',
      mfgDate: '23/05/2025',
      installationDate: '01/05/2025',
      eqptStatus: 'OPS',
      testLoad: 'sdfsfsd',
      loadTestedDate: '01/05/2025',
      loadTestedDueDate: '14/05/2025'
    },
    {
      id: 5,
      equipmentName: '234 23j4k234kl32j l',
      shipName: 'TARANGINI',
      pattNo: '234j klj 234j23j4k2',
      location: '234oi24 23lk4jk24 2',
      mfgDate: '31/05/2025',
      installationDate: '15/05/2025',
      eqptStatus: 'OPS',
      testLoad: '345 43j5kj34l k5 3',
      loadTestedDate: '16/05/2025',
      loadTestedDueDate: '31/05/2025'
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading data for ID:', rowData.id);
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
      field: 'equipmentName',
      header: 'Equipment Name',
      style: { width: '150px' }
    },
    {
      field: 'shipName',
      header: 'Ship Name',
      style: { width: '120px' },
      body: (rowData) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {rowData.shipName}
        </span>
      )
    },
    {
      field: 'pattNo',
      header: 'PATT No',
      style: { width: '120px' }
    },
    {
      field: 'location',
      header: 'Location',
      style: { width: '120px' }
    },
    {
      field: 'mfgDate',
      header: 'MFG Date',
      style: { width: '120px' }
    },
    {
      field: 'installationDate',
      header: 'Installation Date',
      style: { width: '140px' }
    },
    {
      field: 'eqptStatus',
      header: 'EQPT Status',
      style: { width: '120px' },
      body: (rowData) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          rowData.eqptStatus === 'OPS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rowData.eqptStatus}
        </span>
      )
    },
    {
      field: 'testLoad',
      header: 'Test Load',
      style: { width: '120px' }
    },
    {
      field: 'loadTestedDate',
      header: 'Load Tested Date',
      style: { width: '140px' }
    },
    {
      field: 'loadTestedDueDate',
      header: 'Load Tested Due Date',
      style: { width: '150px' }
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
              <h5 className="text-2xl font-semibold">FORMAT FOR LIST OF EQUIPMENTS / ITEM LOAD TESTED I.A.W INBR 1552</h5>
            </div>
            
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                title="FORMAT FOR LIST OF EQUIPMENTS / ITEM LOAD TESTED I.A.W INBR 1552"
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

export default LoadTestReport;
