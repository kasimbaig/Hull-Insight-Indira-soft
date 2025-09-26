import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentorSheet from '../../components/CommentorSheet';
import PreliminaryUnderwaterHullInspectionReportForm from '../../components/forms/Pre_unde_Hull_inspe/PreliminaryUnderwaterHullInspectionReportForm';

const PreliminaryUnderwaterHullInspectionReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { record, mode } = location.state || {};

  // If no state is passed (direct navigation), redirect to table page
  React.useEffect(() => {
    if (!location.state) {
      navigate('/app/reports/preliminary-underwater-hull-inspection-report-page');
    }
  }, [location.state, navigate]);

  const handleFormSubmit = (formData: any) => {
    console.log('Preliminary Underwater Hull Inspection Form submitted:', formData);
    alert('Preliminary Underwater Hull Inspection Form data submitted! Check console for details.');
    
    // Navigate back to the table after successful submission
    navigate('/app/reports/preliminary-underwater-hull-inspection-report-page');
  };

  const handleAddComment = (comment: any) => {
    console.log('New comment added:', comment);
  };

  const handleBack = () => {
    navigate('/app/reports/preliminary-underwater-hull-inspection-report-page');
  };

  // Determine the title based on mode
  const getTitle = () => {
    if (mode === 'edit') {
      return `PRELIMINARY UNDERWATER HULL INSPECTION - INS (Edit: ${record?.ship || 'Record'})`;
    } else if (mode === 'view') {
      return `PRELIMINARY UNDERWATER HULL INSPECTION - INS (View: ${record?.ship || 'Record'})`;
    }
    return "PRELIMINARY UNDERWATER HULL INSPECTION - INS";
  };

  return (
    <CommentorSheet
      title={getTitle()}
      customForm={PreliminaryUnderwaterHullInspectionReportForm}
      onSubmit={handleFormSubmit}
      onAddComment={handleAddComment}
      onBack={handleBack}
      mode={mode}
      record={record}
      comments={[
        {
          id: 1,
          avatar: "MJ",
          author: "Michael Johnson",
          date: "2024-01-20 8:45 AM",
          text: "Initial preliminary inspection completed. Vessel appears to be in good condition with minimal marine growth observed. Recommend proceeding with detailed survey.",
          likes: 5,
          replies: 0
        },
        {
          id: 2,
          avatar: "LC",
          author: "Lisa Chen",
          date: "2024-01-20 11:30 AM",
          text: "Paint condition assessment shows some areas requiring attention. Boot top area shows signs of wear and may need repainting during this docking period.",
          likes: 3,
          replies: 1
        },
        {
          id: 3,
          avatar: "DR",
          author: "David Rodriguez",
          date: "2024-01-20 2:15 PM",
          text: "Structural inspection reveals minor dents on port side hull. These appear to be superficial and do not affect structural integrity. Recommend monitoring during next inspection.",
          likes: 4,
          replies: 0
        },
        {
          id: 4,
          avatar: "AS",
          author: "Anna Smith",
          date: "2024-01-20 4:00 PM",
          text: "Sonar dome inspection completed successfully. No cracks or damage detected. All underwater openings are clear and functioning properly.",
          likes: 2,
          replies: 0
        },
        {
          id: 5,
          avatar: "TW",
          author: "Thomas Wilson",
          date: "2024-01-21 9:15 AM",
          text: "Rust and corrosion assessment shows localized areas requiring treatment. Recommend applying protective coating to identified areas before undocking.",
          likes: 6,
          replies: 2
        }
      ]}
    />
  );
};

export default PreliminaryUnderwaterHullInspectionReport;