import React from 'react';
import CommentorSheet from '../components/CommentorSheet';
import MaritimeDockingForm from './MaritimeDockingForm';

const IN379DockingReportSection1Report = () => {
  const handleFormSubmit = (formData: any) => {
    console.log('Maritime Docking Form submitted:', formData);
    alert('Maritime Docking Form data submitted! Check console for details.');
  };

  const handleAddComment = (comment: any) => {
    console.log('New comment added:', comment);
  };

  return (
    <CommentorSheet
      title="IN 379 - DOCKING REPORT SECTION -1"
      customForm={MaritimeDockingForm}
      onSubmit={handleFormSubmit}
      onAddComment={handleAddComment}
      comments={[
        {
          id: 1,
          avatar: "JD",
          author: "John Doe",
          date: "2024-01-15 10:30 AM",
          text: "Initial review of docking report completed. All sections appear to be properly filled.",
          likes: 2,
          replies: 0
        },
        {
          id: 2,
          avatar: "SM",
          author: "Sarah Miller",
          date: "2024-01-15 2:15 PM",
          text: "Please verify the draught measurements before final submission.",
          likes: 1,
          replies: 0
        }
      ]}
    />
  );
};

export default IN379DockingReportSection1Report;
