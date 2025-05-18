import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, Calendar, Box } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  className = "",
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -5 }}
      className={className}
    >
      <Link to={`/projects/${project.slug}`} className="block h-full">
        <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />

            {project.hasModel && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm"
                >
                  <Box size={14} className="mr-1" /> 3D Model
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="pt-4 pb-2 flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs font-normal">
                {project.category}
              </Badge>
              <div className="flex items-center text-muted-foreground text-xs">
                <Calendar size={12} className="mr-1" />
                {project.year}
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-2 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1 mt-auto">
              {project.tags.slice(0, 3).map((tag, i) => (
                <Badge
                  variant="outline"
                  key={i}
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-2 pb-4 text-sm flex items-center justify-between">
            <span className="font-medium">{project.client}</span>
            <span className="inline-flex items-center text-primary hover:underline">
              View Project <ArrowUpRightIcon size={14} className="ml-1" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
