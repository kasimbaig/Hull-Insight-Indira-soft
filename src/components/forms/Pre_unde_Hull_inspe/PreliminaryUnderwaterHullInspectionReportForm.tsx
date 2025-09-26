import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { post, get } from "@/lib/api";
import PreliminaryFormContent from "./PreliminaryFormContent";
import PreliminaryFormActions from "./PreliminaryFormActions";
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
  paintSchemeRows: number;
  outerBottomData: Array<{ observation: string; remarks: string }>;
  sternAftData: Array<{ observation: string; remarks: string }>;
  bootTopData: Array<{ observation: string; remarks: string }>;
  ruddersData: Array<{ observation: string; remarks: string }>;
  stabilizersData: Array<{ observation: string; remarks: string }>;
  dockBlockData: Array<{ observation: string; remarks: string }>;
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

interface PreliminaryUnderwaterHullInspectionReportFormProps {
  mode?: 'add' | 'edit' | 'view';
  record?: any;
  onSubmit?: (formData: any) => void;
}

const PreliminaryUnderwaterHullInspectionReportForm: React.FC<PreliminaryUnderwaterHullInspectionReportFormProps> = ({ 
  mode = 'add', 
  record,
  onSubmit: externalOnSubmit
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Header
    insName: "",
    inspectionDate: "",
    authority: "",
    vesselId: "",
    vesselName: "",
    
    // Docking
    dockingVersion: "",
    natureOfDocking: "",
    dockBlocksWedged: 0,
    dockBlocksCrushed: 0,
    uwOpeningsClear: "",
    dockingDuration: "",
    
    // Underwater Cleaning
    marineGrowthRows: 0,
    foreignObjectsRows: 0,
    marineGrowthData: [],
    foreignObjectsData: [],
    
    // Painting
    outerBottomRows: 0,
    sternAftRows: 0,
    bootTopRows: 0,
    ruddersRows: 0,
    stabilizersRows: 0,
    dockBlockRows: 0,
    paintSchemeRows: 0,
    outerBottomData: [],
    sternAftData: [],
    bootTopData: [],
    ruddersData: [],
    stabilizersData: [],
    dockBlockData: [],
    paintSchemeData: [],
    
    // Rusting & Corrosion
    rustCorrosionAreasRows: 0,
    rustGeneralOuterBottomRows: 0,
    rustBootTopRows: 0,
    rustSternAftRows: 0,
    rustRuddersRows: 0,
    rustBilgeKeelRows: 0,
    rustDockBlockRows: 0,
    rustOtherObservationsRows: 0,
    rustCorrosionAreasData: [],
    rustGeneralOuterBottomData: [],
    rustBootTopData: [],
    rustSternAftData: [],
    rustRuddersData: [],
    rustBilgeKeelData: [],
    rustDockBlockData: [],
    rustOtherObservationsData: [],
    
    // Structure
    extentOfHullSurvey: "",
    structureHullSurveyRows: 0,
    structureDentsRows: 0,
    structureCracksRows: 0,
    structureScratchRows: 0,
    structureHolesRows: 0,
    structureOtherObservationsRows: 0,
    structureDefectsRows: 0,
    structureStabilizersRows: 0,
    structureHullSurveyData: [],
    structureDentsData: [],
    structureCracksData: [],
    structureScratchData: [],
    structureHolesData: [],
    structureOtherObservationsData: [],
    structureDefectsData: [],
    structureStabilizersData: [],
    
    // Sonar Dome
    sonarDomeCleanShipObservation: "",
    sonarDomeCleanShipRemarks: "",
    sonarDomeCracksObservation: "",
    sonarDomeCracksRemarks: "",
    sonarDomeGrpObservation: "",
    sonarDomeGrpRemarks: "",
    sonarDomeFairingObservation: "",
    sonarDomeFairingRemarks: "",
    
    // Cathodic Protection System
    cathodicProtectionIccpServiceability: "",
    cathodicProtectionIccpServiceabilityRemarks: "",
    cathodicProtectionSacrificialAnodes: "",
    cathodicProtectionSacrificialAnodesRemarks: "",
    cathodicProtectionIccpAnodes: "",
    cathodicProtectionIccpAnodesRemarks: "",
    cathodicProtectionIccpReferenceElectrode: "",
    cathodicProtectionIccpReferenceElectrodeRemarks: "",
    cathodicProtectionDielectricShields: "",
    cathodicProtectionDielectricShieldsRemarks: "",
    cathodicProtectionPreDockingChecks: "",
    cathodicProtectionPreDockingChecksRemarks: "",
    
    // Rudder
    rudderCracksDentsRows: 0,
    rudderMisalignmentRows: 0,
    rudderCracksDentsData: [],
    rudderMisalignmentData: [],
    
    // Propellers
    propellerCleaningRows: 0,
    propellerEdgesRows: 0,
    propellerHubsRows: 0,
    propellerPittingRows: 0,
    propellerEpoxyCoatingRows: 0,
    propellerCleaningData: [],
    propellerEdgesData: [],
    propellerHubsData: [],
    propellerPittingData: [],
    propellerEpoxyCoatingData: [],
    
    // Miscellaneous
    miscellaneousEddyConeRows: 0,
    miscellaneousWaterSeepageRows: 0,
    miscellaneousMissingPartsRows: 0,
    miscellaneousBlankingRows: 0,
    miscellaneousScupperLipsRows: 0,
    miscellaneousAralditeFairingRows: 0,
    miscellaneousAngleOfListRows: 0,
    miscellaneousEddyConeData: [],
    miscellaneousWaterSeepageData: [],
    miscellaneousMissingPartsData: [],
    miscellaneousBlankingData: [],
    miscellaneousScupperLipsData: [],
    miscellaneousAralditeFairingData: [],
    miscellaneousAngleOfListData: [],
    
    // Other Observations
    otherObservationsRows: 0,
    otherObservationsData: [],
    
    // Signatures
    shipStaffSignature: null,
    refittingAuthSignature: null,
    hituInspectorSignature: null,
  });

  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [apiDrafts, setApiDrafts] = useState<any[]>([]);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // Delete dialog hook
  const deleteDialog = useDeleteDialog({
    onConfirm: async (itemId) => {
      if (itemId) {
        await handleDelete(itemId as number);
      }
    },
    title: "Delete Record",
    description: "Are you sure you want to delete this record? This action cannot be undone.",
    confirmText: "Delete Record",
    cancelText: "Cancel"
  });

  // Auto-populate form when record is provided (edit mode)
  useEffect(() => {
    if (record && (mode === 'edit' || mode === 'view')) {
      console.log('useEffect triggered for record:', record);
      setIsEditMode(true);
      // Convert API date format from "2025-09-17" to "dd-MM-yyyy"
      const convertDateFormat = (apiDate: string) => {
        if (!apiDate) return '';
        const date = new Date(apiDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      // Map docking version from API format to display format
      const mapDockingVersion = (apiVersion: string) => {
        switch (apiVersion) {
          case 'v1': return 'Version 1';
          case 'v2': return 'Version 2';
          case 'v3': return 'Version 3';
          default: return 'Version 1';
        }
      };

      // Map boolean to string for uwOpeningsClear
      const mapUwOpeningsClear = (value: boolean) => {
        return value ? 'Yes' : 'No';
      };

      setFormData(prev => {
        const newFormData = {
          ...prev,
          // Header fields
          insName: record.vessel?.name || '',
          inspectionDate: convertDateFormat(record.dt_inspection),
          authority: record.auth_inspection || '',
          vesselId: record.vessel?.id?.toString() || '',
          vesselName: record.vessel?.name || '',
        
        // Docking fields
        dockingVersion: mapDockingVersion(record.docking_version),
        natureOfDocking: record.nature_of_docking || '',
        dockBlocksWedged: record.no_of_dock_blocks_wedged || 0,
        dockBlocksCrushed: record.no_of_dock_blocks_crushed || 0,
        uwOpeningsClear: mapUwOpeningsClear(record.uw_openings_clear),
        dockingDuration: record.duration_of_docking || ''
        };
        
        console.log('Setting form data with vesselId:', newFormData.vesselId);
        console.log('Setting form data with vesselName:', newFormData.vesselName);
        return newFormData;
      });

      // Debug logging
      console.log('Auto-populating form with record:', record);
      console.log('Vessel ID being set:', record.vessel?.id?.toString());
      console.log('Vessel Name being set:', record.vessel?.name);
      console.log('Vessel object:', record.vessel);

      // Set the editing record
      setEditingRecord(record);
    }
  }, [record, mode]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    console.log(`handleInputChange called: ${field} = ${value}`);
    
    // Prevent clearing vessel data in edit mode
    if (isEditMode && field === 'vesselId' && !value) {
      console.log('Preventing vesselId clear in edit mode');
      return;
    }
    
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If this is a row count field, adjust the corresponding data array
      if (field.toString().endsWith('Rows')) {
        const dataFieldName = field.toString().replace('Rows', 'Data') as keyof FormData;
        const currentData = prev[dataFieldName] as Array<{ observation: string; remarks: string }>;
        const newRowCount = value as number;
        
        if (Array.isArray(currentData)) {
          if (newRowCount > currentData.length) {
            // Add new empty rows
            const newRows = Array.from({ length: newRowCount - currentData.length }, () => ({
              observation: '',
              remarks: ''
            }));
            (newData as any)[dataFieldName] = [...currentData, ...newRows];
          } else if (newRowCount < currentData.length) {
            // Remove excess rows
            (newData as any)[dataFieldName] = currentData.slice(0, newRowCount);
          }
        }
      }
      
      return newData;
    });
  };

  const handleDataChange = (field: string, index: number, dataField: 'observation' | 'remarks', value: string) => {
    setFormData(prev => {
      const fieldData = prev[field as keyof FormData];
      if (Array.isArray(fieldData)) {
        return {
          ...prev,
          [field]: fieldData.map((item: any, i: number) => 
            i === index ? { ...item, [dataField]: value } : item
          )
        };
      }
      return prev;
    });
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      // Prepare observations array from dynamic table data
      const observations: any[] = [];

      // Helper function to add observations from a data array
      const addObservations = (dataArray: any[], sectionKey: string) => {
        if (Array.isArray(dataArray)) {
          dataArray.forEach((item, index) => {
            if (item.observation || item.remarks) {
              observations.push({
                section: sectionKey,
                sr_no: index + 1,
                observation: item.observation || '',
                remarks: item.remarks || ''
              });
            }
          });
        }
      };

      // UNDERWATER CLEANING
      addObservations(formData.marineGrowthData, 'presence_of_marine_growth');
      addObservations(formData.propellerCleaningData, 'cleaning_of_propellers');
      addObservations(formData.foreignObjectsData, 'remnants_of_ropes_fishing_nets');

      // PAINTING
      addObservations(formData.outerBottomData, 'outer_bottom_between_bilge_keel');
      addObservations(formData.sternAftData, 'stern_aft_cut_up');
      addObservations(formData.bootTopData, 'boot_top');
      addObservations(formData.ruddersData, 'rudders');
      addObservations(formData.stabilizersData, 'stabilizers');
      addObservations(formData.dockBlockData, 'old_dock_block_areas');
      addObservations(formData.otherObservationsData, 'other_observations');
      addObservations(formData.paintSchemeData, 'paint_scheme_being_applied');

      // RUSTING & CORROSION
      addObservations(formData.rustCorrosionAreasData, 'areas_having_rust_corrosion');
      addObservations(formData.rustGeneralOuterBottomData, 'general_outer_bottom');
      addObservations(formData.rustBootTopData, 'boot_top');
      addObservations(formData.rustSternAftData, 'stern_aft_cut_up');
      addObservations(formData.rustRuddersData, 'rudders');
      addObservations(formData.rustBilgeKeelData, 'bilge_keel_stem_stabilizers_weld_seams');
      addObservations(formData.rustDockBlockData, 'old_dock_block_areas');
      addObservations(formData.rustOtherObservationsData, 'other_observations');

      // STRUCTURE
      addObservations(formData.structureHullSurveyData, 'extent_of_hull_survey');
      addObservations(formData.structureDentsData, 'dents_at');
      addObservations(formData.structureCracksData, 'suspect_cracks_at');
      addObservations(formData.structureScratchData, 'deep_scratch_notch_at');
      addObservations(formData.structureHolesData, 'holes_doublers_at');
      addObservations(formData.structureOtherObservationsData, 'other_observations_if_any');
      addObservations(formData.structureDefectsData, 'ss_to_confirm_known_structural_defects');
      addObservations(formData.structureStabilizersData, 'survey_preservation_underneath_stabilizers');

      // RUDDER
      addObservations(formData.rudderCracksDentsData, 'cracks_dents_fouling');
      addObservations(formData.rudderMisalignmentData, 'mis_alignment_if_any');

      // PROPELLERS
      addObservations(formData.propellerCleaningData, 'cleaning_of_propellers');
      addObservations(formData.propellerEdgesData, 'condition_of_edges_of_propeller_blades');
      addObservations(formData.propellerHubsData, 'condition_of_propeller_hubs');
      addObservations(formData.propellerPittingData, 'pitting_erosion_if_any');
      addObservations(formData.propellerEpoxyCoatingData, 'condition_of_epoxy_coating_of_shaft');

      // MISCELLANEOUS
      addObservations(formData.miscellaneousEddyConeData, 'eddy_cone_rope_guards_uw_gratings');
      addObservations(formData.miscellaneousWaterSeepageData, 'water_seepage_from_obd_sea_tubes');
      addObservations(formData.miscellaneousMissingPartsData, 'missing_parts_like_draught_marks');
      addObservations(formData.miscellaneousBlankingData, 'blanking_of_any_parts');
      addObservations(formData.miscellaneousScupperLipsData, 'condition_of_scupper_lips');
      addObservations(formData.miscellaneousAralditeFairingData, 'condition_of_araldite_fairing');
      addObservations(formData.miscellaneousAngleOfListData, 'angle_of_list');

      // OTHER OBSERVATIONS
      addObservations(formData.otherObservationsData, 'other_observations');

      // Convert form date format from "dd-MM-yyyy" to "yyyy-MM-dd" for API
      const convertDateToApiFormat = (formDate: string) => {
        if (!formDate) return '';
        const [day, month, year] = formDate.split('-');
        return `${year}-${month}-${day}`;
      };

      // Convert docking version from display format to API format
      const convertDockingVersionToApiFormat = (displayVersion: string) => {
        switch (displayVersion) {
          case 'Version 1': return 'v1';
          case 'Version 2': return 'v2';
          case 'Version 3': return 'v3';
          default: return displayVersion || '';
        }
      };

      // Prepare the API payload
      const payload = {
        vessel_id: parseInt(formData.vesselId) || 0,
        dt_inspection: convertDateToApiFormat(formData.inspectionDate),
        auth_inspection: formData.authority,
        docking_version: convertDockingVersionToApiFormat(formData.dockingVersion),
        nature_of_docking: formData.natureOfDocking,
        no_of_dock_blocks_wedged: formData.dockBlocksWedged,
        no_of_dock_blocks_crushed: formData.dockBlocksCrushed,
        uw_openings_clear: formData.uwOpeningsClear === 'Yes',
        duration_of_docking: formData.dockingDuration,
        extent_of_survey: formData.extentOfHullSurvey,
        draft_status: "draft",
        dynamic_fields: {
          extra_notes: "No damages",
          condition: "better"
        },
        observations: observations
      };

      // Make API call
      const response = await post('hitumodule/preliminary-underwater-hull-inspection-reports/', payload);
      
      // Also save to localStorage for local draft management
      const draftData = {
        id: Date.now().toString(),
        title: `Draft - ${formData.vesselName || formData.insName || 'Untitled'} - ${new Date().toLocaleDateString()}`,
        data: formData,
        createdAt: new Date().toISOString(),
        apiResponse: response
      };

      const existingDrafts = JSON.parse(localStorage.getItem('preliminaryUnderwaterHullInspectionDrafts') || '[]');
      const updatedDrafts = [...existingDrafts, draftData];
      localStorage.setItem('preliminaryUnderwaterHullInspectionDrafts', JSON.stringify(updatedDrafts));
      setDrafts(updatedDrafts);
      
      // alert('Draft saved successfully to server and locally!');
      
    } catch (error) {
      console.error('Error saving draft:', error);
      // alert('Error saving draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleClear = () => {
    // Don't clear form if we're in edit/view mode with a record
    if (mode === 'edit' || mode === 'view' || isEditMode) {
      console.log('Preventing form clear in edit/view mode');
      return;
    }
    
    setEditingRecord(null);
    setFormData({
      insName: "",
      inspectionDate: "",
      authority: "",
      vesselId: "",
      vesselName: "",
      dockingVersion: "",
      natureOfDocking: "",
      dockBlocksWedged: 0,
      dockBlocksCrushed: 0,
      uwOpeningsClear: "",
      dockingDuration: "",
      marineGrowthRows: 0,
      foreignObjectsRows: 0,
      marineGrowthData: [],
      foreignObjectsData: [],
      outerBottomRows: 0,
      sternAftRows: 0,
      bootTopRows: 0,
      ruddersRows: 0,
      stabilizersRows: 0,
      dockBlockRows: 0,
      paintSchemeRows: 0,
      outerBottomData: [],
      sternAftData: [],
      bootTopData: [],
      ruddersData: [],
      stabilizersData: [],
      dockBlockData: [],
      paintSchemeData: [],
      rustCorrosionAreasRows: 0,
      rustGeneralOuterBottomRows: 0,
      rustBootTopRows: 0,
      rustSternAftRows: 0,
      rustRuddersRows: 0,
      rustBilgeKeelRows: 0,
      rustDockBlockRows: 0,
      rustOtherObservationsRows: 0,
      rustCorrosionAreasData: [],
      rustGeneralOuterBottomData: [],
      rustBootTopData: [],
      rustSternAftData: [],
      rustRuddersData: [],
      rustBilgeKeelData: [],
      rustDockBlockData: [],
      rustOtherObservationsData: [],
      extentOfHullSurvey: "",
      structureHullSurveyRows: 0,
      structureDentsRows: 0,
      structureCracksRows: 0,
      structureScratchRows: 0,
      structureHolesRows: 0,
      structureOtherObservationsRows: 0,
      structureDefectsRows: 0,
      structureStabilizersRows: 0,
      structureHullSurveyData: [],
      structureDentsData: [],
      structureCracksData: [],
      structureScratchData: [],
      structureHolesData: [],
      structureOtherObservationsData: [],
      structureDefectsData: [],
      structureStabilizersData: [],
      sonarDomeCleanShipObservation: "",
      sonarDomeCleanShipRemarks: "",
      sonarDomeCracksObservation: "",
      sonarDomeCracksRemarks: "",
      sonarDomeGrpObservation: "",
      sonarDomeGrpRemarks: "",
      sonarDomeFairingObservation: "",
      sonarDomeFairingRemarks: "",
      cathodicProtectionIccpServiceability: "",
      cathodicProtectionIccpServiceabilityRemarks: "",
      cathodicProtectionSacrificialAnodes: "",
      cathodicProtectionSacrificialAnodesRemarks: "",
      cathodicProtectionIccpAnodes: "",
      cathodicProtectionIccpAnodesRemarks: "",
      cathodicProtectionIccpReferenceElectrode: "",
      cathodicProtectionIccpReferenceElectrodeRemarks: "",
      cathodicProtectionDielectricShields: "",
      cathodicProtectionDielectricShieldsRemarks: "",
      cathodicProtectionPreDockingChecks: "",
      cathodicProtectionPreDockingChecksRemarks: "",
      rudderCracksDentsRows: 0,
      rudderMisalignmentRows: 0,
      rudderCracksDentsData: [],
      rudderMisalignmentData: [],
      propellerCleaningRows: 0,
      propellerEdgesRows: 0,
      propellerHubsRows: 0,
      propellerPittingRows: 0,
      propellerEpoxyCoatingRows: 0,
      propellerCleaningData: [],
      propellerEdgesData: [],
      propellerHubsData: [],
      propellerPittingData: [],
      propellerEpoxyCoatingData: [],
      miscellaneousEddyConeRows: 0,
      miscellaneousWaterSeepageRows: 0,
      miscellaneousMissingPartsRows: 0,
      miscellaneousBlankingRows: 0,
      miscellaneousScupperLipsRows: 0,
      miscellaneousAralditeFairingRows: 0,
      miscellaneousAngleOfListRows: 0,
      miscellaneousEddyConeData: [],
      miscellaneousWaterSeepageData: [],
      miscellaneousMissingPartsData: [],
      miscellaneousBlankingData: [],
      miscellaneousScupperLipsData: [],
      miscellaneousAralditeFairingData: [],
      miscellaneousAngleOfListData: [],
      otherObservationsRows: 0,
      otherObservationsData: [],
      shipStaffSignature: null,
      refittingAuthSignature: null,
      hituInspectorSignature: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['insName', 'inspectionDate', 'authority'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      // alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      // Convert form date format from "dd-MM-yyyy" to "yyyy-MM-dd" for API
      const convertDateToApiFormat = (formDate: string) => {
        if (!formDate) return '';
        const [day, month, year] = formDate.split('-');
        return `${year}-${month}-${day}`;
      };

      // Convert docking version from display format to API format
      const convertDockingVersionToApiFormat = (displayVersion: string) => {
        switch (displayVersion) {
          case 'Version 1': return 'v1';
          case 'Version 2': return 'v2';
          case 'Version 3': return 'v3';
          default: return displayVersion || '';
        }
      };

      let payload: any = {};

      if (editingRecord) {
        // For editing: only send changed fields + ID
        payload.id = editingRecord.id;
        
        // Check which fields have changed and add them to payload
        if (formData.vesselId !== editingRecord.vessel?.id?.toString()) {
          payload.vessel_id = parseInt(formData.vesselId) || 0;
        }
        // Convert API date back to form format for comparison
        const convertApiDateToFormFormat = (apiDate: string) => {
          if (!apiDate) return '';
          const date = new Date(apiDate);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };
        
        if (formData.inspectionDate !== convertApiDateToFormFormat(editingRecord.dt_inspection)) {
          payload.dt_inspection = convertDateToApiFormat(formData.inspectionDate);
        }
        if (formData.authority !== editingRecord.auth_inspection) {
          payload.auth_inspection = formData.authority;
        }
        // Convert API docking version back to display format for comparison
        const convertApiDockingVersionToDisplayFormat = (apiVersion: string) => {
          switch (apiVersion) {
            case 'v1': return 'Version 1';
            case 'v2': return 'Version 2';
            case 'v3': return 'Version 3';
            default: return apiVersion || '';
          }
        };
        
        if (formData.dockingVersion !== convertApiDockingVersionToDisplayFormat(editingRecord.docking_version)) {
          payload.docking_version = convertDockingVersionToApiFormat(formData.dockingVersion);
        }
        if (formData.natureOfDocking !== editingRecord.nature_of_docking) {
          payload.nature_of_docking = formData.natureOfDocking;
        }
        if (formData.dockBlocksWedged !== editingRecord.no_of_dock_blocks_wedged) {
          payload.no_of_dock_blocks_wedged = formData.dockBlocksWedged;
        }
        if (formData.dockBlocksCrushed !== editingRecord.no_of_dock_blocks_crushed) {
          payload.no_of_dock_blocks_crushed = formData.dockBlocksCrushed;
        }
        if ((formData.uwOpeningsClear === 'Yes') !== editingRecord.uw_openings_clear) {
          payload.uw_openings_clear = formData.uwOpeningsClear === 'Yes';
        }
        if (formData.dockingDuration !== editingRecord.duration_of_docking) {
          payload.duration_of_docking = formData.dockingDuration;
        }
        if (formData.extentOfHullSurvey !== editingRecord.extent_of_survey) {
          payload.extent_of_survey = formData.extentOfHullSurvey;
        }
        
        // If no fields changed, show message
        if (Object.keys(payload).length === 1) { // Only ID was added
          // alert('No changes detected. Please modify at least one field before updating.');
          return;
        }
      } else {
        // For creating new: send all required fields
        // Build observations array
        const observations: any[] = [];
        
        const addObservations = (data: Array<{ observation: string; remarks: string }>, observationType: string) => {
          data.forEach(item => {
            if (item.observation.trim() || item.remarks.trim()) {
              observations.push({
                observation_type: observationType,
                observation: item.observation,
                remarks: item.remarks
              });
            }
          });
        };

        // UNDERWATER CLEANING
        addObservations(formData.marineGrowthData, 'marine_growth');
        addObservations(formData.foreignObjectsData, 'foreign_objects');

        // PAINTING
        addObservations(formData.outerBottomData, 'outer_bottom');
        addObservations(formData.sternAftData, 'stern_aft');
        addObservations(formData.bootTopData, 'boot_top');
        addObservations(formData.ruddersData, 'rudders');
        addObservations(formData.stabilizersData, 'stabilizers');
        addObservations(formData.dockBlockData, 'dock_block');
        addObservations(formData.otherObservationsData, 'other_observations');
        addObservations(formData.paintSchemeData, 'paint_scheme');

        // RUSTING & CORROSION
        addObservations(formData.rustCorrosionAreasData, 'rust_corrosion_areas');
        addObservations(formData.rustGeneralOuterBottomData, 'rust_general_outer_bottom');
        addObservations(formData.rustBootTopData, 'rust_boot_top');
        addObservations(formData.rustSternAftData, 'rust_stern_aft');
        addObservations(formData.rustRuddersData, 'rust_rudders');
        addObservations(formData.rustBilgeKeelData, 'rust_bilge_keel');
        addObservations(formData.rustDockBlockData, 'rust_dock_block');
        addObservations(formData.rustOtherObservationsData, 'rust_other_observations');

        // STRUCTURE
        addObservations(formData.structureHullSurveyData, 'hull_survey');
        addObservations(formData.structureDentsData, 'dents');
        addObservations(formData.structureCracksData, 'cracks');
        addObservations(formData.structureScratchData, 'scratch');
        addObservations(formData.structureHolesData, 'holes');
        addObservations(formData.structureOtherObservationsData, 'other_observations_if_any');
        addObservations(formData.structureDefectsData, 'ss_to_confirm_known_structural_defects');
        addObservations(formData.structureStabilizersData, 'survey_preservation_underneath_stabilizers');

        // RUDDER
        addObservations(formData.rudderCracksDentsData, 'cracks_dents_fouling');
        addObservations(formData.rudderMisalignmentData, 'mis_alignment_if_any');

        // PROPELLERS
        addObservations(formData.propellerCleaningData, 'cleaning_of_propellers');
        addObservations(formData.propellerEdgesData, 'condition_of_edges_of_propeller_blades');
        addObservations(formData.propellerHubsData, 'condition_of_propeller_hubs');
        addObservations(formData.propellerPittingData, 'pitting_erosion_if_any');
        addObservations(formData.propellerEpoxyCoatingData, 'condition_of_epoxy_coating_of_shaft');

        // MISCELLANEOUS
        addObservations(formData.miscellaneousEddyConeData, 'eddy_cone_rope_guards_uw_gratings');
        addObservations(formData.miscellaneousWaterSeepageData, 'water_seepage_from_obd_sea_tubes');
        addObservations(formData.miscellaneousMissingPartsData, 'missing_parts_like_draught_marks');
        addObservations(formData.miscellaneousBlankingData, 'blanking_of_any_parts');
        addObservations(formData.miscellaneousScupperLipsData, 'condition_of_scupper_lips');
        addObservations(formData.miscellaneousAralditeFairingData, 'condition_of_araldite_fairing');
        addObservations(formData.miscellaneousAngleOfListData, 'angle_of_list');

        // OTHER OBSERVATIONS
        addObservations(formData.otherObservationsData, 'other_observations');

        payload = {
          vessel_id: parseInt(formData.vesselId) || 0,
          dt_inspection: convertDateToApiFormat(formData.inspectionDate),
          auth_inspection: formData.authority,
          docking_version: convertDockingVersionToApiFormat(formData.dockingVersion),
          nature_of_docking: formData.natureOfDocking,
          no_of_dock_blocks_wedged: formData.dockBlocksWedged,
          no_of_dock_blocks_crushed: formData.dockBlocksCrushed,
          uw_openings_clear: formData.uwOpeningsClear === 'Yes',
          duration_of_docking: formData.dockingDuration,
          extent_of_survey: formData.extentOfHullSurvey,
          draft_status: "final",
          dynamic_fields: {
            extra_notes: "No damages",
            condition: "better"
          },
          observations: observations
        };
      }

      // Make API call
      const response = await post('hitumodule/preliminary-underwater-hull-inspection-reports/', payload);
      
      if (editingRecord) {
        // alert('Record updated successfully!');
        setEditingRecord(null);
      } else {
        // alert('Record created successfully!');
      }
      
      // Call external onSubmit if provided (for add-only form)
      if (externalOnSubmit) {
        externalOnSubmit(formData);
        return; // Don't refresh drafts, let parent handle navigation
      }
      
      // Don't refresh drafts if we're in edit mode (it might reset the form)
      if (mode === 'edit' || mode === 'view') {
        console.log('Skipping draft refresh in edit/view mode');
        return;
      }
      
      // Refresh drafts list (for CommentorSheet)
      handleFetchDrafts();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('Error submitting form. Please try again.');
    }
  };

  const handleFetchDrafts = async () => {
    setIsLoadingDrafts(true);
    try {
      const response = await get('hitumodule/preliminary-underwater-hull-inspection-reports/');
      
      // Handle the API response structure
      if (response && response.data && Array.isArray(response.data)) {
        setApiDrafts(response.data);
      } else if (Array.isArray(response)) {
        setApiDrafts(response);
      } else {
        console.warn('Unexpected drafts response structure:', response);
        setApiDrafts([]);
      }
      
      setIsDraftModalOpen(true);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      // alert('Error fetching drafts. Please try again.');
    } finally {
      setIsLoadingDrafts(false);
    }
  };

  const handleDeleteDraft = (draftId: string) => {
    const existingDrafts = JSON.parse(localStorage.getItem('preliminaryUnderwaterHullInspectionDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('preliminaryUnderwaterHullInspectionDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleEditFromDraft = (record: any) => {
    setEditingRecord(record);
    
    // Convert API date format from "2025-09-17" to "dd-MM-yyyy"
    const convertDateFormat = (apiDate: string) => {
      if (!apiDate) return '';
      const date = new Date(apiDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // Map docking version from API format to display format
    const mapDockingVersion = (apiVersion: string) => {
      switch (apiVersion) {
        case 'v1': return 'Version 1';
        case 'v2': return 'Version 2';
        case 'v3': return 'Version 3';
        default: return apiVersion || '';
      }
    };

    // Convert API record data to form data format
    const formDataFromApi = {
      vesselId: record.vessel?.id?.toString() || '',
      vesselName: record.vessel?.name || '',
      inspectionDate: convertDateFormat(record.dt_inspection),
      authority: record.auth_inspection || '',
      dockingVersion: mapDockingVersion(record.docking_version),
      natureOfDocking: record.nature_of_docking || '',
      dockBlocksWedged: record.no_of_dock_blocks_wedged || 0,
      dockBlocksCrushed: record.no_of_dock_blocks_crushed || 0,
      uwOpeningsClear: record.uw_openings_clear ? 'Yes' : 'No',
      dockingDuration: record.duration_of_docking || '',
      extentOfHullSurvey: record.extent_of_survey || '',
      insName: record.vessel?.name || '',
      marineGrowthRows: 0,
      marineGrowthData: [],
      propellerCleaningRows: 0,
      propellerCleaningData: [],
      foreignObjectsRows: 0,
      foreignObjectsData: [],
      outerBottomRows: 0,
      outerBottomData: [],
      sternAftRows: 0,
      sternAftData: [],
      bootTopRows: 0,
      bootTopData: [],
      ruddersRows: 0,
      ruddersData: [],
      stabilizersRows: 0,
      stabilizersData: [],
      dockBlockRows: 0,
      dockBlockData: [],
      otherObservationsRows: 0,
      otherObservationsData: [],
      paintSchemeRows: 0,
      paintSchemeData: [],
      rustCorrosionAreasRows: 0,
      rustCorrosionAreasData: [],
      rustGeneralOuterBottomRows: 0,
      rustGeneralOuterBottomData: [],
      rustBootTopRows: 0,
      rustBootTopData: [],
      rustSternAftRows: 0,
      rustSternAftData: [],
      rustRuddersRows: 0,
      rustRuddersData: [],
      rustBilgeKeelRows: 0,
      rustBilgeKeelData: [],
      rustDockBlockRows: 0,
      rustDockBlockData: [],
      rustOtherObservationsRows: 0,
      rustOtherObservationsData: [],
      structureHullSurveyRows: 0,
      structureHullSurveyData: [],
      structureDentsRows: 0,
      structureDentsData: [],
      structureCracksRows: 0,
      structureCracksData: [],
      structureScratchRows: 0,
      structureScratchData: [],
      structureHolesRows: 0,
      structureHolesData: [],
      structureOtherObservationsRows: 0,
      structureOtherObservationsData: [],
      structureDefectsRows: 0,
      structureDefectsData: [],
      structureStabilizersRows: 0,
      structureStabilizersData: [],
      sonarDomeCleanShipObservation: '',
      sonarDomeCleanShipRemarks: '',
      sonarDomeCracksObservation: '',
      sonarDomeCracksRemarks: '',
      sonarDomeGrpObservation: '',
      sonarDomeGrpRemarks: '',
      sonarDomeFairingObservation: '',
      sonarDomeFairingRemarks: '',
      cathodicProtectionIccpServiceability: '',
      cathodicProtectionIccpServiceabilityRemarks: '',
      cathodicProtectionSacrificialAnodes: '',
      cathodicProtectionSacrificialAnodesRemarks: '',
      cathodicProtectionIccpAnodes: '',
      cathodicProtectionIccpAnodesRemarks: '',
      cathodicProtectionIccpReferenceElectrode: '',
      cathodicProtectionIccpReferenceElectrodeRemarks: '',
      cathodicProtectionDielectricShields: '',
      cathodicProtectionDielectricShieldsRemarks: '',
      cathodicProtectionPreDockingChecks: '',
      cathodicProtectionPreDockingChecksRemarks: '',
      rudderCracksDentsRows: 0,
      rudderCracksDentsData: [],
      rudderMisalignmentRows: 0,
      rudderMisalignmentData: [],
      propellerEdgesRows: 0,
      propellerEdgesData: [],
      propellerHubsRows: 0,
      propellerHubsData: [],
      propellerPittingRows: 0,
      propellerPittingData: [],
      propellerEpoxyCoatingRows: 0,
      propellerEpoxyCoatingData: [],
      miscellaneousEddyConeRows: 0,
      miscellaneousEddyConeData: [],
      miscellaneousWaterSeepageRows: 0,
      miscellaneousWaterSeepageData: [],
      miscellaneousMissingPartsRows: 0,
      miscellaneousMissingPartsData: [],
      miscellaneousBlankingRows: 0,
      miscellaneousBlankingData: [],
      miscellaneousScupperLipsRows: 0,
      miscellaneousScupperLipsData: [],
      miscellaneousAralditeFairingRows: 0,
      miscellaneousAralditeFairingData: [],
      miscellaneousAngleOfListRows: 0,
      miscellaneousAngleOfListData: [],
      shipStaffSignature: null,
      refittingAuthSignature: null,
      hituInspectorSignature: null,
    };
    
    setFormData(formDataFromApi as FormData);
    setIsDraftModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      // Ensure id is a valid number
      const recordId = Number(id);
      if (isNaN(recordId)) {
        // alert('Invalid record ID');
        return;
      }
      
      const payload = { id: recordId, delete: true };
      await post('hitumodule/preliminary-underwater-hull-inspection-reports/', payload);
      
      // Remove from local state
      setApiDrafts(prev => prev.filter(record => record.id !== id));
      
      // alert('Record deleted successfully!');
      
      // Refresh drafts list
      handleFetchDrafts();
    } catch (error) {
      console.error('Error deleting record:', error);
      // alert('Error deleting record. Please try again.');
      throw error; // Re-throw to let the dialog handle the error state
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-7xl mx-auto">
        {/* Editing Mode Banner */}
        {editingRecord && (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Editing Mode:</strong> You are currently editing record for {editingRecord.vessel?.name || 'Unknown Vessel'}. 
                  Click "Update" to save changes or "Clear" to cancel editing.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Content */}
          <PreliminaryFormContent 
            formData={formData} 
            onInputChange={handleInputChange}
            onDataChange={handleDataChange}
            mode={mode}
            record={record}
          />

          {/* Form Actions and Modal */}
          <PreliminaryFormActions
            formData={formData}
            setFormData={setFormData}
            isDraftModalOpen={isDraftModalOpen}
            setIsDraftModalOpen={setIsDraftModalOpen}
            isSavingDraft={isSavingDraft}
            isLoadingDrafts={isLoadingDrafts}
            apiDrafts={apiDrafts}
            editingRecord={editingRecord}
            onFetchDrafts={handleFetchDrafts}
            onSaveDraft={handleSaveDraft}
            onClear={handleClear}
            onSubmit={handleSubmit}
            onEdit={handleEditFromDraft}
            onDelete={handleDelete}
          />
        </form>

      </div>
    </div>
  );
};

export default PreliminaryUnderwaterHullInspectionReportForm;
