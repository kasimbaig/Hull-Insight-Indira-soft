import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentorSheet from '../../components/CommentorSheet';
import PreliminaryUnderwaterHullInspectionReportForm from '../../components/forms/Pre_unde_Hull_inspe/PreliminaryUnderwaterHullInspectionReportForm';
import { DynamicFormDialog } from '../../components/DynamicFormDialog';
import { useToast } from "@/hooks/use-toast";
import { post } from "@/lib/api";

const PreliminaryUnderwaterHullInspectionReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { record, mode } = location.state || {};
  const [isForwardDialogOpen, setIsForwardDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleForward = () => {
    setIsForwardDialogOpen(true);
  };

  const handleForwardSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const action = formData.action; // 'send' or 'reject'
      const remarks = formData.remarks || '';
      
      console.log('=== FORWARD SUBMIT DEBUG ===');
      console.log('Form Data:', formData);
      console.log('Form Data Keys:', Object.keys(formData));
      console.log('Action:', action);
      console.log('Action Type:', typeof action);
      console.log('Remarks:', remarks);
      console.log('Record:', record);
      
      // Extract vessel ID and transaction ID from record
      const vesselId = record?.vessel?.id;
      const transactionId = record?.id;
      
      console.log('Vessel ID:', vesselId);
      console.log('Transaction ID:', transactionId);
      
      if (!vesselId || !transactionId) {
        console.error('Missing vessel ID or transaction ID');
        throw new Error('Missing vessel ID or transaction ID');
      }
      
      // Determine status based on action
      const status = action === 'send' ? 1 : 2;
      console.log('Status:', status);
      
      // Prepare payload for approval API
      const approvalPayload = {
        vessel: vesselId,
        sub_module: 13, // Default sub_module as specified
        transaction_id: transactionId,
        status: status,
        message: remarks || (action === 'send' ? 'Approved after review' : 'Rejected after review')
      };
      
      console.log('Approval Payload:', approvalPayload);
      console.log('API Endpoint:', '/config/approval/');
      
      // Call approval API
      console.log('Making API call...');
      const response = await post('/config/approval/', approvalPayload);
      console.log('API Response:', response);
      
      if (action === 'send') {
        toast({
          title: "Success",
          description: "Record has been forwarded successfully",
        });
      } else if (action === 'reject') {
        toast({
          title: "Success",
          description: "Record has been rejected successfully",
        });
      }
      
      setIsForwardDialogOpen(false);
      // Navigate back to the list page after successful approval
      navigate('/app/reports/preliminary-underwater-hull-inspection-report-page');
    } catch (error) {
      console.error('Error processing forward action:', error);
      toast({
        title: "Error",
        description: "Failed to process action. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    <>
      <CommentorSheet
        title={getTitle()}
        customForm={PreliminaryUnderwaterHullInspectionReportForm}
        onSubmit={handleFormSubmit}
        onAddComment={handleAddComment}
        onBack={handleBack}
        onForward={handleForward}
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
      
      {/* Forward Dialog */}
      <DynamicFormDialog
        open={isForwardDialogOpen}
        onOpenChange={setIsForwardDialogOpen}
        title="Forward for Review"
        fields={[
          {
            name: "remarks",
            label: "Remarks",
            type: "editor",
            required: true,
            placeholder: "Enter your remarks here..."
          }
        ]}
        customButtons={[
          { label: "Send", action: "send", variant: "default" },
          { label: "Reject", action: "reject", variant: "destructive" }
        ]}
        onSubmit={handleForwardSubmit}
      />
    </>
  );
};

export default PreliminaryUnderwaterHullInspectionReport;