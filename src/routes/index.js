import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import SuperAdminRoutes from './SuperAdminRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes({roles}) {
    let routes = [AuthenticationRoutes]
    if(roles.length === 0) {
        //...
    } else {
        if(roles.includes("ROLE_SUPER_ADMIN")) {
            routes.push(SuperAdminRoutes)
        }
        if(roles.includes("ROLE_ADMIN")) {
            routes.push(MainRoutes)
        }
        if(roles.includes("ROLE_ETUDIANT")) {
            routes.push(MainRoutes)
        }
    }
    return useRoutes(routes);
    // return useRoutes([MainRoutes, AuthenticationRoutes]);
}
