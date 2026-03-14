import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Resume from '@/components/Resume'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'

export default function Home() {
  return (
    <>
      {/* Fixed sidebar — renders independently at z-40 on desktop */}
      <Navbar />

      {/* Page content — offset right of the 256px sidebar on xl screens */}
      {/* z-index must be LOWER than the sidebar (z-40) so links are never blocked */}
      <div className="relative z-[1] xl:ml-64">
        <main>
          <Hero />
          <About />
          <Skills />
          <Resume />
          <Projects />
          <Services />
          {/* <Testimonials /> */}
          <ContactForm />
        </main>
        <Footer />
      </div>

      <ScrollTop />
    </>
  )
}
