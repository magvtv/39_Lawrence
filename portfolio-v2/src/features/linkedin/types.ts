export interface LinkedInProfile {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
  profilePicture?: {
    displayImage: string;
  };
  vanityName?: string;
  localizedHeadline?: string;
  localizedIndustry?: string;
  localizedRegion?: string;
}

export interface LinkedInError {
  status: number;
  message: string;
  timestamp: number;
}

export interface LinkedInAuthState {
  isAuthenticated: boolean;
  profile: LinkedInProfile | null;
  loading: boolean;
  error: LinkedInError | null;
}

export interface LinkedInAuthResponse {
  code: string;
  state: string;
}

export interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
}

export interface LinkedInActivityPost {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  url: string;
}

export interface LinkedInActivityState {
  posts: LinkedInActivityPost[];
  loading: boolean;
  error: LinkedInError | null;
}
