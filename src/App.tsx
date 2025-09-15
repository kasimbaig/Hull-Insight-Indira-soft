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
          {/* Placeholder routes for other masters */}
          <Route path="masters/*" element={<div className="p-8 text-center text-muted-foreground">Master page coming soon...</div>} />
          
          {/* Yard Operations Module */}
          <Route path="yard/*" element={<YardModule />} />
          
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
          <Route path="reports" element={<ReportsSelection />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
