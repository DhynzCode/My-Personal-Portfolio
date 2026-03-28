import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <a href="#home">Portfolio<span>.</span></a>
        </div>
        
        <p className="copyright">
          &copy; {currentYear} Vitor Developer. All rights reserved.
        </p>

        <div className="footer-links">
           <a href="#home">Home</a>
           <a href="#about">About</a>
           <a href="#projects">Projects</a>
           <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
