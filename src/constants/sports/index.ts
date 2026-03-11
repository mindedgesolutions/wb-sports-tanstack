export const aboutUs = {
  achievements: {
    create: `/sports/about-us/achievements`,
    list: `/sports/about-us/achievements`,
    update: (id: number) => `/sports/about-us/achievements/${id}`,
    delete: (id: number) => `/sports/about-us/achievements/${id}`,
    toggle: (id: number) => `/sports/about-us/achievements/toggle/${id}`,
  },
  adminStructure: {
    create: `/sports/about-us/admin-structure`,
    list: `/sports/about-us/admin-structure`,
    listAll: `/sports/about-us/admin-structure/all`,
    listSort: `/sports/about-us/admin-structure/sort`,
    update: (id: number) => `/sports/about-us/admin-structure/${id}`,
    delete: (id: number) => `/sports/about-us/admin-structure/${id}`,
    toggle: (id: number) => `/sports/about-us/admin-structure/toggle/${id}`,
  },
  keyPersonnel: {
    create: `/sports/about-us/key-personnel`,
    list: `/sports/about-us/key-personnel`,
    listAll: `/sports/about-us/key-personnel/all`,
    listSort: `/sports/about-us/key-personnel/sort`,
    update: (id: number) => `/sports/about-us/key-personnel/${id}`,
    delete: (id: number) => `/sports/about-us/key-personnel/${id}`,
    toggle: (id: number) => `/sports/about-us/key-personnel/toggle/${id}`,
  },
};

// ----------------------

export const sports = {
  sportsPersonnel: {
    create: `/sports/sports/sports-personnel`,
    list: `/sports/sports/sports-personnel`,
    update: (id: number) => `/sports/sports/sports-personnel/${id}`,
    delete: (id: number) => `/sports/sports/sports-personnel/${id}`,
    toggle: (id: number) => `/sports/sports/sports-personnel/toggle/${id}`,
  },
  events: {
    create: `/sports/sports/sports-events`,
    list: `/sports/sports/sports-events`,
    update: (id: number) => `/sports/sports/sports-events/${id}`,
    delete: (id: number) => `/sports/sports/sports-events/${id}`,
    toggle: (id: number) => `/sports/sports/sports-events/toggle/${id}`,
  },
};

// ----------------------

export const wbsCouncilSports = {
  designations: {
    create: `/sports/wbs-council-sports/designations`,
    list: `/sports/wbs-council-sports/designations`,
    listAll: `/sports/wbs-council-sports/designations/all`,
    listSort: `/sports/wbs-council-sports/designations/sort`,
    update: (id: number) => `/sports/wbs-council-sports/designations/${id}`,
    delete: (id: number) => `/sports/wbs-council-sports/designations/${id}`,
    toggle: (id: number) =>
      `/sports/wbs-council-sports/designations/toggle/${id}`,
  },
  members: {
    create: `/sports/wbs-council-sports/advisory-working`,
    list: `/sports/wbs-council-sports/advisory-working`,
    update: (id: number) => `/sports/wbs-council-sports/advisory-working/${id}`,
    delete: (id: number) => `/sports/wbs-council-sports/advisory-working/${id}`,
    toggle: (id: number) =>
      `/sports/wbs-council-sports/advisory-working/toggle/${id}`,
  },
};

// ----------------------

export const announcements = {
  announcements: {
    create: `/sports/announcements/announcements`,
    list: `/sports/announcements/announcements`,
    update: (id: number) => `/sports/announcements/announcements/${id}`,
    delete: (id: number) => `/sports/announcements/announcements/${id}`,
    toggle: (id: number) => `/sports/announcements/announcements/toggle/${id}`,
    download: (filePath: string) =>
      `/sports/announcements/announcements/download/${filePath}`,
  },
  advertisements: {
    create: `/sports/announcements/advertisements`,
    list: `/sports/announcements/advertisements`,
    update: (id: number) => `/sports/announcements/advertisements/${id}`,
    delete: (id: number) => `/sports/announcements/advertisements/${id}`,
    toggle: (id: number) => `/sports/announcements/advertisements/toggle/${id}`,
    download: (filePath: string) =>
      `/sports/announcements/advertisements/download/${filePath}`,
  },
};

// ----------------------

export const achievementsAwards = {
  playerAchievements: {
    create: `/sports/achievements-awards/player-achievements`,
    list: `/sports/achievements-awards/player-achievements`,
    update: (id: number) =>
      `/sports/achievements-awards/player-achievements/${id}`,
    delete: (id: number) =>
      `/sports/achievements-awards/player-achievements/${id}`,
    toggle: (id: number) =>
      `/sports/achievements-awards/player-achievements/toggle/${id}`,
  },
  awards: {
    create: `/sports/achievements-awards/awards`,
    list: `/sports/achievements-awards/awards`,
    update: (id: number) => `/sports/achievements-awards/awards/${id}`,
    delete: (id: number) => `/sports/achievements-awards/awards/${id}`,
    toggle: (id: number) => `/sports/achievements-awards/awards/toggle/${id}`,
    download: (filePath: string) =>
      `/sports/achievements-awards/awards/download/${filePath}`,
  },
};

// ----------------------

export const informationAbout = {
  stadiums: {
    create: `/sports/information-about/stadiums`,
    list: `/sports/information-about/stadiums`,
    update: (id: number) => `/sports/information-about/stadiums/${id}`,
    delete: (id: number) => `/sports/information-about/stadiums/${id}`,
    toggle: (id: number) => `/sports/information-about/stadiums/toggle/${id}`,
    single: (id: number) => `/sports/information-about/stadiums/${id}`,
  },
};
