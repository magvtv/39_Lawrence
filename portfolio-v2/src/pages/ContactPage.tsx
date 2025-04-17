import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import type React from "react";
import ContactForm from "../components/contact/ContactForm";
import LinkedInBadge from "../components/linkedin/LinkedInBadge";
import { useLinkedInProfile } from "../hooks/useLinkedInProfile";

const ContactPage: React.FC = () => {
  const { profile } = useLinkedInProfile();

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

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/",
      icon: <LinkedInIcon className="h-5 w-5" />,
      color: "text-[#0077B5] hover:bg-[#0077B5]/10",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: <GithubIcon className="h-5 w-5" />,
      color: "text-[#181717] hover:bg-[#181717]/10",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/",
      icon: <TwitterIcon className="h-5 w-5" />,
      color: "text-[#1DA1F2] hover:bg-[#1DA1F2]/10",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/",
      icon: <InstagramIcon className="h-5 w-5" />,
      color: "text-[#E4405F] hover:bg-[#E4405F]/10",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Get In Touch</h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a project in mind or interested in working together? I'd love to
          hear from you. Fill out the form below or reach out directly through
          any of my contact channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Information */}
        <motion.div variants={itemVariants} className="md:col-span-1 space-y-8">
          {/* Profile section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={profile?.image || "/assets/profile.jpg"}
                alt={profile?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-xl">
                {profile?.name || "Dr. Jane Smith"}
              </h2>
              <p className="text-muted-foreground">
                {profile?.headline ||
                  "Professor of Architecture & Digital Design"}
              </p>
              <LinkedInBadge className="mt-2" />
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Details</h3>

            <div className="flex items-start space-x-3">
              <MailIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:contact@example.com"
                  className="text-primary hover:underline"
                >
                  contact@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <PhoneIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+12345678901" className="hover:underline">
                  +1 (234) 567-8901
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPinIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Location</p>
                <p>Boston, MA, United States</p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect</h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="sm"
                  asChild
                  className={`${social.color}`}
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    {social.icon}
                    <span className="ml-2">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Office hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Office Hours</h3>
            <div className="bg-muted rounded-lg p-4">
              <p className="mb-2 font-medium">Boston University</p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Monday - Wednesday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Thursday</span>
                  <span>9:00 AM - 12:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>By appointment</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <ContactForm endpoint="https://formspree.io/f/your-form-id" />

          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-lg overflow-hidden h-[300px] border"
          >
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47120.58554872459!2d-71.18068213421867!3d42.35051264165708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2sBoston%20University!5e0!3m2!1sen!2sus!4v1679933490304!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
