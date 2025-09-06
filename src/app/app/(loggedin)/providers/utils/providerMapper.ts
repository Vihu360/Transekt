import { ProviderConnection } from '@/utils/api';


// Provider display configuration
const providerConfig = {
  stripe: {
    logo: 'S',
    name: 'Stripe',
    service: 'Credit Cards, ACH',
  },
  paypal_rest: {
    logo: 'P',
    name: 'PayPal',
    service: 'Digital Wallet',
  },
  paypal_classic: {
    logo: 'PC',
    name: 'PayPal (Classic)',
    service: 'Digital Wallet',
  },
  razorpay: {
    logo: 'RZ',
    name: 'Razorpay',
    service: 'UPI, Cards, Wallets',
  },
  lemonsqueezy: {
    logo: 'LS',
    name: 'LemonSqueezy',
    service: 'Digital Products',
  },
  square: {
    logo: '$',
    name: 'Square',
    service: 'POS, Online',
  },
  apple_pay: {
    logo: '🍎',
    name: 'Apple Pay',
    service: 'Mobile Wallet',
  },
  google_pay: {
    logo: 'G',
    name: 'Google Pay',
    service: 'Mobile Wallet',
  },
};

export const mapProviderToCard = (provider: ProviderConnection) => {
  const config = providerConfig[provider.provider as keyof typeof providerConfig] || {
    logo: provider.provider.charAt(0).toUpperCase(),
    name: provider.provider,
    service: 'Payment Gateway',
  };

  return {
    id: provider.id,
    logo: config.logo,
    name: config.name,
    service: config.service,
    status: provider.status as 'active' | 'pending' | 'error',
    successRate: provider.success_rate ? `${provider.success_rate}` : '0%',
    volume: provider.last_30_days_volume ? `$${(provider.last_30_days_volume / 1000).toFixed(0)}K` : '$0',
    providerId: provider.provider,
    existingCredentials: provider.credentials || {},
    actionButton: {
      label: provider.status === 'active' ? 'Configure' : 
             provider.status === 'pending' ? 'Activate' : 'Fix Issues',
      variant: provider.status === 'active' ? 'configure' as const :
               provider.status === 'pending' ? 'activate' as const : 'fix' as const
    }
  };
};

export const getProviderDisplayName = (providerId: string) => {
  const config = providerConfig[providerId as keyof typeof providerConfig];
  return config?.name || providerId;
};
