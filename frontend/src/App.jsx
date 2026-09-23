import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import WelcomeSection from './components/WelcomeSection';
import QuickAccessGrid from './components/QuickAccessGrid';
import LearningProgressWidget from './components/LearningProgressWidget';
import AccuracyWidget from './components/AccuracyWidget';
import PackageCatalogModal from './components/PackageCatalogModal';
import Footer from './components/Footer';
import { PlayCircle, FileCheck2, Layers, CheckCircle2, X, AlertTriangle, RefreshCw } from 'lucide-react';

export default function App() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [activeModuleModal, setActiveModuleModal] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const userId = 'usr_01';

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Try relative /api first (proxied by Vite), fallback to localhost:5000
      let response;
      try {
        response = await fetch(`/api/dashboard/${userId}`);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      } catch (err) {
        response = await fetch(`http://localhost:5000/api/dashboard/${userId}`);
      }

      if (!response.ok) {
        throw new Error(`Gagal memuat data dari server (${response.status})`);
      }

      const result = await response.json();
      if (result.status === 'success' && result.data) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.message || 'Format data tidak sesuai');
      }
    } catch (err) {
      console.error('Fetch dashboard error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectModule = (moduleId) => {
    setActiveModuleModal(moduleId);
  };

  const handlePurchaseSuccess = (message) => {
    showToast(message || 'Paket berhasil diaktifkan!');
    fetchDashboardData();
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#0f172a',
          color: '#ffffff',
          padding: '14px 20px',
          borderRadius: '14px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'fadeInUp 250ms ease forwards'
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '6px' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Persistent Navigation Bar */}
      <Navbar 
        user={dashboardData?.user}
        onOpenCatalog={() => setCatalogOpen(true)} 
      />

      {/* Main Workspace Container */}
      <main className="container" style={{ flex: 1, marginTop: '28px' }}>
        {/* Error Banner with Retry if backend fails */}
        {error && (
          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertTriangle size={20} color="#e11d48" />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#9f1239' }}>
                  Koneksi API Backend Terganggu
                </div>
                <div style={{ fontSize: '13px', color: '#be123c' }}>
                  {error}. Pastikan backend running pada port 5000.
                </div>
              </div>
            </div>
            <button 
              onClick={fetchDashboardData} 
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} /> Coba Lagi
            </button>
          </div>
        )}

        {/* Welcome Section & Quick Home Nav */}
        <WelcomeSection 
          user={dashboardData?.user}
          activePackage={dashboardData?.activePackage}
          loading={loading}
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
            <LearningProgressWidget 
              progressData={dashboardData?.learningProgress}
              activePackage={dashboardData?.activePackage}
              loading={loading}
              onOpenCatalog={() => setCatalogOpen(true)} 
            />

            {/* Widget 2: Akurasi Jawaban */}
            <AccuracyWidget 
              accuracyData={dashboardData?.accuracy}
              loading={loading}
              onOpenTryoutList={() => handleSelectModule('tryout')} 
            />
          </div>
        </section>
      </main>

      {/* Package Catalog Modal (Triggered by 'Beli Paket' or 'Lihat Paket') */}
      <PackageCatalogModal 
        isOpen={catalogOpen} 
        onClose={() => setCatalogOpen(false)}
        userId={userId}
        onPurchaseSuccess={handlePurchaseSuccess}
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
              {activeModuleModal === 'video' && (
                dashboardData?.learningProgress 
                  ? `Anda memiliki total ${dashboardData.learningProgress.totalVideos} video pembelajaran. ${dashboardData.learningProgress.completedVideos} video telah selesai Anda tonton dengan total waktu belajar ${dashboardData.learningProgress.studyTimeMinutes} menit.`
                  : 'Akses materi video pembahasan TPS & Literasi komprehensif.'
              )}
              {activeModuleModal === 'tryout' && (
                dashboardData?.accuracy
                  ? `Anda telah menyelesaikan ${dashboardData.accuracy.totalTryouts} tryout dengan skor terakhir ${dashboardData.accuracy.latestScore} dan rata-rata akurasi ${dashboardData.accuracy.percentage}%.`
                  : 'Simulasi CAT tryout nasional dengan pembobotan IRT.'
              )}
              {activeModuleModal === 'paket' && (
                dashboardData?.activePackage?.title
                  ? `Paket aktif saat ini: ${dashboardData.activePackage.title} (${dashboardData.activePackage.category}), berlaku sampai ${dashboardData.activePackage.validUntil ? new Date(dashboardData.activePackage.validUntil).toLocaleDateString('id-ID') : '-'}.`
                  : 'Anda belum memiliki paket aktif. Silakan pilih paket dari katalog.'
              )}
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
                <span>Lihat Katalog Paket</span>
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
