"use client";

import React from "react";
import { motion } from "motion/react";
import DotsBackground from "./DotsBackground";

const HomeSection = () => {
  const headingWords = "Crafting as a Full Stack Developer".split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  };

  const highlightVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      backgroundSize: "0% 100%",
    },
    visible: { 
      opacity: 1,
      scale: 1,
      backgroundSize: "100% 100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  };

  return (
    <DotsBackground className="w-full">
      <motion.section 
        id="home" 
        className="flex snap-start flex-col h-screen items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div 
          className="max-w-4xl space-y-8"
          animate={floatingAnimation}
        >
          {/* Animated Heading */}
          <motion.h1 
            className="text-6xl text-center font-black max-sm:text-4xl"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d" 
            }}
          >
            {headingWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-4 max-sm:mr-2"
                whileHover={{
                  scale: 1.1,
                  color: "rgb(var(--primary))",
                  textShadow: "0px 0px 20px rgba(var(--primary), 0.8)",
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformOrigin: "center bottom",
                  transformStyle: "preserve-3d" 
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Animated Description */}
          <motion.p 
            className="*:text-primary backdrop-blur-[1px] dark:bg-foreground/5 p-2 *:font-bold text-foreground/80 rounded-xl text-center text-xl max-sm:text-base"
            variants={paragraphVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(var(--primary), 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            Passionate Full Stack Developer | Specializing in{" "}
            <motion.span 
              className="font-medium relative"
              variants={highlightVariants}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgba(var(--primary), 1)",
                transition: { duration: 0.2 }
              }}
              style={{
                background: "linear-gradient(90deg, rgba(var(--primary), 0.2) 0%, rgba(var(--primary), 0.4) 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              Next.js
            </motion.span> & the{" "}
            <motion.span 
              className="font-medium relative"
              variants={highlightVariants}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgba(var(--primary), 1)",
                transition: { duration: 0.2 }
              }}
              style={{
                background: "linear-gradient(90deg, rgba(var(--primary), 0.2) 0%, rgba(var(--primary), 0.4) 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              MERN
            </motion.span> Stack | Exploring the Power of FastAPI for{" "}
            <motion.span 
              className="font-medium relative"
              variants={highlightVariants}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgba(var(--primary), 1)",
                transition: { duration: 0.2 }
              }}
              style={{
                background: "linear-gradient(90deg, rgba(var(--primary), 0.2) 0%, rgba(var(--primary), 0.4) 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              High-Performance Applications
            </motion.span>{" "}
            | Continuously Exploring Cutting-Edge Technologies.
          </motion.p>
        </motion.div>

      </motion.section>
    </DotsBackground>
  );
};

export default HomeSection;