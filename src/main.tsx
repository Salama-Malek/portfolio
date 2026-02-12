import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { contentMap } from './content/contentMap';
import { validateContentModel } from './content/validateContent';

validateContentModel(contentMap);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
