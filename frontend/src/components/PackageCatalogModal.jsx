import React from 'react';
import { X, Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

export default function PackageCatalogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const packages = [
    {
      id: 'pkg-basic',
      name: 'Paket Mandiri Mandiri',
      desc: 'Cocok untuk persiapan latihan mandiri dengan bank soal komprehensif',
      price: 'Rp 149.000',
      period: '/ 3 Bulan',
      featured: false,
      features: [
        'Akses 45+ Video Modul Teori',
        '5x Simulasi Tryout CAT Standar IRT',
        'Pembahasan Kunci Jawaban Lengkap',
        'Analitik Akurasi Dasar'
      ],
      cta: 'Pilih Paket Ini'
    },
    {
      id: 'pkg-pro',
      name: 'Intensif Masterclass UTBK & Kedinasan',
      desc: 'Paket terfavorit untuk target tembus PTN & Kampus Kedinasan impian',
      price: 'Rp 299.000',
      period: '/ 6 Bulan',
      featured: true,
      tag: 'Paling Diminati',
      features: [
        'Akses 120+ Video Pembelajaran HD',
        '15x Simulasi Tryout Real-Time Nasional',
        'Perankingan Leaderboard Se-Indonesia',
        'Sesi Live Q&A Mingguan dengan Mentor',
        'Analitik Akurasi & Rekomendasi Jurusan'
      ],
      cta: 'Mulai Belajar Sekarang'
    },
    {
      id: 'pkg-ultimate',
      name: 'Supercamp All-In VIP',
      desc: 'Akses tanpa batas ke seluruh kurikulum hingga pengumuman seleksi',
      price: 'Rp 499.000',
      period: '/ 12 Bulan',
      featured: false,
      features: [
        'Semua Fitur Paket Intensif Masterclass',
        '30+ Tryout Tambahan & Bank Soal Hots',
        'Konsultasi 1-on-1 Pemilihan Jurusan',
        'Garansi Akses Update Materi Terbaru'
      ],
      cta: 'Dapatkan Akses VIP'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          border: '1px solid #e2e8f0',
          padding: '32px'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px'
        }}>
          <div>
            <div className="eyebrow-badge" style={{ marginBottom: '8px' }}>
              <Sparkles size={12} />
              <span>Katalog Paket Belajar Resmi</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
              Pilih Paket Bimbingan Belajar
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
              Akses materi video komprehensif, simulasi CAT IRT, dan tingkatkan akurasi jawaban Anda.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Package Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                position: 'relative',
                borderRadius: '20px',
                border: pkg.featured ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                background: pkg.featured ? 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' : '#ffffff',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: pkg.featured ? '0 12px 30px -4px rgba(79, 70, 229, 0.15)' : '0 2px 4px rgba(15, 23, 42, 0.04)'
              }}
            >
              {pkg.tag && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '24px',
                  background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
                }}>
                  {pkg.tag}
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  {pkg.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
                  {pkg.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {pkg.period}
                  </span>
                </div>

                <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '20px' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#334155' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: pkg.featured ? '#eef2ff' : '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pkg.featured ? '#4f46e5' : '#10b981',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  alert(`Anda memilih ${pkg.name}. Mengarahkan ke gerbang checkout...`);
                  onClose();
                }}
                className={pkg.featured ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>{pkg.cta}</span>
                {pkg.featured ? (
                  <div className="btn-icon-circle">
                    <ArrowRight size={16} />
                  </div>
                ) : (
                  <ArrowRight size={15} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
