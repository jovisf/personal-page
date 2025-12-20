import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Timeline } from '@/components/sections/Timeline'
import { Stacks } from '@/components/sections/Stacks'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Stacks />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
