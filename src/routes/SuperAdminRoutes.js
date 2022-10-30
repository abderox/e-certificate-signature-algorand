import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UnsignedCertificates from 'views/pages/superAdmin/UnsignedCertificates';
import SignedCertificates from 'views/pages/superAdmin/SignedCertificates';

// dashboard routing
const DashboardSuperAdmin = Loadable(lazy(() => import('views/dashboard/SuperAdmin')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Register = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AddComponent = Loadable(lazy(() => import('views/pages/superAdmin/building')))

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
        {
            path: 'certificats',
            element: <UnsignedCertificates />
        },
        {
            path: 'etudiants/certified',
            element: <SignedCertificates />
        },
            path: 'add-etablissment',
            element: <AddComponent isEtablissment={true} />
        },
        {
            path: 'add-filiere',
            element: <AddComponent isEtablissment={false} />
        }
    ]
};

export default SuperAdminRoutes;
