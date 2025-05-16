import React from "react";
import Project from "./Project";
import { GridPattern } from "./magicui/grid-pattern";

const projects: IProject[] = [
  {
    title: "Prepflow - DSA Preparation",
    image: "/prepflow.png",
    description:
      "PrepFlow is a comprehensive DSA preparation platform offering structured topic-wise and company-specific coding sheets.",
    techstack: ["Nextjs", "Prisma", "PostgreSQL", "TailwindCSS", "Typescript"],
    github: "https://github.com/cygnuxxs/prepflow",
    preview: "https://prepflow.vercel.app",
  },
  {
    title : 'Audiovibes - Music Downloader',
    image : '/audiovibes.png',
    description : 'AudioVibes is a music downloader built with Next.js that extracts audio streams from YouTube. It allows users to search, stream, and download their favorite tracks seamlessly.',
    techstack : ['Nextjs', 'TailwindCSS', 'Typescript', 'Youtube', 'Nodejs'],
    github : 'https://github.com/cygnuxxs/audiovibesv2',
    preview : 'https://audiovibes.vercel.app',
  },
  {
    title : 'Lyrics Finder',
    image : '/lyrics-finder.png',
    description : 'Lyrics-Finder is a Next.js app that fetches and displays song lyrics using the lyrics.ovh API. Users can search for any song and instantly view accurate, real-time lyrics.',
    techstack : ['Nextjs', 'Nodejs', 'TailwindCSS', 'Typescript'],
    github : 'https://github.com/cygnuxxs/lyrics-finder-v2',
    preview : 'https://lyrics-finder-v2.vercel.app'
  }
];

const Projects = () => {
  return (
    <section
  id="projects"
  className="min-h-[calc(100dvh-5.5rem)] relative flex items-start py-12 justify-center w-full"
>
  <GridPattern strokeDasharray="1 2" className="fill-primary/30 -z-10 stroke-primary/80 [mask-image:radial-gradient(90vw_circle_at_center,var(--muted),transparent)] sm:[mask-image:radial-gradient(90vh_circle_at_center,var(--muted),transparent)] md:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)] lg:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)]" />
  <div className="max-w-4xl w-full space-y-4">
    <h1 className="text-center font-black text-4xl max-sm:text-2xl">Projects</h1>
    <p className="text-base p-1 max-sm:text-sm text-foreground text-center">Showcasing my passion for innovation through creative and impactful projects</p>
    <ul className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 pt-8 pb-4">
      {projects.map((project, idx) => (
        <li key={idx} className="flex h-full">
          <Project project={project} />
        </li>
      ))}
    </ul>
  </div>
</section>
  );
};

export default Projects;
