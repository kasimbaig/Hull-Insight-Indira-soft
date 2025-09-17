import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import FleetMaster from "./pages/masters/FleetMaster";
import UnitMaster from "./pages/masters/UnitMaster";
import CommandMaster from "./pages/masters/CommandMaster";
import VesselMaster from "./pages/masters/VesselMaster";
import DockyardMaster from "./pages/masters/DockyardMaster";
import NotFound from "./pages/NotFound";
import Drawing from "./pages/Drawing";
import EquipmentMaster from "@/pages/masters/EquipmentMaster";
import DamageTypeMaster from "@/pages/masters/DamageTypeMaster";
import SeverityMaster from "@/pages/masters/SeverityMaster";
import OperationalStatusMaster from "@/pages/masters/OperationalStatusMaster";
import SubmoduleMaster from "@/pages/masters/SubmoduleMaster";
import ModuleMaster from "@/pages/masters/ModuleMaster"; // <-- Add this import
import CompartmentMaster from "@/pages/masters/CompartmentMaster";
import SystemMaster from "@/pages/masters/SystemMaster"; // <-- Create this file similarly
import UserMaster from "@/pages/masters/UserMaster";
import RootConfigMaster from "@/pages/masters/RootConfigMaster";
import RoleMaster from "@/pages/masters/RoleMaster";
import RoleAccess from "./pages/masters/RoleAccess";
import VesselClassMaster from "./pages/masters/VesselClassMaster";
import StationMaster from "./pages/masters/StationMaster";
import CountryMaster from "./pages/masters/CountryMaster";
import StateMaster from "./pages/masters/StateMaster";
import CityMaster from "./pages/masters/CityMaster";
import RefitMaster from "./pages/masters/RefitMaster";
import ClusterMaster from "./pages/masters/ClusterMaster";
import Landing from "./pages/Landing";
import HvacReport from "./pages/HvacReport";
import ReportsSelection from "./pages/ReportsSelection";
import ShipWeightManagement from "./pages/ShipWeightManagement";
import BerCertificate from "./pages/BerCertificate";
import RenderPart1 from "./pages/RenderPart1";
import LoadTest from "./pages/LoadTest";
import In305Form from "./pages/In305Form";
import BoatHistorySheet from "./pages/BoatHistorySheet";
import HullPotentialDataForm from "./pages/HullPotentialDataForm";
import ICCPHullPotentialForm from "./pages/ICCPHullPotentialForm";
import HullInspectionReport from "./pages/HullInspectionReport";
import PaintDetails from "./pages/PaintDetails";
import DockingPlanApprovalReport from "./pages/DockingPlanApprovalReport";
import MaritimeDockingForm from "./pages/MaritimeDockingForm";
import RenderPart2 from "./pages/RenderPart2";
import LoadTestReport from "./pages/LoadTestReport";
import BHSReport from "./pages/BHSReport";
import ShipWeightManagementReport from "./pages/ShipWeightManagementReport";
import ICCPReturnsReport from "./pages/ICCPReturnsReport";
import ICCPSystemReport from "./pages/ICCPSystemReport";
import HullPotentialReturnReport from "./pages/HullPotentialReturnReport";
import IN379DockingReportSection1Report from "./pages/IN379DockingReportSection1Report";
import IN379DockingReportSection2Report from "./pages/IN379DockingReportSection2Report";
import IN379DockingReportSection3Report from "./pages/IN379DockingReportSection3Report";
import ShipStaffReportHullInspection from "./pages/ShipStaffReportHullInspection";
import FormComments from "./pages/FormComments";
// Module imports
import YardModule from "./pages/yard/YardModule";
import ShipModule from "./pages/ship/ShipModule";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="masters/fleet" element={<FleetMaster />} />
          <Route path="masters/unit" element={<UnitMaster />} />
          <Route path="masters/command" element={<CommandMaster />} />
          <Route path="masters/vessel" element={<VesselMaster />} />
          <Route path="masters/dockyard" element={<DockyardMaster />} />
          <Route path="masters/equipment" element={<EquipmentMaster />} />
          <Route path="masters/module" element={<ModuleMaster />} />
          <Route path="masters/submodule" element={<SubmoduleMaster />} />
          <Route path="masters/damagetype" element={<DamageTypeMaster />} />
          <Route path="masters/severity" element={<SeverityMaster />} />
          <Route path="masters/operationalstatus" element={<OperationalStatusMaster />} />
          <Route path="masters/compartment" element={<CompartmentMaster />} />
          <Route path="masters/system" element={<SystemMaster />} />
          <Route path="masters/user" element={<UserMaster />} />
          <Route path="masters/rootconfig" element={<RootConfigMaster />} />
          <Route path="masters/role" element={<RoleMaster />} />
          <Route path="masters/roleaccess" element={<RoleAccess />} />
          <Route path="masters/vesselclass" element={<VesselClassMaster />} />
          <Route path="masters/station" element={<StationMaster />} />
          <Route path="masters/country" element={<CountryMaster />} />
          <Route path="masters/state" element={<StateMaster />} />
          <Route path="masters/city" element={<CityMaster />} />
          <Route path="masters/refit" element={<RefitMaster />} />
          <Route path="masters/cluster" element={<ClusterMaster />} />
          {/* Placeholder routes for other masters */}
          <Route path="masters/*" element={<div className="p-8 text-center text-muted-foreground">Master page coming soon...</div>} />
          
          {/* Yard Operations Module */}
          <Route path="yard/*" element={<YardModule />} />
          
          {/* Ship Operations Module */}
          <Route path="ship/*" element={<ShipModule />} />
          
          <Route path="drawing" element={<Drawing />} />
          <Route path="hvac-report" element={<HvacReport />} />
          <Route path="form-comments" element={<FormComments />} />
          <Route path="reports" element={<ReportsSelection />} />
          <Route path="returns/ship-weight-management" element={<ShipWeightManagement />} />
          <Route path="returns/ber-certificate" element={<BerCertificate />} />
          <Route path="returns/load-test" element={<LoadTest />} />
          <Route path="returns/in305" element={<In305Form />} />
          <Route path="returns/bhs" element={<BoatHistorySheet />} />
          <Route path="returns/hull-potential-data" element={<HullPotentialDataForm />} />
          <Route path="returns/iccp-hull-potential" element={<ICCPHullPotentialForm />} />
          <Route path="returns/paint-details" element={<PaintDetails />} />
          <Route path="returns/docking-plan-approval" element={<DockingPlanApprovalReport />} />
          <Route path="returns/in379-docking-report-section1" element={<MaritimeDockingForm />} />
          <Route path="returns/in378-render-part2" element={<RenderPart2 />} />
          <Route path="reports/hull-inspection" element={<HullInspectionReport />} />
          <Route path="reports/load-test-report" element={<LoadTestReport />} />
          <Route path="reports/boat-history-sheet" element={<BHSReport />} />
          <Route path="reports/ship-weight-management" element={<ShipWeightManagementReport />} />
          <Route path="reports/quarterly-hull-potential-sacrificial-anodes" element={<ICCPReturnsReport />} />
          <Route path="reports/quarterly-hull-potential-iccp-system" element={<ICCPSystemReport />} />
          <Route path="reports/hull-potential-return" element={<HullPotentialReturnReport />} />
          <Route path="reports/docking-report-section-1" element={<IN379DockingReportSection1Report />} />
          <Route path="reports/docking-report-section-2" element={<IN379DockingReportSection2Report />} />
          <Route path="reports/docking-report-section-3" element={<IN379DockingReportSection3Report />} />
          <Route path="reports/ship-staff-report-hull-inspection" element={<ShipStaffReportHullInspection />} />
          <Route path="in378/render-part1" element={<RenderPart1 />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
