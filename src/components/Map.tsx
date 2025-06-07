import React from 'react';

interface MapProps {
  childLocation: {
    lat: number;
    lng: number;
    name: string;
  };
  safeZones: Array<{
    id: string;
    name: string;
    type: 'safe' | 'danger';
    coordinates: any; // Simplified for this example
  }>;
}

const Map: React.FC<MapProps> = ({ childLocation, safeZones }) => {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      {/* Static map background image */}
      <div className="absolute inset-0">
        <img 
          src={process.env.PUBLIC_URL + '/map-image.jpg'} 
          alt="Seattle Map Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Child location marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Pulsing effect */}
          <div className="absolute -inset-2 bg-red-500 rounded-full opacity-30 animate-ping"></div>
          {/* Main marker */}
          <div className="relative w-10 h-10 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10">
            <span className="text-white text-sm font-bold">{childLocation.name.charAt(0)}</span>
          </div>
          {/* Location label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
            {childLocation.name}
          </div>
        </div>
      </div>

      {/* Mock safe zones visualization */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Home safe zone */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500 opacity-20 rounded-full transform -translate-x-20 -translate-y-12">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium whitespace-nowrap">
            Home
          </div>
        </div>
        {/* School safe zone */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500 opacity-20 rounded-full transform translate-x-32 translate-y-12">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium whitespace-nowrap">
            School
          </div>
        </div>
        {/* Playground safe zone */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-green-500 opacity-20 rounded-full transform -translate-x-24 translate-y-32">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium whitespace-nowrap">
            Playground
          </div>
        </div>
        {/* Danger zone - Busy Street */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-red-500 opacity-20 rounded-full transform translate-x-16 -translate-y-32">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border-l-4 border-red-500 px-2 py-1 rounded shadow-sm text-xs font-medium text-red-700 whitespace-nowrap">
            Busy Street
          </div>
        </div>
        {/* Danger zone - Construction */}
        <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-red-500 opacity-20 rounded-full transform translate-x-40 -translate-y-10">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border-l-4 border-red-500 px-2 py-1 rounded shadow-sm text-xs font-medium text-red-700 whitespace-nowrap">
            Construction
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        {/* Zoom in button */}
        <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        {/* Zoom out button */}
        <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Zones legend */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-md shadow-md">
        <div className="text-sm font-medium mb-2">Zones</div>
        {safeZones.map(zone => (
          <div key={zone.id} className="flex items-center gap-2 text-xs mb-1">
            <div className={`w-3 h-3 ${zone.type === 'safe' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
            <span>{zone.name}</span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <button className="text-xs text-blue-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Zone
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
