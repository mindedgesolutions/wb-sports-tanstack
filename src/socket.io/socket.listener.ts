import { spAboutUsListeners } from './sports/about-us';
import { spAchievementsAwardsListeners } from './sports/achievements-awards';
import { spAnnouncementsListeners } from './sports/announcements';
import { spSportsListeners } from './sports/sports';
import { spWbsCoucilSportsListeners } from './sports/wbs-council-sports';

export const socketListeners = () => {
  spAboutUsListeners();
  spSportsListeners();
  spWbsCoucilSportsListeners();
  spAnnouncementsListeners();
  spAchievementsAwardsListeners();
};
