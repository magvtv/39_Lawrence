import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import type React from "react";
import { useLinkedInProfile } from "../../hooks/useLinkedInProfile";

interface LinkedInBadgeProps {
  showLoginButton?: boolean;
  showVerifiedBadge?: boolean;
  className?: string;
}

export const LinkedInBadge: React.FC<LinkedInBadgeProps> = ({
  showLoginButton = true,
  showVerifiedBadge = true,
  className = "",
}) => {
  const { profile, isAuthenticated, loading, login, error, retry } =
    useLinkedInProfile();

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        <span className="text-sm text-muted-foreground">
          Connecting to LinkedIn...
        </span>
      </div>
    );
  }

  if (error && showLoginButton) {
    return (
      <div className={`flex flex-col ${className}`}>
        <p className="mb-2 text-sm text-red-500">
          Failed to connect to LinkedIn. {error.message}
        </p>
        <Button onClick={retry} variant="outline" size="sm" className="gap-2">
          <LinkedinIcon size={16} className="text-blue-600" />
          Retry connection
        </Button>
      </div>
    );
  }

  if (isAuthenticated && profile && showVerifiedBadge) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1.5 px-2 py-1"
        >
          <LinkedinIcon size={14} className="text-blue-600" />
          <span className="text-xs font-medium">Verified from LinkedIn</span>
        </Badge>
      </div>
    );
  }

  if (!isAuthenticated && showLoginButton) {
    return (
      <div className={`flex items-center ${className}`}>
        <Button onClick={login} variant="outline" size="sm" className="gap-2">
          <LinkedinIcon size={16} className="text-blue-600" />
          Connect LinkedIn Profile
        </Button>
      </div>
    );
  }

  return null;
};

export default LinkedInBadge;
