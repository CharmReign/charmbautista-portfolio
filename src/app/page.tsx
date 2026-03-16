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
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <>
      <Navbar />
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
      <ThemeToggle />
    </>
  )
}
