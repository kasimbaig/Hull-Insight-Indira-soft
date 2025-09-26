import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { get } from "@/lib/api";

// ---------------- Types ----------------
export interface ReusableFieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "dropdown" | "date" | "checkbox" | "static-dropdown" | "comma-dropdown";
  placeholder?: string;
  apiEndpoint?: string; // optional: fetch options from API
  options?: { value: string | number; label: string }[]; // static options
  required?: boolean;
  onChange?: (value: string) => void; // optional: custom change handler
  showWhen?: { field: string; value: string }; // conditional visibility
}

interface ReusableFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: ReusableFieldConfig[];
  initialValues?: Record<string, any>;
  trigger?: React.ReactNode;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  // Styling customization
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  maxWidth?: string;
  showCancel?: boolean;
}

// ---------------- Component ----------------
export function ReusableForm({
  open,
  onOpenChange,
  title,
  description,
  fields,
  initialValues = {},
  trigger,
  onSubmit,
  // Styling props with defaults
  headerClassName = "bg-gradient-to-r from-[#1a2746] to-[#223366] p-4 text-white",
  titleClassName = "text-lg font-semibold",
  descriptionClassName = "text-sm opacity-90 text-white",
  contentClassName = "lg:max-w-lg shadow-xl border-0 bg-white p-0 rounded-1xl",
  footerClassName = "flex justify-end gap-3 p-4 border-t",
  submitButtonClassName = "bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg",
  cancelButtonClassName = "rounded-lg",
  submitButtonText = "Save",
  cancelButtonText = "Cancel",
  maxWidth = "lg:max-w-lg",
  showCancel = true,
}: ReusableFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(initialValues);
      setDropdownData({});
    }
  }, [open, initialValues]);

  // Fetch dropdowns from API
  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.type === "dropdown" && field.apiEndpoint) {
        try {
          const res = await get(field.apiEndpoint);
          const items = Array.isArray(res) ? res : res.data ?? res.results ?? [];
          setDropdownData((prev) => ({ ...prev, [field.name]: items }));
        } catch (err) {
          console.error("Dropdown fetch failed for", field.apiEndpoint, err);
          setDropdownData((prev) => ({ ...prev, [field.name]: [] }));
        }
      }
    });
  }, [fields]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Check if field should be visible based on conditional logic
  const shouldShowField = (field: ReusableFieldConfig): boolean => {
    if (!field.showWhen) return true;
    return formData[field.showWhen.field] === field.showWhen.value;
  };

  // Get dropdown options (static or from API)
  const getDropdownOptions = (field: ReusableFieldConfig): any[] => {
    if (field.options) {
      return field.options;
    } else if (field.apiEndpoint && dropdownData[field.name]) {
      return dropdownData[field.name];
    }
    return [];
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (err) {
      console.error("Form submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={`${maxWidth} shadow-xl border-0 bg-white p-0 rounded-1xl ${contentClassName}`}>
        {/* Header */}
        <DialogHeader className={headerClassName}>
          <DialogTitle className={titleClassName}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={descriptionClassName}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Form Body */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
          {fields.map((field) => 
            shouldShowField(field) ? (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="font-medium text-gray-700">
                {field.label} {field.required && "*"}
              </Label>

              {/* Text / Number / Date */}
              {(field.type === "text" || field.type === "number" || field.type === "date") && (
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                />
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                  rows={3}
                />
              )}

              {/* Checkbox */}
              {field.type === "checkbox" && (
                <div className="flex items-center">
                  <input
                    id={field.name}
                    type="checkbox"
                    checked={formData[field.name] === "Active" || formData[field.name] === true}
                    onChange={(e) =>
                      handleChange(field.name, e.target.checked ? "Active" : "Inactive")
                    }
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <Label htmlFor={field.name} className="ml-2 text-gray-700">
                    {field.label}
                  </Label>
                </div>
              )}

              {/* Dropdown */}
              {(field.type === "dropdown" || field.type === "static-dropdown") && (
                <select
                  id={field.name}
                  value={String(formData[field.name] || "")}
                  required={field.required}
                  onChange={(e) => {
                    handleChange(field.name, e.target.value);
                    if (field.onChange) {
                      field.onChange(e.target.value);
                    }
                  }}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                >
                  <option value="">{`Select ${field.label}`}</option>
                  {getDropdownOptions(field).map((opt: any, idx: number) => {
                    const value = String(opt.value || opt.id);
                    const label = opt.label || opt.name;
                    return (
                      <option key={idx} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              )}

              {/* Comma Dropdown */}
              {field.type === "comma-dropdown" && (
                <div className="space-y-2">
                  <textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                    rows={3}
                  />
                  {formData[field.name] && (
                    <div className="mt-2">
                      <Label className="text-sm text-gray-600">Preview:</Label>
                      <select className="w-full rounded-lg border-gray-300 p-2 mt-1">
                        <option value="">Select option</option>
                        {formData[field.name].split(',').map((value: string, idx: number) => {
                          const trimmedValue = value.trim();
                          return trimmedValue ? (
                            <option key={idx} value={trimmedValue}>
                              {trimmedValue}
                            </option>
                          ) : null;
                        })}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
            ) : null
          )}
        </div>

        {/* Footer */}
        <DialogFooter className={footerClassName}>
          {showCancel && (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={cancelButtonClassName}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={submitButtonClassName}
          >
            {loading ? "Saving..." : submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReusableForm;
