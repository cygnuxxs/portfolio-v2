import HomeSection from '@/components/HomeSection'
import SkillsSection from '@/components/SkillsSection'
import AboutMe from '@/components/AboutMe'
import React from 'react'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

const Home = () => {
  return (
    <div className='flex flex-col px-4 max-sm:px-2 w-full items-center snap-y snap-proximity justify-center'>
      <HomeSection />
      <AboutMe />
      <SkillsSection />
      <Projects />
      <Contact />
    </div>
  )
}

export default Home