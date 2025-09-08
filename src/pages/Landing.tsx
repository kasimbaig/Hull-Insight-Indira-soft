import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Anchor, Waves, Ship, Compass, Users, BarChart3, FileText, Settings, Navigation, Star, Zap, Sparkles, ArrowRight, Play, CheckCircle, Award, Clock, Globe, MapPin, Phone, Mail, ExternalLink, ChevronRight, Target, TrendingUp, Database, Lock, Eye, RefreshCw } from 'lucide-react';
import navalHeroBg from '@/assets/naval-hero-bg.jpg';
import slide1 from '@/assets/slide1.jpg';
import slide2 from '@/assets/slide2.jpg';
import slide3 from '@/assets/slide3.jpg';
import hullInsightLogo from "@/assets/hull-insight-logo.png";


const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Auto-rotate slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const slides = [
    {
      title: "WELCOME TO HULL INSIGHT",
      description: "FASTER RENDERING OF RETURNS/ REPORTS AND DEFECTS BY SHIPS AND REFITTING AGENCIES. FACILITATE STATISTICAL ANALYSIS HITUS, COMMANDS AND NHQ.",
      image: slide1
    },
    {
      title: "WELCOME TO HULL INSIGHT",
      description: "FASTER RENDERING OF RETURNS/ REPORTS AND DEFECTS BY SHIPS AND REFITTING AGENCIES. FACILITATE STATISTICAL ANALYSIS HITUS, COMMANDS AND NHQ.",
      image: slide2
    },
    {
      title: "WELCOME TO HULL INSIGHT",
      description: "FASTER RENDERING OF RETURNS/ REPORTS AND DEFECTS BY SHIPS AND REFITTING AGENCIES. FACILITATE STATISTICAL ANALYSIS HITUS, COMMANDS AND NHQ.",
      image: slide3
    }
  ];

  const services = [
    { 
      title: "Hull Management", 
      description: "Advanced hull inspection and maintenance tracking systems",
      icon: <Ship className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Fleet Operations", 
      description: "Comprehensive fleet monitoring and operational analytics",
      icon: <Anchor className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500"
    },
    { 
      title: "Navigation Systems", 
      description: "State-of-the-art navigation and positioning technology",
      icon: <Compass className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500"
    },
    { 
      title: "Marine Analytics", 
      description: "Real-time data analysis and predictive maintenance",
      icon: <Waves className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500"
    },
    { 
      title: "Security Systems", 
      description: "Advanced security protocols and threat detection",
      icon: <Shield className="w-8 h-8" />,
      color: "from-red-500 to-pink-500"
    },
    { 
      title: "Mission Control", 
      description: "Centralized command and control operations",
      icon: <Navigation className="w-8 h-8" />,
      color: "from-violet-500 to-fuchsia-500"
    }
  ];

  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Centralized Data",
      description: "Single repository for all naval operations data"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics & Reports",
      description: "Advanced analytics for informed decision making"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Access",
      description: "Enterprise-grade security and access control"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Live data synchronization across all systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img
          src={hullInsightLogo}
          alt="Hull Insight"
          className="w-8 h-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
        />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HULL INSIGHT
                </h1>
                <p className="text-sm text-gray-600 font-medium">Naval Excellence Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            </nav>
            <Button 
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-cyan-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live System Status</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              {slides[currentSlide].title}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto text-blue-100">
            {slides[currentSlide].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
            >
              <Shield className="w-5 h-5 mr-3" />
              Login
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200">Active Vessels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200">Uptime Guarantee</div>
            </div>
          </div>
        </div>
        
        {/* Modern Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                KEY FEATURES
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced naval management capabilities designed to enhance operational efficiency and ensure mission success
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white to-blue-50/30 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-100/50"
              >
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative z-10 text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <div className="text-blue-600 group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-200/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Section - Modern Visual Design */}
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative group">
                {/* Decorative Elements */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-cyan-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-12 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                    <div className="w-28 h-28 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Ship className="w-14 h-14 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Naval Excellence</h3>
                    <p className="text-blue-100 text-lg mb-6">Advanced Hull Management System</p>
                    <div className="w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">500+</p>
                      <p className="text-sm text-gray-600 font-medium">Active Vessels</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">24/7</p>
                      <p className="text-sm text-gray-600 font-medium">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Modern Content */}
            <div className="space-y-10">
              {/* Header */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    ABOUT HULL INSIGHT
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                  Hull Insight is an <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">integrative software tool</span> aimed at effective life cycle management and paperless return and reports. The application ensures easy availability of all routine returns rendered by ship staff and survey rendered by repair yards across all stakeholders over the Naval Unified Domain.
                </p>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  Further, the <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">single repository concept</span> envisaged is aimed at ensuring an institutional memory for informed decision making. At DNA, we solicit constructive feedback and suggestions to further enhance the applicability of the portal towards reliable life cycle management of Hull and associated systems.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Life Cycle Management",
                  "Paperless Reports", 
                  "Unified Domain",
                  "Institutional Memory"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/90 transition-all duration-300 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors duration-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 text-lg rounded-2xl transition-all duration-300 group">
                  <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  OUR SERVICES
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mx-auto"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive naval management solutions designed to streamline operations and enhance efficiency across all maritime operations
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/30"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className="relative z-10 text-center mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Floating Decorative Element */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-base">
                    {service.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      className={`border-2 border-gradient-to-r ${service.color} text-gray-700 hover:bg-gradient-to-r hover:${service.color} hover:text-white px-8 py-3 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                      <span className="font-semibold">Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${service.color} transition-colors duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Operations?
              </h3>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Discover how our comprehensive naval management solutions can revolutionize your operations and enhance efficiency across all maritime activities.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
                >
                  <Shield className="w-6 h-6 mr-3" />
                  Access Services
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-12 py-5 text-xl rounded-2xl transition-all duration-300 group"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-bold text-white">
                  CONTACT US
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 mx-auto"></div>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team for support, inquiries, or to learn more about our naval management solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-8">Our Headquarters</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white mb-2">Directorate of Naval Architecture</p>
                      <p className="text-blue-100 text-lg">Room No 200, Talkatora Stadium Annexe</p>
                      <p className="text-blue-100 text-lg">New Delhi - 110 004</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">NHQ-DNA-HULLINSIGHT</p>
                      <p className="text-blue-100 text-lg">PAX: 6063, 6099</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <Mail className="w-5 h-5 mr-2" />
                        Send Email
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-8">System Status</h3>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  For any queries or support regarding Hull Insight, please contact us using the information provided. Our team is available 24/7 to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold text-lg">Last Updated</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-400">06/09/2025</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold text-lg">Active Users</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-400">71,298</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">HULL INSIGHT</h3>
            </div>
            
          
            
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-300">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Last Updated 06/09/2025</span>
              </div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Visitors 71,298</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;