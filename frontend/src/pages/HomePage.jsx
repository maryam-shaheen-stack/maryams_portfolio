import Hero from "../components/sections/Hero/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills/Skills";
import Projects from "../components/sections/Projects/Projects";
import Services from "../components/sections/Services";
import Experience from "../components/sections/Experience";
import Research from "../components/sections/Research";
import EducationAchievements from "../components/sections/EducationAchievements";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      <Research />
      <EducationAchievements />
      <Certifications />
      <Contact />
    </>
  );
}
