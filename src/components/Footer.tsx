'use client'
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import SectionText from "./SectionText";

const Footer: React.FC<{ resumeLink: string }> = ({ resumeLink }) => {
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative gap-y-8 overflow-hidden flex flex-col justify-center items-center py-[5rem]" aria-label="Site footer">
      {/* Decorative background text */}
      <SectionText text="Cygnuxxs" />

      {/* Identity Section */}
      <section className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ amount: 0.5 }}
          className="font-bold text-2xl max-sm:text-xl"
        >
          Ashok Atragadda | Full Stack Developer
        </motion.p>

        <motion.blockquote
          cite="self"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          viewport={{ amount: 0.5 }}
          className="font-dancing-script text-xl max-sm:text-base max-sm:font-normal font-bold mt-2"
        >
          &quot; Talent is the Skill to prove One&apos;s Own Ability. &quot;
        </motion.blockquote>
      </section>

      {/* Resume Button */}
      <section aria-label="Resume Download" className="mt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          viewport={{ amount: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          <motion.div whileHover={!reduceMotion ? { scale: 1.05 } : {}}>
            <Button variant="outline" asChild className="text-xs" aria-label="Download Resume">
              <Link target="_blank" href={resumeLink} rel="noopener noreferrer">
                <Download className="mr-2" />
                Get my Resume
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Copyright */}
      <motion.p
        role="contentinfo"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        viewport={{ amount: 0.5 }}
        className="absolute bottom-4 text-xs"
      >
        © {currentYear} All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;
