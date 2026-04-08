import { useState } from 'react';
import '../../components/css/Skills.css';

const technicalSkills = [
  { name: 'Python', icon: '🐍', level: 85 },
  { name: 'CSS', icon: '🎨', level: 90 },
  { name: 'JavaScript', icon: 'JS', level: 80 },
  { name: 'Fast API', icon: '⚡', level: 75 },
  { name: 'ReactJS', icon: '⚛️', level: 85 },
  { name: 'HTML', icon: '🌐', level: 95 },
  { name: 'Machine Learning', icon: '🤖', level: 70 },
];

const softSkills = [
  { name: 'Communication', level: 90 },
  { name: 'Team Work', level: 85 },
  { name: 'Project Management', level: 80 },
  { name: 'Creativity', level: 75 },
];

const SkillCard = ({ skill, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Progress Ring Logic
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <div 
      className={`skill-card reveal ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        {type === 'tech' ? (
          <>
            <div className="skill-main">
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </div>
            
            <div className={`progress-container ${isHovered ? 'visible' : ''}`}>
              <div className="progress-label">
                <span className="percentage">{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: isHovered ? `${skill.level}%` : '0%' }}
                ></div>
              </div>
            </div>
          </>
        ) : (
          <div className="soft-skill-content">
            <div className={`progress-ring-container ${isHovered ? 'visible' : ''}`}>
              <svg className="progress-ring" width="80" height="80">
                <circle
                  className="progress-ring__background"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="6"
                  fill="transparent"
                  r={radius}
                  cx="40"
                  cy="40"
                />
                <circle
                  className="progress-ring__circle"
                  stroke="var(--accent-primary)"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset: isHovered ? strokeDashoffset : circumference }}
                  strokeLinecap="round"
                  fill="transparent"
                  r={radius}
                  cx="40"
                  cy="40"
                />
              </svg>
              <span className="percentage-ring">{skill.level}%</span>
            </div>
            <span className="skill-name">{skill.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section color-bg">
      <div className="container">
        <div className="skills-categories-grid">
          {/* Technical Skills Category */}
          <div className="skills-category">
            <h2 className="category-header">Technical <span>Skills</span></h2>
            <div className="skills-dashboard-card tech-dashboard">
              <div className="skills-items-grid">
                {technicalSkills.map((skill, idx) => (
                  <SkillCard key={idx} skill={skill} type="tech" />
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills Category */}
          <div className="skills-category">
            <h2 className="category-header">Professional <span>Skills</span></h2>
            <div className="skills-dashboard-card soft-dashboard">
              <div className="skills-items-grid soft-grid">
                {softSkills.map((skill, idx) => (
                  <SkillCard key={idx} skill={skill} type="soft" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
