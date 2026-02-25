import { MdOutlineFolderCopy } from 'react-icons/md';
import { PiSoccerBallFill } from 'react-icons/pi';
import { MdOutlineGroups } from 'react-icons/md';
import { IoMicOutline } from 'react-icons/io5';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { LuCircleUserRound } from 'react-icons/lu';
import { MdOutlineHome } from 'react-icons/md';
import { titles } from '..';

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
          title: 'Notices',
          url: '#',
        },
        {
          title: 'Circulars',
          url: '#',
        },
        {
          title: 'Tenders',
          url: '#',
        },
        {
          title: 'Advertisements',
          url: '#',
        },
        {
          title: 'Guiding Principles',
          url: '#',
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
          url: '#',
        },
        {
          title: 'Awards',
          url: '#',
        },
      ],
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
