import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, X } from "lucide-react";
import AccommodationLadderForm from "@/components/forms/AccommodationLadderForm";
import AnchorCapstanForm from "@/components/forms/AnchorCapstanForm";
import AptTrialProtocolForm from "@/components/forms/AptTrialProtocolForm";
import AviationAircraftArmamentLiftsForm from "@/components/forms/AviationAircraftArmamentLiftsForm";
import BoatDavitForm from "@/components/forms/BoatDavitForm";
import CargoLiftVKDForm from "@/components/forms/CargoLiftVKDForm";
import CargoPassengerGalleyLiftsForm from "@/components/forms/CargoPassengerGalleyLiftsForm";
import CargoWinchForm from "@/components/forms/CargoWinchForm";
import CitadelTrialsForm from "@/components/forms/CitadelTrialsForm";
import DeckCrane40MForm from "@/components/forms/DeckCrane40MForm";
import "../styles/forms.css";

// Forms data with React components
const formsData = [
  {
    id: "accommodation_ladder",
    name: "Accommodation Ladder",
    description: "Comprehensive accommodation ladder inspection and trials form",
    component: AccommodationLadderForm,
  },
  {
    id: "anchor_capstan",
    name: "Anchor Capstan",
    description: "Anchor capstan inspection and trials form",
    component: AnchorCapstanForm,
  },
  {
    id: "apt_trial_protocol",
    name: "APT Trial Protocol",
    description: "APT trial protocol inspection and trials form",
    component: AptTrialProtocolForm,
  },
  {
    id: "aviation_aircraft_armament_lifts",
    name: "Aviation Aircraft Armament Lifts",
    description: "Aviation aircraft armament lifts inspection and trials form",
    component: AviationAircraftArmamentLiftsForm,
  },
  {
    id: "boat_davit",
    name: "Boat Davit",
    description: "Boat davit inspection and trials form",
    component: BoatDavitForm,
  },
  {
    id: "cargo_lift_vkd",
    name: "Cargo Lift (VKD)",
    description: "Cargo lift (VKD) inspection and trials form",
    component: CargoLiftVKDForm,
  },
  {
    id: "cargo_passenger_galley_lifts",
    name: "Cargo Passenger and Galley Lifts",
    description: "Cargo passenger and galley lifts inspection and trials form",
    component: CargoPassengerGalleyLiftsForm,
  },
  {
    id: "cargo_winch",
    name: "Cargo Winch",
    description: "Cargo winch inspection and trials form",
    component: CargoWinchForm,
  },
  {
    id: "citadel_trials",
    name: "Citadel Trials",
    description: "Citadel trials inspection and testing form",
    component: CitadelTrialsForm,
  },
  {
    id: "deck_crane_40m",
    name: "Deck Crane 40M",
    description: "Deck crane 40M inspection and trials form",
    component: DeckCrane40MForm,
  },
];

const Forms = () => {
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId);
    const form = formsData.find((f) => f.id === formId);
    if (form) {
      if (form.component) {
        // For React components, we don't need to set formContent
        setIsModalOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedForm("");
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600 mt-2">
            Select and fill out various forms for naval operations
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Form Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Form
                </label>
                <Select value={selectedForm} onValueChange={setSelectedForm}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a form to fill out" />
                  </SelectTrigger>
                  <SelectContent>
                    {formsData.map((form) => (
                      <SelectItem key={form.id} value={form.id}>
                        <div>
                          <div className="font-medium">{form.name}</div>
                          <div className="text-sm text-gray-500">
                            {form.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedForm && (
                <Button 
                  onClick={() => handleFormSelect(selectedForm)}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Open Form
                </Button>
              )}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>
                      {selectedForm && formsData.find(f => f.id === selectedForm)?.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCloseModal}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  {(() => {
                    const currentForm = formsData.find(f => f.id === selectedForm);
                    if (currentForm?.component) {
                      const Component = currentForm.component;
                      return <Component />;
                    }
                    return null;
                  })()}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forms;
