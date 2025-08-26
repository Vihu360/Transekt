"use client"

import React from "react";
import TimeFrame from "./components/timeframe";
import TotalTransactions from "./components/totalTransactions";
import Chart from "./components/chart";
import GatewayComparison from "./components/charts/GatewayComparison";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4  text-black">
      <div className="w-full h-full flex items-center">
        <TimeFrame />
      </div>

      {/* Main Content Grid */}
      <div className="w-full flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 flex flex-col gap-0">
          {/* Unified Card - Total Transactions + Chart */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
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

        {/* Right Column - Gateway Comparison */}
        <div className="w-[400px] flex-shrink-0">
          <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full min-h-[600px] flex flex-col">
            {/* Header Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Payment Gateway Usage</h3>
              <p className="text-sm text-slate-500">Distribution across different payment providers</p>
            </div>
            <div className="flex-1 flex items-end">
              <GatewayComparison />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
