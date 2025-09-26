import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataTable, Column, TablePagination } from "@/components/ui/table";
import { get, post, del } from "@/lib/api";

interface PreliminaryInspectionRecord {
  id: number;
  vessel: {
    id: number;
    name: string;
    classofvessel: {
      id: number;
      name: string;
    };
    vesseltype: {
      id: number;
      name: string;
    };
    yard: {
      id: number;
      name: string;
    };
    command: {
      id: number;
      name: string;
    };
  };
  dt_inspection: string;
  draft_status: string;
  auth_inspection: string;
  docking_version: string;
  nature_of_docking: string;
  no_of_dock_blocks_wedged: number;
  no_of_dock_blocks_crushed: number;
  uw_openings_clear: boolean;
  duration_of_docking: string;
  extent_of_survey: string;
  created_on: string;
  created_by: number;
  modified_on?: string;
  modified_by?: number;
}

const PreliminaryUnderwaterHullInspectionReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [records, setRecords] = useState<PreliminaryInspectionRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRecord, setEditingRecord] = useState<PreliminaryInspectionRecord | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("draft");

  // Fetch records from API based on active tab
  const fetchRecords = async (pageNum: number = 1, tab: string = activeTab) => {
    setLoading(true);
    try {
      let apiUrl = `/hitumodule/preliminary-underwater-hull-inspection-reports/`;
      
      // Add query parameter based on active tab
      switch (tab) {
        case "draft":
          apiUrl += `?draft_status=draft`;
          break;
        case "work-in-progress":
          apiUrl += `?draft_status=work-in-progress`;
          break;
        case "approved":
          apiUrl += `?draft_status=approved`;
          break;
        default:
          apiUrl += `?draft_status=draft`;
      }
      
      // Add pagination parameter
      apiUrl += `&page=${pageNum}`;
      
      const res = await get(apiUrl);
      const recordsData = res.data || res.results || [];
      
      // Debug: Log all unique status values
      const uniqueStatuses = [...new Set(recordsData.map((record: PreliminaryInspectionRecord) => record.draft_status))];
      console.log('Unique status values from API:', uniqueStatuses);
      
      setRecords(recordsData);
      setTotalPages(Math.ceil((res.count || recordsData.length) / 10));
    } catch (err) {
      console.error('Error fetching records:', err);
      toast({ title: "Error", description: "Failed to fetch inspection records", variant: "destructive" });
      setRecords([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch records when page changes
  useEffect(() => {
    fetchRecords(page, activeTab);
  }, [page]);

  // Fetch records when tab changes
  useEffect(() => {
    setPage(1); // Reset to first page when tab changes
    fetchRecords(1, activeTab);
  }, [activeTab]);

  const handleAdd = () => {
    navigate('/app/reports/preliminary-underwater-hull-inspection-report-add');
  };

  const handleEdit = (record: PreliminaryInspectionRecord) => {
    navigate('/app/reports/preliminary-underwater-hull-inspection-report', { 
      state: { record, mode: 'edit' } 
    });
  };

  const handleView = (record: PreliminaryInspectionRecord) => {
    navigate('/app/reports/preliminary-underwater-hull-inspection-report', { 
      state: { record, mode: 'view' } 
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await del(`/preliminary-underwater-hull-inspection/${id}/`);
        toast({ title: "Success", description: "Record deleted successfully" });
        fetchRecords(page, activeTab);
      } catch (err) {
        toast({ title: "Error", description: "Failed to delete record", variant: "destructive" });
      }
    }
  };

  // Table columns
  const columns: Column<PreliminaryInspectionRecord>[] = [
    { 
      header: "Ship", 
      accessor: "vessel",
      render: (row) => row.vessel?.name || "-"
    },
    { 
      header: "Date of Inspection", 
      accessor: "dt_inspection",
      render: (row) => new Date(row.dt_inspection).toLocaleDateString()
    },
    { 
      header: "Status", 
      accessor: "draft_status",
      render: (row) => (
        <Badge 
          variant={
            row.draft_status === "approved" ? "default" : 
            row.draft_status === "work-in-progress" ? "secondary" : 
            "outline"
          }
        >
          {row.draft_status?.charAt(0).toUpperCase() + row.draft_status?.slice(1) || "Draft"}
        </Badge>
      )
    },
    {
      header: "Action",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => handleEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleDelete(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Filter records based on search term (client-side filtering as backup)
  const getFilteredRecords = () => {
    return records.filter(
      (record) =>
        record.vessel?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.draft_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(record.dt_inspection).toLocaleDateString().includes(searchTerm)
    );
  };

  const filteredRecords = getFilteredRecords();

  // Get counts for each tab (this would ideally come from the API)
  const getTabCounts = () => {
    // Since we're fetching filtered data from API, we can use the current records length
    // or make separate API calls for counts if needed
    return {
      draftCount: activeTab === "draft" ? records.length : 0,
      workInProgressCount: activeTab === "work-in-progress" ? records.length : 0,
      approvedCount: activeTab === "approved" ? records.length : 0
    };
  };

  const { draftCount, workInProgressCount, approvedCount } = getTabCounts();

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchTerm(""); // Clear search when changing tabs
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">PRELIMINARY UNDERWATER HULL INSPECTION - INS</h1>
          <p className="text-muted-foreground">Manage preliminary underwater hull inspection records</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Record
        </Button>
      </div>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full p-2">
            <TabsList className="grid w-full grid-cols-3 border-1 border-black">
              <TabsTrigger value="draft" className='bg-red-200'>
                Draft 
              </TabsTrigger>
              <TabsTrigger value="work-in-progress">
                Work-in-Progress
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="draft" className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search draft records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <DataTable
                data={filteredRecords}
                columns={columns}
                loading={loading}
                pagination={{
                  currentPage: page,
                  totalPages: totalPages,
                  onPageChange: setPage,
                }}
              />
              <TablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </TabsContent>
            
            <TabsContent value="work-in-progress" className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search work-in-progress records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <DataTable
                data={filteredRecords}
                columns={columns}
                loading={loading}
                pagination={{
                  currentPage: page,
                  totalPages: totalPages,
                  onPageChange: setPage,
                }}
              />
              <TablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </TabsContent>
            
            <TabsContent value="approved" className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search approved records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <DataTable
                data={filteredRecords}
                columns={columns}
                loading={loading}
                pagination={{
                  currentPage: page,
                  totalPages: totalPages,
                  onPageChange: setPage,
                }}
              />
              <TablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreliminaryUnderwaterHullInspectionReportPage;