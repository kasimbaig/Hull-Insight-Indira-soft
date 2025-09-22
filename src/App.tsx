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
import DynamicFormFieldsMaster from "./pages/masters/DynamicFormFieldsMaster";
import StationMaster from "./pages/masters/StationMaster";
import CountryMaster from "./pages/masters/CountryMaster";
import StateMaster from "./pages/masters/StateMaster";
import CityMaster from "./pages/masters/CityMaster";
import RefitMaster from "./pages/masters/RefitMaster";
import ClusterMaster from "./pages/masters/ClusterMaster";
import Landing from "./pages/Landing";
import HvacReport from "./pages/HvacReport";
import ReportsSelection from "./pages/ReportsSelection";
import Forms from "./pages/Forms";
// Form page imports
import AccommodationLadderPage from "./pages/forms/AccommodationLadderPage";
import AnchorCapstanPage from "./pages/forms/AnchorCapstanPage";
import AptTrialProtocolPage from "./pages/forms/AptTrialProtocolPage";
import AviationAircraftArmamentLiftsPage from "./pages/forms/AviationAircraftArmamentLiftsPage";
import BoatDavitPage from "./pages/forms/BoatDavitPage";
import CargoLiftVKDPage from "./pages/forms/CargoLiftVKDPage";
import CargoPassengerGalleyLiftsPage from "./pages/forms/CargoPassengerGalleyLiftsPage";
import CargoWinchPage from "./pages/forms/CargoWinchPage";
import CitadelTrialsPage from "./pages/forms/CitadelTrialsPage";
import DeckCrane40MPage from "./pages/forms/DeckCrane40MPage";
import EKMAnchorCapstanPage from "./pages/forms/EKMAnchorCapstanPage";
import EKMMooringCapstanPage from "./pages/forms/EKMMooringCapstanPage";
import EKMDoorsAndHatchesPage from "./pages/forms/EKMDoorsAndHatchesPage";
import EKMEmergencyTowingArrangementsPage from "./pages/forms/EKMEmergencyTowingArrangementsPage";
import FinalUnderwaterHullInspectionPage from "./pages/forms/FinalUnderwaterHullInspectionPage";
import FireScreenDrivePage from "./pages/forms/FireScreenDrivePage";
import HangerDoorPage from "./pages/forms/HangerDoorPage";
import GalleyLiftsPage from "./pages/forms/GalleyLiftsPage";
import HangerShutterPage from "./pages/forms/HangerShutterPage";
import HeloDeckFrictionTestPage from "./pages/forms/HeloDeckFrictionTestPage";
import HeloTraversingSystemPage from "./pages/forms/HeloTraversingSystemPage";
import HullMaintenanceInspectionforShipsPage from "./pages/forms/HullMaintenanceInspectionforShipsPage";
import HullMaintenanceInspectionforSubmarinesPage from "./pages/forms/HullMaintenanceInspectionforSubmarinesPage";
import HVACPhase1Page from "./pages/forms/HVACPhase1Page";
import HVACPhase2Page from "./pages/forms/HVACPhase2Page";
import ImpressedCurrentCathodicProtectionPage from "./pages/forms/ImpressedCurrentCathodicProtectionPage";
import IntermediateUnderwaterHullInspectionReportPage from "./pages/forms/IntermediateUnderwaterHullInspectionReportPage";
import ManualHoistingLiftingAndTransportingDevicesInMagazinesPage from "./pages/forms/ManualHoistingLiftingAndTransportingDevicesInMagazinesPage";
import P75AFTMooringCapstanPage from "./pages/forms/P75AFTMooringCapstanPage";
import P75AnchorWindlassPage from "./pages/forms/P75AnchorWindlassPage";
import P75BollardsFairleadsPage from "./pages/forms/P75BollardsFairleadsPage";
import P75DoorsAndHatchesPage from "./pages/forms/P75DoorsAndHatchesPage";
import P75FWDMooringCapstanPage from "./pages/forms/P75FWDMooringCapstanPage";
import PreWettingSystemPage from "./pages/forms/PreWettingSystemPage";
import PreliminaryUnderwaterHullInspectionReportPage from "./pages/forms/PreliminaryUnderwaterHullInspectionReportPage";
import RasCapstanPage from "./pages/forms/RasCapstanPage";
import RasWinchPage from "./pages/forms/RasWinchPage";
import RHIBHarbourChecksPage from "./pages/forms/RHIBHarbourChecksPage";
import RHIPShipBorneBoatSeaTrialsPage from "./pages/forms/RHIPShipBorneBoatSeaTrialsPage";
import SacLiftNo1Page from "./pages/forms/SacLiftNo1Page";
import SewageTreatmentPlantPage from "./pages/forms/SewageTreatmentPlantPage";
import SSKAftMooringCapstanPage from "./pages/forms/SSKAftMooringCapstanPage";
import SSKAnchorWindlassAndFWDMooringCapstanPage from "./pages/forms/SSKAnchorWindlassAndFWDMooringCapstanPage";
import SSKBollardsCleatBullRingPage from "./pages/forms/SSKBollardsCleatBullRingPage";
import SSKDoorsAndHatchesPage from "./pages/forms/SSKDoorsAndHatchesPage";
import SSKRescueSpherePage from "./pages/forms/SSKRescueSpherePage";
import SSKTowingArrangementsFormPage from "./pages/forms/SSKTowingArrangementsForm";
import StructuralSoundnessOfHeloHangerFormPage from "./pages/forms/StructuralSoundnessOfHeloHangerForm";
import UWCompartmentsHullInspectionReportFormPage from "./pages/forms/UWCompartmentsHullInspectionReportForm";
import WarpingCapstanFormPage from "./pages/forms/WarpingCapstanForm";
import WinchSystemOfAccommodationLadderFormPage from "./pages/forms/WinchSystemOfAccommodationLadderForm";
import WTDoorFormPage from "./pages/forms/WTDoorForm";
import WTHatchFormPage from "./pages/forms/WTHatchForm";
import ShipWeightManagement from "./pages/ShipWeightManagement";
import BerCertificate from "./pages/BerCertificate";
import RenderPart1 from "./pages/RenderPart1";
import LoadTest from "./pages/LoadTest";
import In305Form from "./pages/In305Form";
import DockingApproval from "./pages/DockingApproval";
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
import TTTest from "./pages/TTTest";
import ParticularsInternalAboveWaterStructure from "./pages/ParticularsInternalAboveWaterStructure";
import ParticularsUnderwaterHullSurveyByYard from "./pages/ParticularsUnderwaterHullSurveyByYard";
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
          <Route path="masters/dynamic-form-fields" element={<DynamicFormFieldsMaster />} />
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
            <Route path="yard/docking-approval" element={<DockingApproval />} />
            <Route path="yard/particulars-internal-above-water-structure" element={<ParticularsInternalAboveWaterStructure />} />
            <Route path="yard/particulars-underwater-hull-survey-by-yard" element={<ParticularsUnderwaterHullSurveyByYard />} />
          
          {/* Ship Operations Module */}
          <Route path="ship/*" element={<ShipModule />} />
          
          <Route path="drawing" element={<Drawing />} />
          <Route path="forms" element={<Forms />} />
          <Route path="forms/accommodation-ladder" element={<AccommodationLadderPage />} />
          <Route path="forms/anchor-capstan" element={<AnchorCapstanPage />} />
          <Route path="forms/apt-trial-protocol" element={<AptTrialProtocolPage />} />
          <Route path="forms/aviation-aircraft-armament-lifts" element={<AviationAircraftArmamentLiftsPage />} />
          <Route path="forms/boat-davit" element={<BoatDavitPage />} />
          <Route path="forms/cargo-lift-vkd" element={<CargoLiftVKDPage />} />
          <Route path="forms/cargo-passenger-galley-lifts" element={<CargoPassengerGalleyLiftsPage />} />
          <Route path="forms/cargo-winch" element={<CargoWinchPage />} />
          <Route path="forms/citadel-trials" element={<CitadelTrialsPage />} />
                      <Route path="forms/deck-crane-40m" element={<DeckCrane40MPage />} />
                      <Route path="forms/ekm-anchor-capstan" element={<EKMAnchorCapstanPage />} />
                      <Route path="forms/ekm-mooring-capstan" element={<EKMMooringCapstanPage />} />
                      <Route path="forms/ekm-doors-hatches" element={<EKMDoorsAndHatchesPage />} />
                      <Route path="forms/ekm-emergency-towing-arrangements" element={<EKMEmergencyTowingArrangementsPage />} />
                      <Route path="forms/final-underwater-hull-inspection" element={<FinalUnderwaterHullInspectionPage />} />
                      <Route path="forms/fire-screen-drive" element={<FireScreenDrivePage />} />
                      <Route path="forms/hanger-door" element={<HangerDoorPage />} />
                      <Route path="forms/galley-lifts" element={<GalleyLiftsPage />} />
                      <Route path="forms/hanger-shutter" element={<HangerShutterPage />} />
                      <Route path="forms/helo-deck-friction-test" element={<HeloDeckFrictionTestPage />} />
                      <Route path="forms/helo-traversing-system" element={<HeloTraversingSystemPage />} />
                      <Route path="forms/hull-maintenance-inspection-ships" element={<HullMaintenanceInspectionforShipsPage />} />
                      <Route path="forms/hull-maintenance-inspection-submarines" element={<HullMaintenanceInspectionforSubmarinesPage />} />
                      <Route path="forms/hvac-phase-1" element={<HVACPhase1Page />} />
              <Route path="forms/hvac-phase-2" element={<HVACPhase2Page />} />
              <Route path="forms/impressed-current-cathodic-protection" element={<ImpressedCurrentCathodicProtectionPage />} />
              <Route path="forms/intermediate-underwater-hull-inspection-report" element={<IntermediateUnderwaterHullInspectionReportPage />} />
              <Route path="forms/manual-hoisting-lifting-transporting-devices-magazines" element={<ManualHoistingLiftingAndTransportingDevicesInMagazinesPage />} />
              <Route path="forms/p75-aft-mooring-capstan" element={<P75AFTMooringCapstanPage />} />
              <Route path="forms/p75-anchor-windlass" element={<P75AnchorWindlassPage />} />
              <Route path="forms/p75-bollards-fairleads" element={<P75BollardsFairleadsPage />} />
              <Route path="forms/p75-doors-hatches" element={<P75DoorsAndHatchesPage />} />
              <Route path="forms/p75-fwd-mooring-capstan" element={<P75FWDMooringCapstanPage />} />
              <Route path="forms/pre-wetting-system" element={<PreWettingSystemPage />} />
              <Route path="forms/preliminary-underwater-hull-inspection-report" element={<PreliminaryUnderwaterHullInspectionReportPage />} />
              <Route path="forms/ras-capstan" element={<RasCapstanPage />} />
              <Route path="forms/ras-winch" element={<RasWinchPage />} />
              <Route path="forms/rhib-harbour-checks" element={<RHIBHarbourChecksPage />} />
              <Route path="forms/rhib-ship-borne-boat-sea-trials" element={<RHIPShipBorneBoatSeaTrialsPage />} />
              <Route path="forms/sac-lift-no-1" element={<SacLiftNo1Page />} />
              <Route path="forms/sewage-treatment-plant" element={<SewageTreatmentPlantPage />} />
              <Route path="forms/ssk-aft-mooring-capstan" element={<SSKAftMooringCapstanPage />} />
              <Route path="forms/ssk-anchor-windlass-fwd-mooring-capstan" element={<SSKAnchorWindlassAndFWDMooringCapstanPage />} />
              <Route path="forms/ssk-bollards-cleat-bull-ring" element={<SSKBollardsCleatBullRingPage />} />
              <Route path="forms/ssk-doors-and-hatches" element={<SSKDoorsAndHatchesPage />} />
              <Route path="forms/ssk-rescue-sphere" element={<SSKRescueSpherePage />} />
              <Route path="forms/ssk-towing-arrangements" element={<SSKTowingArrangementsFormPage />} />
              <Route path="forms/structural-soundness-helo-hanger" element={<StructuralSoundnessOfHeloHangerFormPage />} />
            <Route path="forms/uw-compartments-hull-inspection-report" element={<UWCompartmentsHullInspectionReportFormPage />} />
            <Route path="forms/warping-capstan" element={<WarpingCapstanFormPage />} />
            <Route path="forms/winch-system-accommodation-ladder" element={<WinchSystemOfAccommodationLadderFormPage />} />
            <Route path="forms/wt-door" element={<WTDoorFormPage />} />
            <Route path="forms/wt-hatch" element={<WTHatchFormPage />} />
          <Route path="hvac-report" element={<HvacReport />} />
          <Route path="form-comments" element={<FormComments />} />
          <Route path="tttest" element={<TTTest />} />
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
