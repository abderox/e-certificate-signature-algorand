// assets
import { IconKey } from '@tabler/icons';
import { IconDashboard } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconDashboard
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Administration',
    caption: '...',
    type: 'group',
    children: [
        {
            id: 'adminDashboard',
            title: 'Dashboard Admin',
            type: 'item',
            url: '/admin/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'authentication',
            title: 'Registration',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'registerAdmin',
                    title: 'Inscrire Admin',
                    type: 'item',
                    url: '/register-admin',
                    target: false
                },
                {
                    id: 'registerEtudiant',
                    title: 'Inscrire Etudiant',
                    type: 'item',
                    url: '/admin/register-student',
                    target: false
                }
            ]
        }
    ]
};

export default pages;
