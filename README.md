# Özel MKS Ağız ve Diş Sağlığı Polikliniği — Web Sitesi

Ankara Keçiören Ovacık'ta hizmet veren **Özel MKS Ağız ve Diş Sağlığı Polikliniği** için tasarlanmış; modern, şık (Altın ve Bej tonlarında), SEO uyumlu ve tam responsive klinik web sitesi projesi.

## 🦷 Özellikler

- **Lüks Altın & Bej Tasarım** — Polikliniğin kurumsal kimliğine ve logosuna özel olarak uyarlanmış renk paleti.
- **Node.js & SQLite Backend** — Blog yazıları ve vaka analizlerini (öncesi/sonrası resimleri) dinamik olarak yöneten güçlü altyapı.
- **Tam SEO Uyumluluğu** — Yapılandırılmış Schema.org JSON-LD verileri, robots.txt, sitemap.xml, canonical linkler ve Open Graph meta etiketleri.
- **Modern Arayüz Detayları** — Dönen kurumsal "MKS" rozeti, pürüzsüz animasyonlar (`IntersectionObserver` reveal) ve interaktif hover geçişleri.
- **WhatsApp Entegrasyonu** — Doğrudan randevu alımını kolaylaştıran hızlı yönlendirmeler.
- **Tamamen Responsive** — Mobil, tablet ve masaüstü cihazlar için piksel hassasiyetinde mobil uyum.

## 📁 Proje Yapısı

```
mks-dentist/
├── index.html            # Ana sayfa (Hero, Rozet, Hakkımızda, Sayaç, Randevu)
├── html/
│   ├── hakkimizda.html   # Hakkımızda sayfası (Yeni klinik vizyonu)
│   ├── tedaviler.html    # Tedaviler ve hizmetlerimiz sayfası
│   ├── ekibimiz.html     # Uzman hekim kadromuz sayfası
│   └── iletisim.html     # İletişim sayfası (Çalışma saatleri ve harita)
├── css/
│   └── style.css         # Tüm sitenin stil kuralları (Lüks bej-altın değişkenleri)
├── js/
│   └── main.js           # Mobil menü, animasyonlar ve slider JavaScript kodları
├── backend/
│   ├── server.js         # Node.js sunucu dosyası
│   ├── database.js       # SQLite veritabanı bağlantısı
│   └── data/
│       └── clinic.db     # Dinamik veritabanı (Blog ve Vaka Analizleri)
├── robots.txt            # SEO Arama motoru yönlendirmeleri
├── sitemap.xml           # SEO Site haritası
└── README.md             # Bu dosya
```

## 🏥 Klinik Bilgileri

| Bilgi | Detay |
|---|---|
| **Poliklinik Adı** | Özel MKS Ağız ve Diş Sağlığı Polikliniği |
| **Telefon** | 0 533 575 23 77 |
| **Adres** | Ovacık Mahallesi, 550.cadde, No:9/a Vip Tower Bulvar, Keçiören/Ankara |
| **Çalışma Saatleri** | Her Gün: 09:00 – 00:00 |
| **E-posta** | info@mkspoliklinik.com |
| **Sosyal Medya** | [Instagram @mkspoliklinik](https://www.instagram.com/mkspoliklinik/) |

## 🔧 Kurulum ve Çalıştırma

### 1. Backend Sunucusunu Başlatma
Dinamik blog ve vaka yönetimi için backend sunucusunu ayağa kaldırın:
```bash
cd backend
npm install
npm run dev
```

### 2. Arayüzü İnceleme
Ana dizindeki `index.html` dosyasını tarayıcınızda açabilir veya yerel bir sunucu (Live Server vb.) aracılığıyla çalıştırabilirsiniz.

---

*Özel MKS Ağız ve Diş Sağlığı Polikliniği © 2026 — Tüm Hakları Saklıdır.*
