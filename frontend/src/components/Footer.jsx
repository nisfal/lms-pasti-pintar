import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Shield, HelpCircle, FileText, CreditCard, RefreshCw, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid #e2e8f0',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, #ffffff 100%)',
      backdropFilter: 'blur(12px)',
      padding: '56px 0 32px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Col 1: Platform Overview */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <GraduationCap size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em', color: '#0f172a' }}>
                PASTI<span style={{ color: '#4f46e5' }}>PINTAR</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#64748b', marginBottom: '16px' }}>
              Platform manajemen pembelajaran (LMS) digital terintegrasi untuk bimbingan belajar, bank materi video resolusi tinggi, dan simulasi CAT tryout nasional dengan analitik presisi tinggi.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
              <Shield size={14} />
              <span>Sistem Pembelajaran Terakreditasi</span>
            </div>
          </div>

          {/* Col 2: Informasi & Kebijakan (As specified in PRD) */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Kebijakan & Regulasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <a href="#faq" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                  <HelpCircle size={14} /> Tanya Jawab (FAQ)
                </a>
              </li>
              <li>
                <a href="#terms" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                  <FileText size={14} /> Syarat & Ketentuan Layanan
                </a>
              </li>
              <li>
                <a href="#payment-policy" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                  <CreditCard size={14} /> Kebijakan Pembayaran
                </a>
              </li>
              <li>
                <a href="#refund-policy" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                  <RefreshCw size={14} /> Kebijakan Pengembalian Dana (Refund)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Program Bimbel Populer */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Program Pembelajaran
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#utbk" style={{ color: '#475569' }}>UTBK-SNBT Supercamp 2026</a></li>
              <li><a href="#kedinasan" style={{ color: '#475569' }}>Bimbel Kedinasan STAN & IPDN</a></li>
              <li><a href="#mandiri" style={{ color: '#475569' }}>Seleksi Mandiri SIMAK UI & CBT UGM</a></li>
              <li><a href="#cpns" style={{ color: '#475569' }}>Tryout CAT SKD CPNS & PPPK</a></li>
            </ul>
          </div>

          {/* Col 4: Kontak & Kantor Resmi (As specified in PRD) */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Kontak & Kantor Pusat
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#4f46e5" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Gedung Pasti Pintar Edutech, Jl. Sudirman No. 48, Senayan, Jakarta Selatan 12190</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#4f46e5" />
                <span>bantuan@pastipintar.id</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#4f46e5" />
                <span>+62 (021) 8088-7766</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: '#94a3b8'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Pasti Pintar LMS. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Dirancang dengan standar presisi tinggi</span>
            <Heart size={12} color="#f43f5e" fill="#f43f5e" />
            <span>untuk Generasi Unggul Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
