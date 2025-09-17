import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const DockingPlanApprovalReport = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('ser');
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Sample data - replace with actual API call
  const sampleData = [
    {
      ser: 1,
      letter_no: '3453gfhfghf',
      check_ship: 'JAMUNA',
      action: '1'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      item.letter_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.check_ship?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [data, searchTerm, sortColumn, sortDirection]);

  // Pagination
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDownload = (id) => {
    // Simulate download functionality
    console.log('Downloading data for ID:', id);
    // In a real application, this would trigger a download
    alert(`Downloading data for ID: ${id}`);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#c7d9f0] p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-black">DOCKING PLAN APPROVAL</h1>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-300">
          {/* Card Header */}
          <div className="bg-[#0072a6] p-4 rounded-t-lg">
            <h5 className="text-lg font-semibold text-white">DOCKING PLAN APPROVAL</h5>
          </div>

          {/* Card Body */}
          <div className="p-4">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label htmlFor="entries-select" className="text-sm text-gray-600">
                  Show
                </label>
                <select
                  id="entries-select"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-400 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={-1}>All</option>
                </select>
                <span className="text-sm text-gray-600">entries per page</span>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="search-input" className="text-sm text-gray-600">
                  Search:
                </label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder=""
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-[#0072a6]">
                    <th 
                      className="border border-gray-300 px-3 py-2 text-left font-semibold text-white cursor-pointer hover:bg-blue-700"
                      onClick={() => handleSort('ser')}
                    >
                      Sr No. {getSortIcon('ser')}
                    </th>
                    <th 
                      className="border border-gray-300 px-3 py-2 text-left font-semibold text-white cursor-pointer hover:bg-blue-700"
                      onClick={() => handleSort('letter_no')}
                    >
                      Letter No. {getSortIcon('letter_no')}
                    </th>
                    <th 
                      className="border border-gray-300 px-3 py-2 text-left font-semibold text-white cursor-pointer hover:bg-blue-700"
                      onClick={() => handleSort('check_ship')}
                    >
                      INS {getSortIcon('check_ship')}
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="border border-gray-300 px-3 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="ml-2">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="border border-gray-300 px-3 py-8 text-center text-gray-600 bg-gray-50">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item, index) => (
                      <tr key={item.ser} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">
                          {startIndex + index + 1}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {item.letter_no}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          {item.check_ship}
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <button
                            onClick={() => handleDownload(item.action)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Download Data"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Info and Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 border border-gray-400 rounded text-sm ${
                          currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronsRight className="w-4 h-4" />
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

export default DockingPlanApprovalReport;
