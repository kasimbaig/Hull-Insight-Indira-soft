import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ReusableTable from './ReusableTable';

const BHSReport = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      registrationNo: '6.7 RIM-2025-div',
      yearOfRendering: 2017,
      berAber: 'BER',
      occOfRendering: 'Annually',
      conditionOfHull: 'abc',
      conditionOfDavitLifting: 'abc',
      conditionOfFittings: 'abc',
      center1: 'SAT',
      stbd: 'UNSAT',
      port: 'SAT',
      auxilliaries: 'UNSAT',
      center2: 5645,
      stbd2: 45645,
      port2: 456,
      center3: 456,
      stbd3: 65,
      port3: 456,
      majorRepairs: 'abc',
      hullYear: 1,
      hullMonth: '',
      detailsOfCollar: 1,
      engineYear: 11,
      engineMonth: '',
      remarks: 1,
      icYear: 1,
      icMonth: ''
    },
    {
      id: 2,
      registrationNo: 'dfgdg-2021-dgdgdfg',
      yearOfRendering: 2020,
      berAber: 'ABER',
      occOfRendering: 'Initially',
      conditionOfHull: 'dfg',
      conditionOfDavitLifting: 'dfg',
      conditionOfFittings: 'dfg',
      center1: 'SAT',
      stbd: 'SAT',
      port: 'UNSAT',
      auxilliaries: 'UNSAT',
      center2: 345,
      stbd2: 35,
      port2: 456,
      center3: 2653,
      stbd3: 543,
      port3: 345,
      majorRepairs: '3',
      hullYear: 6453634,
      hullMonth: '',
      detailsOfCollar: 5363,
      engineYear: 653,
      engineMonth: '',
      remarks: 63,
      icYear: 54,
      icMonth: ''
    }
  ]);

  const handleDownload = (rowData) => {
    console.log('Downloading BHS data for ID:', rowData.id);
    // Add download functionality here
  };

  // Define columns for ReusableTable
  const columns = [
    {
      field: 'id',
      header: 'Sr No.',
      style: { width: '60px' },
      align: 'center'
    },
    {
      field: 'registrationNo',
      header: 'Registration No.',
      style: { width: '150px' }
    },
    {
      field: 'yearOfRendering',
      header: 'Year of Rendering',
      style: { width: '120px' },
      align: 'center'
    },
    {
      field: 'berAber',
      header: 'BER/ ABER',
      style: { width: '100px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          rowData.berAber === 'BER' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {rowData.berAber}
        </span>
      )
    },
    {
      field: 'occOfRendering',
      header: 'OCC of Rendering',
      style: { width: '120px' }
    },
    {
      field: 'conditionOfHull',
      header: 'Condition of Hull',
      style: { width: '120px' }
    },
    {
      field: 'conditionOfDavitLifting',
      header: 'Condition of Davit Lifting',
      style: { width: '150px' }
    },
    {
      field: 'conditionOfFittings',
      header: 'Condition of Fittings',
      style: { width: '130px' }
    },
    {
      field: 'center1',
      header: 'Center 1',
      style: { width: '80px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          rowData.center1 === 'SAT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rowData.center1}
        </span>
      )
    },
    {
      field: 'stbd',
      header: 'STBD',
      style: { width: '80px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          rowData.stbd === 'SAT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rowData.stbd}
        </span>
      )
    },
    {
      field: 'port',
      header: 'Port',
      style: { width: '80px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          rowData.port === 'SAT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rowData.port}
        </span>
      )
    },
    {
      field: 'auxilliaries',
      header: 'Auxilliaries',
      style: { width: '100px' },
      body: (rowData) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          rowData.auxilliaries === 'SAT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rowData.auxilliaries}
        </span>
      )
    },
    {
      field: 'center2',
      header: 'Center 2',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'stbd2',
      header: 'STBD 2',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'port2',
      header: 'Port 2',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'center3',
      header: 'Center 3',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'stbd3',
      header: 'STBD 3',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'port3',
      header: 'Port 3',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'majorRepairs',
      header: 'Major Repairs',
      style: { width: '120px' }
    },
    {
      field: 'hullYear',
      header: 'Hull Year',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'hullMonth',
      header: 'Hull Month',
      style: { width: '90px' },
      align: 'center'
    },
    {
      field: 'detailsOfCollar',
      header: 'Details of Collar',
      style: { width: '120px' },
      align: 'center'
    },
    {
      field: 'engineYear',
      header: 'Engine Year',
      style: { width: '90px' },
      align: 'center'
    },
    {
      field: 'engineMonth',
      header: 'Engine Month',
      style: { width: '100px' },
      align: 'center'
    },
    {
      field: 'remarks',
      header: 'Remarks',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'icYear',
      header: 'IC Year',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'icMonth',
      header: 'IC Month',
      style: { width: '80px' },
      align: 'center'
    },
    {
      field: 'actions',
      header: 'Action',
      style: { width: '80px' },
      body: (rowData) => (
        <button
          onClick={() => handleDownload(rowData)}
          className="text-blue-600 hover:text-blue-800 p-1"
          title="Download Data"
        >
          <Download size={14} />
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
              <h5 className="text-2xl font-semibold">BOAT HISTORY SHEET</h5>
            </div>
            
            <div className="p-6">
              <ReusableTable
                data={tableData}
                columns={columns}
                title="BOAT HISTORY SHEET"
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

export default BHSReport;
