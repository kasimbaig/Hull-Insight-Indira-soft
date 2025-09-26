import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DynamicFormDialog } from "@/components/DynamicFormDialog";
import { get, post, put, del } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/table";

interface Unit {
  id: number;
  name: string;
  code?: string;
  active: number; // 1 = Active, 2 = Inactive
  createdBy: string;
  created_on: string;
}

const UnitMaster = () => {
  const { toast } = useToast();
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  // Columns for DataTable
  const columns: Column<Unit>[] = [
    { header: "Unit Name", accessor: "name" },
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

  // Fetch units from API
  const fetchUnits = async () => {
    try {
      const res = await get(`/master/units/`);
      setUnits(res.results || res.data || []);
    } catch (err) {     
      console.error("Failed to fetch units", err);
      toast({
        title: "Error",
        description: "Failed to fetch units",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Unit name is required",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: formData.name,
      code: formData.code,
      active: formData.status ? 1 : 2,
    };

    try {
      if (editingUnit) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingUnit.id };
        await post(`/master/units/`, updatePayload);
        toast({ title: "Success", description: "Unit updated successfully" });
      } else {
        // CREATE
        await post(`/master/units/`, payload);
        toast({ title: "Success", description: "Unit created successfully" });
      }

      fetchUnits(); // refresh table
      setIsDialogOpen(false);
      setEditingUnit(null);
    } catch (err) {
      console.error("Failed to save unit", err);
      toast({
        title: "Error",
        description: "Failed to save unit",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit);
    setIsDialogOpen(true);
  };


  // Delete API - Updated for DataTable
  const handleDelete = async (unit: Unit) => {
    try {
      const payload = { id: unit.id, delete: true };
      await post(`/master/units/`, payload);
      setUnits((prev) => prev.filter((u) => u.id !== unit.id));
      toast({
        title: "Success",
        description: "Unit deleted successfully",
      });
    } catch (err) {
      console.error("Delete failed", err);
      toast({
        title: "Error",
        description: "Failed to delete unit",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredUnits = units.filter((unit) =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Unit Master</h1>
          <p className="text-muted-foreground">
            Manage organizational units and commands
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingUnit ? "Edit Unit" : "Add Unit"}
          description="Fill out the details below"
          fields={[
            { 
              name: "name", 
              label: "Unit Name", 
              type: "text", 
              required: true,
              placeholder: "Enter unit name"
            },
            { 
              name: "code", 
              label: "Unit Code", 
              type: "text",
              placeholder: "Enter unit code"
            },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingUnit
              ? {
                  name: editingUnit.name,
                  code: editingUnit.code,
                  status: editingUnit.active === 1,
                }
              : {
                  status: true // Default to Active (checked) when adding new unit
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingUnit(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
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
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Units Table */}
      <Card>
        <CardHeader>
          <CardTitle>Units</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredUnits}
            onEdit={handleEdit}
            onDelete={handleDelete}
            rowsPerPage={10}
            deleteMessage="Are you sure you want to delete this unit? This action cannot be undone."
            deleteTitle="Delete Unit"
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default UnitMaster;