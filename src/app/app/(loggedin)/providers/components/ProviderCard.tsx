"use client";

import React from 'react';

interface ProviderCardProps {
  logo: string;
  name: string;
  service: string;
  status: 'active' | 'pending' | 'error';
  successRate?: string;
  volume: string;
  actionButton: {
    label: string;
    icon: string;
    variant: 'configure' | 'activate' | 'fix';
  };
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  logo,
  name,
  service,
  status,
  successRate,
  volume,
  actionButton
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionButtonStyle = (variant: string) => {
    switch (variant) {
      case 'configure': return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
      case 'activate': return 'bg-gray-800 text-white hover:bg-gray-900';
      case 'fix': return 'bg-red-600 text-white hover:bg-red-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getActionIcon = (icon: string) => {
    switch (icon) {
      case 'gear': return '⚙️';
      case 'play': return '▶️';
      case 'warning': return '⚠️';
      default: return '⚙️';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-semibold">
            {logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{service}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
          <span className="text-sm font-medium capitalize">{status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {successRate && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Success Rate</span>
            <span className="text-sm font-medium">{successRate}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Last 30 Days Volume</span>
          <span className="text-sm font-medium">{volume}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${getActionButtonStyle(actionButton.variant)}`}>
          <span>{getActionIcon(actionButton.icon)}</span>
          <span>{actionButton.label}</span>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
