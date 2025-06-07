import React, { useState } from 'react';
import './App.css';

// Import components
import Header from './components/Header';
import Navigation from './components/Navigation';
import Map from './components/Map';
import ChildProfile from './components/ChildProfile';
import AlertSettings from './components/AlertSettings';
import SafeZoneEditor from './components/SafeZoneEditor';
import TestAlert from './components/TestAlert';

// Sample data
const childData = {
  name: 'Alyssa',
  photo: process.env.PUBLIC_URL + '/ippd_headshot.jpg',
  deviceId: 'NK-2023-789456',
  batteryLevel: 68,
  lastSeen: new Date(),
  location: {
    lat: 37.7749,
    lng: -122.4194,
    name: 'Alyssa'
  }
};

const sampleSafeZones = [
  { id: '1', name: 'Home', type: 'safe' as const, coordinates: [] },
  { id: '2', name: 'School', type: 'safe' as const, coordinates: [] },
  { id: '3', name: 'Playground', type: 'safe' as const, coordinates: [] },
  { id: '4', name: 'Busy Street', type: 'danger' as const, coordinates: [] }
];

const sampleAlertSettings = [
  { id: 'safety-zone', name: 'Safe Zone Alerts', description: 'Alert when child leaves defined safe zones', enabled: true },
  { id: 'danger-zone', name: 'Danger Zone Alerts', description: 'Alert when child enters defined danger zones', enabled: true },
  { id: 'speed', name: 'Speed Alerts', description: 'Alert when child is moving faster than walking speed', enabled: false },
  { id: 'battery', name: 'Battery Alerts', description: 'Alert when device battery is below 20%', enabled: true },
  { id: 'routine', name: 'Routine Deviation', description: 'Alert when child deviates from normal routine', enabled: false }
];

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [alertSettings, setAlertSettings] = useState(sampleAlertSettings);
  const [safeZones, setSafeZones] = useState(sampleSafeZones);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const handleAlertSettingChange = (id: string, enabled: boolean) => {
    setAlertSettings(alertSettings.map(setting => 
      setting.id === id ? { ...setting, enabled } : setting
    ));
  };

  const handleAddZone = (zone: Omit<typeof sampleSafeZones[0], 'id'>) => {
    const newZone = {
      ...zone,
      id: Date.now().toString()
    };
    setSafeZones([...safeZones, newZone]);
  };

  const handleUpdateZone = (zone: typeof sampleSafeZones[0]) => {
    setSafeZones(safeZones.map(z => z.id === zone.id ? zone : z));
  };

  const handleDeleteZone = (id: string) => {
    setSafeZones(safeZones.filter(zone => zone.id !== id));
  };

  const handleTestAlert = () => {
    setActiveAlert('test');
    setTimeout(() => setActiveAlert(null), 5000);
  };

  return (
    <div className="App h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 overflow-y-auto pb-20 pt-4 px-4">
        {/* Map View */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <ChildProfile 
              name={childData.name}
              photo={childData.photo}
              deviceId={childData.deviceId}
              batteryLevel={childData.batteryLevel}
              lastSeen={childData.lastSeen}
            />
            
            <Map 
              childLocation={childData.location}
              safeZones={safeZones.filter(zone => zone.type === 'safe')}
            />
          </div>
        )}

        {/* Alerts View */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <AlertSettings 
              settings={alertSettings}
              onSettingChange={handleAlertSettingChange}
            />
          </div>
        )}

        {/* Settings View */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <SafeZoneEditor 
              zones={safeZones}
              onAddZone={handleAddZone}
              onUpdateZone={handleUpdateZone}
              onDeleteZone={handleDeleteZone}
            />
          </div>
        )}

        {/* Test View */}
        {activeTab === 'test' && (
          <div className="space-y-6">
            <TestAlert onSend={handleTestAlert} />
          </div>
        )}

        {/* Active Alert Notification */}
        {activeAlert && (
          <div className="fixed top-16 inset-x-0 flex justify-center px-4 z-50">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-md w-full">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-medium">ALERT: Alyssa has left the safe zone!</p>
                  <p className="text-sm mt-1">Last known location: Main St & Oak Ave • 2 min ago</p>
                  <div className="mt-2 flex space-x-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-2 py-1 rounded">
                      Call Now
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-red-700 text-xs font-medium px-2 py-1 rounded border border-red-300">
                      View on Map
                    </button>
                  </div>
                </div>
                <div className="ml-auto">
                  <button onClick={() => setActiveAlert(null)} className="text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
