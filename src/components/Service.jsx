import { Icon } from '@iconify/react';
import React, { useState, useMemo } from 'react';
import SectionHeading from './SectionHeading';
import Ratings from './Ratings';

export default function Service({ data = {} }) {
  const { sectionHeading = {}, allService = [] } = data;
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedService, setSelectedService] = useState(null);
  
  // Get unique categories from services
  const categories = useMemo(() => {
    const cats = [...new Set(allService.map(service => service.category || 'development'))];
    return ['all', ...cats];
  }, [allService]);

  // Filter services based on selected categories
  const filteredServices = useMemo(() => {
    if (selectedCategories.includes('all')) return allService;
    return allService.filter(service => selectedCategories.includes(service.category || 'development'));
  }, [allService, selectedCategories]);
  
  // Don't render if essential data is missing
  if (!data || !sectionHeading || !allService || allService.length === 0) {
    return null;
  }

  const handleCategoryToggle = (category) => {
    if (category === 'all') {
      // If "all" is clicked, reset to show all services
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        // Remove 'all' if it was selected
        const withoutAll = prev.filter(cat => cat !== 'all');
        
        if (prev.includes(category)) {
          // If category is already selected, remove it
          const newSelection = withoutAll.filter(cat => cat !== category);
          // If no categories selected, default to 'all'
          return newSelection.length > 0 ? newSelection : ['all'];
        } else {
          // Add the new category
          return [...withoutAll, category];
        }
      });
    }
  };

  const isCategoryActive = (category) => {
    if (category === 'all') {
      return selectedCategories.includes('all') || selectedCategories.length === 0;
    }
    return selectedCategories.includes(category);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        
        {/* Service Statistics */}
        <div className="service-stats-wrapper text-center mb-5">
          <div className="stats-grid">
            <div className="stat-item" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-icon">
                <Icon icon="bi:code-slash" />
              </div>
              <div className="stat-number">{allService.length}</div>
              <div className="stat-label">Services Offered</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-icon">
                <Icon icon="bi:check-circle" />
              </div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-icon">
                <Icon icon="bi:clock-history" />
              </div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>

        {/* Service Filters */}
        <div className="service-filters-wrapper text-center mb-5">
          <div className="filter-header">
            <div className="filter-subtitle">Choose Your Service Categories</div>
            <div className="filter-underline"></div>
            <div className="filter-instruction">
              Click multiple categories to combine them, or click "All Services" to reset
            </div>
          </div>
          <div className="service-filters">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`filter-btn ${isCategoryActive(category) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Icon 
                  icon={category === 'all' ? 'bi:grid-3x3-gap' : 
                        category === 'development' ? 'bi:code-square' :
                        category === 'design' ? 'bi:palette' :
                        category === 'mobile' ? 'bi:phone' : 'bi:gear'} 
                  className="filter-icon" 
                />
                <span className="filter-text">
                  {category === 'all' ? 'All Services' : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                {isCategoryActive(category) && category !== 'all' && (
                  <Icon icon="bi:check-circle-fill" className="active-indicator" />
                )}
              </button>
            ))}
          </div>
          
          {/* Active Filters Display */}
          {selectedCategories.length > 0 && !selectedCategories.includes('all') && (
            <div className="active-filters-display">
              <span className="active-label">Active filters:</span>
              {selectedCategories.map(category => (
                <span key={category} className="active-filter-tag">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              ))}
              <button 
                className="clear-filters-btn"
                onClick={() => setSelectedCategories(['all'])}
              >
                <Icon icon="bi:x-circle" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="row gy-5">
          {filteredServices.map((item, index) => (
            <div className="col-sm-6 col-lg-4" key={index}>
              <div
                className="service-card"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay={index * 100}
                onClick={() => handleServiceClick(item)}
              >
                <div className="service-media">
                  <img src={item.imgUrl} alt={item.title} />
                  <div className="service-overlay">
                    <div className="overlay-content">
                      <Icon icon="bi:arrow-right-circle" className="view-icon" />
                      <span>View Details</span>
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
                  
                  <div className="service-actions">
                    <button 
                      className="service-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(item);
                      }}
                    >
                      <Icon icon="bi:info-circle" />
                      <span>Details</span>
                    </button>
                    <button className="service-contact-btn">
                      <Icon icon="bi:envelope" />
                      <span>Contact</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Counter */}
        <div className="service-counter-wrapper text-center mt-5">
          <div className="counter-card" data-aos="fade-up">
            <div className="counter-icon">
              <Icon icon="bi:star-fill" />
            </div>
            <div className="counter-content">
              <div className="counter-number">
                {filteredServices.length} of {allService.length}
              </div>
              <div className="counter-label">Services Available</div>
            </div>
          </div>
        </div>
      </div>

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
                    <span><strong>Category:</strong> {selectedService.category || 'Development'}</span>
                  </div>
                  <div className="info-item">
                    <Icon icon="bi:star-fill" />
                    <span><strong>Rating:</strong> {selectedService.ratings}/5</span>
                  </div>
                  <div className="info-item">
                    <Icon icon="bi:clock" />
                    <span><strong>Delivery:</strong> {selectedService.deliveryTime || '2-4 weeks'}</span>
                  </div>
                </div>
                
                <div className="service-description-full">
                  <h5>Service Description</h5>
                  <p>{selectedService.subTitle}</p>
                </div>
                
                {selectedService.features && (
                  <div className="service-features-full">
                    <h5>Key Features</h5>
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
                    <span>Start Project</span>
                  </button>
                  <button className="cta-secondary">
                    <Icon icon="bi:download" />
                    <span>Download Portfolio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
