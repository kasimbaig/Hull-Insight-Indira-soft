import React, { useState, lazy, Suspense } from 'react';

// Lazy load components for better performance
const UserMaster = lazy(() => import('../pages/masters/UserMaster'));
const RootConfigMaster = lazy(() => import('../pages/masters/RootConfigMaster'));
const RoleMaster = lazy(() => import('../pages/masters/RoleMaster'));
const RoleAccess = lazy(() => import('../pages/masters/RoleAccess'));

const TileLayout = () => {
  const tiles = [
    {
      id: 1,
      title: 'User Master',
      icon: '👤',
      description: 'Manage user accounts and profiles',
      details: 'View and manage all system users, including their personal information, contact details, and account settings.',
      options: ['Add User', 'Edit User', 'Delete User', 'Reset Password', 'Export Users'],
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      component: 'UserMaster'
    },
    {
      id: 2,
      title: 'Root Config Master',
      icon: '🔗',
      description: 'Manage root configuration settings',
      details: 'Configure root-level system settings and configuration parameters that affect the entire application.',
      options: ['Add Config', 'Edit Config', 'Delete Config', 'Reset Config', 'Export Config'],
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
      component: 'RootConfigMaster'
    },
    {
      id: 3,
      title: 'Role Master',
      icon: '🔒',
      description: 'Configure user roles and permissions',
      details: 'Define and manage user roles with specific access permissions and assign users to appropriate roles for streamlined access management.',
      options: ['Add Role', 'Edit Role', 'Delete Role', 'Assign Users', 'Export Roles'],
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      lightColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      component: 'RoleMaster'
    },
    {
      id: 4,
      title: 'Role Access',
      icon: '⚙️',
      description: 'Manage role-based access control',
      details: 'Configure role-based access controls, permissions, and security settings for system resources and features.',
      options: ['Set Access', 'Revoke Access', 'Copy Permissions', 'Access Audit', 'Batch Update'],
      color: 'bg-gradient-to-br from-amber-400 to-amber-600',
      lightColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-100',
      component: 'RoleAccess'
    }
  ];

  const [activeTile, setActiveTile] = useState(null);
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDesktopSwitcher, setShowDesktopSwitcher] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  // Handle tile click in main view
  const handleTileClick = (tileId) => {
    const selectedTile = tiles.find(tile => tile.id === tileId);
    setActiveTile(tileId);
    setActiveComponent(selectedTile.component);
    setShowOptionsPopup(false);
    setSelectedOption(null);
    setShowDesktopSwitcher(false);
  };

  // Handle desktop switcher toggle
  const toggleDesktopSwitcher = () => {
    setShowDesktopSwitcher(!showDesktopSwitcher);
    setShowOptionsPopup(false);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptionsPopup(false);
  };

  // Get the active tile data
  const getActiveTile = () => tiles.find(tile => tile.id === activeTile);

  // Render component based on active tile
  const renderComponent = () => {
    if (!activeComponent) return null;
    
    return (
      <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>}>
        {activeComponent === 'UserMaster' && <UserMaster />}
        {activeComponent === 'RootConfigMaster' && <RootConfigMaster />}
        {activeComponent === 'RoleMaster' && <RoleMaster />}
        {activeComponent === 'RoleAccess' && <RoleAccess />}
      </Suspense>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-full">
      {/* Desktop Switcher Button - Always visible at bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <button 
          className={`flex items-center justify-center rounded-full shadow-lg p-3 transition-all duration-300 ${showDesktopSwitcher ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={toggleDesktopSwitcher}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>

      {/* Desktop Switcher Popup */}
      {showDesktopSwitcher && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-30 transition-opacity duration-300">
          <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 max-w-4xl w-full mx-4 my-8 animate-scaleIn border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Switch Module</h3>
              <button 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setShowDesktopSwitcher(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tiles.map((tile) => (
                <div 
                  key={tile.id} 
                  className={`bg-gray-700 bg-opacity-70 rounded-lg transition-all duration-300 hover:bg-gray-600 cursor-pointer relative overflow-hidden border border-gray-600 transform hover:scale-105 ${activeTile === tile.id ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => handleTileClick(tile.id)}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${tile.color}`}></div>
                  <div className="p-4 flex items-center">
                    <div className="text-2xl mr-3 p-2 rounded-lg bg-gray-800 bg-opacity-50">{tile.icon}</div>
                    <div>
                      <h2 className="text-base font-semibold text-white">{tile.title}</h2>
                      <p className="text-gray-300 text-xs mt-1">{tile.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 max-w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">SETUP</h1>
          <p className="text-gray-600 text-lg">Manage users, roles, and system configuration</p>
        </div>
        
        {/* Full-screen detailed view when a tile is active */}
        {activeTile !== null ? (
          <div className="relative pt-2">
            {selectedOption && (
              <div className="mt-10 p-6 bg-green-50 border border-green-200 rounded-xl animate-fadeIn">
                <div className="flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium text-green-700 text-lg">Selected: {selectedOption}</p>
                </div>
                <p className="text-green-600 text-center">Processing {selectedOption.toLowerCase()}...</p>
              </div>
            )}
            
            {/* Render component content */}
            <div className="mt-10">
              {renderComponent()}
            </div>
          </div>
        ) : (
          /* Tile grid when no tile is active */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tiles.map((tile) => (
              <div 
                key={tile.id} 
                className="bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer group overflow-hidden border border-gray-100 transform hover:-translate-y-1"
                onClick={() => handleTileClick(tile.id)}
              >
                <div className={`h-3 ${tile.color}`}></div>
                <div className="p-8 flex flex-col items-center justify-center h-64">
                  <div className={`text-5xl mb-5 p-5 rounded-full ${tile.iconBg} transform group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    {tile.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">{tile.title}</h2>
                  <p className="text-gray-600 text-center">{tile.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white ${tile.color}`}>
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Options Popup */}
        {showOptionsPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div 
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full m-4 animate-scaleIn" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Select an Action</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setShowOptionsPopup(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {getActiveTile().options.map((option, index) => (
                  <button
                    key={index}
                    className={`${getActiveTile().lightColor} hover:bg-white text-gray-800 p-4 rounded-lg transition-all duration-200 text-left font-medium flex items-center justify-between ${getActiveTile().borderColor} border hover:shadow-md`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span>{option}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TileLayout;
