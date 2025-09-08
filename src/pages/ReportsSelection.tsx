import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { 
  FileText, 
  BarChart3, 
  Thermometer, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Ship, 
  AlertTriangle, 
  X,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Shield,
  Navigation,
  Settings,
  MoreVertical,
  Star,
  Zap,
  Target,
  Award,
  Globe,
  Database,
  Layers,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,
  Plus,
  RefreshCw,
  Bell,
  BookOpen,
  FileCheck,
  ClipboardList,
  Archive,
  Trash2,
  Edit,
  Share,
  ExternalLink
} from "lucide-react";
import DockingReportPage from "./DockingReport";
import SurveyReportPage from "./SurveyReport";
import Reports from "./Reports";
import { get } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

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
  command: {
    id: number;
    name: string;
    code: string;
  };
  year_of_build: number;
  year_of_delivery: number;
}

const ReportsSelection = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedReportItem, setSelectedReportItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [reportType, setReportType] = useState('all');
  const [selectedVessel, setSelectedVessel] = useState('all');
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [isLoadingVessels, setIsLoadingVessels] = useState(false);
  const [hvacReportData, setHvacReportData] = useState<any>(null);
  const [isLoadingHvacData, setIsLoadingHvacData] = useState(false);

  // Fetch vessels from API
  const fetchVessels = async () => {
    setIsLoadingVessels(true);
    try {
      const res = await get('/master/vessels/');
      setVessels(res.data || []);
    } catch (err) {
      console.error('Failed to fetch vessels', err);
      toast({
        title: "Error",
        description: "Failed to fetch vessels. Using sample data.",
        variant: "destructive",
      });
      // Fallback to sample data if API fails
      setVessels([
        { id: 1, name: 'INS Vikrant', code: 'O95JQBDY74XU1JB', classofvessel: { id: 1, name: 'Arihant Class', code: 'ARIHANT' }, vesseltype: { id: 1, name: 'Aircraft Carriers', code: 'Aircraft' }, command: { id: 1, name: 'Eastern Naval Command', code: 'ENC' }, year_of_build: 2009, year_of_delivery: 2022 },
        { id: 2, name: 'INS Vikramaditya', code: 'AQ6I299H0GXNKNT', classofvessel: { id: 7, name: 'Kalvari class', code: 'KALVARI' }, vesseltype: { id: 1, name: 'Aircraft Carriers', code: 'Aircraft' }, command: { id: 5, name: 'Southern Naval Command', code: 'SNC' }, year_of_build: 2004, year_of_delivery: 2013 },
        { id: 3, name: 'INS Kolkata', code: 'TA8O5D4OXI7OG1Q', classofvessel: { id: 10, name: 'Kolkata class', code: 'KOLKATA' }, vesseltype: { id: 2, name: 'Destroyer', code: 'Destroyer' }, command: { id: 1, name: 'Eastern Naval Command', code: 'ENC' }, year_of_build: 2004, year_of_delivery: 2014 },
        { id: 4, name: 'INS Chennai', code: 'UVKDNOXCG5WK5JI', classofvessel: { id: 10, name: 'Kolkata class', code: 'KOLKATA' }, vesseltype: { id: 2, name: 'Destroyer', code: 'Destroyer' }, command: { id: 6, name: 'Andaman & Nicobar Naval Command', code: 'ANC' }, year_of_build: 2008, year_of_delivery: 2016 },
        { id: 5, name: 'INS Shivalik', code: 'RDYO77ZRINI7F39', classofvessel: { id: 11, name: 'Shivalik class', code: 'SHIVALIK' }, vesseltype: { id: 3, name: 'Frigate', code: 'Frigate' }, command: { id: 1, name: 'Eastern Naval Command', code: 'ENC' }, year_of_build: 2001, year_of_delivery: 2010 }
      ]);
    } finally {
      setIsLoadingVessels(false);
    }
  };

  // Fetch HVAC report data when vessel is selected
  const fetchHvacReportData = async (vesselId: number) => {
    console.log('Starting HVAC data fetch for vessel ID:', vesselId);
    setIsLoadingHvacData(true);
    try {
      const res = await get(`/shipmodule/ship-report/${vesselId}/`);
      console.log('HVAC API response:', res);
      setHvacReportData(res);
    } catch (err) {
      console.error('Failed to fetch HVAC report data', err);
      toast({
        title: "Error",
        description: "Failed to fetch HVAC report data for the selected vessel.",
        variant: "destructive",
      });
      setHvacReportData(null);
    } finally {
      setIsLoadingHvacData(false);
    }
  };

  useEffect(() => {
    fetchVessels();
  }, []);

  // Fetch HVAC data when vessel is selected and report type is HVAC
  useEffect(() => {
    if (reportType === 'hvac' && selectedVessel && selectedVessel !== 'all') {
      const vessel = vessels.find(v => v.name === selectedVessel);
      if (vessel) {
        console.log('Fetching HVAC data for vessel:', vessel.name, 'ID:', vessel.id);
        fetchHvacReportData(vessel.id);
      }
    } else {
      setHvacReportData(null);
    }
  }, [selectedVessel, reportType, vessels]);

  const statsData = [
    {
      title: 'Total Reports',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
      trend: 12.5,
      description: 'vs last month'
    },
    {
      title: 'Active Vessels',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: Ship,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-500',
      trend: 8,
      description: 'vessels in operation'
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '-15%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-500',
      trend: -15,
      description: 'awaiting approval'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-500',
      trend: 2.1,
      description: 'overall efficiency'
    }
  ];

  const reportTypes = [
    {
      id: 'docking',
      title: 'Docking Reports',
      description: 'Comprehensive vessel docking plans with specifications, maintenance schedules, and approval workflows',
      icon: Navigation,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-200',
      hoverBorderColor: 'hover:border-blue-400',
      textColor: 'text-blue-800',
      bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50',
      iconBg: 'bg-blue-500',
      accentColor: 'text-blue-600',
      count: 45,
      lastUpdated: '2 hours ago',
      reports: [
        { 
          id: 1, 
          name: 'INS Vikrant Docking Plan', 
          date: '2024-01-15', 
          status: 'Approved',
          priority: 'High',
          vessel: 'INS Vikrant',
          officer: 'Lt. Cdr. Rajesh Kumar',
          progress: 100,
          category: 'Routine Maintenance',
          estimatedDuration: '45 days',
          budget: '₹2.5M'
        },
        { 
          id: 2, 
          name: 'INS Delhi Maintenance Report', 
          date: '2024-01-20', 
          status: 'Pending',
          priority: 'Medium',
          vessel: 'INS Delhi',
          officer: 'Cdr. Priya Sharma',
          progress: 75,
          category: 'Emergency Repair',
          estimatedDuration: '30 days',
          budget: '₹1.8M'
        },
        { 
          id: 3, 
          name: 'INS Mumbai Refit Analysis', 
          date: '2024-01-25', 
          status: 'In Review',
          priority: 'High',
          vessel: 'INS Mumbai',
          officer: 'Capt. Amit Singh',
          progress: 60,
          category: 'Major Refit',
          estimatedDuration: '90 days',
          budget: '₹5.2M'
        }
      ]
    },
    {
      id: 'survey',
      title: 'Survey Reports',
      description: 'Quarterly hull surveys with defect tracking, structural analysis, and maintenance recommendations',
      icon: Shield,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      borderColor: 'border-emerald-200',
      hoverBorderColor: 'hover:border-emerald-400',
      textColor: 'text-emerald-800',
      bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50',
      iconBg: 'bg-emerald-500',
      accentColor: 'text-emerald-600',
      count: 32,
      lastUpdated: '1 day ago',
      reports: [
        { 
          id: 1, 
          name: 'Q1 2024 Hull Survey', 
          date: '2024-03-31', 
          status: 'Complete',
          priority: 'High',
          vessel: 'INS Rajput',
          officer: 'Lt. Cdr. Neha Patel',
          progress: 100,
          category: 'Quarterly Survey',
          defectsFound: 12,
          criticalIssues: 2
        },
        { 
          id: 2, 
          name: 'Q2 2024 Hull Survey', 
          date: '2024-06-30', 
          status: 'In Progress',
          priority: 'High',
          vessel: 'INS Delhi',
          officer: 'Cdr. Vikram Joshi',
          progress: 85,
          category: 'Quarterly Survey',
          defectsFound: 8,
          criticalIssues: 1
        },
        { 
          id: 3, 
          name: 'Q3 2024 Hull Survey', 
          date: '2024-09-30', 
          status: 'Scheduled',
          priority: 'Medium',
          vessel: 'INS Mumbai',
          officer: 'Lt. Cdr. Ankit Verma',
          progress: 0,
          category: 'Quarterly Survey',
          defectsFound: 0,
          criticalIssues: 0
        }
      ]
    },
    {
      id: 'hvac',
      title: 'HVAC Reports',
      description: 'HVAC system trials, air flow measurements, and environmental control system analysis',
      icon: Thermometer,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      borderColor: 'border-amber-200',
      hoverBorderColor: 'hover:border-amber-400',
      textColor: 'text-amber-800',
      bgColor: 'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50',
      iconBg: 'bg-amber-500',
      accentColor: 'text-amber-600',
      count: 28,
      lastUpdated: '3 hours ago',
      reports: [
        { 
          id: 1, 
          name: 'HVAC System Analysis', 
          date: '2024-01-10', 
          status: 'Complete',
          priority: 'Medium',
          vessel: 'INS Kolkata',
          officer: 'Lt. Cdr. Ravi Kumar',
          progress: 100,
          category: 'System Analysis',
          compartmentsTested: 15,
          efficiency: '92%'
        },
        { 
          id: 2, 
          name: 'Air Flow Measurements', 
          date: '2024-01-18', 
          status: 'Pending',
          priority: 'High',
          vessel: 'INS Delhi',
          officer: 'Cdr. Sunita Reddy',
          progress: 40,
          category: 'Flow Testing',
          compartmentsTested: 8,
          efficiency: 'N/A'
        },
        { 
          id: 3, 
          name: 'Temperature Control Report', 
          date: '2024-01-22', 
          status: 'In Review',
          priority: 'Medium',
          vessel: 'INS Mumbai',
          officer: 'Lt. Cdr. Deepak Singh',
          progress: 70,
          category: 'Temperature Analysis',
          compartmentsTested: 12,
          efficiency: '88%'
        }
      ]
    }
  ];

  // Generate HVAC reports from API data
  const generateHvacReports = () => {
    if (!hvacReportData || !hvacReportData.trials || hvacReportData.trials.length === 0) {
      return [
        { 
          id: 1, 
          name: 'HVAC System Analysis', 
          date: '2024-01-10', 
          status: 'Complete',
          priority: 'Medium',
          vessel: 'INS Kolkata',
          officer: 'Lt. Cdr. Ravi Kumar',
          progress: 100,
          category: 'System Analysis',
          compartmentsTested: 15,
          efficiency: '92%'
        },
        { 
          id: 2, 
          name: 'Air Flow Measurements', 
          date: '2024-01-18', 
          status: 'Pending',
          priority: 'High',
          vessel: 'INS Delhi',
          officer: 'Cdr. Sunita Reddy',
          progress: 40,
          category: 'Flow Testing',
          compartmentsTested: 8,
          efficiency: 'N/A'
        },
        { 
          id: 3, 
          name: 'Temperature Control Report', 
          date: '2024-01-22', 
          status: 'In Review',
          priority: 'Medium',
          vessel: 'INS Mumbai',
          officer: 'Lt. Cdr. Deepak Singh',
          progress: 70,
          category: 'Temperature Analysis',
          compartmentsTested: 12,
          efficiency: '88%'
        }
      ];
    }

    return hvacReportData.trials.map((trial: any, index: number) => {
      const acCompartments = trial.airflow_measurements || [];
      const machineryCompartments = trial.machinery_airflow_measurements || [];
      const totalCompartments = acCompartments.length + machineryCompartments.length;
      
      // Calculate efficiency based on SAT/UNSAT status
      const totalMeasurements = acCompartments.length + machineryCompartments.length;
      const satCount = acCompartments.filter((c: any) => 
        parseFloat(c.measured_air_flow_rate) >= parseFloat(c.design_air_flow_rate)
      ).length + machineryCompartments.filter((c: any) => 
        parseFloat(c.measured_air_flow_rate) >= parseFloat(c.design_air_flow_rate)
      ).length;
      const efficiency = totalMeasurements > 0 ? Math.round((satCount / totalMeasurements) * 100) : 0;

      return {
        id: trial.id,
        name: `${trial.document_no || 'HVAC Trial'} - ${trial.ship_name}`,
        date: trial.date_of_trials || 'N/A',
        status: 'Complete', // Assuming all trials are complete
        priority: totalCompartments > 10 ? 'High' : totalCompartments > 5 ? 'Medium' : 'Low',
        vessel: trial.ship_name,
        officer: 'HVAC Specialist', // Default since not in API
        progress: 100, // Assuming complete
        category: trial.occasion_of_trials || 'HVAC Trial',
        compartmentsTested: totalCompartments,
        efficiency: `${efficiency}%`,
        trialData: trial // Store full trial data for detailed view
      };
    });
  };

  // Update reportTypes with dynamic HVAC data
  const getReportTypes = () => {
    return reportTypes.map(type => {
      if (type.id === 'hvac') {
        return {
          ...type,
          count: hvacReportData?.trials?.length || 0,
          lastUpdated: hvacReportData ? 'Just now' : '3 hours ago',
          reports: generateHvacReports()
        };
      }
      return type;
    });
  };

  const dynamicReportTypes = getReportTypes();

  const handleReportTypeClick = (reportType: string) => {
    setSelectedReport(reportType);
    setSelectedReportItem(null);
    setIsDialogOpen(true);
  };

  const handleReportItemClick = (reportType: string, reportItem: any) => {
    setSelectedReport(reportType);
    setSelectedReportItem(reportItem);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Complete':
        return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      case 'Pending':
      case 'Scheduled':
        return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'In Review':
      case 'In Progress':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Complete':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
      case 'Scheduled':
        return <Clock className="w-4 h-4" />;
      case 'In Review':
      case 'In Progress':
        return <Activity className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredReports = dynamicReportTypes
    .filter(type => reportType === 'all' || type.id === reportType)
    .map(type => ({
      ...type,
      reports: type.reports.filter(report => {
        const matchesSearch = searchTerm === '' || 
                             report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             report.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             report.officer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || report.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesVessel = selectedVessel === '' || selectedVessel === 'all' || report.vessel === selectedVessel;
        return matchesSearch && matchesFilter && matchesVessel;
      })
    }))
    .filter(type => type.reports.length > 0);

  const renderReportComponent = () => {
    if (selectedReportItem) {
      // Render individual report based on the selected item
      return (
        <div className="space-y-4">
          {/* <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{selectedReportItem.name}</h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-600">Date: {selectedReportItem.date}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReportItem.status)}`}>
                {selectedReportItem.status}
              </span>
            </div>
          </div> */}
          
          {/* Render the appropriate report component based on type */}
          {selectedReport === 'docking' && <DockingReportPage />}
          {selectedReport === 'survey' && <SurveyReportPage />}
          {selectedReport === 'hvac' && <Reports hvacData={selectedReportItem.trialData || hvacReportData} isLoading={isLoadingHvacData} />}
        </div>
      );
    }

    // Render all reports of the selected type
    switch (selectedReport) {
      case 'docking':
        return <DockingReportPage />;
      case 'survey':
        return <SurveyReportPage />;
      case 'hvac':
        return <Reports hvacData={hvacReportData} isLoading={isLoadingHvacData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Naval Reports Center
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Comprehensive vessel management, surveys, and system performance analytics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Reports</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Report Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="docking">Docking Reports</SelectItem>
                    <SelectItem value="survey">Survey Reports</SelectItem>
                    <SelectItem value="hvac">HVAC Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vessel Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Vessel {reportType === 'hvac' && <span className="text-red-500">*</span>}
                  <span className="text-xs text-gray-500 ml-1">
                    {reportType === 'hvac' ? '(Required for HVAC Reports)' : '(Optional for other reports)'}
                  </span>
                </label>
                <Select 
                  value={selectedVessel} 
                  onValueChange={setSelectedVessel} 
                  disabled={isLoadingVessels}
                  required={reportType === 'hvac'}
                >
                  <SelectTrigger className={`w-full ${reportType === 'hvac' && (!selectedVessel || selectedVessel === 'all') ? 'border-red-300 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={isLoadingVessels ? "Loading vessels..." : "Select vessel"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vessels</SelectItem>
                    {vessels.map((vessel) => (
                      <SelectItem key={vessel.id} value={vessel.name}>
                        <div className="flex flex-col">
                          <span className="font-medium">{vessel.name}</span>
                          <span className="text-xs text-gray-500">
                            {vessel.classofvessel.name} • {vessel.vesseltype.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {reportType === 'hvac' && (!selectedVessel || selectedVessel === 'all') && (
                  <p className="text-xs text-red-600">Please select a vessel for HVAC reports</p>
                )}
              </div>

              {/* Search Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search by name, vessel, officer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Additional Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Status Filter */}
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in review">In Review</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Sort Filter */}
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Newest First)</SelectItem>
                    <SelectItem value="date-old">Date (Oldest First)</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="name-z">Name (Z-A)</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {filteredReports.reduce((total, type) => total + type.reports.length, 0)} reports
                {reportType !== 'all' && ` in ${reportTypes.find(t => t.id === reportType)?.title}`}
                {selectedVessel && selectedVessel !== 'all' && ` for ${selectedVessel}`}
                {isLoadingHvacData && reportType === 'hvac' && (
                  <span className="ml-2 text-blue-600">
                    <span className="animate-spin inline-block w-3 h-3 border border-blue-600 border-t-transparent rounded-full mr-1"></span>
                    Loading HVAC data...
                  </span>
                )}
                {hvacReportData && reportType === 'hvac' && (
                  <span className="ml-2 text-green-600">
                    ✓ HVAC data loaded ({hvacReportData.trials?.length || 0} trials)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReportType('all');
                    setSelectedVessel('all');
                    setSearchTerm('');
                    setFilterStatus('all');
                    setSortBy('date');
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${stat.color} flex items-center gap-1`}>
                          {stat.changeType === 'positive' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">{stat.description}</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.iconBg} shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={Math.abs(stat.trend)} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Report Categories */}
        <div className="space-y-8">
          {filteredReports.map((report) => {
            const IconComponent = report.icon;
            return (
              <Card key={report.id} className={`${report.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl ${report.iconBg} shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className={`text-2xl font-bold ${report.textColor}`}>
                          {report.title}
                        </CardTitle>
                        <p className="text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{report.count}</p>
                        <p className="text-sm text-gray-500">Reports</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last updated</p>
                        <p className="text-sm font-medium text-gray-900">{report.lastUpdated}</p>
                      </div>
                      <Button
                        onClick={() => handleReportTypeClick(report.id)}
                        className={`${report.color} ${report.hoverColor} text-white shadow-lg`}
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {report.reports.map((item) => (
                      <Card key={item.id} className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h4>
                              <p className="text-xs text-gray-500 mb-2">{item.vessel}</p>
                              <p className="text-xs text-gray-500">{item.officer}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge className={`${getPriorityColor(item.priority)} text-xs`}>
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-medium">{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={`${getStatusColor(item.status)} text-xs flex items-center gap-1`}>
                              {getStatusIcon(item.status)}
                              {item.status}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                                onClick={() => handleReportItemClick(report.id, item)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.progress}% complete
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Report Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          {/* Custom Close Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-white border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
            onClick={() => setIsDialogOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <DialogHeader className="relative pr-12">
            <DialogTitle className="text-2xl font-bold">
              {selectedReportItem ? (
                selectedReportItem.name
              ) : (
                <>
                  {selectedReport === 'docking' && 'Docking Reports'}
                  {selectedReport === 'survey' && 'Survey Reports'}
                  {selectedReport === 'hvac' && 'HVAC Reports'}
                </>
              )}
            </DialogTitle>
            {selectedReportItem && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedReportItem.date} • {selectedReportItem.status}
              </p>
            )}
          </DialogHeader>
          <div className="mt-4">
            {renderReportComponent()}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Custom styles for dialog */}
      <style jsx global>{`
        /* Dialog overlay */
        [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Dialog content positioning - centered */
        [data-radix-dialog-content] {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 50 !important;
          background: white !important;
          border-radius: 8px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          max-width: 90vw !important;
          max-height: 90vh !important;
          width: 95vw !important;
          overflow: hidden !important;
        }
        
        /* Hide the default close button if it exists */
        [data-radix-dialog-content] [data-radix-dialog-close] {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default ReportsSelection;