import { useState, useEffect } from 'react';
import '../../components/css/Certificates.css';
import cert1 from '../../assets/certificate1.png';
import cert2 from '../../assets/certificate2.png';
import cert3 from '../../assets/certificate3.png';
import cert4 from '../../assets/certificate4.png';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const certificatesList = [
    {
      id: 1,
      title: 'Computer Hardware Basics',
      issuer: 'Cisco Networking Academy',
      image: cert1,
      description: 'In this certification I have learned how to work on hardware like identifying components, assembling PCs, and troubleshooting common hardware issues. This foundation is essential for understanding the physical layer of IT systems.',
      skills: 'PC Assembly, Hardware Troubleshooting, Device Maintenance'
    },
    {
      id: 2,
      title: 'Technical Support Fundamentals',
      issuer: 'Google Career Certificates',
      image: cert2,
      description: 'I gained a comprehensive understanding of the troubleshooting process, customer service, networking, operating systems, system administration, and security – all the essential skills for a tech support role.',
      skills: 'IT Support, Troubleshooting, Linux, Windows, Networking'
    },
    {
      id: 3,
      title: 'Foundations of Project Management',
      issuer: 'Coursera',
      image: cert3,
      description: 'Learned the foundational concepts of project management, including project phases, project manager roles, and methodologies like Agile and Waterfall to ensure successful project delivery.',
      skills: 'Project Planning, Agile Methodologies, Documentation'
    },
    {
      id: 4,
      title: 'HTML Essentials',
      issuer: 'Sololearn',
      image: cert4,
      description: 'Mastered the core building blocks of the web. This certification covered semantic HTML5, accessible markup, and the best practices for structuring content for search engines and assistive technologies.',
      skills: 'HTML5, Semantic Web, Web Accessibility'
    },
  ];

  const closeModal = () => setSelectedCert(null);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('cert-modal-overlay')) {
      closeModal();
    }
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="container">
        <h2 className="section-title reveal">Certificates <span>&</span> Achievements</h2>
        
        <div className="certificates-grid">
          {certificatesList.map((cert) => (
            <div key={cert.id} className="certificate-card reveal">
              <div className="certificate-image">
                <img src={cert.image} alt={cert.title} />
              </div>
              <div className="certificate-content">
                <span className="certificate-issuer">{cert.issuer}</span>
                <h3 className="certificate-title">{cert.title}</h3>
                <button 
                  className="view-cert-btn" 
                  onClick={() => setSelectedCert(cert)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      {selectedCert && (
        <div className="cert-modal-overlay" onClick={handleBackdropClick}>
          <div className="cert-modal-content reveal-modal">
            <button className="cert-modal-close" onClick={closeModal} aria-label="Close modal">
              &times;
            </button>
            <div className="cert-modal-body">
              <div className="cert-modal-image">
                <img src={selectedCert.image} alt={selectedCert.title} />
              </div>
              <div className="cert-modal-info">
                <h2 className="cert-modal-heading">My <span>learning</span></h2>
                <p className="cert-modal-description">{selectedCert.description}</p>
                <div className="cert-modal-skills">
                  <strong>Skills:</strong> <span>{selectedCert.skills}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
