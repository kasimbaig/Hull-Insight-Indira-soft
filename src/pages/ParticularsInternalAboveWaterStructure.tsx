import React, { useState, useEffect } from 'react';
import HullSurveyApiService, { 
  InternalAbovewaterHullSurveyData, 
  StrakeDeckSurveyData, 
  Vessel,
  DROPDOWN_CHOICES 
} from '../services/hullSurveyApi';

const ParticularsInternalAboveWaterStructure = () => {
  // State for API data
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);

  // Part I form data
  const [formData, setFormData] = useState({
    nameOfShip: '0',
    typeOfRefit: '0',
    refitStartedOn: '',
    refitCompletionOn: '',
    refittingYard: '0',
    place: '',
    supervisor: '',
    officerInCharge: '',
    surveyParticulars: '',
    typeOfSurveyCarriedOut: '0',
    totalAreaSurveyed: '',
    areaSurveyed: '',
    areaGradedSuspect: '',
    areaGradedDefective: '',
    areaGradedSuspectAndRenewed: '',
    areaGradedDefectiveAndRenewed: '',
    areaGradedSuspectDefectiveAndTemporary: '',
    repairCarriedOut: '',
    totalTonnageOfHullStructureRenewal: '',
    generalObservationOnConditionOfHullMaterialState: '0',
    date: ''
  });

  // Part II form data
  const [totalRows, setTotalRows] = useState(1);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      strakeDeckNo: '',
      frameStationFrom: '',
      frameStationTo: '',
      originalThickness: '',
      extentOfCorrosion: '',
      extentOfPitting: '',
      meanThickness: '',
      reductionInThickness: '',
      grading: '',
      actionTaken: ''
    }
  ]);

  // Load vessels on component mount
  useEffect(() => {
    const loadVessels = async () => {
      try {
        setLoading(true);
        console.log('Loading vessels...');
        const vesselsData = await HullSurveyApiService.getVessels();
        console.log('Vessels loaded:', vesselsData);
        setVessels(vesselsData);
      } catch (err) {
        setError('Failed to load vessels');
        console.error('Error loading vessels:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVessels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Prepare Part I data
      const part1Data: InternalAbovewaterHullSurveyData = {
        vessel: formData.nameOfShip !== '0' ? parseInt(formData.nameOfShip) : undefined,
        type_of_refit: formData.typeOfRefit !== '0' ? formData.typeOfRefit : undefined,
        refitting_yard: formData.refittingYard !== '0' ? formData.refittingYard : undefined,
        type_of_survey: formData.typeOfSurveyCarriedOut !== '0' ? formData.typeOfSurveyCarriedOut : undefined,
        refit_started_on: formData.refitStartedOn ? formData.refitStartedOn : undefined,
        refit_completion_on: formData.refitCompletionOn ? formData.refitCompletionOn : undefined,
        place: formData.place || undefined,
        supervisor: formData.supervisor || undefined,
        officer_in_charge: formData.officerInCharge || undefined,
        survey_particulars: formData.surveyParticulars || undefined,
        total_area_surveyed: formData.totalAreaSurveyed ? parseFloat(formData.totalAreaSurveyed) : undefined,
        area_surveyed: formData.areaSurveyed ? parseFloat(formData.areaSurveyed) : undefined,
        area_graded_suspect: formData.areaGradedSuspect ? parseFloat(formData.areaGradedSuspect) : undefined,
        area_graded_suspect_renewed: formData.areaGradedSuspectAndRenewed ? parseFloat(formData.areaGradedSuspectAndRenewed) : undefined,
        area_graded_defective: formData.areaGradedDefective ? parseFloat(formData.areaGradedDefective) : undefined,
        area_graded_defective_renewed: formData.areaGradedDefectiveAndRenewed ? parseFloat(formData.areaGradedDefectiveAndRenewed) : undefined,
        area_graded_suspect_defective_temporary: formData.areaGradedSuspectDefectiveAndTemporary ? parseFloat(formData.areaGradedSuspectDefectiveAndTemporary) : undefined,
        repair_carried_out: formData.repairCarriedOut ? parseFloat(formData.repairCarriedOut) : undefined,
        total_tonnage_renewal: formData.totalTonnageOfHullStructureRenewal ? parseFloat(formData.totalTonnageOfHullStructureRenewal) : undefined,
        condition_of_hull_material_state: formData.generalObservationOnConditionOfHullMaterialState !== '0' ? formData.generalObservationOnConditionOfHullMaterialState : undefined,
        date: formData.date || undefined,
        draft_status: 'approved'
      };

      // Create Part I survey
      console.log('Creating Part I survey...', part1Data);
      const createdSurvey = await HullSurveyApiService.createInternalAbovewaterHullSurvey(part1Data);
      console.log('Part I survey created:', createdSurvey);

      // Check if Part I was created successfully
      if (!createdSurvey || !createdSurvey.id) {
        console.warn('Part I survey created but no ID returned. Proceeding with Part II without foreign key.');
        // For testing purposes, we'll create Part II records without the foreign key
        const part2Data: StrakeDeckSurveyData[] = tableData.map(row => ({
          // internal_abovewater_hull_survey: undefined, // No foreign key
          strake_deck_no: row.strakeDeckNo || undefined,
          frame_station_from: row.frameStationFrom || undefined,
          frame_station_to: row.frameStationTo || undefined,
          original_thickness: row.originalThickness || undefined,
          extent_of_corrosion: row.extentOfCorrosion || undefined,
          extent_of_pitting: row.extentOfPitting || undefined,
          mean_thickness: row.meanThickness || undefined,
          percent_reduction_in_thickness: row.reductionInThickness || undefined,
          grading: row.grading || undefined,
          action_taken: row.actionTaken || undefined,
          draft_status: 'approved'
        }));
        
        // Create Part II surveys without foreign key
        if (part2Data.length > 0) {
          console.log('Creating Part II surveys without foreign key...', part2Data);
          for (const surveyData of part2Data) {
            if (surveyData.strake_deck_no || surveyData.frame_station_from || surveyData.frame_station_to) {
              try {
                console.log('Calling Part II API with data:', surveyData);
                const createdSurvey = await HullSurveyApiService.createStrakeDeckSurvey(surveyData);
                console.log('Part II survey created successfully:', createdSurvey);
              } catch (error) {
                console.error('Error creating Part II survey:', error);
                throw error;
              }
            }
          }
        }
        
        alert('Survey saved successfully! (Part I created, Part II created without foreign key)');
        handleReset();
        return;
      }

      // Prepare Part II data
      console.log('Table data for Part II:', tableData);
      const part2Data: StrakeDeckSurveyData[] = tableData.map(row => ({
        internal_abovewater_hull_survey: createdSurvey.id,
        strake_deck_no: row.strakeDeckNo || undefined,
        frame_station_from: row.frameStationFrom || undefined,
        frame_station_to: row.frameStationTo || undefined,
        original_thickness: row.originalThickness || undefined,
        extent_of_corrosion: row.extentOfCorrosion || undefined,
        extent_of_pitting: row.extentOfPitting || undefined,
        mean_thickness: row.meanThickness || undefined,
        percent_reduction_in_thickness: row.reductionInThickness || undefined,
        grading: row.grading || undefined,
        action_taken: row.actionTaken || undefined,
        draft_status: 'approved'
      }));
      console.log('Prepared Part II data:', part2Data);

      // Create Part II surveys individually
      if (part2Data.length > 0) {
        console.log('Creating Part II surveys...', part2Data);
        const createdPart2Surveys = [];
        
        for (const surveyData of part2Data) {
          // Only create if there's meaningful data
          if (surveyData.strake_deck_no || surveyData.frame_station_from || surveyData.frame_station_to) {
            try {
              console.log('Calling Part II API with data:', surveyData);
              const createdSurvey = await HullSurveyApiService.createStrakeDeckSurvey(surveyData);
              createdPart2Surveys.push(createdSurvey);
              console.log('Part II survey created successfully:', createdSurvey);
            } catch (error) {
              console.error('Error creating Part II survey:', error);
              throw error;
            }
          } else {
            console.log('Skipping empty Part II survey row:', surveyData);
          }
        }
        
        console.log('All Part II surveys created:', createdPart2Surveys);
      } else {
        console.log('No Part II data to save');
      }

      alert('Survey saved successfully!');
      handleReset();
    } catch (err) {
      setError('Failed to save survey');
      console.error('Error saving survey:', err);
      alert('Failed to save survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nameOfShip: '0',
      typeOfRefit: '0',
      refitStartedOn: '',
      refitCompletionOn: '',
      refittingYard: '0',
      place: '',
      supervisor: '',
      officerInCharge: '',
      surveyParticulars: '',
      typeOfSurveyCarriedOut: '0',
      totalAreaSurveyed: '',
      areaSurveyed: '',
      areaGradedSuspect: '',
      areaGradedDefective: '',
      areaGradedSuspectAndRenewed: '',
      areaGradedDefectiveAndRenewed: '',
      areaGradedSuspectDefectiveAndTemporary: '',
      repairCarriedOut: '',
      totalTonnageOfHullStructureRenewal: '',
      generalObservationOnConditionOfHullMaterialState: '0',
      date: ''
    });
    setCurrentDraftId(null);
  };

  // Part II handlers
  const handleRowCountChange = (e) => {
    const newRowCount = parseInt(e.target.value) || 1;
    setTotalRows(newRowCount);
    
    // Update table data array
    const newData = [];
    for (let i = 0; i < newRowCount; i++) {
      newData.push({
        id: i + 1,
        strakeDeckNo: tableData[i]?.strakeDeckNo || '',
        frameStationFrom: tableData[i]?.frameStationFrom || '',
        frameStationTo: tableData[i]?.frameStationTo || '',
        originalThickness: tableData[i]?.originalThickness || '',
        extentOfCorrosion: tableData[i]?.extentOfCorrosion || '',
        extentOfPitting: tableData[i]?.extentOfPitting || '',
        meanThickness: tableData[i]?.meanThickness || '',
        reductionInThickness: tableData[i]?.reductionInThickness || '',
        grading: tableData[i]?.grading || '',
        actionTaken: tableData[i]?.actionTaken || ''
      });
    }
    setTableData(newData);
  };

  const handleTableInputChange = (rowIndex, field, value) => {
    const newData = [...tableData];
    newData[rowIndex][field] = value;
    setTableData(newData);
  };

  const handleClearTable = () => {
    const clearedData = tableData.map(row => ({
      ...row,
      strakeDeckNo: '',
      frameStationFrom: '',
      frameStationTo: '',
      originalThickness: '',
      extentOfCorrosion: '',
      extentOfPitting: '',
      meanThickness: '',
      reductionInThickness: '',
      grading: '',
      actionTaken: ''
    }));
    setTableData(clearedData);
  };

  const handleFetchDrafts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching drafts...');
      const draftsData = await HullSurveyApiService.getDrafts();
      console.log('Drafts fetched:', draftsData);
      setDrafts(draftsData);
      setIsDraftModalOpen(true);
    } catch (err) {
      setError('Failed to fetch drafts');
      console.error('Error fetching drafts:', err);
      alert('Failed to fetch drafts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare Part I data for draft
      const part1Data: InternalAbovewaterHullSurveyData = {
        vessel: formData.nameOfShip !== '0' ? parseInt(formData.nameOfShip) : undefined,
        type_of_refit: formData.typeOfRefit !== '0' ? formData.typeOfRefit : undefined,
        refitting_yard: formData.refittingYard !== '0' ? formData.refittingYard : undefined,
        type_of_survey: formData.typeOfSurveyCarriedOut !== '0' ? formData.typeOfSurveyCarriedOut : undefined,
        refit_started_on: formData.refitStartedOn ? formData.refitStartedOn : undefined,
        refit_completion_on: formData.refitCompletionOn ? formData.refitCompletionOn : undefined,
        place: formData.place || undefined,
        supervisor: formData.supervisor || undefined,
        officer_in_charge: formData.officerInCharge || undefined,
        survey_particulars: formData.surveyParticulars || undefined,
        total_area_surveyed: formData.totalAreaSurveyed ? parseFloat(formData.totalAreaSurveyed) : undefined,
        area_surveyed: formData.areaSurveyed ? parseFloat(formData.areaSurveyed) : undefined,
        area_graded_suspect: formData.areaGradedSuspect ? parseFloat(formData.areaGradedSuspect) : undefined,
        area_graded_suspect_renewed: formData.areaGradedSuspectAndRenewed ? parseFloat(formData.areaGradedSuspectAndRenewed) : undefined,
        area_graded_defective: formData.areaGradedDefective ? parseFloat(formData.areaGradedDefective) : undefined,
        area_graded_defective_renewed: formData.areaGradedDefectiveAndRenewed ? parseFloat(formData.areaGradedDefectiveAndRenewed) : undefined,
        area_graded_suspect_defective_temporary: formData.areaGradedSuspectDefectiveAndTemporary ? parseFloat(formData.areaGradedSuspectDefectiveAndTemporary) : undefined,
        repair_carried_out: formData.repairCarriedOut ? parseFloat(formData.repairCarriedOut) : undefined,
        total_tonnage_renewal: formData.totalTonnageOfHullStructureRenewal ? parseFloat(formData.totalTonnageOfHullStructureRenewal) : undefined,
        condition_of_hull_material_state: formData.generalObservationOnConditionOfHullMaterialState !== '0' ? formData.generalObservationOnConditionOfHullMaterialState : undefined,
        date: formData.date || undefined,
        draft_status: 'draft'
      };

      let result;
      if (currentDraftId) {
        // Update existing draft
        console.log('Updating draft...', currentDraftId, part1Data);
        result = await HullSurveyApiService.updateInternalAbovewaterHullSurvey(parseInt(currentDraftId), part1Data);
        console.log('Draft updated successfully:', result);
        alert('Draft updated successfully!');
      } else {
        // Create new draft
        const draftData = {
          part1: part1Data,
          part2: tableData
        };
        
        console.log('Saving new draft...', draftData);
        result = await HullSurveyApiService.saveDraft(draftData);
        console.log('Draft saved successfully:', result);
        alert('Draft saved successfully!');
      }
    } catch (err) {
      setError('Failed to save draft');
      console.error('Error saving draft:', err);
      alert('Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditDraft = (draft: any) => {
    // Convert API response format to form data format
    const formDataFromDraft = {
      nameOfShip: draft.vessel ? draft.vessel.toString() : '0',
      typeOfRefit: draft.type_of_refit || '0',
      refitStartedOn: draft.refit_started_on || '',
      refitCompletionOn: draft.refit_completion_on || '',
      refittingYard: draft.refitting_yard || '0',
      place: draft.place || '',
      supervisor: draft.supervisor || '',
      officerInCharge: draft.officer_in_charge || '',
      surveyParticulars: draft.survey_particulars || '',
      typeOfSurveyCarriedOut: draft.type_of_survey || '0',
      totalAreaSurveyed: draft.total_area_surveyed ? draft.total_area_surveyed.toString() : '',
      areaSurveyed: draft.area_surveyed ? draft.area_surveyed.toString() : '',
      areaGradedSuspect: draft.area_graded_suspect ? draft.area_graded_suspect.toString() : '',
      areaGradedDefective: draft.area_graded_defective ? draft.area_graded_defective.toString() : '',
      areaGradedSuspectAndRenewed: draft.area_graded_suspect_renewed ? draft.area_graded_suspect_renewed.toString() : '',
      areaGradedDefectiveAndRenewed: draft.area_graded_defective_renewed ? draft.area_graded_defective_renewed.toString() : '',
      areaGradedSuspectDefectiveAndTemporary: draft.area_graded_suspect_defective_temporary ? draft.area_graded_suspect_defective_temporary.toString() : '',
      repairCarriedOut: draft.repair_carried_out ? draft.repair_carried_out.toString() : '',
      totalTonnageOfHullStructureRenewal: draft.total_tonnage_renewal ? draft.total_tonnage_renewal.toString() : '',
      generalObservationOnConditionOfHullMaterialState: draft.condition_of_hull_material_state || '0',
      date: draft.date || ''
    };
    
    setFormData(formDataFromDraft);
    
    // For now, set empty table data since Part II data is not included in the current API response
    // You may need to fetch Part II data separately or modify the API to include it
    setTableData([{
      id: 1,
      strakeDeckNo: '',
      frameStationFrom: '',
      frameStationTo: '',
      originalThickness: '',
      extentOfCorrosion: '',
      extentOfPitting: '',
      meanThickness: '',
      reductionInThickness: '',
      grading: '',
      actionTaken: ''
    }]);
    setTotalRows(1);
    setCurrentDraftId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('Deleting draft:', draftId);
      await HullSurveyApiService.deleteDraft(draftId);
      
      // Refresh the drafts list
      const draftsData = await HullSurveyApiService.getDrafts();
      setDrafts(draftsData);
      
      console.log('Draft deleted successfully');
      alert('Draft deleted successfully!');
    } catch (err) {
      setError('Failed to delete draft');
      console.error('Error deleting draft:', err);
      alert('Failed to delete draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Test function for Part II API
  const testPart2API = async () => {
    try {
      console.log('Testing Part II API...');
      const testData: StrakeDeckSurveyData = {
        internal_abovewater_hull_survey: 1, // Test with ID 1
        strake_deck_no: 'Test Strake',
        frame_station_from: 'Test From',
        frame_station_to: 'Test To',
        original_thickness: '10',
        extent_of_corrosion: 'Minimal',
        extent_of_pitting: 'None',
        mean_thickness: '9.5',
        percent_reduction_in_thickness: '5',
        grading: 'Good',
        action_taken: 'Monitor',
        draft_status: 'approved'
      };
      
      const result = await HullSurveyApiService.createStrakeDeckSurvey(testData);
      console.log('Part II API test successful:', result);
      alert('Part II API test successful! Check console for details.');
    } catch (error) {
      console.error('Part II API test failed:', error);
      alert('Part II API test failed! Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
            <h5 className="text-2xl font-semibold mb-2">PART I</h5>
            <h5 className="text-3xl font-bold">PARTICULARS OF INTERNAL & ABOVE WATER STRUCTURE</h5>
          </div>

          <form id="part1-form" onSubmit={handleSubmit} className="p-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              {/* Name of Ship */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name of Ship <span className="text-red-500">*</span>
                </label>
                <select
                  name="nameOfShip"
                  value={formData.nameOfShip}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                >
                  <option value="0">
                    {loading ? 'Loading vessels...' : '--Select--'}
                  </option>
                  {vessels.map((vessel) => (
                    <option key={vessel.id} value={vessel.id}>
                      {vessel.name}
                    </option>
                  ))}
                </select>
                {vessels.length === 0 && !loading && (
                  <p className="text-sm text-gray-500 mt-1">No vessels available</p>
                )}
                {vessels.length > 0 && (
                  <p className="text-sm text-green-600 mt-1">{vessels.length} vessels loaded</p>
                )}
              </div>

              {/* Type of Refit */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type of Refit <span className="text-red-500">*</span>
                </label>
                <select
                  name="typeOfRefit"
                  value={formData.typeOfRefit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  {DROPDOWN_CHOICES.TYPE_OF_REFIT.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refit Started on */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Refit Started on <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="refitStartedOn"
                    value={formData.refitStartedOn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="DD-MM-YYYY"
                    maxLength={10}
                    required
                  />
                  <i className="pi pi-calendar absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>

              {/* Refit Completion on */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Refit Completion on <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="refitCompletionOn"
                    value={formData.refitCompletionOn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="DD-MM-YYYY"
                    maxLength={10}
                    required
                  />
                  <i className="pi pi-calendar absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>

              {/* Refitting Yard */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Refitting Yard <span className="text-red-500">*</span>
                </label>
                <select
                  name="refittingYard"
                  value={formData.refittingYard}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  {DROPDOWN_CHOICES.REFITTING_YARD.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Place */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter place"
                  required
                />
              </div>

              {/* Supervisor */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Supervisor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter supervisor name"
                  required
                />
              </div>

              {/* Officer in Charge */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Officer in Charge <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="officerInCharge"
                  value={formData.officerInCharge}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter officer name"
                  required
                />
              </div>

              {/* Survey Particulars */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Survey Particulars <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="surveyParticulars"
                  value={formData.surveyParticulars}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter survey particulars"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Type of Survey Carried Out */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type of Survey Carried Out <span className="text-red-500">*</span>
                </label>
                <select
                  name="typeOfSurveyCarriedOut"
                  value={formData.typeOfSurveyCarriedOut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  {DROPDOWN_CHOICES.TYPE_OF_SURVEY.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Area Surveyed */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Area Surveyed (Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="totalAreaSurveyed"
                  value={formData.totalAreaSurveyed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>

              {/* Area Surveyed */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area Surveyed (Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="areaSurveyed"
                  value={formData.areaSurveyed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>

              {/* Area Graded 'Suspect' */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area Graded 'Suspect' (Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="areaGradedSuspect"
                  value={formData.areaGradedSuspect}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Area graded 'Defective' */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area graded 'Defective' (Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="areaGradedDefective"
                  value={formData.areaGradedDefective}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>

              {/* Area Graded 'Suspect & Renewed' */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area Graded 'Suspect & Renewed' Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="areaGradedSuspectAndRenewed"
                  value={formData.areaGradedSuspectAndRenewed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>

              {/* Area Graded 'Defective & Renewed' */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area Graded 'Defective & Renewed' (Sq Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="areaGradedDefectiveAndRenewed"
                  value={formData.areaGradedDefectiveAndRenewed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>

              {/* Area Graded 'Suspect / Defective & Temporary' */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Area Graded 'Suspect / Defective & Temporary' (Sq Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="areaGradedSuspectDefectiveAndTemporary"
                  value={formData.areaGradedSuspectDefectiveAndTemporary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Repair Carried Out */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Repair Carried Out (Sq. Mtr) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="repairCarriedOut"
                  value={formData.repairCarriedOut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area"
                  required
                />
              </div>

              {/* Total Tonnage of Hull Structure Renewal */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Tonnage of Hull Structure Renewal on above Water and Internal Structure <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="totalTonnageOfHullStructureRenewal"
                  value={formData.totalTonnageOfHullStructureRenewal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tonnage"
                  required
                />
              </div>

              {/* General Observation on the Condition of Hull Material State */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  General Observation on the Condition of Hull Material State <span className="text-red-500">*</span>
                </label>
                <select
                  name="generalObservationOnConditionOfHullMaterialState"
                  value={formData.generalObservationOnConditionOfHullMaterialState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="0">--Select--</option>
                  {DROPDOWN_CHOICES.CONDITION_OF_HULL_MATERIAL_STATE.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="DD-MM-YYYY"
                    maxLength={10}
                    required
                  />
                  <i className="pi pi-calendar absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Part II Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
            <h5 className="text-2xl font-semibold mb-2 underline">PART II</h5>
            <h5 className="text-3xl font-bold underline">RECORD OF INTERNAL UNDERWATER & ABOVE WATER STRUCTURE</h5>
          </div>

          <div className="p-6">
            {/* Row Count Input */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Enter Total Number of Rows.
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={totalRows}
                  onChange={handleRowCountChange}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Sr No.
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Strake/Deck No. etc. <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center" colSpan={2}>
                      Frame Station
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Original Thickness (mm) <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Extent of Corrosion <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Extent of Pitting <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Mean Thickness (mm) <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      % Reduction in Thickness <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Grading <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Action Taken <span className="text-red-500">*</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Sr No. */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Strake/Deck No. */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      From <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      To <span className="text-red-500">*</span>
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Original Thickness */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Extent of Corrosion */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Extent of Pitting */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Mean Thickness */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for % Reduction */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Grading */}
                    </th>
                    <th className="bg-[#0072a6] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                      {/* Empty cell for Action Taken */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-300 text-sm text-center font-medium bg-gray-50 text-gray-600">
                        {row.id}
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.strakeDeckNo}
                          onChange={(e) => handleTableInputChange(index, 'strakeDeckNo', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Enter strake/deck no."
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.frameStationFrom}
                          onChange={(e) => handleTableInputChange(index, 'frameStationFrom', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="From"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.frameStationTo}
                          onChange={(e) => handleTableInputChange(index, 'frameStationTo', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="To"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.originalThickness}
                          onChange={(e) => handleTableInputChange(index, 'originalThickness', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Thickness"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.extentOfCorrosion}
                          onChange={(e) => handleTableInputChange(index, 'extentOfCorrosion', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Corrosion extent"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.extentOfPitting}
                          onChange={(e) => handleTableInputChange(index, 'extentOfPitting', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Pitting extent"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.meanThickness}
                          onChange={(e) => handleTableInputChange(index, 'meanThickness', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Mean thickness"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="number"
                          value={row.reductionInThickness}
                          onChange={(e) => handleTableInputChange(index, 'reductionInThickness', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="% Reduction"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.grading}
                          onChange={(e) => handleTableInputChange(index, 'grading', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Grading"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 text-sm">
                        <input
                          type="text"
                          value={row.actionTaken}
                          onChange={(e) => handleTableInputChange(index, 'actionTaken', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Action taken"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleFetchDrafts}
                disabled={loading}
                className="px-6 py-2 bg-[#0072a6] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'LOADING...' : 'FETCH DRAFTS'}
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'SAVING...' : currentDraftId ? 'UPDATE DRAFT' : 'SAVE DRAFT'}
              </button>
              <button
                type="button"
                onClick={handleClearTable}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CLEAR
              </button>
              
              
              <button
                type="submit"
                form="part1-form"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'SAVING...' : 'SAVE'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drafts Modal */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Saved Drafts</h3>
              <button
                onClick={() => setIsDraftModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Timestamp
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Ship
                    </th>
                    <th className="bg-[#0072a6] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {drafts.map((draft) => (
                    <tr key={draft.id}>
                      <td className="p-3 border border-gray-300 text-sm text-center">
                        {new Date(draft.created_on).toLocaleString()}
                      </td>
                      <td className="p-3 border border-gray-300 text-sm text-center">
                        {vessels.find(v => v.id === draft.vessel)?.name || 'No Ship Selected'}
                      </td>
                      <td className="p-3 border border-gray-300 text-sm text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEditDraft(draft)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDraft(draft.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ParticularsInternalAboveWaterStructure;
 