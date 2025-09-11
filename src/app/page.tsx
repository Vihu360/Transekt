"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const whyUsRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (whyUsRef.current) {
      observer.observe(whyUsRef.current);
    }

    return () => {
      if (whyUsRef.current) {
        observer.unobserve(whyUsRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find which card is intersecting
            const index = cardRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              // Animate cards one by one with staggered delay
              setTimeout(() => {
                setCardVisibility((prev) => {
                  const newVisibility = [...prev];
                  newVisibility[index] = true;
                  return newVisibility;
                });
              }, index * 300); // 300ms delay between each card
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        cardObserver.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          cardObserver.unobserve(ref);
        }
      });
    };
  }, []);
  return (
    <main className="min-h-screen  bg-black ">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 ">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-neutral-200 text-white grid place-items-center">
              T
            </div>
            <span className="font-semibold text-white tracking-tight">
              Transekt
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-200">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#insights" className="hover:text-white">
              Insights
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#docs" className="hover:text-white">
              Docs
            </a>
          </nav>
                     <div className="flex flex-wrap items-center gap-3">
            <a
              href="/auth/login"
              className="inline-flex h-9 items-center rounded-md border border-neutral-300 px-5 text-sm font-medium text-neutral-900 bg-neutral-50"
            >
              Sign in
            </a>
            <a
              href="/auth/signup"
              className="inline-flex h-9 items-center rounded-md bg-neutral-900 px-5 text-white text-sm font-medium hover:bg-neutral-800"
            >
              Join beta
            </a>
              </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-black ">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 pt-4">
          <div
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12"
            style={{
              background:
                "linear-gradient(135deg, #DFE8F5 0%, #C8DAF0 24%, #AFCBED 41%, #8FB7E8 60%, #6FA1E0 83%, #8AA9F2 100%)",
            }}
          >
            {/* Logo/Brand Area */}

            {/* Main Content */}
            <div className="max-w-4xl py-8 sm:py-12 lg:py-20">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[700] text-gray-900 mb-4 sm:mb-6 text-left">
                You&apos;re Losing INSIGHTS,
                <br />
                Not Just TIME.
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 sm:mb-8 text-left max-w-2xl">
                Without complete data, every decision is half a guess. <br className="hidden sm:block" /> We
                give you the full picture.
              </p>

              {/* CTA Button */}
              <button className="inline-flex items-center justify-center cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-base font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto">
                Get Started
              </button>

              <div className="w-full text-neutral-900 pt-3 sm:pt-4">
                <p className="text-sm sm:text-base">
                  We never touch your money. We only access transaction data
                  securely through <br className="hidden sm:block" /> PCI-compliant APIs*
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> 

      {/* Dashboard Preview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[400] text-white mb-4 sm:mb-6">
              See Your Data Come to Life
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Get a glimpse of the powerful insights and analytics that <br /> await you in your dashboard.
            </p>
          </div>

          {/* Dashboard Preview - Matching Real Dashboard Layout */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
            {/* Dashboard Header */}
           

            {/* Dashboard Content - Real Layout */}
            <div className="p-4 sm:p-6 text-black">
              {/* Time Frame Selector */}
              <div className="w-full flex items-center mb-4">
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1">
                  <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white text-gray-900 rounded-md shadow-sm">7D</button>
                  <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900">30D</button>
                  <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900">90D</button>
                </div>
              </div>

              {/* Main Content Grid - Exact Layout from Real Dashboard */}
              <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch h-auto lg:h-[650px]">
                {/* Left Column - Main Content (70% width) */}
                <div className="w-full lg:w-[70%] flex flex-col gap-0">
                  {/* Unified Card - Total Transactions + Chart */}
                  <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                    {/* Total Transactions Section - Real Design */}
                    <div className="p-4 pb-0">
                      <div className="p-5 rounded-xl text-white bg-gradient-to-br from-[#1a4d70] via-[#165aa0] to-[#0a2b90] shadow-lg relative overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full"></div>
                          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
                          <div className="absolute top-8 right-32 w-3 h-3 bg-white/20 rounded-full"></div>
                          <div className="absolute top-16 right-16 w-2 h-2 bg-white/15 rounded-full"></div>
                          <div className="absolute bottom-12 right-8 w-4 h-4 bg-white/8 rounded-full"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <p className="text-sm font-medium opacity-80">Total Balance</p>
                          <p className="mt-2 text-3xl font-bold">₹ 1,000,000</p>
                          <p className="mt-1 mb-1 text-sm opacity-70">
                            Your balance has grown by <span className="text-blue-300 font-semibold">5%</span> this month
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart Section - Success vs Failure */}
                    <div className="flex-1 flex items-end p-4 pt-0">
                      <div className="w-full bg-white overflow-hidden flex flex-col gap-5">
                        {/* Chart Header */}
                        <div className="px-4 py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Success vs Failure Comparison</h3>
                              <p className="text-sm text-gray-500 mt-1">Monthly payment performance overview</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] border border-blue-200">
                                  <div className="w-3 h-3 rounded bg-[#2563EB]"></div>
                                  <span className="text-sm font-medium">Success</span>
                                </button>
                                <button className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white text-[#93C5FD] border border-[#93C5FD]">
                                  <div className="w-3 h-3 rounded bg-[#93C5FD]"></div>
                                  <span className="text-sm font-medium">Failure</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Mock Bar Chart - Side by Side */}
                        <div className="w-full h-[300px] sm:h-[350px] lg:h-[420px] flex flex-col items-end justify-end px-2 sm:px-4 pb-4">
                          <div className="w-full h-full flex items-end justify-between overflow-x-auto">
                            {[45, 52, 68, 55, 48, 62, 75, 82, 58, 65, 72, 60].map((height, i) => (
                              <div key={i} className="flex flex-col items-center gap-2 min-w-[40px] sm:min-w-[48px]">
                                <div className="flex items-end gap-1">
                                  {/* Success bar (left) */}
                                  <div 
                                    className="w-4 sm:w-6 bg-[#2563EB] rounded-sm"
                                    style={{ height: `${height * 2.5}px` }}
                                  ></div>
                                  {/* Failure bar (right side of success) */}
                                  <div 
                                    className="w-4 sm:w-6 bg-[#93C5FD] rounded-sm"
                                    style={{ height: `${(height * 0.3) * 2.5}px` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500 text-center">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Two Equal Charts (30% width) */}
                <div className="w-full lg:w-[30%] flex flex-col gap-4">
                  {/* Payment Gateway Usage Chart */}
                  <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-md font-semibold text-gray-900">Payment Gateway Usage</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      {/* Mock Polar Chart */}
                      <div className="w-32 h-32 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-blue-200"></div>
                        <div className="absolute inset-2 rounded-full border-8 border-blue-300"></div>
                        <div className="absolute inset-4 rounded-full border-8 border-blue-400"></div>
                        <div className="absolute inset-6 rounded-full border-8 border-blue-500"></div>
                        <div className="absolute inset-8 rounded-full border-8 border-blue-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">47</div>
                            <div className="text-xs text-gray-500">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {[
                        { name: "Razorpay", color: "bg-blue-600", value: "11" },
                        { name: "Paypal", color: "bg-blue-500", value: "16" },
                        { name: "PhonePe", color: "bg-blue-400", value: "7" },
                        { name: "Stripe", color: "bg-blue-300", value: "3" },
                        { name: "Cashfree", color: "bg-blue-200", value: "14" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                          <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cash Flow Chart */}
                  <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-md font-semibold text-gray-900">Cash Flow</h3>
                      </div>
                      <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Mock Line Chart */}
                    <div className="flex-1 relative">
                      <svg className="w-full h-full" viewBox="0 0 200 120">
                        <defs>
                          <linearGradient id="cashFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35"/>
                            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.05"/>
                          </linearGradient>
                        </defs>
                        <polyline
                          points="10,100 30,80 50,60 70,70 90,40 110,30 130,20 150,15 170,10 190,5"
                          fill="none"
                          stroke="#1D8CF8"
                          strokeWidth="2"
                        />
                        <polygon
                          points="10,100 30,80 50,60 70,70 90,40 110,30 130,20 150,15 170,10 190,5 190,120 10,120"
                          fill="url(#cashFlowGradient)"
                        />
                        {[100, 80, 60, 70, 40, 30, 20, 15, 10, 5].map((y, i) => (
                          <circle key={i} cx={10 + i * 20} cy={y} r="2" fill="#1D8CF8" />
                        ))}
                      </svg>
                    </div>
                    
                    {/* Summary */}
                    <div className="flex items-center justify-between px-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900">+₹4,465.00</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">+12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-300 mb-4 sm:mb-6 px-4">Ready to see this dashboard with your own data?</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/app/overview">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-[#1a4d70] via-[#165aa0] to-[#0a2b90] rounded-xl cursor-pointer transition-colors text-sm sm:text-base">
                Start Free Trial
              </button>
              </Link>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base">
                Schedule Demo
              </button>
            </div>
          </div>
       </div>
      </section>

      {/* Feature pillars */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 bg-black flex flex-col gap-8 sm:gap-10"
      >
        <p
          ref={whyUsRef}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl w-full flex items-center justify-center transition-colors duration-2000 ease-in-out ${
            isVisible ? "text-white" : "text-neutral-400"
          }`}
        >
          REASON TO CHOOSE US ?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
             {
              title: "Clarity from day one",
              desc: "No more scattered reports or spreadsheets. Get a clear, consolidated view of your payments instantly."
            },           
            {
              title: "Unified view, faster decisions",
              desc: "Track monthly transactions, MRR, ARR, cash flows, and more — all in one with historical trends."
            },
            {
              title: "Save finance team hours",
              desc: "Automate reporting, reconciliation, and anomaly detection — no more manual spreadsheets.",
            },
            {
              title: "Accuracy you can trust",
              desc: "Eliminate human error with automated, audit-ready data collection and reporting.",
            },
            {
              title: "One-click integrations",
              desc: "Connect Stripe, Razorpay, PayPal and more in minutes — no custom engineering required.",
            },
            {
              title: "Scales securely with you",
              desc: "Enterprise-grade encryption, compliance-first design, and the ability to grow with your business.",
            },
          ].map((f, i) => (
            <article
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`rounded-xl border border-neutral-200 p-4 sm:p-6 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out transform ${
                cardVisibility[i]
                  ? "bg-white translate-y-0 opacity-100 scale-100"
                  : "bg-neutral-100 translate-y-12 opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: cardVisibility[i] ? `${i * 200}ms` : "0ms",
              }}
            >
              <div
                className={`h-10 w-10 rounded-lg text-white grid place-items-center text-xs transition-colors duration-1000 ${
                  cardVisibility[i] ? "bg-neutral-900" : "bg-neutral-400"
                }`}
              >
                {i + 1}
              </div>
              <h3
                className={`mt-3 sm:mt-4 text-base sm:text-lg font-semibold transition-colors duration-1000 ${
                  cardVisibility[i] ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed transition-colors duration-1000 ${
                  cardVisibility[i] ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Insights highlight */}
      <section
        id="insights"
        className="bg-neutral-50 border-y border-neutral-200"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                Turn data chaos into clarity
              </h2>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                Stop wasting hours on manual data compilation. Transekt
                automatically consolidates all your payment sources into clear,
                actionable insights that help you make better financial
                decisions.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />{" "}
                  Automated data consolidation
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />{" "}
                  Real-time payment analytics
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />{" "}
                  Custom reporting dashboards
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">
                      Gateway Comparison
                    </p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">
                      Chart
                    </div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">Failure Reasons</p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">
                      Bar breakdown
                    </div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">
                      Auth Rate by Issuer
                    </p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">
                      Heatmap
                    </div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">
                      Recoveries from Retries
                    </p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">
                      Time series
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners + Metrics */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Trusted by modern teams</h3>
            <p className="mt-2 text-sm text-neutral-600">
              From fast-growing D2C to marketplaces handling millions of
              transactions.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-6 gap-4 items-center">
            {[
              "/vercel.svg",
              "/next.svg",
              "/globe.svg",
              "/file.svg",
              "/vercel.svg",
              "/next.svg",
            ].map((src, i) => (
              <div
                key={i}
                className="h-10 opacity-60 grayscale hover:grayscale-0 transition"
              >
                <Image
                  src={src}
                  alt="logo"
                  width={100}
                  height={40}
                  className="h-full w-auto"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { k: "GMV tracked", v: "$27B+" },
            { k: "Auth lift", v: "+2.8%" },
            { k: "Time saved", v: "12h/wk" },
            { k: "Alerts daily", v: "Actionable" },
          ].map((m, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-200 p-4 bg-white"
            >
              <p className="text-xs text-neutral-500">{m.k}</p>
              <p className="mt-1 text-2xl font-semibold">{m.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 sm:px-8 pb-16">
        <div className="rounded-2xl border border-neutral-200 p-6 sm:p-10 bg-neutral-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold">
                Simple pricing that scales with you
              </h3>
              <p className="mt-2 text-neutral-600">
                Start free. Upgrade when you want advanced analytics, custom
                reports, and priority support.
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" />{" "}
                  Unlimited data sources
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" />{" "}
                  Advanced analytics
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" />{" "}
                  Custom reporting
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" />{" "}
                  Role-based access
                </li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
                <div className="text-4xl font-semibold">$0</div>
                <div className="text-xs text-neutral-500">
                  per month to start
                </div>
                <a
                  href="/auth/signup"
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-neutral-900 px-5 text-white text-sm font-medium hover:bg-neutral-800 w-full"
                >
                  Create account
                </a>
                <p className="mt-2 text-xs text-neutral-500">
                  No card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-neutral-900 text-white grid place-items-center">
                  T
                </div>
                <span className="font-medium">Transekt</span>
              </div>
              <p className="mt-3 text-neutral-600">
                Aggregating payment data to save your finance team time.
              </p>
            </div>
            <div>
              <p className="font-medium">Product</p>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li>
                  <a href="#features" className="hover:text-neutral-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#insights" className="hover:text-neutral-900">
                    Insights
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-neutral-900">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Company</p>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Legal</p>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Transekt. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-neutral-900">
                Status
              </a>
              <a href="#" className="hover:text-neutral-900">
                Changelog
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
