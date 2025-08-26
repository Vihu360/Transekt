"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Handle final signup logic here
      console.log("Signup attempt:", formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            i + 1 === step
              ? "bg-neutral-900"
              : i + 1 < step
              ? "bg-neutral-400"
              : "bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-2">
                Company name <span className="text-neutral-400">(optional)</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                placeholder="Enter your company name"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                placeholder="Create a strong password"
              />
              <div className="mt-2 text-xs text-neutral-500">
                Must be at least 8 characters with uppercase, lowercase, and number
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-neutral-900 focus:ring-neutral-900 border-neutral-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-neutral-700">
                  I agree to the{" "}
                  <Link href="/terms" className="text-neutral-900 hover:text-neutral-700 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-neutral-900 hover:text-neutral-700 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="acceptMarketing"
                  name="acceptMarketing"
                  type="checkbox"
                  checked={formData.acceptMarketing}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-neutral-900 focus:ring-neutral-900 border-neutral-300 rounded"
                />
                <label htmlFor="acceptMarketing" className="ml-2 block text-sm text-neutral-700">
                  I&apos;d like to receive product updates and marketing communications
                </label>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-medium text-neutral-900 mb-2">What you&apos;ll get:</h4>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  Free 14-day trial
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  No credit card required
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  Full access to all features
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
              Create your account
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                >
                  Back
                </button>
              )}
              <button
                type={step === totalSteps ? "submit" : "button"}
                onClick={step < totalSteps ? nextStep : undefined}
                className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors duration-200"
              >
                {step === totalSteps ? "Create account" : "Continue"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-3 px-4 border border-neutral-300 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>
            <button className="w-full inline-flex justify-center py-3 px-4 border border-neutral-300 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span className="ml-2">GitHub</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
              >
                Sign in
              </Link>
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
                Join thousands of teams
              </h2>
              <p className="text-neutral-600 max-w-md leading-relaxed">
                Start your journey with Transekt and transform how you manage payment data across all your platforms.
              </p>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center text-sm font-semibold">
                  ✓
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900">Free trial</div>
                  <div className="text-xs text-neutral-600">14 days, no credit card</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 grid place-items-center text-sm font-semibold">
                  ⚡
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900">Quick setup</div>
                  <div className="text-xs text-neutral-600">Connect in minutes</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 grid place-items-center text-sm font-semibold">
                  🔒
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-neutral-900">Enterprise security</div>
                  <div className="text-xs text-neutral-600">SOC 2 compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
