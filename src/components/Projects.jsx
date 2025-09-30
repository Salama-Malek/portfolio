import React, { useState, useMemo } from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects({ data = {} }) {
  const { sectionHeading = {}, allProjects = [] } = data;
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalData, setModalData] = useState(null);
  
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(allProjects.map((p) => p.category))];
    return cats;
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects;
    return allProjects.filter((p) => p.category === activeFilter);
  }, [allProjects, activeFilter]);
  
  if (!data || !sectionHeading || allProjects.length === 0) {
    return null;
  }

  return (
    <>
      <section className="project-section section" id="project">
        <div className="container">
          <SectionHeading {...sectionHeading} />
          <div className="project-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                {category}
                </button>
              ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                onClick={() => setModalData(project)}
              />
            ))}
          </div>
        </div>
      </section>
      {modalData && (
        <ProjectModal project={modalData} onClose={() => setModalData(null)} />
      )}
    </>
  );
}
