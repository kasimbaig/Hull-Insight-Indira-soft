import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";

// ---------------- Table Components ----------------
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-xl shadow-md">
    <table
      ref={ref}
      className={cn(
        "w-full text-sm border border-gray-300 bg-blue-50 rounded-xl",
        "border-collapse",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-[#1a2746] text-white", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-gray-300", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-blue-200",
      "odd:bg-blue-50 even:bg-blue-100", // striped light blue
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-sm tracking-wide",
      "bg-[#1a2746] text-white border border-gray-300",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-4 py-3 text-gray-800 text-sm whitespace-nowrap",
      "border border-gray-300 bg-blue-50", // subtle blue cell background
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// ---------------- Pagination Component ----------------
interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => (
  <div className={cn("flex justify-center items-center gap-4 mt-4", className)}>
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="flex items-center gap-1"
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </Button>
    
    <span className="text-sm font-medium">
      Page <b>{currentPage}</b> of {totalPages}
    </span>
    
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => onPageChange(currentPage + 1)}
      className="flex items-center gap-1"
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);

// ---------------- Reusable DataTable ----------------
export interface Column<T> {
  header: string;
  accessor: keyof T | "actions";
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  className?: string;
  showImport?: boolean;
  showExport?: boolean;
  // New props for header, search, and add button
  title?: string;
  description?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddButtonClick?: () => void;
  // Pagination props
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  // Custom header content
  customHeader?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowsPerPage = 10,
  onEdit,
  onDelete,
  className,
  showImport = true,
  showExport = true,
  // New props with defaults
  title,
  description,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  showAddButton = false,
  addButtonText = "Add New",
  onAddButtonClick,
  // Pagination props
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  customHeader,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = React.useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState<T | null>(null);

  // Use external pagination if provided, otherwise use internal
  const page = showPagination ? (currentPage || internalPage) : 1;
  const totalPagesCount = showPagination ? (totalPages || 1) : 1;
  
  const handlePageChange = (newPage: number) => {
    if (showPagination) {
      if (onPageChange) {
        onPageChange(newPage);
      } else {
        setInternalPage(newPage);
      }
    }
  };

  // For internal pagination (when showPagination is true but no external control)
  const paginatedData = showPagination && !onPageChange
    ? data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : data;

  const displayData = showPagination && !onPageChange ? paginatedData : data;

  const handleDeleteClick = (row: T) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (rowToDelete && onDelete) {
      onDelete(rowToDelete);
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  // ---------------- Import Handler ----------------
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Imported file: ${file.name}`); // replace with actual logic
      }
    };
    input.click();
  };

  // ---------------- Export Handler ----------------
  const handleExport = () => {
    const headers = columns.map((col) => col.header).join(",");
    const rows = data.map((row) =>
      columns
        .map((col) =>
          col.accessor !== "actions" ? JSON.stringify(row[col.accessor]) : ""
        )
        .join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if we need to show any header elements
  const showHeaderSection = title || description || showSearch || showAddButton || customHeader || showImport || showExport;

  return (
    <div className="space-y-4">
      {/* Header Section */}
      {showHeaderSection && (
        <div className="space-y-4">
          {/* Title and Description */}
          {(title || description) && (
            <div>
              {title && <h1 className="text-3xl font-bold text-primary">{title}</h1>}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {/* Custom Header Content */}
          {customHeader}

          {/* Toolbar with Search, Add Button, Import/Export */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Left side: Search */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* Right side: Buttons */}
            <div className="flex flex-wrap gap-2 justify-end">
              {/* Add Button */}
              {showAddButton && (
                <Button onClick={onAddButtonClick}>
                  <Plus className="mr-2 h-4 w-4" />
                  {addButtonText}
                </Button>
              )}

              {/* Import/Export Buttons */}
              {(showImport || showExport) && (
                <>
                  {showImport && (
                    <Button
                      className="bg-[#1a2746] text-white hover:bg-[#223366] rounded-lg shadow-sm"
                      onClick={handleImport}
                    >
                      Import
                    </Button>
                  )}
                  {showExport && (
                    <Button
                      className="bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-sm"
                      onClick={handleExport}
                    >
                      Export
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col.header}>
                  {col.accessor === "actions" ? (
                    col.render ? (
                      col.render(row)
                    ) : (
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-[#1a2746] text-white hover:bg-[#223366] border border-gray-400 rounded-md"
                            onClick={() => onEdit(row)}
                          >
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 text-white hover:bg-red-700 border border-gray-400 rounded-md"
                            onClick={() => handleDeleteClick(row)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    )
                  ) : col.render ? (
                    col.render(row)
                  ) : (
                    row[col.accessor]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {showPagination && totalPagesCount > 1 && (
        <TablePagination
          currentPage={page}
          totalPages={totalPagesCount}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="text-gray-700">
            Are you sure you want to delete this record?
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Export all table components
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
};