import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Register = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const EtudiantsPage = Loadable(lazy(() => import('views/pages/admin/EtudiantsPage')));
const GenerateCertificatePage = Loadable(lazy(() => import('views/pages/admin/GenerateCertificatePage')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'register-student',
            element: <Register isEtudiant={true} />
        },
        {
            path: 'register-admin',
            element: <Register isEtudiant={false} />
        },
        {
            path: 'etudiants',
            element: <EtudiantsPage />
        },
        {
            path: 'generate-certificate',
            element: <GenerateCertificatePage />
        }
      

    ]
};

export default MainRoutes;
