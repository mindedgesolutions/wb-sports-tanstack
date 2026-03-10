export interface PlayerAchievementsProps {
  id: number;
  sport: string;
  name: string;
  slug: string;
  description: string;
  achievementDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// -----------------------------

export interface AwardsProps {
  id: number;
  name: string;
  slug: string;
  fileName: string;
  filePath: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
