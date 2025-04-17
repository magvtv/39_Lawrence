import axios, { type AxiosError, type AxiosInstance } from "axios";
import type {
  LinkedInActivityPost,
  LinkedInError,
  LinkedInProfile,
  LinkedInTokenResponse,
} from "./types";

// Constants
const API_URL = "https://api.linkedin.com/v2";
const OAUTH_URL = "https://www.linkedin.com/oauth/v2";
const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

class LinkedInApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || "";
    this.clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET || "";
    this.redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || "";

    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add interceptor for handling errors
    this.client.interceptors.response.use(
      (response) => response,
      this.handleRequestError.bind(this),
    );
  }

  // Handle request errors with exponential backoff for rate limiting
  private async handleRequestError(error: AxiosError) {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, config } = error.response;
    const retryCount = config.headers["x-retry-count"]
      ? Number.parseInt(config.headers["x-retry-count"] as string, 10)
      : 0;

    // Handle rate limiting (429 Too Many Requests)
    if (status === 429 && retryCount < DEFAULT_RETRY_ATTEMPTS) {
      const retryAfter = error.response.headers["retry-after"]
        ? Number.parseInt(error.response.headers["retry-after"], 10) * 1000
        : 2 ** retryCount * DEFAULT_RETRY_DELAY;

      console.log(
        `Rate limited. Retrying after ${retryAfter}ms (Attempt ${retryCount + 1}/${DEFAULT_RETRY_ATTEMPTS})`,
      );

      await new Promise((resolve) => setTimeout(resolve, retryAfter));

      // Update retry count in headers
      const newConfig = {
        ...config,
        headers: {
          ...config.headers,
          "x-retry-count": `${retryCount + 1}`,
        },
      };

      return this.client(newConfig);
    }

    // Create standardized error
    const linkedInError: LinkedInError = {
      status,
      message: error.message || "Unknown error occurred",
      timestamp: Date.now(),
    };

    return Promise.reject(linkedInError);
  }

  // Set access token after authentication
  public setAccessToken(token: string, expiresIn: number) {
    this.accessToken = token;
    this.tokenExpiry = Date.now() + expiresIn * 1000;
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // Check if token is valid
  public isTokenValid(): boolean {
    return !!(
      this.accessToken &&
      this.tokenExpiry &&
      this.tokenExpiry > Date.now()
    );
  }

  // Generate authentication URL
  public getAuthUrl(state: string): string {
    const scopes = [
      "r_emailaddress",
      "r_liteprofile",
      "r_basicprofile",
      "w_member_social",
    ].join(" ");

    return `${OAUTH_URL}/authorization?response_type=code&client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(
      this.redirectUri,
    )}&state=${state}&scope=${encodeURIComponent(scopes)}`;
  }

  // Exchange authorization code for access token
  public async getAccessToken(code: string): Promise<LinkedInTokenResponse> {
    try {
      const response = await axios.post(`${OAUTH_URL}/accessToken`, null, {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      this.setAccessToken(response.data.access_token, response.data.expires_in);
      return response.data;
    } catch (error) {
      console.error("Error getting LinkedIn access token:", error);
      throw error;
    }
  }

  // Get the user's basic profile
  public async getProfile(): Promise<LinkedInProfile> {
    if (!this.isTokenValid()) {
      throw new Error("LinkedIn token is invalid or expired");
    }

    try {
      const response = await this.client.get("/me", {
        params: {
          projection:
            "(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams),vanityName,localizedHeadline,localizedIndustry,localizedRegion)",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching LinkedIn profile:", error);
      throw error;
    }
  }

  // Get the user's recent activity/posts
  public async getRecentActivity(): Promise<LinkedInActivityPost[]> {
    if (!this.isTokenValid()) {
      throw new Error("LinkedIn token is invalid or expired");
    }

    try {
      // This is a simplified example - LinkedIn's actual API for user activities is more complex
      const response = await this.client.get("/shares", {
        params: {
          q: "owners",
          owners: "urn:li:person:me",
          count: 10,
        },
      });

      // Transform the response data into our ActivityPost format
      return response.data.elements.map((element: any) => ({
        id: element.id,
        title: element.text?.text || "Shared post",
        description: element.commentary?.text,
        createdAt: element.created?.time,
        url: `https://www.linkedin.com/feed/update/${element.id}`,
      }));
    } catch (error) {
      console.error("Error fetching LinkedIn activity:", error);
      throw error;
    }
  }
}

export const linkedInApi = new LinkedInApiClient();
export default linkedInApi;
