"use client";

import React from 'react';

interface AvailableIntegrationCardProps {
  logo: string;
  name: string;
  isMore?: boolean;
  onClick?: () => void;
}

const AvailableIntegrationCard: React.FC<AvailableIntegrationCardProps> = ({
  logo,
  name,
  isMore = false,
  onClick
}) => {
  if (isMore) {
    return (
      <div 
        className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors min-h-[120px]"
        onClick={onClick}
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-600">{name}</span>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-md hover:border-gray-300 cursor-pointer transition-all min-h-[120px]"
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-semibold mb-3">
        {logo}
      </div>
      <span className="text-sm font-medium text-gray-900 text-center">{name}</span>
    </div>
  );
};

export default AvailableIntegrationCard;
