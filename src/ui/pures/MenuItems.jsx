'use client'
import React from "react";

//Material MUI
//import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
//import AddTaskIcon from "@mui/icons-material/AddTask";
//import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Link from "next/link";
import { usePathname } from "next/navigation";

const getIcon = (icon) => {
  switch (icon) {
    case "home":
      return <HomeIcon />;
    case "profile":
      return <PeopleAltIcon/>;
    case "about":
      return <LiveHelpIcon/>;
    default:
      return <HomeIcon />;
  }
};

const list  =[
        { text: 'Dashboard', path: '/log', icon: 'home'},
        { text: 'Profile', path: '/log/profile', icon: 'profile'},
        { text: 'About', path: '/log/about', icon: 'about' }
];

const MenuItems = () => {
    const pathname =usePathname()
  return (
    <>
        {list.map((list) => {
            return (<Link
            key={list.name}
            href={list.path}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 
                ${pathname===list.path ? 'bg-sky-100 text-blue-600': ''}`}
            >
            {getIcon(list.icon)}
            <p className="hidden md:block">{list.text}</p>
          </Link>);
        })}
    </>
  );
};

export default MenuItems;