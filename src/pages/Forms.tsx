import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Forms data for navigation
const formsData = [
  {
    id: "accommodation-ladder",
    name: "Accommodation Ladder",
    description: "Comprehensive accommodation ladder inspection and trials form",
    path: "/app/forms/accommodation-ladder",
  },
  {
    id: "anchor-capstan",
    name: "Anchor Capstan",
    description: "Anchor capstan inspection and trials form",
    path: "/app/forms/anchor-capstan",
  },
  {
    id: "apt-trial-protocol",
    name: "APT Trial Protocol",
    description: "APT trial protocol inspection and trials form",
    path: "/app/forms/apt-trial-protocol",
  },
  {
    id: "aviation-aircraft-armament-lifts",
    name: "Aviation Aircraft Armament Lifts",
    description: "Aviation aircraft armament lifts inspection and trials form",
    path: "/app/forms/aviation-aircraft-armament-lifts",
  },
  {
    id: "boat-davit",
    name: "Boat Davit",
    description: "Boat davit inspection and trials form",
    path: "/app/forms/boat-davit",
  },
  {
    id: "cargo-lift-vkd",
    name: "Cargo Lift (VKD)",
    description: "Cargo lift (VKD) inspection and trials form",
    path: "/app/forms/cargo-lift-vkd",
  },
  {
    id: "cargo-passenger-galley-lifts",
    name: "Cargo Passenger and Galley Lifts",
    description: "Cargo passenger and galley lifts inspection and trials form",
    path: "/app/forms/cargo-passenger-galley-lifts",
  },
  {
    id: "cargo-winch",
    name: "Cargo Winch",
    description: "Cargo winch inspection and trials form",
    path: "/app/forms/cargo-winch",
  },
  {
    id: "citadel-trials",
    name: "Citadel Trials",
    description: "Citadel trials inspection and testing form",
    path: "/app/forms/citadel-trials",
  },
  {
    id: "deck-crane-40m",
    name: "Deck Crane 40M",
    description: "Deck crane 40M inspection and trials form",
    path: "/app/forms/deck-crane-40m",
  },
    {
      id: "ekm-anchor-capstan",
      name: "EKM Anchor Capstan",
      description: "EKM class anchor capstan inspection and trials form",
      path: "/app/forms/ekm-anchor-capstan",
    },
    {
      id: "ekm-mooring-capstan",
      name: "EKM Mooring Capstan",
      description: "EKM class mooring capstan inspection and trials form",
      path: "/app/forms/ekm-mooring-capstan",
    },
    {
      id: "ekm-doors-hatches",
      name: "EKM Doors and Hatches",
      description: "EKM class doors and hatches inspection and trials form",
      path: "/app/forms/ekm-doors-hatches",
    },
    {
      id: "ekm-emergency-towing-arrangements",
      name: "EKM Emergency Towing Arrangements",
      description: "EKM class emergency towing arrangements inspection and trials form",
      path: "/app/forms/ekm-emergency-towing-arrangements",
    },
    {
      id: "final-underwater-hull-inspection",
      name: "Final Underwater Hull Inspection",
      description: "Final underwater hull inspection report form",
      path: "/app/forms/final-underwater-hull-inspection",
    },
    {
      id: "fire-screen-drive",
      name: "Fire Screen Drive",
      description: "Fire screen drive inspection and trials form",
      path: "/app/forms/fire-screen-drive",
    },
    {
      id: "hanger-door",
      name: "Hanger Door",
      description: "Hanger door inspection and trials form",
      path: "/app/forms/hanger-door",
    },
    {
      id: "galley-lifts",
      name: "Galley Lifts",
      description: "Galley lifts inspection and trials form",
      path: "/app/forms/galley-lifts",
    },
    {
      id: "hanger-shutter",
      name: "Hanger Shutter",
      description: "Hanger shutter inspection and trials form",
      path: "/app/forms/hanger-shutter",
    },
    {
      id: "helo-deck-friction-test",
      name: "Helo Deck Friction Test",
      description: "Helo deck friction test inspection and trials form",
      path: "/app/forms/helo-deck-friction-test",
    },
    {
      id: "helo-traversing-system",
      name: "Helo Traversing System",
      description: "Helo traversing system inspection and trials form",
      path: "/app/forms/helo-traversing-system",
    },
    {
      id: "hull-maintenance-inspection-ships",
      name: "Hull Maintenance Inspection for Ships",
      description: "Comprehensive hull maintenance inspection form for ships",
      path: "/app/forms/hull-maintenance-inspection-ships",
    },
    {
      id: "hull-maintenance-inspection-submarines",
      name: "Hull Maintenance Inspection for Submarines",
      description: "Comprehensive hull maintenance inspection form for submarines",
      path: "/app/forms/hull-maintenance-inspection-submarines",
    },
    {
      id: "hvac-phase-1",
      name: "HVAC Phase I",
      description: "HVAC Phase I air flow measurements and trials form",
      path: "/app/forms/hvac-phase-1",
    },
    {
      id: "hvac-phase-2",
      name: "HVAC Phase II",
      description: "HVAC Phase II ambient conditions and AC plant data form",
      path: "/app/forms/hvac-phase-2",
    },
    {
      id: "impressed-current-cathodic-protection",
      name: "Impressed Current Cathodic Protection",
      description: "Impressed Current Cathodic Protection (ICCP) inspection and trials form",
      path: "/app/forms/impressed-current-cathodic-protection",
    },
    {
      id: "intermediate-underwater-hull-inspection-report",
      name: "Intermediate Underwater Hull Inspection Report",
      description: "Intermediate underwater hull inspection report form",
      path: "/app/forms/intermediate-underwater-hull-inspection-report",
    },
    {
      id: "manual-hoisting-lifting-transporting-devices-magazines",
      name: "Manual Hoisting, Lifting and Transporting Devices in Magazines",
      description: "Manual hoisting, lifting and transporting devices in magazines inspection form",
      path: "/app/forms/manual-hoisting-lifting-transporting-devices-magazines",
    },
    {
      id: "p75-aft-mooring-capstan",
      name: "P-75 AFT Mooring Capstan",
      description: "P-75 class aft mooring capstan inspection and trials form",
      path: "/app/forms/p75-aft-mooring-capstan",
    },
    {
      id: "p75-anchor-windlass",
      name: "P-75 Anchor Windlass",
      description: "P-75 class anchor windlass inspection and trials form",
      path: "/app/forms/p75-anchor-windlass",
    },
    {
      id: "p75-bollards-fairleads",
      name: "P-75 Bollards/Fairleads",
      description: "P-75 class bollards and fairleads inspection form",
      path: "/app/forms/p75-bollards-fairleads",
    },
    {
      id: "p75-doors-hatches",
      name: "P-75 Doors and Hatches",
      description: "P-75 class doors and hatches inspection form",
      path: "/app/forms/p75-doors-hatches",
    },
    {
      id: "p75-fwd-mooring-capstan",
      name: "P-75 FWD Mooring Capstan",
      description: "P-75 class forward mooring capstan inspection form",
      path: "/app/forms/p75-fwd-mooring-capstan",
    },
    {
      id: "pre-wetting-system",
      name: "Pre-Wetting System",
      description: "Pre-wetting system inspection and trials form",
      path: "/app/forms/pre-wetting-system",
    },
    {
      id: "preliminary-underwater-hull-inspection-report",
      name: "Preliminary Underwater Hull Inspection Report",
      description: "Preliminary underwater hull inspection report form",
      path: "/app/forms/preliminary-underwater-hull-inspection-report",
    },
    {
      id: "ras-capstan",
      name: "RAS Capstan",
      description: "RAS Capstan inspection and trials form",
      path: "/app/forms/ras-capstan",
    },
    {
      id: "ras-winch",
      name: "RAS Winch",
      description: "RAS Winch inspection and trials form",
      path: "/app/forms/ras-winch",
    },
    {
      id: "rhib-harbour-checks",
      name: "RHIB - Ship Borne Boat - Harbour Checks",
      description: "RHIB Ship Borne Boat Harbour Checks form",
      path: "/app/forms/rhib-harbour-checks",
    },
    {
      id: "rhib-ship-borne-boat-sea-trials",
      name: "RHIB - Ship Borne Boat - Sea Trials",
      description: "RHIB Ship Borne Boat Sea Trials form",
      path: "/app/forms/rhib-ship-borne-boat-sea-trials",
    },
];

const Forms = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600 mt-2">
            Access and fill out various forms for naval operations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formsData.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                {form.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{form.description}</p>
              <Link
                to={form.path}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Open Form
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forms;
