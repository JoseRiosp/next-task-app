import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';

const orderCount = 450.658;
const userHistory = 15;
const pendingOrders =3;
const reviewProducts =5

export const infoBadge=[
    {key: 1,
    title: 'Total Orders Count',
    bg: 'white',
    number: orderCount,
    icon: <LocalShippingIcon sx={{ fontSize: 35 }}/>
    },
    {
     key: 2,
     title: 'My Order History',
     bg: 'sky-100',
     number: userHistory,
     icon: <ChecklistIcon  sx={{ fontSize: 35 }}/>
    },
    {key: 3,
    title: 'My Pending Orders',
    bg: 'white',
    number: pendingOrders,
    icon: <AccessTimeIcon  sx={{ fontSize: 35 }}/>
        },
    {key: 4,
    title: 'Review Products',
    bg: 'sky-100',
    number: reviewProducts,
    icon: <StarsIcon  sx={{ fontSize: 35 }}/>
        },
]