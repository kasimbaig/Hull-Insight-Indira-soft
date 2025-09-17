import React from 'react';
import CommentorSheet, { Comment } from '@/components/CommentorSheet';

const TTTest = () => {
  const indianComments: Comment[] = [
  {
    id: 1,
    avatar: 'RS',
    author: 'Rajesh Sharma',
    date: 'December 15, 2023 at 10:30 AM',
    text: 'This system is very useful for the Indian Navy. It greatly helps in the maintenance and upkeep of our ships.',
    likes: 25,
    replies: 8
  },
  {
    id: 2,
    avatar: 'PK',
    author: 'Priya Kumar',
    date: 'December 14, 2023 at 3:45 PM',
    text: 'The Hull Insight system has significantly improved our ship maintenance efficiency. The digital signature feature ensures data integrity and authenticity.',
    likes: 18,
    replies: 5
  },
  {
    id: 3,
    avatar: 'AS',
    author: 'Amit Singh',
    date: 'December 13, 2023 at 9:15 AM',
    text: 'I really liked this system. It makes our work easier and saves time. The QR code feature is excellent.',
    likes: 32,
    replies: 12
  },
  {
    id: 4,
    avatar: 'SK',
    author: 'Sunita Kapoor',
    date: 'December 12, 2023 at 2:20 PM',
    text: 'Excellent work on the user interface! The form validation is very helpful and the PDF export feature saves us a lot of time in documentation.',
    likes: 28,
    replies: 6
  },
  {
    id: 5,
    avatar: 'VM',
    author: 'Vikram Mehta',
    date: 'December 11, 2023 at 11:45 AM',
    text: 'After using this system in our dockyard, there has been a significant improvement in work quality. Great job!',
    likes: 35,
    replies: 9
  },
  {
    id: 6,
    avatar: 'NJ',
    author: 'Neha Joshi',
    date: 'December 10, 2023 at 4:30 PM',
    text: 'The system is very user-friendly and the mobile responsiveness is excellent. I can easily access it from my phone while on duty.',
    likes: 22,
    replies: 4
  }
];


  const indianDepartments = [
    "Indian Navy Operations",
    "Ship Maintenance",
    "Dockyard Management", 
    "Naval Engineering",
    "Quality Assurance",
    "Technical Services",
    "Administration",
    "Security & Safety"
  ];

  const handleFormSubmit = (formData: any) => {
    console.log('TTTest Form submitted:', formData);
    alert('Form data submitted successfully! Check console for details.');
  };

  const handleCommentAdd = (comment: Comment) => {
    console.log('New comment added:', comment);
    alert('Comment added successfully!');
  };

  return (
    <CommentorSheet
      title="TTTest - Indian Naval Operations"
      comments={indianComments}
      departments={indianDepartments}
      onSubmit={handleFormSubmit}
      onAddComment={handleCommentAdd}
      formFields={{
        showFirstName: true,
        showLastName: true,
        showEmail: true,
        showDepartment: true,
        showEmployeeId: true,
        showHireDate: true,
        showProject: true,
        showComments: true,
        showFile: true,
      }}
    />
  );
};

export default TTTest;

