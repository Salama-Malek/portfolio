import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
