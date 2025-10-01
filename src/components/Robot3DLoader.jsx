import React, { useState, useEffect, useMemo } from 'react';
import { getCssVariableValue } from '../utils/themeTokens';
import { useThemeContext } from '../ThemeProvider';

const Robot3DLoader = ({ onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoad && onLoad();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoad]);

  if (!isLoading) return null;

  const { theme } = useThemeContext();
  const overlayColor = useMemo(
    () => getCssVariableValue('--loader-overlay', 'rgba(0, 0, 0, 0.8)'),
    [theme]
  );
  const spinnerTrack = useMemo(
    () => getCssVariableValue('--loader-spinner-track', 'rgba(59, 130, 246, 0.3)'),
    [theme]
  );
  const spinnerBorder = useMemo(
    () => getCssVariableValue('--loader-spinner-border', '#3b82f6'),
    [theme]
  );
  const textColor = useMemo(
    () => getCssVariableValue('--text-primary', '#ffffff'),
    [theme]
  );

  return (
    <div
      className="robot-loader"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: overlayColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        borderRadius: '20px',
        color: textColor,
        fontFamily: 'Space Grotesk, sans-serif'
      }}
    >
      <div
        className="loader-spinner"
        style={{
          width: '60px',
          height: '60px',
          border: `4px solid ${spinnerTrack}`,
          borderTop: `4px solid ${spinnerBorder}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}
      />
      <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>
        Loading 3D Experience...
      </h4>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
        Preparing interactive robot
      </p>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Robot3DLoader;
