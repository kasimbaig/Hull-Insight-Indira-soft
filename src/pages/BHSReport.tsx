import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDownload = (id) => {
    console.log('Downloading BHS data for ID:', id);
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
      className={`bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center ${className} ${sortable ? 'cursor-pointer hover:bg-blue-700' : ''}`}
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
    <td className={`p-2 border border-gray-300 text-xs ${className}`}>
      {children}
    </td>
  );

  const getStatusBadge = (status) => {
    if (status === 'SAT') {
      return <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">SAT</span>;
    } else if (status === 'UNSAT') {
      return <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">UNSAT</span>;
    }
    return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto">
          {/* Report Section */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
              <h5 className="text-2xl font-semibold">BOAT HISTORY SHEET</h5>
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
                <table className="w-full border border-gray-300 text-xs">
                  <thead>
                    <tr>
                      <TableHeader sortable={true} column="id">Sr No.</TableHeader>
                      <TableHeader sortable={true} column="registrationNo">Registration No.</TableHeader>
                      <TableHeader sortable={true} column="yearOfRendering">Year of Rendering</TableHeader>
                      <TableHeader sortable={true} column="berAber">BER/ ABER</TableHeader>
                      <TableHeader sortable={true} column="occOfRendering">OCC of Rendering</TableHeader>
                      <TableHeader sortable={true} column="conditionOfHull">Condition of Hull</TableHeader>
                      <TableHeader sortable={true} column="conditionOfDavitLifting">Condition of Davit Lifting</TableHeader>
                      <TableHeader sortable={true} column="conditionOfFittings">Condition of Fittings</TableHeader>
                      <TableHeader sortable={true} column="center1">Center 1</TableHeader>
                      <TableHeader sortable={true} column="stbd">STBD</TableHeader>
                      <TableHeader sortable={true} column="port">Port</TableHeader>
                      <TableHeader sortable={true} column="auxilliaries">Auxilliaries</TableHeader>
                      <TableHeader sortable={true} column="center2">Center 2</TableHeader>
                      <TableHeader sortable={true} column="stbd2">STBD 2</TableHeader>
                      <TableHeader sortable={true} column="port2">Port 2</TableHeader>
                      <TableHeader sortable={true} column="center3">Center 3</TableHeader>
                      <TableHeader sortable={true} column="stbd3">STBD 3</TableHeader>
                      <TableHeader sortable={true} column="port3">Port 3</TableHeader>
                      <TableHeader sortable={true} column="majorRepairs">Major Repairs</TableHeader>
                      <TableHeader sortable={true} column="hullYear">Hull Year</TableHeader>
                      <TableHeader sortable={true} column="hullMonth">Hull Month</TableHeader>
                      <TableHeader sortable={true} column="detailsOfCollar">Details of Collar</TableHeader>
                      <TableHeader sortable={true} column="engineYear">Engine Year</TableHeader>
                      <TableHeader sortable={true} column="engineMonth">Engine Month</TableHeader>
                      <TableHeader sortable={true} column="remarks">Remarks</TableHeader>
                      <TableHeader sortable={true} column="icYear">IC Year</TableHeader>
                      <TableHeader sortable={true} column="icMonth">IC Month</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium bg-gray-50">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell>{item.registrationNo}</TableCell>
                        <TableCell className="text-center">{item.yearOfRendering}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.berAber === 'BER' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.berAber}
                          </span>
                        </TableCell>
                        <TableCell>{item.occOfRendering}</TableCell>
                        <TableCell>{item.conditionOfHull}</TableCell>
                        <TableCell>{item.conditionOfDavitLifting}</TableCell>
                        <TableCell>{item.conditionOfFittings}</TableCell>
                        <TableCell>{getStatusBadge(item.center1)}</TableCell>
                        <TableCell>{getStatusBadge(item.stbd)}</TableCell>
                        <TableCell>{getStatusBadge(item.port)}</TableCell>
                        <TableCell>{getStatusBadge(item.auxilliaries)}</TableCell>
                        <TableCell className="text-center">{item.center2}</TableCell>
                        <TableCell className="text-center">{item.stbd2}</TableCell>
                        <TableCell className="text-center">{item.port2}</TableCell>
                        <TableCell className="text-center">{item.center3}</TableCell>
                        <TableCell className="text-center">{item.stbd3}</TableCell>
                        <TableCell className="text-center">{item.port3}</TableCell>
                        <TableCell>{item.majorRepairs}</TableCell>
                        <TableCell className="text-center">{item.hullYear}</TableCell>
                        <TableCell>{item.hullMonth}</TableCell>
                        <TableCell className="text-center">{item.detailsOfCollar}</TableCell>
                        <TableCell className="text-center">{item.engineYear}</TableCell>
                        <TableCell>{item.engineMonth}</TableCell>
                        <TableCell className="text-center">{item.remarks}</TableCell>
                        <TableCell className="text-center">{item.icYear}</TableCell>
                        <TableCell>{item.icMonth}</TableCell>
                        <TableCell className="text-center">
                          <button
                            onClick={() => handleDownload(item.id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Download Data"
                          >
                            <Download size={14} />
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

export default BHSReport;
