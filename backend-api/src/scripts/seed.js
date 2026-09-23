const fs = require('fs');
const path = require('path');
const mysqlPool = require('../config/mysql');
const connectMongo = require('../config/mongo');
const mongoose = require('mongoose');
const TryoutRecord = require('../models/TryoutRecord');
const VideoProgress = require('../models/VideoProgress');

async function seed() {
  console.log('--- Starting Pasti Pintar Database Seeder ---');

  // 1. MySQL Schema & Data
  try {
    const connection = await mysqlPool.getConnection();
    console.log('[MySQL] Connected to database');

    const schemaSql = fs.readFileSync(path.resolve(__dirname, '../database/schema.sql'), 'utf-8');
    const statements = schemaSql.split(';').map(s => s.trim()).filter(s => s.length > 0);

    for (const statement of statements) {
      await connection.query(statement);
    }
    console.log('[MySQL] Schema tables initialized');

    // Clean existing seed data
    await connection.query('DELETE FROM user_packages');
    await connection.query('DELETE FROM packages');
    await connection.query('DELETE FROM users');

    // Insert Default User
    const userSql = `
      INSERT INTO users (id, name, email, role, avatar_url, target_major, target_university)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(userSql, [
      'usr_01',
      'Nisrina Alifah',
      'nisrina.alifah@student.id',
      'student',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      'Pendidikan Dokter',
      'Universitas Indonesia'
    ]);
    console.log('[MySQL] User seeded: usr_01 (Nisrina Alifah)');

    // Insert Packages Catalog
    const pkgSql = `
      INSERT INTO packages (id, title, category, price, original_price, badge, description, features, is_popular)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const packages = [
      {
        id: 'pkg_snbt_2026',
        title: 'SNBT Masterclass 2026',
        category: 'SNBT / UTBK',
        price: 349000,
        original_price: 699000,
        badge: 'TERPOPULER',
        description: 'Paket persiapan intensif terlengkap untuk lolos SNBT dengan materi video mutakhir, bank soal adaptif, dan evaluasi berkala.',
        features: JSON.stringify([
          '120+ Video Pembahasan TPS & Literasi',
          '30x Tryout Akbar Berbasis IRT Nasional',
          'Analisis Peluang Kelulusan AI & IRT',
          'Grup Diskusi Mentor & Bedah Soal Harian',
          'Akses Aktif Hingga UTBK Mei 2026'
        ]),
        is_popular: true
      },
      {
        id: 'pkg_kedinasan_2026',
        title: 'Kedinasan & IPDN Platinum',
        category: 'Sekolah Kedinasan',
        price: 499000,
        original_price: 899000,
        badge: 'INTENSIF SKD',
        description: 'Fokus persiapan lolos SKD (TWK, TIU, TKP) dengan standar BKN dan modul kesamaptaan jasmani komprehensif.',
        features: JSON.stringify([
          '80+ Video Materi SKD & Penalaran',
          '20x Simulasi CAT BKN Real-Time',
          'Panduan Tes Fisik & Wawancara Psikologi',
          'Sesi Konsultasi Eksklusif Alumni Kedinasan',
          'Akses Aktif 12 Bulan Penuh'
        ]),
        is_popular: false
      },
      {
        id: 'pkg_mandiri_2026',
        title: 'SIMAK UI & Ujian Mandiri PTN',
        category: 'Ujian Mandiri',
        price: 399000,
        original_price: 750000,
        badge: 'PTN TOP',
        description: 'Tembus jalur mandiri UI, ITB, UGM, Undip, dan Unair dengan modul soal tingkat tinggi (HOTS) serta pembekalan khusus.',
        features: JSON.stringify([
          'Modul HOTS & Kemampuan Dasar Akademik',
          '15x Tryout Khusus SIMAK & UTUL UGM',
          'Peringkat Nasional & Pembahasan Detail',
          'Webinar Trik Menjawab Soal Sulit Tiap Pekan',
          'Akses Aktif Hingga Juli 2026'
        ]),
        is_popular: false
      }
    ];

    for (const p of packages) {
      await connection.query(pkgSql, [
        p.id,
        p.title,
        p.category,
        p.price,
        p.original_price,
        p.badge,
        p.description,
        p.features,
        p.is_popular ? 1 : 0
      ]);
    }
    console.log('[MySQL] 3 Packages seeded into catalog');

    // Insert User's Active Package
    const userPkgSql = `
      INSERT INTO user_packages (user_id, package_id, package_title, category, status, valid_until)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await connection.query(userPkgSql, [
      'usr_01',
      'pkg_snbt_2026',
      'SNBT Masterclass 2026',
      'SNBT / UTBK',
      'active',
      '2026-12-31'
    ]);
    console.log('[MySQL] Active package assigned to usr_01');

    connection.release();
  } catch (error) {
    console.error('[MySQL] Seeding failed:', error);
    process.exit(1);
  }

  // 2. MongoDB Tryout Records & Video Progress
  try {
    await connectMongo();
    console.log('[MongoDB] Connected to database');

    await TryoutRecord.deleteMany({});
    await VideoProgress.deleteMany({});

    // Seed Tryout Records for usr_01
    const tryoutRecords = [
      {
        userId: 'usr_01',
        tryoutId: 'to_tps_01',
        tryoutTitle: 'Tryout Akbar SNBT TPS Paket 1',
        category: 'TPS - Penalaran Umum',
        totalQuestions: 30,
        correctAnswers: 28,
        score: 785,
        takenAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        userId: 'usr_01',
        tryoutId: 'to_mat_01',
        tryoutTitle: 'Simulasi Penalaran Matematika Mandiri',
        category: 'Penalaran Matematika',
        totalQuestions: 25,
        correctAnswers: 21,
        score: 740,
        takenAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: 'usr_01',
        tryoutId: 'to_lit_indo_01',
        tryoutTitle: 'Latihan Intensif Literasi Bahasa Indonesia',
        category: 'Literasi Bahasa Indonesia',
        totalQuestions: 30,
        correctAnswers: 27,
        score: 770,
        takenAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: 'usr_01',
        tryoutId: 'to_lit_inggris_01',
        tryoutTitle: 'Tes Diagnostik Literasi Bahasa Inggris',
        category: 'Literasi Bahasa Inggris',
        totalQuestions: 25,
        correctAnswers: 22,
        score: 760,
        takenAt: new Date()
      }
    ];
    await TryoutRecord.insertMany(tryoutRecords);
    console.log(`[MongoDB] ${tryoutRecords.length} Tryout records seeded for usr_01`);

    // Seed Video Progress for usr_01
    const videoProgress = [
      { userId: 'usr_01', videoId: 'v_01', title: 'Strategi Jitu Silogisme & Logika Proposisi', subject: 'TPS', durationMinutes: 45, watchedMinutes: 45, completed: true },
      { userId: 'usr_01', videoId: 'v_02', title: 'Trik Cepat Barisan dan Deret Aritmatika-Geometri', subject: 'Penalaran Matematika', durationMinutes: 50, watchedMinutes: 50, completed: true },
      { userId: 'usr_01', videoId: 'v_03', title: 'Pemahaman Gagasan Utama & Paragraf Deduktif', subject: 'Literasi B. Indonesia', durationMinutes: 35, watchedMinutes: 35, completed: true },
      { userId: 'usr_01', videoId: 'v_04', title: 'Bedah Teks Saintifik & Skimming Kritis', subject: 'Literasi B. Inggris', durationMinutes: 40, watchedMinutes: 40, completed: true },
      { userId: 'usr_01', videoId: 'v_05', title: 'Aljabar Lanjut dan Matriks HOTS', subject: 'Penalaran Matematika', durationMinutes: 55, watchedMinutes: 55, completed: true },
      { userId: 'usr_01', videoId: 'v_06', title: 'Analisis Penalaran Analitik & Diagram Venn', subject: 'TPS', durationMinutes: 40, watchedMinutes: 40, completed: true },
      { userId: 'usr_01', videoId: 'v_07', title: 'PUEBI Terapan dan Makna Kontekstual Kata', subject: 'Literasi B. Indonesia', durationMinutes: 30, watchedMinutes: 30, completed: true },
      { userId: 'usr_01', videoId: 'v_08', title: 'Reading Inference & Tone of the Author', subject: 'Literasi B. Inggris', durationMinutes: 45, watchedMinutes: 45, completed: true },
      { userId: 'usr_01', videoId: 'v_09', title: 'Peluang dan Kombinatorika Tingkat Lanjut', subject: 'Penalaran Matematika', durationMinutes: 50, watchedMinutes: 50, completed: true },
      { userId: 'usr_01', videoId: 'v_10', title: 'Strategi Manajemen Waktu 60 Detik Per Soal', subject: 'TPS', durationMinutes: 30, watchedMinutes: 30, completed: true },
      { userId: 'usr_01', videoId: 'v_11', title: 'Statistika Inferensial & Interpretasi Tabel', subject: 'Penalaran Matematika', durationMinutes: 45, watchedMinutes: 20, completed: false },
      { userId: 'usr_01', videoId: 'v_12', title: 'Teknik Menjawab Argumentasi Kuat dan Lemah', subject: 'TPS', durationMinutes: 40, watchedMinutes: 15, completed: false },
      { userId: 'usr_01', videoId: 'v_13', title: 'Kohesi dan Koherensi Wacana Akademik', subject: 'Literasi B. Indonesia', durationMinutes: 35, watchedMinutes: 10, completed: false },
      { userId: 'usr_01', videoId: 'v_14', title: 'Vocabulary in Context & Academic Idioms', subject: 'Literasi B. Inggris', durationMinutes: 40, watchedMinutes: 0, completed: false }
    ];
    await VideoProgress.insertMany(videoProgress);
    console.log(`[MongoDB] ${videoProgress.length} Video progress records seeded for usr_01`);

    await mongoose.disconnect();
    console.log('[MongoDB] Disconnected');
  } catch (error) {
    console.error('[MongoDB] Seeding failed:', error);
    process.exit(1);
  }

  console.log('--- Seeding Completed Successfully! ---');
  process.exit(0);
}

seed();
