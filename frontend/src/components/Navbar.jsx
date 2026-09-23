import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  ChevronDown, 
  Bell, 
  Sparkles, 
  BookOpen, 
  Award, 
  LogOut, 
  User, 
  Settings, 
  Compass, 
  CheckCircle2,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ onOpenCatalog }) {
  const [bimbelOpen, setBimbelOpen] = useState(false);
  const [paketOpen, setPaketOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bimbelRef = useRef(null);
  const paketRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (bimbelRef.current && !bimbelRef.current.contains(event.target)) {
        setBimbelOpen(false);
      }
      if (paketRef.current && !paketRef.current.contains(event.target)) {
        setPaketOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="nav-island">
      <nav className="nav-bar" aria-label="Main Navigation">
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            <GraduationCap size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em', color: '#0f172a' }}>
                PASTI<span style={{ color: '#4f46e5' }}>PINTAR</span>
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                background: '#eef2ff',
                color: '#4f46e5',
                padding: '2px 6px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                LMS
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, margin: 0 }}>
              Digital Learning System
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="desktop-nav-links">
          {/* Dashboard Link (Active Pill) */}
          <a 
            href="#dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              background: '#0f172a',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)'
            }}
          >
            Dashboard
          </a>

          {/* Bimbel Dropdown */}
          <div style={{ position: 'relative' }} ref={bimbelRef}>
            <button
              onClick={() => {
                setBimbelOpen(!bimbelOpen);
                setPaketOpen(false);
                setUserMenuOpen(false);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                background: bimbelOpen ? '#f1f5f9' : 'transparent',
                transition: 'all 200ms ease'
              }}
            >
              Bimbel
              <ChevronDown size={14} style={{ transform: bimbelOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
            </button>

            {bimbelOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '0',
                width: '260px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
                padding: '8px',
                zIndex: 110,
                animation: 'fadeInUp 200ms ease forwards'
              }}>
                <div style={{ padding: '6px 12px 4px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Program Bimbingan
                </div>
                {[
                  { name: 'UTBK-SNBT 2026', desc: 'Simulasi TPS, Literasi & Penalaran', tag: 'Populer' },
                  { name: 'Sekolah Kedinasan', desc: 'STAN, IPDN, STIS, Poltekip', tag: 'Intensif' },
                  { name: 'Ujian Mandiri PTN', desc: 'SIMAK UI, UTUL UGM, SMUP', tag: 'Selektif' },
                  { name: 'CPNS & CASN', desc: 'SKD TIU, TWK, TKP', tag: 'Baru' }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href="#bimbel"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      transition: 'background 150ms ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{item.desc}</div>
                    </div>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '6px',
                      background: idx === 0 ? '#eef2ff' : '#f1f5f9',
                      color: idx === 0 ? '#4f46e5' : '#64748b'
                    }}>
                      {item.tag}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Paket Saya Dropdown */}
          <div style={{ position: 'relative' }} ref={paketRef}>
            <button
              onClick={() => {
                setPaketOpen(!paketOpen);
                setBimbelOpen(false);
                setUserMenuOpen(false);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                background: paketOpen ? '#f1f5f9' : 'transparent',
                transition: 'all 200ms ease'
              }}
            >
              Paket Saya
              <ChevronDown size={14} style={{ transform: paketOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
            </button>

            {paketOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '0',
                width: '240px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
                padding: '8px',
                zIndex: 110,
                animation: 'fadeInUp 200ms ease forwards'
              }}>
                <a
                  href="#paket-aktif"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <BookOpen size={16} color="#4f46e5" />
                  <span>Paket Aktif (2 Kursus)</span>
                </a>
                <a
                  href="#riwayat"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Award size={16} color="#10b981" />
                  <span>Riwayat & Sertifikat</span>
                </a>
                <div style={{ height: '1px', background: '#f1f5f9', margin: '6px 0' }} />
                <button
                  onClick={onOpenCatalog}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#4f46e5',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eef2ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span>+ Beli Paket Baru</span>
                  <Sparkles size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions: Notification + User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Notification Bell */}
          <button 
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#475569',
              transition: 'all 200ms ease'
            }}
            title="Notifikasi"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#f43f5e',
              border: '2px solid #ffffff'
            }} />
          </button>

          {/* User Profile Menu */}
          <div style={{ position: 'relative' }} ref={userRef}>
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setBimbelOpen(false);
                setPaketOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 12px 4px 4px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700
              }}>
                PA
              </div>
              <div style={{ textAlign: 'left', display: 'none' }} className="desktop-user-text">
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                  Production Admin
                </div>
                <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
                  Verified Admin
                </div>
              </div>
              <ChevronDown size={14} color="#64748b" style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
            </button>

            {/* Profile Dropdown */}
            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: '0',
                width: '230px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
                padding: '8px',
                zIndex: 110,
                animation: 'fadeInUp 200ms ease forwards'
              }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Production Admin</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>admin@pastipintar.id</div>
                </div>
                <div style={{ padding: '6px 0' }}>
                  <a href="#profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', fontSize: '13px', color: '#334155', borderRadius: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <User size={15} /> Edit Profil
                  </a>
                  <a href="#settings" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', fontSize: '13px', color: '#334155', borderRadius: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <Settings size={15} /> Pengaturan Akun
                  </a>
                </div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '4px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '8px 12px', fontSize: '13px', color: '#ef4444', borderRadius: '8px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <LogOut size={15} /> Keluar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#0f172a'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '12px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1)',
          animation: 'fadeInUp 250ms ease forwards'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 14px', borderRadius: '10px', background: '#0f172a', color: '#fff', fontWeight: 600, fontSize: '14px' }}>
              Dashboard
            </a>
            <a href="#bimbel" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 14px', borderRadius: '10px', color: '#334155', fontWeight: 600, fontSize: '14px' }}>
              Bimbel UTBK & Kedinasan
            </a>
            <a href="#paket" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 14px', borderRadius: '10px', color: '#334155', fontWeight: 600, fontSize: '14px' }}>
              Paket Saya
            </a>
            <button 
              onClick={() => { onOpenCatalog(); setMobileMenuOpen(false); }} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: '#eef2ff', color: '#4f46e5', fontWeight: 700, fontSize: '14px', textAlign: 'left' }}
            >
              <span>Beli Paket Belajar</span>
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav-links { display: flex !important; }
          .desktop-user-text { display: block !important; }
          .mobile-hamburger-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
