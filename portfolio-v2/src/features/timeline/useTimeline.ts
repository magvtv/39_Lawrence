import { useMemo } from "react";
import fallbackProfile from "../../data/fallbackProfile.json";
import { useProjects } from "../../hooks/useProjects";
import type { TimelineEvent } from "../../types/project";

export const useTimeline = () => {
  const { allProjects } = useProjects();

  // Create timeline events from projects and work experience
  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];

    // Add work experience events
    fallbackProfile.work.forEach((job: any, index: number) => {
      events.push({
        id: `work-${index}`,
        title: job.position,
        description: `${job.name} - ${job.summary}`,
        date: job.startDate,
        category: "work",
        icon: "briefcase",
      });
    });

    // Add education events
    fallbackProfile.education.forEach((edu: any, index: number) => {
      events.push({
        id: `education-${index}`,
        title: `${edu.studyType} in ${edu.area}`,
        description: `${edu.institution}`,
        date: edu.startDate,
        category: "education",
        icon: "graduation-cap",
      });
    });

    // Add project events
    allProjects.forEach((project) => {
      events.push({
        id: `project-${project.id}`,
        title: project.title,
        description: project.shortDescription,
        date: project.year.toString(),
        category: "project",
        relatedProjectId: project.id,
        icon: "code-bracket",
      });
    });

    // Sort all events by date
    return events.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Most recent first
    });
  }, [allProjects]);

  // Filter timeline events by category
  const filterEventsByCategory = (category?: string) => {
    if (!category) return timelineEvents;
    return timelineEvents.filter((event) => event.category === category);
  };

  // Get a date range for the timeline
  const timelineRange = useMemo(() => {
    if (!timelineEvents.length) return { start: new Date(), end: new Date() };

    const dates = timelineEvents.map((event) => new Date(event.date).getTime());
    const start = new Date(Math.min(...dates));
    const end = new Date(Math.max(...dates));

    return { start, end };
  }, [timelineEvents]);

  return {
    timelineEvents,
    filterEventsByCategory,
    timelineRange,
  };
};

export default useTimeline;
