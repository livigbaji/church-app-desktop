import React from 'react';
import { BsFillGridFill, BsClipboardData, BsPeople, BsBuilding, BsPersonFill, BsBoxArrowRight } from 'react-icons/bs';
import SideBarContents from './SideBarContents';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/sidebar.css'; // Import custom CSS for the sidebar

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">
      {/* <--- SideBar Icons and Text ---> */}
      <SideBarContents active Icon={BsFillGridFill} text="Dashboard" />
      <SideBarContents Icon={BsClipboardData} text="Attendance" />
      <SideBarContents Icon={BsPeople} text="Users" />
      <SideBarContents Icon={BsBuilding} text="Sub-Units" />
      <SideBarContents Icon={BsPersonFill} text="Profiles" />

      {/* <--- Logout Button ---> */}
      <SideBarContents Icon={BsBoxArrowRight} text="Log-out" />
    </div>
  );
};

export default Sidebar;
