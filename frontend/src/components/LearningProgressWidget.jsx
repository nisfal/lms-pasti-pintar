import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  ArrowRight, 
  PackageOpen, 
  AlertCircle,
  Sparkles,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function LearningProgressWidget({ onOpenCatalog }) {
  // State switcher to preview both states (Active Packages vs Empty State) as specified in PRD
  const [hasActivePackages, setHasActivePackages] = useState(true);

  const activePackages = [
    {
      id: 'pkg-1',
      name: 'Intensif UTBK-SNBT 2026 (Master Class)',
      category: 'Persiapan Masuk PTN',
      totalVideos: 35,
      completedVideos: 24,
      totalTryouts: 8,
      completedTryouts: 6,
      deadline: 'Berakhir 30 Juni 2026',
      badge: 'Aktif'
    },
    {
      id: 'pkg-2',
      name: 'SKD Kedinasan STAN & IPDN 2026',
      category: 'Sekolah Kedinasan',
      totalVideos: 20,
      completedVideos: 11,
      totalTryouts: 5,
      completedTryouts: 2,
      deadline: 'Berakhir 15 Mei 2026',
      badge: 'Aktif'
    }
  ];

  // Calculate weighted progress: Video + Tryouts combined as requested
  const calculateProgress = (completedVid, totalVid, completedTO, totalTO) => {
    const totalItems = totalVid + totalTO;
    if (totalItems === 0) return 0;
    const completedItems = completedVid + completedTO;
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="double-bezel animate-fade-in delay-2" style={{ height: '100%' }}>
      <div className="double-bezel-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header Widget */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
                Progress Belajar Paket Aktif
              </h3>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '9999px',
                background: hasActivePackages ? '#ecfdf5' : '#f1f5f9',
                color: hasActivePackages ? '#059669' : '#64748b'
              }}>
                {hasActivePackages ? `${activePackages.length} Paket Berjalan` : 'Kosong'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Dihitung dari kombinasi video materi & tryout terselesaikan
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Demo State Switcher */}
            <button
              onClick={() => setHasActivePackages(!hasActivePackages)}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '8px',
                background: '#f1f5f9',
                color: '#475569',
                fontWeight: 600,
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
              title="Klik untuk menguji tampilan State Ada Paket vs Kosong"
            >
              Mode: {hasActivePackages ? 'Ada Paket' : 'State Kosong'}
            </button>

            {hasActivePackages && (
              <a
                href="#semua-paket"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#4f46e5'
                }}
              >
                Lihat semua
                <ArrowRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Content Body */}
        {hasActivePackages ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {activePackages.map((pkg) => {
              const progressPct = calculateProgress(
                pkg.completedVideos,
                pkg.totalVideos,
                pkg.completedTryouts,
                pkg.totalTryouts
              );

              return (
                <div
                  key={pkg.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px',
                    transition: 'all 200ms ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {pkg.category}
                      </span>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                        {pkg.name}
                      </h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#4f46e5' }}>
                        {progressPct}%
                      </span>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
                        Selesai
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e2e8f0',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: `${progressPct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
                      borderRadius: '9999px',
                      transition: 'width 800ms cubic-bezier(0.32, 0.72, 0, 1)'
                    }} />
                  </div>

                  {/* Metrics details: Video + Tryout */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    fontSize: '11px',
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <PlayCircle size={13} color="#4f46e5" />
                        <strong>{pkg.completedVideos}/{pkg.totalVideos}</strong> Video
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={13} color="#059669" />
                        <strong>{pkg.completedTryouts}/{pkg.totalTryouts}</strong> Tryout
                      </span>
                    </div>

                    <span style={{ color: '#94a3b8' }}>
                      {pkg.deadline}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE (As required in PRD) */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '48px 24px',
            background: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: '18px',
            flex: 1
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              marginBottom: '16px'
            }}>
              <PackageOpen size={28} />
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              Belum ada paket aktif
            </h4>

            <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '320px', marginBottom: '20px' }}>
              Anda belum memiliki paket bimbingan aktif saat ini. Dapatkan akses materi eksklusif dan simulasi tryout sekarang.
            </p>

            <button
              onClick={onOpenCatalog}
              className="btn-primary"
            >
              <span>Lihat Paket Belajar</span>
              <div className="btn-icon-circle">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
