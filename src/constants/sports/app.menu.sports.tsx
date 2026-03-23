import { MdOutlineFolderCopy } from 'react-icons/md';
import { PiSoccerBallFill } from 'react-icons/pi';
import { MdOutlineGroups } from 'react-icons/md';
import { IoMicOutline } from 'react-icons/io5';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { LuCircleUserRound } from 'react-icons/lu';
import { MdOutlineHome } from 'react-icons/md';
import { titles } from '..';
import { Headphones, Images, Info, Newspaper, Rss } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const sportsAppMenu = () => {
  const { pathname } = useLocation();

  const spAppMenu = {
    navMain: [
      {
        title: 'Dashboard',
        url: `${titles.BASE_LINK_SPORTS}/dashboard`,
        icon: MdOutlineHome,
        isActive: pathname === `${titles.BASE_LINK_SPORTS}/dashboard`,
      },
      {
        title: 'About Us',
        url: '#',
        icon: MdOutlineFolderCopy,
        isActive:
          pathname.includes(`${titles.BASE_LINK_SPORTS}/about-us/`) ?? false,
        items: [
          {
            title: 'Vision & Mission',
            url: `${titles.BASE_LINK_SPORTS}/about-us/vision-mission`,
          },
          {
            title: 'Sports in Bengal',
            url: `${titles.BASE_LINK_SPORTS}/about-us/sports-in-bengal`,
          },
          {
            title: 'Administrative Structure',
            url: `${titles.BASE_LINK_SPORTS}/about-us/administrative-structure`,
          },
          {
            title: 'Key Personnel',
            url: `${titles.BASE_LINK_SPORTS}/about-us/key-personnel`,
          },
          {
            title: 'Achievements',
            url: `${titles.BASE_LINK_SPORTS}/about-us/achievements`,
          },
        ],
      },
      {
        title: 'Sports',
        url: '#',
        icon: PiSoccerBallFill,
        isActive:
          pathname.includes(`${titles.BASE_LINK_SPORTS}/sports/`) ?? false,
        items: [
          {
            title: 'Sports Categories',
            url: `${titles.BASE_LINK_SPORTS}/sports/sports-categories`,
          },
          {
            title: 'Sports Personnel',
            url: `${titles.BASE_LINK_SPORTS}/sports/sports-personnel`,
          },
          {
            title: 'Sports Events',
            url: `${titles.BASE_LINK_SPORTS}/sports/sports-events`,
          },
          {
            title: 'Sports Infrastructure',
            url: `${titles.BASE_LINK_SPORTS}/sports/sports-infrastructure`,
          },
        ],
      },
      {
        title: 'WBS Council of Sports',
        url: '#',
        icon: MdOutlineGroups,
        isActive:
          pathname.includes(`${titles.BASE_LINK_SPORTS}/wbs-council/`) ?? false,
        items: [
          {
            title: 'Add / Edit Designations',
            url: `${titles.BASE_LINK_SPORTS}/wbs-council/add-edit-designations`,
          },
          {
            title: 'WBS Council Members',
            url: `${titles.BASE_LINK_SPORTS}/wbs-council/wbs-council-members`,
          },
          {
            title: 'Events',
            url: `${titles.BASE_LINK_SPORTS}/wbs-council/wbc-events`,
          },
          {
            title: 'Khelo India',
            url: `${titles.BASE_LINK_SPORTS}/wbs-council/khelo-india`,
          },
        ],
      },
      {
        title: 'Announcements',
        url: '#',
        icon: IoMicOutline,
        isActive:
          pathname.includes(`${titles.BASE_LINK_SPORTS}/announcements/`) ??
          false,
        items: [
          {
            title: 'Announcements',
            url: `${titles.BASE_LINK_SPORTS}/announcements/announcements`,
          },
          {
            title: 'Advertisements',
            url: `${titles.BASE_LINK_SPORTS}/announcements/advertisements`,
          },
          {
            title: 'Guiding Principles',
            url: `${titles.BASE_LINK_SPORTS}/announcements/guiding-principles`,
          },
        ],
      },
      {
        title: 'Achievements & Awards',
        url: '#',
        icon: HiOutlineTrophy,
        isActive:
          pathname.includes(
            `${titles.BASE_LINK_SPORTS}/achievements-awards/`,
          ) ?? false,
        items: [
          {
            title: 'Players Achievements',
            url: `${titles.BASE_LINK_SPORTS}/achievements-awards/players-achievements`,
          },
          {
            title: 'Awards',
            url: `${titles.BASE_LINK_SPORTS}/achievements-awards/awards`,
          },
        ],
      },
      {
        title: 'Information About',
        url: '#',
        icon: Info,
        isActive:
          pathname.includes(`${titles.BASE_LINK_SPORTS}/info-about/`) ?? false,
        items: [
          {
            title: 'Stadiums',
            url: `${titles.BASE_LINK_SPORTS}/info-about/stadiums`,
          },
          {
            title: 'Associations',
            url: `${titles.BASE_LINK_SPORTS}/info-about/associations`,
          },
          {
            title: 'FIFA U-17 World Cup',
            url: `${titles.BASE_LINK_SPORTS}/info-about/awards`,
          },
          {
            title: 'Sports Policies',
            url: `${titles.BASE_LINK_SPORTS}/info-about/awards`,
          },
          {
            title: 'Associated Sites',
            url: `${titles.BASE_LINK_SPORTS}/info-about/awards`,
          },
        ],
      },
      {
        title: 'Moments',
        url: '#',
        icon: Images,
        items: [
          {
            title: 'Photo Gallery',
            url: `${titles.BASE_LINK_SPORTS}/players-achievements`,
          },
          {
            title: 'Audio Visuals',
            url: `${titles.BASE_LINK_SPORTS}/awards`,
          },
          {
            title: 'Bulletins',
            url: `${titles.BASE_LINK_SPORTS}/awards`,
          },
          {
            title: 'Amphan',
            url: `${titles.BASE_LINK_SPORTS}/awards`,
          },
        ],
      },
      {
        title: 'RTI',
        url: '#',
        icon: Rss,
        items: [
          {
            title: 'Notices',
            url: `${titles.BASE_LINK_SPORTS}/players-achievements`,
          },
        ],
      },
      {
        title: 'Contact Us',
        url: `${titles.BASE_LINK_SPORTS}/dashboard`,
        icon: Headphones,
        isActive: true,
      },
      {
        title: 'New Scroller (Homepage)',
        url: `${titles.BASE_LINK_SPORTS}/dashboard`,
        icon: Newspaper,
        isActive: true,
      },
    ],
    settings: [
      {
        title: 'Profile',
        url: '#',
        icon: LuCircleUserRound,
        isActive: true,
        items: [
          {
            title: 'Personal Information',
            url: '#',
          },
          {
            title: 'Change Password',
            url: '#',
          },
        ],
      },
    ],
  };

  return spAppMenu;
};
