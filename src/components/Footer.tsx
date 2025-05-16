'use client'
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

const Footer : React.FC<{resumeLink : string}> = ({resumeLink}) => {
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative gap-y-8 overflow-hidden flex flex-col justify-center items-center py-[5rem]">
      {/* Background text animation on scroll */}
      <motion.h1
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="text-[18vw] -z-10 self-start absolute -bottom-[11vw] max-sm:text-[24vw] bg-gradient-to-t from-foreground/5 to-primary/5 text-transparent bg-clip-text tracking-wide font-black"
      >
        Cygnuxxs
      </motion.h1>

      {/* Name */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ amount: 0.5 }}
        className="font-bold text-2xl max-sm:text-xl text-center"
      >
        Ashok Atragadda | Full Stack Developer
      </motion.p>

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        viewport={{ amount: 0.5 }}
        className="font-dancing-script text-xl max-sm:text-base max-sm:font-normal text-center font-bold"
      >
        &quot; Talent is the Skill to prove One&apos;s Own Ability. &quot;
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        viewport={{ amount: 0.5 }}
        className="flex flex-wrap gap-2"
      >
        <motion.div whileHover={!reduceMotion ? { scale: 1.05 } : {}}>
          <Button variant={"outline"} asChild className="text-xs">
            <Link target="_blank" href={resumeLink}>
              <Download />
              Get my Resume
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        viewport={{ amount: 0.5 }}
        className="flex absolute bottom-4 justify-self-end text-xs"
      >
        © {currentYear} All Copyrights reserved.
      </motion.p>
    </div>
  );
};

export default Footer;
