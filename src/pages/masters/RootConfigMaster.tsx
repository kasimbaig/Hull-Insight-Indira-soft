import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column, TablePagination } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DynamicFormDialog } from "@/components/DynamicFormDialog";
import { get, post, put, del, getUnitId } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface RouteConfig {
  id: number;
  vessel: number;
  sub_module: number;
  level: number;
  route_type: "internal" | "external";
  directorate: number;
  user: number;
  description: string;
  permissions: {
    permission_type: "edit" | "comment";
    is_granted: boolean;
  }[];
  active: number;
  module?: string;
  subModule?: string;
  ship?: string;
  unit?: string;
  userName?: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface Module {
  id: number;
  name: string;
}

interface SubModule {
  id: number;
  name: string;
  module: {
    id: number;
    name: string;
  };
}

interface Vessel {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
}

interface User {
  id: number;
  loginname: string;
}

const RouteConfigMaster = () => {
  const { toast } = useToast();
  const [configs, setConfigs] = useState<RouteConfig[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<RouteConfig | null>(null);

  const [modules, setModules] = useState<DropdownOption[]>([]);
  const [subModules, setSubModules] = useState<DropdownOption[]>([]);
  const [ships, setShips] = useState<DropdownOption[]>([]);
  const [units, setUnits] = useState<DropdownOption[]>([]);
  const [users, setUsers] = useState<DropdownOption[]>([]);
  
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const [subModulesLoading, setSubModulesLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const localUnitId = getUnitId();

  const columns: Column<RouteConfig>[] = [
    { header: "Module", accessor: "module" },
    { header: "Sub Module", accessor: "subModule" },
    { header: "Vessel", accessor: "ship" },
    { header: "Directorate", accessor: "unit" },
    { header: "User", accessor: "userName" },
    { header: "Level", accessor: "level" },
    { header: "Route Type", accessor: "route_type" },
    { header: "Description", accessor: "description" },
    {
      header: "Permissions",
      accessor: "permissions",
      render: (row) => (
        <div>
          {row.permissions?.map((perm, index) => (
            <Badge key={index} variant={perm.is_granted ? "default" : "secondary"} className="mr-1">
              {perm.permission_type}: {perm.is_granted ? "Granted" : "Denied"}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => handleEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchDropdownData = async () => {
    if (dropdownsLoaded) return;
    
    try {
      setDropdownsLoading(true);
      
      const modulesRes = await get(`/master/modules/`);
      let modulesData = [];
      
      if (Array.isArray(modulesRes)) {
        modulesData = modulesRes;
      } else if (modulesRes && Array.isArray(modulesRes.results)) {
        modulesData = modulesRes.results;
      } else if (modulesRes && Array.isArray(modulesRes.data)) {
        modulesData = modulesRes.data;
      }
      
      const modulesOptions = modulesData.map((module: Module) => ({
        value: module.id.toString(),
        label: module.name || `Module ${module.id}`
      }));
      setModules(modulesOptions);

      const vesselsRes = await get(`/master/vessels/`);
      let vesselsData = [];
      
      if (Array.isArray(vesselsRes)) {
        vesselsData = vesselsRes;
      } else if (vesselsRes && Array.isArray(vesselsRes.results)) {
        vesselsData = vesselsRes.results;
      } else if (vesselsRes && Array.isArray(vesselsRes.data)) {
        vesselsData = vesselsRes.data;
      }
      
      const vesselsOptions = vesselsData.map((vessel: Vessel) => ({
        value: vessel.id.toString(),
        label: vessel.name || `Vessel ${vessel.id}`
      }));
      setShips(vesselsOptions);

      const unitsRes = await get(`master/units/`);
      let unitsData = [];
      
      if (Array.isArray(unitsRes)) {
        unitsData = unitsRes;
      } else if (unitsRes && Array.isArray(unitsRes.results)) {
        unitsData = unitsRes.results;
      } else if (unitsRes && Array.isArray(unitsRes.data)) {
        unitsData = unitsRes.data;
      }
      
      const unitsOptions = unitsData.map((unit: Unit) => ({
        value: unit.id.toString(),
        label: unit.name || `Unit ${unit.id}`
      }));
      setUnits(unitsOptions);

      setDropdownsLoaded(true);
      
    } catch (err: any) {
      console.error('Error fetching dropdown data:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch dropdown data",
        variant: "destructive",
      });
    } finally {
      setDropdownsLoading(false);
    }
  };

  const fetchUsersByUnit = async (unitId: string) => {
    if (!unitId) {
      setUsers([]);
      return;
    }

    try {
      const usersRes = await get(`/api/auth/users/?unit_id=${unitId}`);
      let usersData = [];
      
      if (usersRes && usersRes.results && Array.isArray(usersRes.results.data)) {
        usersData = usersRes.results.data;
      } else if (Array.isArray(usersRes)) {
        usersData = usersRes;
      } else if (usersRes && Array.isArray(usersRes.results)) {
        usersData = usersRes.results;
      } else if (usersRes && Array.isArray(usersRes.data)) {
        usersData = usersRes.data;
      }
      
      const usersOptions = usersData.map((user: User) => ({
        value: user.id.toString(),
        label: user.loginname || `User ${user.id}`
      }));
      
      setUsers(usersOptions);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch users",
        variant: "destructive",
      });
      setUsers([]);
    }
  };

  const fetchSubModules = async (moduleId: string) => {
    if (!moduleId) {
      setSubModules([]);
      return;
    }

    try {
      setSubModulesLoading(true);
      const subModulesRes = await get(`/master/submodules/?module_id=${moduleId}`);
      let subModulesData = [];
      
      if (Array.isArray(subModulesRes)) {
        subModulesData = subModulesRes;
      } else if (subModulesRes && Array.isArray(subModulesRes.data)) {
        subModulesData = subModulesRes.data;
      } else if (subModulesRes && Array.isArray(subModulesRes.results)) {
        subModulesData = subModulesRes.results;
      }
      
      const subModulesOptions = subModulesData.map((subModule: SubModule) => ({
        value: subModule.id.toString(),
        label: subModule.name || `Sub Module ${subModule.id}`
      }));
      
      setSubModules(subModulesOptions);
    } catch (err: any) {
      console.error('Error fetching submodules:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch submodules",
        variant: "destructive",
      });
      setSubModules([]);
    } finally {
      setSubModulesLoading(false);
    }
  };

  const fetchConfigs = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const res = await get(`/config/route-configs/?page=${pageNum}`);
      setConfigs(res.results || []);
      setTotalPages(Math.ceil((res.count || 0) / 10));
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to fetch route configs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs(page);
  }, [page]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (isDialogOpen && !dropdownsLoaded) {
      fetchDropdownData();
    }
  }, [isDialogOpen, dropdownsLoaded]);

  useEffect(() => {
    if (selectedModule) {
      fetchSubModules(selectedModule);
    } else {
      setSubModules([]);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (selectedUnit) {
      fetchUsersByUnit(selectedUnit);
    } else {
      setUsers([]);
    }
  }, [selectedUnit]);

  const handleSave = async (formData: any) => {
    const payload = {
      vessel: parseInt(formData.ship),
      sub_module: parseInt(formData.subModule),
      level: parseInt(formData.level) || 1,
      route_type: formData.routeType,
      directorate: parseInt(formData.unit),
      user: formData.user ? parseInt(formData.user) : null,
      description: formData.description || "Route configuration",
      permissions: [
        {
          permission_type: formData.permissionType || "edit",
          is_granted: true
        }
      ]
    };

    try {
      if (editingConfig) {
        await put(`/config/route-configs/`, { ...payload, id: editingConfig.id });
        toast({ title: "Success", description: "Route Config updated successfully" });
      } else {
        await post(`/config/route-configs/`, payload);
        toast({ title: "Success", description: "Route Config created successfully" });
      }

      fetchConfigs(page);
      setIsDialogOpen(false);
      setEditingConfig(null);
      setSelectedModule("");
      setSelectedUnit("");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to save route config",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (config: RouteConfig) => {
    setEditingConfig(config);
    setSelectedModule(config.module || "");
    setSelectedUnit(config.unit || "");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this config?")) {
      try {
        const payload = { id: id, delete: true };
        await del(`/config/route-configs/`, payload);
        setConfigs((prev) => prev.filter((c) => c.id !== id));
        toast({
          title: "Success",
          description: "Route Config deleted successfully",
        });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to delete route config",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddButtonClick = () => {
    setEditingConfig(null);
    setSelectedModule("");
    setSelectedUnit("");
    setIsDialogOpen(true);
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSubModules([]);
  };

  const handleUnitChange = (unitId: string) => {
    setSelectedUnit(unitId);
  };

  const filteredConfigs = configs.filter((c) =>
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formFields = [
    {
      name: "module",
      label: "Module",
      type: "searchable-dropdown",
      options: modules,
      placeholder: "Select module",
      loading: dropdownsLoading,
      onChange: handleModuleChange,
      required: true
    },
    {
      name: "subModule",
      label: "Sub Module",
      type: "searchable-dropdown",
      options: subModules,
      placeholder: selectedModule ? "Select sub module" : "Please select module first",
      loading: subModulesLoading,
      disabled: !selectedModule,
      clearable: true,
      required: true
    },
    {
      name: "ship",
      label: "Vessel",
      type: "searchable-dropdown",
      options: ships,
      placeholder: "Select vessel",
      loading: dropdownsLoading,
      required: true
    },
    {
      name: "level",
      label: "Level",
      type: "number",
      placeholder: "Enter level (e.g., 1)",
      min: 1,
      required: true
    },
    {
      name: "unit",
      label: "Directorate",
      type: "searchable-dropdown",
      options: units,
      placeholder: "Select directorate",
      loading: dropdownsLoading,
      onChange: handleUnitChange,
      required: true
    },
    {
      name: "user",
      label: "User",
      type: "searchable-dropdown",
      options: users,
      placeholder: selectedUnit ? "Select user" : "Please select directorate first",
      loading: dropdownsLoading,
      disabled: !selectedUnit,
      clearable: true
    },
    {
      name: "routeType",
      label: "Route Type",
      type: "radio",
      options: [
        { value: "internal", label: "Internal" },
        { value: "external", label: "External" }
      ],
      required: true
    },
    {
      name: "permissionType",
      label: "Permission Type",
      type: "radio",
      options: [
        { value: "edit", label: "Edit" },
        { value: "comment", label: "Comment" }
      ],
      required: true
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      rows: 3
    }
  ];

  return (
    <div className="">
      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={filteredConfigs}
            rowsPerPage={10}
            showImport={false}
            showExport={false}
            title="Route Config Master"
            description="Manage route configuration settings"
            showSearch={true}
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search configs..."
            showAddButton={true}
            addButtonText="Add Route Config"
            onAddButtonClick={handleAddButtonClick}
          />
        </CardContent>
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </Card>

      <DynamicFormDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingConfig(null);
            setSelectedModule("");
            setSelectedUnit("");
          }
        }}
        title={editingConfig ? "Edit Route Config" : "Add Route Config"}
        description="Fill out the details below"
        fields={formFields}
        onSubmit={handleSave}
        initialValues={
          editingConfig
            ? {
                module: editingConfig.module,
                subModule: editingConfig.subModule,
                ship: editingConfig.ship,
                level: editingConfig.level,
                unit: editingConfig.unit,
                user: editingConfig.user,
                routeType: editingConfig.route_type,
                permissionType: editingConfig.permissions?.[0]?.permission_type,
                description: editingConfig.description,
              }
            : {}
        }
      />
    </div>
  );
};

export default RouteConfigMaster;