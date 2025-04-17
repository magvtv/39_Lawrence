import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HomeIcon, SearchIcon } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-16 md:py-24 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="text-9xl font-bold text-primary/20"
      >
        404
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-3xl font-bold mt-6">
        Page Not Found
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-muted-foreground max-w-md"
      >
        The page you are looking for doesn't exist or has been moved. Please
        check the URL or navigate back to the homepage.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link to="/projects" className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4" />
            Browse Projects
          </Link>
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-16 relative max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#gradient)"
            fillOpacity="0.2"
          />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
