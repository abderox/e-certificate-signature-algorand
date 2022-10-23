import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import SuperAdminRoutes from './SuperAdminRoutes';
import ProfileRoutes from './ProfileRoutes';
import AdminRoutes from './AdminRoutes';
import { parseJwt } from 'utils/auth-utils';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes({token}) {
    let routes = [AuthenticationRoutes]
    let roles = parseJwt(token)?.roles;
    
    

    (roles?.includes("ROLE_SUPER_ADMIN")) && routes.push(SuperAdminRoutes);
    (roles?.includes("ROLE_ADMIN")) && routes.push(AdminRoutes);
    (roles?.includes("ROLE_ETUDIANT")) && routes.push(ProfileRoutes);

    return useRoutes(routes);
    // return useRoutes([MainRoutes, AuthenticationRoutes]);
}
