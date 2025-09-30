import React from 'react';
import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    const { t, children } = this.props;
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h2>{t('errorBoundary.title')}</h2>
                <p>{t('errorBoundary.description')}</p>
                <button
                  type="button"
                  className="px-btn"
                  onClick={() => window.location.reload()}
                  aria-label={t('errorBoundary.action')}
                >
                  {t('errorBoundary.action')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default withTranslation()(ErrorBoundary);
