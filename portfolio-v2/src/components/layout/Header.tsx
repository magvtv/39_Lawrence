import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import {
  ClockIcon,
  DownloadIcon,
  FolderIcon,
  HomeIcon,
  LinkedInIcon,
  MailIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLinkedInProfile } from "../../hooks/useLinkedInProfile";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile, isAuthenticated } = useLinkedInProfile();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links configuration
  const navLinks = [
    { name: "Home", href: "/", icon: <HomeIcon className="h-4 w-4 mr-2" /> },
    {
      name: "Projects",
      href: "/projects",
      icon: <FolderIcon className="h-4 w-4 mr-2" />,
    },
    {
      name: "Timeline",
      href: "/timeline",
      icon: <ClockIcon className="h-4 w-4 mr-2" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <MailIcon className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <DownloadIcon className="h-3.5 w-3.5 mr-1" />
            CV
          </Button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {profile && (
                  <Avatar>
                    <AvatarImage src={profile.image} alt={profile.name} />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h3 className="font-semibold">
                    {profile?.name || "Portfolio"}
                  </h3>
                  {isAuthenticated && (
                    <Badge variant="outline" className="mt-1">
                      LinkedIn Verified
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center py-2 px-4 rounded-md transition-colors ${
                      isActive
                        ? "bg-muted text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-8 flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-start">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download CV
              </Button>

              <Button variant="default" className="w-full justify-start">
                <LinkedInIcon className="h-4 w-4 mr-2" />
                Connect on LinkedIn
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
