import React from 'react';
import { ArrowLeft, Sparkles, Calendar, ShieldCheck } from 'lucide-react';

export default function WelcomeSection({ userName = "Production Admin", onBackHome }) {
  const todayDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section style={{ marginBottom: '32px' }} className="animate-fade-in">
      {/* Top Bar: Back to Home + Meta Badges */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {/* Button "Kembali ke Home" */}
        <button
          onClick={onBackHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="btn-secondary"
          title="Kembali ke Halaman Utama"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Home</span>
        </button>

        {/* Date & System Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            fontSize: '12px',
            fontWeight: 600,
            color: '#64748b',
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
          }}>
            <Calendar size={13} color="#4f46e5" />
            <span>{todayDate}</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            fontSize: '12px',
            fontWeight: 700,
            color: '#065f46'
          }}>
            <ShieldCheck size={14} color="#059669" />
            <span>LMS Core Live</span>
          </div>
        </div>
      </div>

      {/* Hero Greeting Box */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: '32px 36px',
        boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.04), inset 0 1px 1px #ffffff'
      }}>
        {/* Subtle Background Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px' }}>
          <div className="eyebrow-badge" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} />
            <span>Workspace Pembelajaran Terpadu</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.03em',
            marginBottom: '10px'
          }}>
            Halo, {userName} 👋
          </h1>

          <p style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#475569',
            margin: 0
          }}>
            Pantau seluruh progres pembelajaran video materi, jadwal tryout simulasi CAT, dan analitik akurasi evaluasi belajar Anda secara terintegrasi di sini.
          </p>
        </div>
      </div>
    </section>
  );
}
