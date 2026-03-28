import profileImg from '../assets/profile.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title reveal">
            Hi, I'm <span>Vitor</span> <br />
            Aspiring Full Stack Developer
          </h1>
          <p className="hero-subtitle reveal">
            I build modern, high-performance web applications with a focus on clean code and exceptional user experience.
          </p>
          <div className="hero-btns reveal">
            <a href="#projects" className="primary-btn">View My Work</a>
            <a href="#contact" className="secondary-btn">Let's Talk</a>
          </div>
        </div>
        <div className="hero-image reveal">
          <div className="image-wrapper">
             <img src={profileImg} alt="Profile" />
             <div className="image-bg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
