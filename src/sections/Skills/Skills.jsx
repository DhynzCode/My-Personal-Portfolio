import '../../components/css/Skills.css';

const Skills = () => {
  const categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'Firebase', level: 70 },
        { name: 'MongoDB', level: 65 },
        { name: 'Express', level: 70 },
      ],
    },
    {
      title: 'Tools & Other',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 50 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 60 },
      ],
    },
  ];

  return (
    <section id="skills" className="section color-bg">
      <div className="container">
        <h2 className="section-title reveal">My <span>Skills</span></h2>
        <div className="skills-grid">
          {categories.map((category, idx) => (
            <div key={idx} className="skill-card reveal">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ '--width': `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
