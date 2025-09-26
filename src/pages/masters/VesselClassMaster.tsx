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

interface VesselClass {
  id: number;
  name: string;
  code?: string;
  active: number; // 1 = Active, 2 = Inactive
  createdBy: string;
  created_on: string;
}

const VesselClassMaster = () => {
  const { toast } = useToast();
  const [vesselClasses, setVesselClasses] = useState<VesselClass[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVesselClass, setEditingVesselClass] = useState<VesselClass | null>(null);

  const columns: Column<VesselClass>[] = [
    { header: "Vessel Class Name", accessor: "name" },
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

  // Fetch vessel classes from API
  const fetchVesselClasses = async () => {
    try {
      const res = await get(`/master/classofvessels/`);
      setVesselClasses(res.results || res.data || []);
    } catch (err) {     
      console.error("Failed to fetch vessel classes", err);
      toast({
        title: "Error",
        description: "Failed to fetch vessel classes",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchVesselClasses();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Vessel class name is required",
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
      if (editingVesselClass) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingVesselClass.id };
        await post(`/master/classofvessels/`, updatePayload);
        toast({ title: "Success", description: "Vessel class updated successfully" });
      } else {
        // CREATE
        await post(`/master/classofvessels/`, payload);
        toast({ title: "Success", description: "Vessel class created successfully" });
      }

      fetchVesselClasses(); // refresh table
      setIsDialogOpen(false);
      setEditingVesselClass(null);
    } catch (err) {
      console.error("Failed to save vessel class", err);
      toast({
        title: "Error",
        description: "Failed to save vessel class",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (vesselClass: VesselClass) => {
    setEditingVesselClass(vesselClass);
    setIsDialogOpen(true);
  };


  // Delete API
  const handleDelete = async (vesselClass: VesselClass) => {
    try {
      const payload = { id: vesselClass.id, delete: true };
      await post(`/master/classofvessels/`, payload);
      setVesselClasses((prev) => prev.filter((vc) => vc.id !== vesselClass.id));
      toast({
        title: "Success",
        description: "Vessel class deleted successfully",
      });
    } catch (err) {
      console.error("Delete failed", err);
      toast({
        title: "Error",
        description: "Failed to delete vessel class",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredVesselClasses = vesselClasses.filter((vesselClass) =>
    vesselClass.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Vessel Class Master</h1>
          <p className="text-muted-foreground">
            Manage vessel classes and types
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingVesselClass ? "Edit Vessel Class" : "Add Vessel Class"}
          description="Fill out the details below"
          fields={[
            { name: "name", label: "Vessel Class Name", type: "text", required: true },
            { name: "code", label: "Vessel Class Code", type: "text" },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingVesselClass
              ? {
                  name: editingVesselClass.name,
                  code: editingVesselClass.code,
                  status: editingVesselClass.active === 1 ? "Active" : "Inactive",
                }
              : {
                  status: "Active" // Default to Active when adding new vessel class
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingVesselClass(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Vessel Class
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
              placeholder="Search vessel classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vessel Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vessel Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredVesselClasses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={10}
            deleteMessage="Are you sure you want to delete this vessel class? This action cannot be undone."
            deleteTitle="Delete Vessel Class"
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}

    </div>
  );
};

export default VesselClassMaster;
