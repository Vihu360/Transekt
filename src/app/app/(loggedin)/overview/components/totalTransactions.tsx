import { useState } from "react";

const TotalTransactions = ({ totalTransactions }) => {
  const [currency] = useState("₹");
  const growth = "5%";

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
     <p className="text-sm font-medium opacity-80">Total Balance</p>
     <p className="mt-2 text-3xl font-bold">
       {currency} {totalTransactions}
     </p>
     <p className="mt- mb-1 text-sm opacity-70">
       Your balance has grown by <span className="text-blue-300 font-semibold">{growth}</span> this month
     </p>
   </div>
</div>
  );
};

export default TotalTransactions;
