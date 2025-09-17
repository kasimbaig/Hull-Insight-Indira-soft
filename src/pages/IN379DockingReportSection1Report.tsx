import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const IN379DockingReportSection1Report = () => {
  const [tableData, setTableData] = useState([
    // Sample data based on the HTML table structure
    {
      id: 1,
      plannedShort: 'Hull cleaning and inspection',
      emergency: 'Emergency hull repair'
    },
    {
      id: 2,
      plannedShort: 'Propeller maintenance',
      emergency: 'Emergency propulsion system repair'
    },
    {
      id: 3,
      plannedShort: 'Navigation equipment calibration',
      emergency: 'Emergency navigation system failure'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDownload = (id) => {
    console.log('Downloading IN 379 Docking Report Section 1 data for ID:', id);
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
              <h5 className="text-2xl font-semibold">DOCKING REPORT SECTION - I</h5>
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
                      <TableHeader sortable={true} column="plannedShort">Planned Short</TableHeader>
                      <TableHeader sortable={true} column="emergency">Emergency</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <TableCell className="text-center font-medium bg-gray-50">
                            {startIndex + index + 1}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {item.plannedShort}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {item.emergency}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <button
                              onClick={() => handleDownload(item.id)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition-colors"
                              title="Download Data"
                            >
                              <Download size={16} />
                            </button>
                          </TableCell>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <TableCell colSpan="4" className="text-center py-8 text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="text-lg font-medium">No data available in table</span>
                            <span className="text-sm">No records found matching your search criteria</span>
                          </div>
                        </TableCell>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                  Showing {paginatedData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
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

export default IN379DockingReportSection1Report;
