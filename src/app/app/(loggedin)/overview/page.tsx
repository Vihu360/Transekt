"use client"

import React from "react";
import TimeFrame from "./components/timeframe";
import TotalTransactions from "./components/totalTransactions";
import Chart from "./components/chart";
import GatewayComparison from "./components/charts/GatewayComparison";
import CashFlowChart from "./components/charts/CashFlowChart";
import OnboardingIntegration from "@/components/OnboardingIntegration";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";

const Page = () => {
  const { data: analytics, loading, error } = useDashboardAnalytics();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-600 font-medium">Failed to load dashboard data</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 px-6 text-black pt-4">
      <div className="w-full h-full flex items-center">
        <TimeFrame />
      </div>

      {/* Main Content Grid */}
      <div className="w-full flex gap-6 items-stretch h-[650px]">
        {/* Left Column - Main Content (70% width) */}
        <div className="w-[70%] flex flex-col gap-0">
          {/* Unified Card - Total Transactions + Chart */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
            {/* Total Transactions Section */}
            <div className="p-4 pb-0">
              <TotalTransactions 
                totalTransactions={analytics?.total_revenue?.current_month_revenue?.toLocaleString() || "0"}
                currency={analytics?.total_revenue?.currency || "INR"}
                percentageChange={analytics?.total_revenue?.percentage_change || 0}
              />
            </div>
            
            {/* Chart Section */}
            <div className="flex-1 flex items-end p-4 pt-0">
              <Chart dailyTransactions={analytics?.daily_volume?.daily_transactions || []} />
            </div>
          </div>
        </div>

        {/* Right Column - Two Equal Charts (30% width) */}
        <div className="w-[30%] flex flex-col gap-4">
          {/* First Chart */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
            <GatewayComparison gatewayData={analytics?.gateway_breakdown?.gateways || []} />
          </div>
          
          {/* Second Chart */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
            <CashFlowChart monthlyRevenue={analytics?.cashflow_data?.monthly_revenue || []} />
          </div>
        </div>
      </div>

      {/* Onboarding Modal for new users */}
      <OnboardingIntegration />
    </div>
  );
};

export default Page;
