import HomeSection from '@/components/HomeSection'
import SkillsSection from '@/components/SkillsSection'
import AboutMe from '@/components/AboutMe'
import React from 'react'
import { fetchLeetCodeData } from '@/actions/actions'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

const Home = async () => {
  const {stats, totalAvailable, totalQuestions, recentSubmissions} = await fetchLeetCodeData('cygnuxxs')

  return (
    <div className='flex flex-col px-4 max-sm:px-2 w-full items-center snap-y snap-proximity justify-center'>
      <HomeSection />
      <AboutMe stats={stats} recentSubmissions = {recentSubmissions} totalAvailable = {totalAvailable} totalQuestions = {totalQuestions} />
      <SkillsSection />
      <Projects />
      <Contact />
    </div>
  )
}

export default Home