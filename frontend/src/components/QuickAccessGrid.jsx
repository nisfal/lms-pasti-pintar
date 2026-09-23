import React from 'react';
import { 
  PlayCircle, 
  FileCheck2, 
  Layers, 
  ShoppingCart, 
  ArrowUpRight, 
  Sparkles,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function QuickAccessGrid({ onSelectModule, onOpenCatalog }) {
  const cards = [
    {
      id: 'video',
      title: 'Video Materi',
      subtitle: 'Modul video interaktif beresolusi tinggi dengan rangkuman materi lengkap',
      badge: '128 Video Modul',
      badgeColor: '#4f46e5',
      badgeBg: '#eef2ff',
      icon: PlayCircle,
      iconColor: '#4f46e5',
      iconBg: 'rgba(79, 70, 229, 0.1)',
      action: () => onSelectModule('video'),
      actionLabel: 'Buka Video'
    },
    {
      id: 'tryout',
      title: 'Tryout Online',
      subtitle: 'Simulasi sistem CAT standar nasional dengan pembobotan skor IRT real-time',
      badge: '12 Tryout Aktif',
      badgeColor: '#059669',
      badgeBg: '#ecfdf5',
      icon: FileCheck2,
      iconColor: '#059669',
      iconBg: 'rgba(5, 150, 105, 0.1)',
      action: () => onSelectModule('tryout'),
      actionLabel: 'Mulai Tryout'
    },
    {
      id: 'paket',
      title: 'Paket Saya',
      subtitle: 'Akses kurikulum modul, bank latihan soal, dan silabus kelas bimbingan aktif',
      badge: '2 Paket Terdaftar',
      badgeColor: '#0284c7',
      badgeBg: '#f0f9ff',
      icon: Layers,
      iconColor: '#0284c7',
      iconBg: 'rgba(2, 132, 199, 0.1)',
      action: () => onSelectModule('paket'),
      actionLabel: 'Kelola Paket'
    },
    {
      id: 'beli',
      title: 'Beli Paket',
      subtitle: 'Tingkatkan paket belajar untuk membuka akses ribuan soal & sesi mentoring',
      badge: 'Diskon s.d 50%',
      badgeColor: '#d97706',
      badgeBg: '#fffbeb',
      icon: ShoppingCart,
      iconColor: '#d97706',
      iconBg: 'rgba(217, 119, 6, 0.1)',
      action: onOpenCatalog,
      actionLabel: 'Eksplorasi Paket',
      featured: true
    }
  ];

  return (
    <section style={{ marginBottom: '40px' }} className="animate-fade-in delay-1">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Akses Cepat Fitur Utama
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Pintasan instan ke modul pembelajaran dan simulasi ujian
          </p>
        </div>
      </div>

      {/* Grid: 4 Double-Bezel Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.action}
              className="double-bezel"
              style={{
                cursor: 'pointer',
                position: 'relative',
                background: card.featured ? 'rgba(254, 243, 199, 0.4)' : 'rgba(248, 250, 252, 0.85)',
                borderColor: card.featured ? 'rgba(245, 158, 11, 0.3)' : 'rgba(226, 232, 240, 0.85)'
              }}
            >
              <div
                className="double-bezel-inner"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px 20px',
                  minHeight: '210px'
                }}
              >
                {/* Top: Icon + Badge */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: card.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.iconColor
                    }}>
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: card.badgeBg,
                      color: card.badgeColor,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {card.featured && <Sparkles size={11} />}
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '6px'
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748b',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom Action / Nested Button-in-Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: card.featured ? '#b45309' : '#4f46e5'
                  }}>
                    {card.actionLabel}
                  </span>

                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: card.featured ? '#fef3c7' : '#eef2ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.featured ? '#b45309' : '#4f46e5',
                    transition: 'transform 200ms ease'
                  }}>
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
