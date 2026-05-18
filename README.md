# Çilesiz & Karşıt Diş Muayenehanesi — Web Sitesi

Sivas'ta hizmet veren **Çilesiz & Karşıt Diş Muayenehanesi** için hazırlanmış, tek dosyadan oluşan modern ve tam responsive klinik web sitesi.

## 🦷 Özellikler

- **Tek HTML dosyası** — harici kütüphane yok, build adımı yok
- **Tüm CSS** `<style>` bloğunda, **tüm JS** `<script>` bloğunda
- **Google Fonts**: DM Serif Display + Inter
- **Animasyon sistemi**: `IntersectionObserver` tabanlı scroll reveal, CSS keyframe hero animasyonları
- **Tamamen responsive** — masaüstü, tablet ve mobil uyumlu
- **Hamburger menü** — mobil için slide-in overlay menü
- **Count-up sayaç** — 3.000+ mutlu hasta animasyonlu sayım
- **Hizmetler bölümü** — hover'da fotoğraf değişimi (10 hizmet)
- **Randevu formu** — doğrulama + başarı mesajı
- **Ekip slider'ı** — ← → buton navigasyonu

## 📁 Proje Yapısı

```
cilesiz-karsit-dental/
├── index.html          # Ana HTML dosyası
├── css/
│   └── style.css       # Tüm stiller (reset, layout, bileşenler, responsive)
├── js/
│   └── main.js         # Tüm JavaScript (navbar, slider, form, animasyonlar)
├── assets/
│   └── hero-dentist.png  # Ana sayfa hero görseli
├── README.md           # Bu dosya
└── .gitignore          # Git dışı tutulacak dosyalar
```

## 🏥 Klinik Bilgileri

| Bilgi | Detay |
|---|---|
| **Klinik** | Çilesiz & Karşıt Diş Muayenehanesi |
| **Telefon** | 0501 648 83 58 |
| **Adres** | Eskikale Mah. 13/3. Sokak, Elagöz İş Merkezi, Kat:1 No:2, Sivas/Merkez |
| **Konum** | Hoca İmam Camii Karşısı |
| **Pzt–Cmt** | 09:00 – 20:00 |
| **Pazar** | 12:00 – 18:00 |

## 🔧 Kullanım

1. `index.html` dosyasını tarayıcıda çift tıklayarak açın
2. Herhangi bir kurulum veya sunucu gerekmez

## 🚀 GitHub Pages ile Yayınlama

1. Bu repoyu GitHub'a push edin
2. Repo ayarlarında **Settings → Pages** bölümüne gidin
3. **Branch:** `main`, **Folder:** `/ (root)` seçin
4. Kaydedin — siteniz `https://kullaniciadiniz.github.io/repo-adi` adresinde yayında olacak

## 📸 Görseller Hakkında

Şu anda tüm görseller Unsplash'tan alınmaktadır. Gerçek klinik fotoğraflarını kullanmak için:

- Fotoğrafları `assets/` klasörüne yükleyin
- `index.html` içindeki Unsplash URL'lerini yerel yollarla değiştirin (`assets/foto.jpg` gibi)

## ✏️ İçerik Güncellemesi

- **Doktor adları/fotoğrafları** → HTML'de `#team` bölümü
- **Telefon/adres** → Footer ve `#appointment` bölümü  
- **Çalışma saatleri** → Footer `.footer-hours` bölümü
- **Hizmetler** → `#services` bölümü `.services-list`

---

*Çilesiz & Karşıt Diş Muayenehanesi © 2025*
