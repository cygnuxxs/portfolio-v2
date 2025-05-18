import React from "react";
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

const Project: React.FC<{ project: IProject }> = ({ project }) => {
  const { title, description, image, techstack, github, preview } = project;

  return (
    <DotsBackground>
      <article
        tabIndex={0} // Enable focus to simulate hover on mobile
        className="group relative min-h-[500px] focus:scale-[102%] hover:scale-[102%] active:scale-[102%] flex flex-col gap-4 rounded-xl border dark:border-none dark:bg-muted/50 shadow-sm p-3 transition hover:shadow-md focus:shadow-md active:shadow-md h-full"
      >
        <div className="rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={800}
            height={450}
            className="w-full h-auto object-cover transition-all brightness-50 duration-300 group-hover:brightness-100 group-focus:brightness-100 group-active:brightness-100 group-hover:scale-110 group-focus:scale-110"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm flex-grow backdrop-blur-[1px] text-muted-foreground">
            {description}
          </p>

          <ul className="flex flex-wrap gap-2 mt-2">
            {techstack.map((tech, idx) => (
              <li key={idx}>
                <Badge
                  variant="secondary"
                  className="text-xs hover:drop-shadow-primary/50 focus:drop-shadow-primary/50 group-focus-within:drop-shadow-primary/50 rounded-full px-2"
                >
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 mt-auto self-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent className="font-medium text-foreground">
                View on Github
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent className="font-medium text-foreground">
                View Website
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </article>
    </DotsBackground>
  );
};

export default Project;
