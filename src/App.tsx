import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pg from '@/pages';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
