import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const BerCertificate = () => {
  const toast = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    initiated_by: '',
    command: '0',
    unit: '0',
    reference_authority: null,
    type_of_boat: '0',
    boat_registration_no: '0',
    ber_for: '0',
    ber_for_hull: '0',
    ber_for_engine: '0',
    dg: '0',
    remarks: '',
    digital_sign: null
  });

  // Dropdown options
  const commandOptions = [
    { label: '--Select--', value: '0' },
    { label: 'WNC', value: 'WNC' },
    { label: 'NHQ', value: 'NHQ' },
    { label: 'ANC', value: 'ANC' },
    { label: 'SNC', value: 'SNC' },
    { label: 'ENC', value: 'ENC' }
  ];

  const [unitOptions, setUnitOptions] = useState([
    { label: '--Select--', value: '0' }
  ]);

  const typeOfBoatOptions = [
    { label: '--Select--', value: '0' },
    { label: 'dfgdg', value: 'dfgdg' },
    { label: '6.7 RIM', value: '6.7 RIM' },
    { label: '324 fwr-234.2342424233244b32j4 g4jhg4jh23g4hj 2j', value: '324 fwr-234.2342424233244b32j4 g4jhg4jh23g4hj 2j' },
    { label: 'ddfgd', value: 'ddfgd' },
    { label: '435j3lj5 3lj5l 34lj5kj34 5jl3 5llk34j5lkj34k5lkj 3', value: '435j3lj5 3lj5l 34lj5kj34 5jl3 5llk34j5lkj34k5lkj 3' }
  ];

  const [boatRegistrationOptions, setBoatRegistrationOptions] = useState([
    { label: '--Select--', value: '0' }
  ]);

  const berForOptions = [
    { label: '--Select--', value: '0' },
    { label: 'HULL', value: 'HULL' },
    { label: 'ENGINE', value: 'ENGINE' }
  ];

  const hullOptions = [
    { label: '--Select--', value: '0' },
    { label: 'NA', value: 'NA' },
    { label: 'BER', value: 'BER' }
  ];

  const engineOptions = [
    { label: '--Select--', value: '0' },
    { label: 'NA', value: 'NA' },
    { label: 'BER', value: 'BER' },
    { label: 'SERVICEABLE/ Sl.no', value: 'SER_SL_NO' }
  ];

  const dgOptions = [
    { label: '--Select--', value: '0' },
    { label: 'NA', value: 'NA' },
    { label: 'SI.NO', value: 'SL_NO' }
  ];

  // Sample data for the table
  const [tableData] = useState([
    {
      sr_no: 1,
      initiated_by: 'jhjgh',
      command: 'WNC',
      unit: 'MUMBAI',
      type_of_boat: '6.7 RIM',
      registration_no: '6.7_RIM-2020-jaimin',
      ber_for: 'HULL',
      ber_for_hull: 'NA',
      ber_for_engine: '0',
      dg: 'NA',
      remarks: 'thfh'
    },
    {
      sr_no: 2,
      initiated_by: 'fdg',
      command: 'WNC',
      unit: 'MUMBAI',
      type_of_boat: '6.7 RIM',
      registration_no: '6.7_RIM-2025-div',
      ber_for: 'HULL',
      ber_for_hull: 'NA',
      ber_for_engine: '0',
      dg: 'SL_NO',
      remarks: 'dfdfg'
    },
    {
      sr_no: 3,
      initiated_by: 'kklk',
      command: 'WNC',
      unit: 'MUMBAI',
      type_of_boat: '6.7 RIM',
      registration_no: '6.7_RIM-2020-jaimin',
      ber_for: 'HULL',
      ber_for_hull: 'BER',
      ber_for_engine: '0',
      dg: 'NA',
      remarks: 'kk'
    }
  ]);

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle command change to update units
    if (field === 'command') {
      handleCommandChange(value);
    }
    
    // Handle type of boat change to update registration numbers
    if (field === 'type_of_boat') {
      handleTypeOfBoatChange(value);
    }
    
    // Handle BER for change to show/hide hull/engine options
    if (field === 'ber_for') {
      handleBerForChange(value);
    }
  };

  // Handle command change
  const handleCommandChange = (commandValue) => {
    let newUnitOptions = [{ label: '--Select--', value: '0' }];
    
    if (commandValue === 'WNC') {
      newUnitOptions = [
        { label: '--Select--', value: '0' },
        { label: 'SATLEJ', value: 'SATLEJ' },
        { label: 'JAMUNA', value: 'JAMUNA' },
        { label: 'TARANGINI', value: 'TARANGINI' }
      ];
    } else if (commandValue === 'NHQ') {
      newUnitOptions = [
        { label: '--Select--', value: '0' },
        { label: 'MUMBAI', value: 'MUMBAI' },
        { label: 'CHENNAI', value: 'CHENNAI' },
        { label: 'jaimin', value: 'jaimin' }
      ];
    } else if (commandValue === 'ANC') {
      newUnitOptions = [
        { label: '--Select--', value: '0' },
        { label: 'RANVIR', value: 'RANVIR' },
        { label: 'CIRCARS', value: 'CIRCARS' },
        { label: 'FMU-V', value: 'FMU-V' }
      ];
    }
    
    setUnitOptions(newUnitOptions);
    setFormData(prev => ({ ...prev, unit: '0' }));
  };

  // Handle type of boat change
  const handleTypeOfBoatChange = (boatType) => {
    let newRegistrationOptions = [{ label: '--Select--', value: '0' }];
    
    if (boatType === '6.7 RIM') {
      newRegistrationOptions = [
        { label: '--Select--', value: '0' },
        { label: '6.7_RIM-2020-jaimin', value: '6.7_RIM-2020-jaimin' },
        { label: '6.7_RIM-2025-div', value: '6.7_RIM-2025-div' }
      ];
    } else if (boatType === 'dfgdg') {
      newRegistrationOptions = [
        { label: '--Select--', value: '0' },
        { label: 'dfgdg-001', value: 'dfgdg-001' }
      ];
    }
    
    setBoatRegistrationOptions(newRegistrationOptions);
    setFormData(prev => ({ ...prev, boat_registration_no: '0' }));
  };

  // Handle BER for change
  const handleBerForChange = (berForValue) => {
    if (berForValue === 'HULL') {
      setFormData(prev => ({ 
        ...prev, 
        ber_for_hull: '0',
        ber_for_engine: '0'
      }));
    } else if (berForValue === 'ENGINE') {
      setFormData(prev => ({ 
        ...prev, 
        ber_for_hull: '0',
        ber_for_engine: '0'
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        ber_for_hull: '0',
        ber_for_engine: '0'
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (field, event) => {
    const file = event.target.files[0];
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  // Validation
  const validateForm = () => {
    const requiredFields = [
      'initiated_by', 'command', 'unit', 'type_of_boat', 
      'boat_registration_no', 'ber_for', 'dg', 'remarks'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field] === '0') {
        toast.current.show({ 
          severity: 'error', 
          summary: 'Error', 
          detail: `Please fill in ${field.replace('_', ' ')}` 
        });
        return false;
      }
    }
    
    if (!formData.reference_authority) {
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Please upload Reference Authority file' 
      });
      return false;
    }
    
    if (!formData.digital_sign) {
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Please upload Digital Sign file' 
      });
      return false;
    }
    
    // Validate BER for specific fields
    if (formData.ber_for === 'HULL' && (!formData.ber_for_hull || formData.ber_for_hull === '0')) {
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Please select Hull option' 
      });
      return false;
    }
    
    if (formData.ber_for === 'ENGINE' && (!formData.ber_for_engine || formData.ber_for_engine === '0')) {
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Please select Engine option' 
      });
      return false;
    }
    
    return true;
  };

  // Handle save
  const handleSave = () => {
    if (validateForm()) {
      console.log('Form Data:', formData);
      toast.current.show({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'BER Certificate data saved successfully!' 
      });
    }
  };

  // Handle clear
  const handleClear = () => {
    setFormData({
      initiated_by: '',
      command: '0',
      unit: '0',
      reference_authority: null,
      type_of_boat: '0',
      boat_registration_no: '0',
      ber_for: '0',
      ber_for_hull: '0',
      ber_for_engine: '0',
      dg: '0',
      remarks: '',
      digital_sign: null
    });
    setUnitOptions([{ label: '--Select--', value: '0' }]);
    setBoatRegistrationOptions([{ label: '--Select--', value: '0' }]);
  };


  return (
    <div className="ber-certificate p-6">
      <Toast ref={toast} />
      
      {/* Page Header */}
      <div className="text-center mb-6 bg-[#c7d9f0] p-2">
        <h1 className="text-3xl font-bold text-gray-800">BER CERTIFICATE</h1>
      </div>

      {/* Main Form */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Row 1 */}
            <div className="space-y-2">
              <label htmlFor="initiated_by" className="block text-sm font-bold text-gray-700">
                Initiated By <span className="text-red-500">*</span>
              </label>
              <InputText
                id="initiated_by"
                value={formData.initiated_by}
                onChange={(e) => handleInputChange('initiated_by', e.target.value)}
                className="w-full h-12 border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="command" className="block text-sm font-bold text-gray-700">
                Command <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="command"
                value={formData.command}
                options={commandOptions}
                onChange={(e) => handleInputChange('command', e.value)}
                placeholder="--Select--"
                className="w-full h-12 border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="block text-sm font-bold text-gray-700">
                Unit <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="unit"
                value={formData.unit}
                options={unitOptions}
                onChange={(e) => handleInputChange('unit', e.value)}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reference_authority" className="block text-sm font-bold text-gray-700">
                Reference Authority <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="reference_authority"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('reference_authority', e)}
                  className="hidden"
                />
                <label 
                  htmlFor="reference_authority" 
                  className="block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm bg-white cursor-pointer hover:border-blue-500 transition-colors"
                >
                  Choose File
                </label>
                <span className="block text-xs text-gray-500 mt-1">
                  {formData.reference_authority ? formData.reference_authority.name : 'No file chosen'}
                </span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Row 2 */}
            <div className="space-y-2">
              <label htmlFor="type_of_boat" className="block text-sm font-bold text-gray-700">
                Type of Boat <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="type_of_boat"
                value={formData.type_of_boat}
                options={typeOfBoatOptions}
                onChange={(e) => handleInputChange('type_of_boat', e.value)}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="boat_registration_no" className="block text-sm font-bold text-gray-700">
                Boat Registration No. <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="boat_registration_no"
                value={formData.boat_registration_no}
                options={boatRegistrationOptions}
                onChange={(e) => handleInputChange('boat_registration_no', e.value)}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ber_for" className="block text-sm font-bold text-gray-700">
                BER for <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="ber_for"
                value={formData.ber_for}
                options={berForOptions}
                onChange={(e) => handleInputChange('ber_for', e.value)}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dg" className="block text-sm font-bold text-gray-700">
                DG <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="dg"
                value={formData.dg}
                options={dgOptions}
                onChange={(e) => handleInputChange('dg', e.value)}
                placeholder="--Select--"
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

          </div>

          {/* Conditional Fields Row */}
          {(formData.ber_for === 'HULL' || formData.ber_for === 'ENGINE') && (
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.ber_for === 'HULL' && (
                <div className="space-y-2">
                  <label htmlFor="ber_for_hull" className="block text-sm font-bold text-gray-700">
                    Hull <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="ber_for_hull"
                    value={formData.ber_for_hull}
                    options={hullOptions}
                    onChange={(e) => handleInputChange('ber_for_hull', e.value)}
                    placeholder="--Select--"
                    className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
              )}

              {formData.ber_for === 'ENGINE' && (
                <div className="space-y-2">
                  <label htmlFor="ber_for_engine" className="block text-sm font-bold text-gray-700">
                    Engine <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="ber_for_engine"
                    value={formData.ber_for_engine}
                    options={engineOptions}
                    onChange={(e) => handleInputChange('ber_for_engine', e.value)}
                    placeholder="--Select--"
                    className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Row 3 */}
            <div className="space-y-2">
              <label htmlFor="remarks" className="block text-sm font-bold text-gray-700">
                Remarks <span className="text-red-500">*</span>
              </label>
              <InputText
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                className="w-full h-12 border-2 border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="digital_sign" className="block text-sm font-bold text-gray-700">
                Digital Sign/Approved By <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="digital_sign"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('digital_sign', e)}
                  className="hidden"
                />
                <label 
                  htmlFor="digital_sign" 
                  className="block w-full h-12 px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm bg-white cursor-pointer hover:border-blue-500 transition-colors flex items-center"
                >
                  Choose File
                </label>
                <span className="block text-xs text-gray-500 mt-1">
                  {formData.digital_sign ? formData.digital_sign.name : 'No file chosen'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-2 border-t border-gray-300 bg-[#f1f7ff]">
          <div className="flex justify-center gap-3">
            <button 
              type="button" 
              className="px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              onClick={handleClear}
            >
              CLEAR
            </button>
            <button 
              type="button" 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>

       {/* Data Table Section */}
       <div className="border border-gray-300 rounded-lg shadow-sm">
         <style jsx>{`
           .ber-table .p-datatable-thead > tr > th {
             background-color: #1a2746 !important;
             color: white !important;
             border: 1px solid #0072a6 !important;
             border-right: 1px solid white !important;
             font-weight: bold;
           }
           .ber-table .p-datatable-thead > tr > th:last-child {
             border-right: 1px solid #0072a6 !important;
           }
           .ber-table .p-datatable-tbody > tr > td {
             border: 1px solid #dee2e6 !important;
           }
           .ber-table .p-datatable-tbody > tr:nth-child(even) {
             background-color: #f8f9fa !important;
           }
           .ber-table .p-datatable-header {
             background-color: #f8f9fa !important;
             border-bottom: 1px solid #dee2e6 !important;
             padding: 0.75rem !important;
           }
           .ber-table .p-datatable-header .p-inputtext {
             border: 1px solid #ced4da !important;
             border-radius: 0.375rem !important;
           }
         `}</style>
         <DataTable
           value={tableData}
           paginator
           rows={10}
           rowsPerPageOptions={[5, 10, 25]}
           emptyMessage="No data available in table"
           className="ber-table"
           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
           globalFilterFields={['initiated_by', 'command', 'unit', 'type_of_boat', 'registration_no', 'ber_for', 'ber_for_hull', 'ber_for_engine', 'dg', 'remarks']}
           header={
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-600">Search:</span>
                 <InputText
                   placeholder="Search"
                   className="w-64"
                   onInput={(e) => {
                     const target = e.target;
                     if (target.value) {
                       // Filter the table data based on search input
                       const filteredData = tableData.filter(row => 
                         Object.values(row).some(value => 
                           String(value).toLowerCase().includes(target.value.toLowerCase())
                         )
                       );
                       // You would typically update the table data state here
                       // For now, we'll just log the filtered results
                      //  console.log('Filtered data:', filteredData);
                     }
                   }}
                 />
               </div>
             </div>
           }
         >
          <Column field="sr_no" header="Sr No." style={{ width: '80px' }} />
          <Column field="initiated_by" header="Initiated By" />
          <Column field="command" header="Command" />
          <Column field="unit" header="Unit" />
          <Column field="type_of_boat" header="Type of Boat" />
          <Column field="registration_no" header="Registration No." />
          <Column field="ber_for" header="BER for" />
          <Column field="ber_for_hull" header="BER for Hull" />
          <Column field="ber_for_engine" header="BER for Engine" />
          <Column field="dg" header="DG" />
          <Column field="remarks" header="Remarks" />
          <Column 
            header="Action" 
            style={{ width: '120px' }}
            body={() => (
              <div className="flex gap-2">
                {/* Action buttons will be added here later */}
              </div>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default BerCertificate;
