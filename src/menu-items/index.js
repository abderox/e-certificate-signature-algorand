import dashboard from './dashboard';
import adminDashboard from './adminDashboard';
import pages from './pages';
import adminPages from './adminPages';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [adminDashboard, adminPages]
};

export const superAdminMenuItems = {
    items: [dashboard, pages]
};

export default menuItems;
