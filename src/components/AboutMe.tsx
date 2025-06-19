'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ContainerTextFlip } from './ui/container-text-flip'

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  } 

  return (
    <motion.section 
      id="about-me" 
      className="flex snap-center min-h-screen py-14 max-w-4xl flex-col md:flex-row items-center justify-between max-sm:justify-center gap-8 max-sm:gap-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
        <Image
          src="/hero1.jpg"
          alt="Ashok Atragadda"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover rounded-full max-sm:p-4"
          priority
        />

      <motion.div 
        className="space-y-4 max-md:px-4 text-center md:text-left"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl max-sm:text-3xl font-bold tracking-tight"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          Ashok Atragadda
        </motion.h1>
        
        <motion.p 
          className="text-base font-medium text-primary/80"
          variants={itemVariants}
        >
          Full Stack Developer
        </motion.p>
        
        <motion.p 
          className="max-sm:text-sm"
          variants={itemVariants}
        >
          I thrive on solving real-world problems, ensuring great user
          experiences, and collaborating in agile teams. Let&apos;s connect
          and innovate together!
        </motion.p>
        
        <motion.div
          variants={itemVariants}
        >
          <ContainerTextFlip
            words={[
              'Innovative', 'Reliable', 'Adaptable', 'Collaborative', 'Proactive']}
          />
        </motion.div>
        
        <motion.p 
          className="text-xl pt-8 font-bold font-dancing-script"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              scale: 0.9
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.2
              }
            }
          }}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px rgba(0,0,0,0.3)",
            transition: { duration: 0.2 }
          }}
        >
          &quot; Talent is the skill to prove one&apos;s own ability. &quot;
        </motion.p>
      </motion.div>
    </motion.section>
  )
}

export default AboutMe