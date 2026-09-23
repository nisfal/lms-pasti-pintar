import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  ArrowRight, 
  PackageOpen, 
  Sparkles,
  Clock,
  Layers
} from 'lucide-react';

export default function LearningProgressWidget({ progressData, activePackage, loading, onOpenCatalog }) {
  // Manual override toggle for PRD acceptance criteria testing
  const [forceEmptyState, setForceEmptyState] = useState(false);

  // Check if user has an active package from backend
  const hasRealPackage = Boolean(activePackage && activePackage.id && activePackage.status === 'Aktif');
  const isDisplayingActive = hasRealPackage && !forceEmptyState;

  // Format expiry date
  const validUntilFormatted = activePackage?.validUntil 
    ? new Date(activePackage.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : '31 Des 2026';

  const completedVids = progressData?.completedVideos ?? 10;
  const totalVids = progressData?.totalVideos ?? 14;
  const progressPct = progressData?.percentage ?? Math.round((completedVids / totalVids) * 100);
  const studyMins = progressData?.studyTimeMinutes ?? 465;
  const recentVids = progressData?.recentVideos || [];

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
                background: isDisplayingActive ? '#ecfdf5' : '#f1f5f9',
                color: isDisplayingActive ? '#059669' : '#64748b'
              }}>
                {loading ? 'Memuat...' : (isDisplayingActive ? 'Paket Aktif' : 'Kosong')}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Dihitung dari kombinasi video materi & modul terselesaikan
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* PRD Acceptance Criteria Switcher */}
            <button
              onClick={() => setForceEmptyState(!forceEmptyState)}
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
              title="Klik untuk menguji tampilan State Ada Paket vs Kosong sesuai PRD"
            >
              Mode: {isDisplayingActive ? 'Ada Paket (Live)' : 'State Kosong (PRD)'}
            </button>

            {isDisplayingActive && (
              <button
                onClick={onOpenCatalog}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#4f46e5',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Lihat Paket
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          /* SKELETON LOADING */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, padding: '12px 0' }}>
            <div style={{ height: '24px', background: '#f1f5f9', borderRadius: '8px', width: '60%' }} />
            <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '6px', width: '100%' }} />
            <div style={{ height: '80px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }} />
          </div>
        ) : isDisplayingActive ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {/* Active Package Card from MySQL */}
            <div
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
                    {activePackage?.category || 'SNBT / UTBK'}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {activePackage?.title || 'SNBT Masterclass 2026'}
                  </h4>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#4f46e5' }}>
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

              {/* Metrics details: Video + Study Time + Expiry */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '11px',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PlayCircle size={13} color="#4f46e5" />
                    <strong>{completedVids}/{totalVids}</strong> Video Selesai
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#059669" />
                    <strong>{studyMins}</strong> Menit Belajar
                  </span>
                </div>

                <span style={{ color: '#94a3b8' }}>
                  Berlaku s/d {validUntilFormatted}
                </span>
              </div>
            </div>

            {/* List of Recent Modules from MongoDB */}
            {recentVids.length > 0 && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Modul Pembelajaran Terakhir
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {recentVids.map((vid) => (
                    <div 
                      key={vid.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: '#ffffff',
                        border: '1px solid #f1f5f9',
                        borderRadius: '10px',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={15} color="#10b981" />
                        <div>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{vid.title}</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>{vid.subject} • {vid.duration}</div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#059669',
                        background: '#ecfdf5',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        Tuntas
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
