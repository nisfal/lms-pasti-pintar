import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Award, HelpCircle, ArrowUpRight, BarChart3 } from 'lucide-react';

export default function AccuracyWidget({ onOpenTryoutList }) {
  // State switcher to preview default 0% (from PRD spec) vs actual test performance
  const [demoState, setDemoState] = useState('withData'); // 'zero' | 'withData'

  // Data sets
  const activeData = {
    correct: 186,
    total: 220,
    categories: [
      { name: 'Kemampuan Penalaran Umum', correct: 58, total: 65, pct: 89, color: '#4f46e5' },
      { name: 'Pengetahuan Kuantitatif & MTK', correct: 44, total: 55, pct: 80, color: '#06b6d4' },
      { name: 'Literasi Bahasa Indonesia', correct: 46, total: 50, pct: 92, color: '#10b981' },
      { name: 'Literasi Bahasa Inggris', correct: 38, total: 50, pct: 76, color: '#f59e0b' }
    ]
  };

  const zeroData = {
    correct: 0,
    total: 0,
    categories: [
      { name: 'Kemampuan Penalaran Umum', correct: 0, total: 0, pct: 0, color: '#94a3b8' },
      { name: 'Pengetahuan Kuantitatif & MTK', correct: 0, total: 0, pct: 0, color: '#94a3b8' },
      { name: 'Literasi Bahasa Indonesia', correct: 0, total: 0, pct: 0, color: '#94a3b8' },
      { name: 'Literasi Bahasa Inggris', correct: 0, total: 0, pct: 0, color: '#94a3b8' }
    ]
  };

  const current = demoState === 'zero' ? zeroData : activeData;
  const accuracyPct = current.total > 0 ? ((current.correct / current.total) * 100).toFixed(1) : '0';

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
                Kumulatif
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Rata-rata kumulatif dari seluruh pengerjaan tryout
            </p>
          </div>

          {/* Interactive State Toggle */}
          <button
            onClick={() => setDemoState(demoState === 'zero' ? 'withData' : 'zero')}
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
            Mode: {demoState === 'zero' ? '0% (PRD Default)' : 'Nilai Kumulatif'}
          </button>
        </div>

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
                {current.correct} benar dari {current.total} soal
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
                {current.total - current.correct} salah / dilewati
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            Performa Sub-Kategori Ujian
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {current.categories.map((cat, idx) => (
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
      </div>
    </div>
  );
}
