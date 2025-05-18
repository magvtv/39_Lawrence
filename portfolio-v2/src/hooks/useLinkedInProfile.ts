import { useEffect, useState } from "react";
import { useLinkedIn } from "../features/linkedin/LinkedInContext";

interface UseLinkedInProfileOptions {
  useFallback?: boolean;
  autoLoadFallback?: boolean;
}

export const useLinkedInProfile = (options: UseLinkedInProfileOptions = {}) => {
  const { useFallback = true, autoLoadFallback = true } = options;
  const { auth, activity, login, logout, loadFallbackProfile } = useLinkedIn();
  const [isInitialized, setIsInitialized] = useState(false);

  // Automatically load fallback if needed and if option is enabled
  useEffect(() => {
    if (
      !isInitialized &&
      autoLoadFallback &&
      useFallback &&
      !auth.isAuthenticated &&
      !auth.loading &&
      !auth.profile
    ) {
      loadFallbackProfile();
      setIsInitialized(true);
    }
  }, [auth, autoLoadFallback, useFallback, isInitialized, loadFallbackProfile]);

  // Prepare a clean profile object for display
  const profile = auth.profile
    ? {
        name: `${auth.profile.localizedFirstName} ${auth.profile.localizedLastName}`,
        headline: auth.profile.localizedHeadline || "",
        region: auth.profile.localizedRegion || "",
        image: auth.profile.profilePicture?.displayImage || "",
        isVerified: auth.isAuthenticated,
      }
    : null;

  // Handle authentication errors
  const handleError = () => {
    if (auth.error && useFallback) {
      loadFallbackProfile();
    }
  };

  // Try loading profile again if it failed
  const retry = () => {
    if (auth.error) {
      login();
    }
  };

  return {
    profile,
    activities: activity.posts,
    loading: auth.loading || activity.loading,
    isAuthenticated: auth.isAuthenticated,
    error: auth.error || activity.error,
    login,
    logout,
    handleError,
    retry,
    loadFallbackProfile,
  };
};

export default useLinkedInProfile;
