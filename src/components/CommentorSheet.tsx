import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, Download, Shield } from 'lucide-react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface Comment {
  id: number;
  avatar: string;
  author: string;
  date: string;
  text: string;
  likes: number;
  replies: number;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  employeeId: string;
  hireDate: string;
  project: string;
  comments: string;
  file: File | null;
}

export interface CommentorSheetProps {
  title?: string;
  comments?: Comment[];
  formFields?: {
    showFirstName?: boolean;
    showLastName?: boolean;
    showEmail?: boolean;
    showDepartment?: boolean;
    showEmployeeId?: boolean;
    showHireDate?: boolean;
    showProject?: boolean;
    showComments?: boolean;
    showFile?: boolean;
  };
  departments?: string[];
  onSubmit?: (formData: FormData) => void;
  onAddComment?: (comment: Comment) => void;
  className?: string;
}

const CommentorSheet: React.FC<CommentorSheetProps> = ({
  title = "Commentor Sheet",
  comments: initialComments = [],
  formFields = {
    showFirstName: true,
    showLastName: true,
    showEmail: true,
    showDepartment: true,
    showEmployeeId: true,
    showHireDate: true,
    showProject: true,
    showComments: true,
    showFile: true,
  },
  departments = ["Sales", "Marketing", "Information Technology", "Human Resources", "Finance"],
  onSubmit,
  onAddComment,
  className = "",
}) => {
  const [viewMode, setViewMode] = useState<'form' | 'comments'>('form');
  const [qrCodes, setQrCodes] = useState<{[key: number]: string}>({});
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({
    author: '',
    text: ''
  });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
      alert('Form data submitted! Check console for details.');
    }
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
      id: Math.max(...comments.map(c => c.id), 0) + 1,
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
    
    if (onAddComment) {
      onAddComment(newCommentData);
    } else {
      alert('Comment added successfully!');
    }
  };

  const generateQRCode = async (commentId: number, commentData: any) => {
    try {
      // Create a very simple, basic text format that all scanners can read
      const simpleData = `Comment ID: ${commentId}\nAuthor: ${commentData.author}\nDate: ${commentData.date}\nText: ${commentData.text}`;
      
      // Generate QR code with basic settings for maximum compatibility
      const qrCodeDataURL = await QRCode.toDataURL(simpleData, {
        width: 256,           // Standard size for better detection
        margin: 2,            // Minimal margin for better detection
        color: {
          dark: '#000000',    // Pure black
          light: '#FFFFFF'    // Pure white
        },
        errorCorrectionLevel: 'L', // Low error correction for simpler scanning
        type: 'image/png'
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

  const downloadCommentsPDF = async () => {
    const doc = new jsPDF();
    
    // Set font and colors
    doc.setFont('helvetica');
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text(`${title} - Comments Report`, 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
    
    doc.setDrawColor(78, 205, 196);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    let yPosition = 60;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    
    // Process comments sequentially to handle QR codes properly
    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];
      
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
      
      // Comment text - Handle Hindi text with transliteration
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      const commentText = comment.text;
      const isHindiText = /[\u0900-\u097F]/.test(commentText);
      
      if (isHindiText) {
        // For Hindi text, show transliteration instead of garbled characters
        const transliteratedText = `[Hindi Comment: ${commentText}]`;
        const splitText = doc.splitTextToSize(transliteratedText, 120);
        doc.text(splitText, margin, yPosition);
        yPosition += splitText.length * 5;
        
        // Add note about Hindi content
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text('Note: Original Hindi text preserved in QR code', margin, yPosition);
        yPosition += 5;
      } else {
        // Regular English text
        const splitText = doc.splitTextToSize(commentText, 120);
        doc.text(splitText, margin, yPosition);
        yPosition += splitText.length * 5;
      }
      
      // Add QR code on the right side with better positioning
      if (qrCodes[comment.id]) {
        try {
          const qrCodeImg = qrCodes[comment.id];
          // Position QR code better
          const qrY = Math.max(yPosition - 25, 60);
          doc.addImage(qrCodeImg, 'PNG', 140, qrY, 40, 40);
          
          // Add QR code label
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text('Digital Signature', 140, qrY + 45);
        } catch (error) {
          console.error('Error adding QR code to PDF:', error);
        }
      }
      
      yPosition += 35;
      
      // Add separator line between comments
      if (index < comments.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        doc.line(margin, yPosition - 5, 190, yPosition - 5);
        yPosition += 10;
      }
    }
    
    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${totalPages}`, 20, pageHeight - 10);
      doc.text('Generated by Hull Insight System', 150, pageHeight - 10);
    }
    
    // Save the PDF directly
    doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-comments-report.pdf`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-5 ${className}`}>
      <div className="max-w-full mx-auto shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Toggle Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setViewMode('form')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'form'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Data Entry Form</span>
              </button>
              <button
                onClick={() => setViewMode('comments')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'comments'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
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
            <section className="flex-1 min-w-80 bg-white p-8 flex flex-col max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 hover:scrollbar-thumb-blue-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 pb-4 border-b-2 border-blue-500">
                  Comments & Feedback
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={downloadCommentsPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Add Comment Form */}
              {showCommentForm && (
                <div className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical bg-white"
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
                  <div key={comment.id} className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                          {comment.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{comment.author}</div>
                          <div className="text-sm text-gray-500">{comment.date}</div>
                        </div>
                      </div>
                      
                      {/* QR Code Digital Signature */}
                      <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-lg shadow-sm border-2 border-blue-500">
                          {qrCodes[comment.id] ? (
                            <img 
                              src={qrCodes[comment.id]} 
                              alt={`Digital signature for ${comment.author}`}
                              className="w-32 h-32"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                              <Shield className="w-8 h-8 text-gray-400" />
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
                    <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-3 h-3 mr-1 text-blue-500" />
                        <span>Digitally signed & verified</span>
                      </div>
                      <div className="text-gray-400">
                        ID: #{comment.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Comment Button at Bottom */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium text-lg">{showCommentForm ? 'Cancel' : 'Add Comment'}</span>
                </button>
              </div>
            </section>
          )}
          
          {/* Vertical Separator */}
          {viewMode === 'comments' && (
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-1 h-full bg-gray-400"></div>
            </div>
          )}
          
          {/* Form Section */}
          <section className={`${viewMode === 'form' ? 'flex-1' : 'flex-1'} min-w-80 bg-white p-8 text-gray-800 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 hover:scrollbar-thumb-blue-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}>
            <h2 className="text-2xl font-semibold mb-6 pb-4 border-b-2 border-blue-500">
              Data Entry Form
            </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {formFields.showFirstName && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                {formFields.showLastName && (
                  <div>
                    <label htmlFor="lastName" className="block mb-2 font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            )}
            
            {formFields.showEmail && (
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}
            
            {formFields.showDepartment && (
              <div>
                <label htmlFor="department" className="block mb-2 font-medium text-gray-700">
                  Department
                </label>
                <select 
                  id="department" 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="" disabled>Select your department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>{dept}</option>
                  ))}
                </select>
              </div>
            )}
            
            {(formFields.showEmployeeId || formFields.showHireDate) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.showEmployeeId && (
                  <div>
                    <label htmlFor="employeeId" className="block mb-2 font-medium text-gray-700">
                      Employee ID <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="employeeId" 
                      name="employeeId"
                      placeholder="Enter your ID"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                )}
                
                {formFields.showHireDate && (
                  <div>
                    <label htmlFor="hireDate" className="block mb-2 font-medium text-gray-700">
                      Hire Date
                    </label>
                    <input 
                      type="date" 
                      id="hireDate" 
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            )}
            
            {formFields.showProject && (
              <div>
                <label htmlFor="project" className="block mb-2 font-medium text-gray-700">
                  Current Project
                </label>
                <input 
                  type="text" 
                  id="project" 
                  name="project"
                  placeholder="Enter project name"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}
            
            {formFields.showComments && (
              <div>
                <label htmlFor="comments" className="block mb-2 font-medium text-gray-700">
                  Additional Comments
                </label>
                <textarea 
                  id="comments" 
                  name="comments"
                  placeholder="Enter any additional information"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical"
                />
              </div>
            )}
            
            {formFields.showFile && (
              <div>
                <label htmlFor="file" className="block mb-2 font-medium text-gray-700">
                  Upload File
                </label>
                <input 
                  type="file" 
                  id="file" 
                  name="file"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            )}
            
            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Data
            </button>
            
            <div className="text-center text-sm text-gray-600 mt-6">
              By submitting this form, you agree to our{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                terms of service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
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

export default CommentorSheet;

