import React from 'react';
import CommentorSheet from '../components/CommentorSheet';
import ParticularsUnderwaterHullSurveyByYard from './ParticularsUnderwaterHullSurveyByYard';

const ParticularsUnderwaterHullSurveyByYardReport = () => {
  const handleFormSubmit = (formData: any) => {
    console.log('Particulars Underwater Hull Survey By Yard Form submitted:', formData);
    alert('Particulars Underwater Hull Survey By Yard Form data submitted! Check console for details.');
  };

  const handleAddComment = (comment: any) => {
    console.log('New comment added:', comment);
  };

  return (
    <CommentorSheet
      title="PARTICULARS OF UNDERWATER HULL SURVEY BY YARD"
      customForm={ParticularsUnderwaterHullSurveyByYard}
      onSubmit={handleFormSubmit}
      onAddComment={handleAddComment}
      comments={[
        {
          id: 1,
          avatar: "JD",
          author: "John Doe",
          date: "2024-01-15 10:30 AM",
          text: "Initial review of underwater hull survey completed. All sections appear to be properly filled with accurate measurements.",
          likes: 3,
          replies: 0
        },
        {
          id: 2,
          avatar: "SM",
          author: "Sarah Miller",
          date: "2024-01-15 2:15 PM",
          text: "Please verify the underwater hull measurements and ensure all corrosion assessments are documented properly.",
          likes: 1,
          replies: 0
        },
        {
          id: 3,
          avatar: "RK",
          author: "Robert Kim",
          date: "2024-01-16 9:45 AM",
          text: "Survey data looks comprehensive. Consider adding more details about the hull material condition in Part II.",
          likes: 2,
          replies: 1
        }
      ]}
    />
  );
};

export default ParticularsUnderwaterHullSurveyByYardReport;
