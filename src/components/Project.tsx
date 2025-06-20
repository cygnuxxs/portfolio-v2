"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DotsBackground from "./DotsBackground";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import Github from "@/components/icons/github.svg";
import { ExternalLink, Star, GitFork } from "lucide-react";

interface IProject {
  title: string;
  description: string;
  image: string;
  techstack: string[];
  github: string;
  preview: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
}

// Enhanced container animation variants
const containerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Enhanced child animation variants
const childVariants = {
  hidden: { opacity: 0, y: 30, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Enhanced badge animation variants
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 150,
    },
  }),
  hover: {
    scale: 1.15,
    y: -3,
    rotate: 2,
    transition: { duration: 0.2 },
  },
};

// Image overlay animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Floating elements animation
const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Project: React.FC<{ project: IProject }> = ({ project }) => {
  const {
    title,
    description,
    image,
    techstack,
    github,
    preview,
    stars,
    forks,
    featured,
  } = project;
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <DotsBackground>
      <motion.article
        tabIndex={0}
        className="group relative overflow-hidden flex flex-col rounded-2xl border-2 border-transparent dark:border-none dark:bg-gradient-to-br dark:from-muted/40 dark:via-muted/20 dark:to-muted/40 bg-gradient-to-br from-background via-background/50 to-background shadow-lg hover:shadow-2xl focus:shadow-2xl transition-all duration-500 p-0 h-full backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{
          y: -8,
          scale: 1.02,
          borderColor: "rgb(var(--primary))",
          boxShadow: "0 25px 50px -12px rgba(var(--primary), 0.25)",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Featured badge */}
        {featured && (
          <motion.div
            className="absolute top-4 left-4 z-20"
            variants={floatingVariants}
            animate="float"
          >
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </motion.div>
        )}

        {/* Image container with enhanced effects */}
        <motion.div
          className="relative rounded-t-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5"
          variants={childVariants}
        >
          <div className="aspect-video relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-focus:scale-110"
              style={{
                filter: isHovered
                  ? "brightness(1) saturate(1.1)"
                  : "brightness(0.7) saturate(0.9)",
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
            )}

            {/* Interactive overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Content section with enhanced spacing */}
        <div className="flex flex-col flex-grow p-6 space-y-4">
          <motion.div
            className="flex flex-col gap-3"
            variants={containerVariants}
          >
            {/* Title with enhanced typography */}
            <motion.div
              className="flex items-start justify-between gap-2"
              variants={childVariants}
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent line-clamp-2">
                {title}
              </h2>
              {(stars || forks) && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  {stars && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{stars}</span>
                    </div>
                  )}
                  {forks && (
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      <span>{forks}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Description with improved typography */}
            <motion.p
              className="text-sm text-muted-foreground leading-relaxed line-clamp-3"
              variants={childVariants}
            >
              {description}
            </motion.p>

            {/* Enhanced tech stack badges */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
            >
              {techstack.slice(0, 6).map((tech, idx) => (
                <motion.div
                  key={tech}
                  custom={idx}
                  variants={badgeVariants}
                  whileHover="hover"
                >
                  <Badge
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 rounded-full px-3 py-1 font-medium transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {techstack.length > 6 && (
                <motion.div
                  variants={badgeVariants}
                  custom={6}
                  whileHover="hover"
                >
                  <Badge
                    variant="secondary"
                    className="text-xs rounded-full px-3 py-1"
                  >
                    +{techstack.length - 6}
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <div className="flex gap-3 mt-auto pt-4">
            <Button
            size={'sm'}
              variant="outline"
              className="flex-1 gap-2 bg-gradient-to-r from-background to-background/50 hover:from-primary/10 hover:to-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300"
              asChild
            >
              <Link href={github} target="_blank">
                <Github className="w-4 h-4" />
                <span className="font-medium">Code</span>
              </Link>
            </Button>
            <Button
            size={'sm'}
              // className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
              className="flex-1 bg-primary/10 border-primary border"
              asChild
              variant={'secondary'}
            >
              <Link href={preview} target="_blank">
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium">Live Demo</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Animated border glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl" />
      </motion.article>
    </DotsBackground>
  );
};

export default Project;