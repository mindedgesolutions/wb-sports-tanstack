import loginBgSports from '@/assets/images/login-bg-sports.jpg';
import registerBgSports from '@/assets/images/register.jpg';
import defaultProfileImg from '@/assets/images/profile.jpg';

export const titles = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  APP_TITLE_SPORTS: import.meta.env.VITE_APP_TITLE_SPORTS,
  BASE_LINK_SPORTS: import.meta.env.VITE_BASE_LINK_SPORTS,
  ACCESS_TOKEN: import.meta.env.VITE_ACCESS_TOKEN,
  IMAGE_URL: import.meta.env.VITE_IMAGE_URL,
};

// -------------------

export const images = { loginBgSports, registerBgSports, defaultProfileImg };

// -------------------

export const departments = [
  { label: 'Sports', value: 'sports' },
  { label: 'Services', value: 'services' },
];

// -------------------

export const sportsCategories = [
  { label: 'Football', value: 'football' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Hockey', value: 'hockey' },
  { label: 'Lawn Tennis', value: 'lawn-tennis' },
  { label: 'Swimming', value: 'swimming' },
  { label: 'Table Tennis', value: 'table-tennis' },
  { label: 'Archery', value: 'archery' },
  { label: 'Body Building', value: 'body-building' },
  { label: 'Chess', value: 'chess' },
  { label: 'Boxing', value: 'boxing' },
  { label: 'Athletics', value: 'athletics' },
  { label: 'Gymnastic', value: 'gymnastic' },
];

// -------------------

export const spBoardTypes = [
  {
    label: 'Advisory Board',
    value: 'advisory_board',
    dbValue: 'advisory-board',
  },
  {
    label: 'Working Committee',
    value: 'working_committee',
    dbValue: 'working-committee',
  },
];

// -------------------

export const spAnnouncementTypes = [
  { label: 'News', value: 'news' },
  { label: 'Tender', value: 'tender' },
  { label: 'Circular', value: 'circular' },
];
