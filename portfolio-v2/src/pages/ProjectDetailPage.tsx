import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CalendarIcon,
  Boxes,
  ExternalLinkIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ModelViewer from "../components/model/ModelViewer";
import { useProjects } from "../hooks/useProjects";

interface ProjectParams {
  slug: string;
}

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<keyof ProjectParams>() as ProjectParams;
  const { getProjectBySlug, allProjects } = useProjects();
  const navigate = useNavigate();

  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (!project) {
      toast.error("Project not found", {
        description: "The project you are looking for does not exist",
        action: {
          label: "Go back to projects",
          onClick: () => navigate("/projects"),
        },
      });
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [project, navigate]);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you are looking for does not exist.
        </p>
        <Button asChild>
          <Link to="/projects">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  // Get next and previous projects for navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="group">
          <Link to="/projects" className="flex items-center">
            <ArrowLeftIcon className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <div className="space-y-2 mb-8">
          <Badge variant="outline" className="mb-2">
            {project.category}
          </Badge>
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </div>

        <div className="rounded-lg overflow-hidden aspect-video mb-8">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project meta information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" /> Year
            </h3>
            <p className="mt-1">{project.year}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <UserIcon className="mr-1 h-4 w-4" /> Client
            </h3>
            <p className="mt-1">{project.client}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <TagIcon className="mr-1 h-4 w-4" /> Role
            </h3>
            <p className="mt-1">{project.role}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Technologies
            </h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3D Model if available */}
      {project.hasModel && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-muted/60 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Boxes className="mr-2 h-5 w-5" /> 3D Model Preview
            </h2>
            <p className="text-muted-foreground mb-4">
              Interact with the 3D model by clicking and dragging to rotate,
              scrolling to zoom, and right-clicking to pan.
            </p>
          </div>
          <ModelViewer url={project.modelUrl || ""} backgroundColor="#111111" />
        </motion.div>
      )}

      {/* Project Content */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="space-y-8 mb-16"
      >
        {project.content.map((item, index) => {
          switch (item.type) {
            case "paragraph":
              return (
                <p key={index} className="text-base leading-relaxed">
                  {item.content}
                </p>
              );
            case "image":
              return (
                <figure key={index} className="my-8">
                  <img
                    src={item.url}
                    alt={item.caption || `Project image ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  {item.caption && (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              );
            case "video":
              return (
                <figure key={index} className="my-8">
                  <video
                    src={item.url}
                    controls
                    className="w-full rounded-lg"
                  />
                  {item.caption && (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              );
            case "quote":
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-primary pl-4 italic"
                >
                  {item.content}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </motion.div>

      {/* Tags */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-lg font-medium mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* External Link */}
      {project.linkUrl && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Button asChild variant="outline">
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Visit Project <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      )}

      {/* Project Navigation */}
      <Separator className="my-8" />
      <div className="flex justify-between items-center">
        {prevProject ? (
          <Button variant="ghost" asChild className="flex items-center">
            <Link to={`/projects/${prevProject.slug}`}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              <span className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span>{prevProject.title}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {nextProject && (
          <Button
            variant="ghost"
            asChild
            className="flex items-center text-right"
          >
            <Link to={`/projects/${nextProject.slug}`}>
              <span className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Next</span>
                <span>{nextProject.title}</span>
              </span>
              <ArrowLeftIcon className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
