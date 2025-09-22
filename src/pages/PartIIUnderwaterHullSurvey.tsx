import React, { useState } from 'react';
import { post } from '../lib/api';

const PartIIUnderwaterHullSurvey = () => {
  // Part II form data for underwater hull survey record - Updated to match StrakeDeckSurveyUnderwaterHull model
  const [part2TotalRows, setPart2TotalRows] = useState(1);
  const [part2TableData, setPart2TableData] = useState([
    {
      id: 1,
      strake_deck_no: '',
      frame_station_from: '',
      frame_station_to: '',
      original_thickness: '',
      extent_of_corrosion: '',
      extent_of_pitting: '',
      avg_residual_thickness_outside_t1: '',
      avg_residual_thickness_outside_t2: '',
      mean_thickness: '',
      percent_reduction_in_thickness: '',
      grading: '',
      action_taken: ''
    }
  ]);

  // State for Part II submission
  const [isSubmittingPart2, setIsSubmittingPart2] = useState(false);
  const [part2SubmitError, setPart2SubmitError] = useState(null);
  const [part2SubmitSuccess, setPart2SubmitSuccess] = useState(false);

  // Part II handlers
  const handlePart2RowCountChange = (e) => {
    const newRowCount = parseInt(e.target.value) || 1;
    setPart2TotalRows(newRowCount);
    
    // Update table data array
    const newData = [];
    for (let i = 0; i < newRowCount; i++) {
      newData.push({
        id: i + 1,
        strake_deck_no: part2TableData[i]?.strake_deck_no || '',
        frame_station_from: part2TableData[i]?.frame_station_from || '',
        frame_station_to: part2TableData[i]?.frame_station_to || '',
        original_thickness: part2TableData[i]?.original_thickness || '',
        extent_of_corrosion: part2TableData[i]?.extent_of_corrosion || '',
        extent_of_pitting: part2TableData[i]?.extent_of_pitting || '',
        avg_residual_thickness_outside_t1: part2TableData[i]?.avg_residual_thickness_outside_t1 || '',
        avg_residual_thickness_outside_t2: part2TableData[i]?.avg_residual_thickness_outside_t2 || '',
        mean_thickness: part2TableData[i]?.mean_thickness || '',
        percent_reduction_in_thickness: part2TableData[i]?.percent_reduction_in_thickness || '',
        grading: part2TableData[i]?.grading || '',
        action_taken: part2TableData[i]?.action_taken || ''
      });
    }
    setPart2TableData(newData);
  };

  const handlePart2TableInputChange = (rowIndex, field, value) => {
    const newData = [...part2TableData];
    newData[rowIndex][field] = value;
    setPart2TableData(newData);
  };

  const handlePart2ClearTable = () => {
    const clearedData = part2TableData.map(row => ({
      ...row,
      strake_deck_no: '',
      frame_station_from: '',
      frame_station_to: '',
      original_thickness: '',
      extent_of_corrosion: '',
      extent_of_pitting: '',
      avg_residual_thickness_outside_t1: '',
      avg_residual_thickness_outside_t2: '',
      mean_thickness: '',
      percent_reduction_in_thickness: '',
      grading: '',
      action_taken: ''
    }));
    setPart2TableData(clearedData);
  };

  const handlePart2FetchDrafts = () => {
    console.log('Fetching Part II drafts...');
    // Add fetch drafts functionality here
  };

  const handlePart2SaveDraft = async () => {
    setIsSubmittingPart2(true);
    setPart2SubmitError(null);
    setPart2SubmitSuccess(false);

    try {
      // Prepare the data for API submission
      const submissionData = part2TableData.map(row => ({
        strake_deck_no: row.strake_deck_no || null,
        frame_station_from: row.frame_station_from || null,
        frame_station_to: row.frame_station_to || null,
        original_thickness: row.original_thickness || null,
        extent_of_corrosion: row.extent_of_corrosion || null,
        extent_of_pitting: row.extent_of_pitting || null,
        avg_residual_thickness_outside_t1: row.avg_residual_thickness_outside_t1 || null,
        avg_residual_thickness_outside_t2: row.avg_residual_thickness_outside_t2 || null,
        mean_thickness: row.mean_thickness || null,
        percent_reduction_in_thickness: row.percent_reduction_in_thickness || null,
        grading: row.grading || null,
        action_taken: row.action_taken || null,
        draft_status: 'draft' // Default to draft status
      }));

      console.log('Submitting Part II data:', submissionData);
      
      // Submit each row as a separate API call
      const promises = submissionData.map(data => 
        post('yardmodule/strake-deck-surveys/', data)
      );
      
      const responses = await Promise.all(promises);
      
      console.log('Part II API Responses:', responses);
      setPart2SubmitSuccess(true);
      
      // Clear the table after successful submission
      handlePart2ClearTable();

    } catch (error) {
      console.error('Error submitting Part II form:', error);
      setPart2SubmitError(error.message || 'Failed to submit Part II data. Please try again.');
    } finally {
      setIsSubmittingPart2(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="bg-[#c7d9f0] text-black px-6 py-4 text-center rounded-t-lg">
        <h5 className="text-2xl font-semibold mb-2 underline">PART II</h5>
        <h5 className="text-3xl font-bold underline">RECORD OF UNDERWATER HULL SURVEY</h5>
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
              value={part2TotalRows}
              onChange={handlePart2RowCountChange}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Sr No.
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Strake/Deck No. etc. <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center" colSpan="2">
                  Frame Station
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Original Thickness (mm) <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Extent of Corrosion <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Extent of Pitting <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Average Residual Thickness Outside Pitted Area (T1) (mm)
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Average Residual Thickness of Pitted Area (T2) (mm)
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Mean Thickness (mm) <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  % Reduction in Thickness <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Grading <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-3 text-sm font-medium border border-gray-300 text-center">
                  Action Taken <span className="text-red-500">*</span>
                </th>
              </tr>
              <tr>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Sr No. */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Strake/Deck No. */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  From <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  To <span className="text-red-500">*</span>
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Original Thickness */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Extent of Corrosion */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Extent of Pitting */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Average Residual Thickness Outside Pitted Area */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Average Residual Thickness of Pitted Area */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Mean Thickness */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for % Reduction */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Grading */}
                </th>
                <th className="bg-[#1a2746] text-white p-2 text-xs font-medium border border-gray-300 text-center">
                  {/* Empty cell for Action Taken */}
                </th>
              </tr>
            </thead>
            <tbody>
              {part2TableData.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 text-sm text-center font-medium bg-gray-50 text-gray-600">
                    {row.id}
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.strake_deck_no}
                      onChange={(e) => handlePart2TableInputChange(index, 'strake_deck_no', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Enter strake/deck no."
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.frame_station_from}
                      onChange={(e) => handlePart2TableInputChange(index, 'frame_station_from', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="From"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.frame_station_to}
                      onChange={(e) => handlePart2TableInputChange(index, 'frame_station_to', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="To"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.original_thickness}
                      onChange={(e) => handlePart2TableInputChange(index, 'original_thickness', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Thickness"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.extent_of_corrosion}
                      onChange={(e) => handlePart2TableInputChange(index, 'extent_of_corrosion', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Corrosion extent"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.extent_of_pitting}
                      onChange={(e) => handlePart2TableInputChange(index, 'extent_of_pitting', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Pitting extent"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.avg_residual_thickness_outside_t1}
                      onChange={(e) => handlePart2TableInputChange(index, 'avg_residual_thickness_outside_t1', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="T1 thickness"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.avg_residual_thickness_outside_t2}
                      onChange={(e) => handlePart2TableInputChange(index, 'avg_residual_thickness_outside_t2', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="T2 thickness"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.mean_thickness}
                      onChange={(e) => handlePart2TableInputChange(index, 'mean_thickness', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Mean thickness"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.percent_reduction_in_thickness}
                      onChange={(e) => handlePart2TableInputChange(index, 'percent_reduction_in_thickness', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="% Reduction"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.grading}
                      onChange={(e) => handlePart2TableInputChange(index, 'grading', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Grading"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 text-sm">
                    <input
                      type="text"
                      value={row.action_taken}
                      onChange={(e) => handlePart2TableInputChange(index, 'action_taken', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Action taken"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Success/Error Messages */}
        {part2SubmitSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Part II data submitted successfully!
          </div>
        )}
        
        {part2SubmitError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {part2SubmitError}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePart2FetchDrafts}
            className="px-6 py-2 bg-[#1a2746] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            FETCH DRAFTS
          </button>
          <button
            type="button"
            onClick={handlePart2SaveDraft}
            disabled={isSubmittingPart2}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingPart2 ? 'SUBMITTING...' : 'SUBMIT PART II'}
          </button>
          <button
            type="button"
            onClick={handlePart2ClearTable}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartIIUnderwaterHullSurvey;
