import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable, Column } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DynamicFormDialog } from "@/components/DynamicFormDialog";
import { get, post, put, del } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface Severity {
  id: number;
  name: string;
  code?: string;
  active: number; // 1 = Active, 2 = Inactive
  created_by?: string;
  created_on?: string;
}

const SeverityMaster = () => {
  const { toast } = useToast();
  const [severities, setSeverities] = useState<Severity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSeverity, setEditingSeverity] = useState<Severity | null>(null);

  const columns: Column<Severity>[] = [
    { header: "Severity Name", accessor: "name" },
    { header: "Code", accessor: "code" },
    {
      header: "Status",
      accessor: "active",
      render: (row) => (
        <Badge variant={row.active === 1 ? "default" : "secondary"}>
          {row.active === 1 ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    { header: "Actions", accessor: "actions" },
  ];

  // Fetch severities from API
  const fetchSeverities = async () => {
    try {
      const res = await get(`/master/severities/`);
      setSeverities(res.results || res.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch severities",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSeverities();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Severity name is required",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: formData.name,
      code: formData.code,
      active: formData.status === "Active" ? 1 : 2,
    };

    try {
      if (editingSeverity) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingSeverity.id };
        await post(`/master/severities/`, updatePayload);
        toast({ title: "Success", description: "Severity updated successfully" });
      } else {
        // CREATE
        await post(`/master/severities/`, payload);
        toast({ title: "Success", description: "Severity created successfully" });
      }

      fetchSeverities();
      setIsDialogOpen(false);
      setEditingSeverity(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save severity",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (severity: Severity) => {
    setEditingSeverity(severity);
    setIsDialogOpen(true);
  };

  // Delete API
  const handleDelete = async (severity: Severity) => {
    try {
      const payload = { id: severity.id, delete: true };
      await post(`/master/severities/`, payload);
      setSeverities((prev) => prev.filter((s) => s.id !== severity.id));
      toast({
        title: "Success",
        description: "Severity deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete severity",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredSeverities = severities.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Severity Master</h1>
          <p className="text-muted-foreground">
            Manage severity types
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingSeverity ? "Edit Severity" : "Add Severity"}
          description="Fill out the details below"
          fields={[
            { name: "name", label: "Severity Name", type: "text", required: true },
            { name: "code", label: "Severity Code", type: "text" },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingSeverity
              ? {
                  name: editingSeverity.name,
                  code: editingSeverity.code,
                  status: editingSeverity.active === 1 ? "Active" : "Inactive",
                }
              : {
                  status: "Active" // Default to Active when adding new severity
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingSeverity(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Severity
            </Button>
          }
        />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search severities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Severities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Severities</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredSeverities}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={10}
            deleteMessage="Are you sure you want to delete this severity? This action cannot be undone."
            deleteTitle="Delete Severity"
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default SeverityMaster;