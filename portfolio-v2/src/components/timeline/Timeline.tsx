import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronRightIcon,
  CodeIcon,
  GraduationCapIcon,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TimelineEvent } from "../../types/project";

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  className = "",
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const getIcon = (category: string) => {
    switch (category) {
      case "work":
        return <BriefcaseIcon className="h-5 w-5" />;
      case "education":
        return <GraduationCapIcon className="h-5 w-5" />;
      case "project":
        return <CodeIcon className="h-5 w-5" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "education":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "project":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const viewProject = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (event?.relatedProjectId) {
      // Find the project with this ID and navigate to its page
      const projectEvent = events.find(
        (e) => e.id === `project-${event.relatedProjectId}`,
      );
      if (projectEvent) {
        navigate(`/projects/${event.relatedProjectId}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200" />

      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative mb-8 last:mb-0"
        >
          <div className="flex items-start">
            {/* Icon circle */}
            <motion.div
              className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
              whileHover={{ scale: 1.1 }}
            >
              {getIcon(event.category)}
            </motion.div>

            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1 sm:mt-0">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {formatDate(event.date)}
                </div>
              </div>

              <Badge
                className={`mb-2 text-xs font-normal cursor-pointer ${getBadgeColor(event.category)}`}
                onClick={() => {
                  const filtered = events.filter(
                    (e) => e.category === event.category,
                  );
                  // Logic to filter timeline by this category would go here
                }}
              >
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </Badge>

              <p className="text-muted-foreground mb-2">{event.description}</p>

              {expandedId === event.id ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-gray-50 p-3 rounded-md mb-2"
                >
                  <p className="text-sm">
                    Additional details about this {event.category} would appear
                    here when expanded. This could include achievements,
                    technologies used, or key responsibilities.
                  </p>
                </motion.div>
              ) : null}

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setExpandedId(expandedId === event.id ? null : event.id)
                  }
                  className="text-xs"
                >
                  {expandedId === event.id ? "Show Less" : "Show More"}
                </Button>

                {event.relatedProjectId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewProject(event.id)}
                    className="text-xs flex items-center"
                  >
                    View Project <ChevronRightIcon className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
