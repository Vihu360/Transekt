"use client"

import React from "react";
import TimeFrame from "./components/timeframe";
import TotalTransactions from "./components/totalTransactions";
import Chart from "./components/chart";
import GatewayComparison from "./components/charts/GatewayComparison";
import CashFlowChart from "./components/charts/CashFlowChart";
import OnboardingIntegration from "@/components/OnboardingIntegration";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4  text-black">
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
              <TotalTransactions totalTransactions={"1,000,000"} />
            </div>
            
            {/* Chart Section */}
            <div className="flex-1 flex items-end p-4 pt-0">
              <Chart />
            </div>
          </div>
        </div>

        {/* Right Column - Two Equal Charts (30% width) */}
        <div className="w-[30%] flex flex-col gap-4">
          {/* First Chart */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
            <GatewayComparison />
          </div>
          
          {/* Second Chart */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
            <CashFlowChart />
          </div>
        </div>
      </div>

      {/* Onboarding Modal for new users */}
      <OnboardingIntegration />
    </div>
  );
};

export default page;
