const express = require('express');
const router = express.Router();
const { getDb } = require('../database');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/blog')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `blog-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const { category, limit = 10, offset = 0 } = req.query;
    let query = 'SELECT * FROM blog_posts WHERE published = 1';
    const params = [];
    if (category) { query += ' AND category = ?'; params.push(category); }
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const posts = await db.all(query, params);
    const totalResult = await db.get('SELECT COUNT(*) as c FROM blog_posts WHERE published = 1');
    res.json({ posts, total: totalResult.c });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const db = await getDb();
    const posts = await db.all('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const db = await getDb();
    const post = await db.get('SELECT * FROM blog_posts WHERE slug = ?', req.params.slug);
    if (!post) return res.status(404).json({ error: 'Yazı bulunamadı' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('cover_image'), async (req, res) => {
  try {
    const db = await getDb();
    const { title, excerpt, content, category, published } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Başlık ve içerik zorunludur' });

    const slug = slugify(title, { lower: true, strict: true, locale: 'tr' });
    const cover_image = req.file ? `/uploads/blog/${req.file.filename}` : null;

    const result = await db.run(`
      INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, published)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, title, slug, excerpt || '', content, cover_image, category || 'Genel', published === '0' ? 0 : 1);
    
    res.status(201).json({ id: result.lastID, slug });
  } catch (e) {
    res.status(409).json({ error: 'Bu başlıkta zaten bir yazı var veya hata oluştu' });
  }
});

router.put('/:id', upload.single('cover_image'), async (req, res) => {
  try {
    const db = await getDb();
    const { title, excerpt, content, category, published } = req.body;
    const existing = await db.get('SELECT * FROM blog_posts WHERE id = ?', req.params.id);
    if (!existing) return res.status(404).json({ error: 'Yazı bulunamadı' });

    const cover_image = req.file ? `/uploads/blog/${req.file.filename}` : existing.cover_image;
    const slug = title ? slugify(title, { lower: true, strict: true, locale: 'tr' }) : existing.slug;

    await db.run(`
      UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, cover_image=?, category=?, published=?,
      updated_at=datetime('now','localtime') WHERE id=?
    `, title || existing.title, slug, excerpt ?? existing.excerpt, content || existing.content,
       cover_image, category || existing.category, published !== undefined ? Number(published) : existing.published,
       req.params.id);
       
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.run('DELETE FROM blog_posts WHERE id = ?', req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Yazı bulunamadı' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
