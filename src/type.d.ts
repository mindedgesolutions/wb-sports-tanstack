interface MenuProps {
  title: string;
  url?: string;
  icon: React.ElementType;
  isActive?: boolean;
  items?: SubmenuProps[];
}

interface SubmenuProps {
  title: string;
  url: string;
  isActive?: boolean;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  department: string;
  profileImg?: string;
}

interface PaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
}
