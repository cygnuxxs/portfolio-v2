'use client'
import { cn } from '@/lib/utils'
import {motion} from 'motion/react'
import React from 'react'

const SectionText = ({text, className} : {text : string, className? : string}) => {
  return (
    <motion.h1
        aria-hidden="true"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className={cn("text-[18vw] text-nowrap -z-10 absolute -bottom-[11vw] max-sm:text-[24vw] bg-gradient-to-t from-foreground/5 to-primary/5 text-transparent bg-clip-text tracking-wide font-black", className)}
      >
        {text}
      </motion.h1>
  )
}

export default SectionText