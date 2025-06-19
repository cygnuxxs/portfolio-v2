'use client'
import React from "react";
import { motion } from "framer-motion";
import DotsBackground from "./DotsBackground";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import Github from "@/components/icons/github.svg";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Child animation variants
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Badge animation variants
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
  hover: { scale: 1.1, y: -2 },
};

// Button animation variants
const buttonVariants = {
  hover: { scale: 1.2, rotate: 5 },
  tap: { scale: 0.9 },
};

const Project: React.FC<{ project: IProject }> = ({ project }) => {
  const { title, description, image, techstack, github, preview } = project;

  return (
    <DotsBackground>
      <motion.article
        tabIndex={0}
        className="group relative min-h-[500px] flex flex-col gap-4 rounded-xl border dark:border-none dark:bg-muted/50 shadow-sm p-3 transition hover:shadow-md focus:shadow-md active:shadow-md h-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-md overflow-hidden"
          variants={childVariants}
        >
          <Image
            src={image}
            alt={title}
            width={800}
            height={450}
            className="w-full h-auto object-cover transition-all brightness-50 duration-300 group-hover:brightness-100 group-focus:brightness-100 group-active:brightness-100 group-hover:scale-110 group-focus:scale-110"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-2"
          variants={containerVariants}
        >
          <motion.h2
            className="text-xl font-semibold"
            variants={childVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-sm flex-grow backdrop-blur-[1px] text-muted-foreground"
            variants={childVariants}
          >
            {description}
          </motion.p>

          <motion.ul
            className="flex flex-wrap gap-2 mt-2"
            variants={containerVariants}
          >
            {techstack.map((tech, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                variants={badgeVariants}
                whileHover="hover"
              >
                <Badge
                  variant="secondary"
                  className="text-xs hover:drop-shadow-primary/50 focus:drop-shadow-primary/50 group-focus-within:drop-shadow-primary/50 rounded-full px-2"
                >
                  {tech}
                </Badge>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="flex gap-2 mt-auto self-end"
          variants={childVariants}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    aria-label="GitHub Link"
                  >
                    <Link href={github} target="_blank">
                      <Github className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="font-medium text-foreground">
                View on Github
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    aria-label="Live Preview"
                  >
                    <Link href={preview} target="_blank">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="font-medium text-foreground">
                View Website
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </motion.article>
    </DotsBackground>
  );
};

export default Project;