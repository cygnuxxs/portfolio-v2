import React from 'react'
import Image from 'next/image'
import { ContainerTextFlip } from './ui/container-text-flip'

const AboutMe = () => {
  return (
    <section id="about-me" className="flex snap-center min-h-screen py-14 max-w-4xl flex-col md:flex-row items-center justify-between max-sm:justify-center gap-8 max-sm:gap-2">
        <Image
          src="/hero1.jpg"
          alt="Ashok Atragadda"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover rounded-full max-sm:p-4"
          priority
        />

        <div className="space-y-4 max-md:px-4 text-center md:text-left">
          <h1 className="text-4xl max-sm:text-3xl font-bold tracking-tight">
            Ashok Atragadda
          </h1>
          <p className="text-base font-medium text-primary/80">
            Full Stack Developer
          </p>
          <p className="max-sm:text-sm">
            I thrive on solving real-world problems, ensuring great user
            experiences, and collaborating in agile teams. Let&apos;s connect
            and innovate together!
          </p>
          <ContainerTextFlip
            words={[
              'Innovative', 'Reliable', 'Adaptable', 'Collaborative', 'Proactive']}
          />
          <p className="text-xl pt-8 font-bold font-dancing-script">
            &quot; Talent is the skill to prove one&apos;s own ability. &quot;
          </p>
        </div>
      </section>
  )
}

export default AboutMe