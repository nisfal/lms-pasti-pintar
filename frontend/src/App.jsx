import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WelcomeSection from './components/WelcomeSection';
import QuickAccessGrid from './components/QuickAccessGrid';
import LearningProgressWidget from './components/LearningProgressWidget';
import AccuracyWidget from './components/AccuracyWidget';
import PackageCatalogModal from './components/PackageCatalogModal';
import Footer from './components/Footer';
import { PlayCircle, FileCheck2, Layers, CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [activeModuleModal, setActiveModuleModal] = useState(null);

  const handleSelectModule = (moduleId) => {
    setActiveModuleModal(moduleId);
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Persistent Navigation Bar */}
      <Navbar onOpenCatalog={() => setCatalogOpen(true)} />

      {/* Main Workspace Container */}
      <main className="container" style={{ flex: 1, marginTop: '28px' }}>
        {/* Welcome Section & Quick Home Nav */}
        <WelcomeSection 
          userName="Production Admin" 
          onBackHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        />

        {/* Quick Access (4 Core Navigation Cards) */}
        <QuickAccessGrid 
          onSelectModule={handleSelectModule} 
          onOpenCatalog={() => setCatalogOpen(true)} 
        />

        {/* Primary Dashboard Bento Section: Learning Progress & Accuracy Widgets */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
            alignItems: 'stretch'
          }}>
            {/* Widget 1: Progress Belajar */}
            <LearningProgressWidget onOpenCatalog={() => setCatalogOpen(true)} />

            {/* Widget 2: Akurasi Jawaban */}
            <AccuracyWidget onOpenTryoutList={() => handleSelectModule('tryout')} />
          </div>
        </section>
      </main>

      {/* Package Catalog Modal (Triggered by 'Beli Paket' or 'Lihat Paket') */}
      <PackageCatalogModal 
        isOpen={catalogOpen} 
        onClose={() => setCatalogOpen(false)} 
      />

      {/* Module Detail Info Modal for Video / Tryout / Paket Saya */}
      {activeModuleModal && (
        <div className="modal-backdrop" onClick={() => setActiveModuleModal(null)}>
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#eef2ff',
                  color: '#4f46e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {activeModuleModal === 'video' && <PlayCircle size={22} />}
                  {activeModuleModal === 'tryout' && <FileCheck2 size={22} />}
                  {activeModuleModal === 'paket' && <Layers size={22} />}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                  {activeModuleModal === 'video' && 'Modul Video Materi'}
                  {activeModuleModal === 'tryout' && 'Simulasi CAT Tryout'}
                  {activeModuleModal === 'paket' && 'Manajemen Paket Belajar'}
                </h3>
              </div>

              <button 
                onClick={() => setActiveModuleModal(null)}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
              {activeModuleModal === 'video' && 'Anda memiliki akses ke 35 modul video pembelajaran kurikulum UTBK & Kedinasan. 24 video telah selesai dipelajari.'}
              {activeModuleModal === 'tryout' && 'Simulasi CAT terdekat: Tryout Akbar Nasional Seri 4 akan dibuka serentak dengan sistem pembobotan IRT.'}
              {activeModuleModal === 'paket' && 'Anda saat ini terdaftar pada 2 paket bimbingan aktif dengan masa aktif hingga Juni 2026.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setActiveModuleModal(null)} className="btn-secondary">
                Tutup
              </button>
              <button 
                onClick={() => {
                  setActiveModuleModal(null);
                  setCatalogOpen(true);
                }} 
                className="btn-primary"
              >
                <span>Lihat Semua Paket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive System Footer */}
      <Footer />
    </div>
  );
}
