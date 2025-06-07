import React, { useState } from 'react';

interface AlertSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface AlertSettingsProps {
  settings: AlertSetting[];
  onSettingChange: (id: string, enabled: boolean) => void;
}

const AlertSettings: React.FC<AlertSettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Alert Settings</h2>
      
      <div className="space-y-4">
        {settings.map((setting) => (
          <AlertSettingItem 
            key={setting.id} 
            setting={setting} 
            onChange={onSettingChange} 
          />
        ))}
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md w-full">
          Save Settings
        </button>
      </div>
    </div>
  );
};

interface AlertSettingItemProps {
  setting: AlertSetting;
  onChange: (id: string, enabled: boolean) => void;
}

const AlertSettingItem: React.FC<AlertSettingItemProps> = ({ setting, onChange }) => {
  const [isEnabled, setIsEnabled] = useState(setting.enabled);
  
  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onChange(setting.id, newState);
  };
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{setting.name}</h3>
        <p className="text-sm text-gray-500">{setting.description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isEnabled}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

export default AlertSettings;
