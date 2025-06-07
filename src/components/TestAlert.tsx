import React, { useState } from 'react';

interface TestAlertProps {
  onSend: () => void;
}

const TestAlert: React.FC<TestAlertProps> = ({ onSend }) => {
  const [alertType, setAlertType] = useState('danger-zone');
  const [isActive, setIsActive] = useState(false);
  
  const handleTestAlert = () => {
    setIsActive(true);
    onSend();
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 5000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Test Alert Experience</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alert Type
        </label>
        <select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="danger-zone">Danger Zone Alert</option>
          <option value="speed">Speed Alert</option>
          <option value="battery-low">Low Battery Alert</option>
          <option value="routine-change">Routine Change Alert</option>
        </select>
      </div>
      
      <button
        onClick={handleTestAlert}
        disabled={isActive}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md w-full disabled:bg-gray-300"
      >
        {isActive ? 'Alert Sent' : 'Send Test Alert'}
      </button>
      
      {isActive && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">
                {alertType === 'danger-zone' && 'ALERT: Alyssa has entered a danger zone!'}
                {alertType === 'speed' && 'ALERT: Alyssa is moving at an unusual speed!'}
                {alertType === 'battery-low' && 'ALERT: Alyssa\'s device battery is critically low!'}
                {alertType === 'routine-change' && 'ALERT: Alyssa has deviated from normal routine!'}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Last known location: Main St & Oak Ave • 2 min ago
              </p>
              <div className="mt-2">
                <button className="mr-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-2 py-1 rounded">
                  Call Now
                </button>
                <button className="text-red-700 text-xs font-medium px-2 py-1 hover:underline">
                  View on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAlert;
