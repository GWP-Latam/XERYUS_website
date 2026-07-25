import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import InstitutionalShowcase from '@/components/home/InstitutionalShowcase';
import Challenges from '@/components/home/Challenges';
import Differentiators from '@/components/home/Differentiators';
import HowWeWork from '@/components/home/HowWeWork';
import SuccessCases from '@/components/home/SuccessCases';
import Testimonials from '@/components/home/Testimonials';
import Resources from '@/components/home/Resources';
import FinalCTA from '@/components/home/FinalCTA';
import Nosotros from '@/components/pages/Nosotros';
import Soluciones from '@/components/pages/Soluciones';
import Factibilidad from '@/components/pages/Factibilidad';
import Herramientas from '@/components/pages/Herramientas';
import ToolDetail from '@/components/pages/ToolDetail';
import Blog from '@/components/pages/Blog';
import Casos from '@/components/pages/Casos';
import Contacto from '@/components/pages/Contacto';

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [pageData, setPageData] = useState<{ toolId?: string }>({});

  const handleNavigate = (newPage: string, data?: Record<string, unknown>) => {
    setPage(newPage);
    setPageData(data || {});
    window.location.hash = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setPage(hash || 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'nosotros': return <Nosotros onNavigate={handleNavigate} />;
      case 'soluciones': return <Soluciones onNavigate={handleNavigate} />;
      case 'factibilidad': return <Factibilidad onNavigate={handleNavigate} />;
      case 'herramientas': return <Herramientas onNavigate={handleNavigate} />;
      case 'tool-detail': return <ToolDetail onNavigate={handleNavigate} toolId={pageData.toolId} />;
      case 'blog': return <Blog onNavigate={handleNavigate} />;
      case 'casos': return <Casos onNavigate={handleNavigate} />;
      case 'contacto': return <Contacto />;
      default: return (
        <>
          <Hero onNavigate={handleNavigate} />
          <TrustBar />
          <InstitutionalShowcase />
          <Challenges />
          <Differentiators />
          <HowWeWork />
          <SuccessCases />
          <Testimonials />
          <Resources />
          <FinalCTA onNavigate={handleNavigate} />
        </>
      );
    }
  };

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <div className="min-h-screen">
        <Navbar currentPage={page} onNavigate={handleNavigate} />
        {renderPage()}
        <Footer onNavigate={handleNavigate} />
      </div>
    </ThemeProvider>
  );
}

export default App;
