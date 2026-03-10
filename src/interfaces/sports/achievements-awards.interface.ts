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
