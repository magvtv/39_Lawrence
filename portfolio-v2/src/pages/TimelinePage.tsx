import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  CodeIcon,
  FilterIcon,
  GraduationCapIcon,
  XIcon,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import Timeline from "../components/timeline/Timeline";
import { useTimeline } from "../features/timeline/useTimeline";

const TimelinePage: React.FC = () => {
  const { timelineEvents, filterEventsByCategory } = useTimeline();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = selectedCategory
    ? filterEventsByCategory(selectedCategory)
    : timelineEvents;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const categoryTypes = [
    {
      id: "work",
      name: "Work",
      icon: <BriefcaseIcon className="h-4 w-4 mr-2" />,
      color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    {
      id: "education",
      name: "Education",
      icon: <GraduationCapIcon className="h-4 w-4 mr-2" />,
      color: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    {
      id: "project",
      name: "Projects",
      icon: <CodeIcon className="h-4 w-4 mr-2" />,
      color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    },
  ];

  return (
    <div className="space-y-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-3">Professional Timeline</h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            An interactive journey through my professional career, education,
            and key projects. Explore the milestones that have shaped my
            expertise and experience.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mb-8"
        >
          <div className="flex items-center mr-2">
            <FilterIcon className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>

          {categoryTypes.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer flex items-center ${
                selectedCategory === category.id ? "" : category.color
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon}
              {category.name}
            </Badge>
          ))}

          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="h-6 px-2 text-xs"
            >
              <XIcon className="h-3 w-3 mr-1" />
              Clear filter
            </Button>
          )}
        </motion.div>

        {/* Timeline Component */}
        <motion.div variants={itemVariants}>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                There are no events matching your current filter.
              </p>
              <Button onClick={() => setSelectedCategory(null)}>
                Clear Filter
              </Button>
            </div>
          ) : (
            <Timeline events={filteredEvents} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelinePage;
