import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";
import LinkedInActivity from "../components/linkedin/LinkedInActivity";
import LinkedInBadge from "../components/linkedin/LinkedInBadge";
import ProjectCard from "../components/projects/ProjectCard";
import { useLinkedInProfile } from "../hooks/useLinkedInProfile";
import { useProjects } from "../hooks/useProjects";

const HomePage: React.FC = () => {
  const { profile } = useLinkedInProfile();
  const { projects } = useProjects({ initialSortOption: "newest" });

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
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          {/* Hero Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-2">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={itemVariants}
              >
                <span className="block">Founder,</span>
                <span className="block">Lecturer</span>
                <span className="block">All In One</span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground max-w-md"
                variants={itemVariants}
              >
                Better product always beats a good idea
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button asChild size="lg" className="gap-1">
                <Link to="/projects">
                  View Projects <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-1">
                <DownloadIcon className="h-4 w-4 mr-1" /> Download CV
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <LinkedInBadge />
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative mx-auto lg:mx-0 w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-4 border-background shadow-xl"
          >
            <img
              src={profile?.image || "/assets/profile.jpg"}
              alt={profile?.name || "Profile"}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 left-4 text-center bg-black/60 backdrop-blur-sm text-white p-2 rounded-md">
              <h3 className="font-medium">Dr. Jane Smith</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative shapes */}
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl" />
      </section>

      {/* Services/Expertise Section */}
      <section className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Areas of Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specializing in bridging traditional architectural principles with
            emerging digital technologies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Service 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center text-center p-4 rounded-lg border border-muted hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 15v4h16v-4M12 3L4 9h16l-8-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Architecture</h3>
            <p className="text-sm text-muted-foreground">
              Sustainable design practices for modern urban environments
            </p>
          </motion.div>

          {/* Service 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center text-center p-4 rounded-lg border border-muted hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Innovation</h3>
            <p className="text-sm text-muted-foreground">
              Cutting-edge technological integration into design solutions
            </p>
          </motion.div>

          {/* Service 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center text-center p-4 rounded-lg border border-muted hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Teaching next generations of designers and architects
            </p>
          </motion.div>

          {/* Service 4 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center text-center p-4 rounded-lg border border-muted hover:border-primary/50 hover:bg-primary/5"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12l-8-8v5H7v6h6v5l8-8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Research</h3>
            <p className="text-sm text-muted-foreground">
              Forward-thinking research on computational design methods
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              A selection of recent work showcasing design innovation and
              technical expertise.
            </p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/projects">
              View All Projects <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* LinkedIn Activity Section */}
      <section className="py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Professional Activity</h2>
            <p className="text-muted-foreground mb-8">
              My teaching philosophy focuses on practical, hands-on learning,
              interdisciplinary collaboration, and fostering entrepreneurial
              thinking, guiding students to apply theoretical knowledge through
              real-world projects and innovative solutions.
            </p>

            <div className="bg-muted p-6 rounded-lg">
              <blockquote className="italic text-lg mb-4">
                "Hands-On person, takes up to the last details, well organized
                to attain the set objective. Trained me on C++ programing in Mt.
                Kenya University"
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/client.png"
                  alt="Bernard Osenga"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">Bernard Osenga</p>
                  <p className="text-sm text-muted-foreground">
                    Computer Studies Tutor
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96">
            <LinkedInActivity />
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Want To Work Together?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          I'm always interested in new projects and collaborations. If you have
          a project in mind or just want to chat, get in touch!
        </p>
        <Button asChild size="lg">
          <Link to="/contact">
            Engage for Impact <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
