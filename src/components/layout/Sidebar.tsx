import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Database,
  Ship,
  BarChart3,
  ChevronDown,
  Building2,
  PenTool,
  Users,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import hullInsightLogo from "@/assets/hull-insight-logo.png";
import { FileText } from "lucide-react";

// Sidebar items (supports nested menus)
const sidebarItems = [
  { title: "Dashboards", icon: BarChart3, path: "/app/dashboard" },
  { title: "Setup", icon: Users, path: "/app/setup" },
  {
    title: "Global Masters",
    icon: Database,
    items: [
      { title: "Unit", path: "/app/masters/unit" },
      { title: "Command", path: "/app/masters/command" },
      { title: "Vessel", path: "/app/masters/vessel" },
      { title: "Dockyard", path: "/app/masters/dockyard" },
      { title: "Equipment", path: "/app/masters/equipment" },
      { title: "Module", path: "/app/masters/module" },
      { title: "Submodule", path: "/app/masters/submodule" },
      { title: "Operational Status", path: "/app/masters/operationalstatus" },
      { title: "Severity", path: "/app/masters/severity" },
      { title: "Damage Type", path: "/app/masters/damagetype" },
      { title: "System", path: "/app/masters/system" },
      { title: "Compartment", path: "/app/masters/compartment" },
      { title: "Vessel Class", path: "/app/masters/vesselclass" },
      { title: "Station", path: "/app/masters/station" },
      { title: "Country", path: "/app/masters/country" },
      { title: "State", path: "/app/masters/state" },
      { title: "City", path: "/app/masters/city" },
      { title: "Refit", path: "/app/masters/refit" },
      { title: "Cluster", path: "/app/masters/cluster" },
    ],
  },
  {
    title: "Yard Operations",
    icon: Building2,
    items: [
      { title: "Dashboard", path: "/app/yard/dashboard" },
      {
        title: "Transactions",
        icon: Building2,
        items: [
          // { title: "Docking Plan", path: "/app/yard/docking" },
          { title: "DOCKING PLAN APPROVAL", path: "/app/returns/docking-plan-approval" },
          { title: "Docking Approval", path: "/app/yard/docking-approval" },
          { title: "DOCKING REPORT SECTION -1", path: "/app/returns/in379-docking-report-section1" },
          { title: "PARTICULARS OF INTERNAL & ABOVE WATER STRUCTURE", path: "/app/yard/particulars-internal-above-water-structure" },
          { title: "PARTICULARS OF UNDERWATER HULL SURVEY BY YARD", path: "/app/yard/particulars-underwater-hull-survey-by-yard" },

        ],
      },
      // { title: "Reports", path: "/app/yard/reports" },
    ],
  },
  {
    title: "Hitu Module",
    icon: FileText,
    items: [
      { title: "Dashboard", path: "/app/ship/dashboard" },
      {
        title: "Transactions",
        icon: Building2,
        items: [
          { title: "Preliminary Underwater Hull Inspection Report", path: "/app/reports/preliminary-underwater-hull-inspection-report-page" },
          { title: "Accommodation Ladder", path: "/app/forms/accommodation-ladder" },
          { title: "Anchor Capstan", path: "/app/forms/anchor-capstan" },
          { title: "APT Trial Protocol", path: "/app/forms/apt-trial-protocol" },
          { title: "Aviation Aircraft Armament Lifts", path: "/app/forms/aviation-aircraft-armament-lifts" },
          { title: "Boat Davit", path: "/app/forms/boat-davit" },
          { title: "Cargo Lift (VKD)", path: "/app/forms/cargo-lift-vkd" },
          { title: "Cargo Passenger and Galley Lifts", path: "/app/forms/cargo-passenger-galley-lifts" },
          { title: "Cargo Winch", path: "/app/forms/cargo-winch" },
          { title: "Citadel Trials", path: "/app/forms/citadel-trials" },
                      { title: "Deck Crane 40M", path: "/app/forms/deck-crane-40m" },
                      { title: "EKM Anchor Capstan", path: "/app/forms/ekm-anchor-capstan" },
                      { title: "EKM Mooring Capstan", path: "/app/forms/ekm-mooring-capstan" },
                      { title: "EKM Doors and Hatches", path: "/app/forms/ekm-doors-hatches" },
                      { title: "EKM Emergency Towing Arrangements", path: "/app/forms/ekm-emergency-towing-arrangements" },
                      { title: "Final Underwater Hull Inspection", path: "/app/forms/final-underwater-hull-inspection" },
                      { title: "Fire Screen Drive", path: "/app/forms/fire-screen-drive" },
                      { title: "Hanger Door", path: "/app/forms/hanger-door" },
                      { title: "Galley Lifts", path: "/app/forms/galley-lifts" },
                      { title: "Hanger Shutter", path: "/app/forms/hanger-shutter" },
                      { title: "Helo Deck Friction Test", path: "/app/forms/helo-deck-friction-test" },
                      { title: "Helo Traversing System", path: "/app/forms/helo-traversing-system" },
                      { title: "Hull Maintenance Inspection for Ships", path: "/app/forms/hull-maintenance-inspection-ships" },
                      { title: "Hull Maintenance Inspection for Submarines", path: "/app/forms/hull-maintenance-inspection-submarines" },
                      { title: "HVAC Phase I", path: "/app/forms/hvac-phase-1" },
          { title: "HVAC Phase II", path: "/app/forms/hvac-phase-2" },
          { title: "Impressed Current Cathodic Protection", path: "/app/forms/impressed-current-cathodic-protection" },
          { title: "Intermediate Underwater Hull Inspection Report", path: "/app/forms/intermediate-underwater-hull-inspection-report" },
          { title: "Manual Hoisting, Lifting and Transporting Devices in Magazines", path: "/app/forms/manual-hoisting-lifting-transporting-devices-magazines" },
          { title: "P-75 AFT Mooring Capstan", path: "/app/forms/p75-aft-mooring-capstan" },
          { title: "P-75 Anchor Windlass", path: "/app/forms/p75-anchor-windlass" },
          { title: "P-75 Bollards/Fairleads", path: "/app/forms/p75-bollards-fairleads" },
          { title: "P-75 Doors and Hatches", path: "/app/forms/p75-doors-hatches" },
          { title: "P-75 FWD Mooring Capstan", path: "/app/forms/p75-fwd-mooring-capstan" },
          { title: "Pre-Wetting System", path: "/app/forms/pre-wetting-system" },
          { title: "RAS Capstan", path: "/app/forms/ras-capstan" },
          { title: "RAS Winch", path: "/app/forms/ras-winch" },
          { title: "RHIB - Ship Borne Boat - Harbour Checks", path: "/app/forms/rhib-harbour-checks" },
          { title: "RHIB - Ship Borne Boat - Sea Trials", path: "/app/forms/rhib-ship-borne-boat-sea-trials" },
          { title: "SAC Lift No.1", path: "/app/forms/sac-lift-no-1" },
          { title: "Sewage Treatment Plant", path: "/app/forms/sewage-treatment-plant" },
          { title: "SSK Class AFT Mooring Capstan", path: "/app/forms/ssk-aft-mooring-capstan" },
          { title: "SSK Class Anchor Windlass and FWD Mooring Capstan", path: "/app/forms/ssk-anchor-windlass-fwd-mooring-capstan" },
          { title: "SSK Class Bollards/Cleat/Bull Ring", path: "/app/forms/ssk-bollards-cleat-bull-ring" },
          { title: "SSK Class Doors and Hatches", path: "/app/forms/ssk-doors-and-hatches" },
          { title: "SSK Class Rescue Sphere", path: "/app/forms/ssk-rescue-sphere" },
          { title: "SSK Class Towing Arrangements", path: "/app/forms/ssk-towing-arrangements" },
          { title: "Structural Soundness of Helo Hanger", path: "/app/forms/structural-soundness-helo-hanger" },
          { title: "U/W Compartments Hull Inspection Report", path: "/app/forms/uw-compartments-hull-inspection-report" },
          { title: "Warping Capstan", path: "/app/forms/warping-capstan" },
          { title: "Winch System of Accommodation Ladder", path: "/app/forms/winch-system-accommodation-ladder" },
          { title: "WT Door", path: "/app/forms/wt-door" },
          { title: "WT Hatch", path: "/app/forms/wt-hatch" },
        ],
      },
      // { title: "Reports", path: "/app/ship/reports" },
    ],
  },
  {
    title: "Ship Operations",
    icon: Ship,
    items: [
      { title: "Dashboard", path: "/app/ship/dashboard" },
      {
        title: "Transactions",
        icon: Building2,
        items: [
          // { title: "Quarterly Hull Survey", path: "/app/ship/survey" },
          { title: "HVAC Trial", path: "/app/ship/hvac" },
          { title: "SHIP WEIGHT MANAGEMENT", path: "/app/returns/ship-weight-management" },
          { title: "BER CERTIFICATE", path: "/app/returns/ber-certificate" },
          { title: "IN-378 RENDER PART-I", path: "/app/in378/render-part1" },
          { title: "IN-378 RENDER PART-II", path: "/app/returns/in378-render-part2" },
          { title: "LOAD TEST", path: "/app/returns/load-test" },
          { title: "IN 305", path: "/app/returns/in305" },
          { title: "BHS", path: "/app/returns/bhs" },
          { title: "QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH SACRIFICIAL ANODES", path: "/app/returns/hull-potential-data" },
          { title: "QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH ICCP SYSTEM", path: "/app/returns/iccp-hull-potential" },
          { title: "PAINT DETAILS", path: "/app/returns/paint-details" },
          { title: "SHIP STAFF REPORT OF HULL INSPECTION INS -", path: "/app/reports/hull-inspection" },
        ],
      },
      {
        title: "Reports",
        icon: BarChart3,
        items: [
          { title: "LOAD TEST REPORT", path: "/app/reports/load-test-report" },
          { title: "BOAT HISTORY SHEET", path: "/app/reports/boat-history-sheet" },
          { title: "SHIP WEIGHT MANAGEMENT", path: "/app/reports/ship-weight-management" },
          { title: "QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH SACRIFICIAL ANODES", path: "/app/reports/quarterly-hull-potential-sacrificial-anodes" },
          { title: "PART-I QUARTERLY HULL POTENTIAL DATA OF SHIPS FITTED WITH ICCP SYSTEM", path: "/app/reports/quarterly-hull-potential-iccp-system" },
          { title: "HULL POTENTIAL RETURN", path: "/app/reports/hull-potential-return" },
          { title: "DOCKING REPORT SECTION - I", path: "/app/reports/docking-report-section-1" },
          { title: "DOCKING REPORT SECTION - II", path: "/app/reports/docking-report-section-2" },
          { title: "DOCKING REPORT SECTION - III", path: "/app/reports/docking-report-section-3" },
          { title: "SHIP STAFF REPORT OF HULL INSPECTION", path: "/app/reports/ship-staff-report-hull-inspection" },
        ],
      },
    ],
  },
  { title: "Interactive Drawing", icon: PenTool, path: "/app/drawing" },
  { title: "HVAC Report", icon: BarChart3, path: "/app/hvac-report" },
  { title: "Commentor Sheet", icon: MessageSquare, path: "/app/form-comments" },
  { title: "TTTest", icon: MessageSquare, path: "/app/tttest" },
];

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Global Masters"]);
  const location = useLocation();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  // Recursive rendering for nested menus
  const renderMenuItems = (items: any[], level = 0) =>
    items.map((item) => {
      if (item.path) {
        // Simple nav item
        return (
          <NavLink key={item.path} to={item.path}>
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={cn(
                "w-full justify-start rounded-md transition-all duration-200 relative z-10",
                isActive(item.path)
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
                  : "hover:bg-white/10 hover:text-cyan-300",
                level > 0 && "ml-4"
              )}
            >
              {item.icon && !collapsed && (
                <item.icon className="h-4 w-4 mr-2 shrink-0" />
              )}
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Button>
          </NavLink>
        );
      }

      // Collapsible nav item
      return (
        <Collapsible
          key={item.title}
          open={expandedItems.includes(item.title)}
          onOpenChange={() => toggleExpanded(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={cn(
                "w-full justify-start rounded-lg transition-all duration-300 group relative z-10",
                "hover:bg-white/10 hover:text-cyan-300",
                level > 0 && "ml-4"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:rotate-6",
                  !collapsed && "mr-2"
                )}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      expandedItems.includes(item.title) && "rotate-180 text-cyan-300"
                    )}
                  />
                </>
              )}
            </Button>
          </CollapsibleTrigger>

          {!collapsed && (
            <CollapsibleContent className="ml-6 space-y-1 overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              {renderMenuItems(item.items ?? [], level + 1)}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    });

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white transition-all duration-500 shadow-xl",
        collapsed ? "w-16" : "w-64",
        "relative overflow-x-hidden overflow-y-auto h-screen"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3 sticky top-0 bg-[#0f172a] z-20">
        <img
          src={hullInsightLogo}
          alt="Hull Insight"
          className="w-8 h-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
        />
        {!collapsed && (
          <div>
            <h2 className="font-extrabold text-lg bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Hull Insight
            </h2>
            <p className="text-xs text-gray-300">Naval Operations</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 relative z-0">{renderMenuItems(sidebarItems)}</nav>
    </div>
  );
};

export default Sidebar;
