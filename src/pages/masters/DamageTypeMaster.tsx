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

interface DamageType {
  id: number;
  name: string;
  code?: string;
  active: number; // 1 = Active, 2 = Inactive
  created_by?: string;
  created_on?: string;
}

const DamageTypeMaster = () => {
  const { toast } = useToast();
  const [damageTypes, setDamageTypes] = useState<DamageType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDamageType, setEditingDamageType] = useState<DamageType | null>(null);

  const columns: Column<DamageType>[] = [
    { header: "Damage Type Name", accessor: "name" },
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

  // Fetch damage types from API
  const fetchDamageTypes = async () => {
    try {
      const res = await get(`/master/damagetypes/`);
      setDamageTypes(res.results || res.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch damage types",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDamageTypes();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Damage Type name is required",
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
      if (editingDamageType) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingDamageType.id };
        await post(`/master/damagetypes/`, updatePayload);
        toast({ title: "Success", description: "Damage Type updated successfully" });
      } else {
        // CREATE
        await post(`/master/damagetypes/`, payload);
        toast({ title: "Success", description: "Damage Type created successfully" });
      }

      fetchDamageTypes();
      setIsDialogOpen(false);
      setEditingDamageType(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save damage type",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (damageType: DamageType) => {
    setEditingDamageType(damageType);
    setIsDialogOpen(true);
  };

  // Delete API
  const handleDelete = async (damageType: DamageType) => {
    try {
      const payload = { id: damageType.id, delete: true };
      await post(`/master/damagetypes/`, payload);
      setDamageTypes((prev) => prev.filter((dt) => dt.id !== damageType.id));
      toast({
        title: "Success",
        description: "Damage Type deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete damage type",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredDamageTypes = damageTypes.filter((dt) =>
    dt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Damage Type Master</h1>
          <p className="text-muted-foreground">
            Manage damage types
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingDamageType ? "Edit Damage Type" : "Add Damage Type"}
          description="Fill out the details below"
          fields={[
            { name: "name", label: "Damage Type Name", type: "text", required: true },
            { name: "code", label: "Damage Type Code", type: "text" },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingDamageType
              ? {
                  name: editingDamageType.name,
                  code: editingDamageType.code,
                  status: editingDamageType.active === 1 ? "Active" : "Inactive",
                }
              : {
                  status: "Active" // Default to Active when adding new damage type
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingDamageType(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Damage Type
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
              placeholder="Search damage types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Damage Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>Damage Types</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredDamageTypes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={10}
            deleteMessage="Are you sure you want to delete this damage type? This action cannot be undone."
            deleteTitle="Delete Damage Type"
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default DamageTypeMaster;