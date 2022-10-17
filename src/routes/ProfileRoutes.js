import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const Profile = Loadable(lazy(()=>import('views/pages/profile/public')));



const ProfileRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'student-profile',
            element: <Profile />
        }  
    ]
};

export default ProfileRoutes;