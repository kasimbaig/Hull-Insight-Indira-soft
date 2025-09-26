import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface ReusableTableProps {
  data: any[];
  columns: any[];
  title?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  showExport?: boolean;
  pageSize?: number;
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
  onView?: (rowData: any) => void;
  onAdd?: () => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  pagination?: boolean;
  globalFilter?: boolean;
  exportable?: boolean;
  // Delete confirmation options
  deleteConfirmation?: boolean;
  deleteMessage?: string;
  deleteHeader?: string;
  deleteIcon?: string;
  deleteAcceptLabel?: string;
  deleteRejectLabel?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  columns,
  title = "Data Table",
  showSearch = true,
  showFilters = false,
  showPagination = true,
  showExport = false,
  pageSize = 10,
  onEdit,
  onDelete,
  onView,
  onAdd,
  loading = false,
  emptyMessage = "No data available in table",
  className = "reusable-table",
  pagination = true,
  globalFilter = true,
  exportable = true,
  // Delete confirmation options
  deleteConfirmation = true,
  deleteMessage = "Are you sure you want to delete this item?",
  deleteHeader = "Confirm Delete",
  deleteIcon = "pi pi-exclamation-triangle",
  deleteAcceptLabel = "Yes, Delete",
  deleteRejectLabel = "Cancel"
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  // Get all field names for global filtering
  const globalFilterFields = columns.map(col => col.field).filter(Boolean);

  // Handle delete confirmation
  const handleDeleteClick = (rowData: any) => {
    if (deleteConfirmation && onDelete) {
      setItemToDelete(rowData);
      setDeleteDialogVisible(true);
    } else if (onDelete) {
      onDelete(rowData);
    }
  };

  // Handle confirmed delete
  const handleConfirmDelete = () => {
    if (onDelete && itemToDelete) {
      onDelete(itemToDelete);
    }
    setDeleteDialogVisible(false);
    setItemToDelete(null);
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setDeleteDialogVisible(false);
    setItemToDelete(null);
  };

  // Render action buttons for each row
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        {onView && (
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-text p-button-sm"
            onClick={() => onView(rowData)}
            tooltip="View"
          />
        )}
        {onEdit && (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-text p-button-sm"
            onClick={() => onEdit(rowData)}
            tooltip="Edit"
          />
        )}
        {onDelete && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-text p-button-sm p-button-danger"
            onClick={() => handleDeleteClick(rowData)}
            tooltip="Delete"
          />
        )}
      </div>
    );
  };

  // Custom header with search and actions
  const headerTemplate = () => {
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showSearch && globalFilter && (
            <>
              <span className="text-sm text-gray-600">Search:</span>
              <InputText
                placeholder="Search"
                className="w-64"
                value={globalFilterValue}
                onInput={(e) => setGlobalFilterValue((e.target as HTMLInputElement).value)}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onAdd && (
            <Button
              label="Add New"
              icon="pi pi-plus"
              className="p-button-sm"
              onClick={onAdd}
            />
          )}
          {showExport && exportable && (
            <Button
              label="Export"
              icon="pi pi-download"
              className="p-button-sm p-button-outlined"
              onClick={() => console.log('Export functionality')}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm">
      <style>{`
        .${className} .p-datatable-thead > tr > th {
          background-color: #1a2746 !important;
          color: white !important;
          border: 1px solid #1a2746 !important;
          border-right: 1px solid white !important;
          font-weight: bold;
        }
        .${className} .p-datatable-thead > tr > th:last-child {
          border-right: 1px solid #1a2746 !important;
        }
        .${className} .p-datatable-tbody > tr > td {
          border: 1px solid #dee2e6 !important;
        }
        .${className} .p-datatable-tbody > tr:nth-child(even) {
          background-color: #f8f9fa !important;
        }
        .${className} .p-datatable-header {
          background-color: #f8f9fa !important;
          border-bottom: 1px solid #dee2e6 !important;
          padding: 0.75rem !important;
        }
        .${className} .p-datatable-header .p-inputtext {
          border: 1px solid #ced4da !important;
          border-radius: 0.375rem !important;
        }
        .${className} .p-datatable-footer {
          background-color: #f8f9fa !important;
          border-top: 1px solid #dee2e6 !important;
          padding: 0.75rem !important;
        }
      `}</style>
      
      <DataTable
        value={data}
        paginator={pagination && showPagination}
        rows={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50]}
        emptyMessage={emptyMessage}
        className={className}
        loading={loading}
        globalFilter={globalFilter ? globalFilterValue : undefined}
        globalFilterFields={globalFilter ? globalFilterFields : undefined}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        header={headerTemplate()}
      >
        {columns.map((column, index) => {
          if (column.field === 'actions') {
            return (
              <Column
                key={index}
                header="Actions"
                body={actionBodyTemplate}
                style={{ width: '120px', textAlign: 'center' }}
                frozen={true}
              />
            );
          }

          return (
            <Column
              key={index}
              field={column.field}
              header={column.header}
              sortable={false}
              filter={column.filter || false}
              filterPlaceholder={column.filterPlaceholder || `Search ${column.header}`}
              style={column.style || { width: column.width || 'auto' }}
              body={column.body || undefined}
              align={column.align || 'left'}
            />
          );
        })}
      </DataTable>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        header={deleteHeader}
        visible={deleteDialogVisible}
        style={{ width: '450px' }}
        onHide={handleCancelDelete}
        modal
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label={deleteRejectLabel}
              icon="pi pi-times"
              onClick={handleCancelDelete}
              className="p-button-text"
            />
            <Button
              label={deleteAcceptLabel}
              icon="pi pi-check"
              onClick={handleConfirmDelete}
              className="p-button-danger"
              autoFocus
            />
          </div>
        }
      >
        <div className="flex align-items-center">
          <i className={`${deleteIcon} text-4xl text-red-500 mr-3`}></i>
          <span className="text-lg">{deleteMessage}</span>
        </div>
      </Dialog>
    </div>
  );
};

export default ReusableTable;
