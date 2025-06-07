import React, { useState } from 'react';

interface SafeZone {
  id: string;
  name: string;
  type: 'safe' | 'danger';
  coordinates: any; // Simplified for this example
}

interface SafeZoneEditorProps {
  zones: SafeZone[];
  onAddZone: (zone: Omit<SafeZone, 'id'>) => void;
  onUpdateZone: (zone: SafeZone) => void;
  onDeleteZone: (id: string) => void;
}

const SafeZoneEditor: React.FC<SafeZoneEditorProps> = ({
  zones,
  onAddZone,
  onUpdateZone,
  onDeleteZone
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneType, setNewZoneType] = useState<'safe' | 'danger'>('safe');
  const [editingZone, setEditingZone] = useState<string | null>(null);

  const handleSaveNewZone = () => {
    onAddZone({
      name: newZoneName,
      type: newZoneType,
      coordinates: [] // In a real app, this would contain actual map coordinates
    });
    setIsAdding(false);
    setNewZoneName('');
  };

  const handleEditZone = (zone: SafeZone) => {
    setEditingZone(zone.id);
  };

  const handleDeleteZone = (id: string) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      onDeleteZone(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Safe & Danger Zones</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Add Zone
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zone Name
            </label>
            <input
              type="text"
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Home, School, Park"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zone Type
            </label>
            <div className="flex">
              <button
                onClick={() => setNewZoneType('safe')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-l-md ${
                  newZoneType === 'safe'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Safe Zone
              </button>
              <button
                onClick={() => setNewZoneType('danger')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-r-md ${
                  newZoneType === 'danger'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Danger Zone
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Draw on Map
            </label>
            <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">Map drawing interface placeholder</span>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-sm text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNewZone}
              disabled={!newZoneName}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm disabled:bg-gray-300"
            >
              Save Zone
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {zones.map(zone => (
          <div 
            key={zone.id} 
            className={`border rounded-md p-3 ${
              zone.type === 'safe' 
                ? 'border-green-200 bg-green-50' 
                : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className={`w-3 h-3 rounded-full mr-2 ${
                    zone.type === 'safe' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className="font-medium">{zone.name}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditZone(zone)}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteZone(zone.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {zones.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No zones defined yet. Add a zone to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeZoneEditor;