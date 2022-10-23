import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const Profile = Loadable(lazy(()=>import('views/pages/profile/private')));



const ProfileRoutes = {
    path: 'student/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'my-profile',
            element: <Profile />
        }  
    ]
};

export default ProfileRoutes;