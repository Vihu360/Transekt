"use client";

import React from 'react';
import Header from './components/Header';
import SummaryStats from './components/SummaryStats';
import ProviderCard from './components/ProviderCard';
import AvailableIntegrationCard from './components/AvailableIntegrationCard';
import { useProviders } from './hooks/useProviders';
import { mapProviderToCard } from './utils/providerMapper';
import { useConfigureProviders } from './hooks/context';

const ProvidersPage = () => {
  const { providers, loading, error, addProvider, updateProvider, refreshProviders } = useProviders();
  const { setProviderAddedCallback, setRefreshCallback } = useConfigureProviders();
  
  // Map API data to UI format
  const connectedProviders = providers.map(mapProviderToCard);

  // Set up callback for when a provider is added or updated
  React.useEffect(() => {
    const handleProviderChange = (data: Record<string, unknown>) => {
      if (data.id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateProvider(data as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addProvider(data as any);
      }
    };
    
    setProviderAddedCallback(handleProviderChange);
    setRefreshCallback(refreshProviders);
  }, [addProvider, updateProvider, setProviderAddedCallback, setRefreshCallback, refreshProviders]);

  // Mock data for available integrations
  const availableIntegrations = [
    { logo: '/gatewayLogo/stripe.jpeg', name: 'Stripe', providerId: 'stripe' },
    { logo: '/gatewayLogo/razz.png', name: 'Razorpay', providerId: 'razorpay' }
  ];

  const handleAddIntegration = () => {
    console.log('Add integration clicked');
    // Implement add integration logic
  };

  const handleIntegrationClick = (name: string) => {
    console.log(`Integration clicked: ${name}`);
    // Implement integration click logic
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }} className=''>
        <div className='p-5 bg-[#FFFFFF]/60 backdrop-blur-2xl pl-6'>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading providers...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ minHeight: '100vh' }} className=''>
        <div className='p-5 bg-[#FFFFFF]/60 backdrop-blur-2xl pl-6'>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load providers</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }} className='bg-[#FFFFFF]/60 backdrop-blur-2xl'>
      {/* Header Card */}
      <div className='px-6 pt-4'>
        <Header onAddIntegration={handleAddIntegration} />
      </div>

      <div className='px-6'>
        {/* Connected Providers Section */}
        <div className='bg-[#FFFFFF] backdrop-blur-2xl rounded-t-4xl px-5'>
          <div className="mb-8">
            <div className="flex items-center justify-between py-4 w-full">
              <div className='w-full'>
                <h2 className="text-md font-semibold text-gray-900">Connected Payment Providers</h2>
              </div>
              <SummaryStats totalActive={connectedProviders.map(provider => provider.status === 'active' ? 1 : 0).reduce((a, b) => a + b, 0)} 
              monthlyVolume={connectedProviders.map(provider => parseFloat(provider.volume.replace('$', ''))).reduce((a, b) => a + b, 0)} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {connectedProviders.map((provider, index) => (
                <ProviderCard
                  key={index}
                  logo={provider.logo}
                  name={provider.name}
                  service={provider.service}
                  status={provider.status}
                  successRate={provider.successRate}
                  volume={provider.volume}
                  providerId={provider.providerId}
                  id={provider.id}
                  existingCredentials={provider.existingCredentials}
                  actionButton={provider.actionButton}
                />
              ))}
              {connectedProviders.length === 0 && (
                <div className="col-span-1 md:col-span-3 lg:col-span-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
                    <p className="text-gray-600 text-center">No connected payment providers found.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Available Integrations Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Integrations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {availableIntegrations.map((integration, index) => (
                <AvailableIntegrationCard
                  key={index}
                  logo={integration.logo}
                  name={integration.name}
                  providerId={integration.providerId}
                  onClick={() => handleIntegrationClick(integration.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersPage;