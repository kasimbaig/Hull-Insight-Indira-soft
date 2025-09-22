import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { get } from "@/lib/api";

interface FormData {
  insName: string;
  inspectionDate: string;
  authority: string;
  vesselId: string;
  vesselName: string;
  dockingVersion: string;
  natureOfDocking: string;
  dockBlocksWedged: number;
  dockBlocksCrushed: number;
  uwOpeningsClear: string;
  dockingDuration: string;
}

interface Vessel {
  id: number;
  name: string;
  code: string;
  classofvessel: {
    id: number;
    name: string;
    code: string;
  };
  vesseltype: {
    id: number;
    name: string;
    code: string;
  };
  yard: {
    id: number;
    name: string;
    code: string;
  };
  command: {
    id: number;
    name: string;
    code: string;
  };
  year_of_build: number;
  year_of_delivery: number;
}

interface PreliminaryFormHeaderProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const PreliminaryFormHeader: React.FC<PreliminaryFormHeaderProps> = ({
  formData,
  onInputChange
}) => {
  const [inspectionDate, setInspectionDate] = useState<Date>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loadingVessels, setLoadingVessels] = useState(false);
  const [vesselError, setVesselError] = useState<string | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setInspectionDate(date);
      onInputChange('inspectionDate', format(date, "dd-MM-yyyy"));
      setIsDatePickerOpen(false);
    }
  };

  // Fetch vessels from API
  useEffect(() => {
    const fetchVessels = async () => {
      setLoadingVessels(true);
      setVesselError(null);
      try {
        const response = await get('master/vessels/');
        // Handle the API response structure
        if (response && response.data && Array.isArray(response.data)) {
          setVessels(response.data);
        } else if (Array.isArray(response)) {
          setVessels(response);
        } else {
          console.warn('Unexpected vessels response structure:', response);
          setVessels([]);
          setVesselError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching vessels:', error);
        setVesselError('Failed to load vessels data');
        setVessels([]);
      } finally {
        setLoadingVessels(false);
      }
    };

    fetchVessels();
  }, []);

  const handleVesselChange = (vesselId: string) => {
    const selectedVessel = vessels.find(vessel => vessel.id.toString() === vesselId);
    onInputChange('vesselId', vesselId);
    onInputChange('vesselName', selectedVessel?.name || '');
  };

  return (
    <>
      {/* Header Section */}
     <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl font-semibold underline">PRELIMINARY UNDERWATER HULL INSPECTION - INS</h2>
            
            {/* Vessel Selection */}
            <Select 
              value={formData.vesselId} 
              onValueChange={handleVesselChange}
              disabled={loadingVessels}
            >
              <SelectTrigger className="px-3 py-2 border border-gray-300 rounded min-w-[200px]">
                <SelectValue placeholder={loadingVessels ? "Loading vessels..." : "--Select Vessel--"} />
              </SelectTrigger>
              <SelectContent>
                {vesselError ? (
                  <SelectItem value="" disabled>
                    Error loading vessels
                  </SelectItem>
                ) : (
                  vessels.map((vessel) => (
                    <SelectItem key={vessel.id} value={vessel.id.toString()}>
                      {vessel.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

      {/* Header Information Section */}
      <div className="p-3 border-b border-gray-200">
        {/* Date of Inspection */}
        <div className="flex items-center bg-white p-3 border-b border-gray-300">
          <div className="w-48 text-sm font-medium text-gray-700">
            Date of Inspection<span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal border border-gray-300 rounded px-3 py-2 hover:bg-white hover:text-gray-900 hover:border-gray-300 ${
                    !inspectionDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {inspectionDate ? format(inspectionDate, "dd-MM-yyyy") : "DD-MM-YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={inspectionDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
           
          </div>
        </div>

        {/* Authority for Inspection */}
        <div className="flex items-center bg-[#f2f2f2] p-3">
          <div className="w-48 text-sm font-medium text-gray-700">
            Authority for Inspection<span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <Input
              type="text"
              value={formData.authority}
              onChange={(e) => onInputChange('authority', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter authority"
              required
            />
          </div>
        </div>
      </div>

      {/* DOCKING Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="bg-[#c7d9f0] text-black px-6 py-4">
          <h3 className="text-lg font-bold border-b-2 border-purple-500 pb-2">DOCKING</h3>
        </div>
        
        <div className="p-6">
          {/* Docking Version */}
          <div className="flex items-center bg-[#f2f2f2] p-3 border-b border-gray-300">
            <div className="text-sm font-medium text-gray-700">
              Docking Version<span className="text-red-500">*</span>
            </div>
            <div className="flex-1 flex justify-end">
              <Select value={formData.dockingVersion} onValueChange={(value) => onInputChange('dockingVersion', value)}>
                <SelectTrigger className="w-48 border border-gray-300 rounded px-3 py-2">
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Version 1">Version 1</SelectItem>
                  <SelectItem value="Version 2">Version 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Nature of docking */}
          <div className="flex items-center bg-white p-3 border-b border-gray-300">
            <div className="text-sm font-medium text-gray-700">
              Nature of docking<span className="text-red-500">*</span>
            </div>
            <div className="flex-1 flex justify-end">
             <Input
                type="number"
                value={formData.dockBlocksWedged}
                onChange={(e) => onInputChange('dockBlocksWedged', parseInt(e.target.value) || 0)}
                className="w-24 border border-gray-300 rounded px-3 py-2"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* No of Dock Blocks Wedged */}
          <div className="flex items-center bg-[#f2f2f2] p-3 border-b border-gray-300">
            <div className="text-sm font-medium text-gray-700">
              No of Dock Blocks Wedged<span className="text-red-500">*</span>
            </div>
            <div className="flex-1 flex justify-end">
              <Input
                type="number"
                value={formData.dockBlocksWedged}
                onChange={(e) => onInputChange('dockBlocksWedged', parseInt(e.target.value) || 0)}
                className="w-24 border border-gray-300 rounded px-3 py-2"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* No of Dock Blocks excessively crushed */}
          <div className="flex items-center bg-white p-3 border-b border-gray-300">
            <div className="text-sm font-medium text-gray-700">
              No of Dock Blocks excessively crushed<span className="text-red-500">*</span>
            </div>
            <div className="flex-1 flex justify-end">
              <Input
                type="number"
                value={formData.dockBlocksCrushed}
                onChange={(e) => onInputChange('dockBlocksCrushed', parseInt(e.target.value) || 0)}
                className="w-24 border border-gray-300 rounded px-3 py-2"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Are all UW openings clear of Dock blocks */}
          <div className="flex items-center bg-[#f2f2f2] p-3 border-b border-gray-300">
            <div className="text-sm font-medium text-gray-700">
              Are all UW openings clear of Dock blocks<span className="text-red-500">*</span>
            </div>
            <div className="flex-1 flex justify-end">
              <Select value={formData.uwOpeningsClear} onValueChange={(value) => onInputChange('uwOpeningsClear', value)}>
                <SelectTrigger className="w-48 border border-gray-300 rounded px-3 py-2">
                  <SelectValue placeholder="--Select--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration of docking */}
          <div className="flex items-center bg-white p-3">
            <div className="text-sm font-medium text-gray-700">
              Duration of docking<span className="text-red-500">*</span>
            </div>
            <div className="flex-1 flex justify-end">
              <Input
                type="text"
                value={formData.dockingDuration}
                onChange={(e) => onInputChange('dockingDuration', e.target.value)}
                className="w-32 border border-gray-300 rounded px-3 py-2"
                placeholder="Enter duration"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreliminaryFormHeader;
