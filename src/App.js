import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './components/ToastProvider';
import AppShell from './components/layout/AppShell';
import PageMetadata from './components/seo/PageMetadata';
import 'aos/dist/aos.css';

const Home = lazy(() => import('./pages/Home'));
const Writing = lazy(() => import('./routes/writing'));
const Projects = lazy(() => import('./routes/projects'));
const Docs = lazy(() => import('./routes/docs'));
const Examples = lazy(() => import('./routes/examples'));
const Blog = lazy(() => import('./routes/blog'));

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<AppShell />}>
                <Route
                  index
                  element={(
                    <PageMetadata titleKey="seo.home.title" descriptionKey="seo.home.description">
                      <Home />
                    </PageMetadata>
                  )}
                />
                <Route
                  path="writing"
                  element={(
                    <PageMetadata titleKey="seo.writing.title" descriptionKey="seo.writing.description">
                      <Writing />
                    </PageMetadata>
                  )}
                />
                <Route
                  path="projects"
                  element={(
                    <PageMetadata titleKey="seo.projects.title" descriptionKey="seo.projects.description">
                      <Projects />
                    </PageMetadata>
                  )}
                />
                <Route
                  path="docs"
                  element={(
                    <PageMetadata titleKey="seo.docs.title" descriptionKey="seo.docs.description">
                      <Docs />
                    </PageMetadata>
                  )}
                />
                <Route
                  path="examples"
                  element={(
                    <PageMetadata titleKey="seo.examples.title" descriptionKey="seo.examples.description">
                      <Examples />
                    </PageMetadata>
                  )}
                />
                <Route
                  path="blog"
                  element={(
                    <PageMetadata titleKey="seo.blog.title" descriptionKey="seo.blog.description">
                      <Blog />
                    </PageMetadata>
                  )}
                />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
