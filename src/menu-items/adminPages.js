// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminPages = {
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

export default adminPages;
