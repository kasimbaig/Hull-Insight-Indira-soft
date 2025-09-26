import React from "react";
import { Input } from "@/components/ui/input";
import MultiColumnTable from "./MultiColumnTable";

interface FormData {
  // OPDEFs
  opdefsSinceLastInspection: string;
  hullOpdefsRows: number;
  hullOpdefsData: Array<{ opdefDetails: string; remarks: string }>;
  
  // Hull Concessions
  hullConcessionsRows: number;
  hullConcessionsData: Array<{ hullConcessions: string; location: string; justification: string }>;
  
  // Other Ty repairs / known defects
  tyRepairsRows: number;
  tyRepairsData: Array<{ tyRepairs: string; location: string; justification: string }>;
  
  // Structural defects
  structuralDefectsRows: number;
  structuralDefectsData: Array<{ type: string; location: string; remarks: string }>;
}

interface MaterialStateProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  onDataChange: (field: string, index: number, dataField: string, value: string) => void;
}

const MaterialState: React.FC<MaterialStateProps> = ({
  formData,
  onInputChange,
  onDataChange
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="bg-[#c7d9f0] text-black px-6 py-4">
        <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">Material State (No 01/15)</h3>
      </div>
      
      <div className="pt-4 bg-gray-100 max-h-96 overflow-y-auto">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <tbody>
            {/* 1.1 OPDEFs Header */}
            <tr style={{ backgroundColor: '#1a2746' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-bold text-white">1.1</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={3}>
                <span className="text-sm font-bold text-white">OPDEFs</span>
              </td>
            </tr>

            {/* OPDEFs No. of OPDEFs Since last inspection row */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">(a)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">No. of OPDEFs Since last inspection*</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <Input
                  type="number"
                  value={formData.opdefsSinceLastInspection}
                  onChange={(e) => onInputChange('opdefsSinceLastInspection', e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-0"
                  placeholder="Enter number"
                />
              </td>
            </tr>

            {/* OPDEFs Details of Hull OPDEFs row */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                {/* Blank column */}
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">(b)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Details of Hull OPDEFs*</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <MultiColumnTable
                  formData={formData}
                  onInputChange={onInputChange}
                  onDataChange={onDataChange}
                  rowsField="hullOpdefsRows"
                  dataField="hullOpdefsData"
                  columns={[
                    { field: 'opdefDetails', label: 'OPDEF Details*', placeholder: 'Enter OPDEF details', required: true },
                    { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                  ]}
                />
              </td>
            </tr>

            {/* Hull Concessions row */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-medium text-gray-700">1.2</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                <span className="text-sm font-medium text-gray-700">Hull Concessions*</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <MultiColumnTable
                  formData={formData}
                  onInputChange={onInputChange}
                  onDataChange={onDataChange}
                  rowsField="hullConcessionsRows"
                  dataField="hullConcessionsData"
                  columns={[
                    { field: 'hullConcessions', label: 'Hull Concessions*', placeholder: 'Enter hull concessions', required: true },
                    { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                    { field: 'justification', label: 'Justification*', placeholder: 'Enter justification', required: true }
                  ]}
                />
              </td>
            </tr>

            {/* Other Ty repairs row */}
            <tr className="bg-white">
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-medium text-gray-700">1.3</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                <span className="text-sm font-medium text-gray-700">Other Ty repairs / known defects*</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <MultiColumnTable
                  formData={formData}
                  onInputChange={onInputChange}
                  onDataChange={onDataChange}
                  rowsField="tyRepairsRows"
                  dataField="tyRepairsData"
                  columns={[
                    { field: 'tyRepairs', label: 'Ty Repairs*', placeholder: 'Enter ty repairs', required: true },
                    { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                    { field: 'justification', label: 'Justification*', placeholder: 'Enter justification', required: true }
                  ]}
                />
              </td>
            </tr>

            {/* Structural defects row */}
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <td className="border-l border-r border-t border-gray-300 px-4 py-3 w-16">
                <span className="text-sm font-medium text-gray-700">1.4</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3" colSpan={2}>
                <span className="text-sm font-medium text-gray-700">Structural defects (Cracks, Holes, Pitting, Thinning of structure, suspect structure)</span>
              </td>
              <td className="border-r border-t border-gray-300 px-4 py-3">
                <MultiColumnTable
                  formData={formData}
                  onInputChange={onInputChange}
                  onDataChange={onDataChange}
                  rowsField="structuralDefectsRows"
                  dataField="structuralDefectsData"
                  columns={[
                    { field: 'type', label: 'Type*', placeholder: 'Enter type', required: true },
                    { field: 'location', label: 'Location*', placeholder: 'Enter location', required: true },
                    { field: 'remarks', label: 'Remarks*', placeholder: 'Enter remarks', required: true }
                  ]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialState;
