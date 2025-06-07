import React, { useState } from 'react';

interface ChildProfileProps {
  name: string;
  photo: string;
  deviceId: string;
  batteryLevel: number;
  lastSeen: Date;
}

const ChildProfile: React.FC<ChildProfileProps> = ({ 
  name, 
  photo, 
  deviceId, 
  batteryLevel, 
  lastSeen 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [childName, setChildName] = useState(name);
  
  const formatLastSeen = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCall = () => {
    alert("Calling child's wristband...");
    // In a real app, this would initiate a call
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // In a real app, this would save the updated name
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={photo || "https://via.placeholder.com/100"} 
              alt={name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          <div>
            {isEditing ? (
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-xl font-semibold"
                autoFocus
              />
            ) : (
              <h2 className="text-xl font-semibold">{childName}</h2>
            )}
            <div className="text-gray-500 text-sm">Last seen: {formatLastSeen(lastSeen)}</div>
            <div className="text-gray-400 text-xs">ID: {deviceId}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={handleCall} 
            className="bg-green-500 text-white p-2 rounded-full"
            aria-label="Call child"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
          
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-full"
              aria-label="Save changes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-gray-200 text-gray-600 p-2 rounded-full"
              aria-label="Edit profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              batteryLevel > 50 ? 'bg-green-500' : 
              batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${batteryLevel}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600">{batteryLevel}%</span>
      </div>
    </div>
  );
};

export default ChildProfile;
