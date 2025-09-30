import React from 'react';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <h4 className="mt-3">Loading...</h4>
            <p>Please wait while we prepare your experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
