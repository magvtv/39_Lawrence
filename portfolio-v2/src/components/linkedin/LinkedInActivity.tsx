import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLinkIcon, LinkedInIcon, RefreshCwIcon } from "lucide-react";
import type React from "react";
import { useLinkedInProfile } from "../../hooks/useLinkedInProfile";

interface LinkedInActivityProps {
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

export const LinkedInActivity: React.FC<LinkedInActivityProps> = ({
  limit = 3,
  showTitle = true,
  className = "",
}) => {
  const { activities, loading, error, retry } = useLinkedInProfile();

  // Show limited number of activities
  const displayActivities = activities?.slice(0, limit) || [];

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkedInIcon size={20} className="text-blue-600" />
            LinkedIn Activity
          </CardTitle>
          <CardDescription>Unable to load LinkedIn activity</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500 mb-4">{error.message}</p>
          <Button onClick={retry} variant="outline" size="sm" className="gap-2">
            <RefreshCwIcon size={14} />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className={className}>
        {showTitle && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkedInIcon size={20} className="text-blue-600" />
              LinkedIn Activity
            </CardTitle>
            <CardDescription>Loading recent activity...</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!displayActivities.length) {
    return (
      <Card className={className}>
        {showTitle && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkedInIcon size={20} className="text-blue-600" />
              LinkedIn Activity
            </CardTitle>
            <CardDescription>
              No recent LinkedIn activity to display
            </CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No posts or activities were found. Connect your LinkedIn profile to
            see your latest posts.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkedInIcon size={20} className="text-blue-600" />
            LinkedIn Activity
          </CardTitle>
          <CardDescription>Recent posts and activity</CardDescription>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className="border-b pb-4 last:border-b-0 last:pb-0"
          >
            <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
            {activity.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {activity.description.length > 120
                  ? `${activity.description.substring(0, 120)}...`
                  : activity.description}
              </p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {new Date(activity.createdAt).toLocaleDateString()}
              </span>
              <Button asChild size="sm" variant="ghost" className="h-7 px-2">
                <a
                  href={activity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span className="text-xs">View</span>
                  <ExternalLinkIcon size={12} />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <a
            href="https://www.linkedin.com/in/profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            View Full Profile <ExternalLinkIcon size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LinkedInActivity;
