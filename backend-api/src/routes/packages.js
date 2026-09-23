const express = require('express');
const router = express.Router();
const mysqlPool = require('../config/mysql');
const { client: redisClient } = require('../config/redis');

// GET /api/packages - get all available packages
router.get('/', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query(
      'SELECT id, title, category, price, original_price, badge, description, features, is_popular FROM packages ORDER BY price ASC'
    );

    const packages = rows.map(pkg => ({
      ...pkg,
      features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features,
      is_popular: Boolean(pkg.is_popular)
    }));

    res.json({
      status: 'success',
      data: packages
    });
  } catch (error) {
    console.error('[Node API] Error fetching packages:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch packages' });
  }
});

// POST /api/packages/purchase - purchase / activate a package
router.post('/purchase', async (req, res) => {
  const { userId, packageId } = req.body;

  if (!userId || !packageId) {
    return res.status(400).json({ status: 'error', message: 'userId and packageId are required' });
  }

  try {
    // Check package
    const [pkgRows] = await mysqlPool.query('SELECT * FROM packages WHERE id = ?', [packageId]);
    if (pkgRows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Package not found' });
    }
    const pkg = pkgRows[0];

    // Check user
    const [userRows] = await mysqlPool.query('SELECT id FROM users WHERE id = ?', [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Set validity to 1 year from now
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1);
    const validUntilStr = validUntil.toISOString().split('T')[0];

    // Insert user package
    await mysqlPool.query(
      `INSERT INTO user_packages (user_id, package_id, package_title, category, status, valid_until)
       VALUES (?, ?, ?, ?, 'active', ?)`,
      [userId, pkg.id, pkg.title, pkg.category, validUntilStr]
    );

    // Invalidate Redis Cache
    if (redisClient && redisClient.isReady) {
      await redisClient.del(`dashboard:${userId}`);
    }

    res.json({
      status: 'success',
      message: `Berhasil berlangganan paket ${pkg.title}!`,
      data: {
        packageId: pkg.id,
        title: pkg.title,
        category: pkg.category,
        validUntil: validUntilStr,
        status: 'Aktif'
      }
    });
  } catch (error) {
    console.error('[Node API] Error processing package purchase:', error);
    res.status(500).json({ status: 'error', message: 'Failed to process package purchase' });
  }
});

module.exports = router;
