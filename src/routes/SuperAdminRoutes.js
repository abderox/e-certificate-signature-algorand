import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardSuperAdmin = Loadable(lazy(() => import('views/dashboard/SuperAdmin')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Register = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));


// ==============================|| MAIN ROUTING ||============================== //


const SuperAdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            index: true,
            path: '',
            element: <DashboardSuperAdmin />
        },
        {
            path: 'dashboard',
            element: <DashboardSuperAdmin />
        },
        {
            path: 'register-admin',
            element: <Register isEtudiant={false} />
        },
    ]
};

export default SuperAdminRoutes;
