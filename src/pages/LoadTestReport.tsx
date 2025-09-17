import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDownload = (id) => {
    console.log('Downloading data for ID:', id);
    // Add download functionality here
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  const TableHeader = ({ children, className = "", sortable = false, column = "" }) => (
    <th 
      className={`bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center ${className} ${sortable ? 'cursor-pointer hover:bg-blue-700' : ''}`}
      onClick={sortable ? () => handleSort(column) : undefined}
    >
      {children}
      {sortable && (
        <span className="ml-1">
          {sortColumn === column ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
        </span>
      )}
    </th>
  );

  const TableCell = ({ children, className = "" }) => (
    <td className={`p-3 border border-gray-300 text-sm ${className}`}>
      {children}
    </td>
  );

  return (
    <div className="min-h-screen bg-gray-50">
         <div className="max-w-full mx-auto">
          {/* Report Section */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
              <h5 className="text-2xl font-semibold">FORMAT FOR LIST OF EQUIPMENTS / ITEM LOAD TESTED I.A.W INBR 1552</h5>
            </div>
            
            <div className="p-6">
              {/* Search and Filter Controls */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="entries-per-page" className="text-sm font-medium text-gray-700">
                    Show
                  </label>
                  <select
                    id="entries-per-page"
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={-1}>All</option>
                  </select>
                  <span className="text-sm text-gray-700">entries per page</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="search" className="text-sm font-medium text-gray-700">
                    Search:
                  </label>
                  <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="px-3 py-1 border border-gray-300 rounded text-sm w-64"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr>
                      <TableHeader sortable={true} column="id">Sr No.</TableHeader>
                      <TableHeader sortable={true} column="equipmentName">Equipment Name</TableHeader>
                      <TableHeader sortable={true} column="shipName">Ship Name</TableHeader>
                      <TableHeader sortable={true} column="pattNo">PATT No</TableHeader>
                      <TableHeader sortable={true} column="location">Location</TableHeader>
                      <TableHeader sortable={true} column="mfgDate">MFG Date</TableHeader>
                      <TableHeader sortable={true} column="installationDate">Installation Date</TableHeader>
                      <TableHeader sortable={true} column="eqptStatus">EQPT Status</TableHeader>
                      <TableHeader sortable={true} column="testLoad">Test Load</TableHeader>
                      <TableHeader sortable={true} column="loadTestedDate">Load Tested Date</TableHeader>
                      <TableHeader sortable={true} column="loadTestedDueDate">Load Tested Due Date</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium bg-gray-50">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell>{item.equipmentName}</TableCell>
                        <TableCell>{item.shipName}</TableCell>
                        <TableCell>{item.pattNo}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.mfgDate}</TableCell>
                        <TableCell>{item.installationDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.eqptStatus === 'OPS' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.eqptStatus}
                          </span>
                        </TableCell>
                        <TableCell>{item.testLoad}</TableCell>
                        <TableCell>{item.loadTestedDate}</TableCell>
                        <TableCell>{item.loadTestedDueDate}</TableCell>
                        <TableCell className="text-center">
                          <button
                            onClick={() => handleDownload(item.id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Download Data"
                          >
                            <Download size={16} />
                          </button>
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      ««
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      «
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, currentPage - 2) + i;
                      if (pageNum > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm border rounded ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      »
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      »»
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoadTestReport;
