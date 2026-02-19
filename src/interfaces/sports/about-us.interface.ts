export interface AchievementsProps {
  id: number;
  title: string;
  description: string | null;
  achievementDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------

export interface AdminStructureProps {
  id: number;
  name: string;
  isActive: boolean;
}

// -------------------

export interface KeyPersonnelProps {
  id: number;
  name: string;
  rank: string | null;
  designation: string;
  img: string | null;
  isActive: boolean;
}
