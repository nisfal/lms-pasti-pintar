# PRD: Dashboard LMS (Platform Belajar Digital)

## 1. Introduction/Overview
Platform ini adalah sistem manajemen pembelajaran (LMS) digital yang dirancang untuk memungkinkan pengguna (siswa maupun admin) mengelola materi pembelajaran, paket kursus/bimbingan belajar, tryout, dan melacak progres belajar secara terpusat dalam satu dasbor yang komprehensif.

## 2. Goals
- Menyediakan antarmuka dasbor yang intuitif untuk akses cepat ke fitur utama (Video, Tryout, Paket).
- Memberikan umpan balik visual secara real-time terkait progres belajar pengguna berdasarkan kombinasi video materi dan tryout.
- Menampilkan tingkat akurasi evaluasi pengguna secara kumulatif dari semua tryout.
- Memfasilitasi eksplorasi pembelian paket dengan mengarahkan pengguna ke halaman khusus daftar paket.

## 3. User Stories

### US-001: Navigasi Global
**Description:** As a user, I want a top navigation bar so that I can easily move between Dashboard, Bimbel, Paket Saya, and my Profile from any page.

**Acceptance Criteria:**
- [ ] Navbar contains Logo, "Dashboard" link, "Bimbel" dropdown, "Paket Saya" dropdown, and Profile/Role menu.
- [ ] Navbar is persistent across all application pages.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-002: Welcome Section & Quick Access
**Description:** As a user, I want a personalized welcome message and quick access cards so that I know I'm logged in and can jump straight to core features.

**Acceptance Criteria:**
- [ ] Shows "Halo, [Nama/Role]" dynamically based on user session.
- [ ] Includes "Kembali ke Home" button.
- [ ] Displays 4 clickable cards: "Video Materi", "Tryout", "Paket Saya", and "Beli Paket".
- [ ] "Beli Paket" card redirects the user to the package listing page.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: Progress Belajar Widget
**Description:** As a user, I want to see my learning progress on active packages so that I know how much I have completed.

**Acceptance Criteria:**
- [ ] Retrieves active packages from the backend API.
- [ ] Progress percentage is calculated based on the combination of completed videos and finished tryouts within the active package.
- [ ] If no active package exists, shows "Belum ada paket aktif" state with a button redirecting to the package listing page.
- [ ] API endpoint for progress returns the correct calculation based on video and tryout data.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Akurasi Jawaban Widget
**Description:** As a user, I want to see my overall accuracy in tryouts so that I can gauge my general performance level.

**Acceptance Criteria:**
- [ ] Calculates cumulative average accuracy from all tryouts the user has ever taken.
- [ ] Displays percentage (e.g., "75%") and detailed count (e.g., "75 benar dari 100 soal").
- [ ] Backend API correctly aggregates accuracy from the database and returns it efficiently.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Setup Backend & Database (Dasbor)
**Description:** As a developer, I need backend services and databases set up to serve dashboard data efficiently.

**Acceptance Criteria:**
- [ ] Go service setup for high-concurrency read endpoints (e.g., scoring/accuracy calculation).
- [ ] Node.js setup for main routing and general API.
- [ ] PostgreSQL schema implementation for user accounts, active packages, and profile info.
- [ ] MongoDB schema implementation for learning materials and tryout records.
- [ ] Redis caching implemented for "Progress Belajar" and "Akurasi Jawaban" endpoints to reduce latency.

## 4. Functional Requirements
- **FR-1:** The system must calculate "Progress Belajar" by aggregating the completion status of video materials and tryouts within a package.
- **FR-2:** The system must calculate "Akurasi Jawaban" cumulatively across all historical tryouts of the logged-in user.
- **FR-3:** The system must redirect the user to a separate "Daftar Paket" page when they click the "Beli Paket" card or the "Lihat Paket" button in an empty state.
- **FR-4:** The system must retrieve user session and role information to customize the global navigation and welcome section.
- **FR-5:** The backend must cache dashboard widgets (Progress & Accuracy) in Redis to ensure fast Dashboard load times.

## 5. Non-Goals (Out of Scope)
- Implementasi sistem proses pembayaran (Payment Gateway); Dasbor hanya melakukan *redirect*.
- Implementasi Content Management System (CMS) untuk upload video atau membuat soal.
- Pembuatan Halaman Statis untuk FAQ, Syarat & Ketentuan, dsb. (hanya tautan *footer* yang disediakan).
- Halaman antarmuka pengerjaan Tryout secara interaktif (hanya metrik ringkasannya yang ada di Dasbor).

## 6. Technical Considerations
- **Arsitektur:** Menggunakan polyglot microservice (Go untuk servis performa tinggi/scoring, Node.js untuk routing utama).
- **Database:** PostgreSQL untuk integritas relasional (Users, Transactions/Packages). MongoDB untuk fleksibilitas dokumen (Bank Soal, Metadata Video).
- **Performa:** Penggunaan Redis sangat kritikal untuk *caching* *Progress* dan *Akurasi* agar halaman awal Dasbor bisa dimuat secara instan tanpa melakukan query berat berulang-ulang ke database.

## 7. Success Metrics
- Halaman dasbor bisa dimuat penuh (termasuk metrik Widget) di bawah 1 detik.
- Akurasi Widget mencerminkan kalkulasi data yang tepat secara real-time / near-real-time bagi siswa.

## 8. Open Questions
- Apakah "Progress Belajar" perlu dibedakan secara visual antara progres video dan progres tryout, atau cukup satu metrik gabungan?
- Seberapa sering data di Redis *cache* untuk Akurasi dan Progres perlu di-invalida (TTL), atau apakah di-invalida berbasis *event* (saat tryout selesai)?
