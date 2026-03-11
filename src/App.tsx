import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pg from '@/pages';
import { useEffect } from 'react';
import { socketListeners } from './socket.io/socket.listener';
import { socket } from './socket.io';

const router = createBrowserRouter([
  { index: true, element: <pg.RootLanding /> },
  { path: `/wbsports/app/signin`, element: <pg.SpaSignin /> },
  { path: `/wbsports/app/signup`, element: <pg.SpaRegister /> },
  { path: `/wbsports/app/forgot-password`, element: <pg.SpaForgotPassword /> },
  { path: `/wbsports/app/reset-password`, element: <pg.SpaResetPassword /> },
  {
    path: `/wbsports/app`,
    element: <pg.SpaLayout />,
    children: [
      { path: `dashboard`, element: <pg.SpaDashboard /> },
      {
        path: `sports-in-bengal`,
        element: <pg.SpaSportsInBengal />,
      },
      {
        path: `vision-mission`,
        element: <pg.SpaVisionMission />,
      },
      {
        path: `administrative-structure`,
        element: <pg.SpaAdminStructure />,
      },
      {
        path: `key-personnel`,
        element: <pg.SpaKeyPersonnel />,
      },
      {
        path: `achievements`,
        element: <pg.SpaAchievements />,
      },
      {
        path: `sports-categories`,
        element: <pg.SpaSportsCategories />,
      },
      {
        path: `sports-personnel`,
        element: <pg.SpaSportsPersonnel />,
      },
      {
        path: `sports-events`,
        element: <pg.SpaSportsEvents />,
      },
      {
        path: `sports-infrastructure`,
        element: <pg.SpaSportsInfrastructure />,
      },
      {
        path: `add-edit-designations`,
        element: <pg.SpaWbsDesignations />,
      },
      {
        path: `wbs-council-members`,
        element: <pg.SpaAdvisoryWorking />,
      },
      {
        path: `wbc-events`,
        element: <pg.SpaWbcEvents />,
      },
      {
        path: `khelo-india`,
        element: <pg.SpaKheloIndia />,
      },
      {
        path: `announcements`,
        element: <pg.SpaAnnouncements />,
      },
      {
        path: `advertisements`,
        element: <pg.SpaAdvertisements />,
      },
      {
        path: `guiding-principles`,
        element: <pg.SpaGuidingPrinciples />,
      },
      {
        path: `players-achievements`,
        element: <pg.SpaPlayerAchievements />,
      },
      {
        path: `awards`,
        element: <pg.SpaAwards />,
      },
      {
        path: `stadiums`,
        element: <pg.SpaStadiums />,
      },
      {
        path: `stadium/:id?`,
        element: <pg.SpaStadiumForm />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socketListeners();

    return () => {
      socket.off();
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
