import React from 'react';
import { useNavigate } from 'react-router-dom';
import PreliminaryUnderwaterHullInspectionReportForm from '../../components/forms/Pre_unde_Hull_inspe/PreliminaryUnderwaterHullInspectionReportForm';

const PreliminaryUnderwaterHullInspectionReportAdd = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (formData: any) => {
    console.log('Preliminary Underwater Hull Inspection Form submitted:', formData);
    alert('Preliminary Underwater Hull Inspection Form data submitted! Check console for details.');
    
    // Navigate back to the table after successful submission
    navigate('/app/reports/preliminary-underwater-hull-inspection-report-page');
  };

  const handleBack = () => {
    navigate('/app/reports/preliminary-underwater-hull-inspection-report-page');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800  rounded-lg  border-2 bg-[#c7d9f0]"
          >
            <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Back to List
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-full mx-auto">
        
        <PreliminaryUnderwaterHullInspectionReportForm 
          mode="add"
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default PreliminaryUnderwaterHullInspectionReportAdd;
