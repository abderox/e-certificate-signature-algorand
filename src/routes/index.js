import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ProfileRoutes from './ProfileRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes,ProfileRoutes]);
}
