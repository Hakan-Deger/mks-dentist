const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'clinic.db');

let dbPromise = null;

async function initDB() {
  if (dbPromise) return dbPromise;

  dbPromise = open({
    filename: DB_PATH,
    driver: sqlite3.Database
  }).then(async (db) => {
    // Performans ayarları
    await db.exec('PRAGMA journal_mode = WAL');
    await db.exec('PRAGMA foreign_keys = ON');

    // Tablolar
    await db.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT    NOT NULL,
        slug        TEXT    NOT NULL UNIQUE,
        excerpt     TEXT,
        content     TEXT    NOT NULL,
        cover_image TEXT,
        category    TEXT    DEFAULT 'Genel',
        published   INTEGER DEFAULT 1,
        created_at  TEXT    DEFAULT (datetime('now','localtime')),
        updated_at  TEXT    DEFAULT (datetime('now','localtime'))
      );

      CREATE TABLE IF NOT EXISTS before_after (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_name TEXT,
        treatment   TEXT    NOT NULL,
        description TEXT,
        before_img  TEXT    NOT NULL,
        after_img   TEXT    NOT NULL,
        published   INTEGER DEFAULT 1,
        created_at  TEXT    DEFAULT (datetime('now','localtime'))
      );
    `);

    // Örnek veri kontrolü
    const postCount = await db.get('SELECT COUNT(*) as c FROM blog_posts');
    if (postCount.c === 0) {
      const stmt = await db.prepare(`
        INSERT INTO blog_posts (title, slug, excerpt, content, category)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      await stmt.run(
        'İmplant Tedavisinde Merak Edilenler',
        'implant-tedavisinde-merak-edilenler',
        'Ağrılı mı? Ne kadar sürer? İmplant hakkında en sık sorulan soruların yanıtları burada.',
        '<p>Dental implant, kayıp bir dişin yerine yerleştirilen titanyum bir vida ve üzerine monte edilen porselen bir krondan oluşur. Modern implant tedavisi, lokal anestezi altında ağrısız şekilde gerçekleştirilir.</p><h2>Ne kadar sürer?</h2><p>İmplant yerleştirme işlemi genellikle 30-60 dakika arasında tamamlanır. Kemik ile kaynaşma süreci (osseintegrasyon) 3-6 ay sürer.</p>',
        'İmplant'
      );
      await stmt.run(
        'Diş Beyazlatma: Hangisi Daha Etkili?',
        'dis-beyazlatma-hangisi-daha-etkili',
        'Klinikte yapılan ve evde uygulanan beyazlatma yöntemlerini karşılaştırıyoruz.',
        '<p>Diş beyazlatma, diş minesindeki lekeleri ve renk değişikliklerini gidermek için uygulanan kozmetik bir işlemdir.</p><h2>Klinik Beyazlatma</h2><p>LED ışık destekli profesyonel beyazlatma, tek seansta 3-8 ton açılma sağlar.</p>',
        'Estetik'
      );
      await stmt.run(
        'Zirkonyum mu, E-Max mı?',
        'zirkonyum-mu-e-max-mi',
        'Protetik tedavide en çok tercih edilen iki seçeneği karşılaştırıyoruz.',
        '<p>Hem zirkonyum hem de E-Max (lityum disilikat) modern diş hekimliğinde yaygın kullanılan seramik materyallerdir.</p><h2>Zirkonyum</h2><p>Dayanıklılığı ve beyazlığıyla öne çıkan zirkonyum, arka dişlerde tercih edilir.</p>',
        'Protetik'
      );
      await stmt.run(
        'Çocuklarda Diş Sağlığı',
        'cocuklarda-dis-sagligi',
        'İlk diş muayenesi ne zaman yapılmalı? Çocuğunuzun sağlıklı gülüşü için erken adımlar.',
        '<p>Çocuklarda ilk diş muayenesi, ilk dişin çıkmasıyla birlikte veya en geç 1 yaşında yapılmalıdır.</p>',
        'Çocuk Diş'
      );
      await stmt.finalize();
    }
    
    return db;
  });

  return dbPromise;
}

module.exports = { getDb: initDB };
