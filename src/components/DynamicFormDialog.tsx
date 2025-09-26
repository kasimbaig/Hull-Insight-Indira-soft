import { useEffect, useState, useRef } from "react";
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
import { Editor } from 'primereact/editor';

// ---------------- Types ----------------
export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "dropdown" | "date" | "checkbox" | "static-dropdown" | "comma-dropdown" | "searchable-dropdown" | "editor";
  placeholder?: string;
  apiEndpoint?: string; // optional: fetch options from API
  options?: { value: string | number; label: string }[]; // static options
  required?: boolean;
  onChange?: (value: string) => void; // optional: custom change handler
  showWhen?: { field: string; value: string }; // conditional visibility
  row?: number; // optional: group fields in the same row
  width?: string; // optional: custom width for the field
}

interface DynamicFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  trigger?: React.ReactNode;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  customButtons?: { label: string; action: string; variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" }[];
}

// ---------------- Searchable Dropdown Component ----------------
interface SearchableDropdownProps {
  value: any;
  options: any[];
  placeholder?: string;
  required?: boolean;
  onChange: (value: any) => void;
  onCustomChange?: (value: string) => void;
  onDropdownToggle?: (isOpen: boolean, fieldName: string) => void;
  fieldName?: string;
}

function SearchableDropdown({ 
  value, 
  options, 
  placeholder, 
  required, 
  onChange, 
  onCustomChange,
  onDropdownToggle,
  fieldName
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option => {
    const label = option.label || option.name || String(option.value || option.id);
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get selected option label
  const selectedOption = options.find(opt => 
    (opt.value || opt.id) === value
  );
  const displayValue = selectedOption ? (selectedOption.label || selectedOption.name) : "";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: any) => {
    const optionValue = option.value || option.id;
    onChange(optionValue);
    if (onCustomChange) {
      onCustomChange(optionValue);
    }
    setIsOpen(false);
    setSearchTerm("");
    if (onDropdownToggle && fieldName) {
      onDropdownToggle(false, fieldName);
    }
  };

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onDropdownToggle && fieldName) {
      onDropdownToggle(newIsOpen, fieldName);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2 cursor-pointer bg-white flex justify-between items-center"
        onClick={handleToggle}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {displayValue || placeholder || "Select an option"}
        </span>
        <svg 
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Bar */}
          <div className="p-2 border-b border-gray-200">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-gray-300 focus:border-indigo-500"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          
          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, idx) => {
                const optionValue = option.value || option.id;
                const optionLabel = option.label || option.name || String(optionValue);
                
                return (
                  <div
                    key={idx}
                    className={`p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                      value === optionValue ? "bg-indigo-50 text-indigo-700" : "text-gray-900"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {optionLabel}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- Main Component ----------------
export function DynamicFormDialog({
  open,
  onOpenChange,
  title,
  description,
  fields,
  initialValues = {},
  trigger,
  onSubmit,
  customButtons,
}: DynamicFormDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(initialValues);
    }
  }, [open]);

  // Update form data when initialValues change (for editing scenarios)
  useEffect(() => {
    if (open && initialValues && Object.keys(initialValues).length > 0) {
      setFormData(prev => {
        const hasExistingData = Object.values(prev).some(value => value !== "" && value !== null && value !== undefined);
        if (!hasExistingData) {
          return { ...prev, ...initialValues };
        }
        return prev;
      });
    }
  }, [initialValues, open]);

  // Fetch dropdowns from API
  useEffect(() => {
    fields.forEach(async (field) => {
      if ((field.type === "dropdown" || field.type === "searchable-dropdown") && field.apiEndpoint) {
        try {
          const res = await get(field.apiEndpoint);
          const items = Array.isArray(res) ? res : res.data ?? [];
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

  const handleDropdownToggle = (isOpen: boolean, fieldName: string) => {
    console.log('Dropdown toggle:', { isOpen, fieldName });
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(fieldName);
      } else {
        newSet.delete(fieldName);
      }
      console.log('Updated openDropdowns:', Array.from(newSet));
      return newSet;
    });
  };

  // Calculate dynamic height based on open dropdowns
  const getDynamicHeight = () => {
    const baseHeight = "80vh"; // Increased base height
    const dropdownHeight = openDropdowns.size * 300; // Increased to 300px per open dropdown
    const calculatedHeight = `calc(${baseHeight} + ${dropdownHeight}px)`;
    console.log('Dynamic height calculation:', {
      openDropdowns: Array.from(openDropdowns),
      dropdownCount: openDropdowns.size,
      dropdownHeight,
      calculatedHeight
    });
    return calculatedHeight;
  };

  // Check if field should be visible based on conditional logic
  const shouldShowField = (field: FieldConfig): boolean => {
    if (!field.showWhen) return true;
    return formData[field.showWhen.field] === field.showWhen.value;
  };

  // Get dropdown options (static or from API)
  const getDropdownOptions = (field: FieldConfig): any[] => {
    if (field.options) {
      return field.options;
    } else if (field.apiEndpoint && dropdownData[field.name]) {
      return dropdownData[field.name];
    }
    return [];
  };

  const handleSubmit = async (dataToSubmit?: Record<string, any>) => {
    setLoading(true);
    try {
      const data = dataToSubmit || formData;
      await onSubmit(data);
      onOpenChange(false);
    } catch (err) {
      console.error("Form submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        /* Prevent modal scrolling when dropdowns are open */
        [data-radix-dialog-content] {
          overflow: visible !important;
          max-height: none !important;
          height: auto !important;
        }
        
        /* Ensure dropdowns appear above everything */
        .dropdown-menu {
          z-index: 9999 !important;
        }
        
        /* Force dialog to respect dynamic height */
        [data-radix-dialog-content] {
          min-height: 70vh !important;
        }
      `}</style>
      
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        <DialogContent className="lg:max-w-4xl shadow-xl border-0 bg-white p-0 rounded-1xl overflow-visible" style={{ maxHeight: getDynamicHeight() }}>
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-[#1a2746] to-[#223366] p-4 text-white">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-sm opacity-90 text-white">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Form Body */}
        <div className="space-y-4 p-4 custom-scrollbar overflow-x-visible" style={{ maxHeight: getDynamicHeight(), overflowY: 'auto' }}>
          {(() => {
            // Group fields by row
            const fieldsByRow: { [key: number]: FieldConfig[] } = {};
            fields.forEach(field => {
              if (shouldShowField(field)) {
                const rowNumber = field.row || 0;
                if (!fieldsByRow[rowNumber]) {
                  fieldsByRow[rowNumber] = [];
                }
                fieldsByRow[rowNumber].push(field);
              }
            });

            // Render rows
            return Object.keys(fieldsByRow).map(rowKey => {
              const rowFields = fieldsByRow[parseInt(rowKey)];
              const hasEditor = rowFields.some(field => field.type === "editor");
              
              return (
                <div key={rowKey} className={hasEditor ? "w-full" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
                  {rowFields.map(field => (
                    <div key={field.name} className={`space-y-2 ${field.type === "editor" ? "w-full" : ""}`}>
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
                          onChange={(e) => {
                            const value = e.target.value;
                            if (field.onChange) {
                              const validatedValue = field.onChange(value);
                              handleChange(field.name, validatedValue);
                            } else {
                              handleChange(field.name, value);
                            }
                          }}
                          className={`${field.width || "w-full"} rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2`}
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
                          className={`${field.width || "w-full"} rounded-lg border-black/40 border-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2`}
                        />
                      )}

                      {/* Editor */}
                      {field.type === "editor" && (
                        <div className="w-full">
                          <Editor
                            value={formData[field.name] || ""}
                            onTextChange={(e) => handleChange(field.name, e.htmlValue || "")}
                            style={{ height: '200px', width: '100%' }}
                            className="w-full"
                          />
                        </div>
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

                      {/* Regular Dropdown */}
                      {(field.type === "dropdown" || field.type === "static-dropdown") && (
                        <select
                          id={field.name}
                          value={formData[field.name] || ""}
                          required={field.required}
                          onFocus={() => handleDropdownToggle(true, field.name)}
                          onBlur={() => handleDropdownToggle(false, field.name)}
                          onChange={(e) => {
                            handleChange(field.name, e.target.value);
                            if (field.onChange) {
                              field.onChange(e.target.value);
                            }
                          }}
                          className={`${field.width || "w-auto"} rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2`}
                        >
                          <option value="">Select {field.label}</option>
                          {getDropdownOptions(field).map((opt: any, idx: number) => (
                            <option key={idx} value={opt.value || opt.id}>
                              {opt.label || opt.name}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* Searchable Dropdown */}
                      {field.type === "searchable-dropdown" && (
                        <div className={field.width || "w-auto"}>
                          <SearchableDropdown
                            value={formData[field.name]}
                            options={getDropdownOptions(field)}
                            placeholder={field.placeholder || `Select ${field.label}`}
                            required={field.required}
                            onChange={(value) => handleChange(field.name, value)}
                            onCustomChange={field.onChange}
                            onDropdownToggle={handleDropdownToggle}
                            fieldName={field.name}
                          />
                        </div>
                      )}
                      
                      {/* Radio Buttons */}
                      {field.type === "radio" && (
                        <div className="space-y-2 flex flex-row gap-8 items-end">
                          {field.options?.map((option: any, idx: number) => (
                            <div key={idx} className="flex items-center">
                              <input
                                type="radio"
                                id={`${field.name}-${option.value}`}
                                name={field.name}
                                value={option.value}
                                checked={formData[field.name] === option.value}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              <Label 
                                htmlFor={`${field.name}-${option.value}`} 
                                className="ml-2 text-gray-700 cursor-pointer"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
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
                            className={`${field.width || "w-full"} rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2`}
                            rows={3}
                          />
                          {formData[field.name] && (
                            <div className="mt-2">
                              <Label className="text-sm text-gray-600">Preview:</Label>
                              <select className={`${field.width || "w-full"} rounded-lg border-gray-300 p-2 mt-1`}>
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
                  ))}
                </div>
              );
            });
          })()}
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-end gap-3 p-4 border-t border-2">
          {customButtons ? (
            <>
              {customButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  onClick={() => {
                    const formDataWithAction = { ...formData, action: button.action };
                    handleSubmit(formDataWithAction);
                  }}
                  disabled={loading}
                  className="rounded-lg"
                >
                  {loading ? "Processing..." : button.label}
                </Button>
              ))}
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}