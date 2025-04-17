import type React from "react";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import fallbackProfile from "../../data/fallbackProfile.json";
import { linkedInApi } from "./api";
import type {
  LinkedInActivityPost,
  LinkedInActivityState,
  LinkedInAuthState,
  LinkedInError,
  LinkedInProfile,
} from "./types";

// Initialize with default values
const initialAuthState: LinkedInAuthState = {
  isAuthenticated: false,
  profile: null,
  loading: false,
  error: null,
};

const initialActivityState: LinkedInActivityState = {
  posts: [],
  loading: false,
  error: null,
};

interface LinkedInContextType {
  auth: LinkedInAuthState;
  activity: LinkedInActivityState;
  login: () => void;
  logout: () => void;
  handleAuthCallback: (code: string) => Promise<void>;
  loadFallbackProfile: () => void;
}

const LinkedInContext = createContext<LinkedInContextType | undefined>(
  undefined,
);

interface LinkedInProviderProps {
  children: ReactNode;
}

export const LinkedInProvider: React.FC<LinkedInProviderProps> = ({
  children,
}) => {
  const [auth, setAuth] = useState<LinkedInAuthState>(initialAuthState);
  const [activity, setActivity] =
    useState<LinkedInActivityState>(initialActivityState);

  // Generate a random state for OAuth security
  const generateState = () => {
    return Math.random().toString(36).substring(2);
  };

  // Check if there's a stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("linkedin_token");
    const storedExpiry = localStorage.getItem("linkedin_expiry");

    if (storedToken && storedExpiry && Number(storedExpiry) > Date.now()) {
      linkedInApi.setAccessToken(
        storedToken,
        (Number(storedExpiry) - Date.now()) / 1000,
      );
      fetchProfile();
    }
  }, []);

  // Fetch the user's profile
  const fetchProfile = async () => {
    if (!linkedInApi.isTokenValid()) {
      return;
    }

    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const profile = await linkedInApi.getProfile();
      setAuth({
        isAuthenticated: true,
        profile,
        loading: false,
        error: null,
      });

      // Fetch activities after successful profile retrieval
      fetchActivity();
    } catch (error) {
      console.error("Error fetching LinkedIn profile:", error);
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: error as LinkedInError,
      }));
    }
  };

  // Fetch the user's recent activity
  const fetchActivity = async () => {
    if (!linkedInApi.isTokenValid()) {
      return;
    }

    setActivity((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const posts = await linkedInApi.getRecentActivity();
      setActivity({
        posts,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching LinkedIn activity:", error);
      setActivity((prev) => ({
        ...prev,
        loading: false,
        error: error as LinkedInError,
      }));
    }
  };

  // Initiate LinkedIn login
  const login = () => {
    const state = generateState();
    localStorage.setItem("linkedin_state", state);
    window.location.href = linkedInApi.getAuthUrl(state);
  };

  // Handle the OAuth callback
  const handleAuthCallback = async (code: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const tokenData = await linkedInApi.getAccessToken(code);

      // Store token data in localStorage
      localStorage.setItem("linkedin_token", tokenData.access_token);
      localStorage.setItem(
        "linkedin_expiry",
        String(Date.now() + tokenData.expires_in * 1000),
      );

      // Fetch profile after successful authentication
      await fetchProfile();
    } catch (error) {
      console.error("Error handling LinkedIn auth callback:", error);
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: error as LinkedInError,
      }));
    }
  };

  // Logout from LinkedIn
  const logout = () => {
    localStorage.removeItem("linkedin_token");
    localStorage.removeItem("linkedin_expiry");
    localStorage.removeItem("linkedin_state");

    setAuth(initialAuthState);
    setActivity(initialActivityState);
  };

  // Load fallback profile data
  const loadFallbackProfile = () => {
    const profile: LinkedInProfile = {
      id: "fallback-id",
      localizedFirstName: fallbackProfile.basics.name.split(" ")[0],
      localizedLastName: fallbackProfile.basics.name
        .split(" ")
        .slice(1)
        .join(" "),
      localizedHeadline: fallbackProfile.basics.title,
      localizedRegion: `${fallbackProfile.basics.location.city}, ${fallbackProfile.basics.location.countryCode}`,
      profilePicture: {
        displayImage: fallbackProfile.basics.image,
      },
    };

    setAuth({
      isAuthenticated: false,
      profile,
      loading: false,
      error: null,
    });

    // Create fallback activity posts
    const fallbackPosts: LinkedInActivityPost[] = fallbackProfile.projects.map(
      (project: any, index: number) => ({
        id: `fallback-${index}`,
        title: project.name,
        description: project.description,
        createdAt: project.startDate,
        url: project.url,
      }),
    );

    setActivity({
      posts: fallbackPosts,
      loading: false,
      error: null,
    });
  };

  const value = {
    auth,
    activity,
    login,
    logout,
    handleAuthCallback,
    loadFallbackProfile,
  };

  return (
    <LinkedInContext.Provider value={value}>
      {children}
    </LinkedInContext.Provider>
  );
};

export const useLinkedIn = () => {
  const context = useContext(LinkedInContext);
  if (context === undefined) {
    throw new Error("useLinkedIn must be used within a LinkedInProvider");
  }
  return context;
};

export default LinkedInContext;
