const express = require('express');
const router = express.Router();
const { getDb } = require('../database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/cases')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const type = file.fieldname;
    cb(null, `${type}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const { treatment, limit = 12, offset = 0 } = req.query;
    let query = 'SELECT * FROM before_after WHERE published = 1';
    const params = [];
    if (treatment) { query += ' AND treatment = ?'; params.push(treatment); }
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const cases = await db.all(query, params);
    const totalResult = await db.get('SELECT COUNT(*) as c FROM before_after WHERE published = 1');
    res.json({ cases, total: totalResult.c });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const db = await getDb();
    const cases = await db.all('SELECT * FROM before_after ORDER BY created_at DESC');
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const c = await db.get('SELECT * FROM before_after WHERE id = ?', req.params.id);
    if (!c) return res.status(404).json({ error: 'Vaka bulunamadı' });
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.fields([
  { name: 'before_img', maxCount: 1 },
  { name: 'after_img',  maxCount: 1 }
]), async (req, res) => {
  try {
    const { patient_name, treatment, description, published } = req.body;
    if (!treatment) return res.status(400).json({ error: 'Tedavi türü zorunludur' });
    if (!req.files?.before_img || !req.files?.after_img)
      return res.status(400).json({ error: 'Öncesi ve sonrası görseller zorunludur' });

    const before_img = `/uploads/cases/${req.files.before_img[0].filename}`;
    const after_img  = `/uploads/cases/${req.files.after_img[0].filename}`;

    const db = await getDb();
    const result = await db.run(`
      INSERT INTO before_after (patient_name, treatment, description, before_img, after_img, published)
      VALUES (?, ?, ?, ?, ?, ?)
    `, patient_name || 'Anonim', treatment, description || '', before_img, after_img, published === '0' ? 0 : 1);
    
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.fields([
  { name: 'before_img', maxCount: 1 },
  { name: 'after_img',  maxCount: 1 }
]), async (req, res) => {
  try {
    const db = await getDb();
    const existing = await db.get('SELECT * FROM before_after WHERE id = ?', req.params.id);
    if (!existing) return res.status(404).json({ error: 'Vaka bulunamadı' });

    const { patient_name, treatment, description, published } = req.body;
    const before_img = req.files?.before_img ? `/uploads/cases/${req.files.before_img[0].filename}` : existing.before_img;
    const after_img  = req.files?.after_img  ? `/uploads/cases/${req.files.after_img[0].filename}`  : existing.after_img;

    await db.run(`
      UPDATE before_after SET patient_name=?, treatment=?, description=?, before_img=?, after_img=?, published=?
      WHERE id=?
    `, patient_name || existing.patient_name, treatment || existing.treatment,
       description ?? existing.description, before_img, after_img,
       published !== undefined ? Number(published) : existing.published, req.params.id);
       
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.run('DELETE FROM before_after WHERE id = ?', req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Vaka bulunamadı' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
