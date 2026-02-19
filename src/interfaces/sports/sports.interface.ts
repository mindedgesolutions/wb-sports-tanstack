export interface SportsPersonnelProps {
  id: number;
  sport: string;
  name: string;
  address: string | null;
  dob: Date | null;
  contactOne: string | null;
  contactTwo: string | null;
  isActive: boolean;
}
