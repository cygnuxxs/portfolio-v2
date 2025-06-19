"use client";

import React from "react";
import { motion } from "motion/react";

import NextSvg from "@/components/icons/nextjs.svg";
import ReactSvg from "@/components/icons/react.svg";
import TypescriptSvg from "@/components/icons/typescript.svg";
import PythonSvg from "@/components/icons/python.svg";
import FastApiSvg from "@/components/icons/fastapi.svg";
import FlaskSvg from "@/components/icons/flaskapi.svg";
import ExpressSvg from "@/components/icons/express.svg";
import TailwindSvg from "@/components/icons/tailwind.svg";
import PostgresSvg from "@/components/icons/postgres.svg";
import MongoSvg from "@/components/icons/mongodb.svg";
import NodeSvg from "@/components/icons/node.svg";
import { GridPattern } from "./magicui/grid-pattern";

const skills = [
  { name: "Nextjs", image: NextSvg },
  { name: "Reactjs", image: ReactSvg },
  { name: "Expressjs", image: ExpressSvg },
  { name: "Typescript", image: TypescriptSvg },
  { name: "Python", image: PythonSvg },
  { name: "FastAPI", image: FastApiSvg },
  { name: "Flask API", image: FlaskSvg },
  { name: "TailwindCSS", image: TailwindSvg },
  { name: "MongoDB", image: MongoSvg },
  { name: "PostgreSQL", image: PostgresSvg },
  { name: "Nodejs", image: NodeSvg },
];

// Animation variant for individual skill cards
const skillCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const SkillsSection = () => {
  return (
    <section
      className="min-h-[calc(100vh-7rem)] @container overflow-hidden relative space-y-4 items-center py-12 snap-start w-full flex flex-col justify-center"
      id="skills"
    >
      <GridPattern strokeDasharray="1 2" className="fill-primary/30 -z-10 stroke-primary/80 [mask-image:radial-gradient(90vw_circle_at_center,var(--muted),transparent)] sm:[mask-image:radial-gradient(90vh_circle_at_center,var(--muted),transparent)] md:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)] lg:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)]" />
      
      <motion.h1
        className="text-4xl text-center font-black max-sm:text-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h1>

      <motion.p
        className="font-medium backdrop-blur-[1px] dark:bg-foreground/5 px-2 rounded-md text-base max-sm:text-sm text-foreground/70 text-center max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Showcasing My Expertise And Technical Proficiencies
      </motion.p>

      <motion.div
        className="max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap gap-3 pt-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="flex flex-1 group hover:bg-primary/20 transition-colors duration-300 gap-x-4 bg-foreground/5 backdrop-blur-[2px] min-w-[10rem] justify-center items-center p-4 rounded-md"
              custom={idx}
              variants={skillCardVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <skill.image className="w-8 group-hover:rotate-[360deg] h-8 text-foreground transition-all ease-in-out duration-500" />
              <span className="font-semibold text-sm text-accent-foreground text-nowrap transition-transform duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
