import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Award, HelpCircle, ArrowUpRight, BarChart3 } from 'lucide-react';

export default function AccuracyWidget({ accuracyData, loading, onOpenTryoutList }) {
  // State switcher to preview default 0% (from PRD spec) vs actual test performance
  const [demoZeroState, setDemoZeroState] = useState(false);

  // Category color mapping
  const getCategoryColor = (catName) => {
    if (catName.includes('TPS') || catName.includes('Umum')) return '#4f46e5';
    if (catName.includes('Matematika') || catName.includes('Kuantitatif')) return '#06b6d4';
    if (catName.includes('Indonesia')) return '#10b981';
    if (catName.includes('Inggris')) return '#f59e0b';
    return '#6366f1';
  };

  const totalQuestions = accuracyData?.totalQuestions ?? 110;
  const totalCorrect = accuracyData?.totalCorrect ?? 98;
  const rawAccuracy = accuracyData?.percentage ?? 89.1;
  const totalTryouts = accuracyData?.totalTryouts ?? 4;
  const latestScore = accuracyData?.latestScore ?? 760;

  const categories = (accuracyData?.categories || [
    { category: 'TPS - Penalaran Umum', correct: 28, total: 30, accuracy: 93.3 },
    { category: 'Literasi Bahasa Indonesia', correct: 27, total: 30, accuracy: 90.0 },
    { category: 'Literasi Bahasa Inggris', correct: 22, total: 25, accuracy: 88.0 },
    { category: 'Penalaran Matematika', correct: 21, total: 25, accuracy: 84.0 }
  ]).map(c => ({
    name: c.category,
    correct: demoZeroState ? 0 : c.correct,
    total: demoZeroState ? 0 : c.total,
    pct: demoZeroState ? 0 : c.accuracy,
    color: demoZeroState ? '#94a3b8' : getCategoryColor(c.category)
  }));

  const displayCorrect = demoZeroState ? 0 : totalCorrect;
  const displayTotal = demoZeroState ? 0 : totalQuestions;
  const accuracyPct = demoZeroState ? '0' : rawAccuracy.toFixed(1);

  // SVG Circular Meter Config
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (parseFloat(accuracyPct) / 100) * circumference;

  return (
    <div className="double-bezel animate-fade-in delay-3" style={{ height: '100%' }}>
      <div className="double-bezel-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Widget Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
                Akurasi Jawaban
              </h3>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '9999px',
                background: '#eef2ff',
                color: '#4f46e5'
              }}>
                Scoring Engine (Go)
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Dihitung real-time dari {totalTryouts} sesi simulasi CAT
            </p>
          </div>

          {/* Interactive PRD State Toggle */}
          <button
            onClick={() => setDemoZeroState(!demoZeroState)}
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
            title="Uji tampilan sesuai PRD (0% vs ada hasil)"
          >
            Mode: {demoZeroState ? '0% (PRD Default)' : 'Nilai Kumulatif (Go)'}
          </button>
        </div>

        {loading ? (
          /* SKELETON */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, padding: '12px 0' }}>
            <div style={{ height: '120px', background: '#f8fafc', borderRadius: '18px', border: '1px solid #e2e8f0' }} />
            <div style={{ height: '80px', background: '#f8fafc', borderRadius: '14px' }} />
          </div>
        ) : (
          <>
            {/* Circular Radial Meter & Summary Highlight */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              padding: '20px 16px',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {/* Circular SVG Gauge */}
              <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Background Track */}
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    stroke="url(#accuracyGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 1s cubic-bezier(0.32, 0.72, 0, 1)'
                    }}
                  />
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Center Text */}
                <div style={{
                  position: 'absolute',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {accuracyPct}%
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                    Akurasi
                  </span>
                </div>
              </div>

              {/* Metric Details as in PRD */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0'
                }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                    {displayCorrect} benar dari {displayTotal} soal
                  </span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0'
                }}>
                  <XCircle size={16} color="#ef4444" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                    {displayTotal - displayCorrect} salah / dilewati
                  </span>
                </div>

                {!demoZeroState && (
                  <div style={{ fontSize: '11px', color: '#6366f1', fontWeight: 600, paddingLeft: '4px' }}>
                    ★ Skor Tryout Terakhir: <strong>{latestScore}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Category Breakdown */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Performa Sub-Kategori Ujian
                </h4>
                {onOpenTryoutList && (
                  <button 
                    onClick={onOpenTryoutList}
                    style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Detail Tryout →
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {categories.map((cat, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{cat.name}</span>
                      <span style={{ fontWeight: 700, color: cat.pct > 0 ? '#0f172a' : '#94a3b8' }}>
                        {cat.pct}% ({cat.correct}/{cat.total})
                      </span>
                    </div>
                    <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${cat.pct}%`,
                        background: cat.color,
                        borderRadius: '9999px',
                        transition: 'width 800ms cubic-bezier(0.32, 0.72, 0, 1)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
