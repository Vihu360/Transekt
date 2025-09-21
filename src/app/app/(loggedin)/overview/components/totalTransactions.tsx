import { useState } from "react";

interface TotalTransactionsProps {
  totalTransactions: string;
  currency?: string;
  percentageChange?: number;
}

const TotalTransactions = ({ totalTransactions, currency = "₹", percentageChange = 0 }: TotalTransactionsProps) => {
  const [currencySymbol] = useState(currency);
  const growth = percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`;

  return (
<div className="p-5 rounded-xl text-white bg-gradient-to-br from-[#1a4d70] via-[#165aa0] to-[#0a2b90] shadow-lg relative overflow-hidden">
   
   {/* Background decorative elements */}
   <div className="absolute inset-0 overflow-hidden">
     {/* Large circle in top right */}
     <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full"></div>
     
     {/* Medium circle bottom left */}
     <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
     
     {/* Small decorative circles */}
     <div className="absolute top-8 right-32 w-3 h-3 bg-white/20 rounded-full"></div>
     <div className="absolute top-16 right-16 w-2 h-2 bg-white/15 rounded-full"></div>
     <div className="absolute bottom-12 right-8 w-4 h-4 bg-white/8 rounded-full"></div>
   </div>
   
   {/* Content */}
   <div className="relative z-10">
     <p className="text-sm font-medium opacity-80">Total Revenue</p>
     <p className="mt-2 text-3xl font-bold">
       {currencySymbol} {totalTransactions}
     </p>
     <p className="mt- mb-1 text-sm opacity-70">
       Revenue has {percentageChange >= 0 ? 'grown' : 'decreased'} by <span className={`font-semibold ${percentageChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>{growth}</span> this month
     </p>
   </div>
</div>
  );
};

export default TotalTransactions;
