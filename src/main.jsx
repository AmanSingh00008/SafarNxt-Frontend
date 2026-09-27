import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import './styles.css';
import { ScrollProvider } from './providers/ScrollProvider';

const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Loader = () => <div className="route-loader"><span>SAFARNXT</span><i /></div>;
function App() {
  return (
    <BrowserRouter>
      <ScrollProvider>
        <Navbar />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:slug" element={<DestinationDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </ScrollProvider>
    </BrowserRouter>
  );
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
