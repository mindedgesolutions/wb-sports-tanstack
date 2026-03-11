import { MdOutlineFolderCopy } from 'react-icons/md';
import { PiSoccerBallFill } from 'react-icons/pi';
import { MdOutlineGroups } from 'react-icons/md';
import { IoMicOutline } from 'react-icons/io5';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { LuCircleUserRound } from 'react-icons/lu';
import { MdOutlineHome } from 'react-icons/md';
import { titles } from '..';
import { Headphones, Images, Info, Newspaper, Rss } from 'lucide-react';

export const sportsAppMenu = {
  navMain: [
    {
      title: 'Dashboard',
      url: `${titles.BASE_LINK_SPORTS}/dashboard`,
      icon: MdOutlineHome,
      isActive: true,
    },
    {
      title: 'About Us',
      url: '#',
      icon: MdOutlineFolderCopy,
      items: [
        {
          title: 'Vision & Mission',
          url: `${titles.BASE_LINK_SPORTS}/vision-mission`,
        },
        {
          title: 'Sports in Bengal',
          url: `${titles.BASE_LINK_SPORTS}/sports-in-bengal`,
        },
        {
          title: 'Administrative Structure',
          url: `${titles.BASE_LINK_SPORTS}/administrative-structure`,
        },
        {
          title: 'Key Personnel',
          url: `${titles.BASE_LINK_SPORTS}/key-personnel`,
        },
        {
          title: 'Achievements',
          url: `${titles.BASE_LINK_SPORTS}/achievements`,
        },
      ],
    },
    {
      title: 'Sports',
      url: '#',
      icon: PiSoccerBallFill,
      items: [
        {
          title: 'Sports Categories',
          url: `${titles.BASE_LINK_SPORTS}/sports-categories`,
        },
        {
          title: 'Sports Personnel',
          url: `${titles.BASE_LINK_SPORTS}/sports-personnel`,
        },
        {
          title: 'Sports Events',
          url: `${titles.BASE_LINK_SPORTS}/sports-events`,
        },
        {
          title: 'Sports Infrastructure',
          url: `${titles.BASE_LINK_SPORTS}/sports-infrastructure`,
        },
      ],
    },
    {
      title: 'WBS Council of Sports',
      url: '#',
      icon: MdOutlineGroups,
      items: [
        {
          title: 'Add / Edit Designations',
          url: `${titles.BASE_LINK_SPORTS}/add-edit-designations`,
        },
        {
          title: 'WBS Council Members',
          url: `${titles.BASE_LINK_SPORTS}/wbs-council-members`,
        },
        {
          title: 'Events',
          url: `${titles.BASE_LINK_SPORTS}/wbc-events`,
        },
        {
          title: 'Khelo India',
          url: `${titles.BASE_LINK_SPORTS}/khelo-india`,
        },
      ],
    },
    {
      title: 'Announcements',
      url: '#',
      icon: IoMicOutline,
      items: [
        {
          title: 'Announcements',
          url: `${titles.BASE_LINK_SPORTS}/announcements`,
        },
        {
          title: 'Advertisements',
          url: `${titles.BASE_LINK_SPORTS}/advertisements`,
        },
        {
          title: 'Guiding Principles',
          url: `${titles.BASE_LINK_SPORTS}/guiding-principles`,
        },
      ],
    },
    {
      title: 'Achievements & Awards',
      url: '#',
      icon: HiOutlineTrophy,
      items: [
        {
          title: 'Players Achievements',
          url: `${titles.BASE_LINK_SPORTS}/players-achievements`,
        },
        {
          title: 'Awards',
          url: `${titles.BASE_LINK_SPORTS}/awards`,
        },
      ],
    },
    {
      title: 'Information About',
      url: '#',
      icon: Info,
      items: [
        {
          title: 'Stadiums',
          url: `${titles.BASE_LINK_SPORTS}/stadiums`,
        },
        {
          title: 'Associations',
          url: `${titles.BASE_LINK_SPORTS}/awards`,
        },
        {
          title: 'FIFA U-17 World Cup',
          url: `${titles.BASE_LINK_SPORTS}/awards`,
        },
        {
          title: 'Sports Policies',
          url: `${titles.BASE_LINK_SPORTS}/awards`,
        },
        {
          title: 'Associated Sites',
          url: `${titles.BASE_LINK_SPORTS}/awards`,
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
