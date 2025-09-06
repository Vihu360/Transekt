"use client";

import React from 'react';

interface SummaryStatsProps {
  totalActive: number;
  monthlyVolume: number;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ totalActive, monthlyVolume }) => {
  return (
    <div className="flex items-center space-x-6 mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Total Active:</span>
        <span className="text-lg font-bold text-gray-900">{totalActive}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Monthly Volume:</span>
        <span className="text-lg font-bold text-gray-900">${monthlyVolume}K</span>
      </div>
    </div>
  );
};

export default SummaryStats;
