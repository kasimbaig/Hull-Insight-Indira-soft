import React from 'react';
import CommentorSheet, { Comment } from '@/components/CommentorSheet';

const FormComments = () => {
  const sampleComments: Comment[] = [
    {
      id: 1,
      avatar: 'JD',
      author: 'John Doe',
      date: 'August 15, 2023 at 2:45 PM',
      text: 'The new data entry form is much more intuitive than the previous version. I especially like the clear validation messages and the improved date picker.',
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      avatar: 'SM',
      author: 'Sarah Miller',
      date: 'August 14, 2023 at 9:30 AM',
      text: 'Could we add an option to export the form data as CSV? This would save me a lot of time in my weekly reporting.',
      likes: 8,
      replies: 1
    },
    {
      id: 3,
      avatar: 'RJ',
      author: 'Robert Johnson',
      date: 'August 13, 2023 at 4:15 PM',
      text: 'I\'ve noticed the form saves progress automatically now. Great feature! How long is the draft data stored before it expires?',
      likes: 15,
      replies: 2
    },
    {
      id: 4,
      avatar: 'EW',
      author: 'Emma Wilson',
      date: 'August 12, 2023 at 11:20 AM',
      text: 'The mobile responsiveness has improved significantly. I can now easily complete the form on my tablet without any formatting issues.',
      likes: 21,
      replies: 4
    }
  ];

  return (
    <CommentorSheet
      title="Commentor Sheet"
      comments={sampleComments}
      departments={["Sales", "Marketing", "Information Technology", "Human Resources", "Finance"]}
    />
  );
};

export default FormComments;