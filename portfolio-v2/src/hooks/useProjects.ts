import { useEffect, useMemo, useState } from "react";
import projectsData from "../data/projects.json";
import type {
  Project,
  ProjectFilterOptions,
  ProjectSortOption,
} from "../types/project";

interface UseProjectsOptions {
  initialSortOption?: ProjectSortOption;
  initialFilters?: Partial<ProjectFilterOptions>;
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const { initialSortOption = "newest", initialFilters = {} } = options;

  // Load projects from JSON
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Filter and sort options
  const [sortOption, setSortOption] =
    useState<ProjectSortOption>(initialSortOption);
  const [filters, setFilters] =
    useState<Partial<ProjectFilterOptions>>(initialFilters);

  // Load projects from JSON
  useEffect(() => {
    try {
      // In a real app, this might be an API call
      setProjects(projectsData as Project[]);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  // Extract all possible filter options from projects
  const filterOptions = useMemo(() => {
    if (!projects.length) return { categories: [], tags: [], years: [] };

    const categories = Array.from(new Set(projects.map((p) => p.category)));
    const tags = Array.from(new Set(projects.flatMap((p) => p.tags)));
    const years = Array.from(new Set(projects.map((p) => p.year))).sort(
      (a, b) => b - a,
    );

    return { categories, tags, years };
  }, [projects]);

  // Apply filters
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];

    return projects.filter((project) => {
      // Filter by category
      if (
        filters.categories?.length &&
        !filters.categories.includes(project.category)
      ) {
        return false;
      }

      // Filter by tags (at least one tag should match)
      if (
        filters.tags?.length &&
        !project.tags.some((tag) => filters.tags?.includes(tag))
      ) {
        return false;
      }

      // Filter by year
      if (filters.years?.length && !filters.years.includes(project.year)) {
        return false;
      }

      return true;
    });
  }, [projects, filters]);

  // Apply sorting
  const sortedProjects = useMemo(() => {
    if (!filteredProjects.length) return [];

    return [...filteredProjects].sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return b.year - a.year;
        case "oldest":
          return a.year - b.year;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filteredProjects, sortOption]);

  // Get a single project by slug
  const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find((p) => p.slug === slug);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<ProjectFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({});
  };

  // Change sort option
  const changeSortOption = (option: ProjectSortOption) => {
    setSortOption(option);
  };

  return {
    projects: sortedProjects,
    allProjects: projects,
    loading,
    error,
    filters,
    filterOptions,
    sortOption,
    updateFilters,
    resetFilters,
    changeSortOption,
    getProjectBySlug,
  };
};

export default useProjects;
