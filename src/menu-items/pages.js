// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
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
