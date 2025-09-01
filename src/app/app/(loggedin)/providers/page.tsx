"use client";

import React from 'react';
import Header from './components/Header';
import SummaryStats from './components/SummaryStats';
import ProviderCard from './components/ProviderCard';
import AvailableIntegrationCard from './components/AvailableIntegrationCard';

const ProvidersPage = () => {
  // Mock data for connected providers
  const connectedProviders = [
    {
      logo: 'stripe',
      name: 'Stripe',
      service: 'Credit Cards, ACH',
      status: 'active' as const,
      successRate: '98.2%',
      volume: '$847K',
      actionButton: {
        label: 'Configure',
        icon: 'gear',
        variant: 'configure' as const
      }
    },
    {
      logo: 'P',
      name: 'PayPal',
      service: 'Digital Wallet',
      status: 'active' as const,
      successRate: '96.8%',
      volume: '$523K',
      actionButton: {
        label: 'Configure',
        icon: 'gear',
        variant: 'configure' as const
      }
    },
    {
      logo: 'RZ',
      name: 'Razorpay',
      service: 'UPI, Cards, Wallets',
      status: 'active' as const,
      successRate: '97.5%',
      volume: '$634K',
      actionButton: {
        label: 'Configure',
        icon: 'gear',
        variant: 'configure' as const
      }
    },
    {
      logo: '$',
      name: 'Square',
      service: 'POS, Online',
      status: 'pending' as const,
      successRate: undefined,
      volume: '$0',
      actionButton: {
        label: 'Activate',
        icon: 'play',
        variant: 'activate' as const
      }
    },
    {
      logo: '🍎',
      name: 'Apple Pay',
      service: 'Mobile Wallet',
      status: 'active' as const,
      successRate: '99.1%',
      volume: '$287K',
      actionButton: {
        label: 'Configure',
        icon: 'gear',
        variant: 'configure' as const
      }
    },
    {
      logo: 'G',
      name: 'Google Pay',
      service: 'Mobile Wallet',
      status: 'error' as const,
      successRate: undefined,
      volume: '$0',
      actionButton: {
        label: 'Fix Issues',
        icon: 'warning',
        variant: 'fix' as const
      }
    }
  ];

  // Mock data for available integrations
  const availableIntegrations = [
    { logo: 'a', name: 'Amazon Pay' },
    { logo: 'KL', name: 'Klarna' },
    { logo: 'AD', name: 'Adyen' },
    { logo: 'WC', name: 'WeChat Pay' },
    { logo: 'AP', name: 'Alipay' }
  ];

  const handleAddIntegration = () => {
    console.log('Add integration clicked');
    // Implement add integration logic
  };

  const handleIntegrationClick = (name: string) => {
    console.log(`Integration clicked: ${name}`);
    // Implement integration click logic
  };

  const handleMoreClick = () => {
    console.log('More integrations clicked');
    // Implement more integrations logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header onAddIntegration={handleAddIntegration} />
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Connected Payment Providers</h2>
              <p className="text-gray-600 mt-1">Manage your payment integrations and monitor their status.</p>
            </div>
            <SummaryStats totalActive={6} monthlyVolume="$2.4M" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedProviders.map((provider, index) => (
              <ProviderCard
                key={index}
                logo={provider.logo}
                name={provider.name}
                service={provider.service}
                status={provider.status}
                successRate={provider.successRate}
                volume={provider.volume}
                actionButton={provider.actionButton}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Integrations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {availableIntegrations.map((integration, index) => (
              <AvailableIntegrationCard
                key={index}
                logo={integration.logo}
                name={integration.name}
                onClick={() => handleIntegrationClick(integration.name)}
              />
            ))}
            <AvailableIntegrationCard
              logo=""
              name="More"
              isMore={true}
              onClick={handleMoreClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersPage;