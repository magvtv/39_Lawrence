import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage: React.FC = () => {
  const {
    projects,
    filterOptions,
    filters,
    updateFilters,
    resetFilters,
    sortOption,
    changeSortOption,
  } = useProjects();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter projects based on search query
  const filteredProjects = searchQuery
    ? projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : projects;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const handleCategoryChange = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      updateFilters({ categories: [] });
    } else {
      setActiveCategory(category);
      updateFilters({ categories: [category] });
    }
  };

  const handleTagClick = (tag: string) => {
    const currentTags = filters.tags || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    updateFilters({ tags: updatedTags });
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-3">Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore my portfolio of work across various domains, from
          architectural design to digital innovation and academic research.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Filters</h3>
              {filters.categories?.length ||
              filters.tags?.length ||
              filters.years?.length ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 px-2"
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              ) : null}
            </div>

            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select
                value={sortOption}
                onValueChange={(value) => changeSortOption(value as any)}
              >
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={
                      filters.tags?.includes(tag) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="space-y-2">
              <Label>Years</Label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.years.map((year) => (
                  <Badge
                    key={year}
                    variant={
                      filters.years?.includes(year) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => {
                      const currentYears = filters.years || [];
                      const updatedYears = currentYears.includes(year)
                        ? currentYears.filter((y) => y !== year)
                        : [...currentYears, year];

                      updateFilters({ years: updatedYears });
                    }}
                  >
                    {year}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="flex-1">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query.
              </p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
