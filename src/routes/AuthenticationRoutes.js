import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const Login = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const Profile = Loadable(lazy(()=>import('views/pages/profile/public')));
const VerificationPage = Loadable(lazy(()=>import('views/pages/verification/verification1')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: '*',
            element: <div>No Matching Route</div>
        },
        {
            path: 'etudiant/student-profile',
            element: <Profile />
        },
        {
            path: 'verification',
            element: <VerificationPage />

        } 
    ]
};

export default AuthenticationRoutes;
