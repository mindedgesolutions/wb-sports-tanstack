export interface AssociationProps {
  id: number;
  name: string;
  slug: string;
  address: string;
  website: string;
  email: string;
  phoneOne: string;
  phoneTwo: string;
  fax: string;
  logo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
