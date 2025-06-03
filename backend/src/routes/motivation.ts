import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// Get daily motivation message
router.get('/daily', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Mock motivation message for now
    const motivation = {
      id: 1,
      message: "You're stronger than you think! Every workout is a step closer to your goals.",
      type: 'daily',
      date: new Date().toISOString().split('T')[0]
    };

    res.json({
      success: true,
      data: motivation
    });
  } catch (error) {
    next(error);
  }
});

// Get motivational tips
router.get('/tips', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Mock tips for now
    const tips = [
      {
        id: 1,
        title: "Stay Consistent",
        content: "Consistency beats perfection. Even 15 minutes of exercise is better than none.",
        category: "mindset"
      },
      {
        id: 2,
        title: "Track Your Progress",
        content: "Take photos, measurements, and note how you feel. Progress isn't always visible on the scale.",
        category: "tracking"
      },
      {
        id: 3,
        title: "Rest and Recovery",
        content: "Your muscles grow during rest, not during workouts. Make sure to get adequate sleep.",
        category: "recovery"
      }
    ];

    res.json({
      success: true,
      data: tips
    });
  } catch (error) {
    next(error);
  }
});

// Get personalized motivation based on user progress
router.get('/personalized', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Mock personalized motivation for now
    const motivation = {
      id: 1,
      message: "You've completed 3 workouts this week! You're crushing your goals!",
      type: 'achievement',
      basedOn: 'weekly_progress'
    };

    res.json({
      success: true,
      data: motivation
    });
  } catch (error) {
    next(error);
  }
});

export default router; 