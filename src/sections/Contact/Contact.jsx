import { useState } from 'react';
import '../../components/css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.message) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data submitted:', formData);
      setSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title reveal">Get in <span>Touch</span></h2>
        <div className="contact-container">
          <div className="contact-info reveal">
            <h3>Let's collaborate!</h3>
            <p>
              Whether you have a question, a project idea, or just want to say hi, feel free to reach out. I'm always open to new opportunities.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
              <a href="mailto:vitor@developer.com" className="social-icon">Email</a>
            </div>
          </div>

          <div className="contact-form-wrapper reveal">
            {submitted ? (
              <div className="success-message">
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="primary-btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
