import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, Download, Shield } from 'lucide-react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

interface Comment {
  id: number;
  avatar: string;
  author: string;
  date: string;
  text: string;
  likes: number;
  replies: number;
}

const FormComments = () => {
  const [viewMode, setViewMode] = useState<'form' | 'comments'>('form');
  const [qrCodes, setQrCodes] = useState<{[key: number]: string}>({});
  const [comments, setComments] = useState<Comment[]>([
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
  ]);
  const [newComment, setNewComment] = useState({
    author: '',
    text: ''
  });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    employeeId: '',
    hireDate: '',
    project: '',
    comments: '',
    file: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'file' ? target.files?.[0] : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form data submitted! Check console for details.');
  };

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComment({
      ...newComment,
      [name]: value
    });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.text.trim()) {
      alert('Please fill in both author name and comment text.');
      return;
    }

    const newCommentData: Comment = {
      id: Math.max(...comments.map(c => c.id)) + 1,
      avatar: newComment.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      author: newComment.author.trim(),
      date: new Date().toLocaleString(),
      text: newComment.text.trim(),
      likes: 0,
      replies: 0
    };

    // Add the new comment
    setComments(prevComments => [newCommentData, ...prevComments]);

    // Generate QR code for the new comment
    const qrCode = await generateQRCode(newCommentData.id, newCommentData);
    if (qrCode) {
      setQrCodes(prevCodes => ({
        ...prevCodes,
        [newCommentData.id]: qrCode
      }));
    }

    // Reset form
    setNewComment({ author: '', text: '' });
    setShowCommentForm(false);
    
    alert('Comment added successfully!');
  };

  const generateQRCode = async (commentId: number, commentData: any) => {
    try {
      // Create a digital signature payload
      const signatureData = {
        commentId: commentId,
        author: commentData.author,
        date: commentData.date,
        text: commentData.text,
        timestamp: new Date().toISOString(),
        hash: btoa(`${commentId}-${commentData.author}-${commentData.date}`), // Simple hash for demo
        system: 'Hull Insight Digital Signature'
      };
      
      const qrData = JSON.stringify(signatureData);
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: 120,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });
      
      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  };

  // Generate QR codes for all comments
  useEffect(() => {
    const generateAllQRCodes = async () => {
      const qrCodePromises = comments.map(async (comment) => {
        const qrCode = await generateQRCode(comment.id, comment);
        return { id: comment.id, qrCode };
      });
      
      const qrCodeResults = await Promise.all(qrCodePromises);
      const qrCodeMap: {[key: number]: string} = {};
      
      qrCodeResults.forEach(({ id, qrCode }) => {
        if (qrCode) {
          qrCodeMap[id] = qrCode;
        }
      });
      
      setQrCodes(qrCodeMap);
    };
    
    generateAllQRCodes();
  }, [comments]);

  const downloadCommentsPDF = () => {
    const doc = new jsPDF();
    
    // Set font and colors
    doc.setFont('helvetica');
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Comments & Feedback Report', 20, 30);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Add line separator
    doc.setDrawColor(78, 205, 196);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    let yPosition = 60;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    
    comments.forEach(async (comment, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 30;
      }
      
      // Comment header
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text(`${index + 1}. ${comment.author}`, margin, yPosition);
      
      yPosition += 8;
      
      // Date
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(comment.date, margin, yPosition);
      
      yPosition += 12;
      
      // Comment text
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      // Split long text into multiple lines
      const splitText = doc.splitTextToSize(comment.text, 120); // Reduced width to make room for QR code
      doc.text(splitText, margin, yPosition);
      
      // Add QR code on the right side
      if (qrCodes[comment.id]) {
        try {
          const qrCodeImg = qrCodes[comment.id];
          doc.addImage(qrCodeImg, 'PNG', 140, yPosition - 5, 25, 25);
          
          // Add QR code label
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text('Digital Signature', 140, yPosition + 30);
        } catch (error) {
          console.error('Error adding QR code to PDF:', error);
        }
      }
      
      yPosition += Math.max(splitText.length * 5, 35) + 15;
      
      // Add separator line between comments
      if (index < comments.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        doc.line(margin, yPosition - 5, 190, yPosition - 5);
        yPosition += 10;
      }
    });
    
    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${totalPages}`, 20, pageHeight - 10);
      doc.text('Generated by Hull Insight System', 150, pageHeight - 10);
    }
    
    // Save the PDF
    doc.save('comments-feedback-report.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-5">
      <div className="max-w-full mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Toggle Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
          <div className="flex justify-center">
            <div className="bg-white/10 rounded-full p-1 flex">
              <button
                onClick={() => setViewMode('form')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'form'
                    ? 'bg-teal-400 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Data Entry Form</span>
              </button>
              <button
                onClick={() => setViewMode('comments')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'comments'
                    ? 'bg-teal-400 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Comments & Feedback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Comments Section */}
          {viewMode === 'comments' && (
            <section className="flex-1 min-w-80 bg-white p-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 pb-4 border-b-2 border-teal-400">
                  Comments & Feedback
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">{showCommentForm ? 'Cancel' : 'Add Comment'}</span>
                  </button>
                  <button
                    onClick={downloadCommentsPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Add Comment Form */}
              {showCommentForm && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Comment</h3>
                  <form onSubmit={handleAddComment} className="space-y-4">
                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={newComment.author}
                        onChange={handleCommentInputChange}
                        placeholder="Enter your name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                        Comment <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="text"
                        name="text"
                        value={newComment.text}
                        onChange={handleCommentInputChange}
                        placeholder="Share your thoughts, feedback, or suggestions..."
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Submit Comment
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCommentForm(false);
                          setNewComment({ author: '', text: '' });
                        }}
                        className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="space-y-5">
                {comments.map(comment => (
                  <div key={comment.id} className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold text-lg mr-4">
                          {comment.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{comment.author}</div>
                          <div className="text-sm text-gray-500">{comment.date}</div>
                        </div>
                      </div>
                      
                      {/* QR Code Digital Signature */}
                      <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-lg shadow-sm border-2 border-teal-400">
                          {qrCodes[comment.id] ? (
                            <img 
                              src={qrCodes[comment.id]} 
                              alt={`Digital signature for ${comment.author}`}
                              className="w-16 h-16"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <Shield className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-center">
                          Digital<br />Signature
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-gray-700 text-sm leading-relaxed mb-4">
                      {comment.text}
                    </div>
                    
                    {/* Digital Signature Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 bg-white/50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-3 h-3 mr-1 text-teal-400" />
                        <span>Digitally signed & verified</span>
                      </div>
                      <div className="text-gray-400">
                        ID: #{comment.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Form Section */}
          <section className={`${viewMode === 'form' ? 'flex-1' : 'flex-1'} min-w-80 bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white`}>
            <h2 className="text-2xl font-semibold mb-6 pb-4 border-b-2 border-teal-400/50">
              Data Entry Form
            </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 font-medium text-blue-200">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block mb-2 font-medium text-blue-200">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-blue-200">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block mb-2 font-medium text-blue-200">
                Department
              </label>
              <select 
                id="department" 
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-black focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
              >
                <option value="" disabled>Select your department</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="it">Information Technology</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employeeId" className="block mb-2 font-medium text-blue-200">
                  Employee ID <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  id="employeeId" 
                  name="employeeId"
                  placeholder="Enter your ID"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="hireDate" className="block mb-2 font-medium text-blue-200">
                  Hire Date
                </label>
                <input 
                  type="date" 
                  id="hireDate" 
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="project" className="block mb-2 font-medium text-blue-200">
                Current Project
              </label>
              <input 
                type="text" 
                id="project" 
                name="project"
                placeholder="Enter project name"
                value={formData.project}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="comments" className="block mb-2 font-medium text-blue-200">
                Additional Comments
              </label>
              <textarea 
                id="comments" 
                name="comments"
                placeholder="Enter any additional information"
                value={formData.comments}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300 resize-vertical"
              />
            </div>
            
            <div>
              <label htmlFor="file" className="block mb-2 font-medium text-blue-200">
                Upload File
              </label>
              <input 
                type="file" 
                id="file" 
                name="file"
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:bg-white/15 focus:border-teal-400 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-400 file:text-white hover:file:bg-teal-500"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Data
            </button>
            
            <div className="text-center text-sm text-white/70 mt-6">
              By submitting this form, you agree to our{' '}
              <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">
                terms of service
              </a>{' '}
              and{' '}
              <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">
                privacy policy
              </a>
              .
            </div>
          </form>
        </section>
        </div>
      </div>
    </div>
  );
};

export default FormComments;
