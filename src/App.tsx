import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ParticleField } from './components/ParticleField';
import { LandingPage } from './pages/LandingPage';
import { AuditPage } from './pages/AuditPage';
import { TransparencyPage } from './pages/TransparencyPage';

type Page = 'landing' | 'audit' | 'transparency';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-deep-space text-white font-sans">
      <ParticleField />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'landing' && (
        <LandingPage onNavigate={(page) => handleNavigate(page)} />
      )}
      {currentPage === 'audit' && <AuditPage />}
      {currentPage === 'transparency' && <TransparencyPage />}
    </div>
  );
}
