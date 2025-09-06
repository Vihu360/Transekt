"use client";

import React from 'react';
import { useConfigureProviders } from '../hooks/context';

interface AvailableIntegrationCardProps {
  logo: string;
  name: string;
  providerId: string;
  isMore?: boolean;
  onClick?: () => void;
}

const AvailableIntegrationCard: React.FC<AvailableIntegrationCardProps> = ({
  logo,
  name,
  providerId,
}) => {

  const {openModal} = useConfigureProviders();

  const handleClick = () => {
      openModal({ 
        name, 
        providerId, 
        isNew: true 
      });
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-md hover:border-gray-300 cursor-pointer transition-all min-h-[120px]"
      onClick={handleClick}
    >
      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-semibold mb-3">
        {logo}
      </div>
      <span className="text-sm font-medium text-gray-900 text-center">{name}</span>
    </div>
  );
};

export default AvailableIntegrationCard;
