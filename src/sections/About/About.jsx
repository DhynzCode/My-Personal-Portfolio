import profileImg from '../../assets/profile.jpg';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section color-bg">
      <div className="container">
        <h2 className="section-title reveal">About <span>Me</span></h2>
        <div className="about-container">
          <div className="about-image reveal">
            <img src={profileImg} alt="About Me" />
          </div>
          <div className="about-content reveal">
            <h3 className="about-subtitle">Who am I?</h3>
            <p className="about-text">
              I'm a passionate Full Stack Developer currently pursuing my degree in Computer Science. I love building web applications that solve real-world problems and provide great user experiences.
            </p>
            <p className="about-text">
              My journey in tech started with a curiosity for how websites work, leading me down the path of mastering modern frameworks like React and Node.js. I'm always eager to learn new technologies and improve my skills in both frontend and backend development.
            </p>
            <div className="about-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">Vitor</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">vitor@developer.com</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">Singapore</span>
              </div>
              <div className="info-item">
                <span className="info-label">Education:</span>
                <span className="info-value">BS Computer Science</span>
              </div>
            </div>
            <a href="/resume.pdf" className="primary-btn">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
