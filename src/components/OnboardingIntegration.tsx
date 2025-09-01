"use client";

import { useEffect, useState } from "react";
import OnboardingModal from "./OnboardingModal";
import Cookies from "js-cookie";

/**
 * Simple hook to manage onboarding modal state
 * Can be used in any component that needs to show onboarding
 */
export function useOnboardingModal() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user should see onboarding (e.g., first-time login)
    const shouldShowOnboarding = Cookies.get("isNewUser");

    if (shouldShowOnboarding === "true") {
      setShowOnboarding(true);
      // Clear the flag so it doesn't show again
      Cookies.remove("isNewUser");
    }
  }, []);

  return {
    showOnboarding,
    setShowOnboarding,
  };
}

/**
 * Integration component that can be added to any page
 * Shows onboarding modal based on user state
 */
export default function OnboardingIntegration() {
  const { showOnboarding, setShowOnboarding } = useOnboardingModal();

  return (
    <OnboardingModal
      open={showOnboarding}
      onOpenChange={setShowOnboarding}
    />
  );
}

// /**
//  * Example integration in your overview page:
//  *
//  * import OnboardingIntegration from "@/components/OnboardingIntegration";
//  *
//  * export default function OverviewPage() {
//  *   return (
//  *     <div>
//  *       {/* Your existing content */}
//  *       <OnboardingIntegration />
//  *     </div>
//  *   );
//  * }
//  */
