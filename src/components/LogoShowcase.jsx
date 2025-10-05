import React from 'react';

const LogoShowcase = () => {
  return (
    <div className="logo-showcase">
      <div className="container">
        <h2 className="section-heading text-center mb-5">
          <h6>Logo Variations</h6>
          <h2>3D Logo System</h2>
        </h2>
        
        <div className="row">
          {/* 3D Coding Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="logo-card">
              <h5>3D Coding Logo</h5>
              <div className="logo logo--3d logo-coding-animated">
                <img src="/images/logo-coding-3d.svg" alt="Salama 3D Coding Logo" />
              </div>
              <p>Full 3D logo with terminal window and coding symbols</p>
            </div>
          </div>
          
          {/* 3D Header Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="logo-card">
              <h5>3D Header Logo</h5>
              <div className="logo logo--3d logo-3d-animated">
                <img src="/images/sm.png" alt="Salama 3D Header Logo" />
              </div>
              <p>Compact 3D logo perfect for header navigation</p>
            </div>
          </div>
          
          {/* 3D Main Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="logo-card">
              <h5>3D Main Logo</h5>
              <div className="logo logo--3d">
                <img src="/images/logo-3d.svg" alt="Salama 3D Logo" />
              </div>
              <p>Main 3D logo with gradient effects and shadows</p>
            </div>
          </div>
          
          {/* Light Mode Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="logo-card">
              <h5>Light Mode Logo</h5>
              <div className="logo logo-light">
                <img src="/images/logo-light.svg" alt="Salama Light Logo" />
              </div>
              <p>Modern gradient logo for light theme</p>
            </div>
          </div>
          
          {/* Dark Mode Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="logo-card">
              <h5>Dark Mode Logo</h5>
              <div className="logo logo-dark">
                <img src="/images/sm.png" alt="Salama Dark Logo" />
              </div>
              <p>3D logo optimized for dark theme</p>
            </div>
          </div>
          
          {/* Modern Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="logo-card">
              <h5>Modern Logo</h5>
              <div className="logo logo-glow">
                <img src="/images/logo-modern.svg" alt="Salama Modern Logo" />
              </div>
              <p>Minimalist modern logo with geometric S</p>
            </div>
          </div>
        </div>
        
        {/* Logo Sizes */}
        <div className="mt-5">
          <h4 className="text-center mb-4">Logo Sizes</h4>
          <div className="row align-items-center">
            <div className="col-md-3 text-center mb-3">
              <div className="logo logo-variant--small">
                <img src="/images/sm.png" alt="Small Logo" />
              </div>
              <p>Small (24px)</p>
            </div>
            <div className="col-md-3 text-center mb-3">
              <div className="logo logo-variant--medium">
                <img src="/images/sm.png" alt="Medium Logo" />
              </div>
              <p>Medium (40px)</p>
            </div>
            <div className="col-md-3 text-center mb-3">
              <div className="logo logo-variant--large">
                <img src="/images/sm.png" alt="Large Logo" />
              </div>
              <p>Large (60px)</p>
            </div>
            <div className="col-md-3 text-center mb-3">
              <div className="logo logo-variant--xl">
                <img src="/images/sm.png" alt="XL Logo" />
              </div>
              <p>XL (80px)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
