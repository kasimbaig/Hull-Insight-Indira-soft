import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteDialog from "@/components/ui/delete-dialog";
import { useDeleteDialog } from "@/hooks/use-delete-dialog";

interface FormData {
  // Header
  insName: string;
  inspectionDate: string;
  authority: string;
  vesselId: string;
  vesselName: string;
  
  // Docking
  dockingVersion: string;
  natureOfDocking: string;
  dockBlocksWedged: number;
  dockBlocksCrushed: number;
  uwOpeningsClear: string;
  dockingDuration: string;
  
  // Underwater Cleaning
  marineGrowthRows: number;
  foreignObjectsRows: number;
  marineGrowthData: Array<{ observation: string; remarks: string }>;
  foreignObjectsData: Array<{ observation: string; remarks: string }>;
  
  // Painting
  outerBottomRows: number;
  sternAftRows: number;
  bootTopRows: number;
  ruddersRows: number;
  stabilizersRows: number;
  dockBlockRows: number;
  otherObservationsRows: number;
  paintSchemeRows: number;
  outerBottomData: Array<{ observation: string; remarks: string }>;
  sternAftData: Array<{ observation: string; remarks: string }>;
  bootTopData: Array<{ observation: string; remarks: string }>;
  ruddersData: Array<{ observation: string; remarks: string }>;
  stabilizersData: Array<{ observation: string; remarks: string }>;
  dockBlockData: Array<{ observation: string; remarks: string }>;
  otherObservationsData: Array<{ observation: string; remarks: string }>;
  paintSchemeData: Array<{ observation: string; remarks: string }>;
  
  // Rusting & Corrosion
  rustCorrosionAreasRows: number;
  rustGeneralOuterBottomRows: number;
  rustBootTopRows: number;
  rustSternAftRows: number;
  rustRuddersRows: number;
  rustBilgeKeelRows: number;
  rustDockBlockRows: number;
  rustOtherObservationsRows: number;
  rustCorrosionAreasData: Array<{ observation: string; remarks: string }>;
  rustGeneralOuterBottomData: Array<{ observation: string; remarks: string }>;
  rustBootTopData: Array<{ observation: string; remarks: string }>;
  rustSternAftData: Array<{ observation: string; remarks: string }>;
  rustRuddersData: Array<{ observation: string; remarks: string }>;
  rustBilgeKeelData: Array<{ observation: string; remarks: string }>;
  rustDockBlockData: Array<{ observation: string; remarks: string }>;
  rustOtherObservationsData: Array<{ observation: string; remarks: string }>;
  
  // Structure
  extentOfHullSurvey: string;
  structureHullSurveyRows: number;
  structureDentsRows: number;
  structureCracksRows: number;
  structureScratchRows: number;
  structureHolesRows: number;
  structureOtherObservationsRows: number;
  structureDefectsRows: number;
  structureStabilizersRows: number;
  structureHullSurveyData: Array<{ observation: string; remarks: string }>;
  structureDentsData: Array<{ observation: string; remarks: string }>;
  structureCracksData: Array<{ observation: string; remarks: string }>;
  structureScratchData: Array<{ observation: string; remarks: string }>;
  structureHolesData: Array<{ observation: string; remarks: string }>;
  structureOtherObservationsData: Array<{ observation: string; remarks: string }>;
  structureDefectsData: Array<{ observation: string; remarks: string }>;
  structureStabilizersData: Array<{ observation: string; remarks: string }>;
  
  // Sonar Dome
  sonarDomeCleanShipObservation: string;
  sonarDomeCleanShipRemarks: string;
  sonarDomeCracksObservation: string;
  sonarDomeCracksRemarks: string;
  sonarDomeGrpObservation: string;
  sonarDomeGrpRemarks: string;
  sonarDomeFairingObservation: string;
  sonarDomeFairingRemarks: string;
  
  // Cathodic Protection System
  cathodicProtectionIccpServiceability: string;
  cathodicProtectionIccpServiceabilityRemarks: string;
  cathodicProtectionSacrificialAnodes: string;
  cathodicProtectionSacrificialAnodesRemarks: string;
  cathodicProtectionIccpAnodes: string;
  cathodicProtectionIccpAnodesRemarks: string;
  cathodicProtectionIccpReferenceElectrode: string;
  cathodicProtectionIccpReferenceElectrodeRemarks: string;
  cathodicProtectionDielectricShields: string;
  cathodicProtectionDielectricShieldsRemarks: string;
  cathodicProtectionPreDockingChecks: string;
  cathodicProtectionPreDockingChecksRemarks: string;
  
  // Rudder
  rudderCracksDentsRows: number;
  rudderMisalignmentRows: number;
  rudderCracksDentsData: Array<{ observation: string; remarks: string }>;
  rudderMisalignmentData: Array<{ observation: string; remarks: string }>;
  
  // Propellers
  propellerCleaningRows: number;
  propellerEdgesRows: number;
  propellerHubsRows: number;
  propellerPittingRows: number;
  propellerEpoxyCoatingRows: number;
  propellerCleaningData: Array<{ observation: string; remarks: string }>;
  propellerEdgesData: Array<{ observation: string; remarks: string }>;
  propellerHubsData: Array<{ observation: string; remarks: string }>;
  propellerPittingData: Array<{ observation: string; remarks: string }>;
  propellerEpoxyCoatingData: Array<{ observation: string; remarks: string }>;
  
  // Miscellaneous
  miscellaneousEddyConeRows: number;
  miscellaneousWaterSeepageRows: number;
  miscellaneousMissingPartsRows: number;
  miscellaneousBlankingRows: number;
  miscellaneousScupperLipsRows: number;
  miscellaneousAralditeFairingRows: number;
  miscellaneousAngleOfListRows: number;
  miscellaneousEddyConeData: Array<{ observation: string; remarks: string }>;
  miscellaneousWaterSeepageData: Array<{ observation: string; remarks: string }>;
  miscellaneousMissingPartsData: Array<{ observation: string; remarks: string }>;
  miscellaneousBlankingData: Array<{ observation: string; remarks: string }>;
  miscellaneousScupperLipsData: Array<{ observation: string; remarks: string }>;
  miscellaneousAralditeFairingData: Array<{ observation: string; remarks: string }>;
  miscellaneousAngleOfListData: Array<{ observation: string; remarks: string }>;
  
  // Other Observations
  otherObservationsRows: number;
  otherObservationsData: Array<{ observation: string; remarks: string }>;
  
  // Signatures
  shipStaffSignature: File | null;
  refittingAuthSignature: File | null;
  hituInspectorSignature: File | null;
}

interface PreliminaryFormActionsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isDraftModalOpen: boolean;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSavingDraft: boolean;
  isLoadingDrafts: boolean;
  apiDrafts: any[];
  editingRecord: any;
  onFetchDrafts: () => void;
  onSaveDraft: () => void;
  onClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onEdit: (record: any) => void;
  onDelete: (id: number) => void;
}

const PreliminaryFormActions: React.FC<PreliminaryFormActionsProps> = ({
  formData,
  setFormData,
  isDraftModalOpen,
  setIsDraftModalOpen,
  isSavingDraft,
  isLoadingDrafts,
  apiDrafts,
  editingRecord,
  onFetchDrafts,
  onSaveDraft,
  onClear,
  onSubmit,
  onEdit,
  onDelete
}) => {
  // Delete dialog hook
  const deleteDialog = useDeleteDialog({
    onConfirm: async (itemId) => {
      if (itemId) {
        await onDelete(itemId as number);
      }
    },
    title: "Delete Record",
    description: "Are you sure you want to delete this record? This action cannot be undone.",
    confirmText: "Delete Record",
    cancelText: "Cancel"
  });
  return (
    <>
      {/* Form Action Buttons */}
      <div className="bg-white p-6 mt-8">
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="px-6 py-2 bg-blue-400 text-white font-bold rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onFetchDrafts}
            disabled={isLoadingDrafts}
          >
            {isLoadingDrafts ? 'Loading...' : 'Fetch Drafts'}
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSaveDraft}
            disabled={isSavingDraft}
          >
            {isSavingDraft ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-600 transition-colors"
          >
            {editingRecord ? 'Update' : 'Save'}
          </button>
        </div>
      </div>

      {/* Drafts Modal */}
      <Dialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <DialogContent className="max-w-4xl shadow-xl border-0 bg-white p-0 rounded-1xl">
          <DialogHeader className="bg-gradient-to-r from-[#1a2746] to-[#223366] p-4 text-white">
            <DialogTitle className="text-lg font-semibold">Draft Data</DialogTitle>
          </DialogHeader>
          
          {/* Custom Close Button */}
          {/* <button
            onClick={() => setIsDraftModalOpen(false)}
            className="absolute right-4 top-4 bg-red-300 hover:bg-red-400 text-white rounded-sm p-1 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
          
          <div className="space-y-4 p-4">
            {apiDrafts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No drafts found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#1a2746] text-white">
                    <TableHead className="text-white font-bold">Sr No.</TableHead>
                    <TableHead className="text-white font-bold">INS</TableHead>
                    <TableHead className="text-white font-bold">Address</TableHead>
                    <TableHead className="text-white font-bold">Created Date</TableHead>
                    <TableHead className="text-white font-bold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiDrafts.map((draft, index) => (
                    <TableRow key={draft.id} className={index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{draft.vessel?.name || 'N/A'}</TableCell>
                      <TableCell>{draft.auth_inspection || 'No Date Provided'}</TableCell>
                      <TableCell>{new Date(draft.created_on).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(draft)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteDialog.openDialog({ 
                              id: draft.id, 
                              name: `Record ${draft.id}` 
                            })}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="flex justify-end gap-3 p-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsDraftModalOpen(false)}
              className="rounded-lg"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.closeDialog}
        onConfirm={deleteDialog.handleConfirm}
        title={deleteDialog.title}
        description={deleteDialog.description}
        itemName={deleteDialog.itemToDelete?.name}
        isLoading={deleteDialog.isLoading}
        confirmText={deleteDialog.confirmText}
        cancelText={deleteDialog.cancelText}
      />
    </>
  );
};

export default PreliminaryFormActions;
