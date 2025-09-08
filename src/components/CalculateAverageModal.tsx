import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Save, X } from 'lucide-react';

interface CalculateAverageModalProps {
  visible: boolean;
  onHide: () => void;
  noOfDucts: number;
  onSave: (averages: {
    airFlow: number;
    flowRate: number;
    designValue: number;
    measuredValue: number;
  }) => void;
  currentValues?: {
    airFlow?: number;
    flowRate?: number;
    designValue?: number;
    measuredValue?: number;
  };
}

const CalculateAverageModal: React.FC<CalculateAverageModalProps> = ({
  visible,
  onHide,
  noOfDucts,
  onSave,
  currentValues = {}
}) => {
  const [values, setValues] = useState({
    airFlow: Array(noOfDucts).fill(''),
    flowRate: Array(noOfDucts).fill(''),
    designValue: Array(noOfDucts).fill(''),
    measuredValue: Array(noOfDucts).fill('')
  });

  const [averages, setAverages] = useState({
    airFlow: 0,
    flowRate: 0,
    designValue: 0,
    measuredValue: 0
  });

  // Reset values when modal opens or noOfDucts changes
  useEffect(() => {
    if (visible) {
      setValues({
        airFlow: Array(noOfDucts).fill(''),
        flowRate: Array(noOfDucts).fill(''),
        designValue: Array(noOfDucts).fill(''),
        measuredValue: Array(noOfDucts).fill('')
      });
      setAverages({
        airFlow: 0,
        flowRate: 0,
        designValue: 0,
        measuredValue: 0
      });
    }
  }, [visible, noOfDucts]);

  const handleValueChange = (field: keyof typeof values, index: number, value: string) => {
    // Allow empty string, numbers, and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const newValues = { ...values };
      newValues[field][index] = value;
      setValues(newValues);
      
      // Calculate average for this field
      const numericValues = newValues[field]
        .map(v => parseFloat(v))
        .filter(v => !isNaN(v));
      
      const average = numericValues.length > 0 
        ? numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length 
        : 0;
      
      // Round to 2 decimal places
      const roundedAverage = Math.round(average * 100) / 100;
      
      setAverages(prev => ({
        ...prev,
        [field]: roundedAverage
      }));
    }
  };

  const handleSave = () => {
    // Ensure all averages are rounded to 2 decimal places before saving
    const roundedAverages = {
      airFlow: Math.round(averages.airFlow * 100) / 100,
      flowRate: Math.round(averages.flowRate * 100) / 100,
      designValue: Math.round(averages.designValue * 100) / 100,
      measuredValue: Math.round(averages.measuredValue * 100) / 100
    };
    
    onSave(roundedAverages);
    onHide();
  };

  const renderDuctRow = (ductIndex: number) => (
    <div key={ductIndex} className="bg-white border border-[#20305e]/20 rounded-lg p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#20305e]">Duct {ductIndex + 1}</h4>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-600 font-medium">Air Flow (m/s)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            value={values.airFlow[ductIndex]}
            onChange={(e) => handleValueChange('airFlow', ductIndex, e.target.value)}
            className="h-8 text-sm border-2 border-gray-300 focus:border-[#20305e] focus:ring-1 focus:ring-[#20305e] bg-white"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-600 font-medium">Flow Rate (m³/hr)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            value={values.flowRate[ductIndex]}
            onChange={(e) => handleValueChange('flowRate', ductIndex, e.target.value)}
            className="h-8 text-sm border-2 border-gray-300 focus:border-[#20305e] focus:ring-1 focus:ring-[#20305e] bg-white"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-600 font-medium">Design Value</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            value={values.designValue[ductIndex]}
            onChange={(e) => handleValueChange('designValue', ductIndex, e.target.value)}
            className="h-8 text-sm border-2 border-gray-300 focus:border-[#20305e] focus:ring-1 focus:ring-[#20305e] bg-white"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-600 font-medium">Measured Value</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={values.measuredValue[ductIndex]}
            onChange={(e) => handleValueChange('measuredValue', ductIndex, e.target.value)}
            className="h-8 text-sm border-2 border-gray-300 focus:border-[#20305e] focus:ring-1 focus:ring-[#20305e] bg-white"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );

  const renderAveragesSection = () => (
    <div className="bg-[#20305e]/10 border border-[#20305e]/20 rounded-lg p-4">
      <h3 className="text-sm font-medium text-[#20305e] mb-3">Calculated Averages:</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Air Flow (m/s)</div>
          <div className="text-sm font-semibold text-[#20305e]">
            {averages.airFlow.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Flow Rate (m³/hr)</div>
          <div className="text-sm font-semibold text-[#20305e]">
            {averages.flowRate.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Design Value</div>
          <div className="text-sm font-semibold text-[#20305e]">
            {averages.designValue.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Measured Value</div>
          <div className="text-sm font-semibold text-[#20305e]">
            {averages.measuredValue.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      headerClassName='bg-[#20305e] p-4 text-white rounded-t-lg'
      header={
        <div className="bg-[#20305e] p-4 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Calculate Averages</h2>
              <p className="text-white/80 text-sm">
                Enter values for {noOfDucts} ducts to calculate averages
              </p>
            </div>
          </div>
        </div>
      }
      style={{
        width: '90vw',
        maxWidth: '1200px',
        minWidth: '800px',
        height: '80vh',
        maxHeight: '80vh',
        zIndex: 1000,
      }}
      className="border-0 shadow-2xl"
      modal
      dismissableMask={false}
      draggable={true}
      resizable={true}
      maximizable={true}
      contentStyle={{ padding: 0, overflow: 'hidden' }}
      headerStyle={{ padding: 0, margin: 0 }}
    >
      <div className="p-6 space-y-6 bg-gray-50 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 100px)' }}>
        <div className="bg-[#20305e]/10 border border-[#20305e]/20 rounded-md p-4">
          <h3 className="text-sm font-medium text-[#20305e] mb-2">Instructions:</h3>
          <ul className="text-sm text-[#20305e]/80 space-y-1">
            <li>• Enter values for each duct in the respective fields</li>
            <li>• Averages are calculated automatically as you type</li>
            <li>• Click "Save Averages" to apply the calculated values to the table</li>
            <li>• You can leave some fields empty if not all ducts have readings</li>
          </ul>
        </div>

        <div className="space-y-4">
          {renderAveragesSection()}
        </div>

        <div className="space-y-4">
          {Array.from({ length: noOfDucts }, (_, index) => renderDuctRow(index))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={onHide}
            variant="outline"
            className="px-6 py-2 rounded-md font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#20305e] hover:bg-[#20305e]/90 text-white px-6 py-2 rounded-md font-medium"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Averages
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CalculateAverageModal;
