export interface WbsCouncilSportsDesignationProps {
  id: number;
  boardType: string;
  name: string;
  slug: string;
  isActive: boolean;
  show: number;
}

// ----------------------

interface CDesignation {
  name: string;
}

// ----------------------

export interface WbsCouncilMemberProps {
  id: number;
  boardType: string;
  designationId: string;
  designationLabel?: string | null;
  name: string;
  slug: string;
  address?: string;
  phone?: string;
  email?: string;
  fax?: string;
  img?: string;
  isActive: boolean;
  cDesignation: CDesignation;
}
