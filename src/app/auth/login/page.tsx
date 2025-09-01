"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/utils/api";
import { message } from "antd";

export default function LoginPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (response.error) {
        messageApi.destroy(); // Clear loading message
        messageApi.error("The email or password is incorrect");
        return;
      }

      if (response.data) {
        // The authApi.login function already handles storing the user data and token in cookies
        // Redirect to overview page on successful login
        router.push("/app/overview");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-white flex">
      {contextHolder}
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
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
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
                disabled={isLoading}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-neutral-900 focus:border-neutral-900 transition-colors duration-200 text-neutral-900 placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  disabled={isLoading}
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-neutral-900 cursor-pointer focus:ring-neutral-900 border-neutral-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label htmlFor="rememberMe" className="ml-2 cursor-pointer block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
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

          {/* Social Login */}
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

          {/* Sign Up Link */}
          <div className="text-center">
                         <p className="text-sm text-neutral-600">
               Don&apos;t have an account?{" "}
               <Link
                 href="/auth/signup"
                 className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
               >
                 Sign up for free
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
                Welcome to Transekt
              </h2>
              <p className="text-neutral-600 max-w-md leading-relaxed">
                Your unified dashboard for payment analytics, insights, and data management across all payment gateways.
              </p>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-neutral-700">Real-time data sync</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-neutral-700">Advanced analytics</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-neutral-200/50">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-neutral-700">Multi-gateway support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
