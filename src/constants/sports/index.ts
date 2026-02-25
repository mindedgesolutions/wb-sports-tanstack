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
    create: `/sports/wbs-council-designations`,
    list: `/sports/wbs-council-designations`,
    listAll: `/sports/wbs-council-designations/all`,
    listSort: `/sports/wbs-council-designations/sort`,
    update: (id: number) => `/sports/wbs-council-designations/${id}`,
    delete: (id: number) => `/sports/wbs-council-designations/${id}`,
    toggle: (id: number) => `/sports/wbs-council-designations/toggle/${id}`,
  },
};
