import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('srNo');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDownload = (id) => {
    console.log('Downloading Ship Staff Report of Hull Inspection data for ID:', id);
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
          <div className="bg-[#0072a6] text-white px-6 py-4 rounded-t-lg">
            <h5 className="text-xl font-semibold">SHIP STAFF REPORT OF HULL INSPECTION</h5>
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
                    <TableHeader sortable={true} column="srNo">Sr No.</TableHeader>
                    <TableHeader sortable={true} column="ins">INS</TableHeader>
                    <TableHeader sortable={true} column="quarterEnding">Quarter Ending</TableHeader>
                    <TableHeader>Action</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <TableCell className="text-center font-medium bg-gray-50">
                        {item.srNo}
                      </TableCell>
                      <TableCell>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.ins}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.quarterEnding}
                        </span>
                      </TableCell>
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

export default ShipStaffReportHullInspection;
