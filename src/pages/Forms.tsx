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
