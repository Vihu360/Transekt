"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12">
          <div className="w-full max-w-md text-center space-y-8">
            {/* Header */}
            <div className="flex justify-center mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-neutral-900 text-white grid place-items-center text-lg font-semibold">
                  T
                </div>
                <span className="text-xl font-bold tracking-tight text-neutral-900">
                  Transekt
                </span>
              </Link>
            </div>

            {/* Success Message */}
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 grid place-items-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Check your email
                </h1>
                                 <p className="mt-2 text-sm text-neutral-600">
                   We&apos;ve sent a password reset link to{" "}
                   <span className="font-medium text-neutral-900">{email}</span>
                 </p>
              </div>

              <div className="bg-neutral-50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-neutral-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Check your email for the reset link
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Click the link to reset your password
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Create a new password and sign in
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors duration-200"
                >
                  Resend email
                </button>
                
                <Link
                  href="/auth/login"
                  className="block w-full py-3 px-4 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200 text-center"
                >
                  Back to sign in
                </Link>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center">
                           <p className="text-xs text-neutral-500">
               Didn&apos;t receive the email? Check your spam folder or{" "}
               <button
                 onClick={() => setIsSubmitted(false)}
                 className="text-neutral-900 hover:text-neutral-700 underline"
               >
                 try a different email address
               </button>
             </p>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 to-neutral-900/10" />
          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="text-center space-y-6 p-12">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-neutral-900 text-white grid place-items-center text-3xl font-bold">
                T
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Secure & Simple
                </h2>
                <p className="text-neutral-600 max-w-md leading-relaxed">
                  Our password reset process is designed to be both secure and user-friendly, ensuring you can get back to managing your payment data quickly.
                </p>
              </div>
              
              {/* Security Features */}
              <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center text-sm font-semibold">
                    🔐
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-neutral-900">Secure reset</div>
                    <div className="text-xs text-neutral-600">256-bit encryption</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 grid place-items-center text-sm font-semibold">
                    ⏱️
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-neutral-900">Quick process</div>
                    <div className="text-xs text-neutral-600">Reset in minutes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 grid place-items-center text-sm font-semibold">
                    📧
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-neutral-900">Email delivery</div>
                    <div className="text-xs text-neutral-600">Instant notification</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-neutral-900 text-white grid place-items-center text-lg font-semibold">
                  T
                </div>
                <span className="text-xl font-bold tracking-tight text-neutral-900">
                  Transekt
                </span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              Forgot your password?
            </h1>
                             <p className="mt-2 text-sm text-neutral-600">
                   No worries! Enter your email and we&apos;ll send you reset instructions.
                 </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors duration-200"
            >
              Send reset instructions
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-neutral-600">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Help Text */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h4 className="font-medium text-neutral-900 mb-2">Need help?</h4>
                         <p className="text-sm text-neutral-600 mb-3">
               If you&apos;re still having trouble, contact our support team and we&apos;ll help you get back into your account.
             </p>
            <Link
              href="/support"
              className="inline-flex items-center text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
            >
              Contact support
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 to-neutral-900/10" />
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="text-center space-y-6 p-12">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-neutral-900 text-white grid place-items-center text-3xl font-bold">
              T
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">
                We've got you covered
              </h2>
                             <p className="text-neutral-600 max-w-md leading-relaxed">
                 Don&apos;t let a forgotten password slow you down. Our secure reset process gets you back to managing your payment data in no time.
               </p>
            </div>
            
            {/* Security Features */}
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center text-sm font-semibold">
                  🔐
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900">Secure reset</div>
                  <div className="text-xs text-neutral-600">256-bit encryption</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 grid place-items-center text-sm font-semibold">
                  ⏱️
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900">Quick process</div>
                  <div className="text-xs text-neutral-600">Reset in minutes</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 grid place-items-center text-sm font-semibold">
                  📧
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900">Email delivery</div>
                  <div className="text-xs text-neutral-600">Instant notification</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
