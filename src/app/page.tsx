import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen text-neutral-900 bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-neutral-900 text-white grid place-items-center">T</div>
            <span className="font-semibold tracking-tight">Transekt</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#features" className="hover:text-neutral-900">Features</a>
            <a href="#insights" className="hover:text-neutral-900">Insights</a>
            <a href="#pricing" className="hover:text-neutral-900">Pricing</a>
            <a href="#docs" className="hover:text-neutral-900">Docs</a>
          </nav>
                     <div className="flex flex-wrap items-center gap-3">
                <a href="#demo" className="inline-flex h-9 items-center rounded-md border border-neutral-300 px-5 text-sm font-medium text-neutral-900 hover:bg-neutral-50">Sign in</a>
                <a href="#get-started" className="inline-flex h-9 items-center rounded-md bg-neutral-900 px-5 text-white text-sm font-medium hover:bg-neutral-800">Join beta</a>
              </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -z-10 inset-0 [mask-image:radial-gradient(60%_40%_at_50%_10%,black,transparent)]">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[1200px] rounded-full bg-gradient-to-r from-amber-200 via-blue-200 to-emerald-200 blur-3xl opacity-60" />
        </div>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 sm:pt-24 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600">
                Payment Data Aggregator for Modern Teams
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
                Collect. Analyze. Save time.
              </h1>
              <p className="mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed">
                With Transekt, all your payments—whether from gateways, PSPs, or offline excel sheets—come together in one clean dashboard. We turn fragmented transaction data into actionable analytics, advanced insights, and anomaly detection, so finance and product teams can operate with clarity and certainty.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#get-started" className="inline-flex h-11 items-center rounded-md bg-neutral-900 px-5 text-white text-sm font-medium hover:bg-neutral-800">Get started free</a>
                <a href="#demo" className="inline-flex h-11 items-center rounded-md border border-neutral-300 px-5 text-sm font-medium text-neutral-900 hover:bg-neutral-50">See live demo</a>
              </div>
                             <div className="mt-6 flex items-center gap-6 text-xs text-neutral-500">
                 <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-emerald-100 text-emerald-700 grid place-items-center text-[10px]">8</span> Data sources</div>
                 <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-blue-100 text-blue-700 grid place-items-center text-[10px]">24/7</span> Auto sync</div>
                 <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-amber-100 text-amber-700 grid place-items-center text-[10px]">99.9%</span> Data accuracy</div>
               </div>
            </div>
                         <div className="lg:col-span-6">
               <div className="relative rounded-xl border border-neutral-200 bg-white shadow-[0_2px_40px_rgba(0,0,0,0.05)] p-4">
                 {/* Data Sources Visualization */}
                 <div className="mb-4">
                   <p className="text-sm font-medium text-neutral-700 mb-3">Data Sources Connected</p>
                   <div className="grid grid-cols-2 gap-3">
                     <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <span className="text-xs text-emerald-700">Stripe</span>
                     </div>
                     <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-200">
                       <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                       <span className="text-xs text-blue-700">Razorpay</span>
                     </div>
                     <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 border border-purple-200">
                       <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                       <span className="text-xs text-purple-700">PayU</span>
                     </div>
                     <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                       <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                       <span className="text-xs text-amber-700">Excel Files</span>
                     </div>
                   </div>
                 </div>
                 
                 {/* Sample Analytics Dashboard */}
                 <div className="space-y-3">
                   <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                       <span className="text-xs text-neutral-600">Total Transactions</span>
                     </div>
                     <span className="text-sm font-semibold">47,892</span>
                   </div>
                   
                   <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                       <span className="text-xs text-neutral-600">Data Sources</span>
                     </div>
                     <span className="text-sm font-semibold">8</span>
                   </div>
                   
                   <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                       <span className="text-xs text-neutral-600">Time Saved</span>
                     </div>
                     <span className="text-sm font-semibold text-emerald-600">12h/wk</span>
                   </div>
                 </div>
                 
                 {/* Quick Stats */}
                 <div className="mt-4 grid grid-cols-3 gap-2">
                   <div className="text-center p-2 rounded bg-white border border-neutral-200">
                     <p className="text-xs text-neutral-500">Files Processed</p>
                     <p className="text-lg font-semibold text-neutral-900">156</p>
                   </div>
                   <div className="text-center p-2 rounded bg-white border border-neutral-200">
                     <p className="text-xs text-neutral-500">Auto Sync</p>
                     <p className="text-lg font-semibold text-emerald-600">24/7</p>
                   </div>
                   <div className="text-center p-2 rounded bg-white border border-neutral-200">
                     <p className="text-xs text-neutral-500">Accuracy</p>
                     <p className="text-lg font-semibold text-blue-600">99.9%</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature pillars */}
      <section id="features" className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Collect from everywhere",
              desc: "Gateways, PSPs, offline excel sheets, and settlement files. No more manual data gathering.",
            },
            {
              title: "Unified analytics",
              desc: "See all payment data in one dashboard with real-time insights and historical trends.",
            },
            {
              title: "Save finance team time",
              desc: "Automate reporting, detect anomalies, and get actionable insights without manual analysis.",
            },
          ].map((f, i) => (
            <article key={i} className="rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-neutral-900 text-white grid place-items-center text-xs">{i + 1}</div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Insights highlight */}
      <section id="insights" className="bg-neutral-50 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Turn data chaos into clarity</h2>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                Stop wasting hours on manual data compilation. Transekt automatically consolidates all your payment sources into clear, actionable insights that help you make better financial decisions.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" /> Automated data consolidation</li>
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-500" /> Real-time payment analytics</li>
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-amber-500" /> Custom reporting dashboards</li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">Gateway Comparison</p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">Chart</div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">Failure Reasons</p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">Bar breakdown</div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">Auth Rate by Issuer</p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">Heatmap</div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-xs text-neutral-500">Recoveries from Retries</p>
                    <div className="mt-3 h-28 rounded bg-neutral-50 grid place-items-center text-neutral-400 text-sm">Time series</div>
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
            <p className="mt-2 text-sm text-neutral-600">From fast-growing D2C to marketplaces handling millions of transactions.</p>
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
              <div key={i} className="h-10 opacity-60 grayscale hover:grayscale-0 transition">
                <Image src={src} alt="logo" width={100} height={40} className="h-full w-auto" />
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
            <div key={i} className="rounded-lg border border-neutral-200 p-4 bg-white">
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
              <h3 className="text-2xl font-semibold">Simple pricing that scales with you</h3>
              <p className="mt-2 text-neutral-600">Start free. Upgrade when you want advanced analytics, custom reports, and priority support.</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700">
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" /> Unlimited data sources</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" /> Advanced analytics</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" /> Custom reporting</li>
                <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" /> Role-based access</li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
                <div className="text-4xl font-semibold">$0</div>
                <div className="text-xs text-neutral-500">per month to start</div>
                <a href="#get-started" className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-neutral-900 px-5 text-white text-sm font-medium hover:bg-neutral-800 w-full">Create account</a>
                <p className="mt-2 text-xs text-neutral-500">No card required</p>
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
                <div className="size-7 rounded-lg bg-neutral-900 text-white grid place-items-center">T</div>
                <span className="font-medium">Transekt</span>
              </div>
              <p className="mt-3 text-neutral-600">Aggregating payment data to save your finance team time.</p>
            </div>
            <div>
              <p className="font-medium">Product</p>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li><a href="#features" className="hover:text-neutral-900">Features</a></li>
                <li><a href="#insights" className="hover:text-neutral-900">Insights</a></li>
                <li><a href="#pricing" className="hover:text-neutral-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Company</p>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-neutral-900">About</a></li>
                <li><a href="#" className="hover:text-neutral-900">Careers</a></li>
                <li><a href="#" className="hover:text-neutral-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Legal</p>
              <ul className="mt-2 space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-neutral-900">Privacy</a></li>
                <li><a href="#" className="hover:text-neutral-900">Terms</a></li>
                <li><a href="#" className="hover:text-neutral-900">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Transekt. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-neutral-900">Status</a>
              <a href="#" className="hover:text-neutral-900">Changelog</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
