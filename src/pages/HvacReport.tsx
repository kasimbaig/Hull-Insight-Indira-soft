import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Download, FileText, File } from 'lucide-react';

interface HvacReportProps {
  hvacData?: any;
}

const HvacReport = ({ hvacData }: HvacReportProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  // Process API data or use default values
  const getReportData = () => {
    console.log('Processing HVAC data:', hvacData);
    
    if (!hvacData) {
      console.log('No HVAC data available, using defaults');
      return {
        shipName: "INS Kolkata",
        shipClass: "Kolkata",
        dateOfTrials: "02 Sep 2025",
        placeOfTrials: "Mumbai",
        documentNo: "GRAQ 0262",
        occasion: "Pre-Refit Trials",
        authority: "HQWNC Letter NC/3000/03 dated 24 Aug 2025",
        acCompartments: [],
        machineryCompartments: []
      };
    }

    // If hvacData is a single trial (from card click), use it directly
    // If hvacData has trials array, use the first trial
    let trial;
    if (hvacData.trials && hvacData.trials.length > 0) {
      // This is the full API response with trials array
      trial = hvacData.trials[0];
      console.log('Using first trial from trials array:', trial);
    } else if (hvacData.ship_name && hvacData.airflow_measurements !== undefined) {
      // This is a single trial object (from card click)
      trial = hvacData;
      console.log('Using direct trial data:', trial);
    } else {
      console.log('No valid trial data found, using defaults');
      return {
        shipName: "INS Kolkata",
        shipClass: "Kolkata",
        dateOfTrials: "02 Sep 2025",
        placeOfTrials: "Mumbai",
        documentNo: "GRAQ 0262",
        occasion: "Pre-Refit Trials",
        authority: "HQWNC Letter NC/3000/03 dated 24 Aug 2025",
        acCompartments: [],
        machineryCompartments: []
      };
    }
    
    const processedData = {
      shipName: trial.ship_name || "Unknown Ship",
      shipClass: "Kolkata", // This might need to come from vessel data
      dateOfTrials: trial.date_of_trials || "N/A",
      placeOfTrials: trial.place_of_trials || "N/A",
      documentNo: trial.document_no || "N/A",
      occasion: trial.occasion_of_trials || "N/A",
      authority: trial.authority_for_trials || "N/A",
      acCompartments: trial.airflow_measurements || [],
      machineryCompartments: trial.machinery_airflow_measurements || []
    };
    
    
    
    return processedData;
  };

  const reportData = getReportData();

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Temporarily enable scrolling for PDF capture
      const tableContainers = reportRef.current.querySelectorAll('.table-container');
      tableContainers.forEach(container => {
        (container as HTMLElement).style.overflowX = 'auto';
      });

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: reportRef.current.scrollWidth,
        height: reportRef.current.scrollHeight,
      });

      // Restore original styling
      tableContainers.forEach(container => {
        (container as HTMLElement).style.overflowX = 'hidden';
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('HVAC_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadWord = async () => {
    if (!reportRef.current) return;

    try {
      // Create Word document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: "REPORT",
                  bold: true,
                  size: 32,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "HVAC PHASE I (HARBOUR PHASE)",
                  bold: true,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }), // Empty line

            // Ship Information
            new Paragraph({
              children: [
                new TextRun({
                  text: "Class of Ship - Kolkata",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Ship - INS Kolkata",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Date of conduct of trials - 02 Sep 2025",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Place of conduct of trials - Mumbai",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Document No. GRAQ 0262",
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Occasion for conduct of Trials - Pre-Refit Trials",
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Authority for conduct of Trials - HQWNC Letter NC/3000/03 dated 24 Aug 2025",
                }),
              ],
            }),
            new Paragraph({ text: "" }), // Empty line

            // Table 1
            new Paragraph({
              children: [
                new TextRun({
                  text: "TABLE 1 - AIR FLOW MEASUREMENTS OF AC COMPARTMENTS",
                  bold: true,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({ text: "" }), // Empty line

            // Table 1 content
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "Ser No." })],
                      width: { size: 8, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Served by ATU/ HE/ AHU/ FCU" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Compartment Name" })],
                      width: { size: 12, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "No of Ducts" })],
                      width: { size: 8, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Duct Area (m³)" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Air Flow (m/s)" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Flow Rate at Duct (m³/hr)" })],
                      width: { size: 12, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Design Value" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Measured Value" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Observations" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Remarks" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                // Row 1
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "1." })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "HE 56" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "EWER" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "4" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "0.0500" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "2.91" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "523.80" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "2508.00" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "2538.00" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "-" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "SAT" })],
                    }),
                  ],
                }),
                // Row 2
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "2." })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "ATU 1" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "MCO" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "1" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "0.0870" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "3.20" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "1008.00" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "720.00" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "140.26" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Sub-optimal air flow" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "UNSAT" })],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph({ text: "" }), // Empty line

            // Table 2
            new Paragraph({
              children: [
                new TextRun({
                  text: "TABLE 2 - AIR FLOW MEASUREMENTS OF MACHINERY COMPARTMENTS/ GENERAL COMPARTMENTS",
                  bold: true,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({ text: "" }), // Empty line

            // Table 2 content
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "Serv No" })],
                      width: { size: 8, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Served By Blower/ Fan Supply/ Fan Exhaust/ MCS/ MCE/ MCR/ MS/ ME" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Compartment Name" })],
                      width: { size: 12, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "No of Ducts" })],
                      width: { size: 8, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Duct Area (m²)" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Air Flow (m/s)" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Flow Rate at Duct (m³/hr)" })],
                      width: { size: 12, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Design Value" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Measured Value" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Observations" })],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Remarks" })],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                // Sample rows for Table 2
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: "1." })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "MCE 11" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "AC Mach Compt.03 STP 02" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "1" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "0.1056" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "6.00" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "2280.96" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "2180.00" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "2280.96" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "Nil" })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: "SAT" })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, 'HVAC_Report.docx');
    } catch (error) {
      console.error('Error generating Word document:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <style jsx>{`
          .report-content {
            width: 100%;
          }
          .report-content table {
            table-layout: fixed;
            width: 100%;
          }
          .report-content th,
          .report-content td {
            word-wrap: break-word;
            overflow-wrap: break-word;
            padding: 4px 6px;
            font-size: 9px;
            line-height: 1.2;
          }
          .report-content th:nth-child(1),
          .report-content td:nth-child(1) { width: 4%; }
          .report-content th:nth-child(2),
          .report-content td:nth-child(2) { width: 12%; }
          .report-content th:nth-child(3),
          .report-content td:nth-child(3) { width: 10%; }
          .report-content th:nth-child(4),
          .report-content td:nth-child(4) { width: 6%; }
          .report-content th:nth-child(5),
          .report-content td:nth-child(5) { width: 8%; }
          .report-content th:nth-child(6),
          .report-content td:nth-child(6) { width: 8%; }
          .report-content th:nth-child(7),
          .report-content td:nth-child(7) { width: 10%; }
          .report-content th:nth-child(8),
          .report-content td:nth-child(8) { width: 8%; }
          .report-content th:nth-child(9),
          .report-content td:nth-child(9) { width: 8%; }
          .report-content th:nth-child(10),
          .report-content td:nth-child(10) { width: 8%; }
          .report-content th:nth-child(11),
          .report-content td:nth-child(11) { width: 6%; }
          .report-content .table-container {
            overflow-x: hidden;
          }
        `}</style>
        {/* Header Section */}
        <div className="bg-blue-800 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-center">REPORT</h1>
              <h2 className="text-xl font-semibold text-center mt-2">HVAC PHASE I (HARBOUR PHASE)</h2>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                onClick={downloadPDF}
                variant="outline"
                size="sm"
                className="bg-white text-blue-800 hover:border-black hover:bg-white hover:text-black border-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="report-content">
          {/* Debug Information - Temporary */}
          {/* {hvacData && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">Raw API Data Debug Info:</h4>
              <div className="text-xs text-yellow-700 space-y-1">
                <p><strong>Has trials array:</strong> {hvacData.trials ? 'Yes' : 'No'}</p>
                <p><strong>Trials count:</strong> {hvacData.trials?.length || 0}</p>
                <p><strong>Ship Name:</strong> {hvacData.ship_name || 'N/A'}</p>
                <p><strong>Document No:</strong> {hvacData.document_no || 'N/A'}</p>
                <p><strong>Date of Trials:</strong> {hvacData.date_of_trials || 'N/A'}</p>
                <p><strong>AC Compartments (raw):</strong> {hvacData.airflow_measurements?.length || 0}</p>
                <p><strong>Machinery Compartments (raw):</strong> {hvacData.machinery_airflow_measurements?.length || 0}</p>
              </div>
              
              <h4 className="text-sm font-semibold text-yellow-800 mb-2 mt-4">Processed Data Debug Info:</h4>
              <div className="text-xs text-yellow-700 space-y-1">
                <p><strong>Processed Ship Name:</strong> {reportData.shipName}</p>
                <p><strong>Processed Document No:</strong> {reportData.documentNo}</p>
                <p><strong>Processed AC Compartments:</strong> {reportData.acCompartments.length}</p>
                <p><strong>Processed Machinery Compartments:</strong> {reportData.machineryCompartments.length}</p>
                {reportData.acCompartments.length > 0 && (
                  <div className="mt-2">
                    <p><strong>First Processed AC Compartment:</strong></p>
                    <p>• Name: {reportData.acCompartments[0].compartment_name_display}</p>
                    <p>• Served By: {reportData.acCompartments[0].served_by}</p>
                    <p>• No of Ducts: {reportData.acCompartments[0].no_of_ducts}</p>
                    <p>• Duct Area: {reportData.acCompartments[0].duct_area}</p>
                  </div>
                )}
              </div>
            </div>
          )} */}
          
          {/* Ship Information Section */}
          <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Class of Ship - {reportData.shipClass}</p>
              <p className="font-semibold">Ship - {reportData.shipName}</p>
            </div>
            <div>
              <p className="font-semibold">Date of conduct of trials - {reportData.dateOfTrials}</p>
              <p className="font-semibold">Place of conduct of trials - {reportData.placeOfTrials}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p><span className="font-semibold">Document No.</span> {reportData.documentNo}</p>
            <p><span className="font-semibold">Occasion for conduct of Trials -</span> {reportData.occasion}</p>
            <p><span className="font-semibold">Authority for conduct of Trials -</span> {reportData.authority}</p>
          </div>
        </div>

        {/* Table 1 - AC Compartments */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">TABLE 1 - AIR FLOW MEASUREMENTS OF AC COMPARTMENTS</h3>
          
          <div className="w-full table-container">
            <table className="w-full divide-y divide-gray-200 border border-gray-300 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Ser No.</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Served by ATU/ HE/ AHU/ FCU</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Compartment Name</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>No of Ducts</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Duct Area (m³)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Air Flow (m/s)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Flow Rate at Duct (m³/hr)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" colSpan={2}>Total Air Flow Rate in Compartment (m³/hr)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Observations</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider" rowSpan={2}>Remarks</th>
                </tr>
                <tr>
                  <th className="px-1 py-1 border-r bg-gray-100 text-xs">Design Value</th>
                  <th className="px-1 py-1 border-r bg-gray-100 text-xs">Measured Value</th>
                </tr>
                <tr>
                  <th className="px-1 py-1 border-r text-xs"></th>
                  <th className="px-1 py-1 border-r text-xs">a.</th>
                  <th className="px-1 py-1 border-r text-xs">b.</th>
                  <th className="px-1 py-1 border-r text-xs">c.</th>
                  <th className="px-1 py-1 border-r text-xs">d.</th>
                  <th className="px-1 py-1 border-r text-xs">e.</th>
                  <th className="px-1 py-1 border-r text-xs">f.</th>
                  <th className="px-1 py-1 border-r text-xs">g.</th>
                  <th className="px-1 py-1 border-r text-xs">h.</th>
                  <th className="px-1 py-1 border-r text-xs">j.</th>
                  <th className="px-1 py-1 text-xs">k.</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.acCompartments.length > 0 ? (
                  reportData.acCompartments.map((compartment: any, index: number) => (
                    <tr key={index} className={parseFloat(compartment.measured_air_flow_rate) < parseFloat(compartment.design_air_flow_rate) ? "bg-red-50" : ""}>
                      <td className="px-1 py-1 border-r text-xs">{index + 1}.</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.served_by || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.compartment_name_display || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.no_of_ducts || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.duct_area || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.air_flow || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.flow_rate_at_duct || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.design_air_flow_rate || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.measured_air_flow_rate || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.observations || "-"}</td>
                      <td className="px-1 py-1 text-xs">
                        {compartment.remarks || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-1 py-4 text-center text-gray-500 text-xs">
                      {hvacData ? 'No AC compartment data available for this vessel' : 'Please select a vessel to load HVAC data'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2 - Machinery Compartments */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">TABLE 2 - AIR FLOW MEASUREMENTS OF MACHINERY COMPARTMENTS/ GENERAL COMPARTMENTS</h3>
          
          <div className="w-full table-container">
            <table className="w-full divide-y divide-gray-200 border border-gray-300 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Serv No</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Served By Blower/ Fan Supply/ Fan Exhaust/ MCS/ MCE/ MCR/ MS/ ME</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Compartment Name</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>No of Ducts</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Duct Area (m²)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Air Flow (m/s)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Flow Rate at Duct (m³/hr)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" colSpan={2}>Total Air Flow Rate in Compartment (m³/hr)</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r" rowSpan={2}>Observations</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider" rowSpan={2}>Remarks</th>
                </tr>
                <tr>
                  <th className="px-1 py-1 border-r bg-gray-100 text-xs">Design Value</th>
                  <th className="px-1 py-1 border-r bg-gray-100 text-xs">Measured Value</th>
                </tr>
                <tr>
                  <th className="px-1 py-1 border-r text-xs"></th>
                  <th className="px-1 py-1 border-r text-xs">a.</th>
                  <th className="px-1 py-1 border-r text-xs">b.</th>
                  <th className="px-1 py-1 border-r text-xs">c.</th>
                  <th className="px-1 py-1 border-r text-xs">d.</th>
                  <th className="px-1 py-1 border-r text-xs">e.</th>
                  <th className="px-1 py-1 border-r text-xs">f.</th>
                  <th className="px-1 py-1 border-r text-xs">g.</th>
                  <th className="px-1 py-1 border-r text-xs">h.</th>
                  <th className="px-1 py-1 border-r text-xs">j.</th>
                  <th className="px-1 py-1 text-xs">k.</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.machineryCompartments.length > 0 ? (
                  reportData.machineryCompartments.map((compartment: any, index: number) => (
                    <tr key={index} className={parseFloat(compartment.measured_air_flow_rate) < parseFloat(compartment.design_air_flow_rate) ? "bg-red-50" : ""}>
                      <td className="px-1 py-1 border-r text-xs">{index + 1}.</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.served_by || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.compartment_name_display || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.no_of_ducts || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.duct_area || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.air_flow || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.flow_rate_at_duct || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.design_air_flow_rate || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.measured_air_flow_rate || "-"}</td>
                      <td className="px-1 py-1 border-r text-xs">{compartment.observations || "-"}</td>
                      <td className="px-1 py-1 text-xs">
                        {compartment.remarks || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-1 py-4 text-center text-gray-500 text-xs">
                      {hvacData ? 'No machinery compartment data available for this vessel' : 'Please select a vessel to load HVAC data'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HvacReport;