import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// Admin authentication middleware
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Mock admin check for now
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Admin access required'
      }
    });
  }
  next();
};

// Apply admin middleware to all routes
router.use(requireAdmin);

// Get dashboard stats
router.get('/dashboard', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Mock dashboard stats for now
    const stats = {
      totalUsers: 1245,
      activeUsers: 892,
      totalWorkouts: 15673,
      totalVideos: 342,
      growthRate: 12.5
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// Get all users with pagination
router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    // Mock users data for now
    const users = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      email: `user${(page - 1) * limit + i + 1}@example.com`,
      name: `User ${(page - 1) * limit + i + 1}`,
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }));

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total: 1245,
          pages: Math.ceil(1245 / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user details
router.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    // Mock user details for now
    const user = {
      id: userId,
      email: `user${userId}@example.com`,
      name: `User ${userId}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      stats: {
        totalWorkouts: Math.floor(Math.random() * 100),
        totalMinutes: Math.floor(Math.random() * 5000),
        streak: Math.floor(Math.random() * 30)
      }
    };

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Update user status
router.patch('/users/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    if (!['active', 'inactive', 'banned'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Status must be active, inactive, or banned'
        }
      });
    }

    // Mock status update for now
    res.json({
      success: true,
      data: {
        id: userId,
        status,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get system health
router.get('/health', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Mock system health for now
    const health = {
      database: 'healthy',
      redis: 'healthy',
      storage: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: health
    });
  } catch (error) {
    next(error);
  }
});

export default router; 