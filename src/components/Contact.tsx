"use client";

import React from "react";
import { motion } from "framer-motion";
import DotsBackground from "./DotsBackground";
import InstagramIcon from "@/components/icons/instagram.svg";
import GithubIcon from "@/components/icons/github.svg";
import EmailIcon from "@/components/icons/email.svg";
import XIcon from "@/components/icons/x.svg";
import LinkedIcon from "@/components/icons/linkedin.svg";
import Link from "next/link";

type ContactInfo = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
};

const contactInfo: ContactInfo[] = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/cygnuxxs/",
  },
  {
    name: "Email",
    icon: EmailIcon,
    href: "mailto:ashokatragadda26@gmail.com",
  },
  {
    name: "X - Twitter",
    icon: XIcon,
    href: "https://x.com/AshyGany",
  },
  { name: "Github", icon: GithubIcon, href: "https://github.com/cygnuxxs" },
  {
    name: "LinkedIn",
    icon: LinkedIcon,
    href: "https://www.linkedin.com/in/ashok-atragadda/",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: -50,
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut",
    },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8,
    rotateX: -15,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.05,
    y: -8,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.3,
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const textHoverVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Contact = () => {
  return (
    <DotsBackground className="w-full overflow-hidden flex items-center justify-center">
      <motion.section
        id="contact-me"
        className="max-w-4xl min-h-[calc(100vh-7rem)] relative pt-[5.5rem] grid place-content-center space-y-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="p-1 space-y-4 rounded-md"
          variants={headerVariants}
        >
          <motion.h1 
            className="text-4xl max-sm:text-2xl font-black"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0px 0px 8px rgba(var(--primary), 0.8)",
              transition: { duration: 0.3 }
            }}
          >
            Contact Me
          </motion.h1>
          <motion.p 
            className="text-lg max-sm:text-sm backdrop-blur-[1px]"
            variants={textVariants}
          >
            Let&apos;s connect and bring your ideas to life!
          </motion.p>
        </motion.div>

        <motion.ul 
          className="flex w-full gap-4 py-12 flex-wrap justify-center"
          variants={listVariants}
        >
          {contactInfo.map((contact, idx) => (
            <motion.li
              key={idx}
              className="relative hover:bg-primary/20 transition-all duration-300 hover:drop-shadow-primary/40 hover:drop-shadow-2xl min-w-[8rem] backdrop-blur-[1px] bg-foreground/5 rounded-md group flex-1"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px" 
              }}
            >
              <motion.div
                variants={hoverVariants}
                className="w-full h-full"
              >
                <Link
                  target="_blank"
                  href={contact.href}
                  rel="noopener noreferrer"
                  className="relative z-10 flex gap-4 p-4 items-center justify-center rounded-xl w-full h-full"
                  aria-label={`Contact via ${contact.name}`}
                >
                  <motion.div variants={iconVariants}>
                    <contact.icon
                      className="w-5 h-5 transition-all duration-300"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <motion.span 
                    className="text-sm transition-all duration-300 text-nowrap"
                    variants={textHoverVariants}
                  >
                    {contact.name}
                  </motion.span>
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
    </DotsBackground>
  );
};

export default Contact;