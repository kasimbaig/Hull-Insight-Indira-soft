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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DynamicFormField {
  id: number;
  sub_module: {
    id: number;
    name: string;
    module: number; // This is the module ID we need
    code: string;
    active: number;
    created_on: string;
    created_ip: string;
    modified_on: string;
    modified_ip?: string;
    content_type_name?: string;
    linked_model_name?: string;
    created_by?: string;
    modified_by?: string;
    parent?: number;
    content_type?: number;
  };
  dropdown_options_list?: any;
  data_source_name?: string;
  data_source_id?: number;
  label: string;
  field_type: string;
  key: string;
  required: boolean;
  position_on_form: number;
  active: number; // 1 = Active, 2 = Inactive
  dropdown_options?: string;
  data_source?: string;
  // Legacy fields for backward compatibility
  form_module?: string;
  sub_module_name?: string;
  dropdown_type?: string;
  comma_separated_values?: string;
}



const DynamicFormFieldsMaster = () => {
  const { toast } = useToast();
  const [formFields, setFormFields] = useState<DynamicFormField[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<DynamicFormField | null>(null);

  // Pagination is now handled by DataTable

  const columns: Column<DynamicFormField>[] = [
    { header: "Sub Module", accessor: "sub_module", render: (row) => row.sub_module.name },
    { header: "Label", accessor: "label" },
    { header: "Field Type", accessor: "field_type" },
    {
      header: "Required",
      accessor: "required",
      render: (row) => (
        <Badge variant={row.required ? "default" : "secondary"}>
          {row.required ? "Yes" : "No"}
        </Badge>
      ),
    },
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

  // Fetch form fields from API
  const fetchFormFields = async () => {
    try {
      const res = await get(`/master/dynamic-fields/?order_by=-id`);
      setFormFields(res.results || res.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch dynamic form fields",
        variant: "destructive",
      });
    }
  };


  useEffect(() => {
    fetchFormFields();
  }, []);

  // Save / Update API
  const handleSave = async (formData: any) => {
    if (!formData.form_module?.trim()) {
      toast({
        title: "Validation Error",
        description: "Form module is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.sub_module?.trim()) {
      toast({
        title: "Validation Error",
        description: "Sub module is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.label?.trim()) {
      toast({
        title: "Validation Error",
        description: "Label is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.field_type?.trim()) {
      toast({
        title: "Validation Error",
        description: "Field type is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.key?.trim()) {
      toast({
        title: "Validation Error",
        description: "Key is required",
        variant: "destructive",
      });
      return;
    }

    // Validate comma-separated values if dropdown_type is Static
    if (formData.dropdown_type === "Static" && formData.field_type === "dropdown") {
      if (!formData.comma_separated_values?.trim()) {
        toast({
          title: "Validation Error",
          description: "Comma-separated values are required for static dropdowns",
          variant: "destructive",
        });
        return;
      }
      
      // Validate comma-separated format
      const values = formData.comma_separated_values.split(',').map(v => v.trim()).filter(v => v.length > 0);
      if (values.length < 2) {
        toast({
          title: "Validation Error",
          description: "At least 2 comma-separated values are required",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate data_source if dropdown_type is Dynamic
    if (formData.dropdown_type === "Dynamic" && formData.field_type === "dropdown") {
      if (!formData.data_source?.trim()) {
        toast({
          title: "Validation Error",
          description: "Data source is required for dynamic dropdowns",
          variant: "destructive",
        });
        return;
      }
    }

    const payload = {
      form_module: formData.form_module,
      sub_module: formData.sub_module,
      label: formData.label,
      field_type: formData.field_type,
      key: formData.key,
      required: formData.required === "Yes",
      position_on_form: parseInt(formData.position_on_form) || 1,
      dropdown_type: formData.dropdown_type,
      comma_separated_values: formData.comma_separated_values,
      data_source: formData.data_source,
      active: formData.status ? 1 : 2,
    };

    try {
      if (editingField) {
        const payloadWithId = { ...payload, id: editingField.id };
        await post(`/master/dynamic-fields/`, payloadWithId);
        toast({ title: "Success", description: "Dynamic form field updated successfully" });
      } else {
        await post(`/master/dynamic-fields/`, payload);
        toast({ title: "Success", description: "Dynamic form field created successfully" });
      }

      fetchFormFields();
      setIsDialogOpen(false);
      setEditingField(null);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save dynamic form field",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (field: DynamicFormField) => {
    setEditingField(field);
    setIsDialogOpen(true);
  };

  // Delete API
  const handleDelete = async (field: DynamicFormField) => {
    try {
      await del(`/master/dynamic-fields/${field.id}/`);
      setFormFields((prev) => prev.filter((f) => f.id !== field.id));
      toast({
        title: "Success",
        description: "Dynamic form field deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete dynamic form field",
        variant: "destructive",
      });
    }
  };

  // Filter by search
  const filteredFormFields = formFields.filter((f) =>
    f.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.sub_module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom form fields for the dialog
  const getFormFields = () => {
    const baseFields = [
      {
        name: "form_module",
        label: "Form Module",
        type: "dropdown" as const,
        apiEndpoint: "/master/modules/",
        required: true,
      },
      {
        name: "sub_module",
        label: "Sub Module",
        type: "dropdown" as const,
        apiEndpoint: "/master/submodules/",
        required: true,
      },
      { name: "label", label: "Label", type: "text" as const, required: true },
      {
        name: "field_type",
        label: "Field Type",
        type: "static-dropdown" as const,
        options: [
          { value: "text", label: "Text" },
          { value: "number", label: "Number" },
          { value: "dropdown", label: "Dropdown" },
          { value: "date", label: "Date" },
          { value: "checkbox", label: "Checkbox" },
          { value: "radio", label: "Radio" },
          { value: "select", label: "Select" },
          { value: "textarea", label: "Textarea" },
          { value: "file", label: "File" },
          { value: "image", label: "Image" },
          { value: "video", label: "Video" },
          { value: "audio", label: "Audio" },
          { value: "link", label: "Link" },
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "url", label: "URL" },
          { value: "password", label: "Password" },
          { value: "username", label: "Username" },
          { value: "secret", label: "Secret" },
          { value: "api_key", label: "API Key" }
        ],
        required: true,
      },
      { name: "key", label: "Key", type: "text" as const, required: true },
      {
        name: "required",
        label: "Required",
        type: "static-dropdown" as const,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" }
        ],
        required: true,
      },
      { name: "position_on_form", label: "Position on Form", type: "number" as const, required: true },
      {
        name: "dropdown_type",
        label: "Dropdown Type",
        type: "static-dropdown" as const,
        options: [
          { value: "Static", label: "Static" },
          { value: "Dynamic", label: "Dynamic" }
        ],
        required: false,
        showWhen: { field: "field_type", value: "dropdown" }
      },
      {
        name: "comma_separated_values",
        label: "Comma-separated values (for static dropdowns)",
        type: "comma-dropdown" as const,
        required: false,
        placeholder: "Enter comma-separated values, e.g., Option1,Option2,Option3",
        showWhen: { field: "dropdown_type", value: "Static" }
      },
      {
        name: "data_source",
        label: "Data Source (for dynamic dropdowns)",
        type: "dropdown" as const,
        apiEndpoint: "/master/content-types/dropdown/",
        required: false,
        showWhen: { field: "dropdown_type", value: "Dynamic" }
      },
      {
        name: "status",
        label: "Active",
        type: "checkbox" as const,
        required: false,
      }
    ];

    return baseFields;
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dynamic Form Fields Master</h1>
          <p className="text-muted-foreground">
            Manage dynamic form fields for modules and submodules
          </p>
        </div>

        <DynamicFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={editingField ? "Edit Dynamic Form Field" : "Add Dynamic Form Field"}
          description="Fill out the details below"
          fields={getFormFields()}
          onSubmit={handleSave}
          initialValues={
            editingField
              ? {
                  form_module: editingField.sub_module.module.toString(), // Use module ID from sub_module
                  sub_module: editingField.sub_module.id.toString(), // Use sub_module ID
                  label: editingField.label,
                  field_type: editingField.field_type,
                  key: editingField.key,
                  required: editingField.required ? "Yes" : "No",
                  position_on_form: editingField.position_on_form.toString(),
                  dropdown_type: editingField.dropdown_options ? "Static" : "Dynamic", // Infer from dropdown_options
                  comma_separated_values: editingField.dropdown_options || "",
                  data_source: editingField.data_source || "",
                  status: editingField.active === 1,
                }
              : {
                  status: true // Default to Active (checked) when adding new field
                }
          }
          trigger={
            <Button
              onClick={() => {
                setEditingField(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Dynamic Form Field
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
              placeholder="Search dynamic form fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Form Fields Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Form Fields</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredFormFields}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deleteMessage="Are you sure you want to delete this dynamic form field? This action cannot be undone."
            deleteTitle="Delete Dynamic Form Field"
            rowsPerPage={10}
          />
        </CardContent>
      </Card>

      {/* Pagination is now handled by DataTable */}
    </div>
  );
};

export default DynamicFormFieldsMaster;
