import { useEffect } from 'react';

const ScrollReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once it's revealed, we can stop observing it
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });

    return () => {
      reveals.forEach(reveal => {
        revealObserver.unobserve(reveal);
      });
    };
  }, []);

  return null; // This component just handles side effects
};

export default ScrollReveal;
