const express = require('express');
const router = express.Router();
const mysqlPool = require('../config/mysql');
const { client: redisClient } = require('../config/redis');
const VideoProgress = require('../models/VideoProgress');
const TryoutRecord = require('../models/TryoutRecord');

const SCORING_SERVICE_URL = process.env.SCORING_SERVICE_URL || 'http://localhost:8080';

// Helper to fetch accuracy from Go service
async function fetchAccuracyFromGo(userId) {
  try {
    const res = await fetch(`${SCORING_SERVICE_URL}/api/accuracy/${userId}`, {
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) {
      throw new Error(`Scoring service responded with status ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn(`[Node API] Fallback: Go scoring service unavailable (${error.message}). Computing locally.`);
    // Fallback: calculate from MongoDB directly
    const records = await TryoutRecord.find({ userId }).sort({ takenAt: -1 });
    let totalQuestions = 0;
    let totalCorrect = 0;
    let latestScore = records[0] ? records[0].score : 0;
    const catMap = {};

    records.forEach(r => {
      totalQuestions += r.totalQuestions;
      totalCorrect += r.correctAnswers;
      if (!catMap[r.category]) {
        catMap[r.category] = { category: r.category, correct: 0, total: 0 };
      }
      catMap[r.category].correct += r.correctAnswers;
      catMap[r.category].total += r.totalQuestions;
    });

    const accuracyPercentage = totalQuestions > 0 
      ? Math.round((totalCorrect / totalQuestions) * 1000) / 10 
      : 0;

    const categories = Object.values(catMap).map(c => ({
      category: c.category,
      correct: c.correct,
      total: c.total,
      accuracy: c.total > 0 ? Math.round((c.correct / c.total) * 1000) / 10 : 0
    }));

    return {
      userId,
      totalTryouts: records.length,
      totalQuestions,
      totalCorrect,
      accuracyPercentage,
      latestScore,
      categories
    };
  }
}

// GET /api/dashboard/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const cacheKey = `dashboard:${userId}`;

  try {
    // 1. Check Redis cache
    if (redisClient && redisClient.isReady) {
      try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
          return res.json({
            status: 'success',
            cache: 'HIT',
            data: JSON.parse(cached)
          });
        }
      } catch (err) {
        console.warn('[Redis] Cache lookup failed, proceeding to databases', err.message);
      }
    }

    // 2. Fetch User Profile & Active Package from MySQL
    const [userRows] = await mysqlPool.query(
      'SELECT id, name, email, role, avatar_url, target_major, target_university FROM users WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    const user = userRows[0];

    const [pkgRows] = await mysqlPool.query(
      'SELECT package_id, package_title, category, status, valid_until FROM user_packages WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    const activePackage = pkgRows[0] || null;

    // 3. Fetch Learning & Video Progress from MongoDB
    const videos = await VideoProgress.find({ userId }).sort({ lastWatchedAt: -1 });
    const totalVideos = videos.length;
    const completedVideos = videos.filter(v => v.completed).length;
    const studyTimeMinutes = videos.reduce((acc, v) => acc + (v.watchedMinutes || 0), 0);
    const videoPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

    // 4. Fetch Tryouts & Call Go Scoring Service
    const accuracyData = await fetchAccuracyFromGo(userId);
    const recentTryouts = await TryoutRecord.find({ userId }).sort({ takenAt: -1 }).limit(5);

    // 5. Structure Complete Dashboard Data
    const dashboardData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar_url,
        targetMajor: user.target_major,
        targetUniversity: user.target_university
      },
      activePackage: activePackage ? {
        id: activePackage.package_id,
        title: activePackage.package_title,
        category: activePackage.category,
        status: activePackage.status === 'active' ? 'Aktif' : 'Kedaluwarsa',
        validUntil: activePackage.valid_until
      } : {
        id: null,
        title: 'Belum Ada Paket',
        category: 'Non-aktif',
        status: 'Tidak Aktif',
        validUntil: null
      },
      learningProgress: {
        totalVideos,
        completedVideos,
        percentage: videoPercentage,
        studyTimeMinutes,
        recentVideos: videos.slice(0, 4).map(v => ({
          id: v.videoId,
          title: v.title,
          subject: v.subject,
          duration: `${v.durationMinutes} mnt`,
          completed: v.completed
        }))
      },
      accuracy: {
        percentage: accuracyData.accuracyPercentage,
        totalQuestions: accuracyData.totalQuestions,
        totalCorrect: accuracyData.totalCorrect,
        totalTryouts: accuracyData.totalTryouts,
        latestScore: accuracyData.latestScore,
        categories: accuracyData.categories
      },
      recentTryouts: recentTryouts.map(t => ({
        id: t.tryoutId,
        title: t.tryoutTitle,
        category: t.category,
        score: t.score,
        accuracy: Math.round((t.correctAnswers / t.totalQuestions) * 100),
        date: t.takenAt
      }))
    };

    // 6. Cache in Redis (TTL 60s)
    if (redisClient && redisClient.isReady) {
      try {
        await redisClient.setEx(cacheKey, 60, JSON.stringify(dashboardData));
      } catch (err) {
        console.warn('[Redis] Failed to cache data', err.message);
      }
    }

    return res.json({
      status: 'success',
      cache: 'MISS',
      data: dashboardData
    });

  } catch (error) {
    console.error('[Node API] Error fetching dashboard data:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', detail: error.message });
  }
});

module.exports = router;
