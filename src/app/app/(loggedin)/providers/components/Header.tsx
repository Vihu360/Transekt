"use client";

import React from 'react';

interface HeaderProps {
  onAddIntegration?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Integrations</h1>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
