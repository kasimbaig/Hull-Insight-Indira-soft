import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { DataTable, Column } from "@/components/ui/table";
import { DynamicFormDialog } from "@/components/DynamicFormDialog";
import { get, post, put, del } from "@/lib/api";

interface Vessel {
  id: number;
  name: string;
  code: string;
  active: number;
}

interface Compartment {
  id: number;
  name: string;
  code: string;
  active: number;
}

interface Cluster {
  id: number;
  name: string;
  code: string;
  vessel_name?: string;
  compartment_name?: string;
  project_name?: string;
  vessel?: number;
  compartment?: number;
  active: number; // 1 = Active, 2 = Inactive
  created_on: string;
}

const ClusterMaster = () => {
  const { toast } = useToast();
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [compartments, setCompartments] = useState<Compartment[]>([]);
  const [isLoadingVessels, setIsLoadingVessels] = useState(false);
  const [isLoadingCompartments, setIsLoadingCompartments] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCluster, setEditingCluster] = useState<Cluster | null>(null);

  // Pagination is now handled by DataTable

  // Table columns
  const columns: Column<Cluster>[] = [
    { header: "Name", accessor: "name" },
    { header: "Code", accessor: "code" },
    { header: "Vessel", accessor: "vessel_name" },
    { header: "Compartment", accessor: "compartment_name" },
    { header: "Project", accessor: "project_name" },
    {
      header: "Status",
      accessor: "active",
      render: (row) => (
        <Badge variant={row.active === 1 ? "default" : "secondary"}>
          {row.active === 1 ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    // { header: "Created Date", accessor: "created_on"     },
    { header: "Actions", accessor: "actions" },
  ];

  // Fetch vessels from API
  const fetchVessels = async () => {
    setIsLoadingVessels(true);
    try {
      const res = await get(`/master/vessels/`);
      const vesselsData = res.results || res.data || [];
      setVessels(vesselsData);
    } catch (err) {
      console.error("Failed to fetch vessels", err);
      toast({
        title: "Error",
        description: "Failed to fetch vessels",
        variant: "destructive",
      });
      setVessels([]);
    } finally {
      setIsLoadingVessels(false);
    }
  };

  // Fetch compartments from API
  const fetchCompartments = async () => {
    setIsLoadingCompartments(true);
    try {
      const res = await get(`/master/compartments/`);
      const compartmentsData = res.results || res.data || [];
      setCompartments(compartmentsData);
    } catch (err) {
      console.error("Failed to fetch compartments", err);
      toast({
        title: "Error",
        description: "Failed to fetch compartments",
        variant: "destructive",
      });
      setCompartments([]);
    } finally {
      setIsLoadingCompartments(false);
    }
  };

  // Fetch clusters from API
  const fetchClusters = async () => {
    try {
      const res = await get(`/master/clusters/`);
      setClusters(res.results || res.data || []);
    } catch (err) {
      console.error("Failed to fetch clusters", err);
      toast({
        title: "Error",
        description: "Failed to fetch clusters",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchVessels();
    fetchCompartments();
    fetchClusters();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Cluster name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.vessel) {
      toast({
        title: "Validation Error",
        description: "Vessel selection is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.compartment) {
      toast({
        title: "Validation Error",
        description: "Compartment selection is required",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: formData.name,
      code: formData.code,
      vessel: parseInt(formData.vessel),
      compartment: parseInt(formData.compartment),
      project_name: formData.project_name,
      active: formData.status === "Active" ? 1 : 2,
    };

    try {
      if (editingCluster) {
        // UPDATE - using POST with ID in payload
        const updatePayload = { ...payload, id: editingCluster.id };
        await post(`/master/clusters/`, updatePayload);
        toast({ title: "Success", description: "Cluster updated successfully" });
      } else {
        // CREATE
        await post(`/master/clusters/`, payload);
        toast({ title: "Success", description: "Cluster created successfully" });
      }

      fetchClusters(); // refresh table
      setIsDialogOpen(false);
      setEditingCluster(null);
    } catch (err) {
      console.error("Failed to save cluster", err);
      toast({
        title: "Error",
        description: "Failed to save cluster",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (cluster: Cluster) => {
    setEditingCluster(cluster);
    setIsDialogOpen(true);
  };

  // Delete API
  const handleDelete = async (cluster: Cluster) => {
    try {
      const payload = { id: cluster.id, delete: true };
      await post(`/master/clusters/`, payload);
      setClusters((prev) => prev.filter((c) => c.id !== cluster.id));
      toast({
        title: "Success",
        description: "Cluster deleted successfully",
      });
    } catch (err) {
      console.error("Delete failed", err);
      toast({
        title: "Error",
        description: "Failed to delete cluster",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredClusters = clusters.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.vessel_name && c.vessel_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.compartment_name && c.compartment_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.project_name && c.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Cluster</h1>
          <p className="text-muted-foreground">
            Manage vessel clusters and groupings
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingCluster ? "Edit Cluster" : "Add Cluster"}
          description="Fill out the details below"
          fields={[
            { name: "name", label: "Cluster Name", type: "text", required: true },
            { name: "code", label: "Cluster Code", type: "text" },
            {
              name: "vessel",
              label: "Vessel",
              type: "dropdown",
              required: true,
              options: (() => {
                if (isLoadingVessels) {
                  return [{ value: "loading", label: "Loading vessels..." }];
                }
                if (vessels.length === 0) {
                  return [{ value: "no-vessels", label: "No vessels available" }];
                }
                return vessels.map(vessel => ({ 
                  value: vessel.id, 
                  label: vessel.name 
                }));
              })(),
            },
            {
              name: "compartment",
              label: "Compartment",
              type: "dropdown",
              required: true,
              options: (() => {
                if (isLoadingCompartments) {
                  return [{ value: "loading", label: "Loading compartments..." }];
                }
                if (compartments.length === 0) {
                  return [{ value: "no-compartments", label: "No compartments available" }];
                }
                return compartments.map(compartment => ({ 
                  value: compartment.id, 
                  label: compartment.name 
                }));
              })(),
            },
            { name: "project_name", label: "Project Name", type: "text" },
            {
              name: "status",
              label: "Active",
              type: "checkbox",
              required: false,
            },
          ]}
          onSubmit={handleSave}
          initialValues={
            editingCluster
              ? {
                  name: editingCluster.name,
                  code: editingCluster.code,
                  vessel: editingCluster.vessel || "",
                  compartment: editingCluster.compartment || "",
                  project_name: editingCluster.project_name || "",
                  status: editingCluster.active === 1 ? "Active" : "Inactive",
                }
              : {
                  status: "Active" // Default to Active when adding new cluster
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingCluster(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Cluster
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
              placeholder="Search clusters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clusters Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clusters</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredClusters}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deleteMessage="Are you sure you want to delete this cluster? This action cannot be undone."
            deleteTitle="Delete Cluster"
            rowsPerPage={10}
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default ClusterMaster;
