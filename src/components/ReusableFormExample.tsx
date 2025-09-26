import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReusableForm } from "@/components/ReusableForm";
import { useToast } from "@/hooks/use-toast";

// Example usage of ReusableForm
export const ReusableFormExample = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Define form fields
  const formFields = [
    { 
      name: "name", 
      label: "Unit Name", 
      type: "text" as const, 
      required: true,
      placeholder: "Enter unit name"
    },
    { 
      name: "code", 
      label: "Unit Code", 
      type: "text" as const,
      placeholder: "Enter unit code"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter description"
    },
    {
      name: "category",
      label: "Category",
      type: "static-dropdown" as const,
      required: true,
      options: [
        { value: "naval", label: "Naval Unit" },
        { value: "air", label: "Air Unit" },
        { value: "ground", label: "Ground Unit" }
      ]
    },
    {
      name: "priority",
      label: "Priority",
      type: "number" as const,
      placeholder: "Enter priority level"
    },
    {
      name: "established_date",
      label: "Established Date",
      type: "date" as const
    },
    {
      name: "status",
      label: "Active",
      type: "checkbox" as const,
      required: false,
    },
  ];

  // Handle form submission
  const handleFormSubmit = async (formData: any) => {
    try {
      console.log('Form submitted with data:', formData);
      
      // Your API call would go here
      // await post('/api/units', formData);
      
      toast({
        title: "Success",
        description: editingItem ? "Item updated successfully" : "Item created successfully",
      });
      
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Form submission failed:', error);
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reusable Form Example</h1>
        
        <ReusableForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          title={editingItem ? "Edit Unit" : "Add New Unit"}
          description="Fill out the details below"
          fields={formFields}
          onSubmit={handleFormSubmit}
          initialValues={editingItem || { status: "Active" }}
          trigger={
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
            </Button>
          }
        />
      </div>

      {/* Example with custom styling */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Custom Styled Form</h2>
        
        <ReusableForm
          open={false} // Controlled separately
          onOpenChange={() => {}}
          title="Custom Styled Form"
          description="This form has custom styling"
          fields={formFields}
          onSubmit={handleFormSubmit}
          // Custom styling props
          headerClassName="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white"
          titleClassName="text-xl font-bold"
          submitButtonClassName="bg-green-600 hover:bg-green-700 text-white rounded-lg"
          submitButtonText="Create Item"
          cancelButtonText="Discard"
          maxWidth="lg:max-w-2xl"
          trigger={
            <Button variant="outline">
              Custom Form
            </Button>
          }
        />
      </div>

      {/* Example with different colors */}
      <div className="mt-4">
        <ReusableForm
          open={false}
          onOpenChange={() => {}}
          title="Red Themed Form"
          description="A form with red theme"
          fields={formFields}
          onSubmit={handleFormSubmit}
          headerClassName="bg-gradient-to-r from-red-600 to-pink-600 p-4 text-white"
          submitButtonClassName="bg-red-600 hover:bg-red-700 text-white rounded-lg"
          trigger={
            <Button variant="destructive">
              Red Form
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ReusableFormExample;
