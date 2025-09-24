import React from 'react';
import CommentorSheet from '../../components/CommentorSheet';
import PreliminaryUnderwaterHullInspectionReportForm from '../../components/forms/Pre_unde_Hull_inspe/PreliminaryUnderwaterHullInspectionReportForm';

const PreliminaryUnderwaterHullInspectionReport = () => {
  const handleFormSubmit = (formData: any) => {
    console.log('Preliminary Underwater Hull Inspection Form submitted:', formData);
    alert('Preliminary Underwater Hull Inspection Form data submitted! Check console for details.');
  };

  const handleAddComment = (comment: any) => {
    console.log('New comment added:', comment);
  };

  return (
    <CommentorSheet
      title="PRELIMINARY UNDERWATER HULL INSPECTION - INS"
      customForm={PreliminaryUnderwaterHullInspectionReportForm}
      onSubmit={handleFormSubmit}
      onAddComment={handleAddComment}
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