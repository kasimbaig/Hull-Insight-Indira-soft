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

interface Equipment {
  id: number;
  name: string;
  code?: string;
  active: number; // 1 = Active, 2 = Inactive
  createdBy: string;
  created_on: string;
}

const EquipmentMaster = () => {
  const { toast } = useToast();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  const columns: Column<Equipment>[] = [
    { header: "Equipment Name", accessor: "name" },
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

  // Fetch equipments from API
  const fetchEquipments = async () => {
    try {
      const res = await get(`/master/equipments/`);
      setEquipments(res.results || res.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch equipments",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Equipment name is required",
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
      if (editingEquipment) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingEquipment.id };
        await post(`/master/equipments/`, updatePayload);
        toast({ title: "Success", description: "Equipment updated successfully" });
      } else {
        // CREATE
        await post(`/master/equipments/`, payload);
        toast({ title: "Success", description: "Equipment created successfully" });
      }

      fetchEquipments();
      setIsDialogOpen(false);
      setEditingEquipment(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save equipment",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setIsDialogOpen(true);
  };

  // Delete API
  const handleDelete = async (equipment: Equipment) => {
    try {
      const payload = { id: equipment.id, delete: true };
      await post(`/master/equipments/`, payload);
      setEquipments((prev) => prev.filter((e) => e.id !== equipment.id));
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete equipment",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredEquipments = equipments.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Equipment Master</h1>
          <p className="text-muted-foreground">
            Manage equipment and assets
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingEquipment ? "Edit Equipment" : "Add Equipment"}
          description="Fill out the details below"
          fields={[
            { name: "name", label: "Equipment Name", type: "text", required: true },
            { name: "code", label: "Equipment Code", type: "text" },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingEquipment
              ? {
                  name: editingEquipment.name,
                  code: editingEquipment.code,
                  status: editingEquipment.active === 1 ? "Active" : "Inactive",
                }
              : {
                  status: "Active" // Default to Active when adding new equipment
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingEquipment(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
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
              placeholder="Search equipments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Equipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Equipments</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredEquipments}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={10}
            deleteMessage="Are you sure you want to delete this equipment? This action cannot be undone."
            deleteTitle="Delete Equipment"
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default EquipmentMaster;