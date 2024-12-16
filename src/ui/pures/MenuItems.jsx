'use client'
import React from "react";

//Material MUI
//import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
//import AddTaskIcon from "@mui/icons-material/AddTask";
//import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import OutboxIcon from '@mui/icons-material/Outbox';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";


const getIcon = (icon) => {
  switch (icon) {
    case "products":
      return <SpaceDashboardRoundedIcon/>
    case "wishlist":
      return <FavoriteBorderIcon/>;
    case 'my_orders':
      return <OutboxIcon/>;
    case 'settings':
      return <SettingsIcon/>;
    case 'admin':
      return <AdminPanelSettingsIcon/>;
    case 'orders':
      return <FactCheckIcon/>;
    case "clients":
      return <SupervisedUserCircleIcon/>;
    case 'stats':
      return <TimelineIcon/>;
    case 'tasks':
      return <TaskAltIcon/>;
    case "contact":
      return <PeopleAltIcon />;
    default:
      return <PeopleAltIcon />;
  }
};

const MenuItems = () => {
    const pathname =usePathname();
    const {data:session} =useSession();
    const userRole = session?.user.role;
    const list=[
      { text: 'Products', path: '/log', icon: 'products'},
      { text: 'Wishlist', path:'/log/wishlist', icon: 'wishlist' },
      { text: 'My Orders', path: '/log/orders', icon: 'my_orders' },
      { text: 'Settings', path: '/log/settings', icon: 'settings' },
      { text: 'Contact', path: '/log/about', icon: 'contact' },
];
  const adminList=[
  { text: 'Users', path: '/log/admin/users', icon: 'clients'},
  { text: 'Orders', path: '/log/admin/orders', icon: 'orders'},
  { text: 'Tasks', path: '/log/admin/tasks', icon: 'task'},
  { text: 'Stats', path: '/log/admin/stats', icon:'stats' },
  ];

  const items =()=>{
    if( userRole === 'user'){
      const item = list.map((list) => {
      return (<Link
        key={list.text}
        href={list.path}
        className={`flex h-[48px] grow items-center 
          shadow shadow-lg justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 
            ${pathname===list.path ? 'bg-sky-100 text-blue-600': ''}`}
        >
        {getIcon(list.icon)}
        <p className="hidden md:block">{list.text}</p>
      </Link>)
    });
    return item;
    } else if (userRole === 'admin') {
      return ( 
      <div className="flex flex-col gap-2 w-auto">
      <div className="flex flex-row md:flex-col gap-3 w-auto">
      {list.map((list) => {
      return (
        <motion.div key={list.text}
        whileHover={{scale: 1.2}}
        transition={{type: 'spring'}}>
      <Link
      href={list.path}
      className={`flex h-[48pxx] shadow shadow-lg items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 
          ${pathname===list.path ? 'bg-sky-100 text-blue-600': ''}`}
      >
      {getIcon(list.icon)}
      <p className="hidden md:block">{list.text}</p>
    </Link>
    </motion.div>
      )})} 
      </div>
      <div className="flex flex-col gap-2">
       <span className="text-gray-500 text-[12px]" >Admin</span>
       <hr className="border-t-1/2 border-gray-300 w-full"></hr>
       <div className="flex flex-row md:flex-col gap-3">
       {adminList.map((list) => {
      return (
        <motion.div key={list.text}
        whileHover={{scale: 1.2}}
        transition={{type: 'spring'}}>
      <Link
      href={list.path}
      className={`flex h-[48pxx] shadow shadow-lg grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 
          ${pathname===list.path ? 'bg-sky-100 text-blue-600': ''}`}
      >
      {getIcon(list.icon)}
      <p className="hidden md:block">{list.text}</p>
    </Link>
    </motion.div>
      )})}
        </div>
      </div>
        </div>
       )};
      };
  return (items())
};

export default MenuItems;