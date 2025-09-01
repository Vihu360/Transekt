"use client";

import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useRouter } from "next/navigation";

interface OnboardingModalProps {
  /** Whether the modal is visible */
  open?: boolean;
  /** Callback when modal visibility changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom title for the modal (optional for A/B testing) */
  title?: string;
  /** Custom hook message (optional for A/B testing) */
  hookMessage?: string;
  /** Custom solution message (optional for A/B testing) */
  solutionMessage?: string;
  /** Custom primary button text */
  primaryButtonText?: string;
  /** Custom secondary button text */
  secondaryButtonText?: string;
  /** Route to redirect to on primary action */
  redirectRoute?: string;
}

export default function OnboardingModal({
  open: externalOpen,
  onOpenChange,
  title = "You're almost there! 🎯",
  hookMessage = "Connect your payment providers and see your data in one place — no more spreadsheets, just real-time insights.",
}: OnboardingModalProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const handleConnectProviders = () => {
    setIsOpen(false);
    router.push("/connect");
  };

  const handleGoToDashboard = () => {
    setIsOpen(false);
    router.push("/app/overview");
  };

  const handleSkip = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      centered
      width={480}
      className="onboarding-modal"
      maskClosable={false}
      closable={false}
      styles={{
        body: {
          padding: "32px 24px",
        },
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            {title}
          </h2>
                     <p className="text-sm text-neutral-600 mb-6">
             Connect your payment providers and see your data in one place —{" "}
             <span className="text-emerald-600 font-medium">No more spreadsheets, just real-time insights</span>.
           </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div className="bg-neutral-900 h-2 rounded-full w-1/3"></div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {/* Step 1: Connect Providers */}
          <div 
            onClick={handleConnectProviders}
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-neutral-900">
                Connect to payment providers
              </span>
            </div>
            <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Step 2: Go to Dashboard */}
          <div 
            onClick={handleGoToDashboard}
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-neutral-900">
                Go to dashboard/overview
              </span>
            </div>
            <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Step 3: Skip */}
          <div 
            onClick={handleSkip}
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-neutral-900">
                Skip for now
              </span>
            </div>
            <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Modal>
  );
}
