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

interface System {
  id: number;
  name: string;
  code?: string;
  active: number; // 1 = Active, 2 = Inactive
  created_by?: string;
  created_on?: string;
}

const SystemMaster = () => {
  const { toast } = useToast();
  const [systems, setSystems] = useState<System[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<System | null>(null);

  const columns: Column<System>[] = [
    { header: "System Name", accessor: "name" },
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

  // Fetch systems from API
  const fetchSystems = async () => {
    try {
      const res = await get(`/master/systems/`);
      setSystems(res.results || res.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch systems",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSystems();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "System name is required",
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
      if (editingSystem) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingSystem.id };
        await post(`/master/systems/`, updatePayload);
        toast({ title: "Success", description: "System updated successfully" });
      } else {
        // CREATE
        await post(`/master/systems/`, payload);
        toast({ title: "Success", description: "System created successfully" });
      }

      fetchSystems();
      setIsDialogOpen(false);
      setEditingSystem(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save system",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (system: System) => {
    setEditingSystem(system);
    setIsDialogOpen(true);
  };

  // Delete API
  const handleDelete = async (system: System) => {
    try {
      const payload = { id: system.id, delete: true };
      await post(`/master/systems/`, payload);
      setSystems((prev) => prev.filter((s) => s.id !== system.id));
      toast({
        title: "Success",
        description: "System deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete system",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredSystems = systems.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Master</h1>
          <p className="text-muted-foreground">
            Manage systems
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingSystem ? "Edit System" : "Add System"}
          description="Fill out the details below"
          fields={[
            { name: "name", label: "System Name", type: "text", required: true },
            { name: "code", label: "System Code", type: "text" },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingSystem
              ? {
                  name: editingSystem.name,
                  code: editingSystem.code,
                  status: editingSystem.active === 1 ? "Active" : "Inactive",
                }
              : {
                  status: "Active" // Default to Active when adding new system
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingSystem(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add System
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
              placeholder="Search systems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Systems Table */}
      <Card>
        <CardHeader>
          <CardTitle>Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredSystems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={10}
            deleteMessage="Are you sure you want to delete this system? This action cannot be undone."
            deleteTitle="Delete System"
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default SystemMaster;