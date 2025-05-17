import React from "react";
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
import SectionText from "./SectionText";

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

const SkillsSection = () => {
  return (
    <section
      className="min-h-[calc(100vh-7rem)] overflow-hidden relative space-y-4 items-center py-12 snap-start w-full flex flex-col justify-center"
      id="skills"
    >
      <GridPattern strokeDasharray="1 2" className="fill-primary/30 -z-10 stroke-primary/80 [mask-image:radial-gradient(90vw_circle_at_center,var(--muted),transparent)] sm:[mask-image:radial-gradient(90vh_circle_at_center,var(--muted),transparent)] md:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)] lg:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)]" />
      <h1 className="text-4xl text-center font-black max-sm:text-2xl">Skills</h1>
      <SectionText className="bottom-[-13vw]" text="Skills" />
      <p className=" font-medium backdrop-blur-[1px] dark:bg-foreground/5 px-2 rounded-md text-base max-sm:text-sm text-foreground/70 text-center max-w-4xl">
        Showcasing My Expertise And Technical Proficiencies
      </p>
      <div className="max-w-4xl">
        <div className="flex flex-wrap gap-3 pt-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-1 group hover:bg-primary/20 transition-colors duration-300 gap-x-4 bg-foreground/5 backdrop-blur-[2px] min-w-[10rem] justify-center items-center p-4 rounded-md"
            >
              <skill.image className="w-8 h-8 text-foreground group-hover:scale-100 scale-85 transition-all duration-300" />
              <span className=" group-hover:scale-100 scale-90 transition-all duration-300 font-semibold text-sm text-accent-foreground text-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
