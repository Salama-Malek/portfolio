import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./components/ToastProvider";
import Loading from "./components/Loading";
import "aos/dist/aos.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<Home />} />
                <Route path="projects" element={<Home />} />
                <Route path="contact" element={<Home />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
