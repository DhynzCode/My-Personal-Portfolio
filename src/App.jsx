import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import ParticleBackground from './components/ParticleBackground';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ParticleBackground />
        <ScrollReveal />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
