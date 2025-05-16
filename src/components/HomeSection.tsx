import React from "react";
import DotsBackground from "./DotsBackground";

const HomeSection = () => {
  return (
      <DotsBackground className="w-full">
        <section id="home" className="flex snap-start flex-col h-screen items-center justify-center">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-6xl text-center font-black max-sm:text-4xl">
              Crafting as a Full Stack Developer
            </h1>
            <p className=" *:text-primary backdrop-blur-[1px] dark:bg-foreground/5 p-2 *:font-bold text-foreground/80 rounded-xl text-center text-xl max-sm:text-base">
              Passionate Full Stack Developer | Specializing in{" "}
              <span className="font-medium">Next.js</span> & the{" "}
              <span className="font-medium">MERN</span> Stack | Exploring the
              Power of FastAPI for{" "}
              <span className="font-medium">High-Performance Applications</span>{" "}
              | Continuously Exploring Cutting-Edge Technologies.
            </p>
          </div>
        </section>
      </DotsBackground>
  );
};

export default HomeSection;
