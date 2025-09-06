"use client"

import React from 'react';
import { ConfigureProvidersProvider } from './hooks/context';
import ConfigureProviders from './components/ConfigureProviders';

const Layout = ({ children }) => {
  return (
    <ConfigureProvidersProvider>
      {children}
      <ConfigureProviders />
    </ConfigureProvidersProvider>
  );
};

export default Layout;