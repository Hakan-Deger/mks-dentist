const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

// Upload klasörlerini oluştur
['uploads/blog', 'uploads/cases', 'data'].forEach(dir => {
  const p = path.join(__dirname, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Veritabanını başlat
const db = require('./database');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar (yüklenen görseller)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Admin paneli statik dosyaları
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Ana site statik dosyaları (html, css, js klasörleri vs.)
// { extensions: ['html'] } ayarı sayesinde '.html' yazmadan sayfalara erişilebilecek
app.use(express.static(path.join(__dirname, '../'), { extensions: ['html'] }));
app.use(express.static(path.join(__dirname, '../html'), { extensions: ['html'] }));

// ── API ROUTES ─────────────────────────────────────────────
app.use('/api/blog',  require('./routes/blog'));
app.use('/api/cases', require('./routes/cases'));

// ── SAĞLIK KONTROLÜ ───────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../404.html'));
});

// ── ERROR HANDLER ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Sunucu hatası', detail: err.message });
});

// ── BAŞLAT ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Sunucu çalışıyor → http://localhost:${PORT}`);
  console.log(`📋  Admin paneli    → http://localhost:${PORT}/admin`);
  console.log(`📡  Blog API        → http://localhost:${PORT}/api/blog`);
  console.log(`🖼️   Vaka API        → http://localhost:${PORT}/api/cases`);
});
