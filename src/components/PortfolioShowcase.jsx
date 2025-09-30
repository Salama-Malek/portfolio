import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import Ratings from './Ratings';
import TechIcon from '../utils/techIcons';

export default function PortfolioShowcase({ data = {} }) {
  const { t } = useTranslation();
  const { 
    sectionHeading = {}, 
    projects = {}, 
    services = {}, 
    certificates = [], 
    techStack = [] 
  } = data;
  
  const [activeTab, setActiveTab] = useState('projects');
  const [modalData, setModalData] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const tabs = [
    {
      id: 'projects',
      label: t('portfolioShowcase.tabs.projects'),
      icon: 'bi:code-slash',
      count: projects.allProjects?.length || 0
    },
    {
      id: 'services',
      label: t('portfolioShowcase.tabs.services'),
      icon: 'bi:gear',
      count: services.allService?.length || 0
    },
    {
      id: 'certificates',
      label: t('portfolioShowcase.tabs.certificates'),
      icon: 'bi:award',
      count: certificates.length
    },
    {
      id: 'techstack',
      label: t('portfolioShowcase.tabs.techStack'),
      icon: 'bi:stack',
      count: techStack.length
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const renderProjects = () => {
    if (!projects.allProjects || projects.allProjects.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:folder-x" className="empty-icon" />
          <p>{t('portfolioShowcase.emptyStates.projects')}</p>
        </div>
      );
    }

    return (
      <div className="project-grid">
        {projects.allProjects.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            project={project}
            onClick={() => setModalData(project)}
          />
        ))}
      </div>
    );
  };

  const renderServices = () => {
    if (!services.allService || services.allService.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:gear" className="empty-icon" />
          <p>{t('portfolioShowcase.emptyStates.services')}</p>
        </div>
      );
    }

    return (
      <div className="row gy-4">
        {services.allService.map((item, index) => (
          <div className="col-sm-6 col-lg-4" key={index}>
            <div
              className="service-card"
              onClick={() => handleServiceClick(item)}
            >
              <div className="service-media">
                <img src={item.imgUrl} alt={item.title} />
                <div className="service-overlay">
                  <div className="overlay-content">
                    <Icon icon="bi:arrow-right-circle" className="view-icon" />
                    <span>{t('portfolioShowcase.serviceModal.viewDetails')}</span>
                  </div>
                </div>
              </div>
              
              <div className="service-content">
                <div className="service-header">
                  <div className="service-icon">
                    <Icon icon={item.icon} />
                  </div>
                  <div className="service-rating">
                    <Ratings ratings={item.ratings} />
                  </div>
                </div>
                
                <h5 className="service-title">{item.title}</h5>
                <p className="service-description">{item.subTitle}</p>
                
                <div className="service-features">
                  {item.features && item.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <Icon icon="bi:check-circle-fill" className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCertificates = () => {
    if (!certificates || certificates.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:award" className="empty-icon" />
          <p>{t('portfolioShowcase.emptyStates.certificates')}</p>
        </div>
      );
    }

    return (
      <div className="certificates-grid">
        {certificates.map((cert, index) => (
          <div key={index} className="certificate-card">
            <div className="certificate-image">
              <img src={cert.image} alt={cert.title} />
              <div className="certificate-overlay">
                <Icon icon="bi:eye" className="view-icon" />
              </div>
            </div>
            <div className="certificate-content">
              <h5 className="certificate-title">{cert.title}</h5>
              <p className="certificate-issuer">{cert.issuer}</p>
              <p className="certificate-date">{cert.date}</p>
              {cert.credentialId && (
                <p className="certificate-id">ID: {cert.credentialId}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTechStack = () => {
    if (!techStack || techStack.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:stack" className="empty-icon" />
          <p>{t('portfolioShowcase.emptyStates.techStack')}</p>
        </div>
      );
    }

    return (
      <div className="tech-stack-grid">
        {techStack.map((tech, index) => (
          <div key={index} className="tech-item">
            <div className="tech-icon">
              <TechIcon technology={tech.name} />
            </div>
            <div className="tech-content">
              <h6 className="tech-name">{tech.name}</h6>
              <div className="tech-level">
                <div className="tech-progress">
                  <div 
                    className="tech-progress-bar" 
                    style={{ width: `${tech.level || 80}%` }}
                  ></div>
                </div>
                <span className="tech-percentage">{tech.level || 80}%</span>
              </div>
              <p className="tech-description">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return renderProjects();
      case 'services':
        return renderServices();
      case 'certificates':
        return renderCertificates();
      case 'techstack':
        return renderTechStack();
      default:
        return renderProjects();
    }
  };

  return (
    <>
      <section className="portfolio-showcase-section section" id="portfolio-showcase">
        <div className="container">
          <SectionHeading {...sectionHeading} />
          
          {/* Tab Navigation */}
          <div className="showcase-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon icon={tab.icon} className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {modalData && (
        <ProjectModal project={modalData} onClose={() => setModalData(null)} />
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={closeModal}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedService.title}</h3>
              <button className="close-btn" onClick={closeModal}>
                <Icon icon="bi:x-lg" />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedService.imgUrl} alt={selectedService.title} />
              </div>
              
              <div className="modal-content">
                <div className="service-info">
                  <div className="info-item">
                    <Icon icon="bi:code-slash" />
                    <span><strong>{t('portfolioShowcase.serviceModal.category')}:</strong> {selectedService.category || t('portfolioShowcase.serviceModal.defaultCategory')}</span>
                  </div>
                  <div className="info-item">
                    <Icon icon="bi:star-fill" />
                    <span><strong>{t('portfolioShowcase.serviceModal.rating')}:</strong> {t('portfolioShowcase.serviceModal.ratingValue', { rating: selectedService.ratings ?? 0 })}</span>
                  </div>
                  <div className="info-item">
                    <Icon icon="bi:clock" />
                    <span><strong>{t('portfolioShowcase.serviceModal.delivery')}:</strong> {selectedService.deliveryTime || t('portfolioShowcase.serviceModal.defaultDelivery')}</span>
                  </div>
                </div>
                
                <div className="service-description-full">
                  <h5>{t('portfolioShowcase.serviceModal.serviceDescription')}</h5>
                  <p>{selectedService.subTitle}</p>
                </div>
                
                {selectedService.features && (
                  <div className="service-features-full">
                    <h5>{t('portfolioShowcase.serviceModal.keyFeatures')}</h5>
                    <div className="features-grid">
                      {selectedService.features.map((feature, idx) => (
                        <div key={idx} className="feature-item-full">
                          <Icon icon="bi:check-circle-fill" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="service-cta">
                  <button className="cta-primary">
                    <Icon icon="bi:chat-dots" />
                    <span>{t('portfolioShowcase.serviceModal.startProject')}</span>
                  </button>
                  <button className="cta-secondary">
                    <Icon icon="bi:download" />
                    <span>{t('portfolioShowcase.serviceModal.downloadPortfolio')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
