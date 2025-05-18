import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  Github,
  InstagramIcon,
  Linkedin,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold">
              Portfolio
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Professional portfolio showcasing projects, experience, and
              expertise in architecture and digital design. Bridging traditional
              architectural principles with emerging technologies.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-primary">
                  Timeline
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <MailIcon className="w-4 h-4 mr-2" />
                <a
                  href="mailto:contact@example.com"
                  className="hover:text-primary"
                >
                  contact@example.com
                </a>
              </li>
              <li>Boston, MA, United States</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
